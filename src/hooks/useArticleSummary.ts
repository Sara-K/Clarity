import { useQuery } from '@tanstack/react-query';
import { fetchArticleSummary } from '../lib/api/news';
import { ArticleSummary } from '../types/news';

interface UseArticleSummaryProps {
    url: string | undefined;
    title?: string;
}

export const useArticleSummary = ({ url, title }: UseArticleSummaryProps) => {
    return useQuery<ArticleSummary | null, Error>({
        queryKey: ['articleSummary', url],
        queryFn: () => fetchArticleSummary(url!, title),
        enabled: !!url,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours (cache aggressively)
        retry: 1,
    });
};
