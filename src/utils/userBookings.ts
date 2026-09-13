import type { TrackingRecord } from '../data/trackingData';

const LOCAL_STORAGE_KEY = 'quickmend_user_bookings';

export const getUserBookings = (): TrackingRecord[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as TrackingRecord[];
  } catch (e) {
    console.error('Failed to parse user bookings from localStorage:', e);
    return [];
  }
};

export const saveUserBooking = (record: TrackingRecord): void => {
  try {
    const existing = getUserBookings();
    // Filter out duplicate if ID exists
    const updated = [record, ...existing.filter(b => b.id !== record.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save user booking to localStorage:', e);
  }
};

export const getBookingById = (id: string): TrackingRecord | undefined => {
  const cleanId = id.trim().toUpperCase();
  const bookings = getUserBookings();
  return bookings.find(b => b.id.toUpperCase() === cleanId);
};
