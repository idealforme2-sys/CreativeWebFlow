import React from 'react';
import { Users, ArrowRight, Phone, TrendingUp, Monitor, ExternalLink, Target, Lightbulb, Award } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { AnimatedHeadline, RevealOnScroll } from './UIComponents';

const caseStudies = [
    {
        id: 'fitness',
        number: '01',
        category: 'Fitness & Wellness',
        title: 'Local Gym',
        icon: Users,
        color: 'cyan',
        gradient: 'from-cyan-500 to-blue-600',
        glowColor: 'rgba(6,182,212,0.3)',
        url: 'https://iron-core-fit.vercel.app',
        domain: 'iron-core-fit.vercel.app',
        goal: 'Get more membership inquiries',
        solution: 'Clear messaging, mobile-first layout, strong call-to-action placement ensuring potential members find what they need instantly.',
        result: 'Improved engagement and more contact requests.',
        layout: 'image-left',
    },
    {
        id: 'medical',
        number: '02',
        category: 'Healthcare',
        title: 'Dental Clinic',
        icon: Phone,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-500',
        glowColor: 'rgba(168,85,247,0.3)',
        url: 'https://radiant-smile.vercel.app',
        domain: 'radiant-smile.vercel.app',
        goal: 'Increase appointment bookings',
        solution: 'Easy online booking system integration, trust signals through testimonials, and a clean professional design.',
        result: 'Streamlined booking process and significant patient growth.',
        layout: 'image-right',
    },
    {
        id: 'food',
        number: '03',
        category: 'Food & Dining',
        title: 'Local Restaurant',
        icon: TrendingUp,
        color: 'orange',
        gradient: 'from-orange-500 to-red-500',
        glowColor: 'rgba(249,115,22,0.3)',
        url: 'https://savory-sage-food.vercel.app',
        domain: 'savory-sage-food.vercel.app',
        goal: 'Drive more online orders',
        solution: 'Mobile-optimized menu, clear ordering process flow, and enhanced location visibility for customers.',
        result: 'Increased online visibility and expanded customer reach.',
        layout: 'image-left',
    },
    {
        id: 'real-estate',
        number: '04',
        category: 'Premium Agency',
        title: 'The Obsidian',
        icon: Monitor,
        color: 'emerald',
        gradient: 'from-teal-500 to-emerald-500',
        glowColor: 'rgba(20,184,166,0.3)',
        url: 'https://the-obsidian.vercel.app',
        domain: 'the-obsidian.vercel.app',
        goal: 'Establish a premium digital presence',
        solution: 'High-end dark mode aesthetics, smooth animations, and optimized performance to showcase brand quality.',
        result: 'A striking brand identity that captivates luxury clients.',
        layout: 'image-right',
    }
];

const CaseStudyCard = ({ study, index }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = study.icon;
    const isImageLeft = study.layout === 'image-left';

    const infoContent = (
        <motion.div
            initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-5 space-y-6 ${isImageLeft ? 'order-1 lg:order-2 pl-0 lg:pl-12' : 'order-1 pr-0 lg:pr-12'}`}
        >
            <div className="relative">
                {/* Large faded number */}
                <span className="font-black text-[100px] leading-none text-white/[0.03] absolute -top-12 -left-6 select-none pointer-events-none">{study.number}</span>

                {/* Goal */}
                <div className="relative mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Target size={12} className="text-white/30" />
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Goal</h4>
                    </div>
                    <p className="text-xl font-semibold text-white leading-snug">{study.goal}</p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={12} className="text-white/30" />
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Solution</h4>
                    </div>
                    <p className="text-white/50 leading-relaxed text-sm">{study.solution}</p>
                </div>

                {/* Result — gradient card */}
                <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`bg-gradient-to-r ${study.gradient} p-5 rounded-2xl shadow-lg border border-white/10 relative overflow-hidden`}
                >
                    <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-1">
                            <Award size={12} className="text-white/70" />
                            <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">Result</h4>
                        </div>
                        <p className="text-white font-semibold">{study.result}</p>
                    </div>
                </motion.div>

                {/* Visit button */}
                <div className="mt-6">
                    <motion.button
                        onClick={() => window.open(study.url, '_blank')}
                        whileHover={{ scale: 1.05, x: 4 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all text-sm font-semibold text-white/70 hover:text-white"
                    >
                        <span>View Live Site</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );

    const imageContent = (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-7 ${isImageLeft ? 'order-2 lg:order-1' : 'order-2'}`}
        >
            <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => window.open(study.url, '_blank')}
            >
                {/* Ambient glow */}
                <div
                    className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10"
                    style={{ background: `radial-gradient(ellipse at center, ${study.glowColor}, transparent 70%)` }}
                />

                {/* Card border */}
                <div className="absolute inset-0 rounded-3xl border border-white/[0.08] group-hover:border-white/15 transition-colors duration-500 z-20 pointer-events-none" />

                {/* Live iframe */}
                <div className="absolute inset-0 z-0 bg-slate-900">
                    <iframe
                        src={study.url}
                        className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none border-0 opacity-50 group-hover:opacity-90 transition-opacity duration-700"
                        title={`${study.title} Preview`}
                        loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/40 group-hover:via-transparent group-hover:to-transparent transition-all duration-700 pointer-events-none" />
                </div>

                {/* Card header */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10 pointer-events-none">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-1">{study.category}</h4>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">{study.title}</h3>
                        </div>
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${study.gradient} flex items-center justify-center shadow-lg`}>
                            <Icon className="text-white" size={20} />
                        </div>
                    </div>

                    {/* Hover CTA */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <ExternalLink size={18} className="text-white" />
                            <span className="text-white font-bold text-sm uppercase tracking-wider">Visit Site</span>
                        </div>
                    </motion.div>

                    {/* Footer info */}
                    <div className="flex justify-between items-end text-[10px] font-mono text-white/30">
                        <span>{study.domain}</span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );

    return (
        <div ref={ref} id={study.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {infoContent}
            {imageContent}
        </div>
    );
};

const DetailedCaseStudies = () => {
    return (
        <div className="relative z-10 font-sans antialiased text-gray-100">
            {/* Background atmospherics */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[60%] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
                {/* Section Header */}
                <RevealOnScroll>
                    <header className="mb-20 lg:mb-28">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-pink-500 to-transparent" />
                            <span className="text-pink-400 text-[10px] font-bold tracking-[0.25em] uppercase">Example Projects</span>
                        </motion.div>
                        <div className="max-w-3xl">
                            <AnimatedHeadline>
                                <h2 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight mb-8">
                                    How We Help Local<br className="hidden md:block" />{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                                        Businesses
                                    </span>
                                </h2>
                            </AnimatedHeadline>
                            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
                                These example projects show our approach to helping local businesses succeed online through strategic design and development.
                            </p>
                        </div>
                    </header>
                </RevealOnScroll>

                {/* Case studies */}
                <div className="space-y-28 lg:space-y-36">
                    {caseStudies.map((study, i) => (
                        <CaseStudyCard key={study.id} study={study} index={i} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DetailedCaseStudies;
