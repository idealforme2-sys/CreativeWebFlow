import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import MusicPlayer from './MusicPlayer';
import { MagneticWrapper } from './UIComponents';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const navRef = useRef(null);

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setIsScrolled(y > 50);
            setScrollProgress(Math.min(y / 300, 1));
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section tracking via IntersectionObserver
    useEffect(() => {
        const sectionIds = ['about', 'services', 'work', 'mission', 'contact'];
        const observers = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const navLinks = [
        { label: 'About', href: '#about', id: 'about' },
        {
            label: 'Services',
            href: '#services',
            id: 'services',
            dropdown: [
                { label: 'Web Development', subText: 'Design & Build', href: '#what-we-do?tab=web' },
                { label: 'Smart Features', subText: 'Automate & Scale', href: '#what-we-do?tab=smart' },
                { label: 'Local Marketing', subText: 'Reach & Grow', href: '#what-we-do?tab=local' },
            ]
        },
        { label: 'Procedure', href: '#how-it-works', id: 'how-it-works' },
        { label: 'Work', href: '#work', id: 'work' },
        { label: 'Contact', href: '#contact', id: 'contact' },
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    const horizontalPadding = isScrolled ? `${4 + scrollProgress * 8}%` : '0%';

    return (
        <>
            <style>{`
                @keyframes lava-wave {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 300% 50%; }
                }
                @keyframes nav-gradient-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .nav-noise::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    opacity: 0.03;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
                    pointer-events: none;
                    z-index: 0;
                }
                .nav-link-hover::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #06b6d4, #a855f7);
                    border-radius: 999px;
                    transform: translateX(-50%);
                    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .nav-link-hover:hover::after {
                    width: 70%;
                }
                .nav-link-active::after {
                    content: '';
                    position: absolute;
                    bottom: 2px;
                    left: 50%;
                    width: 70%;
                    height: 2px;
                    background: linear-gradient(90deg, #06b6d4, #a855f7);
                    border-radius: 999px;
                    transform: translateX(-50%);
                    box-shadow: 0 0 8px rgba(6,182,212,0.5);
                }
            `}</style>

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
                    className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] nav-noise ${isScrolled
                        ? 'rounded-2xl bg-[#0a0f1c]/85 backdrop-blur-3xl shadow-[0_8px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] py-3'
                        : 'rounded-none bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
                        }`}
                >
                    {/* Animated gradient border on scroll */}
                    {isScrolled && (
                        <div className="absolute inset-0 rounded-2xl -z-10 p-[1px] overflow-hidden">
                            <div
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                    background: 'linear-gradient(90deg, rgba(6,182,212,0.25), rgba(168,85,247,0.25), rgba(236,72,153,0.25), rgba(6,182,212,0.25))',
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

                    {/* Shimmer sweep */}
                    {isScrolled && (
                        <motion.div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12"
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                            />
                        </motion.div>
                    )}

                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
                        {/* Logo + Music */}
                        <div className="flex items-center gap-3">
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

                            {/* Music toggle — right next to logo */}
                            <MusicPlayer size={16} />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-0.5">
                            {navLinks.map((link) => (
                                <div
                                    key={link.label}
                                    className="relative group"
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    {link.dropdown ? (
                                        <button
                                            onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                                            onMouseEnter={() => setActiveDropdown(link.label)}
                                            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 nav-link-hover ${activeSection === link.id
                                                ? 'text-cyan-400 nav-link-active'
                                                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                                                }`}
                                        >
                                            {link.label}
                                            <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className={`relative px-4 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 nav-link-hover ${activeSection === link.id
                                                ? 'text-cyan-400 nav-link-active'
                                                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                                                }`}
                                        >
                                            {link.label}
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
                                                    className="absolute top-[100%] left-0 pt-4 w-64 pointer-events-none z-50"
                                                >
                                                    {/* Invisible block to bridge hover gap */}
                                                    <div className="absolute top-0 left-0 w-full h-4 pointer-events-auto" />

                                                    <div className="relative w-full py-2 bg-[#0a0f1c]/95 backdrop-blur-3xl border border-white/[0.08] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden nav-noise pointer-events-auto">
                                                        {/* Top accent line */}
                                                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                                                        {/* Grid pattern overlay */}
                                                        <div
                                                            className="absolute inset-0 opacity-[0.02] pointer-events-none"
                                                            style={{
                                                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                                                backgroundSize: '20px 20px',
                                                            }}
                                                        />
                                                        {link.dropdown.map((item) => (
                                                            <button
                                                                key={item.label}
                                                                onClick={() => {
                                                                    scrollToSection(item.href);
                                                                    setActiveDropdown(null);
                                                                }}
                                                                className="relative w-full px-5 py-3 text-left hover:bg-cyan-400/[0.06] transition-all duration-200 flex items-start gap-3 group/item overflow-hidden"
                                                            >
                                                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover/item:bg-cyan-400 group-hover/item:shadow-[0_0_8px_currentColor] transition-all duration-300 flex-shrink-0" />
                                                                <div className="relative z-10 flex flex-col">
                                                                    <span className="text-[12px] font-bold uppercase tracking-wider text-white/90 group-hover/item:text-cyan-400 transition-colors">{item.label}</span>
                                                                    {item.subText && <span className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{item.subText}</span>}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA Button — animated gradient border */}
                        <MagneticWrapper strength={0.2} className="hidden lg:block">
                            <motion.button
                                onClick={() => scrollToSection('#contact')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] text-white overflow-hidden group"
                            >
                                {/* Rotating gradient border */}
                                <div
                                    className="absolute -inset-[1px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: 'conic-gradient(from 0deg, #06b6d4, #a855f7, #ec4899, #06b6d4)',
                                        animation: 'nav-gradient-rotate 3s linear infinite',
                                    }}
                                />
                                {/* Inner background */}
                                <div className="absolute inset-[1px] rounded-full bg-[#0a0f1c]/90 backdrop-blur-sm" />

                                {/* Hover glow fill */}
                                <div className="absolute inset-[1px] rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Shimmer */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -skew-x-12"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                                />

                                {/* Pulsing glow behind */}
                                <motion.div
                                    className="absolute -inset-2 rounded-full bg-cyan-500/10 blur-xl pointer-events-none"
                                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.05, 0.95] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                />

                                <Sparkles size={12} className="relative z-10 text-cyan-400" />
                                <span className="relative z-10">Start Project</span>
                            </motion.button>
                        </MagneticWrapper>

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
            < AnimatePresence >
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-black/98 backdrop-blur-3xl lg:hidden"
                    >
                        {/* Background decorative */}
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px]" />

                        <div className="flex flex-col items-center justify-center h-full gap-6">
                            <AnimatedLogo size={60} className="mb-4" />

                            {/* Music toggle in mobile */}
                            <div className="mb-4">
                                <MusicPlayer size={20} />
                            </div>

                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {link.dropdown ? (
                                        <div className="flex flex-col items-center gap-1.5">
                                            <span className="text-base font-bold text-white/40 uppercase tracking-widest">{link.label}</span>
                                            <div className="flex flex-col items-center gap-1">
                                                {link.dropdown.map((item) => (
                                                    <button
                                                        key={item.label}
                                                        onClick={() => {
                                                            scrollToSection(item.href);
                                                            setIsMobileMenuOpen(false);
                                                        }}
                                                        className="text-sm text-white/60 hover:text-cyan-400 transition-colors py-1"
                                                    >
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                scrollToSection(link.href);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`text-lg font-bold uppercase tracking-widest transition-colors ${activeSection === link.id ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
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

export default React.memo(Navbar);
