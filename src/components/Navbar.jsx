import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';
import MusicPlayer from './MusicPlayer';
import { MagneticWrapper } from './UIComponents';

const Navbar = ({ isMobile = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const navRef = useRef(null);

    // rAF-throttled scroll listener to reduce mobile re-render pressure
    useEffect(() => {
        let rafId = null;
        const handleScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                const y = window.scrollY;
                const nextScrolled = y > 50;
                const nextProgress = Math.min(y / 300, 1);
                setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
                setScrollProgress((prev) => (Math.abs(prev - nextProgress) < 0.01 ? prev : nextProgress));
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // Active section tracking
    useEffect(() => {
        const sectionIds = ['about', 'what-we-do', 'how-it-works', 'work', 'contact'];
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

    // Lock background scroll when mobile menu is open
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const html = document.documentElement;
        const body = document.body;
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = body.style.overflow;
        const prevBodyOverscroll = body.style.overscrollBehavior;

        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        body.style.overscrollBehavior = 'none';

        return () => {
            html.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
            body.style.overscrollBehavior = prevBodyOverscroll;
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (!isMobileMenuOpen) {
            setMobileServicesOpen(false);
        }
    }, [isMobileMenuOpen]);

    const navLinks = useMemo(() => [
        { label: 'About', href: '#about', id: 'about' },
        {
            label: 'Services',
            href: '#what-we-do',
            id: 'what-we-do',
            dropdown: [
                { label: 'Web Development', subText: 'Design & Build', href: '#services-tabs?tab=web' },
                { label: 'Smart Features', subText: 'Automate & Scale', href: '#services-tabs?tab=smart' },
                { label: 'Local Marketing', subText: 'Reach & Grow', href: '#services-tabs?tab=local' },
            ]
        },
        { label: 'Procedure', href: '#how-it-works', id: 'how-it-works' },
        { label: 'Work', href: '#work', id: 'work' },
        { label: 'Contact', href: '#contact', id: 'contact' },
    ], []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
                setMobileServicesOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToSection = (href) => {
        const [baseHref] = href.split('?');
        const element = document.querySelector(baseHref);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', href);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        }

        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        setMobileServicesOpen(false);
    };

    const horizontalPadding = isMobile ? '0%' : (isScrolled ? `${4 + scrollProgress * 8}%` : '0%');

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
                transition={{ duration: isMobile ? 0.45 : 1, ease: [0.16, 1, 0.3, 1] }}
                className="fixed z-50 w-full top-0"
                style={{
                    paddingLeft: horizontalPadding,
                    paddingRight: horizontalPadding,
                    paddingTop: isMobile ? (isScrolled ? '8px' : '0px') : (isScrolled ? '12px' : '0px'),
                    transition: 'padding 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <div
                    className={`relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${!isMobile ? 'nav-noise' : ''} ${isScrolled
                        ? isMobile
                            ? 'mx-3 rounded-xl bg-[#0a0f1c]/90 backdrop-blur-xl border border-white/10 py-2.5 shadow-[0_6px_30px_rgba(0,0,0,0.45)]'
                            : 'rounded-2xl bg-[#0a0f1c]/85 backdrop-blur-3xl shadow-[0_8px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] py-3'
                        : isMobile
                            ? 'rounded-none bg-gradient-to-b from-black/75 via-black/40 to-transparent py-3'
                            : 'rounded-none bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
                        }`}
                >
                    {/* Desktop-only high-cost visual layers */}
                    {isScrolled && !isMobile && (
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

                    {isScrolled && !isMobile && (
                        <motion.div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12"
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
                            />
                        </motion.div>
                    )}

                    <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4 pt-[max(env(safe-area-inset-top),0px)]' : 'px-6'} flex justify-between items-center relative z-10`}>
                        {/* Logo + Music */}
                        <div className="flex items-center gap-2.5">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-2.5 group cursor-pointer"
                            >
                                <AnimatedLogo size={isMobile ? (isScrolled ? 32 : 34) : (isScrolled ? 36 : 42)} />
                                {!isMobile && (
                                    <motion.span
                                        animate={{ opacity: isScrolled ? 0 : 1, width: isScrolled ? 0 : 'auto' }}
                                        transition={{ duration: 0.4 }}
                                        className="text-sm font-bold text-white/90 tracking-tight overflow-hidden whitespace-nowrap"
                                    >
                                        Creative WebFlow
                                    </motion.span>
                                )}
                            </a>
                            <MusicPlayer size={isMobile ? 14 : 16} />
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
                                                    <div className="absolute top-0 left-0 w-full h-4 pointer-events-auto" />
                                                    <div className="relative w-full py-2 bg-[#0a0f1c]/95 backdrop-blur-3xl border border-white/[0.08] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden nav-noise pointer-events-auto">
                                                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
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

                        {/* Desktop CTA */}
                        <MagneticWrapper strength={0.2} className="hidden lg:block">
                            <motion.button
                                onClick={() => scrollToSection('#contact')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] text-white overflow-hidden group"
                            >
                                <div
                                    className="absolute -inset-[1px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: 'conic-gradient(from 0deg, #06b6d4, #a855f7, #ec4899, #06b6d4)',
                                        animation: 'nav-gradient-rotate 3s linear infinite',
                                    }}
                                />
                                <div className="absolute inset-[1px] rounded-full bg-[#0a0f1c]/90 backdrop-blur-sm" />
                                <div className="absolute inset-[1px] rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -skew-x-12"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                                />
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
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            whileTap={{ scale: 0.94 }}
                            className="lg:hidden w-11 h-11 flex items-center justify-center border border-white/15 rounded-xl bg-black/20 hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-300"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}>
                                        <X size={18} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}>
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-black/94 backdrop-blur-xl lg:hidden will-change-transform"
                    >
                        <div className="h-full overflow-y-auto pt-[max(6rem,env(safe-area-inset-top))] pb-8 px-5">
                            <div className="max-w-md mx-auto">
                                <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <AnimatedLogo size={34} />
                                        <div>
                                            <p className="text-sm font-semibold text-white">Creative WebFlow</p>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Navigation</p>
                                        </div>
                                    </div>
                                    <MusicPlayer size={18} />
                                </div>

                                <div className="space-y-2">
                                    {navLinks.map((link) => (
                                        <div key={link.label}>
                                            {link.dropdown ? (
                                                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                                                    <button
                                                        onClick={() => setMobileServicesOpen((prev) => !prev)}
                                                        className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                                                    >
                                                        <span className={`text-sm font-bold uppercase tracking-[0.18em] ${activeSection === link.id ? 'text-cyan-400' : 'text-white/85'}`}>
                                                            {link.label}
                                                        </span>
                                                        <ChevronDown size={16} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-cyan-400' : 'text-white/50'}`} />
                                                    </button>
                                                    <AnimatePresence initial={false}>
                                                        {mobileServicesOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.22 }}
                                                                className="border-t border-white/10"
                                                            >
                                                                {link.dropdown.map((item) => (
                                                                    <button
                                                                        key={item.label}
                                                                        onClick={() => scrollToSection(item.href)}
                                                                        className="w-full px-4 py-3 text-left hover:bg-cyan-500/[0.08] transition-colors"
                                                                    >
                                                                        <div className="text-sm font-semibold text-white/85">{item.label}</div>
                                                                        {item.subText && <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/45">{item.subText}</div>}
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => scrollToSection(link.href)}
                                                    className={`w-full rounded-xl border px-4 py-3.5 text-left text-sm font-bold uppercase tracking-[0.18em] transition-colors ${activeSection === link.id
                                                        ? 'border-cyan-500/40 bg-cyan-500/[0.08] text-cyan-400'
                                                        : 'border-white/10 bg-white/[0.02] text-white/85 hover:text-cyan-400 hover:border-cyan-500/30'
                                                        }`}
                                                >
                                                    {link.label}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => scrollToSection('#contact')}
                                    className="w-full mt-6 px-5 py-3.5 rounded-xl text-sm font-bold uppercase tracking-[0.18em] text-white border border-cyan-500/35 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all"
                                >
                                    Start Project
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default React.memo(Navbar);
