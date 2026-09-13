import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import './Contact.css';

interface ContactFormData {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  React.useEffect(() => {
    document.title = "Contact QuickMend & Stores Across India";
  }, []);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.mobile.trim() || formData.mobile.trim().length < 10) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please type a message of at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Header Banner */}
      <section className="contact-header-section">
        <div className="container text-center">
          <div className="badge-neon header-badge">
            <Building2 size={14} />
            <span>24/7 CUSTOMER SUPPORT & STORES</span>
          </div>

          <h1 className="contact-main-heading">
            CONTACT QUICKMEND
          </h1>

          <p className="contact-main-desc">
            Connect directly with our customer care team, visit a local QuickMend store, or reach out on WhatsApp for instant assistance.
          </p>
        </div>
      </section>

      {/* Direct Contact Cards Bar */}
      <section className="container section-padding-sm contact-cards-section">
        <div className="contact-cards-grid">
          {/* Phone Card */}
          <div className="glass-card contact-channel-card">
            <div className="channel-icon-box">
              <Phone size={24} />
            </div>
            <span className="channel-label">PHONE HELPLINE</span>
            <a href="tel:9279041718" className="channel-value tel-link">
              9279041718
            </a>
            <p className="channel-sub">Mon - Sun: 8:00 AM - 9:00 PM IST</p>
          </div>

          {/* Email Card */}
          <div className="glass-card contact-channel-card">
            <div className="channel-icon-box">
              <Mail size={24} />
            </div>
            <span className="channel-label">EMAIL SUPPORT</span>
            <a href="mailto:replypalak525@gmail.com" className="channel-value mail-link">
              replypalak525@gmail.com
            </a>
            <p className="channel-sub">Quick responses within 2 business hours</p>
          </div>

          {/* WhatsApp Card */}
          <div className="glass-card contact-channel-card whatsapp-card">
            <div className="channel-icon-box whatsapp-box">
              <MessageCircle size={24} />
            </div>
            <span className="channel-label whatsapp-label">WHATSAPP CHAT</span>
            <a 
              href="https://wa.me/919279041718?text=Hello%20QuickMend%2C%20I%20need%20assistance%20with%20my%20appliance%20repair."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whatsapp-btn"
            >
              <span>CHAT WITH US ON WHATSAPP →</span>
            </a>
            <p className="channel-sub">Instant messaging & diagnostic support</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container section-padding-sm contact-form-section">
        <div className="glass-card contact-form-wrapper">
          <div className="contact-form-header">
            <h2 className="form-heading">Send Us a Direct Message</h2>
            <p className="form-subtext">Have a query, feedback, or enterprise servicing request? Send us a message below.</p>
          </div>

          {isSubmitted ? (
            <div className="contact-success-state">
              <CheckCircle2 size={48} className="success-icon" />
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out to QuickMend. Our support team will respond to <strong>{formData.email}</strong> or call <strong>{formData.mobile}</strong> shortly.</p>
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', mobile: '', email: '', subject: '', message: '' });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="contact-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
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

              <div className="form-grid-2">
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

                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="e.g. Appliance Service Query, Bulk Repair"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  rows={4}
                  className="form-textarea"
                  placeholder="How can QuickMend assist you today?"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn-primary full-width submit-btn">
                <Send size={18} />
                <span>SEND MESSAGE →</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
