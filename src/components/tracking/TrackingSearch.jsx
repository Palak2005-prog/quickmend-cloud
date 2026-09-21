import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight, AlertCircle, ShieldCheck, Clock, CheckCircle2, Wrench } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { TrackingTimeline } from './TrackingTimeline';

export const TrackingSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getBookingById, lastCreatedBookingId } = useBooking();

  const [repairIdInput, setRepairIdInput] = useState('');
  const [activeRecord, setActiveRecord] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Check URL query parameter ?id=... or last created booking
  useEffect(() => {
    const urlId = searchParams.get('id');
    if (urlId) {
      setRepairIdInput(urlId);
      const record = getBookingById(urlId);
      setActiveRecord(record);
      setHasSearched(true);
    } else if (lastCreatedBookingId) {
      setRepairIdInput(lastCreatedBookingId);
      const record = getBookingById(lastCreatedBookingId);
      setActiveRecord(record);
      setHasSearched(true);
    }
  }, [searchParams, lastCreatedBookingId]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!repairIdInput.trim()) return;

    const clean = repairIdInput.trim().toUpperCase();
    const record = getBookingById(clean);
    setActiveRecord(record);
    setHasSearched(true);
    setSearchParams({ id: clean });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Search Input Box */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0B1730] to-[#040D20] border border-[#00E5FF]/30 p-6 sm:p-8 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_25px_rgba(0,229,255,0.1)]">
        
        <form onSubmit={handleSearch} className="space-y-4">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#00E5FF]">
            Enter Your Repair ID
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <input
                type="text"
                value={repairIdInput}
                onChange={(e) => setRepairIdInput(e.target.value.toUpperCase())}
                placeholder="e.g. QM-2026-XXXX"
                className="w-full pl-4 pr-4 py-3.5 rounded-xl bg-[#061024] text-white placeholder-slate-500 border border-[#00E5FF]/30 focus:border-[#00E5FF] text-base font-mono focus:outline-none focus:ring-1 focus:ring-[#00E5FF] tracking-wider uppercase transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] hover:to-[#38EFFF] text-[#020817] font-extrabold text-sm shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>TRACK REPAIR</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#9FB1C7]">
            Please enter the unique QuickMend Repair ID provided upon booking your service.
          </p>
        </form>

      </div>

      {/* Empty State when no search performed yet */}
      {!hasSearched && (
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1730]/60 border border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#061024] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mx-auto shadow-[0_0_20px_rgba(0,229,255,0.15)]">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Repair ID Entered Yet</h3>
          <p className="text-sm text-[#9FB1C7] max-w-md mx-auto leading-relaxed">
            Enter your QuickMend Repair ID above to inspect your machine's diagnostic status, assigned engineer, and 24-hour delivery dispatch.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00E5FF] hover:underline"
            >
              <span>Need to book a new repair? Click here →</span>
            </Link>
          </div>
        </div>
      )}

      {/* Results / Error State */}
      {hasSearched && !activeRecord && (
        <div className="p-8 rounded-2xl bg-[#0B1730]/70 border border-red-500/30 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Repair ID Not Found</h3>
          <p className="text-sm text-[#9FB1C7] max-w-md mx-auto">
            No active record found for <span className="font-mono text-red-400 font-bold">{repairIdInput}</span> in your current session. Please ensure your Repair ID is correct.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#00E5FF] hover:underline"
            >
              <span>Book a repair request to get a new ID →</span>
            </Link>
          </div>
        </div>
      )}

      {/* Render 8-stage repair timeline if record exists */}
      {activeRecord && (
        <TrackingTimeline record={activeRecord} />
      )}

    </div>
  );
};
