import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Users, Repeat, Lock, ArrowRight } from 'lucide-react';
import { SectionHeader, RevealOnScroll, StaggerContainer, StaggerItem, MagneticButton } from './UIComponents';

const AppDevSection = () => {
    const services = [
        {
            icon: Smartphone,
            title: "iOS & Android Development",
            description: "Native applications optimized for performance, stability, and platform-specific best practices.",
            color: "purple"
        },
        {
            icon: Users,
            title: "User-Centered Design",
            description: "Clean, intuitive interfaces designed around user behavior to maximize usability and engagement.",
            color: "pink"
        },
        {
            icon: Repeat,
            title: "Cross-Platform Solutions",
            description: "Efficient cross-platform apps that deliver a consistent experience across devices while reducing development time.",
            color: "cyan"
        },
        {
            icon: Lock,
            title: "Security & Integration",
            description: "Secure app architecture with smooth integration into existing systems, APIs, and third-party services.",
            color: "blue"
        }
    ];

    const colorMap = {
        cyan: "from-cyan-500 to-cyan-400",
        purple: "from-purple-500 to-purple-400",
        pink: "from-pink-500 to-pink-400",
        blue: "from-blue-500 to-blue-400"
    };

    const iconBgMap = {
        cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
        pink: "bg-pink-500/10 text-pink-400 border-pink-500/30",
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/30"
    };

    return (
        <section id="app-development" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left - Services Grid */}
                    <div className="order-2 lg:order-1">
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
                            {services.map((service, i) => {
                                const Icon = service.icon;
                                const colors = {
                                    gradient: colorMap[service.color],
                                    text: iconBgMap[service.color].split(' ')[1],
                                    bg: iconBgMap[service.color].split(' ')[0],
                                    border: iconBgMap[service.color].split(' ')[2]
                                };

                                return (
                                    <StaggerItem key={i}>
                                        <motion.div
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative min-h-[320px] group"
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
                                                <h3 className="text-xl font-bold mb-3 text-white leading-tight">
                                                    {service.title}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-sm leading-relaxed flex-grow text-gray-300 mb-4 line-clamp-4">
                                                    {service.description}
                                                </p>

                                                {/* Explore Feature CTA */}
                                                <div className={`flex items-center text-sm font-bold ${colors.text} group-hover:translate-x-1 transition-transform`}>
                                                    <span className="mr-2">Explore Feature</span>
                                                    <ArrowRight size={16} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </StaggerItem>
                                );
                            })}
                        </StaggerContainer>
                    </div>

                    {/* Right Content */}
                    <div className="order-1 lg:order-2">
                        <RevealOnScroll>
                            <SectionHeader
                                label="App Development"
                                title={
                                    <>
                                        Apps that users{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                            love
                                        </span>
                                    </>
                                }
                                className="mb-8"
                            />
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                We build mobile applications that are intuitive, reliable, and designed for
                                real users. At Creative WebFlow, we focus on creating apps that not only
                                look great but feel effortless to use — combining strong UI design with
                                solid performance.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-10">
                                By leveraging modern mobile technologies, we help businesses launch apps
                                that stand out, engage users, and scale with growth.
                            </p>
                        </RevealOnScroll>

                        {/* Phone Mockup Placeholder */}
                        <RevealOnScroll delay={0.3}>
                            <div className="relative">
                                <div className="relative mx-auto w-48 h-96 rounded-[3rem] border-4 border-white/10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm overflow-hidden">
                                    {/* Screen content */}
                                    <div className="absolute inset-4 rounded-[2rem] bg-black/60 border border-white/5 overflow-hidden">
                                        {/* Fake app UI */}
                                        <div className="p-4 space-y-3">
                                            <div className="h-8 w-3/4 bg-white/10 rounded-lg" />
                                            <div className="h-24 w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl" />
                                            <div className="h-4 w-full bg-white/5 rounded" />
                                            <div className="h-4 w-2/3 bg-white/5 rounded" />
                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <div className="h-16 bg-cyan-500/10 rounded-lg" />
                                                <div className="h-16 bg-purple-500/10 rounded-lg" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notch */}
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full" />
                                </div>

                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppDevSection;
