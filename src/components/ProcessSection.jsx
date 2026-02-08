import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const ProcessSection = () => {
    const steps = [
        {
            number: '01',
            title: 'Understand Your Business',
            description: 'We learn about your goals, customers, and services to create the right strategy.'
        },
        {
            number: '02',
            title: 'Design for Clarity',
            description: 'We create a clean, professional design that customers understand immediately.'
        },
        {
            number: '03',
            title: 'Build & Optimize',
            description: 'We develop a fast, responsive website built to convert visitors into customers.'
        },
        {
            number: '04',
            title: 'Launch & Support',
            description: 'We test everything, launch your site, and make sure it runs smoothly.'
        }
    ];

    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-black/50 to-black/30">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block text-cyan-400 text-sm font-mono uppercase tracking-[0.2em] mb-4">
                        How We Work
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                            Our Simple Process
                        </span>
                    </h2>
                    <p className="text-lg text-white/60 max-w-xl mx-auto">
                        No tech headaches. No confusing language. Just results.
                    </p>
                </motion.div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="relative group"
                        >
                            {/* Connection Line (hidden on mobile, last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-cyan-500/30 to-transparent z-10" />
                            )}

                            <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-all duration-500 h-full">
                                {/* Step Number */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                        {step.number}
                                    </span>
                                    {index < steps.length - 1 && (
                                        <ArrowRight className="w-4 h-4 text-white/20 hidden md:block lg:hidden" />
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
                        <span className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            Simple communication
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            We handle everything
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            Clear timelines
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessSection;
