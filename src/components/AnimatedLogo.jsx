import React from 'react';
import { motion } from 'framer-motion';

// Animated SVG Logo — "CW" monogram with orbiting ring and pulsing glow
const AnimatedLogo = ({ size = 40, className = '' }) => {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <defs>
                    {/* Animated gradient for the ring */}
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4">
                            <animate attributeName="stop-color" values="#06b6d4;#a855f7;#ec4899;#06b6d4" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor="#a855f7">
                            <animate attributeName="stop-color" values="#a855f7;#ec4899;#06b6d4;#a855f7" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#ec4899">
                            <animate attributeName="stop-color" values="#ec4899;#06b6d4;#a855f7;#ec4899" dur="4s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>

                    {/* Text gradient */}
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#e0e7ff" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer orbiting ring */}
                <circle
                    cx="50" cy="50" r="44"
                    stroke="url(#ringGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="180 100"
                    opacity="0.8"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="8s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* Inner subtle ring */}
                <circle
                    cx="50" cy="50" r="38"
                    stroke="url(#ringGradient)"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.25"
                    strokeDasharray="60 180"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="360 50 50"
                        to="0 50 50"
                        dur="12s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* Background circle */}
                <circle cx="50" cy="50" r="34" fill="rgba(0,0,0,0.6)" />

                {/* CW monogram text */}
                <text
                    x="50" y="55"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="url(#textGradient)"
                    fontSize="28"
                    fontWeight="900"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="-1"
                    filter="url(#glow)"
                >
                    CW
                </text>

                {/* Orbiting dot */}
                <circle r="3" fill="#06b6d4" opacity="0.9" filter="url(#glow)">
                    <animateMotion dur="8s" repeatCount="indefinite">
                        <mpath href="#orbitPath" />
                    </animateMotion>
                </circle>
                <path id="orbitPath" d="M 50 6 A 44 44 0 1 1 49.99 6" fill="none" />
            </svg>
        </motion.div>
    );
};

export default AnimatedLogo;
