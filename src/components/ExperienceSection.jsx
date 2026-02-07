import React from 'react';
import { motion } from 'framer-motion';
import { VideoText, TextReveal, Highlighter } from './MagicUI';
import { RevealOnScroll } from './UIComponents';

const ExperienceSection = () => {
    return (
        <section className="relative py-32 lg:py-40 bg-black overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-cyan-500/10 blur-[100px] opacity-30" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Side: VideoText Showcase */}
                    <div>
                        <RevealOnScroll>
                            <div className="relative h-[250px] w-full overflow-hidden rounded-3xl border border-white/10 group">
                                <VideoText src="https://cdn.magicui.design/ocean-small.webm" className="h-full">
                                    DESIGN
                                </VideoText>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-6 left-6">
                                    <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Digital Prowess</p>
                                </div>
                            </div>
                        </RevealOnScroll>

                        <div className="mt-12 space-y-8">
                            <RevealOnScroll delay={0.2}>
                                <div className="text-center lg:text-left">
                                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                                        The{" "}
                                        <Highlighter action="underline" color="#FF9800">
                                            Magic UI Highlighter
                                        </Highlighter>{" "}
                                        makes important{" "}
                                        <Highlighter action="highlight" color="#0ea5e9">
                                            text stand out
                                        </Highlighter>{" "}
                                        effortlessly.
                                    </p>
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>

                    {/* Right Side: TextReveal Showcase */}
                    <div className="flex flex-col justify-center">
                        <RevealOnScroll delay={0.4}>
                            <div className="p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl" />

                                <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                    Magic UI will change the way you design and build the future.
                                </TextReveal>

                                <div className="mt-10 pt-10 border-t border-white/10">
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        We integrate cutting-edge visual libraries to ensure your brand
                                        stays ahead of the curve. Immersive, interactive, and undeniably premium.
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
