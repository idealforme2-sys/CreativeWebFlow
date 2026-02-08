// Magic UI Components - Premium text effects and buttons

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Highlighter - Underline or highlight text with animated effect
export const Highlighter = ({ children, action = 'highlight', color = '#FF9800', className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={ref} className={`relative inline-block ${className}`}>
            {children}
            {action === 'underline' && (
                <motion.span
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: isVisible ? '100%' : 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
            )}
            {action === 'highlight' && (
                <motion.span
                    className="absolute inset-0 -z-10"
                    style={{
                        backgroundColor: color,
                        opacity: 0.3,
                        transformOrigin: 'left'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
            )}
        </span>
    );
};

// WordRotate - Rotating words animation
export const WordRotate = ({ words = [], className = '', duration = 2500 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, duration);
        return () => clearInterval(interval);
    }, [words.length, duration]);

    return (
        <span className={`inline-block ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {words[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

// TextReveal - Scroll-based reveal with gradient mask
export const TextReveal = ({ children, className = '' }) => {
    const ref = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementTop = rect.top;
            const elementHeight = rect.height;

            const start = windowHeight - elementHeight / 2;
            const end = windowHeight / 2;
            const scrollProgress = Math.max(0, Math.min(1, (start - elementTop) / (start - end)));

            setProgress(scrollProgress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                style={{ opacity: progress }}
            >
                {children}
            </div>
            <div className="text-gray-600">{children}</div>
        </div>
    );
};

// LineShadowText - Text with animated line shadow effect
export const LineShadowText = ({ children, shadowColor = 'white', className = '' }) => {
    return (
        <span className={`relative inline-block ${className}`} style={{
            textShadow: `
                0 1px 0 ${shadowColor},
                0 2px 0 ${shadowColor},
                0 3px 0 ${shadowColor},
                0 4px 0 ${shadowColor},
                0 5px 0 transparent,
                0 6px 1px rgba(0,0,0,.1),
                0 0 5px rgba(0,0,0,.1),
                0 1px 3px rgba(0,0,0,.3),
                0 3px 5px rgba(0,0,0,.2),
                0 5px 10px rgba(0,0,0,.25),
                0 10px 10px rgba(0,0,0,.2),
                0 20px 20px rgba(0,0,0,.15)
            `
        }}>
            {children}
        </span>
    );
};

// TextAnimate - Blur-in and other text animations
export const TextAnimate = ({ children, animation = 'blurInUp', by = 'word', once = true, className = '' }) => {
    const text = typeof children === 'string' ? children : '';
    const parts = by === 'character' ? text.split('') : text.split(' ');

    const animations = {
        blurInUp: {
            hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
            visible: { opacity: 1, filter: 'blur(0px)', y: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        slideUp: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        }
    };

    const selectedAnimation = animations[animation] || animations.blurInUp;

    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            transition={{ staggerChildren: 0.03 }}
        >
            {parts.map((part, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    variants={selectedAnimation}
                    transition={{ duration: 0.5 }}
                >
                    {part}{by === 'word' && i < parts.length - 1 ? '\u00A0' : ''}
                </motion.span>
            ))}
        </motion.span>
    );
};

// RainbowButton - Animated gradient button with shimmer
export const RainbowButton = ({ children, onClick, className = '' }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`relative px-8 py-4 rounded-full font-bold text-white overflow-hidden group ${className}`}
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x" />

            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                    x: ['-200%', '200%']
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />

            {/* Button content */}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

// VideoText - Text with video background fill
export const VideoText = ({ children, src, className = '' }) => {
    return (
        <div className={`relative h-full w-full overflow-hidden ${className}`}>
            {/* Video background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={src} type="video/webm" />
                <source src={src.replace('.webm', '.mp4')} type="video/mp4" />
            </video>

            {/* SVG Mask - Robust approach for video-filled text */}
            <svg className="absolute inset-0 w-full h-full select-none" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <mask id="videoTextMask">
                        <rect width="100%" height="100%" fill="white" />
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="font-black text-[10vw] fill-black"
                        >
                            {children}
                        </text>
                    </mask>
                </defs>
                <rect width="100%" height="100%" fill="black" mask="url(#videoTextMask)" />
            </svg>
        </div>
    );
};

// GradientText - Animated gradient text
export const GradientText = ({ children, className = '' }) => {
    return (
        <span
            className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x bg-[length:200%_auto] ${className}`}
        >
            {children}
        </span>
    );
};

// ScrollVelocityContainer - Container for velocity-based scroll animations
export const ScrollVelocityContainer = ({ children, className = '' }) => {
    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

// ScrollVelocityRow - Individual row with velocity-based scroll animation
export const ScrollVelocityRow = ({ children, baseVelocity = 20, direction = 1, className = '' }) => {
    const [offset, setOffset] = useState(0);
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const lastScrollY = useRef(0);
    const animationRef = useRef(null);
    const scrollTimeout = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const velocity = (currentScrollY - lastScrollY.current) * 0.05;
            setScrollVelocity(velocity);
            lastScrollY.current = currentScrollY;

            // Decaying velocity after scroll stops
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => {
                setScrollVelocity(0);
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    useEffect(() => {
        const animate = () => {
            // Speed calculation with scroll influence
            const speed = (baseVelocity + Math.abs(scrollVelocity) * 50) * direction * 0.005;

            setOffset(prev => {
                let nextOffset = prev + speed;

                // For a 6-item track, each item is 16.66%
                // We want to loop every 2 items (one pair) = 33.33%
                const loopPoint = 33.33;

                if (direction === -1) {
                    if (nextOffset <= -loopPoint) return 0;
                } else {
                    if (nextOffset >= 0) return -loopPoint;
                }
                return nextOffset;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [baseVelocity, direction, scrollVelocity]);

    return (
        <div className={`flex whitespace-nowrap ${className}`}>
            <motion.div
                className="flex gap-16 items-center"
                style={{ x: `${offset}%` }}
            >
                {[...Array(6)].map((_, i) => (
                    <span key={i} className={`flex-shrink-0 ${i % 2 === 1 ? 'opacity-20' : ''}`}>
                        {children}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

// FlipText - Text that flips through words with smooth vertical animation
export const FlipText = ({ words = [], className = '', duration = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (words.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, duration);
        return () => clearInterval(interval);
    }, [words.length, duration]);

    if (words.length === 0) return null;
    if (!isClient) return <span className={`inline-block min-w-[120px] ${className}`}>{words[0]}</span>;

    return (
        <span className={`inline-block min-w-[120px] ${className}`} style={{ display: 'inline-block' }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{
                        y: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.25 }
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {words[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

// TypewriterText - Text that types out character by character
export const TypewriterText = ({ words = [], className = '', typeSpeed = 100, deleteSpeed = 50, delayBetween = 2000 }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentText.length < currentWord.length) {
                    setCurrentText(currentWord.slice(0, currentText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), delayBetween);
                }
            } else {
                if (currentText.length > 0) {
                    setCurrentText(currentText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delayBetween]);

    return (
        <span className={className}>
            {currentText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
            />
        </span>
    );
};

// GlitchText - Text with glitch effect
export const GlitchText = ({ children, className = '' }) => {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>
            <span
                className="absolute top-0 left-0 text-cyan-400 z-0 animate-glitch-1"
                style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
                {children}
            </span>
            <span
                className="absolute top-0 left-0 text-pink-400 z-0 animate-glitch-2"
                style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
                {children}
            </span>
        </span>
    );
};
