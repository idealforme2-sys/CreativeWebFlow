import React from 'react';

/*
  Premium constant glowing border.
  A solid 2px line around the viewport that is continuously illuminated.
  Uses the brand palette (cyan, purple, pink). The colors constantly flow
  along all 4 edges simultaneously, creating a seamless, powerful neon glow
  like a high-end gamer aesthetic.
*/

const BorderFrame = () => {
    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {/* Very subtle inner vignette to make the edge glow pop */}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(168,85,247,0.08)] pointer-events-none" />

            {/* ─── Top Edge ─── */}
            <div
                className="absolute top-0 left-0 w-full h-[2px] opacity-90"
                style={{
                    background: 'linear-gradient(90deg, #06b6d4 0%, #a855f7 33%, #ec4899 66%, #06b6d4 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'flow-h 3s linear infinite',
                    boxShadow: '0 0 10px 1px rgba(6,182,212,0.6), 0 0 20px 2px rgba(168,85,247,0.4)',
                }}
            />
            {/* ─── Bottom Edge ─── */}
            <div
                className="absolute bottom-0 left-0 w-full h-[2px] opacity-90"
                style={{
                    background: 'linear-gradient(270deg, #06b6d4 0%, #a855f7 33%, #ec4899 66%, #06b6d4 100%)',
                    backgroundSize: '200% 100%',
                    animation: 'flow-h 3s linear infinite',
                    boxShadow: '0 0 10px 1px rgba(236,72,153,0.6), 0 0 20px 2px rgba(168,85,247,0.4)',
                }}
            />
            {/* ─── Left Edge ─── */}
            <div
                className="absolute top-0 left-0 w-[2px] h-full opacity-90"
                style={{
                    background: 'linear-gradient(180deg, #06b6d4 0%, #a855f7 33%, #ec4899 66%, #06b6d4 100%)',
                    backgroundSize: '100% 200%',
                    animation: 'flow-v 3s linear infinite',
                    boxShadow: '0 0 10px 1px rgba(6,182,212,0.6), 0 0 20px 2px rgba(168,85,247,0.4)',
                }}
            />
            {/* ─── Right Edge ─── */}
            <div
                className="absolute top-0 right-0 w-[2px] h-full opacity-90"
                style={{
                    background: 'linear-gradient(360deg, #06b6d4 0%, #a855f7 33%, #ec4899 66%, #06b6d4 100%)',
                    backgroundSize: '100% 200%',
                    animation: 'flow-v 3s linear infinite',
                    boxShadow: '0 0 10px 1px rgba(236,72,153,0.6), 0 0 20px 2px rgba(168,85,247,0.4)',
                }}
            />

            {/* Premium Tech Corner Brackets */}
            {[
                { top: 0, left: 0, rotate: 0, color: '#06b6d4' },
                { top: 0, right: 0, rotate: 90, color: '#a855f7' },
                { bottom: 0, right: 0, rotate: 180, color: '#ec4899' },
                { bottom: 0, left: 0, rotate: 270, color: '#06b6d4' },
            ].map((c, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        top: c.top !== undefined ? c.top : 'auto',
                        left: c.left !== undefined ? c.left : 'auto',
                        right: c.right !== undefined ? c.right : 'auto',
                        bottom: c.bottom !== undefined ? c.bottom : 'auto',
                        width: '40px',
                        height: '40px',
                        filter: `drop-shadow(0 0 12px ${c.color})`
                    }}
                >
                    <svg
                        width="40" height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: `rotate(${c.rotate}deg)` }}
                    >
                        {/* Outer bracket layer */}
                        <path d="M0 2 L20 2" stroke="white" strokeWidth="2.5" strokeOpacity="0.9" />
                        <path d="M2 0 L2 20" stroke="white" strokeWidth="2.5" strokeOpacity="0.9" />
                        {/* Inner colored accent layer */}
                        <path d="M12 6 L24 6" stroke={c.color} strokeWidth="2" strokeOpacity="0.8" />
                        <path d="M6 12 L6 24" stroke={c.color} strokeWidth="2" strokeOpacity="0.8" />
                    </svg>
                </div>
            ))}

            <style>{`
                /*
                  background-size: 200% 100%;
                  Shifting from 0% to 100% moves the background exactly its own width.
                  Since half the background matches the other half perfectly, it loops flawlessly.
                */
                @keyframes flow-h {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
                @keyframes flow-v {
                    0% { background-position: 50% 0%; }
                    100% { background-position: 50% 100%; }
                }
            `}</style>
        </div>
    );
};

export default BorderFrame;
