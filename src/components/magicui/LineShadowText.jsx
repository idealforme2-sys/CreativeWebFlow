import React from 'react';
import { motion } from 'framer-motion';

export const LineShadowText = ({ children, shadowColor = "white", className = "", as: Component = "span", ...props }) => {
    return (
        <Component className="relative inline-block" {...props}>
            <span className={`relative z-10 ${className}`}>
                {children}
            </span>
            <span
                className="absolute left-[6px] top-[6px] z-0 text-transparent pointer-events-none select-none"
                aria-hidden="true"
                style={{
                    backgroundImage: `repeating-linear-gradient(45deg, ${shadowColor} 0, ${shadowColor} 2px, transparent 2px, transparent 6px)`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextStroke: '0px',
                    backgroundSize: '200% auto',
                    animation: 'line-shadow-scroll 15s linear infinite'
                }}
            >
                {children}
            </span>
            <style>{`
                @keyframes line-shadow-scroll {
                    to { background-position: -100% 0; }
                }
            `}</style>
        </Component>
    );
};
