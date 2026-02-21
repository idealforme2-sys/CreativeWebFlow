import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Smartphone, Lock, Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { RevealOnScroll, AnimatedHeadline, FloatingOrbs } from './UIComponents';

// Import local images for commitment cards (Stitch 3D abstract assets)
import speedImg from '../assets/commitments/speed_bolt.png';
import responsiveImg from '../assets/commitments/responsive_glass.png';
import freedomImg from '../assets/commitments/freedom_lock.png';

const guarantees = [
    {
        icon: Zap,
        value: '<3s',
        label: 'Load Time',
        subtitle: 'Velocity',
        title: 'Instant Velocity',
        description: 'Engineering performance at the atomic level. Our sites load before you can blink, featuring a crystalline lightning-fast architecture.',
        neonColor: '#00f0ff', // Cyan
        image: speedImg,
        floatDelay: 0,
    },
    {
        icon: Smartphone,
        value: '100%',
        label: 'Responsive',
        subtitle: 'Fluidity',
        title: 'Fluid Adaptation',
        description: 'Like morphing liquid glass, our layouts adapt seamlessly to any container. From 4k ultrawides to mobile screens.',
        neonColor: '#bd00ff', // Purple
        image: responsiveImg,
        floatDelay: 2,
    },
    {
        icon: Lock,
        value: 'Zero',
        label: 'Lock-In',
        subtitle: 'Freedom',
        title: 'Total Freedom',
        description: 'We build with open standards. A dematerializing lock represents your freedom—full code ownership, no hostage situations.',
        neonColor: '#ff0099', // Pink
        image: freedomImg,
        floatDelay: 4,
    },
];

const testimonials = [
    {
        quote: "Creative WebFlow took my outdated website and turned it into something that actually brings in customers. Within the first month, I started getting online bookings I never had before.",
        name: "Sarah Mitchell",
        business: "Glow & Grace Salon",
        industry: "Beauty & Wellness"
    },
    {
        quote: "I was skeptical about investing in a new website, but the results speak for themselves. My Google visibility shot up and I'm getting calls from new patients every week.",
        name: "Dr. James Carter",
        business: "Carter Family Dental",
        industry: "Healthcare"
    },
    {
        quote: "They didn't just build us a website — they understood our brand and built something that makes us look like a premium shop. Our competitors are jealous.",
        name: "Marco Reyes",
        business: "Precision Auto Works",
        industry: "Automotive"
    },
];

const SocialProofSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        // Restored transparency: bg-transparent instead of opaque
        <section className="relative py-24 lg:py-32 overflow-hidden bg-transparent">
            {/* Background - adjusted for transparency */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-purple-950/20 to-black/80 z-0" />
            <FloatingOrbs count={4} color1="#00f0ff" color2="#bd00ff" />
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen z-0" />

            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")` }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-24 relative flex flex-col items-center">
                    <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"></span>
                        <span className="text-xs tracking-[0.3em] font-bold text-slate-200 uppercase">Core Architecture</span>
                    </div>
                    <AnimatedHeadline>
                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white">
                            Built on Promises <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#bd00ff] to-[#00f0ff] bg-[length:200%_auto] animate-shimmer">
                                We Actually Keep
                            </span>
                        </h2>
                    </AnimatedHeadline>
                    <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        High-fidelity engineering for the modern web. We focus on the metrics that matter most to your growth.
                    </p>
                </div>

                {/* 3D Abstract Commitment Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch mb-32">
                    {guarantees.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.2 }}
                                className="h-full"
                            >
                                <div className="group relative rounded-3xl overflow-hidden h-[460px] border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] flex flex-col transition-all duration-500">
                                    {/* Background Image with Floating Animation */}
                                    <div className="absolute inset-0 z-0">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/20 to-[#050508]/90 z-10" />
                                        <motion.img
                                            animate={{
                                                y: [0, -10, 0],
                                            }}
                                            transition={{
                                                duration: 6,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: item.floatDelay
                                            }}
                                            alt={item.label}
                                            className="w-full h-full object-cover opacity-60 mix-blend-screen scale-100 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                                            src={item.image}
                                        />
                                        {/* Ambient Glow Spot */}
                                        <div className="absolute top-0 right-0 p-10 opacity-30">
                                            <div className="w-64 h-64 blur-[100px] rounded-full mix-blend-screen" style={{ backgroundColor: item.neonColor }}></div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-20 h-full flex flex-col pt-12">
                                        <div className="px-8 text-center flex-1">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 mb-6 backdrop-blur-xl shadow-lg">
                                                <Icon className="text-3xl" style={{ color: item.neonColor }} />
                                            </div>
                                            <div className="relative">
                                                <h3
                                                    className="text-8xl font-bold text-white tracking-tighter drop-shadow-2xl"
                                                    style={{
                                                        textShadow: `0 0 15px ${item.neonColor}80`,
                                                        WebkitTextStroke: '1px rgba(255,255,255,0.1)'
                                                    }}
                                                >
                                                    {item.value}
                                                </h3>
                                                <div className="absolute -inset-1 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: `${item.neonColor}33` }}></div>
                                            </div>
                                            <p className="font-bold tracking-widest uppercase text-sm mt-2 opacity-80" style={{ color: item.neonColor }}>
                                                {item.label}
                                            </p>
                                        </div>

                                        {/* Frosted Bottom Panel */}
                                        <div className="p-8 backdrop-blur-xl bg-black/40 border-t border-white/15 h-full mt-auto">
                                            <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                                            <p className="text-slate-300 text-sm leading-relaxed font-light line-clamp-3">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Testimonials */}
                <RevealOnScroll>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">
                                What Our Clients Say
                            </h3>
                        </div>

                        {/* Testimonial Display */}
                        <div className="relative glass-card rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col justify-center border border-white/10 bg-white/5 backdrop-blur-sm">
                            <Quote className="absolute top-6 left-6 w-8 h-8 text-cyan-500/20" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTestimonial}
                                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-center"
                                >
                                    <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 italic">
                                        "{testimonials[currentTestimonial].quote}"
                                    </p>
                                    <div>
                                        <p className="text-white font-semibold text-lg">
                                            {testimonials[currentTestimonial].name}
                                        </p>
                                        <p className="text-cyan-400 text-sm">
                                            {testimonials[currentTestimonial].business}
                                        </p>
                                        <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">
                                            {testimonials[currentTestimonial].industry}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex justify-center gap-4 mt-8">
                                <button
                                    onClick={prevTestimonial}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
                                    aria-label="Previous testimonial"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex gap-2 items-center">
                                    {testimonials.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentTestimonial(idx)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'w-6 bg-cyan-400' : 'bg-white/20 hover:bg-white/40'
                                                }`}
                                            aria-label={`Go to testimonial ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={nextTestimonial}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white"
                                    aria-label="Next testimonial"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section >
    );
};

export default SocialProofSection;
