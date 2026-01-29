import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Star, MapPin, Clock, ArrowRight, User, PhoneCall, AlertTriangle } from 'lucide-react';
import { hospitals } from '../data/mockData';

const RecommendationList = () => {
    const loc = useLocation();
    const navigate = useNavigate();
    const { specialization, query } = loc.state || { specialization: 'General Physician', query: '' };

    const [filter, setFilter] = useState('distance'); // distance, fee, rating

    const filteredHospitals = useMemo(() => {
        // In a real app, this would filter doctors within hospitals
        let list = [...hospitals];
        if (filter === 'distance') list.sort((a, b) => a.distance - b.distance);
        if (filter === 'rating') list.sort((a, b) => b.rating - a.rating);
        return list;
    }, [filter]);

    return (
        <div className="screen" style={{ paddingBottom: '100px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '24px', marginBottom: '4px' }}>Recommendations</h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>Showing {specialization} specialists</p>
                </div>
                <div className="glass-card" style={{ padding: '10px' }}>
                    <Filter size={20} color="var(--primary)" />
                </div>
            </header>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
                {['distance', 'rating', 'fee'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            background: filter === f ? 'var(--primary)' : 'var(--glass)',
                            border: '1px solid',
                            borderColor: filter === f ? 'var(--primary)' : 'var(--glass-border)',
                            color: filter === f ? 'white' : 'var(--text-dim)',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'capitalize',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Sort by {f}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredHospitals.map((h, idx) => (
                    <motion.div
                        key={h.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card"
                        style={{ padding: '20px' }}
                        onClick={() => navigate(`/hospital/${h.id}`)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <h3 style={{ margin: 0, fontSize: '18px' }}>{h.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                                <Star size={16} fill="#fbbf24" />
                                <span style={{ fontWeight: 'bold' }}>{h.rating}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', color: 'var(--text-dim)', fontSize: '13px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={14} /> {h.distance} km
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={14} /> {h.travelTime}
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '8px' }}>AVAILABLE DOCTORS</p>
                            {h.doctors.filter(d => d.spec === specialization || specialization === 'General Physician').map((d, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px', marginBottom: filter === 'fee' ? '4px' : '0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--glass)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={18} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '14px', fontWeight: '600' }}>{d.name}</p>
                                            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{d.exp} yrs exp • ₹{d.fee}</p>
                                        </div>
                                    </div>
                                    {d.online && <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '10px' }}>Online</span>}
                                </div>
                            ))}
                        </div>

                        <button className="primary-btn" style={{ padding: '12px' }}>
                            View Details <ArrowRight size={16} />
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Floating Emergency Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                className="emergency-btn"
                style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}
                onClick={() => {
                    const nearest = hospitals.reduce((prev, curr) => prev.distance < curr.distance ? prev : curr);
                    navigate(`/hospital/${nearest.id}`, { state: { emergency: true } });
                }}
            >
                <PhoneCall size={32} />
            </motion.button>
        </div>
    );
};

export default RecommendationList;
