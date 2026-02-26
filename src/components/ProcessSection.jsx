import React, { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Fingerprint, Layout, Terminal, Zap } from 'lucide-react';
import { AnimatedHeadline, ParticlesBackground, ElectricCurrent } from './UIComponents';

import discoveryImg from '../assets/process/discovery.png';
import designImg from '../assets/process/design.png';
import buildImg from '../assets/process/build.png';
import launchImg from '../assets/process/launch.png';

const PROCESS_STEPS = [
    {
        number: '01',
        title: 'Discovery',
        color: 'cyan',
        icon: Fingerprint,
        deliverables: ['Market Audit', 'User Personas', 'Product DNA'],
        description: 'We extract your positioning and audience goals to build a clear growth roadmap.',
        image: discoveryImg,
        tag: 'Strategy Alignment'
    },
    {
        number: '02',
        title: 'Design',
        color: 'purple',
        icon: Layout,
        deliverables: ['UI Strategy', 'Prototypes', 'Design System'],
        description: 'We design conversion-focused interfaces that feel premium and remain intuitive.',
        image: designImg,
        tag: 'Creative Architecture'
    },
    {
        number: '03',
        title: 'Build',
        color: 'cyan',
        icon: Terminal,
        deliverables: ['Clean Architecture', 'API Core', 'Security'],
        description: 'We engineer fast, maintainable systems that stay stable as your business grows.',
        image: buildImg,
        tag: 'Core Engineering'
    },
    {
        number: '04',
        title: 'Launch',
        color: 'purple',
        icon: Zap,
        deliverables: ['SEO Setup', 'Cloud Deploy', 'Scaling'],
        description: 'We launch with monitoring and refinement so performance stays strong after go-live.',
        image: launchImg,
        tag: 'Growth Deployment'
    }
];

