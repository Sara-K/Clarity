import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '../components/ui/Icons';

export const StoryBriefPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-white font-display overflow-y-auto hide-scrollbar pb-32">
            {/* Header */}
            <div className="px-6 pt-12 pb-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 active:scale-95 transition-transform"
                >
                    <Icon name="arrow_back_ios_new" className="text-lg translate-x-[-1px]" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand-pink flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-pink/20">
                        C
                    </div>
                    <span className="font-black font-fun uppercase tracking-tighter text-slate-400">Clarity</span>
                </div>
                <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm border border-slate-100 active:scale-95 transition-transform">
                    <Icon name="bookmark" className="text-xl" />
                </button>
            </div>

            {/* Content Container */}
            <div className="px-6 py-4">
                {/* Meta Tags */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-brand-pink/10 text-brand-pink text-[10px] font-black uppercase tracking-widest rounded-md">
                        Tech & AI
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-md">
                        12 min read
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-md">
                        8 sources
                    </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl font-black text-slate-900 leading-[1.1] mb-8 serif">
                    The AI Revolution: How Generative Models are Redefining Creativity
                </h1>

                {/* What Happened Section */}
                <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full -translate-y-16 translate-x-16 blur-2xl" />

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-brand-pink">
                            <Icon name="bolt" className="text-xl" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-brand-pink">What happened</span>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                        A major breakthrough in neural network architecture was announced today, allowing AI to process and generate highly complex creative works with <span className="text-brand-pink font-bold underline decoration-brand-pink/30 decoration-4 underline-offset-4 pointer-events-none px-1">90% more efficiency</span> than previous models.
                    </p>
                </div>

                {/* Key Takeaways */}
                <div className="space-y-8 mb-12">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Key Takeaways</h2>

                    <div className="space-y-10 px-2">
                        {/* Takeaway 1 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-xl shadow-amber-100/50">
                                <Icon name="speed" className="text-3xl" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-bold text-slate-800">Blazing Fast Processing</h3>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-sm text-slate-500 leading-tight">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Speeds increased by 10x, enabling real-time generation on standard mobile devices.</span>
                                    </li>
                                    <li className="flex gap-2 text-sm text-slate-500 leading-tight">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Latency reduction allows for seamless interactive design sessions without cloud delay.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Takeaway 2 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-100/50">
                                <Icon name="verified_user" className="text-3xl" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-bold text-slate-800">Ethical Guardrails</h3>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-sm text-slate-500 leading-tight">
                                        <span className="text-indigo-500 mt-1">•</span>
                                        <span>New protocols ensure that generated content respects artistic copyright patterns automatically.</span>
                                    </li>
                                    <li className="flex gap-2 text-sm text-slate-500 leading-tight">
                                        <span className="text-indigo-500 mt-1">•</span>
                                        <span>Embedded digital watermarking identifies AI involvement at the metadata level.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Takeaway 3 */}
                        <div className="flex gap-6">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-xl shadow-emerald-100/50">
                                <Icon name="eco" className="text-3xl" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-bold text-slate-800">Eco-Friendly Computing</h3>
                                <ul className="space-y-2">
                                    <li className="flex gap-2 text-sm text-slate-500 leading-tight">
                                        <span className="text-emerald-500 mt-1">•</span>
                                        <span>The new model uses 40% less energy, making "Green AI" a reality for mainstream consumers.</span>
                                    </li>
                                    <li className="flex gap-2 text-sm text-slate-500 leading-tight">
                                        <span className="text-emerald-500 mt-1">•</span>
                                        <span>Carbon-neutral training cycles validated by third-party environmental auditors.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Evidence & Quotes */}
                <div className="space-y-6 mb-12">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Evidence & Quotes</h2>

                    {/* Quote Card 1 */}
                    <div className="bg-blue-50/50 rounded-[2rem] p-8 border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-6 right-8 text-blue-200 opacity-50">
                            <Icon name="format_quote" className="text-6xl" />
                        </div>
                        <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-6">
                            Key Insight
                        </span>
                        <p className="text-slate-700 font-medium italic mb-8 serif text-lg leading-relaxed relative z-10">
                            "This isn't just an incremental step; it's a leapfrog over the entire landscape of generative computing. We've fundamentally solved the latency problem that plagued creators for years."
                        </p>
                        <div className="flex items-center justify-between gap-4 pt-6 border-t border-blue-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 flex-shrink-0">
                                    <Icon name="biotech" className="text-xl" />
                                </div>
                                <div className="leading-tight">
                                    <p className="text-sm font-bold text-slate-800">DR. ELENA RODRIGUEZ</p>
                                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Chief Scientist @ TechPulse</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-white px-3 py-2 rounded-lg border border-blue-100 shadow-sm whitespace-nowrap">
                                Source <Icon name="launch" className="text-xs" />
                            </button>
                        </div>
                    </div>

                    {/* Market Data Card */}
                    <div className="bg-purple-50/50 rounded-[2rem] p-8 border border-purple-100 relative overflow-hidden">
                        <div className="absolute top-6 right-8 text-purple-200 opacity-50">
                            <Icon name="bar_chart" className="text-6xl" />
                        </div>
                        <span className="inline-block px-3 py-1 bg-purple-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg mb-6">
                            Market Data
                        </span>
                        <p className="text-slate-700 font-medium italic mb-8 serif text-lg leading-relaxed relative z-10">
                            "Initial tests show energy consumption levels dropping by nearly half. This addresses the single biggest criticism of large-scale AI deployment and changes the ROI for startups."
                        </p>
                        <div className="flex items-center justify-between gap-4 pt-6 border-t border-purple-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm border border-purple-100 flex-shrink-0">
                                    <Icon name="monitoring" className="text-xl" />
                                </div>
                                <div className="leading-tight">
                                    <p className="text-sm font-bold text-slate-800">GREENSCALE ANALYTICS</p>
                                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Q4 Sustainability Report</p>
                                </div>
                            </div>
                            <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-purple-600 bg-white px-3 py-2 rounded-lg border border-purple-100 shadow-sm whitespace-nowrap">
                                Report <Icon name="launch" className="text-xs" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pointer-events-none">
                <div className="flex gap-3 pointer-events-auto">
                    <button className="flex-1 h-16 bg-gradient-to-r from-brand-pink to-brand-purple rounded-3xl flex items-center justify-center gap-3 text-white font-bold shadow-2xl shadow-brand-pink/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Icon name="favorite" className="text-xl" />
                        <span>Love this</span>
                    </button>
                    <button className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all shadow-xl shadow-slate-200/50">
                        <Icon name="share" className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Bottom Spacer for Mobile */}
            <div className="h-10" />
        </div>
    );
};

export default StoryBriefPage;
