import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState('loading'); // loading, reveal, exit
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animFrameRef = useRef(null);

    // Particle background system
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';

        // Create floating particles
        const particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                hue: 180 + Math.random() * 100, // cyan to purple range
            });
        }
        particlesRef.current = particles;

        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = window.innerWidth;
                if (p.x > window.innerWidth) p.x = 0;
                if (p.y < 0) p.y = window.innerHeight;
                if (p.y > window.innerHeight) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                particles.forEach((p2, j) => {
                    if (i === j) return;
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 70%, 55%, ${0.1 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    // Count up animation
    useEffect(() => {
        const start = Date.now();
        const duration = 2200;

        const tick = () => {
            const elapsed = Date.now() - start;
            const p = Math.min(elapsed / duration, 1);
            const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setCount(Math.floor(ease * 100));

            if (p < 1) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(() => setPhase('reveal'), 200);
            }
        };

        requestAnimationFrame(tick);
    }, []);

    // Reveal phase - show brand text then exit
    useEffect(() => {
        if (phase !== 'reveal') return;
        const timer = setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 900);
        }, 1500);
        return () => clearTimeout(timer);
    }, [phase, onComplete]);

    const letterVariants = {
        hidden: { y: 80, opacity: 0, rotateX: -90 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    const brandText = 'CREATIVE WEBFLOW';

    return (
        <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #030014 0%, #0a0a1f 50%, #030014 100%)' }}
            exit={{
                clipPath: 'circle(0% at 50% 50%)',
                transition: {
                    duration: 0.9,
                    ease: [0.76, 0, 0.24, 1]
                }
            }}
        >
            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0"
            />

            {/* Radial glow */}
            <motion.div
                className="absolute inset-0 z-1"
                animate={{
                    background: [
                        'radial-gradient(600px circle at 50% 50%, rgba(6,182,212,0.15), transparent 70%)',
                        'radial-gradient(600px circle at 50% 50%, rgba(168,85,247,0.15), transparent 70%)',
                        'radial-gradient(600px circle at 50% 50%, rgba(6,182,212,0.15), transparent 70%)',
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Rotating ring */}
            <motion.div
                className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-white/5 z-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
            </motion.div>

            <motion.div
                className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full border border-white/[0.03] z-1"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
            </motion.div>

            {/* Main content */}
            <div className="relative z-20 text-center">
                <AnimatePresence mode="wait">
                    {phase === 'loading' && (
                        <motion.div
                            key="loading"
                            exit={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            {/* Counter */}
                            <motion.div
                                className="text-[22vw] md:text-[15vw] font-extralight leading-none tracking-tighter tabular-nums"
                                style={{
                                    background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {String(count).padStart(2, '0')}
                            </motion.div>

                            {/* Loading bar */}
                            <div className="w-48 h-[1px] bg-white/10 mt-6 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        background: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)',
                                        width: `${count}%`,
                                    }}
                                />
                            </div>

                            {/* Status text */}
                            <motion.p
                                className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mt-4"
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                Initializing experience
                            </motion.p>
                        </motion.div>
                    )}

                    {phase === 'reveal' && (
                        <motion.div
                            key="reveal"
                            className="flex flex-col items-center gap-6"
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Brand text with letter-by-letter animation */}
                            <div className="flex flex-wrap justify-center perspective-[1000px]">
                                {brandText.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`text-4xl md:text-7xl lg:text-8xl font-black tracking-tight ${char === ' ' ? 'mx-3' : ''
                                            }`}
                                        style={{
                                            background: `linear-gradient(135deg, #06b6d4 ${i * 6}%, #a855f7 ${50 + i * 3}%, #ec4899 100%)`,
                                            WebkitBackgroundClip: 'text',
                                            backgroundClip: 'text',
                                            color: 'transparent',
                                            display: 'inline-block',
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="text-sm md:text-base text-white/40 font-light tracking-[0.2em] uppercase"
                            >
                                Crafting Digital Excellence
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                <motion.div
                    className="h-full"
                    style={{
                        background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, #ec4899, transparent)',
                    }}
                    initial={{ width: 0 }}
                    animate={{
                        width: phase === 'reveal' ? '100%' :
                            `${count}%`
                    }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                />
            </div>

            {/* Corner markers */}
            <motion.div
                className="absolute top-6 left-6 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="w-6 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent" />
                <div className="h-6 w-[1px] bg-gradient-to-b from-cyan-400 to-transparent" />
            </motion.div>
            <motion.div
                className="absolute top-6 right-6 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="h-6 w-[1px] bg-gradient-to-b from-purple-400 to-transparent" />
                <div className="w-6 h-[1px] bg-gradient-to-l from-purple-400 to-transparent" />
            </motion.div>
            <motion.div
                className="absolute bottom-6 left-6 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="w-6 h-[1px] bg-gradient-to-r from-cyan-400/50 to-transparent" />
                <div className="h-6 w-[1px] bg-gradient-to-t from-cyan-400/50 to-transparent" />
            </motion.div>
            <motion.div
                className="absolute bottom-6 right-6 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="h-6 w-[1px] bg-gradient-to-t from-pink-400/50 to-transparent" />
                <div className="w-6 h-[1px] bg-gradient-to-l from-pink-400/50 to-transparent" />
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
