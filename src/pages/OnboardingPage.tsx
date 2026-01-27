import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';

type Topic = {
  id: string;
  label: string;
};

const TOPICS: Topic[] = [
  { id: 'tech', label: 'Tech' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'finance', label: 'Finance' },
  { id: 'design', label: 'Design' },
  { id: 'global', label: 'Global' },
  { id: 'gaming', label: 'Gaming' },
];

const OnboardingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-white font-display overflow-hidden relative">
      <div className="p-8 space-y-2 pt-12">
        <h1 className="text-4xl font-bold gradient-text">Discover Your Topics</h1>
        <p className="text-slate-500 font-medium text-lg">What stories make your heart race? ✨</p>
      </div>
      <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-32">
        <div className="relative mb-8">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-slate-50 border-none rounded-2xl pl-12 pr-4 text-slate-700 font-medium focus:ring-2 focus:ring-brand-pink outline-none transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ul>
            {TOPICS.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase())).map(topic => (
              <li key={topic.id}>
                {topic.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-pink via-brand-purple to-brand-blue rounded-3xl blur opacity-75 transition duration-1000 animate-pulse-slow"></div>
          <Button
            fullWidth
            className="relative flex h-16 w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl border-none hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl"
          >
            <span className="text-xl font-bold gradient-text mr-2">Let's Go!</span>
            <Icon name="rocket_launch" className="text-brand-pink transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
