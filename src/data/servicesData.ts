export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  badge?: string;
  commonIssues: string[];
  estimatedTime: string;
  startingPrice: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "refrigerator",
    title: "Refrigerator Repair",
    category: "Cooling & Refrigeration",
    description: "Professional repair assistance for cooling problems, leakage, unusual noises and other refrigerator issues.",
    iconName: "Refrigerator",
    badge: "Popular Service",
    commonIssues: ["Compressor issues & gas charging", "Excessive frost or no cooling", "Water leaking on floor", "Thermostat failure & noisy fan"],
    estimatedTime: "60 - 90 Mins",
    startingPrice: "₹399"
  },
  {
    id: "washing-machine",
    title: "Washing Machine Repair",
    category: "Laundry Appliances",
    description: "Repair assistance for washing, spinning, drainage, vibration and other washing machine problems.",
    iconName: "WashingMachine",
    badge: "Pickup Available",
    commonIssues: ["Drum not spinning or drain pump failure", "Heavy vibration and unbalance", "Water inlet valve leak", "Control panel error codes"],
    estimatedTime: "45 - 90 Mins",
    startingPrice: "₹349"
  },
  {
    id: "ac-repair",
    title: "AC Repair",
    category: "Climate Control",
    description: "Get help with cooling problems, water leakage, unusual sounds and other AC issues.",
    iconName: "Wind",
    badge: "Seasonal Servicing",
    commonIssues: ["Gas leakage & pressure check", "Water leakage inside room", "Compressor trip / PCB fault", "Jet wash deep servicing"],
    estimatedTime: "60 - 120 Mins",
    startingPrice: "₹499"
  },
  {
    id: "microwave",
    title: "Microwave Repair",
    category: "Kitchen Electronics",
    description: "Professional assistance for heating, display, button and other microwave problems.",
    iconName: "Microwave",
    commonIssues: ["Not heating or sparking inside", "Touchpad / buttons non-responsive", "Turntable plate not rotating", "Power supply & magnetron failure"],
    estimatedTime: "45 - 60 Mins",
    startingPrice: "₹299"
  },
  {
    id: "geyser",
    title: "Geyser Repair",
    category: "Water Heating",
    description: "Get your geyser checked for heating problems, leakage, thermostat issues and more.",
    iconName: "Flame",
    commonIssues: ["Water not heating or low temperature", "Tank or pipe leakage", "Thermostat auto-cut failure", "Electric shock or wiring fault"],
    estimatedTime: "45 - 60 Mins",
    startingPrice: "₹299"
  },
  {
    id: "water-purifier",
    title: "Water Purifier Repair",
    category: "Water & Hygiene",
    description: "Repair assistance for filtration, leakage, water flow and other purifier issues.",
    iconName: "Droplets",
    commonIssues: ["Low water flow or taste issue", "Filter & RO membrane replacement", "Continuous water leakage", "UV lamp or SMPS adaptor fault"],
    estimatedTime: "30 - 60 Mins",
    startingPrice: "₹249"
  },
  {
    id: "tv-repair",
    title: "TV Repair",
    category: "Home Entertainment",
    description: "Get help with display, sound, power and other television-related problems.",
    iconName: "Tv",
    commonIssues: ["Blank screen with sound", "No power or indicator blinking", "Vertical or horizontal lines on panel", "HDMI / Audio jack damage"],
    estimatedTime: "60 - 120 Mins",
    startingPrice: "₹399"
  },
  {
    id: "other-appliances",
    title: "Other Appliances",
    category: "Custom Request",
    description: "Have another appliance that needs attention? Tell QuickMend what needs to be repaired.",
    iconName: "Wrench",
    badge: "Custom Service",
    commonIssues: ["Chimneys & hobs", "Air purifiers & dehumidifiers", "Dishwashers & food processors", "Specialty electronic equipment"],
    estimatedTime: "Varies",
    startingPrice: "₹199"
  }
];
