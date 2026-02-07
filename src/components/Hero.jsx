import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TechHUD from './TechHUD';
import {
    FlipText,
    LineShadowText,
    RainbowButton
} from './MagicUI';

const Hero = () => {
    const { scrollY } = useScroll();
    // Parallax effect for the background content only, not the CTA buttons
    const bgY = useTransform(scrollY, [0, 800], [0, 200]);
    const headingOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    // Premium rotating words for the hero
    const rotatingWords = ['LEGENDARY', 'STUNNING', 'POWERFUL', 'ICONIC', 'PREMIUM'];

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
            <TechHUD />

            {/* Hero Content - with parallax fade for headings only */}
            <div className="relative z-10 text-center px-6 max-w-7xl">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ y: bgY, opacity: headingOpacity }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 mb-12 border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-[0.25em]">
                        Available for Projects
                    </span>
                </motion.div>

                {/* Main Heading - WE CREATE */}
                <motion.div
                    className="overflow-hidden mb-2"
                    style={{ y: bgY, opacity: headingOpacity }}
                >
                    <motion.div
                        initial={{ y: 120 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[0.85] font-black tracking-[-0.04em]">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40">
                                WE CREATE
                            </span>
                        </h1>
                    </motion.div>
                </motion.div>

                {/* Main Heading - Rotating Word with FlipText */}
                <motion.div
                    className="overflow-hidden py-2"
                    style={{ y: bgY, opacity: headingOpacity }}
                >
                    <motion.div
                        initial={{ y: 120 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[1] font-black tracking-[-0.04em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x bg-[length:200%_auto]">
                            <FlipText
                                words={rotatingWords}
                                duration={2500}
                            />
                        </h1>
                    </motion.div>
                </motion.div>

                {/* Main Heading - EXPERIENCES */}
                <motion.div
                    className="overflow-hidden mt-2"
                    style={{ y: bgY, opacity: headingOpacity }}
                >
                    <motion.div
                        initial={{ y: 120 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[1] font-black tracking-[-0.04em]">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40">
                                EXPERIENCES
                            </span>
                        </h1>
                    </motion.div>
                </motion.div>

                {/* Premium LineShadowText CTA - DOES NOT FADE */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-14 text-xl md:text-3xl font-semibold text-balance"
                >
                    <span className="text-white/60">Converting visitors into </span>
                    <LineShadowText shadowColor="rgba(6, 182, 212, 0.5)" className="text-white italic px-2">
                        paying customers
                    </LineShadowText>
                </motion.div>

                {/* CTA Buttons - DOES NOT FADE */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14"
                >
                    <RainbowButton onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
                        <span className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em]">
                            Explore Our Showcase
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </span>
                    </RainbowButton>

                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.03, borderColor: 'rgba(6, 182, 212, 0.8)' }}
                        whileTap={{ scale: 0.97 }}
                        className="px-10 py-4 border border-white/20 text-white rounded-full text-sm font-bold uppercase tracking-[0.15em] hover:text-cyan-400 transition-all duration-500 backdrop-blur-sm"
                    >
                        Start a Project
                    </motion.a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-3"
                    >
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Scroll</span>
                        <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
