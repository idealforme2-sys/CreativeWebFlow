import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Zap, Search, ArrowRight, CheckCircle } from 'lucide-react';
import { SectionHeader, RevealOnScroll, StaggerContainer, StaggerItem, MagneticButton } from './UIComponents';

const WebDevSection = () => {
    const packages = [
        {
            icon: Globe,
            title: "Starter Website",
            subtitle: "Perfect for new businesses",
            description: "A clean, professional website that builds trust and helps customers find you online. Everything you need to establish your digital presence.",
            color: "cyan",
            features: [
                "Professional design",
                "Mobile-friendly layout",
                "Fast loading speed",
                "Contact form integration",
                "Google Maps integration"
            ]
        },
        {
            icon: Smartphone,
            title: "Growth Website",
            subtitle: "For businesses ready to scale",
            description: "Designed to turn visitors into customers. Includes conversion-focused design, clear calls-to-action, and everything in Starter.",
            color: "purple",
            features: [
                "Everything in Starter",
                "Conversion-focused layout",
                "Online booking system",
                "SEO optimization",
                "Analytics dashboard"
            ]
        },
        {
            icon: Zap,
            title: "Premium Package",
            subtitle: "Maximum impact & results",
            description: "Full-service web solution with advanced features. Perfect for businesses that want to dominate their local market.",
            color: "pink",
            features: [
                "Everything in Growth",
                "Custom functionality",
                "E-commerce integration",
                "Priority support",
                "Monthly maintenance"
            ]
        },
        {
            icon: Search,
            title: "Local SEO Boost",
            subtitle: "Get found on Google",
            description: "Help customers find your business when they search locally. Includes Google Business optimization and local search strategy.",
            color: "blue",
            features: [
                "Google Business setup",
                "Local keyword optimization",
                "Review management",
                "Directory listings",
                "Monthly reports"
            ]
        }
    ];

    const colorMap = {
        cyan: {
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/30",
            text: "text-cyan-400",
            glow: "shadow-cyan-500/20",
            gradient: "from-cyan-500/20"
        },
        purple: {
            bg: "bg-purple-500/10",
            border: "border-purple-500/30",
            text: "text-purple-400",
            glow: "shadow-purple-500/20",
            gradient: "from-purple-500/20"
        },
        pink: {
            bg: "bg-pink-500/10",
            border: "border-pink-500/30",
            text: "text-pink-400",
            glow: "shadow-pink-500/20",
            gradient: "from-pink-500/20"
        },
        blue: {
            bg: "bg-blue-500/10",
            border: "border-blue-500/30",
            text: "text-blue-400",
            glow: "shadow-blue-500/20",
            gradient: "from-blue-500/20"
        }
    };

    return (
        <section id="web-development" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Content */}
                    <div>
                        <RevealOnScroll>
                            <SectionHeader
                                label="Website Solutions"
                                title={
                                    <>
                                        Websites built to{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                            bring customers
                                        </span>
                                    </>
                                }
                                className="mb-8"
                            />
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-6">
                                Your website is often the first impression customers have of your business. 
                                We create websites that don't just look good — they work hard to bring you 
                                more calls, bookings, and customers.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                Every website we build is mobile-friendly, fast-loading, and designed to 
                                convert visitors into paying customers. No technical headaches — we handle 
                                everything from design to launch.
                            </p>
                        </RevealOnScroll>

                        {/* Trust Points */}
                        <RevealOnScroll delay={0.3}>
                            <div className="space-y-3 mb-8">
                                {[
                                    "Looks perfect on phones — where most customers are",
                                    "Fast loading so customers don't leave",
                                    "Clear calls-to-action that drive results"
                                ].map((point, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span className="text-white/70">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.4}>
                            <MagneticButton
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white text-sm font-semibold uppercase tracking-wider"
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Get a Free Quote
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </MagneticButton>
                        </RevealOnScroll>
                    </div>

                    {/* Right - Packages Grid */}
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
                        {packages.map((pkg, i) => {
                            const Icon = pkg.icon;
                            const colors = colorMap[pkg.color];

                            return (
                                <StaggerItem key={i}>
                                    <motion.div
                                        whileHover={{ y: -10, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative min-h-[360px] group"
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
                                                <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-lg ${colors.glow}`}>
                                                    <Icon size={24} className={colors.text} />
                                                </div>
                                            </div>

                                            {/* Title & Subtitle */}
                                            <h3 className="text-lg font-bold mb-1 text-white leading-tight">
                                                {pkg.title}
                                            </h3>
                                            <p className={`text-xs ${colors.text} mb-3 font-medium`}>
                                                {pkg.subtitle}
                                            </p>

                                            {/* Description */}
                                            <p className="text-sm leading-relaxed flex-grow text-gray-300 mb-4">
                                                {pkg.description}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-2 mb-4">
                                                {pkg.features.slice(0, 3).map((feature, j) => (
                                                    <div key={j} className="flex items-center gap-2 text-xs text-white/60">
                                                        <span className={`w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <div className={`flex items-center text-sm font-bold ${colors.text} group-hover:translate-x-1 transition-transform mt-auto`}>
                                                <span className="mr-2">Learn More</span>
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </motion.div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
};

export default WebDevSection;
