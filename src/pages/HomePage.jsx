import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MotiveSection } from '../components/home/MotiveSection';
import { WhyQuickMendSection } from '../components/home/WhyQuickMendSection';
import { HomeCTASection } from '../components/home/HomeCTASection';

export const HomePage = () => {
  useEffect(() => {
    document.title = "QuickMend — REPAIR. RESTORE. RELAX. | 24-Hour Home Appliance Repair";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. OUR MOTIVE */}
      <MotiveSection />

      {/* 3. WHY QUICKMEND */}
      <WhyQuickMendSection />

      {/* 4. FINAL CTA */}
      <HomeCTASection />
    </main>
  );
};
