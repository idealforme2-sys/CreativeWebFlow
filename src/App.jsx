import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Core Components
import WebGLBackground from './components/WebGLBackground';
import DigitalRain from './components/DigitalRain';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';

// Section Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfiniteMarquee from './components/InfiniteMarquee';
import AboutSection from './components/AboutSection';
import ServicesShowcase from './components/ServicesShowcase';
import WorkSection from './components/WorkSection';
import DetailedCaseStudies from './components/DetailedCaseStudies'; // New Component
import WhyChooseUs from './components/WhyChooseUs';
import ContactSection from './components/ContactSection';
import SocialProofSection from './components/SocialProofSection';
import Footer from './components/Footer';

// Interactive Features
import InSiteSpaceGame, { GameTriggerButton } from './components/InSiteSpaceGame';

function App() {
    const [loading, setLoading] = useState(true);
    const [gameActive, setGameActive] = useState(false);

    // Initialize Lenis smooth scrolling — cinematic feel
    useEffect(() => {
        if (loading) return;

        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.8,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Removed code that forces lenis.stop() on gameActive so user can play and scroll simultaneously

        return () => {
            lenis.destroy();
        };
    }, [loading, gameActive]);

    return (
        <div className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans cursor-none overflow-clip relative">
            {/* ═══ Dynamic Viewport Border Frame ═══ */}
            <div className="fixed inset-0 z-[100] pointer-events-none">
                {/* Static subtle border */}
                <div className="absolute inset-0 border border-white/[0.04]" />

                {/* Traveling light — top edge */}
                <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden">
                    <div className="absolute h-full w-[80px] animate-border-travel-h" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, #a855f7, transparent)' }} />
                </div>
                {/* Traveling light — bottom edge */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
                    <div className="absolute h-full w-[80px] animate-border-travel-h-rev" style={{ background: 'linear-gradient(90deg, transparent, #ec4899, #a855f7, transparent)', animationDelay: '3s' }} />
                </div>
                {/* Traveling light — left edge */}
                <div className="absolute top-0 left-0 h-full w-[2px] overflow-hidden">
                    <div className="absolute w-full h-[80px] animate-border-travel-v" style={{ background: 'linear-gradient(180deg, transparent, #a855f7, #06b6d4, transparent)', animationDelay: '1.5s' }} />
                </div>
                {/* Traveling light — right edge */}
                <div className="absolute top-0 right-0 h-full w-[2px] overflow-hidden">
                    <div className="absolute w-full h-[80px] animate-border-travel-v-rev" style={{ background: 'linear-gradient(180deg, transparent, #ec4899, #06b6d4, transparent)', animationDelay: '4.5s' }} />
                </div>

                {/* Corner glow dots */}
                <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-cyan-400/40 rounded-full" style={{ boxShadow: '0 0 6px rgba(6,182,212,0.5)' }} />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-purple-400/40 rounded-full" style={{ boxShadow: '0 0 6px rgba(168,85,247,0.5)' }} />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-purple-400/30 rounded-full" style={{ boxShadow: '0 0 6px rgba(168,85,247,0.4)' }} />
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-pink-400/30 rounded-full" style={{ boxShadow: '0 0 6px rgba(236,72,153,0.4)' }} />
            </div>
            <style>{`
                @keyframes border-travel-h {
                    0% { left: -80px; }
                    100% { left: 100%; }
                }
                @keyframes border-travel-h-rev {
                    0% { right: -80px; left: auto; }
                    100% { right: 100%; left: auto; }
                }
                @keyframes border-travel-v {
                    0% { top: -80px; }
                    100% { top: 100%; }
                }
                @keyframes border-travel-v-rev {
                    0% { bottom: -80px; top: auto; }
                    100% { bottom: 100%; top: auto; }
                }
                .animate-border-travel-h { animation: border-travel-h 6s linear infinite; }
                .animate-border-travel-h-rev { animation: border-travel-h-rev 6s linear infinite; }
                .animate-border-travel-v { animation: border-travel-v 6s linear infinite; }
                .animate-border-travel-v-rev { animation: border-travel-v-rev 6s linear infinite; }
            `}</style>
            {/* Custom Cursor */}
            <CustomCursor />

            {/* Preloader */}
            <AnimatePresence mode="wait">
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* Main Content */}
            {!loading && (
                <>
                    {/* Scroll Progress Bar */}
                    <ScrollProgress />

                    {/* WebGL Neon Background */}
                    <WebGLBackground />

                    {/* Matrix Digital Rain Effect */}
                    <DigitalRain />

                    {/* Navigation */}
                    <Navbar />

                    {/* Space Defender Game */}
                    <InSiteSpaceGame
                        isActive={gameActive}
                        onClose={() => setGameActive(false)}
                    />
                    <GameTriggerButton onClick={() => setGameActive(true)} />

                    {/* Main Content */}
                    <main className="relative z-10">
                        {/* Hero Section */}
                        <Hero />

                        {/* Content sections: Removed backdrop-blur-sm and changed bg-black/50 to bg-black/20 so the Digital Rain cyberpunk background shines through globally */}
                        <div className="relative z-20 bg-black/20 shadow-[0_-50px_100px_black]">
                            {/* Marquee Transition */}
                            <InfiniteMarquee />

                            {/* About Us (absorbs Mission content) */}
                            <AboutSection />

                            {/* Services — single interactive showcase */}
                            <ServicesShowcase />

                            {/* Portfolio */}
                            <WorkSection />

                            {/* Detailed Case Studies (Original Section) */}
                            <DetailedCaseStudies />

                            {/* Why Choose Us */}
                            <WhyChooseUs />

                            {/* Social Proof & Guarantees */}
                            <SocialProofSection />

                            {/* Contact */}
                            <ContactSection />

                            {/* Footer */}
                            <Footer />
                        </div>
                    </main>
                </>
            )}
        </div>
    );
}

export default App;
