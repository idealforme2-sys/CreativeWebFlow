import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/*
  Premium viewport border frame:
  - Canvas-based orbiting light particles that chase around the perimeter
  - Gradient edge glow bands that breathe
  - Animated corner pieces with tech-HUD brackets
  - Subtle inner vignette border
*/

const BorderFrame = () => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let w = window.innerWidth;
        let h = window.innerHeight;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
        };
        resize();
        window.addEventListener('resize', resize);

        // Perimeter length
        const perimeter = 2 * (w + h);

        // Get x,y from a perimeter position (0 to perimeter)
        const posOnPerimeter = (pos) => {
            pos = ((pos % perimeter) + perimeter) % perimeter;
            if (pos < w) return { x: pos, y: 0 }; // top
            pos -= w;
            if (pos < h) return { x: w, y: pos }; // right
            pos -= h;
            if (pos < w) return { x: w - pos, y: h }; // bottom
            pos -= w;
            return { x: 0, y: h - pos }; // left
        };

        // Create 3 chaser particles with different speeds and colors
        const chasers = [
            { pos: 0, speed: 120, hue: 186, sat: 90, tail: 100 },           // cyan
            { pos: perimeter * 0.33, speed: 95, hue: 270, sat: 80, tail: 80 }, // purple
            { pos: perimeter * 0.66, speed: 110, hue: 330, sat: 85, tail: 90 }, // pink
        ];

        // Sparkle particles that spawn along edges
        const sparkles = [];
        const spawnSparkle = (x, y, hue) => {
            if (sparkles.length > 30) return;
            sparkles.push({
                x, y,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                life: 1,
                decay: 0.01 + Math.random() * 0.02,
                size: 0.5 + Math.random() * 1.5,
                hue,
            });
        };

        let t = 0;
        let lastTime = performance.now();

        const render = (now) => {
            const dt = (now - lastTime) / 1000;
            lastTime = now;
            t += dt;

            ctx.clearRect(0, 0, w, h);

            // Draw edge glow bands (subtle gradient along all 4 edges)
            const edgeSize = 1;
            const breathAlpha = 0.03 + 0.015 * Math.sin(t * 0.8);

            // Top
            const tg = ctx.createLinearGradient(0, 0, 0, edgeSize * 40);
            tg.addColorStop(0, `rgba(6,182,212,${breathAlpha * 1.5})`);
            tg.addColorStop(1, 'transparent');
            ctx.fillStyle = tg;
            ctx.fillRect(0, 0, w, edgeSize * 40);

            // Bottom
            const bg = ctx.createLinearGradient(0, h, 0, h - edgeSize * 40);
            bg.addColorStop(0, `rgba(236,72,153,${breathAlpha})`);
            bg.addColorStop(1, 'transparent');
            ctx.fillStyle = bg;
            ctx.fillRect(0, h - edgeSize * 40, w, edgeSize * 40);

            // Left
            const lg = ctx.createLinearGradient(0, 0, edgeSize * 30, 0);
            lg.addColorStop(0, `rgba(168,85,247,${breathAlpha})`);
            lg.addColorStop(1, 'transparent');
            ctx.fillStyle = lg;
            ctx.fillRect(0, 0, edgeSize * 30, h);

            // Right
            const rg = ctx.createLinearGradient(w, 0, w - edgeSize * 30, 0);
            rg.addColorStop(0, `rgba(168,85,247,${breathAlpha})`);
            rg.addColorStop(1, 'transparent');
            ctx.fillStyle = rg;
            ctx.fillRect(w - edgeSize * 30, 0, edgeSize * 30, h);

            // Outer border line (very thin)
            ctx.strokeStyle = `rgba(255,255,255,${0.04 + 0.01 * Math.sin(t * 0.5)})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

            // Chasers — light particles orbiting the viewport edge
            chasers.forEach(c => {
                c.pos += c.speed * dt;
                if (c.pos > perimeter) c.pos -= perimeter;

                const head = posOnPerimeter(c.pos);

                // Draw tail (series of fading dots behind the head)
                for (let i = 0; i < c.tail; i++) {
                    const tailPos = c.pos - i * (c.speed * 0.015);
                    const p = posOnPerimeter(tailPos);
                    const alpha = (1 - i / c.tail) * 0.6;
                    const sz = (1 - i / c.tail) * 3;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${c.hue}, ${c.sat}%, 65%, ${alpha})`;
                    ctx.fill();
                }

                // Head glow
                const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 15);
                grad.addColorStop(0, `hsla(${c.hue}, ${c.sat}%, 70%, 0.5)`);
                grad.addColorStop(0.5, `hsla(${c.hue}, ${c.sat}%, 60%, 0.15)`);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(head.x, head.y, 15, 0, Math.PI * 2);
                ctx.fill();

                // Spawn occasional sparkles
                if (Math.random() < 0.15) spawnSparkle(head.x, head.y, c.hue);
            });

            // Update and render sparkles
            for (let i = sparkles.length - 1; i >= 0; i--) {
                const s = sparkles[i];
                s.x += s.vx;
                s.y += s.vy;
                s.life -= s.decay;
                if (s.life <= 0) { sparkles.splice(i, 1); continue; }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${s.hue}, 80%, 70%, ${s.life * 0.5})`;
                ctx.fill();
            }

            frameRef.current = requestAnimationFrame(render);
        };

        frameRef.current = requestAnimationFrame(render);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    const cornerSize = 30;
    const corners = [
        { pos: 'top-0 left-0', rotate: 0, color: '#06b6d4' },
        { pos: 'top-0 right-0', rotate: 90, color: '#a855f7' },
        { pos: 'bottom-0 right-0', rotate: 180, color: '#ec4899' },
        { pos: 'bottom-0 left-0', rotate: 270, color: '#a855f7' },
    ];

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Animated corner HUD brackets */}
            {corners.map((c, i) => (
                <div key={i} className={`absolute ${c.pos}`} style={{ width: cornerSize, height: cornerSize }}>
                    <motion.svg
                        width={cornerSize} height={cornerSize}
                        viewBox="0 0 30 30"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                        style={{ transform: `rotate(${c.rotate}deg)` }}
                    >
                        {/* Bracket lines */}
                        <motion.line
                            x1="0" y1="0" x2="20" y2="0"
                            stroke={c.color} strokeWidth="1.5" strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                        />
                        <motion.line
                            x1="0" y1="0" x2="0" y2="20"
                            stroke={c.color} strokeWidth="1.5" strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                        />
                        {/* Corner dot */}
                        <motion.circle
                            cx="0" cy="0" r="2"
                            fill={c.color}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ delay: 1 + i * 0.15, duration: 2, repeat: Infinity }}
                            style={{ filter: `drop-shadow(0 0 4px ${c.color})` }}
                        />
                    </motion.svg>
                </div>
            ))}
        </div>
    );
};

export default BorderFrame;
