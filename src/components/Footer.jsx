import React, { useState } from 'react';
import { ArrowUp, Sparkles, Send, Github, Linkedin, Dribbble, Globe } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export default function Footer({ onOpenContact }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick, playSuccess } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    playSuccess();
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const footerLinks = {
    Missions: [
      { name: 'AI Applications', href: '#work' },
      { name: 'SaaS Platforms', href: '#work' },
      { name: 'Fintech Terminals', href: '#work' },
      { name: 'Spatial UI / WebGL', href: '#work' },
      { name: 'Haute Flagships', href: '#work' }
    ],
    Capabilities: [
      { name: '3D WebGL Shaders', href: '#services' },
      { name: 'Autonomous LLM Agents', href: '#services' },
      { name: 'Design Systems', href: '#services' },
      { name: 'Mobile Engineering', href: '#services' },
      { name: 'Cost Valuation', href: '#calculator' }
    ],
    Agency: [
      { name: 'About Supernova', href: '#about' },
      { name: 'Orbital Methodology', href: '#process' },
      { name: 'Case Studies', href: '#case-study' },
      { name: 'Client Testimonials', href: '#testimonials' },
      { name: 'Careers (Founding Staff)', href: '#contact' }
    ]
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#02040a] pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-t from-purple-900/15 via-cyan-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top Tier: Logo, Manifesto & Radar Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Manifesto (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a
              href="#"
              className="flex items-center gap-3 group inline-block"
              onMouseEnter={() => {
                playHover();
                setHoverState('magnetic');
              }}
              onMouseLeave={resetCursor}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#060919] rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-wider text-white">
                SUPERNOVA<span className="text-cyan-400">.</span>
              </span>
            </a>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-normal">
              Supernova is an elite digital product agency crafting cinematic websites, autonomous AI platforms, and high-performance software for ambitious global brands.
            </p>

            {/* Standout Signature Line */}
            <div className="pt-2">
              <span className="font-display font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Designed to go beyond ordinary.
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Globe, href: 'https://twitter.com', label: 'X / Global' },
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: Dribbble, href: 'https://dribbble.com', label: 'Dribbble' },
              ].map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => {
                      playHover();
                      setHoverState('pointer');
                    }}
                    onMouseLeave={resetCursor}
                    className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    aria-label={soc.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns (4 Cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
                Missions
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.Missions.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="text-xs text-slate-400 hover:text-cyan-300 transition-colors"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
                Expertise
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.Capabilities.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="text-xs text-slate-400 hover:text-purple-300 transition-colors"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">
                Agency
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.Agency.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="text-xs text-slate-400 hover:text-pink-300 transition-colors"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Radar (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-300">
              Cosmic Telemetry Dispatch
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Receive quarterly architectural teardowns, WebGL experiments, and AI release notes.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="founder@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  onMouseEnter={() => {
                    playHover();
                    setHoverState('pointer');
                  }}
                  onMouseLeave={resetCursor}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center transition-colors"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-mono text-emerald-400 animate-fadeIn">
                  ✓ Dispatch frequency established!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Supernova Digital Agency Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms of Mission
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Security SLA
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => {
              playHover();
              setHoverState('pointer');
            }}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>Return to Orbit</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
