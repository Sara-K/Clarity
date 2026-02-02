import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';

const CategorySelectionPage: React.FC = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        console.log('Next clicked');
    };

    const handleSkip = () => {
        console.log('Skip clicked');
    };

    return (
        <div className="flex flex-col h-screen bg-white font-display overflow-hidden relative">
            <div className="p-8 space-y-2 pt-12 shrink-0">
                <h1 className="text-4xl font-bold gradient-text">Refine Your Interests</h1>
                <p className="text-slate-500 font-medium text-lg">Select specific categories or skip for now. ✨</p>
            </div>

            <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon name="category" className="text-4xl text-slate-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-800">Cagetory Selection Placeholder</h2>
                    <p className="text-slate-500 max-w-xs mx-auto">
                        This is where you'll be able to pick more specific sub-topics based on your interests.
                    </p>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 z-50 flex flex-col gap-4">
                <Button
                    fullWidth
                    className="relative flex h-16 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl border-none hover:bg-white dark:hover:bg-slate-900"
                    onClick={handleNext}
                >
                    <span className="text-xl font-bold mr-2 gradient-text">Continue</span>
                    <Icon name="arrow_forward" className="text-brand-pink" />
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

export default CategorySelectionPage;
