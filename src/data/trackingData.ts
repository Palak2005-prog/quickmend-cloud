export interface TrackingStep {
  stepNumber: number;
  title: string;
  description: string;
}

export const TIMELINE_STEPS: TrackingStep[] = [
  { stepNumber: 1, title: "Booking Received", description: "Your repair request has been logged into the QuickMend service network." },
  { stepNumber: 2, title: "Pickup Scheduled", description: "A certified technician is assigned and pickup timing is confirmed." },
  { stepNumber: 3, title: "Appliance Received", description: "Your appliance has been received at the nearest QuickMend tech hub." },
  { stepNumber: 4, title: "Diagnosis", description: "Detailed multi-point inspection to pinpoint circuit, mechanical, or gas faults." },
  { stepNumber: 5, title: "Repair In Progress", description: "Genuine spare parts replacement and precision servicing underway." },
  { stepNumber: 6, title: "Quality Check", description: "Rigorous load testing, safety check, and performance validation." },
  { stepNumber: 7, title: "Ready for Delivery", description: "Repaired appliance packaged cleanly and scheduled for doorstep dispatch." },
  { stepNumber: 8, title: "Delivered", description: "Successfully delivered back to doorstep with QuickMend service warranty." }
];

export interface TrackingRecord {
  id: string;
  customerName: string;
  appliance: string;
  brand: string;
  problem: string;
  city: string;
  currentStep: number;
  bookingDate: string;
  estimatedCompletion: string;
  technicianName: string;
  technicianPhone: string;
  pickupRequired: boolean;
  statusLogs: {
    stepNumber: number;
    timestamp: string;
    note: string;
  }[];
}

export const DEMO_TRACKING_RECORDS: Record<string, TrackingRecord> = {
  "QM-849201": {
    id: "QM-849201",
    customerName: "Aarav Sharma",
    appliance: "Refrigerator",
    brand: "LG Inverter Linear",
    problem: "Cooling stopped completely, compressor making faint buzzing noise.",
    city: "New Delhi",
    currentStep: 5,
    bookingDate: "2026-08-07 10:30 AM",
    estimatedCompletion: "2026-08-09 05:00 PM",
    technicianName: "Vikram R. (Senior HVAC Specialist)",
    technicianPhone: "9279041718",
    pickupRequired: true,
    statusLogs: [
      { stepNumber: 1, timestamp: "Aug 07, 10:30 AM", note: "Booking confirmed via web portal." },
      { stepNumber: 2, timestamp: "Aug 07, 02:15 PM", note: "Executive assigned for doorstep pickup." },
      { stepNumber: 3, timestamp: "Aug 08, 09:45 AM", note: "Safely received at Connaught Place Service Hub." },
      { stepNumber: 4, timestamp: "Aug 08, 11:20 AM", note: "Diagnosed damaged relay capacitor & low refrigerant pressure." },
      { stepNumber: 5, timestamp: "Aug 09, 09:15 AM", note: "Replacing capacitor & performing vacuum leak test + gas refill." }
    ]
  },
  "QM-554109": {
    id: "QM-554109",
    customerName: "Priya Sundaram",
    appliance: "Washing Machine",
    brand: "Bosch Front Load 8kg",
    problem: "Heavy drum vibration during spin cycle and water drainage error E18.",
    city: "Bengaluru",
    currentStep: 7,
    bookingDate: "2026-08-06 04:15 PM",
    estimatedCompletion: "2026-08-09 06:30 PM",
    technicianName: "Rohan Nair (Laundry Specialist)",
    technicianPhone: "9279041718",
    pickupRequired: true,
    statusLogs: [
      { stepNumber: 1, timestamp: "Aug 06, 04:15 PM", note: "Booking logged." },
      { stepNumber: 2, timestamp: "Aug 06, 06:00 PM", note: "Doorstep pickup completed." },
      { stepNumber: 3, timestamp: "Aug 07, 10:00 AM", note: "Arrived at Indiranagar Tech Station." },
      { stepNumber: 4, timestamp: "Aug 07, 01:30 PM", note: "Diagnosed clogged drain pump & worn shock absorber damper." },
      { stepNumber: 5, timestamp: "Aug 08, 11:00 AM", note: "Installed original Bosch dampers & cleaned pump assembly." },
      { stepNumber: 6, timestamp: "Aug 08, 04:00 PM", note: "Passed 1400 RPM spin test with zero vibration." },
      { stepNumber: 7, timestamp: "Aug 09, 10:00 AM", note: "Out for delivery slot 2:00 PM - 5:00 PM." }
    ]
  },
  "QM-329104": {
    id: "QM-329104",
    customerName: "Rajesh Mukherjee",
    appliance: "AC Repair",
    brand: "Daikin 1.5 Ton Split AC",
    problem: "Indoor unit leaking water continuously, cooling delayed.",
    city: "Kolkata",
    currentStep: 8,
    bookingDate: "2026-08-05 11:00 AM",
    estimatedCompletion: "2026-08-06 04:00 PM",
    technicianName: "Subhash Ghosh (Master Technician)",
    technicianPhone: "9279041718",
    pickupRequired: false,
    statusLogs: [
      { stepNumber: 1, timestamp: "Aug 05, 11:00 AM", note: "Doorstep service request confirmed." },
      { stepNumber: 2, timestamp: "Aug 05, 01:00 PM", note: "Technician dispatched to customer home." },
      { stepNumber: 3, timestamp: "Aug 05, 02:30 PM", note: "On-site inspection started." },
      { stepNumber: 4, timestamp: "Aug 05, 03:00 PM", note: "Diagnosed blocked drain line and dusty cooling coils." },
      { stepNumber: 5, timestamp: "Aug 05, 04:15 PM", note: "Performed high-pressure foam jet wash & cleared drain line." },
      { stepNumber: 6, timestamp: "Aug 05, 05:00 PM", note: "Temperature drop tested: 16°C grill temp achieved." },
      { stepNumber: 7, timestamp: "Aug 05, 05:30 PM", note: "Customer sign-off acquired." },
      { stepNumber: 8, timestamp: "Aug 05, 05:45 PM", note: "Service completed with 90-day QuickMend warranty." }
    ]
  }
};
