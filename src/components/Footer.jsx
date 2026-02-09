import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        sitemap: [
            { label: 'Home', href: '#' },
            { label: 'About', href: '#about' },
            { label: 'Work', href: '#work' },
            { label: 'Contact', href: '#contact' }
        ],
        services: [
            { label: 'Web Development', href: '#web-development' },
            { label: 'App Development', href: '#app-development' },
            { label: 'Digital Marketing', href: '#digital-marketing' }
        ],
        socials: [
            { label: 'Twitter', href: '#' },
            { label: 'LinkedIn', href: '#' },
            { label: 'Instagram', href: '#' },
            { label: 'Dribbble', href: '#' }
        ],
        legal: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' }
        ]
    };

    const scrollToSection = (href) => {
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="relative bg-black pt-32 pb-8 border-t border-white/5 overflow-hidden">
            {/* Gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            {/* Background elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Large brand text with video animation */}
                <div className="text-center mb-20">
                    <div className="relative h-[15vw] md:h-[12vw] w-full overflow-hidden rounded-3xl">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src="https://cdn.magicui.design/ocean-small.webm" type="video/webm" />
                        </video>
                        <div
                            className="absolute inset-0 flex items-center justify-center text-[15vw] md:text-[12vw] font-black tracking-tighter"
                            style={{
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                                backgroundImage: 'inherit',
                                mixBlendMode: 'screen',
                            }}
                        >
                            <span
                                className="text-[15vw] md:text-[12vw] font-black tracking-tighter"
                                style={{
                                    WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                                    WebkitTextFillColor: 'transparent',
                                    filter: 'drop-shadow(0 0 30px rgba(6,182,212,0.3))',
                                }}
                            >
                                CREATIVE
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
                    {/* Sitemap */}
                    <div>
                        <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-6">Sitemap</h4>
                        <ul className="space-y-3">
                            {footerLinks.sitemap.map((link, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-6">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Office */}
                    <div>
                        <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-6">Office</h4>
                        <address className="not-italic text-gray-400 text-sm space-y-2">
                            <p className="pt-2">
                                <a href="mailto:hello@creativewebflow.com" className="hover:text-cyan-400 transition-colors">
                                    hello@creativewebflow.com
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border border-white/20 rounded-md flex items-center justify-center">
                            <Cpu size={14} className="text-white/60" />
                        </div>
                        <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                            Creative WebFlow Co.
                        </span>
                    </div>

                    {/* Copyright & Status */}
                    <div className="flex items-center gap-6 text-xs text-white/40">
                        <span>© {currentYear} All Rights Reserved</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>All Systems Operational</span>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div className="flex gap-6">
                        {footerLinks.legal.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="text-xs text-white/40 hover:text-cyan-400 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
