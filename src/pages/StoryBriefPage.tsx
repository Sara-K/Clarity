
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResolvedArticle } from '../hooks/useResolvedArticle';
import { useStoryBrief } from '../hooks/useStoryBrief';
import { StoryBriefLayout } from '../components/features/StoryBrief/StoryBriefLayout';
import { StatusDisplay } from '../components/ui/StatusDisplay';

export const StoryBriefPage: React.FC = () => {
    const navigate = useNavigate();
    const { article, isResolving } = useResolvedArticle();
    const { summary, isLoading: isSummaryLoading, isError } = useStoryBrief(article);

    if (isResolving) {
        return (
            <StatusDisplay
                variant="loading"
                title="Locating Story"
                message="Finding the perfect article for you..."
                fullPage
            />
        );
    }

    return (
        <StoryBriefLayout
            article={article}
            summary={summary}
            isLoading={isSummaryLoading}
            isError={isError}
            onBack={() => navigate(-1)}
        />
    );
};

export default StoryBriefPage;
