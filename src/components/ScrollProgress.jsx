import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899, #06b6d4)',
                backgroundSize: '200% 100%',
            }}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 blur-sm opacity-80"
                style={{
                    background: 'inherit',
                    backgroundSize: 'inherit',
                }}
            />
        </motion.div>
    );
};

export default ScrollProgress;
