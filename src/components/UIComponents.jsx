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

// Animated Headline - Consistent blur/slide reveal for section titles
export const AnimatedHeadline = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
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


// Custom HTML5 Canvas Particles for Constellation Effect
export const ParticlesBackground = () => {
    const canvasRef = useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let particles = [];
        const numParticles = 30; // Further reduced from 60 to drastically cut O(N^2) math loop
        const connectionDistance = 100; // Shorter distance means fewer active lines

        const resize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        let mouseX = -1000;
        let mouseY = -1000;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = 1 - (dist / connectionDistance);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                const dxMouse = particles[i].x - mouseX;
                const dyMouse = particles[i].y - mouseY;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                if (distMouse < 180) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    const opacity = 1 - (distMouse / 180);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />;
};

// Ambient particles that fade in per-section based on scroll
export const SectionParticles = ({ type = 'dust', color = 'rgba(6,182,212,0.3)', count = 20 }) => {
    const isEmber = type === 'ember';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ margin: "-100px", amount: 0.1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [isEmber ? '100%' : '0%', isEmber ? '-50%' : '50%'],
                        x: [isEmber ? '0%' : '10%', isEmber ? '10%' : '-10%'],
                        opacity: [0, Math.random() * 0.5 + 0.2, 0],
                        scale: isEmber ? [0, Math.random() * 1.5 + 0.5, 0] : [1, Math.random() * 2, 1]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                    className={`absolute rounded-full ${isEmber ? 'bg-orange-500' : ''}`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: isEmber ? '120%' : `${Math.random() * 100}%`,
                        width: isEmber ? `${Math.random() * 4 + 2}px` : `${Math.random() * 6 + 2}px`,
                        height: isEmber ? `${Math.random() * 4 + 2}px` : `${Math.random() * 6 + 2}px`,
                        backgroundColor: isEmber ? undefined : color,
                        filter: `blur(${Math.random() * 4}px)`,
                        boxShadow: isEmber ? `0 0 ${Math.random() * 10 + 5}px rgba(249,115,22,0.8)` : 'none'
                    }}
                />
            ))}
        </motion.div>
    );
};

// ==========================================
// ADVANCED SECTION EFFECTS (Phase 30)
// ==========================================

export const ShootingStars = ({ count = 15, color = '#06b6d4' }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ x: '100vw', y: '-10vh', opacity: 0, scale: 0 }}
                    animate={{
                        x: '-20vw',
                        y: '120vh',
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 0.5, 0]
                    }}
                    transition={{
                        duration: Math.random() * 2 + 1.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 15
                    }}
                    className="absolute rounded-full"
                    style={{
                        top: `${Math.random() * 50}%`,
                        right: `${Math.random() * 50 - 20}%`,
                        width: `${Math.random() * 150 + 50}px`,
                        height: '2px',
                        background: `linear-gradient(90deg, ${color}, transparent)`,
                        transform: 'rotate(-45deg)',
                        filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))'
                    }}
                />
            ))}
        </div>
    );
};

export const TyphoonVortex = ({ color = '#a855f7', speed = 20 }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center mix-blend-screen opacity-40">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="relative w-[800px] h-[800px]"
            >
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2
                        }}
                        className="absolute rounded-full"
                        style={{
                            left: '50%',
                            top: '50%',
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            backgroundColor: color,
                            filter: `blur(${Math.random() * 3}px)`,
                            boxShadow: `0 0 ${Math.random() * 10 + 5}px ${color}`,
                            transform: `rotate(${i * 9}deg) translateX(${Math.random() * 300 + 50}px)`
                        }}
                    />
                ))}
                {/* Core glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px]" style={{ backgroundColor: color }} />
            </motion.div>
        </div>
    );
};

export const ElectricCurrent = ({ color = '#06b6d4', style, className }) => {
    const d = React.useMemo(() => {
        return `M 0,50 Q ${Math.random() * 50 + 25},${Math.random() * 100} 100,50 T 200,50 T 300,50 T 400,50`;
    }, []);

    return (
        <div className={`absolute pointer-events-none z-0 ${className}`} style={style}>
            <svg width="400" height="100" viewBox="0 0 400 100" className="opacity-60 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                <motion.path
                    d={d}
                    fill="transparent"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "10 20", strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                        duration: Math.random() * 1 + 0.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </svg>
        </div>
    );
};

export const FloatingOrbs = ({ count = 5, color1 = '#06b6d4', color2 = '#a855f7' }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-30">
            {[...Array(count)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        x: [
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`
                        ],
                        y: [
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`,
                            `${Math.random() * 100}%`
                        ],
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute rounded-full mix-blend-screen"
                    style={{
                        width: `${Math.random() * 300 + 150}px`,
                        height: `${Math.random() * 300 + 150}px`,
                        background: `radial-gradient(circle, ${i % 2 === 0 ? color1 : color2} 0%, transparent 70%)`,
                        filter: 'blur(40px)',
                    }}
                />
            ))}
        </div>
    );
}

// Magnetic Wrapper for Interactive Elements
export const MagneticWrapper = ({ children, className = "", strength = 0.2 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
};;
