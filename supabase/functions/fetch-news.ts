import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// =============================================================================
// Types
// =============================================================================

type TopicTermType = "phrase" | "keyword" | "token";

type TopicTermRow = {
    topic_id: string;
    term: string;
    term_type: TopicTermType;
    language: string;
    weight: number;
    is_ambiguous: boolean;
    requires_anchor: boolean;
    anchor_terms: string[];
};

type TrustedSource = {
    domain: string;
    weight: number;
};

type NormalizedArticle = {
    id: string;
    title: string;
    url: string;
    source: string;
    publishedAt?: string;
    imageUrl?: string;
    topicIds: string[];
    isTrusted: boolean;
    score: number;
};

type GdeltArticle = {
    url: string;
    title: string;
    domain: string;
    source?: string;
    seendate: string;
    socialimage?: string;
};

// =============================================================================
// Configuration
// =============================================================================

const NEWS_CONFIG = {
    DEFAULT_LIMIT: 20,
    DEFAULT_SINCE_HOURS: 120,
    CACHE_SECONDS: 300,
    MAX_QUERY_TERMS: 10,
    TRUSTED_BASE_SCORE: 100,
    TRUSTED_WEIGHT_MULTIPLIER: 10,
    TOPIC_MATCH_BONUS: 50,
    GDELT: {
        BASE_URL: "https://api.gdeltproject.org/api/v2/doc/doc",
        MODE: "ArtList",
        FORMAT: "json",
        MAX_RECORDS: 100,
        DEFAULT_LANGUAGE: "english",
        SORT_RELEVANCE: "hybridrel",
    },
};

// Category-level broad keywords (fallback)
const CATEGORY_BROAD_KEYWORDS: Record<string, string[]> = {
    'cat_programming': ['software', 'programming', 'developer', 'coding'],
    'cat_technology': ['technology', 'artificial intelligence', 'cybersecurity'],
    'cat_business_startups': ['startup', 'venture capital', 'entrepreneur'],
    'cat_politics': ['politics', 'election', 'government'],
    'cat_marketing': ['marketing', 'advertising', 'SEO'],
    'cat_stocks_investing': ['stock market', 'investing', 'stocks'],
    'cat_personal_finance': ['personal finance', 'budgeting', 'credit'],
    'cat_health_fitness': ['health', 'fitness', 'nutrition'],
    'cat_travel': ['travel', 'tourism', 'vacation'],
    'cat_fashion': ['fashion', 'luxury', 'style'],
};

