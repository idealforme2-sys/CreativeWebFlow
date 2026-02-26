import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Send, Mail, ArrowUpRight, CheckCircle2, Sparkles, Rocket, Calendar, CheckCircle, Clock, Zap, ChevronDown } from 'lucide-react';
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
        budget: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [isBudgetOpen, setIsBudgetOpen] = useState(false);
    const dropdownRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsBudgetOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const trustBadges = [
        { icon: CheckCircle, label: 'Secure & Private', desc: 'Your data is encrypted' },
        { icon: Clock, label: '24hr Response', desc: 'We reply within a day' },
        { icon: Zap, label: 'Fast Turnaround', desc: 'Projects ship quickly' },
    ];

    const budgetTiers = [
        { id: '200-500', label: '$200 – $500', sub: 'Starter' },
        { id: '500-1000', label: '$500 – $1,000', sub: 'Growth' },
        { id: '1000-3000', label: '$1,000 – $3,000', sub: 'Premium' },
        { id: '3000+', label: '$3,000+', sub: 'Enterprise' }
    ];

    const headerTexts = [
        'Ready to Launch?',
        "Let's Build.",
        'Your Success Starts Here'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // NOTE: Replace 'YOUR_ACCESS_KEY_HERE' with your actual Web3Forms access key
            // You can get one for free at https://web3forms.com/
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '38797143-5d0f-4eb5-8081-38da718cf5e2',
                    subject: `New Inquiry from ${formData.name}`,
                    from_name: formData.name,
                    email: formData.email,
                    company: formData.company || 'N/A',
                    budget: formData.budget || 'Not Selected',
                    message: formData.message
                })
            });
            const result = await res.json();
            if (result.success) {
                setSubmitted(true);
            } else {
                console.error("Form submission failed:", result.message);
                window.location.href = `mailto:hello@creative-webflow.site?subject=New Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nProject Details:\n${formData.message}`)}`;
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Form fetch error:", error);
            window.location.href = `mailto:hello@creative-webflow.site?subject=New Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nProject Details:\n${formData.message}`)}`;
            setSubmitted(true);
        }

        setIsSubmitting(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "hello@creative-webflow.site",
            link: "mailto:hello@creative-webflow.site"
        }
    ];

    return (
        <section id="contact" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
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
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0,transparent_60%)] pointer-events-none will-change-transform"
            />
            <motion.div
                animate={{
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0,transparent_60%)] pointer-events-none will-change-transform"
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
                            <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse" />
                            <span className="text-xs font-semibold text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
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
                            <span className="text-cyan-400 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Start Your Project</span>
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
                                        @keyframes nav-gradient-rotate {
                                            0% { transform: rotate(0deg); }
                                            100% { transform: rotate(360deg); }
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

                                            <div className="relative group/input" ref={dropdownRef}>
                                                <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                                                    Budget Range
                                                </label>
                                                <div className="relative">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsBudgetOpen(!isBudgetOpen)}
                                                        className="contact-input flex items-center justify-between"
                                                    >
                                                        <span className={formData.budget ? 'text-white font-medium' : 'text-gray-300'}>
                                                            {formData.budget ? budgetTiers.find(t => t.id === formData.budget)?.label : 'Select your budget'}
                                                        </span>
                                                        <motion.div
                                                            animate={{ rotate: isBudgetOpen ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <ChevronDown size={18} className="text-white/50" />
                                                        </motion.div>
                                                    </button>

                                                    <AnimatePresence>
                                                        {isBudgetOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden flex flex-col gap-1"
                                                            >
                                                                {budgetTiers.map((tier, i) => (
                                                                    <motion.button
                                                                        initial={{ opacity: 0, x: -10 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: i * 0.05 }}
                                                                        key={tier.id}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setFormData({ ...formData, budget: tier.id });
                                                                            setIsBudgetOpen(false);
                                                                        }}
                                                                        className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-all duration-300 group ${formData.budget === tier.id
                                                                            ? 'bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400/50'
                                                                            : 'hover:bg-white/5'
                                                                            }`}
                                                                    >
                                                                        <div className="flex flex-col">
                                                                            <span className={`text-[14px] font-bold tracking-tight mb-0.5 transition-colors ${formData.budget === tier.id ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-white'}`}>
                                                                                {tier.label}
                                                                            </span>
                                                                            <span className={`text-[10px] uppercase tracking-widest font-mono ${formData.budget === tier.id ? 'text-cyan-300/80' : 'text-gray-500'}`}>
                                                                                {tier.sub}
                                                                            </span>
                                                                        </div>

                                                                        {formData.budget === tier.id && (
                                                                            <motion.div
                                                                                initial={{ scale: 0 }}
                                                                                animate={{ scale: 1 }}
                                                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                                                className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center mr-1"
                                                                            >
                                                                                <CheckCircle size={14} className="text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                                                                            </motion.div>
                                                                        )}
                                                                    </motion.button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
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

                                        <motion.button
                                            className="relative w-full py-5 rounded-xl font-bold uppercase tracking-wider text-white overflow-hidden group mt-4 disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
                                            onClick={handleSubmit}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={isSubmitting}
                                        >
                                            {/* Rotating gradient border */}
                                            <div
                                                className="absolute -inset-[1px] rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                                style={{
                                                    background: 'conic-gradient(from 0deg, #06b6d4, #a855f7, #ec4899, #06b6d4)',
                                                    animation: 'nav-gradient-rotate 3s linear infinite',
                                                }}
                                            />
                                            {/* Inner background to preserve the gradient border */}
                                            <div className="absolute inset-[1px] rounded-xl" style={{ background: 'linear-gradient(90deg, #0f172a, #1e1b4b)' }} />

                                            {/* Hover glow fill */}
                                            <div className="absolute inset-[1px] rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Shimmer sweep */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 pointer-events-none"
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                                            />

                                            {/* Pulsing glow behind */}
                                            <motion.div
                                                className="absolute -inset-2 rounded-xl bg-cyan-500/20 blur-xl pointer-events-none"
                                                animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.95, 1.05, 0.95] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                            />

                                            {/* Content */}
                                            <div className="relative z-10 w-full h-full flex items-center justify-center gap-3">
                                                {isSubmitting ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-cyan-400 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-3 group-hover:pl-2 transition-all duration-300">
                                                        <span className="text-sm tracking-[0.2em]" style={{ textShadow: '0 0 10px rgba(6,182,212,0.5)' }}>Send Message</span>
                                                        <motion.div className="flex items-center justify-center -translate-x-2 opacity-80 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                                            <Send size={18} className="text-cyan-400" />
                                                        </motion.div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.button>
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
                                href="mailto:hello@creative-webflow.site"
                                whileHover={{ x: 8, borderColor: 'rgba(0,240,255,0.3)' }}
                                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-cyan-900/40 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                    <Mail size={18} />
                                </div>
                                <div className="flex-1">
                                    <address className="not-italic text-white/60 text-sm md:text-base">
                                        <p className="">Or email us directly at:</p>
                                        <span
                                            className="group/link inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                                        >
                                            hello@creative-webflow.site
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
