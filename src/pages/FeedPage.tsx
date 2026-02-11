import React from 'react';
import { FeedCard } from '../components/features/FeedCard';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { Icon } from '../components/ui/Icons';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { useLatestNews } from '../hooks/useLatestNews';
import { NEWS_CONFIG } from '../config/newsConfig';
import { StatusDisplay } from '../components/ui/StatusDisplay';

const FeedPage: React.FC = () => {
    const { selectedCategoryIds, selectedTopicIds } = useOnboardingStore();
    const { data, isLoading, isError, isFetching, refetch } = useLatestNews({
        categoryIds: selectedCategoryIds,
        topicIds: selectedTopicIds,
        limit: NEWS_CONFIG.DEFAULT_LIMIT,
        sinceHours: NEWS_CONFIG.DEFAULT_SINCE_HOURS,
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
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all ${isFetching ? 'opacity-50' : 'active:scale-95'}`}
                        title="Refresh news"
                    >
                        <Icon
                            name="refresh"
                            className={`text-xl ${isFetching ? 'animate-spin' : ''}`}
                        />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-pink to-brand-blue p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <Icon name="ar_on_you" className="text-brand-pink text-[1.5rem]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
                {isLoading && <LoadingSkeleton />}
                {isError && (
                    <StatusDisplay
                        variant="error"
                        title="Failed to load articles"
                        message="Please check your connection and try again."
                        action={{
                            label: "Retry",
                            onClick: () => refetch(),
                            icon: "refresh"
                        }}
                    />
                )}
                {!isLoading && !isError && feedItems.length === 0 && (
                    <StatusDisplay
                        variant="empty"
                        title="No articles found"
                        message={(selectedTopicIds.length === 0 && selectedCategoryIds.length === 0)
                            ? 'Select some categories or topics to see your personalized feed.'
                            : 'No recent articles match your interests. Try expanding your time range or adding more topics.'}
                        action={(selectedTopicIds.length === 0 && selectedCategoryIds.length === 0) ? {
                            label: "Select Topics",
                            onClick: () => window.location.hash = '/',
                            icon: "interests"
                        } : undefined}
                    />
                )}
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
