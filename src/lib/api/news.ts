// News API Layer
// Abstracts news provider to make it easy to swap providers later

import { fetchGdeltNews } from '../newsProviders/gdelt';
import { NEWS_CONFIG } from '../../config/newsConfig';
import type { NewsQueryParams, NewsResponse, ArticleLink } from '../../types/news';

import { fetchCategoriesByIds, fetchTopicsByIds } from './supabase';

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
 * Uses category and topic slugs for GDELT search.
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
            provider: 'gdelt',
            query: { keywords: [], timeRange: '' },
            items: [],
            fetchedAt: new Date().toISOString(),
        };
    }

    const { categorySlugs, topicSlugs } = await resolveSlugs(categoryIds, topicIds);
    const keywords = [...new Set([...categorySlugs, ...topicSlugs])];

    const articles = await fetchGdeltNews({
        categorySlugs,
        topicSlugs,
        topicIds,
        limit,
        sinceHours,
    });

    return {
        provider: 'gdelt',
        query: {
            keywords,
            timeRange: `${sinceHours}h`,
        },
        items: articles,
        fetchedAt: new Date().toISOString(),
    };
}
