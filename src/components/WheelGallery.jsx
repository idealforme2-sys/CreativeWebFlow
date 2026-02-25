import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { CheckCircle2, Sparkles, Zap, Users, Target, TrendingUp } from 'lucide-react';
import { SectionHeader, RevealOnScroll } from './UIComponents';

const WheelGallery = () => {
    const scrollRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: scrollRef });

    const cards = [
        {
            icon: Sparkles,
            title: "Premium Quality",
            description: "Every pixel crafted with precision and attention to detail",
            color: "from-cyan-500/20 to-cyan-500/5",
            borderColor: "border-cyan-500/30",
            iconColor: "text-cyan-400"
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Optimized for speed without compromising on visual excellence",
            color: "from-purple-500/20 to-purple-500/5",
            borderColor: "border-purple-500/30",
            iconColor: "text-purple-400"
        },
        {
            icon: Users,
            title: "User Centered",
            description: "Designed with your audience in mind for maximum engagement",
            color: "from-pink-500/20 to-pink-500/5",
            borderColor: "border-pink-500/30",
            iconColor: "text-pink-400"
        },
        {
            icon: Target,
            title: "Results Driven",
            description: "Every decision backed by data and focused on conversion",
            color: "from-blue-500/20 to-blue-500/5",
            borderColor: "border-blue-500/30",
            iconColor: "text-blue-400"
        },
        {
            icon: TrendingUp,
            title: "Growth Focused",
            description: "Built to scale with your business and adapt to change",
            color: "from-cyan-500/20 to-cyan-500/5",
            borderColor: "border-cyan-500/30",
            iconColor: "text-cyan-400"
        },
        {
            icon: CheckCircle2,
            title: "Proven Track Record",
            description: "Trusted by leading brands to deliver exceptional results",
            color: "from-purple-500/20 to-purple-500/5",
            borderColor: "border-purple-500/30",
            iconColor: "text-purple-400"
        }
    ];

    return (
        <section className="relative py-32 lg:py-40 overflow-hidden bg-black">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <RevealOnScroll>
                    <SectionHeader
                        label="Why Choose Us"
                        title={
                            <>
                                What makes us{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                    different
                                </span>
                            </>
                        }
                        subtitle="We combine artistry with analytics to deliver digital experiences that don't just look good — they perform."
                        align="center"
                        className="mb-20"
                    />
                </RevealOnScroll>

                {/* Horizontal Scrolling Gallery */}
                <div className="relative">
                    {/* Scroll container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        {cards.map((card, i) => {
                            const Icon = card.icon;
                            return (
                                <motion.div
                                    key={i}
                                    className="flex-shrink-0 w-[350px] md:w-[400px]"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                >
                                    <motion.div
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative h-72 group"
                                    >
                                        {/* Animated gradient background */}
                                        <div className="absolute inset-0 rounded-3xl overflow-hidden">
                                            <motion.div
                                                className={`absolute inset-0 bg-gradient-to-br ${card.color}`}
                                                animate={{
                                                    backgroundPosition: ['0% 0%', '100% 100%'],
                                                    scale: [1, 1.05, 1]
                                                }}
                                                transition={{
                                                    duration: 8 + i,
                                                    repeat: Infinity,
                                                    ease: 'linear'
                                                }}
                                                style={{ backgroundSize: '200% 200%' }}
                                            />
                                        </div>

                                        {/* Glass card overlay */}
                                        <div className={`relative z-10 p-8 rounded-3xl h-full flex flex-col bg-black/80 backdrop-blur-sm border ${card.borderColor} group-hover:border-white/40 transition-all`}>
                                            {/* Icon */}
                                            <div className="mb-6">
                                                <div className={`w-16 h-16 rounded-2xl bg-white/5 border ${card.borderColor} flex items-center justify-center shadow-lg`}>
                                                    <Icon size={32} className={card.iconColor} />
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl font-bold mb-4 text-white">
                                                {card.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-300 leading-relaxed flex-grow">
                                                {card.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Scroll indicator */}
                    <div className="flex justify-center mt-8 gap-2">
                        {cards.map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-white/20"
                            />
                        ))}
                    </div>

                    {/* Gradient fade edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Add scrollbar hide style */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default WheelGallery;
