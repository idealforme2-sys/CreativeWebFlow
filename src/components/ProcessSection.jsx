import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Layout, Terminal, Zap, ArrowRight, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import local images for fallbacks
import discoveryImg from '../assets/process/discovery.png';
import designImg from '../assets/process/design.png';
import buildImg from '../assets/process/build.png';
import launchImg from '../assets/process/launch.png';

gsap.registerPlugin(ScrollTrigger);

const API_KEY = "AIzaSyB-9iwrNtgxc4IG584dj1YIKG7WlhqyGvw";

const fetchWithRetry = async (url, options, retries = 5, backoff = 1000) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok && retries > 0) throw new Error('Fetch failed');
        return response;
    } catch (err) {
        if (retries <= 0) throw err;
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
};

const HorizontalStep = ({ step, index, progress, totalSteps }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    // Focus math: Determine active state
    const stepInterval = 1 / totalSteps;
    const cardCenter = (index + 0.5) * stepInterval;
    const distanceFromCenter = Math.abs(progress - cardCenter);
    const isFocused = distanceFromCenter < 0.12;

    // Calculate a 3D tilt based on position
    const tilt = (progress - cardCenter) * 40;

    useEffect(() => {
        const generateImage = async () => {
            if (!step.imagePrompt) return;
            try {
                const response = await fetchWithRetry(
                    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            instances: [{ prompt: step.imagePrompt }],
                            parameters: { sampleCount: 1 }
                        }),
                    }
                );
                const data = await response.json();
                if (data.predictions?.[0]?.bytesBase64Encoded) {
                    setImageUrl(`data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`);
                } else {
                    // Fallback to local image if API fails
                    setImageUrl(step.fallbackImage);
                }
            } catch (error) {
                console.error("Image generation failed", error);
                setImageUrl(step.fallbackImage);
            } finally {
                setLoading(false);
            }
        };
        generateImage();
    }, [step.imagePrompt, step.fallbackImage]);

    const Icon = step.icon;

    return (
        <div
            className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[65vh] flex-shrink-0 group perspective-1000"
            style={{
                transform: `rotateY(${tilt}deg) translateZ(${isFocused ? '30px' : '0px'})`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            <div
                className={`w-full h-full rounded-[2.5rem] overflow-hidden border transition-all duration-1000 ease-out relative flex flex-col backdrop-blur-md ${isFocused
                    ? `border-${step.color}-500/40 bg-slate-900/80 shadow-[0_0_50px_rgba(var(--${step.color}-rgb),0.15)]`
                    : 'border-white/5 bg-slate-900/30 opacity-40 blur-[1px] grayscale'
                    }`}
            >
                <div className="flex flex-col md:flex-row h-full">
                    {/* Visual Engine */}
                    <div className="w-full md:w-[45%] h-[40%] md:h-full relative overflow-hidden bg-black">
                        {loading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-8 h-8 border-2 border-${step.color}-500/20 border-t-${step.color}-500 rounded-full animate-spin`} />
                            </div>
                        ) : (
                            <img
                                src={imageUrl}
                                alt={step.title}
                                className={`w-full h-full object-cover transition-transform duration-[5000ms] ${isFocused ? 'scale-105' : 'scale-125'}`}
                            />
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/90 md:from-transparent via-transparent to-slate-900/95 transition-opacity duration-1000 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

                        <div className={`absolute top-6 left-6 flex items-center gap-3 transition-all duration-1000 ${isFocused ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <div className={`w-2.5 h-2.5 rounded-full bg-${step.color}-500 animate-ping`} />
                            <span className="text-[9px] font-black tracking-[0.4em] text-white uppercase opacity-60">Phase {step.number}</span>
                        </div>
                    </div>

                    {/* Intel Section */}
                    <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center relative">
                        <div className={`mb-6 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700 ${isFocused ? `bg-${step.color}-500/20 text-${step.color}-400` : 'bg-white/5 text-white/20'}`}>
                            <Icon size={24} />
                        </div>

                        <h3 className={`text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-none transition-all duration-700 ${isFocused ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                            {step.title}
                        </h3>

                        <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
                            {step.description}
                        </p>

                        <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-150 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            {step.deliverables.map((item, i) => (
                                <span key={i} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider border border-white/10 bg-white/5 text-gray-300 transition-colors cursor-default`}>
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className={`flex items-center gap-4 transition-all duration-700 delay-300 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <div className={`w-8 h-[1px] bg-${step.color}-500/40`} />
                            <span className={`text-[10px] font-bold uppercase tracking-widest text-white/50`}>System Execution</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProcessSection = () => {
    const sectionRef = useRef(null);
    const trackContainerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const steps = useMemo(() => [
        {
            number: "01",
            title: "Discovery",
            color: "cyan",
            icon: Fingerprint,
            deliverables: ["Market Audit", "User Personas", "Product DNA"],
            description: "We surgically extract your brand DNA and market positioning to map a data-driven path to dominance.",
            imagePrompt: "Close-up macro of a futuristic fingerprint glowing with cyan circuit lines on a dark obsidian glass surface, 8k render, high-end tech aesthetic.",
            fallbackImage: discoveryImg
        },
        {
            number: "02",
            title: "Design",
            color: "purple", // Matched previous colors
            icon: Layout,
            deliverables: ["UI Strategy", "Prototypes", "Design System"],
            description: "Crafting sensory interfaces that blend intuitive utility with breathtaking visual storytelling.",
            imagePrompt: "Top-down view of translucent purple digital UI layers floating in 3D space, soft violet glows, professional studio lighting, minimalist, 8k.",
            fallbackImage: designImg
        },
        {
            number: "03",
            title: "Build",
            color: "cyan", // Matched previous colors
            icon: Terminal,
            deliverables: ["Clean Architecture", "API Core", "Security"],
            description: "Engineering high-performance, ultra-fast digital engines that scale effortlessly with your vision.",
            imagePrompt: "Abstract 3D render of glowing blue fiber-optic strands forming a complex crystalline node, obsidian background, electric energy, 8k.",
            fallbackImage: buildImg
        },
        {
            number: "04",
            title: "Launch",
            color: "purple", // Matched previous colors
            icon: Zap,
            deliverables: ["SEO Mastery", "Cloud Deploy", "Scaling"],
            description: "Total deployment and ongoing performance optimization to ensure your product leads its industry.",
            imagePrompt: "A sleek aerodynamic white form breaking through a layer of golden clouds at high speed, sun flare, cinematic lighting, masterpiece 8k.",
            fallbackImage: launchImg
        }
    ], []);

    useEffect(() => {
        const section = sectionRef.current;
        const trackContainer = trackContainerRef.current;
        if (!section || !trackContainer) return;

        // Use mm to automatically handle window resizes within the context
        const ctx = gsap.context(() => {
            // Calculate the exact distance to translate the track
            // It needs to move fully so the last item is visible, minus window width to stop correctly
            const getScrollAmount = () => -(trackContainer.scrollWidth - window.innerWidth);

            gsap.to(trackContainer, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${trackContainer.scrollWidth - window.innerWidth}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true, // Recalculate on resize
                    onUpdate: (self) => {
                        setScrollProgress(self.progress);
                    }
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-[#050505] overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-[#050505] pointer-events-none" />

            {/* This container pins to the screen for the duration of the scroll */}
            <div className="h-screen w-full flex flex-col justify-center relative z-10">

                {/* Restored Intro Header Text - Fixed at Top */}
                <div className="absolute top-24 left-0 w-full z-20 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="inline-block text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 cyan-glow-text">
                            How It Works
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            From Idea to Launch in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                4 Simple Steps
                            </span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                            Our streamlined approach ensures your vision is translated into a pixel-perfect digital experience with speed and precision.
                        </p>
                    </motion.div>
                </div>

                {/* GSAP Horizontal Track wrapper */}
                {/* Added mt-32 to push track down below the absolute header */}
                <div className="flex items-center h-full w-full overflow-hidden mt-32 md:mt-40">
                    <div
                        ref={trackContainerRef}
                        className="flex items-center gap-10 px-[10vw] flex-nowrap w-max will-change-transform"
                    >
                        {steps.map((step, index) => (
                            <HorizontalStep
                                key={index}
                                step={step}
                                index={index}
                                progress={scrollProgress}
                                totalSteps={steps.length}
                            />
                        ))}
                    </div>
                </div>

                {/* Clean Progress Rail */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md px-8 z-20">
                    <div className="flex justify-between mb-3 px-2">
                        {steps.map((s, i) => (
                            <span
                                key={i}
                                className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-500 ${scrollProgress * (steps.length - 1) >= (i - 0.1) ? 'text-white' : 'text-white/20'}`}
                            >
                                0{i + 1}
                            </span>
                        ))}
                    </div>
                    <div className="h-[2px] w-full bg-white/10 rounded-full relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${Math.max(5, scrollProgress * 100)}%` }} // keep a little sliver active
                        />
                    </div>
                </div>

            </div>

            {/* Tailwind JIT Helpers for Dynamic Colors */}
            <div className="hidden border-cyan-500 border-purple-500 bg-cyan-500 bg-purple-500 text-cyan-400 text-purple-400" />
        </section>
    );
};

export default ProcessSection;
