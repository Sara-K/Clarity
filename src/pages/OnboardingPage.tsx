import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';
import { TopicCard } from '../components/features/TopicCard';
import { Topic } from '../components/features/TopicCard/TopicCard.types';

// Topic Images
import techImg from '../assets/tech.png';
import fashionImg from '../assets/fashion.png';
import financeImg from '../assets/finance.png';
import travelImg from '../assets/Travel.png';
import designImg from '../assets/design.png';
import programmingImg from '../assets/programming.png';
import cybersecurityImg from '../assets/cybersecurity.png';
import marketingImg from '../assets/marketing.png';

const TOPICS: Topic[] = [
  { id: 'tech', label: 'Tech', image: techImg },
  { id: 'fashion', label: 'Fashion', image: fashionImg },
  { id: 'marketing', label: 'Marketing', image: marketingImg },
  { id: 'finance', label: 'Finance', image: financeImg },
  { id: 'design', label: 'Design', image: designImg },
  { id: 'programming', label: 'Programming', image: programmingImg },
  { id: 'cybersecurity', label: 'Cybersecurity', image: cybersecurityImg },
  { id: 'travel', label: 'Travel', image: travelImg },
];

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (id: string) => {
    setSelectedTopics(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const filteredTopics = TOPICS.filter(t =>
    t.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-white font-display overflow-hidden relative">
      <div className="p-8 space-y-2 pt-12 shrink-0">
        <h1 className="text-4xl font-bold gradient-text">Discover Your Topics</h1>
        <p className="text-slate-500 font-medium text-lg">What stories make your heart race? ✨</p>
      </div>
      <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-40">
        <div className="relative mb-8">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 bg-slate-50 border-none rounded-2xl pl-12 pr-4 text-slate-700 font-medium focus:ring-2 focus:ring-brand-pink outline-none transition-all shadow-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredTopics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isSelected={selectedTopics.includes(topic.id)}
              onToggle={toggleTopic}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 z-50">
        <div className="relative">
          {selectedTopics.length > 0 && (
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-pink via-brand-purple to-brand-blue rounded-3xl blur opacity-75 transition duration-1000 animate-pulse-slow"></div>
          )}
          <Button
            fullWidth
            className="relative flex h-16 w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl border-none hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl disabled:opacity-50 disabled:shadow-none disabled:ring-1 disabled:ring-slate-200"
            disabled={selectedTopics.length === 0}
            onClick={() => navigate('/categories')}
          >
            <span className={`text-xl font-bold mr-2 ${selectedTopics.length === 0 ? 'text-slate-400' : 'gradient-text'}`}>
              Let's Go!
            </span>
            <Icon
              name="rocket_launch"
              className={selectedTopics.length === 0 ? 'text-slate-400' : 'text-brand-pink'}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
