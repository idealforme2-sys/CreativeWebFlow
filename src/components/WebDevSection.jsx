import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, ShoppingCart, FileCode, Layers, ArrowRight } from 'lucide-react';
import { SectionHeader, RevealOnScroll, StaggerContainer, StaggerItem, HolographicCard, MagneticButton } from './UIComponents';

const WebDevSection = () => {
    const services = [
        {
            icon: Monitor,
            title: "Responsive Design",
            description: "Seamless performance across all devices, ensuring a smooth and consistent experience on desktop, tablet, and mobile.",
            color: "cyan",
            delay: 0
        },
        {
            icon: ShoppingCart,
            title: "E-commerce Solutions",
            description: "Secure, scalable online stores designed to improve user experience, build trust, and increase sales.",
            color: "purple",
            delay: 0.1
        },
        {
            icon: FileCode,
            title: "Content Management Systems",
            description: "Intuitive, easy-to-manage CMS setups that allow you to update content effortlessly and stay in control of your site.",
            color: "pink",
            delay: 0.2
        },
        {
            icon: Layers,
            title: "Custom Web Applications",
            description: "Tailor-made web solutions built to streamline workflows, enhance functionality, and solve specific business challenges.",
            color: "blue",
            delay: 0.3
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
                                label="Web Development"
                                title={
                                    <>
                                        Websites that{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                            perform
                                        </span>
                                    </>
                                }
                                className="mb-8"
                            />
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                At Creative WebFlow, we design and develop modern websites that do more than
                                exist online — they perform. By combining clean design with smart development,
                                we create fast, responsive, and engaging web experiences that guide users
                                toward action and deliver measurable results.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <p className="text-lg text-gray-400 leading-relaxed mb-10">
                                We focus on clarity, speed, and conversion, ensuring your website becomes
                                a powerful tool for your business — not just a visual asset.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.3}>
                            <MagneticButton
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white text-sm font-semibold uppercase tracking-wider"
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Start Your Project
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </MagneticButton>
                        </RevealOnScroll>
                    </div>

                    {/* Right - Services Grid */}
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
                        {services.map((service, i) => {
                            const Icon = service.icon;
                            const colors = colorMap[service.color];

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
                                                <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-lg ${colors.glow}`}>
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
            </div>
        </section>
    );
};

export default WebDevSection;
