import React, { useRef } from 'react';
import { LayoutGrid, ChevronDown, Users, ArrowRight, Phone, TrendingUp, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const DetailedCaseStudies = () => {
    // Helper function for tilt effect
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Multipliers from user design: -5 and 5
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    return (
        <div className="relative z-10 font-sans antialiased text-gray-100">
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 bg-blob"></div>
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[60%] bg-blue-900/20 bg-blob"></div>
                <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-pink-900/10 bg-blob"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            </div>

            <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
                {/* Section Header */}
                <header className="mb-24">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-8 bg-pink-500"></div>
                        <span className="text-pink-400 text-xs font-bold tracking-[0.2em] uppercase">Example Projects</span>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <h1 className="font-display font-bold text-4xl md:text-6xl max-w-2xl leading-tight text-white">
                            How We Help Local Businesses
                        </h1>
                        <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                            These example projects show our approach to helping local businesses succeed online through strategic design and development.
                        </p>
                    </div>
                </header>

                <div className="space-y-32">
                    {/* Case Study 01: Local Gym */}
                    <div id="fitness" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <div className="lg:col-span-7 tilt-card-container order-2 lg:order-1">
                            <div
                                className="tilt-card relative w-full aspect-[4/3] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer hover:shadow-cyan-500/20"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => window.open('https://iron-core-fit.vercel.app', '_blank')}
                            >
                                {/* Live Preview Iframe */}
                                <div className="absolute inset-0 z-0 bg-gray-900">
                                    <iframe
                                        src="https://iron-core-fit.vercel.app"
                                        className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none border-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        title="Iron Core Fit Preview"
                                    />
                                    {/* Gradient Overlay for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-60" />
                                </div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Fitness & Wellness</h4>
                                            <h3 className="font-display text-3xl font-bold text-white">Local Gym</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                            <Users className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h2 className="font-display text-5xl md:text-6xl font-black text-white/90 drop-shadow-lg text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">Visit Site</h2>
                                    </div>
                                    <div className="flex justify-between items-end text-xs font-mono text-gray-500">
                                        <span>iron-core-fit.vercel.app</span>
                                        <span>Live Demo</span>
                                    </div>
                                </div>
                                <button className="view-details-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 transition-all duration-300 z-20 pointer-events-none">
                                    VISIT SITE
                                </button>
                            </div>
                        </div>
                        <div className="lg:col-span-5 space-y-8 pl-0 lg:pl-12 order-1 lg:order-2">
                            <div className="relative">
                                <span className="font-display text-[120px] leading-none font-bold text-white/5 absolute -top-16 -left-8 -z-10 select-none">01</span>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Goal</h4>
                                    <p className="text-xl font-medium text-white">Get more membership inquiries</p>
                                </div>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Solution</h4>
                                    <p className="text-gray-400 leading-relaxed">Clear messaging, mobile-first layout, strong call-to-action placement ensuring potential members find what they need instantly.</p>
                                </div>
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-xl shadow-lg shadow-blue-900/20 border border-white/10">
                                    <h4 className="text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">Result</h4>
                                    <p className="text-white font-semibold text-lg">Improved engagement and more contact requests.</p>
                                </div>
                                <div className="mt-8">
                                    <button
                                        onClick={() => window.open('https://iron-core-fit.vercel.app', '_blank')}
                                        className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                                    >
                                        <ArrowRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 02: Dental Clinic */}
                    <div id="medical" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <div className="lg:col-span-5 space-y-8 pr-0 lg:pr-12 order-1">
                            <div className="relative">
                                <span className="font-display text-[120px] leading-none font-bold text-white/5 absolute -top-16 -left-8 -z-10 select-none">02</span>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Goal</h4>
                                    <p className="text-xl font-medium text-white">Increase appointment bookings</p>
                                </div>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Solution</h4>
                                    <p className="text-gray-400 leading-relaxed">Easy online booking system integration, trust signals through testimonials, and a clean professional design.</p>
                                </div>
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-lg shadow-purple-900/20 border border-white/10">
                                    <h4 className="text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">Result</h4>
                                    <p className="text-white font-semibold text-lg">Streamlined booking process and significant patient growth.</p>
                                </div>
                                <div className="mt-8">
                                    <button
                                        onClick={() => window.open('https://radiant-smile.vercel.app', '_blank')}
                                        className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                                    >
                                        <ArrowRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 tilt-card-container order-2">
                            <div
                                className="tilt-card relative w-full aspect-[4/3] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer hover:shadow-pink-500/20"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => window.open('https://radiant-smile.vercel.app', '_blank')}
                            >
                                {/* Live Preview Iframe */}
                                <div className="absolute inset-0 z-0 bg-gray-900">
                                    <iframe
                                        src="https://radiant-smile.vercel.app"
                                        className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none border-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        title="Radiant Smile Preview"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-60" />
                                </div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Healthcare</h4>
                                            <h3 className="font-display text-3xl font-bold text-white">Dental Clinic</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                                            <Phone className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h2 className="font-display text-5xl md:text-6xl font-black text-white/90 drop-shadow-lg text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">Visit Site</h2>
                                    </div>
                                    <div className="flex justify-between items-end text-xs font-mono text-gray-500">
                                        <span>radiant-smile.vercel.app</span>
                                        <span>Live Demo</span>
                                    </div>
                                </div>
                                <button className="view-details-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 transition-all duration-300 z-20 pointer-events-none">
                                    VISIT SITE
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 03: Local Restaurant */}
                    <div id="food" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <div className="lg:col-span-7 tilt-card-container order-2 lg:order-1">
                            <div
                                className="tilt-card relative w-full aspect-[4/3] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer hover:shadow-orange-500/20"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => window.open('https://savory-sage-food.vercel.app', '_blank')}
                            >
                                {/* Live Preview Iframe */}
                                <div className="absolute inset-0 z-0 bg-gray-900">
                                    <iframe
                                        src="https://savory-sage-food.vercel.app"
                                        className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none border-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        title="Savory Sage Food Preview"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-60" />
                                </div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Food & Dining</h4>
                                            <h3 className="font-display text-3xl font-bold text-white">Local Restaurant</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                            <TrendingUp className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h2 className="font-display text-5xl md:text-6xl font-black text-white/90 drop-shadow-lg text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">Visit Site</h2>
                                    </div>
                                    <div className="flex justify-between items-end text-xs font-mono text-gray-500">
                                        <span>savory-sage-food.vercel.app</span>
                                        <span>Live Demo</span>
                                    </div>
                                </div>
                                <button className="view-details-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 transition-all duration-300 z-20 pointer-events-none">
                                    VISIT SITE
                                </button>
                            </div>
                        </div>
                        <div className="lg:col-span-5 space-y-8 pl-0 lg:pl-12 order-1 lg:order-2">
                            <div className="relative">
                                <span className="font-display text-[120px] leading-none font-bold text-white/5 absolute -top-16 -left-8 -z-10 select-none">03</span>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Goal</h4>
                                    <p className="text-xl font-medium text-white">Drive more online orders</p>
                                </div>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Solution</h4>
                                    <p className="text-gray-400 leading-relaxed">Mobile-optimized menu, clear ordering process flow, and enhanced location visibility for customers.</p>
                                </div>
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-xl shadow-lg shadow-orange-900/20 border border-white/10">
                                    <h4 className="text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">Result</h4>
                                    <p className="text-white font-semibold text-lg">Increased online visibility and expanded customer reach.</p>
                                </div>
                                <div className="mt-8">
                                    <button
                                        onClick={() => window.open('https://savory-sage-food.vercel.app', '_blank')}
                                        className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                                    >
                                        <ArrowRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 04: The Obsidian */}
                    <div id="real-estate" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <div className="lg:col-span-5 space-y-8 pr-0 lg:pr-12 order-1">
                            <div className="relative">
                                <span className="font-display text-[120px] leading-none font-bold text-white/5 absolute -top-16 -left-8 -z-10 select-none">04</span>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Goal</h4>
                                    <p className="text-xl font-medium text-white">Establish a premium digital presence</p>
                                </div>
                                <div className="mb-8">
                                    <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Solution</h4>
                                    <p className="text-gray-400 leading-relaxed">High-end dark mode aesthetics, smooth animations, and optimized performance to showcase brand quality.</p>
                                </div>
                                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-6 rounded-xl shadow-lg shadow-teal-900/20 border border-white/10">
                                    <h4 className="text-[10px] font-bold tracking-widest text-white/80 uppercase mb-1">Result</h4>
                                    <p className="text-white font-semibold text-lg">A striking brand identity that captivates luxury clients.</p>
                                </div>
                                <div className="mt-8">
                                    <button
                                        onClick={() => window.open('https://the-obsidian.vercel.app', '_blank')}
                                        className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                                    >
                                        <ArrowRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 tilt-card-container order-2">
                            <div
                                className="tilt-card relative w-full aspect-[4/3] rounded-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 cursor-pointer hover:shadow-teal-500/20"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => window.open('https://the-obsidian.vercel.app', '_blank')}
                            >
                                {/* Live Preview Iframe */}
                                <div className="absolute inset-0 z-0 bg-gray-900">
                                    <iframe
                                        src="https://the-obsidian.vercel.app"
                                        className="w-[200%] h-[200%] transform scale-50 origin-top-left pointer-events-none border-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        title="The Obsidian Preview"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-60" />
                                </div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Premium Agency</h4>
                                            <h3 className="font-display text-3xl font-bold text-white">The Obsidian</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                                            <Monitor className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h2 className="font-display text-5xl md:text-6xl font-black text-white/90 drop-shadow-lg text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">Visit Site</h2>
                                    </div>
                                    <div className="flex justify-between items-end text-xs font-mono text-gray-500">
                                        <span>the-obsidian.vercel.app</span>
                                        <span>Live Demo</span>
                                    </div>
                                </div>
                                <button className="view-details-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 transition-all duration-300 z-20 pointer-events-none">
                                    VISIT SITE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DetailedCaseStudies;
