import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Core Components
import WebGLBackground from './components/WebGLBackground';
import DigitalRain from './components/DigitalRain';
import CustomCursor from './components/CustomCursor';
import StatusHUD from './components/StatusHUD';
import Preloader from './components/Preloader';
import InSiteSpaceGame, { GameTriggerButton } from './components/InSiteSpaceGame';

// Section Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfiniteMarquee from './components/InfiniteMarquee';
import AboutSection from './components/AboutSection';
import WebDevSection from './components/WebDevSection';
import AppDevSection from './components/AppDevSection';
import MarketingSection from './components/MarketingSection';
import ShaderFeatureCards from './components/ShaderFeatureCards';
import WorkSection from './components/WorkSection';
import WheelGallery from './components/WheelGallery';
import StackedCarousel from './components/StackedCarousel';
import ExperienceSection from './components/ExperienceSection';
import StackSection from './components/StackSection';
import MissionSection from './components/MissionSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
    const [loading, setLoading] = useState(true);
    const [gameActive, setGameActive] = useState(false);

    // Initialize Lenis smooth scrolling
    useEffect(() => {
        if (loading || gameActive) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [loading, gameActive]);

    return (
        <div className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans cursor-none overflow-x-hidden">
            {/* Custom Cursor */}
            <CustomCursor />

            {/* Status HUD (bottom right) */}
            <StatusHUD />

            {/* In-Site Space Game - Plays on top of website */}
            <InSiteSpaceGame isActive={gameActive} onClose={() => setGameActive(false)} />

            {/* Game Trigger Button */}
            {!loading && !gameActive && (
                <GameTriggerButton onClick={() => setGameActive(true)} />
            )}

            {/* Preloader */}
            <AnimatePresence mode="wait">
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {/* Main Content */}
            {!loading && (
                <>
                    {/* WebGL Neon Background */}
                    <WebGLBackground />

                    {/* Matrix Digital Rain Effect */}
                    <DigitalRain />

                    {/* Navigation */}
                    <Navbar />

                    {/* Main Content */}
                    <main className="relative z-10">
                        {/* Hero Section */}
                        <Hero />

                        {/* Content with dark overlay for readability */}
                        <div className="relative z-20 bg-black/50 backdrop-blur-sm border-t border-white/10 shadow-[0_-50px_100px_black]">
                            {/* Marquee Transition */}
                            <InfiniteMarquee />

                            {/* About Section */}
                            <AboutSection />

                            {/* Services Sections */}
                            <div id="services">
                                <WebDevSection />
                                <AppDevSection />
                                <MarketingSection />
                            </div>

                            {/* Shader Feature Cards */}
                            <ShaderFeatureCards />

                            {/* Work/Portfolio Section */}
                            <WorkSection />

                            {/* Wheel Gallery */}
                            <WheelGallery />

                            {/* DesignStudio-style Stacked Carousel */}
                            <StackedCarousel />

                            {/* MagicUI Demonstration Section */}
                            <ExperienceSection />

                            {/* Tech Stack Section */}
                            <StackSection />

                            {/* Mission Section */}
                            <MissionSection />

                            {/* Contact Section */}
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
