// GDELT News Provider
// Uses GDELT DOC 2.0 API to fetch news articles

import { NEWS_CONFIG } from '../../config/newsConfig';
import type { ArticleLink, GDELTResponse, GDELTArticle } from '../../types/news';

/**
 * Build a GDELT query string from category and topic slugs.
 * GDELT uses a simple keyword search with OR logic.
 * IMPORTANT: GDELT requires OR expressions to be wrapped in parentheses.
 */
export function buildGdeltQuery(categorySlugs: string[], topicSlugs: string[]): string {
    const allSlugs = [...new Set([...categorySlugs, ...topicSlugs])];
    if (!allSlugs.length) return '';

    // Clean and format keywords
    const keywords = allSlugs.map(slug => {
        // Slugs are already clean, but we normalize just in case
        const cleaned = slug
            .replace(/[&]/g, ' ')
            .replace(/[^a-zA-Z0-9\s-]/g, '') // Keep hyphens for slugs
            .replace(/-/g, ' ')               // GDELT works better with spaces than hyphens for search
            .trim()
            .toLowerCase();

        // If multi-word, wrap in quotes for exact phrase
        return cleaned.includes(' ') ? `"${cleaned}"` : cleaned;
    }).filter(Boolean);

    // Single keyword doesn't need parentheses
    if (keywords.length === 1) {
        return keywords[0];
    }

    // GDELT requires OR expressions to be wrapped in parentheses
    return `(${keywords.join(' OR ')})`;
}


/**
 * Parse GDELT's date format to ISO.
 * GDELT seendate format: "20240203T120000Z"
 */
function parseGdeltDate(seendate: string): string {
    if (!seendate || seendate.length < 15) return seendate;

    // YYYYMMDDTHHMMSSZ -> YYYY-MM-DDTHH:MM:SSZ
    return `${seendate.slice(0, 4)}-${seendate.slice(4, 6)}-${seendate.slice(6, 8)}T${seendate.slice(9, 11)}:${seendate.slice(11, 13)}:${seendate.slice(13, 15)}Z`;
}

/**
 * Generate a stable ID from URL.
 */
function generateArticleId(url: string): string {
    // Stable ID using a subset of the URL path/domain
    return btoa(url).slice(-16).replace(/[+/=]/g, '0');
}

/**
 * Normalize a GDELT article to our ArticleLink format.
 */
export function normalizeGdeltArticle(
    article: GDELTArticle,
    matchedTopicIds: string[]
): ArticleLink {
    return {
        id: generateArticleId(article.url),
        title: article.title || 'Untitled',
        url: article.url,
        source: article.domain || 'Unknown',
        publishedAt: parseGdeltDate(article.seendate),
        imageUrl: article.socialimage,
        topicIds: matchedTopicIds,
    };
}

/**
 * Normalize GDELT response and deduplicate by URL.
 */
export function normalizeGdeltResponse(
    response: GDELTResponse,
    matchedTopicIds: string[]
): ArticleLink[] {
    const articles = response.articles || [];

    // Deduplicate by URL
    const seen = new Set<string>();
    const unique: ArticleLink[] = [];

    for (const article of articles) {
        if (!seen.has(article.url)) {
            seen.add(article.url);
            unique.push(normalizeGdeltArticle(article, matchedTopicIds));
        }
    }

    return unique;
}

interface FetchGdeltParams {
    categorySlugs: string[];
    topicSlugs: string[];
    topicIds: string[];
    limit?: number;
    sinceHours?: number;
}

/**
 * Fetch news from GDELT DOC 2.0 API.
 */
export async function fetchGdeltNews(params: FetchGdeltParams): Promise<ArticleLink[]> {
    const {
        categorySlugs,
        topicSlugs,
        topicIds,
        limit = NEWS_CONFIG.DEFAULT_LIMIT,
        sinceHours = NEWS_CONFIG.DEFAULT_SINCE_HOURS,
    } = params;

    const query = buildGdeltQuery(categorySlugs, topicSlugs);
    if (!query) return [];

    const maxRecords = Math.min(limit, NEWS_CONFIG.GDELT.MAX_RECORDS);

    // Build GDELT DOC 2.0 URL
    const url = new URL(NEWS_CONFIG.GDELT.BASE_URL);

    // Add language filter to query if configured
    const finalQuery = NEWS_CONFIG.GDELT.DEFAULT_LANGUAGE
        ? `${query} sourcelang:${NEWS_CONFIG.GDELT.DEFAULT_LANGUAGE}`
        : query;

    url.searchParams.set('query', finalQuery);
    url.searchParams.set('mode', NEWS_CONFIG.GDELT.MODE);
    url.searchParams.set('format', NEWS_CONFIG.GDELT.FORMAT);
    url.searchParams.set('sort', NEWS_CONFIG.GDELT.SORT);
    url.searchParams.set('maxrecords', String(maxRecords));
    url.searchParams.set('timespan', `${sinceHours}h`);

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`GDELT API error: ${response.status} ${response.statusText}`);
    }

    const data: GDELTResponse = await response.json();

    return normalizeGdeltResponse(data, topicIds);
}
