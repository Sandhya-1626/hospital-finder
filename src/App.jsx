import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import OTPVerification from './pages/OTPVerification';
import LocationPermission from './pages/LocationPermission';
import SymptomSelection from './pages/SymptomSelection';
import RecommendationList from './pages/RecommendationList';
import HospitalDetail from './pages/HospitalDetail';
import Navigation from './pages/Navigation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/location-permission" element={<LocationPermission />} />
        <Route path="/symptoms" element={<SymptomSelection />} />
        <Route path="/recommendations" element={<RecommendationList />} />
        <Route path="/hospital/:id" element={<HospitalDetail />} />
        <Route path="/navigation/:id" element={<Navigation />} />
      </Routes>
    </Router>
  );
}

export default App;
