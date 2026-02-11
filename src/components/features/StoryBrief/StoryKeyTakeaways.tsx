
import React from 'react';
import { Icon } from '../../ui/Icons';

interface StoryKeyTakeawaysProps {
    takeaways: string[];
    className?: string;
}

export const StoryKeyTakeaways: React.FC<StoryKeyTakeawaysProps> = ({ takeaways, className = '' }) => {
    return (
        <div className={`space-y-8 mb-12 ${className}`}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Key Takeaways</h2>

            <div className="space-y-10 px-2">
                {takeaways.map((takeaway, index) => (
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
    );
};
