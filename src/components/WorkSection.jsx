import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Stethoscope, Dumbbell, Building2, ArrowRight, Utensils } from 'lucide-react';

import dentalImg from '../assets/industries/dental-medical.png';
import fitnessImg from '../assets/industries/fitness-gyms.png';
import restaurantImg from '../assets/industries/restaurants.png';
import realEstateImg from '../assets/industries/real-estate.png';

const PROJECTS = [
    {
        id: 'medical',
        title: 'Dental & Medical',
        subtitle: 'Healthcare',
        description: 'Patient booking systems, trust-building content, and clear call-to-action paths.',
        stat: '+180%',
        statLabel: 'Patient Bookings',
        imgAlt: 'Dental and medical showcase',
        icon: Stethoscope,
        image: dentalImg,
    },
    {
        id: 'fitness',
        title: 'Fitness & Gyms',
        subtitle: 'Wellness',
        description: 'High-energy visuals, membership funnels, and class schedule integrations.',
        stat: '+250%',
        statLabel: 'Membership Signups',
        imgAlt: 'Fitness showcase',
        icon: Dumbbell,
        image: fitnessImg,
    },
    {
        id: 'food',
        title: 'Food & Restaurants',
        subtitle: 'Culinary',
        description: 'Conversion-focused menus, reservation flows, and local search visibility.',
        stat: '+210%',
        statLabel: 'Online Orders',
        imgAlt: 'Restaurant showcase',
        icon: Utensils,
        image: restaurantImg,
    },
    {
        id: 'real-estate',
        title: 'Real Estate',
        subtitle: 'Property',
        description: 'Premium visual storytelling with strong lead capture and inquiry flows.',
        stat: '+320%',
        statLabel: 'Qualified Leads',
        imgAlt: 'Real estate showcase',
        icon: Building2,
        image: realEstateImg,
    }
];

const getCardStyle = (position) => {
    const baseStyles = {
        0: {
            x: 0,
            y: 0,
            z: 0,
            rotateY: 0,
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            zIndex: 40
        },
        1: {
            x: '30%',
            y: 0,
            z: -120,
            rotateY: -25,
            opacity: 0.8,
            filter: 'blur(1px)',
            scale: 0.85,
            zIndex: 30
        },
        2: {
            x: 0,
            y: 0,
            z: -300,
            rotateY: 0,
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.6,
            zIndex: 10
        },
        3: {
            x: '-30%',
            y: 0,
            z: -120,
            rotateY: 25,
            opacity: 0.8,
            filter: 'blur(1px)',
            scale: 0.85,
            zIndex: 30
        }
    };

    return baseStyles[position];
};

