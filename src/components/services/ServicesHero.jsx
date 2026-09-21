import React from 'react';
import { Wrench, Shield, Sparkles } from 'lucide-react';

export const ServicesHero = () => {
  return (
    <section className="relative pt-16 pb-16 bg-gradient-to-b from-[#020817] via-[#040E24] to-[#020817] border-b border-slate-800/80">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Small Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1730] border border-[#00E5FF]/30 text-xs sm:text-sm font-bold text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)] uppercase tracking-wider">
          <Wrench className="w-4 h-4" />
          <span>QUICKMEND SERVICES</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          APPLIANCE REPAIR <br />
          <span className="text-[#00E5FF]">MADE SIMPLE.</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-xl text-[#9FB1C7] max-w-2xl mx-auto leading-relaxed">
          Professional repair assistance for the home appliances you depend on every day.
        </p>

        {/* Trust pill row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
            Multi-Brand Diagnostics
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
            Doorstep Pickup Where Available
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
            Verified Service Standards
          </span>
        </div>

      </div>
    </section>
  );
};
