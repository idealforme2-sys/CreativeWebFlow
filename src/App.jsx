import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

// Core Components (keep in main bundle for above-fold)
import WebGLBackground from './components/WebGLBackground';
import DigitalRain from './components/DigitalRain';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import BorderFrame from './components/BorderFrame';
import ScrollProgress from './components/ScrollProgress';

// Section Components - Lazy loaded for performance (below fold)
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const InfiniteMarquee = lazy(() => import('./components/InfiniteMarquee'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ProcessSection = lazy(() => import('./components/ProcessSection'));
const ServicesShowcase = lazy(() => import('./components/ServicesShowcase'));
const WorkSection = lazy(() => import('./components/WorkSection'));
const DetailedCaseStudies = lazy(() => import('./components/DetailedCaseStudies'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const SocialProofSection = lazy(() => import('./components/SocialProofSection'));
const Footer = lazy(() => import('./components/Footer'));

// Interactive Features
import InSiteSpaceGame, { GameTriggerButton } from './components/InSiteSpaceGame';

// Minimal fallback for lazy sections
const SectionFallback = () => (
    <div className="w-full h-96 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
);

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
                    {/* Navigation - Suspense wrapped with minimal fallback */}
                    <Suspense fallback={<div className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/80 backdrop-blur-md border-b border-white/10"></div>}>
                        <Navbar />
                    </Suspense>
                    <ScrollProgress />
                    <GameTriggerButton onClick={() => setGameActive(true)} />

                    <InSiteSpaceGame
                        isActive={gameActive}
                        onClose={() => setGameActive(false)}
                    />

                    <main className="relative z-10">
                        {/* Hero Section */}
                        <Suspense fallback={<SectionFallback />}>
                            <Hero />
                        </Suspense>

                        {/* Content sections - below fold, lazy loaded */}
                        <div className="relative z-20 bg-black/20 shadow-[0_-50px_100px_black]">
                            <Suspense fallback={<SectionFallback />}>
                                <InfiniteMarquee />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <AboutSection />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <ProcessSection />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <ServicesShowcase />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <WorkSection />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <DetailedCaseStudies />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <WhyChooseUs />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <SocialProofSection />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <ContactSection />
                            </Suspense>
                            <Suspense fallback={<SectionFallback />}>
                                <Footer />
                            </Suspense>
                        </div>
                    </main>
                </>
            )}
        </div>
    );
}

export default App;
