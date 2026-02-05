import { useQuery } from '@tanstack/react-query';
import { fetchTopicsByCategoryIds } from '../lib/api/supabase';
import type { DbTopic } from '../types/database';

export function useTopicsByCategoriesQuery(categoryIds: string[]) {
    return useQuery<DbTopic[], Error>({
        queryKey: ['topics', { categoryIds: [...categoryIds].sort() }],
        queryFn: () => fetchTopicsByCategoryIds(categoryIds),
        enabled: categoryIds.length > 0, // Only fetch when categories are selected
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 2,
    });
}
