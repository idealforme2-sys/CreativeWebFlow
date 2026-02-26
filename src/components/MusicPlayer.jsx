import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ size = 18 }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('cwf-music-muted');
        return saved === null ? true : saved === 'true';
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const startedRef = useRef(false);

    const startAudio = useCallback(async () => {
        if (startedRef.current) return;
        startedRef.current = true;

        if (!audioRef.current) {
            const audio = new Audio('/WebsiteMusic.mp3');
            audio.loop = true;
            audio.preload = 'auto';
            audio.volume = 0.6;
            audio.muted = isMuted;
            audioRef.current = audio;
        }

        try {
            await audioRef.current.play();
            if (!audioRef.current.paused) setIsPlaying(true);
        } catch (err) {
            startedRef.current = false;
            setIsPlaying(false);
            if (!isMuted) {
                audioRef.current.muted = true;
                setIsMuted(true);
            }
        }
    }, [isMuted]);

    useEffect(() => {
        localStorage.setItem('cwf-music-muted', String(isMuted));
        if (!audioRef.current) return;
        audioRef.current.muted = isMuted;
        if (!isMuted && audioRef.current.paused) {
            audioRef.current.play().catch(() => {});
        }
    }, [isMuted]);

    useEffect(() => {
        const ensureStart = () => startAudio();
        startAudio();
        window.addEventListener('pointerdown', ensureStart, { once: true });
        window.addEventListener('keydown', ensureStart, { once: true });
        const audio = audioRef.current;
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);
        if (audio) {
            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('ended', handleEnded);
        }
        return () => {
            window.removeEventListener('pointerdown', ensureStart);
            window.removeEventListener('keydown', ensureStart);
            if (audio) {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('ended', handleEnded);
                audio.pause();
            }
        };
    }, [startAudio]);

    const toggle = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        if (!audioRef.current) {
            const audio = new Audio('/WebsiteMusic.mp3');
            audio.loop = true;
            audio.preload = 'auto';
            audio.volume = 0.6;
            audioRef.current = audio;
        }
        audioRef.current.muted = nextMuted;
        if (!nextMuted) {
            audioRef.current.play().catch(() => {});
        }
    };
    const bars = [1, 2, 3, 4];
    const showPlaying = !isMuted && isPlaying;

    return (
        <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300 group"
            title={showPlaying ? 'Turn music off' : 'Turn music on'}
        >
            <AnimatePresence mode="wait">
                {!showPlaying ? (
                    <motion.div key="off" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <VolumeX size={size} className="text-white/40 group-hover:text-white/70 transition-colors" />
                    </motion.div>
                ) : (
                    <motion.div key="on" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }} className="relative">
                        <Volume2 size={size} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <div className="absolute -top-1.5 -right-1.5 flex items-end gap-[1px]">
                            {bars.map((b) => (
                                <motion.div
                                    key={b}
                                    className="w-[2px] bg-cyan-400/60 rounded-full"
                                    animate={{ height: ['2px', `${3 + Math.random() * 5}px`, '2px'] }}
                                    transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, ease: 'easeInOut', delay: b * 0.08 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default MusicPlayer;
