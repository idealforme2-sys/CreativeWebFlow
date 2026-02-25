import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Fingerprint, Layout, Terminal, Zap } from 'lucide-react';
import { AnimatedHeadline, ParticlesBackground, ElectricCurrent, FloatingOrbs } from './UIComponents';

// Import local images directly
import discoveryImg from '../assets/process/discovery.png';
import designImg from '../assets/process/design.png';
import buildImg from '../assets/process/build.png';
import launchImg from '../assets/process/launch.png';

const HorizontalStep = ({ step, index, progress, totalSteps }) => {
    // Focus math: Determine active state based on overall scroll progress
    const stepInterval = 1 / totalSteps;
    const cardCenter = (index + 0.5) * stepInterval;
    const distanceFromCenter = Math.abs(progress - cardCenter);
    const isFocused = distanceFromCenter < 0.15; // Slightly wider focus area

    // Calculate a 3D tilt based on position
    const tilt = (progress - cardCenter) * 40;

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
                    {/* Visual Engine */}
                    <div className="w-full md:w-[45%] h-[40%] md:h-full relative overflow-hidden bg-black">
                        <img
                            src={step.image}
                            alt={step.title}
                            className={`w-full h-full object-cover transition-transform duration-[5000ms] ${isFocused ? 'scale-105' : 'scale-125'}`}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 md:from-transparent via-transparent to-slate-900/95 transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

                        <div className={`absolute top-6 left-6 flex items-center gap-3 transition-all duration-700 ${isFocused ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full bg-${step.color}-500 animate-ping`} />
                            <span className="text-[9px] font-black tracking-[0.4em] text-white uppercase opacity-60">Phase {step.number}</span>
                        </div>
                    </div>

                    {/* Intel Section */}
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
                                <span key={i} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider border border-white/10 bg-white/5 text-gray-300 transition-colors cursor-default`}>
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className={`flex items-center gap-4 transition-all duration-500 delay-200 mt-auto ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <span className={`text-[10px] font-bold uppercase tracking-widest text-white/50`}>{step.tag}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProcessSection = () => {
    const targetRef = useRef(null);

    // Use Framer Motion useScroll connected to the targetRef
    const { scrollYProgress } = useScroll({
        target: targetRef,
        // Start when the top of the section hits the top of the viewport
        // End when the bottom of the section hits the bottom of the viewport
        offset: ["start start", "end end"]
    });

    // Map scroll progress to horizontal translation
    // We want to move left by (scrollWidth - windowWidth)
    // -65% is an approximation that works well for 4 cards of this size
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    // We also need the raw progress value to pass to children for focus calculations
    const [progressValue, setProgressValue] = React.useState(0);

    React.useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setProgressValue(latest);
        });
    }, [scrollYProgress]);

    const steps = useMemo(() => [
        {
            number: "01",
            title: "Discovery",
            color: "cyan",
            icon: Fingerprint,
            deliverables: ["Market Audit", "User Personas", "Product DNA"],
            description: "We surgically extract your brand DNA and market positioning to map a data-driven path to dominance.",
            image: discoveryImg,
            tag: "Strategy Alignment"
        },
        {
            number: "02",
            title: "Design",
            color: "purple",
            icon: Layout,
            deliverables: ["UI Strategy", "Prototypes", "Design System"],
            description: "Crafting sensory interfaces that blend intuitive utility with breathtaking visual storytelling.",
            image: designImg,
            tag: "Creative Architecture"
        },
        {
            number: "03",
            title: "Build",
            color: "cyan",
            icon: Terminal,
            deliverables: ["Clean Architecture", "API Core", "Security"],
            description: "Engineering high-performance, ultra-fast digital engines that scale effortlessly with your vision.",
            image: buildImg,
            tag: "Core Engineering"
        },
        {
            number: "04",
            title: "Launch",
            color: "purple",
            icon: Zap,
            deliverables: ["SEO Mastery", "Cloud Deploy", "Scaling"],
            description: "Total deployment and ongoing performance optimization to ensure your product leads its industry.",
            image: launchImg,
            tag: "Global Deployment"
        }
    ], []);

    return (
        // The outer container establishes the total scrolling height (e.g., 400vh for 4 cards)
        <section id="how-it-works" ref={targetRef} className="relative bg-transparent h-[400vh]">

            {/* The sticky inner container stays in view while we scroll down */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-between py-[4vh] md:py-[6vh] overflow-hidden">
                <ParticlesBackground />
                <ElectricCurrent color="#06b6d4" className="top-20 left-[10%]" />
                <ElectricCurrent color="#a855f7" className="bottom-40 right-[10%] rotate-180" />

                {/* Background Gradients removed to showcase global animated background */}

                {/* 1. Header Area - Flows naturally at the top */}
                <div className="w-full px-6 flex-shrink-0 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-3 md:mb-4 cyan-glow-text">
                            How It Works
                        </span>
                        <AnimatedHeadline>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight">
                                From Idea to Launch in{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                    4 Simple Steps
                                </span>
                            </h2>
                        </AnimatedHeadline>
                        <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed hidden md:block mb-8 md:mb-12">
                            Our streamlined approach ensures your vision is translated into a pixel-perfect digital experience with speed and precision.
                        </p>
                    </motion.div>
                </div>

                {/* 2. Scrolling Viewport - Flex 1 takes remaining space, centers cards */}
                <div className="flex-1 w-full flex items-center overflow-hidden">
                    {/* The Track Container that Framer Motion animates */}
                    <motion.div
                        style={{ x }}
                        className="flex items-center gap-8 md:gap-12 px-[10vw] flex-nowrap w-max"
                    >
                        {steps.map((step, index) => (
                            <HorizontalStep
                                key={index}
                                step={step}
                                index={index}
                                progress={progressValue}
                                totalSteps={steps.length}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* 3. Progress Rail - Flows naturally at the bottom */}
                <div className="w-full max-w-md px-8 flex-shrink-0 z-20">
                    <div className="flex justify-between mb-3 px-2">
                        {steps.map((s, i) => (
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
                            style={{ width: `${Math.max(5, progressValue * 100)}%` }} // keep a little sliver active
                        />
                    </div>
                </div>

            </div>

            {/* Tailwind JIT Helpers */}
            <div className="hidden border-cyan-500 border-purple-500 bg-cyan-500 bg-purple-500 text-cyan-400 text-purple-400 border-cyan-500/40 border-purple-500/40" />
        </section>
    );
};

export default React.memo(ProcessSection);
