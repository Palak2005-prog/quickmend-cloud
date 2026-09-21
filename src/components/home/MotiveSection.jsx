import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Sparkles, HeartHandshake, FileText, Zap, ArrowUpRight } from 'lucide-react';

export const MotiveSection = () => {
  const pillars = [
    {
      title: "Convenient",
      icon: Sparkles,
      desc: "Skip the hassle of hauling heavy appliances or visiting unverified local shops. We bring reliable booking, scheduled pickups, and doorstep solutions directly to you."
    },
    {
      title: "Reliable",
      icon: Shield,
      desc: "Every appliance is examined and serviced by skilled, background-verified technicians using proper testing tools and genuine OEM replacement parts."
    },
    {
      title: "Transparent",
      icon: FileText,
      desc: "No hidden charges or surprise costs. Get upfront diagnosis explanations, honest price estimates, and stage-by-stage status visibility throughout."
    },
    {
      title: "Hassle-free",
      icon: HeartHandshake,
      desc: "From your initial service request to final delivery and testing, our coordinated logistics and dedicated support ensure total peace of mind."
    }
  ];

  return (
    <section className="py-20 bg-[#020817] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-[#00E5FF]" />
            <span>Our Purpose & Customer Journey</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            WE MAKE REPAIR <span className="text-[#00E5FF]">SIMPLE.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#9FB1C7] leading-relaxed">
            Home appliances are the backbone of modern living. When a machine breaks down, getting it repaired shouldn’t be a complicated ordeal. QuickMend redefines the customer journey by combining smooth digital booking, safe door-to-door handling, certified technical expertise, and attentive post-service care.
          </p>
        </div>

        {/* Four Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0B1730]/90 to-[#061024]/90 border border-[#00E5FF]/15 hover:border-[#00E5FF]/50 transition-all duration-300 shadow-[0_10px_30px_rgba(2,8,23,0.6)] hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top neon glow line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#061024] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-5 group-hover:scale-110 group-hover:border-[#00E5FF] transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#00E5FF] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-sm text-[#9FB1C7] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
                  <CheckCircle className="w-4 h-4" />
                  <span>QuickMend Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
