
import React from 'react';
import { Icon } from '../../ui/Icons';

interface StoryActionsProps {
    className?: string;
}

export const StoryActions: React.FC<StoryActionsProps> = ({ className = '' }) => {
    return (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pointer-events-none ${className}`}>
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
    );
};
