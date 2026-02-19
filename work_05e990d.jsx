import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, TrendingUp, Users } from 'lucide-react';
import { HolographicCard, RevealOnScroll, MagneticButton } from './UIComponents';

const WorkSection = () => {
    const caseStudies = [
        {
            id: "01",
            client: "Local Gym",
            industry: "Fitness & Wellness",
            goal: "Get more membership inquiries",
            solution: "Clear messaging, mobile-first layout, strong call-to-action",
            result: "Improved engagement and more contact requests",
            color: "from-cyan-500 to-blue-500",
            icon: Users,
            stat: "More Inquiries"
        },
        {
            id: "02",
            client: "Dental Clinic",
            industry: "Healthcare",
            goal: "Increase appointment bookings",
            solution: "Easy online booking system, trust signals, professional design",
            result: "Streamlined booking process and patient growth",
            color: "from-purple-500 to-pink-500",
            icon: Phone,
            stat: "More Bookings"
        },
        {
            id: "03",
            client: "Local Restaurant",
            industry: "Food & Dining",
            goal: "Drive more online orders",
            solution: "Mobile-optimized menu, clear ordering process, location visibility",
            result: "Increased online visibility and customer reach",
            color: "from-orange-500 to-red-500",
            icon: TrendingUp,
            stat: "More Orders"
        }
    ];

    return (
        <section id="work" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
                    <div className="relative">
                        {/* Large background text */}
                        <span className="absolute -top-8 -left-4 text-[8rem] md:text-[12rem] font-black text-white/[0.02] leading-none pointer-events-none select-none">
                            Work
                        </span>

                        <RevealOnScroll>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px w-12 bg-pink-500" />
                                <span className="text-xs font-mono text-pink-400 uppercase tracking-[0.2em]">Example Projects</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">How We Help Local Businesses</h2>
                        </RevealOnScroll>
                    </div>

                    <RevealOnScroll delay={0.1}>
                        <p className="text-white/50 text-sm max-w-md">
                            These example projects show our approach to helping local businesses succeed online.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Case Studies */}
                <div className="space-y-24">
                    {caseStudies.map((study, i) => {
                        const Icon = study.icon;
                        return (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center group`}
                            >
                                {/* Project Card */}
                                <HolographicCard className="w-full lg:w-2/3 aspect-[16/10] relative">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                                    {/* Card Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                        {/* Top */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2 block">
                                                    {study.industry}
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-white">{study.client}</h3>
                                            </div>
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${study.color} flex items-center justify-center`}>
                                                <Icon className="w-7 h-7 text-white" />
                                            </div>
                                        </div>

                                        {/* Center Stat */}
                                        <div className="flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                                                    {study.stat}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom */}
                                        <div className="flex items-center justify-between text-xs text-white/40 font-mono">
                                            <span>Case Study {study.id}</span>
                                            <span>Local Business</span>
                                        </div>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            className="px-8 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-wider"
                                        >
                                            View Details
                                        </motion.button>
                                    </div>
                                </HolographicCard>

                                {/* Study Info */}
                                <div className="w-full lg:w-1/3 space-y-6">
                                    {/* Large ID number */}
                                    <span className="text-8xl font-black text-white/5 font-mono leading-none">
                                        {study.id}
                                    </span>

                                    {/* Goal */}
                                    <div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                                            Goal
                                        </div>
                                        <p className="text-lg text-white">{study.goal}</p>
                                    </div>

                                    {/* Solution */}
                                    <div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">
                                            Solution
                                        </div>
                                        <p className="text-white/70">{study.solution}</p>
                                    </div>

                                    {/* Result */}
                                    <div className={`p-4 rounded-xl bg-gradient-to-r ${study.color} bg-opacity-10 border border-white/10`}>
                                        <div className="text-xs font-mono uppercase tracking-widest text-white/60 mb-1">
                                            Result
                                        </div>
                                        <p className="text-white font-medium">{study.result}</p>
                                    </div>

                                    {/* Arrow button */}
                                    <motion.button
                                        whileHover={{ x: 10 }}
                                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                        <ArrowRight size={18} />
                                    </motion.button>
                                </div>
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
