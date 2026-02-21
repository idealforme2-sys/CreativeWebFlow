import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const Card3D = ({ auroraColors, icon, title, description }) => {
    const wrapperRef = useRef(null);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current || !wrapperRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxRotate = 10;

        const rotateX = ((y - centerY) / centerY) * -maxRotate;
        const rotateY = ((x - centerX) / centerX) * maxRotate;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;

        card.style.transform = `perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        card.style.transition = `transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)`;
        card.style.setProperty('--mouse-x', `50%`);
        card.style.setProperty('--mouse-y', `50%`);
    };

    const handleMouseEnter = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = `transform 0.1s linear`;
    };

    return (
        <div
            className="card-wrapper-3d group"
            ref={wrapperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <div className="aurora-container" style={auroraColors}>
                <div className="aurora-glow"></div>
            </div>
            <div className="glass-card-3d" ref={cardRef}>
                <div className="icon-container">
                    {icon}
                </div>
                <div className="content-container">
                    <h3 className="text-white font-bold text-lg leading-tight mb-2" dangerouslySetInnerHTML={{ __html: title }}></h3>
                    <p className="text-gray-300 text-[11px] leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
};

const WhyChooseUs = () => {
    return (
        <section className="py-24 px-10 why-us-section border-t border-white/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-12 bg-cyan-500" />
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em]">Why Us</span>
                        <div className="h-px w-12 bg-cyan-500" />
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
                    >
                        Why Local Businesses <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                            Choose Us
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        We don't just build websites; we build growth engines. Here is how we differ from the rest.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
                    {/* Card 1: Simple Communication */}
                    <Card3D
                        auroraColors={{ '--c1': '#00f2fe', '--c2': '#f093fb', '--c3': '#8a2387' }}
                        title="Simple<br>Communication"
                        description="No technical jargon — just clear, honest conversation about your goals."
                        icon={
                            <svg viewBox="0 0 100 100" className="w-full h-auto svg-3d-shadow">
                                <defs>
                                    <radialGradient id="grad1" cx="30%" cy="30%" r="70%">
                                        <stop offset="0%" stopColor="#fff" />
                                        <stop offset="50%" stopColor="#f093fb" />
                                        <stop offset="100%" stopColor="#8a2387" />
                                    </radialGradient>
                                </defs>
                                <path d="M 30 50 C 30 30, 45 20, 65 20 C 85 20, 95 30, 95 50 C 95 70, 85 80, 65 80 C 60 80, 55 79, 50 76 L 35 85 L 38 68 C 33 63, 30 57, 30 50 Z" fill="none" stroke="url(#grad1)" strokeWidth="4" opacity="0.5" />
                                <path d="M 15 45 C 15 25, 30 15, 50 15 C 70 15, 80 25, 80 45 C 80 65, 70 75, 50 75 C 45 75, 40 74, 35 71 L 20 80 L 23 63 C 18 58, 15 52, 15 45 Z" fill="url(#grad1)" opacity="0.8" />
                                <circle cx="35" cy="45" r="4" fill="#fff" />
                                <circle cx="50" cy="45" r="4" fill="#fff" />
                                <circle cx="65" cy="45" r="4" fill="#fff" />
                            </svg>
                        }
                    />

                    {/* Card 2: Modern Design */}
                    <Card3D
                        auroraColors={{ '--c1': '#e0e0e0', '--c2': '#8a8a8a', '--c3': '#b0b0b0' }}
                        title="Modern<br>Design"
                        description="Sleek, high-end aesthetics tailored to your brand."
                        icon={
                            <svg viewBox="0 0 100 100" className="w-full h-auto svg-3d-shadow">
                                <defs>
                                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#fff" />
                                        <stop offset="50%" stopColor="#a0a0a0" />
                                        <stop offset="100%" stopColor="#404040" />
                                    </linearGradient>
                                </defs>
                                <polygon points="50,15 85,45 50,90 15,45" fill="none" stroke="url(#grad2)" strokeWidth="4" strokeLinejoin="round" />
                                <polygon points="50,15 85,45 50,45" fill="url(#grad2)" opacity="0.6" />
                                <polygon points="50,15 15,45 50,45" fill="url(#grad2)" opacity="0.3" />
                                <polygon points="15,45 50,90 50,45" fill="url(#grad2)" opacity="0.4" />
                            </svg>
                        }
                    />

                    {/* Card 3: Works on all Devices */}
                    <Card3D
                        auroraColors={{ '--c1': '#43e97b', '--c2': '#38f9d7', '--c3': '#4facfe' }}
                        title="Works on all<br>Devices"
                        description="Perfect performance on phones, tablets, and desktops."
                        icon={
                            <svg viewBox="0 0 100 100" className="w-full h-auto svg-3d-shadow">
                                <defs>
                                    <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#e0f7fa" />
                                        <stop offset="100%" stopColor="#80deea" />
                                    </linearGradient>
                                </defs>
                                <rect x="10" y="30" width="80" height="45" rx="4" fill="url(#grad3)" opacity="0.8" />
                                <rect x="5" y="75" width="90" height="5" rx="2" fill="#fff" />
                                <rect x="15" y="40" width="30" height="40" rx="3" fill="#fff" opacity="0.9" />
                                <rect x="65" y="50" width="18" height="30" rx="2" fill="#fff" />
                            </svg>
                        }
                    />

                    {/* Card 4: Focus on Results */}
                    <Card3D
                        auroraColors={{ '--c1': '#ff0844', '--c2': '#ffb199', '--c3': '#ff758c' }}
                        title="Focus on<br>Results"
                        description="Websites engineered to convert visitors into loyal customers."
                        icon={
                            <svg viewBox="0 0 100 100" className="w-full h-auto svg-3d-shadow">
                                <circle cx="50" cy="50" r="35" fill="none" stroke="#ffb199" strokeWidth="2" opacity="0.5" />
                                <circle cx="50" cy="50" r="10" fill="#ffb199" />
                                <line x1="50" y1="5" x2="50" y2="95" stroke="#ffb199" strokeWidth="2" opacity="0.6" />
                                <line x1="5" y1="50" x2="95" y2="50" stroke="#ffb199" strokeWidth="2" opacity="0.6" />
                            </svg>
                        }
                    />

                    {/* Card 5: Reliable Support */}
                    <Card3D
                        auroraColors={{ '--c1': '#667eea', '--c2': '#764ba2', '--c3': '#a18cd1' }}
                        title="Reliable<br>Support"
                        description="We're here for updates, help, or advice — even long after launch."
                        icon={
                            <svg viewBox="0 0 100 100" className="w-full h-auto svg-3d-shadow">
                                <defs>
                                    <linearGradient id="grad5" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#a18cd1" />
                                        <stop offset="100%" stopColor="#e0e0e0" />
                                    </linearGradient>
                                </defs>
                                <path d="M 50 15 L 85 28 C 85 60, 70 80, 50 95 C 30 80, 15 60, 15 28 Z" fill="none" stroke="url(#grad5)" strokeWidth="5" strokeLinejoin="round" />
                                <path d="M 50 22 L 75 32 C 75 58, 65 72, 50 85 C 35 72, 25 58, 25 32 Z" fill="url(#grad5)" opacity="0.5" />
                                <path d="M 38 52 L 48 62 L 68 40" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    />

                    {/* Card 6: Clear Timelines */}
                    <Card3D
                        auroraColors={{ '--c1': '#8fd3f4', '--c2': '#84fab0', '--c3': '#fdfbfb' }}
                        title="Clear<br>Timelines"
                        description="Know exactly when your project will be ready. We respect your time."
                        icon={
                            <svg viewBox="0 0 100 100" className="w-full h-auto svg-3d-shadow">
                                <defs>
                                    <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#fff" />
                                        <stop offset="100%" stopColor="#8fd3f4" />
                                    </linearGradient>
                                </defs>
                                <path d="M 25 20 L 75 20 C 75 20, 65 45, 50 50 C 35 45, 25 20, 25 20 Z" fill="none" stroke="url(#grad6)" strokeWidth="5" strokeLinejoin="round" />
                                <path d="M 25 80 L 75 80 C 75 80, 65 55, 50 50 C 35 55, 25 80, 25 80 Z" fill="url(#grad6)" opacity="0.6" stroke="url(#grad6)" strokeWidth="5" strokeLinejoin="round" />
                                <circle cx="50" cy="50" r="2" fill="#fff" />
                                <circle cx="50" cy="65" r="4" fill="#fff" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
