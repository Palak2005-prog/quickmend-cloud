import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wrench, ArrowRight, Phone, Clock, Zap } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Track Repair', path: '/tracking' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[#020817]/90 backdrop-blur-md border-b border-[#00E5FF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
        : 'bg-[#020817]/70 backdrop-blur-sm border-b border-[#00E5FF]/10'
    }`}>
      {/* Top micro-bar highlighting 24-hour service */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 text-xs border-b border-[#00E5FF]/10 text-[#9FB1C7] bg-[#061024]/50">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 text-[#00E5FF] font-semibold">
            <Zap className="w-3.5 h-3.5 fill-[#00E5FF]" />
            ⚡ Doorstep Repair & Express Delivery Within 24 Hours Across India
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#00E5FF]" /> Open 7 Days: 8:00 AM - 9:00 PM
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="tel:9279041718" className="hover:text-[#00E5FF] transition-colors flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#00E5FF]" /> +91 92790 41718
          </a>
          <a 
            href="https://wa.me/919279041718?text=Hello%20QuickMend,%20I%20need%20appliance%20repair%20service." 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#00E5FF] hover:underline"
          >
            WhatsApp Support
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1730] to-[#061024] border border-[#00E5FF]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.25)] group-hover:border-[#00E5FF] transition-all">
              <Wrench className="w-5 h-5 text-[#00E5FF] transform group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-white flex items-center">
                Quick<span className="text-[#00E5FF]">Mend</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#9FB1C7] font-semibold -mt-1">
                REPAIR • RESTORE • RELAX
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.15)]'
                    : 'text-[#9FB1C7] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Highlighted CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/booking"
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] px-5 py-2.5 text-sm font-bold text-[#020817] shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>BOOK A REPAIR</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[#9FB1C7] hover:text-white hover:bg-[#0B1730] border border-[#00E5FF]/20 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#00E5FF]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#020817]/95 border-b border-[#00E5FF]/20 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-[#00E5FF] bg-[#00E5FF]/15 border border-[#00E5FF]/30 font-semibold'
                    : 'text-[#9FB1C7] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#00E5FF]/15">
            <Link
              to="/booking"
              className="w-full flex items-center justify-center gap-2 bg-[#00E5FF] text-[#020817] py-3 rounded-xl font-bold text-center shadow-[0_0_20px_rgba(0,229,255,0.35)]"
            >
              <span>BOOK A REPAIR</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-[#9FB1C7] px-2">
              <a href="tel:9279041718" className="flex items-center gap-1.5 hover:text-[#00E5FF]">
                <Phone className="w-3.5 h-3.5 text-[#00E5FF]" /> 9279041718
              </a>
              <a 
                href="https://wa.me/919279041718?text=Hello%20QuickMend,%20I%20need%20appliance%20repair%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF]"
              >
                WhatsApp Chat →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
