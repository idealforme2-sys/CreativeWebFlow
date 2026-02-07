import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TechHUD from './TechHUD';
import { WordRotate, TextAnimate, RainbowButton, Highlighter } from './MagicUI';

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, 300]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);
    const scale = useTransform(scrollY, [0, 600], [1, 0.9]);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
            <TechHUD />

            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 text-center px-6 max-w-6xl"
            >
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="inline-flex items-center gap-3 px-4 py-2 mb-10 border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <span className="text-[11px] font-mono text-green-400 uppercase tracking-[0.2em]">
                        Available for Projects
                    </span>
                </motion.div>

                {/* Main Heading - WE BUILD */}
                <div className="overflow-hidden mb-4">
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-bold tracking-tighter">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">
                                WE BUILD
                            </span>
                        </h1>
                    </motion.div>
                </div>

                {/* Main Heading - Rotating Word */}
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-bold tracking-tighter">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                <WordRotate
                                    words={['STUNNING', 'BEAUTIFUL', 'POWERFUL', 'AMAZING']}
                                    duration={2500}
                                    className="inline-block"
                                />
                            </span>
                        </h1>
                    </motion.div>
                </div>

                {/* Main Heading - EXPERIENCES */}
                <div className="overflow-hidden mt-2">
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] font-bold tracking-tighter">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">
                                EXPERIENCES
                            </span>
                        </h1>
                    </motion.div>
                </div>

                {/* Subtitle with TextAnimate */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-10 text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                >
                    <TextAnimate animation="blurInUp" by="word" once>
                        Transform your digital presence with designs that
                    </TextAnimate>
                    <span className="block mt-2">
                        <Highlighter action="underline" color="#06b6d4">
                            <span className="text-white font-semibold">convert visitors into customers</span>
                        </Highlighter>
                    </span>
                </motion.div>

                {/* CTA Buttons with RainbowButton */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
                >
                    <RainbowButton onClick={() => window.location.href = '#work'}>
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                            View Our Work
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                    </RainbowButton>

                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                    >
                        Start a Project
                    </motion.a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
