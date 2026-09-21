import React, { useMemo } from 'react';

export default function BackgroundStars() {
  // Generate random static stars for pure CSS atmospheric depth
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      color: i % 4 === 0 ? '#38bdf8' : i % 7 === 0 ? '#c084fc' : i % 11 === 0 ? '#fb923c' : '#ffffff'
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Galactic Dust Gradient */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[700px] h-[700px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Star Field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-pulse-slow"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            boxShadow: star.size > 2 ? `0 0 6px ${star.color}` : 'none'
          }}
        />
      ))}

      {/* Subtle Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
    </div>
  );
}
