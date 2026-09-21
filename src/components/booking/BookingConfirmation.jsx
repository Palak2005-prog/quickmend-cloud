import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Copy, 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  RefreshCw,
  Phone
} from 'lucide-react';
import { ApplianceIcon } from '../ui/ApplianceIcon';

export const BookingConfirmation = ({ booking, onReset }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(booking.repairId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="rounded-3xl bg-gradient-to-b from-[#0B1730] to-[#040D20] border border-[#00E5FF]/40 p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_30px_rgba(0,229,255,0.15)] space-y-8">
        
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mx-auto shadow-[0_0_20px_rgba(0,229,255,0.3)] animate-pulse-subtle">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Repair Request Registered!
          </h2>

          <p className="text-sm sm:text-base text-[#9FB1C7] max-w-lg mx-auto">
            Your booking has been received and queued for dispatch. Save your unique Repair ID below to monitor progress.
          </p>
        </div>

        {/* Repair ID Display Box */}
        <div className="p-5 rounded-2xl bg-[#020817] border border-[#00E5FF]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-[#9FB1C7] font-semibold">
              Unique Repair / Request ID
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#00E5FF] tracking-wider mt-0.5">
              {booking.repairId}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2.5 rounded-xl bg-[#0B1730] hover:bg-[#102244] border border-[#00E5FF]/30 text-xs font-bold text-white flex items-center gap-2 transition-all"
            >
              <Copy className="w-4 h-4 text-[#00E5FF]" />
              <span>{copied ? "Copied!" : "Copy ID"}</span>
            </button>

            <Link
              to={`/tracking?id=${booking.repairId}`}
              className="px-5 py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#38EFFF] text-[#020817] text-xs font-black flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
            >
              <span>Track Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Request Summary Card */}
        <div className="rounded-2xl bg-[#071328] border border-slate-800 p-6 space-y-4 text-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF]"></span>
            Booking Summary Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-[#9FB1C7]">Customer Name</span>
              <p className="font-semibold text-white">{booking.customerName}</p>
            </div>

            <div>
              <span className="text-xs text-[#9FB1C7]">Contact Phone</span>
              <p className="font-semibold text-white">{booking.phone}</p>
            </div>

            <div>
              <span className="text-xs text-[#9FB1C7]">Appliance & Brand</span>
              <p className="font-semibold text-[#00E5FF] flex items-center gap-2">
                <ApplianceIcon name={booking.appliance} className="w-4 h-4" color="#00E5FF" />
                <span>{booking.appliance} ({booking.brand})</span>
              </p>
            </div>

            <div>
              <span className="text-xs text-[#9FB1C7]">Service Location</span>
              <p className="font-semibold text-white">{booking.city}, {booking.state}</p>
            </div>

            <div className="sm:col-span-2">
              <span className="text-xs text-[#9FB1C7]">Address Details</span>
              <p className="text-white/90 text-xs mt-0.5">{booking.address}</p>
            </div>

            <div>
              <span className="text-xs text-[#9FB1C7]">Preferred Slot</span>
              <p className="text-white font-medium text-xs flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" /> {booking.preferredDate} • {booking.preferredTime}
              </p>
            </div>

            <div>
              <span className="text-xs text-[#9FB1C7]">Pickup Logistics</span>
              <p className="text-white font-medium text-xs flex items-center gap-1.5 mt-0.5">
                <Truck className="w-3.5 h-3.5 text-[#00E5FF]" /> {booking.pickupRequired ? "Doorstep Pickup Requested" : "Self-Drop at Hub"}
              </p>
            </div>

            <div className="sm:col-span-2 bg-[#020817] p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-[#9FB1C7]">Reported Issue:</span>
              <p className="text-white/90 text-xs mt-1 italic">"{booking.issue}"</p>
            </div>
          </div>
        </div>

        {/* Backend Note Notice */}
        <div className="p-4 rounded-xl bg-[#061024] border border-[#00E5FF]/20 text-xs text-[#9FB1C7] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Client Session Notice:</span>
            <p className="mt-0.5 text-[11px] leading-relaxed">
              This booking is saved to your local browser environment and immediately queryable in the <strong>Track Repair</strong> section. The architecture is built ready to integrate with real production REST/GraphQL database endpoints.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to={`/tracking?id=${booking.repairId}`}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] text-[#020817] font-extrabold text-sm shadow-[0_0_20px_rgba(0,229,255,0.35)] flex items-center justify-center gap-2"
          >
            <span>PROCEED TO TRACK REPAIR</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#071328] hover:bg-[#0B1730] text-[#9FB1C7] hover:text-white font-semibold text-sm border border-slate-800 flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Book Another Repair</span>
          </button>
        </div>

      </div>
    </div>
  );
};
