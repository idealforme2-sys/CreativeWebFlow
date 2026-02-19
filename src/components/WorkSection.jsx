import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Stethoscope, Dumbbell, Building2, ArrowRight } from 'lucide-react';
import { MagneticButton } from './UIComponents';

// Industry images
import dentalImg from '../assets/industries/dental-medical.png';
import fitnessImg from '../assets/industries/fitness-gyms.png';
import realEstateImg from '../assets/industries/real-estate.png';

const WorkSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const projects = [
        {
            id: 1,
            title: "Dental & Medical",
            subtitle: "Healthcare",
            description: "Patient booking systems, trust-building case studies, and serene aesthetics that convert visitors into appointments.",
            stat: "+180%",
            statLabel: "Patient Bookings",
            imgAlt: "Dental & Medical decorative",
            icon: Stethoscope,
            image: dentalImg,
            gradient: "from-cyan-500 to-blue-500"
        },
        {
            id: 2,
            title: "Fitness & Gyms",
            subtitle: "Wellness",
            description: "High-energy visuals, membership portals, and class scheduling integrations designed to fill your facility.",
            stat: "+250%",
            statLabel: "Membership Signups",
            imgAlt: "Fitness & Gyms decorative",
            icon: Dumbbell,
            image: fitnessImg,
            gradient: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            title: "Real Estate",
            subtitle: "Property",
            description: "Immersive property tours, agent profiles, and lead capture forms wrapped in luxury design for high-ticket sales.",
            stat: "+320%",
            statLabel: "Qualified Leads",
            imgAlt: "Real Estate decorative",
            icon: Building2,
            image: realEstateImg,
            gradient: "from-orange-500 to-red-500"
        }
    ];

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
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

    const getVisibleCards = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (activeIndex + i) % projects.length;
            visible.push({ ...projects[index], position: 2 - i });
        }
        return visible;
    };

    return (
        <section id="work" className="relative py-32 lg:py-48 overflow-hidden bg-black/20">
            {/* Background elements same as StackedCarousel/current design */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-cyan-500" />
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em]">Example Projects</span>
                        <div className="h-px w-12 bg-cyan-500" />
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
                    >
                        How We Help <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                            Local Businesses
                        </span>
                    </motion.h2>
                </div>

                <div className="relative flex items-center justify-center min-h-[600px]">
                    {/* Navigation Buttons */}
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

                    {/* Stacked Cards */}
                    <div
                        className="relative w-[380px] md:w-[450px] h-[600px]"
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
                                            ...style,
                                            transition: { type: "spring", stiffness: 300, damping: 30 }
                                        }}
                                        exit={{ opacity: 0, x: -100, z: -100, rotateZ: -10 }}
                                        className="absolute inset-0 w-full h-full"
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            transformOrigin: 'center bottom',
                                        }}
                                    >
                                        <div className={`
                                            relative w-full h-full rounded-[2rem] overflow-hidden border transition-all duration-500
                                            ${isFront ?
                                                'bg-slate-900/80 backdrop-blur-xl border-white/10 ring-1 ring-white/20 shadow-[0_0_40px_-10px_rgba(112,0,255,0.5)]' :
                                                'bg-slate-950 border-white/20 shadow-2xl'}
                                        `}>
                                            {/* Card Background Image */}
                                            <div className="absolute inset-0 z-0">
                                                <img src={card.image} alt={card.imgAlt} className={`w-full h-full object-cover ${isFront ? 'opacity-60 mix-blend-overlay' : 'opacity-40 grayscale'}`} />
                                                <div className={`absolute inset-0 bg-gradient-to-b ${isFront ? 'from-transparent via-black/60 to-black' : 'from-black/40 via-black/80 to-black'}`} />
                                            </div>

                                            {/* Card Content */}
                                            <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-10">

                                                {/* Top Row: Icon + Plus */}
                                                <div className="flex justify-between items-start">
                                                    <div className={`w-16 h-16 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg ${isFront ? 'bg-white/10' : 'bg-black/20'}`}>
                                                        <Icon className={isFront ? "text-cyan-400" : "text-white/70"} size={32} />
                                                    </div>
                                                    {isFront && (
                                                        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-black transition-all">
                                                            <Plus size={24} />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Middle/Bottom Content */}
                                                <div className={!isFront ? "translate-y-4 opacity-70" : ""}>
                                                    {/* Subtitle Tag */}
                                                    <div className={`inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 ${isFront ? '' : 'hidden'}`}>
                                                        <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
                                                        <span className="text-[10px] font-bold text-gray-200 uppercase tracking-[0.2em]">{card.subtitle}</span>
                                                    </div>

                                                    {/* Title */}
                                                    <h3 className={`font-bold leading-[1.1] text-white drop-shadow-2xl ${isFront ? 'text-4xl md:text-5xl mb-6' : 'text-3xl mb-2'}`}>
                                                        {card.title}
                                                    </h3>

                                                    {isFront && (
                                                        <>
                                                            <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-8 border-l-2 border-cyan-400 pl-4">
                                                                {card.description}
                                                            </p>

                                                            {/* Stat Block */}
                                                            <div className="flex items-center gap-4 mb-8">
                                                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
                                                                    {card.stat}
                                                                </div>
                                                                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider max-w-[100px] leading-tight">
                                                                    {card.statLabel}
                                                                </div>
                                                            </div>

                                                            <MagneticButton className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn">
                                                                View Examples
                                                                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                                            </MagneticButton>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkSection;
