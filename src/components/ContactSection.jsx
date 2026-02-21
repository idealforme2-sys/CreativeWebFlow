import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, ArrowUpRight, Shield, Clock, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionHeader, RevealOnScroll } from './UIComponents';

const FeaturePill = ({ icon: Icon, title, desc, gradient, iconColor }) => (
    <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${gradient}`} />
        <div className="relative h-full bg-black/40 backdrop-blur-md rounded-[15px] p-5 border border-white/5 flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300 ${iconColor}`}>
                <Icon size={20} />
            </div>
            <div>
                <h4 className="font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-gray-400">{desc}</p>
            </div>
        </div>
    </div>
);

const FormInput = ({ label, ...props }) => (
    <div className="space-y-2 group">
        <label className="text-xs font-mono text-cyan-400/80 uppercase tracking-wider ml-1 group-focus-within:text-cyan-400 transition-colors">{label}</label>
        <input
            {...props}
            className="w-full px-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all hover:bg-white/[0.05]"
        />
    </div>
);

const SwipeButton = ({ isSubmitting }) => {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full h-16 rounded-xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {/* Background & Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-90 transition-all duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />

            {/* Content Container */}
            <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[11px] flex items-center justify-between pl-6 pr-2 overflow-hidden z-10">
                 {/* Text */}
                 <span className="font-bold text-white uppercase tracking-wider text-sm z-10 pointer-events-none">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                 </span>

                 {/* Animated Slide Element */}
                 <div className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors overflow-hidden z-20">
                    {isSubmitting ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                             <ArrowRight className="absolute w-5 h-5 text-white transition-all duration-300 -translate-x-8 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                             <ArrowRight className="absolute w-5 h-5 text-white transition-all duration-300 translate-x-0 group-hover:translate-x-8 opacity-100 group-hover:opacity-0" />
                        </>
                    )}
                 </div>

                 {/* Slide Hover Effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
            </div>
        </button>
    );
};

const ResponseTimeline = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const steps = [
        {
            icon: Mail,
            title: 'We receive your message',
            desc: 'Our team reviews your project details.',
            color: 'bg-blue-500',
            lineColor: 'from-blue-500',
            delay: 0
        },
        {
            icon: CheckCircle2,
            title: 'Custom proposal sent',
            desc: 'We craft a tailored plan for your needs.',
            color: 'bg-purple-500',
            lineColor: 'from-purple-500',
            delay: 0.2
        },
        {
            icon: Zap,
            title: 'Project kickoff',
            desc: 'We start bringing your vision to life.',
            color: 'bg-pink-500',
            lineColor: 'from-pink-500',
            delay: 0.4
        },
    ];

    return (
        <div ref={ref} className="relative pl-2 pt-8">
             <h4 className="text-xs font-mono text-cyan-400/80 uppercase tracking-wider mb-8">What happens next</h4>
            <div className="space-y-8">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: step.delay, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-start gap-4 relative group"
                    >
                        {/* Connecting Line */}
                        {i < steps.length - 1 && (
                            <div className={`absolute left-[19px] top-10 w-[2px] h-12 bg-gradient-to-b ${step.lineColor} to-transparent opacity-20 group-hover:opacity-50 transition-opacity`} />
                        )}

                        {/* Icon Bubble */}
                        <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden`}>
                             <div className={`absolute inset-0 ${step.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                            <step.icon size={18} className={`text-white relative z-10`} />
                        </div>

                        {/* Text */}
                        <div className="pt-1">
                            <p className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">{step.title}</p>
                            <p className="text-white/40 text-xs mt-1">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
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

    return (
        <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background Grid & Orbs */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse pointer-events-none delay-1000" />

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
                        className="mb-16 text-center"
                    />
                </RevealOnScroll>

                {/* Features Row */}
                <RevealOnScroll delay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 lg:mb-16">
                        <FeaturePill
                            icon={Shield}
                            title="Secure & Private"
                            desc="Your data is encrypted & safe"
                            gradient="from-cyan-500/20 to-blue-500/20"
                            iconColor="text-cyan-400"
                        />
                        <FeaturePill
                            icon={Clock}
                            title="24hr Response"
                            desc="We respect your time"
                            gradient="from-purple-500/20 to-pink-500/20"
                            iconColor="text-purple-400"
                        />
                        <FeaturePill
                            icon={Zap}
                            title="Fast Turnaround"
                            desc="Efficient delivery process"
                            gradient="from-emerald-500/20 to-teal-500/20"
                            iconColor="text-emerald-400"
                        />
                    </div>
                </RevealOnScroll>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Main Form - Spans 7 cols */}
                    <div className="lg:col-span-7">
                        <RevealOnScroll delay={0.2}>
                            <div className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-cyan-500/30 via-white/5 to-purple-500/30">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-white/5 overflow-hidden">
                                    {/* Inner Grid Texture */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

                                    {submitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="h-full flex flex-col items-center justify-center text-center py-20"
                                        >
                                            <div className="w-24 h-24 mb-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-[1px]">
                                                <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                                                    <Send size={40} className="text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                                                </div>
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                                            <p className="text-gray-400 max-w-md">
                                                Thanks for reaching out! We've received your inquiry and will get back to you within 24 hours.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="relative space-y-8">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                                    <Mail className="w-6 h-6 text-cyan-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">Start your project</h3>
                                                    <p className="text-sm text-gray-400">Fill out the form below</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormInput label="Your Name" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                                                <FormInput label="Email Address" name="email" type="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} required />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormInput label="Company (Optional)" name="company" placeholder="Your Company" value={formData.company} onChange={handleChange} />
                                                <div className="space-y-2">
                                                    <label className="text-xs font-mono text-cyan-400/80 uppercase tracking-wider ml-1">Budget Range</label>
                                                    <div className="relative">
                                                        <select
                                                            name="budget"
                                                            value={formData.budget}
                                                            onChange={handleChange}
                                                            className="w-full px-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white/80 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer hover:bg-white/[0.05]"
                                                        >
                                                            <option value="" className="bg-[#0a0a0a] text-gray-500">Select budget...</option>
                                                            <option value="200-500" className="bg-[#0a0a0a]">$200 – $500</option>
                                                            <option value="500-1000" className="bg-[#0a0a0a]">$500 – $1,000</option>
                                                            <option value="1000-3000" className="bg-[#0a0a0a]">$1,000 – $3,000</option>
                                                            <option value="3000+" className="bg-[#0a0a0a]">$3,000+</option>
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L1 4H11L6 9Z" fill="currentColor"/></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-cyan-400/80 uppercase tracking-wider ml-1">Project Details</label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={4}
                                                    className="w-full px-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-gray-500/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none hover:bg-white/[0.05]"
                                                    placeholder="Tell us about your project goals and requirements..."
                                                />
                                            </div>

                                            <SwipeButton isSubmitting={isSubmitting} />
                                        </form>
                                    )}
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column - Info - Spans 5 cols */}
                    <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
                        <RevealOnScroll delay={0.3}>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    Ready to start your project?
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-8">
                                    Whether you need a complete website overhaul, a new mobile app,
                                    or a digital marketing strategy, we're here to help transform your
                                    ideas into reality.
                                </p>

                                <motion.a
                                    href="mailto:hello@creativewebflow.com"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="block p-1 rounded-2xl bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50 mb-10 group"
                                >
                                    <div className="bg-[#0a0a0a] rounded-[14px] p-6 flex items-center justify-between border border-white/5 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                                <Mail className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Email us directly</p>
                                                <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">hello@creativewebflow.com</p>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="text-white/30 group-hover:text-cyan-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 relative z-10" />
                                    </div>
                                </motion.a>

                                <ResponseTimeline />
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* Bottom Banner */}
                <RevealOnScroll delay={0.4}>
                     <div className="mt-16 md:mt-24">
                        <div className="relative overflow-hidden rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-6 py-4 flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
                            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                            <p className="text-sm font-medium text-yellow-200/90">
                                <span className="font-bold text-yellow-100">Limited Spots Available:</span> We accept a limited number of projects each month to ensure the highest quality standards.
                            </p>
                        </div>
                     </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default ContactSection;
