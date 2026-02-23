import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

/* ─── Floating Glitch Line ─── */
const GlitchLine = ({ delay, top }) => (
    <motion.div
        className="absolute left-0 w-full h-[1px] pointer-events-none z-[2]"
        style={{ top: `${top}%`, background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.3) 30%, rgba(168,85,247,0.15) 70%, transparent 100%)' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 0.6, 0], scaleX: [0.3, 1.2, 0.3], x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
);

/* ─── Data Stream Column ─── */
const DataStream = ({ left, delay }) => {
    const chars = useMemo(() => {
        const c = 'ABCDEF0123456789ΣΠΩ∞◊⬡';
        return Array.from({ length: 12 }, () => c[Math.floor(Math.random() * c.length)]);
    }, []);
    return (
        <motion.div
            className="absolute top-0 flex flex-col items-center gap-1 font-mono text-[9px] text-cyan-500/20 pointer-events-none z-[2]"
            style={{ left: `${left}%` }}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '120vh', opacity: [0, 0.5, 0.5, 0] }}
            transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, ease: 'linear' }}
        >
            {chars.map((ch, i) => <span key={i}>{ch}</span>)}
        </motion.div>
    );
};

/* ─── Hexagonal Grid Node ─── */
const HexNode = ({ x, y, delay, progress }) => (
    <motion.div
        className="absolute w-2 h-2 pointer-events-none z-[2]"
        style={{ left: `${x}%`, top: `${y}%` }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: progress > delay * 33 ? [0, 0.6, 0.3] : 0,
            scale: progress > delay * 33 ? 1 : 0,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
    >
        <div className="w-full h-full bg-cyan-400/30 rotate-45" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
    </motion.div>
);

/* ─── Status Log Messages ─── */
const statusMessages = [
    'Loading assets...',
    'Initializing shaders...',
    'Compiling scene graph...',
    'Rendering particles...',
    'Calibrating interface...',
    'Establishing connection...',
    'Optimizing viewport...',
    'Systems online',
];

/* ─── Main Preloader ─── */
const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState('loading');
    const [statusIdx, setStatusIdx] = useState(0);
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);

    // Networked particle canvas with gravitational center pull
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

        const cx = w / 2, cy = h / 2;
        const particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            hue: 180 + Math.random() * 120,
            orbit: 80 + Math.random() * 200,
            angle: Math.random() * Math.PI * 2,
            speed: 0.002 + Math.random() * 0.003,
        }));

        let t = 0;
        const render = () => {
            ctx.clearRect(0, 0, w, h);
            t += 0.01;
            particles.forEach((p, i) => {
                // Gentle orbital drift toward center
                p.angle += p.speed;
                const targetX = cx + Math.cos(p.angle) * p.orbit;
                const targetY = cy + Math.sin(p.angle) * p.orbit;
                p.x += (targetX - p.x) * 0.008 + p.vx;
                p.y += (targetY - p.y) * 0.008 + p.vy;

                const alpha = 0.15 + 0.1 * Math.sin(t + i);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${alpha})`;
                ctx.fill();

                // Connection lines
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x, dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 60%, 50%, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            });
            animFrameRef.current = requestAnimationFrame(render);
        };
        render();
        return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
    }, []);

    // Counter with exponential ease
    useEffect(() => {
        const start = Date.now();
        const duration = 2800;
        const tick = () => {
            const elapsed = Date.now() - start;
            const p = Math.min(elapsed / duration, 1);
            const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            const val = Math.floor(ease * 100);
            setCount(val);
            setStatusIdx(Math.min(Math.floor(val / 13), statusMessages.length - 1));
            if (p < 1) requestAnimationFrame(tick);
            else setTimeout(() => setPhase('reveal'), 300);
        };
        requestAnimationFrame(tick);
    }, []);

    // Reveal → exit
    useEffect(() => {
        if (phase !== 'reveal') return;
        const t = setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 800);
        }, 2200);
        return () => clearTimeout(t);
    }, [phase, onComplete]);

    const letterVariants = {
        hidden: { y: 80, opacity: 0, rotateX: -90, scale: 0.6 },
        visible: (i) => ({
            y: 0, opacity: 1, rotateX: 0, scale: 1,
            transition: { delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        }),
    };

    const brandText = 'CREATIVE WEBFLOW';
    const ringR = 85;
    const ringC = 2 * Math.PI * ringR;
    const ringOffset = ringC - (count / 100) * ringC;

    // Hex grid positions
    const hexNodes = useMemo(() => {
        const nodes = [];
        for (let i = 0; i < 18; i++) {
            nodes.push({
                x: 10 + Math.random() * 80,
                y: 10 + Math.random() * 80,
                delay: 0.5 + Math.random() * 2.5,
            });
        }
        return nodes;
    }, []);

    // Data stream positions
    const streams = useMemo(() =>
        Array.from({ length: 8 }, (_, i) => ({ left: 5 + i * 12 + Math.random() * 5, delay: Math.random() * 4 })),
        []);

    return (
        <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #030014 0%, #070b1e 40%, #0a0520 70%, #030014 100%)' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            {/* Particle canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Noise texture overlay */}
            <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />

            {/* Pulsing multi-layered glow */}
            <motion.div
                className="absolute inset-0 z-[1]"
                animate={{
                    background: [
                        'radial-gradient(600px circle at 50% 50%, rgba(6,182,212,0.1) 0%, transparent 60%), radial-gradient(400px circle at 30% 40%, rgba(168,85,247,0.06) 0%, transparent 50%)',
                        'radial-gradient(600px circle at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 60%), radial-gradient(400px circle at 70% 60%, rgba(236,72,153,0.06) 0%, transparent 50%)',
                        'radial-gradient(600px circle at 50% 50%, rgba(6,182,212,0.1) 0%, transparent 60%), radial-gradient(400px circle at 30% 40%, rgba(168,85,247,0.06) 0%, transparent 50%)',
                    ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glitch scan lines */}
            <GlitchLine delay={0} top={20} />
            <GlitchLine delay={1.5} top={45} />
            <GlitchLine delay={3} top={75} />

            {/* Data streams */}
            {streams.map((s, i) => <DataStream key={i} left={s.left} delay={s.delay} />)}

            {/* Hex grid nodes */}
            {hexNodes.map((n, i) => <HexNode key={i} x={n.x} y={n.y} delay={n.delay} progress={count} />)}

            {/* Triple orbit rings */}
            <motion.div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-white/[0.03] z-[3]" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full" style={{ boxShadow: '0 0 16px rgba(6,182,212,0.9), 0 0 40px rgba(6,182,212,0.3)' }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full" style={{ boxShadow: '0 0 12px rgba(168,85,247,0.8)' }} />
            </motion.div>
            <motion.div className="absolute w-[220px] h-[220px] md:w-[290px] md:h-[290px] rounded-full border border-white/[0.02] z-[3]" animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full" style={{ boxShadow: '0 0 10px rgba(236,72,153,0.8)' }} />
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-300 rounded-full" style={{ boxShadow: '0 0 8px rgba(6,182,212,0.6)' }} />
            </motion.div>
            <motion.div className="absolute w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full border border-white/[0.015] z-[3]" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-emerald-400 rounded-full" style={{ boxShadow: '0 0 8px rgba(52,211,153,0.7)' }} />
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
                            {/* Logo + Progress ring */}
                            <div className="relative flex items-center justify-center mb-8">
                                {/* Outer glow pulse */}
                                <motion.div
                                    className="absolute w-[200px] h-[200px] rounded-full"
                                    animate={{ boxShadow: ['0 0 40px 10px rgba(6,182,212,0.05)', '0 0 60px 20px rgba(168,85,247,0.08)', '0 0 40px 10px rgba(6,182,212,0.05)'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <svg width="210" height="210" className="absolute -rotate-90">
                                    {/* Track */}
                                    <circle cx="105" cy="105" r={ringR} stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
                                    {/* Tick marks */}
                                    {Array.from({ length: 60 }, (_, i) => {
                                        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
                                        const inner = ringR - 3;
                                        const outer = ringR + 3;
                                        const filled = i / 60 <= count / 100;
                                        return (
                                            <line
                                                key={i}
                                                x1={105 + Math.cos(angle) * inner}
                                                y1={105 + Math.sin(angle) * inner}
                                                x2={105 + Math.cos(angle) * outer}
                                                y2={105 + Math.sin(angle) * outer}
                                                stroke={filled ? 'rgba(6,182,212,0.4)' : 'rgba(255,255,255,0.04)'}
                                                strokeWidth="1"
                                            />
                                        );
                                    })}
                                    {/* Progress arc */}
                                    <circle
                                        cx="105" cy="105" r={ringR}
                                        stroke="url(#preRingGrad)"
                                        strokeWidth="2.5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={ringC}
                                        strokeDashoffset={ringOffset}
                                        style={{ transition: 'stroke-dashoffset 0.1s linear', filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.5))' }}
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
                                className="relative text-7xl md:text-9xl font-extralight leading-none tracking-tighter tabular-nums mb-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span
                                    style={{
                                        background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.25) 100%)',
                                        WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                                    }}
                                >
                                    {String(count).padStart(3, '0')}
                                </span>
                                <span className="text-lg md:text-2xl font-light text-white/15 ml-1">%</span>
                            </motion.div>

                            {/* Status message log */}
                            <div className="h-5 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={statusIdx}
                                        initial={{ y: 12, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -12, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="text-[10px] font-mono text-cyan-400/40 uppercase tracking-[0.25em]"
                                    >
                                        <span className="text-cyan-400/70">{'>'}</span> {statusMessages[statusIdx]}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            {/* Mini equalizer bars */}
                            <div className="flex items-end gap-[2px] mt-4 h-4">
                                {Array.from({ length: 12 }, (_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-[2px] bg-gradient-to-t from-cyan-500/40 to-purple-500/40 rounded-full"
                                        animate={{ height: ['3px', `${5 + Math.random() * 10}px`, '3px'] }}
                                        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.06 }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {phase === 'reveal' && (
                        <motion.div
                            key="reveal"
                            className="flex flex-col items-center gap-5"
                            exit={{ opacity: 0, y: -40, scale: 0.9, filter: 'blur(12px)' }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Logo with starburst */}
                            <motion.div
                                className="relative"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                            >
                                {/* Starburst rays */}
                                {Array.from({ length: 8 }, (_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute top-1/2 left-1/2 h-[1px] origin-left"
                                        style={{
                                            transform: `rotate(${i * 45}deg)`,
                                            background: `linear-gradient(90deg, rgba(6,182,212,0.4), transparent)`,
                                            width: '0px',
                                        }}
                                        animate={{ width: ['0px', '60px', '0px'] }}
                                        transition={{ duration: 1.2, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                                    />
                                ))}
                                <AnimatedLogo size={110} />
                            </motion.div>

                            {/* Brand text with 3D flip */}
                            <div className="flex flex-wrap justify-center px-4" style={{ perspective: '1200px' }}>
                                {brandText.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`text-3xl md:text-6xl lg:text-7xl font-black tracking-tight ${char === ' ' ? 'mx-2 md:mx-3' : ''}`}
                                        style={{
                                            background: `linear-gradient(135deg, #06b6d4 ${i * 5}%, #a855f7 ${40 + i * 3}%, #ec4899 100%)`,
                                            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                                            display: 'inline-block',
                                            filter: `drop-shadow(0 0 8px rgba(6,182,212,${0.1 + i * 0.02}))`,
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Animated divider */}
                            <motion.div
                                className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                                initial={{ width: 0 }}
                                animate={{ width: '200px' }}
                                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            />

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20, letterSpacing: '0.5em' }}
                                animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
                                transition={{ delay: 0.8, duration: 0.7 }}
                                className="text-sm md:text-base text-white/30 font-light uppercase"
                            >
                                Crafting Digital Excellence
                            </motion.p>

                            {/* Entry prompt */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}
                                className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] mt-2"
                            >
                                ▼ Entering Experience
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/[0.03] z-30">
                <motion.div
                    className="h-full"
                    style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, #ec4899, transparent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: phase === 'reveal' ? '100%' : `${count}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                />
            </div>

            {/* Top bar: brand stamp + version */}
            <motion.div
                className="absolute top-6 left-0 w-full flex justify-between items-center px-6 md:px-10 z-30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <span className="text-[9px] font-mono text-white/15 uppercase tracking-[0.2em]">Creative Webflow</span>
                <span className="text-[9px] font-mono text-white/15 uppercase tracking-[0.2em]">v2.0</span>
            </motion.div>

            {/* Bottom bar info */}
            <motion.div
                className="absolute bottom-5 left-0 w-full flex justify-between items-center px-6 md:px-10 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <span className="text-[8px] font-mono text-white/10 uppercase tracking-wider">Premium Digital Agency</span>
                <span className="text-[8px] font-mono text-white/10 uppercase tracking-wider">{new Date().getFullYear()}</span>
            </motion.div>

            {/* Corner accent brackets */}
            {[
                { pos: 'top-5 left-5', bH: 'from-cyan-400/40 to-transparent', bV: 'from-cyan-400/40 to-transparent', dirH: 'bg-gradient-to-r', dirV: 'bg-gradient-to-b' },
                { pos: 'top-5 right-5', bH: 'from-purple-400/40 to-transparent', bV: 'from-purple-400/40 to-transparent', dirH: 'bg-gradient-to-l', dirV: 'bg-gradient-to-b' },
                { pos: 'bottom-5 left-5', bH: 'from-cyan-400/25 to-transparent', bV: 'from-cyan-400/25 to-transparent', dirH: 'bg-gradient-to-r', dirV: 'bg-gradient-to-t' },
                { pos: 'bottom-5 right-5', bH: 'from-pink-400/25 to-transparent', bV: 'from-pink-400/25 to-transparent', dirH: 'bg-gradient-to-l', dirV: 'bg-gradient-to-t' },
            ].map((c, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${c.pos} z-30`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                >
                    <div className={`w-8 h-[1px] ${c.dirH} ${c.bH}`} />
                    <div className={`h-8 w-[1px] ${c.dirV} ${c.bV}`} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Preloader;
