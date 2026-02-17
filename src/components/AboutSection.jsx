import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { SectionHeader, RevealOnScroll, ParallaxContainer } from './UIComponents';
import AboutUsBento from './AboutUsBento';
import { industriesData } from '../data/aboutUsData';

const AboutSection = () => {
    return (
        <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
            <ParallaxContainer speed={0.2} className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </ParallaxContainer>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <RevealOnScroll>
                    <SectionHeader
                        title={
                            <span className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                                Turning clicks into customers
                            </span>
                        }
                        align="center"
                        className="mb-8"
                    />
                </RevealOnScroll>

                {/* Main Description */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <RevealOnScroll>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                            <span className="text-white font-semibold">Creative WebFlow</span> is a digital agency
                            focused on helping small businesses attract more customers through clean design,
                            clear messaging, and conversion-focused websites.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Dynamic Bento Focus Cards - Extracted to Component */}
                <AboutUsBento />

                {/* Industries Section - Glassmorphism Cards from Stitch */}
                <RevealOnScroll>
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
                            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Who We Help</span>
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                            Built for Businesses <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Like Yours</span>
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto text-lg">
                            We specialize in niche industries that require high-trust digital environments and seamless customer journeys.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {industriesData.map((industry, i) => (
                        <motion.div
                            key={industry.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative"
                        >
                            {/* Hover glow effect */}
                            <div
                                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(6, 208, 249, 0.5), rgba(168, 85, 247, 0.3))'
                                }}
                            />

                            {/* Card */}
                            <div
                                className="relative p-8 rounded-2xl h-full flex flex-col space-y-4 transition-all duration-300"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}
                            >
                                {/* Hover border color change */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        border: '1px solid rgba(6, 208, 249, 0.4)'
                                    }}
                                />

                                <motion.div
                                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-2 border border-cyan-500/20"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <span className="material-icons text-cyan-400 text-3xl">{industry.icon}</span>
                                </motion.div>

                                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors">
                                    {industry.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed font-light text-sm group-hover:text-white/70 transition-colors">
                                    {industry.description}
                                </p>

                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                        style={{
                                            background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 55%, transparent 60%)',
                                        }}
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: '100%' }}
                                        transition={{ duration: 0.6 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Trust Statement */}
                <RevealOnScroll delay={0.3}>
                    <div className="text-center">
                        <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/50">
                            <span className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                No technical jargon
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                Simple communication
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                We handle everything
                            </span>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default AboutSection;
