import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { stiffness: 500, damping: 28 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const move = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', move);

        // Add hover detection for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [data-cursor="hover"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });

        return () => {
            window.removeEventListener('mousemove', move);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none mix-blend-difference z-[100] hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
                animate={{
                    scale: isHovering ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:block border-2"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                }}
                animate={{
                    width: isHovering ? 60 : 40,
                    height: isHovering ? 60 : 40,
                    borderColor: isHovering ? 'rgba(6, 182, 212, 0.8)' : 'rgba(255, 255, 255, 0.5)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            />
        </>
    );
};

export default CustomCursor;
