import React, { useEffect } from 'react';
import { TrackingSearch } from '../components/tracking/TrackingSearch';
import { ShieldCheck, Activity } from 'lucide-react';

export const TrackingPage = () => {
  useEffect(() => {
    document.title = "Track Your Repair — QuickMend Real-Time Service Status";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#020817] via-[#040D20] to-[#020817]">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5" />
          <span>Status & Stage Progress</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          TRACK YOUR <span className="text-[#00E5FF]">REPAIR</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9FB1C7] max-w-xl mx-auto">
          Enter your unique QuickMend Repair ID to check real-time technician diagnostics, current repair progress, and delivery schedule.
        </p>
      </div>

      {/* Tracking Search & Timeline */}
      <TrackingSearch />

    </main>
  );
};
