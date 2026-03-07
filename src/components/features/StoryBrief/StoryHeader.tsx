
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../ui/Icons';
import type { NewsArticle } from '../../../types/news';
import { useVaultStore } from '../../../store/useVaultStore';

interface StoryHeaderProps {
    article?: NewsArticle;
    className?: string;
}

export const StoryHeader: React.FC<StoryHeaderProps> = ({ article, className = '' }) => {
    const navigate = useNavigate();
    const toggleSaved = useVaultStore((state) => state.toggleSaved);
    const isSaved = useVaultStore((state) => (article ? state.isSaved(article.id) : false));

    return (
        <div className={`px-6 pt-12 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20 ${className}`}>
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
            <button
                onClick={() => article && toggleSaved(article)}
                disabled={!article}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border active:scale-95 transition-transform disabled:opacity-40 ${isSaved
                    ? 'bg-brand-pink/10 text-brand-pink border-brand-pink/20'
                    : 'bg-slate-50 text-slate-600 border-slate-100'
                    }`}
                title={isSaved ? 'Remove from Vault' : 'Save to Vault'}
            >
                <Icon name={isSaved ? 'bookmark_added' : 'bookmark'} className="text-xl" />
            </button>
        </div>
    );
};
