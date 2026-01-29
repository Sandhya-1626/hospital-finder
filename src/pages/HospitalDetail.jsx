import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Shield, Droplets, User, Clock, Navigation as NavIcon, Share2, Phone } from 'lucide-react';
import { hospitals } from '../data/mockData';

const HospitalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loc = useLocation();
    const hospital = hospitals.find(h => h.id === parseInt(id));
    const isEmergency = loc.state?.emergency;

    if (!hospital) return <div className="screen">Hospital not found</div>;

    const handleShare = () => {
        alert(`Sharing ${hospital.name} details with family!`);
    };

    return (
        <div className="screen" style={{ padding: 0 }}>
            {/* Header Image Area */}
            <div style={{
                height: '240px',
                background: 'linear-gradient(rgba(15, 23, 42, 0.2), var(--bg-dark)), url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(-1)}
                    className="glass-card"
                    style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ArrowLeft size={20} />
                </motion.button>

                {isEmergency && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                            background: '#ef4444',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: 'bold',
                            alignSelf: 'flex-end',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                        }}
                    >
                        <Phone size={16} /> EMERGENCY MODE
                    </motion.div>
                )}
            </div>

            <div style={{ padding: '24px', marginTop: '-40px' }}>
                <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>{hospital.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', marginBottom: '24px' }}>
                    <MapPin size={16} />
                    <span style={{ fontSize: '14px' }}>{hospital.address}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <div className="glass-card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                        <Shield size={20} color="var(--primary)" />
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Insurance</p>
                            <p style={{ fontSize: '14px', fontWeight: '600' }}>{hospital.insurance.length} Providers</p>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                        <Droplets size={20} color="#ef4444" />
                        <div>
                            <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Blood Bank</p>
                            <p style={{ fontSize: '14px', fontWeight: '600' }}>{hospital.bloodBank.available ? 'Available' : 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {hospital.bloodBank.available && (
                    <div style={{ marginBottom: '32px' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '12px' }}>AVAILABLE BLOOD GROUPS</p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {hospital.bloodBank.groups.map(bg => (
                                <span key={bg} style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>
                                    {bg}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ marginBottom: '100px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '12px' }}>SPECIALISTS AT THIS HOSPITAL</p>
                    {hospital.doctors.map((d, i) => (
                        <div key={i} className="glass-card" style={{ padding: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', background: 'var(--glass)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={20} color="var(--primary)" />
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600' }}>{d.name}</p>
                                    <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{d.spec}</p>
                                </div>
                            </div>
                            <button
                                style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '600' }}
                                onClick={() => alert(`Booking appointment with ${d.name}`)}
                            >
                                Book
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, var(--bg-dark), transparent)',
                maxWidth: '480px',
                margin: '0 auto',
                display: 'flex',
                gap: '12px'
            }}>
                <button className="primary-btn" style={{ flex: 2 }} onClick={() => navigate(`/navigation/${hospital.id}`)}>
                    <NavIcon size={18} /> Start Navigation
                </button>
                <button
                    onClick={handleShare}
                    className="glass-card"
                    style={{ flex: 1, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto' }}
                >
                    <Share2 size={24} color="var(--primary)" />
                </button>
            </div>
        </div>
    );
};

export default HospitalDetail;
