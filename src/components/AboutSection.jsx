import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MessageCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { SectionHeader, RevealOnScroll, ParallaxContainer } from './UIComponents';

// Local macro images
import professionalImg from '../assets/aboutus/trusty.png';
import messagingImg from '../assets/aboutus/clearmessaging_v2.png';
import resultsImg from '../assets/aboutus/realresults_new.png';

const focusPoints = [
    {
        icon: Shield,
        title: "Professional & Trustworthy",
        description: "Making your business look as good as the big competitors — so customers trust you instantly.",
        image: professionalImg,
        accentColor: '#06b6d4',
        glowColor: 'rgba(6, 182, 212, 0.2)',
        borderGradient: 'from-cyan-500 to-cyan-400',
        iconStroke: '#06b6d4',
        // Perfectly cropped to show the core graphic/icon
        imageStyle: { objectPosition: 'center 40%' }
    },
    {
        icon: MessageCircle,
        title: "Clear Messaging",
        description: "Helping customers understand your offer quickly — no confusion, just action.",
        image: messagingImg,
        accentColor: '#a855f7',
        glowColor: 'rgba(168, 85, 247, 0.2)',
        borderGradient: 'from-purple-500 to-purple-400',
        iconStroke: '#a855f7',
        // Focusing on the center
        imageStyle: { objectPosition: 'center' }
    },
    {
        icon: TrendingUp,
        title: "Real Results",
        description: "Turning website visits into real inquiries — calls, messages, and bookings.",
        image: resultsImg,
        accentColor: '#ec4899',
        glowColor: 'rgba(236, 72, 153, 0.2)',
        borderGradient: 'from-pink-500 to-pink-400',
        iconStroke: '#ec4899',
        // Focusing on center/top
        imageStyle: { objectPosition: '50% 30%' }
    },
];

/* ── Glass Card (Stitch design) ─────────────────────────────── */
const GlassCard = ({ point, index }) => {
    const Icon = point.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="relative group"
        >
            {/* Card container */}
            <div
                className="relative h-[520px] rounded-3xl overflow-hidden flex flex-col justify-end p-10 transition-all duration-500"
                style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                {/* Liquid morphing border — visible on hover */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        padding: '1.5px',
                        background: `linear-gradient(135deg, ${point.accentColor}, transparent 60%)`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'pulse-border 2s infinite ease-in-out',
                    }}
                />

                {/* Background image */}
                <div className="absolute inset-0 -z-10 opacity-80 transition-transform duration-500 group-hover:scale-105">
                    <img
                        src={point.image}
                        alt={point.title}
                        className="w-full h-full object-cover"
                        style={point.imageStyle || { objectPosition: 'center' }}
                    />
                </div>

                {/* Gradient overlay — bottom fade to dark */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: 'linear-gradient(to top, #030014 0%, transparent 60%)',
                    }}
                />

                {/* Icon square — top-right */}
                <div
                    className="absolute top-6 right-6 w-12 h-12 rounded-xl flex items-center justify-center z-10"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: `0 0 20px ${point.glowColor}`,
                    }}
                >
                    <Icon size={24} stroke={point.iconStroke} strokeWidth={2} />
                </div>

                {/* Text content — bottom */}
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3">{point.title}</h3>
                    <p className="text-gray-400 text-base leading-relaxed font-light">
                        {point.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

/* ── About Section ──────────────────────────────────────────── */
const AboutSection = () => {
    return (
        <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Keyframes for pulse-border animation */}
            <style>{`
                @keyframes pulse-border {
                    0%, 100% { opacity: 1; filter: brightness(1); }
                    50% { opacity: 0.8; filter: brightness(1.5); }
                }
            `}</style>

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

                {/* Glass Cards Grid — Stitch Design */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {focusPoints.map((point, i) => (
                        <GlassCard key={point.title} point={point} index={i} />
                    ))}
                </div>

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
