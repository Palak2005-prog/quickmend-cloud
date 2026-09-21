import React from 'react';
import { Rocket, Sparkles, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export default function FinalCTASection({ onOpenContact }) {
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick, playSuccess } = useSound();

  const handleLaunchClick = (e) => {
    playClick();
    playSuccess();

    // Cosmic celebration particle burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#8b5cf6', '#ec4899', '#ffffff']
      });
    } catch (err) {}

    if (onOpenContact) {
      onOpenContact();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Supernova Cosmic Vortex Portal */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-16 lg:p-20 text-center flex flex-col items-center justify-center border border-purple-500/40 bg-gradient-to-b from-[#0e143d]/90 via-[#070a24]/95 to-[#030712] shadow-[0_0_100px_rgba(168,85,247,0.3)]">
        
        {/* Animated Radial Energy Waves */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-pink-500/20 blur-3xl animate-glow-pulse" />
          <div className="absolute w-[450px] h-[450px] rounded-full border border-cyan-400/20 animate-spin-slow" />
          <div className="absolute w-[350px] h-[350px] rounded-full border border-purple-500/20 animate-orbit-2" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-400/40 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-8">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Ignite Your Trajectory</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight leading-tight mb-6">
            Your Next Big Idea Deserves More Than an Ordinary Website.
          </h2>

          <p className="font-sans text-base sm:text-xl text-slate-300 max-w-xl mb-10 leading-relaxed font-normal">
            Let’s transform your vision into a powerful digital experience that dominates your market.
          </p>

          {/* Interactive Glowing Launch Button */}
          <button
            onClick={handleLaunchClick}
            onMouseEnter={() => {
              playHover();
              setHoverState('magnetic');
            }}
            onMouseLeave={resetCursor}
            className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full font-display font-bold text-lg text-white overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all duration-300 hover:shadow-[0_0_70px_rgba(168,85,247,0.8)] hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 animate-gradient-x" />
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-3">
              <Rocket className="w-5 h-5 text-white transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              <span>Launch Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Guarantee Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Direct Principal Access</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Fixed Milestone Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>100% IP & Source Transfer</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