const WorkSection = ({ isMobile = false }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const projects = useMemo(() => PROJECTS, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    };

    const visibleCards = useMemo(() => {
        return projects.map((project, idx) => {
            const relativePosition = (idx - activeIndex + projects.length) % projects.length;
            return { ...project, position: relativePosition };
        });
    }, [activeIndex, projects]);

    return (
        <section id="work" className={`relative overflow-hidden ${isMobile ? 'pt-8 pb-16' : 'pt-12 lg:pt-16 pb-32 lg:pb-48'}`}>
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, black 84%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 84%, transparent 100%)',
                }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
            </div>

            <div className={`relative z-10 max-w-7xl mx-auto ${isMobile ? 'px-4' : 'px-6'}`}>
                <div className={`${isMobile ? 'text-center mb-10' : 'text-center mb-24'}`}>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-cyan-500" />
                        <span className="text-cyan-400 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Example Projects</span>
                        <div className="h-px w-12 bg-cyan-500" />
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-extrabold text-4xl md:text-5xl lg:text-7xl leading-[1.1] text-white tracking-tight mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        How We Help <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                            Local Businesses
                        </span>
                    </motion.h2>
                </div>

                {isMobile ? (
                    <div className="space-y-4">
                        {projects.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <motion.article
                                    key={card.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-80px' }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/70 backdrop-blur-xl"
                                >
                                    <div className="relative h-52">
                                        <img
                                            src={card.image}
                                            alt={card.imgAlt}
                                            loading={index === 0 ? 'eager' : 'lazy'}
                                            fetchPriority={index === 0 ? 'high' : 'low'}
                                            decoding="async"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black" />
                                    </div>

                                    <div className="relative p-5">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div>
                                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-300/90 mb-1">{card.subtitle}</p>
                                                <h3 className="text-2xl font-bold text-white leading-tight">{card.title}</h3>
                                            </div>
                                            <div className="w-11 h-11 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center">
                                                <Icon className="text-cyan-300" size={20} />
                                            </div>
                                        </div>
                                        <p className="text-sm text-white/65 leading-relaxed mb-5">{card.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">{card.stat}</div>
                                                <div className="text-[10px] uppercase tracking-[0.14em] text-white/45">{card.statLabel}</div>
                                            </div>
                                            <button
                                                type="button"
                                                onPointerDown={(e) => {
                                                    e.stopPropagation();
                                                    scrollToSection(card.id);
                                                }}
                                                className="px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-white text-xs font-bold uppercase tracking-[0.14em] flex items-center gap-2"
                                            >
                                                View
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="relative flex items-center justify-center min-h-[600px]">
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
                            className="relative w-[320px] md:w-[380px] h-[580px]"
                            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                        >
                            <AnimatePresence initial={false}>
                                {visibleCards.map((card) => {
                                    const style = getCardStyle(card.position);
                                    const isFront = card.position === 0;
                                    const Icon = card.icon;

                                    return (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                ...style,
                                                transition: { type: 'spring', stiffness: 200, damping: 25 }
                                            }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 w-full h-full"
                                            style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                                            onClick={() => {
                                                if (card.position === 1) handleNext();
                                                if (card.position === 3) handlePrev();
                                            }}
                                        >
                                            <div className={`
                                                relative w-full h-full rounded-[2rem] overflow-hidden border transition-all duration-500
                                                ${isFront
                                                    ? 'bg-slate-900/80 backdrop-blur-xl border-white/10 ring-1 ring-white/20 shadow-[0_0_40px_-10px_rgba(112,0,255,0.5)] cursor-default'
                                                    : 'bg-slate-950 border-white/20 shadow-2xl cursor-pointer hover:border-cyan-500/50'}
                                            `}>
                                                <div className="absolute inset-0 z-0">
                                                    <img
                                                        src={card.image}
                                                        alt={card.imgAlt}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className={`w-full h-full object-cover ${isFront ? 'opacity-60 mix-blend-overlay' : 'opacity-40 grayscale'}`}
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-b ${isFront ? 'from-transparent via-black/60 to-black' : 'from-black/40 via-black/80 to-black'}`} />
                                                </div>

                                                <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-10">
                                                    <div className="flex justify-between items-start">
                                                        <div className={`w-16 h-16 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg ${isFront ? 'bg-white/10' : 'bg-black/20'}`}>
                                                            <Icon className={isFront ? 'text-cyan-400' : 'text-white/70'} size={32} />
                                                        </div>
                                                        {isFront && (
                                                            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-black transition-all">
                                                                <Plus size={24} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className={!isFront ? 'translate-y-4 opacity-70' : ''}>
                                                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 ${isFront ? '' : 'hidden'}`}>
                                                            <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
                                                            <span className="text-[10px] font-bold text-gray-200 uppercase tracking-[0.2em]">{card.subtitle}</span>
                                                        </div>

                                                        <h3 className={`font-bold leading-[1.1] text-white drop-shadow-2xl ${isFront ? 'text-4xl md:text-5xl mb-6' : 'text-3xl mb-2'}`}>
                                                            {card.title}
                                                        </h3>

                                                        {isFront && (
                                                            <>
                                                                <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-8 border-l-2 border-cyan-400 pl-4">
                                                                    {card.description}
                                                                </p>

                                                                <div className="flex items-center gap-4 mb-8">
                                                                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
                                                                        {card.stat}
                                                                    </div>
                                                                    <div className="text-sm text-gray-400 font-medium uppercase tracking-wider max-w-[100px] leading-tight">
                                                                        {card.statLabel}
                                                                    </div>
                                                                </div>

                                                                <div className="w-full">
                                                                    <button
                                                                        type="button"
                                                                        onPointerDown={(e) => {
                                                                            e.stopPropagation();
                                                                            scrollToSection(card.id);
                                                                        }}
                                                                        className="w-full py-3 md:py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-500/50 rounded-xl text-white font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group/btn cursor-pointer relative z-50 shadow-xl"
                                                                    >
                                                                        View Examples
                                                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                                                    </button>
                                                                </div>
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
                )}
            </div>
        </section>
    );
};

export default WorkSection;
