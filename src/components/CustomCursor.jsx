import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice(window.matchMedia("(hover: none)").matches || window.innerWidth < 1024);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    useEffect(() => {
        if (isTouchDevice) return;

        const move = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener('mousemove', move, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Debounced MutationObserver — only re-scan after 500ms of DOM stability
        let debounceTimer = null;
        let currentElements = new Set();

        const addHoverListeners = () => {
            // Remove old listeners
            currentElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
            currentElements.clear();

            const elements = document.querySelectorAll('a, button, input, textarea, [data-cursor="hover"], [role="button"]');
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
                currentElements.add(el);
            });
        };

        addHoverListeners();

        const observer = new MutationObserver(() => {
            // Debounce: wait 500ms after last DOM change before re-scanning
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(addHoverListeners, 500);
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            observer.disconnect();
            clearTimeout(debounceTimer);
            currentElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [mouseX, mouseY, isTouchDevice]);

    if (isTouchDevice) return null;

    // Simplified to 2 elements (removed glow backdrop and crosshair — saves 2 compositing layers)
    return (
        <>
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

            {/* Outer ring - spring-delayed */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:block border border-solid"
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
        </>
    );
};

export default CustomCursor;
