
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { findArticleInNewsCache } from '../lib/utils/news';
import { fetchLatestNews } from '../lib/api/news';
import { NewsArticle, NewsResponse } from '../types/news';

interface UseResolvedArticleResult {
    article: NewsArticle | undefined;
    isResolving: boolean;
    resolutionSource: 'state' | 'cache' | 'fallback' | 'none';
}

export function useResolvedArticle(): UseResolvedArticleResult {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const queryClient = useQueryClient();

    // Strategy 1: State (Fastest)
    const stateArticle = location.state?.article as NewsArticle | undefined;

    // Strategy 2: Cache (Fast)
    const cachedArticle = useMemo(() => {
        if (stateArticle) return null; // Skip if found in state
        return findArticleInNewsCache(id, queryClient);
    }, [id, stateArticle, queryClient]);

    // Strategy 3: Fallback Fetch (Slowest)
    // Only fetch if we absolutely have to.
    const shouldFetchFallback = !stateArticle && !cachedArticle && !!id;

    const { data: fallbackData, isLoading: isFallbackLoading } = useQuery<NewsResponse>({
        queryKey: ['news', 'fallback', id],
        queryFn: async () => {
            // Try to fetch a broad set of news to hope our article is in there.
            // Since we don't know the category, we try a few popular ones or a broad search.
            // Note: This is an imperfect fallback because the backend requires categories.
            return fetchLatestNews({
                categoryIds: ['cat_technology', 'cat_business_startups'], // Try broad categories
                topicIds: [],
                limit: 50,
                sinceHours: 72,
            });
        },
        enabled: shouldFetchFallback,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const fallbackArticle = fallbackData?.items.find(item => item.id === id);

    const article = stateArticle ?? cachedArticle ?? fallbackArticle;

    return {
        article,
        isResolving: shouldFetchFallback && isFallbackLoading,
        resolutionSource: stateArticle ? 'state' : cachedArticle ? 'cache' : fallbackArticle ? 'fallback' : 'none',
    };
}
