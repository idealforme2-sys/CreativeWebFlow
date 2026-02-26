import React, { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TechHUD from './TechHUD';
import { MagneticWrapper } from './UIComponents';
import { Meteors } from './magicui/Meteors';
import { LineShadowText } from './magicui/LineShadowText';

const MorphGrid = ({ lite = false }) => (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${lite ? 'opacity-[0.04]' : 'opacity-[0.07]'}`}>
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: lite ? '72px 72px' : '60px 60px',
                transform: 'perspective(500px) rotateX(35deg) scale(2.0) translateY(-5%)',
                maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent)',
            }}
        />
    </div>
);

const FloatingOrbs = ({ lite = false }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <style>{`
            @keyframes floatOrb1 {
                0%, 100% { transform: translate(0, 0); }
                33% { transform: translate(50px, -40px); }
                66% { transform: translate(-25px, 20px); }
            }
            @keyframes floatOrb2 {
                0%, 100% { transform: translate(0, 0); }
                33% { transform: translate(-60px, 30px); }
                66% { transform: translate(30px, -50px); }
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `}</style>
        <div
            className="absolute top-1/4 left-[15%] rounded-full"
            style={{
                width: lite ? 280 : 400,
                height: lite ? 280 : 400,
                background: 'radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 60%)',
                animation: 'floatOrb1 25s ease-in-out infinite',
            }}
        />
        <div
            className="absolute top-1/3 right-[10%] rounded-full"
            style={{
                width: lite ? 260 : 350,
                height: lite ? 260 : 350,
                background: 'radial-gradient(circle at center, rgba(168,85,247,0.15) 0%, transparent 60%)',
                animation: 'floatOrb2 30s ease-in-out infinite',
            }}
        />
    </div>
);

const CompactMetric = ({ icon, value, label, color }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/30 hover:border-white/50 hover:bg-slate-800/80 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <span className="text-sm">{icon}</span>
        <span className={`text-sm font-semibold ${color}`}>{value}</span>
        <span className="text-xs text-white/50">{label}</span>
    </div>
);

const PrimaryCTA = ({ onClick, isLiteMode = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const button = (
        <motion.button
            className="relative group cursor-pointer overflow-hidden rounded-full px-8 py-3.5"
            onMouseEnter={isLiteMode ? undefined : () => setIsHovered(true)}
            onMouseLeave={isLiteMode ? undefined : () => setIsHovered(false)}
            onClick={onClick}
            whileHover={isLiteMode ? undefined : { scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
                background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #ec4899)',
                backgroundSize: '300% 100%',
                animation: 'pulseBackground 4s linear infinite',
            }}
        >
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent -skew-x-12 pointer-events-none"
                style={{ animation: isLiteMode ? undefined : 'shimmerSweep 5.5s linear infinite' }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
                <span className={`text-cyan-200 transition-transform duration-500 ${isHovered ? 'rotate-[360deg]' : ''}`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L4 7l8 5 8-5-8-5z" />
                        <path d="M4 12l8 5 8-5" />
                        <path d="M4 17l8 5 8-5" />
                    </svg>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Get More Customers
                </span>
                <span className={`text-purple-200 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                    &#8594;
                </span>
            </span>
        </motion.button>
    );

    return isLiteMode ? button : <MagneticWrapper strength={0.2}>{button}</MagneticWrapper>;
};

const SecondaryCTA = ({ onClick, isLiteMode = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const button = (
        <motion.a
            href="#work"
            onClick={onClick}
            className="relative group block rounded-full"
            onMouseEnter={isLiteMode ? undefined : () => setIsHovered(true)}
            onMouseLeave={isLiteMode ? undefined : () => setIsHovered(false)}
            whileHover={isLiteMode ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(6,182,212,0.4), rgba(168,85,247,0.4), rgba(236,72,153,0.4))',
                boxShadow: isHovered ? '0 0 25px rgba(6,182,212,0.5), 0 0 50px rgba(168,85,247,0.3)' : 'none',
                transition: 'box-shadow 0.3s ease'
            }}
        >
            <div className="rounded-full bg-black/85 backdrop-blur-md px-6 py-3 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12 pointer-events-none"
                    style={{ animation: isLiteMode ? undefined : 'shimmerSweep 6s linear infinite' }}
                />
                <div className="relative z-10 flex items-center gap-2">
                    <svg
                        className={`w-4 h-4 text-white/60 transition-all duration-300 ${isHovered ? 'text-cyan-400 scale-110' : ''}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="text-sm font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                        View Our Work
                    </span>
                </div>
            </div>
        </motion.a>
    );

    return isLiteMode ? button : <MagneticWrapper strength={0.2}>{button}</MagneticWrapper>;
};

const Hero = ({ isMobile = false }) => {
    const isLiteMode = isMobile;

    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 600], [0, isLiteMode ? 36 : 100]);
    const headingOpacity = useTransform(scrollY, [0, isLiteMode ? 280 : 400], [1, isLiteMode ? 0.35 : 0]);
    const headingScale = useTransform(scrollY, [0, isLiteMode ? 280 : 400], [1, isLiteMode ? 0.98 : 0.95]);

    const rotatingWords = useMemo(() => [
        { text: 'customers', gradient: 'from-cyan-400 via-blue-400 to-cyan-300' },
        { text: 'bookings', gradient: 'from-purple-400 via-violet-400 to-purple-300' },
        { text: 'calls', gradient: 'from-pink-400 via-rose-400 to-pink-300' },
        { text: 'growth', gradient: 'from-emerald-400 via-teal-400 to-emerald-300' },
        { text: 'results', gradient: 'from-amber-400 via-orange-400 to-amber-300' },
    ], []);

    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, isLiteMode ? 3800 : 3000);
        return () => clearInterval(interval);
    }, [isLiteMode, rotatingWords.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: isLiteMode
                ? { duration: 0.4 }
                : { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: isLiteMode ? 20 : 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: isLiteMode ? 0.5 : 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className={`relative min-h-screen flex flex-col justify-center items-center overflow-hidden ${isMobile ? 'pt-28 pb-14' : 'pt-24 pb-12'}`}>
            <style>{`
                @keyframes text-shine {
                    0% { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
                .animate-text-shine {
                    animation: text-shine 4s linear infinite;
                }
                @keyframes shimmerSweep {
                    0% { transform: translateX(-200%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
            `}</style>

            <MorphGrid lite={isLiteMode} />
            {!isLiteMode && <FloatingOrbs />}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {isLiteMode ? (
                    <Meteors number={16} className="opacity-50" />
                ) : (
                    <>
                        <Meteors number={50} />
                        <Meteors number={30} className="opacity-60" />
                        <Meteors number={24} className="opacity-35" />
                        <div className="absolute bottom-0 left-0 w-[55vw] h-[35vh]">
                            <Meteors number={18} className="opacity-70" />
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40vw] h-[28vh]">
                            <Meteors number={14} className="opacity-55" />
                        </div>
                    </>
                )}
            </div>
            {!isLiteMode && <TechHUD />}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.04)_0%,transparent_50%)] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial={isLiteMode ? false : 'hidden'}
                animate="visible"
                className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center"
            >
                <motion.div variants={itemVariants}>
                    <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-cyan-500/20">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-purple-300">
                            Available for Projects
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mb-3 relative z-20"
                    style={{ y: bgY, opacity: headingOpacity, scale: headingScale }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.1] text-white">
                        <span className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.2)' }}>
                            Websites that
                        </span>
                        <br />
                        <span className="relative inline-block mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.2)' }}>
                            bring you
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className={`relative ${isMobile ? 'mb-10 h-[1.2em]' : 'mb-14 h-[1.3em]'}`}
                    style={{ y: bgY, opacity: headingOpacity, scale: headingScale }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.3] px-4 -mx-4 overflow-visible">
                        <span className="relative drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.2)' }}>more </span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentWordIndex}
                                initial={{ y: 24, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -24, opacity: 0 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block px-3 -mx-3 pr-8"
                            >
                                <LineShadowText shadowColor="rgba(255,255,255,0.35)" className={`italic pr-2 text-transparent bg-clip-text bg-gradient-to-r ${rotatingWords[currentWordIndex].gradient}`}>
                                    {rotatingWords[currentWordIndex].text}
                                </LineShadowText>
                            </motion.span>
                        </AnimatePresence>
                    </h1>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8 leading-relaxed text-white/70"
                >
                    We design and build high-performance websites for local businesses
                    that turn visitors into <span className="text-cyan-400 font-semibold" style={{ textShadow: '0 0 12px rgba(6,182,212,0.5)' }}>real customers</span>.
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-center gap-3 mb-10"
                >
                    <CompactMetric icon="⚡" value="0.8s" label="load" color="text-cyan-400" />
                    <CompactMetric icon="📱" value="100%" label="mobile" color="text-purple-400" />
                    <CompactMetric icon="📈" value="340%" label="ROI" color="text-pink-400" />
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center gap-4 justify-center"
                >
                    <PrimaryCTA isLiteMode={isLiteMode} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
                    <SecondaryCTA
                        isLiteMode={isLiteMode}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    />
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-12 flex items-center gap-3"
                >
                    <div className="flex -space-x-2">
                        {['bg-gradient-to-br from-cyan-400 to-blue-500', 'bg-gradient-to-br from-purple-400 to-pink-500', 'bg-gradient-to-br from-emerald-400 to-teal-500'].map((bg, i) => (
                            <div key={i} className={`w-7 h-7 rounded-full ${bg} border-2 border-black flex items-center justify-center text-white text-[9px] font-bold`}>
                                {['CW', 'JD', 'MR'][i]}
                            </div>
                        ))}
                    </div>
                    <div className="text-sm font-semibold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
                        <span className="text-white hover:text-cyan-400 transition-colors">Trusted by local businesses</span>
                        <span className="mx-2 text-cyan-400">&#183;</span>
                        <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">&#9733; 5.0</span>
                    </div>
                </motion.div>
            </motion.div>

            {!isLiteMode && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center z-20"
                >
                    <div className="flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Scroll</span>
                        <div className="w-px h-10 bg-gradient-to-b from-cyan-500/50 via-white/20 to-transparent" />
                    </div>
                </motion.div>
            )}

            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </section>
    );
};

export default React.memo(Hero);
