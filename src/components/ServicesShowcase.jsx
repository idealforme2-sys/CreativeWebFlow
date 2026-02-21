import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { BlurFadeIn, MagneticButton, ParticlesBackground } from './UIComponents';
import { ArrowRight, Check, CheckCircle2, Star, TrendingUp, Search } from 'lucide-react';


// 3D Tilt Wrapper Component
const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        // Calculate mouse position relative to center of element
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ perspective: 1000 }}
            className={`cursor-crosshair ${className}`}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full relative"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

// Data Structure
const tabsData = [
    {
        id: 'web',
        title: 'Web Development',
        gradient: 'from-blue-600 to-indigo-600',
        textGradient: 'from-blue-400 to-cyan-300',
        neonShadow: 'shadow-[0_0_20px_rgba(59,130,246,0.5)]',
        colorClass: 'text-blue-400',
        borderClass: 'border-blue-500/20',
        bgGlowClass: 'bg-blue-500/10 hover:bg-blue-500/20',
        heading: 'Websites built to bring customers',
        description: 'Your website is your hardest working employee. We build fast, mobile-friendly sites that turn visitors into paying customers.',
        features: [
            'Professional, responsive design',
            'Perfect on every device',
            'Lightning-fast performance'
        ],
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        floatingOverlay: (
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex items-center space-x-4"
            >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-medium">Conversion Rate</p>
                    <p className="text-lg font-bold text-white">+142%</p>
                </div>
            </motion.div>
        )
    },
    {
        id: 'smart',
        title: 'Smart Features',
        gradient: 'from-purple-600 to-pink-600',
        textGradient: 'from-purple-400 to-pink-400',
        neonShadow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
        colorClass: 'text-purple-400',
        borderClass: 'border-purple-500/20',
        bgGlowClass: 'bg-purple-500/10 hover:bg-purple-500/20',
        heading: 'Smart tools for modern businesses',
        description: 'Automate tasks, improve customer experience, and save time with custom features built for your specific needs.',
        features: [
            'Customer portals & dashboards',
            'Online booking systems',
            'Progressive Web Apps'
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        floatingOverlay: (
            <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 -right-6 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex items-center space-x-4"
            >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-medium">System Status</p>
                    <p className="text-sm font-bold text-white">Automated</p>
                </div>
            </motion.div>
        )
    },
    {
        id: 'local',
        title: 'Local Marketing',
        gradient: 'from-teal-500 to-emerald-500',
        textGradient: 'from-teal-400 to-emerald-400',
        neonShadow: 'shadow-[0_0_20px_rgba(20,184,166,0.5)]',
        colorClass: 'text-teal-400',
        borderClass: 'border-teal-500/20',
        bgGlowClass: 'bg-teal-500/10 hover:bg-teal-500/20',
        heading: 'Help customers find you online',
        description: 'Get found when customers search for businesses like yours. We optimize your presence for local searches and build your reputation.',
        features: [
            'Google Business optimization',
            'Review management & SEO',
            'Performance tracking'
        ],
        image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        floatingOverlay: (
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 right-10 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex items-center space-x-4"
            >
                <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-500 flex items-center justify-center text-xs font-bold text-white"><Star size={12} className="mr-0.5 fill-white" />5</div>
                    <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-500 flex items-center justify-center text-xs font-bold text-white"><Star size={12} className="mr-0.5 fill-white" />5</div>
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-medium">Customer Reviews</p>
                    <p className="text-sm font-bold text-white">Growing fast</p>
                </div>
            </motion.div>
        )
    }
];

const ServicesShowcase = () => {
    const [activeTabId, setActiveTabId] = useState(tabsData[0].id);
    const activeData = tabsData.find(t => t.id === activeTabId);

    // Slide variants for directional content transition
    const contentVariants = {
        enter: { opacity: 0, x: -30, filter: 'blur(8px)' },
        center: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: 30, filter: 'blur(8px)' },
    };

    const imageVariants = {
        enter: { opacity: 0, scale: 0.9, rotateY: 10 },
        center: { opacity: 1, scale: 1, rotateY: 0 },
        exit: { opacity: 0, scale: 0.95 },
    };

    return (
        <section id="what-we-do" className="relative py-24 lg:py-32 overflow-hidden min-h-screen flex items-center">

            {/* Interactive Particle Background overlaying the site's existing dark bg */}
            <ParticlesBackground />

            {/* Glowing Ambient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                {/* Section Header */}
                <BlurFadeIn delay={0.1}>
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                        <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            Innovation Engine
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                            Everything your business <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                needs to grow.
                            </span>
                        </h2>
                    </div>
                </BlurFadeIn>

                {/* Tab Buttons (Glassmorphic with Sliding Pill via Framer Motion) */}
                <BlurFadeIn delay={0.2}>
                    <div className="flex justify-start sm:justify-center overflow-x-auto no-scrollbar mb-16 pb-4 sm:pb-0">
                        <div className="relative flex space-x-1 bg-white/5 border border-white/10 backdrop-blur-md p-1.5 rounded-2xl min-w-max">
                            {tabsData.map((tab) => {
                                const isActive = activeTabId === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTabId(tab.id)}
                                        className={`relative z-10 px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors duration-300 w-48 text-center ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabBg"
                                                className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl ${tab.neonShadow} -z-10`}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        {tab.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </BlurFadeIn>

                {/* Tab Content Container */}
                <div className="relative perspective-1000 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeData.id}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
                        >
                            {/* Text Content */}
                            <motion.div
                                variants={contentVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="lg:col-span-5 order-2 lg:order-1"
                            >
                                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                                    {activeData.heading.split('to')[0]} to <br />
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeData.textGradient}`}>
                                        {activeData.heading.split('to')[1].trim()}
                                    </span>
                                </h3>
                                <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light">
                                    {activeData.description}
                                </p>

                                <ul className="space-y-5 mb-10">
                                    {activeData.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 + 0.2 }}
                                            className="flex items-center text-slate-200 group cursor-default"
                                        >
                                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${activeData.bgGlowClass} border ${activeData.borderClass} flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300`}>
                                                <Check className={`w-4 h-4 ${activeData.colorClass}`} />
                                            </div>
                                            <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <MagneticButton
                                    className={`group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-2xl overflow-hidden`}
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${activeData.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                </MagneticButton>
                            </motion.div>

                            {/* Image Content with Tilt */}
                            <motion.div
                                variants={imageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="lg:col-span-7 order-1 lg:order-2 perspective-1000"
                            >
                                <TiltCard className="w-full">
                                    <div className="relative w-full rounded-3xl p-2 bg-white/5 border border-white/10 backdrop-blur-md">
                                        {/* Image Glow */}
                                        <div className={`absolute inset-0 bg-gradient-to-tr ${activeData.gradient} rounded-3xl opacity-20 blur-2xl transition-opacity duration-500`} />

                                        <img
                                            src={activeData.image}
                                            alt={activeData.title}
                                            className="relative rounded-2xl w-full h-[300px] sm:h-[400px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 filter brightness-90 contrast-125"
                                        />

                                        {/* Floating overlay component */}
                                        {activeData.floatingOverlay}
                                    </div>
                                </TiltCard>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Tailwind classes that might be injected dynamically */}
            <div className="hidden shadow-[0_0_20px_rgba(59,130,246,0.5)] shadow-[0_0_20px_rgba(168,85,247,0.5)] shadow-[0_0_20px_rgba(20,184,166,0.5)]" />
        </section>
    );
};

export default ServicesShowcase;
