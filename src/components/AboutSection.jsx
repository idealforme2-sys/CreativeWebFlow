import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Rocket, Shield } from 'lucide-react';
import { SectionHeader, RevealOnScroll, HolographicCard, StaggerContainer, StaggerItem, ParallaxContainer } from './UIComponents';
import { TextReveal, Highlighter } from './MagicUI';

const AboutSection = () => {
    const values = [
        {
            icon: Target,
            title: "Strategy First",
            description: "Every project starts with understanding your goals and crafting a roadmap to achieve them.",
            color: "cyan"
        },
        {
            icon: Lightbulb,
            title: "Design Excellence",
            description: "We create visually stunning experiences that capture attention and inspire action.",
            color: "purple"
        },
        {
            icon: Rocket,
            title: "Performance Driven",
            description: "Speed, accessibility, and SEO are built into everything we create from day one.",
            color: "pink"
        },
        {
            icon: Shield,
            title: "Results Focused",
            description: "We measure success by the real impact we deliver for your business growth.",
            color: "blue"
        }
    ];



    const colorClasses = {
        cyan: "from-cyan-500/20 to-cyan-500/0 border-cyan-500/30 text-cyan-400",
        purple: "from-purple-500/20 to-purple-500/0 border-purple-500/30 text-purple-400",
        pink: "from-pink-500/20 to-pink-500/0 border-pink-500/30 text-pink-400",
        blue: "from-blue-500/20 to-blue-500/0 border-blue-500/30 text-blue-400"
    };

    return (
        <section id="about" className="relative py-32 lg:py-40 overflow-hidden">
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
                        label="About Us"
                        title={
                            <>
                                We don't just build websites.{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                    We build digital empires.
                                </span>
                            </>
                        }
                        align="center"
                        className="mb-16"
                    />
                </RevealOnScroll>

                {/* Main Description with TextReveal */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8">
                        We blend strategy, design, and technology to turn ideas into conversion-driven digital products.
                    </TextReveal>
                    <RevealOnScroll delay={0.2}>
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                            <Highlighter action="highlight" color="rgba(6, 182, 212, 0.15)">
                                <span className="text-white font-semibold">Creative WebFlow</span>
                            </Highlighter>{' '}
                            is a digital design agency focused on building high-impact websites and digital experiences
                            that help brands grow. Our approach is simple: we don't just make things look good — we build
                            solutions that work. Every project is crafted with{' '}
                            <Highlighter action="underline" color="#a855f7">
                                <span className="text-purple-300">performance, usability, and real business goals</span>
                            </Highlighter>{' '}
                            in mind.
                        </p>
                    </RevealOnScroll>
                </div>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.15}>
                    {values.map((value, i) => {
                        const Icon = value.icon;
                        return (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.3 }}
                                    className={`relative group p-8 rounded-2xl border bg-gradient-to-br ${colorClasses[value.color]} backdrop-blur-sm overflow-hidden`}
                                >
                                    {/* Background glow on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[value.color].split(' ')[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-xl bg-black/50 border ${colorClasses[value.color].split(' ')[2]} flex items-center justify-center mb-6`}>
                                            <Icon size={24} className={colorClasses[value.color].split(' ')[3]} />
                                        </div>

                                        <h4 className="text-xl font-bold text-white mb-3">{value.title}</h4>
                                        <p className="text-gray-400 leading-relaxed">{value.description}</p>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
};

export default AboutSection;
