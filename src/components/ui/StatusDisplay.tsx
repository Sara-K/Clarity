
import React from 'react';
import { Icon } from './Icons';
import { Button } from './Button';

export type StatusVariant = 'error' | 'empty' | 'loading' | 'success';

interface StatusDisplayProps {
    variant?: StatusVariant;
    title: string;
    message?: string;
    icon?: string;
    action?: {
        label: string;
        onClick: () => void;
        icon?: string;
    };
    fullPage?: boolean;
    className?: string;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
    variant = 'empty',
    title,
    message,
    icon,
    action,
    fullPage = false,
    className = '',
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'error':
                return {
                    iconBg: 'bg-red-50 text-red-500',
                    iconDefault: 'error',
                };
            case 'success':
                return {
                    iconBg: 'bg-green-50 text-green-500',
                    iconDefault: 'check_circle',
                };
            case 'loading':
                return {
                    iconBg: 'bg-brand-pink/5 text-brand-pink',
                    iconDefault: 'sync',
                };
            case 'empty':
            default:
                return {
                    iconBg: 'bg-slate-50 text-slate-400',
                    iconDefault: 'sentiment_dissatisfied',
                };
        }
    };

    const styles = getVariantStyles();
    const displayIcon = icon || styles.iconDefault;

    const containerClasses = `
        flex flex-col items-center justify-center text-center p-8
        ${fullPage ? 'min-h-[60vh]' : ''}
        ${className}
    `.trim();

    return (
        <div className={containerClasses}>
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-slate-100 ${styles.iconBg}`}>
                <Icon
                    name={displayIcon}
                    className={`text-4xl ${variant === 'loading' ? 'animate-spin' : ''}`}
                />
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-2 font-fun uppercase tracking-tight">
                {title}
            </h3>

            {message && (
                <p className="text-slate-500 font-medium max-w-xs mb-8 leading-relaxed">
                    {message}
                </p>
            )}

            {action && (
                <Button
                    onClick={action.onClick}
                    className="group"
                >
                    <div className="flex items-center gap-2">
                        {action.icon && <Icon name={action.icon} className="group-hover:rotate-12 transition-transform" />}
                        <span>{action.label}</span>
                    </div>
                </Button>
            )}
        </div>
    );
};
