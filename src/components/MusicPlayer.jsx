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
        masterGain.connect(ctx.destination);

        // Reverb
        const convolver = ctx.createConvolver();
        const reverbLen = ctx.sampleRate * 3.5;
        const impulse = ctx.createBuffer(2, reverbLen, ctx.sampleRate);
        for (let ch = 0; ch < 2; ch++) {
            const d = impulse.getChannelData(ch);
            for (let i = 0; i < reverbLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2.2);
        }
        convolver.buffer = impulse;
        const reverbGain = ctx.createGain();
        reverbGain.gain.value = 0.35;
        convolver.connect(reverbGain);
        reverbGain.connect(masterGain);

        // Gentle sub-bass drone (C2)
        const drone = ctx.createOscillator();
        const droneGain = ctx.createGain();
        drone.type = 'sine';
        drone.frequency.value = 65.41;
        droneGain.gain.value = 0.035;
        drone.connect(droneGain);
        droneGain.connect(masterGain);
        droneGain.connect(convolver);
        drone.start();

        // Slow LFO on drone
        const droneLfo = ctx.createOscillator();
        const droneLfoGain = ctx.createGain();
        droneLfo.type = 'sine';
        droneLfo.frequency.value = 0.08;
        droneLfoGain.gain.value = 0.012;
        droneLfo.connect(droneLfoGain);
        droneLfoGain.connect(droneGain.gain);
        droneLfo.start();

        // Melodic arpeggio — pentatonic in C minor, played as gentle sine bells
        const notes = [
            261.63, 311.13, 349.23, 392.00, 466.16, // C4 Eb4 F4 G4 Bb4
            523.25, 622.25, 698.46, 783.99, 932.33, // C5 Eb5 F5 G5 Bb5
        ];

        // Sequence patterns (indices into notes array)
        const patterns = [
            [0, 2, 4, 7],    // C4 F4 Bb4 G5
            [1, 3, 5, 8],    // Eb4 G4 C5 F5
            [0, 4, 6, 9],    // C4 Bb4 Eb5 Bb5
            [2, 5, 7, 4],    // F4 C5 G5 Bb4
            [3, 6, 8, 5],    // G4 Eb5 F5 C5
        ];

        let patternIdx = 0;
        let noteIdx = 0;

        const playNote = () => {
            if (!audioCtxRef.current) return;
            const c = audioCtxRef.current;
            const pattern = patterns[patternIdx];
            const freq = notes[pattern[noteIdx]];

            const osc = c.createOscillator();
            const oscGain = c.createGain();
            const filter = c.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.value = freq;
            osc.detune.value = (Math.random() - 0.5) * 4;

            filter.type = 'lowpass';
            filter.frequency.value = 1200;
            filter.Q.value = 0.5;

            const vol = 0.04 + Math.random() * 0.015;
            const now = c.currentTime;
            oscGain.gain.setValueAtTime(0, now);
            oscGain.gain.linearRampToValueAtTime(vol, now + 0.08);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

            osc.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(masterGain);
            oscGain.connect(convolver);
            osc.start(now);
            osc.stop(now + 3);

            noteIdx++;
            if (noteIdx >= pattern.length) {
                noteIdx = 0;
                patternIdx = (patternIdx + 1) % patterns.length;
            }

            // Varying tempo: 600-1000ms between notes
            const nextTime = 600 + Math.random() * 400;
            setTimeout(playNote, nextTime);
        };

        // Start arpeggio after a brief delay
        setTimeout(playNote, 800);
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
            gainRef.current.gain.linearRampToValueAtTime(isMuted ? 0 : 1, now + 1);
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
