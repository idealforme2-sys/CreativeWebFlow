import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TechHUD from './TechHUD';
import { ShootingStars, MagneticWrapper } from './UIComponents';
import { Meteors } from './magicui/Meteors';
import { LineShadowText } from './magicui/LineShadowText';
import { PulsatingButton } from './magicui/PulsatingButton';

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
                    willChange: 'transform',
                    animation: 'gridPulse 12s ease-in-out infinite',
                    maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent)',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent)',
                }}
            />
            <style>{`
                @keyframes gridPulse {
                    0%, 100% { transform: perspective(500px) rotateX(35deg) scale(2.0) translateY(-5%); }
                    50% { transform: perspective(500px) rotateX(40deg) scale(2.1) translateY(-8%); }
                }
            `}</style>
        </div>
    );
};

// Floating orbs component for ambient atmosphere
// Reduced radius and blur to heavily save on CSS rasterization overhead
const FloatingOrbs = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            animate={{
                x: [0, 50, -25, 0],
                y: [0, -40, 20, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[60px] will-change-transform"
        />
        <motion.div
            animate={{
                x: [0, -60, 30, 0],
                y: [0, 30, -50, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-[10%] w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[60px] will-change-transform"
        />
    </div>
);

// Compact Trust Metric
const CompactMetric = ({ icon, value, label, color }) => {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/30 hover:border-white/50 hover:bg-slate-800/80 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
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
            <motion.button
                className="relative group cursor-pointer overflow-hidden rounded-full px-8 py-3.5"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                    background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #ec4899)',
                    backgroundSize: '300% 100%',
                    animation: 'pulseBackground 4s linear infinite',
                }}
            >
                {/* Shimmer */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -skew-x-12 pointer-events-none"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                    <motion.span
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-cyan-200"
                    >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L4 7l8 5 8-5-8-5z" />
                            <path d="M4 12l8 5 8-5" />
                            <path d="M4 17l8 5 8-5" />
                        </svg>
                    </motion.span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Get More Customers
                    </span>
                    <motion.span
                        animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                        transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
                        className="text-purple-200"
                    >
                        →
                    </motion.span>
                </span>
            </motion.button>
        </MagneticWrapper>
    );
};

// Secondary CTA — static gradient border + shimmer sweep
const SecondaryCTA = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <MagneticWrapper strength={0.2}>
            <motion.a
                href="#work"
                onClick={onClick}
                className="relative group block rounded-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    padding: '1px',
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.4), rgba(168,85,247,0.4), rgba(236,72,153,0.4))',
                }}
            >
                <div className="rounded-full bg-black/85 backdrop-blur-md px-6 py-3 relative overflow-hidden">
                    {/* Shimmer sweep */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12 pointer-events-none"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                    />
                    <div className="relative z-10 flex items-center gap-2">
                        <motion.svg
                            className="w-4 h-4 text-white/60 group-hover:text-cyan-400 transition-colors"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </motion.svg>
                        <span className="text-sm font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                            View Our Work
                        </span>
                    </div>
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
            {/* Custom Animation for Text Gleam */}
            <style>{`
                @keyframes text-shine {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
                .animate-text-shine {
                    animation: text-shine 4s linear infinite;
                }
            `}</style>
            {/* Layered backgrounds */}
            <MorphGrid />
            <FloatingOrbs />
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <Meteors number={80} />
            </div>
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
                    className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8 leading-relaxed text-white/70"
                >
                    We design and build high-performance websites for local businesses
                    that turn visitors into{' '}
                    <span className="text-cyan-400 font-semibold" style={{ textShadow: '0 0 12px rgba(6,182,212,0.5)' }}>real customers</span>.
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
