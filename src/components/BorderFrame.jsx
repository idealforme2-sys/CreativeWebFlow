import React, { useEffect, useRef } from 'react';

/*
  Lava-lamp fluid gradient border.
  A solid 2px border whose color flows and morphs continuously
  like a lava lamp — using animated hue shifts along the perimeter.
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

        const borderW = 2;
        let t = 0;

        const render = () => {
            t += 0.006;
            ctx.clearRect(0, 0, w, h);

            const perimeter = 2 * (w + h);
            // Number of segments to draw (more = smoother)
            const segments = Math.ceil(perimeter / 3);

            for (let i = 0; i < segments; i++) {
                const frac = i / segments;
                const pos = frac * perimeter;

                // Position on the rectangle perimeter
                let x, y, bw, bh;
                if (pos < w) {
                    x = pos; y = 0; bw = 4; bh = borderW; // top
                } else if (pos < w + h) {
                    x = w - borderW; y = pos - w; bw = borderW; bh = 4; // right
                } else if (pos < 2 * w + h) {
                    x = w - (pos - w - h); y = h - borderW; bw = 4; bh = borderW; // bottom
                } else {
                    x = 0; y = h - (pos - 2 * w - h); bw = borderW; bh = 4; // left
                }

                // Lava lamp hue: flowing sine waves with multiple frequencies
                const hue = (
                    186 +
                    80 * Math.sin(frac * Math.PI * 4 + t * 2) +
                    40 * Math.sin(frac * Math.PI * 6 - t * 3.1) +
                    30 * Math.cos(frac * Math.PI * 2 + t * 1.5)
                ) % 360;

                // Pulsing brightness
                const light = 55 + 10 * Math.sin(frac * Math.PI * 8 + t * 4);
                // Alpha wave for organic feel
                const alpha = 0.5 + 0.3 * Math.sin(frac * Math.PI * 6 + t * 2.5);

                ctx.fillStyle = `hsla(${hue}, 85%, ${light}%, ${alpha})`;
                ctx.fillRect(x, y, bw, bh);

                // Glow layer (wider, lower alpha)
                const glowAlpha = alpha * 0.15;
                ctx.fillStyle = `hsla(${hue}, 90%, ${light + 10}%, ${glowAlpha})`;
                if (pos < w) {
                    ctx.fillRect(x - 1, 0, 6, 6);
                } else if (pos < w + h) {
                    ctx.fillRect(w - 6, y - 1, 6, 6);
                } else if (pos < 2 * w + h) {
                    ctx.fillRect(x - 1, h - 6, 6, 6);
                } else {
                    ctx.fillRect(0, y - 1, 6, 6);
                }
            }

            // Corner glow accents
            const corners = [
                { x: 0, y: 0, hue: 186 },
                { x: w, y: 0, hue: 270 },
                { x: w, y: h, hue: 330 },
                { x: 0, y: h, hue: 270 },
            ];
            corners.forEach(c => {
                const a = 0.15 + 0.1 * Math.sin(t * 2 + c.hue);
                const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 25);
                grad.addColorStop(0, `hsla(${c.hue + t * 30}, 80%, 60%, ${a})`);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.fillRect(c.x - 25, c.y - 25, 50, 50);
            });

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
