import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      navigate('/verify-otp', { state: { phoneNumber } });
    }
  };

  return (
    <div className="screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col justify-center gap-8"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              borderRadius: '24px',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(14, 165, 233, 0.3)'
            }}
          >
            <Phone size={32} color="white" />
          </motion.div>
          <h1 className="text-gradient" style={{ fontSize: '32px', marginBottom: '12px' }}>Welcome back</h1>
          <p style={{ color: 'var(--text-dim)' }}>Quickly find the best healthcare near you</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card">
          <div className="input-group">
            <label>Mobile Number</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
                fontSize: '16px'
              }}>+91</span>
              <input
                type="tel"
                className="glass-input"
                placeholder="Enter your number"
                style={{ paddingLeft: '54px' }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-btn">
            Send OTP <ArrowRight size={18} />
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '14px',
          color: 'var(--text-dim)'
        }}>
          By continuing, you agree to our <span style={{ color: 'var(--primary)' }}>Terms & Privacy</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
