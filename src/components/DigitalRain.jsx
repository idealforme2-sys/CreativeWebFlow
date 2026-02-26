import React, { useEffect, useRef } from 'react';

const DigitalRain = ({ lowPower = false }) => {
    const canvasRef = useRef(null);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const chars = lowPower ? '01XY' : '01XYZEUK';
        const charArray = chars.split('');
        const resolutionScale = lowPower ? 0.55 : 0.8;
        const fontSize = lowPower ? 12 : 14;
        const scaledFontSize = Math.floor(fontSize * resolutionScale);
        let width, height, columns, drops;

        const setupCanvas = () => {
            width = Math.floor(window.innerWidth * resolutionScale);
            height = Math.floor(window.innerHeight * resolutionScale);
            canvas.width = width;
            canvas.height = height;
            columns = Math.floor(width / scaledFontSize);
            drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * (height / scaledFontSize)));
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.fillRect(0, 0, width, height);
        };

        setupCanvas();

        let animationId;
        let lastTime = 0;
        const fpsInterval = 1000 / (lowPower ? 8 : 12);

        const draw = (timestamp) => {
            animationId = requestAnimationFrame(draw);

            // Skip when tab is hidden
            if (!isVisibleRef.current) return;

            if (!lastTime) lastTime = timestamp;
            const elapsed = timestamp - lastTime;

            if (elapsed > fpsInterval) {
                lastTime = timestamp - (elapsed % fpsInterval);

                ctx.fillStyle = lowPower ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.06)';
                ctx.fillRect(0, 0, width, height);
                ctx.font = `${scaledFontSize}px monospace`;

                for (let i = 0; i < drops.length; i++) {
                    const text = charArray[Math.floor(Math.random() * charArray.length)];
                    ctx.fillStyle = Math.random() > (lowPower ? 0.992 : 0.98) ? '#fff' :
                        Math.random() > 0.9 ? '#06b6d4' : '#d946ef';
                    ctx.fillText(text, i * scaledFontSize, drops[i] * scaledFontSize);

                    if (drops[i] * scaledFontSize > height && Math.random() > (lowPower ? 0.985 : 0.975)) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }
        };

        requestAnimationFrame(draw);

        const handleResize = () => {
            setupCanvas();
        };

        const handleVisibility = () => {
            isVisibleRef.current = !document.hidden;
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, [lowPower]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none mix-blend-screen"
            style={{ zIndex: 1, width: '100%', height: '100%', opacity: lowPower ? 0.22 : 0.35, imageRendering: 'auto' }}
        />
    );
};

export default DigitalRain;
