import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Stethoscope, Store, Rocket } from 'lucide-react';
import { SectionParticles } from './UIComponents';

const WhoWeHelp = () => {
    const clients = [
        { icon: Building2, title: 'Service businesses', desc: 'Contractors, consultants, agencies' },
        { icon: Stethoscope, title: 'Clinics & studios', desc: 'Medical, dental, fitness, wellness' },
        { icon: Store, title: 'Shops & local brands', desc: 'Retail, restaurants, salons' },
        { icon: Rocket, title: 'Growing businesses', desc: 'Ready to expand online' },
    ];

    return (
        <section className="relative py-24 bg-black/50 backdrop-blur-sm">
            <SectionParticles type="ember" count={15} />
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                            Who We Work With
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                        We help local businesses that rely on customers finding them online.
                    </p>
                </motion.div>

                {/* Client Types Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {clients.map((client, index) => (
                        <motion.div
                            key={client.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 transition-all duration-500"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <client.icon className="w-7 h-7 text-cyan-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{client.title}</h3>
                                <p className="text-sm text-white/50">{client.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closer Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08]">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <p className="text-white/70 text-sm md:text-base">
                            If your business needs more visibility, trust, and leads — <span className="text-white font-medium">we can help</span>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhoWeHelp;
