import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

/* ───────────────────────── WebGL Warp Tunnel Canvas ───────────────────────── */
const WarpCanvas = ({ progress }) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);
    const progressRef = useRef(0);
    progressRef.current = progress;

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

        // Star field with depth
        const stars = Array.from({ length: 250 }, () => ({
            angle: Math.random() * Math.PI * 2,
            radius: 5 + Math.random() * 5,
            speed: 0.5 + Math.random() * 2.5,
            size: 0.3 + Math.random() * 1.5,
            hue: 180 + Math.random() * 130,
            maxRadius: Math.max(w, h) * 0.8,
        }));

        // Nebula particles (slow, large, blurry blobs)
        const nebulae = Array.from({ length: 12 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: 40 + Math.random() * 80,
            hue: 180 + Math.random() * 140,
            alpha: 0.01 + Math.random() * 0.02,
            drift: (Math.random() - 0.5) * 0.15,
            driftY: (Math.random() - 0.5) * 0.15,
        }));

        let t = 0;
        const render = () => {
            t += 0.008;
            const p = progressRef.current / 100;
            const warpSpeed = 0.3 + p * 2.5;

            ctx.fillStyle = `rgba(3,0,20,${0.15 + p * 0.05})`;
            ctx.fillRect(0, 0, w, h);

            // Nebula blobs
            nebulae.forEach(n => {
                n.x += n.drift;
                n.y += n.driftY;
                if (n.x < -n.radius) n.x = w + n.radius;
                if (n.x > w + n.radius) n.x = -n.radius;
                if (n.y < -n.radius) n.y = h + n.radius;
                if (n.y > h + n.radius) n.y = -n.radius;

                const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
                grad.addColorStop(0, `hsla(${n.hue + t * 10}, 70%, 50%, ${n.alpha * (1 + p)})`);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
            });

            // Warp stars
            stars.forEach(s => {
                s.radius += s.speed * warpSpeed;
                if (s.radius > s.maxRadius) {
                    s.radius = 5 + Math.random() * 5;
                    s.angle = Math.random() * Math.PI * 2;
                }

                const x = cx + Math.cos(s.angle) * s.radius;
                const y = cy + Math.sin(s.angle) * s.radius;
                const dist = s.radius / s.maxRadius;
                const alpha = dist * (0.5 + p * 0.5);
                const sz = s.size * (0.5 + dist * 2);

                // Trail line
                if (dist > 0.1) {
                    const trailLen = Math.min(s.speed * warpSpeed * 4, s.radius * 0.3);
                    const tx = cx + Math.cos(s.angle) * (s.radius - trailLen);
                    const ty = cy + Math.sin(s.angle) * (s.radius - trailLen);
                    ctx.beginPath();
                    ctx.moveTo(tx, ty);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = `hsla(${s.hue}, 80%, 70%, ${alpha * 0.4})`;
                    ctx.lineWidth = sz * 0.6;
                    ctx.stroke();
                }

                // Star dot
                ctx.beginPath();
                ctx.arc(x, y, sz, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 90%, 80%, ${alpha})`;
                ctx.fill();
            });

            // Central vortex glow
            const vGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120 + p * 80);
            vGrad.addColorStop(0, `rgba(6,182,212,${0.04 + p * 0.03})`);
            vGrad.addColorStop(0.4, `rgba(168,85,247,${0.02 + p * 0.02})`);
            vGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = vGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, 200 + p * 80, 0, Math.PI * 2);
            ctx.fill();

            frameRef.current = requestAnimationFrame(render);
        };
        render();
        return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

/* ───────────────────────── Morphing Geometric Ring ───────────────────────── */
const GeometricRing = ({ progress, size = 260 }) => {
    const sides = Math.floor(3 + (progress / 100) * 9); // morphs 3 → 12 sides
    const r = size / 2 - 10;
    const points = useMemo(() => {
        return Array.from({ length: Math.max(sides, 3) }, (_, i) => {
            const angle = (i / Math.max(sides, 3)) * Math.PI * 2 - Math.PI / 2;
            return `${size / 2 + Math.cos(angle) * r},${size / 2 + Math.sin(angle) * r}`;
        }).join(' ');
    }, [sides, r, size]);

    return (
        <motion.svg
            width={size} height={size}
            className="absolute z-[4]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
            <defs>
                <linearGradient id="geoRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <polygon
                points={points}
                stroke="url(#geoRingGrad)"
                strokeWidth="1"
                fill="none"
                style={{ transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}
            />
        </motion.svg>
    );
};

/* ───────────────────────── Floating Status Terminal ───────────────────────── */
const statusLog = [
    { at: 0, text: 'Booting system core...' },
    { at: 8, text: 'Loading shader modules...' },
    { at: 18, text: 'Compiling visual engine...' },
    { at: 30, text: 'Initializing 3D renderer...' },
    { at: 42, text: 'Mounting component tree...' },
    { at: 55, text: 'Hydrating user interface...' },
    { at: 68, text: 'Optimizing render pipeline...' },
    { at: 80, text: 'Syncing animation frames...' },
    { at: 92, text: 'Finalizing experience...' },
    { at: 99, text: 'Ready.' },
];

/* ───────────────────────── Preloader ───────────────────────── */
const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState('loading');
    const [visibleLogs, setVisibleLogs] = useState([]);

    // Eased counter
    useEffect(() => {
        const start = Date.now();
        const duration = 3200;
        const tick = () => {
            const elapsed = Date.now() - start;
            const p = Math.min(elapsed / duration, 1);
            const ease = p === 1 ? 1 : 1 - Math.pow(2, -12 * p);
            const val = Math.floor(ease * 100);
            setCount(val);

            // Add status messages as progress passes thresholds
            setVisibleLogs(prev => {
                const newLogs = statusLog.filter(s => val >= s.at && !prev.find(l => l.at === s.at));
                return newLogs.length > 0 ? [...prev, ...newLogs].slice(-4) : prev;
            });

            if (p < 1) requestAnimationFrame(tick);
            else setTimeout(() => setPhase('reveal'), 400);
        };
        requestAnimationFrame(tick);
    }, []);

    // Reveal → exit
    useEffect(() => {
        if (phase !== 'reveal') return;
        const t = setTimeout(() => {
            setPhase('exit');
            setTimeout(onComplete, 900);
        }, 2400);
        return () => clearTimeout(t);
    }, [phase, onComplete]);

    // Ring metrics
    const ringR = 90;
    const ringC = 2 * Math.PI * ringR;
    const ringOffset = ringC - (count / 100) * ringC;

    const brandText = 'CREATIVE WEBFLOW';

    return (
        <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden select-none"
            style={{ background: '#030014' }}
            exit={{ clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
            {/* Warp speed star field */}
            <WarpCanvas progress={count} />

            {/* Noise grain */}
            <div className="absolute inset-0 z-[1] opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />

            {/* Vignette */}
            <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,0,20,0.7) 100%)' }} />

            {/* Main content */}
            <div className="relative z-20 text-center flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {phase === 'loading' && (
                        <motion.div
                            key="loading"
                            exit={{ opacity: 0, scale: 0.7, filter: 'blur(30px)' }}
                            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                            className="flex flex-col items-center"
                        >
                            {/* Logo hub with rings */}
                            <div className="relative flex items-center justify-center mb-10" style={{ width: 260, height: 260 }}>
                                {/* Morphing geometric ring */}
                                <GeometricRing progress={count} size={260} />

                                {/* Progress ring with glow */}
                                <svg width="220" height="220" className="absolute -rotate-90 z-[5]">
                                    <circle cx="110" cy="110" r={ringR} stroke="rgba(255,255,255,0.02)" strokeWidth="1" fill="none" />
                                    {/* Graduated tick marks */}
                                    {Array.from({ length: 72 }, (_, i) => {
                                        const angle = (i / 72) * Math.PI * 2 - Math.PI / 2;
                                        const inner = ringR - (i % 6 === 0 ? 5 : 2);
                                        const outer = ringR + (i % 6 === 0 ? 5 : 2);
                                        const filled = (i / 72) * 100 <= count;
                                        return (
                                            <line
                                                key={i}
                                                x1={110 + Math.cos(angle) * inner}
                                                y1={110 + Math.sin(angle) * inner}
                                                x2={110 + Math.cos(angle) * outer}
                                                y2={110 + Math.sin(angle) * outer}
                                                stroke={filled ? `hsla(${180 + (i / 72) * 120}, 80%, 60%, 0.6)` : 'rgba(255,255,255,0.03)'}
                                                strokeWidth={i % 6 === 0 ? '1.5' : '0.5'}
                                                style={{ transition: 'stroke 0.3s ease' }}
                                            />
                                        );
                                    })}
                                    {/* Main arc */}
                                    <circle
                                        cx="110" cy="110" r={ringR}
                                        stroke="url(#preloaderArcGrad)"
                                        strokeWidth="2.5"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={ringC}
                                        strokeDashoffset={ringOffset}
                                        style={{ transition: 'stroke-dashoffset 0.1s linear', filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.6))' }}
                                    />
                                    <defs>
                                        <linearGradient id="preloaderArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="50%" stopColor="#a855f7" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Orbiting dots on progress ring */}
                                <motion.div
                                    className="absolute z-[6]"
                                    style={{ width: 220, height: 220 }}
                                    animate={{ rotate: -count * 3.6 }}
                                    transition={{ duration: 0, ease: 'linear' }}
                                >
                                    <div
                                        className="absolute w-3 h-3 rounded-full"
                                        style={{
                                            top: 0, left: '50%', transform: 'translate(-50%, -50%)',
                                            background: 'radial-gradient(circle, #06b6d4, transparent)',
                                            boxShadow: '0 0 12px 4px rgba(6,182,212,0.6)',
                                        }}
                                    />
                                </motion.div>

                                {/* Logo — unconstrained */}
                                <div className="absolute z-10 flex items-center justify-center" style={{ width: 100, height: 100 }}>
                                    <AnimatedLogo size={85} />
                                </div>

                                {/* Breathing glow behind logo */}
                                <motion.div
                                    className="absolute z-[3] rounded-full"
                                    style={{ width: 130, height: 130 }}
                                    animate={{
                                        boxShadow: [
                                            '0 0 30px 8px rgba(6,182,212,0.08), inset 0 0 20px rgba(6,182,212,0.03)',
                                            '0 0 50px 15px rgba(168,85,247,0.1), inset 0 0 30px rgba(168,85,247,0.04)',
                                            '0 0 30px 8px rgba(6,182,212,0.08), inset 0 0 20px rgba(6,182,212,0.03)',
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            </div>

                            {/* Counter display */}
                            <div className="relative mb-6">
                                <motion.div
                                    className="text-8xl md:text-[120px] font-extralight leading-none tabular-nums"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span style={{
                                        background: `linear-gradient(180deg, #ffffff ${100 - count}%, rgba(6,182,212,0.4) 100%)`,
                                        WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                                    }}>
                                        {String(count).padStart(3, '0')}
                                    </span>
                                </motion.div>
                                {/* Thin accent line under counter */}
                                <motion.div
                                    className="mx-auto mt-2 h-[1px]"
                                    style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, #ec4899, transparent)' }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${40 + count * 0.6}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            {/* Terminal-style log feed */}
                            <div className="w-64 md:w-80 text-left font-mono mb-4 h-20 overflow-hidden">
                                <AnimatePresence>
                                    {visibleLogs.map((log, i) => (
                                        <motion.div
                                            key={log.at}
                                            initial={{ opacity: 0, x: -10, height: 0 }}
                                            animate={{ opacity: 1, x: 0, height: 20 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="text-[10px] tracking-wide flex items-center gap-1.5 overflow-hidden"
                                        >
                                            <span className="text-cyan-500/60">▸</span>
                                            <span className="text-white/25">{log.text}</span>
                                            {i === visibleLogs.length - 1 && (
                                                <motion.span
                                                    className="inline-block w-[5px] h-[10px] bg-cyan-400/50 ml-0.5"
                                                    animate={{ opacity: [1, 0, 1] }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Waveform visualizer */}
                            <div className="flex items-center gap-[1.5px] h-6">
                                {Array.from({ length: 30 }, (_, i) => {
                                    const dist = Math.abs(i - 15) / 15;
                                    return (
                                        <motion.div
                                            key={i}
                                            className="w-[2px] rounded-full"
                                            style={{
                                                background: `linear-gradient(to top, rgba(6,182,212,${0.3 + count * 0.005}), rgba(168,85,247,${0.2 + count * 0.004}))`,
                                            }}
                                            animate={{
                                                height: [`${2 + (1 - dist) * 4}px`, `${4 + (1 - dist) * (8 + count * 0.12)}px`, `${2 + (1 - dist) * 4}px`],
                                            }}
                                            transition={{
                                                duration: 0.6 + Math.random() * 0.4,
                                                repeat: Infinity,
                                                delay: i * 0.03,
                                                ease: 'easeInOut',
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {phase === 'reveal' && (
                        <motion.div
                            key="reveal"
                            className="flex flex-col items-center"
                            exit={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Logo entrance with expanding ring burst */}
                            <motion.div
                                className="relative mb-8"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 160, damping: 16 }}
                            >
                                {/* Expanding ring pulse */}
                                {[0, 0.3, 0.6].map((delay, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 rounded-full border pointer-events-none"
                                        style={{ borderColor: `rgba(6,182,212,${0.3 - i * 0.1})` }}
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: [1, 3], opacity: [0.4, 0] }}
                                        transition={{ duration: 1.5, delay: 0.2 + delay, ease: 'easeOut' }}
                                    />
                                ))}

                                {/* Radial light rays */}
                                <motion.div
                                    className="absolute inset-0 z-0"
                                    initial={{ opacity: 0, rotate: -30 }}
                                    animate={{ opacity: [0, 0.8, 0], rotate: 30 }}
                                    transition={{ duration: 2, ease: 'easeOut' }}
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <div
                                            key={i}
                                            className="absolute top-1/2 left-1/2 origin-left h-[0.5px]"
                                            style={{
                                                transform: `rotate(${i * 30}deg)`,
                                                width: '80px',
                                                background: `linear-gradient(90deg, rgba(${i % 3 === 0 ? '6,182,212' : i % 3 === 1 ? '168,85,247' : '236,72,153'},0.5), transparent)`,
                                            }}
                                        />
                                    ))}
                                </motion.div>

                                <div style={{ width: 120, height: 120 }}>
                                    <AnimatedLogo size={110} />
                                </div>
                            </motion.div>

                            {/* Brand text — staggered 3D entrance */}
                            <div className="flex flex-wrap justify-center px-4 mb-4" style={{ perspective: '1500px' }}>
                                {brandText.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ y: 100, opacity: 0, rotateX: -90, scale: 0.5, filter: 'blur(8px)' }}
                                        animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                                        transition={{ delay: 0.15 + i * 0.035, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                        className={`text-3xl md:text-6xl lg:text-7xl font-black tracking-tight inline-block ${char === ' ' ? 'mx-2 md:mx-3' : ''}`}
                                        style={{
                                            background: `linear-gradient(135deg, #06b6d4 ${i * 5}%, #a855f7 ${35 + i * 3}%, #ec4899 ${80 + i * 2}%)`,
                                            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                                            textShadow: 'none',
                                            filter: `drop-shadow(0 0 10px hsla(${180 + i * 8}, 80%, 60%, 0.2))`,
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Animated divider line */}
                            <motion.div
                                className="h-[1px] mb-4"
                                style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, #ec4899, transparent)' }}
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 220, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            />

                            {/* Tagline with letter-spacing morph */}
                            <motion.p
                                initial={{ opacity: 0, y: 20, letterSpacing: '0.6em' }}
                                animate={{ opacity: 0.4, y: 0, letterSpacing: '0.18em' }}
                                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-xs md:text-sm text-white font-light uppercase mb-6"
                            >
                                Crafting Digital Excellence
                            </motion.p>

                            {/* Entry pulse */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.4, 0] }}
                                transition={{ delay: 1.4, duration: 1.5, repeat: Infinity }}
                                className="flex items-center gap-2 text-[9px] font-mono text-white/20 uppercase tracking-[0.25em]"
                            >
                                <motion.div
                                    animate={{ y: [0, 3, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    ▼
                                </motion.div>
                                Entering Experience
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/[0.02] z-30">
                <motion.div
                    className="h-full"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, #06b6d4 20%, #a855f7 50%, #ec4899 80%, transparent 100%)' }}
                    initial={{ width: 0 }}
                    animate={{ width: phase === 'reveal' ? '100%' : `${count}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                />
                {/* Glowing head of progress bar */}
                {phase === 'loading' && (
                    <motion.div
                        className="absolute top-[-3px] h-[8px] w-[30px] rounded-full"
                        style={{
                            background: 'radial-gradient(ellipse, rgba(6,182,212,0.8), transparent)',
                            left: `${count}%`,
                            transform: 'translateX(-50%)',
                        }}
                    />
                )}
            </div>

            {/* Top HUD */}
            <motion.div
                className="absolute top-5 left-0 w-full flex justify-between items-center px-6 md:px-10 z-30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400/30" />
                    </div>
                    <span className="text-[9px] font-mono text-white/15 uppercase tracking-[0.15em]">Creative Webflow</span>
                </div>
                <span className="text-[9px] font-mono text-white/15 uppercase tracking-[0.15em]">v2.0</span>
            </motion.div>

            {/* Bottom HUD */}
            <motion.div
                className="absolute bottom-5 left-0 w-full flex justify-between items-center px-6 md:px-10 z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <span className="text-[8px] font-mono text-white/10 uppercase tracking-wider">Premium Digital Agency</span>
                <span className="text-[8px] font-mono text-white/10 tabular-nums">{new Date().getFullYear()}</span>
            </motion.div>

            {/* Corner HUD brackets */}
            {[
                { cls: 'top-4 left-4', c1: 'from-cyan-400/50', c2: 'from-cyan-400/50', dH: 'to-r', dV: 'to-b' },
                { cls: 'top-4 right-4', c1: 'from-purple-400/50', c2: 'from-purple-400/50', dH: 'to-l', dV: 'to-b' },
                { cls: 'bottom-4 left-4', c1: 'from-cyan-400/30', c2: 'from-cyan-400/30', dH: 'to-r', dV: 'to-t' },
                { cls: 'bottom-4 right-4', c1: 'from-pink-400/30', c2: 'from-pink-400/30', dH: 'to-l', dV: 'to-t' },
            ].map((c, i) => (
                <motion.div key={i} className={`absolute ${c.cls} z-30`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.08 }}>
                    <div className={`w-10 h-[1px] bg-gradient-${c.dH} ${c.c1} to-transparent`} />
                    <div className={`h-10 w-[1px] bg-gradient-${c.dV} ${c.c2} to-transparent`} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Preloader;
