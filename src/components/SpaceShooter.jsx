import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X, Zap } from 'lucide-react';

// SpaceShooter - Full-screen space shooter mini-game
const SpaceShooter = ({ onClose }) => {
    const canvasRef = useRef(null);
    const gameRef = useRef({
        player: { x: 0, y: 0, width: 40, height: 40 },
        lasers: [],
        asteroids: [],
        stars: [],
        particles: [],
        score: 0,
        lives: 3,
        gameOver: false,
        keys: {}
    });
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const game = gameRef.current;
        game.player.x = canvas.width / 2;
        game.player.y = canvas.height - 100;

        // Initialize stars
        for (let i = 0; i < 100; i++) {
            game.stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 2 + 1
            });
        }

        // Spawn asteroids periodically
        const spawnAsteroid = () => {
            if (game.gameOver) return;
            game.asteroids.push({
                x: Math.random() * (canvas.width - 60) + 30,
                y: -50,
                size: 20 + Math.random() * 40,
                speed: 2 + Math.random() * 3,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        };
        const asteroidInterval = setInterval(spawnAsteroid, 1000);

        // Shooting stars
        const spawnShootingStar = () => {
            if (Math.random() > 0.02) return;
            game.stars.push({
                x: Math.random() * canvas.width,
                y: 0,
                size: 3,
                speed: 15,
                isShooting: true,
                trail: []
            });
        };

        // Keyboard controls
        const handleKeyDown = (e) => {
            game.keys[e.key] = true;
            if (e.key === ' ' && !game.gameOver) {
                game.lasers.push({
                    x: game.player.x,
                    y: game.player.y - 20,
                    speed: 12
                });
            }
        };
        const handleKeyUp = (e) => {
            game.keys[e.key] = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Mouse/touch controls
        const handleMouseMove = (e) => {
            game.player.x = e.clientX;
        };
        const handleClick = () => {
            if (!game.gameOver) {
                game.lasers.push({
                    x: game.player.x,
                    y: game.player.y - 20,
                    speed: 12
                });
            }
        };
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);

        // Create explosion particles
        const createExplosion = (x, y, color = '#06b6d4') => {
            for (let i = 0; i < 15; i++) {
                const angle = (Math.PI * 2 / 15) * i;
                const speed = 3 + Math.random() * 4;
                game.particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: 3 + Math.random() * 3,
                    color,
                    life: 1
                });
            }
        };

        // Game loop
        let animationFrame;
        const gameLoop = () => {
            ctx.fillStyle = '#030014';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw and update stars
            game.stars = game.stars.filter(star => {
                star.y += star.speed;

                if (star.isShooting) {
                    star.trail.push({ x: star.x, y: star.y });
                    if (star.trail.length > 20) star.trail.shift();

                    // Draw trail
                    star.trail.forEach((t, i) => {
                        const alpha = i / star.trail.length;
                        ctx.beginPath();
                        ctx.arc(t.x, t.y, star.size * alpha, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
                        ctx.fill();
                    });
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = star.isShooting ? '#fff' : `rgba(255, 255, 255, ${0.3 + star.size / 3})`;
                ctx.fill();

                if (star.y > canvas.height + 10) {
                    star.y = -10;
                    star.x = Math.random() * canvas.width;
                    if (star.isShooting) return false;
                }
                return true;
            });
            spawnShootingStar();

            if (!game.gameOver) {
                // Player movement
                if (game.keys['ArrowLeft'] || game.keys['a']) {
                    game.player.x = Math.max(20, game.player.x - 8);
                }
                if (game.keys['ArrowRight'] || game.keys['d']) {
                    game.player.x = Math.min(canvas.width - 20, game.player.x + 8);
                }

                // Draw player (spaceship)
                ctx.save();
                ctx.translate(game.player.x, game.player.y);

                // Ship body
                ctx.beginPath();
                ctx.moveTo(0, -25);
                ctx.lineTo(-20, 20);
                ctx.lineTo(0, 10);
                ctx.lineTo(20, 20);
                ctx.closePath();
                const gradient = ctx.createLinearGradient(0, -25, 0, 20);
                gradient.addColorStop(0, '#06b6d4');
                gradient.addColorStop(1, '#8b5cf6');
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Engine glow
                ctx.beginPath();
                ctx.moveTo(-10, 20);
                ctx.lineTo(0, 35 + Math.random() * 10);
                ctx.lineTo(10, 20);
                ctx.closePath();
                ctx.fillStyle = `rgba(255, 150, 0, ${0.5 + Math.random() * 0.5})`;
                ctx.fill();

                ctx.restore();
            }

            // Update and draw lasers
            game.lasers = game.lasers.filter(laser => {
                laser.y -= laser.speed;

                // Draw laser
                const laserGradient = ctx.createLinearGradient(laser.x, laser.y, laser.x, laser.y + 20);
                laserGradient.addColorStop(0, '#06b6d4');
                laserGradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
                ctx.fillStyle = laserGradient;
                ctx.fillRect(laser.x - 2, laser.y, 4, 20);

                // Glow
                ctx.beginPath();
                ctx.arc(laser.x, laser.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
                ctx.fill();

                return laser.y > -20;
            });

            // Update and draw asteroids
            game.asteroids = game.asteroids.filter(asteroid => {
                asteroid.y += asteroid.speed;
                asteroid.rotation += asteroid.rotationSpeed;

                // Draw asteroid
                ctx.save();
                ctx.translate(asteroid.x, asteroid.y);
                ctx.rotate(asteroid.rotation);

                ctx.beginPath();
                const points = 8;
                for (let i = 0; i < points; i++) {
                    const angle = (Math.PI * 2 / points) * i;
                    const r = asteroid.size * (0.7 + Math.sin(i * 2) * 0.3);
                    const x = Math.cos(angle) * r;
                    const y = Math.sin(angle) * r;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fillStyle = '#4a4a5a';
                ctx.fill();
                ctx.strokeStyle = '#6a6a7a';
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.restore();

                // Check collision with lasers
                for (let i = game.lasers.length - 1; i >= 0; i--) {
                    const laser = game.lasers[i];
                    const dx = laser.x - asteroid.x;
                    const dy = laser.y - asteroid.y;
                    if (Math.sqrt(dx * dx + dy * dy) < asteroid.size) {
                        game.lasers.splice(i, 1);
                        createExplosion(asteroid.x, asteroid.y, '#a855f7');
                        game.score += Math.floor(asteroid.size);
                        setScore(game.score);
                        return false;
                    }
                }

                // Check collision with player
                if (!game.gameOver) {
                    const dx = game.player.x - asteroid.x;
                    const dy = game.player.y - asteroid.y;
                    if (Math.sqrt(dx * dx + dy * dy) < asteroid.size + 20) {
                        createExplosion(game.player.x, game.player.y, '#ec4899');
                        game.lives--;
                        setLives(game.lives);
                        if (game.lives <= 0) {
                            game.gameOver = true;
                            setGameOver(true);
                        }
                        return false;
                    }
                }

                return asteroid.y < canvas.height + asteroid.size;
            });

            // Update and draw particles
            game.particles = game.particles.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                p.size *= 0.95;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace(')', `, ${p.life})`).replace('rgb', 'rgba').replace('#', '');
                // Handle hex colors
                if (p.color.startsWith('#')) {
                    const r = parseInt(p.color.slice(1, 3), 16);
                    const g = parseInt(p.color.slice(3, 5), 16);
                    const b = parseInt(p.color.slice(5, 7), 16);
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.life})`;
                }
                ctx.fill();

                return p.life > 0;
            });

            animationFrame = requestAnimationFrame(gameLoop);
        };
        gameLoop();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrame);
            clearInterval(asteroidInterval);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    const restartGame = () => {
        const game = gameRef.current;
        game.score = 0;
        game.lives = 3;
        game.gameOver = false;
        game.asteroids = [];
        game.lasers = [];
        game.particles = [];
        setScore(0);
        setLives(3);
        setGameOver(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#030014]"
        >
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* HUD */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full">
                    <Zap className="text-yellow-400" size={18} />
                    <span className="text-white font-mono text-lg">{score}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`w-4 h-4 rounded-full ${i < lives ? 'bg-pink-500' : 'bg-gray-700'}`}
                            animate={i < lives ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-colors"
            >
                <X className="text-white" size={24} />
            </button>

            {/* Controls hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center">
                <p className="text-white/50 text-sm font-mono">
                    Move: Mouse or Arrow Keys | Shoot: Click or Space
                </p>
            </div>

            {/* Game Over screen */}
            <AnimatePresence>
                {gameOver && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
                    >
                        <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                            GAME OVER
                        </h2>
                        <p className="text-2xl text-white mb-2">Final Score</p>
                        <p className="text-5xl font-mono text-cyan-400 mb-8">{score}</p>
                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={restartGame}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full"
                            >
                                Play Again
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10"
                            >
                                Exit
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// CuriousButton - Floating button that triggers the game
export const CuriousButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            onClick={onClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="fixed bottom-8 right-8 z-[100] group"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 2, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className="relative">
                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50"
                    animate={{
                        scale: isHovered ? [1, 1.4, 1] : 1,
                        opacity: isHovered ? [0.5, 0.8, 0.5] : 0.5
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                />

                {/* Button */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                    <Rocket className="text-white relative z-10" size={28} />
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 10, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 10, scale: 0.8 }}
                            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg whitespace-nowrap"
                        >
                            <span className="text-white text-sm font-medium">🚀 Play Space Game!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.button>
    );
};

export default SpaceShooter;
