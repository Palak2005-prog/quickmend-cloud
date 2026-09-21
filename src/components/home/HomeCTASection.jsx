import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, ShieldCheck, Sparkles, Clock, Zap } from 'lucide-react';

export const HomeCTASection = () => {
  return (
    <section className="py-20 bg-[#020817] relative border-t border-slate-800/80 overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute inset-0 bg-radial-subtle pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#00E5FF]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-b from-[#0B1730] via-[#061026] to-[#040E24] border border-[#00E5FF]/35 p-8 sm:p-14 text-center space-y-6 shadow-[0_0_50px_rgba(0,229,255,0.15)] relative"
        >
          
          <div className="w-16 h-16 rounded-2xl bg-[#061024] border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mx-auto shadow-[0_0_25px_rgba(0,229,255,0.3)] animate-float-slow">
            <Wrench className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            YOUR APPLIANCE.<br />
            <span className="text-[#00E5FF]">OUR EXPERTISE.</span>
          </h2>

          <p className="text-base sm:text-xl text-[#9FB1C7] max-w-xl mx-auto leading-relaxed">
            Book your repair request and let QuickMend take care of the rest.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/booking"
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#38EFFF] to-[#00b4d8] text-[#020817] font-extrabold text-base shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:shadow-[0_0_45px_rgba(0,229,255,0.8)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              <span>BOOK A REPAIR</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#071328] hover:bg-[#0B1730] text-white hover:text-[#00E5FF] font-bold text-base border border-slate-700 hover:border-[#00E5FF]/60 transition-all flex items-center justify-center"
            >
              Contact Support
            </Link>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#9FB1C7] border-t border-slate-800/80">
            <span className="flex items-center gap-1.5 text-white">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" /> Verified Technicians
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <Clock className="w-4 h-4 text-[#00E5FF]" /> 24-Hour Express Return
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <Sparkles className="w-4 h-4 text-[#00E5FF]" /> 100% Quality Workmanship
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
