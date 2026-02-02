import React from 'react';
import { Icon } from '../../ui/Icons';
import { CategoryCardProps } from './CategoryCard.types';

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onToggle }) => {
    return (
        <div
            onClick={() => onToggle(category.id)}
            className={`relative aspect-square rounded-[2rem] overflow-hidden shadow-lg group active:scale-95 transition-all duration-300 cursor-pointer ${isSelected ? 'ring-4 ring-brand-pink ring-offset-2 dark:ring-offset-slate-950' : ''
                }`}
        >
            {category.image ? (
                <img
                    src={category.image}
                    alt={category.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            ) : (
                <div className={`absolute inset-0 ${category.color || 'bg-brand-blue'}`}></div>
            )}
            <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? 'from-brand-pink/80 via-brand-pink/20' : (category.gradient || 'from-black/60 via-black/20')} to-transparent`}></div>
            <div className="absolute top-3 right-3">
                {isSelected ? (
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <Icon name="check" className="text-brand-pink text-sm font-bold" />
                    </div>
                ) : (
                    <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Icon name="add" className="text-white text-sm" />
                    </div>
                )}
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
                <h3 className="text-lg font-fun text-white leading-tight uppercase tracking-wider">{category.label}</h3>
            </div>
        </div>
    );
};
