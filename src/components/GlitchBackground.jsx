import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Glitch Background with electricity/cyberpunk effects
const GlitchBackground = () => {
    const [glitchActive, setGlitchActive] = useState(false);
    const [glitchPosition, setGlitchPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Random glitch trigger
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setGlitchPosition({
                x: Math.random() * 100,
                y: Math.random() * 100,
            });
            setTimeout(() => setGlitchActive(false), 100);
        }, Math.random() * 6000 + 4000);

        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {/* Scanlines overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 240, 255, 0.03) 1px, rgba(0, 240, 255, 0.03) 2px)',
                    animation: 'scanlineMove 8s linear infinite',
                }}
            />

            {/* Moving scanline beam */}
            <motion.div
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                animate={{
                    top: ['0%', '100%'],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Random glitch blocks */}
            {glitchActive && (
                <>
                    {/* Horizontal glitch line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[1px] bg-cyan-400/30"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ duration: 0.1 }}
                        style={{ top: `${glitchPosition.y}%` }}
                    />

                    {/* Vertical glitch line */}
                    <motion.div
                        className="absolute top-0 bottom-0 w-[1px] bg-purple-400/30"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.1 }}
                        style={{ left: `${glitchPosition.x}%` }}
                    />

                    {/* Glitch block */}
                    <motion.div
                        className="absolute h-4 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: `${Math.random() * 20 + 10}%` }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.08 }}
                        style={{
                            top: `${glitchPosition.y}%`,
                            left: `${glitchPosition.x}%`,
                        }}
                    />
                </>
            )}

            {/* Corner electricity effects */}
            {[
                { top: '5%', left: '5%' },
                { top: '5%', right: '5%' },
                { bottom: '5%', left: '5%' },
                { bottom: '5%', right: '5%' },
            ].map((position, i) => (
                <motion.div
                    key={i}
                    className="absolute w-20 h-20"
                    style={position}
                    animate={{
                        opacity: [0, 0.3, 0],
                        scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        delay: i * 0.5,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 3 + 2,
                    }}
                >
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)',
                        }}
                    />
                    {/* Electric arc */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                        <motion.path
                            d="M40 0 L45 20 L35 25 L45 45 L30 50 L45 80"
                            fill="none"
                            stroke="rgba(6,182,212,0.3)"
                            strokeWidth="1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 4 + 3,
                            }}
                        />
                    </svg>
                </motion.div>
            ))}

            {/* Floating glitch particles */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 0.3,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 5 + 3,
                    }}
                />
            ))}

            {/* Heartbeat pulse effect */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    opacity: [0, 0.02, 0],
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                }}
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.3) 0%, transparent 50%)',
                }}
            />

            {/* Global styles */}
            <style>{`
                @keyframes scanlineMove {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100px); }
                }
            `}</style>
        </div>
    );
};

export default GlitchBackground;
