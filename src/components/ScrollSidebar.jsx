import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, User, Briefcase, FolderOpen, Target, Mail } from 'lucide-react';

const ScrollSidebar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const sections = [
        { id: 'hero', label: 'Home', icon: Home, href: '#' },
        { id: 'about', label: 'About', icon: User, href: '#about' },
        { id: 'services', label: 'Services', icon: Briefcase, href: '#services' },
        { id: 'work', label: 'Work', icon: FolderOpen, href: '#work' },
        { id: 'mission', label: 'Mission', icon: Target, href: '#mission' },
        { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
    ];

    // Show sidebar after scrolling past hero
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (href) => {
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -80, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center"
                >
                    {/* Sidebar */}
                    <motion.div
                        animate={{ width: isExpanded ? 160 : 56 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={() => setIsExpanded(true)}
                        onMouseLeave={() => setIsExpanded(false)}
                        className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-r-2xl py-4 px-2 flex flex-col gap-1 shadow-2xl shadow-black/50 overflow-hidden"
                    >
                        {/* Progress indicator line */}
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/5">
                            <motion.div
                                className="w-full bg-gradient-to-b from-cyan-400 to-purple-500"
                                style={{
                                    height: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {sections.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.id;

                            return (
                                <motion.button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.href)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer group ${isActive
                                            ? 'bg-cyan-500/10 text-cyan-400'
                                            : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                                        }`}
                                >
                                    {/* Active dot */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeDot"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-cyan-400 rounded-r"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}

                                    <Icon size={18} className="flex-shrink-0" />

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-[11px] font-medium uppercase tracking-wider whitespace-nowrap"
                                            >
                                                {section.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            );
                        })}

                        {/* Toggle hint */}
                        <div className="mt-2 pt-2 border-t border-white/5 flex justify-center">
                            <motion.div
                                animate={{ x: isExpanded ? 0 : [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: isExpanded ? 0 : Infinity }}
                                className="text-white/20"
                            >
                                {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollSidebar;
