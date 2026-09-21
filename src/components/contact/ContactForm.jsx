import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Phone, Send, AlertCircle, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanMobile = formData.mobile.replace(/[\s-+]/g, '');
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!phoneRegex.test(cleanMobile) && cleanMobile.length !== 10) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please type your message or inquiry';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl bg-gradient-to-b from-[#0B1730] to-[#040D20] border border-[#00E5FF]/30 p-6 sm:p-10 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_25px_rgba(0,229,255,0.1)] relative overflow-hidden"
    >
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E5FF]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="border-b border-slate-800/80 pb-6 mb-8 text-center sm:text-left">
        <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-wider uppercase inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Direct Customer Desk
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Send Us a Message
        </h3>
        <p className="text-sm text-[#9FB1C7] mt-1">
          Have questions regarding an upcoming repair, appliance warranty, or service location? Write to us below.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-2xl bg-[#061024] border border-[#00E5FF]/40 text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mx-auto shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
            <p className="text-sm text-[#9FB1C7] max-w-md mx-auto">
              Thank you for reaching out to QuickMend. Our customer support executive will review your inquiry and connect back with you promptly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-[#0B1730] hover:bg-[#102244] border border-[#00E5FF]/30 text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Name <span className="text-[#00E5FF]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                    errors.name ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Number <span className="text-[#00E5FF]">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  maxLength={10}
                  className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                    errors.mobile ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                  }`}
                />
                {errors.mobile && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.mobile}
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

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Subject <span className="text-[#00E5FF]">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Service Query / Appliance Status Inquiry"
                className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                  errors.subject ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                }`}
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Message <span className="text-[#00E5FF]">*</span>
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message details here..."
                className={`w-full px-4 py-3 rounded-xl bg-[#061024] text-white placeholder-slate-500 border text-sm focus:outline-none focus:ring-1 focus:ring-[#00E5FF] transition-all ${
                  errors.message ? 'border-red-500/80' : 'border-[#00E5FF]/20 focus:border-[#00E5FF]'
                }`}
              ></textarea>
              {errors.message && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#00b4d8] text-[#020817] font-extrabold text-sm shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#020817] border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

          </form>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
