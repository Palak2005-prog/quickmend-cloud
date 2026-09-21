import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Building2, Globe2, ShieldCheck, CheckCircle } from 'lucide-react';

export const CoverageSection = () => {
  const featuredCities = [
    { name: "Delhi NCR", state: "National Capital Region", hubs: "3 Hubs", tag: "Express" },
    { name: "Mumbai", state: "Maharashtra", hubs: "2 Hubs", tag: "Flagship" },
    { name: "Bengaluru", state: "Karnataka", hubs: "2 Hubs", tag: "Tech Hub" },
    { name: "Hyderabad", state: "Telangana", hubs: "1 Hub", tag: "Active" },
    { name: "Chennai", state: "Tamil Nadu", hubs: "1 Hub", tag: "Active" },
    { name: "Kolkata", state: "West Bengal", hubs: "1 Hub", tag: "Active" },
    { name: "Pune", state: "Maharashtra", hubs: "1 Hub", tag: "Active" },
    { name: "Ahmedabad", state: "Gujarat", hubs: "1 Hub", tag: "Active" },
    { name: "Jamshedpur & Ranchi", state: "Jharkhand", hubs: "3 Hubs", tag: "Regional" },
    { name: "Jaipur", state: "Rajasthan", hubs: "1 Hub", tag: "Active" },
    { name: "Chandigarh", state: "Punjab & Haryana", hubs: "1 Hub", tag: "Active" },
    { name: "Kochi", state: "Kerala", hubs: "1 Hub", tag: "Active" }
  ];

  return (
    <section className="py-20 bg-[#020817] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Card Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1730] via-[#061024] to-[#020817] border border-[#00E5FF]/25 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(2,8,23,0.9)] relative overflow-hidden">
          
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF]">
                <Globe2 className="w-3.5 h-3.5" />
                <span>NATIONWIDE SERVICE NETWORK</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                REPAIR SUPPORT <br />
                <span className="text-[#00E5FF]">ACROSS INDIA.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#9FB1C7] leading-relaxed">
                QuickMend is designed to make appliance repair accessible to customers across cities and states throughout India.
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
                  <span>Standardized service protocols & verified technicians in all regions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00E5FF] flex-shrink-0" />
                  <span>Doorstep pickup & on-site repair available in major metropolitan & tier-2 zones</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00E5FF] hover:bg-[#38EFFF] text-[#020817] font-extrabold text-sm shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>FIND A STORE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right City Directory Visual */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {featuredCities.map((city, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#071328]/90 border border-slate-800 hover:border-[#00E5FF]/40 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-1.5 py-0.5 rounded">
                        {city.tag}
                      </span>
                      <MapPin className="w-3.5 h-3.5 text-[#9FB1C7] group-hover:text-[#00E5FF] transition-colors" />
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {city.name}
                    </div>
                    <div className="text-[11px] text-[#9FB1C7] truncate">
                      {city.state}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-[#020817]/60 border border-slate-800/80 text-center">
                <span className="text-xs text-[#9FB1C7]">
                  + Expanding rapidly to 25+ more Tier-1 and Tier-2 Indian cities
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
