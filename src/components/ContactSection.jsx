import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  Building2, 
  User, 
  DollarSign, 
  MessageSquare,
  Clock,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCursor } from '../context/CursorContext';
import { useSound } from '../context/SoundContext';

export default function ContactSection({ prefillData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'AI Application',
    budget: '$10,000–$25,000',
    details: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { setHoverState, resetCursor } = useCursor();
  const { playHover, playClick, playSuccess } = useSound();

  const projectTypes = [
    'Premium Website',
    'AI Application',
    'SaaS Platform',
    'Mobile App',
    'E-commerce Experience',
    'UI/UX Design System'
  ];

  const budgetOptions = [
    '$2,000–$5,000',
    '$5,000–$10,000',
    '$10,000–$25,000',
    '$25,000+'
  ];

  // Apply prefill data from Calculator if triggered
  useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        projectType: prefillData.projectType || prev.projectType,
        details: prefillData.addons
          ? `Estimated Proposal Scope: ${prefillData.projectType}\nEstimated Investment: ${prefillData.estimatedBudget}\nTimeline: ${prefillData.estimatedWeeks} (${prefillData.timeline})\nSelected Capabilities: ${prefillData.addons.join(', ')}\n\nAdditional notes:`
          : prev.details
      }));
    }
  }, [prefillData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);

    // Simulate high-speed transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playSuccess();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#a855f7', '#ec4899', '#f59e0b']
        });
      } catch (err) {}
    }, 1200);
  };

  const copyEmailToClipboard = () => {
    playClick();
    navigator.clipboard.writeText('hello@supernova.agency');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-4">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Mission Launch Inquiries</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-gradient-cosmic tracking-tight mb-6">
          Start Your Project
        </h2>
        <p className="max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          Tell us about your product goals. We review each mission request within 24 hours
          and provide an actionable architecture plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Contact Info & Guarantees (5 Cols) */}
        <div className="lg:col-span-5 space-y-8 glass-panel rounded-3xl p-8 border border-white/10">
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">
              Direct Orbital Line
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Prefer an immediate executive introduction or have an NDA to sign first?
            </p>

            {/* Copyable Email Pill */}
            <div 
              onClick={copyEmailToClipboard}
              onMouseEnter={() => {
                playHover();
                setHoverState('pointer');
              }}
              onMouseLeave={resetCursor}
              className="p-4 rounded-2xl bg-white/[0.04] border border-cyan-500/30 flex items-center justify-between cursor-pointer hover:border-cyan-400 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">AGENCY INBOX</div>
                  <div className="font-mono text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    hello@supernova.agency
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 transition-colors">
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {/* Response SLA */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">24-Hour Telemetry SLA:</strong>
                <p className="text-xs text-slate-400 mt-0.5">Every inquiry receives a tailored technical scoping proposal from a founding architect.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-slate-300">
              <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">Strict Mutual NDA:</strong>
                <p className="text-xs text-slate-400 mt-0.5">Your project details and proprietary IP remain 100% confidential under Swiss/US standard NDA.</p>
              </div>
            </div>
          </div>

          {/* Global Timezones */}
          <div className="pt-6 border-t border-white/10">
            <div className="text-xs font-mono text-slate-400 uppercase mb-3">Active Operative Hubs:</div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-cyan-400">●</span> San Francisco (PST)
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-purple-400">●</span> London (GMT)
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-pink-400">●</span> Zurich (CET)
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-amber-400">●</span> Tokyo (JST)
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass-panel-glow border border-purple-500/30 p-8 sm:p-10 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
            
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-3xl text-white">
                    Mission Transmission Received
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Our founding engineering squad is analyzing your brief. We will reply to <strong className="text-cyan-300">{formData.email}</strong> within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-xs mx-auto text-xs font-mono text-slate-400">
                  TRANSMISSION ID: #SNV-{(Math.random() * 1000000).toFixed(0)}
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-400 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Dr. Elena Rostova"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                      Work Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="elena@company.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.06] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Aether Labs Inc."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                {/* Project Type Tags */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          playClick();
                          setFormData((prev) => ({ ...prev, projectType: type }));
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          formData.projectType === type
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                            : 'bg-white/[0.03] text-slate-400 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Budget Tiers */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Estimated Budget (USD)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          playClick();
                          setFormData((prev) => ({ ...prev, budget: b }));
                        }}
                        className={`py-2 px-2 text-center rounded-lg text-xs font-mono transition-all ${
                          formData.budget === b
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-bold'
                            : 'bg-white/[0.03] text-slate-400 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Project Details & Goals
                  </label>
                  <textarea
                    rows={4}
                    name="details"
                    required
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Tell us about what you want to build, key objectives, timeline constraints..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/[0.06] transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => {
                    playHover();
                    setHoverState('magnetic');
                  }}
                  onMouseLeave={resetCursor}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 font-display font-bold text-base text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:shadow-[0_0_45px_rgba(168,85,247,0.7)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Telemetry...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Launch Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
