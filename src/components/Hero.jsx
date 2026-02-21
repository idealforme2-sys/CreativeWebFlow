import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TechHUD from './TechHUD';
import { RainbowButton } from './MagicUI';

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
        }, 2500);
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
        hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
        visible: {
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
            {/* Layered backgrounds */}
            <MorphGrid />
            <FloatingOrbs />
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
                {/* Status Badge with neon ring */}
                <motion.div variants={itemVariants}>
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-10 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md relative overflow-hidden border border-cyan-500/20 shadow-[0_0_30px_rgba(0,240,255,0.08)]">
                        {/* Heartbeat ring */}
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                            <span className="absolute inline-flex h-[200%] w-[200%] -top-1/2 -left-1/2 rounded-full bg-emerald-400/20 animate-[pulse_2s_ease-in-out_infinite]" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-purple-300">
                            Available for Projects
                        </span>
                        {/* Shimmer sweep */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                        />
                    </div>
                </motion.div>

                {/* Main Headline — word-by-word stagger with glow */}
                <motion.div
                    variants={itemVariants}
                    className="mb-4 relative z-20"
                    style={{ y: bgY, opacity: headingOpacity, scale: headingScale }}
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[1.05] text-white">
                        <span className="relative">
                            Websites that
                        </span>
                        <br />
                        <span className="relative inline-block">
                            bring you
                        </span>
                    </h1>
                </motion.div>

                {/* Rotating Word with gradient + glow */}
                <motion.div
                    variants={itemVariants}
                    className="mb-16 h-[1.3em] relative"
                    style={{ y: bgY, opacity: headingOpacity, scale: headingScale }}
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[1.05]">
                        <span className="text-white">more </span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentWordIndex}
                                initial={{ y: 50, opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                                exit={{ y: -50, opacity: 0, filter: 'blur(8px)', scale: 1.05 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${rotatingWords[currentWordIndex].gradient}`}
                                style={{
                                    textShadow: 'none',
                                }}
                            >
                                {rotatingWords[currentWordIndex].text}
                            </motion.span>
                        </AnimatePresence>
                    </h1>
                </motion.div>

                {/* Sub-headline with refined typography */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed font-light"
                >
                    We design and build high-performance websites for local businesses
                    that turn visitors into{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">real customers</span>.
                </motion.p>

                {/* Trust signals — refined with glowing pips */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center gap-6 text-sm text-white/40 mb-12 justify-center"
                >
                    {[
                        { label: 'Fast Loading', color: 'bg-cyan-400', shadow: 'shadow-[0_0_10px_rgba(6,182,212,1)]' },
                        { label: 'Mobile-First', color: 'bg-purple-400', shadow: 'shadow-[0_0_10px_rgba(168,85,247,1)]' },
                        { label: 'Built to Convert', color: 'bg-pink-400', shadow: 'shadow-[0_0_10px_rgba(236,72,153,1)]' },
                    ].map((item) => (
                        <span key={item.label} className="flex items-center gap-2 hover:text-white/70 transition-colors duration-300 cursor-default">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.color} ${item.shadow}`} />
                            {item.label}
                        </span>
                    ))}
                </motion.div>

                {/* CTA Buttons — premium with glow & effects */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-5 justify-center"
                >
                    {/* Primary CTA — Premium Glassmorphic with Animated Beam */}
                    <div className="relative group cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        {/* Outer ambient glow */}
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />

                        {/* Button body */}
                        <div className="relative px-8 py-4 bg-slate-900/80 backdrop-blur-xl rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
                            {/* Sweeping animated beam border */}
                            <div
                                className="absolute inset-0 rounded-full opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                                style={{
                                    background: 'conic-gradient(from 0deg at 50% 50%, transparent 60%, #06b6d4 80%, #a855f7 90%, transparent 100%)',
                                    animation: 'spin 3s linear infinite',
                                }}
                            />
                            {/* Inner knockout for the beam to only show on edges */}
                            <div className="absolute inset-[1px] bg-slate-900/90 rounded-full z-0" />

                            {/* Inner top highlight */}
                            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-10" />

                            <span className="relative z-10 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-white">
                                <svg className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 7l8 5 8-5-8-5z" /><path d="M4 12l8 5 8-5" /><path d="M4 17l8 5 8-5" /></svg>
                                Get More Customers
                                <motion.span
                                    animate={{ x: [0, 8, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-lg text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                                >
                                    →
                                </motion.span>
                            </span>

                            {/* Hover shimmer sweep */}
                            <motion.div
                                className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] translate-x-[-150%]"
                                whileHover={{ translateX: ['-150%', '150%'] }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                            />
                        </div>
                    </div>

                    {/* Secondary CTA — Deep Architectural Style */}
                    <motion.a
                        href="#work"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] overflow-hidden group border border-white/5 bg-black/40 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/20 hover:bg-black/60"
                    >
                        {/* Hover glow behind text */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />

                        <span className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-300">View Our Work</span>
                    </motion.a>
                </motion.div>

                {/* Social proof micro-stat */}
                <motion.div
                    variants={itemVariants}
                    className="mt-14 flex items-center gap-4"
                >
                    <div className="flex -space-x-2">
                        {['bg-gradient-to-br from-cyan-400 to-blue-500', 'bg-gradient-to-br from-purple-400 to-pink-500', 'bg-gradient-to-br from-emerald-400 to-teal-500'].map((bg, i) => (
                            <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-black flex items-center justify-center text-white text-[10px] font-bold`}>
                                {['CW', 'JD', 'MR'][i]}
                            </div>
                        ))}
                    </div>
                    <div className="text-xs text-white/40">
                        <span className="text-white/70 font-semibold">Trusted by local businesses</span>
                        <span className="mx-1.5">·</span>
                        <span className="text-emerald-400">★ 5.0</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator — refined with pulsing line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-cyan-500/50 via-white/20 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
