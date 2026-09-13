import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Search,
  Wrench
} from 'lucide-react';
import './Home.css';

export const Home: React.FC = () => {
  React.useEffect(() => {
    document.title = "QuickMend — India's Home Appliance Repair Platform";
  }, []);

  const whyUsCards = [
    {
      number: "01",
      title: "Convenient Pickup",
      description: "Where available, customers can get appliance pickup from their doorstep."
    },
    {
      number: "02",
      title: "Professional Repair",
      description: "Appliances are inspected and repaired by service professionals."
    },
    {
      number: "03",
      title: "Delivery within 24 Hours",
      description: "Where applicable, repaired appliances are delivered back to your doorstep within 24 hours."
    },
    {
      number: "04",
      title: "Multiple Brands",
      description: "Support appliances from many major brands."
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="badge-highlight-24h hero-badge">
              <Clock size={15} />
              <span>⚡ DOORSTEP DELIVERY WITHIN 24 HOURS</span>
            </div>

            <h1 className="hero-title">
              REPAIR.<br />
              RESTORE.<br />
              <span className="cyan-glow-text">RELAX.</span>
            </h1>

            <p className="hero-description">
              Fast and reliable home appliance repair with convenient pickup, professional servicing, and express doorstep delivery within 24 hours.
            </p>

            <div className="hero-actions">
              <Link to="/booking" className="btn-primary">
                <span>BOOK A REPAIR →</span>
              </Link>
              <Link to="/tracking" className="btn-secondary">
                <Search size={18} />
                <span>TRACK REPAIR</span>
              </Link>
            </div>

            {/* Trust Indicators Bar */}
            <div className="trust-indicators-grid">
              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="trust-title">EXPRESS</span>
                  <span className="trust-subtitle highlight-cyan-text">24-Hour Turnaround</span>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <Truck size={20} />
                </div>
                <div>
                  <span className="trust-title">DOORSTEP</span>
                  <span className="trust-subtitle highlight-cyan-text">Delivery within 24 Hours</span>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon-wrapper">
                  <Award size={20} />
                </div>
                <div>
                  <span className="trust-title">ALL</span>
                  <span className="trust-subtitle">Major Brands</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper glass-card">
              <img 
                src="/hero.jpg" 
                alt="QuickMend Home Appliance Repair Technician" 
                className="hero-image"
              />
              <div className="hero-floating-badge">
                <ShieldCheck size={20} className="badge-icon" />
                <div>
                  <span className="badge-title">100% Professional</span>
                  <span className="badge-sub">Service Technicians</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Major Brands Supported Ticker Bar */}
      <section className="brands-ticker-section">
        <div className="container text-center">
          <span className="brands-label">REPAIR SUPPORT FOR ALL MAJOR BRANDS</span>
          <div className="ticker-wrapper">
            <div className="ticker-track">
              {["Samsung", "LG", "Daikin", "Whirlpool", "Bosch", "IFB", "Sony", "Voltas", "Godrej", "Panasonic", "Haier", "Blue Star", "Samsung", "LG", "Daikin", "Whirlpool", "Bosch", "IFB", "Sony", "Voltas", "Godrej", "Panasonic", "Haier", "Blue Star"].map((brand, idx) => (
                <div key={idx} className="brand-chip">
                  <span className="brand-dot">•</span>
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Motive Section */}
      <section className="motive-section section-padding">
        <div className="container">
          <div className="glass-card motive-card">
            <div className="motive-grid">
              <div className="motive-text-content">
                <span className="section-subtitle">OUR MOTIVE</span>
                <h2 className="section-title">WE MAKE REPAIR SIMPLE.</h2>
                <p className="motive-paragraph">
                  QuickMend's goal is to make appliance repair convenient, transparent, reliable, and hassle-free for every home across India.
                </p>
                
                <div className="motive-pillars-grid">
                  <div className="pillar-box">
                    <CheckCircle2 size={20} className="pillar-icon" />
                    <div>
                      <h4>Convenient</h4>
                      <p>Easy online request submission and doorstep pickup availability.</p>
                    </div>
                  </div>
                  <div className="pillar-box">
                    <CheckCircle2 size={20} className="pillar-icon" />
                    <div>
                      <h4>Reliable</h4>
                      <p>Inspected and serviced by experienced technical professionals.</p>
                    </div>
                  </div>
                  <div className="pillar-box">
                    <CheckCircle2 size={20} className="pillar-icon" />
                    <div>
                      <h4>Transparent</h4>
                      <p>Clear diagnostic process with no hidden costs.</p>
                    </div>
                  </div>
                  <div className="pillar-box">
                    <CheckCircle2 size={20} className="pillar-icon" />
                    <div>
                      <h4>Hassle-free</h4>
                      <p>Full support from repair request to safe doorstep delivery.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="motive-visual-col">
                <div className="customer-journey-box">
                  <div className="journey-header">
                    <Wrench size={20} className="journey-icon" />
                    <h3>Customer Journey</h3>
                  </div>
                  <p className="journey-intro-text">
                    From the moment you log a booking, QuickMend handles technician dispatch, initial diagnosis, precision repair, and safe return delivery so your home routines remain uninterrupted.
                  </p>
                  <div className="journey-timeline-simple">
                    <div className="j-step">
                      <div className="j-num">1</div>
                      <div className="j-text">
                        <strong>Request Booking</strong>
                        <span>Describe your appliance issue online</span>
                      </div>
                    </div>
                    <div className="j-step">
                      <div className="j-num">2</div>
                      <div className="j-text">
                        <strong>Inspection & Pickup</strong>
                        <span>Technician evaluates unit at doorstep</span>
                      </div>
                    </div>
                    <div className="j-step">
                      <div className="j-num">3</div>
                      <div className="j-text">
                        <strong>Servicing & Quality Check</strong>
                        <span>Repaired with genuine replacement parts</span>
                      </div>
                    </div>
                    <div className="j-step">
                      <div className="j-num">4</div>
                      <div className="j-text">
                        <strong>Safe Delivery</strong>
                        <span>Appliance returned back to your doorstep</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why QuickMend Section */}
      <section className="why-us-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">THE QUICKMEND ADVANTAGE</span>
            <h2 className="section-title">WHY QUICKMEND</h2>
            <p className="section-description">
              Built to communicate trust, technical excellence, and complete peace of mind.
            </p>
          </div>

          <div className="why-us-grid">
            {whyUsCards.map((card) => (
              <div key={card.number} className="glass-card why-card">
                <div className="why-number">{card.number}</div>
                <h3 className="why-card-title">{card.title}</h3>
                <p className="why-card-desc">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* India-Wide Coverage Section */}
      <section className="india-coverage-section section-padding">
        <div className="container">
          <div className="glass-card coverage-banner neon-glow-card">
            <div className="coverage-content">
              <div className="badge-highlight-24h">
                <MapPin size={14} />
                <span>PAN-INDIA REPAIR NETWORK</span>
              </div>
              <h2 className="coverage-title">REPAIR SUPPORT ACROSS INDIA.</h2>
              <p className="coverage-description">
                QuickMend certified technicians and doorstep pickup units are active across cities and states throughout India.
              </p>
              <div className="coverage-actions">
                <Link to="/booking" className="btn-primary">
                  <span>BOOK DOORSTEP REPAIR →</span>
                </Link>
                <Link to="/contact" className="btn-secondary">
                  <span>CONTACT SUPPORT</span>
                </Link>
              </div>
            </div>
            <div className="coverage-visual">
              <img 
                src="/store.jpg" 
                alt="QuickMend Stores Across India" 
                className="coverage-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Home Final CTA Section */}
      <section className="home-final-cta-section section-padding">
        <div className="container">
          <div className="glass-card final-cta-card text-center">
            <h2 className="final-cta-title">YOUR APPLIANCE. OUR EXPERTISE.</h2>
            <p className="final-cta-description">
              Book your repair request and let QuickMend take care of the rest.
            </p>
            <Link to="/booking" className="btn-primary btn-lg">
              <span>BOOK A REPAIR →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
