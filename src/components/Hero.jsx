import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TechHUD from './TechHUD';
import { ShootingStars } from './UIComponents';

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

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = parseFloat(value);
                    const increment = end / (duration * 60);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start * 10) / 10);
                        }
                    }, 1000 / 60);
                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// Enhanced Trust Metric Card
const TrustMetricCard = ({ icon, value, suffix, label, gradient, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useScroll().scrollY;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className="group relative px-5 py-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300"
        >
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`}
                style={{ filter: 'blur(20px)' }} />

            <div className="relative flex items-center gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/10">
                    {icon}
                </div>

                {/* Value and Label */}
                <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-white">
                            <AnimatedCounter value={value} suffix={suffix} />
                        </span>
                    </div>
                    <p className="text-xs text-white/50 font-medium">{label}</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full ${gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </motion.div>
    );
};

// Primary CTA Button with enhanced effects
const PrimaryCTA = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
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
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-30 blur-xl"
                animate={{
                    opacity: isHovered ? 0.6 : 0.3,
                    scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Animated border */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                    className="absolute inset-0 opacity-60"
                    style={{
                        background: 'conic-gradient(from 0deg at 50% 50%, transparent 60%, #06b6d4 80%, #a855f7 90%, transparent 100%)',
                        animation: 'spin 3s linear infinite',
                    }}
                />
            </div>

            {/* Button body */}
            <div className="relative px-8 py-4 bg-slate-900/90 backdrop-blur-xl rounded-full border border-white/10 overflow-hidden">
                {/* Inner knockout */}
                <div className="absolute inset-[2px] bg-slate-900/95 rounded-full" />

                {/* Top highlight */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                {/* Content */}
                <div className="relative flex items-center gap-3">
                    {/* Icon */}
                    <motion.div
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-5 h-5 text-cyan-400"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L4 7l8 5 8-5-8-5z" />
                            <path d="M4 12l8 5 8-5" />
                            <path d="M4 17l8 5 8-5" />
                        </svg>
                    </motion.div>

                    {/* Text */}
                    <span className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                        Get More Customers
                    </span>

                    {/* Animated arrow */}
                    <motion.span
                        animate={{ x: isHovered ? [0, 8, 0] : 0 }}
                        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                        className="text-lg text-purple-400"
                    >
                        →
                    </motion.span>
                </div>

                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
                    animate={{ x: isHovered ? ['-150%', '150%'] : '-150%' }}
                    transition={{ duration: 0.7 }}
                />
            </div>

            {/* Particle trail on hover */}
            {isHovered && (
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-1 h-1 rounded-full bg-cyan-400"
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: [0, 1, 0], x: [0, 20] }}
                            transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

// Secondary CTA Button
const SecondaryCTA = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href="#work"
            onClick={onClick}
            className="relative group overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Background glow */}
            <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-purple-500/20 to-pink-500/0"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Button body */}
            <div className="relative px-8 py-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 group-hover:border-white/30">
                {/* Content */}
                <div className="flex items-center gap-3">
                    {/* Eye icon */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        className="w-5 h-5 text-white/60"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </motion.div>

                    {/* Text */}
                    <span className="text-sm font-bold uppercase tracking-[0.15em] text-white/80 group-hover:text-white transition-colors">
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
                    className="mb-12 h-[1.3em] relative"
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

                {/* Enhanced Trust Metrics */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <TrustMetricCard
                        icon={<span className="text-lg">⚡</span>}
                        value="0.8"
                        suffix="s"
                        label="Load Time"
                        gradient="bg-cyan-500/20"
                        delay={0.1}
                    />
                    <TrustMetricCard
                        icon={<span className="text-lg">📱</span>}
                        value="100"
                        suffix="%"
                        label="Mobile Ready"
                        gradient="bg-purple-500/20"
                        delay={0.2}
                    />
                    <TrustMetricCard
                        icon={<span className="text-lg">📈</span>}
                        value="340"
                        suffix="%"
                        label="Avg. ROI"
                        gradient="bg-pink-500/20"
                        delay={0.3}
                    />
                </motion.div>

                {/* CTA Buttons — Enhanced */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-5 justify-center"
                >
                    <PrimaryCTA onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
                    <SecondaryCTA onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                    }} />
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

            {/* Global styles for animations */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default Hero;
