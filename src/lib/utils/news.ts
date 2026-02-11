
import { QueryClient } from '@tanstack/react-query';
import { NewsResponse, NewsArticle } from '../../types/news';

/**
 * Searches the React Query cache for a news article by ID.
 * It iterates over all queries with the key ['news'] and checks their data.
 */
export function findArticleInNewsCache(id: string | undefined, queryClient: QueryClient): NewsArticle | null {
    if (!id) return null;

    const queries = queryClient.getQueriesData<NewsResponse>({ queryKey: ['news'] });

    for (const [_, data] of queries) {
        if (!data || !data.items) continue;
        const found = data.items.find(item => item.id === id);
        if (found) return found;
    }

    return null;
}
