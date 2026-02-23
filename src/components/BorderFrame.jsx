import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/*
  Premium Constant Glowing Border with Magnetic Elasticity.
  Matches the exact visual style of the static CSS border but runs on Canvas
  to allow real-time physics bending when the cursor approaches the edge.
  Features: 
  - 2px continuous stroke matching the site palette (cyan, purple, pink)
  - Double neon drop shadow
  - No scrolling chasers
  - Colored tech corners (no white crosshairs)
*/

const BorderFrame = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let dpr = window.devicePixelRatio || 1;
        let w, h;

        let vertices = [];
        const spacing = 20; // Distance between physics nodes

        const buildVertices = () => {
            vertices = [];
            const inset = 2; // Keep stroke thickness fully inside canvas
            const boxW = w - inset * 2;
            const boxH = h - inset * 2;
            const perimeter = 2 * (boxW + boxH);
            const numNodes = Math.max(10, Math.floor(perimeter / spacing));

            for (let i = 0; i < numNodes; i++) {
                const frac = i / numNodes;
                const pos = frac * perimeter;
                let x, y;

                if (pos < boxW) {
                    x = inset + pos; y = inset;
                } else if (pos < boxW + boxH) {
                    x = w - inset; y = inset + (pos - boxW);
                } else if (pos < 2 * boxW + boxH) {
                    x = w - inset - (pos - (boxW + boxH)); y = h - inset;
                } else {
                    x = inset; y = h - inset - (pos - (2 * boxW + boxH));
                }

                vertices.push({ base_x: x, base_y: y, x, y, vx: 0, vy: 0 });
            }
        };

        const resize = () => {
            // Use current viewport dimensions (excluding scrollbars), fixes right/bottom clipping
            w = document.documentElement.clientWidth;
            h = window.innerHeight; // Keep innerHeight for bottom, but clientWidth for horizontal scrollbars
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            buildVertices();
        };
        resize();
        window.addEventListener('resize', resize);

        let mouseX = -1000;
        let mouseY = -1000;
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        let frameId;
        let lastTime = performance.now();
        let globalTime = 0;

        const render = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1); // Cap delta time to prevent physics explosions
            lastTime = now;
            globalTime += dt;

            ctx.clearRect(0, 0, w, h);

            // ─── Physics Update ───
            const tension = 0.08;
            const friction = 0.75;
            const magneticRadius = 250; // How close mouse needs to be to pull the border

            // Optimization: check if mouse is near ANY edge
            const isNearEdge = (
                mouseX < magneticRadius ||
                mouseX > w - magneticRadius ||
                mouseY < magneticRadius ||
                mouseY > h - magneticRadius
            );

            for (let i = 0; i < vertices.length; i++) {
                const v = vertices[i];
                let tx = v.base_x;
                let ty = v.base_y;

                if (isNearEdge) {
                    // Calculate distance to nearest corner to freeze the physics
                    const inset = 2;
                    let pinForce = 0;
                    const dTL = Math.sqrt(Math.pow(v.base_x - inset, 2) + Math.pow(v.base_y - inset, 2));
                    const dTR = Math.sqrt(Math.pow(v.base_x - (w - inset), 2) + Math.pow(v.base_y - inset, 2));
                    const dBL = Math.sqrt(Math.pow(v.base_x - inset, 2) + Math.pow(v.base_y - (h - inset), 2));
                    const dBR = Math.sqrt(Math.pow(v.base_x - (w - inset), 2) + Math.pow(v.base_y - (h - inset), 2));
                    const minDist = Math.min(dTL, dTR, dBL, dBR);

                    // Fully pin nodes within 60px of corners, smooth falloff up to 200px
                    if (minDist < 60) pinForce = 1;
                    else if (minDist < 200) pinForce = 1 - ((minDist - 60) / 140);

                    const dx = mouseX - v.base_x;
                    const dy = mouseY - v.base_y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < magneticRadius) {
                        // Magnetic pull: stronger as you get closer to the edge node
                        // Uses an ease-out bell curve for smooth bending
                        const force = Math.pow((magneticRadius - dist) / magneticRadius, 2);
                        const pullAmount = 0.35; // How strongly it pulls into the screen
                        tx += dx * force * pullAmount * (1 - pinForce);
                        ty += dy * force * pullAmount * (1 - pinForce);
                    }
                }

                v.vx += (tx - v.x) * tension;
                v.vy += (ty - v.y) * tension;
                v.vx *= friction;
                v.vy *= friction;
                v.x += v.vx;
                v.y += v.vy;
            }

            if (vertices.length === 0) return;

            // ─── Draw Elastic Tube Core ───
            ctx.beginPath();
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let i = 1; i < vertices.length; i++) {
                ctx.lineTo(vertices[i].x, vertices[i].y);
            }
            ctx.closePath();

            // Flowing gradient spanning the viewport to simulate the animated CSS background
            const gradRot = globalTime * 0.4;
            const cx = w / 2;
            const cy = h / 2;
            const radius = Math.max(w, h);
            const grad = ctx.createLinearGradient(
                cx + Math.cos(gradRot) * radius, cy + Math.sin(gradRot) * radius,
                cx - Math.cos(gradRot) * radius, cy - Math.sin(gradRot) * radius
            );
            grad.addColorStop(0, '#06b6d4');
            grad.addColorStop(0.33, '#a855f7');
            grad.addColorStop(0.66, '#ec4899');
            grad.addColorStop(1, '#06b6d4');

            ctx.lineWidth = 2; // Exact match to CSS 2px border
            ctx.strokeStyle = grad;
            ctx.globalAlpha = 0.9;

            // First glow layer (cyan tint, tight)
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(6,182,212,0.6)';
            ctx.stroke();

            // Second glow layer (purple tint, wider)
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(168,85,247,0.4)';
            ctx.stroke();

            // Crisp solid core line layer
            ctx.shadowBlur = 0;
            ctx.stroke();

            frameId = requestAnimationFrame(render);
        };

        frameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(frameId);
        };
    }, []);

    // Perfectly aligned explicit corner paths (no rotation transforms needed)
    const corners = [
        {
            position: { top: 0, left: 0 },
            color: '#06b6d4',
            paths: ["M12 6 L24 6", "M6 12 L6 24"]
        },
        {
            position: { top: 0, right: 0 },
            color: '#a855f7',
            paths: ["M16 6 L28 6", "M34 12 L34 24"]
        },
        {
            position: { bottom: 0, right: 0 },
            color: '#ec4899',
            paths: ["M16 34 L28 34", "M34 16 L34 28"]
        },
        {
            position: { bottom: 0, left: 0 },
            color: '#06b6d4',
            paths: ["M12 34 L24 34", "M6 16 L6 28"]
        },
    ];

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {/* Very subtle inner vignette to make the neon edge pop */}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(168,85,247,0.08)] pointer-events-none" />

            {/* Elastic tracking line canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Premium Tech Corner Brackets */}
            {corners.map((c, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        ...c.position,
                        width: '40px',
                        height: '40px',
                        filter: `drop-shadow(0 0 10px ${c.color})`
                    }}
                >
                    <motion.svg
                        width="40" height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: i * 0.15 }}
                    >
                        {/* Inner colored accent layer ONLY -- perfectly positioned to the true corner */}
                        {c.paths.map((d, pathIdx) => (
                            <path key={pathIdx} d={d} stroke={c.color} strokeWidth="2" strokeOpacity="0.8" strokeLinecap="round" />
                        ))}
                    </motion.svg>
                </div>
            ))}
        </div>
    );
};

export default BorderFrame;
