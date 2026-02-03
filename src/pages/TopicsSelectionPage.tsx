import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';
import { useTopicsByCategoriesQuery } from '../hooks/useTopics';
import { useCategoriesQuery } from '../hooks/useCategories';
import type { DbTopic, DbCategory } from '../types/database';

const TopicsSelectionPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const categoryIds: string[] = (location.state as { categoryIds?: string[] })?.categoryIds || [];

    const { data: topics, isLoading: topicsLoading, isError: topicsError, refetch } = useTopicsByCategoriesQuery(categoryIds);

    const { data: allCategories } = useCategoriesQuery();

    const toggleTopic = (id: string) => {
        setSelectedTopics(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const handleNext = () => {
        // TODO: save the selected topics here
        console.log('Selected topics:', selectedTopics);
        navigate('/feed');
    };

    const handleSkip = () => {
        navigate('/feed');
    };

    const groupedTopics = (topics || []).reduce<Record<string, DbTopic[]>>((acc, topic) => {
        if (!acc[topic.category_id]) acc[topic.category_id] = [];
        acc[topic.category_id].push(topic);
        return acc;
    }, {});

    const getCategoryName = (categoryId: string): string => {
        const cat = allCategories?.find((c: DbCategory) => c.id === categoryId);
        return cat?.name || 'Unknown';
    };

    if (topicsLoading) {
        return (
            <div className="flex flex-col h-screen bg-white font-display overflow-hidden relative">
                <div className="p-8 space-y-2 pt-12 shrink-0">
                    <div className="h-10 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="h-6 w-1/2 bg-slate-100 rounded-lg animate-pulse" />
                </div>
                <div className="px-6 py-4 flex-1">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-16 w-full bg-slate-100 rounded-2xl mb-4 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (topicsError) {
        return (
            <div className="flex flex-col h-screen bg-white font-display items-center justify-center p-8">
                <Icon name="error" className="text-red-400 text-6xl mb-4" />
                <h2 className="text-xl font-bold text-slate-700 mb-2">Failed to load topics</h2>
                <p className="text-slate-500 mb-6">Please check your connection and try again.</p>
                <Button onClick={() => refetch()} className="px-6 py-3 bg-brand-pink text-white rounded-xl">
                    <Icon name="refresh" className="mr-2" />
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-white font-display overflow-hidden relative">
            <div className="p-8 space-y-2 pt-12 shrink-0">
                <h1 className="text-4xl font-bold gradient-text">Refine Your Interests</h1>
                <p className="text-slate-500 font-medium text-lg">Select specific topics or skip for now. ✨</p>
            </div>

            <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-40">
                {Object.entries(groupedTopics).map(([categoryId, catTopics]) => (
                    <div key={categoryId} className="mb-6">
                        <h2 className="text-lg font-bold text-slate-700 mb-3 flex items-center">
                            <span className="w-2 h-2 rounded-full bg-brand-pink mr-2" />
                            {getCategoryName(categoryId)}
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            {catTopics.map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => toggleTopic(topic.id)}
                                    className={`flex items-center p-4 rounded-2xl border-2 transition-all duration-200 ${selectedTopics.includes(topic.id)
                                        ? 'border-brand-pink bg-brand-pink/5 shadow-md'
                                        : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${selectedTopics.includes(topic.id) ? 'bg-brand-pink text-white' : 'bg-white text-slate-400'
                                        }`}>
                                        <Icon name="tag" />
                                    </div>
                                    <span className={`text-base font-semibold ${selectedTopics.includes(topic.id) ? 'text-slate-900' : 'text-slate-600'
                                        }`}>
                                        {topic.name}
                                    </span>
                                    {selectedTopics.includes(topic.id) && (
                                        <Icon name="check_circle" className="ml-auto text-brand-pink" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 z-50 flex flex-col gap-4">
                <Button
                    fullWidth
                    className="relative flex h-16 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl border-none hover:bg-white dark:hover:bg-slate-900"
                    onClick={handleNext}
                    disabled={selectedTopics.length === 0}
                >
                    <span className={`text-xl font-bold mr-2 ${selectedTopics.length === 0 ? 'text-slate-400' : 'gradient-text'}`}>
                        Continue
                    </span>
                    <Icon name="arrow_forward" className={selectedTopics.length === 0 ? 'text-slate-400' : 'text-brand-pink'} />
                </Button>

                <button
                    onClick={handleSkip}
                    className="text-slate-400 font-semibold text-lg hover:text-slate-600 transition-colors py-2"
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
};

export default TopicsSelectionPage;
