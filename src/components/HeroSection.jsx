import React from 'react';
import { ArrowRight, Sparkles, Play, ShieldCheck, Zap, Globe2 } from 'lucide-react';
import Supernova3DCanvas from './Supernova3DCanvas';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export default function HeroSection({ onOpenContact, onExploreWork }) {
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  const handleStartProject = () => {
    playClick();
    if (onOpenContact) {
      onOpenContact();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreWork = () => {
    playClick();
    if (onExploreWork) {
      onExploreWork();
    } else {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D WebGL Interactive Supernova Canvas */}
      <Supernova3DCanvas />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Floating Badge */}
        <div
          onMouseEnter={() => {
            playHover();
            setHoverState('pointer');
          }}
          onMouseLeave={resetCursor}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-float-slow"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Now Booking Q3 / Q4 2026 Missions</span>
          <span className="text-white/30">•</span>
          <span className="text-purple-300">Limited Cohort</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] max-w-4xl text-gradient-cosmic mb-6">
          We Build Digital Experiences That{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Explode
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 opacity-60 rounded-full" />
          </span>{' '}
          With Possibility.
        </h1>

        {/* Supporting Copy */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl leading-relaxed mb-10 font-normal">
          Supernova creates premium websites, AI applications and digital products for ambitious brands
          ready to grow beyond ordinary.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto mb-14">
          {/* Primary CTA */}
          <button
            onClick={handleStartProject}
            onMouseEnter={() => {
              playHover();
              setHoverState('magnetic');
            }}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-display font-bold text-base text-white overflow-hidden shadow-[0_0_35px_rgba(56,189,248,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.7)] hover:scale-[1.02]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 transition-all duration-300 group-hover:opacity-90" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-3">
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleExploreWork}
            onMouseEnter={() => {
              playHover();
              setHoverState('pointer');
            }}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto group inline-flex items-center justify-center px-8 py-4 rounded-full font-display font-semibold text-base text-slate-200 glass-panel hover:text-white hover:border-cyan-400/50 transition-all duration-300 hover:bg-white/[0.08]"
          >
            <span className="flex items-center gap-2.5">
              <span>Explore Our Work</span>
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </div>

        {/* Small Trust Line & Social Proof Badges */}
        <div className="pt-6 border-t border-white/[0.08] w-full max-w-3xl flex flex-col items-center">
          <p className="text-xs sm:text-sm font-medium text-slate-400 tracking-wide uppercase font-mono mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Trusted by ambitious founders, startups and growing brands</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sub-Second Latency</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-purple-400" />
              <span>12 Global Markets</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>98% Client CSAT</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-slate-500">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
