// News API Layer
// Abstracts news provider to make it easy to swap providers later

import { NEWS_CONFIG } from '../../config/newsConfig';
import type { NewsQueryParams, NewsResponse } from '../../types/news';

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

    // Edge function returns a full NewsResponse-like payload
    if (data) {
        console.log('--- news api debug ---');
        console.log('Provider:', data.provider);
        console.log('Query:', data.query);
        console.log('Items Count:', data.items?.length || 0);

        // Debug trusted vs non-trusted
        const trustedArticles = data.items?.filter((a: { isTrusted?: boolean }) => a.isTrusted) || [];
        const nonTrustedArticles = data.items?.filter((a: { isTrusted?: boolean }) => !a.isTrusted) || [];
        console.log(`Trusted: ${trustedArticles.length}, Non-trusted: ${nonTrustedArticles.length}`);

        if (trustedArticles.length > 0) {
            console.log('First trusted sources:', trustedArticles.slice(0, 5).map((a: { source: string }) => a.source));
        } else {
            console.log('⚠️ No trusted articles found! Check category_sources table.');
        }

        console.log('First 5 articles order:', data.items?.slice(0, 5).map((a: { source: string; isTrusted?: boolean }) =>
            `${a.source} (${a.isTrusted ? '✓ trusted' : 'not trusted'})`
        ));
        console.log('----------------------');
    }

    return data as NewsResponse;
}
