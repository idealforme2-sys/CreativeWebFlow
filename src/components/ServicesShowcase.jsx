import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlurFadeIn, MagneticButton, ParticlesBackground } from './UIComponents';
import {
    ArrowRight, Check, Sparkles, TrendingUp, Search,
    Code2, Cpu, MapPin, Zap, Shield, Gauge, Globe,
    Smartphone, BarChart3, Users, Lock, Layers
} from 'lucide-react';

const tabsData = [
    {
        id: 'web',
        icon: Code2,
        title: 'Web Development',
        subtitle: 'Design & Build',
        gradient: 'from-blue-600 to-cyan-500',
        textGradient: 'from-blue-400 to-cyan-300',
        neonColor: '#3b82f6',
        accentRgb: '59,130,246',
        headingLine1: 'Websites built to bring',
        headingLine2: 'more customers',
        description: 'Your website is your hardest working employee. We build fast, mobile-friendly sites that turn visitors into paying customers.',
        features: [
            'Professional, responsive design',
            'Perfect on every device',
            'Lightning-fast performance'
        ],
        stats: [
            { icon: TrendingUp, value: '+142%', label: 'Avg. Conversion Lift', color: 'text-emerald-400' },
            { icon: Gauge, value: '<1.5s', label: 'Load Time', color: 'text-blue-400' },
            { icon: Smartphone, value: '100%', label: 'Mobile Score', color: 'text-purple-400' },
        ],
        cards: [
            { icon: Layers, title: 'Component Architecture', desc: 'Modular, reusable design systems', metric: '40+ Components' },
            { icon: Gauge, title: 'Core Web Vitals', desc: 'Perfect Lighthouse scores', metric: '100/100' },
            { icon: Shield, title: 'Security First', desc: 'SSL, headers, CSP policies', metric: 'A+ Rating' },
            { icon: Globe, title: 'SEO Optimized', desc: 'Schema markup & meta tags', metric: 'Page 1 Ranking' },
        ]
    },
    {
        id: 'smart',
        icon: Cpu,
        title: 'Smart Features',
        subtitle: 'Automate & Scale',
        gradient: 'from-purple-600 to-pink-500',
        textGradient: 'from-purple-400 to-pink-400',
        neonColor: '#a855f7',
        accentRgb: '168,85,247',
        headingLine1: 'Smart tools for',
        headingLine2: 'modern businesses',
        description: 'Automate tasks, improve customer experience, and save time with custom features built for your specific needs.',
        features: [
            'Customer portals & dashboards',
            'Online booking systems',
            'Progressive Web Apps'
        ],
        stats: [
            { icon: Zap, value: '85%', label: 'Time Saved', color: 'text-amber-400' },
            { icon: Users, value: '3x', label: 'User Engagement', color: 'text-purple-400' },
            { icon: BarChart3, value: '24/7', label: 'Uptime Monitor', color: 'text-cyan-400' },
        ],
        cards: [
            { icon: Cpu, title: 'AI Integration', desc: 'Smart chatbots & recommendations', metric: 'GPT Powered' },
            { icon: Lock, title: 'Auth & Portals', desc: 'Secure customer dashboards', metric: 'OAuth 2.0' },
            { icon: Zap, title: 'Automation', desc: 'Workflows that run themselves', metric: '0 Manual Steps' },
            { icon: BarChart3, title: 'Analytics', desc: 'Real-time business insights', metric: 'Live Tracking' },
        ]
    },
    {
        id: 'local',
        icon: MapPin,
        title: 'Local Marketing',
        subtitle: 'Reach & Grow',
        gradient: 'from-teal-500 to-emerald-500',
        textGradient: 'from-teal-400 to-emerald-400',
        neonColor: '#14b8a6',
        accentRgb: '20,184,166',
        headingLine1: 'Help customers',
        headingLine2: 'find you online',
        description: 'Get found when customers search for businesses like yours. We optimize your presence for local searches and build your reputation.',
        features: [
            'Google Business optimization',
            'Review management & SEO',
            'Performance tracking'
        ],
        stats: [
            { icon: Search, value: 'Top 3', label: 'Local Pack Rank', color: 'text-teal-400' },
            { icon: TrendingUp, value: '+200%', label: 'Search Visibility', color: 'text-emerald-400' },
            { icon: Users, value: '5x', label: 'More Leads', color: 'text-cyan-400' },
        ],
        cards: [
            { icon: MapPin, title: 'Google Business', desc: 'Complete profile optimization', metric: 'Verified ✓' },
            { icon: Search, title: 'Local SEO', desc: 'Rank for "near me" searches', metric: 'Top 3 Results' },
            { icon: Sparkles, title: 'Review Engine', desc: 'Automated review collection', metric: '4.9★ Average' },
            { icon: BarChart3, title: 'ROI Tracking', desc: 'See exactly what works', metric: 'Live Dashboard' },
        ]
    }
];

