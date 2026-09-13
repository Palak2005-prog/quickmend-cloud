import React, { useState } from 'react';
import { MessageCircle, Phone, Search, X, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import './FloatingSupportWidget.css';

export const FloatingSupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-widget-container">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="floating-menu-card glass-card animate-fade-in-up">
          <div className="menu-card-header">
            <div className="header-title-box">
              <Headphones size={18} className="cyan-icon" />
              <div>
                <h4>QuickMend Helpline</h4>
                <span className="live-status-text">⚡ Instant Assistance</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X size={16} />
            </button>
          </div>

          <div className="menu-card-body">
            <a 
              href="https://wa.me/919279041718?text=Hello%20QuickMend%2C%20I%20need%20assistance%20with%20my%20appliance%20repair." 
              target="_blank" 
              rel="noopener noreferrer"
              className="widget-action-item whatsapp-action"
            >
              <div className="action-icon-box wa-box">
                <MessageCircle size={20} />
              </div>
              <div className="action-text">
                <span className="action-title">WhatsApp Chat</span>
                <span className="action-sub">Chat live with diagnostic specialist</span>
              </div>
            </a>

            <a href="tel:9279041718" className="widget-action-item phone-action">
              <div className="action-icon-box phone-box">
                <Phone size={20} />
              </div>
              <div className="action-text">
                <span className="action-title">Call Helpline</span>
                <span className="action-sub">9279041718 (Toll Free / Direct)</span>
              </div>
            </a>

            <Link to="/tracking" className="widget-action-item track-action" onClick={() => setIsOpen(false)}>
              <div className="action-icon-box track-box">
                <Search size={20} />
              </div>
              <div className="action-text">
                <span className="action-title">Track Status</span>
                <span className="action-sub">Check live repair progress by ID</span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button 
        className={`floating-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Quick Support"
      >
        <span className="pulse-aura"></span>
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
};
