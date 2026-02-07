import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Sparkles, Award, X } from 'lucide-react';

// Orb class for physics simulation
class Orb {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.id = Math.random().toString(36).substr(2, 9);
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 8 + Math.random() * 12;
        this.baseRadius = this.radius;
        this.hue = Math.random() * 60 + 160; // Cyan to purple range
        this.alpha = 0.4 + Math.random() * 0.3;
        this.pulse = 0;
        this.collected = false;
        this.collectAnimation = 0;
    }

    update(mouseX, mouseY) {
        if (this.collected) {
            this.collectAnimation += 0.1;
            this.radius *= 1.05;
            this.alpha *= 0.9;
            if (this.alpha < 0.01) {
                this.reset();
                this.collected = false;
            }
            return;
        }

        // Subtle mouse attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && dist > 20) {
            this.vx += (dx / dist) * 0.02;
            this.vy += (dy / dist) * 0.02;
        }

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Boundary wrapping
        if (this.x < -this.radius) this.x = this.canvas.width + this.radius;
        if (this.x > this.canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = this.canvas.height + this.radius;
        if (this.y > this.canvas.height + this.radius) this.y = -this.radius;

        // Pulse effect
        this.pulse += 0.05;
        this.radius = this.baseRadius + Math.sin(this.pulse) * 2;
    }

    draw(ctx) {
        if (this.collected) return;

        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${this.alpha})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 80%, 50%, ${this.alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 60%, 30%, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 90%, ${this.alpha * 0.8})`;
        ctx.fill();
    }

    checkClick(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < this.radius + 10; // Add some padding for easier clicking
    }
}

const InteractiveGame = () => {
    const canvasRef = useRef(null);
    const orbsRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);
    const { score, collectOrb, easterEggUnlocked, showEasterEgg, setShowEasterEgg } = useGame();
    const [showScore, setShowScore] = useState(false);
    const [collectFeedback, setCollectFeedback] = useState(null);

    // Initialize canvas and orbs
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Create orbs
        orbsRef.current = Array.from({ length: 12 }, () => new Orb(canvas));

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            orbsRef.current.forEach(orb => {
                orb.update(mouseRef.current.x, mouseRef.current.y);
                orb.draw(ctx);
            });

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Click to collect orbs
    const handleClick = useCallback((e) => {
        const x = e.clientX;
        const y = e.clientY;

        orbsRef.current.forEach(orb => {
            if (!orb.collected && orb.checkClick(x, y)) {
                orb.collected = true;
                collectOrb(orb.id);

                // Show feedback
                setCollectFeedback({ x, y, id: orb.id });
                setTimeout(() => setCollectFeedback(null), 1000);

                // Show score briefly
                setShowScore(true);
                setTimeout(() => setShowScore(false), 2000);
            }
        });
    }, [collectOrb]);

    return (
        <>
            {/* Game Canvas */}
            <canvas
                ref={canvasRef}
                onClick={handleClick}
                className="fixed inset-0 z-[5] pointer-events-auto"
                style={{ cursor: 'crosshair' }}
            />

            {/* Score HUD */}
            <AnimatePresence>
                {(showScore || score > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 right-6 z-[60] flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full"
                    >
                        <Sparkles className="text-cyan-400" size={16} />
                        <span className="text-sm font-mono text-white">{score}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">orbs</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Collect Feedback */}
            <AnimatePresence>
                {collectFeedback && (
                    <motion.div
                        key={collectFeedback.id}
                        initial={{ opacity: 1, scale: 1, y: 0 }}
                        animate={{ opacity: 0, scale: 1.5, y: -30 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed z-[70] pointer-events-none"
                        style={{ left: collectFeedback.x - 10, top: collectFeedback.y - 10 }}
                    >
                        <span className="text-cyan-400 font-bold text-lg">+1</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Easter Egg Notification */}
            <AnimatePresence>
                {showEasterEgg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-purple-900/90 to-cyan-900/90 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)]"
                    >
                        <Award className="text-yellow-400" size={32} />
                        <div>
                            <p className="text-white font-bold">🎉 Easter Egg Unlocked!</p>
                            <p className="text-gray-300 text-sm">You've discovered the hidden orbs. You're a true explorer!</p>
                        </div>
                        <button
                            onClick={() => setShowEasterEgg(false)}
                            className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="text-gray-400" size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default InteractiveGame;
