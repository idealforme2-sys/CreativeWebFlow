import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Core Components
import WebGLBackground from './components/WebGLBackground';
import DigitalRain from './components/DigitalRain';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import BorderFrame from './components/BorderFrame';
import ScrollProgress from './components/ScrollProgress';

// Section Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfiniteMarquee from './components/InfiniteMarquee';
import AboutSection from './components/AboutSection';
import ProcessSection from './components/ProcessSection'; // Restored Missing Section
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
            {/* Dynamic Viewport Border */}
            <BorderFrame />
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

                            {/* Restored: Process/Methodology (Horizontal Scroll) */}
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
