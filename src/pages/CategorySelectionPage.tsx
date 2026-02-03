import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icons';
import { CategoryCard } from '../components/features/CategoryCard';
import { useCategoriesQuery } from '../hooks/useCategories';
import type { DbCategory } from '../types/database';

// Category images mapping (slug -> image)
import techImg from '../assets/tech.png';
import fashionImg from '../assets/fashion.png';
import financeImg from '../assets/finance.png';
import travelImg from '../assets/Travel.png';
import designImg from '../assets/design.png';
import programmingImg from '../assets/programming.png';
import cybersecurityImg from '../assets/cybersecurity.png';
import marketingImg from '../assets/marketing.png';

const categoryImages: Record<string, string> = {
  technology: techImg,
  programming: programmingImg,
  design: designImg,
  fashion: fashionImg,
  marketing: marketingImg,
  'stocks-investing': financeImg,
  'business-startups': techImg,
  'personal-finance': financeImg,
  'health-fitness': travelImg,
  politics: cybersecurityImg,
};

const CategorySelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: categories, isLoading, isError, refetch } = useCategoriesQuery();

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // Transform DB category to UI format
  const transformCategory = (cat: DbCategory) => ({
    id: cat.id,
    label: cat.name,
    image: categoryImages[cat.slug],
  });

  const filteredCategories = (categories || [])
    .map(transformCategory)
    .filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()));


  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-white font-display overflow-hidden relative">
        <div className="p-8 space-y-2 pt-12 shrink-0">
          <div className="h-10 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-6 w-1/2 bg-slate-100 rounded-lg animate-pulse" />
        </div>
        <div className="px-6 py-4 flex-1">
          <div className="h-14 w-full bg-slate-100 rounded-2xl mb-8 animate-pulse" />
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-[2rem] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-screen bg-white font-display items-center justify-center p-8">
        <Icon name="error" className="text-red-400 text-6xl mb-4" />
        <h2 className="text-xl font-bold text-slate-700 mb-2">Failed to load categories</h2>
        <p className="text-slate-500 mb-6">Please check your connection and try again.</p>
        <Button onClick={() => refetch()} className="px-6 py-3 bg-brand-pink text-white rounded-xl">
          <Icon name="refresh" className="mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white font-display overflow-hidden relative">
      <div className="p-8 space-y-2 pt-12 shrink-0">
        <h1 className="text-4xl font-bold gradient-text">Discover Your Categories</h1>
        <p className="text-slate-500 font-medium text-lg">What interests make your heart race? ✨</p>
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
          {filteredCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.id)}
              onToggle={toggleCategory}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 z-50">
        <div className="relative">
          {selectedCategories.length > 0 && (
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-pink via-brand-purple to-brand-blue rounded-3xl blur opacity-75 transition duration-1000 animate-pulse-slow"></div>
          )}
          <Button
            fullWidth
            className="relative flex h-16 w-full items-center justify-center rounded-2xl bg-white dark:bg-slate-900 transition-all duration-200 active:scale-95 shadow-xl border-none hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl disabled:opacity-50 disabled:shadow-none disabled:ring-1 disabled:ring-slate-200"
            disabled={selectedCategories.length === 0}
            onClick={() => navigate('/topics', { state: { categoryIds: selectedCategories } })}
          >
            <span className={`text-xl font-bold mr-2 ${selectedCategories.length === 0 ? 'text-slate-400' : 'gradient-text'}`}>
              Let's Go!
            </span>
            <Icon
              name="rocket_launch"
              className={selectedCategories.length === 0 ? 'text-slate-400' : 'text-brand-pink'}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionPage;
