
import { useArticleSummary } from './useArticleSummary';
import { ArticleSummary, NewsArticle } from '../types/news';

interface UseStoryBriefResult {
    summary: ArticleSummary | null | undefined;
    isLoading: boolean;
    isError: boolean;
    statusLabel: string;
}

export function useStoryBrief(article: NewsArticle | undefined): UseStoryBriefResult {
    const { data: summary, isLoading, isError } = useArticleSummary({
        url: article?.url,
        title: article?.title,
    });

    let statusLabel = '';
    if (isLoading) statusLabel = 'Generating AI Summary...';
    else if (isError) statusLabel = 'Failed to generate summary';
    else if (summary) statusLabel = 'Summary Ready';

    return {
        summary,
        isLoading,
        isError,
        statusLabel,
    };
}
