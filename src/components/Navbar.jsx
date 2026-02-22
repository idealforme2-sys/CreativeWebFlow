import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setIsScrolled(y > 50);
            const progress = Math.min(y / 300, 1);
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'About', href: '#about' },
        {
            label: 'Services',
            href: '#services',
            dropdown: [
                { label: 'Web Development', href: '#web-development' },
                { label: 'App Development', href: '#app-development' },
                { label: 'Digital Marketing', href: '#digital-marketing' },
            ]
        },
        { label: 'Work', href: '#work' },
        { label: 'Mission', href: '#mission' },
        { label: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    const horizontalPadding = isScrolled
        ? `${4 + scrollProgress * 8}%`
        : '0%';

    return (
        <>
            <motion.nav
                ref={navRef}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="fixed z-50 w-full top-0"
                style={{
                    paddingLeft: horizontalPadding,
                    paddingRight: horizontalPadding,
                    paddingTop: isScrolled ? '12px' : '0px',
                    transition: 'padding 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <div
                    className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
                        ? 'rounded-2xl bg-[#0a0f1c]/90 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] py-3'
                        : 'rounded-none bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
                        }`}
                >
                    {/* Animated gradient border on scroll */}
                    {isScrolled && (
                        <div className="absolute inset-0 rounded-2xl -z-10 p-[1px] overflow-hidden">
                            <div
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(6,182,212,0.2), rgba(168,85,247,0.2), rgba(236,72,153,0.2), rgba(6,182,212,0.2))',
                                    backgroundSize: '300% 100%',
                                    animation: 'lava-wave 4s ease-in-out infinite',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                    padding: '1px',
                                }}
                            />
                        </div>
                    )}

                    {/* Shimmer sweep on scroll */}
                    {isScrolled && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12"
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
                            />
                        </motion.div>
                    )}

                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
                        {/* Logo */}
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="flex items-center gap-3 group cursor-pointer"
                        >
                            <AnimatedLogo size={isScrolled ? 36 : 42} />
                            <motion.span
                                animate={{ opacity: isScrolled ? 0 : 1, width: isScrolled ? 0 : 'auto' }}
                                transition={{ duration: 0.4 }}
                                className="text-sm font-bold text-white/90 tracking-tight overflow-hidden whitespace-nowrap"
                            >
                                Creative WebFlow
                            </motion.span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link, i) => (
                                <div
                                    key={link.label}
                                    className="relative group"
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    {link.dropdown ? (
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                                            onMouseEnter={() => setActiveDropdown(link.label)}
                                            className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
                                        >
                                            {link.label}
                                            <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className="relative px-4 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60 hover:text-white hover:bg-white/[0.04] transition-all duration-300 group"
                                        >
                                            {link.label}
                                            {/* Active indicator dot */}
                                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                                        </button>
                                    )}

                                    {/* Dropdown Menu */}
                                    {link.dropdown && (
                                        <AnimatePresence>
                                            {activeDropdown === link.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                                    className="absolute top-full left-0 mt-2 w-52 py-2 bg-black/95 backdrop-blur-2xl border border-white/[0.08] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                                                >
                                                    {/* Dropdown gradient accent */}
                                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                                                    {link.dropdown.map((item) => (
                                                        <button
                                                            key={item.label}
                                                            onClick={() => scrollToSection(item.href)}
                                                            className="w-full px-4 py-3 text-left text-[11px] uppercase tracking-wider text-white/50 hover:text-cyan-400 hover:bg-cyan-400/[0.04] transition-all duration-200 flex items-center gap-2"
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-current opacity-40" />
                                                            {item.label}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            onClick={() => scrollToSection('#contact')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] text-white relative overflow-hidden group"
                            style={{
                                background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(168,85,247,0.15))',
                                border: '1px solid rgba(6,182,212,0.25)',
                            }}
                        >
                            {/* Hover glow fill */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                            {/* Shimmer */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12"
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                            />
                            <Sparkles size={12} className="relative z-10 text-cyan-400" />
                            <span className="relative z-10">Start Project</span>
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                            className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/15 rounded-xl hover:border-cyan-500/40 hover:bg-white/[0.03] transition-all duration-300"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={18} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-black/98 backdrop-blur-3xl lg:hidden"
                    >
                        {/* Background decorative elements */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px]" />

                        <div className="flex flex-col items-center justify-center h-full gap-6">
                            {/* Mobile logo */}
                            <AnimatedLogo size={60} className="mb-8" />

                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {link.dropdown ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="text-xl font-bold text-white/40 uppercase tracking-widest">{link.label}</span>
                                            {link.dropdown.map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={() => scrollToSection(item.href)}
                                                    className="text-base text-white/60 hover:text-cyan-400 transition-colors"
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors uppercase tracking-widest"
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </motion.div>
                            ))}

                            <motion.button
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                onClick={() => scrollToSection('#contact')}
                                className="mt-6 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-white border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all"
                            >
                                Start Project
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
