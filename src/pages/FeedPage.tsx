import React from 'react';
import { FeedCard } from '../components/features/FeedCard';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { Icon } from '../components/ui/Icons';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { useLatestNews } from '../hooks/useLatestNews';

const FeedPage: React.FC = () => {
    const { selectedCategoryIds, selectedTopicIds } = useOnboardingStore();
    const { data, isLoading, isError, refetch } = useLatestNews({
        categoryIds: selectedCategoryIds,
        topicIds: selectedTopicIds,
        limit: 20,
        sinceHours: 24,
    });

    const feedItems = data?.items || [];

    // Loading State
    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                        <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse" />
                        <div className="h-4 w-16 bg-slate-100 rounded animate-pulse" />
                    </div>
                    <div className="h-32 bg-slate-100 rounded-xl mb-4 animate-pulse" />
                    <div className="h-6 w-3/4 bg-slate-100 rounded animate-pulse mb-2" />
                    <div className="h-6 w-1/2 bg-slate-100 rounded animate-pulse mb-4" />
                    <div className="h-20 bg-slate-50 rounded-xl animate-pulse" />
                </div>
            ))}
        </div>
    );

    // Empty State
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Icon name="article" className="text-slate-400 text-4xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">No articles found</h3>
            <p className="text-slate-500 text-sm max-w-xs mb-6">
                {selectedTopicIds.length === 0
                    ? 'Select some topics to see your personalized feed.'
                    : 'No recent articles match your interests. Try expanding your time range or adding more topics.'}
            </p>
            {selectedTopicIds.length === 0 && (
                <button
                    onClick={() => window.location.hash = '/'}
                    className="px-6 py-3 bg-brand-pink text-white rounded-xl font-semibold hover:bg-brand-pink/90 transition-colors"
                >
                    Select Topics
                </button>
            )}
        </div>
    );

    // Error State
    const ErrorState = () => (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Icon name="error" className="text-red-400 text-4xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">Failed to load articles</h3>
            <p className="text-slate-500 text-sm max-w-xs mb-6">
                Please check your connection and try again.
            </p>
            <button
                onClick={() => refetch()}
                className="flex items-center gap-2 px-6 py-3 bg-brand-pink text-white rounded-xl font-semibold hover:bg-brand-pink/90 transition-colors"
            >
                <Icon name="refresh" />
                Retry
            </button>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-slate-50 font-display overflow-hidden relative pb-24">
            {/* Header */}
            <div className="px-6 pt-12 pb-4 flex justify-between items-center bg-white z-10 sticky top-0 shadow-sm">
                <div>
                    <h1 className="text-3xl font-black font-fun tracking-tight uppercase gradient-text">
                        Clarity Feed
                    </h1>
                    <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
                        <span className="text-xl leading-none block pb-1">✨</span> Your AI-curated digest
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-pink to-brand-blue p-[2px]">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <Icon name="ar_on_you" className="text-brand-pink text-[1.5rem]" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
                {isLoading && <LoadingSkeleton />}
                {isError && <ErrorState />}
                {!isLoading && !isError && feedItems.length === 0 && <EmptyState />}
                {!isLoading && !isError && feedItems.length > 0 && (
                    <div className="space-y-4">
                        {feedItems.map((article) => (
                            <FeedCard key={article.id} article={article} />
                        ))}
                    </div>
                )}
            </div>

            <BottomNavigation />
        </div>
    );
};

export default FeedPage;
