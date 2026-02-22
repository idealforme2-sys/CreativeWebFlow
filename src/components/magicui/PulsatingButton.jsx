import React from 'react';

export const PulsatingButton = ({ children, className = "", onClick, type = "button" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`relative flex items-center justify-center cursor-pointer group rounded-xl overflow-hidden shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${className}`}
            style={{
                background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4, #ec4899)',
                backgroundSize: '300% 100%',
                animation: 'pulseBackground 4s linear infinite'
            }}
        >
            {/* CSS Animation embedded for raw speed */}
            <style>{`
                @keyframes pulseBackground {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 150% 50%; }
                }
            `}</style>

            {/* Animated subtle glass reflection */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out" />

            {/* Content Container */}
            <div className="relative z-10 w-full h-full px-8 py-4 text-white font-extrabold tracking-widest text-[15px] uppercase flex items-center justify-center border border-white/20 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                {children}
            </div>
        </button>
    );
};
