import React from 'react';
import { motion } from 'framer-motion';

const InfiniteMarquee = () => {
    const keywords = [
        "TRANSFORM YOUR VISION",
        "DRIVE REAL RESULTS",
        "ELEVATE YOUR BRAND",
        "GROW YOUR BUSINESS",
        "PREMIUM DIGITAL CRAFT",
        "CONVERSION FOCUSED"
    ];
    return (
        <div className="relative py-10 bg-black border-y border-white/10 overflow-hidden z-20">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-purple-900/10 to-pink-900/10" />

            <motion.div
                className="flex whitespace-nowrap will-change-transform"
                animate={{ x: [0, -100 * keywords.length - keywords.length * 4] + '%' }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
                {[...Array(4)].map((_, setIndex) => (
                    <div key={setIndex} className="flex">
                        {keywords.map((keyword, i) => (
                            <div key={i} className="flex items-center">
                                <span className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent"
                                    style={{
                                        WebkitTextStroke: '1px rgba(6, 182, 212, 0.3)',
                                        textShadow: '0 0 30px rgba(6, 182, 212, 0.2)'
                                    }}
                                >
                                    {keyword}
                                </span>
                                <span className="text-cyan-500/30 text-2xl">✦</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteMarquee;
