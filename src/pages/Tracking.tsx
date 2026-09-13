import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Wrench, AlertCircle, ArrowRight, RefreshCw, PlusCircle, PackageCheck, User } from 'lucide-react';
import type { TrackingRecord } from '../data/trackingData';
import { DEMO_TRACKING_RECORDS } from '../data/trackingData';
import { getUserBookings, getBookingById } from '../utils/userBookings';
import { TrackingTimeline } from '../components/TrackingTimeline';
import './Tracking.css';

export const Tracking: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get('id') || '';

  const [inputRepairId, setInputRepairId] = useState<string>(queryId);
  const [activeRecord, setActiveRecord] = useState<TrackingRecord | null>(null);
  const [userBookings, setUserBookings] = useState<TrackingRecord[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Load user bookings from localStorage on mount & when URL changes
  useEffect(() => {
    document.title = "Track Your Repair — QuickMend";
    const localBookings = getUserBookings();
    setUserBookings(localBookings);

    if (queryId) {
      const cleanId = queryId.trim().toUpperCase();
      setInputRepairId(cleanId);
      performSearch(cleanId, localBookings);
    } else if (localBookings.length > 0) {
      // Default to user's most recent active booking
      setActiveRecord(localBookings[0]);
      setInputRepairId(localBookings[0].id);
    } else {
      setActiveRecord(null);
      setInputRepairId('');
    }
  }, [queryId]);

  const performSearch = (idToSearch: string, localList: TrackingRecord[] = userBookings) => {
    setErrorMsg('');
    const cleanId = idToSearch.trim().toUpperCase();

    if (!cleanId) {
      setErrorMsg('Please enter a valid Repair ID (e.g. QM-784912)');
      setActiveRecord(null);
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      
      // 1. Check user local bookings first
      const localMatch = localList.find(b => b.id.toUpperCase() === cleanId) || getBookingById(cleanId);
      if (localMatch) {
        setActiveRecord(localMatch);
        setSearchParams({ id: cleanId });
        return;
      }

      // 2. Check demo database records
      if (DEMO_TRACKING_RECORDS[cleanId]) {
        setActiveRecord(DEMO_TRACKING_RECORDS[cleanId]);
        setSearchParams({ id: cleanId });
        return;
      }

      // 3. Dynamic fallback for new custom IDs
      if (cleanId.startsWith('QM-')) {
        const generatedRecord: TrackingRecord = {
          id: cleanId,
          customerName: "Your Account",
          appliance: "Appliance Servicing",
          brand: "QuickMend Verified Unit",
          problem: "Diagnostic and repair request logged.",
          city: "Service Hub India",
          currentStep: 2,
          bookingDate: "Today",
          estimatedCompletion: "Within 24 - 48 Hours",
          technicianName: "Doorstep Specialist Assigned",
          technicianPhone: "9279041718",
          pickupRequired: true,
          statusLogs: [
            { stepNumber: 1, timestamp: "Logged", note: "Booking logged into QuickMend server." },
            { stepNumber: 2, timestamp: "Assigned", note: "Pickup slot scheduled with doorstep technician." }
          ]
        };
        setActiveRecord(generatedRecord);
        setSearchParams({ id: cleanId });
      } else {
        setErrorMsg(`No repair request found matching ID "${cleanId}". Check your ID or view sample test record below.`);
        setActiveRecord(null);
      }
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(inputRepairId);
  };

  const loadSampleRecord = (sampleId: string = 'QM-849201') => {
    setInputRepairId(sampleId);
    performSearch(sampleId);
  };

  return (
    <div className="tracking-page">
      {/* Header Section */}
      <section className="tracking-header-section">
        <div className="container text-center">
          <div className="badge-neon header-badge">
            <PackageCheck size={14} />
            <span>MY REPAIR STATUS TRACKER</span>
          </div>

          <h1 className="tracking-main-heading">
            TRACK YOUR REPAIR
          </h1>

          <p className="tracking-main-desc">
            View your doorstep pickup, technical diagnostic report, replacement progress, and final delivery status live.
          </p>
        </div>
      </section>

      {/* User's Own Bookings Section (If any exist) */}
      {userBookings.length > 0 && (
        <section className="container section-padding-sm">
          <div className="user-bookings-container">
            <div className="user-bookings-title">
              <User size={16} className="title-icon" />
              <span>YOUR BOOKED REPAIRS ({userBookings.length})</span>
            </div>
            <div className="user-bookings-grid">
              {userBookings.map((b) => {
                const isActive = activeRecord?.id === b.id;
                return (
                  <button
                    key={b.id}
                    className={`user-booking-card ${isActive ? 'active' : ''}`}
                    onClick={() => performSearch(b.id)}
                  >
                    <div className="ub-card-top">
                      <span className="ub-id">{b.id}</span>
                      <span className="ub-step">Step {b.currentStep}/8</span>
                    </div>
                    <div className="ub-appliance">{b.appliance} ({b.brand})</div>
                    <div className="ub-meta">{b.city} • {b.bookingDate}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Search Bar Section */}
      <section className="container section-padding-sm">
        <div className="glass-card tracking-search-card">
          <form onSubmit={handleFormSubmit} className="tracking-form-grid">
            <div className="search-input-col">
              <label className="form-label">LOOKUP REPAIR ID</label>
              <div className="input-icon-wrapper">
                <Search className="input-icon" size={18} />
                <input
                  type="text"
                  className="form-input icon-padded uppercase-input"
                  placeholder="Enter your Repair ID (e.g. QM-784912)"
                  value={inputRepairId}
                  onChange={(e) => setInputRepairId(e.target.value)}
                />
              </div>
            </div>

            <div className="search-btn-col">
              <button type="submit" className="btn-primary search-submit-btn" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <RefreshCw size={18} className="spin-icon" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>TRACK REPAIR</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="tracking-error-alert">
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </section>

      {/* Main Repair Timeline / User Empty State */}
      <section className="container section-padding-sm">
        {activeRecord ? (
          <TrackingTimeline record={activeRecord} />
        ) : (
          <div className="glass-card tracking-empty-user">
            <div className="empty-icon-circle">
              <Wrench size={40} className="empty-icon" />
            </div>
            <h3>No Active Repair Request Selected</h3>
            <p>
              {userBookings.length > 0
                ? "Select one of your booked repairs above or type a valid Repair ID in the search box."
                : "You haven't submitted any appliance repair requests in this browser session yet."}
            </p>
            <div className="empty-actions">
              <Link to="/booking" className="btn-primary">
                <PlusCircle size={18} />
                <span>BOOK A REPAIR NOW →</span>
              </Link>
              <button 
                type="button" 
                className="btn-secondary btn-sm"
                onClick={() => loadSampleRecord('QM-849201')}
              >
                <span>Try Sample Test View (QM-849201)</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
