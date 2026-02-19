import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { SectionHeader, RevealOnScroll } from './UIComponents';

const PortfolioCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const constraintsRef = useRef(null);
    const x = useMotionValue(0);

    const projects = [
        {
            id: "01",
            title: "Zenith",
            category: "Fintech Platform",
            description: "A complete digital overhaul focusing on WebGL interactions and seamless state management. Increased conversion by 40%.",
            color: "from-blue-500 to-cyan-500",
            tags: ["React", "Node.js", "WebGL"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" // Finance dashboard
        },
        {
            id: "02",
            title: "Aurora",
            category: "Architecture Studio",
            description: "Immersive portfolio experience with 3D visualizations and micro-interactions that showcase architectural excellence.",
            color: "from-purple-500 to-pink-500",
            tags: ["Next.js", "Three.js", "GSAP"],
            image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop" // Architecture
        },
        {
            id: "03",
            title: "Nexus",
            category: "E-Commerce",
            description: "High-performance headless commerce solution with advanced filtering and AI-powered recommendations.",
            color: "from-green-500 to-emerald-500",
            tags: ["Shopify", "React", "GraphQL"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" // E-commerce dashboard
        },
        {
            id: "04",
            title: "Velocity",
            category: "SaaS Platform",
            description: "Modern project management tool with real-time collaboration and intelligent automation features.",
            color: "from-orange-500 to-red-500",
            tags: ["Vue.js", "Python", "WebSocket"],
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop" // Workspace
        },
        {
            id: "05",
            title: "Bloom",
            category: "Health & Wellness",
            description: "Comprehensive wellness platform combining meditation, fitness tracking, and personalized health insights.",
            color: "from-teal-500 to-green-500",
            tags: ["React Native", "Firebase", "HealthKit"],
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop" // Wellness
        }
    ];

    const cardWidth = 600;
    const gap = 32;
    const totalWidth = projects.length * (cardWidth + gap);

    const handlePrevious = () => {
        const newIndex = Math.max(0, currentIndex - 1);
        setCurrentIndex(newIndex);
        animate(x, -(newIndex * (cardWidth + gap)), {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
    };

    const handleNext = () => {
        const newIndex = Math.min(projects.length - 1, currentIndex + 1);
        setCurrentIndex(newIndex);
        animate(x, -(newIndex * (cardWidth + gap)), {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
        animate(x, -(index * (cardWidth + gap)), {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
    };

    return (
        <section id="work" className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-black via-purple-950/5 to-black">
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div>
                        <RevealOnScroll>
                            <SectionHeader
                                label="Portfolio"
                                title={
                                    <>
                                        Featured{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                            Projects
                                        </span>
                                    </>
                                }
                                subtitle="Explore our latest work and see how we transform ideas into exceptional digital experiences"
                            />
                        </RevealOnScroll>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="hidden md:flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            disabled={currentIndex === projects.length - 1}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                <div className="overflow-hidden" ref={constraintsRef}>
                    <motion.div
                        className="flex gap-8 pl-6 md:pl-[calc((100vw-1280px)/2+24px)] pr-6"
                        style={{ x }}
                        drag="x"
                        dragConstraints={{
                            left: -(totalWidth - cardWidth - gap),
                            right: 0
                        }}
                        dragElastic={0.1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipeThreshold = 50;
                            if (offset.x < -swipeThreshold && currentIndex < projects.length - 1) {
                                handleNext();
                            } else if (offset.x > swipeThreshold && currentIndex > 0) {
                                handlePrevious();
                            } else {
                                animate(x, -(currentIndex * (cardWidth + gap)), {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                });
                            }
                        }}
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="relative flex-shrink-0"
                                style={{ width: cardWidth }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Project Card */}
                                <div className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
                                    {/* Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 mix-blend-multiply`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                                        {/* Project Number */}
                                        <div className="text-8xl font-black text-white/10 absolute top-8 right-8 font-mono leading-none">
                                            {project.id}
                                        </div>

                                        {/* Category Badge */}
                                        <div className={`inline-block self-start mb-4 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border bg-gradient-to-r ${project.color} bg-clip-text text-transparent border-white/20 backdrop-blur-sm bg-white/10`}>
                                            {project.category}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                            {project.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-300 leading-relaxed mb-6">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs font-mono text-white/70 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* View Project Button */}
                                        <motion.button
                                            whileHover={{ x: 5 }}
                                            className="self-start flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
                                        >
                                            View Project
                                            <ArrowUpRight size={16} />
                                        </motion.button>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Gradient Fade Edges */}
                <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
            </div>

            {/* Progress Dots */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="flex justify-center gap-2">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioCarousel;
