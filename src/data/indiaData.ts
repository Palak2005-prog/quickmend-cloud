export interface StateCityData {
  state: string;
  cities: string[];
}

export const INDIA_STATES_AND_CITIES: Record<string, string[]> = {
  "Andaman and Nicobar Islands": ["Port Blair", "Havelock Island", "Car Nicobar", "Diglipur", "Mayabunder"],
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", 
    "Tirupati", "Rajahmundry", "Kakinada", "Kadapa", "Anantapur", 
    "Eluru", "Vizianagaram", "Ongole", "Machilipatnam", "Tenali", "Chittoor"
  ],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Tezu", "Bomdila"],
  "Assam": [
    "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", 
    "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "Karimganj", "Diphu"
  ],
  "Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", 
    "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar", 
    "Chhapra", "Munger", "Saharsa", "Sasaram", "Hajipur", "Bettiah", "Siwan"
  ],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": [
    "Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", 
    "Durg", "Raigarh", "Jagdalpur", "Ambikapur", "Dhamtari"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi (NCT)": [
    "New Delhi", "North Delhi", "South Delhi", "East Delhi", 
    "West Delhi", "Central Delhi", "Dwarka", "Rohini", "Janakpuri", 
    "Connaught Place", "Vasant Kunj", "Lajpat Nagar", "Saket", "Pitampura"
  ],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Calangute"],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", 
    "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari", 
    "Bharuch", "Morbi", "Mehsana", "Bhuj", "Porbandar", "Vapi"
  ],
  "Haryana": [
    "Gurugram (Gurgaon)", "Faridabad", "Panipat", "Ambala", "Yamunanagar", 
    "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Rewari"
  ],
  "Himachal Pradesh": [
    "Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", 
    "Manali", "Hamirpur", "Bilaspur", "Baddi", "Una", "Chamba"
  ],
  "Jammu and Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", 
    "Kathua", "Sopore", "Rajouri", "Poonch"
  ],
  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", 
    "Hazaribagh", "Giridih", "Ramgarh", "Phusro", "Chai Basa", "Dumka", "Medininagar"
  ],
  "Karnataka": [
    "Bengaluru (Bangalore)", "Mysuru (Mysore)", "Hubballi-Dharwad", "Mangaluru (Mangalore)", 
    "Belagavi (Belgaum)", "Kalaburagi (Gulbarga)", "Davanagere", "Ballari (Bellary)", 
    "Shimoga", "Tumakuru", "Udupi", "Bidar", "Hospet"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi (Cochin)", "Kozhikode (Calicut)", "Thrissur", 
    "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram", "Thalassery"
  ],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Amini"],
  "Madhya Pradesh": [
    "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", 
    "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Singrauli", "Burhanpur", "Chhindwara"
  ],
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Thane", "Pimpri-Chinchwad", 
    "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad (Chhatrapati Sambhajinagar)", 
    "Navi Mumbai", "Solapur", "Kolhapur", "Amravati", "Nanded", "Sangli", "Jalgaon", "Akola"
  ],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal", "Bishnupur"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", 
    "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"
  ],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", 
    "Mohali (SAS Nagar)", "Hoshiarpur", "Pathankot", "Batala", "Moga", "Abohar"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", 
    "Udaipur", "Bhilwara", "Alwar", "Sikar", "Sri Ganganagar", "Pali", "Bharatpur"
  ],
  "Sikkim": ["Gangtok", "Namchi", "Geyzing", "Mangan"],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli (Trichy)", "Salem", 
    "Tiruppur", "Erode", "Tirunelveli", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Kanchipuram"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", 
    "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"
  ],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", 
    "Meerut", "Prayagraj (Allahabad)", "Bareilly", "Aligarh", "Moradabad", 
    "Noida", "Greater Noida", "Gorakhpur", "Jhansi", "Mathura", "Muzaffarnagar", "Saharanpur", "Ayodhya"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", 
    "Rishikesh", "Nainital", "Kashipur", "Pithoragarh"
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", 
    "Bardhaman", "Malda", "Kharagpur", "Berhampore", "Haldia", "Habra", "Kharagpur"
  ]
};

export const ALL_INDIA_STATES: string[] = Object.keys(INDIA_STATES_AND_CITIES).sort();
