import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Truck, Wrench, PackageCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "BOOK A REPAIR",
      description: "Select your appliance and describe the problem you're facing.",
      subtext: "Choose convenient date & time slot with your complete address.",
      icon: CalendarCheck
    },
    {
      number: "02",
      title: "PICKUP",
      description: "Where available, our team safely collects the appliance from your doorstep.",
      subtext: "Logistics executive inspects and securely transports the unit.",
      icon: Truck
    },
    {
      number: "03",
      title: "EXPERT REPAIR",
      description: "The appliance is inspected, diagnosed and repaired by service professionals.",
      subtext: "Multi-point diagnostics with authentic replacement parts.",
      icon: Wrench
    },
    {
      number: "04",
      title: "DELIVERY",
      description: "Where applicable, your repaired appliance is safely returned to your doorstep within 24 hours.",
      subtext: "Delivered, installed/tested, and handed over with service report.",
      icon: PackageCheck
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#020817] via-[#05112B] to-[#020817] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-[#00E5FF]" />
            <span>Step-By-Step Process</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            SIMPLE. <span className="text-[#00E5FF]">FAST.</span> RELIABLE.
          </h2>

          <p className="text-base sm:text-lg text-[#9FB1C7]">
            Getting your appliance repaired is easy with QuickMend.
          </p>
        </div>

        {/* 4 Steps Timeline Grid with animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl bg-gradient-to-b from-[#0B1730]/90 to-[#061026]/90 border border-[#00E5FF]/25 hover:border-[#00E5FF]/60 p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(2,8,23,0.8)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all duration-300 group"
              >
                <div>
                  {/* Step number badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#061024] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)] group-hover:scale-110 group-hover:border-[#00E5FF] transition-all">
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30">
                      STEP {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
                    {step.number} — {step.title}
                  </h3>

                  {/* Main Description */}
                  <p className="text-sm text-white/95 font-medium leading-relaxed mb-2">
                    {step.description}
                  </p>

                  {/* Subtext */}
                  <p className="text-xs text-[#9FB1C7] leading-relaxed">
                    {step.subtext}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-[#00E5FF] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Express Dispatch
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
