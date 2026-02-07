import React from 'react';
import { motion } from 'framer-motion';
import { ScrollVelocityContainer, ScrollVelocityRow } from './MagicUI';

const InfiniteMarquee = () => {
    return (
        <div className="relative py-12 bg-black border-y border-white/10 overflow-hidden z-20">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-purple-900/10 to-pink-900/10" />

            {/* Premium ScrollVelocity Marquee - replaces the old static animation */}
            <ScrollVelocityContainer className="text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.02em]">
                <ScrollVelocityRow baseVelocity={15} direction={1}>
                    <span className="flex items-center gap-12">
                        <span
                            className="text-transparent"
                            style={{
                                WebkitTextStroke: '1px rgba(6, 182, 212, 0.4)',
                                textShadow: '0 0 30px rgba(6, 182, 212, 0.15)'
                            }}
                        >
                            TRANSFORM YOUR VISION
                        </span>
                        <span className="text-cyan-500/30 text-2xl">✦</span>
                        <span
                            className="text-transparent"
                            style={{
                                WebkitTextStroke: '1px rgba(168, 85, 247, 0.4)',
                                textShadow: '0 0 30px rgba(168, 85, 247, 0.15)'
                            }}
                        >
                            DRIVE REAL RESULTS
                        </span>
                        <span className="text-purple-500/30 text-2xl">✦</span>
                        <span
                            className="text-transparent"
                            style={{
                                WebkitTextStroke: '1px rgba(236, 72, 153, 0.4)',
                                textShadow: '0 0 30px rgba(236, 72, 153, 0.15)'
                            }}
                        >
                            ELEVATE YOUR BRAND
                        </span>
                        <span className="text-pink-500/30 text-2xl">✦</span>
                    </span>
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={15} direction={-1}>
                    <span className="flex items-center gap-12 mt-4">
                        <span
                            className="text-transparent"
                            style={{
                                WebkitTextStroke: '1px rgba(236, 72, 153, 0.4)',
                                textShadow: '0 0 30px rgba(236, 72, 153, 0.15)'
                            }}
                        >
                            PREMIUM DIGITAL CRAFT
                        </span>
                        <span className="text-pink-500/30 text-2xl">✦</span>
                        <span
                            className="text-transparent"
                            style={{
                                WebkitTextStroke: '1px rgba(6, 182, 212, 0.4)',
                                textShadow: '0 0 30px rgba(6, 182, 212, 0.15)'
                            }}
                        >
                            CONVERSION FOCUSED
                        </span>
                        <span className="text-cyan-500/30 text-2xl">✦</span>
                        <span
                            className="text-transparent"
                            style={{
                                WebkitTextStroke: '1px rgba(168, 85, 247, 0.4)',
                                textShadow: '0 0 30px rgba(168, 85, 247, 0.15)'
                            }}
                        >
                            GROW YOUR BUSINESS
                        </span>
                        <span className="text-purple-500/30 text-2xl">✦</span>
                    </span>
                </ScrollVelocityRow>
            </ScrollVelocityContainer>
        </div>
    );
};

export default InfiniteMarquee;