// Helper to sanitize terms for GDELT query
function sanitizeTerm(term: string): string {
    // GDELT is sensitive to special characters.
    // We'll strip everything except alphanumeric characters and spaces.
    // We also remove common noise words that don't help specificity.
    return term
        .replace(/[^a-zA-Z0-0\s]/g, '')
        .trim()
        .toLowerCase();
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const body = await req.json();
        const {
            categoryIds = [],
            topicIds = [],
            limit,
            sinceHours,
            language = NEWS_CONFIG.GDELT.DEFAULT_LANGUAGE,
        } = body;

        const finalLimit = limit ?? NEWS_CONFIG.DEFAULT_LIMIT;
        const finalSinceHours = sinceHours ?? NEWS_CONFIG.DEFAULT_SINCE_HOURS;
        const hasExplicitTopics = topicIds.length > 0;

        console.log(`[fetch-news] Request: categories=${categoryIds.length}, topics=${topicIds.length}`);

        // Initialize Supabase
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !supabaseKey) {
            throw new Error("Missing Supabase configuration environment variables.");
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Resolve topics
        let resolvedTopicIds = [...topicIds];
        const explicitTopicIds = [...topicIds];

        if (categoryIds.length > 0 && topicIds.length === 0) {
            const { data: topicsData } = await supabase
                .from('topics')
                .select('id')
                .in('category_id', categoryIds)
                .eq('is_active', true);

            if (topicsData) {
                resolvedTopicIds = topicsData.map((t: { id: string }) => t.id);
            }
        }

        // Fetch topic terms
        let terms: TopicTermRow[] = [];
        if (resolvedTopicIds.length > 0) {
            const { data: termsData } = await supabase
                .from('topic_terms')
                .select('topic_id, term, term_type, language, weight, is_ambiguous, requires_anchor, anchor_terms')
                .in('topic_id', resolvedTopicIds)
                .order('weight', { ascending: false });

            if (termsData) {
                terms = termsData as TopicTermRow[];
            }
        }

        console.log(`[fetch-news] Resolved ${resolvedTopicIds.length} topics with ${terms.length} terms`);

        // Build query - prioritize explicit topic terms
        const keywordSet = new Set<string>();

        if (hasExplicitTopics) {
            // Get terms for explicitly selected topics
            const explicitTopicTerms = terms
                .filter(t => explicitTopicIds.includes(t.topic_id) && !t.is_ambiguous && !t.requires_anchor && t.weight >= 3)
                .sort((a, b) => b.weight - a.weight);

            for (const term of explicitTopicTerms) {
                if (keywordSet.size >= NEWS_CONFIG.MAX_QUERY_TERMS) break;
                const sanitized = sanitizeTerm(term.term);
                // Only add if it's a reasonably long keyword to avoid overly broad results
                if (sanitized.length > 3) {
                    keywordSet.add(sanitized);
                }
            }
        }

        // Supplement with category keywords if we don't have enough specific topic terms
        if (keywordSet.size < 4) {
            for (const catId of categoryIds) {
                const broadKeywords = CATEGORY_BROAD_KEYWORDS[catId] || [];
                for (const kw of broadKeywords) {
                    if (keywordSet.size >= NEWS_CONFIG.MAX_QUERY_TERMS) break;
                    keywordSet.add(sanitizeTerm(kw));
                }
            }
        }

        // Absolute fallback
        if (keywordSet.size === 0) {
            keywordSet.add('news');
        }

        const keywords = Array.from(keywordSet);
        console.log(`[fetch-news] Final Keywords: ${keywords.join(', ')}`);

        // GDELT Query Construction
        // Critical: wrap OR'd terms in parentheses.
        const keywordsQuery = `(${keywords.join(' OR ')}) sourcelang:${language}`;
        console.log(`[fetch-news] GDELT Query: ${keywordsQuery}`);

        // Fetch trusted sources
        let trustedDomains: TrustedSource[] = [];
        if (categoryIds.length > 0) {
            const { data: sourcesData } = await supabase
                .from('category_sources')
                .select('sources!inner(domain), weight')
                .in('category_id', categoryIds)
                .eq('is_active', true);

            if (sourcesData) {
                trustedDomains = sourcesData.map((s: any) => ({
                    domain: s.sources.domain,
                    weight: s.weight,
                }));
            }
        }

        // Call GDELT
        const gdeltParams = new URLSearchParams({
            query: keywordsQuery,
            mode: NEWS_CONFIG.GDELT.MODE,
            format: NEWS_CONFIG.GDELT.FORMAT,
            maxrecords: String(NEWS_CONFIG.GDELT.MAX_RECORDS),
            timespan: `${finalSinceHours}h`,
            sort: NEWS_CONFIG.GDELT.SORT_RELEVANCE,
        });

        const gdeltUrl = `${NEWS_CONFIG.GDELT.BASE_URL}?${gdeltParams.toString()}`;
        console.log(`[fetch-news] Requesting GDELT URL: ${gdeltUrl}`);

        const gdeltResponse = await fetch(gdeltUrl);

        if (!gdeltResponse.ok) {
            const errorText = await gdeltResponse.text();
            // LOG THE FULL ERROR FROM GDELT TO DEBUG 400s
            console.error(`[fetch-news] GDELT API ERROR ${gdeltResponse.status}: ${errorText}`);
            throw new Error(`GDELT rejected the request with status ${gdeltResponse.status}. Query might be invalid.`);
        }

        const gdeltData = await gdeltResponse.json();
        const articles: GdeltArticle[] = gdeltData.articles || [];

        console.log(`[fetch-news] GDELT returned ${articles.length} articles`);

        // Process and score articles
        const trustedDomainMap = new Map(trustedDomains.map(d => [d.domain, d.weight]));
        const results: NormalizedArticle[] = [];
        const seenUrls = new Set<string>();

        for (const art of articles) {
            if (seenUrls.has(art.url)) continue;
            seenUrls.add(art.url);

            const domain = art.domain || '';
            const isTrusted = trustedDomainMap.has(domain);
            const trustedWeight = trustedDomainMap.get(domain) || 0;

            const titleLower = (art.title || '').toLowerCase();
            const matchedTopicIds = resolvedTopicIds.filter(tid => {
                const topicTerms = terms.filter(t => t.topic_id === tid);
                return topicTerms.some(t => titleLower.includes(sanitizeTerm(t.term)));
            });

            const matchesExplicitTopic = hasExplicitTopics &&
                matchedTopicIds.some(tid => explicitTopicIds.includes(tid));

            // Scoring logic
            let score = 1;
            if (matchesExplicitTopic && isTrusted) {
                score = 200 + (trustedWeight * NEWS_CONFIG.TRUSTED_WEIGHT_MULTIPLIER);
            } else if (matchesExplicitTopic) {
                score = 150 + (matchedTopicIds.length * 5);
            } else if (isTrusted) {
                score = NEWS_CONFIG.TRUSTED_BASE_SCORE + (trustedWeight * NEWS_CONFIG.TRUSTED_WEIGHT_MULTIPLIER);
            }

            if (art.socialimage) score += 5; // Preference for articles with images

            results.push({
                id: crypto.randomUUID(),
                title: art.title,
                url: art.url,
                source: domain || 'Unknown',
                publishedAt: art.seendate,
                imageUrl: art.socialimage || undefined,
                topicIds: matchedTopicIds.length > 0 ? matchedTopicIds : (hasExplicitTopics ? explicitTopicIds.slice(0, 1) : categoryIds.slice(0, 1)),
                isTrusted,
                score,
            });
        }

        results.sort((a, b) => b.score - a.score);

        console.log(`[fetch-news] Returning ${Math.min(results.length, finalLimit)} articles`);

        return new Response(
            JSON.stringify({
                provider: 'gdelt-proxied',
                query: {
                    timeRange: `${finalSinceHours}h`,
                    language,
                    keywords,
                    explicitTopics: explicitTopicIds,
                    trustedDomains: trustedDomains.map(d => d.domain),
                },
                items: results.slice(0, finalLimit),
                fetchedAt: new Date().toISOString(),
            }),
            {
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json',
                    'Cache-Control': `public, max-age=${NEWS_CONFIG.CACHE_SECONDS}`,
                },
            }
        );
    } catch (error) {
        console.error('[fetch-news] Execution Error:', error);
        return new Response(
            JSON.stringify({
                error: (error as Error).message,
                details: "Check Edge Function logs for details on GDELT API errors."
            }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
