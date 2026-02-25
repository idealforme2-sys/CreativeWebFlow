import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send, Mail, ArrowUpRight, CheckCircle2, Sparkles, Rocket, Calendar, CheckCircle, Clock, Zap } from 'lucide-react';
import { SectionHeader, RevealOnScroll, MagneticButton, HolographicCard, SectionParticles } from './UIComponents';
import { Highlighter } from './magicui/Highlighter';

// Floating particles for the form background
const FormParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20"
                    style={{
                        left: `${p.x}% `,
                        top: `${p.y}% `,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 10, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// Animated gradient border
const AnimatedBorder = ({ children, className }) => {
    return (
        <div className={`relative ${className} `}>
            <div
                className="absolute inset-0 rounded-3xl opacity-50"
                style={{
                    background: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899, #06b6d4)',
                    backgroundSize: '300% 100%',
                    animation: 'borderFlow 4s linear infinite',
                }}
            />
            <div className="absolute inset-[1px] bg-slate-900/95 rounded-3xl" />
            <div className="relative z-10">{children}</div>
            <style>{`
            @keyframes borderFlow {
                0% { background-position: 0% 50%; }
                100% { background-position: 300% 50%; }
            }
            `}</style>
        </div>
    );
};

// Typing animation for header
const TypingText = ({ texts, className }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[currentIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex, texts]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const trustBadges = [
        { icon: CheckCircle, label: 'Secure & Private', desc: 'Your data is encrypted' },
        { icon: Clock, label: '24hr Response', desc: 'We reply within a day' },
        { icon: Zap, label: 'Fast Turnaround', desc: 'Projects ship quickly' },
    ];

    const headerTexts = [
        'Ready to Launch?',
        "Let's Build.",
        'Your Success Starts Here'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Dispatch to client's default email agent
        window.location.href = `mailto:ventureforbusiness@gmail.com?subject=New Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nProject Details:\n${formData.message}`)}`;

        await new Promise(resolve => setTimeout(resolve, 500));
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
            value: "ventureforbusiness@gmail.com",
            link: "mailto:ventureforbusiness@gmail.com"
        }
    ];

    return (
        <section id="contact" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />
            {/* Animated gradient orbs */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                animate={{
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"
            />

            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(0,240,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.4) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
            }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <RevealOnScroll>
                    <div className="text-center max-w-3xl mx-auto mb-8">
                        {/* Animated badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-amber-500/10 border border-amber-500/20"
                        >
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-xs font-semibold text-amber-300">
                                Limited spots: 2 available this month
                            </span>
                        </motion.div>

                        {/* Main headline with typing effect */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-4 mb-6 justify-center"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em]">Start Your Project</span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                            <TypingText
                                texts={headerTexts}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                            />
                        </h2>

                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light mt-6">
                            Most local businesses blend in. <Highlighter action="highlight" color="#06b6d4" delay={0.2}>Yours won't.</Highlighter>
                            <br />
                            Join 10+ businesses who <Highlighter action="underline" color="#a855f7" delay={0.4}>transformed their online presence.</Highlighter>
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Trust Badges Row */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {trustBadges.map((badge, i) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-900/80 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-md"
                            >
                                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <Icon size={14} className="text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white">{badge.label}</p>
                                    <p className="text-[10px] text-white/40">{badge.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Form - Premium Glass with Particles */}
                    <RevealOnScroll delay={0.1}>
                        <AnimatedBorder className="rounded-3xl">
                            <div className="relative p-8 md:p-10 overflow-hidden">
                                {/* Floating particles inside form */}
                                <FormParticles />

                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-cyan-500/30 rounded-tl-3xl pointer-events-none" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-purple-500/30 rounded-br-3xl pointer-events-none" />
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-16 relative z-10"
                                    >
                                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                            <Send size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                                        <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                        <style>{`
                                        .contact-input {
                                            background: rgba(0,0,0,0.3);
                                            border: 1px solid rgba(255,255,255,0.08);
                                            border-radius: 12px;
                                            padding: 16px;
                                            color: white;
                                            width: 100%;
                                            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                                            outline: none;
                                            font-size: 14px;
                                        }
                                        .contact-input::placeholder { color: rgba(255,255,255,0.2); }
                                        .contact-input:focus {
                                            border-color: rgba(6,182,212,0.5);
                                            box-shadow: 0 0 20px rgba(6,182,212,0.1), inset 0 1px 2px rgba(6,182,212,0.05);
                                            background: rgba(6,182,212,0.02);
                                        }
                                    `}</style>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative group/input">
                                                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                                    Your Name
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField('name')}
                                                        onBlur={() => setFocusedField(null)}
                                                        required
                                                        className="contact-input"
                                                        placeholder="John Doe"
                                                    />
                                                    <motion.div
                                                        className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                                        animate={{ width: focusedField === 'name' ? '90%' : '0%', x: '-50%' }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative group/input">
                                                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField('email')}
                                                        onBlur={() => setFocusedField(null)}
                                                        required
                                                        className="contact-input"
                                                        placeholder="john@company.com"
                                                    />
                                                    <motion.div
                                                        className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                                        animate={{ width: focusedField === 'email' ? '90%' : '0%', x: '-50%' }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative group/input">
                                                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                                    Company (Optional)
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        value={formData.company}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField('company')}
                                                        onBlur={() => setFocusedField(null)}
                                                        className="contact-input"
                                                        placeholder="Your Company"
                                                    />
                                                    <motion.div
                                                        className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                                        animate={{ width: focusedField === 'company' ? '90%' : '0%', x: '-50%' }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="relative group/input">
                                                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                                    Budget Range
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        name="budget"
                                                        value={formData.budget}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField('budget')}
                                                        onBlur={() => setFocusedField(null)}
                                                        className="contact-input appearance-none cursor-pointer text-gray-400"
                                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                                                    >
                                                        <option value="" className="bg-[#0a0a1a]">Select budget...</option>
                                                        <option value="200-500" className="bg-[#0a0a1a]">$200 – $500 (Starter)</option>
                                                        <option value="500-1000" className="bg-[#0a0a1a]">$500 – $1,000 (Growth)</option>
                                                        <option value="1000-3000" className="bg-[#0a0a1a]">$1,000 – $3,000 (Premium)</option>
                                                        <option value="3000+" className="bg-[#0a0a1a]">$3,000+ (Enterprise)</option>
                                                    </select>
                                                    <motion.div
                                                        className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                                        animate={{ width: focusedField === 'budget' ? '90%' : '0%', x: '-50%' }}
                                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative group/input">
                                            <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                                Project Details
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocusedField('message')}
                                                    onBlur={() => setFocusedField(null)}
                                                    required
                                                    rows={5}
                                                    className="contact-input resize-none"
                                                    placeholder="Tell us about your project..."
                                                />
                                                <motion.div
                                                    className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                                                    animate={{ width: focusedField === 'message' ? '95%' : '0%', x: '-50%' }}
                                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                />
                                            </div>
                                        </div>

                                        <MagneticButton
                                            className="w-full py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-bold uppercase tracking-wider flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                            onClick={handleSubmit}
                                        >
                                            <div className="w-full h-full flex items-center justify-center gap-3">
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
                                            </div>
                                        </MagneticButton>
                                    </form>
                                )}
                            </div>
                        </AnimatedBorder>
                    </RevealOnScroll>

                    {/* Right Column — Info + Response Timeline */}
                    <RevealOnScroll delay={0.2}>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    Ready to start your project?
                                </h3>
                                <p className="text-white/60 leading-relaxed text-sm">
                                    Whether you need a complete website overhaul, a new mobile app, or a digital marketing strategy, we're here to help transform your ideas into reality.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <motion.a
                                href="mailto:ventureforbusiness@gmail.com"
                                whileHover={{ x: 8, borderColor: 'rgba(0,240,255,0.3)' }}
                                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-cyan-900/40 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                    <Mail size={18} />
                                </div>
                                <div className="flex-1">
                                    <address className="not-italic text-white/60 text-sm md:text-base space-y-1">
                                        <p className="mb-2">Or email us directly at:</p>
                                        <span
                                            className="group/link inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                                        >
                                            ventureforbusiness@gmail.com
                                        </span>
                                    </address>
                                </div>
                                <ArrowUpRight size={16} className="text-white/30 group-hover:text-cyan-400 transition-colors" />
                            </motion.a>

                            {/* Response Timeline */}
                            <ResponseTimeline />

                            {/* Limited availability badge */}
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/10">
                                <Calendar size={16} className="text-amber-400 flex-shrink-0" />
                                <p className="text-xs text-amber-300/70">
                                    <span className="font-semibold text-amber-300">Limited spots:</span> We take on a limited number of projects to ensure quality.
                                </p>
                            </div>
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
            emoji: '📬',
            title: 'We receive your message',
            desc: 'Our team reviews your project details within hours.',
            color: 'from-cyan-500 to-blue-500',
        },
        {
            emoji: '✅',
            title: 'Custom proposal sent',
            desc: 'We craft a tailored plan and send it to your email.',
            color: 'from-purple-500 to-violet-500',
        },
        {
            emoji: '🚀',
            title: 'Project kickoff',
            desc: 'We start bringing your vision to life.',
            color: 'from-pink-500 to-rose-500',
        },
    ];

    return (
        <div ref={ref} className="p-5 rounded-2xl border border-white/10 bg-slate-900/80">
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Rocket size={12} className="text-cyan-400" />
                What happens next
            </h4>
            <div className="space-y-0">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-3 relative"
                    >
                        {i < steps.length - 1 && (
                            <div className="absolute left-4 top-10 w-px h-6 bg-gradient-to-b from-white/10 to-transparent" />
                        )}
                        <div className={`flex - shrink - 0 w - 8 h - 8 rounded - lg bg - gradient - to - br ${step.color} flex items - center justify - center text - sm shadow - lg`}>
                            {step.emoji}
                        </div>
                        <div className="pb-4">
                            <p className="text-white font-semibold text-xs">{step.title}</p>
                            <p className="text-white/40 text-[10px] mt-0.5">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ContactSection;
