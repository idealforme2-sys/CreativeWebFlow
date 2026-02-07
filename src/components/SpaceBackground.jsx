import React, { useRef, useEffect } from 'react';

// SpaceBackground - Ambient space effect that runs across the entire site
const SpaceBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Stars
        const stars = [];
        for (let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                twinkle: Math.random() * Math.PI * 2
            });
        }

        // Shooting stars
        const shootingStars = [];
        const spawnShootingStar = () => {
            if (shootingStars.length < 3 && Math.random() > 0.995) {
                shootingStars.push({
                    x: Math.random() * canvas.width,
                    y: 0,
                    length: 80 + Math.random() * 60,
                    speed: 8 + Math.random() * 8,
                    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
                    opacity: 1,
                    trail: []
                });
            }
        };

        // Ambient asteroids (far background)
        const asteroids = [];
        for (let i = 0; i < 8; i++) {
            asteroids.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 3 + Math.random() * 8,
                speed: 0.2 + Math.random() * 0.3,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                opacity: 0.15 + Math.random() * 0.15
            });
        }

        // Nebula particles
        const nebulae = [];
        for (let i = 0; i < 5; i++) {
            nebulae.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 100 + Math.random() * 200,
                hue: Math.random() * 60 + 180, // Cyan to purple
                opacity: 0.03 + Math.random() * 0.02,
                drift: (Math.random() - 0.5) * 0.1
            });
        }

        // Floating laser particles (from the game theme)
        const laserParticles = [];
        const spawnLaserParticle = () => {
            if (laserParticles.length < 15 && Math.random() > 0.98) {
                laserParticles.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height + 10,
                    speed: 1 + Math.random() * 2,
                    size: 2 + Math.random() * 3,
                    hue: 180 + Math.random() * 40,
                    opacity: 0.3 + Math.random() * 0.4
                });
            }
        };

        let animationFrame;
        const animate = () => {
            // Semi-transparent clear for trail effect
            ctx.fillStyle = 'rgba(3, 0, 20, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw nebulae (very subtle background glow)
            nebulae.forEach(n => {
                n.x += n.drift;
                if (n.x < -n.radius) n.x = canvas.width + n.radius;
                if (n.x > canvas.width + n.radius) n.x = -n.radius;

                const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
                gradient.addColorStop(0, `hsla(${n.hue}, 80%, 50%, ${n.opacity})`);
                gradient.addColorStop(0.5, `hsla(${n.hue}, 60%, 30%, ${n.opacity * 0.5})`);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
            });

            // Draw and update stars
            stars.forEach(star => {
                star.y += star.speed;
                star.twinkle += 0.02;

                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }

                const twinkleOpacity = 0.5 + Math.sin(star.twinkle) * 0.5;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity * 0.7})`;
                ctx.fill();
            });

            // Draw asteroids
            asteroids.forEach(asteroid => {
                asteroid.y += asteroid.speed;
                asteroid.x += asteroid.speed * 0.3;
                asteroid.rotation += asteroid.rotationSpeed;

                if (asteroid.y > canvas.height + asteroid.size) {
                    asteroid.y = -asteroid.size;
                    asteroid.x = Math.random() * canvas.width;
                }

                ctx.save();
                ctx.translate(asteroid.x, asteroid.y);
                ctx.rotate(asteroid.rotation);
                ctx.globalAlpha = asteroid.opacity;

                ctx.beginPath();
                const points = 6;
                for (let i = 0; i < points; i++) {
                    const angle = (Math.PI * 2 / points) * i;
                    const r = asteroid.size * (0.7 + Math.sin(i * 2) * 0.3);
                    const x = Math.cos(angle) * r;
                    const y = Math.sin(angle) * r;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fillStyle = '#4a4a6a';
                ctx.fill();

                ctx.restore();
            });

            // Spawn and draw shooting stars
            spawnShootingStar();
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const s = shootingStars[i];
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.01;

                // Draw trail
                const gradient = ctx.createLinearGradient(
                    s.x, s.y,
                    s.x - Math.cos(s.angle) * s.length,
                    s.y - Math.sin(s.angle) * s.length
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(
                    s.x - Math.cos(s.angle) * s.length,
                    s.y - Math.sin(s.angle) * s.length
                );
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw head glow
                ctx.beginPath();
                ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
                ctx.fill();

                if (s.opacity <= 0 || s.y > canvas.height || s.x > canvas.width) {
                    shootingStars.splice(i, 1);
                }
            }

            // Spawn and draw laser particles (floating up like embers)
            spawnLaserParticle();
            for (let i = laserParticles.length - 1; i >= 0; i--) {
                const p = laserParticles[i];
                p.y -= p.speed;
                p.x += Math.sin(p.y * 0.01) * 0.5;
                p.opacity -= 0.002;

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.opacity})`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                if (p.y < -10 || p.opacity <= 0) {
                    laserParticles.splice(i, 1);
                }
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[1] pointer-events-none"
            style={{ background: 'linear-gradient(180deg, #030014 0%, #0a0020 50%, #030014 100%)' }}
        />
    );
};

export default SpaceBackground;
