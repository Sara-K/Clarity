// React Query hook for fetching latest news

import { useQuery } from '@tanstack/react-query';
import { fetchLatestNews } from '../lib/api/news';
import { NEWS_CONFIG } from '../config/newsConfig';
import type { NewsResponse, NewsQueryParams } from '../types/news';

/**
 * Hook to fetch latest news articles based on selected categories and topics.
 * 
 * Features:
 * - Caches results for 5 minutes (staleTime)
 * - Retries on failure with exponential backoff
 * - Only fetches when categories or topics are selected
 * - Query key includes all params for proper cache invalidation
 */
export function useLatestNews(params: NewsQueryParams) {
    const { categoryIds, topicIds, limit, sinceHours } = params;

    // Sort IDs for consistent query keys
    const sortedCategoryIds = [...categoryIds].sort();
    const sortedTopicIds = [...topicIds].sort();

    return useQuery<NewsResponse, Error>({
        queryKey: ['news', 'latest', { categoryIds: sortedCategoryIds, topicIds: sortedTopicIds, limit, sinceHours }],
        queryFn: () => fetchLatestNews({ categoryIds: sortedCategoryIds, topicIds: sortedTopicIds, limit, sinceHours }),

        // Fetch when we have categories or topics selected
        enabled: categoryIds.length > 0 || topicIds.length > 0,

        // Cache settings
        staleTime: NEWS_CONFIG.CACHE.STALE_TIME,
        gcTime: NEWS_CONFIG.CACHE.GC_TIME,

        // Retry with backoff
        retry: NEWS_CONFIG.RETRY.COUNT,
        retryDelay: (attemptIndex) =>
            Math.min(NEWS_CONFIG.RETRY.DELAY * Math.pow(2, attemptIndex), NEWS_CONFIG.RETRY.MAX_DELAY),

        // Don't refetch on window focus for news (too aggressive)
        refetchOnWindowFocus: false,
    });
}