/* ─── Stat Pill ─── */
const StatPill = ({ stat, index, accentRgb }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
        className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm group hover:bg-white/[0.08] transition-all duration-300"
    >
        <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
            style={{ background: `rgba(${accentRgb}, 0.15)` }}
        >
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
        </div>
        <div>
            <p className="text-xl font-black text-white tracking-tight leading-none">{stat.value}</p>
            <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mt-0.5">{stat.label}</p>
        </div>
    </motion.div>
);

/* ─── Feature Card ─── */
const FeatureCard = ({ card, index, gradient, neonColor, accentRgb }) => (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.08 + 0.15, type: 'spring', stiffness: 180, damping: 20 }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="relative group cursor-default"
    >
        {/* Glow on hover */}
        <div
            className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
            style={{ background: `linear-gradient(135deg, rgba(${accentRgb}, 0.4), transparent 60%)` }}
        />

        <div className="relative h-full p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md overflow-hidden">
            {/* Shimmer sweep */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${accentRgb}, 0.08), transparent)` }}
                />
            </div>

            <div className="relative z-10">
                {/* Icon + Metric row */}
                <div className="flex items-center justify-between mb-4">
                    <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10"
                        style={{ background: `rgba(${accentRgb}, 0.12)` }}
                    >
                        <card.icon className="w-5 h-5" style={{ color: neonColor }} />
                    </div>
                    <span
                        className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                        style={{
                            color: neonColor,
                            borderColor: `rgba(${accentRgb}, 0.25)`,
                            background: `rgba(${accentRgb}, 0.08)`
                        }}
                    >
                        {card.metric}
                    </span>
                </div>

                <h4 className="text-base font-bold text-white mb-1.5">{card.title}</h4>
                <p className="text-sm text-white/45 leading-relaxed">{card.desc}</p>
            </div>
        </div>
    </motion.div>
);

const ServicesShowcase = () => {
    const [activeTabId, setActiveTabId] = useState(tabsData[0].id);
    const activeData = tabsData.find(t => t.id === activeTabId);

    return (
        <section id="what-we-do" className="relative pt-24 lg:pt-32 pb-12 lg:pb-16 overflow-hidden flex items-center">

            {/* Interactive Particle Background */}
            <ParticlesBackground />

            {/* Dynamic Ambient Orbs — color shifts with active tab */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeData.id + '-orb1'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full blur-[150px] mix-blend-screen pointer-events-none"
                    style={{ background: `rgba(${activeData.accentRgb}, 0.15)` }}
                />
                <motion.div
                    key={activeData.id + '-orb2'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[120px] mix-blend-screen pointer-events-none"
                    style={{ background: `rgba(${activeData.accentRgb}, 0.1)` }}
                />
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                {/* ─── Section Header ─── */}
                <BlurFadeIn delay={0.1}>
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                        <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/[0.05] border border-white/[0.08] backdrop-blur-sm shadow-lg relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative flex h-2 w-2 mr-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-slate-300">
                                Innovation Engine
                            </span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                            Everything your business <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                needs to grow.
                            </span>
                        </h2>
                    </div>
                </BlurFadeIn>

                {/* ─── Tab Buttons — Upgraded ─── */}
                <BlurFadeIn delay={0.2}>
                    <div className="flex justify-start sm:justify-center overflow-x-auto no-scrollbar mb-16 pb-4 sm:pb-0">
                        <div className="relative flex space-x-2 min-w-max">
                            {tabsData.map((tab) => {
                                const isActive = activeTabId === tab.id;
                                const TabIcon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTabId(tab.id)}
                                        className={`relative z-10 px-7 py-4 rounded-2xl text-left transition-all duration-400 w-56 group ${isActive
                                            ? 'text-white'
                                            : 'text-slate-400 bg-white/[0.03] border border-white/[0.06] hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1]'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabBg"
                                                className={`absolute inset-0 bg-gradient-to-br ${tab.gradient} rounded-2xl -z-10`}
                                                style={{ boxShadow: `0 0 30px rgba(${tab.accentRgb}, 0.35), 0 0 60px rgba(${tab.accentRgb}, 0.15)` }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        {/* Shimmer on active */}
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl overflow-hidden -z-[5]"
                                                initial={false}
                                            >
                                                <motion.div
                                                    className="absolute inset-0 -translate-x-full"
                                                    animate={{ translateX: ['- 100%', '200%'] }}
                                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                                                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', width: '50%' }}
                                                />
                                            </motion.div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                                                ? 'bg-white/20 border border-white/20'
                                                : 'bg-white/[0.05] border border-white/[0.08] group-hover:bg-white/[0.1]'
                                                }`}>
                                                <TabIcon size={18} className="flex-shrink-0" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold leading-tight">{tab.title}</p>
                                                <p className={`text-[10px] font-medium uppercase tracking-wider mt-0.5 transition-colors ${isActive ? 'text-white/60' : 'text-white/30'
                                                    }`}>{tab.subtitle}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </BlurFadeIn>

                {/* ─── Tab Content ─── */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeData.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                        >
                            {/* ─── Left: Text + Stats ─── */}
                            <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
                                <div>
                                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                                        {activeData.headingLine1}<br />
                                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeData.textGradient}`}>
                                            {activeData.headingLine2}
                                        </span>
                                    </h3>
                                    <p className="text-lg text-white/50 leading-relaxed font-light">
                                        {activeData.description}
                                    </p>
                                </div>

                                {/* Feature checklist */}
                                <ul className="space-y-4">
                                    {activeData.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 + 0.2 }}
                                            className="flex items-center text-white/80 group cursor-default"
                                        >
                                            <div
                                                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mr-3 border border-white/10 group-hover:scale-110 transition-transform duration-300"
                                                style={{ background: `rgba(${activeData.accentRgb}, 0.12)` }}
                                            >
                                                <Check className="w-3.5 h-3.5" style={{ color: activeData.neonColor }} />
                                            </div>
                                            <span className="text-[15px] group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-3">
                                    {activeData.stats.map((stat, i) => (
                                        <StatPill key={i} stat={stat} index={i} accentRgb={activeData.accentRgb} />
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <MagneticButton
                                    className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 rounded-2xl overflow-hidden border border-white/10"
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <div
                                        className="absolute inset-0 opacity-80 -z-10"
                                        style={{ background: `linear-gradient(135deg, rgba(${activeData.accentRgb}, 0.3), rgba(${activeData.accentRgb}, 0.1))` }}
                                    />
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                                        style={{ background: `linear-gradient(135deg, rgba(${activeData.accentRgb}, 0.6), rgba(${activeData.accentRgb}, 0.2))` }}
                                    />
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                </MagneticButton>
                            </div>

                            {/* ─── Right: Feature Cards Grid ─── */}
                            <div className="lg:col-span-7 order-1 lg:order-2">
                                <div className="grid grid-cols-2 gap-4">
                                    {activeData.cards.map((card, i) => (
                                        <FeatureCard
                                            key={card.title}
                                            card={card}
                                            index={i}
                                            gradient={activeData.gradient}
                                            neonColor={activeData.neonColor}
                                            accentRgb={activeData.accentRgb}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ServicesShowcase;
