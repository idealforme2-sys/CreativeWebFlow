import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState('loading');
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        const particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2.5 + 0.5, opacity: Math.random() * 0.4 + 0.1,
                hue: 180 + Math.random() * 100,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
                ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x, dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 70%, 55%, ${0.08 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5; ctx.stroke();
                    }
                }
            });
            animFrameRef.current = requestAnimationFrame(animate);
        };
        animate();
        return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
    }, []);

    // Counter
    useEffect(() => {
        const start = Date.now();
        const duration = 2200;
        const tick = () => {
            const elapsed = Date.now() - start;
            const p = Math.min(elapsed / duration, 1);
            const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setCount(Math.floor(ease * 100));
            if (p < 1) requestAnimationFrame(tick);
            else setTimeout(() => setPhase('reveal'), 200);
        };
        requestAnimationFrame(tick);
    }, []);

    // Reveal → exit
    useEffect(() => {
        if (phase !== 'reveal') return;
        const t = setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 900);
        }, 1600);
        return () => clearTimeout(t);
    }, [phase, onComplete]);

    const letterVariants = {
        hidden: { y: 60, opacity: 0, rotateX: -60 },
        visible: (i) => ({
            y: 0, opacity: 1, rotateX: 0,
            transition: { delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }),
    };

    const brandText = 'CREATIVE WEBFLOW';
    const ringR = 80;
    const ringC = 2 * Math.PI * ringR;
    const ringOffset = ringC - (count / 100) * ringC;

    return (
        <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #030014 0%, #070b1e 50%, #030014 100%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Pulsing radial glow */}
            <motion.div
                className="absolute inset-0 z-[1]"
                animate={{
                    background: [
                        'radial-gradient(500px circle at 50% 50%, rgba(6,182,212,0.12), transparent 70%)',
                        'radial-gradient(500px circle at 50% 50%, rgba(168,85,247,0.12), transparent 70%)',
                        'radial-gradient(500px circle at 50% 50%, rgba(6,182,212,0.12), transparent 70%)',
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Orbit rings */}
            <motion.div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-white/[0.04] z-[1]" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full" style={{ boxShadow: '0 0 12px rgba(6,182,212,0.8)' }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full" style={{ boxShadow: '0 0 10px rgba(168,85,247,0.8)' }} />
            </motion.div>
            <motion.div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full border border-white/[0.03] z-[1]" animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-pink-400 rounded-full" style={{ boxShadow: '0 0 8px rgba(236,72,153,0.8)' }} />
            </motion.div>

            {/* Main content */}
            <div className="relative z-20 text-center">
                <AnimatePresence mode="wait">
                    {phase === 'loading' && (
                        <motion.div
                            key="loading"
                            exit={{ opacity: 0, scale: 0.85, filter: 'blur(16px)' }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            {/* Logo + Progress ring */}
                            <div className="relative flex items-center justify-center mb-8">
                                <svg width="200" height="200" className="absolute -rotate-90">
                                    <circle cx="100" cy="100" r={ringR} stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" fill="none" />
                                    <circle
                                        cx="100" cy="100" r={ringR}
                                        stroke="url(#preRingGrad)"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={ringC}
                                        strokeDashoffset={ringOffset}
                                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                                    />
                                    <defs>
                                        <linearGradient id="preRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="50%" stopColor="#a855f7" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <AnimatedLogo size={80} />
                            </div>

                            {/* Counter */}
                            <motion.div
                                className="text-6xl md:text-8xl font-extralight leading-none tracking-tighter tabular-nums"
                                style={{
                                    background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.35) 100%)',
                                    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                {String(count).padStart(2, '0')}
                            </motion.div>

                            {/* Status */}
                            <motion.p
                                className="text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] mt-5"
                                animate={{ opacity: [0.2, 0.6, 0.2] }}
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
                            exit={{ opacity: 0, y: -30, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Logo big */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            >
                                <AnimatedLogo size={100} />
                            </motion.div>

                            {/* Brand text */}
                            <div className="flex flex-wrap justify-center" style={{ perspective: '1000px' }}>
                                {brandText.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`text-3xl md:text-6xl lg:text-7xl font-black tracking-tight ${char === ' ' ? 'mx-3' : ''}`}
                                        style={{
                                            background: `linear-gradient(135deg, #06b6d4 ${i * 6}%, #a855f7 ${50 + i * 3}%, #ec4899 100%)`,
                                            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
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
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="text-sm md:text-base text-white/35 font-light tracking-[0.2em] uppercase"
                            >
                                Crafting Digital Excellence
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom progress line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                <motion.div
                    className="h-full"
                    style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, #ec4899, transparent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: phase === 'reveal' ? '100%' : `${count}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                />
            </div>

            {/* Corner markers */}
            <motion.div className="absolute top-6 left-6 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className="w-6 h-[1px] bg-gradient-to-r from-cyan-400 to-transparent" /><div className="h-6 w-[1px] bg-gradient-to-b from-cyan-400 to-transparent" />
            </motion.div>
            <motion.div className="absolute top-6 right-6 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className="h-6 w-[1px] bg-gradient-to-b from-purple-400 to-transparent" /><div className="w-6 h-[1px] bg-gradient-to-l from-purple-400 to-transparent" />
            </motion.div>
            <motion.div className="absolute bottom-6 left-6 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <div className="w-6 h-[1px] bg-gradient-to-r from-cyan-400/50 to-transparent" /><div className="h-6 w-[1px] bg-gradient-to-t from-cyan-400/50 to-transparent" />
            </motion.div>
            <motion.div className="absolute bottom-6 right-6 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <div className="h-6 w-[1px] bg-gradient-to-t from-pink-400/50 to-transparent" /><div className="w-6 h-[1px] bg-gradient-to-l from-pink-400/50 to-transparent" />
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
