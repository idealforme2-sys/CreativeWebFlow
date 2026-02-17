import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, Dumbbell, Building2 } from 'lucide-react';
import { RevealOnScroll, MagneticButton, HolographicCard } from './UIComponents';

// Industry images from Stitch design
import dentalImg from '../assets/industries/dental-medical.png';
import fitnessImg from '../assets/industries/fitness-gyms.png';
import realEstateImg from '../assets/industries/real-estate.png';

const WorkSection = () => {
    const industries = [
        {
            id: "01",
            title: "Dental & Medical",
            desc: "Patient booking systems, trust-building case studies, and serene aesthetics that convert visitors into appointments.",
            icon: Stethoscope,
            image: dentalImg,
            gradient: 'from-cyan-500 to-blue-500',
            glowColor: 'rgba(6, 208, 249, 0.2)',
            accentColor: 'text-cyan-400',
            borderHover: 'hover:border-cyan-500/30',
            stat: '+180%',
            statLabel: 'Patient Bookings',
        },
        {
            id: "02",
            title: "Fitness & Gyms",
            desc: "High-energy visuals, membership portals, and class scheduling integrations designed to fill your facility.",
            icon: Dumbbell,
            image: fitnessImg,
            gradient: 'from-purple-500 to-pink-500',
            glowColor: 'rgba(168, 85, 247, 0.2)',
            accentColor: 'text-purple-400',
            borderHover: 'hover:border-purple-500/30',
            stat: '+250%',
            statLabel: 'Membership Signups',
        },
        {
            id: "03",
            title: "Real Estate",
            desc: "Immersive property tours, agent profiles, and lead capture forms wrapped in luxury design for high-ticket sales.",
            icon: Building2,
            image: realEstateImg,
            gradient: 'from-pink-500 to-rose-500',
            glowColor: 'rgba(236, 72, 153, 0.2)',
            accentColor: 'text-pink-400',
            borderHover: 'hover:border-pink-500/30',
            stat: '+320%',
            statLabel: 'Qualified Leads',
        },
    ];

    return (
        <section id="work" className="relative py-28 md:py-36 overflow-hidden">
            {/* Background glow orbs */}
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-10 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section Header — Stitch-inspired layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-6"
                >
                    <div className="max-w-xl">
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em] mb-4 block">
                            Our Work
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Tailored for{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                Specific Industries
                            </span>
                        </h2>
                        <p className="text-white/40 text-base md:text-lg">
                            We don't just build websites; we build business engines designed for the unique needs of local service providers.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(6, 182, 212, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white transition-all"
                        >
                            <ArrowRight size={18} />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Industry Cards Grid — Stitch glassmorphism design */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {industries.map((industry, index) => {
                        const Icon = industry.icon;
                        return (
                            <motion.div
                                key={industry.id}
                                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.15,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <HolographicCard className={`p-8 relative overflow-hidden group ${industry.borderHover} transition-colors duration-500 min-h-[320px]`}>
                                    {/* Gradient glow orb — top right */}
                                    <div
                                        className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl opacity-40 group-hover:opacity-70 group-hover:scale-150 transition-all duration-500 pointer-events-none"
                                        style={{ background: `radial-gradient(circle, ${industry.glowColor}, transparent 70%)` }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon container */}
                                        <div className={`w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 ${industry.accentColor} group-hover:scale-110 group-hover:border-white/20 transition-all duration-300`}>
                                            <Icon size={26} />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                                            {industry.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm text-white/45 leading-relaxed mb-6 line-clamp-3 group-hover:text-white/60 transition-colors duration-300">
                                            {industry.desc}
                                        </p>

                                        {/* Stat badge */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className={`text-2xl font-black ${industry.accentColor}`}>
                                                {industry.stat}
                                            </span>
                                            <span className="text-xs text-white/30 font-mono uppercase tracking-wider">
                                                {industry.statLabel}
                                            </span>
                                        </div>

                                        {/* View Examples link */}
                                        <a
                                            href="#contact"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className={`inline-flex items-center ${industry.accentColor} font-bold text-sm group-hover:translate-x-2 transition-transform duration-300`}
                                        >
                                            View Examples
                                            <ArrowRight size={14} className="ml-1" />
                                        </a>
                                    </div>

                                    {/* 3D Decorative image — bottom right corner */}
                                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none">
                                        <img
                                            src={industry.image}
                                            alt={`${industry.title} decorative`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </HolographicCard>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <RevealOnScroll delay={0.3}>
                    <div className="mt-24 text-center">
                        <p className="text-white/70 text-lg mb-6">
                            Ready to grow your local business?
                        </p>
                        <MagneticButton
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white text-sm font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow"
                        >
                            Start Your Project
                            <ArrowRight size={18} />
                        </MagneticButton>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default WorkSection;
