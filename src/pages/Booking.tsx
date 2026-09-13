import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Wrench, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User, 
  Truck, 
  Copy, 
  Check, 
  Search, 
  ShieldAlert,
  Navigation,
  RefreshCw
} from 'lucide-react';
import { ALL_INDIA_STATES, INDIA_STATES_AND_CITIES } from '../data/indiaData';
import type { TrackingRecord } from '../data/trackingData';
import { saveUserBooking } from '../utils/userBookings';
import './Booking.css';

interface BookingFormData {
  fullName: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  address: string;
  appliance: string;
  brand: string;
  problem: string;
  preferredDate: string;
  preferredTime: string;
  pickupRequired: boolean;
}

const APPLIANCE_OPTIONS = [
  "Refrigerator",
  "Washing Machine",
  "AC",
  "Microwave",
  "Geyser",
  "Water Purifier",
  "TV",
  "Other"
];

const TIME_SLOTS = [
  "09:00 AM - 12:00 PM (Morning)",
  "12:00 PM - 03:00 PM (Afternoon)",
  "03:00 PM - 06:00 PM (Late Afternoon)",
  "06:00 PM - 09:00 PM (Evening)"
];

export const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service');

  const getInitialAppliance = (serviceParam: string | null) => {
    switch (serviceParam) {
      case 'refrigerator': return 'Refrigerator';
      case 'washing-machine': return 'Washing Machine';
      case 'ac-repair': return 'AC';
      case 'microwave': return 'Microwave';
      case 'geyser': return 'Geyser';
      case 'water-purifier': return 'Water Purifier';
      case 'tv-repair': return 'TV';
      default: return 'Refrigerator';
    }
  };

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    mobile: '',
    email: '',
    state: 'Delhi (NCT)',
    city: 'New Delhi',
    address: '',
    appliance: getInitialAppliance(preselectedService),
    brand: '',
    problem: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    preferredTime: TIME_SLOTS[0],
    pickupRequired: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<{ id: string; data: BookingFormData } | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationMsg, setLocationMsg] = useState<string>('');
  const [isCustomCityInput, setIsCustomCityInput] = useState<boolean>(false);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationMsg('Detecting your present location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          if (response.ok) {
            const data = await response.json();
            const addr = data.address || {};
            const detectedCity = addr.city || addr.town || addr.village || addr.suburb || addr.county || '';
            const rawState = addr.state || '';
            const fullAddr = data.display_name || `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;

            // Match state against ALL_INDIA_STATES
            const matchedState = ALL_INDIA_STATES.find(s => 
              s.toLowerCase() === rawState.toLowerCase() || 
              rawState.toLowerCase().includes(s.toLowerCase()) ||
              s.toLowerCase().includes(rawState.toLowerCase())
            ) || rawState;

            setFormData(prev => ({
              ...prev,
              state: ALL_INDIA_STATES.includes(matchedState) ? matchedState : prev.state,
              city: detectedCity || prev.city,
              address: fullAddr
            }));
            setLocationMsg('✓ Present location detected and filled successfully!');
          } else {
            setFormData(prev => ({
              ...prev,
              address: `Location (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`
            }));
            setLocationMsg(`✓ Present location captured (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          }
        } catch {
          setFormData(prev => ({
            ...prev,
            address: `Location (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`
          }));
          setLocationMsg(`✓ Present location captured (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationMsg('Location permission denied. Please type your address manually.');
        } else {
          setLocationMsg('Unable to retrieve location. Please type your address manually.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    document.title = "Book a Repair — QuickMend";
    if (preselectedService) {
      setFormData(prev => ({ ...prev, appliance: getInitialAppliance(preselectedService) }));
    }
  }, [preselectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    // Validate Indian mobile number (10 digits)
    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (cleanMobile.length < 10) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Full address is required';
    if (!formData.brand.trim()) newErrors.brand = 'Appliance brand/model is required';
    if (!formData.problem.trim() || formData.problem.trim().length < 10) {
      newErrors.problem = 'Describe the problem in at least 10 characters';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Select a preferred date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate unique Repair ID e.g. QM-784912
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const generatedId = `QM-${randomCode}`;

    const formattedDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newTrackingRecord: TrackingRecord = {
      id: generatedId,
      customerName: formData.fullName,
      appliance: formData.appliance,
      brand: formData.brand,
      problem: formData.problem,
      city: formData.city,
      currentStep: 1, // Step 1: Booking Received
      bookingDate: `${formattedDate} (${formData.preferredTime.split(' ')[0]})`,
      estimatedCompletion: `Target: ${formData.preferredDate}`,
      technicianName: "Specialist Being Assigned",
      technicianPhone: "9279041718",
      pickupRequired: formData.pickupRequired,
      statusLogs: [
        {
          stepNumber: 1,
          timestamp: "Just Now",
          note: `Booking logged for ${formData.appliance} (${formData.brand}) in ${formData.city}. Technician slot scheduled.`
        }
      ]
    };

    saveUserBooking(newTrackingRecord);

    setSubmittedBooking({
      id: generatedId,
      data: { ...formData }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyId = () => {
    if (!submittedBooking) return;
    navigator.clipboard.writeText(submittedBooking.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 3000);
  };

  return (
    <div className="booking-page">
      <section className="booking-header-section">
        <div className="container text-center">
          <div className="badge-neon header-badge">
            <Wrench size={14} />
            <span>DOORSTEP SERVICE & PICKUP</span>
          </div>

          <h1 className="booking-main-heading">
            BOOK A REPAIR
          </h1>

          <p className="booking-main-desc">
            Schedule a certified QuickMend technician visit or doorstep pickup. Fill in your details below for instant confirmation.
          </p>
        </div>
      </section>

      <section className="container section-padding-sm">
        {submittedBooking ? (
          /* Confirmation Screen */
          <div className="glass-card confirmation-card">
            <div className="confirmation-header">
              <div className="success-icon-box">
                <CheckCircle2 size={42} className="success-icon" />
              </div>
              <h2 className="confirmation-title">Repair Request Submitted!</h2>
              <p className="confirmation-sub">
                Your repair booking has been successfully generated. Keep your unique Repair ID for tracking.
              </p>
            </div>

            {/* Generated Repair ID Display */}
            <div className="repair-id-box">
              <span className="id-label">YOUR REPAIR ID</span>
              <div className="id-value-row">
                <span className="id-number">{submittedBooking.id}</span>
                <button className="btn-secondary btn-copy" onClick={handleCopyId}>
                  {copiedId ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
                </button>
              </div>
            </div>

            {/* Booking Details Summary */}
            <div className="booking-summary-grid">
              <div className="summary-col">
                <h4 className="summary-heading"><User size={16} /> Customer Information</h4>
                <div className="summary-row">
                  <span>Name:</span> <strong>{submittedBooking.data.fullName}</strong>
                </div>
                <div className="summary-row">
                  <span>Mobile:</span> <strong>{submittedBooking.data.mobile}</strong>
                </div>
                <div className="summary-row">
                  <span>Email:</span> <strong>{submittedBooking.data.email}</strong>
                </div>
                <div className="summary-row">
                  <span>Location:</span> <strong>{submittedBooking.data.city}, {submittedBooking.data.state}</strong>
                </div>
                <div className="summary-row">
                  <span>Address:</span> <strong>{submittedBooking.data.address}</strong>
                </div>
              </div>

              <div className="summary-col">
                <h4 className="summary-heading"><Wrench size={16} /> Appliance & Request Details</h4>
                <div className="summary-row">
                  <span>Appliance:</span> <strong>{submittedBooking.data.appliance}</strong>
                </div>
                <div className="summary-row">
                  <span>Brand / Model:</span> <strong>{submittedBooking.data.brand}</strong>
                </div>
                <div className="summary-row">
                  <span>Issue:</span> <strong>"{submittedBooking.data.problem}"</strong>
                </div>
                <div className="summary-row">
                  <span>Slot:</span> <strong>{submittedBooking.data.preferredDate} ({submittedBooking.data.preferredTime})</strong>
                </div>
                <div className="summary-row">
                  <span>Pickup Required:</span> <strong>{submittedBooking.data.pickupRequired ? 'Yes (Doorstep Pickup)' : 'No (Home Visit)'}</strong>
                </div>
              </div>
            </div>

            {/* Explicit Notice regarding Future Backend Integration */}
            <div className="backend-notice-banner">
              <ShieldAlert size={18} className="notice-icon" />
              <div>
                <strong>Architecture Notice:</strong> Request <code>{submittedBooking.id}</code> is generated in client-side state. The system structure is completely prepared to connect with production PostgreSQL/Node.js backend APIs.
              </div>
            </div>

            <div className="confirmation-actions">
              <Link to={`/tracking?id=${submittedBooking.id}`} className="btn-primary">
                <Search size={18} />
                <span>TRACK THIS REPAIR NOW →</span>
              </Link>
              <button 
                className="btn-secondary" 
                onClick={() => setSubmittedBooking(null)}
              >
                Book Another Appliance
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="glass-card booking-form-card">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-section-title">
                <User size={18} className="title-icon" />
                <span>1. Personal & Contact Details</span>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-input"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && <span className="form-error">{errors.mobile}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-section-header margin-top-lg">
                <div className="form-section-title">
                  <MapPin size={18} className="title-icon" />
                  <span>2. Address & Location</span>
                </div>
                <button
                  type="button"
                  className="btn-secondary btn-sm btn-use-location"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                >
                  {isLocating ? <RefreshCw size={14} className="spin-icon" /> : <Navigation size={14} />}
                  <span>{isLocating ? 'Detecting Present Location...' : 'Use Present Location'}</span>
                </button>
              </div>

              {locationMsg && (
                <div className={`location-status-badge ${locationMsg.startsWith('✓') ? 'success' : 'info'}`}>
                  <span>{locationMsg}</span>
                </div>
              )}

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">State / Union Territory *</label>
                  <select
                    name="state"
                    className="form-select"
                    value={formData.state}
                    onChange={(e) => {
                      const newSt = e.target.value;
                      const cities = INDIA_STATES_AND_CITIES[newSt] || [];
                      setFormData(prev => ({
                        ...prev,
                        state: newSt,
                        city: cities[0] || ''
                      }));
                      setIsCustomCityInput(false);
                      if (errors.state) setErrors(prev => ({ ...prev, state: '' }));
                    }}
                  >
                    {ALL_INDIA_STATES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {errors.state && <span className="form-error">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">City / District *</label>
                  {!isCustomCityInput && (INDIA_STATES_AND_CITIES[formData.state] || []).length > 0 ? (
                    <select
                      name="city"
                      className="form-select"
                      value={formData.city}
                      onChange={(e) => {
                        if (e.target.value === '__OTHER_CITY__') {
                          setIsCustomCityInput(true);
                          setFormData(prev => ({ ...prev, city: '' }));
                        } else {
                          handleChange(e);
                        }
                      }}
                    >
                      {(INDIA_STATES_AND_CITIES[formData.state] || []).map(ct => (
                        <option key={ct} value={ct}>{ct}</option>
                      ))}
                      <option value="__OTHER_CITY__">+ Type Other City / Town Manually</option>
                    </select>
                  ) : (
                    <div className="custom-city-wrapper">
                      <input
                        type="text"
                        name="city"
                        className="form-input"
                        placeholder="Enter your city/town name..."
                        value={formData.city}
                        onChange={handleChange}
                      />
                      {(INDIA_STATES_AND_CITIES[formData.state] || []).length > 0 && (
                        <button
                          type="button"
                          className="btn-city-back"
                          onClick={() => {
                            setIsCustomCityInput(false);
                            const cities = INDIA_STATES_AND_CITIES[formData.state] || [];
                            setFormData(prev => ({ ...prev, city: cities[0] || '' }));
                          }}
                        >
                          ← Choose from list
                        </button>
                      )}
                    </div>
                  )}
                  {errors.city && <span className="form-error">{errors.city}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Complete Doorstep Address *</label>
                <textarea
                  name="address"
                  rows={3}
                  className="form-textarea"
                  placeholder="House/Flat No., Building Name, Street, Landmark, Pincode"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="form-error">{errors.address}</span>}
              </div>

              <div className="form-section-title margin-top-lg">
                <Wrench size={18} className="title-icon" />
                <span>3. Appliance & Issue Details</span>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Select Appliance *</label>
                  <select
                    name="appliance"
                    className="form-select"
                    value={formData.appliance}
                    onChange={handleChange}
                  >
                    {APPLIANCE_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Appliance Brand & Model *</label>
                  <input
                    type="text"
                    name="brand"
                    className="form-input"
                    placeholder="e.g., LG Inverter 260L, Daikin 1.5T Split"
                    value={formData.brand}
                    onChange={handleChange}
                  />
                  {errors.brand && <span className="form-error">{errors.brand}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Problem Description *</label>
                <textarea
                  name="problem"
                  rows={3}
                  className="form-textarea"
                  placeholder="Describe the exact fault (e.g. water leaking, not heating, drum not spinning, strange noise)..."
                  value={formData.problem}
                  onChange={handleChange}
                />
                {errors.problem && <span className="form-error">{errors.problem}</span>}
              </div>

              <div className="form-section-title margin-top-lg">
                <Calendar size={18} className="title-icon" />
                <span>4. Schedule & Pickup Preference</span>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    className="form-input"
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                  {errors.preferredDate && <span className="form-error">{errors.preferredDate}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Time Slot *</label>
                  <select
                    name="preferredTime"
                    className="form-select"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  >
                    {TIME_SLOTS.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pickup-toggle-box">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="pickupRequired"
                    checked={formData.pickupRequired}
                    onChange={handleChange}
                    className="custom-checkbox"
                  />
                  <div className="checkbox-text">
                    <span className="chk-title"><Truck size={16} /> Request Appliance Pickup Where Available</span>
                    <span className="chk-desc">Our executive will pick up your unit safely in custom protective packaging if workshop diagnostics are needed.</span>
                  </div>
                </label>
              </div>

              <div className="form-submit-wrapper">
                <button type="submit" className="btn-primary full-width submit-btn">
                  <span>SUBMIT REPAIR REQUEST →</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};
