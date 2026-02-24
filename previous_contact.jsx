import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, ArrowUpRight } from 'lucide-react';
import { SectionHeader, RevealOnScroll, MagneticButton, HolographicCard } from './UIComponents';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "hello@creativewebflow.com",
            link: "mailto:hello@creativewebflow.com"
        }
    ];

    return (
        <section id="contact" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <RevealOnScroll>
                    <SectionHeader
                        label="Get in Touch"
                        title={
                            <>
                                Let's{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                    Work Together
                                </span>
                            </>
                        }
                        subtitle="Have a project in mind? We'd love to hear from you. Send us a message and let's create something amazing."
                        align="center"
                        className="mb-16"
                    />
                </RevealOnScroll>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Form */}
                    <RevealOnScroll delay={0.1}>
                        <HolographicCard className="p-8 md:p-10">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                        <Send size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                                    <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                            Company (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                            placeholder="Your Company"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                            Project Details
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>

                                    <MagneticButton
                                        className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => { }}
                                    >
                                        {isSubmitting ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                        ) : (
                                            <>
                                                Send Message
                                                <Send size={18} />
                                            </>
                                        )}
                                    </MagneticButton>
                                </form>
                            )}
                        </HolographicCard>
                    </RevealOnScroll>

                    {/* Contact Info */}
                    <RevealOnScroll delay={0.2}>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Ready to start your project?
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    Whether you need a complete website overhaul, a new mobile app,
                                    or a digital marketing strategy, we're here to help transform your
                                    ideas into reality.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-4">
                                {contactInfo.map((info, i) => {
                                    const Icon = info.icon;
                                    return (
                                        <motion.a
                                            key={i}
                                            href={info.link}
                                            whileHover={{ x: 10 }}
                                            className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                                <Icon size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                                    {info.label}
                                                </div>
                                                <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                                                    {info.value}
                                                </div>
                                            </div>
                                            <ArrowUpRight size={18} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
