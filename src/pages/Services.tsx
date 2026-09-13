import React from 'react';
import { Clock, HelpCircle } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { ServiceCard } from '../components/ServiceCard';
import './Services.css';

export const Services: React.FC = () => {
  React.useEffect(() => {
    document.title = "Appliance Repair Services — QuickMend";
  }, []);

  const howItWorksSteps = [
    {
      step: "01",
      title: "BOOK A REPAIR",
      description: "Select your appliance and describe the problem you're facing."
    },
    {
      step: "02",
      title: "PICKUP",
      description: "Where available, our team safely collects the appliance from your doorstep."
    },
    {
      step: "03",
      title: "EXPERT REPAIR",
      description: "The appliance is inspected, diagnosed and repaired by service professionals."
    },
    {
      step: "04",
      title: "DELIVERY WITHIN 24 HOURS",
      description: "Where applicable, your repaired appliance is safely returned to your doorstep within 24 hours."
    }
  ];

  return (
    <div className="services-page">
      {/* Services Hero */}
      <section className="services-header-section">
        <div className="container text-center">
          <div className="badge-highlight-24h header-badge">
            <Clock size={14} />
            <span>⚡ EXPRESS DOORSTEP DELIVERY WITHIN 24 HOURS</span>
          </div>

          <h1 className="services-main-heading">
            APPLIANCE REPAIR MADE SIMPLE.
          </h1>

          <p className="services-main-desc">
            Professional repair assistance for the home appliances you depend on every day.
          </p>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="container section-padding">
        <div className="section-header">
          <h2 className="section-title">OUR SERVICES</h2>
        </div>

        <div className="services-grid-page">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} showDetails={true} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">SIMPLE. FAST. RELIABLE.</h2>
            <p className="section-description">
              Getting your appliance repaired is easy with QuickMend.
            </p>
          </div>

          <div className="steps-process-grid">
            {howItWorksSteps.map((stepItem) => (
              <div key={stepItem.step} className="glass-card process-step-card">
                <div className="step-badge">{stepItem.step}</div>
                <h3 className="step-title">{stepItem.title}</h3>
                <p className="step-desc">{stepItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Appliances Section (Final Content Section of Services Page) */}
      <section className="container section-padding">
        <div className="glass-card custom-appliance-card">
          <div className="custom-card-content">
            <div className="custom-icon-wrapper">
              <HelpCircle size={32} className="custom-icon" />
            </div>
            <div>
              <h2 className="custom-title">OTHER APPLIANCES</h2>
              <p className="custom-desc">
                Have another appliance that needs attention? Tell QuickMend what needs to be repaired by selecting "Other" during booking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
