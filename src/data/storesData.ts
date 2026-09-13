export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  services: string[];
  timing: string;
  pickupAvailable: boolean;
}

export const STORES_DATA: Store[] = [
  {
    id: "qm-delhi-01",
    name: "QuickMend Flagship Hub — Connaught Place",
    address: "B-42, Inner Circle, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["All Appliances", "Express Pickup", "Component Repair", "Warranty Service"],
    timing: "9:00 AM - 8:30 PM",
    pickupAvailable: true
  },
  {
    id: "qm-delhi-02",
    name: "QuickMend Tech Hub — South Extension",
    address: "E-18, Ring Road, South Extension Part 2",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110049",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["Refrigerator", "Washing Machine", "AC Servicing", "TV Panel Repair"],
    timing: "9:30 AM - 8:00 PM",
    pickupAvailable: true
  },
  {
    id: "qm-mum-01",
    name: "QuickMend West Hub — Bandra West",
    address: "104, Hill Road, Opposite St. Andrews, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["AC Repair", "Washing Machine", "Microwave", "Water Purifier"],
    timing: "9:00 AM - 9:00 PM",
    pickupAvailable: true
  },
  {
    id: "qm-mum-02",
    name: "QuickMend Service Center — Andheri East",
    address: "Unit 3, Marol Industrial Area, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400059",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["Commercial Refrigeration", "All Appliances", "Express Repair"],
    timing: "8:30 AM - 8:30 PM",
    pickupAvailable: true
  },
  {
    id: "qm-blr-01",
    name: "QuickMend Tech Hub — Indiranagar",
    address: "742, 100 Feet Road, HAL 2nd Stage, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["All Smart Appliances", "EV Charger Repair", "TV & Audio", "Doorstep Servicing"],
    timing: "9:00 AM - 8:30 PM",
    pickupAvailable: true
  },
  {
    id: "qm-hyd-01",
    name: "QuickMend Care Center — HITECH City",
    address: "Plot 18, Mindspace Road, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["Refrigerator", "AC & HVAC", "Water Purifiers", "Microwaves"],
    timing: "9:00 AM - 8:00 PM",
    pickupAvailable: true
  },
  {
    id: "qm-kol-01",
    name: "QuickMend East Hub — Salt Lake Sector V",
    address: "Block EP & GP, Sector V, Salt Lake City",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700091",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["Washing Machine", "Geyser", "Refrigerator", "TV Repairs"],
    timing: "9:00 AM - 8:00 PM",
    pickupAvailable: true
  },
  {
    id: "qm-chn-01",
    name: "QuickMend South Hub — T. Nagar",
    address: "52, G.N. Chetty Road, T. Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600017",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["AC Inverter Repair", "Water Purifiers", "Refrigeration", "Washing Machines"],
    timing: "9:00 AM - 8:30 PM",
    pickupAvailable: true
  },
  {
    id: "qm-jsr-01",
    name: "QuickMend Service Center — Bistupur",
    address: "Main Road, Near Inner Circle Hotel, Bistupur",
    city: "Jamshedpur",
    state: "Jharkhand",
    pincode: "831001",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["All Appliances", "Home Pickup", "Express Diagnostic"],
    timing: "9:00 AM - 8:00 PM",
    pickupAvailable: true
  },
  {
    id: "qm-jsr-02",
    name: "QuickMend Outlet — Sakchi Hub",
    address: "Kalimati Road, Near Jubilee Park Gate, Sakchi",
    city: "Jamshedpur",
    state: "Jharkhand",
    pincode: "831001",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["Refrigerator", "Washing Machine", "Geyser Repair"],
    timing: "9:30 AM - 7:30 PM",
    pickupAvailable: true
  },
  {
    id: "qm-pune-01",
    name: "QuickMend Care Hub — Viman Nagar",
    address: "Phoenix Market City Annex, Viman Nagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411014",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["AC & Water Heating", "Microwaves", "Washing Machines"],
    timing: "9:00 AM - 8:30 PM",
    pickupAvailable: true
  },
  {
    id: "qm-ahm-01",
    name: "QuickMend Hub — SG Highway",
    address: "Titanium Square, Thaltej Cross Road, SG Highway",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380054",
    phone: "9279041718",
    email: "replypalak525@gmail.com",
    services: ["All Home Appliances", "Component Servicing", "Home Pickup"],
    timing: "9:00 AM - 8:00 PM",
    pickupAvailable: true
  }
];

export const ALL_STATES = Array.from(new Set(STORES_DATA.map(s => s.state))).sort();
