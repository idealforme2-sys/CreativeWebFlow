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
import ProcessSection from './components/ProcessSection';
import ServicesShowcase from './components/ServicesShowcase';
import WorkSection from './components/WorkSection';
import DetailedCaseStudies from './components/DetailedCaseStudies';
import WhyChooseUs from './components/WhyChooseUs';
import ContactSection from './components/ContactSection';
import SocialProofSection from './components/SocialProofSection';
import Footer from './components/Footer';

// Interactive Features
import InSiteSpaceGame, { GameTriggerButton } from './components/InSiteSpaceGame';

function App() {
    const [loading, setLoading] = useState(true);
    const [gameActive, setGameActive] = useState(false);

    // Initialize Lenis smooth scrolling
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

        return () => {
            lenis.destroy();
        };
    }, [loading]);

    return (
        <div className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans cursor-none overflow-clip relative bg-[#030014]">
            {/* Dynamic Viewport Border */}
            <BorderFrame />

            {/* Custom Cursor */}
            <CustomCursor />

            {/* Global Backgrounds */}
            <WebGLBackground />
            <DigitalRain />

            {/* Preloader */}
            <AnimatePresence mode="wait">
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* Main Content */}
            {!loading && (
                <>
                    {/* Navigation Overlays */}
                    <Navbar />
                    <ScrollProgress />
                    <GameTriggerButton onClick={() => setGameActive(true)} />

                    <InSiteSpaceGame
                        isActive={gameActive}
                        onClose={() => setGameActive(false)}
                    />

                    <main className="relative z-10">
                        {/* Hero Section */}
                        <Hero />

                        {/* Content sections Container */}
                        <div className="relative z-20 bg-black/20 shadow-[0_-50px_100px_black]">
                            <InfiniteMarquee />
                            <AboutSection />
                            <ProcessSection />
                            <ServicesShowcase />
                            <WorkSection />
                            <DetailedCaseStudies />
                            <WhyChooseUs />
                            <SocialProofSection />
                            <ContactSection />
                            <Footer />
                        </div>
                    </main>
                </>
            )}
        </div>
    );
}

export default App;
