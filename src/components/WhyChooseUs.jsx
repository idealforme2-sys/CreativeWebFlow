import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedHeadline, RevealOnScroll, SectionParticles } from './UIComponents';

const features = [
    {
        title: 'Simple',
        titleAccent: 'Communication',
        description: 'No technical jargon — just clear, honest conversation about your goals.',
        gradient: 'from-pink-400 via-purple-400 to-violet-400',
        glowColor: 'rgba(236,72,153,0.2)',
        iconBg: 'from-pink-500/20 to-purple-500/20',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <path d="M12 20c0-6 4-10 10-10s10 4 10 10-4 10-10 10c-1.5 0-3-.3-4.2-.9L12 32l1.5-5.5C12.5 24.5 12 22.3 12 20z" stroke="url(#gc1)" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="18" cy="20" r="1.5" fill="#f9a8d4" />
                <circle cx="22" cy="20" r="1.5" fill="#f9a8d4" />
                <circle cx="26" cy="20" r="1.5" fill="#f9a8d4" />
                <defs><linearGradient id="gc1" x1="12" y1="10" x2="32" y2="32"><stop stopColor="#f9a8d4" /><stop offset="1" stopColor="#a78bfa" /></linearGradient></defs>
            </svg>
        ),
        stats: '24hr response',
    },
    {
        title: 'Modern',
        titleAccent: 'Design',
        description: 'Sleek, high-end aesthetics tailored to your brand that convert visitors.',
        gradient: 'from-slate-300 via-white to-slate-200',
        glowColor: 'rgba(148,163,184,0.2)',
        iconBg: 'from-slate-400/20 to-white/10',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <polygon points="20,6 34,18 20,36 6,18" stroke="url(#gc2)" strokeWidth="2" strokeLinejoin="round" fill="none" />
                <polygon points="20,6 34,18 20,18" fill="url(#gc2)" opacity="0.3" />
                <polygon points="6,18 20,36 20,18" fill="url(#gc2)" opacity="0.15" />
                <defs><linearGradient id="gc2" x1="6" y1="6" x2="34" y2="36"><stop stopColor="#e2e8f0" /><stop offset="1" stopColor="#64748b" /></linearGradient></defs>
            </svg>
        ),
        stats: '100% custom',
    },
    {
        title: 'Works on',
        titleAccent: 'All Devices',
        description: 'Perfect performance on phones, tablets, and desktops automatically.',
        gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
        glowColor: 'rgba(52,211,153,0.2)',
        iconBg: 'from-emerald-500/20 to-cyan-500/20',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <rect x="6" y="12" width="28" height="16" rx="2" stroke="url(#gc3)" strokeWidth="2" />
                <line x1="20" y1="28" x2="20" y2="32" stroke="url(#gc3)" strokeWidth="2" />
                <line x1="14" y1="32" x2="26" y2="32" stroke="url(#gc3)" strokeWidth="2" strokeLinecap="round" />
                <rect x="12" y="16" width="8" height="8" rx="1" fill="url(#gc3)" opacity="0.3" />
                <rect x="24" y="18" width="5" height="6" rx="1" fill="url(#gc3)" opacity="0.2" />
                <defs><linearGradient id="gc3" x1="6" y1="12" x2="34" y2="32"><stop stopColor="#6ee7b7" /><stop offset="1" stopColor="#22d3ee" /></linearGradient></defs>
            </svg>
        ),
        stats: '100% responsive',
    },
    {
        title: 'Focus on',
        titleAccent: 'Results',
        description: 'Websites engineered to convert visitors into loyal, paying customers.',
        gradient: 'from-red-400 via-pink-400 to-rose-400',
        glowColor: 'rgba(248,113,113,0.2)',
        iconBg: 'from-red-500/20 to-pink-500/20',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <circle cx="20" cy="20" r="14" stroke="#fca5a5" strokeWidth="1.5" opacity="0.4" />
                <circle cx="20" cy="20" r="9" stroke="#fca5a5" strokeWidth="1.5" opacity="0.6" />
                <circle cx="20" cy="20" r="4" fill="#fca5a5" />
                <line x1="20" y1="4" x2="20" y2="10" stroke="#fca5a5" strokeWidth="1.5" opacity="0.5" />
                <line x1="20" y1="30" x2="20" y2="36" stroke="#fca5a5" strokeWidth="1.5" opacity="0.5" />
                <line x1="4" y1="20" x2="10" y2="20" stroke="#fca5a5" strokeWidth="1.5" opacity="0.5" />
                <line x1="30" y1="20" x2="36" y2="20" stroke="#fca5a5" strokeWidth="1.5" opacity="0.5" />
            </svg>
        ),
        stats: '340% avg ROI',
    },
    {
        title: 'Reliable',
        titleAccent: 'Support',
        description: "We're here for updates, help, or advice — even long after launch.",
        gradient: 'from-violet-400 via-purple-400 to-indigo-400',
        glowColor: 'rgba(139,92,246,0.2)',
        iconBg: 'from-violet-500/20 to-indigo-500/20',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <path d="M20 6L33 12C33 24 28 32 20 38C12 32 7 24 7 12L20 6Z" stroke="url(#gc5)" strokeWidth="2" strokeLinejoin="round" fill="url(#gc5)" fillOpacity="0.15" />
                <path d="M15 20L19 24L27 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs><linearGradient id="gc5" x1="7" y1="6" x2="33" y2="38"><stop stopColor="#c4b5fd" /><stop offset="1" stopColor="#818cf8" /></linearGradient></defs>
            </svg>
        ),
        stats: 'Lifetime help',
    },
    {
        title: 'Clear',
        titleAccent: 'Timelines',
        description: 'Know exactly when your project will be ready. We respect your time.',
        gradient: 'from-sky-400 via-cyan-300 to-teal-300',
        glowColor: 'rgba(56,189,248,0.2)',
        iconBg: 'from-sky-500/20 to-teal-500/20',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <circle cx="20" cy="20" r="14" stroke="url(#gc6)" strokeWidth="2" />
                <line x1="20" y1="12" x2="20" y2="20" stroke="url(#gc6)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="20" y1="20" x2="26" y2="24" stroke="url(#gc6)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="20" cy="20" r="2" fill="#7dd3fc" />
                <defs><linearGradient id="gc6" x1="6" y1="6" x2="34" y2="34"><stop stopColor="#bae6fd" /><stop offset="1" stopColor="#5eead4" /></linearGradient></defs>
            </svg>
        ),
        stats: 'On-time delivery',
    },
];

