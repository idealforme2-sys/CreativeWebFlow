import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Palette, Smartphone, Target, LifeBuoy, Clock, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
    const reasons = [
        { icon: MessageCircle, title: 'Simple communication', desc: 'No technical jargon — just clear, honest conversation.' },
        { icon: Palette, title: 'Modern, professional design', desc: 'Your business will look as good as the big players.' },
        { icon: Smartphone, title: 'Works on all devices', desc: 'Perfect on phones, tablets, and desktops.' },
        { icon: Target, title: 'Focus on real results', desc: 'Not just looks — websites that bring customers.' },
        { icon: LifeBuoy, title: 'Reliable support', desc: 'We are here when you need help, even after launch.' },
        { icon: Clock, title: 'Clear timelines', desc: 'Know exactly when your project will be ready.' },
    ];

    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-black/30 to-black/50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-cyan-400 text-sm font-mono uppercase tracking-[0.2em] mb-4">
                        Why Us
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                            Why Local Businesses Choose Us
                        </span>
                    </h2>
                </motion.div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/20 transition-all duration-500"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <reason.icon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{reason.title}</h3>
                                    <p className="text-sm text-white/50 leading-relaxed">{reason.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/70 text-lg mb-6">
                        Ready to grow your business online?
                    </p>
                    <motion.a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full text-sm uppercase tracking-[0.1em] hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    >
                        <span>Let's Talk</span>
                        <CheckCircle className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
