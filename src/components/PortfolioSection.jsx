import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Filter, Eye, Layers } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';
import CaseStudyModal from './CaseStudyModal';

export default function PortfolioSection({ onOpenContact }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [mouseOffsets, setMouseOffsets] = useState({});
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  const categories = ['All', 'AI Application', 'SaaS Platform', 'Fintech Dashboard', 'Mobile App', 'Luxury Brand Website', 'E-commerce Experience'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const handleCardMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMouseOffsets((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleCardMouseLeave = (id) => {
    setMouseOffsets((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
    resetCursor();
  };

  const renderMockupPreview = (project, offset) => {
    const { x = 0, y = 0 } = offset || {};
    
    return (
      <div 
        className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-[#06091c] via-[#090e2b] to-[#040612] p-5 border border-white/10 flex flex-col justify-between transition-transform duration-300 ease-out shadow-inner"
        style={{
          transform: `translate3d(${x * 0.5}px, ${y * 0.5}px, 0)`,
        }}
      >
        {/* Dynamic Glow Orb in mockup */}
        <div 
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-500"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Mockup Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
            {project.category}
          </span>
        </div>

        {/* Dynamic UI Pattern according to category */}
        <div className="my-auto z-10 flex flex-col items-center justify-center text-center">
          {project.mockupType === 'ai-orchestrator' && (
            <div className="space-y-2 w-full max-w-xs">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-xs text-cyan-300">Neural Agents Synced: 140,290</span>
              </div>
              <div className="w-full bg-cyan-500/20 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full w-4/5 animate-pulse" />
              </div>
            </div>
          )}

          {project.mockupType === 'fintech-terminal' && (
            <div className="w-full grid grid-cols-3 gap-2 text-left">
              <div className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-[9px] text-slate-400 font-mono">FLOW RATE</div>
                <div className="text-xs font-mono font-bold text-emerald-400">99.98% OK</div>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-[9px] text-slate-400 font-mono">LIQUIDITY</div>
                <div className="text-xs font-mono font-bold text-white">$4.2B DLY</div>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-[9px] text-slate-400 font-mono">LATENCY</div>
                <div className="text-xs font-mono font-bold text-cyan-300">1.2ms</div>
              </div>
            </div>
          )}

          {project.mockupType === 'spatial-os' && (
            <div className="relative flex items-center justify-center w-24 h-24">
              <div className="absolute inset-0 rounded-full border border-purple-400/40 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full border border-cyan-400/40 animate-orbit-2" />
              <span className="text-xs font-mono text-purple-300 font-bold">Spatial 3D</span>
            </div>
          )}

          {project.mockupType === 'luxury-watch' && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-amber-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <div className="w-8 h-8 rounded-full border border-amber-300/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
              </div>
              <span className="text-[11px] font-mono text-amber-300/90 mt-2">Haute 3D Atelier</span>
            </div>
          )}

          {project.mockupType === 'mobile-health' && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-400/60 flex items-center justify-center animate-pulse">
                <span className="text-xs font-mono font-bold text-rose-300">72 BPM</span>
              </div>
              <div className="text-left">
                <div className="text-xs font-mono text-white font-bold">Circadian Rhythm</div>
                <div className="text-[10px] text-slate-400 font-mono">98% Optimum Zone</div>
              </div>
            </div>
          )}

          {project.mockupType === 'spatial-retail' && (
            <div className="flex flex-col items-center gap-1.5">
              <span className="px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold">
                DROP #09 LIVE
              </span>
              <span className="text-[10px] font-mono text-slate-300">180k Concurrent • 90s Sold Out</span>
            </div>
          )}
        </div>

        {/* Mockup Footer */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 z-10 border-t border-white/5 pt-2">
          <span>{project.client}</span>
          <span className="text-cyan-400 font-semibold">{project.year}</span>
        </div>
      </div>
    );
  };

  return (
    <section id="work" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Award-Winning Portfolio</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight mb-6">
          Selected Missions
        </h2>
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          Explore our flagship deployments spanning autonomous AI engines, high-frequency fintech,
          spatial reality systems, and bespoke digital flagships.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playClick();
              setSelectedCategory(cat);
            }}
            onMouseEnter={() => {
              playHover();
              setHoverState('pointer');
            }}
            onMouseLeave={resetCursor}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] border-transparent'
                : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid (6 Project Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => {
          const offset = mouseOffsets[project.id];

          return (
            <div
              key={project.id}
              onMouseMove={(e) => handleCardMouseMove(e, project.id)}
              onMouseEnter={() => {
                playHover();
                setHoverState('view', 'VIEW');
              }}
              onMouseLeave={() => handleCardMouseLeave(project.id)}
              onClick={() => {
                playClick();
                setActiveProjectModal(project);
              }}
              className="group relative rounded-3xl p-6 glass-panel border border-white/[0.09] hover:border-cyan-400/50 transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(56,189,248,0.2)] hover:-translate-y-2"
            >
              {/* Card Inner Mockup */}
              <div className="mb-6">
                {renderMockupPreview(project, offset)}
              </div>

              {/* Card Metadata */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {project.duration}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                  {project.tagline}
                </p>

                {/* Short Result Pill */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-300 flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    {project.shortResult}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-cyan-500 text-slate-400 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Case Study Modal */}
      {activeProjectModal && (
        <CaseStudyModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
          onOpenContact={onOpenContact}
        />
      )}
    </section>
  );
}
