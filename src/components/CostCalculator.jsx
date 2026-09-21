import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Check, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Building2, 
  ShoppingBag, 
  Layers, 
  Smartphone,
  Cpu
} from 'lucide-react';
import { projectTypes, additionalRequirements, timelineTiers } from '../data/calculatorData';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

const projectIconMap = {
  Building2: Building2,
  ShoppingBag: ShoppingBag,
  Layers: Layers,
  Sparkles: Sparkles,
  Smartphone: Smartphone,
};

export default function CostCalculator({ onOpenProposal }) {
  const [selectedProjectType, setSelectedProjectType] = useState(projectTypes[0].id);
  const [selectedAddons, setSelectedAddons] = useState(['custom-uiux', '3d-animations']);
  const [selectedTimeline, setSelectedTimeline] = useState('standard');
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  const toggleAddon = (id) => {
    playClick();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Compute pricing range and timeline estimates
  const calculation = useMemo(() => {
    const currentProject = projectTypes.find((p) => p.id === selectedProjectType) || projectTypes[0];
    const currentTimeline = timelineTiers.find((t) => t.id === selectedTimeline) || timelineTiers[0];

    let minPrice = currentProject.basePriceMin;
    let maxPrice = currentProject.basePriceMax;
    let totalWeeks = currentProject.baseWeeks;

    selectedAddons.forEach((addonId) => {
      const addon = additionalRequirements.find((a) => a.id === addonId);
      if (addon) {
        minPrice += addon.priceMin;
        maxPrice += addon.priceMax;
        totalWeeks += addon.weeks;
      }
    });

    // Apply timeline speed multiplier
    minPrice = Math.round((minPrice * currentTimeline.multiplier) / 100) * 100;
    maxPrice = Math.round((maxPrice * currentTimeline.multiplier) / 100) * 100;
    totalWeeks = Math.max(2, Math.round(totalWeeks * currentTimeline.timeModifier));

    return {
      minPrice,
      maxPrice,
      totalWeeks,
      projectName: currentProject.name,
      addonCount: selectedAddons.length,
      timelineName: currentTimeline.name
    };
  }, [selectedProjectType, selectedAddons, selectedTimeline]);

  const handleGetProposal = () => {
    playClick();
    const currentProject = projectTypes.find((p) => p.id === selectedProjectType);
    const chosenAddonNames = selectedAddons
      .map((id) => additionalRequirements.find((a) => a.id === id)?.name)
      .filter(Boolean);

    const proposalDetails = {
      projectType: currentProject?.name,
      estimatedBudget: `$${calculation.minPrice.toLocaleString()} - $${calculation.maxPrice.toLocaleString()}`,
      estimatedWeeks: `${calculation.totalWeeks} Weeks`,
      timeline: calculation.timelineName,
      addons: chosenAddonNames
    };

    if (onOpenProposal) {
      onOpenProposal(proposalDetails);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="calculator" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          <span>Transparent Valuation Engine</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight mb-6">
          Website Cost Calculator
        </h2>
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          Configure your product scope, required capabilities, and delivery velocity to receive an
          instant estimate tailored to high-end standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Selectors (8 Cols) */}
        <div className="lg:col-span-8 space-y-10 glass-panel rounded-3xl p-6 sm:p-10 border border-white/10">
          
          {/* Step 1: Project Type */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="font-display font-bold text-xl text-white">Select Project Type</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {projectTypes.map((type) => {
                const Icon = projectIconMap[type.icon] || Building2;
                const isSelected = selectedProjectType === type.id;

                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      playClick();
                      setSelectedProjectType(type.id);
                    }}
                    onMouseEnter={() => {
                      playHover();
                      setHoverState('pointer');
                    }}
                    onMouseLeave={resetCursor}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-950/60 to-purple-950/60 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-cyan-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>

                    <div>
                      <div className="font-display font-bold text-sm text-white mb-1">
                        {type.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal line-clamp-2">
                        {type.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Additional Requirements */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-mono text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <h3 className="font-display font-bold text-xl text-white">Additional Requirements</h3>
              </div>
              <span className="text-xs font-mono text-purple-300">
                {selectedAddons.length} Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalRequirements.map((req) => {
                const isSelected = selectedAddons.includes(req.id);

                return (
                  <button
                    key={req.id}
                    onClick={() => toggleAddon(req.id)}
                    onMouseEnter={() => {
                      playHover();
                      setHoverState('pointer');
                    }}
                    onMouseLeave={resetCursor}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div 
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isSelected ? 'bg-purple-500 text-white' : 'border border-white/20 bg-white/5'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1">
                      <div className="font-display font-semibold text-xs sm:text-sm text-white flex items-center justify-between">
                        <span>{req.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                        {req.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Timeline Velocity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 font-mono text-xs flex items-center justify-center font-bold">
                3
              </span>
              <h3 className="font-display font-bold text-xl text-white">Select Delivery Velocity</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {timelineTiers.map((tier) => {
                const isSelected = selectedTimeline === tier.id;

                return (
                  <button
                    key={tier.id}
                    onClick={() => {
                      playClick();
                      setSelectedTimeline(tier.id);
                    }}
                    onMouseEnter={() => {
                      playHover();
                      setHoverState('pointer');
                    }}
                    onMouseLeave={resetCursor}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-pink-950/50 to-purple-950/50 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.25)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-pink-300">
                        {tier.badge}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-pink-400" />}
                    </div>

                    <div>
                      <div className="font-display font-bold text-sm text-white mb-1">
                        {tier.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {tier.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Live Estimate Summary HUD (4 Cols) */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="rounded-3xl glass-panel-glow border border-cyan-400/40 p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.25)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <span className="font-mono text-xs text-cyan-300 uppercase tracking-wider">
                Telemetry Valuation
              </span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Estimated Price Range */}
            <div className="mb-6">
              <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                Estimated Project Investment
              </div>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-gradient-cosmic tracking-tight">
                ${calculation.minPrice.toLocaleString()} – ${calculation.maxPrice.toLocaleString()}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                USD • Fixed-price milestone tranches
              </div>
            </div>

            {/* Estimated Duration */}
            <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Estimated Velocity</span>
              </div>
              <span className="font-display font-bold text-sm text-white">
                ~{calculation.totalWeeks} Weeks
              </span>
            </div>

            {/* Scope Breakdown list */}
            <div className="space-y-2 mb-8 text-xs font-mono text-slate-300 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Core Architecture:</span>
                <span className="text-white font-medium">{calculation.projectName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Add-on Modules:</span>
                <span className="text-purple-300 font-medium">{calculation.addonCount} Selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Deployment Pace:</span>
                <span className="text-pink-300 font-medium">{calculation.timelineName}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleGetProposal}
              onMouseEnter={() => {
                playHover();
                setHoverState('magnetic');
              }}
              onMouseLeave={resetCursor}
              className="w-full group py-4 px-6 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-display font-bold text-sm text-white shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Get a Detailed Proposal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-center text-slate-400 font-mono mt-4">
              Includes full source code IP ownership, design tokens & 30-day post-launch warranty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
