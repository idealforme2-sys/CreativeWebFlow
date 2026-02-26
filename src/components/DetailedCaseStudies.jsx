import React, { useState, useEffect, useRef } from 'react';
import { Users, ArrowRight, Phone, TrendingUp, Monitor, Target, Lightbulb, Award, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { RevealOnScroll, SectionParticles, TyphoonVortex } from './UIComponents';
import { Highlighter } from './magicui/Highlighter';
import { TypingAnimation } from './magicui/typing-animation';

const caseStudies = [
    {
        id: 'fitness',
        number: '01',
        category: 'Fitness & Wellness',
        title: 'Local Gym',
        icon: Users,
        color: 'cyan',
        gradient: 'from-cyan-500 to-blue-600',
        glowColor: 'rgba(6,182,212,0.3)',
        url: 'https://iron-core-fit.vercel.app',
        domain: 'iron-core-fit.vercel.app',
        goal: 'Get more membership inquiries',
        solution: 'Clear messaging, mobile-first layout, and strong call-to-action placement.',
        result: 'Improved engagement and more contact requests.',
    },
    {
        id: 'medical',
        number: '02',
        category: 'Healthcare',
        title: 'Dental Clinic',
        icon: Phone,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-500',
        glowColor: 'rgba(168,85,247,0.3)',
        url: 'https://radiant-smile.vercel.app',
        domain: 'radiant-smile.vercel.app',
        goal: 'Increase appointment bookings',
        solution: 'Online booking integration, trust signals, and a clean professional layout.',
        result: 'Smoother booking flow and significant patient growth.',
    },
    {
        id: 'food',
        number: '03',
        category: 'Food & Dining',
        title: 'Local Restaurant',
        icon: TrendingUp,
        color: 'orange',
        gradient: 'from-orange-500 to-red-500',
        glowColor: 'rgba(249,115,22,0.3)',
        url: 'https://savory-sage-food.vercel.app',
        domain: 'savory-sage-food.vercel.app',
        goal: 'Drive more online orders',
        solution: 'Mobile-optimized menu structure and streamlined ordering flow.',
        result: 'Higher online visibility and expanded customer reach.',
    },
    {
        id: 'real-estate',
        number: '04',
        category: 'Premium Agency',
        title: 'The Obsidian',
        icon: Monitor,
        color: 'emerald',
        gradient: 'from-teal-500 to-emerald-500',
        glowColor: 'rgba(20,184,166,0.3)',
        url: 'https://the-obsidian.vercel.app',
        domain: 'the-obsidian.vercel.app',
        goal: 'Establish a premium digital presence',
        solution: 'High-end visual language with clean interactions and fast performance.',
        result: 'A strong brand identity that attracts luxury clients.',
    }
];

const LightweightPreview = ({ study, compact = false }) => (
    <div className={`relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950 ${compact ? 'aspect-[4/3]' : 'h-full'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-purple-500/10 to-pink-500/15" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <div className="relative z-10 h-full p-5 md:p-6 flex flex-col justify-between">
            <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/35 text-[10px] tracking-[0.16em] text-white/75 uppercase">
                    Live Project
                </span>
                <h4 className="mt-3 text-2xl font-bold text-white">{study.title}</h4>
                <p className="text-xs text-white/55 mt-1">{study.domain}</p>
            </div>
            <button
                onClick={() => window.open(study.url, '_blank')}
                className="w-fit pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.14em] hover:bg-white/20 transition-colors"
            >
                <ExternalLink size={14} />
                Open Site
            </button>
        </div>
    </div>
);

const CaseStudyTextItem = ({ study, index, setActiveIndex, isMobile = false }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });
    const Icon = study.icon;

    useEffect(() => {
        if (isInView) setActiveIndex(index);
    }, [isInView, index, setActiveIndex]);

    return (
        <div id={study.id} ref={ref} className={`min-h-0 ${isMobile ? 'py-8' : 'md:min-h-[74vh] lg:min-h-[88vh] py-10 md:py-16 lg:py-20'} flex flex-col justify-center pr-0 lg:pr-12`}>
            <div className="block lg:hidden w-full mb-8">
                <LightweightPreview study={study} compact />
            </div>

            <div className="relative z-20">
                <span className={`font-black leading-none text-white/[0.03] absolute -top-16 select-none pointer-events-none ${isMobile ? 'text-[86px] -left-2' : 'text-[120px] -left-8'}`}>
                    {study.number}
                </span>

                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-2">{study.category}</h4>
                        <h3 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-white`}>{study.title}</h3>
                    </div>
                    <div className={`hidden md:flex w-14 h-14 rounded-2xl bg-gradient-to-br ${study.gradient} items-center justify-center shadow-lg`}>
                        <Icon className="text-white" size={24} />
                    </div>
                </div>

                <div className="relative mb-7 pt-5 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <Target size={16} className="text-pink-400" />
                        <h4 className="text-xs font-black tracking-[0.25em] text-white uppercase">The Goal</h4>
                    </div>
                    <p className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-semibold text-white/95 leading-snug`}>{study.goal}</p>
                </div>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <Lightbulb size={16} className="text-cyan-400" />
                        <h4 className="text-xs font-black tracking-[0.25em] text-white uppercase">Our Solution</h4>
                    </div>
                    <TypingAnimation className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} text-white/80 font-medium leading-relaxed block`} duration={15}>
                        {study.solution}
                    </TypingAnimation>
                </div>

                <div className={`bg-gradient-to-r ${study.gradient} p-5 rounded-2xl border border-white/10 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Award size={14} className="text-white/80" />
                            <h4 className="text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase">The Result</h4>
                        </div>
                        <p className={`${isMobile ? 'text-base' : 'text-lg'} text-white font-bold`}>{study.result}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailedCaseStudies = ({ isMobile = false }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeStudy = caseStudies[activeIndex];

    return (
        <div className="relative z-10 font-sans antialiased">
            <SectionParticles color="rgba(168,85,247,0.28)" count={isMobile ? 12 : 24} />
            <div
                className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-60"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 100%)',
                }}
            >
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <section className={`relative z-10 max-w-7xl mx-auto px-4 md:px-6 ${isMobile ? 'py-10' : 'py-12 md:py-20 lg:py-28'}`}>
                <RevealOnScroll>
                    <header className={`${isMobile ? 'mb-6' : 'mb-8 md:mb-14 lg:mb-20'}`}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-pink-500 to-transparent" />
                            <span className="text-pink-400 text-xs font-black tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]">Proven Results</span>
                        </motion.div>
                        <div className="max-w-3xl">
                            <h2 className="font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                Engineering Success<br className="hidden md:block" />{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                                    Stories
                                </span>
                            </h2>
                            <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-white/60 leading-relaxed font-light mt-4 mx-auto max-w-2xl`}>
                                Deep dives into how we transform local brands into{' '}
                                <Highlighter action="highlight" color="#a855f7" delay={0.2}>digital powerhouses</Highlighter> through{' '}
                                <Highlighter action="underline" color="#06b6d4" delay={0.4}>strategic design and performance-first engineering</Highlighter>.
                            </p>
                        </div>
                    </header>
                </RevealOnScroll>

                <div className="flex flex-col lg:flex-row relative">
                    <div className={`w-full lg:w-[40%] xl:w-[35%] relative z-20 ${isMobile ? 'pb-0' : 'pb-0 lg:pb-[20vh]'}`}>
                        {caseStudies.map((study, index) => (
                            <CaseStudyTextItem
                                key={`study-${study.id}`}
                                study={study}
                                index={index}
                                setActiveIndex={setActiveIndex}
                                isMobile={isMobile}
                            />
                        ))}
                    </div>

                    {!isMobile && (
                        <div className="hidden lg:block lg:w-[60%] xl:w-[65%] h-[80vh] sticky top-[10vh] left-0 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl ml-auto bg-slate-950">
                            <div
                                className="absolute inset-0 z-0 transition-all duration-700 blur-3xl opacity-30"
                                style={{ background: activeStudy.glowColor }}
                            />
                            <TyphoonVortex color={activeStudy.gradient.split('-')[1]} speed={34} />

                            <motion.div
                                key={activeStudy.id}
                                className="absolute inset-0 z-10"
                                initial={{ opacity: 0, scale: 1.03 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="absolute inset-4 rounded-[2rem] overflow-hidden bg-slate-950 shadow-inner">
                                    <iframe
                                        src={activeStudy.url}
                                        className="w-[200%] h-[200%] transform scale-50 origin-top-left border-0 pointer-events-none bg-transparent"
                                        title={`${activeStudy.title} Preview`}
                                        loading="lazy"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 pointer-events-none" />
                                </div>

                                <div className="absolute inset-0 flex flex-col justify-end p-10 pointer-events-none z-20">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-mono text-white/40">{activeStudy.domain}</span>
                                            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Integration</span>
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => window.open(activeStudy.url, '_blank')}
                                            className="group pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition-all shadow-xl"
                                        >
                                            <ExternalLink size={20} className="text-white" />
                                            <span className="text-white font-bold text-sm uppercase tracking-wider">Explore Project</span>
                                            <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform ml-2" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DetailedCaseStudies;
