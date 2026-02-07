import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Layers, Zap, Activity, Wifi, Globe, Database, Cpu } from 'lucide-react';
import { RevealOnScroll, SectionHeader } from './UIComponents';

const OrbitingRing = ({ radius, duration, icons, reverse = false, color }) => {
    return (
        <motion.div
            className="absolute flex items-center justify-center rounded-full border border-white/5"
            style={{ width: radius * 2, height: radius * 2 }}
            animate={{ rotate: reverse ? -360 : 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
            {icons.map((IconComponent, i) => {
                const angle = (i / icons.length) * 2 * Math.PI;
                return (
                    <motion.div
                        key={i}
                        className={`absolute p-3 bg-black border border-white/10 rounded-full ${color} shadow-lg backdrop-blur-sm`}
                        style={{
                            top: '50%',
                            left: '50%',
                            x: Math.cos(angle) * radius - 20,
                            y: Math.sin(angle) * radius - 20
                        }}
                        animate={{ rotate: reverse ? 360 : -360 }}
                        transition={{ duration, repeat: Infinity, ease: "linear" }}
                    >
                        <IconComponent size={20} />
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

const StackSection = () => {
    const technologies = [
        { name: "React", category: "Frontend" },
        { name: "Next.js", category: "Framework" },
        { name: "TypeScript", category: "Language" },
        { name: "Tailwind", category: "Styling" },
        { name: "GSAP", category: "Animation" },
        { name: "Node.js", category: "Backend" },
        { name: "PostgreSQL", category: "Database" },
        { name: "AWS", category: "Cloud" }
    ];

    return (
        <section id="stack" className="relative py-32 lg:py-40 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <RevealOnScroll>
                    <SectionHeader
                        label="Technology"
                        title={
                            <>
                                Built for{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                    Speed & Scale
                                </span>
                            </>
                        }
                        subtitle="We leverage the modern JAMstack to ensure your digital presence is not just beautiful, but instantly available globally."
                        align="center"
                        className="mb-20"
                    />
                </RevealOnScroll>

                {/* Orbit Visualization */}
                <div className="relative h-[500px] md:h-[600px] flex items-center justify-center mb-20">
                    {/* Central Core */}
                    <motion.div
                        className="relative z-10 w-20 h-20 md:w-28 md:h-28 bg-black border border-cyan-500/50 rounded-full flex items-center justify-center"
                        animate={{
                            boxShadow: [
                                '0 0 30px rgba(6, 182, 212, 0.3)',
                                '0 0 60px rgba(6, 182, 212, 0.5)',
                                '0 0 30px rgba(6, 182, 212, 0.3)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Cpu size={36} className="text-cyan-400" />
                        <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-ping opacity-20" />
                    </motion.div>

                    {/* Orbiting Rings */}
                    <OrbitingRing
                        radius={120}
                        duration={20}
                        icons={[Code, Terminal, Layers]}
                        color="text-purple-400"
                    />
                    <OrbitingRing
                        radius={200}
                        duration={30}
                        icons={[Zap, Activity, Wifi, Globe]}
                        reverse
                        color="text-pink-400"
                    />
                    <OrbitingRing
                        radius={280}
                        duration={40}
                        icons={[Database, Code, Terminal]}
                        color="text-cyan-400"
                    />

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
                </div>

                {/* Tech Stack Grid */}
                <RevealOnScroll>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {technologies.map((tech, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="group p-6 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-center"
                            >
                                <div className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                                    {tech.name}
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">
                                    {tech.category}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

export default StackSection;
