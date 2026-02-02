import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../lib/api';
import type { DbCategory } from '../types/database';

export function useCategoriesQuery() {
    return useQuery<DbCategory[], Error>({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 2,
    });
}