const HorizontalStep = ({ step, index, progress, totalSteps }) => {
    const stepInterval = 1 / totalSteps;
    const cardCenter = (index + 0.5) * stepInterval;
    const distanceFromCenter = Math.abs(progress - cardCenter);
    const isFocused = distanceFromCenter < 0.15;
    const tilt = (progress - cardCenter) * 36;
    const Icon = step.icon;

    return (
        <div
            className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[42vh] md:h-[48vh] flex-shrink-0 group perspective-1000"
            style={{
                transform: `rotateY(${tilt}deg) translateZ(${isFocused ? '30px' : '0px'})`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            <div
                className={`w-full h-full rounded-[2.5rem] overflow-hidden border transition-all duration-700 ease-out relative flex flex-col backdrop-blur-md ${isFocused
                    ? `border-${step.color}-500/40 bg-slate-900/80 shadow-[0_0_50px_rgba(var(--${step.color}-rgb),0.15)]`
                    : 'border-white/10 bg-slate-900/50 opacity-80 blur-[1px] grayscale'
                    }`}
            >
                <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-[45%] h-[40%] md:h-full relative overflow-hidden bg-black">
                        <img
                            src={step.image}
                            alt={step.title}
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full object-cover transition-transform duration-[4500ms] ${isFocused ? 'scale-105' : 'scale-120'}`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 md:from-transparent via-transparent to-slate-900/95 transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
                        <div className={`absolute top-6 left-6 flex items-center gap-3 transition-all duration-700 ${isFocused ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full bg-${step.color}-500 animate-ping`} />
                            <span className="text-[9px] font-black tracking-[0.4em] text-white uppercase opacity-60">Phase {step.number}</span>
                        </div>
                    </div>

                    <div className="w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-center relative">
                        <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${isFocused ? `bg-${step.color}-500/20 text-${step.color}-400` : 'bg-white/5 text-white/20'}`}>
                            <Icon size={24} />
                        </div>

                        <h3 className={`text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-none transition-all duration-500 ${isFocused ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                            {step.title}
                        </h3>

                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-sm">
                            {step.description}
                        </p>

                        <div className={`flex flex-wrap gap-2 mb-6 transition-all duration-500 delay-100 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            {step.deliverables.map((item, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider border border-white/10 bg-white/5 text-gray-300">
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className={`flex items-center gap-4 transition-all duration-500 delay-200 mt-auto ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{step.tag}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MobileStep = ({ step, index }) => {
    const Icon = step.icon;
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="rounded-3xl border border-white/10 bg-black/45 backdrop-blur-md overflow-hidden"
        >
            <div className="relative h-44 bg-black">
                <img
                    src={step.image}
                    alt={step.title}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    decoding="async"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/45 border border-white/20 text-[10px] tracking-[0.18em] font-bold text-white/80">
                    PHASE {step.number}
                </div>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'}`}>
                        <Icon size={18} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{step.title}</h3>
                </div>
                <p className="text-sm text-white/65 leading-relaxed mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((item) => (
                        <span key={item} className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide border border-white/10 bg-white/5 text-white/70">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    );
};

const DesktopProcess = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end']
    });

    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);
    const [progressValue, setProgressValue] = useState(0);

    React.useEffect(() => {
        return scrollYProgress.on('change', (latest) => {
            setProgressValue((prev) => {
                const next = Math.round(latest * 100) / 100;
                return Math.abs(prev - next) >= 0.01 ? next : prev;
            });
        });
    }, [scrollYProgress]);

    const steps = useMemo(() => PROCESS_STEPS, []);

    return (
        <section id="how-it-works" ref={targetRef} className="relative bg-transparent h-[400vh]">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between py-[4vh] md:py-[6vh] overflow-hidden">
                <ParticlesBackground />
                <ElectricCurrent color="#06b6d4" className="top-20 left-[10%]" />
                <ElectricCurrent color="#a855f7" className="bottom-40 right-[10%] rotate-180" />

                <div className="w-full px-6 flex-shrink-0 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                            <span className="text-cyan-400 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                                How It Works
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
                        </div>
                        <AnimatedHeadline>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight">
                                From Idea to Launch in{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                    4 Simple Steps
                                </span>
                            </h2>
                        </AnimatedHeadline>
                        <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed hidden md:block mb-8 md:mb-12">
                            A streamlined process focused on speed, clarity, and measurable business outcomes.
                        </p>
                    </motion.div>
                </div>

                <div className="flex-1 w-full flex items-center overflow-hidden">
                    <motion.div
                        style={{ x }}
                        className="flex items-center gap-8 md:gap-12 px-[10vw] flex-nowrap w-max"
                    >
                        {steps.map((step, index) => (
                            <HorizontalStep
                                key={step.number}
                                step={step}
                                index={index}
                                progress={progressValue}
                                totalSteps={steps.length}
                            />
                        ))}
                    </motion.div>
                </div>

                <div className="w-full max-w-md px-8 flex-shrink-0 z-20">
                    <div className="flex justify-between mb-3 px-2">
                        {steps.map((_, i) => (
                            <span
                                key={i}
                                className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-500 ${progressValue * (steps.length - 1) >= (i - 0.1) ? 'text-white' : 'text-white/20'}`}
                            >
                                0{i + 1}
                            </span>
                        ))}
                    </div>
                    <div className="h-[2px] w-full bg-white/10 rounded-full relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-200 ease-out"
                            style={{ width: `${Math.max(5, progressValue * 100)}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="hidden border-cyan-500 border-purple-500 bg-cyan-500 bg-purple-500 text-cyan-400 text-purple-400 border-cyan-500/40 border-purple-500/40" />
        </section>
    );
};

const MobileProcess = () => {
    const trackRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const updateActiveFromScroll = React.useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        const cards = track.querySelectorAll('[data-step-card="true"]');
        if (!cards.length) return;

        const viewportCenter = track.scrollLeft + track.clientWidth / 2;
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, idx) => {
            const cardCenter = card.offsetLeft + card.clientWidth / 2;
            const distance = Math.abs(viewportCenter - cardCenter);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = idx;
            }
        });

        setActiveIndex((prev) => (prev === nearestIndex ? prev : nearestIndex));
    }, []);

    const scrollToStep = (index) => {
        const track = trackRef.current;
        if (!track) return;

        const target = Math.max(0, Math.min(PROCESS_STEPS.length - 1, index));
        const cards = track.querySelectorAll('[data-step-card="true"]');
        const card = cards[target];
        if (!card) return;

        const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
        track.scrollTo({
            left: Math.max(0, left),
            behavior: 'smooth'
        });
    };

    return (
        <section id="how-it-works" className="relative py-14 pb-20 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-500" />
                        <span className="text-cyan-400 text-[10px] font-black tracking-[0.24em] uppercase">
                            How It Works
                        </span>
                        <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-500" />
                    </div>
                    <h2 className="mt-3 text-3xl font-bold text-white leading-tight">
                        From Idea to Launch in
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                            4 Simple Steps
                        </span>
                    </h2>
                    <p className="mt-3 text-sm text-white/60 max-w-xl mx-auto">
                        Swipe through the full process horizontally, step by step.
                    </p>
                </div>

                <div className="relative">
                    <div
                        ref={trackRef}
                        onScroll={updateActiveFromScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 px-[8.5vw] -mx-4"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {PROCESS_STEPS.map((step, index) => (
                            <div key={step.number} data-step-card="true" className="snap-center shrink-0 w-[83vw] max-w-[360px]">
                                <MobileStep step={step} index={index} />
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 px-1">
                        <div className="flex items-center justify-between gap-3 mb-3">
                            <button
                                type="button"
                                onClick={() => scrollToStep(activeIndex - 1)}
                                disabled={activeIndex === 0}
                                className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-[10px] tracking-[0.14em] uppercase font-bold text-white/75 disabled:opacity-40"
                            >
                                Prev
                            </button>
                            <div className="flex items-center gap-2">
                                {PROCESS_STEPS.map((step, index) => (
                                    <button
                                        key={step.number}
                                        type="button"
                                        onClick={() => scrollToStep(index)}
                                        aria-label={`Go to ${step.title}`}
                                        className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-white/30'}`}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => scrollToStep(activeIndex + 1)}
                                disabled={activeIndex === PROCESS_STEPS.length - 1}
                                className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-[10px] tracking-[0.14em] uppercase font-bold text-white/75 disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                        <div className="h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
                                style={{ width: `${((activeIndex + 1) / PROCESS_STEPS.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProcessSection = ({ isMobile = false }) => {
    if (isMobile) return <MobileProcess />;
    return <DesktopProcess />;
};

export default React.memo(ProcessSection);
