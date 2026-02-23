import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ size = 40, className = '' }) => {
    // All geometry centered at 60,60 with max radius ~42 so rotation stays within viewBox
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            whileHover={{ scale: 1.12, rotate: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
            <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4">
                            <animate attributeName="stop-color" values="#06b6d4;#a855f7;#ec4899;#06b6d4" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor="#a855f7">
                            <animate attributeName="stop-color" values="#a855f7;#ec4899;#06b6d4;#a855f7" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#ec4899">
                            <animate attributeName="stop-color" values="#ec4899;#06b6d4;#a855f7;#ec4899" dur="3s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                    <linearGradient id="logoTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#e0f2fe" />
                        <stop offset="100%" stopColor="#c4b5fd" />
                    </linearGradient>
                    <filter id="logoGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer hexagon — centered at 60,60, radius ~40 so rotation stays in bounds */}
                <polygon
                    points="60,20 94.6,40 94.6,80 60,100 25.4,80 25.4,40"
                    stroke="url(#logoGrad)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.7"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 60 60"
                        to="360 60 60"
                        dur="20s"
                        repeatCount="indefinite"
                    />
                </polygon>

                {/* Inner hexagon — counter-rotating */}
                <polygon
                    points="60,28 87.7,44 87.7,76 60,92 32.3,76 32.3,44"
                    stroke="url(#logoGrad)"
                    strokeWidth="1"
                    fill="rgba(6,182,212,0.04)"
                    opacity="0.35"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="360 60 60"
                        to="0 60 60"
                        dur="14s"
                        repeatCount="indefinite"
                    />
                </polygon>

                {/* Core background */}
                <polygon
                    points="60,32 84.2,46 84.2,74 60,88 35.8,74 35.8,46"
                    fill="rgba(0,0,0,0.7)"
                />

                {/* CW monogram */}
                <text
                    x="60" y="62"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="url(#logoTextGrad)"
                    fontSize="28"
                    fontWeight="900"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="-1"
                    filter="url(#logoGlow)"
                >
                    CW
                </text>

                {/* Orbiting particles on inner orbit path */}
                <circle r="2" fill="#06b6d4" opacity="0.9" filter="url(#logoGlow)">
                    <animateMotion dur="6s" repeatCount="indefinite">
                        <mpath href="#hexOrbit1" />
                    </animateMotion>
                </circle>
                <circle r="1.5" fill="#a855f7" opacity="0.8" filter="url(#logoGlow)">
                    <animateMotion dur="9s" repeatCount="indefinite">
                        <mpath href="#hexOrbit1" />
                    </animateMotion>
                </circle>
                <circle r="1.2" fill="#ec4899" opacity="0.7" filter="url(#logoGlow)">
                    <animateMotion dur="13s" repeatCount="indefinite" keyPoints="0.4;1;0.4" keyTimes="0;0.5;1" calcMode="linear">
                        <mpath href="#hexOrbit1" />
                    </animateMotion>
                </circle>

                {/* Orbit path — stays within bounds */}
                <path id="hexOrbit1" d="M60,22 L92,42 L92,78 L60,98 L28,78 L28,42 Z" fill="none" />

                {/* Corner sparkle accents */}
                <circle cx="60" cy="20" r="1.2" fill="#06b6d4" opacity="0.6">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="94.6" cy="80" r="1" fill="#a855f7" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="25.4" cy="40" r="0.8" fill="#ec4899" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
                </circle>
            </svg>
        </motion.div>
    );
};

export default AnimatedLogo;
