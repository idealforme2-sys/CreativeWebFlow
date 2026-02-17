import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, ArrowUpRight, Rocket } from 'lucide-react';
import { SectionHeader, RevealOnScroll } from './UIComponents';
import { RainbowButton } from './MagicUI';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        budget: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
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
                                Let's Build Something{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                    Amazing Together
                                </span>
                            </>
                        }
                        subtitle="Tell us about your project and we'll get back to you within 24 hours."
                        className="mb-16"
                    />
                </RevealOnScroll>

                {/* Limited Availability Badge */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm text-white/60">We take on a limited number of projects to ensure quality</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Form */}
                    <RevealOnScroll delay={0.1}>
                        <div className="p-8 md:p-10 border border-white/[0.06] bg-white/[0.02] backdrop-blur-md rounded-2xl">
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                Budget Range
                                            </label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white/60 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none"
                                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                                            >
                                                <option value="" className="bg-[#1a1a2e]">Select budget...</option>
                                                <option value="200-500" className="bg-[#1a1a2e]">$200 – $500 (Starter)</option>
                                                <option value="500-1000" className="bg-[#1a1a2e]">$500 – $1,000 (Growth)</option>
                                                <option value="1000-3000" className="bg-[#1a1a2e]">$1,000 – $3,000 (Premium)</option>
                                                <option value="3000+" className="bg-[#1a1a2e]">$3,000+ (Enterprise)</option>
                                            </select>
                                        </div>
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

                                    <RainbowButton
                                        onClick={() => { }}
                                        className="w-full rounded-xl"
                                    >
                                        {isSubmitting ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                                            />
                                        ) : (
                                            <span className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wider">
                                                Send Message
                                                <Send size={18} />
                                            </span>
                                        )}
                                    </RainbowButton>
                                </form>
                            )}
                        </div>
                    </RevealOnScroll>

                    {/* Right Column — Info + Response Timeline */}
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

                            {/* Response Timeline */}
                            <ResponseTimeline />
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

const ResponseTimeline = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const steps = [
        {
            emoji: '📩',
            title: 'We receive your message',
            desc: 'Our team reviews your project details within hours.',
            color: 'from-cyan-500 to-blue-500',
        },
        {
            emoji: '🚀',
            title: 'Project kickoff',
            desc: 'We start bringing your vision to life.',
            color: 'from-purple-500 to-pink-500',
        },
    ];

    return (
        <div ref={ref} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h4 className="text-sm font-mono text-white/40 uppercase tracking-wider mb-6">What happens next</h4>
            <div className="space-y-0">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-4 relative"
                    >
                        {/* Timeline line */}
                        {i < steps.length - 1 && (
                            <div className="absolute left-5 top-12 w-px h-8 bg-gradient-to-b from-white/10 to-transparent" />
                        )}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-lg shadow-lg`}>
                            {step.emoji}
                        </div>
                        <div className="pb-6">
                            <p className="text-white font-semibold text-sm">{step.title}</p>
                            <p className="text-white/40 text-xs mt-1">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ContactSection;
