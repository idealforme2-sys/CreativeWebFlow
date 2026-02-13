import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [trail, setTrail] = useState([]);
    const trailRef = useRef([]);
    const rafRef = useRef(null);

    const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Smooth trail with spring physics
    const trailSpringConfig = { stiffness: 150, damping: 20, mass: 0.8 };
    const trailX = useSpring(mouseX, trailSpringConfig);
    const trailY = useSpring(mouseY, trailSpringConfig);

    useEffect(() => {
        const move = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', move);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Use MutationObserver to catch dynamically added elements
        const addHoverListeners = () => {
            const elements = document.querySelectorAll('a, button, input, textarea, [data-cursor="hover"], [role="button"]');
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
            return elements;
        };

        let currentElements = addHoverListeners();

        const observer = new MutationObserver(() => {
            currentElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
            currentElements = addHoverListeners();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();
            currentElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Glow backdrop - subtle ambient glow that follows cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99] hidden md:block"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 200,
                    height: 200,
                    background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
                }}
            />

            {/* Inner dot - precise position */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isClicking ? 6 : isHovering ? 0 : 8,
                    height: isClicking ? 6 : isHovering ? 0 : 8,
                    backgroundColor: isHovering ? 'rgba(6, 182, 212, 0)' : 'rgba(6, 182, 212, 1)',
                    boxShadow: isClicking
                        ? '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)'
                        : '0 0 10px rgba(6, 182, 212, 0.5)',
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
            />

            {/* Outer ring - spring-delayed for magnetic feel */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isClicking ? 30 : isHovering ? 56 : 36,
                    height: isClicking ? 30 : isHovering ? 56 : 36,
                    borderWidth: isHovering ? 2 : 1.5,
                    borderColor: isClicking
                        ? 'rgba(168, 85, 247, 0.9)'
                        : isHovering
                            ? 'rgba(6, 182, 212, 0.7)'
                            : 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.06)' : 'rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Crosshair lines - appear on hover */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    opacity: isHovering ? 1 : 0,
                    scale: isHovering ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
            >
                <div className="relative w-14 h-14 flex items-center justify-center">
                    {/* Top tick */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-cyan-400/60" />
                    {/* Bottom tick */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-cyan-400/60" />
                    {/* Left tick */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-cyan-400/60" />
                    {/* Right tick */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-cyan-400/60" />
                </div>
            </motion.div>
        </>
    );
};

export default CustomCursor;
