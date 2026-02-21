import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, Mail, ArrowUpRight, Rocket, Shield, Clock, Zap, CheckCircle2, Sparkles, Users, TrendingUp, Calendar } from 'lucide-react';
import { RevealOnScroll, SectionParticles } from './UIComponents';
import { RainbowButton } from './MagicUI';

// Animated counter for stats
const StatCounter = ({ value, suffix = '', label, icon: Icon }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);
    
    return (
        <div ref={ref} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
                {Icon && <Icon size={16} className="text-cyan-400" />}
                <span className="text-2xl md:text-3xl font-bold text-white">
                    {count}{suffix}
                </span>
            </div>
            <p className="text-xs text-white/40 uppercase tracking-wider">{label}</p>
        </div>
    );
};

// Live notification toast
const LiveNotification = ({ name, industry, time }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 backdrop-blur-md shadow-lg"
        >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {name.charAt(0)}
            </div>
            <div className="flex-1">
                <p className="text-sm text-white/90">
                    <span className="font-semibold">{name}</span>
                    <span className="text-white/50"> from </span>
                    <span className="text-cyan-400">{industry}</span>
                </p>
                <p className="text-xs text-white/40">{time}</p>
            </div>
        </motion.div>
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
const FormProgress = ({ currentStep, totalSteps }) => {
    const steps = ['Details', 'Project', 'Submit'];
    
    return (
        <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((step, i) => (
                <React.Fragment key={i}>
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            i < currentStep 
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                                : i === currentStep 
                                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-400'
                                    : 'bg-white/5 border border-white/10 text-white/30'
                        }`}>
                            {i < currentStep ? '✓' : i + 1}
                        </div>
                        <span className={`text-xs font-medium hidden sm:block ${
                            i <= currentStep ? 'text-white/70' : 'text-white/30'
                        }`}>
                            {step}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div className={`w-8 h-0.5 rounded-full transition-all duration-300 ${
                            i < currentStep ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-white/10'
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
    const [showNotification, setShowNotification] = useState(false);
    const [notificationData, setNotificationData] = useState({ name: '', industry: '', time: '' });
    
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Simulate live notifications
    useEffect(() => {
        const notifications = [
            { name: 'Sarah M.', industry: 'Dental', time: 'Just now' },
            { name: 'Mike R.', industry: 'Real Estate', time: '2 min ago' },
            { name: 'Lisa K.', industry: 'Fitness', time: '5 min ago' },
        ];
        
        const showRandomNotification = () => {
            const random = notifications[Math.floor(Math.random() * notifications.length)];
            setNotificationData(random);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 4000);
        };
        
        const interval = setInterval(showRandomNotification, 15000);
        setTimeout(showRandomNotification, 3000);
        
        return () => clearInterval(interval);
    }, []);

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
        await new Promise(resolve => setTimeout(resolve, 1500));
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

            {/* Live notification popup */}
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    >
                        <LiveNotification {...notificationData} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header - Mixed Copy Approach */}
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
                        
                        <p className="text-white/50 text-lg mt-4 mb-2">
                            Most local businesses blend in. <span className="text-white/70 font-medium">Yours won't.</span>
                        </p>
                        <p className="text-white/40 text-base">
                            Join 127+ businesses who transformed their online presence.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 py-6 border-y border-white/5"
                >
                    <StatCounter value={127} suffix="+" label="Projects Launched" icon={Rocket} />
                    <StatCounter value={98} suffix="%" label="Client Satisfaction" icon={Users} />
                    <StatCounter value={340} suffix="%" label="Avg. ROI Increase" icon={TrendingUp} />
                </motion.div>

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
                    {/* Contact Form — Premium Glass */}
                    <RevealOnScroll delay={0.1}>
                        <div className="relative p-8 md:p-10 border border-white/10 bg-slate-900/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl rounded-3xl overflow-hidden group hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-500">
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-cyan-500/30 rounded-tl-3xl pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-purple-500/30 rounded-br-3xl pointer-events-none" />

                            {/* Gradient glow that follows focus */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[80px]" />
                            </div>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-16"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)]"
                                    >
                                        <CheckCircle2 size={36} className="text-white" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                                    <p className="text-white/50">We'll get back to you within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    {/* Form header with progress */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <Sparkles size={18} className="text-cyan-400" />
                                            <p className="text-sm font-semibold text-white/70">Start your project</p>
                                        </div>
                                    </div>
                                    
                                    {/* Progress steps */}
                                    <FormProgress currentStep={currentStep} totalSteps={3} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {[
                                            { name: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'text', required: true },
                                            { name: 'email', label: 'Email Address', placeholder: 'john@company.com', type: 'email', required: true },
                                        ].map((field) => (
                                            <div key={field.name} className="relative">
                                                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
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
                                                    className="w-full px-4 py-4 bg-black/60 border border-white/10 shadow-inner rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 focus:bg-black/80 transition-all duration-300"
                                                    placeholder={field.placeholder}
                                                />
                                                {focusedField === field.name && (
                                                    <motion.div
                                                        layoutId="inputGlow"
                                                        className="absolute -inset-[1px] rounded-xl border border-cyan-500/30 pointer-events-none"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                                {/* Checkmark for filled fields */}
                                                {formData[field.name] && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute right-3 top-9"
                                                    >
                                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                                    </motion.div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                                                Company (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('company')}
                                                onBlur={() => setFocusedField(null)}
                                                className="w-full px-4 py-4 bg-black/60 border border-white/10 shadow-inner rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 focus:bg-black/80 transition-all duration-300"
                                                placeholder="Your Company"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                                                Budget Range
                                            </label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('budget')}
                                                onBlur={() => setFocusedField(null)}
                                                className="w-full px-4 py-4 bg-black/60 border border-white/10 shadow-inner rounded-xl text-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 focus:bg-black/80 transition-all duration-300 appearance-none cursor-pointer"
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
                                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                                            Project Details
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-4 bg-black/60 border border-white/10 shadow-inner rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 focus:bg-black/80 transition-all duration-300 resize-none"
                                            placeholder="Tell us about your project, goals, and timeline..."
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

                                    {/* Micro-reassurance below the button */}
                                    <p className="text-center text-xs text-white/30 mt-3">
                                        🔒 No spam. We respect your privacy. Unsubscribe anytime.
                                    </p>
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
                                <p className="text-white/50 leading-relaxed">
                                    Whether you need a complete website overhaul, a new mobile app,
                                    or a digital marketing strategy, we're here to help transform your
                                    ideas into reality.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-4">
                                <motion.a
                                    href="mailto:hello@creativewebflow.com"
                                    whileHover={{ x: 8, borderColor: 'rgba(0,240,255,0.3)' }}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-cyan-900/40 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow">
                                        <Mail size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">
                                            Email
                                        </div>
                                        <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                                            hello@creativewebflow.com
                                        </div>
                                    </div>
                                    <ArrowUpRight size={18} className="text-white/30 group-hover:text-cyan-400 transition-colors" />
                                </motion.a>
                            </div>

                            {/* Response Timeline */}
                            <ResponseTimeline />

                            {/* Limited availability badge */}
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/[0.05] border border-amber-500/10">
                                <Calendar size={18} className="text-amber-400 flex-shrink-0" />
                                <p className="text-sm text-amber-300/70">
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
        <div ref={ref} className="p-6 rounded-2xl border border-white/10 bg-slate-900/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Rocket size={14} className="text-cyan-400" />
                What happens next
            </h4>
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
