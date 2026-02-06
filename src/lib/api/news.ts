// News API Layer
// Abstracts news provider to make it easy to swap providers later

import { NEWS_CONFIG } from '../../config/newsConfig';
import type { NewsQueryParams, NewsResponse } from '../../types/news';

import { supabase, fetchCategoriesByIds, fetchTopicsByIds } from './supabase';

/**
 * Resolve category and topic IDs to their respective slugs.
 */
async function resolveSlugs(categoryIds: string[], topicIds: string[]) {
    const [categories, topics] = await Promise.all([
        categoryIds.length > 0 ? fetchCategoriesByIds(categoryIds) : Promise.resolve([]),
        topicIds.length > 0 ? fetchTopicsByIds(topicIds) : Promise.resolve([])
    ]);

    const categorySlugs = categories.map(c => c.slug);
    const topicSlugs = topics.map(t => t.slug);

    return { categorySlugs, topicSlugs };
}

/**
 * Fetch latest news articles based on selected categories and topics.
 * Calls a Supabase Edge Function that handles GDELT integration and caching.
 */
export async function fetchLatestNews(
    params: NewsQueryParams
): Promise<NewsResponse> {
    const {
        categoryIds,
        topicIds,
        limit = NEWS_CONFIG.DEFAULT_LIMIT,
        sinceHours = NEWS_CONFIG.DEFAULT_SINCE_HOURS,
    } = params;

    if (!categoryIds.length && !topicIds.length) {
        return {
            provider: 'gdelt-proxied',
            query: { keywords: [], timeRange: '' },
            items: [],
            fetchedAt: new Date().toISOString(),
        };
    }

    const { categorySlugs, topicSlugs } = await resolveSlugs(categoryIds, topicIds);

    const { data: articles, error } = await supabase.functions.invoke('fetch-news', {
        body: {
            categorySlugs,
            topicSlugs,
            topicIds,
            limit,
            sinceHours
        }
    });

    if (error) {
        console.error('Edge Function error:', error);
        throw new Error('Failed to fetch news via edge function');
    }

    return {
        provider: 'gdelt-proxied',
        query: {
            keywords: [...new Set([...categorySlugs, ...topicSlugs])],
            timeRange: `${sinceHours}h`,
        },
        items: articles || [],
        fetchedAt: new Date().toISOString(),
    };
}
