import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Trophy, RotateCcw, X, Zap, Shield } from 'lucide-react';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;
const SHIP_SIZE = 36;
const ASTEROID_SIZE = 28;
const POWERUP_SIZE = 22;
const TICK_MS = 30;

const InteractiveChallenge = ({ isActive, onClose }) => {
    const [started, setStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('cwf_spaceDodge_hi');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [shipX, setShipX] = useState(GAME_WIDTH / 2);
    const [asteroids, setAsteroids] = useState([]);
    const [powerups, setPowerups] = useState([]);
    const [shielded, setShielded] = useState(false);
    const [screenShake, setScreenShake] = useState(false);
    const gameRef = useRef(null);
    const tickRef = useRef(null);
    const spawnRef = useRef(null);
    const scoreRef = useRef(0);
    const difficultyRef = useRef(1);

    // Start game
    const startGame = useCallback(() => {
        setStarted(true);
        setGameOver(false);
        setScore(0);
        scoreRef.current = 0;
        difficultyRef.current = 1;
        setShipX(GAME_WIDTH / 2);
        setAsteroids([]);
        setPowerups([]);
        setShielded(false);
    }, []);

    // Mouse / touch tracking
    const handlePointerMove = useCallback((e) => {
        if (!gameRef.current) return;
        const rect = gameRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setShipX(Math.max(SHIP_SIZE / 2, Math.min(GAME_WIDTH - SHIP_SIZE / 2, x)));
    }, []);

    // Keyboard
    useEffect(() => {
        if (!started || gameOver) return;
        const keys = {};
        const handleDown = (e) => { keys[e.key] = true; if (e.key === 'Escape') onClose(); };
        const handleUp = (e) => { keys[e.key] = false; };
        window.addEventListener('keydown', handleDown);
        window.addEventListener('keyup', handleUp);

        const moveInterval = setInterval(() => {
            if (keys['ArrowLeft'] || keys['a']) setShipX(prev => Math.max(SHIP_SIZE / 2, prev - 8));
            if (keys['ArrowRight'] || keys['d']) setShipX(prev => Math.min(GAME_WIDTH - SHIP_SIZE / 2, prev + 8));
        }, 16);

        return () => {
            window.removeEventListener('keydown', handleDown);
            window.removeEventListener('keyup', handleUp);
            clearInterval(moveInterval);
        };
    }, [started, gameOver, onClose]);

    // Spawn asteroids
    useEffect(() => {
        if (!started || gameOver) return;
        const spawn = () => {
            const count = Math.random() < 0.3 * difficultyRef.current ? 2 : 1;
            const newAsteroids = Array.from({ length: count }, () => ({
                id: Date.now() + Math.random(),
                x: ASTEROID_SIZE / 2 + Math.random() * (GAME_WIDTH - ASTEROID_SIZE),
                y: -ASTEROID_SIZE,
                speed: 2.5 + Math.random() * 2 * difficultyRef.current,
                size: ASTEROID_SIZE * (0.7 + Math.random() * 0.6),
                rotation: Math.random() * 360,
            }));
            setAsteroids(prev => [...prev, ...newAsteroids]);

            // Random power-up (shield)
            if (Math.random() < 0.08) {
                setPowerups(prev => [...prev, {
                    id: Date.now() + Math.random(),
                    x: POWERUP_SIZE + Math.random() * (GAME_WIDTH - POWERUP_SIZE * 2),
                    y: -POWERUP_SIZE,
                    speed: 1.8,
                }]);
            }
        };

        spawnRef.current = setInterval(spawn, Math.max(400, 900 - difficultyRef.current * 80));
        return () => clearInterval(spawnRef.current);
    }, [started, gameOver]);

    // Game loop
    useEffect(() => {
        if (!started || gameOver) return;

        tickRef.current = setInterval(() => {
            // Move asteroids
            setAsteroids(prev => {
                const updated = prev
                    .map(a => ({ ...a, y: a.y + a.speed, rotation: a.rotation + 2 }))
                    .filter(a => a.y < GAME_HEIGHT + 40);
                return updated;
            });

            // Move power-ups
            setPowerups(prev =>
                prev.map(p => ({ ...p, y: p.y + p.speed })).filter(p => p.y < GAME_HEIGHT + 40)
            );

            // Increment score
            scoreRef.current += 1;
            setScore(scoreRef.current);

            // Ramp difficulty
            difficultyRef.current = 1 + Math.floor(scoreRef.current / 200) * 0.3;
        }, TICK_MS);

        return () => clearInterval(tickRef.current);
    }, [started, gameOver]);

    // Collision detection
    useEffect(() => {
        if (!started || gameOver) return;
        const shipY = GAME_HEIGHT - 60;

        // Asteroid collisions
        for (const a of asteroids) {
            const dx = a.x - shipX;
            const dy = a.y - shipY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (a.size / 2 + SHIP_SIZE / 2) * 0.7) {
                if (shielded) {
                    setShielded(false);
                    setAsteroids(prev => prev.filter(ast => ast.id !== a.id));
                    setScreenShake(true);
                    setTimeout(() => setScreenShake(false), 200);
                } else {
                    // Game over
                    clearInterval(tickRef.current);
                    clearInterval(spawnRef.current);
                    setGameOver(true);
                    setScreenShake(true);
                    setTimeout(() => setScreenShake(false), 300);
                    if (scoreRef.current > highScore) {
                        setHighScore(scoreRef.current);
                        localStorage.setItem('cwf_spaceDodge_hi', scoreRef.current.toString());
                    }
                    return;
                }
            }
        }

        // Power-up collisions
        for (const p of powerups) {
            const dx = p.x - shipX;
            const dy = p.y - shipY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (POWERUP_SIZE / 2 + SHIP_SIZE / 2) * 0.8) {
                setShielded(true);
                setPowerups(prev => prev.filter(pu => pu.id !== p.id));
            }
        }
    }, [asteroids, powerups, shipX, started, gameOver, shielded, highScore]);

    // Cleanup on close
    useEffect(() => {
        if (!isActive) {
            setStarted(false);
            setGameOver(false);
            clearInterval(tickRef.current);
            clearInterval(spawnRef.current);
        }
    }, [isActive]);

    if (!isActive) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl"
            style={{ cursor: 'auto' }}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-[110] w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                style={{ cursor: 'pointer' }}
            >
                <X size={18} />
            </button>

            <div className="w-full max-w-md mx-4">
                <AnimatePresence mode="wait">
                    {/* Pre-game */}
                    {!started && !gameOver && (
                        <motion.div
                            key="tutorial"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="text-center p-10 bg-black/90 border border-cyan-500/30 rounded-3xl"
                        >
                            <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                            <h2 className="text-4xl font-black text-white mb-4">SPACE DODGE</h2>
                            <p className="text-gray-400 mb-2">Move your ship to dodge the asteroids!</p>
                            <p className="text-gray-500 text-sm mb-2">Use mouse or ← → arrow keys</p>
                            <p className="text-cyan-400/60 text-xs mb-8">Collect 🛡️ shields for protection</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-lg font-bold rounded-full"
                                style={{ cursor: 'pointer' }}
                            >
                                LAUNCH
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Game Area */}
                    {started && !gameOver && (
                        <motion.div
                            key="game"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                        >
                            {/* HUD */}
                            <div className="flex items-center justify-between mb-4 px-1">
                                <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                                    <Zap size={14} className="text-cyan-400" />
                                    <span className="font-mono font-bold text-white">{score}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                                    <Trophy size={14} className="text-purple-400" />
                                    <span className="font-mono text-sm text-white/60">Best: {highScore}</span>
                                </div>
                                {shielded && (
                                    <div className="flex items-center gap-1 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                                        <Shield size={14} className="text-emerald-400" />
                                    </div>
                                )}
                            </div>

                            {/* Game Canvas */}
                            <motion.div
                                ref={gameRef}
                                onPointerMove={handlePointerMove}
                                animate={screenShake ? { x: [0, -4, 4, -2, 0] } : {}}
                                transition={{ duration: 0.2 }}
                                className="relative bg-black/80 border border-white/10 rounded-2xl overflow-hidden"
                                style={{
                                    width: GAME_WIDTH,
                                    height: GAME_HEIGHT,
                                    cursor: 'none',
                                    margin: '0 auto',
                                    background: 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.06), transparent 60%), black',
                                }}
                            >
                                {/* Stars background */}
                                {Array.from({ length: 30 }, (_, i) => (
                                    <div
                                        key={`star-${i}`}
                                        className="absolute rounded-full bg-white"
                                        style={{
                                            width: 1 + Math.random() * 1.5,
                                            height: 1 + Math.random() * 1.5,
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            opacity: 0.2 + Math.random() * 0.4,
                                        }}
                                    />
                                ))}

                                {/* Asteroids */}
                                {asteroids.map(a => (
                                    <div
                                        key={a.id}
                                        className="absolute"
                                        style={{
                                            left: a.x - a.size / 2,
                                            top: a.y - a.size / 2,
                                            width: a.size,
                                            height: a.size,
                                            transform: `rotate(${a.rotation}deg)`,
                                        }}
                                    >
                                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 border border-gray-600/50 shadow-[0_0_8px_rgba(156,163,175,0.3)]" />
                                    </div>
                                ))}

                                {/* Power-ups */}
                                {powerups.map(p => (
                                    <motion.div
                                        key={p.id}
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        className="absolute"
                                        style={{
                                            left: p.x - POWERUP_SIZE / 2,
                                            top: p.y - POWERUP_SIZE / 2,
                                            width: POWERUP_SIZE,
                                            height: POWERUP_SIZE,
                                        }}
                                    >
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.5)]">
                                            <Shield size={12} className="text-white" />
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Ship */}
                                <div
                                    className="absolute transition-[left] duration-[16ms] ease-linear"
                                    style={{
                                        left: shipX - SHIP_SIZE / 2,
                                        top: GAME_HEIGHT - 60,
                                        width: SHIP_SIZE,
                                        height: SHIP_SIZE,
                                    }}
                                >
                                    {/* Ship body */}
                                    <div className="relative w-full h-full">
                                        <div className="absolute inset-0" style={{
                                            clipPath: 'polygon(50% 0%, 10% 100%, 90% 100%)',
                                            background: shielded
                                                ? 'linear-gradient(to bottom, #34d399, #06b6d4)'
                                                : 'linear-gradient(to bottom, #06b6d4, #8b5cf6)',
                                        }} />
                                        {/* Engine glow */}
                                        <motion.div
                                            animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.8, 1.2, 0.8] }}
                                            transition={{ duration: 0.3, repeat: Infinity }}
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-b-full blur-sm"
                                        />
                                        {/* Shield visual */}
                                        {shielded && (
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                                className="absolute -inset-3 rounded-full border-2 border-emerald-400/50 bg-emerald-400/10"
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            <p className="text-center text-gray-600 text-xs mt-3">Press ESC to exit</p>
                        </motion.div>
                    )}

                    {/* Game Over */}
                    {gameOver && (
                        <motion.div
                            key="gameover"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="text-center p-10 bg-black/90 border border-purple-500/30 rounded-3xl"
                        >
                            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                                GAME OVER
                            </h2>
                            <p className="text-white/40 text-sm mb-8">You dodged through space!</p>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08]">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Score</p>
                                    <p className="text-3xl font-mono font-bold text-cyan-400">{score}</p>
                                </div>
                                <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08]">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Best</p>
                                    <p className="text-3xl font-mono font-bold text-purple-400">{highScore}</p>
                                    {score >= highScore && score > 0 && (
                                        <p className="text-emerald-400 text-[10px] mt-1">🎉 NEW RECORD!</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={startGame}
                                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <RotateCcw size={16} />
                                    Try Again
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="px-8 py-4 border border-white/20 text-white font-bold rounded-full"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Exit
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// Trigger Button
export const ChallengeTriggerButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
            onClick={onClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="fixed bottom-8 right-8 z-[90] group"
            style={{ cursor: 'pointer' }}
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
                    <Rocket className="text-white" size={26} />
                </div>
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-black/90 border border-cyan-500/30 rounded-lg whitespace-nowrap"
                        >
                            <span className="text-white text-sm font-medium">🚀 Space Dodge!</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.button>
    );
};

export default InteractiveChallenge;
