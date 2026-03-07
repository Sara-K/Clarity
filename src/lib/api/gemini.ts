import { supabase } from './supabase';
import { ArticleSummary } from '../../types/news';

// Configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * Main entry point to generate a summary for an article URL.
 * Uses local Gemini API with Supabase caching.
 */
export async function generateArticleSummaryLocal(url: string, title?: string): Promise<ArticleSummary> {
    const normalizedUrl = normalizeUrl(url);
    const id = await generateId(normalizedUrl);

    // 1. Check Cache
    const { data: cached } = await supabase
        .from('article_summaries')
        .select('*')
        .eq('id', id)
        .single();

    if (cached) return cached as ArticleSummary;

    // 2. Generate via Gemini
    if (!GEMINI_API_KEY) throw new Error("Missing VITE_GEMINI_API_KEY");

    const prompt = `
        Analyze this article: ${normalizedUrl} ${title ? `(Title: ${title})` : ''}
        Provide a concise summary with:
        - tldr: Max 2 sentences.
        - key_takeaways: 3-5 bullet points.
        - quotes: 2-3 short verbatim quotes with context.
    `;

    const summaryData = await callGemini(prompt);

    // 3. Store and Return
    const dbRecord: ArticleSummary = {
        id,
        url: normalizedUrl,
        title: title || summaryData.tldr.slice(0, 80),
        ...summaryData,
    };

    await supabase.from('article_summaries').upsert(dbRecord);
    
    return dbRecord;
}

/**
 * Makes the actual API call to Gemini with structured output configuration.
 */
async function callGemini(prompt: string) {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.4,
                response_mime_type: "application/json",
                response_schema: {
                    type: "OBJECT",
                    required: ["tldr", "key_takeaways", "quotes"],
                    properties: {
                        tldr: { type: "STRING" },
                        key_takeaways: { type: "ARRAY", items: { type: "STRING" } },
                        quotes: {
                            type: "ARRAY",
                            items: {
                                type: "OBJECT",
                                required: ["quote", "url"],
                                properties: {
                                    quote: { type: "STRING" },
                                    context: { type: "STRING" },
                                    url: { type: "STRING" }
                                }
                            }
                        }
                    }
                }
            }
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error("No content generated");

    return JSON.parse(content);
}

/**
 * URL normalization to improve cache hit rates.
 */
function normalizeUrl(urlStr: string): string {
    try {
        const u = new URL(urlStr);
        ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid', 'gclid'].forEach(p => u.searchParams.delete(p));
        u.hash = '';
        return u.toString();
    } catch {
        return urlStr;
    }
}

/**
 * Deterministic ID generation for caching.
 */
async function generateId(url: string): Promise<string> {
    const msg = new TextEncoder().encode(url);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msg);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, 16);
}
