import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { useCursor } from '../context/CursorContext';

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleSound, playHover, playClick } = useSound();
  const { setHoverState, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Case Study', href: '#case-study' },
    { name: 'Process', href: '#process' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (href) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 ${
        scrolled
          ? 'py-3 bg-[#030712]/75 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onMouseEnter={() => {
            playHover();
            setHoverState('magnetic');
          }}
          onMouseLeave={resetCursor}
          onClick={() => playClick()}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] transition-all duration-300">
            <div className="w-full h-full bg-[#060919] rounded-xl flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              SUPERNOVA<span className="text-cyan-400">.</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 -mt-1 uppercase">
              Digital Agency
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-5 py-2 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              onMouseEnter={() => {
                playHover();
                setHoverState('pointer');
              }}
              onMouseLeave={resetCursor}
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors relative group rounded-full"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </nav>

        {/* Right CTA & Sound Controls */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Sound Synthesizer Ambiance Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playClick();
            }}
            onMouseEnter={() => {
              playHover();
              setHoverState('pointer');
            }}
            onMouseLeave={resetCursor}
            className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
              !isMuted
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title={!isMuted ? 'Mute ambient cosmic audio' : 'Enable ambient cosmic audio'}
            aria-label="Toggle sound"
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Primary Navbar CTA */}
          <button
            onClick={() => {
              playClick();
              if (onOpenContact) onOpenContact();
              else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onMouseEnter={() => {
              playHover();
              setHoverState('magnetic');
            }}
            onMouseLeave={resetCursor}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-spin-slow group-hover:opacity-100 opacity-70 transition-opacity" />
            <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#060919] font-display text-sm font-semibold text-white group-hover:bg-[#0b0f29] transition-all duration-300">
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              toggleSound();
              playClick();
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
            aria-label="Toggle sound"
          >
            {!isMuted ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 glass-panel-glow rounded-2xl p-6 border border-purple-500/30 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 px-3 text-lg font-medium text-slate-200 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 font-display font-semibold text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              >
                Start a Project
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
