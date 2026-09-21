import React from 'react';
import { Sparkles, Users, Award, Shield, Target, Rocket, Cpu, CheckCircle } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export default function AboutSection() {
  const { setHoverState, resetCursor } = useCursor();
  const { playHover } = useSound();

  const stats = [
    { value: '50+', label: 'Digital Products Launched', detail: 'From pre-seed to Nasdaq-listed' },
    { value: '12', label: 'Global Markets', detail: 'US, UK, Switzerland, Japan, Singapore & more' },
    { value: '98%', label: 'Client Satisfaction', detail: 'Verified 5-star clutch & client NPS' },
    { value: '8+', label: 'Years Combined Mastery', detail: 'Veteran designers & WebGL architects' },
  ];

  const pillars = [
    {
      icon: Target,
      title: 'Selective Client Roster',
      description: 'We take on only 3-4 projects per quarter. You work directly with founding principals, not junior account managers.'
    },
    {
      icon: Cpu,
      title: 'Cognitive AI Native',
      description: 'We weave generative models, agentic workflows, and WebGL 3D into production products that give you an insurmountable moat.'
    },
    {
      icon: Shield,
      title: 'Complete IP Ownership',
      description: '100% full source code, custom shader repositories, and Figma token systems transferred to your organization at completion.'
    },
    {
      icon: Rocket,
      title: 'Relentless Velocity',
      description: 'Our proprietary component framework allows us to build complex, cinematic web apps 3x faster than traditional agencies.'
    }
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute -top-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="rounded-3xl glass-panel border border-white/10 p-8 sm:p-14 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Agency Manifesto</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight">
              Small Team.<br />Massive Impact.
            </h2>

            <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Supernova brings together strategy, design, technology and AI to create digital products that move businesses forward. We work closely with a limited number of clients so every project receives serious attention.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              We reject the bloated, bureaucratic agency model. Instead, we operate as an elite special-ops unit: senior designers, WebGL architects, and AI engineers working in high-bandwidth unison with your executive team.
            </p>
          </div>

          {/* Right Column: Key Philosophy Badges */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    playHover();
                    setHoverState('pointer');
                  }}
                  onMouseLeave={resetCursor}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/40 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-[12px] text-slate-400 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Animated Statistics Grid */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => {
                playHover();
                setHoverState('pointer');
              }}
              onMouseLeave={resetCursor}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-400/40 transition-all hover:-translate-y-1"
            >
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2">
                {stat.value}
              </div>
              <div className="font-display font-bold text-sm text-white mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
