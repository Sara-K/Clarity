import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';

interface Topic {
    id: string;
    label: string;
    icon: string;
}

const TOPICS: Topic[] = [
    { id: 'ai', label: 'Artificial Intelligence', icon: 'psychology' },
    { id: 'mobile', label: 'Mobile Development', icon: 'smartphone' },
    { id: 'web', label: 'Web Development', icon: 'language' },
    { id: 'design', label: 'UI/UX Design', icon: 'palette' },
    { id: 'backend', label: 'Backend Systems', icon: 'dns' },
    { id: 'devops', label: 'Cloud & DevOps', icon: 'cloud_done' },
    { id: 'data', label: 'Data Science', icon: 'analytics' },
    { id: 'security', label: 'Cybersecurity', icon: 'security' },
];

const TopicsSelectionPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const toggleTopic = (id: string) => {
        setSelectedTopics(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const handleNext = () => {
        console.log('Selected topics:', selectedTopics);
    };

    const handleSkip = () => {
        console.log('Skip clicked');
    };

    return (
        <div className="flex flex-col h-screen bg-white font-display overflow-hidden relative">
            <div className="p-8 space-y-2 pt-12 shrink-0">
                <h1 className="text-4xl font-bold gradient-text">Refine Your Interests</h1>
                <p className="text-slate-500 font-medium text-lg">Select specific topics or skip for now. ✨</p>
            </div>

            <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-40">
                <div className="grid grid-cols-1 gap-4 mt-4">
                    {TOPICS.map((topic) => (
                        <button
                            key={topic.id}
                            onClick={() => toggleTopic(topic.id)}
                            className={`flex items-center p-4 rounded-2xl border-2 transition-all duration-200 ${selectedTopics.includes(topic.id)
                                ? 'border-brand-pink bg-brand-pink/5 shadow-md'
                                : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${selectedTopics.includes(topic.id) ? 'bg-brand-pink text-white' : 'bg-white text-slate-400'
                                }`}>
                                <Icon name={topic.icon} />
                            </div>
                            <span className={`text-lg font-semibold ${selectedTopics.includes(topic.id) ? 'text-slate-900' : 'text-slate-600'
                                }`}>
                                {topic.label}
                            </span>
                            {selectedTopics.includes(topic.id) && (
                                <Icon name="check_circle" className="ml-auto text-brand-pink" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 z-50 flex flex-col gap-4">
                <Button
                    fullWidth
                    className="relative flex h-16 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl border-none hover:bg-white dark:hover:bg-slate-900"
                    onClick={handleNext}
                    disabled={selectedTopics.length === 0}
                >
                    <span className={`text-xl font-bold mr-2 ${selectedTopics.length === 0 ? 'text-slate-400' : 'gradient-text'}`}>
                        Continue
                    </span>
                    <Icon name="arrow_forward" className={selectedTopics.length === 0 ? 'text-slate-400' : 'text-brand-pink'} />
                </Button>

                <button
                    onClick={handleSkip}
                    className="text-slate-400 font-semibold text-lg hover:text-slate-600 transition-colors py-2"
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
};

export default TopicsSelectionPage;
