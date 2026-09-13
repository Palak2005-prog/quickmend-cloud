import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Track Repair', path: '/tracking' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <Zap className="logo-icon" />
          </div>
          <div className="logo-text">
            <span className="logo-title">QuickMend</span>
            <span className="logo-tagline">REPAIR. RESTORE. RELAX.</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="navbar-actions">
          <Link to="/booking" className="btn-primary desktop-cta">
            <span>BOOK A REPAIR</span>
            <ArrowRight size={16} />
          </Link>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="badge-neon">
              <ShieldCheck size={14} />
              <span>India-Wide Appliance Care</span>
            </div>
          </div>
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mobile-cta-wrapper">
            <Link to="/booking" className="btn-primary full-width">
              <span>BOOK A REPAIR</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
