import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, Mail, ArrowUpRight, Rocket, Shield, Clock, Zap, CheckCircle2, Sparkles, Calendar } from 'lucide-react';
import { RevealOnScroll, SectionParticles } from './UIComponents';
import { PulsatingButton } from './magicui/PulsatingButton';

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
                        left: `${p.x}%`,
                        top: `${p.y}%`,
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
        <div className={`relative ${className}`}>
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

// Progress steps component
const FormProgress = ({ currentStep }) => {
    const steps = ['Details', 'Project', 'Submit'];

    return (
        <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((step, i) => (
                <React.Fragment key={i}>
                    <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${i < currentStep
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                            : i === currentStep
                                ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-400'
                                : 'bg-white/5 border border-white/10 text-white/30'
                            }`}>
                            {i < currentStep ? '✓' : i + 1}
                        </div>
                        <span className={`text-[10px] font-medium hidden sm:block ${i <= currentStep ? 'text-white/70' : 'text-white/30'
                            }`}>
                            {step}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div className={`w-6 h-0.5 rounded-full transition-all duration-300 ${i < currentStep ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-white/10'
                            }`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

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
    const [focusedField, setFocusedField] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Update progress step based on form completion
    useEffect(() => {
        const filledFields = [formData.name, formData.email, formData.budget, formData.message].filter(Boolean).length;
        if (filledFields >= 4) setCurrentStep(2);
        else if (filledFields >= 2) setCurrentStep(1);
        else setCurrentStep(0);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Dispatch to client's default email agent
        window.location.href = `mailto:ventureforbusiness@gmail.com?subject=New Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\nBudget: ${formData.budget || 'N/A'}\n\nProject Details:\n${formData.message}`)}`;
        setIsSubmitting(false);
        setSubmitted(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const trustBadges = [
        { icon: Shield, label: 'Secure & Private', desc: 'Your data is encrypted' },
        { icon: Clock, label: '24hr Response', desc: 'We reply within a day' },
        { icon: Zap, label: 'Fast Turnaround', desc: 'Projects ship quickly' },
    ];

    const headerTexts = [
        'Ready to Launch?',
        "Let's Build.",
        'Your Success Starts Here'
    ];

    return (
        <section id="contact" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />
            <SectionParticles color="rgba(236,72,153,0.3)" count={30} />

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

                        {/* IMPROVED: Better visibility text */}
                        <p className="text-white/70 text-lg mt-4 mb-2 font-medium">
                            Most local businesses blend in. <span className="text-cyan-400">Yours won't.</span>
                        </p>
                        <p className="text-white/60 text-base">
                            Join <span className="text-white font-semibold">10+</span> businesses who transformed their online presence.
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
                    {/* Contact Form — Premium Glass with Particles */}
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
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)]"
                                        >
                                            <CheckCircle2 size={32} className="text-white" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-3">Message Sent!</h3>
                                        <p className="text-white/50">We'll get back to you within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                        {/* Form header with progress */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <Sparkles size={16} className="text-cyan-400" />
                                            <p className="text-sm font-semibold text-white/70">Start your project</p>
                                        </div>

                                        {/* Progress steps */}
                                        <FormProgress currentStep={currentStep} />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { name: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'text', required: true },
                                                { name: 'email', label: 'Email Address', placeholder: 'john@company.com', type: 'email', required: true },
                                            ].map((field) => (
                                                <div key={field.name} className="relative">
                                                    <label className="block text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        type={field.type}
                                                        name={field.name}
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField(field.name)}
                                                        onBlur={() => setFocusedField(null)}
                                                        required={field.required}
                                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
                                                        placeholder={field.placeholder}
                                                    />
                                                    {formData[field.name] && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="absolute right-3 top-8"
                                                        >
                                                            <CheckCircle2 size={14} className="text-emerald-400" />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                                                    Company (Optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
                                                    placeholder="Your Company"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                                                    Budget Range
                                                </label>
                                                <select
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 appearance-none cursor-pointer"
                                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                                                >
                                                    <option value="" className="bg-[#0a0a1a]">Select budget...</option>
                                                    <option value="200-500" className="bg-[#0a0a1a]">$200 – $500 (Starter)</option>
                                                    <option value="500-1000" className="bg-[#0a0a1a]">$500 – $1,000 (Growth)</option>
                                                    <option value="1000-3000" className="bg-[#0a0a1a]">$1,000 – $3,000 (Premium)</option>
                                                    <option value="3000+" className="bg-[#0a0a1a]">$3,000+ (Enterprise)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                                                Project Details
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={4}
                                                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 resize-none"
                                                placeholder="Tell us about your project, goals, and timeline..."
                                            />
                                        </div>

                                        {/* Vibrant Animated Button Wrapper */}
                                        <div className="relative group w-full mt-8">
                                            {/* Glowing shadow behind button */}
                                            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-40 blur-xl group-hover:opacity-75 transition-opacity duration-500" />

                                            {/* Button */}
                                            <div className="relative z-10 w-full">
                                                <PulsatingButton
                                                    type="submit"
                                                    className="w-full"
                                                >
                                                    {isSubmitting ? (
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full mx-auto drop-shadow-md"
                                                        />
                                                    ) : (
                                                        <span className="flex items-center justify-center gap-2 drop-shadow-md">
                                                            Send Message
                                                            <Send size={18} />
                                                        </span>
                                                    )}
                                                </PulsatingButton>
                                            </div>
                                        </div>

                                        <p className="text-center text-[10px] text-white/30 mt-2">
                                            🔒 No spam. We respect your privacy.
                                        </p>
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
                                    Whether you need a complete website overhaul, a new mobile app,
                                    or a digital marketing strategy, we're here to help transform your
                                    ideas into reality.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <motion.a
                                href="mailto:hello@creativewebflow.com"
                                whileHover={{ x: 8, borderColor: 'rgba(0,240,255,0.3)' }}
                                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-cyan-900/40 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                    <Mail size={18} />
                                </div>
                                <div className="flex-1">
                                    <address className="not-italic text-white/60 text-sm md:text-base space-y-4">
                                        <p className="mb-4">Or email us directly at:</p>
                                        <a
                                            href="mailto:ventureforbusiness@gmail.com"
                                            className="group/link inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                                        >
                                            ventureforbusiness@gmail.com
                                        </a>
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
            emoji: '📩',
            title: 'We receive your message',
            desc: 'Our team reviews your project details within hours.',
            color: 'from-cyan-500 to-blue-500',
        },
        {
            emoji: '✍️',
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
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-sm shadow-lg`}>
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
