import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ size = 40, className = '' }) => {
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
                style={{ overflow: 'visible' }}
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
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="logoGlowStrong">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer hexagon — rotating gradient stroke */}
                <polygon
                    points="60,6 106,30 106,78 60,102 14,78 14,30"
                    stroke="url(#logoGrad)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.7"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 60 54"
                        to="360 60 54"
                        dur="20s"
                        repeatCount="indefinite"
                    />
                </polygon>

                {/* Inner hexagon — counter-rotating, subtler */}
                <polygon
                    points="60,18 96,36 96,72 60,90 24,72 24,36"
                    stroke="url(#logoGrad)"
                    strokeWidth="1"
                    fill="rgba(6,182,212,0.04)"
                    opacity="0.35"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="360 60 54"
                        to="0 60 54"
                        dur="14s"
                        repeatCount="indefinite"
                    />
                </polygon>

                {/* Core background */}
                <polygon
                    points="60,22 93,38 93,70 60,86 27,70 27,38"
                    fill="rgba(0,0,0,0.7)"
                />

                {/* CW monogram */}
                <text
                    x="60" y="58"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="url(#logoTextGrad)"
                    fontSize="30"
                    fontWeight="900"
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing="-1"
                    filter="url(#logoGlow)"
                >
                    CW
                </text>

                {/* Orbiting particles — 3 at different speeds */}
                <circle r="2.5" fill="#06b6d4" opacity="0.9" filter="url(#logoGlowStrong)">
                    <animateMotion dur="6s" repeatCount="indefinite">
                        <mpath href="#hexOrbit1" />
                    </animateMotion>
                </circle>
                <circle r="1.8" fill="#a855f7" opacity="0.8" filter="url(#logoGlow)">
                    <animateMotion dur="9s" repeatCount="indefinite">
                        <mpath href="#hexOrbit1" />
                    </animateMotion>
                </circle>
                <circle r="1.5" fill="#ec4899" opacity="0.7" filter="url(#logoGlow)">
                    <animateMotion dur="13s" repeatCount="indefinite" keyPoints="0.4;1;0.4" keyTimes="0;0.5;1" calcMode="linear">
                        <mpath href="#hexOrbit1" />
                    </animateMotion>
                </circle>

                {/* Orbit path (hex shape) */}
                <path id="hexOrbit1" d="M60,10 L102,32 L102,76 L60,98 L18,76 L18,32 Z" fill="none" />

                {/* Corner sparkle accents */}
                <circle cx="60" cy="6" r="1.5" fill="#06b6d4" opacity="0.6">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="106" cy="78" r="1.2" fill="#a855f7" opacity="0.5">
                    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="14" cy="30" r="1" fill="#ec4899" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3s" repeatCount="indefinite" />
                </circle>
            </svg>
        </motion.div>
    );
};

export default AnimatedLogo;
