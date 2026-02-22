import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

export const TextReveal = ({ children, className = "" }) => {
    const textRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start 85%", "end 50%"]
    });

    // Handle both string and elements
    const content = typeof children === 'string' ? children :
        (children && Array.isArray(children)) ? children.join('') : '';

    const words = content.split(" ");

    return (
        <div ref={textRef} className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);

                return (
                    <motion.span
                        key={i}
                        style={{ opacity }}
                        className="mr-[0.25em] inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"
                    >
                        {word}
                    </motion.span>
                );
            })}
        </div>
    );
};
