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
            const inset = 2; // Restore bounding box to absolute 2px outward edge

            // Top edge
            for (let x = inset; x < w - inset; x += spacing) vertices.push({ base_x: x, base_y: inset, x, y: inset, vx: 0, vy: 0 });
            vertices.push({ base_x: w - inset, base_y: inset, x: w - inset, y: inset, vx: 0, vy: 0 });

            // Right edge
            for (let y = inset; y < h - inset; y += spacing) vertices.push({ base_x: w - inset, base_y: y, x: w - inset, y, vx: 0, vy: 0 });
            vertices.push({ base_x: w - inset, base_y: h - inset, x: w - inset, y: h - inset, vx: 0, vy: 0 });

            // Bottom edge
            for (let x = w - inset; x > inset; x -= spacing) vertices.push({ base_x: x, base_y: h - inset, x, y: h - inset, vx: 0, vy: 0 });
            vertices.push({ base_x: inset, base_y: h - inset, x: inset, y: h - inset, vx: 0, vy: 0 });

            // Left edge
            for (let y = h - inset; y > inset; y -= spacing) vertices.push({ base_x: inset, base_y: y, x: inset, y, vx: 0, vy: 0 });
        };

        const resize = () => {
            // Use clientWidth to precisely avoid scrollbars on the right edge
            w = document.documentElement.clientWidth;
            h = window.innerHeight;

            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            buildVertices();
        };
        resize();

        // ResizeObserver is required to catch when the layout shifts due to the scrollbar appearing
        const resizeObserver = new ResizeObserver(() => resize());
        resizeObserver.observe(document.documentElement);
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
            const tension = 0.04;  // Lowered for watery looseness (was 0.08)
            const friction = 0.85; // Increased for longer traveling waves (was 0.75)
            const magneticRadius = 250; // Distance to trigger ripple

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
                        // Water Ripple Physics
                        // Calculate a traveling sine wave based on distance and time
                        const waveSpeed = globalTime * 12; // Speed of the ripple
                        const ripplePhase = (dist * 0.04) - waveSpeed;
                        const amplitude = 35; // How far the ripple bulges

                        // Smooth falloff so the ripple gently dies out at the edges of the radius
                        const falloff = Math.pow((magneticRadius - dist) / magneticRadius, 2);

                        // The actual displacement force of the wave at this node
                        const rippleForce = Math.sin(ripplePhase) * amplitude * falloff * (1 - pinForce);

                        // Apply the ripple force perpendicularly (inward/outward) depending on which edge the node belongs to
                        const isTopOrBottomEdge = v.base_y <= inset + 1 || v.base_y >= h - inset - 1;
                        const isLeftOrRightEdge = v.base_x <= inset + 1 || v.base_x >= w - inset - 1;

                        if (isTopOrBottomEdge && !isLeftOrRightEdge) {
                            // On top/bottom edges, ripple vertically
                            ty += (v.base_y <= inset + 1) ? rippleForce : -rippleForce;
                        } else if (isLeftOrRightEdge && !isTopOrBottomEdge) {
                            // On left/right edges, ripple horizontally
                            tx += (v.base_x <= inset + 1) ? rippleForce : -rippleForce;
                        } else {
                            // Corners (though pinned, mathematically they ripple diagonally)
                            const dirX = (v.base_x <= w / 2) ? 1 : -1;
                            const dirY = (v.base_y <= h / 2) ? 1 : -1;
                            tx += rippleForce * 0.707 * dirX;
                            ty += rippleForce * 0.707 * dirY;
                        }
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
            resizeObserver.disconnect();
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(frameId);
        };
    }, []);

    // Perfectly aligned explicit corner paths (no rotation transforms needed)
    // Mirrors the basic 2-line structure: M12 6 L24 6, M6 12 L6 24 to all 4 corners
    const corners = [
        {
            position: { top: 0, left: 0 },
            color: '#06b6d4',
            paths: ["M12 6 L24 6", "M6 12 L6 24"]
        },
        {
            position: { top: 0, right: 0 },
            color: '#06b6d4',
            paths: ["M16 6 L28 6", "M34 12 L34 24"]
        },
        {
            position: { bottom: 0, right: 0 },
            color: '#06b6d4',
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
                        {/* Only the internal accent ticks perfectly positioned to the true corner */}
                        {c.paths.map((d, pathIdx) => (
                            <path key={`c-${pathIdx}`} d={d} stroke={c.color} strokeWidth="2" strokeOpacity="0.8" strokeLinecap="round" />
                        ))}
                    </motion.svg>
                </div>
            ))}
        </div>
    );
};

export default BorderFrame;
