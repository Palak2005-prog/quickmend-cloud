import React, { useEffect, useState, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

export default function CustomCursor() {
  const { cursorVariant, cursorText } = useCursor();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const render = () => {
      currentX = lerp(currentX, mouseX, 0.18);
      currentY = lerp(currentY, mouseY, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  // Dynamic styling based on cursor variant
  const getCursorStyles = () => {
    switch (cursorVariant) {
      case 'view':
        return 'w-24 h-24 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/80 text-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.5)]';
      case 'drag':
        return 'w-20 h-20 bg-purple-500/20 backdrop-blur-md border border-purple-400/80 text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.5)]';
      case 'pointer':
        return 'w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]';
      case 'magnetic':
        return 'w-16 h-16 bg-cyan-400/20 border-2 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.6)]';
      default:
        return 'w-8 h-8 bg-white/5 border border-white/20';
    }
  };

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out flex items-center justify-center font-display text-xs font-semibold tracking-wider uppercase select-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isClicking ? 'scale-90' : 'scale-100'} ${getCursorStyles()}`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span className="animate-pulse tracking-widest text-[11px]">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[10000] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] transition-opacity duration-150 ${
          isVisible && cursorVariant === 'default' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
