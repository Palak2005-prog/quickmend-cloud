import React, { useEffect } from 'react';
import { X, ArrowRight, ExternalLink, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Layers, Terminal, Clock } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export default function CaseStudyModal({ project, onClose, onOpenContact }) {
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl my-auto rounded-3xl glass-panel-glow border border-purple-500/30 overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.3)] bg-gradient-to-b from-[#0b0f29] to-[#030712] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest">
              Mission Dossier // {project.category}
            </span>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            onMouseEnter={() => {
              playHover();
              setHoverState('pointer');
            }}
            onMouseLeave={resetCursor}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto space-y-10">
          {/* Title & Tagline */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Duration: {project.duration}
              </span>
              <span className="text-xs font-mono text-slate-400">• Year {project.year}</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-3">
              {project.title}
            </h2>
            <p className="text-lg text-slate-300 font-normal">
              {project.tagline}
            </p>
          </div>

          {/* Interactive Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] relative overflow-hidden group hover:border-cyan-400/40 transition-colors"
              >
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-cyan-400 mt-1">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Simulated Interactive Mockup Showcase */}
          <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-[#060814] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  https://mission.supernova.agency/{project.id}
                </span>
              </div>
              <span className="font-mono text-xs text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 60 FPS GPU WebGL Active
              </span>
            </div>

            {/* Inner Interactive Visual Canvas */}
            <div className="h-64 sm:h-80 w-full rounded-xl bg-gradient-to-br from-[#0c1236] to-[#040614] p-6 flex flex-col justify-between relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Client Architecture</div>
                  <div className="text-xl font-display font-bold text-white">{project.client}</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
                  Production Live
                </div>
              </div>

              {/* Simulated UI telemetry graph bars */}
              <div className="relative z-10 grid grid-cols-6 gap-2 items-end h-24 my-auto">
                {[65, 80, 45, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div 
                      className="w-full rounded-t-lg bg-gradient-to-t from-cyan-500 to-purple-500 transition-all duration-700 hover:brightness-125"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] font-mono text-slate-500">M0{i+1}</span>
                  </div>
                ))}
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/10">
                <span>Result: {project.shortResult}</span>
                <span className="text-cyan-300">Verified by Supernova Telemetry</span>
              </div>
            </div>
          </div>

          {/* Deep Breakdown: Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2 font-display font-bold text-xl text-rose-400 mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                The Challenge
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2 font-display font-bold text-xl text-emerald-400 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                The Supernova Solution
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Services Provided & Tech Stack */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg text-white">Services & Engineering Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.servicesProvided.map((s, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium">
                  {s}
                </span>
              ))}
              {project.techStack.map((t, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Client Testimonial Quote */}
          {project.testimonial && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900/50 to-blue-950/40 border border-purple-500/30">
              <p className="italic text-slate-200 text-base mb-4">
                "{project.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-xs">
                  {project.testimonial.author[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{project.testimonial.author}</div>
                  <div className="text-xs text-slate-400 font-mono">{project.testimonial.role}</div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-mono text-slate-400">
              Want to launch a mission of similar calibre for your brand?
            </p>
            <button
              onClick={() => {
                playClick();
                onClose();
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
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-display font-bold text-sm text-white shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2"
            >
              <span>Build A Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
