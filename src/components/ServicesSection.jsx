import React, { useState } from 'react';
import { 
  Globe, 
  Cpu, 
  Smartphone, 
  Layers, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

const iconMap = {
  Globe: Globe,
  Cpu: Cpu,
  Smartphone: Smartphone,
  Layers: Layers,
  Sparkles: Sparkles,
  TrendingUp: TrendingUp,
};

export default function ServicesSection({ onSelectService }) {
  const [activeCard, setActiveCard] = useState(null);
  const [mousePos, setMousePos] = useState({});
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos((prev) => ({ ...prev, [index]: { x, y } }));
  };

  const handleMouseLeave = (index) => {
    setMousePos((prev) => ({ ...prev, [index]: { x: 0, y: 0 } }));
    setActiveCard(null);
    resetCursor();
  };

  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight mb-6">
          What We Create
        </h2>
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          We combine bespoke visual mastery, cognitive AI engineering, and resilient architecture
          to create category-defining digital assets.
        </p>
      </div>

      {/* Services Grid (6 Premium Tilt Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {servicesData.map((service, index) => {
          const Icon = iconMap[service.icon] || Globe;
          const pos = mousePos[index] || { x: 0, y: 0 };
          const isHovered = activeCard === index;

          return (
            <div
              key={service.id}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseEnter={() => {
                setActiveCard(index);
                playHover();
                setHoverState('pointer');
              }}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => {
                playClick();
                if (onSelectService) onSelectService(service);
              }}
              className="relative group rounded-3xl p-8 transition-all duration-300 transform-gpu cursor-pointer overflow-hidden border border-white/[0.09] bg-gradient-to-b from-[#0b0f29]/80 to-[#060919]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-cyan-400/40"
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateY(${pos.x * 14}deg) rotateX(${-pos.y * 14}deg) translateY(-8px)`
                  : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)',
                boxShadow: isHovered
                  ? `0 20px 40px -15px ${service.glowColor}, inset 0 1px 1px rgba(255,255,255,0.2)`
                  : '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Dynamic Gradient Glow Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Top Row: Number & Icon */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <span className="font-mono text-2xl font-bold text-slate-500/80 group-hover:text-cyan-400 transition-colors">
                  {service.number}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-cyan-500 group-hover:to-purple-600 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]">
                  <Icon className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="relative z-10 mb-4">
                <h3 className="font-display font-bold text-2xl text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-purple-400/90 font-medium">
                  {service.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="relative z-10 text-slate-300/80 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Tags / Capability Pills */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300 group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom Metric & Action Arrow */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{service.metrics}</span>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-cyan-500 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
