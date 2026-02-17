import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Palette, Code, Rocket } from 'lucide-react';

// Import local images
import discoveryImg from '../assets/process/discovery.png';
import designImg from '../assets/process/design.png';
import buildImg from '../assets/process/build.png';
import launchImg from '../assets/process/launch.png';

const ProcessSection = () => {
    const steps = [
        {
            number: '01',
            icon: Lightbulb,
            title: 'Discovery',
            shortDesc: 'Deep dive into your brand goals and target audience...',
            fullDesc: 'Deep dive into your brand goals, target audience, and market positioning to build a solid foundation.',
            color: 'cyan',
            image: discoveryImg,
        },
        {
            number: '02',
            icon: Palette,
            title: 'Design',
            shortDesc: 'Crafting high-fidelity UI/UX wireframes that resonate...',
            fullDesc: 'Crafting high-fidelity UI/UX wireframes that resonate deeply with your users and enhance usability.',
            color: 'purple',
            image: designImg,
        },
        {
            number: '03',
            icon: Code,
            title: 'Build',
            shortDesc: 'Clean, high-performance development with custom interactions...',
            fullDesc: 'Clean, high-performance development with custom interactions and animations optimized for speed.',
            color: 'cyan',
            image: buildImg,
        },
        {
            number: '04',
            icon: Rocket,
            title: 'Launch & Grow',
            shortDesc: 'Final SEO optimization, deployment, and ongoing post-launch...',
            fullDesc: 'Final SEO optimization, deployment, and ongoing post-launch maintenance to ensure success.',
            color: 'purple',
            image: launchImg,
        },
    ];

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <span className="inline-block text-cyan-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 cyan-glow-text">
                        How It Works
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        From Idea to Launch in{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                            4 Simple Steps
                        </span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
                        Our streamlined approach ensures your vision is translated into a pixel-perfect digital experience with speed and precision.
                    </p>
                </motion.div>

                {/* Horizontal glow line (desktop) */}
                <div className="hidden lg:block absolute top-[55%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -z-10 pointer-events-none" />

                {/* Cinematic Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isPurple = step.color === 'purple';
                        const accentColor = isPurple ? 'purple' : 'cyan';

                        return (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative rounded-2xl overflow-hidden h-[500px] border border-white/10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                                </div>

                                {/* Step Number Badge */}
                                <div
                                    className={`absolute top-6 left-6 w-12 h-12 rounded-full flex items-center justify-center z-20 backdrop-blur-xl border ${isPurple ? 'border-purple-500/30' : 'border-cyan-500/30'}`}
                                    style={{
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.05) 100%)',
                                    }}
                                >
                                    <span className={`${isPurple ? 'text-purple-400' : 'text-cyan-400'} font-bold text-lg`}>
                                        {step.number}
                                    </span>
                                </div>

                                {/* Bottom Glass Panel */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[45%] p-6 flex flex-col justify-end z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 border-t border-white/10"
                                    style={{
                                        backdropFilter: 'blur(12px)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.05) 100%)',
                                    }}
                                >
                                    {/* Icon */}
                                    <div className="mb-2">
                                        <span className={`inline-block p-2 rounded-lg mb-3 ${isPurple ? 'bg-purple-500/20' : 'bg-cyan-500/20'}`}>
                                            <Icon size={20} className={isPurple ? 'text-purple-400' : 'text-cyan-400'} />
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-2xl font-bold text-white mb-2 group-hover:${isPurple ? 'text-purple-400' : 'text-cyan-400'} transition-colors`}>
                                        {step.title}
                                    </h3>

                                    {/* Short description (visible by default, hidden on hover) */}
                                    <p className="text-sm text-gray-300 leading-relaxed group-hover:hidden transition-opacity duration-300">
                                        {step.shortDesc}
                                    </p>

                                    {/* Full description (hidden by default, visible on hover) */}
                                    <p className="text-sm text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 h-0 group-hover:h-auto overflow-hidden">
                                        {step.fullDesc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
