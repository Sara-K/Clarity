
import React from 'react';
import { Icon } from '../../ui/Icons';

interface Quote {
    quote: string;
    context: string;
    url: string;
}

interface StoryQuotesProps {
    quotes: Quote[];
    className?: string;
}

export const StoryQuotes: React.FC<StoryQuotesProps> = ({ quotes, className = '' }) => {
    return (
        <div className={`space-y-6 mb-12 ${className}`}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Evidence & Quotes</h2>

            {quotes.map((quoteItem, index) => (
                <div key={index} className={`rounded-[2rem] p-8 border relative overflow-hidden ${index % 2 === 0 ? 'bg-blue-50/50 border-blue-100' : 'bg-purple-50/50 border-purple-100'
                    }`}>
                    <div className={`absolute top-6 right-8 opacity-50 ${index % 2 === 0 ? 'text-blue-200' : 'text-purple-200'
                        }`}>
                        <Icon name="format_quote" className="text-6xl" />
                    </div>
                    <span className={`inline-block px-3 py-1 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-6 ${index % 2 === 0 ? 'bg-blue-600' : 'bg-purple-600'
                        }`}>
                        {quoteItem.context || 'Key Insight'}
                    </span>
                    <p className="text-slate-700 font-medium italic mb-8 serif text-lg leading-relaxed relative z-10">
                        "{quoteItem.quote}"
                    </p>
                    <div className={`flex items-center justify-between gap-4 pt-6 border-t ${index % 2 === 0 ? 'border-blue-100' : 'border-purple-100'
                        }`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border flex-shrink-0 ${index % 2 === 0 ? 'text-blue-600 border-blue-100' : 'text-purple-600 border-purple-100'
                                }`}>
                                <Icon name="biotech" className="text-xl" />
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-bold text-slate-800">Source</p>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider truncate max-w-[100px]">{new URL(quoteItem.url).hostname}</p>
                            </div>
                        </div>
                        <a
                            href={quoteItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-white px-3 py-2 rounded-lg border shadow-sm whitespace-nowrap hover:opacity-80 transition-opacity ${index % 2 === 0 ? 'text-blue-600 border-blue-100' : 'text-purple-600 border-purple-100'
                                }`}
                        >
                            Open Source <Icon name="launch" className="text-xs" />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};
