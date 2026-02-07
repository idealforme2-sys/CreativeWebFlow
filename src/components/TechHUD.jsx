import React from 'react';
import { Activity, Scan } from 'lucide-react';

const TechHUD = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden select-none">
            {/* Corner Brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-pink-500/50 rounded-tr-lg" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-pink-500/50 rounded-br-lg" />

            {/* Side Data Streams - Left */}
            <div className="absolute top-1/3 left-8 hidden md:flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <Activity size={16} className="text-cyan-400 animate-pulse" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest">SYSTEM_STATUS</span>
                        <span className="text-xs font-bold text-white tracking-widest">OPTIMAL</span>
                    </div>
                </div>
                <div className="w-32 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
                <div className="font-mono text-[10px] text-cyan-300/60 space-y-2">
                    <p className="flex justify-between w-40"><span>CPU_USAGE</span> <span>12%</span></p>
                    <div className="w-full h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400/50 w-[12%]" />
                    </div>
                    <p className="flex justify-between w-40 mt-2"><span>MEM_ALLOC</span> <span>STABLE</span></p>
                    <div className="w-full h-1 bg-cyan-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400/50 w-[86%]" />
                    </div>
                </div>
            </div>

            {/* Side Data Streams - Right */}
            <div className="absolute top-1/3 right-8 hidden md:flex flex-col items-end gap-6">
                <div className="flex items-center gap-3 flex-row-reverse">
                    <Scan size={16} className="text-pink-400 animate-spin" style={{ animationDuration: '10s' }} />
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono text-pink-400/80 tracking-widest">SECURITY_LAYER</span>
                        <span className="text-xs font-bold text-white tracking-widest">ENCRYPTED</span>
                    </div>
                </div>
                <div className="w-32 h-[1px] bg-gradient-to-l from-pink-500/50 to-transparent" />
                <div className="font-mono text-[10px] text-pink-300/60 space-y-1 text-right">
                    {[...Array(6)].map((_, i) => (
                        <p key={i} className="opacity-70">0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechHUD;
