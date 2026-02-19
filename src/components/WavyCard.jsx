import React, { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";

const WavyCard = ({ children, className = "", color = "#06b6d4" }) => {
  const [ref, setRef] = useState(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const rawId = useId();
  const clipId = `wavy-clip-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    if (!ref) return;

    const observer = new ResizeObserver((entries) => {
        if(entries[0]) {
            setSize({
                w: entries[0].contentRect.width,
                h: entries[0].contentRect.height
            });
        }
    });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  const { w, h } = size;

  // Paths generation
  const generatePath = (offsetMultiplier) => {
    if (w === 0 || h === 0) return "M0 0 Z";

    const m = offsetMultiplier;
    const amp = 8;
    const r = (n) => n * m;

    return `
      M 0 0
      C ${w * 0.25} ${r(amp)}, ${w * 0.75} ${r(-amp)}, ${w} 0
      C ${w + r(amp)} ${h * 0.25}, ${w + r(-amp)} ${h * 0.75}, ${w} ${h}
      C ${w * 0.75} ${h + r(amp)}, ${w * 0.25} ${h + r(-amp)}, 0 ${h}
      C ${r(-amp)} ${h * 0.75}, ${r(amp)} ${h * 0.25}, 0 0
      Z
    `;
  };

  const p1 = generatePath(1);
  const p2 = generatePath(-1);
  const p3 = generatePath(0.5);

  // If size is 0, we render a placeholder to measure.
  // We use opacity 0 to hide it until we have dimensions.
  if (w === 0 || h === 0) {
      return (
        <div ref={setRef} className={`relative ${className}`} style={{ opacity: 0 }}>
            {children}
        </div>
      );
  }

  return (
    <div ref={setRef} className={`relative ${className}`}>
      {/* SVG for the Border Stroke */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 20 }}>
         <motion.path
            d={p1}
            animate={{ d: [p1, p2, p3, p1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </svg>

      {/* SVG for Clipping - Hidden but referenced */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <clipPath id={clipId}>
             <motion.path
                d={p1}
                animate={{ d: [p1, p2, p3, p1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             />
          </clipPath>
        </defs>
      </svg>

      {/* Content Container */}
      {/* We apply the clipPath here. The background color of the card should be on this element or inside it. */}
      <div
        style={{ clipPath: `url(#${clipId})` }}
        className="relative w-full h-full bg-[#18181b]"
      >
        {children}
      </div>
    </div>
  );
};

export default WavyCard;
