import React, { useEffect, useRef } from 'react';

/*
  Premium wave-glow border frame.
  A visible solid border around the entire viewport with a flowing wave
  of light that travels along the edges, emitting a soft outer glow.
  Uses the site palette: cyan (#06b6d4), purple (#a855f7), pink (#ec4899).
*/

const BorderFrame = () => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let w, h;

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

        // Site palette
        const palette = [
            [6, 182, 212],    // cyan
            [139, 92, 246],   // purple
            [168, 85, 247],   // violet
            [236, 72, 153],   // pink
            [139, 92, 246],   // purple (loop back)
            [6, 182, 212],    // cyan (loop back)
        ];

        // Lerp between palette colors based on position
        const getColor = (frac) => {
            const idx = frac * (palette.length - 1);
            const i = Math.floor(idx);
            const t = idx - i;
            const a = palette[Math.min(i, palette.length - 1)];
            const b = palette[Math.min(i + 1, palette.length - 1)];
            return [
                a[0] + (b[0] - a[0]) * t,
                a[1] + (b[1] - a[1]) * t,
                a[2] + (b[2] - a[2]) * t,
            ];
        };

        // Get x,y on the perimeter (0→1 maps around the entire rectangle)
        const posOnEdge = (frac, W, H) => {
            const perim = 2 * (W + H);
            let pos = frac * perim;
            if (pos < W) return { x: pos, y: 0, edge: 'top' };
            pos -= W;
            if (pos < H) return { x: W, y: pos, edge: 'right' };
            pos -= H;
            if (pos < W) return { x: W - pos, y: H, edge: 'bottom' };
            pos -= W;
            return { x: 0, y: H - pos, edge: 'left' };
        };

        const BORDER = 2;
        let time = 0;

        const render = () => {
            time += 0.003;
            ctx.clearRect(0, 0, w, h);

            const steps = 600;

            for (let i = 0; i < steps; i++) {
                const frac = i / steps;

                // This fraction determines the base color from the palette
                // The wave: shift the palette position over time so colors flow
                const colorFrac = (frac + time) % 1;
                const [r, g, b] = getColor(colorFrac);

                // Wave intensity: a bright "hot spot" that travels around
                const wave1 = Math.pow(Math.max(0, Math.cos((frac - time * 1.2) * Math.PI * 2)), 4);
                const wave2 = Math.pow(Math.max(0, Math.cos((frac - time * 0.8 + 0.5) * Math.PI * 2)), 4);
                const wave = Math.max(wave1, wave2);

                // Base alpha for the border + wave boost
                const baseAlpha = 0.35 + wave * 0.65;

                const { x, y, edge } = posOnEdge(frac, w, h);

                // Draw the border segment
                ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${baseAlpha})`;
                if (edge === 'top') ctx.fillRect(x - 1, 0, 3, BORDER);
                else if (edge === 'right') ctx.fillRect(w - BORDER, y - 1, BORDER, 3);
                else if (edge === 'bottom') ctx.fillRect(x - 1, h - BORDER, 3, BORDER);
                else ctx.fillRect(0, y - 1, BORDER, 3);

                // Glow — only where the wave is bright
                if (wave > 0.1) {
                    const glowSize = 8 + wave * 18;
                    const glowAlpha = wave * 0.25;
                    const grad = ctx.createRadialGradient(
                        edge === 'right' ? w : edge === 'left' ? 0 : x,
                        edge === 'bottom' ? h : edge === 'top' ? 0 : y,
                        0,
                        edge === 'right' ? w : edge === 'left' ? 0 : x,
                        edge === 'bottom' ? h : edge === 'top' ? 0 : y,
                        glowSize
                    );
                    grad.addColorStop(0, `rgba(${r | 0},${g | 0},${b | 0},${glowAlpha})`);
                    grad.addColorStop(1, 'transparent');
                    ctx.fillStyle = grad;
                    const gs = glowSize * 2;
                    ctx.fillRect(
                        (edge === 'right' ? w - gs : edge === 'left' ? 0 : x - glowSize),
                        (edge === 'bottom' ? h - gs : edge === 'top' ? 0 : y - glowSize),
                        gs, gs
                    );
                }
            }

            frameRef.current = requestAnimationFrame(render);
        };

        frameRef.current = requestAnimationFrame(render);
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[100] pointer-events-none"
        />
    );
};

export default BorderFrame;
