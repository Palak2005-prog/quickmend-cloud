import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, KeyRound, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { AdminDashboard } from '../components/admin/AdminDashboard';

export const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('quickmend_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Admin Portal — QuickMend Dispatch Center";
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (passcode.trim() === 'admin2026' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('quickmend_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid admin passcode. (Default: admin2026)');
    }
  };

  const handleDemoUnlock = () => {
    setPasscode('admin2026');
    setIsAuthenticated(true);
    sessionStorage.setItem('quickmend_admin_auth', 'true');
    setError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('quickmend_admin_auth');
    setPasscode('');
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#020817] via-[#040D20] to-[#020817]">
      <div className="max-w-7xl mx-auto">
        
        {isAuthenticated ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <div className="max-w-md mx-auto py-12">
            <div className="rounded-3xl bg-gradient-to-b from-[#0B1730] to-[#040D20] border border-[#00E5FF]/40 p-8 sm:p-10 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_30px_rgba(0,229,255,0.15)] space-y-6">
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[#061024] border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mx-auto shadow-[0_0_20px_rgba(0,229,255,0.25)]">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                
                <h1 className="text-2xl font-black text-white">
                  QuickMend Admin Portal
                </h1>
                
                <p className="text-xs text-[#9FB1C7]">
                  Internal dispatch system for updating customer repair stages, technicians, and real-time statuses.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#00E5FF] uppercase tracking-wider mb-1.5">
                    Admin Passcode
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter Passcode (admin2026)"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border border-[#00E5FF]/30 focus:border-[#00E5FF] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                  {error && (
                    <p className="text-red-400 text-xs mt-1.5">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] text-[#020817] font-extrabold text-sm shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all flex items-center justify-center gap-2"
                >
                  <span>ACCESS PORTAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-2 border-t border-slate-800 text-center">
                <button
                  onClick={handleDemoUnlock}
                  type="button"
                  className="text-xs font-semibold text-[#00E5FF] hover:underline"
                >
                  ⚡ One-Click Admin Demo Login
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
};
