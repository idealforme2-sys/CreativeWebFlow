import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

import card1 from '../assets/why-us/card-1.png';
import card2 from '../assets/why-us/card-2.png';
import card3 from '../assets/why-us/card-3.png';
import card4 from '../assets/why-us/card-4.png';
import card5 from '../assets/why-us/card-5.png';
import card6 from '../assets/why-us/card-6.png';

const WhyChooseUs = () => {
    const reasons = [
        { image: card1, title: 'Simple communication', desc: 'No technical jargon — just clear, honest conversation.' },
        { image: card2, title: 'Modern, professional design', desc: 'Your business will look as good as the big players.' },
        { image: card3, title: 'Works on all devices', desc: 'Perfect on phones, tablets, and desktops.' },
        { image: card4, title: 'Focus on real results', desc: 'Not just looks — websites that bring customers.' },
        { image: card5, title: 'Reliable support', desc: 'We are here when you need help, even after launch.' },
        { image: card6, title: 'Clear timelines', desc: 'Know exactly when your project will be ready.' },
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
                    <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
                        We earn trust through transparency, quality, and results — not buzzwords. Discover the difference a dedicated partner makes.
                    </p>
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
                            className="group relative rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                        >
                            <img
                                src={reason.image}
                                alt={reason.title}
                                className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10"
                            />
                            {/* Hidden text for accessibility */}
                            <div className="sr-only">
                                <h3>{reason.title}</h3>
                                <p>{reason.desc}</p>
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
