import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Users, Repeat, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { SectionHeader, RevealOnScroll, StaggerContainer, StaggerItem, MagneticButton } from './UIComponents';

const AppDevSection = () => {
    const solutions = [
        {
            icon: Smartphone,
            title: "Progressive Web Apps",
            subtitle: "App-like experience",
            description: "Give your customers an app-like experience without the cost of building a separate mobile app. Works on any device.",
            color: "purple",
            benefits: ["Works like a native app", "No app store needed", "Automatic updates"]
        },
        {
            icon: Users,
            title: "Customer Portals",
            subtitle: "Client management",
            description: "Secure portals where your customers can book appointments, view their history, and manage their accounts.",
            color: "pink",
            benefits: ["24/7 self-service", "Reduced admin work", "Better customer experience"]
        },
        {
            icon: Repeat,
            title: "Booking Systems",
            subtitle: "Online scheduling",
            description: "Let customers book appointments online anytime. Integrates with your calendar and sends automatic reminders.",
            color: "cyan",
            benefits: ["Never miss a booking", "Reduce no-shows", "Save phone time"]
        },
        {
            icon: Lock,
            title: "Custom Features",
            subtitle: "Tailored solutions",
            description: "Need something specific? We build custom features and integrations that solve your unique business challenges.",
            color: "blue",
            benefits: ["Custom functionality", "System integration", "Scalable solutions"]
        }
    ];

    const colorMap = {
        cyan: {
            gradient: "from-cyan-500 to-cyan-400",
            text: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/30"
        },
        purple: {
            gradient: "from-purple-500 to-purple-400",
            text: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/30"
        },
        pink: {
            gradient: "from-pink-500 to-pink-400",
            text: "text-pink-400",
            bg: "bg-pink-500/10",
            border: "border-pink-500/30"
        },
        blue: {
            gradient: "from-blue-500 to-blue-400",
            text: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/30"
        }
    };

    return (
        <section id="app-development" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left - Solutions Grid */}
                    <div className="order-2 lg:order-1">
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
                            {solutions.map((solution, i) => {
                                const Icon = solution.icon;
                                const colors = colorMap[solution.color];

                                return (
                                    <StaggerItem key={i}>
                                        <motion.div
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative min-h-[300px] group"
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
                                            <div className="relative z-10 p-6 rounded-3xl h-full flex flex-col bg-black/80 backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all">
                                                {/* Icon */}
                                                <div className="mb-4">
                                                    <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-lg`}>
                                                        <Icon size={24} className={colors.text} />
                                                    </div>
                                                </div>

                                                {/* Title & Subtitle */}
                                                <h3 className="text-lg font-bold mb-1 text-white leading-tight">
                                                    {solution.title}
                                                </h3>
                                                <p className={`text-xs ${colors.text} mb-3 font-medium`}>
                                                    {solution.subtitle}
                                                </p>

                                                {/* Description */}
                                                <p className="text-sm leading-relaxed flex-grow text-gray-300 mb-4">
                                                    {solution.description}
                                                </p>

                                                {/* Benefits */}
                                                <div className="space-y-1 mb-4">
                                                    {solution.benefits.map((benefit, j) => (
                                                        <div key={j} className="flex items-center gap-2 text-xs text-white/50">
                                                            <span className={`w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                                                            {benefit}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* CTA */}
                                                <div className={`flex items-center text-sm font-bold ${colors.text} group-hover:translate-x-1 transition-transform mt-auto`}>
                                                    <span className="mr-2">Learn More</span>
                                                    <ArrowRight size={14} />
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
                                label="Advanced Features"
                                title={
                                    <>
                                        Smart tools for{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                            modern businesses
                                        </span>
                                    </>
                                }
                                className="mb-8"
                            />
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-6">
                                Take your business to the next level with custom features that automate 
                                tasks, improve customer experience, and save you time.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                From online booking systems to customer portals, we build solutions that 
                                help you work smarter, not harder. Every feature is designed with your 
                                business goals in mind.
                            </p>
                        </RevealOnScroll>

                        {/* Trust Points */}
                        <RevealOnScroll delay={0.3}>
                            <div className="space-y-3 mb-8">
                                {[
                                    "Reduce repetitive admin tasks",
                                    "Give customers 24/7 access",
                                    "Scale without adding overhead"
                                ].map((point, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                        <span className="text-white/70">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </RevealOnScroll>

                        {/* Phone Mockup Placeholder */}
                        <RevealOnScroll delay={0.4}>
                            <div className="relative">
                                <div className="relative mx-auto w-44 h-80 rounded-[2.5rem] border-4 border-white/10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm overflow-hidden">
                                    {/* Screen content */}
                                    <div className="absolute inset-3 rounded-[2rem] bg-black/60 border border-white/5 overflow-hidden">
                                        {/* Mock booking UI */}
                                        <div className="p-3 space-y-2">
                                            <div className="h-6 w-2/3 bg-white/10 rounded-md" />
                                            <div className="h-16 w-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                                                <span className="text-white/30 text-xs">Book Now</span>
                                            </div>
                                            <div className="h-3 w-full bg-white/5 rounded" />
                                            <div className="h-3 w-3/4 bg-white/5 rounded" />
                                            <div className="grid grid-cols-3 gap-1 mt-2">
                                                <div className="h-8 bg-white/5 rounded text-center flex items-center justify-center text-[8px] text-white/30">Mon</div>
                                                <div className="h-8 bg-cyan-500/20 rounded text-center flex items-center justify-center text-[8px] text-cyan-300">Tue</div>
                                                <div className="h-8 bg-white/5 rounded text-center flex items-center justify-center text-[8px] text-white/30">Wed</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notch */}
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full" />
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
