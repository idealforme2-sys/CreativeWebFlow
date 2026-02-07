import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatusHUD = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2 font-mono text-[10px] text-white/50 mix-blend-difference pointer-events-none">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="tracking-widest">SYSTEM_ONLINE</span>
            </div>

            <div className="tracking-widest">{time}</div>

            <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-white/30 rounded-sm"
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            height: [8, 16, 8]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.1
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default StatusHUD;
