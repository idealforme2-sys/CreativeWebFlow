import React, { useRef } from 'react';
import { LayoutGrid, ChevronDown, Users, ArrowRight, Phone, TrendingUp } from 'lucide-react';
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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <div className="lg:col-span-7 tilt-card-container order-2 lg:order-1">
                            <div
                                className="tilt-card relative w-full aspect-[4/3] rounded-2xl bg-card-gym border border-white/10 overflow-hidden shadow-2xl transition-all duration-300"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Fitness & Wellness</h4>
                                            <h3 className="font-display text-3xl font-bold text-white">Local Gym</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                            <Users className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <h2 className="font-display text-5xl md:text-6xl font-black text-white/90 drop-shadow-lg text-center">More Inquiries</h2>
                                    </div>
                                    <div className="flex justify-between items-end text-xs font-mono text-gray-500">
                                        <span>Case Study 01</span>
                                        <span>Local Business</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
                                <button className="view-details-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto hover:bg-gray-100">
                                    VIEW DETAILS
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
                                    <button className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
                                        <ArrowRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 02: Dental Clinic */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
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
                                    <button className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
                                        <ArrowRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 tilt-card-container order-2">
                            <div
                                className="tilt-card relative w-full aspect-[4/3] rounded-2xl bg-card-clinic border border-white/10 overflow-hidden shadow-2xl transition-all duration-300"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Healthcare</h4>
                                            <h3 className="font-display text-3xl font-bold text-white">Dental Clinic</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                                            <Phone className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <h2 className="font-display text-5xl md:text-6xl font-black text-white/90 drop-shadow-lg text-center">More Bookings</h2>
                                    </div>
                                    <div className="flex justify-between items-end text-xs font-mono text-gray-500">
                                        <span>Case Study 02</span>
                                        <span>Local Business</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-pink-600 via-transparent to-transparent"></div>
                                <button className="view-details-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto hover:bg-gray-100">
                                    VIEW DETAILS
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 03: Local Restaurant */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <div className="lg:col-span-7 tilt-card-container order-2 lg:order-1">
                            <div
                                className="tilt-card relative w-full aspect-[4/3] rounded-2xl bg-card-restaurant border border-white/10 overflow-hidden shadow-2xl transition-all duration-300"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Food & Dining</h4>
                                            <h3 className="font-display text-3xl font-bold text-white">Local Restaurant</h3>
                                        </div>
                                        <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                            <TrendingUp className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <h2 className="font-display text-5xl md:text-6xl font-black text-white/90 drop-shadow-lg text-center">More Orders</h2>
                                    </div>
                                    <div className="flex justify-between items-end text-xs font-mono text-gray-500">
                                        <span>Case Study 03</span>
                                        <span>Local Business</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/40 via-transparent to-transparent"></div>
                                <button className="view-details-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold py-3 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] opacity-0 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto hover:bg-gray-100">
                                    VIEW DETAILS
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
                                    <button className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
                                        <ArrowRight className="text-gray-400 group-hover:text-black transition-colors" size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DetailedCaseStudies;
