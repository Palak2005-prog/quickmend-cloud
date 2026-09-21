import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#010612] border-t border-[#00E5FF]/15 pt-16 pb-12 text-[#9FB1C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1730] border border-[#00E5FF]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Wrench className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Quick<span className="text-[#00E5FF]">Mend</span>
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed text-[#9FB1C7]">
              Fast, reliable and convenient appliance repair services across India with express 24-hour return and certified engineers.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-xs font-semibold text-[#00E5FF]">
                <ShieldCheck className="w-4 h-4" />
                <span>India-Wide Certified Service</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]/60" /> Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]/60" /> Services & Pricing
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]/60" /> Book Repair
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]/60" /> Track Repair
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#00E5FF]/60" /> Contact & Store Network
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/admin" className="text-slate-400 hover:text-[#00E5FF] transition-colors flex items-center gap-2 text-xs">
                  <Lock className="w-3 h-3 text-[#00E5FF]/60" /> Admin Dispatch Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Covered */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
              Appliance Services
            </h4>
            <ul className="space-y-2 text-sm grid grid-cols-1 gap-1.5">
              <li>
                <Link to="/services" className="hover:text-[#00E5FF] transition-colors">
                  • Refrigerator (Starts ₹349)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#00E5FF] transition-colors">
                  • Washing Machine (Starts ₹299)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#00E5FF] transition-colors">
                  • AC Jet Servicing (Starts ₹399)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#00E5FF] transition-colors">
                  • Microwave Oven (Starts ₹249)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#00E5FF] transition-colors">
                  • Water Purifier / RO (Starts ₹199)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#00E5FF] transition-colors">
                  • Smart LED TV (Starts ₹349)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#00E5FF] transition-colors">
                  • Geyser & Other Appliances
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
              Customer Support
            </h4>
            
            <div className="space-y-3 text-sm">
              <a 
                href="tel:9279041718"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1730] border border-[#00E5FF]/20 hover:border-[#00E5FF]/50 transition-all text-white group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-[#020817] transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#9FB1C7]">Helpline (8 AM - 9 PM)</div>
                  <div className="font-bold text-white group-hover:text-[#00E5FF]">9279041718</div>
                </div>
              </a>

              <a 
                href="mailto:replypalak525@gmail.com"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1730] border border-[#00E5FF]/20 hover:border-[#00E5FF]/50 transition-all text-white group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-[#020817] transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-[#9FB1C7]">Official Support Email</div>
                  <div className="font-semibold text-xs text-white group-hover:text-[#00E5FF] break-all">replypalak525@gmail.com</div>
                </div>
              </a>

              <a 
                href="https://wa.me/919279041718?text=Hello%20QuickMend,%20I%20have%20an%20appliance%20repair%20inquiry."
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-bold transition-all text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT WITH US ON WHATSAPP →</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9FB1C7] gap-4">
          <p>© 2026 QuickMend. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>24-Hour Express Delivery</span>
            <span>•</span>
            <span>Verified Engineers</span>
            <span>•</span>
            <Link to="/admin" className="hover:text-[#00E5FF]">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
