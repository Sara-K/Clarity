import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { NewsResponse } from '../types/news';
import { Icon } from '../components/ui/Icons';
import { useArticleSummary } from '../hooks/useArticleSummary';
import { useLatestNews } from '../hooks/useLatestNews';

export const StoryBriefPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();

    // Strategy 1: Get from navigation state (Top priority - fastest)
    const stateArticle = location.state?.article;

    // Strategy 2: Content cache lookup (If persistent navigation failed)
    const cachedArticle = React.useMemo(() => {
        if (stateArticle) return stateArticle;

        // Search through all cached news queries
        const queries = queryClient.getQueriesData<NewsResponse>({ queryKey: ['news'] });
        for (const [_, data] of queries) {
            const found = data?.items?.find(item => item.id === id);
            if (found) return found;
        }
        return null;
    }, [id, stateArticle, queryClient]);

    // Strategy 3: Fallback fetch (Only if absolutely necessary)
    const { data: newsData, isLoading: isSearching } = useLatestNews({
        limit: 100,
        sinceHours: 48, // Look back further
        categoryIds: [],
        topicIds: [],
    });

    const article = stateArticle || cachedArticle || newsData?.items.find(item => item.id === id);

    const { data: summary, isLoading: isSummarizing, isError } = useArticleSummary({
        url: article?.url,
        title: article?.title,
    });

    if (!article && !isSearching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
                <Icon name="sentiment_dissatisfied" className="text-6xl text-slate-300 mb-4" />
                <h2 className="text-xl font-bold text-slate-700 mb-2">Article not found</h2>
                <p className="text-slate-500 mb-8 max-w-md">
                    We couldn't locate the article details. It might be too old or unavailable.
                </p>
                <button
                    onClick={() => navigate('/feed')}
                    className="px-6 py-3 bg-brand-pink text-white font-bold rounded-xl shadow-lg shadow-brand-pink/30 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    Back to Feed
                </button>
            </div>
        );
    }


    return (
        <div className="flex flex-col min-h-screen bg-white font-display overflow-y-auto hide-scrollbar pb-32">
            {/* Header */}
            <div className="px-6 pt-12 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 active:scale-95 transition-transform"
                >
                    <Icon name="arrow_back_ios_new" className="text-lg translate-x-[-1px]" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-pink flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-pink/20">
                        C
                    </div>
                    <span className="font-black font-fun uppercase tracking-tighter text-slate-400">Clarity</span>
                </div>
                <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 active:scale-95 transition-transform">
                    <Icon name="bookmark" className="text-xl" />
                </button>
            </div>

            {/* Content Container */}
            <div className="px-6 py-4">
                {/* Meta Tags */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-brand-pink/10 text-brand-pink text-[10px] font-black uppercase tracking-widest rounded-md">
                        Tech & AI
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-md">
                        12 min read
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-md">
                        8 sources
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl font-black text-slate-900 leading-[1.1] mb-8 serif">
                    {article.title}
                </h1>

                {/* Loading State */}
                {(isSummarizing || isSearching) && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-brand-pink border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-500 font-medium">Generating AI Summary...</p>
                    </div>
                )}

                {/* Error State */}
                {isError && (
                    <div className="bg-red-50 rounded-[2rem] p-8 mb-8 text-center text-red-600">
                        <Icon name="error" className="text-4xl mb-2" />
                        <p className="font-bold">Failed to generate summary</p>
                        <p className="text-sm mt-2">Please try again later.</p>
                    </div>
                )}

                {/* Content */}
                {summary && (
                    <>
                        {/* What Happened Section */}
                        <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full -translate-y-16 translate-x-16 blur-2xl" />

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-pink">
                                    <Icon name="bolt" className="text-xl" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-brand-pink">What happened</span>
                            </div>

                            <p className="text-slate-600 leading-relaxed text-lg font-medium">
                                {summary.tldr}
                            </p>
                        </div>

                        {/* Key Takeaways */}
                        <div className="space-y-8 mb-12">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Key Takeaways</h2>

                            <div className="space-y-10 px-2">
                                {summary.key_takeaways.map((takeaway, index) => (
                                    <div key={index} className="flex gap-6">
                                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${index % 3 === 0 ? 'bg-amber-100 text-amber-600 shadow-amber-100/50' :
                                            index % 3 === 1 ? 'bg-indigo-100 text-indigo-600 shadow-indigo-100/50' :
                                                'bg-emerald-100 text-emerald-600 shadow-emerald-100/50'
                                            }`}>
                                            <Icon name={
                                                index % 3 === 0 ? 'speed' :
                                                    index % 3 === 1 ? 'verified_user' : 'eco'
                                            } className="text-3xl" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="font-bold text-slate-800 leading-tight">{takeaway}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Evidence & Quotes */}
                        <div className="space-y-6 mb-12">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Evidence & Quotes</h2>

                            {summary.quotes.map((quoteItem, index) => (
                                <div key={index} className={`rounded-[2rem] p-8 border relative overflow-hidden ${index % 2 === 0 ? 'bg-blue-50/50 border-blue-100' : 'bg-purple-50/50 border-purple-100'
                                    }`}>
                                    <div className={`absolute top-6 right-8 opacity-50 ${index % 2 === 0 ? 'text-blue-200' : 'text-purple-200'
                                        }`}>
                                        <Icon name="format_quote" className="text-6xl" />
                                    </div>
                                    <span className={`inline-block px-3 py-1 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-6 ${index % 2 === 0 ? 'bg-blue-600' : 'bg-purple-600'
                                        }`}>
                                        {quoteItem.context || 'Key Insight'}
                                    </span>
                                    <p className="text-slate-700 font-medium italic mb-8 serif text-lg leading-relaxed relative z-10">
                                        "{quoteItem.quote}"
                                    </p>
                                    <div className={`flex items-center justify-between gap-4 pt-6 border-t ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border flex-shrink-0 ${index % 2 === 0 ? 'text-blue-600 border-blue-100' : 'text-purple-600 border-purple-100'
                                                }`}>
                                                <Icon name="biotech" className="text-xl" />
                                            </div>
                                            <div className="leading-tight">
                                                <p className="text-sm font-bold text-slate-800">Source</p>
                                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider truncate max-w-[100px]">{new URL(quoteItem.url).hostname}</p>
                                            </div>
                                        </div>
                                        <a
                                            href={quoteItem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-white px-3 py-2 rounded-lg border shadow-sm whitespace-nowrap hover:opacity-80 transition-opacity ${index % 2 === 0 ? 'text-blue-600 border-blue-100' : 'text-purple-600 border-purple-100'
                                                }`}
                                        >
                                            Open Source <Icon name="launch" className="text-xs" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pointer-events-none">
                <div className="flex gap-3 pointer-events-auto">
                    <button className="flex-1 h-16 bg-gradient-to-r from-brand-pink to-brand-purple rounded-3xl flex items-center justify-center gap-3 text-white font-bold shadow-2xl shadow-brand-pink/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Icon name="favorite" className="text-xl" />
                        <span>Love this</span>
                    </button>
                    <button className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all shadow-xl shadow-slate-200/50">
                        <Icon name="share" className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Bottom Spacer for Mobile */}
            <div className="h-10" />
        </div>
    );
};

export default StoryBriefPage;
