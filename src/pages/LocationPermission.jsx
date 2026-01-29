import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation as NavIcon, Search } from 'lucide-react';

const LocationPermission = () => {
    const [isLocating, setIsLocating] = useState(false);
    const navigate = useNavigate();

    const handleGetLocation = () => {
        setIsLocating(true);
        // Simulate GPS fetch
        setTimeout(() => {
            setIsLocating(false);
            navigate('/symptoms');
        }, 2500);
    };

    return (
        <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <AnimatePresence mode="wait">
                {!isLocating ? (
                    <motion.div
                        key="request"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="flex flex-col gap-8 items-center"
                    >
                        <div style={{ position: 'relative', marginBottom: '40px' }}>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    background: 'rgba(14, 165, 233, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 30px rgba(14, 165, 233, 0.4)'
                                }}>
                                    <MapPin size={40} color="white" />
                                </div>
                            </motion.div>
                        </div>

                        <h1 className="text-gradient" style={{ fontSize: '28px' }}>Enable Location</h1>
                        <p style={{ color: 'var(--text-dim)', maxWidth: '280px', margin: '0 auto 40px' }}>
                            To find the nearest hospitals and doctors, we need your current location.
                        </p>

                        <button onClick={handleGetLocation} className="primary-btn" style={{ maxWidth: '240px' }}>
                            <NavIcon size={18} /> Use Live Location
                        </button>

                        <button
                            onClick={() => navigate('/symptoms')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-dim)',
                                marginTop: '16px',
                                cursor: 'pointer'
                            }}
                        >
                            Enter location manually
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="loading-dots" style={{ marginBottom: '24px' }}>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <h2 style={{ fontSize: '18px', color: 'white' }}>Fetching your location...</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>Connecting to GPS satellites</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LocationPermission;
