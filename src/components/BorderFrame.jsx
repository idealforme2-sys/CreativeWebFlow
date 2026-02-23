import React, { useEffect, useRef } from 'react';

/*
  Premium constant glowing border with Interactive Edge Clouds.
  A solid 2px line around the viewport that is continuously illuminated (CSS).
  A Canvas overlay tracks the mouse and emits soft, dissipating clouds when hovering near the edges.
*/

const BorderFrame = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;
        let dpr = window.devicePixelRatio || 1;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle system for the fog/clouds
        const particles = [];
        let mouseX = -1000;
        let mouseY = -1000;
        let isNearEdge = false;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Check if mouse is within 80px of any edge
            const edgeThreshold = 80;
            isNearEdge = (
                mouseX < edgeThreshold ||
                mouseX > w - edgeThreshold ||
                mouseY < edgeThreshold ||
                mouseY > h - edgeThreshold
            );
        };
        window.addEventListener('mousemove', handleMouseMove);

        const spawnCloud = (mx, my) => {
            // Colors matching the brand palette
            const colors = ['#06b6d4', '#a855f7', '#ec4899'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Jitter the spawn position slightly
            const x = mx + (Math.random() - 0.5) * 40;
            const y = my + (Math.random() - 0.5) * 40;

            // Initial size and growth rate
            const size = 30 + Math.random() * 40;
            const maxSize = size + 80 + Math.random() * 60;

            // Slow, drifting movement
            const vx = (Math.random() - 0.5) * 1.5;
            const vy = (Math.random() - 0.5) * 1.5;

            particles.push({
                x, y,
                vx, vy,
                size,
                maxSize,
                life: 1.0,
                decay: 0.005 + Math.random() * 0.01,
                color
            });
        };

        let frameId;
        const render = () => {
            ctx.clearRect(0, 0, w, h);

            // Spawn particles if mouse is moving near the edge
            // Use Math.random to limit spawn rate so it's a soft, airy cloud and not a solid block
            if (isNearEdge && Math.random() < 0.4) {
                spawnCloud(mouseX, mouseY);
            }

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.size += (p.maxSize - p.size) * 0.02; // ease out size growth
                p.life -= p.decay;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                // Smooth fade in and out curve based on life
                const alpha = Math.sin(p.life * Math.PI) * 0.15; // Max opacity 15% for soft cloud feel

                // Draw radial gradient cloud
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);

                // Convert hex to rgb for rgba manipulation
                // #06b6d4 -> 6, 182, 212
                // #a855f7 -> 168, 85, 247
                // #ec4899 -> 236, 72, 153
                let r, g, b;
                if (p.color === '#06b6d4') { r = 6; g = 182; b = 212; }
                else if (p.color === '#a855f7') { r = 168; g = 85; b = 247; }
                else { r = 236; g = 72; b = 153; }

                grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
                grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.5})`);
                grad.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            frameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {/* Interactive Cloud Overlay Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ mixBlendMode: 'screen' }}
            />

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
