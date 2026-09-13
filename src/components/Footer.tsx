import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Phone, Mail, MessageCircle, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon-wrapper">
              <Zap className="logo-icon" />
            </div>
            <div className="logo-text">
              <span className="logo-title">QuickMend</span>
              <span className="logo-tagline">REPAIR. RESTORE. RELAX.</span>
            </div>
          </Link>
          <p className="brand-description">
            Fast, reliable and convenient appliance repair services.
          </p>
          <div className="badge-neon">
            <ShieldCheck size={14} />
            <span>Pan-India Service Network</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/booking">Book Repair</Link></li>
            <li><Link to="/tracking">Track Repair</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Popular Repair Services */}
        <div className="footer-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><Link to="/booking?service=refrigerator">Refrigerator Repair</Link></li>
            <li><Link to="/booking?service=washing-machine">Washing Machine Repair</Link></li>
            <li><Link to="/booking?service=ac-repair">Air Conditioner Servicing</Link></li>
            <li><Link to="/booking?service=microwave">Microwave Repair</Link></li>
            <li><Link to="/booking?service=water-purifier">Water Purifier Repair</Link></li>
            <li><Link to="/booking?service=tv-repair">Smart TV Repair</Link></li>
          </ul>
        </div>

        {/* Direct Contact Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Contact QuickMend</h4>
          <div className="contact-items">
            <a href="tel:9279041718" className="contact-item">
              <div className="contact-icon"><Phone size={16} /></div>
              <span>9279041718</span>
            </a>
            <a href="mailto:replypalak525@gmail.com" className="contact-item">
              <div className="contact-icon"><Mail size={16} /></div>
              <span>replypalak525@gmail.com</span>
            </a>
            <a 
              href="https://wa.me/919279041718?text=Hello%20QuickMend%2C%20I%20need%20assistance%20with%20my%20appliance%20repair." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-item whatsapp-highlight"
            >
              <div className="contact-icon whatsapp-icon"><MessageCircle size={16} /></div>
              <span>WhatsApp Support</span>
              <ArrowUpRight size={14} className="external-arrow" />
            </a>
            <div className="contact-item address-item">
              <div className="contact-icon"><MapPin size={16} /></div>
              <span>Service Hubs across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai, Jamshedpur & major Indian cities.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>© 2026 QuickMend. All rights reserved.</p>
          <div className="bottom-links">
            <span className="security-tag">⚡ 100% Genuine Spare Parts • Certified Technicians</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
