import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TechHUD from './TechHUD';
import { RainbowButton } from './MagicUI';

const Hero = () => {
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 600], [0, 100]);
    const headingOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    // Rotating words with their colors
    const rotatingWords = [
        { text: 'customers', color: 'text-cyan-400' },
        { text: 'bookings', color: 'text-purple-400' },
        { text: 'calls', color: 'text-pink-400' },
        { text: 'growth', color: 'text-emerald-400' },
        { text: 'results', color: 'text-amber-400' },
    ];

    // Simple word rotation using framer motion
    const [currentWordIndex, setCurrentWordIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
            <TechHUD />

            {/* Hero Content */}
            <div className="relative z-10 text-center px-6 max-w-5xl">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-[0.25em]">
                        Available for Projects
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.div
                    className="mb-3"
                    style={{ y: bgY, opacity: headingOpacity }}
                >
                    <motion.h1
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.1] text-white"
                    >
                        Websites that bring you
                    </motion.h1>
                </motion.div>

                {/* Rotating Word - Separate from headline for clean animation */}
                <motion.div
                    className="mb-16 h-[1.3em]"
                    style={{ y: bgY, opacity: headingOpacity }}
                >
                    <motion.h1
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.1]"
                    >
                        <span className="text-white">more </span>
                        <motion.span
                            key={currentWordIndex}
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className={`inline-block ${rotatingWords[currentWordIndex].color}`}
                        >
                            {rotatingWords[currentWordIndex].text}
                        </motion.span>
                    </motion.h1>
                </motion.div>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-6 mt-8 leading-relaxed"
                >
                    We design and build high-performance websites for local businesses
                    that turn visitors into{' '}
                    <span className="text-white font-medium">real customers</span>.
                </motion.p>

                {/* Trust Line */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex items-center justify-center gap-6 text-sm text-white/40 mb-10"
                >
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        Fast Loading
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Mobile-First
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                        Built to Convert
                    </span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <RainbowButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        <span className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]">
                            Get More Customers
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </span>
                    </RainbowButton>

                    <motion.a
                        href="#work"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        whileHover={{ scale: 1.03, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-3.5 border border-white/20 text-white rounded-full text-sm font-bold uppercase tracking-[0.12em] hover:text-cyan-400 transition-all duration-500 backdrop-blur-sm"
                    >
                        View Our Work
                    </motion.a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-12"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Scroll</span>
                        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </section>
    );
};

export default Hero;
