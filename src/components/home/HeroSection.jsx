import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Truck, 
  CheckCircle, 
  Clock, 
  Wrench, 
  Star, 
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 md:py-24 bg-gradient-to-b from-[#020817] via-[#040D20] to-[#020817]">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00E5FF]/10 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-glow"></div>
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-[#00E5FF]/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            
            {/* Small label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1730]/90 backdrop-blur-md border border-[#00E5FF]/40 text-xs sm:text-sm font-black text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:border-[#00E5FF] transition-all">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
              </span>
              <span>⚡ FAST • RELIABLE • PROFESSIONAL</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
                REPAIR.<br />
                <span className="text-gradient-cyan">RESTORE.</span><br />
                <span className="text-[#00E5FF]">RELAX.</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#9FB1C7] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Fast and reliable home appliance repair with convenient pickup, professional servicing and doorstep delivery.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/booking"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#38EFFF] to-[#00b4d8] text-[#020817] font-extrabold text-base shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.8)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                <span>BOOK A REPAIR</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/tracking"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0B1730] hover:bg-[#102244] text-white hover:text-[#00E5FF] font-bold text-base border border-[#00E5FF]/30 hover:border-[#00E5FF]/70 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Wrench className="w-4 h-4 text-[#00E5FF] group-hover:rotate-45 transition-transform" />
                <span>TRACK REPAIR</span>
              </Link>
            </div>

            {/* Three Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
              
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#071328]/90 border border-[#00E5FF]/20 text-left hover:border-[#00E5FF]/50 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                    <Zap className="w-3.5 h-3.5 fill-[#00E5FF]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#00E5FF] tracking-tight">FAST</div>
                </div>
                <div className="text-xs sm:text-sm text-[#9FB1C7] font-medium">Repair Service</div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#071328]/90 border border-[#00E5FF]/20 text-left hover:border-[#00E5FF]/50 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#00E5FF] tracking-tight">DOORSTEP</div>
                </div>
                <div className="text-xs sm:text-sm text-[#9FB1C7] font-medium">Pickup & Delivery</div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#071328]/90 border border-[#00E5FF]/20 text-left hover:border-[#00E5FF]/50 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#00E5FF] tracking-tight">ALL</div>
                </div>
                <div className="text-xs sm:text-sm text-[#9FB1C7] font-medium">Major Brands</div>
              </div>

            </div>

          </motion.div>

          {/* Right Hero Visual with High Quality Appliance Picture & Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Floating Top Rating Badge */}
              <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#020817]/95 backdrop-blur-md border border-[#00E5FF]/40 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(0,229,255,0.2)] animate-float-slow">
                <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-black text-white flex items-center gap-1">
                    <span>4.9 / 5.0</span>
                    <span className="text-[10px] text-amber-400">★★★★★</span>
                  </div>
                  <div className="text-[10px] text-[#9FB1C7]">Verified Customers</div>
                </div>
              </div>

              {/* Floating Right 24h Express Badge */}
              <div className="absolute -bottom-4 -right-4 z-20 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#020817]/95 backdrop-blur-md border border-[#00E5FF]/40 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_15px_rgba(0,229,255,0.2)] animate-float-reverse">
                <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#00E5FF]">24-Hour Return</div>
                  <div className="text-[10px] text-white">Rapid Turnaround</div>
                </div>
              </div>

              {/* Main Photo Card Container */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1730] to-[#040D20] border border-[#00E5FF]/35 p-3 sm:p-4 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_35px_rgba(0,229,255,0.18)] overflow-hidden group">
                
                {/* Image frame */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#061024]">
                  <img
                    src="/appliance-hero.jpg"
                    alt="QuickMend Professional Home Appliance Repair Technician"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle inner gradient shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Floating 24-Hour Banner overlay on image */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#020817]/90 backdrop-blur-md border border-[#00E5FF]/30 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF]">
                        <Zap className="w-4 h-4 fill-[#00E5FF]" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white">Delivery Within 24 Hours</div>
                        <div className="text-[10px] text-[#9FB1C7]">Doorstep Pickup & Rapid Repair</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/15 border border-[#00E5FF]/30 px-2 py-1 rounded">
                      EXPRESS
                    </span>
                  </div>
                </div>

                {/* Bottom Trust Indicators under the image */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-[#061024] border border-slate-800 hover:border-[#00E5FF]/30 transition-all flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
                    <span className="text-slate-200 font-medium">Certified Engineers</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#061024] border border-slate-800 hover:border-[#00E5FF]/30 transition-all flex items-center gap-2 text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
                    <span className="text-slate-200 font-medium">100% Genuine Spares</span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
