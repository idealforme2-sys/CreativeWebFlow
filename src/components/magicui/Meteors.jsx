import React, { useEffect, useRef, useState } from "react";

export const Meteors = ({ number = 20, className = "" }) => {
    const [meteors, setMeteors] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const getBounds = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                return { width: rect.width, height: rect.height };
            }
            return { width: window.innerWidth, height: window.innerHeight };
        };

        const buildMeteors = () => {
            const { width, height } = getBounds();
            const safeWidth = Math.max(1, width);
            const safeHeight = Math.max(1, height);
            setMeteors(
                new Array(number).fill(true).map(() => ({
                    top: Math.floor(Math.random() * (safeHeight * 0.2)) - 50 + "px",
                    left: Math.floor(Math.random() * safeWidth * 1.2) + "px",
                    animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
                    animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
                }))
            );
        };

        buildMeteors();

        const handleResize = () => buildMeteors();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [number]);

    return (
        <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
            <style>{`
          @keyframes meteor {
            0% { transform: rotate(215deg) translateX(0); opacity: 1; }
            70% { opacity: 1; }
            100% { transform: rotate(215deg) translateX(-1000px); opacity: 0; }
          }
          .animate-meteor-effect {
            animation: meteor linear infinite;
          }
        `}</style>
            {meteors.map((el, idx) => (
                <span
                    key={idx}
                    className="animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
                    style={{
                        top: el.top,
                        left: el.left,
                        animationDelay: el.animationDelay,
                        animationDuration: el.animationDuration,
                    }}
                />
            ))}
        </div>
    );
};
