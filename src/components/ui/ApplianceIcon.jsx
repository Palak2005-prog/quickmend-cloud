import React from 'react';
import { 
  Tv, 
  Wrench, 
  Flame, 
  Droplets, 
  Fan, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const ApplianceIcon = ({ name, className = "w-6 h-6", color = "#00E5FF" }) => {
  const norm = (name || "").toLowerCase().replace(/[-_ ]/g, "");

  if (norm.includes("refrigerator") || norm.includes("fridge")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="5" y1="10" x2="19" y2="10" />
        <line x1="9" y1="5" x2="9" y2="7" />
        <line x1="9" y1="14" x2="9" y2="17" />
      </svg>
    );
  }

  if (norm.includes("washing") || norm.includes("washer")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="2" width="18" height="20" rx="2" />
        <circle cx="12" cy="13" r="5" />
        <path d="M12 10a3 3 0 0 0-3 3" />
        <line x1="7" y1="5" x2="7.01" y2="5" />
        <line x1="11" y1="5" x2="13" y2="5" />
      </svg>
    );
  }

  if (norm.includes("ac") || norm.includes("aircon") || norm.includes("conditioner")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="9" rx="2" />
        <line x1="7" y1="10" x2="17" y2="10" />
        <line x1="6" y1="18" x2="8" y2="15" />
        <line x1="12" y1="18" x2="12" y2="15" />
        <line x1="18" y1="18" x2="16" y2="15" />
      </svg>
    );
  }

  if (norm.includes("microwave") || norm.includes("oven")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="15" rx="2" />
        <rect x="5" y="7" width="10" height="9" rx="1" />
        <line x1="18" y1="8" x2="18.01" y2="8" />
        <line x1="18" y1="12" x2="18.01" y2="12" />
        <line x1="18" y1="15" x2="18.01" y2="15" />
      </svg>
    );
  }

  if (norm.includes("geyser") || norm.includes("heater")) {
    return <Flame className={className} style={{ color }} />;
  }

  if (norm.includes("purifier") || norm.includes("water") || norm.includes("ro")) {
    return <Droplets className={className} style={{ color }} />;
  }

  if (norm.includes("tv") || norm.includes("television") || norm.includes("display")) {
    return <Tv className={className} style={{ color }} />;
  }

  return <Wrench className={className} style={{ color }} />;
};
