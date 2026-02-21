import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Zap, Heart, Trophy } from 'lucide-react';

// In-Site Space Game - Plays directly on the website
const InSiteSpaceGame = ({ isActive, onClose }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const intervalsRef = useRef([]);
    const gameStateRef = useRef({
        player: { x: 0, y: 0, shield: false, multiShot: false },
        lasers: [],
        asteroids: [],
        powerUps: [],
        particles: [],
        explosions: [],
        shootingStars: [],
        score: 0,
        lives: 3,
        combo: 0,
        maxCombo: 0,
        level: 1,
        gameOver: false,
        keys: {},
        lastShot: 0,
        initialized: false
    });

    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [combo, setCombo] = useState(0);
    const [maxCombo, setMaxCombo] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [showTutorial, setShowTutorial] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);

    // Start game after tutorial dismissed
    const startGame = () => {
        setShowTutorial(false);
        setGameStarted(true);
    };

    // Main game effect - only runs when game is started
    useEffect(() => {
        if (!isActive || !gameStarted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const game = gameStateRef.current;
        const isRunning = { current: true };

        // Ensure the game only captures necessary input, leaving scroll mostly intact
        // We removed the overflow hidden and scroll blocking to prevent "scroll jacking"
        // Let the game be an overlay without breaking the global page experience.

        // Initialize game state
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (!game.initialized) {
                game.player.x = canvas.width / 2;
                game.player.y = canvas.height - 120;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        // Reset game state
        game.score = 0;
        game.lives = 3;
        game.combo = 0;
        game.maxCombo = 0;
        game.level = 1;
        game.gameOver = false;
        game.asteroids = [];
        game.lasers = [];
        game.powerUps = [];
        game.particles = [];
        game.explosions = [];
        game.shootingStars = [];
        game.initialized = true;

        setScore(0);
        setLives(3);
        setCombo(0);
        setMaxCombo(0);
        setLevel(1);
        setGameOver(false);

        // Spawn asteroid
        const spawnAsteroid = () => {
            if (game.gameOver) return;

            const edge = Math.floor(Math.random() * 4);
            let x, y, vx, vy;
            const speed = 1.5 + game.level * 0.3 + Math.random() * 2;

            switch (edge) {
                case 0: // top
                    x = Math.random() * canvas.width;
                    y = -50;
                    vx = (Math.random() - 0.5) * 2;
                    vy = speed;
                    break;
                case 1: // right
                    x = canvas.width + 50;
                    y = Math.random() * canvas.height * 0.7;
                    vx = -speed;
                    vy = (Math.random() - 0.5) * 2;
                    break;
                case 2: // bottom
                    x = Math.random() * canvas.width;
                    y = canvas.height + 50;
                    vx = (Math.random() - 0.5) * 2;
                    vy = -speed * 0.5;
                    break;
                default: // left
                    x = -50;
                    y = Math.random() * canvas.height * 0.7;
                    vx = speed;
                    vy = (Math.random() - 0.5) * 2;
            }

            const size = 20 + Math.random() * 30;
            const type = Math.random() > 0.85 ? 'golden' : Math.random() > 0.7 ? 'fast' : 'normal';

            game.asteroids.push({
                x, y, vx, vy, size,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.05,
                type,
                health: type === 'golden' ? 2 : 1,
                points: type === 'golden' ? 50 : type === 'fast' ? 30 : 10
            });
        };

        // Spawn shooting star (ambient effect)
        const spawnShootingStar = () => {
            if (Math.random() > 0.3) return;
            game.shootingStars.push({
                x: Math.random() * canvas.width,
                y: -10,
                speed: 10 + Math.random() * 10,
                angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
                length: 60 + Math.random() * 40,
                opacity: 1
            });
        };

        // Spawn power-up
        const spawnPowerUp = () => {
            if (game.gameOver || Math.random() > 0.4) return;
            const types = ['shield', 'multiShot', 'heal'];
            game.powerUps.push({
                x: Math.random() * (canvas.width - 100) + 50,
                y: -30,
                type: types[Math.floor(Math.random() * types.length)],
                vy: 1.5 + Math.random()
            });
        };

        // Set intervals
        const asteroidInt = setInterval(spawnAsteroid, Math.max(500, 1200 - game.level * 80));
        const starInt = setInterval(spawnShootingStar, 2000);
        const powerInt = setInterval(spawnPowerUp, 10000);
        intervalsRef.current = [asteroidInt, starInt, powerInt];

        // Keyboard handlers
        const handleKeyDown = (e) => {
            game.keys[e.key.toLowerCase()] = true;
            if (e.key === ' ' && !game.gameOver) {
                shoot();
                e.preventDefault();
            }
            if (e.key === 'Escape') onClose();
        };
        const handleKeyUp = (e) => {
            game.keys[e.key.toLowerCase()] = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Mouse handler — attach to window so we never miss events
        const handleMouseMove = (e) => {
            if (!game.gameOver) {
                game.player.x += (e.clientX - game.player.x) * 0.15;
                game.player.y += (e.clientY - game.player.y) * 0.10;
                game.player.y = Math.max(100, Math.min(canvas.height - 50, game.player.y));
            }
        };

        const shoot = () => {
            const now = Date.now();
            if (now - game.lastShot < 120) return;
            game.lastShot = now;

            game.lasers.push({
                x: game.player.x,
                y: game.player.y - 30,
                vy: -18
            });

            if (game.player.multiShot) {
                game.lasers.push({ x: game.player.x - 15, y: game.player.y - 25, vy: -17, vx: -2 });
                game.lasers.push({ x: game.player.x + 15, y: game.player.y - 25, vy: -17, vx: 2 });
            }
        };

        const handleClick = () => {
            if (!game.gameOver) shoot();
        };

        // Auto-fire while mouse held down
        let autoFireInterval = null;
        const handleMouseDown = () => {
            if (!game.gameOver) {
                shoot();
                autoFireInterval = setInterval(() => { if (!game.gameOver) shoot(); }, 150);
            }
        };
        const handleMouseUp = () => {
            if (autoFireInterval) { clearInterval(autoFireInterval); autoFireInterval = null; }
        };

        window.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleClick);
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Explosion effect
        const createExplosion = (x, y, color = '#06b6d4', count = 15) => {
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 / count) * i;
                const speed = 4 + Math.random() * 5;
                game.particles.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: 2 + Math.random() * 3,
                    color,
                    life: 1
                });
            }
            game.explosions.push({ x, y, radius: 5, opacity: 1, color });
        };

        // Level check
        const checkLevel = () => {
            const newLevel = Math.floor(game.score / 500) + 1;
            if (newLevel > game.level) {
                game.level = newLevel;
                setLevel(newLevel);
            }
        };

        // Game loop
        const gameLoop = () => {
            if (!isRunning.current) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Player movement
            if (!game.gameOver) {
                const speed = 8;
                if (game.keys['arrowleft'] || game.keys['a']) game.player.x = Math.max(30, game.player.x - speed);
                if (game.keys['arrowright'] || game.keys['d']) game.player.x = Math.min(canvas.width - 30, game.player.x + speed);
                if (game.keys['arrowup'] || game.keys['w']) game.player.y = Math.max(100, game.player.y - speed);
                if (game.keys['arrowdown'] || game.keys['s']) game.player.y = Math.min(canvas.height - 50, game.player.y + speed);

                // Draw ship
                ctx.save();
                ctx.translate(game.player.x, game.player.y);

                if (game.player.shield) {
                    ctx.beginPath();
                    ctx.arc(0, 0, 45, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${0.6 + Math.sin(Date.now() * 0.01) * 0.3})`;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.moveTo(0, -30);
                ctx.lineTo(-22, 22);
                ctx.lineTo(-8, 12);
                ctx.lineTo(0, 16);
                ctx.lineTo(8, 12);
                ctx.lineTo(22, 22);
                ctx.closePath();

                const grad = ctx.createLinearGradient(0, -30, 0, 22);
                grad.addColorStop(0, '#06b6d4');
                grad.addColorStop(0.5, '#8b5cf6');
                grad.addColorStop(1, '#ec4899');
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Engine flames
                const flameH = 12 + Math.random() * 12;
                ctx.beginPath();
                ctx.moveTo(-6, 16);
                ctx.lineTo(0, 16 + flameH);
                ctx.lineTo(6, 16);
                ctx.fillStyle = `rgba(255, ${120 + Math.random() * 80}, 0, 0.8)`;
                ctx.fill();

                ctx.restore();
            }

            // Shooting stars
            game.shootingStars = game.shootingStars.filter(s => {
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.015;

                const gradient = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
                gradient.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();

                return s.opacity > 0 && s.y < canvas.height && s.x < canvas.width + 50;
            });

            // Lasers
            game.lasers = game.lasers.filter(l => {
                l.y += l.vy;
                if (l.vx) l.x += l.vx;

                ctx.fillStyle = '#00ffff';
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 10;
                ctx.fillRect(l.x - 2, l.y, 4, 20);
                ctx.shadowBlur = 0;

                return l.y > -30 && l.x > -30 && l.x < canvas.width + 30;
            });

            // Asteroids
            game.asteroids = game.asteroids.filter(a => {
                a.x += a.vx;
                a.y += a.vy;
                a.rotation += a.rotationSpeed;

                ctx.save();
                ctx.translate(a.x, a.y);
                ctx.rotate(a.rotation);

                ctx.beginPath();
                for (let i = 0; i < 7; i++) {
                    const angle = (Math.PI * 2 / 7) * i;
                    const r = a.size * (0.7 + Math.sin(i * 2.5) * 0.3);
                    if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
                    else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
                }
                ctx.closePath();
                ctx.fillStyle = a.type === 'golden' ? '#ffd700' : a.type === 'fast' ? '#ff6b6b' : '#5a5a7a';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.stroke();
                ctx.restore();

                // Laser collision
                for (let i = game.lasers.length - 1; i >= 0; i--) {
                    const l = game.lasers[i];
                    const dx = l.x - a.x, dy = l.y - a.y;
                    if (Math.sqrt(dx * dx + dy * dy) < a.size + 8) {
                        game.lasers.splice(i, 1);
                        a.health--;
                        if (a.health <= 0) {
                            createExplosion(a.x, a.y, a.type === 'golden' ? '#ffd700' : '#a855f7');
                            game.score += a.points * (1 + game.combo * 0.1);
                            game.combo++;
                            if (game.combo > game.maxCombo) {
                                game.maxCombo = game.combo;
                                setMaxCombo(game.combo);
                            }
                            setScore(Math.floor(game.score));
                            setCombo(game.combo);
                            checkLevel();
                            return false;
                        }
                    }
                }

                // Player collision
                if (!game.gameOver && !game.player.shield) {
                    const dx = game.player.x - a.x, dy = game.player.y - a.y;
                    if (Math.sqrt(dx * dx + dy * dy) < a.size + 20) {
                        createExplosion(a.x, a.y, '#ec4899', 20);
                        game.lives--;
                        game.combo = 0;
                        setLives(game.lives);
                        setCombo(0);
                        if (game.lives <= 0) {
                            game.gameOver = true;
                            setGameOver(true);
                            createExplosion(game.player.x, game.player.y, '#ff0000', 30);
                        }
                        return false;
                    }
                }

                return a.x > -100 && a.x < canvas.width + 100 && a.y > -100 && a.y < canvas.height + 100;
            });

            // Power-ups
            game.powerUps = game.powerUps.filter(p => {
                p.y += p.vy;

                ctx.save();
                ctx.translate(p.x, p.y);
                const col = p.type === 'shield' ? '#06b6d4' : p.type === 'heal' ? '#22c55e' : '#ec4899';
                ctx.beginPath();
                ctx.arc(0, 0, 18, 0, Math.PI * 2);
                ctx.fillStyle = col;
                ctx.fill();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = 'white';
                ctx.font = 'bold 14px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.type === 'shield' ? '🛡' : p.type === 'heal' ? '❤' : '✦', 0, 0);
                ctx.restore();

                if (!game.gameOver) {
                    const dx = game.player.x - p.x, dy = game.player.y - p.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 35) {
                        if (p.type === 'shield') {
                            game.player.shield = true;
                            setTimeout(() => { game.player.shield = false; }, 5000);
                        } else if (p.type === 'heal') {
                            game.lives = Math.min(5, game.lives + 1);
                            setLives(game.lives);
                        } else if (p.type === 'multiShot') {
                            game.player.multiShot = true;
                            setTimeout(() => { game.player.multiShot = false; }, 6000);
                        }
                        createExplosion(p.x, p.y, col, 10);
                        return false;
                    }
                }
                return p.y < canvas.height + 50;
            });

            // Particles
            game.particles = game.particles.filter(p => {
                p.x += p.vx; p.y += p.vy;
                p.vx *= 0.97; p.vy *= 0.97;
                p.life -= 0.025;
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(0, p.size * p.life), 0, Math.PI * 2);
                const r = parseInt(p.color.slice(1, 3), 16);
                const g = parseInt(p.color.slice(3, 5), 16);
                const b = parseInt(p.color.slice(5, 7), 16);
                ctx.fillStyle = `rgba(${r},${g},${b},${p.life})`;
                ctx.fill();
                return p.life > 0;
            });

            // Explosions
            game.explosions = game.explosions.filter(e => {
                e.radius += 3;
                e.opacity -= 0.05;
                ctx.beginPath();
                ctx.arc(e.x, e.y, Math.max(0, e.radius), 0, Math.PI * 2);
                const r = parseInt(e.color.slice(1, 3), 16);
                const g = parseInt(e.color.slice(3, 5), 16);
                const b = parseInt(e.color.slice(5, 7), 16);
                ctx.strokeStyle = `rgba(${r},${g},${b},${e.opacity})`;
                ctx.lineWidth = 2;
                ctx.stroke();
                return e.opacity > 0;
            });

            animationRef.current = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            isRunning.current = false;
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            intervalsRef.current.forEach(i => clearInterval(i));
            window.removeEventListener('resize', resize);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            if (autoFireInterval) clearInterval(autoFireInterval);
        };
    }, [isActive, gameStarted, onClose]);

    if (!isActive) return null;

    return (
        <>
            <canvas ref={canvasRef} className="fixed inset-0 z-[100] cursor-crosshair" style={{ display: gameStarted ? 'block' : 'none' }} />

            {/* Tutorial */}
            <AnimatePresence>
                {showTutorial && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="text-center p-10 bg-black/90 border border-cyan-500/40 rounded-3xl max-w-md mx-4"
                        >
                            <Rocket className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
                            <h2 className="text-4xl font-black text-white mb-6">SPACE DEFENDER</h2>
                            <div className="space-y-4 text-gray-300 mb-8">
                                <p><span className="text-cyan-400 font-bold">Move:</span> Mouse or WASD / Arrows</p>
                                <p><span className="text-purple-400 font-bold">Shoot:</span> Click or Spacebar</p>
                                <p><span className="text-pink-400 font-bold">Exit:</span> Press ESC</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-lg font-bold rounded-full"
                            >
                                START GAME
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HUD */}
            {gameStarted && !showTutorial && (
                <>
                    <div className="fixed top-6 left-6 z-[120] flex items-center gap-4">
                        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-cyan-500/30 rounded-full">
                            <Zap className="text-yellow-400" size={20} />
                            <span className="text-white font-mono text-lg font-bold">{score}</span>
                        </motion.div>
                        {combo > 1 && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 px-4 py-2 bg-purple-900/70 backdrop-blur-xl border border-purple-500/30 rounded-full">
                                <span className="text-white font-bold">{combo}x</span>
                            </motion.div>
                        )}
                        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-purple-500/30 rounded-full">
                            <Trophy className="text-purple-400" size={18} />
                            <span className="text-white font-mono">LVL {level}</span>
                        </motion.div>
                    </div>
                    <div className="fixed top-6 right-6 z-[120] flex items-center gap-1 px-4 py-2 bg-black/80 backdrop-blur-xl border border-pink-500/30 rounded-full">
                        {[...Array(5)].map((_, i) => (
                            <Heart key={i} size={18} className={i < lives ? 'text-pink-500 fill-pink-500' : 'text-gray-700'} />
                        ))}
                    </div>
                    <button onClick={onClose} className="fixed bottom-6 right-6 z-[120] px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/20 rounded-full text-white font-bold hover:bg-white/10">Exit (ESC)</button>
                </>
            )}

            {/* Game Over */}
            <AnimatePresence>
                {gameOver && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 backdrop-blur-xl">
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-6">GAME OVER</h2>
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div><p className="text-gray-400 text-sm">Final Score</p><p className="text-4xl font-mono font-bold text-cyan-400">{score}</p></div>
                                <div><p className="text-gray-400 text-sm">Max Combo</p><p className="text-4xl font-mono font-bold text-purple-400">{maxCombo}x</p></div>
                            </div>
                            <p className="text-gray-400 mb-6">Level Reached: {level}</p>
                            <div className="flex gap-4 justify-center">
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.location.reload()} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full">Play Again</motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="px-8 py-4 border border-white/20 text-white font-bold rounded-full">Exit</motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Game Trigger Button
export const GameTriggerButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            onClick={onClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="fixed bottom-8 right-8 z-[90] group"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 2, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className="relative">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Rocket className="text-white" size={28} />
                </div>
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/90 border border-cyan-500/30 rounded-lg whitespace-nowrap"
                        >
                            <span className="text-white text-sm font-medium">🚀 Play Space Defender!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.button>
    );
};

export default InSiteSpaceGame;
