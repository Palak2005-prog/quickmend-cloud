import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Activity, 
  Layers, 
  ShieldCheck,
  Cpu,
  BarChart3
} from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export default function FeaturedCaseStudy({ onOpenContact }) {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [counterValues, setCounterValues] = useState({
    conversions: 1.0,
    engagement: 0,
    loadTime: 5.4,
    dropOff: 0
  });
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick } = useSound();

  // Animated counter simulator on mount
  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const stepTime = 30;
    const steps = duration / stepTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = Math.min(stepCount / steps, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounterValues({
        conversions: (1.0 + 2.2 * ease).toFixed(1),
        engagement: Math.round(48 * ease),
        loadTime: (5.4 - 3.3 * ease).toFixed(1),
        dropOff: Math.round(60 * ease)
      });

      if (progress >= 1) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="case-study" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Spotlight Case Study</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight mb-6">
          Aether AI: From Obscurity to Series A
        </h2>
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          How Supernova completely transformed an ultra-complex multi-agent cognitive architecture into
          a frictionless, high-converting digital powerhouse.
        </p>
      </div>

      {/* Main Glassmorphism Case Container */}
      <div className="rounded-3xl glass-panel-glow border border-purple-500/30 overflow-hidden p-6 sm:p-10 lg:p-12 shadow-[0_0_60px_rgba(139,92,246,0.2)]">
        
        {/* Animated Statistics Metric Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {/* Stat 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-cyan-500/30 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Conversions</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {counterValues.conversions}x
            </div>
            <p className="text-xs font-mono text-cyan-300 mt-2 font-medium">
              Increase in conversions
            </p>
          </div>

          {/* Stat 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-purple-500/30 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Engagement</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              +{counterValues.engagement}%
            </div>
            <p className="text-xs font-mono text-purple-300 mt-2 font-medium">
              Improvement in engagement
            </p>
          </div>

          {/* Stat 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-emerald-500/30 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Load Speed</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {counterValues.loadTime}s
            </div>
            <p className="text-xs font-mono text-emerald-300 mt-2 font-medium">
              Sub-2.1s world-class load time
            </p>
          </div>

          {/* Stat 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-pink-500/30 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">User Retention</span>
              <ShieldCheck className="w-4 h-4 text-pink-400" />
            </div>
            <div className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              -{counterValues.dropOff}%
            </div>
            <p className="text-xs font-mono text-pink-300 mt-2 font-medium">
              Reduction in user drop-off
            </p>
          </div>
        </div>

        {/* Interactive Dashboard Mockup & Telemetry Studio */}
        <div className="rounded-2xl border border-white/10 bg-[#060817] p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
          {/* Top Mockup Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-slate-400 pl-2">
                aether.ai/app/neural-orchestration-v3
              </span>
            </div>

            {/* Interactive Mockup Tabs */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
              {['telemetry', 'neural-nodes', 'security'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    playClick();
                    setActiveTab(tab);
                  }}
                  className={`px-3 py-1 rounded-lg transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Tab 1: Live Telemetry Visualizer */}
          {activeTab === 'telemetry' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[11px] font-mono text-slate-400">GLOBAL AGENT LATENCY</div>
                  <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">42.4 ms</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="w-4/5 bg-cyan-400 h-full rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[11px] font-mono text-slate-400">ACTIVE WORKSPACE INSTANCES</div>
                  <div className="text-2xl font-mono font-bold text-purple-400 mt-1">142,890</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="w-11/12 bg-purple-400 h-full rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[11px] font-mono text-slate-400">TOKEN ACCURACY RATE</div>
                  <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">99.98%</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="w-full bg-emerald-400 h-full rounded-full" />
                  </div>
                </div>
              </div>

              {/* Simulated Waveform / Chart */}
              <div className="h-44 w-full bg-gradient-to-r from-cyan-950/20 via-purple-950/30 to-blue-950/20 rounded-xl border border-white/5 p-4 flex items-end justify-between gap-1">
                {[45, 60, 55, 75, 80, 70, 90, 85, 95, 92, 98, 100, 88, 94, 99, 92, 96, 99].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:brightness-125"
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Neural Nodes View */}
          {activeTab === 'neural-nodes' && (
            <div className="h-60 w-full flex items-center justify-around relative">
              <div className="p-4 rounded-xl glass-panel border border-cyan-400/40 text-center animate-pulse">
                <Cpu className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                <div className="text-xs font-mono font-bold text-white">LLM Orchestrator</div>
                <div className="text-[10px] text-cyan-300 font-mono">Core Claude & GPT-4o</div>
              </div>

              <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse" />

              <div className="p-4 rounded-xl glass-panel border border-purple-400/40 text-center">
                <Layers className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <div className="text-xs font-mono font-bold text-white">Vector Memory</div>
                <div className="text-[10px] text-purple-300 font-mono">Pinecone / Qdrant</div>
              </div>

              <div className="h-0.5 w-20 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />

              <div className="p-4 rounded-xl glass-panel border border-pink-400/40 text-center">
                <BarChart3 className="w-6 h-6 text-pink-400 mx-auto mb-1" />
                <div className="text-xs font-mono font-bold text-white">Action HUD</div>
                <div className="text-[10px] text-pink-300 font-mono">Live Execution Studio</div>
              </div>
            </div>
          )}

          {/* Tab 3: Security & Compliance View */}
          {activeTab === 'security' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">SOC-2 Type II Certified</div>
                  <div className="text-[10px] font-mono text-slate-400">Enterprise Grade Encryption</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                <div>
                  <div className="text-xs font-bold text-white">GDPR & HIPAA Compliant</div>
                  <div className="text-[10px] font-mono text-slate-400">Zero Data Retention</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <div>
                  <div className="text-xs font-bold text-white">99.99% Guaranteed SLA</div>
                  <div className="text-[10px] font-mono text-slate-400">Multi-region Edge CDN</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Narrative Grid: Challenge, Solution, Services, Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/10">
          <div>
            <h4 className="font-display font-bold text-base text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              1. The Challenge
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Aether possessed ground-breaking autonomous agent technology, but their early interface was clunky, dense, and caused 65% of potential enterprise trials to churn during initial workflow setup.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-base text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              2. Supernova’s Solution
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              We completely reimagined their product architecture into an intuitive canvas HUD with real-time node linking, tactile haptic feedback, and GPU-accelerated canvas shaders that turned workflows into visual art.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-base text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              3. Services Provided
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {['AI UI/UX Design', '3D WebGL Studio', 'Design Tokens', 'Next.js App', 'Enterprise Scalability'].map((s, i) => (
                <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-300">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-base text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              4. Final Outcome
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Aether closed an oversubscribed $18.4M Series A led by top Tier-1 venture funds within 3 weeks of the redesigned launch and onboarded 140,000+ active enterprise agents.
            </p>
          </div>
        </div>

        {/* CTA Banner inside case study */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center font-bold text-white">
              E
            </div>
            <div>
              <div className="text-sm font-bold text-white">Dr. Elena Rostova</div>
              <div className="text-xs font-mono text-slate-400">CEO & Co-Founder, Aether Autonomous Labs</div>
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
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
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-display font-semibold text-sm text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2 hover:scale-105 transition-all"
          >
            <span>Request Aether Architecture Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
