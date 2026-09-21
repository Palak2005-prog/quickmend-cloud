import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Wrench, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Truck, 
  AlertCircle, 
  ArrowRight,
  Layers,
  CheckCircle2,
  Image as ImageIcon,
  UploadCloud,
  X,
  Zap
} from 'lucide-react';
import { statesAndCities } from '../../data/indiaLocations';
import { applianceOptions, commonBrands } from '../../data/servicesData';
import { ApplianceIcon } from '../ui/ApplianceIcon';
import { useBooking } from '../../context/BookingContext';
import { BookingConfirmation } from './BookingConfirmation';
import { detectUserLocation } from '../../utils/geolocation';
import { Locate, Navigation, Sparkles } from 'lucide-react';

export const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const initialAppliance = searchParams.get('appliance') || 'Refrigerator';
  const initialCity = searchParams.get('city') || '';
  const initialState = searchParams.get('state') || '';
  const { createBooking } = useBooking();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(() => {
    let defaultState = statesAndCities[0].state;
    let defaultCity = statesAndCities[0].cities[0];

    if (initialState) {
      const matchState = statesAndCities.find(s => s.state.toLowerCase() === initialState.toLowerCase());
      if (matchState) {
        defaultState = matchState.state;
        defaultCity = matchState.cities[0];
      }
    }

    if (initialCity) {
      for (const s of statesAndCities) {
        const matchCity = s.cities.find(c => c.toLowerCase() === initialCity.toLowerCase());
        if (matchCity) {
          defaultState = s.state;
          defaultCity = matchCity;
          break;
        }
      }
    }

    return {
      fullName: '',
      phone: '',
      email: '',
      state: defaultState,
      city: defaultCity,
      address: '',
      appliance: initialAppliance,
      brand: 'Samsung',
      customBrand: '',
      problemDescription: '',
      preferredDate: '',
      preferredTime: 'Morning (09:00 AM - 12:00 PM)',
      pickupRequired: true,
      photoDataUrl: null,
      photoFileName: ''
    };
  });

  const [availableCities, setAvailableCities] = useState(() => {
    const found = statesAndCities.find(item => item.state === formData.state);
    return found ? found.cities : statesAndCities[0].cities;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState('');
  const [locationErrorMsg, setLocationErrorMsg] = useState('');

  // Handle auto-detect location
  const handleAutoDetectLocation = async () => {
    setIsDetectingLocation(true);
    setLocationErrorMsg('');
    setLocationSuccessMsg('');

    try {
      const result = await detectUserLocation();
      if (result.success) {
        setAvailableCities(result.citiesList);
        setFormData(prev => ({
          ...prev,
          state: result.state,
          city: result.city,
          address: prev.address ? prev.address : (result.road ? `${result.road}, ${result.city} ${result.pincode ? `(${result.pincode})` : ''}` : '')
        }));
        setLocationSuccessMsg(`Detected: ${result.city}, ${result.state}`);
        setTimeout(() => setLocationSuccessMsg(''), 6000);
      }
    } catch (err) {
      setLocationErrorMsg(err.message || 'Could not auto-detect location. Please select manually.');
      setTimeout(() => setLocationErrorMsg(''), 6000);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  // Update appliance if URL query changes
  useEffect(() => {
    const appParam = searchParams.get('appliance');
    if (appParam) {
      const match = applianceOptions.find(
        opt => opt.toLowerCase() === appParam.toLowerCase() || opt.toLowerCase().includes(appParam.toLowerCase())
      );
      if (match) {
        setFormData(prev => ({ ...prev, appliance: match }));
      }
    }
  }, [searchParams]);

  // Sync cities when state changes
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const found = statesAndCities.find(item => item.state === selectedState);
    const newCities = found ? found.cities : [];
    setAvailableCities(newCities);
    setFormData(prev => ({
      ...prev,
      state: selectedState,
      city: newCities[0] || ''
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Image Upload Handling
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, photo: 'Please upload an image file (JPG, PNG, WebP)' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, photo: 'Image size should be less than 5MB' }));
      return;
    }

    setErrors(prev => ({ ...prev, photo: '' }));
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        photoDataUrl: event.target.result,
        photoFileName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photoDataUrl: null,
      photoFileName: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid name';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/[\s-+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!phoneRegex.test(cleanPhone) && cleanPhone.length !== 10) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street address / locality is required';
    }

    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = 'Please describe the issue you are experiencing';
    } else if (formData.problemDescription.trim().length < 5) {
      newErrors.problemDescription = 'Please provide a few more details about the fault';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred service date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const finalBrand = formData.brand === 'Other Brand' && formData.customBrand.trim()
        ? formData.customBrand.trim()
        : formData.brand;

      const record = createBooking({
        ...formData,
        brand: finalBrand
      });

      setIsSubmitting(false);
      setCompletedBooking(record);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setCompletedBooking(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      state: statesAndCities[0].state,
      city: statesAndCities[0].cities[0],
      address: '',
      appliance: 'Refrigerator',
      brand: 'Samsung',
      customBrand: '',
      problemDescription: '',
      preferredDate: '',
      preferredTime: 'Morning (09:00 AM - 12:00 PM)',
      pickupRequired: true,
      photoDataUrl: null,
      photoFileName: ''
    });
    setErrors({});
  };

  if (completedBooking) {
    return <BookingConfirmation booking={completedBooking} onReset={handleReset} />;
  }

  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto py-8">
      
      {/* Form Container */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0B1730] to-[#040D20] border border-[#00E5FF]/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_30px_rgba(0,229,255,0.12)]">
        
        {/* Form Title & 24h guarantee banner */}
        <div className="border-b border-slate-800/80 pb-6 mb-8 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-black text-[#00E5FF] flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Zap className="w-3.5 h-3.5 fill-[#00E5FF]" /> Delivery Within 24 Hours
            </span>
            <span className="text-xs text-[#9FB1C7]">
              Certified Technicians • Doorstep Pickup
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Book Appliance Repair
          </h2>
          <p className="text-sm text-[#9FB1C7] mt-1">
            Fill in the details below to arrange doorstep inspection, multi-brand diagnostics, and rapid 24-hour return.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          
          {/* SECTION 1: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>1. Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name <span className="text-[#00E5FF]">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Verma"
                  className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                    errors.fullName ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Number <span className="text-[#00E5FF]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  maxLength={10}
                  className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                    errors.phone ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-[#00E5FF]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                    errors.email ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* SECTION 2: Service Location with Auto-Detect */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>2. Service Location (All States & Cities Across India)</span>
              </h3>

              <button
                type="button"
                onClick={handleAutoDetectLocation}
                disabled={isDetectingLocation}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] disabled:opacity-60 cursor-pointer w-fit"
              >
                {isDetectingLocation ? (
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

            {/* Auto-detect success/error alert message */}
            {locationSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{locationSuccessMsg} — State & City updated automatically!</span>
              </div>
            )}

            {locationErrorMsg && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <span>{locationErrorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* State Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  State / Union Territory <span className="text-[#00E5FF]">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#061024] text-white border border-[#00E5FF]/20 focus:border-[#00E5FF] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                >
                  {statesAndCities.map((item, idx) => (
                    <option key={idx} value={item.state} className="bg-[#020817] text-white">
                      {item.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  City / District <span className="text-[#00E5FF]">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#061024] text-white border border-[#00E5FF]/20 focus:border-[#00E5FF] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                >
                  {availableCities.map((city, idx) => (
                    <option key={idx} value={city} className="bg-[#020817] text-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Street Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Address, House/Flat No, Landmark & Pincode <span className="text-[#00E5FF]">*</span>
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. Flat 402, Lotus Heights, 5th Cross Road, Near Metro Station"
                  className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                    errors.address ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                  }`}
                ></textarea>
                {errors.address && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.address}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* SECTION 3: Appliance, Image Upload & Problem Description */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span>3. Appliance & Problem Details</span>
            </h3>

            {/* Appliance Selector Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Appliance <span className="text-[#00E5FF]">*</span>
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {applianceOptions.map((app) => {
                  const isSelected = formData.appliance === app;
                  return (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, appliance: app }))}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all text-left ${
                        isSelected
                          ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                          : 'bg-[#061024] border-slate-800 text-slate-300 hover:border-[#00E5FF]/40'
                      }`}
                    >
                      <ApplianceIcon name={app} className="w-4 h-4 flex-shrink-0" color={isSelected ? "#00E5FF" : "#9FB1C7"} />
                      <span className="truncate">{app}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* Brand Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Appliance Brand <span className="text-[#00E5FF]">*</span>
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#061024] text-white border border-[#00E5FF]/20 focus:border-[#00E5FF] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                >
                  {commonBrands.map((b, idx) => (
                    <option key={idx} value={b} className="bg-[#020817] text-white">
                      {b}
                    </option>
                  ))}
                </select>

                {formData.brand === 'Other Brand' && (
                  <input
                    type="text"
                    name="customBrand"
                    value={formData.customBrand}
                    onChange={handleChange}
                    placeholder="Specify Brand Name"
                    className="w-full mt-2 px-4 py-2.5 rounded-xl bg-[#061024] text-white placeholder-slate-500 border border-[#00E5FF]/30 text-xs focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                  />
                )}
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Upload Appliance / Fault Photo (Optional)
                </label>
                
                {formData.photoDataUrl ? (
                  <div className="relative p-2 rounded-xl bg-[#061024] border border-[#00E5FF]/40 flex items-center gap-3">
                    <img 
                      src={formData.photoDataUrl} 
                      alt="Uploaded appliance preview" 
                      className="w-12 h-12 rounded-lg object-cover border border-[#00E5FF]/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white font-medium truncate">{formData.photoFileName}</p>
                      <span className="text-[10px] text-emerald-400 font-semibold">Photo Attached</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-[#00E5FF]/30 hover:border-[#00E5FF] p-3 rounded-xl bg-[#061024]/60 flex items-center justify-center gap-3 transition-all group"
                  >
                    <UploadCloud className="w-5 h-5 text-[#00E5FF] group-hover:scale-110 transition-transform" />
                    <div className="text-xs text-slate-300">
                      <span className="text-[#00E5FF] font-semibold">Click to upload</span> photo of appliance or error code
                    </div>
                  </div>
                )}
                
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
                
                {errors.photo && (
                  <p className="text-red-400 text-xs mt-1">{errors.photo}</p>
                )}
              </div>

              {/* Problem Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Problem Description <span className="text-[#00E5FF]">*</span>
                </label>
                <textarea
                  name="problemDescription"
                  rows={3}
                  value={formData.problemDescription}
                  onChange={handleChange}
                  placeholder="Describe the issue (e.g. cooling completely stopped, strange noise while spinning, error code on display, etc.)"
                  className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                    errors.problemDescription ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                  }`}
                ></textarea>
                {errors.problemDescription && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.problemDescription}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* SECTION 4: Schedule & Pickup */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>4. Preferred Schedule & Pickup</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Date <span className="text-[#00E5FF]">*</span>
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  min={todayStr}
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] [color-scheme:dark] ${
                    errors.preferredDate ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                  }`}
                />
                {errors.preferredDate && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                  </p>
                )}
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Time Slot <span className="text-[#00E5FF]">*</span>
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#061024] text-white border border-[#00E5FF]/20 focus:border-[#00E5FF] text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
                >
                  <option value="Morning (09:00 AM - 12:00 PM)" className="bg-[#020817] text-white">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 04:00 PM)" className="bg-[#020817] text-white">Afternoon (12:00 PM - 04:00 PM)</option>
                  <option value="Evening (04:00 PM - 08:00 PM)" className="bg-[#020817] text-white">Evening (04:00 PM - 08:00 PM)</option>
                </select>
              </div>

              {/* Pickup Required Toggle Box */}
              <div className="md:col-span-2 pt-2">
                <label className="flex items-start gap-3 p-4 rounded-xl bg-[#061024] border border-[#00E5FF]/20 hover:border-[#00E5FF]/40 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    name="pickupRequired"
                    checked={formData.pickupRequired}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded text-[#00E5FF] accent-[#00E5FF] bg-[#020817] border-slate-700 focus:ring-0"
                  />
                  <div>
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#00E5FF]" /> Request Doorstep Pickup (24-Hour Return)
                    </span>
                    <p className="text-xs text-[#9FB1C7] mt-0.5 leading-relaxed">
                      Our certified logistics executive will safely collect the appliance from your doorstep for precision repairs and deliver it back within 24 hours.
                    </p>
                  </div>
                </label>
              </div>

            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] text-[#020817] font-extrabold text-base shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#020817] border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Request...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT REPAIR REQUEST</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            <p className="text-center text-xs text-[#9FB1C7] mt-3">
              🔒 Safe & Confidential • No advance payment needed prior to inspection.
            </p>
          </div>

        </form>

      </div>

    </div>
  );
};
