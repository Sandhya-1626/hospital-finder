import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Flame, ArrowRight, HeartPulse, Brain, Stethoscope, Thermometer, Bandage, Wind, Sparkles, Eye, AlertCircle } from 'lucide-react';
import { symptoms } from '../data/mockData';

// Dynamic icon mapper
const IconMap = {
    HeartPulse: HeartPulse,
    Brain: Brain,
    Stethoscope: Stethoscope, // Fixed typo
    Thermometer: Thermometer,
    Bandage: Bandage,
    Wind: Wind,
    Sparkles: Sparkles,
    Eye: Eye
};

const SymptomSelection = () => {
    const [selected, setSelected] = useState(null);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleContinue = () => {
        if (selected || query) {
            const spec = selected ? selected.specialization : 'General Physician';
            navigate('/recommendations', { state: { specialization: spec, query } });
        }
    };

    return (
        <div className="screen">
            <div style={{ marginBottom: '32px' }}>
                <h1 className="text-gradient" style={{ fontSize: '28px', marginBottom: '8px' }}>How are you feeling?</h1>
                <p style={{ color: 'var(--text-dim)' }}>Select your symptoms for better results</p>
            </div>

            <div className="input-group" style={{ marginBottom: '32px' }}>
                <div style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} size={18} color="var(--text-dim)" />
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Search symptoms (e.g. fever, pain)"
                        style={{ paddingLeft: '48px' }}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                flex: 1,
                marginBottom: '100px'
            }}>
                {symptoms.map((s) => {
                    const Icon = IconMap[s.icon] || HeartPulse;
                    const isSelected = selected?.id === s.id;

                    return (
                        <motion.div
                            key={s.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelected(s)}
                            className="glass-card"
                            style={{
                                padding: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                                textAlign: 'center',
                                borderColor: isSelected ? 'var(--primary)' : 'var(--glass-border)',
                                background: isSelected ? 'rgba(14, 165, 233, 0.1)' : 'var(--bg-card)'
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Icon size={24} color={isSelected ? 'white' : 'var(--text-dim)'} />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '500', color: isSelected ? 'white' : 'var(--text-dim)' }}>{s.label}</span>
                        </motion.div>
                    );
                })}
            </div>

            <div style={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '24px',
                background: 'linear-gradient(to top, var(--bg-dark), transparent)',
                maxWidth: '480px',
                margin: '0 auto'
            }}>
                <button
                    className="primary-btn"
                    disabled={!selected && !query}
                    style={{ opacity: (!selected && !query) ? 0.5 : 1 }}
                    onClick={handleContinue}
                >
                    Find Doctors <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default SymptomSelection;
