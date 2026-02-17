import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Palette, Smartphone, Target, LifeBuoy, Clock, CheckCircle } from 'lucide-react';
import { RainbowButton, GradientText } from './MagicUI';

// Import local macro images
import communicationImg from '../assets/whyus/communication.png';
import designImg from '../assets/whyus/design.png';
import devicesImg from '../assets/whyus/devices.png';
import resultsImg from '../assets/whyus/results.png';
import supportImg from '../assets/whyus/support.png';
import timelinesImg from '../assets/whyus/timelines.png';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: MessageCircle,
            title: 'Simple communication',
            desc: 'No technical jargon — just clear, honest conversation about your goals and how we achieve them.',
            image: communicationImg,
            accentColor: 'cyan', // Cyan-500
            gradient: 'from-cyan-500/20 to-blue-600/20',
            borderColor: 'border-cyan-500/30',
            shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
            textColor: 'text-cyan-400'
        },
        {
            icon: Palette,
            title: 'Modern, professional design',
            desc: 'Sleek, high-end aesthetics tailored to your brand — your business will look as good as the big players.',
            image: designImg,
            accentColor: 'purple', // Purple-500
            gradient: 'from-purple-500/20 to-pink-600/20',
            borderColor: 'border-purple-500/30',
            shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
            textColor: 'text-purple-400'
        },
        {
            icon: Smartphone,
            title: 'Works on all devices',
            desc: 'Perfect performance on phones, tablets, and desktops. A seamless experience everywhere.',
            image: devicesImg,
            accentColor: 'pink', // Pink-500
            gradient: 'from-pink-500/20 to-rose-600/20',
            borderColor: 'border-pink-500/30',
            shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.3)]',
            textColor: 'text-pink-400'
        },
        {
            icon: Target,
            title: 'Focus on real results',
            desc: 'Not just looks — websites engineered to convert visitors into loyal customers and drive growth.',
            image: resultsImg,
            accentColor: 'teal', // Teal-500
            gradient: 'from-teal-500/20 to-emerald-600/20',
            borderColor: 'border-teal-500/30',
            shadow: 'shadow-[0_0_15px_rgba(20,184,166,0.3)]',
            textColor: 'text-teal-400'
        },
        {
            icon: LifeBuoy,
            title: 'Reliable support',
            desc: "We don't disappear. We're here for updates, help, or advice — even long after launch.",
            image: supportImg,
            accentColor: 'amber', // Amber-500
            gradient: 'from-amber-500/20 to-orange-600/20',
            borderColor: 'border-amber-500/30',
            shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
            textColor: 'text-amber-400'
        },
        {
            icon: Clock,
            title: 'Clear timelines',
            desc: 'Know exactly when your project will be ready. We respect your time and hit our deadlines.',
            image: timelinesImg,
            accentColor: 'indigo', // Indigo-500
            gradient: 'from-indigo-500/20 to-blue-600/20',
            borderColor: 'border-indigo-500/30',
            shadow: 'shadow-[0_0_15px_rgba(99,102,241,0.3)]',
            textColor: 'text-indigo-400'
        },
    ];

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        // Restored transparency: bg-gradient instead of opaque bg-[#050505]
        <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-black/30 to-black/50">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6" ref={containerRef}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20 relative z-10"
                >
                    <div className="inline-flex items-center space-x-2 mb-4">
                        <span className="h-px w-8 bg-cyan-400/50"></span>
                        <span className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase">Why Us</span>
                        <span className="h-px w-8 bg-cyan-400/50"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-2">
                        Why Local Businesses
                    </h2>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight pb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                            Choose Us
                        </span>
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-white/60 leading-relaxed">
                        We earn trust through transparency, quality, and results — not buzzwords. Discover the difference a dedicated partner makes.
                    </p>
                </motion.div>

                {/* Cinematic Macro Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative group rounded-[0.9rem]"
                            >
                                {/* Animated rotating border (CSS equivalent) */}
                                <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                                <div className="relative h-[420px] bg-[#18181b] rounded-[0.9rem] p-1 overflow-hidden">
                                    {/* Image Background */}
                                    <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110">
                                        <img
                                            src={reason.image}
                                            alt={reason.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Inner Content */}
                                    <div className="relative h-full flex flex-col p-8 backdrop-blur-sm bg-gradient-to-b from-transparent to-[#18181b]/90">
                                        {/* Icon Badge */}
                                        <div className={`mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.gradient} border ${reason.borderColor} ${reason.shadow}`}>
                                            <Icon size={28} className={reason.textColor} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                                            {reason.title}
                                        </h3>

                                        {/* Description Box */}
                                        <div className="mt-auto bg-black/40 border border-white/10 rounded-xl p-4 backdrop-blur-md">
                                            <p className="text-sm text-gray-300 font-medium leading-relaxed">
                                                {reason.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <p className="text-white/60 text-lg mb-6">
                        Ready to grow your business online?
                    </p>
                    <RainbowButton
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em]">
                            Let's Talk
                            <CheckCircle className="w-4 h-4" />
                        </span>
                    </RainbowButton>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
