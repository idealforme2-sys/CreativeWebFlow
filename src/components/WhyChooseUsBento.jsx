import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Palette, Smartphone, Target, LifeBuoy, Clock, ArrowRight } from 'lucide-react';
import { RainbowButton } from './MagicUI';

// Import local macro images
import communicationImg from '../assets/whyus/communication.png';
import designImg from '../assets/whyus/design.png';
import devicesImg from '../assets/whyus/devices.png';
import resultsImg from '../assets/whyus/results.png';
import supportImg from '../assets/whyus/support.png';
import timelinesImg from '../assets/whyus/timelines.png';

const WhyChooseUsBento = () => {
    const reasons = [
        {
            icon: MessageCircle,
            title: 'Simple communication',
            desc: 'No technical jargon — just clear, honest conversation about your goals and how we achieve them.',
            image: communicationImg,
            accentColor: 'cyan',
            gradient: 'from-cyan-500/20 to-blue-600/20',
            borderColor: 'border-cyan-500/30',
            shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
            textColor: 'text-cyan-400',
            size: 'large',
        },
        {
            icon: Palette,
            title: 'Modern, professional design',
            desc: 'Sleek, high-end aesthetics tailored to your brand — your business will look as good as the big players.',
            image: designImg,
            accentColor: 'purple',
            gradient: 'from-purple-500/20 to-pink-600/20',
            borderColor: 'border-purple-500/30',
            shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
            textColor: 'text-purple-400',
            size: 'medium',
        },
        {
            icon: Smartphone,
            title: 'Works on all devices',
            desc: 'Perfect performance on phones, tablets, and desktops. A seamless experience everywhere.',
            image: devicesImg,
            accentColor: 'pink',
            gradient: 'from-pink-500/20 to-rose-600/20',
            borderColor: 'border-pink-500/30',
            shadow: 'shadow-[0_0_15px_rgba(236,72,153,0.3)]',
            textColor: 'text-pink-400',
            size: 'medium',
        },
        {
            icon: Target,
            title: 'Focus on real results',
            desc: 'Not just looks — websites engineered to convert visitors into loyal customers and drive growth.',
            image: resultsImg,
            accentColor: 'teal',
            gradient: 'from-teal-500/20 to-emerald-600/20',
            borderColor: 'border-teal-500/30',
            shadow: 'shadow-[0_0_15px_rgba(20,184,166,0.3)]',
            textColor: 'text-teal-400',
            size: 'large',
        },
        {
            icon: LifeBuoy,
            title: 'Reliable support',
            desc: "We don't disappear. We're here for updates, help, or advice — even long after launch.",
            image: supportImg,
            accentColor: 'amber',
            gradient: 'from-amber-500/20 to-orange-600/20',
            borderColor: 'border-amber-500/30',
            shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
            textColor: 'text-amber-400',
            size: 'small',
        },
        {
            icon: Clock,
            title: 'Clear timelines',
            desc: 'Know exactly when your project will be ready. We respect your time and hit our deadlines.',
            image: timelinesImg,
            accentColor: 'indigo',
            gradient: 'from-indigo-500/20 to-blue-600/20',
            borderColor: 'border-indigo-500/30',
            shadow: 'shadow-[0_0_15px_rgba(99,102,241,0.3)]',
            textColor: 'text-indigo-400',
            size: 'small',
        },
    ];

    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // Stats data for the bento layout
    const stats = [
        { value: '200+', label: 'Projects Completed', gradient: 'from-cyan-400 to-blue-500' },
        { value: '4.9★', label: 'Average Rating', gradient: 'from-purple-400 to-pink-500' },
        { value: '150%', label: 'Traffic Increase', gradient: 'from-teal-400 to-emerald-500' },
        { value: '30 Days', label: 'Time to Results', gradient: 'from-amber-400 to-orange-500' },
    ];

    // Helper component for icon rendering
    const IconBadge = ({ reason, size = 28 }) => {
        const Icon = reason.icon;
        return (
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.gradient} border ${reason.borderColor} ${reason.shadow}`}>
                <Icon size={size} className={reason.textColor} />
            </div>
        );
    };

    // Helper component for small icon rendering
    const SmallIconBadge = ({ reason, size = 22 }) => {
        const Icon = reason.icon;
        return (
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${reason.gradient} border ${reason.borderColor} ${reason.shadow} flex items-center justify-center`}>
                <Icon size={size} className={reason.textColor} />
            </div>
        );
    };

    return (
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
                    <div className="inline-flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                        <span className="text-cyan-400 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Why Us</span>
                        <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-cyan-500" />
                    </div>
                    <h2 className="font-extrabold text-4xl md:text-5xl lg:text-7xl leading-[1.1] text-white tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        Why Local Businesses
                    </h2>
                    <h2 className="font-extrabold text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight pb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                            Choose Us
                        </span>
                    </h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-white/60 leading-relaxed">
                        We earn trust through transparency, quality, and results — not buzzwords. Discover the difference a dedicated partner makes.
                    </p>
                </motion.div>

                {/* Dynamic Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[180px] md:auto-rows-[200px]">
                    {/* Large Card 1 - Spans 2 cols and 2 rows */}
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group col-span-1 md:col-span-2 row-span-2 rounded-[1.5rem] overflow-hidden"
                    >
                        {/* Animated border */}
                        <div className="absolute -inset-[2px] rounded-[1.5rem] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                        <div className="relative h-full bg-[#18181b] rounded-[1.5rem] p-1 overflow-hidden">
                            {/* Image Background */}
                            <div className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110">
                                <img
                                    src={reasons[0].image}
                                    alt={reasons[0].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/60 to-transparent" />

                            {/* Content */}
                            <div className="relative h-full flex flex-col p-8 justify-end">
                                <IconBadge reason={reasons[0]} />
                                <h3 className="text-2xl font-bold text-white mb-2 mt-4">{reasons[0].title}</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-md">{reasons[0].desc}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Cards - 4 small cards in a row */}
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative group rounded-xl overflow-hidden"
                        >
                            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative h-full bg-[#18181b]/80 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center text-center border border-white/5 group-hover:border-white/10 transition-colors">
                                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                                    {stat.value}
                                </div>
                                <p className="text-white/50 text-xs font-medium">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Medium Cards */}
                    {[1, 2].map((idx) => {
                        const reason = reasons[idx];
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative group col-span-1 row-span-2 rounded-xl overflow-hidden"
                            >
                                <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                                <div className="relative h-full bg-[#18181b] rounded-xl p-1 overflow-hidden">
                                    <div className="absolute inset-0 opacity-25 transition-transform duration-700 group-hover:scale-110">
                                        <img
                                            src={reason.image}
                                            alt={reason.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/50 to-transparent" />

                                    <div className="relative h-full flex flex-col p-6 justify-end">
                                        <IconBadge reason={reason} size={24} />
                                        <h3 className="text-lg font-bold text-white mb-1 mt-3">{reason.title}</h3>
                                        <p className="text-white/60 text-xs leading-relaxed">{reason.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Large Card 2 - Spans 2 cols and 2 rows */}
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group col-span-1 md:col-span-2 row-span-2 rounded-[1.5rem] overflow-hidden"
                    >
                        <div className="absolute -inset-[2px] rounded-[1.5rem] bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                        <div className="relative h-full bg-[#18181b] rounded-[1.5rem] p-1 overflow-hidden">
                            <div className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-110">
                                <img
                                    src={reasons[3].image}
                                    alt={reasons[3].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/60 to-transparent" />

                            <div className="relative h-full flex flex-col p-8 justify-end">
                                <IconBadge reason={reasons[3]} />
                                <h3 className="text-2xl font-bold text-white mb-2 mt-4">{reasons[3].title}</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-md">{reasons[3].desc}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Small Cards - Support & Timelines */}
                    {[4, 5].map((idx) => {
                        const reason = reasons[idx];
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative group col-span-1 row-span-1 rounded-xl overflow-hidden"
                            >
                                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative h-full bg-[#18181b]/80 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 border border-white/5 group-hover:border-white/10 transition-colors">
                                    <SmallIconBadge reason={reason} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-bold text-white mb-0.5 truncate">{reason.title}</h3>
                                        <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{reason.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* CTA Card - Spans 2 cols */}
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group col-span-1 md:col-span-2 row-span-1 rounded-xl overflow-hidden"
                    >
                        <div className="relative h-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-between border border-white/10">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Ready to grow your business?</h3>
                                <p className="text-white/60 text-sm">Join 200+ companies scaling with us</p>
                            </div>
                            <RainbowButton
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="flex-shrink-0"
                            >
                                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em]">
                                    Let's Talk
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </RainbowButton>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsBento;
