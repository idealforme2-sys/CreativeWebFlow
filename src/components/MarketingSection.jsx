import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Share2, BarChart3, ArrowUpRight } from 'lucide-react';
import { SectionHeader, RevealOnScroll, StaggerContainer, StaggerItem, HolographicCard, MagneticButton } from './UIComponents';

const MarketingSection = () => {
    const services = [
        {
            icon: Search,
            title: "Search Engine Optimization",
            shortTitle: "SEO",
            description: "Improve visibility, rankings, and organic traffic with SEO strategies built for sustainable growth.",
            color: "cyan",
            stat: "300%",
            statLabel: "Avg. Traffic Increase"
        },
        {
            icon: Target,
            title: "Pay-Per-Click Advertising",
            shortTitle: "PPC",
            description: "Targeted ad campaigns designed to maximize ROI and generate immediate, high-intent traffic.",
            color: "pink",
            stat: "4.5x",
            statLabel: "Average ROAS"
        },
        {
            icon: Share2,
            title: "Social Media Marketing",
            shortTitle: "SMM",
            description: "Engaging strategies that strengthen brand presence, build trust, and grow loyal communities.",
            color: "purple",
            stat: "150K+",
            statLabel: "Followers Generated"
        },
        {
            icon: BarChart3,
            title: "Analytics & Tracking",
            shortTitle: "Analytics",
            description: "Clear reporting and insights that help optimize campaigns and continuously improve results.",
            color: "blue",
            stat: "Real-time",
            statLabel: "Performance Data"
        }
    ];

    const colorClasses = {
        cyan: {
            gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
            border: "border-cyan-500/30",
            text: "text-cyan-400",
            bg: "bg-cyan-500/10"
        },
        pink: {
            gradient: "from-pink-500/20 via-pink-500/5 to-transparent",
            border: "border-pink-500/30",
            text: "text-pink-400",
            bg: "bg-pink-500/10"
        },
        purple: {
            gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
            border: "border-purple-500/30",
            text: "text-purple-400",
            bg: "bg-purple-500/10"
        },
        blue: {
            gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
            border: "border-blue-500/30",
            text: "text-blue-400",
            bg: "bg-blue-500/10"
        }
    };

    return (
        <section id="digital-marketing" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-950/5 to-black" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <RevealOnScroll>
                        <SectionHeader
                            label="Digital Marketing"
                            title={
                                <>
                                    Turn attention into{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                                        action
                                    </span>
                                </>
                            }
                            align="center"
                            className="mb-8"
                        />
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.1}>
                        <p className="max-w-3xl mx-auto text-lg text-gray-400 leading-relaxed">
                            We use digital marketing to turn attention into action. Our strategies are built
                            to increase visibility, attract the right audience, and drive real business results —
                            not vanity metrics. By combining creativity with data-driven insights, we create
                            campaigns that connect with users and support long-term growth.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Services Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" staggerDelay={0.1}>
                    {services.map((service, i) => {
                        const Icon = service.icon;
                        const colors = colorClasses[service.color];

                        return (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative h-80 group"
                                >
                                    {/* Animated gradient background */}
                                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} via-transparent to-black/50`}
                                            animate={{
                                                backgroundPosition: ['0% 0%', '100% 100%'],
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: 'linear'
                                            }}
                                            style={{ backgroundSize: '200% 200%' }}
                                        />
                                    </div>

                                    {/* Glass card overlay */}
                                    <div className="relative z-10 p-8 rounded-3xl h-full flex flex-col bg-black/80 backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all">
                                        {/* Icon */}
                                        <div className="mb-6">
                                            <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-lg`}>
                                                <Icon size={28} className={colors.text} />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold mb-4 text-white">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="leading-relaxed flex-grow text-gray-300 mb-6">
                                            {service.description}
                                        </p>

                                        {/* Explore Feature CTA */}
                                        <div className={`flex items-center text-sm font-bold ${colors.text} group-hover:translate-x-1 transition-transform`}>
                                            <span className="mr-2">Explore Feature</span>
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

                {/* Bottom CTA */}
                <RevealOnScroll delay={0.3}>
                    <div className="text-center mt-16">
                        <MagneticButton
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full text-white text-sm font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-pink-500/25 transition-shadow"
                        >
                            Boost Your Online Presence
                            <ArrowUpRight size={18} />
                        </MagneticButton>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default MarketingSection;
