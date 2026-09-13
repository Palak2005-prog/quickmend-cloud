import React from 'react';
import { CheckCircle2, Clock, Wrench, MapPin, UserCheck, PhoneCall, Info } from 'lucide-react';
import type { TrackingRecord } from '../data/trackingData';
import { TIMELINE_STEPS } from '../data/trackingData';
import './TrackingTimeline.css';

interface TrackingTimelineProps {
  record: TrackingRecord;
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ record }) => {
  return (
    <div className="tracking-timeline-container">
      {/* Repair Record Overview Header */}
      <div className="glass-card record-header-card">
        <div className="record-header-top">
          <div>
            <span className="badge-neon record-id-badge">
              ID: {record.id}
            </span>
            <h2 className="record-title">{record.brand} — {record.appliance}</h2>
          </div>
          <div className="record-status-chip">
            <span className="live-dot"></span>
            <span>Step {record.currentStep} of 8</span>
          </div>
        </div>

        <div className="record-info-grid">
          <div className="info-block">
            <span className="info-label">Customer Name</span>
            <span className="info-value">{record.customerName}</span>
          </div>
          <div className="info-block">
            <span className="info-label">City</span>
            <span className="info-value"><MapPin size={14} /> {record.city}</span>
          </div>
          <div className="info-block">
            <span className="info-label">Booking Date</span>
            <span className="info-value">{record.bookingDate}</span>
          </div>
          <div className="info-block">
            <span className="info-label">Est. Completion</span>
            <span className="info-value highlight-cyan">{record.estimatedCompletion}</span>
          </div>
        </div>

        <div className="problem-statement">
          <strong>Reported Problem:</strong> "{record.problem}"
        </div>

        {/* Assigned Technician Banner */}
        <div className="technician-banner">
          <div className="tech-info">
            <UserCheck size={20} className="tech-icon" />
            <div>
              <span className="tech-label">Assigned Specialist</span>
              <span className="tech-name">{record.technicianName}</span>
            </div>
          </div>
          <a href={`tel:${record.technicianPhone}`} className="btn-secondary btn-sm">
            <PhoneCall size={14} />
            <span>Call Technician</span>
          </a>
        </div>
      </div>

      {/* 8-Step Interactive Progress Timeline */}
      <div className="glass-card timeline-card">
        <h3 className="timeline-heading">
          <Wrench size={20} className="header-icon" />
          <span>Live Repair Timeline</span>
        </h3>

        <div className="timeline-steps-list">
          {TIMELINE_STEPS.map((step) => {
            const isCompleted = step.stepNumber < record.currentStep;
            const isCurrent = step.stepNumber === record.currentStep;
            const isPending = step.stepNumber > record.currentStep;

            // Find step log if available
            const stepLog = record.statusLogs.find(l => l.stepNumber === step.stepNumber);

            return (
              <div 
                key={step.stepNumber} 
                className={`timeline-step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isPending ? 'pending' : ''}`}
              >
                <div className="step-marker-column">
                  <div className="step-node">
                    {isCompleted ? (
                      <CheckCircle2 size={20} className="icon-completed" />
                    ) : isCurrent ? (
                      <Clock size={20} className="icon-current" />
                    ) : (
                      <span className="step-num">{step.stepNumber}</span>
                    )}
                  </div>
                  {step.stepNumber < 8 && <div className="step-line"></div>}
                </div>

                <div className="step-content-column">
                  <div className="step-title-row">
                    <h4 className="step-title">
                      {step.stepNumber}. {step.title}
                    </h4>
                    {isCompleted && <span className="status-tag tag-done">Completed</span>}
                    {isCurrent && <span className="status-tag tag-active">In Progress</span>}
                    {isPending && <span className="status-tag tag-upcoming">Pending</span>}
                  </div>

                  <p className="step-desc">{step.description}</p>

                  {stepLog && (
                    <div className="step-log-box">
                      <span className="log-time">{stepLog.timestamp}</span>
                      <span className="log-note">{stepLog.note}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="timeline-note-box">
          <Info size={16} />
          <span>
            This live tracking timeline is synchronized in real-time with your assigned QuickMend service hub and technician.
          </span>
        </div>
      </div>
    </div>
  );
};
