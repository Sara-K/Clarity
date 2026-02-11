
import React from 'react';

interface TagProps {
    children: React.ReactNode;
    color?: 'pink' | 'slate' | 'blue' | 'purple' | 'amber' | 'emerald' | 'indigo';
    className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, color = 'slate', className = '' }) => {
    const colorStyles = {
        pink: 'bg-brand-pink/10 text-brand-pink',
        slate: 'bg-slate-100 text-slate-500',
        blue: 'bg-blue-600 text-white',
        purple: 'bg-purple-600 text-white',
        amber: 'bg-amber-100 text-amber-600',
        emerald: 'bg-emerald-100 text-emerald-600',
        indigo: 'bg-indigo-100 text-indigo-600',
    };

    return (
        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md ${colorStyles[color]} ${className}`}>
            {children}
        </span>
    );
};
