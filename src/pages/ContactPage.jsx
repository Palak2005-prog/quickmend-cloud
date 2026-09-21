import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DirectContactCards } from '../components/contact/DirectContactCards';
import { StoreLocator } from '../components/contact/StoreLocator';
import { ContactForm } from '../components/contact/ContactForm';
import { PhoneCall } from 'lucide-react';

export const ContactPage = () => {
  useEffect(() => {
    document.title = "Contact QuickMend & India-Wide Service Centers";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#020817] via-[#040D20] to-[#020817]">
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center space-y-3 mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF] uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Support & Service Centers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          CONTACT <span className="text-[#00E5FF]">QUICKMEND</span>
        </h1>

        <p className="text-base sm:text-lg text-[#9FB1C7] max-w-xl mx-auto leading-relaxed">
          Get in touch with our national customer support desk, connect on WhatsApp, or explore certified service coverage in your city.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* 1. Direct Contact Cards (Phone, Email, WhatsApp) */}
        <DirectContactCards />

        {/* 2. Store Locator (All India) */}
        <StoreLocator />

        {/* 3. Contact Form */}
        <ContactForm />
      </div>

    </main>
  );
};
