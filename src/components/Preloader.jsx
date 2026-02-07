import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState('counting'); // counting, morphing, text
    const [morphProgress, setMorphProgress] = useState(0);
    const [text, setText] = useState("");
    const fullText = "CREATIVE WEBFLOW";
    const canvasRef = useRef(null);

    // Premium counting phase with particle effects
    useEffect(() => {
        let start = Date.now();
        let duration = 2000;

        const tick = () => {
            let elapsed = Date.now() - start;
            let p = Math.min(elapsed / duration, 1);
            // Exponential ease out
            let ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setCount(Math.floor(ease * 100));

            if (p < 1) {
                requestAnimationFrame(tick);
            } else {
                setPhase('morphing');
            }
        };

        requestAnimationFrame(tick);
    }, []);

    // Premium morphing transition (number dissolves into particles then forms text)
    useEffect(() => {
        if (phase !== 'morphing') return;

        const canvas = canvasRef.current;
        if (!canvas) {
            // Fallback if canvas fails
            setPhase('text');
            return;
        }

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const targetText = fullText;

        // Create particles from "100%"
        ctx.font = 'bold 180px system-ui';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('100%', canvas.width / 2, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sample particles from the text
        for (let y = 0; y < canvas.height; y += 4) {
            for (let x = 0; x < canvas.width; x += 4) {
                const i = (y * canvas.width + x) * 4;
                if (imageData.data[i + 3] > 128) {
                    particles.push({
                        x,
                        y,
                        originX: x,
                        originY: y,
                        targetX: x + (Math.random() - 0.5) * 500,
                        targetY: y + (Math.random() - 0.5) * 500,
                        size: 2 + Math.random() * 2,
                        color: `hsl(${180 + Math.random() * 60}, 100%, 70%)`,
                        speed: 0.02 + Math.random() * 0.02,
                        phase: 0
                    });
                }
            }
        }

        // Get target positions for text
        ctx.font = 'bold 100px system-ui';
        ctx.fillText(targetText, canvas.width / 2, canvas.height / 2);
        const targetData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const targetPositions = [];
        for (let y = 0; y < canvas.height; y += 4) {
            for (let x = 0; x < canvas.width; x += 4) {
                const i = (y * canvas.width + x) * 4;
                if (targetData.data[i + 3] > 128) {
                    targetPositions.push({ x, y });
                }
            }
        }

        // Assign target positions to particles
        particles.forEach((p, i) => {
            if (targetPositions[i % targetPositions.length]) {
                p.finalX = targetPositions[i % targetPositions.length].x;
                p.finalY = targetPositions[i % targetPositions.length].y;
            } else {
                p.finalX = canvas.width / 2 + (Math.random() - 0.5) * 100;
                p.finalY = canvas.height / 2 + (Math.random() - 0.5) * 100;
            }
        });

        let animationFrame;
        let startTime = Date.now();
        const duration = 2500;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setMorphProgress(progress);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                if (progress < 0.4) {
                    // Phase 1: Explode outward
                    const explodeProgress = progress / 0.4;
                    const ease = 1 - Math.pow(1 - explodeProgress, 3);
                    p.x = p.originX + (p.targetX - p.originX) * ease;
                    p.y = p.originY + (p.targetY - p.originY) * ease;
                } else if (progress < 0.7) {
                    // Phase 2: Swirl
                    const swirlProgress = (progress - 0.4) / 0.3;
                    const angle = swirlProgress * Math.PI * 2;
                    const radius = 50 * (1 - swirlProgress);
                    p.x = p.targetX + Math.cos(angle + p.originX * 0.01) * radius;
                    p.y = p.targetY + Math.sin(angle + p.originY * 0.01) * radius;
                } else {
                    // Phase 3: Form text
                    const formProgress = (progress - 0.7) / 0.3;
                    const ease = 1 - Math.pow(1 - formProgress, 4);
                    p.x = p.targetX + (p.finalX - p.targetX) * ease;
                    p.y = p.targetY + (p.finalY - p.targetY) * ease;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * (1 - progress * 0.3), 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setPhase('text');
            }
        };

        animate();

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [phase]);

    // Text reveal with scramble
    useEffect(() => {
        if (phase !== 'text') return;

        let i = 0;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const interval = setInterval(() => {
            setText(
                fullText.split("").map((c, idx) =>
                    idx < i ? c : chars[Math.floor(Math.random() * chars.length)]
                ).join("")
            );
            i += 0.5;
            if (i > fullText.length) {
                setText(fullText);
                clearInterval(interval);
                setTimeout(onComplete, 600);
            }
        }, 25);

        return () => clearInterval(interval);
    }, [phase, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[999] bg-[#030014] flex flex-col items-center justify-center overflow-hidden"
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: 'blur(20px)',
                transition: {
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1]
                }
            }}
        >
            {/* Background gradient */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: phase === 'morphing'
                        ? 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, rgba(0, 0, 0, 0) 70%)'
                        : 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, rgba(0, 0, 0, 0) 70%)'
                }}
                transition={{ duration: 1 }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* Particle canvas for morphing */}
            <canvas
                ref={canvasRef}
                className={`absolute inset-0 z-10 ${phase === 'morphing' ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.5s' }}
            />

            <div className="relative z-20 text-center">
                <AnimatePresence mode="wait">
                    {phase === 'counting' && (
                        <motion.div
                            key="counting"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <motion.div
                                className="text-[20vw] md:text-[15vw] font-light leading-none tracking-tighter tabular-nums"
                                style={{
                                    background: 'linear-gradient(180deg, #ffffff 0%, #a855f7 50%, #06b6d4 100%)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent'
                                }}
                            >
                                {count}%
                            </motion.div>

                            {/* Pulsing dots */}
                            <div className="flex gap-3">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                            background: `linear-gradient(135deg, #06b6d4, #a855f7)`
                                        }}
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.3, 1, 0.3],
                                            boxShadow: [
                                                '0 0 0 rgba(6, 182, 212, 0)',
                                                '0 0 20px rgba(6, 182, 212, 0.8)',
                                                '0 0 0 rgba(6, 182, 212, 0)'
                                            ]
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.15
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {phase === 'text' && (
                        <motion.div
                            key="text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter"
                        >
                            <motion.span
                                className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{ backgroundSize: '200% 100%' }}
                            >
                                {text}
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
                <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                    initial={{ width: 0 }}
                    animate={{
                        width: phase === 'text' ? '100%' :
                            phase === 'morphing' ? `${50 + morphProgress * 50}%` :
                                `${count * 0.5}%`
                    }}
                    transition={{ ease: "linear", duration: 0.1 }}
                />
            </div>

            {/* Corner decorations with glow */}
            <motion.div
                className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-cyan-500/50"
                animate={{
                    borderColor: phase === 'morphing'
                        ? ['rgba(6, 182, 212, 0.5)', 'rgba(168, 85, 247, 0.8)', 'rgba(6, 182, 212, 0.5)']
                        : 'rgba(6, 182, 212, 0.5)'
                }}
                transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-pink-500/50"
                animate={{
                    borderColor: phase === 'morphing'
                        ? ['rgba(236, 72, 153, 0.5)', 'rgba(168, 85, 247, 0.8)', 'rgba(236, 72, 153, 0.5)']
                        : 'rgba(236, 72, 153, 0.5)'
                }}
                transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-cyan-500/50"
            />
            <motion.div
                className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-pink-500/50"
            />
        </motion.div>
    );
};

export default Preloader;
