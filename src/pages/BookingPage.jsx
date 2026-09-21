import React, { useEffect } from 'react';
import { BookingForm } from '../components/booking/BookingForm';
import { ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const BookingPage = () => {
  useEffect(() => {
    document.title = "Book a Repair — QuickMend Appliance Servicing";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#020817] via-[#040D22] to-[#020817]">
      
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-xs font-bold text-[#00E5FF] uppercase tracking-wider">
          Doorstep & Hub Service Available
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          BOOK A <span className="text-[#00E5FF]">REPAIR</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9FB1C7] max-w-xl mx-auto">
          Schedule doorstep inspection or pickup for your home appliances with QuickMend certified technicians.
        </p>
      </div>

      {/* Main Booking Form */}
      <BookingForm />

    </main>
  );
};
