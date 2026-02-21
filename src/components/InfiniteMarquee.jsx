import React from 'react';
import { motion } from 'framer-motion';

const InfiniteMarquee = () => {
    // Simple, clean marquee items - solid gradient text, no strokes
    const items = [
        { text: 'MORE CUSTOMERS', color: 'from-cyan-400 to-cyan-300' },
        { text: 'MORE BOOKINGS', color: 'from-purple-400 to-purple-300' },
        { text: 'MORE CALLS', color: 'from-pink-400 to-pink-300' },
        { text: 'REAL RESULTS', color: 'from-cyan-400 to-purple-400' },
    ];

    return (
        <div
            className="relative pt-16 pb-8 bg-gradient-to-b from-black via-[#0a0a12] to-black overflow-hidden"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
        >
            {/* Row 1 - Moving Right */}
            <div className="relative overflow-hidden mb-3">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        x: {
                            duration: 25,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                    }}
                >
                    {/* Duplicate items for seamless loop */}
                    {[...items, ...items].map((item, index) => (
                        <div key={index} className="flex items-center gap-8">
                            <span className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                                {item.text}
                            </span>
                            <span className="text-cyan-500/40 text-xl">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Row 2 - Moving Left */}
            <div className="relative overflow-hidden">
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{
                        x: {
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                    }}
                >
                    {/* Duplicate items for seamless loop - reversed order */}
                    {[...items.reverse(), ...items].map((item, index) => (
                        <div key={index} className="flex items-center gap-8">
                            <span className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                                {item.text}
                            </span>
                            <span className="text-purple-500/40 text-xl">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default InfiniteMarquee;
