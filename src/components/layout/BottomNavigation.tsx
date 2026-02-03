import React from 'react';
import { Icon } from '../ui/Icons';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNavigation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { id: 'home', icon: 'home', label: 'Home', path: '/feed' },
        { id: 'explore', icon: 'explore', label: 'Explore', path: '/' },
        { id: 'vault', icon: 'folder_special', label: 'Vault', path: '/vault' },
        { id: 'profile', icon: 'person', label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pb-8 pt-4 flex justify-between items-center z-50">
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                    <button
                        key={tab.id}
                        onClick={() => navigate(tab.path)}
                        className="flex flex-col items-center gap-1 w-16"
                    >
                        {isActive ? (
                            <div className="w-12 h-8 rounded-full bg-brand-pink/10 flex items-center justify-center mb-1">
                                <Icon name={tab.icon} className="text-brand-pink text-[1.5rem]" />
                            </div>
                        ) : (
                            <Icon name={tab.icon} className="text-slate-400 text-[1.5rem] mb-1" />
                        )}
                        <span className={`text-[0.65rem] font-bold tracking-wide ${isActive ? 'text-brand-pink' : 'text-slate-400'}`}>
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
