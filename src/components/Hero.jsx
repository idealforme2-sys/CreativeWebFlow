import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TechHUD from './TechHUD';
import { ShootingStars, MagneticWrapper } from './UIComponents';
import { Meteors } from './magicui/Meteors';
import { LineShadowText } from './magicui/LineShadowText';

// GlitchText removed to restore pristine typography

// Morphing grid background for depth
const MorphGrid = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    animation: 'gridPulse 8s ease-in-out infinite',
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
                }}
            />
            <style>{`
                @keyframes gridPulse {
                    0%, 100% { transform: perspective(500px) rotateX(35deg) scale(2.5) translateY(-10%); }
                    50% { transform: perspective(500px) rotateX(40deg) scale(2.6) translateY(-12%); }
                }
            `}</style>
        </div>
    );
};

// Floating orbs component for ambient atmosphere
const FloatingOrbs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            animate={{
                x: [0, 100, -50, 0],
                y: [0, -80, 40, 0],
                scale: [1, 1.3, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-600/10 blur-[100px]"
        />
        <motion.div
            animate={{
                x: [0, -120, 60, 0],
                y: [0, 60, -100, 0],
                scale: [1, 0.8, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/15 to-pink-600/10 blur-[100px]"
        />
        <motion.div
            animate={{
                x: [0, 80, -80, 0],
                y: [0, -40, 80, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-[40%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/8 blur-[80px]"
        />
    </div>
);

// Compact Trust Metric
const CompactMetric = ({ icon, value, label, color }) => {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
            <span className="text-sm">{icon}</span>
            <span className={`text-sm font-semibold ${color}`}>{value}</span>
            <span className="text-xs text-white/50">{label}</span>
        </div>
    );
};

// Primary CTA Button with enhanced effects
const PrimaryCTA = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <MagneticWrapper strength={0.2}>
            <motion.div
                className="relative cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Outer glow ring */}
                <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 blur-lg"
                    animate={{
                        opacity: isHovered ? 0.4 : 0.2,
                        scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Button body */}
                <div className="relative px-6 py-3 bg-slate-900/90 backdrop-blur-xl rounded-full border border-white/10 overflow-hidden">
                    {/* Content */}
                    <div className="relative flex items-center gap-2">
                        {/* Icon */}
                        <motion.span
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-cyan-400"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L4 7l8 5 8-5-8-5z" />
                                <path d="M4 12l8 5 8-5" />
                                <path d="M4 17l8 5 8-5" />
                            </svg>
                        </motion.span>

                        {/* Text */}
                        <span className="text-sm font-bold uppercase tracking-wider text-white">
                            Get More Customers
                        </span>

                        {/* Animated arrow */}
                        <motion.span
                            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                            transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
                            className="text-purple-400"
                        >
                            →
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </MagneticWrapper>
    );
};

// Secondary CTA Button with Eye Icon
const SecondaryCTA = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <MagneticWrapper strength={0.2}>
            <motion.a
                href="#work"
                onClick={onClick}
                className="relative group block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 group-hover:border-white/30">
                    <div className="flex items-center gap-2">
                        {/* Eye Icon */}
                        <motion.svg
                            className="w-4 h-4 text-white/60 group-hover:text-cyan-400 transition-colors"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </motion.svg>

                        {/* Text */}
                        <span className="text-sm font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                            View Our Work
                        </span>
                    </div>

                    {/* Bottom accent line */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
                        animate={{ width: isHovered ? '60%' : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </motion.a>
        </MagneticWrapper>
    );
};

const Hero = () => {
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 600], [0, 100]);
    const headingOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const headingScale = useTransform(scrollY, [0, 400], [1, 0.95]);

    const rotatingWords = [
        { text: 'customers', gradient: 'from-cyan-400 via-blue-400 to-cyan-300' },
        { text: 'bookings', gradient: 'from-purple-400 via-violet-400 to-purple-300' },
        { text: 'calls', gradient: 'from-pink-400 via-rose-400 to-pink-300' },
        { text: 'growth', gradient: 'from-emerald-400 via-teal-400 to-emerald-300' },
        { text: 'results', gradient: 'from-amber-400 via-orange-400 to-amber-300' },
    ];

    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Stagger animation for the hero elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-12">
            {/* Layered backgrounds */}
            <MorphGrid />
            <FloatingOrbs />
            <Meteors number={30} />
            <ShootingStars count={25} color="#bd00ff" />
            <TechHUD />

            {/* Radial spotlight from center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.04)_0%,transparent_50%)] pointer-events-none" />

            {/* Hero Content — Centered */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center"
            >
                {/* Status Badge */}
                <motion.div variants={itemVariants}>
                    <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-cyan-500/20">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-purple-300">
                            Available for Projects
                        </span>
                    </div>
                </motion.div>

                {/* Main Headline - Smaller Size */}
                <motion.div
                    variants={itemVariants}
                    className="mb-3 relative z-20"
                    style={{ y: bgY, opacity: headingOpacity, scale: headingScale }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.1] text-white">
                        <span className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.2)' }}>
                            Websites that
                        </span>
                        <br />
                        <span className="relative inline-block mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.2)' }}>
                            bring you
                        </span>
                    </h1>
                </motion.div>

                {/* Rotating Word with smooth transition */}
                <motion.div
                    variants={itemVariants}
                    className="mb-14 h-[1.3em] relative"
                    style={{ y: bgY, opacity: headingOpacity, scale: headingScale }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.3] px-4 -mx-4 overflow-visible">
                        <span className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.2)' }}>more </span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentWordIndex}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -30, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className={`inline-block px-3 -mx-3 pr-8`}
                            >
                                <LineShadowText shadowColor="rgba(255,255,255,0.4)" className={`italic pr-2 text-transparent bg-clip-text bg-gradient-to-r ${rotatingWords[currentWordIndex].gradient}`}>
                                    {rotatingWords[currentWordIndex].text}
                                </LineShadowText>
                            </motion.span>
                        </AnimatePresence>
                    </h1>
                </motion.div>

                {/* Sub-headline */}
                <motion.p
                    variants={itemVariants}
                    className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-6 leading-relaxed"
                >
                    We design and build high-performance websites for local businesses
                    that turn visitors into{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">real customers</span>.
                </motion.p>

                {/* Compact Trust Metrics */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-center gap-3 mb-10"
                >
                    <CompactMetric icon="⚡" value="0.8s" label="load" color="text-cyan-400" />
                    <CompactMetric icon="📱" value="100%" label="mobile" color="text-purple-400" />
                    <CompactMetric icon="📈" value="340%" label="ROI" color="text-pink-400" />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-4 justify-center"
                >
                    <PrimaryCTA onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
                    <SecondaryCTA onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                    }} />
                </motion.div>

                {/* Social proof */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 flex items-center gap-3"
                >
                    <div className="flex -space-x-2">
                        {['bg-gradient-to-br from-cyan-400 to-blue-500', 'bg-gradient-to-br from-purple-400 to-pink-500', 'bg-gradient-to-br from-emerald-400 to-teal-500'].map((bg, i) => (
                            <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-black flex items-center justify-center text-white text-[9px] font-bold`}>
                                {['CW', 'JD', 'MR'][i]}
                            </div>
                        ))}
                    </div>
                    <div className="text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
                        <span className="text-white hover:text-cyan-400 transition-colors">Trusted by local businesses</span>
                        <span className="mx-2 text-cyan-400">·</span>
                        <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">★ 5.0</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Scroll</span>
                    <div className="w-px h-10 bg-gradient-to-b from-cyan-500/50 via-white/20 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
