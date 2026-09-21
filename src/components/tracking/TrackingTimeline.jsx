import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  AlertCircle, 
  Wrench, 
  User, 
  MapPin, 
  Truck, 
  Calendar, 
  ShieldCheck,
  Phone,
  MessageSquare
} from 'lucide-react';
import { timelineStages } from '../../data/trackingData';
import { ApplianceIcon } from '../ui/ApplianceIcon';

export const TrackingTimeline = ({ record }) => {
  if (!record) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Active Status Overview Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0B1730] to-[#040E24] border border-[#00E5FF]/40 p-6 sm:p-8 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_25px_rgba(0,229,255,0.12)]">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
                Repair ID:
              </span>
              <span className="text-xl sm:text-2xl font-mono font-black text-white">
                {record.repairId}
              </span>
            </div>
            <p className="text-xs text-[#9FB1C7] mt-1">
              Registered on {record.bookedDate} • {record.city}, {record.state}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold w-fit">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
            <span>CURRENT STATUS: {record.currentStatus}</span>
          </div>
        </div>

        {/* Appliance & Assigned Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-sm">
          
          <div className="p-4 rounded-xl bg-[#061024] border border-slate-800 space-y-1">
            <span className="text-xs text-[#9FB1C7]">Appliance & Brand</span>
            <div className="font-bold text-white flex items-center gap-2">
              <ApplianceIcon name={record.appliance} className="w-4 h-4" color="#00E5FF" />
              <span>{record.brand || record.appliance}</span>
            </div>
            <p className="text-xs text-[#9FB1C7] italic truncate mt-1">"{record.issue}"</p>
          </div>

          <div className="p-4 rounded-xl bg-[#061024] border border-slate-800 space-y-1">
            <span className="text-xs text-[#9FB1C7]">Assigned Station / Center</span>
            <div className="font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00E5FF]" />
              <span className="truncate">{record.serviceCenter || `QuickMend Hub - ${record.city}`}</span>
            </div>
            <p className="text-xs text-[#9FB1C7]">
              {record.assignedTechnician || "Lead Technician Assigned"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#061024] border border-slate-800 space-y-1">
            <span className="text-xs text-[#9FB1C7]">Estimated Completion</span>
            <div className="font-bold text-[#00E5FF] flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{record.estimatedCompletion || "2-4 Business Days"}</span>
            </div>
            <p className="text-xs text-[#9FB1C7]">
              Mode: {record.pickupType || "Doorstep Service"}
            </p>
          </div>

        </div>

      </div>

      {/* 8-Stage Timeline */}
      <div className="rounded-3xl bg-[#0B1730]/90 border border-[#00E5FF]/20 p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,8,23,0.8)]">
        
        <div className="mb-8 pb-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]"></span>
            8-Stage Repair Lifecycle Progress
          </h3>
          <span className="text-xs font-mono text-[#00E5FF]">
            STAGE {record.currentStep} OF 8
          </span>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 sm:before:left-6 before:w-0.5 before:bg-slate-800">
          
          {timelineStages.map((stage) => {
            const isCompleted = stage.step < record.currentStep;
            const isCurrent = stage.step === record.currentStep;
            const isPending = stage.step > record.currentStep;

            // Find if there's a timestamp update for this step
            const stepUpdate = record.updates?.find(u => u.step === stage.step);

            return (
              <div 
                key={stage.step}
                className={`relative flex items-start gap-4 sm:gap-6 pl-2 ${
                  isPending ? 'opacity-40' : 'opacity-100'
                }`}
              >
                {/* Node Icon */}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all ${
                  isCompleted 
                    ? 'bg-[#00E5FF] text-[#020817] shadow-[0_0_12px_rgba(0,229,255,0.6)]' 
                    : isCurrent 
                    ? 'bg-[#0B1730] border-2 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.4)] animate-pulse-subtle' 
                    : 'bg-[#061024] border border-slate-700 text-slate-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span className="text-xs font-mono">{stage.step}</span>
                  )}
                </div>

                {/* Content Box */}
                <div className={`flex-1 p-4 sm:p-5 rounded-2xl border transition-all ${
                  isCurrent 
                    ? 'bg-[#061024] border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.1)]' 
                    : isCompleted 
                    ? 'bg-[#071328]/60 border-slate-800' 
                    : 'bg-[#040A18]/40 border-slate-900'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm sm:text-base font-bold ${
                        isCurrent ? 'text-[#00E5FF]' : isCompleted ? 'text-white' : 'text-slate-400'
                      }`}>
                        Stage {stage.step}: {stage.title}
                      </h4>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00E5FF]/20 text-[#00E5FF]">
                          In Progress
                        </span>
                      )}
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400">
                          Completed
                        </span>
                      )}
                    </div>

                    {stepUpdate && (
                      <span className="text-[11px] font-mono text-[#9FB1C7]">
                        {stepUpdate.date}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#9FB1C7] leading-relaxed">
                    {stage.description}
                  </p>

                  {stepUpdate && stepUpdate.note && (
                    <div className="mt-2 text-xs text-white/90 bg-[#020817] p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                      <span className="text-[#00E5FF] font-bold">•</span>
                      <span>Update: {stepUpdate.note}</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Support help bar */}
      <div className="p-4 rounded-2xl bg-[#061024] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9FB1C7]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
          <span>Need real-time assistance or have questions regarding this repair?</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:9279041718" className="hover:text-[#00E5FF] flex items-center gap-1 font-semibold text-white">
            <Phone className="w-3.5 h-3.5 text-[#00E5FF]" /> 9279041718
          </a>
          <a 
            href={`https://wa.me/919279041718?text=Hello%20QuickMend,%20I%20am%20inquiring%20about%20my%20repair%20ID%20${record.repairId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00E5FF] font-bold hover:underline"
          >
            WhatsApp Support →
          </a>
        </div>
      </div>

    </div>
  );
};
