import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function TypingAnimation({
    children,
    className = "",
    duration = 30, // milliseconds per character
    delay = 0,
}) {
    const text = typeof children === "string" ? children : String(children);
    const [displayedText, setDisplayedText] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    // Only start when it scrolls into view
    useEffect(() => {
        if (isInView) {
            const startTimeout = setTimeout(() => {
                setHasStarted(true);
            }, delay);
            return () => clearTimeout(startTimeout);
        }
    }, [isInView, delay]);

    useEffect(() => {
        // Reset the typing effect entirely if the incoming text changes
        setDisplayedText("");

        if (!hasStarted) return;

        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                // Ensure we use functional state updates to avoid stale closures
                setDisplayedText(() => text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, duration);

        return () => {
            clearInterval(typingEffect);
        };
    }, [text, duration, hasStarted]);

    return (
        <span ref={ref} className={className}>
            {displayedText}
            {/* Blinking cursor */}
            <span className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 translate-y-[0.15em] animate-pulse" style={{ opacity: displayedText.length === text.length ? 0 : 1 }} />
        </span>
    );
}
