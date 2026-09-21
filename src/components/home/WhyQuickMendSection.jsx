import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Wrench, PackageCheck, Layers, Zap, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WhyQuickMendSection = () => {
  const features = [
    {
      number: "01",
      title: "Convenient Pickup",
      description: "Where available, customers can get appliance pickup from their doorstep.",
      subtext: "Safe handling by trained logistics executives for heavy and sensitive home machines.",
      icon: Truck,
      highlight: "Doorstep Handling"
    },
    {
      number: "02",
      title: "Professional Repair",
      description: "Appliances are inspected and repaired by service professionals.",
      subtext: "Comprehensive multi-point diagnostics and certified workmanship on all electrical components.",
      icon: Wrench,
      highlight: "Certified Engineers"
    },
    {
      number: "03",
      title: "Doorstep Delivery",
      description: "Where applicable, repaired appliances can be returned to the customer's doorstep within 24 hours.",
      subtext: "Delivered securely back to your location with basic post-service verification.",
      icon: PackageCheck,
      highlight: "24h Express Return"
    },
    {
      number: "04",
      title: "Multiple Brands",
      description: "Support appliances from many major brands.",
      subtext: "Experience across leading manufacturers including Samsung, LG, Whirlpool, IFB, Daikin, and more.",
      icon: Layers,
      highlight: "Universal Spares"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#020817] via-[#040E24] to-[#020817] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why Choose QuickMend</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            ENGINEERED FOR <span className="text-[#00E5FF]">RELIABILITY.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#9FB1C7]">
            We provide dependable, structured appliance servicing designed around customer convenience, 24-hour return, and honest technical standards.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {features.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl bg-gradient-to-br from-[#0B1730]/90 to-[#040E22]/90 p-8 border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 transition-all duration-300 shadow-[0_15px_35px_rgba(2,8,23,0.8)] hover:shadow-[0_0_35px_rgba(0,229,255,0.2)] group overflow-hidden"
              >
                {/* Background watermarked number */}
                <div className="absolute top-4 right-6 text-7xl font-black text-slate-800/30 select-none pointer-events-none group-hover:text-[#00E5FF]/10 group-hover:scale-105 transition-all">
                  {card.number}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#061024] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)] group-hover:scale-110 group-hover:border-[#00E5FF] transition-all">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-wider">
                          {card.number} — PILLAR
                        </span>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                      {card.highlight}
                    </span>
                  </div>

                  <p className="text-base text-white font-medium leading-relaxed pt-2">
                    {card.description}
                  </p>

                  <p className="text-sm text-[#9FB1C7] leading-relaxed">
                    {card.subtext}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs text-[#00E5FF] font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>QuickMend Guarantee</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
