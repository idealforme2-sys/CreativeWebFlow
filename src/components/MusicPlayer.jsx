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
        gainRef.current = masterGain;

        // Reverb via convolver
        const convolver = ctx.createConvolver();
        const reverbLen = ctx.sampleRate * 3;
        const impulse = ctx.createBuffer(2, reverbLen, ctx.sampleRate);
        for (let ch = 0; ch < 2; ch++) {
            const data = impulse.getChannelData(ch);
            for (let i = 0; i < reverbLen; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2.5);
            }
        }
        convolver.buffer = impulse;

        const reverbGain = ctx.createGain();
        reverbGain.gain.value = 0.3;
        convolver.connect(reverbGain);
        reverbGain.connect(masterGain);
        masterGain.connect(ctx.destination);

        // Dark ambient pad — minor chord voicing (Cm9)
        const voices = [
            { freq: 65.41, type: 'sine', gain: 0.05 },      // C2 sub
            { freq: 130.81, type: 'sine', gain: 0.04 },     // C3
            { freq: 155.56, type: 'triangle', gain: 0.03 }, // Eb3
            { freq: 196.00, type: 'sine', gain: 0.03 },     // G3
            { freq: 233.08, type: 'triangle', gain: 0.025 },// Bb3
            { freq: 293.66, type: 'sine', gain: 0.02 },     // D4 (9th)
        ];

        voices.forEach((v, i) => {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = v.type;
            osc.frequency.value = v.freq;
            osc.detune.value = (Math.random() - 0.5) * 6;

            filter.type = 'lowpass';
            filter.frequency.value = 400 + i * 80;
            filter.Q.value = 0.7;

            oscGain.gain.value = v.gain;

            // Very slow LFO for breathing effect
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.type = 'sine';
            lfo.frequency.value = 0.04 + i * 0.012;
            lfoGain.gain.value = v.gain * 0.3;
            lfo.connect(lfoGain);
            lfoGain.connect(oscGain.gain);
            lfo.start();

            // Slow filter LFO
            const filterLfo = ctx.createOscillator();
            const filterLfoGain = ctx.createGain();
            filterLfo.type = 'sine';
            filterLfo.frequency.value = 0.02 + i * 0.008;
            filterLfoGain.gain.value = 150;
            filterLfo.connect(filterLfoGain);
            filterLfoGain.connect(filter.frequency);
            filterLfo.start();

            osc.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(masterGain);
            oscGain.connect(convolver); // send to reverb too
            osc.start();
        });

        // Distant shimmer — high filtered noise bursts
        const shimmer = () => {
            if (!audioCtxRef.current) return;
            const c = audioCtxRef.current;
            const bufSize = c.sampleRate * 2;
            const buf = c.createBuffer(1, bufSize, c.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < bufSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3);
            }
            const src = c.createBufferSource();
            src.buffer = buf;
            const bp = c.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = 2000 + Math.random() * 3000;
            bp.Q.value = 15;
            const sGain = c.createGain();
            sGain.gain.value = 0.008;
            src.connect(bp);
            bp.connect(sGain);
            sGain.connect(convolver);
            src.start();
            setTimeout(shimmer, 4000 + Math.random() * 8000);
        };
        setTimeout(shimmer, 3000);
    }, []);

    useEffect(() => {
        localStorage.setItem('cwf-music-muted', String(isMuted));
        if (!isMuted && !startedRef.current) startAudio();
        if (gainRef.current && audioCtxRef.current) {
            const ctx = audioCtxRef.current;
            if (ctx.state === 'suspended') ctx.resume();
            const now = ctx.currentTime;
            gainRef.current.gain.cancelScheduledValues(now);
            gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, now);
            gainRef.current.gain.linearRampToValueAtTime(isMuted ? 0 : 1, now + 1.2);
        }
    }, [isMuted, startAudio]);

    const toggle = () => setIsMuted(!isMuted);
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
