
import React from 'react';
import { NewsArticle, ArticleSummary } from '../../../types/news';
import { Tag } from '../../ui/Tag';
import { StatusDisplay } from '../../ui/StatusDisplay';
import { useNavigate } from 'react-router-dom';
import { StoryHeader } from './StoryHeader';
import { StorySummary } from './StorySummary';
import { StoryKeyTakeaways } from './StoryKeyTakeaways';
import { StoryQuotes } from './StoryQuotes';
import { StoryActions } from './StoryActions';

interface StoryBriefLayoutProps {
    article: NewsArticle | undefined;
    summary: ArticleSummary | null | undefined;
    isLoading: boolean;
    isError: boolean;
    onBack: () => void;
}

export const StoryBriefLayout: React.FC<StoryBriefLayoutProps> = ({
    article,
    summary,
    isLoading,
    isError,
}) => {
    const navigate = useNavigate();

    if (!article && !isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen p-8">
                <StatusDisplay
                    title="Article not found"
                    message="We couldn't locate the article details. It might be too old or unavailable."
                    icon="sentiment_dissatisfied"
                    action={{
                        label: "Back to Feed",
                        onClick: () => navigate('/feed'),
                        icon: "arrow_back"
                    }}
                />
            </div>
        );
    }

    // Derived Metadata
    const uniqueSources = summary?.quotes
        ? new Set(summary.quotes.map(q => new URL(q.url).hostname)).size
        : 0;

    const sourceLabel = uniqueSources > 0 ? `${uniqueSources} source${uniqueSources !== 1 ? 's' : ''}` : null;

    // Estimate read time based on summary length (very rough)
    const wordCount = (summary?.tldr?.split(' ').length || 0) +
        (summary?.key_takeaways?.join(' ').split(' ').length || 0);
    const readTime = wordCount > 0 ? `${Math.ceil(wordCount / 200)} min read` : "1 min read";

    return (
        <div className="flex flex-col min-h-screen bg-white font-display overflow-y-auto hide-scrollbar pb-32">
            <StoryHeader />
            <div className="px-6 py-4">
                <div className="flex items-center gap-2 mb-4">
                    <Tag color="pink">News Brief</Tag>
                    <Tag color="slate">{readTime}</Tag>
                    {sourceLabel && <Tag color="slate">{sourceLabel}</Tag>}
                </div>
                <h1 className="text-3xl font-black text-slate-900 leading-[1.1] mb-8 serif">
                    {article?.title}
                </h1>
                {isLoading && (
                    <StatusDisplay
                        variant="loading"
                        title="Analyzing Story"
                        message="Our AI is distilling the key insights for you..."
                        className="py-12"
                    />
                )}
                {isError && (
                    <StatusDisplay
                        variant="error"
                        title="Failed to generate summary"
                        message="Please try again later."
                        className="mb-8"
                    />
                )}
                {summary && (
                    <>
                        <StorySummary tldr={summary.tldr} />
                        <StoryKeyTakeaways takeaways={summary.key_takeaways} />
                        <StoryQuotes quotes={summary.quotes} />
                    </>
                )}
            </div>
            <StoryActions />
            <div className="h-10" />
        </div>
    );
};
