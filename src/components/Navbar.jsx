import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { GlitchText, MagneticButton } from './UIComponents';
import Logo from '../assets/logo-transparent.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
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

    // When scrolled: show compact pill navbar, expand on hover
    // When at top: show full-width navbar
    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => isScrolled && setIsExpanded(true)}
                onMouseLeave={() => { setIsExpanded(false); setActiveDropdown(null); }}
                className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
                        ? isExpanded
                            ? 'top-4 left-4 right-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 py-3'
                            : 'top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 py-2.5 px-4'
                        : 'top-0 left-0 right-0 py-6 bg-gradient-to-b from-black/80 to-transparent'
                    }`}
            >
                <div className={`flex items-center transition-all duration-700 ${isScrolled && !isExpanded
                        ? 'justify-center gap-4'
                        : 'max-w-7xl mx-auto px-6 justify-between'
                    }`}>
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex items-center gap-3 group cursor-pointer"
                    >
                        <div className={`relative flex items-center justify-center overflow-hidden transition-all duration-500 ${isScrolled && !isExpanded ? 'w-7 h-7' : 'w-10 h-10'
                            }`}>
                            <img src={Logo} alt="Creative WebFlow" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <AnimatePresence>
                            {(!isScrolled || isExpanded) && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="font-semibold text-sm uppercase tracking-[0.15em] text-white group-hover:text-cyan-400 transition-colors hidden sm:block overflow-hidden whitespace-nowrap"
                                >
                                    <GlitchText text="Creative WebFlow" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </a>

                    {/* Compact scrolled state: just logo + mini dots + CTA */}
                    {isScrolled && !isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hidden lg:flex items-center gap-2"
                        >
                            <div className="w-px h-4 bg-white/10 mx-1" />
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => scrollToSection(link.href)}
                                    className="w-2 h-2 rounded-full bg-white/30 hover:bg-cyan-400 transition-all duration-300 hover:scale-150"
                                    title={link.label}
                                />
                            ))}
                            <div className="w-px h-4 bg-white/10 mx-1" />
                            <button
                                onClick={() => scrollToSection('#contact')}
                                className="px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all duration-300"
                            >
                                Start
                            </button>
                        </motion.div>
                    )}

                    {/* Full desktop navigation - visible when not scrolled OR when expanded */}
                    <AnimatePresence>
                        {(!isScrolled || isExpanded) && (
                            <motion.div
                                initial={isScrolled ? { opacity: 0, y: -10 } : false}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="hidden lg:flex items-center gap-10"
                            >
                                {navLinks.map((link) => (
                                    <div key={link.label} className="relative group">
                                        {link.dropdown ? (
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                                                onMouseEnter={() => setActiveDropdown(link.label)}
                                                className="flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                                            >
                                                {link.label}
                                                <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => scrollToSection(link.href)}
                                                className="relative text-xs font-medium uppercase tracking-widest text-white/70 hover:text-white transition-colors group"
                                            >
                                                <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400">{">"}</span>
                                                {link.label}
                                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                                            </button>
                                        )}

                                        {/* Dropdown Menu */}
                                        {link.dropdown && (
                                            <AnimatePresence>
                                                {activeDropdown === link.label && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        transition={{ duration: 0.2 }}
                                                        onMouseLeave={() => setActiveDropdown(null)}
                                                        className="absolute top-full left-0 mt-4 w-48 py-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl"
                                                    >
                                                        {link.dropdown.map((item) => (
                                                            <button
                                                                key={item.label}
                                                                onClick={() => scrollToSection(item.href)}
                                                                className="w-full px-4 py-3 text-left text-xs uppercase tracking-wider text-white/60 hover:text-cyan-400 hover:bg-white/5 transition-all"
                                                            >
                                                                {item.label}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CTA Button - full nav only */}
                    <AnimatePresence>
                        {(!isScrolled || isExpanded) && (
                            <motion.div
                                initial={isScrolled ? { opacity: 0, scale: 0.8 } : false}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MagneticButton
                                    onClick={() => scrollToSection('#contact')}
                                    className="hidden lg:flex px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-400 hover:text-white transition-all duration-300"
                                >
                                    Start Project
                                </MagneticButton>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center border border-white/20 rounded-lg hover:border-cyan-400 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {link.dropdown ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <span className="text-2xl font-bold text-white/50">{link.label}</span>
                                            {link.dropdown.map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={() => scrollToSection(item.href)}
                                                    className="text-lg text-white/70 hover:text-cyan-400 transition-colors"
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => scrollToSection(link.href)}
                                            className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors"
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </motion.div>
                            ))}

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => scrollToSection('#contact')}
                                className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black rounded-full text-sm font-bold uppercase tracking-widest"
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
