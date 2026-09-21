import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { ApplianceIcon } from '../ui/ApplianceIcon';

export const ServicesGrid = () => {
  return (
    <section className="py-20 bg-[#020817] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-[#00E5FF]" />
            <span>Transparent Pricing • 24-Hour Express Delivery</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            OUR <span className="text-[#00E5FF]">SERVICES</span>
          </h2>

          <p className="text-base sm:text-lg text-[#9FB1C7]">
            Select your appliance type below for certified diagnostics, genuine OEM parts, reasonable fixed rates, and fast 24-hour return.
          </p>
        </div>

        {/* 8 Services Grid with Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-gradient-to-b from-[#0B1730]/90 to-[#061026]/90 border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 transition-all duration-300 p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(2,8,23,0.7)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] group relative overflow-hidden"
            >
              {/* Top Accent Neon Glow Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Top icon and badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#061024] border border-[#00E5FF]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.2)] group-hover:scale-110 group-hover:border-[#00E5FF] transition-all">
                    <ApplianceIcon name={service.name} className="w-7 h-7" color="#00E5FF" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {service.badge}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
                  {service.name}
                </h3>

                {/* Price Display */}
                <div className="p-3 rounded-2xl bg-[#061024] border border-[#00E5FF]/20 mb-3 flex items-center justify-between group-hover:border-[#00E5FF]/40 transition-colors">
                  <div>
                    <span className="text-[10px] text-[#9FB1C7] uppercase tracking-wider block">Starts at</span>
                    <span className="text-xl font-black text-[#00E5FF]">{service.startingPrice}</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium text-right max-w-[120px]">
                    {service.priceNote}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#9FB1C7] leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Common check points */}
                <ul className="space-y-1.5 mb-6 text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                  {service.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to={`/booking?appliance=${encodeURIComponent(service.shortName)}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#071328] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#020817] font-bold text-xs border border-[#00E5FF]/30 hover:border-[#00E5FF] transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                >
                  <span>BOOK REPAIR</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
