import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedHeadline, RevealOnScroll } from './UIComponents';

const features = [
    {
        title: 'Simple\nCommunication',
        description: 'No technical jargon — just clear, honest conversation about your goals.',
        gradient: 'from-pink-500 via-purple-500 to-indigo-500',
        glowColor: 'rgba(236,72,153,0.15)',
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
    },
    {
        title: 'Modern\nDesign',
        description: 'Sleek, high-end aesthetics tailored to your brand.',
        gradient: 'from-slate-400 via-white to-slate-300',
        glowColor: 'rgba(148,163,184,0.15)',
        iconBg: 'from-slate-400/20 to-white/10',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <polygon points="20,6 34,18 20,36 6,18" stroke="url(#gc2)" strokeWidth="2" strokeLinejoin="round" fill="none" />
                <polygon points="20,6 34,18 20,18" fill="url(#gc2)" opacity="0.3" />
                <polygon points="6,18 20,36 20,18" fill="url(#gc2)" opacity="0.15" />
                <defs><linearGradient id="gc2" x1="6" y1="6" x2="34" y2="36"><stop stopColor="#e2e8f0" /><stop offset="1" stopColor="#64748b" /></linearGradient></defs>
            </svg>
        ),
    },
    {
        title: 'Works on All\nDevices',
        description: 'Perfect performance on phones, tablets, and desktops.',
        gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
        glowColor: 'rgba(52,211,153,0.15)',
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
    },
    {
        title: 'Focus on\nResults',
        description: 'Websites engineered to convert visitors into loyal customers.',
        gradient: 'from-red-400 via-pink-400 to-rose-500',
        glowColor: 'rgba(248,113,113,0.15)',
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
    },
    {
        title: 'Reliable\nSupport',
        description: "We're here for updates, help, or advice — even long after launch.",
        gradient: 'from-violet-400 via-purple-400 to-indigo-400',
        glowColor: 'rgba(139,92,246,0.15)',
        iconBg: 'from-violet-500/20 to-indigo-500/20',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <path d="M20 6L33 12C33 24 28 32 20 38C12 32 7 24 7 12Z" stroke="url(#gc5)" strokeWidth="2" strokeLinejoin="round" fill="url(#gc5)" fillOpacity="0.15" />
                <path d="M15 20L19 24L27 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs><linearGradient id="gc5" x1="7" y1="6" x2="33" y2="38"><stop stopColor="#c4b5fd" /><stop offset="1" stopColor="#818cf8" /></linearGradient></defs>
            </svg>
        ),
    },
    {
        title: 'Clear\nTimelines',
        description: 'Know exactly when your project will be ready. We respect your time.',
        gradient: 'from-sky-400 via-cyan-300 to-teal-300',
        glowColor: 'rgba(56,189,248,0.15)',
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
    },
];

const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [titleLine1, titleLine2] = feature.title.split('\n');

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative rounded-3xl p-6 bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm cursor-default overflow-hidden"
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${feature.glowColor}, transparent 70%)` }}
            />

            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none p-[1px]">
                <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        background: `linear-gradient(135deg, ${feature.glowColor}, transparent, ${feature.glowColor})`,
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        padding: '1px',
                    }}
                />
            </div>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.iconBg} border border-white/[0.05] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                {feature.icon}
            </div>

            {/* Text */}
            <div className="relative">
                <h3 className="text-white font-bold text-lg leading-tight mb-2">
                    {titleLine1}
                    <br />
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}>
                        {titleLine2}
                    </span>
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
            </div>

            {/* Subtle shimmer */}
            <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -skew-x-12 pointer-events-none"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
            />
        </motion.div>
    );
};

const WhyChooseUs = () => {
    // We duplicate the 6 cards four times (24 cards total) to ensure the row is long enough
    // to cover ultrawide monitors seamlessly before looping.
    const row1 = [...features, ...features, ...features, ...features];
    const row2 = [...features.slice().reverse(), ...features.slice().reverse(), ...features.slice().reverse(), ...features.slice().reverse()];

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-black/20 pb-40">
            {/* Ambient background */}
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-20 relative z-20">
                <RevealOnScroll>
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center gap-4 mb-6"
                        >
                            <div className="h-px w-12 bg-cyan-500" />
                            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.25em]">Why Us</span>
                            <div className="h-px w-12 bg-cyan-500" />
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
                            className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed"
                        >
                            We don't just build websites; we build growth engines. Here is how we differ from the rest.
                        </motion.p>
                    </div>
                </RevealOnScroll>
            </div>

            {/* Framer Motion Velocity Marquee Container */}
            <div className="relative w-full flex flex-col gap-6 md:gap-8 z-10 rotate-[-2deg] scale-[1.05]">
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-[#0a0f1c] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-[#0a0f1c] to-transparent z-20 pointer-events-none" />

                {/* Row 1 (Moves Left) */}
                <div className="flex w-max overflow-hidden">
                    <motion.div
                        className="flex w-max"
                        animate={{ x: [0, "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {row1.map((feature, i) => (
                            <div key={`row1-${i}`} className="w-[320px] md:w-[420px] flex-shrink-0 px-3 md:px-4">
                                <FeatureCard feature={feature} index={i} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 (Moves Right) */}
                <div className="flex w-max overflow-hidden">
                    <motion.div
                        className="flex w-max"
                        animate={{ x: ["-50%", 0] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {row2.map((feature, i) => (
                            <div key={`row2-${i}`} className="w-[320px] md:w-[420px] flex-shrink-0 px-3 md:px-4">
                                <FeatureCard feature={feature} index={i} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default WhyChooseUs;
