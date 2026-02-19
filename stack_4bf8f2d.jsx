import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Code, Smartphone, Palette, MousePointer2 } from 'lucide-react';

const StackedCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const cards = [
        {
            id: 1,
            title: "Web Development",
            subtitle: "Featured Service",
            description: "Next-gen digital solutions crafting immersive experiences.",
            icon: Code,
            gradient: "from-purple-600/30 to-cyan-500/20",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdKwQu2IMv4qDs3VnMHvVB3RHOxXd2eTYi6u5ooWuWdYX8TVUv6gXcL7w16M18x-fk8Q5FmXV1LCcTRvUpSXyqotOitYr8gI-X5S5NgrSxe6gbWMLJ-TP0ws_lqOx7pC2RKOyf7YIXp1wl0dZZ4oxUM3uE11f18IccXiqSIk0WT9Efe8k4HaOiR3FIah47YmT76okGYvW7WxZKhIRx8o6pp_2e0AblBmEInwbLW9k7pbD4rTm7IrZyASNt0W272UgzpG4GzHiXGPc"
        },
        {
            id: 2,
            title: "Brand Identity",
            subtitle: "Complete visual systems",
            description: "Create memorable brand experiences that resonate.",
            icon: Palette,
            gradient: "from-pink-600/30 to-purple-500/20",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCV_IDQBpUbVVuwyTz4U63CC02dsSsJFujamrKE2CZxgKi4UHgIuL6pEZciwDA2FroFFhnDlH_J-VcjcGOIAWiMXZ3YYwcZS0enA7flifHk3PsgiQHDiHaPXfWi71J3LUJ_Y_ZknsNOcoEcyPfZCK5wmmM1wgcYoFfwwY6BeQNoV6uZMm2yolw5yCsRT5rc_xkH8LvZZur3qF7yZUzsXh8y0YFxnwKqrLCxybknp4-D2dU4fabvgwODPt6e42_ztN01LxSUHwmXpg"
        },
        {
            id: 3,
            title: "Mobile Apps",
            subtitle: "Native & Cross-platform",
            description: "Seamless mobile experiences for iOS and Android.",
            icon: Smartphone,
            gradient: "from-cyan-600/30 to-blue-500/20",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMSpNERTeiNi-48tnrKMGlv_zuOme3EB07WD4dkJDdLdQYJT2KeF802gGkpgJNqd8H_tN4N0s-VnjdubOQDYuMRlA-ECQaHzHQf0zlD09Pc0ai6Bat3crqz8doX4Mm4Tlz0AUYvBfAPwgrEGSoODhJjR3TYiZjM5p5q-mBM1WJvRifbXu-qRmlz0oo4RmH6LHC89Q9NHUNnbFYjTrPtDjaVDs0Yc0mV6yfToi_r_C43YkNupIb3dzZxNd1TpEry-okosgBIOTPi_4"
        },
        {
            id: 4,
            title: "UX Strategy",
            subtitle: "User-Centered Design",
            description: "Thinking beyond the pixel to solve real problems.",
            icon: MousePointer2,
            gradient: "from-orange-600/30 to-red-500/20",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=800&fit=crop"
        }
    ];

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    };

    const getCardStyle = (position) => {
        // position 0: back (far), 1: middle, 2: front (active)
        const styles = {
            0: {
                x: isHovered ? -80 : -60,
                z: -100,
                rotateZ: isHovered ? -8 : -5,
                opacity: 0.6,
                filter: 'blur(2px)',
                scale: 0.9,
                zIndex: 10
            },
            1: {
                x: isHovered ? -40 : -30,
                z: -50,
                rotateZ: isHovered ? -4 : -2.5,
                opacity: 0.8,
                filter: 'blur(1px)',
                scale: 0.95,
                zIndex: 20
            },
            2: {
                x: 0,
                z: 0,
                rotateZ: 0,
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
                zIndex: 30
            }
        };
        return styles[position];
    };

    // We want to show 3 cards. The active card is at position 2 (front).
    // The next card is at position 1 (hidden slightly behind).
    // The card after that is at position 0 (hidden more behind).
    const getVisibleCards = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (activeIndex + i) % cards.length;
            visible.push({ ...cards[index], position: 2 - i });
        }
        return visible;
    };

    return (
        <section className="relative py-32 lg:py-48 overflow-hidden bg-[#030014]">
            {/* Background Port */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] mb-4"
                    >
                        Our Services
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
                    >
                        Design{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                            Studio
                        </span>
                    </motion.h2>
                </div>

                <div className="relative flex items-center justify-center min-h-[550px]">
                    <button
                        onClick={handlePrev}
                        className="hidden md:flex absolute left-0 lg:left-12 z-50 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full items-center justify-center hover:bg-white/10 transition-all hover:scale-110 group"
                    >
                        <ChevronLeft className="text-white group-hover:text-cyan-400" size={32} />
                    </button>

                    <button
                        onClick={handleNext}
                        className="hidden md:flex absolute right-0 lg:right-12 z-50 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full items-center justify-center hover:bg-white/10 transition-all hover:scale-110 group"
                    >
                        <ChevronRight className="text-white group-hover:text-cyan-400" size={32} />
                    </button>

                    <div
                        className="relative w-[380px] h-[500px]"
                        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <AnimatePresence initial={false}>
                            {getVisibleCards().map((card) => {
                                const style = getCardStyle(card.position);
                                const isFront = card.position === 2;
                                const Icon = card.icon;

                                return (
                                    <motion.div
                                        key={card.id}
                                        initial={{ opacity: 0, x: 50, z: -50 }}
                                        animate={{
                                            x: style.x,
                                            z: style.z,
                                            rotateZ: style.rotateZ,
                                            opacity: style.opacity,
                                            filter: style.filter,
                                            scale: style.scale,
                                            zIndex: style.zIndex
                                        }}
                                        exit={{ opacity: 0, x: -100, z: -100, rotateZ: -10 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                        className="absolute inset-0 w-full h-full"
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            transformOrigin: 'center bottom',
                                        }}
                                    >
                                        <div className={`
                                            relative w-full h-full rounded-[2rem] overflow-hidden border transition-all duration-500
                                            ${isFront ?
                                                'bg-slate-900/40 backdrop-blur-xl border-white/10 ring-1 ring-white/20 shadow-[0_0_40px_-10px_rgba(112,0,255,0.5)]' :
                                                'bg-slate-950 border-white/20 shadow-2xl'}
                                        `}>
                                            <div className="absolute inset-0 z-0">
                                                <img src={card.image} alt="" className={`w-full h-full object-cover ${isFront ? 'opacity-80 mix-blend-overlay' : 'opacity-60'}`} />
                                                {isFront && (
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} mix-blend-color-dodge`} />
                                                )}
                                                {!isFront && (
                                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
                                                )}
                                            </div>

                                            <div className="relative z-10 w-full h-full flex flex-col justify-between p-8">
                                                <div className="flex justify-between items-start">
                                                    <div className={`w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg ${isFront ? 'bg-white/10' : 'bg-black/20'}`}>
                                                        <Icon className={isFront ? "text-cyan-400" : "text-white/70"} size={28} />
                                                    </div>
                                                    {isFront && (
                                                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-black transition-all">
                                                            <Plus size={24} />
                                                        </div>
                                                    )}
                                                </div>

                                                {isFront && (
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-full blur-[60px] opacity-30 animate-pulse" />
                                                )}

                                                <div className={!isFront ? "translate-y-0" : ""}>
                                                    <div className={`inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 ${isFront ? '' : 'hidden'}`}>
                                                        <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
                                                        <span className="text-[10px] font-bold text-gray-200 uppercase tracking-[0.2em]">{card.subtitle}</span>
                                                    </div>
                                                    <h3 className={`font-bold leading-[1.1] text-white drop-shadow-2xl ${isFront ? 'text-5xl mb-4' : 'text-3xl mb-2'}`}>
                                                        {isFront ? card.title.split(' ').map((word, i) => (
                                                            <span key={i} className="block">{word}</span>
                                                        )) : card.title}
                                                    </h3>
                                                    {isFront ? (
                                                        <p className="text-gray-300 font-light text-base leading-relaxed max-w-[90%] border-l-2 border-cyan-400 pl-4">
                                                            {card.description}
                                                        </p>
                                                    ) : (
                                                        <p className="text-gray-400 text-sm font-medium tracking-wide">{card.subtitle}</p>
                                                    )}
                                                </div>
                                            </div>
                                            {isFront && (
                                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-20 pointer-events-none rounded-[2rem]" />
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-16">
                    {cards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-3 rounded-full transition-all duration-500 ${index === activeIndex
                                    ? 'w-10 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]'
                                    : 'w-3 bg-white/10 hover:bg-white/30'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StackedCarousel;
