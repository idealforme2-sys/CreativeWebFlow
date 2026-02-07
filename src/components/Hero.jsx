import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TechHUD from './TechHUD';
import {
    FlipText,
    LineShadowText,
    RainbowButton,
    GradientText,
    ScrollVelocityContainer,
    ScrollVelocityRow,
    GlitchText
} from './MagicUI';

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, 300]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);
    const scale = useTransform(scrollY, [0, 600], [1, 0.9]);

    // Premium rotating words for the hero
    const rotatingWords = ['LEGENDARY', 'STUNNING', 'POWERFUL', 'ICONIC', 'PREMIUM'];

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
            <TechHUD />

            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 text-center px-6 max-w-7xl"
            >
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
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
                <div className="overflow-hidden mb-2">
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
                </div>

                {/* Main Heading - Rotating Word with FlipText */}
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ y: 120 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[0.85] font-black tracking-[-0.04em]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x bg-[length:200%_auto]">
                                <AnimatePresence mode="wait">
                                    <FlipText
                                        words={rotatingWords}
                                        duration={2500}
                                        className="inline-block"
                                    />
                                </AnimatePresence>
                            </span>
                        </h1>
                    </motion.div>
                </div>

                {/* Main Heading - EXPERIENCES */}
                <div className="overflow-hidden mt-2">
                    <motion.div
                        initial={{ y: 120 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[0.85] font-black tracking-[-0.04em]">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40">
                                EXPERIENCES
                            </span>
                        </h1>
                    </motion.div>
                </div>

                {/* Premium LineShadowText CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-14 text-xl md:text-3xl font-semibold"
                >
                    <span className="text-gray-400">Transforming brands with </span>
                    <LineShadowText shadowColor="rgba(6, 182, 212, 0.4)" className="text-white italic">
                        digital excellence
                    </LineShadowText>
                </motion.div>

                {/* CTA Buttons with Premium RainbowButton */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-14"
                >
                    <RainbowButton onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
                        <span className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em]">
                            Explore Our Work
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
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
            </motion.div>

            {/* Premium ScrollVelocity Marquee */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="absolute bottom-32 w-full pointer-events-none"
            >
                <ScrollVelocityContainer className="text-[8vw] md:text-[6vw] font-black tracking-[-0.02em] text-white/[0.03]">
                    <ScrollVelocityRow baseVelocity={15} direction={1}>
                        <span className="flex items-center gap-8">
                            <span>DIGITAL EXCELLENCE</span>
                            <span className="text-cyan-500/20">✦</span>
                            <span>BRAND STRATEGY</span>
                            <span className="text-purple-500/20">✦</span>
                            <span>WEB DEVELOPMENT</span>
                            <span className="text-pink-500/20">✦</span>
                        </span>
                    </ScrollVelocityRow>
                    <ScrollVelocityRow baseVelocity={15} direction={-1}>
                        <span className="flex items-center gap-8">
                            <span>UI/UX DESIGN</span>
                            <span className="text-pink-500/20">✦</span>
                            <span>CREATIVE DIRECTION</span>
                            <span className="text-cyan-500/20">✦</span>
                            <span>DIGITAL MARKETING</span>
                            <span className="text-purple-500/20">✦</span>
                        </span>
                    </ScrollVelocityRow>
                </ScrollVelocityContainer>
            </motion.div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
