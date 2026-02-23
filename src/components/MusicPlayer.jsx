import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ size = 18 }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('cwf-music-muted');
        return saved === null ? true : saved === 'true';
    });
    const audioCtxRef = useRef(null);
    const gainRef = useRef(null);
    const startedRef = useRef(false);

    const startAudio = useCallback(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.value = 0;
        masterGain.connect(ctx.destination);
        gainRef.current = masterGain;

        // Ambient pad: layered oscillators with slow LFO
        const notes = [130.81, 196.00, 261.63, 329.63]; // C3, G3, C4, E4
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = i % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;

            // Slight detuning for richness
            osc.detune.value = (Math.random() - 0.5) * 8;

            filter.type = 'lowpass';
            filter.frequency.value = 800 + i * 200;
            filter.Q.value = 0.5;

            oscGain.gain.value = 0.06;

            // Slow LFO on volume
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.type = 'sine';
            lfo.frequency.value = 0.1 + i * 0.05;
            lfoGain.gain.value = 0.015;
            lfo.connect(lfoGain);
            lfoGain.connect(oscGain.gain);
            lfo.start();

            osc.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start();
        });

        // Sub-bass drone
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = 'sine';
        sub.frequency.value = 65.41; // C2
        subGain.gain.value = 0.04;
        sub.connect(subGain);
        subGain.connect(masterGain);
        sub.start();
    }, []);

    // Fade in/out when muted state changes
    useEffect(() => {
        localStorage.setItem('cwf-music-muted', String(isMuted));

        if (!isMuted && !startedRef.current) {
            startAudio();
        }

        if (gainRef.current && audioCtxRef.current) {
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();
            const now = ctx.currentTime;
            gainRef.current.gain.cancelScheduledValues(now);
            gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, now);
            gainRef.current.gain.linearRampToValueAtTime(isMuted ? 0 : 1, now + 0.8);
        }
    }, [isMuted, startAudio]);

    const toggle = () => setIsMuted(!isMuted);

    // Equalizer bars animation
    const bars = [1, 2, 3, 4];

    return (
        <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-300 group"
            title={isMuted ? 'Turn music on' : 'Turn music off'}
        >
            <AnimatePresence mode="wait">
                {isMuted ? (
                    <motion.div
                        key="off"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <VolumeX size={size} className="text-white/40 group-hover:text-white/70 transition-colors" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="on"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="relative"
                    >
                        <Volume2 size={size} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        {/* Mini equalizer bars */}
                        <div className="absolute -top-1.5 -right-1.5 flex items-end gap-[1px]">
                            {bars.map((b) => (
                                <motion.div
                                    key={b}
                                    className="w-[2px] bg-cyan-400/60 rounded-full"
                                    animate={{ height: ['2px', `${3 + Math.random() * 5}px`, '2px'] }}
                                    transition={{
                                        duration: 0.4 + Math.random() * 0.3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: b * 0.08,
                                    }}
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
