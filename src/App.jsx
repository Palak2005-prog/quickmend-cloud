import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { BookingPage } from './pages/BookingPage';
import { TrackingPage } from './pages/TrackingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { BookingProvider } from './context/BookingContext';
import { ChatbotWidget } from './components/chat/ChatbotWidget';

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-[#020817] text-white selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          
          {/* Floating AI Chatbot Assistant */}
          <ChatbotWidget />

          <Footer />
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
}
