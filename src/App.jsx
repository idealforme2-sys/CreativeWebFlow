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
import ProcessSection from './components/ProcessSection';
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

        // Pause smooth scroll when game is active
        if (gameActive) {
            lenis.stop();
        }

        return () => {
            lenis.destroy();
        };
    }, [loading, gameActive]);

    return (
        <div className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans cursor-none overflow-clip relative">
            {/* Animated App Border — color-cycling gradient */}
            <div
                className="fixed inset-0 z-[100] pointer-events-none"
                style={{
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderImage: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899, #06b6d4, #a855f7) 1',
                    animation: 'app-border-cycle 6s linear infinite',
                }}
            />
            <style>{`
                @keyframes app-border-cycle {
                    0% { border-image-source: linear-gradient(0deg, #06b6d4, #a855f7, #ec4899, #06b6d4); }
                    25% { border-image-source: linear-gradient(90deg, #a855f7, #ec4899, #06b6d4, #a855f7); }
                    50% { border-image-source: linear-gradient(180deg, #ec4899, #06b6d4, #a855f7, #ec4899); }
                    75% { border-image-source: linear-gradient(270deg, #06b6d4, #ec4899, #a855f7, #06b6d4); }
                    100% { border-image-source: linear-gradient(360deg, #06b6d4, #a855f7, #ec4899, #06b6d4); }
                }
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

                        {/* Content sections */}
                        <div className="relative z-20 bg-black/50 backdrop-blur-sm border-t border-white/10 shadow-[0_-50px_100px_black]">
                            {/* Marquee Transition */}
                            <InfiniteMarquee />

                            {/* About Us (absorbs Mission content) */}
                            <AboutSection />

                            {/* Our Process */}
                            <ProcessSection />

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
