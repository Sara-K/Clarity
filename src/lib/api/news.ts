// News API Layer
// Abstracts news provider to make it easy to swap providers later

import { NEWS_CONFIG } from '../../config/newsConfig';
import type { NewsQueryParams, NewsResponse, ArticleSummary } from '../../types/news';
import { generateArticleSummaryLocal } from './gemini';

import { supabase } from './supabase';

/**
 * Fetch latest news articles based on selected categories and topics.
 * Calls a Supabase Edge Function that handles GDELT integration and caching.
 */
export async function fetchLatestNews(params: NewsQueryParams): Promise<NewsResponse> {
    const {
        categoryIds,
        topicIds,
        limit = NEWS_CONFIG.DEFAULT_LIMIT,
        sinceHours = NEWS_CONFIG.DEFAULT_SINCE_HOURS,
    } = params;

    if (!categoryIds.length && !topicIds.length) {
        return {
            provider: 'gdelt-proxied',
            query: { keywords: [], timeRange: `${sinceHours}h` },
            items: [],
            fetchedAt: new Date().toISOString(),
        };
    }

    const { data, error } = await supabase.functions.invoke('fetch-news', {
        body: {
            categoryIds,
            topicIds,
            limit,
            sinceHours,
            // Optional toggles if UI is added later:
            // trustedOnly: false,
            // language: 'eng',
        },
    });

    if (error) {
        console.error('Edge Function error:', error);
        throw new Error('Failed to fetch news via edge function');
    }

    return data as NewsResponse;
}

export async function fetchArticleSummary(url: string, title?: string): Promise<ArticleSummary | null> {
    try {
        const summary = await generateArticleSummaryLocal(url, title);
        return summary;
    } catch (error) {
        console.error('Error fetching article summary (local):', error);
        return null; // Or throw depending on requirements
    }
}
