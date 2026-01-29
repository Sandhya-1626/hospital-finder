export const symptoms = [
    { id: 'chest_pain', label: 'Chest Pain', icon: 'HeartPulse', specialization: 'Cardiologist' },
    { id: 'headache', label: 'Severe Headache', icon: 'Brain', specialization: 'Neurologist' },
    { id: 'stomach_pain', label: 'Stomach Pain', icon: 'Stethoscope', specialization: 'Gastroenterologist' },
    { id: 'fever', label: 'High Fever', icon: 'Thermometer', specialization: 'General Physician' },
    { id: 'injury', label: 'Physical Injury', icon: 'Bandage', specialization: 'Orthopedic' },
    { id: 'breathing', label: 'Breathing Difficulty', icon: 'Wind', specialization: 'Pulmonologist' },
    { id: 'skin', label: 'Skin Rash', icon: 'Sparkles', specialization: 'Dermatologist' },
    { id: 'eye', label: 'Blurred Vision', icon: 'Eye', specialization: 'Ophthalmologist' },
];

export const hospitals = [
    {
        id: 1,
        name: "City General Hospital",
        address: "123 Healthcare Blvd, Medical District",
        distance: 1.2,
        travelTime: "8 mins",
        insurance: ["Star Health", "Max Life", "HDFC ERGO"],
        bloodBank: { available: true, groups: ["A+", "O+", "B+", "AB+"] },
        emergency: true,
        rating: 4.8,
        doctors: [
            { name: "Dr. Sarah Smith", spec: "Cardiologist", exp: 12, fee: 800, online: true },
            { name: "Dr. John Doe", spec: "General Physician", exp: 8, fee: 500, online: false }
        ]
    },
    {
        id: 2,
        name: "Lifeline Medical Center",
        address: "45 Wellness St, North Wing",
        distance: 2.5,
        travelTime: "15 mins",
        insurance: ["Star Health", "Bajaj Allianz"],
        bloodBank: { available: true, groups: ["B-", "O+", "A-"] },
        emergency: true,
        rating: 4.5,
        doctors: [
            { name: "Dr. Mike Ross", spec: "Neurologist", exp: 15, fee: 1200, online: true },
            { name: "Dr. Jane Foster", spec: "Orthopedic", exp: 10, fee: 900, online: true }
        ]
    },
    {
        id: 3,
        name: "Sunshine Children's Hospital",
        address: "88 Pediatric Way, East Side",
        distance: 4.1,
        travelTime: "22 mins",
        insurance: ["All Major Insurances"],
        bloodBank: { available: false, groups: [] },
        emergency: false,
        rating: 4.9,
        doctors: [
            { name: "Dr. Amy Pond", spec: "General Physician", exp: 6, fee: 400, online: true }
        ]
    }
];
