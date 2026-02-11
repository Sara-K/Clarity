
import React from 'react';
import { Icon } from '../../ui/Icons';

interface StorySummaryProps {
    tldr: string;
    className?: string;
}

export const StorySummary: React.FC<StorySummaryProps> = ({ tldr, className = '' }) => {
    return (
        <div className={`bg-slate-50 rounded-[2.5rem] p-8 mb-8 relative overflow-hidden group ${className}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full -translate-y-16 translate-x-16 blur-2xl" />

            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-pink">
                    <Icon name="bolt" className="text-xl" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-pink">What happened</span>
            </div>

            <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {tldr}
            </p>
        </div>
    );
};
