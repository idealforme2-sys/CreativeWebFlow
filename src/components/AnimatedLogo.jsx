import React, { useId } from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = ({ size = 40, className = '', interactive = true }) => {
    const uid = useId().replace(/:/g, '');
    const gradId = `logoGrad-${uid}`;
    const textGradId = `logoTextGrad-${uid}`;
    const clipId = `logoCoreClip-${uid}`;
    const glowId = `logoGlow-${uid}`;
    const orbitId = `hexOrbit-${uid}`;

    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
            whileHover={interactive ? { scale: 1.12, rotate: 8 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
            <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
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
                    <linearGradient id={textGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#e0f2fe" />
                        <stop offset="100%" stopColor="#c4b5fd" />
                    </linearGradient>
                    <clipPath id={clipId}>
                        <polygon points="60,32 84.2,46 84.2,74 60,88 35.8,74 35.8,46" />
                    </clipPath>
                    <filter id={glowId}>
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <polygon
                    points="60,20 94.6,40 94.6,80 60,100 25.4,80 25.4,40"
                    stroke={`url(#${gradId})`}
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

                <polygon
                    points="60,28 87.7,44 87.7,76 60,92 32.3,76 32.3,44"
                    stroke={`url(#${gradId})`}
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

                <polygon
                    points="60,32 84.2,46 84.2,74 60,88 35.8,74 35.8,46"
                    fill="rgba(0,0,0,0.7)"
                />

                <g clipPath={`url(#${clipId})`} filter={`url(#${glowId})`} stroke={`url(#${textGradId})`} strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(1.5 0)">
                    <path d="M53 49 C49 45.5 45 45.5 41 49 C38.8 53 38.8 59 41 63 C45 66.5 49 66.5 53 63" strokeWidth="4.2" />
                    <path d="M57 48 L61 64 L65 54 L69 64 L73 48" strokeWidth="4.2" />
                </g>

                <circle r="2" fill="#06b6d4" opacity="0.9" filter={`url(#${glowId})`}>
                    <animateMotion dur="6s" repeatCount="indefinite">
                        <mpath href={`#${orbitId}`} />
                    </animateMotion>
                </circle>
                <circle r="1.5" fill="#a855f7" opacity="0.8" filter={`url(#${glowId})`}>
                    <animateMotion dur="9s" repeatCount="indefinite">
                        <mpath href={`#${orbitId}`} />
                    </animateMotion>
                </circle>
                <circle r="1.2" fill="#ec4899" opacity="0.7" filter={`url(#${glowId})`}>
                    <animateMotion dur="13s" repeatCount="indefinite" keyPoints="0.4;1;0.4" keyTimes="0;0.5;1" calcMode="linear">
                        <mpath href={`#${orbitId}`} />
                    </animateMotion>
                </circle>

                <path id={orbitId} d="M60,22 L92,42 L92,78 L60,98 L28,78 L28,42 Z" fill="none" />

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
