import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/*
  Magnetic Plasma Neon Tube Border.
  An ultra-premium, 10k gamer setup interactive border.
  The border is a continuous physical elastic string that bends and snaps
  towards the cursor when the mouse approaches any edge.
  Features a rotating cyan/purple/pink gradient stroke and chasing light nodes
  that perfectly trace the dynamically deformed path.
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
            // Top: 0,0 -> w,0
            for (let x = 0; x <= w; x += spacing) vertices.push({ base_x: x, base_y: 0, x, y: 0, vx: 0, vy: 0 });
            // Right: w,0 -> w,h
            for (let y = spacing; y <= h; y += spacing) vertices.push({ base_x: w, base_y: y, x: w, y, vx: 0, vy: 0 });
            // Bottom: w,h -> 0,h
            for (let x = w - spacing; x >= 0; x -= spacing) vertices.push({ base_x: x, base_y: h, x, y: h, vx: 0, vy: 0 });
            // Left: 0,h -> 0,0
            for (let y = h - spacing; y > 0; y -= spacing) vertices.push({ base_x: 0, base_y: y, x: 0, y, vx: 0, vy: 0 });
        };

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
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

        const chasers = [
            { idx: 0, speed: 60, color: '#06b6d4', size: 3.5 },
            { idx: 0, speed: 85, color: '#a855f7', size: 4.5 },
            { idx: 0, speed: 110, color: '#ec4899', size: 3 },
        ];

        // Stagger initial positions
        setTimeout(() => {
            if (vertices.length > 0) {
                chasers[0].idx = 0;
                chasers[1].idx = vertices.length * 0.33;
                chasers[2].idx = vertices.length * 0.66;
            }
        }, 100);

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
                    const dx = mouseX - v.base_x;
                    const dy = mouseY - v.base_y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < magneticRadius) {
                        // Magnetic pull: stronger as you get closer to the edge node
                        // Uses an ease-out bell curve for smooth bending
                        const force = Math.pow((magneticRadius - dist) / magneticRadius, 2);
                        const pullAmount = 0.35; // How strongly it pulls into the screen
                        tx += dx * force * pullAmount;
                        ty += dy * force * pullAmount;
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

            // Rotating ambient gradient spanning the viewport
            const gradRot = globalTime * 0.8;
            const cx = w / 2;
            const cy = h / 2;
            const radius = Math.max(w, h);
            const grad = ctx.createLinearGradient(
                cx + Math.cos(gradRot) * radius, cy + Math.sin(gradRot) * radius,
                cx - Math.cos(gradRot) * radius, cy - Math.sin(gradRot) * radius
            );
            grad.addColorStop(0, '#06b6d4');
            grad.addColorStop(0.5, '#a855f7');
            grad.addColorStop(1, '#ec4899');

            // Draw outer neon glow
            ctx.lineWidth = 3;
            ctx.strokeStyle = grad;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(168,85,247,0.8)'; // Purple ambient glow
            ctx.stroke();

            // Draw pure white hot core
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ffffff';
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#ffffff';
            ctx.stroke();

            ctx.shadowBlur = 0;

            // ─── Draw Chasers ───
            chasers.forEach(c => {
                c.idx += c.speed * dt;
                if (c.idx >= vertices.length) c.idx -= vertices.length;

                let i1 = Math.floor(c.idx);
                let i2 = (i1 + 1) % vertices.length;
                let t = c.idx - i1;

                // Interpolate exact position along the physics segments
                let px = vertices[i1].x * (1 - t) + vertices[i2].x * t;
                let py = vertices[i1].y * (1 - t) + vertices[i2].y * t;

                // Chaser Aura
                ctx.beginPath();
                ctx.arc(px, py, c.size * 4, 0, Math.PI * 2);
                ctx.fillStyle = c.color;
                ctx.globalAlpha = 0.4;
                ctx.fill();

                // Chaser Hot Core
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.arc(px, py, c.size, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = c.color;
                ctx.shadowBlur = 12;
                ctx.fill();

                ctx.shadowBlur = 0;
            });

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

    // Minimal corner accents (colored L-brackets without white lines)
    const corners = [
        { top: 0, left: 0, rotate: 0, color: '#06b6d4' },
        { top: 0, right: 0, rotate: 90, color: '#a855f7' },
        { bottom: 0, right: 0, rotate: 180, color: '#ec4899' },
        { bottom: 0, left: 0, rotate: 270, color: '#06b6d4' },
    ];

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {/* Very subtle inner vignette to make the neon edge pop */}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(168,85,247,0.08)] pointer-events-none" />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
            />

            {/* Premium Tech Corner Brackets (Color Only) */}
            {corners.map((c, i) => (
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
                        filter: `drop-shadow(0 0 10px ${c.color})` // Glowing brackets
                    }}
                >
                    <motion.svg
                        width="40" height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: `rotate(${c.rotate}deg)` }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: i * 0.15 }}
                    >
                        <path d="M10 4 L26 4" stroke={c.color} strokeWidth="3" strokeOpacity="1" strokeLinecap="round" />
                        <path d="M4 10 L4 26" stroke={c.color} strokeWidth="3" strokeOpacity="1" strokeLinecap="round" />
                    </motion.svg>
                </div>
            ))}
        </div>
    );
};

export default BorderFrame;
