import React, { useState, useEffect, useRef } from 'react';
import { Users, ArrowRight, Phone, TrendingUp, Monitor, Target, Lightbulb, Award, ExternalLink, Star } from 'lucide-react';
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
        solution: 'Clear messaging, mobile-first layout, strong call-to-action placement ensuring potential members find what they need instantly.',
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
        solution: 'Easy online booking system integration, trust signals through testimonials, and a clean professional design.',
        result: 'Streamlined booking process and significant patient growth.',
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
        solution: 'Mobile-optimized menu, clear ordering process flow, and enhanced location visibility for customers.',
        result: 'Increased online visibility and expanded customer reach.',
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
        solution: 'High-end dark mode aesthetics, smooth animations, and optimized performance to showcase brand quality.',
        result: 'A striking brand identity that captivates luxury clients.',
    }
];

const CaseStudyTextItem = ({ study, index, setActiveIndex }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
    const Icon = study.icon;

    useEffect(() => {
        if (isInView) {
            setActiveIndex(index);
        }
    }, [isInView, index, setActiveIndex]);

    return (
        <div id={study.id} ref={ref} className="min-h-[90vh] flex flex-col justify-center py-20 pr-0 lg:pr-12">

            {/* Mobile View: Iframe Preview (Hidden on Desktop) */}
            <div className="block lg:hidden w-full aspect-[4/3] rounded-3xl overflow-hidden mb-10 relative border border-white/10 shadow-2xl bg-slate-950">
                <div className="absolute inset-0 z-0 bg-slate-950 pointer-events-none">
                    <iframe
                        src={study.url}
                        className="w-[200%] h-[200%] transform scale-50 origin-top-left border-0 bg-transparent"
                        title={`${study.title} Preview`}
                        loading="lazy"
                        style={{ colorScheme: 'dark' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>
                {/* Mobile Visit Button */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                    <button
                        onClick={() => window.open(study.url, '_blank')}
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/20 transition-colors"
                    >
                        <ExternalLink size={18} /> Visit Site
                    </button>
                </div>
            </div>

            <div className="relative z-20">
                {/* Large faded number */}
                <span className="font-black text-[120px] leading-none text-white/[0.03] absolute -top-16 -left-8 select-none pointer-events-none">
                    {study.number}
                </span>

                {/* Header block */}
                <div className="flex justify-between items-start mb-10 relative z-10">
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-2">{study.category}</h4>
                        <h3 className="text-4xl md:text-5xl font-bold text-white">{study.title}</h3>
                    </div>
                    <div className={`hidden md:flex w-14 h-14 rounded-2xl bg-gradient-to-br ${study.gradient} items-center justify-center shadow-lg`}>
                        <Icon className="text-white" size={24} />
                    </div>
                </div>

                {/* Goal */}
                <div className="relative mb-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                        <Target size={16} className="text-pink-400" />
                        <h4 className="text-xs font-black tracking-[0.25em] text-white uppercase drop-shadow-md">The Goal</h4>
                    </div>
                    <p className="text-xl md:text-2xl font-semibold text-white/95 leading-snug drop-shadow-sm">{study.goal}</p>
                </div>

                {/* Solution */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Lightbulb size={16} className="text-cyan-400" />
                        <h4 className="text-xs font-black tracking-[0.25em] text-white uppercase drop-shadow-md">Our Solution</h4>
                    </div>
                    {/* Replaced standard <p> with the requested TypingAnimation */}
                    <TypingAnimation className="text-white/80 font-medium leading-relaxed text-base md:text-lg block drop-shadow-sm" duration={15}>
                        {study.solution}
                    </TypingAnimation>
                </div>

                {/* Result — gradient card */}
                <div className={`bg-gradient-to-r ${study.gradient} p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Award size={14} className="text-white/80" />
                            <h4 className="text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase drop-shadow-sm">The Result</h4>
                        </div>
                        <p className="text-white font-bold text-lg drop-shadow-md">{study.result}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailedCaseStudies = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative z-10 font-sans antialiased bg-black/20">
            {/* Background atmospherics */}
            <SectionParticles color="rgba(168,85,247,0.3)" count={30} />
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-60">
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">

                {/* Section Header */}
                <RevealOnScroll>
                    <header className="mb-20">
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
                            {/* <AnimatedHeadline> */}
                            <h2 className="font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                Engineering Success<br className="hidden md:block" />{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                                    Stories
                                </span>
                            </h2>
                            {/* </AnimatedHeadline> */}
                            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light mt-6 mx-auto max-w-2xl">
                                Deep dives into how we've transformed local brands into{' '}
                                <Highlighter action="highlight" color="#a855f7" delay={0.2}>digital powerhouses</Highlighter> through{' '}
                                <Highlighter action="underline" color="#06b6d4" delay={0.4}>strategic design, development, and conversion optimization</Highlighter>.
                            </p>
                        </div>
                    </header>
                </RevealOnScroll>

                {/* Two Column Scroll Layout */}
                <div className="flex flex-col lg:flex-row relative">

                    {/* Left Column: Text Items */}
                    <div className="w-full lg:w-[40%] xl:w-[35%] relative z-20 pb-[20vh]">
                        {caseStudies.map((study, index) => (
                            <CaseStudyTextItem
                                key={`study-${study.id}`}
                                study={study}
                                index={index}
                                setActiveIndex={setActiveIndex}
                            />
                        ))}
                    </div>

                    {/* Right Column: Sticky Media (Desktop Only) */}
                    <div className="hidden lg:block lg:w-[60%] xl:w-[65%] h-[80vh] sticky top-[10vh] left-0 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl ml-auto bg-slate-950">

                        {/* Dynamic ambient background based on active item */}
                        <div
                            className="absolute inset-0 z-0 transition-all duration-1000 blur-3xl opacity-30"
                            style={{ background: caseStudies[activeIndex].glowColor }}
                        />
                        <TyphoonVortex color={caseStudies[activeIndex].gradient.split('-')[1]} speed={30} />

                        {/* Iframes Stack */}
                        {caseStudies.map((study, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <motion.div
                                    key={`media-${study.id}`}
                                    className="absolute inset-0 z-10"
                                    initial={false}
                                    animate={{
                                        opacity: isActive ? 1 : 0,
                                        scale: isActive ? 1 : 1.05
                                    }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                                >
                                    {/* Live iframe container */}
                                    <div className="absolute inset-4 rounded-[2rem] overflow-hidden bg-slate-950 shadow-inner">
                                        <iframe
                                            src={study.url}
                                            className="w-[200%] h-[200%] transform scale-50 origin-top-left border-0 pointer-events-none bg-transparent"
                                            title={`${study.title} Preview`}
                                            loading="lazy"
                                            style={{ colorScheme: 'dark' }}
                                        />

                                        {/* Gradients to blend edges */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 pointer-events-none" />

                                    </div>

                                    {/* Overlay Action Area */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-10 pointer-events-none z-20">
                                        <div className="flex justify-between items-end">
                                            {/* Status Badge */}
                                            <div className="flex flex-col gap-2">
                                                <span className="text-xs font-mono text-white/40">{study.domain}</span>
                                                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Integration</span>
                                                </span>
                                            </div>

                                            {/* Interactive Button */}
                                            <button
                                                onClick={() => window.open(study.url, '_blank')}
                                                className="group pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition-all shadow-xl"
                                            >
                                                <ExternalLink size={20} className="text-white" />
                                                <span className="text-white font-bold text-sm uppercase tracking-wider">Explore Project</span>
                                                <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform ml-2" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default DetailedCaseStudies;
