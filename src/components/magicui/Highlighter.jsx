import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export const Highlighter = ({ children, action = "highlight", color = "#87CEFA", className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <span ref={ref} className={`relative inline-block ${className}`}>
            <span className="relative z-10 font-bold">{children}</span>
            <motion.span
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className={`absolute left-0 ${action === 'underline' ? '-bottom-1' : 'bottom-0'} z-0 rounded-sm pointer-events-none`}
                style={{
                    height: action === "underline" ? "4px" : "100%",
                    backgroundColor: color,
                    opacity: action === "underline" ? 1 : 0.4,
                }}
            />
        </span>
    );
};
