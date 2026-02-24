import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function TypingAnimation({
    children,
    className = "",
    duration = 30,
    delay = 0,
}) {
    const text = typeof children === "string" ? children : String(children);
    const [displayedText, setDisplayedText] = useState("");
    const ref = useRef(null);
    const hasAnimated = useRef(false);
    const prevText = useRef(text);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    if (prevText.current !== text) {
        prevText.current = text;
        hasAnimated.current = false;
    }

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;

        const startTimeout = setTimeout(() => {
            hasAnimated.current = true;
            let i = 0;
            setDisplayedText("");
            const typingEffect = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(text.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(typingEffect);
                }
            }, duration);

            return () => clearInterval(typingEffect);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [isInView, text, duration, delay]);

    const isComplete = displayedText.length === text.length;

    return (
        <span ref={ref} className={`${className} relative block mb-6`}>
            {/* Invisible full text reserves height to prevent layout shifts */}
            <span className="invisible block" aria-hidden="true">{text}</span>
            {/* Visible typed text overlaid */}
            <span className="absolute top-0 left-0 right-0">
                {displayedText || "\u00A0"}
                <span
                    className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-1 translate-y-[0.15em] animate-pulse"
                    style={{ opacity: isComplete ? 0 : 1 }}
                />
            </span>
        </span>
    );
}
