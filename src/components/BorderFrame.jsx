import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

/*
  Premium Constant Glowing Border with Magnetic Elasticity.
  OPTIMIZED: Increased vertex spacing (40px), 30fps cap, single shadow pass,
  visibility-aware, conditional physics only when mouse near edges.
*/

const BorderFrame = ({ mobileOptimized = false, paused = false }) => {
    if (mobileOptimized) return null;

    const canvasRef = useRef(null);
    const isPausedRef = useRef(paused);

    useEffect(() => {
        isPausedRef.current = paused;
    }, [paused]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let dpr = Math.min(window.devicePixelRatio || 1, mobileOptimized ? 1.25 : 2);
        let w, h;
        let lockedMobileHeight = Math.round(window.innerHeight);
        let lockedMobileWidth = Math.round(window.innerWidth);
        let isVisible = true;

        let vertices = [];
        const spacing = mobileOptimized ? 72 : 40;

        const buildVertices = () => {
            vertices = [];
            const inset = 2;

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

        const getViewportHeight = () => {
            if (!mobileOptimized) return window.innerHeight;
            if (window.visualViewport) return Math.round(window.visualViewport.height);
            return window.innerHeight;
        };

        const resize = (force = false) => {
            const nextWidth = Math.round(document.documentElement.clientWidth);
            let nextHeight = Math.round(getViewportHeight());

            // Keep border stable while browser UI bars collapse/expand during scroll.
            if (mobileOptimized && !force) {
                const widthDelta = Math.abs(nextWidth - lockedMobileWidth);
                const heightDelta = Math.abs(nextHeight - lockedMobileHeight);
                const significantResize = widthDelta > 2 || heightDelta > 120;
                if (!significantResize) {
                    nextHeight = lockedMobileHeight;
                } else {
                    lockedMobileWidth = nextWidth;
                    lockedMobileHeight = nextHeight;
                }
            } else if (mobileOptimized) {
                lockedMobileWidth = nextWidth;
                lockedMobileHeight = nextHeight;
            }

            w = nextWidth;
            h = nextHeight;

            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildVertices();
        };
        resize(true);

        let resizeRafId = null;
        const scheduleResize = (force = false) => {
            if (resizeRafId) cancelAnimationFrame(resizeRafId);
            resizeRafId = requestAnimationFrame(() => {
                resizeRafId = null;
                resize(force);
            });
        };

        const handleWindowResize = () => scheduleResize(false);
        const handleOrientation = () => scheduleResize(true);

        let resizeObserver = null;
        if (!mobileOptimized) {
            resizeObserver = new ResizeObserver(() => scheduleResize(false));
            resizeObserver.observe(document.documentElement);
        }

        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('orientationchange', handleOrientation);

        const viewport = window.visualViewport;
        if (viewport) viewport.addEventListener('resize', handleWindowResize);

        let mouseX = -1000;
        let mouseY = -1000;
        let lastMouseX = -1000;
        let lastMouseY = -1000;
        let mouseVelocity = 0;
        let lastTouchX = -1000;
        let lastTouchY = -1000;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
            mouseVelocity = 0;
        };
        const handleTouchMove = (e) => {
            if (!e.touches || e.touches.length === 0) return;
            const t = e.touches[0];
            mouseX = t.clientX;
            mouseY = t.clientY;
        };
        const handleTouchEnd = () => {
            mouseX = -1000;
            mouseY = -1000;
            mouseVelocity = 0;
            lastTouchX = -1000;
            lastTouchY = -1000;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);

        const handleVisibility = () => {
            isVisible = !document.hidden;
        };
        document.addEventListener('visibilitychange', handleVisibility);

        let frameId;
        let lastRenderTime = 0;
        let globalTime = 0;
        const fpsInterval = 1000 / (mobileOptimized ? 20 : 30);

        const render = (now) => {
            frameId = requestAnimationFrame(render);

            if (!isVisible || isPausedRef.current) return;

            const elapsed = now - lastRenderTime;
            if (elapsed < fpsInterval) return;

            const dt = Math.min(elapsed / 1000, 0.1);
            lastRenderTime = now - (elapsed % fpsInterval);
            globalTime += dt;

            // Track kinetic velocity
            const useTouchVelocity = lastTouchX > -999 && lastTouchY > -999;
            const dVMX = useTouchVelocity ? (mouseX - lastTouchX) : (mouseX - lastMouseX);
            const dVMY = useTouchVelocity ? (mouseY - lastTouchY) : (mouseY - lastMouseY);
            const currentSpeed = Math.sqrt(dVMX * dVMX + dVMY * dVMY);
            mouseVelocity = mouseVelocity * 0.9 + currentSpeed * 0.1;
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            if (mouseX > -999 && mouseY > -999) {
                lastTouchX = mouseX;
                lastTouchY = mouseY;
            }

            const kineticFactor = Math.min(mouseVelocity * 0.15, 1);

            // Only clear if dimensions are valid
            if (w > 0 && h > 0) {
                ctx.clearRect(0, 0, w, h);
            } else {
                return;
            }

            // Physics
            const tension = mobileOptimized ? 0.032 : 0.04;
            const friction = mobileOptimized ? 0.88 : 0.85;
            const magneticRadius = mobileOptimized ? 140 : 250;

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
                    const inset = 2;
                    let pinForce = 0;
                    const dTL = Math.sqrt(Math.pow(v.base_x - inset, 2) + Math.pow(v.base_y - inset, 2));
                    const dTR = Math.sqrt(Math.pow(v.base_x - (w - inset), 2) + Math.pow(v.base_y - inset, 2));
                    const dBL = Math.sqrt(Math.pow(v.base_x - inset, 2) + Math.pow(v.base_y - (h - inset), 2));
                    const dBR = Math.sqrt(Math.pow(v.base_x - (w - inset), 2) + Math.pow(v.base_y - (h - inset), 2));
                    const minDist = Math.min(dTL, dTR, dBL, dBR);

                    if (minDist < 60) pinForce = 1;
                    else if (minDist < 200) pinForce = 1 - ((minDist - 60) / 140);

                    const dx = mouseX - v.base_x;
                    const dy = mouseY - v.base_y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < magneticRadius) {
                        const waveSpeed = globalTime * 12;
                        const ripplePhase = (dist * 0.04) - waveSpeed;
                        const amplitude = mobileOptimized ? 2.4 : 4;
                        const falloff = Math.pow((magneticRadius - dist) / magneticRadius, 2);
                        const rippleForce = Math.sin(ripplePhase) * amplitude * falloff * (1 - pinForce) * kineticFactor;

                        const isTopOrBottomEdge = v.base_y <= inset + 1 || v.base_y >= h - inset - 1;
                        const isLeftOrRightEdge = v.base_x <= inset + 1 || v.base_x >= w - inset - 1;

                        if (isTopOrBottomEdge && !isLeftOrRightEdge) {
                            ty += (v.base_y <= inset + 1) ? rippleForce : -rippleForce;
                        } else if (isLeftOrRightEdge && !isTopOrBottomEdge) {
                            tx += (v.base_x <= inset + 1) ? rippleForce : -rippleForce;
                        } else {
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

            // Draw path
            ctx.beginPath();
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let i = 1; i < vertices.length; i++) {
                ctx.lineTo(vertices[i].x, vertices[i].y);
            }
            ctx.closePath();

            // Flowing gradient
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

            ctx.lineWidth = mobileOptimized ? 1.5 : 2;
            ctx.strokeStyle = grad;
            ctx.globalAlpha = mobileOptimized ? 0.75 : 0.9;

            // Single glow pass instead of triple stroke (major GPU savings)
            ctx.shadowBlur = mobileOptimized ? 7 : 12;
            ctx.shadowColor = 'rgba(6,182,212,0.5)';
            ctx.stroke();

            // Crisp core line
            ctx.shadowBlur = 0;
            ctx.stroke();
        };

        frameId = requestAnimationFrame(render);

        return () => {
            if (resizeObserver) resizeObserver.disconnect();
            window.removeEventListener('resize', handleWindowResize);
            window.removeEventListener('orientationchange', handleOrientation);
            if (viewport) viewport.removeEventListener('resize', handleWindowResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchEnd);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibility);
            if (resizeRafId) cancelAnimationFrame(resizeRafId);
            cancelAnimationFrame(frameId);
        };
    }, [mobileOptimized]);

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
            {/* Subtle inner vignette */}
            <div className={`absolute inset-0 pointer-events-none ${mobileOptimized ? 'shadow-[inset_0_0_40px_rgba(168,85,247,0.06)]' : 'shadow-[inset_0_0_80px_rgba(168,85,247,0.08)]'}`} />

            {/* Elastic tracking line canvas - simplified to prevent flickering */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ willChange: 'opacity' }}
            />

            {/* Tech Corner Brackets - static without animations */}
            {!mobileOptimized && corners.map((c, i) => (
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
                    <svg
                        width="40" height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {c.paths.map((d, pathIdx) => (
                            <path key={`c-${pathIdx}`} d={d} stroke={c.color} strokeWidth="2" strokeOpacity="0.8" strokeLinecap="round" />
                        ))}
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default memo(BorderFrame);
