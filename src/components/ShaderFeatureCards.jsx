import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Warp } from '@paper-design/shaders-react';
import { Sparkles, Zap, Layers, Mouse, Waves, Smartphone } from 'lucide-react';
import { SectionHeader, RevealOnScroll, StaggerContainer, StaggerItem } from './UIComponents';

// Lazy shader wrapper — only mounts Warp when card is in viewport
const LazyShader = ({ config }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { rootMargin: '100px' } // Start loading slightly before visible
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="absolute inset-0 rounded-3xl overflow-hidden">
            {isVisible ? (
                <Warp
                    style={{ height: "100%", width: "100%" }}
                    proportion={config.proportion}
                    softness={config.softness}
                    distortion={config.distortion}
                    swirl={config.swirl}
                    swirlIterations={config.swirlIterations}
                    shape={config.shape}
                    shapeScale={config.shapeScale}
                    scale={1}
                    rotation={0}
                    speed={0.5}
                    colors={config.colors}
                />
            ) : (
                // Static gradient fallback when offscreen
                <div
                    className="w-full h-full"
                    style={{
                        background: `linear-gradient(135deg, ${config.colors[0]}, ${config.colors[2]})`,
                        opacity: 0.3,
                    }}
                />
            )}
        </div>
    );
};

const ShaderFeatureCards = () => {
    const features = useMemo(() => [
        {
            title: "Premium WebGL Shaders",
            description: "Advanced visual effects with fluid animations that create stunning, dynamic backgrounds powered by WebGL technology.",
            icon: Sparkles,
            color: "cyan"
        },
        {
            title: "GSAP Scroll Animations",
            description: "Smooth, professional timeline animations that bring your content to life with precise control and perfect timing.",
            icon: Zap,
            color: "pink"
        },
        {
            title: "Custom Cursor",
            description: "Magnetic interactions and hover states that create an engaging, premium user experience throughout the site.",
            icon: Mouse,
            color: "purple"
        },
        {
            title: "Lenis Smooth Scroll",
            description: "Butter-smooth scrolling experience with momentum-based physics that feels natural and refined on any device.",
            icon: Waves,
            color: "blue"
        },
        {
            title: "Framer Motion",
            description: "Production-ready React animations with declarative syntax, making complex animations simple and performant.",
            icon: Layers,
            color: "cyan"
        },
        {
            title: "Responsive Excellence",
            description: "Perfect on all devices with adaptive layouts, touch interactions, and optimized performance for mobile experiences.",
            icon: Smartphone,
            color: "pink"
        }
    ], []);

    // Reduced swirlIterations across all configs (was 8-15, now 4-6)
    const getShaderConfig = (index) => {
        const configs = [
            {
                proportion: 0.3,
                softness: 0.8,
                distortion: 0.15,
                swirl: 0.6,
                swirlIterations: 4,
                shape: "checks",
                shapeScale: 0.08,
                colors: ["hsl(190, 100%, 30%)", "hsl(190, 100%, 60%)", "hsl(200, 90%, 40%)", "hsl(180, 100%, 70%)"]
            },
            {
                proportion: 0.4,
                softness: 1.2,
                distortion: 0.2,
                swirl: 0.9,
                swirlIterations: 5,
                shape: "dots",
                shapeScale: 0.12,
                colors: ["hsl(320, 100%, 35%)", "hsl(320, 100%, 65%)", "hsl(330, 90%, 45%)", "hsl(310, 100%, 75%)"]
            },
            {
                proportion: 0.35,
                softness: 0.9,
                distortion: 0.18,
                swirl: 0.7,
                swirlIterations: 4,
                shape: "checks",
                shapeScale: 0.1,
                colors: ["hsl(270, 100%, 30%)", "hsl(270, 100%, 60%)", "hsl(280, 90%, 35%)", "hsl(260, 100%, 70%)"]
            },
            {
                proportion: 0.45,
                softness: 1.1,
                distortion: 0.22,
                swirl: 0.8,
                swirlIterations: 6,
                shape: "dots",
                shapeScale: 0.09,
                colors: ["hsl(200, 100%, 35%)", "hsl(200, 100%, 65%)", "hsl(210, 90%, 40%)", "hsl(190, 100%, 75%)"]
            },
            {
                proportion: 0.38,
                softness: 0.95,
                distortion: 0.16,
                swirl: 0.85,
                swirlIterations: 5,
                shape: "checks",
                shapeScale: 0.11,
                colors: ["hsl(190, 100%, 30%)", "hsl(190, 100%, 65%)", "hsl(180, 90%, 35%)", "hsl(200, 100%, 70%)"]
            },
            {
                proportion: 0.42,
                softness: 1.0,
                distortion: 0.19,
                swirl: 0.75,
                swirlIterations: 4,
                shape: "dots",
                shapeScale: 0.13,
                colors: ["hsl(310, 100%, 30%)", "hsl(330, 100%, 60%)", "hsl(320, 90%, 35%)", "hsl(325, 100%, 75%)"]
            }
        ];
        return configs[index % configs.length];
    };

    return (
        <section id="features" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black" />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <RevealOnScroll>
                    <SectionHeader
                        label="Tech Stack Features"
                        title={
                            <>
                                Built with{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                    cutting-edge
                                </span>{' '}
                                technology
                            </>
                        }
                        subtitle="Everything you need to create stunning visual experiences with elegant shader backgrounds and premium animations"
                        align="center"
                        className="mb-20"
                    />
                </RevealOnScroll>

                {/* Shader Cards Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
                    {features.map((feature, index) => {
                        const shaderConfig = getShaderConfig(index);
                        const Icon = feature.icon;

                        return (
                            <StaggerItem key={index}>
                                <motion.div
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative h-80 group"
                                >
                                    {/* Lazy-loaded Shader Background */}
                                    <LazyShader config={shaderConfig} />

                                    {/* Content Overlay */}
                                    <div className="relative z-10 p-8 rounded-3xl h-full flex flex-col bg-black/80 backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all">
                                        {/* Icon */}
                                        <div className="mb-6">
                                            <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                                <Icon size={28} className="text-white" />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold mb-4 text-white">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="leading-relaxed flex-grow text-gray-300">
                                            {feature.description}
                                        </p>

                                        {/* Learn More Link */}
                                        <div className="mt-6 flex items-center text-sm font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                            <span className="mr-2">Explore Feature</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
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

export default ShaderFeatureCards;
