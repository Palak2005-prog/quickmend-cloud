import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, CheckCircle2, Zap, ShieldCheck, Clock, Sparkles, Locate, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { statesAndCities } from '../../data/indiaLocations';
import { detectUserLocation } from '../../utils/geolocation';

export const StoreLocator = () => {
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCity, setSelectedCity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectMsg, setDetectMsg] = useState('');
  const [detectError, setDetectError] = useState('');

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    setDetectMsg('');
    setDetectError('');
    try {
      const res = await detectUserLocation();
      if (res.success) {
        setSelectedState(res.state);
        setSelectedCity(res.city);
        setSearchQuery('');
        setDetectMsg(`Location detected: ${res.city}, ${res.state}`);
        setTimeout(() => setDetectMsg(''), 6000);
      }
    } catch (err) {
      setDetectError(err.message || 'Unable to auto-detect location.');
      setTimeout(() => setDetectError(''), 6000);
    } finally {
      setIsDetecting(false);
    }
  };

  // Dynamic cities list for city dropdown
  const availableCities = useMemo(() => {
    if (selectedState === 'ALL') {
      const allUnique = Array.from(new Set(statesAndCities.flatMap(s => s.cities))).sort();
      return allUnique;
    }
    const found = statesAndCities.find(s => s.state === selectedState);
    return found ? found.cities : [];
  }, [selectedState]);

  const handleStateChange = (val) => {
    setSelectedState(val);
    setSelectedCity('ALL');
  };

  // Find if search query or selected filters match a specific location
  const activeLocationInfo = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      for (const item of statesAndCities) {
        if (item.state.toLowerCase().includes(query)) {
          return { state: item.state, city: item.cities[0] || 'All Major Zones', totalInState: item.cities.length };
        }
        const matchedCity = item.cities.find(c => c.toLowerCase().includes(query));
        if (matchedCity) {
          return { state: item.state, city: matchedCity, totalInState: item.cities.length };
        }
      }
    }

    if (selectedState !== 'ALL' || selectedCity !== 'ALL') {
      const stateObj = statesAndCities.find(s => s.state === selectedState) || statesAndCities[0];
      return {
        state: selectedState !== 'ALL' ? selectedState : 'All States',
        city: selectedCity !== 'ALL' ? selectedCity : (selectedState !== 'ALL' ? `All ${stateObj.cities.length} Cities in ${stateObj.state}` : 'All Major Cities'),
        totalInState: stateObj ? stateObj.cities.length : 0
      };
    }

    return null;
  }, [selectedState, selectedCity, searchQuery]);

  return (
    <div id="stores" className="space-y-8 scroll-mt-24">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF] uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping"></span>
          <span>India-Wide Coverage Checker</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          CHECK SERVICE AVAILABILITY <span className="text-[#00E5FF]">IN YOUR CITY</span>
        </h2>

        <p className="text-sm sm:text-base text-[#9FB1C7] leading-relaxed">
          Select your state and city below to verify QuickMend doorstep pickup, diagnostics, and 24-hour return service in your area.
        </p>
      </motion.div>

      {/* Filter and Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0B1730] to-[#040D20] border border-[#00E5FF]/30 shadow-[0_15px_40px_rgba(2,8,23,0.9),0_0_20px_rgba(0,229,255,0.1)] space-y-4"
      >
        {/* Auto Detect Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Filter Location or Auto-Detect GPS
          </span>

          <button
            type="button"
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] disabled:opacity-60 cursor-pointer"
          >
            {isDetecting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin"></div>
                <span>Detecting Location GPS...</span>
              </>
            ) : (
              <>
                <Locate className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
                <span>Auto-Detect My Location</span>
              </>
            )}
          </button>
        </div>

        {detectMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{detectMsg}</span>
          </div>
        )}

        {detectError && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
            <span>{detectError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          {/* Select State */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select State / Union Territory
            </label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#061024] text-white border border-[#00E5FF]/20 focus:border-[#00E5FF] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all cursor-pointer"
            >
              <option value="ALL" className="bg-[#020817]">All States & UTs ({statesAndCities.length})</option>
              {statesAndCities.map((item, idx) => (
                <option key={idx} value={item.state} className="bg-[#020817] text-white">
                  {item.state}
                </option>
              ))}
            </select>
          </div>

          {/* Select City */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Select City / District
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#061024] text-white border border-[#00E5FF]/20 focus:border-[#00E5FF] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all cursor-pointer"
            >
              <option value="ALL" className="bg-[#020817]">All Cities ({availableCities.length})</option>
              {availableCities.map((city, idx) => (
                <option key={idx} value={city} className="bg-[#020817] text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Search City Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type e.g. Bengaluru, Mumbai, Patna..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border border-[#00E5FF]/20 focus:border-[#00E5FF] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all"
              />
              <Search className="w-4 h-4 text-[#00E5FF] absolute left-3.5 top-3.5" />
            </div>
          </div>

        </div>

        {/* Selected Location Status / Nationwide Guarantee Card */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <AnimatePresence mode="wait">
            {activeLocationInfo ? (
              <motion.div
                key={activeLocationInfo.city + activeLocationInfo.state}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-gradient-to-r from-[#061024] via-[#0B1730] to-[#061024] border border-[#00E5FF]/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,229,255,0.15)]"
              >
                <div className="space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Service Active
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold flex items-center gap-1.5">
                      <Zap className="w-3 h-3 fill-[#00E5FF]" /> Delivery Within 24 Hours
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Doorstep Service Available in <span className="text-[#00E5FF]">{activeLocationInfo.city}</span>
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#9FB1C7]">
                    Region: <strong className="text-white">{activeLocationInfo.state}</strong> • Certified multi-brand technicians ready for scheduled pickup and doorstep repair.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
                  <Link
                    to={`/booking?city=${encodeURIComponent(activeLocationInfo.city !== 'All Major Cities' ? activeLocationInfo.city : '')}&state=${encodeURIComponent(activeLocationInfo.state !== 'All States' ? activeLocationInfo.state : '')}`}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] text-[#020817] font-black text-xs shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>BOOK REPAIR NOW</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {(selectedState !== 'ALL' || selectedCity !== 'ALL' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedState('ALL');
                        setSelectedCity('ALL');
                        setSearchQuery('');
                      }}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-[#061024] hover:bg-[#102244] border border-slate-700 text-xs font-semibold text-[#9FB1C7] hover:text-white transition-all"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="nationwide-default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl bg-[#061024]/80 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white flex items-center justify-center md:justify-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                    <span>Nationwide Coverage Active Across All Indian States & Union Territories</span>
                  </div>
                  <p className="text-xs text-[#9FB1C7]">
                    Select any state or city from the dropdowns above to arrange express doorstep collection and repair within 24 hours.
                  </p>
                </div>

                <Link
                  to="/booking"
                  className="px-6 py-2.5 rounded-xl bg-[#00E5FF]/15 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#020817] border border-[#00E5FF]/40 text-xs font-bold transition-all flex-shrink-0"
                >
                  Book Doorstep Service →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>

    </div>
  );
};
