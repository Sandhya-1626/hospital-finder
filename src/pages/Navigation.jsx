import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, PhoneCall } from 'lucide-react';
import L from 'leaflet';
import { hospitals } from '../data/mockData';

// Fix for leaflet markers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center }) => {
    const map = useMap();
    map.setView(center, 15);
    return null;
}

const Navigation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const hospital = hospitals.find(h => h.id === parseInt(id));

    // Mock current location for demo (near hospitals)
    const [userPos] = useState([12.9716, 77.5946]); // Bangalore
    const [destPos] = useState([12.9816, 77.6046]);

    if (!hospital) return <div className="screen">Hospital not found</div>;

    return (
        <div className="screen" style={{ padding: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                right: '24px',
                zIndex: 1000,
                display: 'flex',
                gap: '12px'
            }}>
                <button
                    onClick={() => navigate(-1)}
                    className="glass-card"
                    style={{ width: '48px', height: '48px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="glass-card" style={{ flex: 1, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <NavIcon size={20} />
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>To: {hospital.name}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Arriving in {hospital.travelTime}</p>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
                <MapContainer center={userPos} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <Marker position={userPos}>
                        <Popup>You are here</Popup>
                    </Marker>
                    <Marker position={destPos}>
                        <Popup>{hospital.name}</Popup>
                    </Marker>
                    <ChangeView center={userPos} />
                </MapContainer>
            </div>

            <div style={{
                padding: '24px',
                background: 'var(--bg-dark)',
                borderTop: '1px solid var(--glass-border)',
                zIndex: 1000
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ color: 'var(--primary)' }}><Clock size={24} /></div>
                        <div>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{hospital.travelTime}</p>
                            <p style={{ fontSize: '14px', color: 'var(--text-dim)' }}>{hospital.distance} km • Fast route</p>
                        </div>
                    </div>
                    <button
                        className="emergency-btn"
                        style={{ width: '60px', height: '60px' }}
                        onClick={() => window.open(`tel:911`)}
                    >
                        <PhoneCall size={24} />
                    </button>
                </div>

                <button className="primary-btn" onClick={() => navigate('/symptoms')}>
                    Exit Navigation
                </button>
            </div>
        </div>
    );
};

// Add styles to head for Leaflet bypass
const style = document.createElement('style');
style.innerHTML = `
  .leaflet-container {
    background: #0f172a !important;
  }
`;
document.head.appendChild(style);

const NavIcon = ({ size }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
    );
};

export default Navigation;
