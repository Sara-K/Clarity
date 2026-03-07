import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Temporal } from '@js-temporal/polyfill';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { Icon } from '../components/ui/Icons';
import { StatusDisplay } from '../components/ui/StatusDisplay';
import { useVaultStore } from '../store/useVaultStore';

const VaultPage: React.FC = () => {
    const navigate = useNavigate();
    const savedArticles = useVaultStore((state) => state.savedArticles);
    const removeArticle = useVaultStore((state) => state.removeArticle);
    const clearVault = useVaultStore((state) => state.clearVault);

    const formatSavedTime = (savedAt: string): string => {
        try {
            const savedInstant = Temporal.Instant.from(savedAt);
            const now = Temporal.Now.instant();
            const savedZdt = savedInstant.toZonedDateTimeISO(Temporal.Now.timeZoneId());
            const nowZdt = now.toZonedDateTimeISO(Temporal.Now.timeZoneId());
            const duration = nowZdt.since(savedZdt, { largestUnit: 'day' });

            if (duration.days > 0) return `${duration.days}d ago`;
            if (duration.hours > 0) return `${duration.hours}h ago`;
            if (duration.minutes > 0) return `${duration.minutes}m ago`;
            return 'Just now';
        } catch {
            return '';
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 font-display overflow-hidden relative pb-24">
            <div className="px-6 pt-12 pb-4 flex justify-between items-center bg-white z-10 sticky top-0 shadow-sm">
                <div>
                    <h1 className="text-3xl font-black font-fun tracking-tight uppercase gradient-text">
                        Vault
                    </h1>
                    <p className="text-slate-400 text-sm font-medium">
                        {savedArticles.length} saved article{savedArticles.length === 1 ? '' : 's'}
                    </p>
                </div>

                <button
                    onClick={() => clearVault()}
                    disabled={savedArticles.length === 0}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all disabled:opacity-30"
                    title="Clear saved articles"
                >
                    <Icon name="delete_sweep" className="text-xl" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
                {savedArticles.length === 0 ? (
                    <StatusDisplay
                        variant="empty"
                        title="Vault is empty"
                        message="Save articles from Story Brief to keep them here."
                        action={{
                            label: "Go to Feed",
                            onClick: () => navigate('/feed'),
                            icon: "arrow_forward",
                        }}
                    />
                ) : (
                    <div className="space-y-4">
                        {savedArticles.map((article) => (
                            <div key={article.id} className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                                            Saved {formatSavedTime(article.savedAt)}
                                        </p>
                                        <p className="text-sm text-slate-500 font-medium">{article.source}</p>
                                    </div>
                                    <button
                                        onClick={() => removeArticle(article.id)}
                                        className="text-slate-400 hover:text-red-500 transition-colors"
                                        title="Remove from vault"
                                    >
                                        <Icon name="bookmark_remove" className="text-xl" />
                                    </button>
                                </div>

                                <h2
                                    onClick={() => navigate(`/storybrief/${article.id}`, { state: { article } })}
                                    className="text-xl font-bold leading-tight text-slate-900 cursor-pointer hover:text-brand-pink transition-colors"
                                >
                                    {article.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <BottomNavigation />
        </div>
    );
};

export default VaultPage;
