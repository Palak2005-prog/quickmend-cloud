import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Refrigerator, 
  WashingMachine, 
  Wind, 
  Flame, 
  Droplets, 
  Tv, 
  Wrench,
  CheckCircle2,
  Clock,
  Tag
} from 'lucide-react';
import type { ServiceItem } from '../data/servicesData';
import './ServiceCard.css';

interface ServiceCardProps {
  service: ServiceItem;
  showDetails?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, showDetails = false }) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Refrigerator':
        return <Refrigerator className="service-card-icon" />;
      case 'WashingMachine':
        return <WashingMachine className="service-card-icon" />;
      case 'Wind':
        return <Wind className="service-card-icon" />;
      case 'Flame':
        return <Flame className="service-card-icon" />;
      case 'Droplets':
        return <Droplets className="service-card-icon" />;
      case 'Tv':
        return <Tv className="service-card-icon" />;
      case 'Microwave':
        return (
          <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="6" y1="8" x2="6" y2="16" />
            <line x1="10" y1="8" x2="10" y2="16" />
            <rect x="14" y="8" width="4" height="8" rx="1" />
          </svg>
        );
      default:
        return <Wrench className="service-card-icon" />;
    }
  };

  return (
    <div className="glass-card service-card">
      <div className="service-card-top">
        <div className="service-icon-box">
          {renderIcon(service.iconName)}
        </div>
        {service.badge && (
          <span className="badge-neon service-badge">{service.badge}</span>
        )}
      </div>

      <div className="service-card-body">
        <span className="service-category">{service.category}</span>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>

        {showDetails && (
          <div className="service-details-meta">
            <div className="service-meta-item">
              <Clock size={15} />
              <span>Est. {service.estimatedTime}</span>
            </div>
            <div className="service-meta-item price-item">
              <Tag size={15} />
              <span>Starts at {service.startingPrice}</span>
            </div>
          </div>
        )}

        {service.commonIssues && service.commonIssues.length > 0 && (
          <ul className="service-issues-list">
            {service.commonIssues.slice(0, showDetails ? 4 : 2).map((issue, idx) => (
              <li key={idx}>
                <CheckCircle2 size={14} className="check-icon" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="service-card-footer">
        <Link to={`/booking?service=${service.id}`} className="btn-secondary full-width">
          <span>BOOK REPAIR →</span>
        </Link>
      </div>
    </div>
  );
};