const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative rounded-3xl p-6 bg-slate-900/90 border border-white/10 backdrop-blur-sm cursor-default overflow-hidden transition-all duration-500 will-change-transform"
            style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
            }}
        >
            {/* Animated border glow */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, ${feature.glowColor}, transparent 50%, ${feature.glowColor})`,
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Inner card content */}
            <div className="relative z-10">
                {/* Icon with glow */}
                <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.iconBg} border border-white/10 flex items-center justify-center mb-5`}
                    animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative">
                        {feature.icon}
                        {/* Icon glow on hover */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: feature.glowColor,
                                filter: 'blur(8px)',
                            }}
                            animate={{ opacity: isHovered ? 0.5 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-white font-bold text-lg leading-tight mb-2">
                    {feature.title}
                    <br />
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}>
                        {feature.titleAccent}
                    </span>
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed mb-4">{feature.description}</p>

                {/* Stats badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                >
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                    <span className="text-xs text-white/70 font-medium">{feature.stats}</span>
                </motion.div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-3xl pointer-events-none">
                <div
                    className="absolute top-0 right-0 w-32 h-32 origin-bottom-left rotate-45 translate-x-16"
                    style={{
                        background: `linear-gradient(135deg, ${feature.glowColor}, transparent)`,
                    }}
                />
            </div>
        </motion.div>
    );
};

const WhyChooseUs = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-black/20">
            {/* Ambient Particles */}
            <SectionParticles color="rgba(6,182,212,0.3)" count={25} />

            {/* Background gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-20">
                <RevealOnScroll>
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-4 mb-6"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.25em]">Why Us</span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
                        </motion.div>
                        <AnimatedHeadline>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Why Local Businesses <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                    Choose Us
                                </span>
                            </h2>
                        </AnimatedHeadline>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed"
                        >
                            We don't just build websites; we build growth engines. Here's how we differ from the rest.
                        </motion.p>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Static 6-card grid with hover effects */}
            <div ref={containerRef} className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <FeatureCard key={i} feature={feature} index={i} />
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center mt-16 relative z-10"
            >
                <a
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                >
                    Ready to get started?
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </motion.div>
        </section>
    );
};

export default WhyChooseUs;
