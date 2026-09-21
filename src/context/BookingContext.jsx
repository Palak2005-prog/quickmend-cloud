import React, { createContext, useContext, useState, useEffect } from 'react';
import { timelineStages } from '../data/trackingData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    try {
      const local = localStorage.getItem('quickmend_bookings');
      if (local) {
        return JSON.parse(local);
      }
      return {};
    } catch {
      return {};
    }
  });

  const [lastCreatedBookingId, setLastCreatedBookingId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('quickmend_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn("Local storage not available", e);
    }
  }, [bookings]);

  const createBooking = (formData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `QM-2026-${randomNum}`;

    const newRecord = {
      repairId: newId,
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      address: formData.address,
      appliance: formData.appliance,
      brand: formData.brand || "Standard Brand",
      issue: formData.problemDescription,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      pickupRequired: formData.pickupRequired,
      photoDataUrl: formData.photoDataUrl || null,
      photoFileName: formData.photoFileName || '',
      currentStep: 1,
      currentStatus: "Booking Received",
      bookedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      estimatedCompletion: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      pickupType: formData.pickupRequired ? "Doorstep Pickup & 24h Return" : "Self-Drop at Hub",
      assignedTechnician: "Assigning Local Engineer...",
      serviceCenter: `QuickMend Certified Center - ${formData.city}`,
      updates: [
        {
          step: 1,
          date: `${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`,
          note: "Repair request received and logged into QuickMend system. Dispatch team notified for 24-hour turnaround."
        }
      ]
    };

    setBookings(prev => ({
      [newId]: newRecord,
      ...prev
    }));

    setLastCreatedBookingId(newId);
    return newRecord;
  };

  const updateBookingStatus = (repairId, newStep, technicianName, noteText) => {
    if (!repairId || !bookings[repairId]) return;

    const stepObj = timelineStages.find(s => s.step === Number(newStep)) || { title: `Stage ${newStep}` };

    setBookings(prev => {
      const existing = prev[repairId];
      if (!existing) return prev;

      const dateStr = `${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
      
      const newUpdate = {
        step: Number(newStep),
        date: dateStr,
        note: noteText || `Status updated to ${stepObj.title}`
      };

      const existingUpdates = existing.updates ? [...existing.updates] : [];
      // Replace existing update for this step or append
      const filteredUpdates = existingUpdates.filter(u => u.step !== Number(newStep));
      filteredUpdates.push(newUpdate);
      filteredUpdates.sort((a, b) => a.step - b.step);

      return {
        ...prev,
        [repairId]: {
          ...existing,
          currentStep: Number(newStep),
          currentStatus: stepObj.title,
          assignedTechnician: technicianName || existing.assignedTechnician,
          updates: filteredUpdates
        }
      };
    });
  };

  const deleteBooking = (repairId) => {
    setBookings(prev => {
      const copy = { ...prev };
      delete copy[repairId];
      return copy;
    });
  };

  const getBookingById = (id) => {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    return bookings[cleanId] || null;
  };

  const getAllBookingsList = () => {
    return Object.values(bookings);
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      createBooking,
      updateBookingStatus,
      deleteBooking,
      getBookingById,
      getAllBookingsList,
      lastCreatedBookingId
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
