import React, { useState } from 'react';
import { 
  Compass, 
  Network, 
  Palette, 
  Code2, 
  Rocket, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Orbit,
  Clock
} from 'lucide-react';
import { processStages } from '../data/processData';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

const iconMap = {
  Compass: Compass,
  Network: Network,
  Palette: Palette,
  Code2: Code2,
  Rocket: Rocket,
  Flame: Flame,
};

export default function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  const currentStage = processStages[activeStepIndex];
  const CurrentIcon = iconMap[currentStage.icon] || Sparkles;

  return (
    <section id="process" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 uppercase tracking-widest mb-4">
          <Orbit className="w-3.5 h-3.5 text-purple-400" />
          <span>Orbital Delivery Methodology</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight mb-6">
          From Idea to Impact
        </h2>
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          A battle-tested 6-stage orbital flight plan engineered to eliminate risk, maximize velocity,
          and produce world-class digital products on schedule.
        </p>
      </div>

      {/* Orbital Interactive Node Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {processStages.map((stage, idx) => {
          const Icon = iconMap[stage.icon] || Sparkles;
          const isActive = activeStepIndex === idx;

          return (
            <button
              key={stage.step}
              onClick={() => {
                playClick();
                setActiveStepIndex(idx);
              }}
              onMouseEnter={() => {
                playHover();
                setHoverState('pointer');
              }}
              onMouseLeave={resetCursor}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                isActive
                  ? 'bg-gradient-to-b from-[#151c4a] to-[#090d29] border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.3)] scale-[1.02]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              {/* Active Glow Accent */}
              {isActive && (
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-40 pointer-events-none"
                  style={{ backgroundColor: stage.color }}
                />
              )}

              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-xs font-bold ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
                  PHASE {stage.step}
                </span>
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className={`font-display font-bold text-base transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {stage.title}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  {stage.duration}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Active Stage Interactive HUD Inspector */}
      <div className="rounded-3xl glass-panel-glow border border-purple-500/30 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]">
        {/* Background ambient light */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-30 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: currentStage.color }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Stage Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                Active Orbital Step {currentStage.step} of 06
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                {currentStage.duration}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              {currentStage.step}. {currentStage.title}
            </h3>

            <div className="text-base font-mono text-cyan-300/90 font-medium">
              // {currentStage.tagline}
            </div>

            <p className="text-slate-300 text-base leading-relaxed font-normal">
              {currentStage.description}
            </p>

            {/* Deliverables List */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-3">
                Key Mission Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentStage.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 flex items-center gap-4">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => {
                  playClick();
                  setActiveStepIndex((prev) => Math.max(0, prev - 1));
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono border transition-all ${
                  activeStepIndex === 0
                    ? 'opacity-30 border-white/10 text-slate-500 cursor-not-allowed'
                    : 'border-white/20 text-slate-300 hover:text-white hover:border-cyan-400'
                }`}
              >
                ← Previous Stage
              </button>

              <button
                disabled={activeStepIndex === processStages.length - 1}
                onClick={() => {
                  playClick();
                  setActiveStepIndex((prev) => Math.min(processStages.length - 1, prev + 1));
                }}
                className={`px-5 py-2 rounded-full text-xs font-mono font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] ${
                  activeStepIndex === processStages.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:scale-105'
                }`}
              >
                Next Stage →
              </button>
            </div>
          </div>

          {/* Right Column: 3D Orbital Trajectory Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-purple-500/25 animate-orbit-2" />
              <div className="absolute inset-16 rounded-full border border-white/10" />

              {/* Center Celestial Core */}
              <div 
                className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative z-10 transition-transform duration-500 transform hover:scale-110"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${currentStage.color}, #090d26)`,
                  boxShadow: `0 0 40px ${currentStage.color}80`
                }}
              >
                <CurrentIcon className="w-8 h-8 text-white mb-1 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase">{currentStage.title}</span>
              </div>

              {/* Orbiting Satellite Node */}
              <div className="absolute inset-0 animate-orbit-1 pointer-events-none">
                <div 
                  className="w-5 h-5 rounded-full border-2 border-white shadow-[0_0_10px_#ffffff] transform -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: currentStage.color }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
