import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState('loading'); // loading, reveal, flash, exit
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);

    // Particle background system
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
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1,
                hue: 180 + Math.random() * 100,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
                ctx.fill();
                particles.forEach((p2, j) => {
                    if (i >= j) return;
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
        return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
    }, []);

    // Count up with glitch
    useEffect(() => {
        const start = Date.now();
        const duration = 2400;
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

    // Reveal → flash → exit
    useEffect(() => {
        if (phase === 'reveal') {
            const t = setTimeout(() => setPhase('flash'), 1400);
            return () => clearTimeout(t);
        }
        if (phase === 'flash') {
            const t = setTimeout(() => {
                setPhase('exit');
                setTimeout(onComplete, 800);
            }, 400);
            return () => clearTimeout(t);
        }
    }, [phase, onComplete]);

    const letterVariants = {
        hidden: { y: 80, opacity: 0, rotateX: -90, scale: 0.5 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            transition: {
                delay: i * 0.04,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    const brandText = 'CREATIVE WEBFLOW';

    // Progress ring SVG params
    const ringR = 90;
    const ringC = 2 * Math.PI * ringR;
    const ringOffset = ringC - (count / 100) * ringC;

    return (
        <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #030014 0%, #0a0a1f 50%, #030014 100%)' }}
            exit={{
                clipPath: 'circle(0% at 50% 50%)',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Particle canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Radial glow */}
            <motion.div
                className="absolute inset-0 z-[1]"
                animate={{
                    background: [
                        'radial-gradient(600px circle at 50% 50%, rgba(6,182,212,0.15), transparent 70%)',
                        'radial-gradient(600px circle at 50% 50%, rgba(168,85,247,0.15), transparent 70%)',
                        'radial-gradient(600px circle at 50% 50%, rgba(6,182,212,0.15), transparent 70%)',
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Flash burst overlay */}
            <AnimatePresence>
                {phase === 'flash' && (
                    <motion.div
                        className="absolute inset-0 z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), rgba(6,182,212,0.3) 50%, transparent 80%)',
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Hexagonal wireframe behind counter */}
            <motion.div
                className="absolute z-[2]"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
                    <polygon
                        points="160,20 290,80 290,200 160,260 30,200 30,80"
                        stroke="url(#preHexGrad)"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.15"
                    />
                    <polygon
                        points="160,50 260,95 260,185 160,230 60,185 60,95"
                        stroke="url(#preHexGrad)"
                        strokeWidth="0.5"
                        fill="none"
                        opacity="0.08"
                    />
                    <defs>
                        <linearGradient id="preHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
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
                            {/* Progress ring + counter */}
                            <div className="relative flex items-center justify-center">
                                <svg width="220" height="220" className="absolute -rotate-90">
                                    <circle cx="110" cy="110" r={ringR} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                                    <circle
                                        cx="110" cy="110" r={ringR}
                                        stroke="url(#ringProg)"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={ringC}
                                        strokeDashoffset={ringOffset}
                                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                                    />
                                    <defs>
                                        <linearGradient id="ringProg" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="50%" stopColor="#a855f7" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Glitch counter */}
                                <motion.div
                                    className="relative text-[18vw] md:text-[12vw] font-extralight leading-none tracking-tighter tabular-nums select-none"
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
                                    {/* Glitch layers */}
                                    {count > 10 && count < 95 && count % 7 === 0 && (
                                        <>
                                            <span
                                                className="absolute inset-0 text-cyan-400/30"
                                                style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-3px, 0)' }}
                                                aria-hidden="true"
                                            >
                                                {String(count).padStart(2, '0')}
                                            </span>
                                            <span
                                                className="absolute inset-0 text-pink-400/30"
                                                style={{ clipPath: 'inset(50% 0 20% 0)', transform: 'translate(3px, 0)' }}
                                                aria-hidden="true"
                                            >
                                                {String(count).padStart(2, '0')}
                                            </span>
                                        </>
                                    )}
                                </motion.div>
                            </div>

                            {/* Status text */}
                            <motion.p
                                className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mt-6"
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                Initializing experience
                            </motion.p>
                        </motion.div>
                    )}

                    {(phase === 'reveal' || phase === 'flash') && (
                        <motion.div
                            key="reveal"
                            className="flex flex-col items-center gap-6"
                            exit={{ opacity: 0, y: -40, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Brand text — staggered 3D flip */}
                            <div className="flex flex-wrap justify-center" style={{ perspective: '1000px' }}>
                                {brandText.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`text-4xl md:text-7xl lg:text-8xl font-black tracking-tight ${char === ' ' ? 'mx-3' : ''}`}
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

                            {/* Scan-line sweep */}
                            <motion.div
                                className="absolute left-0 right-0 h-[2px] pointer-events-none"
                                style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.6), rgba(168,85,247,0.6), transparent)' }}
                                initial={{ top: '0%', opacity: 0 }}
                                animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                            />

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
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
                    style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, #ec4899, transparent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: phase === 'reveal' || phase === 'flash' ? '100%' : `${count}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                />
            </div>

            {/* Corner markers */}
            {[
                { pos: 'top-6 left-6', grad1: 'from-cyan-400 to-transparent', grad2: 'from-cyan-400 to-transparent', dir1: 'bg-gradient-to-r', dir2: 'bg-gradient-to-b', d: 0.3 },
                { pos: 'top-6 right-6', grad1: 'from-purple-400 to-transparent', grad2: 'from-purple-400 to-transparent', dir1: 'bg-gradient-to-b', dir2: 'bg-gradient-to-l', d: 0.3 },
                { pos: 'bottom-6 left-6', grad1: 'from-cyan-400/50 to-transparent', grad2: 'from-cyan-400/50 to-transparent', dir1: 'bg-gradient-to-r', dir2: 'bg-gradient-to-t', d: 0.5 },
                { pos: 'bottom-6 right-6', grad1: 'from-pink-400/50 to-transparent', grad2: 'from-pink-400/50 to-transparent', dir1: 'bg-gradient-to-t', dir2: 'bg-gradient-to-l', d: 0.5 },
            ].map((c, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${c.pos} flex items-center gap-2`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: c.d }}
                >
                    <div className={`w-6 h-[1px] ${c.dir1} ${c.grad1}`} />
                    <div className={`h-6 w-[1px] ${c.dir2} ${c.grad2}`} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Preloader;
