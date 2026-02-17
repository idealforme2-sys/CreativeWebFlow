import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Glitch Text Effect with premium scramble
export const GlitchText = ({ text, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";

    const scramble = () => {
        let iter = 0;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDisplayText(
                text.split("").map((letter, index) => {
                    if (index < iter) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iter >= text.length) clearInterval(intervalRef.current);
            iter += 1 / 3;
        }, 30);
    };

    return (
        <span onMouseEnter={scramble} className={`cursor-default inline-block ${className}`}>
            {displayText}
        </span>
    );
};

// Holographic Card with 3D tilt (clamped)
export const HolographicCard = ({ children, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    // Clamped: normalized to [-1, 1] range, max ±6° instead of raw pixels
    const rotateX = useTransform(y, [-1, 1], [6, -6]);
    const rotateY = useTransform(x, [-1, 1], [-6, 6]);

    return (
        <motion.div
            style={{ rotateX, rotateY, z: 100 }}
            whileHover={{ scale: 1.02 }}
            className={`relative group border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden ${className}`}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                // Normalize to [-1, 1] based on element dimensions
                const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                x.set(Math.max(-1, Math.min(1, nx)));
                y.set(Math.max(-1, Math.min(1, ny)));
            }}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            {children}
        </motion.div>
    );
};

// Magnetic Button with spring physics
export const MagneticButton = ({ children, className = "", onClick }) => {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        setPos({
            x: (e.clientX - (left + width / 2)) * 0.3,
            y: (e.clientY - (top + height / 2)) * 0.3
        });
    };

    return (
        <motion.button
            ref={ref}
            animate={pos}
            onMouseMove={handleMouse}
            onMouseLeave={() => setPos({ x: 0, y: 0 })}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

// Reveal on Scroll wrapper — Aura-style blur-fade-up
export const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Lightweight blur-fade (no Y movement) — for inline text, labels
export const BlurFadeIn = ({ children, className = "", delay = 0, duration = 0.6 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Stagger Container for children animations
export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Stagger Item (child of StaggerContainer) — with blur
export const StaggerItem = ({ children, className = "" }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1]
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Parallax wrapper
export const Parallax = ({ children, className = "", speed = 0.5 }) => {
    const y = useMotionValue(0);

    return (
        <motion.div
            style={{ y }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Text Mask Reveal Animation
export const TextMaskReveal = ({ text, className = "" }) => {
    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.span
                className="block"
                variants={{
                    hidden: { y: "100%" },
                    visible: {
                        y: 0,
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }
                }}
            >
                {text}
            </motion.span>
        </motion.div>
    );
};

// Gradient Border Card
export const GradientBorderCard = ({ children, className = "" }) => {
    return (
        <div className={`relative p-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/50 via-purple-500/50 to-pink-500/50 ${className}`}>
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl h-full">
                {children}
            </div>
        </div>
    );
};

// Icon Box with glow
export const IconBox = ({ icon: Icon, color = "cyan", className = "" }) => {
    const colorClasses = {
        cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-cyan-500/20",
        pink: "bg-pink-500/10 text-pink-400 border-pink-500/30 shadow-pink-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-purple-500/20",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-blue-500/20"
    };

    return (
        <div className={`w-14 h-14 rounded-xl border flex items-center justify-center shadow-lg ${colorClasses[color]} ${className}`}>
            <Icon size={24} />
        </div>
    );
};

// Section Header Component
export const SectionHeader = ({ label, title, subtitle, align = "left", className = "" }) => {
    const alignClasses = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right ml-auto"
    };

    return (
        <div className={`max-w-3xl ${alignClasses[align]} ${className}`}>
            {label && (
                <motion.div
                    initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-center gap-4 mb-6 ${align === 'center' ? 'justify-center' : ''}`}
                >
                    <div className="h-px w-12 bg-cyan-500" />
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em]">{label}</span>
                </motion.div>
            )}

            <motion.h2
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
                {title}
            </motion.h2>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg text-gray-400 leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

// Animated Counter
export const AnimatedCounter = ({ value, suffix = "", duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const end = parseInt(value);
                    const increment = end / (duration * 60);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 1000 / 60);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, duration, hasAnimated]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}{suffix}
        </span>
    );
};

// Split Text Animation - Reveals text word by word
export const SplitText = ({ text, className = "", delay = 0, staggerDelay = 0.03 }) => {
    const words = text.split(' ');

    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    }
                }
            }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-[0.25em]"
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1]
                            }
                        }
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

// Parallax Container - Scroll-based transform
export const ParallaxContainer = ({ children, className = "", speed = 0.5, direction = 'y' }) => {
    const ref = useRef(null);
    const [elementTop, setElementTop] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    React.useEffect(() => {
        const updatePosition = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setElementTop(rect.top + window.pageYOffset);
                setElementHeight(rect.height);
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, []);

    React.useEffect(() => {
        const handleScroll = () => setScrollY(window.pageYOffset);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const offset = (scrollY - elementTop + window.innerHeight) * speed;
    const transform = direction === 'y'
        ? `translateY(${offset}px)`
        : `translateX(${offset}px)`;

    return (
        <div ref={ref} className={className}>
            <div style={{ transform, willChange: 'transform' }}>
                {children}
            </div>
        </div>
    );
};

// Curtain Reveal - Page load transition effect
export const CurtainReveal = ({ children, isComplete }) => {
    return (
        <>
            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: isComplete ? 0 : 1 }}
                transition={{
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1],
                    delay: isComplete ? 0.3 : 0
                }}
                style={{ originY: 1 }}
                className="fixed inset-0 bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 z-[100] pointer-events-none"
            />
            {children}
        </>
    );
};
