import React from 'react';
import { motion } from 'framer-motion';
import { aboutUsData } from '../data/aboutUsData';

const AboutUsBento = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-24">
            {aboutUsData.map((point, i) => (
                <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="relative group h-full p-[2px]" // Padding for border container
                >
                    {/* Organic Morphing Border Container */}
                    <div
                        className="absolute inset-0 rounded-[30px] z-0 transition-all duration-500"
                        style={{
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                            background: `linear-gradient(45deg, ${point.accentColor === 'cyan' ? '#06b6d4' : point.accentColor === 'purple' ? '#8b5cf6' : '#ec4899'}, transparent 40%)`,
                            opacity: 0.6,
                            filter: 'blur(8px)',
                            animation: 'morph 8s ease-in-out infinite alternate',
                            boxShadow: `0 0 20px ${point.glowColor}`
                        }}
                    >
                        <style jsx>{`
                            @keyframes morph {
                                0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                                50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                                100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                            }
                        `}</style>
                    </div>

                    {/* SVG/CSS Border Line for Sharpness - Overlaid on the blur */}
                    <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                            border: `2px solid ${point.accentColor === 'cyan' ? '#06b6d4' : point.accentColor === 'purple' ? '#8b5cf6' : '#ec4899'}`,
                            animation: 'morph 8s ease-in-out infinite alternate',
                            opacity: 0.8
                        }}
                    />

                    {/* Glassmorphism Card Body */}
                    <div
                        className="relative rounded-3xl p-6 h-full flex flex-col overflow-hidden z-10 transition-all duration-500"
                        style={{
                            background: 'rgba(20, 20, 25, 0.6)', // Darker background for contrast
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            // border: '1px solid rgba(255, 255, 255, 0.08)', // Removing standard border to let organic border show
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                            margin: '4px' // Inset slightly to show the border
                        }}
                    >
                        {/* Hover Glow Effect */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${point.glowColor}, transparent 40%)`
                            }}
                        />

                        {/* Image Container */}
                        <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-6 bg-gray-900/50">
                            <motion.img
                                alt={point.title}
                                className="object-cover w-full h-full"
                                src={point.image}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                            {/* Overlay text if exists (e.g. "Verified") */}
                            {point.overlayText && (
                                <motion.div
                                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 font-bold tracking-widest uppercase text-sm ${point.overlayTextGlow}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    style={{ color: point.accentColor === 'cyan' ? '#67e8f9' : undefined }}
                                >
                                    {point.overlayText}
                                </motion.div>
                            )}

                            {/* Frosted Icon Badge */}
                            <motion.div
                                className={`absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center border ${point.iconBorder}`}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.08)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    boxShadow: point.iconShadow,
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <span className={`material-icons-round text-2xl ${point.iconTextColor}`}>
                                    {point.iconText}
                                </span>
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="mt-auto relative">
                            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white transition-colors">
                                {point.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                                {point.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default AboutUsBento;
