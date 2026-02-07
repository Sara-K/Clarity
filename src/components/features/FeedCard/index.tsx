import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../ui/Icons';
import { FeedCardProps } from './FeedCard.types';

export const FeedCard: React.FC<FeedCardProps> = ({
    tag,
    tagColor = 'bg-brand-pink/20 text-brand-pink',
    article,
}) => {
    const { id, title, url, source, publishedAt, imageUrl } = article;
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 mb-6">
            <div className="flex justify-between items-start mb-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${tagColor}`}>
                    {tag}
                </span>
                <span className="text-slate-400 text-xs font-medium">{publishedAt}</span>
            </div>
            <h2
                onClick={() => navigate(`/storybrief/${id}`)}
                className="text-2xl font-display font-bold text-slate-900 leading-tight mb-6 cursor-pointer hover:text-brand-pink transition-colors active:scale-[0.99]"
            >
                {title}
            </h2>
            <div className="bg-slate-50 rounded-2xl p-5 mb-6">
                <div className="flex items-center mb-3">
                    <Icon name="bolt" className="text-brand-pink mr-2 text-sm" />
                    <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">TLDR</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                    Summary coming soon... {source}
                </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-brand-pink transition-colors">
                        <Icon name="favorite" className="text-2xl" />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <Icon name="heart_broken" className="text-2xl" />
                    </button>
                </div>
                <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-brand-blue transition-colors">
                        <Icon name="bookmark" className="text-2xl" />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <Icon name="ios_share" className="text-2xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};
