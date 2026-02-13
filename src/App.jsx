import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Core Components
import WebGLBackground from './components/WebGLBackground';
import DigitalRain from './components/DigitalRain';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Section Components
import Navbar from './components/Navbar';
import ScrollSidebar from './components/ScrollSidebar';
import Hero from './components/Hero';
import InfiniteMarquee from './components/InfiniteMarquee';
import WhoWeHelp from './components/WhoWeHelp';
import AboutSection from './components/AboutSection';
import ProcessSection from './components/ProcessSection';
import WebDevSection from './components/WebDevSection';
import AppDevSection from './components/AppDevSection';
import MarketingSection from './components/MarketingSection';
import WorkSection from './components/WorkSection';
import WhyChooseUs from './components/WhyChooseUs';
import MissionSection from './components/MissionSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
    const [loading, setLoading] = useState(true);

    // Initialize Lenis smooth scrolling
    useEffect(() => {
        if (loading) return;

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
    }, [loading]);

    return (
        <div className="min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans cursor-none overflow-x-hidden">
            {/* Custom Cursor */}
            <CustomCursor />

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
                    <ScrollSidebar />

                    {/* Main Content */}
                    <main className="relative z-10">
                        {/* Hero Section */}
                        <Hero />

                        {/* Content with dark overlay for readability */}
                        <div className="relative z-20 bg-black/50 backdrop-blur-sm border-t border-white/10 shadow-[0_-50px_100px_black]">
                            {/* Marquee Transition */}
                            <InfiniteMarquee />

                            {/* Who We Help */}
                            <WhoWeHelp />

                            {/* About Us */}
                            <AboutSection />

                            {/* Our Process */}
                            <ProcessSection />

                            {/* Services */}
                            <div id="services">
                                <WebDevSection />
                                <AppDevSection />
                                <MarketingSection />
                            </div>

                            {/* Portfolio */}
                            <WorkSection />

                            {/* Why Choose Us */}
                            <WhyChooseUs />

                            {/* Our Mission */}
                            <MissionSection />

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
