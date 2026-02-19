import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HolographicCard, RevealOnScroll, MagneticButton } from './UIComponents';

const WorkSection = () => {
    const projects = [
        {
            id: "01",
            title: "Zenith",
            category: "Fintech Platform",
            description: "A complete digital overhaul focusing on WebGL interactions and seamless state management. Increased conversion by 40%.",
            color: "from-blue-500 to-cyan-500",
            tags: ["React", "Node.js", "WebGL"]
        },
        {
            id: "02",
            title: "Aurora",
            category: "Architecture Studio",
            description: "Immersive portfolio experience with 3D visualizations and micro-interactions that showcase architectural excellence.",
            color: "from-purple-500 to-pink-500",
            tags: ["Next.js", "Three.js", "GSAP"]
        },
        {
            id: "03",
            title: "Nexus",
            category: "E-Commerce",
            description: "High-performance headless commerce solution with advanced filtering and AI-powered recommendations.",
            color: "from-green-500 to-emerald-500",
            tags: ["Shopify", "React", "GraphQL"]
        }
    ];

    return (
        <section id="work" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
                    <div className="relative">
                        {/* Large background text */}
                        <span className="absolute -top-8 -left-4 text-[8rem] md:text-[12rem] font-black text-white/[0.02] leading-none pointer-events-none select-none">
                            Work
                        </span>

                        <RevealOnScroll>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px w-12 bg-pink-500" />
                                <span className="text-xs font-mono text-pink-400 uppercase tracking-[0.2em]">Featured Work</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">Recent Deployments</h2>
                        </RevealOnScroll>
                    </div>

                    <RevealOnScroll delay={0.1}>
                        <MagneticButton className="text-white text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                            View All Projects
                        </MagneticButton>
                    </RevealOnScroll>
                </div>

                {/* Projects */}
                <div className="space-y-32">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-10%" }}
                            className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center group`}
                        >
                            {/* Project Image/Preview */}
                            <HolographicCard className="w-full lg:w-2/3 aspect-[16/10] relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                                {/* Fake browser UI */}
                                <div className="absolute inset-0 p-4">
                                    {/* Browser dots */}
                                    <div className="flex gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                                    </div>

                                    {/* Content placeholder */}
                                    <div className="h-full flex items-center justify-center">
                                        <motion.span
                                            className="font-black text-4xl md:text-6xl text-white/10 uppercase tracking-[0.2em]"
                                            whileHover={{ letterSpacing: '0.4em' }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Preview
                                        </motion.span>
                                    </div>
                                </div>

                                {/* Project ID */}
                                <div className="absolute bottom-4 right-4 font-mono text-xs text-white/30">
                                    ID: {project.id}_PROJECT
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        className="px-8 py-4 bg-white text-black rounded-full text-sm font-bold uppercase tracking-wider"
                                    >
                                        View Project
                                    </motion.button>
                                </div>
                            </HolographicCard>

                            {/* Project Info */}
                            <div className="w-full lg:w-1/3 space-y-6">
                                {/* Large ID number */}
                                <span className="text-8xl font-black text-white/5 font-mono leading-none">
                                    {project.id}
                                </span>

                                {/* Category */}
                                <div className={`inline-block text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border bg-gradient-to-r ${project.color} bg-clip-text text-transparent border-white/10`}>
                                    {project.category}
                                </div>

                                {/* Title */}
                                <h3 className="text-4xl md:text-5xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, j) => (
                                        <span key={j} className="px-3 py-1 text-xs font-mono text-white/50 bg-white/5 rounded-full border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Arrow button */}
                                <motion.button
                                    whileHover={{ x: 10 }}
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                                >
                                    <ArrowRight size={18} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkSection;
