import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, Wrench, Sparkles } from 'lucide-react';

export const OtherAppliancesSection = () => {
  return (
    <section className="py-20 bg-[#020817] relative border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-b from-[#0B1730] to-[#040E24] border border-[#00E5FF]/30 p-8 sm:p-12 text-center space-y-6 shadow-[0_15px_40px_rgba(2,8,23,0.9)]">
          
          <div className="w-14 h-14 rounded-2xl bg-[#061024] border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mx-auto shadow-[0_0_20px_rgba(0,229,255,0.2)]">
            <HelpCircle className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            CAN'T FIND YOUR <span className="text-[#00E5FF]">APPLIANCE?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#9FB1C7] max-w-xl mx-auto leading-relaxed">
            Don't see your appliance in the list? Choose Other Appliances while booking and tell us what needs to be repaired.
          </p>

          <div className="pt-2">
            <Link
              to="/booking?appliance=Other"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#00E5FF] hover:bg-[#38EFFF] text-[#020817] font-extrabold text-sm shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>BOOK A REPAIR</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
