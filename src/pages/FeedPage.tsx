import React from 'react';
import { FeedCard } from '../components/features/FeedCard';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { FeedCardProps } from '../components/features/FeedCard/FeedCard.types';
import { Icon } from '../components/ui/Icons';

// Mock Data
const MOCK_FEED: FeedCardProps[] = [
    {
        id: '1',
        tag: 'Tech & AI',
        tagColor: 'bg-pink-100 text-pink-600',
        timeAgo: '4 mins ago',
        title: 'The Rise of Generative Video: Hollywood’s New Frontier',
        summary: 'AI-driven video tools are reducing production costs by 40%. Major studios are already testing pilot programs for background generation.',
        likes: 124
    },
    {
        id: '2',
        tag: 'Sustainable Fashion',
        tagColor: 'bg-blue-100 text-blue-600',
        timeAgo: '12 mins ago',
        title: 'Biodegradable Sneakers: The Future of Streetwear?',
        summary: 'A new startup has launched shoes made entirely from mushroom leather that decompose in 6 months when composted.',
        likes: 89
    },
    {
        id: '3',
        tag: 'Space Travel',
        tagColor: 'bg-purple-100 text-purple-600',
        timeAgo: '1 hour ago',
        title: 'Mars Colonization: Challenges of the First Decade',
        summary: 'NASA and SpaceX release joint report on the critical life-support systems needed for the first 100 settlers on Mars.',
        likes: 342
    }
];

const FeedPage: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-white font-display overflow-hidden relative pb-24">
            <div className="px-6 pt-12 pb-4 flex justify-between items-center bg-white z-10 sticky top-0">
                <div>
                    <h1 className="text-4xl font-black font-fun tracking-tight uppercase gradient-text">Clarity feed</h1>
                    <p className="text-slate-400 text-sm font-medium flex items-center gap-1">
                        <span className="text-xl leading-none block pb-1">✨</span> Your AI-curated digest
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-pink to-brand-blue p-[2px]">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <Icon name="ar_on_you" className="text-brand-pink text-[1.5rem]" />
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-4 hide-scrollbar">
                {MOCK_FEED.map((item) => (
                    <FeedCard key={item.id} {...item} />
                ))}
            </div>
            <BottomNavigation />
        </div>
    );
};

export default FeedPage;
