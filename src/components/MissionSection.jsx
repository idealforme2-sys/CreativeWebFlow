import React from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from './UIComponents';
import { TextReveal, Highlighter, GradientText } from './MagicUI';

const MissionSection = () => {
    return (
        <section id="mission" className="relative py-32 lg:py-48 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

            {/* Animated gradient orbs */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Label */}
                <RevealOnScroll>
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
                        <span className="text-xs font-mono text-purple-400 uppercase tracking-[0.3em]">Our Mission</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500" />
                    </div>
                </RevealOnScroll>

                {/* Main Quote with TextReveal */}
                <div className="mb-12">
                    <span className="text-purple-400 text-6xl leading-none">"</span>
                    <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed">
                        Our mission at Creative WebFlow is to create impactful digital solutions that help businesses grow, convert, and compete in the modern digital world.
                    </TextReveal>
                </div>

                {/* Extended description with Highlighter */}
                <RevealOnScroll delay={0.2}>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-16">
                        We are committed to delivering{' '}
                        <Highlighter action="highlight" color="rgba(168, 85, 247, 0.2)">
                            <span className="text-white">high-quality work</span>
                        </Highlighter>{' '}
                        through thoughtful design, technical excellence, and a{' '}
                        <Highlighter action="underline" color="#06b6d4">
                            <span className="text-cyan-300">results-driven mindset</span>
                        </Highlighter>.
                        By working closely with our clients, we transform ideas into effective digital experiences —
                        empowering brands to{' '}
                        <Highlighter action="highlight" color="rgba(217, 70, 239, 0.2)">
                            <span className="text-white">thrive in a competitive market</span>
                        </Highlighter>.
                    </p>
                </RevealOnScroll>

                {/* Values with GradientText */}
                <RevealOnScroll delay={0.3}>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {['Thoughtful Design', 'Technical Excellence', 'Results-Driven', 'Client-Focused'].map((value, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="px-6 py-3 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-sm text-sm hover:border-purple-500/50 transition-all group"
                            >
                                <GradientText className="group-hover:animate-gradient-x">
                                    {value}
                                </GradientText>
                            </motion.div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>

            {/* Decorative lines */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </section>
    );
};

export default MissionSection;
