import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Globe, Smartphone, Zap, Search, MapPin, Star, BarChart3, Users, Repeat, Lock, ArrowRight } from 'lucide-react';
import { RevealOnScroll, BlurFadeIn, MagneticButton } from './UIComponents';

const services = [
    {
        id: 'web',
        label: 'Web Development',
        icon: Globe,
        gradient: 'from-cyan-500 to-blue-500',
        bgGlow: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/30',
        textColor: 'text-cyan-400',
        glowColor: 'rgba(6, 182, 212, 0.15)',
        headline: 'Websites built to bring customers',
        description: 'Your website is your hardest working employee. We build fast, mobile-friendly sites that turn visitors into paying customers.',
        features: [
            { icon: Globe, text: 'Professional, responsive design' },
            { icon: Smartphone, text: 'Perfect on every device' },
            { icon: Zap, text: 'Lightning-fast performance' },
            { icon: Search, text: 'SEO optimized from day one' },
        ]
    },
    {
        id: 'app',
        label: 'Smart Features',
        icon: Smartphone,
        gradient: 'from-purple-500 to-pink-500',
        bgGlow: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30',
        textColor: 'text-purple-400',
        glowColor: 'rgba(168, 85, 247, 0.15)',
        headline: 'Smart tools for modern businesses',
        description: 'Automate tasks, improve customer experience, and save time with custom features built for your specific needs.',
        features: [
            { icon: Users, text: 'Customer portals & dashboards' },
            { icon: Repeat, text: 'Online booking systems' },
            { icon: Lock, text: 'Custom integrations' },
            { icon: Smartphone, text: 'Progressive Web Apps' },
        ]
    },
    {
        id: 'marketing',
        label: 'Local Marketing',
        icon: MapPin,
        gradient: 'from-pink-500 to-orange-500',
        bgGlow: 'bg-pink-500/10',
        borderColor: 'border-pink-500/30',
        textColor: 'text-pink-400',
        glowColor: 'rgba(236, 72, 153, 0.15)',
        headline: 'Help customers find you online',
        description: 'Get found when customers search for businesses like yours. We optimize your presence for local searches and build your reputation.',
        features: [
            { icon: MapPin, text: 'Google Business optimization' },
            { icon: Star, text: 'Review management' },
            { icon: Search, text: 'Local SEO strategy' },
            { icon: BarChart3, text: 'Performance tracking' },
        ]
    }
];

// Individual feature card with premium vibration + distortion
const FeatureCard = ({ feat, active, index }) => {
    const FeatIcon = feat.icon;

    // Unique vibration timing per card
    const vibDuration = 2.5 + index * 0.4;
    const vibDelay = index * 0.3;

    return (
        <motion.div
            key={feat.text}
            initial={{ opacity: 0, scale: 0.85, y: 30, filter: 'blur(8px)' }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                x: [0, -1.2, 0.8, -0.5, 0],
                rotate: [0, -0.3, 0.2, -0.15, 0],
            }}
            exit={{ opacity: 0, scale: 0.9, y: -15, filter: 'blur(6px)' }}
            transition={{
                opacity: { delay: index * 0.08 + 0.15, duration: 0.5 },
                scale: { delay: index * 0.08 + 0.15, duration: 0.5 },
                y: { delay: index * 0.08 + 0.15, duration: 0.5 },
                filter: { delay: index * 0.08 + 0.15, duration: 0.5 },
                x: { delay: vibDelay + 1, duration: vibDuration, repeat: Infinity, ease: "easeInOut" },
                rotate: { delay: vibDelay + 1, duration: vibDuration, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
                y: -8,
                scale: 1.04,
                transition: { duration: 0.25 }
            }}
            className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-colors duration-300 backdrop-blur-sm overflow-hidden"
            style={{ perspective: '600px' }}
        >
            {/* Distortion shimmer on hover — chromatic aberration feel */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(135deg, 
                            rgba(255,0,128,0.06) 0%, 
                            transparent 40%, 
                            rgba(0,112,243,0.06) 60%, 
                            transparent 100%
                        )
                    `,
                    mixBlendMode: 'screen',
                }}
            />

            <div className={`w-10 h-10 rounded-lg ${active.bgGlow} border ${active.borderColor} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <FeatIcon size={20} className={active.textColor} />
            </div>
            <p className="text-sm text-white/80 font-medium leading-snug">{feat.text}</p>

            {/* Hover glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${active.glowColor}, transparent 70%)`,
                }}
            />
        </motion.div>
    );
};

const ServicesShowcase = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [direction, setDirection] = useState(1);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const active = services[activeTab];

    const handleTabChange = (i) => {
        setDirection(i > activeTab ? 1 : -1);
        setActiveTab(i);
    };

    // Slide variants for directional content transition
    const contentVariants = {
        enter: (dir) => ({
            opacity: 0,
            x: dir > 0 ? 60 : -60,
            filter: 'blur(12px)',
        }),
        center: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
        },
        exit: (dir) => ({
            opacity: 0,
            x: dir > 0 ? -60 : 60,
            filter: 'blur(12px)',
        }),
    };

    return (
        <section id="services" ref={containerRef} className="relative py-28 lg:py-36 overflow-hidden">
            {/* Background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black"
                style={{ y: backgroundY }}
            />

            {/* Animated orbs */}
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl"
            />

            {/* Active glow that shifts with tab */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                animate={{
                    background: activeTab === 0
                        ? 'radial-gradient(circle, rgba(6,182,212,0.3), transparent)'
                        : activeTab === 1
                            ? 'radial-gradient(circle, rgba(168,85,247,0.3), transparent)'
                            : 'radial-gradient(circle, rgba(236,72,153,0.3), transparent)',
                }}
                transition={{ duration: 0.8 }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-12 bg-cyan-500" />
                            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em]">What We Do</span>
                            <div className="h-px w-12 bg-cyan-500" />
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Everything your business{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                needs to grow
                            </span>
                        </h2>
                    </div>
                </RevealOnScroll>

                {/* Tab Buttons */}
                <BlurFadeIn delay={0.2}>
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            const isActive = i === activeTab;
                            return (
                                <motion.button
                                    key={service.id}
                                    onClick={() => handleTabChange(i)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'text-white shadow-lg'
                                        : 'text-white/50 hover:text-white/80 bg-white/[0.03] border border-white/[0.08]'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.gradient}`}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2.5">
                                        <Icon size={18} />
                                        {service.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </BlurFadeIn>

                {/* Active Service Content — directional slide */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={active.id}
                        custom={direction}
                        variants={contentVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    >
                        {/* Left — Text */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                                className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
                            >
                                {active.headline}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-lg text-gray-400 leading-relaxed mb-8"
                            >
                                {active.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <MagneticButton
                                    className={`group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${active.gradient} rounded-full text-white text-sm font-semibold uppercase tracking-wider`}
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Get Started
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </MagneticButton>
                            </motion.div>
                        </div>

                        {/* Right — Feature Cards with stagger */}
                        <div className="grid grid-cols-2 gap-4">
                            <AnimatePresence mode="wait">
                                {active.features.map((feat, i) => (
                                    <FeatureCard
                                        key={`${active.id}-${feat.text}`}
                                        feat={feat}
                                        active={active}
                                        index={i}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ServicesShowcase;
