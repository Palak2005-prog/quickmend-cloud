import React, { useEffect } from 'react';
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesGrid } from '../components/services/ServicesGrid';
import { HowItWorksSection } from '../components/services/HowItWorksSection';
import { OtherAppliancesSection } from '../components/services/OtherAppliancesSection';

export const ServicesPage = () => {
  useEffect(() => {
    document.title = "Services & How It Works — QuickMend Appliance Repair";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      {/* 1. Services Hero */}
      <ServicesHero />

      {/* 2. Our Services */}
      <ServicesGrid />

      {/* 3. How It Works (Strictly on Services page only) */}
      <HowItWorksSection />

      {/* 4. Other Appliances (Final content section of Services page) */}
      <OtherAppliancesSection />
    </main>
  );
};
