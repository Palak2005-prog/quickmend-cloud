import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Clock, ShieldCheck, ArrowRight, Zap } from 'lucide-react';

export const DirectContactCards = () => {
  const cards = [
    {
      title: "Direct Helpline",
      value: "9279041718",
      desc: "Call our support desk directly for booking assistance, technician updates, or instant queries.",
      href: "tel:9279041718",
      actionText: "Tap to Call",
      badge: "8 AM - 9 PM",
      icon: Phone,
      highlight: false
    },
    {
      title: "Email Support",
      value: "replypalak525@gmail.com",
      desc: "Send us detailed inquiries, service invoices, corporate repair requirements, or customer feedback.",
      href: "mailto:replypalak525@gmail.com",
      actionText: "Send Email",
      badge: "24/7 Response",
      icon: Mail,
      highlight: false
    },
    {
      title: "Instant Messaging",
      value: "WhatsApp Desk",
      desc: "Chat with our service desk instantly. Share appliance error photos or voice notes for rapid assessment.",
      href: "https://wa.me/919279041718?text=Hello%20QuickMend,%20I%20would%20like%20to%20inquire%20about%20home%20appliance%20repair%20services.",
      actionText: "CHAT WITH US ON WHATSAPP →",
      badge: "Fastest Response",
      icon: MessageSquare,
      highlight: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.a
            key={idx}
            href={card.href}
            target={card.href.startsWith('http') ? '_blank' : undefined}
            rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(2,8,23,0.8)] ${
              card.highlight
                ? 'bg-gradient-to-b from-[#0B1730] via-[#071530] to-[#040D20] border border-[#00E5FF]/40 hover:border-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.15)]'
                : 'bg-gradient-to-b from-[#0B1730]/90 to-[#061024]/90 border border-[#00E5FF]/20 hover:border-[#00E5FF]/60'
            }`}
          >
            {/* Top Cyan Accent Glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-13 h-13 p-3 rounded-2xl bg-[#061024] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)] group-hover:scale-110 group-hover:border-[#00E5FF] transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25">
                  {card.badge}
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-wider uppercase">
                {card.title}
              </span>

              <h3 className={`text-xl sm:text-2xl font-black mt-1 group-hover:text-[#00E5FF] transition-colors break-words ${
                card.highlight ? 'text-[#00E5FF]' : 'text-white'
              }`}>
                {card.value}
              </h3>

              <p className="text-xs sm:text-sm text-[#9FB1C7] mt-3 leading-relaxed">
                {card.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#00E5FF]">
              <span>{card.actionText}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};
