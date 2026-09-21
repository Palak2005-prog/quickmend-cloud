import React, { useState, useRef } from 'react';
import { Sparkles, Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Globe } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();
  const containerRef = useRef(null);

  const prevSlide = () => {
    playClick();
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    playClick();
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - startX;
    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300 uppercase tracking-widest mb-4">
          <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
          <span>Client Testimonials</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight mb-6">
          What Our Clients Say
        </h2>
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          Hear from global founders, enterprise executives, and luxury brand directors who trusted
          Supernova to transform their digital frontier.
        </p>
      </div>

      {/* Main Draggable Testimonial Showcase */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => {
          setHoverState('drag', 'DRAG');
        }}
        onMouseLeave={() => {
          setIsDragging(false);
          resetCursor();
        }}
        className="relative max-w-4xl mx-auto rounded-3xl glass-panel-glow border border-purple-500/30 p-8 sm:p-14 select-none cursor-grab active:cursor-grabbing transition-all duration-300 shadow-[0_0_60px_rgba(168,85,247,0.2)]"
      >
        <Quote className="absolute top-8 right-8 w-16 h-16 text-white/[0.04] pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Top Row: Category Pill & Star Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                {current.projectCategory}
              </span>
              <span className="text-xs font-mono text-slate-400">
                // {current.projectTitle}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(current.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <p className="font-sans text-xl sm:text-2xl md:text-3xl text-slate-100 leading-snug font-medium italic">
            "{current.quote}"
          </p>

          {/* Bottom Row: Client Bio & Metrics */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400/60 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
              />
              <div>
                <h4 className="font-display font-bold text-lg text-white">
                  {current.name}
                </h4>
                <p className="text-xs font-mono text-cyan-300">
                  {current.designation}
                </p>
                <p className="text-xs text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                  <Globe className="w-3 h-3 text-purple-400" />
                  {current.company}
                </p>
              </div>
            </div>

            {/* Metric pill */}
            <div className="p-3 px-4 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col items-start sm:items-end">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Verified Result</span>
              <span className="font-display font-bold text-sm text-emerald-400">
                {current.metrics}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls & Pagination Dots */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={prevSlide}
          onMouseEnter={() => {
            playHover();
            setHoverState('pointer');
          }}
          onMouseLeave={resetCursor}
          className="w-12 h-12 rounded-full glass-panel border border-white/10 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg hover:scale-105"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                playClick();
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-cyan-400 shadow-[0_0_10px_#38bdf8]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          onMouseEnter={() => {
            playHover();
            setHoverState('pointer');
          }}
          onMouseLeave={resetCursor}
          className="w-12 h-12 rounded-full glass-panel border border-white/10 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg hover:scale-105"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
