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
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Section Components - Lazy loaded for performance (below fold)
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

const SectionShell = ({ children }) => (
    <div>{children}</div>
);

function App() {
    const detectMobile = () => {
        if (typeof window === 'undefined') return false;
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const smallViewport = window.matchMedia('(max-width: 1023px)').matches;
        return coarsePointer || smallViewport;
    };

    const detectLowPower = (mobile) => {
        if (typeof navigator === 'undefined') return mobile;
        const cores = navigator.hardwareConcurrency || 4;
        const memory = navigator.deviceMemory || 4;
        if (cores <= 4 || memory <= 4) return true;
        if (mobile && (cores <= 6 || memory <= 6)) return true;
        return false;
    };

    const initialMobile = detectMobile();
    const [loading, setLoading] = useState(!initialMobile);
    const [gameActive, setGameActive] = useState(false);
    const [isMobileDevice, setIsMobileDevice] = useState(initialMobile);
    const [isLowPowerDevice, setIsLowPowerDevice] = useState(detectLowPower(initialMobile));

    // Device capability detection for mobile-first behavior tuning
    useEffect(() => {
        const checkDevice = () => {
            const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const smallViewport = window.matchMedia('(max-width: 1023px)').matches;
            const mobile = coarsePointer || smallViewport;
            setIsMobileDevice(mobile);
            setIsLowPowerDevice(detectLowPower(mobile));
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Skip heavy preloader on mobile for faster first interaction
    useEffect(() => {
        if (!isMobileDevice) return;
        setLoading(false);
    }, [isMobileDevice]);

    // Initialize Lenis smooth scrolling only on non-mobile devices
    useEffect(() => {
        if (loading || isMobileDevice) return;

        const lenis = new Lenis({
            duration: 1.25,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
        });

        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        const handleMouseMove = (e) => {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth <= 0) return;
            const overScrollbar = e.clientX >= window.innerWidth - scrollbarWidth;
            lenis.options.smoothWheel = !overScrollbar;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [loading, isMobileDevice]);

    // Lock page scroll while gameplay overlay is active (desktop + mobile)
    useEffect(() => {
        if (!gameActive) return;

        const html = document.documentElement;
        const body = document.body;
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = body.style.overflow;
        const prevBodyTouchAction = body.style.touchAction;
        const prevBodyOverscroll = body.style.overscrollBehavior;

        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        body.style.touchAction = 'none';
        body.style.overscrollBehavior = 'none';

        return () => {
            html.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
            body.style.touchAction = prevBodyTouchAction;
            body.style.overscrollBehavior = prevBodyOverscroll;
        };
    }, [gameActive]);

    return (
        <div className={`min-h-screen text-white selection:bg-cyan-500/30 selection:text-cyan-100 font-sans overflow-clip relative bg-[#030014] ${isMobileDevice ? 'cursor-auto' : 'cursor-none'}`}>
            {/* Dynamic Viewport Border */}
            {!isMobileDevice && <BorderFrame paused={gameActive} />}

            {/* Custom Cursor */}
            {!isMobileDevice && <CustomCursor />}

            {/* Global Backgrounds */}
            {!isMobileDevice && <WebGLBackground lowPower={isLowPowerDevice} paused={gameActive} />}
            <DigitalRain lowPower={isLowPowerDevice} paused={gameActive} />

            {/* Preloader */}
            {!isMobileDevice && (
                <AnimatePresence mode="wait">
                    {loading && <Preloader onComplete={() => setLoading(false)} />}
                </AnimatePresence>
            )}

            {/* Main Content */}
            {!loading && (
                <>
                    <Navbar isMobile={isMobileDevice} />
                    {!isMobileDevice && <ScrollProgress />}
                    <GameTriggerButton onClick={() => setGameActive(true)} isMobile={isMobileDevice} />

                    <InSiteSpaceGame
                        isActive={gameActive}
                        onClose={() => setGameActive(false)}
                        isMobile={isMobileDevice}
                    />

                    <main className="relative z-10">
                        <Hero isMobile={isMobileDevice} />

                        {/* Content sections - below fold, lazy loaded */}
                        <div className="relative z-20 bg-black/30 md:bg-black/20 shadow-[0_-20px_40px_black] md:shadow-[0_-50px_100px_black]">
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <InfiniteMarquee />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <AboutSection isMobile={isMobileDevice} />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <ProcessSection isMobile={isMobileDevice} />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <ServicesShowcase isMobile={isMobileDevice} />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <WorkSection isMobile={isMobileDevice} />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <DetailedCaseStudies isMobile={isMobileDevice} />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <WhyChooseUs isMobile={isMobileDevice} />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <SocialProofSection isMobile={isMobileDevice} />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <ContactSection isMobile={isMobileDevice} />
                                </Suspense>
                            </SectionShell>
                            <SectionShell>
                                <Suspense fallback={<SectionFallback />}>
                                    <Footer />
                                </Suspense>
                            </SectionShell>
                        </div>
                    </main>
                </>
            )}
        </div>
    );
}

export default App;
