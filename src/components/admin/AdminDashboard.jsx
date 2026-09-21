import React, { useState } from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Truck, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Trash2, 
  Plus, 
  TrendingUp, 
  Activity, 
  AlertCircle,
  Eye,
  X,
  Zap,
  Save,
  RefreshCw
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { timelineStages } from '../../data/trackingData';
import { ApplianceIcon } from '../ui/ApplianceIcon';

export const AdminDashboard = ({ onLogout }) => {
  const { bookings, updateBookingStatus, deleteBooking, createBooking } = useBooking();
  const bookingsList = Object.values(bookings);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // Edit Form State
  const [editStep, setEditStep] = useState(1);
  const [editTech, setEditTech] = useState('');
  const [editNote, setEditNote] = useState('');

  // Stats calculation
  const totalCount = bookingsList.length;
  const activeCount = bookingsList.filter(b => b.currentStep < 7).length;
  const readyCount = bookingsList.filter(b => b.currentStep === 7).length;
  const deliveredCount = bookingsList.filter(b => b.currentStep === 8).length;

  const filteredBookings = bookingsList.filter((b) => {
    const matchesFilter = selectedFilter === 'ALL' ||
      (selectedFilter === 'ACTIVE' && b.currentStep < 7) ||
      (selectedFilter === 'READY' && b.currentStep === 7) ||
      (selectedFilter === 'DELIVERED' && b.currentStep === 8);

    const query = searchQuery.trim().toLowerCase();
    const matchesQuery = !query ||
      b.repairId.toLowerCase().includes(query) ||
      b.customerName.toLowerCase().includes(query) ||
      b.phone.includes(query) ||
      b.city.toLowerCase().includes(query) ||
      b.appliance.toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });

  const handleStartEdit = (booking) => {
    setEditingBookingId(booking.repairId);
    setEditStep(booking.currentStep);
    setEditTech(booking.assignedTechnician || '');
    setEditNote('');
  };

  const handleSaveEdit = (repairId) => {
    updateBookingStatus(repairId, editStep, editTech, editNote);
    setEditingBookingId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Admin Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0B1730] to-[#040E24] border border-[#00E5FF]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
              QuickMend Operational Dispatch Portal
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            Service Dispatch & Repair Management
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-[#061024] hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/30 text-xs font-bold transition-all"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#0B1730]/90 border border-[#00E5FF]/20 shadow-[0_10px_20px_rgba(2,8,23,0.7)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9FB1C7] font-semibold">Total Requests</span>
            <Activity className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2">{totalCount}</div>
          <span className="text-[10px] text-emerald-400 font-bold mt-1 block">Live Database</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B1730]/90 border border-[#00E5FF]/20 shadow-[0_10px_20px_rgba(2,8,23,0.7)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9FB1C7] font-semibold">Active In-Service</span>
            <Wrench className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">{activeCount}</div>
          <span className="text-[10px] text-[#9FB1C7] mt-1 block">Stages 1 to 6</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B1730]/90 border border-[#00E5FF]/20 shadow-[0_10px_20px_rgba(2,8,23,0.7)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9FB1C7] font-semibold">Ready for Dispatch</span>
            <Truck className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#00E5FF] mt-2">{readyCount}</div>
          <span className="text-[10px] text-[#00E5FF] mt-1 block">Stage 7 Completed</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B1730]/90 border border-[#00E5FF]/20 shadow-[0_10px_20px_rgba(2,8,23,0.7)]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9FB1C7] font-semibold">Delivered in 24h</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">{deliveredCount}</div>
          <span className="text-[10px] text-emerald-400 mt-1 block">100% Verified</span>
        </div>

      </div>

      {/* Control / Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0B1730]/80 border border-[#00E5FF]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, Name, Phone, City..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061024] text-white placeholder-slate-500 border border-[#00E5FF]/20 focus:border-[#00E5FF] text-xs focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'ALL', label: 'All Repairs' },
            { id: 'ACTIVE', label: 'In Progress' },
            { id: 'READY', label: 'Ready for Drop' },
            { id: 'DELIVERED', label: 'Delivered' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedFilter === tab.id
                  ? 'bg-[#00E5FF] text-[#020817] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                  : 'bg-[#061024] text-[#9FB1C7] hover:text-white hover:bg-[#0B1730]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Bookings List Cards */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => {
          const isEditing = editingBookingId === booking.repairId;

          return (
            <div
              key={booking.repairId}
              className={`rounded-2xl border transition-all p-5 sm:p-6 ${
                isEditing 
                  ? 'bg-[#0B1730] border-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.25)]' 
                  : 'bg-[#0B1730]/70 border-[#00E5FF]/15 hover:border-[#00E5FF]/40'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                
                {/* Left ID & Customer info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#061024] border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] flex-shrink-0">
                    <ApplianceIcon name={booking.appliance} className="w-5 h-5" color="#00E5FF" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-mono font-black text-[#00E5FF]">
                        {booking.repairId}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#061024] text-white border border-slate-700 font-semibold">
                        {booking.appliance} ({booking.brand})
                      </span>
                      {booking.photoDataUrl && (
                        <button
                          onClick={() => setSelectedPhoto(booking.photoDataUrl)}
                          className="px-2 py-0.5 rounded bg-[#00E5FF]/20 text-[#00E5FF] text-[10px] font-bold hover:bg-[#00E5FF] hover:text-[#020817] transition-all flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> Photo Attached
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#9FB1C7] mt-1">
                      <span className="text-white font-medium flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#00E5FF]" /> {booking.customerName}
                      </span>
                      <a href={`tel:${booking.phone}`} className="hover:text-[#00E5FF] flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#00E5FF]" /> {booking.phone}
                      </a>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" /> {booking.city}, {booking.state}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Status Badge & Actions */}
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    booking.currentStep === 8
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                      : booking.currentStep === 7
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF]/40 text-[#00E5FF]'
                      : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  }`}>
                    Stage {booking.currentStep}/8: {booking.currentStatus}
                  </span>

                  {!isEditing ? (
                    <button
                      onClick={() => handleStartEdit(booking)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#061024] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#020817] border border-[#00E5FF]/30 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update Stage</span>
                    </button>
                  ) : null}

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete repair ${booking.repairId}?`)) {
                        deleteBooking(booking.repairId);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-[#061024] hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-slate-800 transition-colors"
                    title="Delete Request"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Edit Panel when active */}
              {isEditing ? (
                <div className="mt-4 p-4 rounded-xl bg-[#061024] border border-[#00E5FF]/30 space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* Select Stage */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#00E5FF] uppercase mb-1">
                        Advance Stage (1 to 8)
                      </label>
                      <select
                        value={editStep}
                        onChange={(e) => setEditStep(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg bg-[#020817] text-white border border-[#00E5FF]/30 text-xs focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                      >
                        {timelineStages.map((st) => (
                          <option key={st.step} value={st.step} className="bg-[#020817] text-white">
                            Stage {st.step}: {st.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Assigned Technician */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#00E5FF] uppercase mb-1">
                        Assign Engineer / Specialist
                      </label>
                      <input
                        type="text"
                        value={editTech}
                        onChange={(e) => setEditTech(e.target.value)}
                        placeholder="e.g. Vikram Malhotra (Lead Engineer)"
                        className="w-full px-3 py-2 rounded-lg bg-[#020817] text-white border border-[#00E5FF]/30 text-xs focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                      />
                    </div>

                    {/* Diagnostic Progress Note */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#00E5FF] uppercase mb-1">
                        Progress Note (Visible on Customer Tracking)
                      </label>
                      <input
                        type="text"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        placeholder="e.g. Compressor tested OK, fan replaced"
                        className="w-full px-3 py-2 rounded-lg bg-[#020817] text-white border border-[#00E5FF]/30 text-xs focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                      />
                    </div>

                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setEditingBookingId(null)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#071328] text-slate-300 text-xs font-semibold hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveEdit(booking.repairId)}
                      className="px-4 py-1.5 rounded-lg bg-[#00E5FF] text-[#020817] text-xs font-black shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" /> Save & Broadcast Update
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#9FB1C7]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Reported Problem:</span>
                    <span className="text-white italic truncate block">"{booking.issue}"</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Assigned Engineer:</span>
                    <span className="text-[#00E5FF] font-medium">{booking.assignedTechnician || "Pending Allocation"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Preferred Slot & Mode:</span>
                    <span className="text-white font-medium">{booking.preferredDate} ({booking.pickupType})</span>
                  </div>
                </div>
              )}

            </div>
          );
        })}

        {filteredBookings.length === 0 && (
          <div className="p-8 rounded-2xl bg-[#0B1730]/50 border border-slate-800 text-center text-[#9FB1C7]">
            No repair bookings matched your current filter criteria.
          </div>
        )}
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#071328] border border-[#00E5FF]/40 rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">Customer Attached Photo</h4>
              <button onClick={() => setSelectedPhoto(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={selectedPhoto} alt="Customer appliance attachment" className="w-full h-auto max-h-[60vh] object-contain rounded-2xl border border-slate-800" />
          </div>
        </div>
      )}

    </div>
  );
};
