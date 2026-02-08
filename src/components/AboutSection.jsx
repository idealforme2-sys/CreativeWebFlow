import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { SectionHeader, RevealOnScroll, StaggerContainer, StaggerItem, ParallaxContainer } from './UIComponents';

const AboutSection = () => {
    const focusPoints = [
        {
            icon: Target,
            title: "Professional & Trustworthy",
            description: "Making your business look as good as the big competitors — so customers trust you instantly.",
            color: "cyan"
        },
        {
            icon: Users,
            title: "Clear Messaging",
            description: "Helping customers understand your offer quickly — no confusion, just action.",
            color: "purple"
        },
        {
            icon: TrendingUp,
            title: "Real Results",
            description: "Turning website visits into real inquiries — calls, messages, and bookings.",
            color: "pink"
        }
    ];

    const colorClasses = {
        cyan: "from-cyan-500/20 to-cyan-500/0 border-cyan-500/30 text-cyan-400",
        purple: "from-purple-500/20 to-purple-500/0 border-purple-500/30 text-purple-400",
        pink: "from-pink-500/20 to-pink-500/0 border-pink-500/30 text-pink-400"
    };

    return (
        <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
            <ParallaxContainer speed={0.2} className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </ParallaxContainer>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Header */}
                <RevealOnScroll>
                    <SectionHeader
                        label="About Us"
                        title={
                            <>
                                We don't just build websites.{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                    We help local businesses grow.
                                </span>
                            </>
                        }
                        align="center"
                        className="mb-12"
                    />
                </RevealOnScroll>

                {/* Main Description */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <RevealOnScroll>
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-6">
                            <span className="text-white font-semibold">Creative WebFlow</span> is a digital agency
                            focused on helping small businesses attract more customers through clean design,
                            clear messaging, and conversion-focused websites.
                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <p className="text-base md:text-lg text-white/50">
                            We focus on what matters most to your business:
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Focus Points Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" staggerDelay={0.15}>
                    {focusPoints.map((point, i) => {
                        const Icon = point.icon;
                        return (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className={`relative group p-6 rounded-2xl border bg-gradient-to-br ${colorClasses[point.color]} backdrop-blur-sm overflow-hidden h-full`}
                                >
                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 rounded-xl bg-black/50 border ${colorClasses[point.color].split(' ')[2]} flex items-center justify-center mb-4`}>
                                            <Icon size={22} className={colorClasses[point.color].split(' ')[3]} />
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-2">{point.title}</h4>
                                        <p className="text-sm text-white/60 leading-relaxed">{point.description}</p>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>

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
