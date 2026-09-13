import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Mail, Clock, CheckCircle, Navigation, Building2 } from 'lucide-react';
import { STORES_DATA, ALL_STATES } from '../data/storesData';
import './StoreLocator.css';

export const StoreLocator: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locMsg, setLocMsg] = useState<string>('');

  // Available cities based on selected state
  const availableCities = useMemo(() => {
    let filteredStores = STORES_DATA;
    if (selectedState !== 'All') {
      filteredStores = STORES_DATA.filter(s => s.state === selectedState);
    }
    const cities = Array.from(new Set(filteredStores.map(s => s.city))).sort();
    return cities;
  }, [selectedState]);

  // Filtered stores list
  const filteredStores = useMemo(() => {
    return STORES_DATA.filter(store => {
      const matchState = selectedState === 'All' || store.state === selectedState;
      const matchCity = selectedCity === 'All' || store.city === selectedCity;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = q === '' || 
        store.name.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.city.toLowerCase().includes(q) ||
        store.pincode.includes(q) ||
        store.services.some(srv => srv.toLowerCase().includes(q));

      return matchState && matchCity && matchSearch;
    });
  }, [selectedState, selectedCity, searchQuery]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity('All'); // Reset city selection
  };

  const handleUsePresentLocation = () => {
    if (!navigator.geolocation) {
      setLocMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocMsg('Detecting present location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          if (response.ok) {
            const data = await response.json();
            const addr = data.address || {};
            const detectedCity = addr.city || addr.town || addr.village || addr.suburb || addr.county || '';
            const detectedState = addr.state || '';

            if (detectedState && ALL_STATES.includes(detectedState)) {
              setSelectedState(detectedState);
            }
            if (detectedCity) {
              setSearchQuery(detectedCity);
            }
            setLocMsg(`✓ Present location detected: ${detectedCity || detectedState || 'Current Region'}`);
          } else {
            setLocMsg(`✓ Present location captured (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
          }
        } catch {
          setLocMsg(`✓ Present location captured (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocMsg('Location permission denied.');
        } else {
          setLocMsg('Unable to retrieve location.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="store-locator-container">
      {/* Filter Controls Header */}
      <div className="glass-card store-filters-card">
        <div className="store-filter-grid">
          {/* Search Input */}
          <div className="filter-item search-filter">
            <label className="form-label">Search Location or Service</label>
            <div className="input-icon-wrapper">
              <Search className="input-icon" size={18} />
              <input
                type="text"
                className="form-input icon-padded"
                placeholder="Enter city, locality, pincode or appliance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Select State */}
          <div className="filter-item">
            <label className="form-label">Select State</label>
            <select
              className="form-select"
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              <option value="All">All States across India ({ALL_STATES.length})</option>
              {ALL_STATES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Select City */}
          <div className="filter-item">
            <label className="form-label">Select City</label>
            <select
              className="form-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="All">All Cities ({availableCities.length})</option>
              {availableCities.map(ct => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="stores-summary-bar">
          <div className="summary-left">
            <span className="summary-count">
              Showing <strong>{filteredStores.length}</strong> QuickMend Service {filteredStores.length === 1 ? 'Store' : 'Stores'}
            </span>
            {locMsg && <span className="loc-status-msg">{locMsg}</span>}
          </div>

          <div className="summary-actions">
            <button 
              type="button"
              className="btn-secondary btn-sm"
              onClick={handleUsePresentLocation}
              disabled={isLocating}
            >
              <Navigation size={14} />
              <span>{isLocating ? 'Locating...' : 'Use Present Location'}</span>
            </button>

            {(selectedState !== 'All' || selectedCity !== 'All' || searchQuery !== '') && (
              <button 
                className="btn-reset"
                onClick={() => {
                  setSelectedState('All');
                  setSelectedCity('All');
                  setSearchQuery('');
                  setLocMsg('');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stores List Grid */}
      {filteredStores.length > 0 ? (
        <div className="stores-grid">
          {filteredStores.map((store) => (
            <div key={store.id} className="glass-card store-card">
              <div className="store-card-header">
                <div className="store-badge-row">
                  <span className="store-location-badge">
                    <MapPin size={13} />
                    {store.city}, {store.state}
                  </span>
                  {store.pickupAvailable && (
                    <span className="badge-neon pickup-tag">
                      <Navigation size={12} /> Doorstep Pickup
                    </span>
                  )}
                </div>
                <h3 className="store-name">{store.name}</h3>
                <p className="store-address">{store.address}, Pincode: {store.pincode}</p>
              </div>

              <div className="store-card-body">
                <div className="store-info-row">
                  <Clock size={16} className="info-icon" />
                  <span>Working Hours: <strong>{store.timing}</strong></span>
                </div>

                <div className="store-info-row">
                  <Phone size={16} className="info-icon" />
                  <span>Helpline: <a href={`tel:${store.phone}`} className="phone-link">{store.phone}</a></span>
                </div>

                <div className="store-info-row">
                  <Mail size={16} className="info-icon" />
                  <span>Email: <a href={`mailto:${store.email}`} className="email-link">{store.email}</a></span>
                </div>

                <div className="store-services-list">
                  <span className="services-title">Services Available:</span>
                  <div className="services-tags">
                    {store.services.map((srv, idx) => (
                      <span key={idx} className="srv-tag">
                        <CheckCircle size={12} /> {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="store-card-footer">
                <a 
                  href={`https://maps.google.com/?q=QuickMend+${encodeURIComponent(store.address + ' ' + store.city)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary full-width"
                >
                  <Building2 size={16} />
                  <span>View Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card store-empty-state">
          <MapPin size={48} className="empty-icon" />
          <h3>No QuickMend Stores Found</h3>
          <p>We couldn't find a store matching your search criteria. However, QuickMend provides doorstep pickup & technician home visits in over 500+ pin codes across India.</p>
          <button 
            className="btn-primary" 
            onClick={() => { setSelectedState('All'); setSelectedCity('All'); setSearchQuery(''); }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
