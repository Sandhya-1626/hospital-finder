import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || '1234567890';

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      navigate('/location-permission');
    }
  };

  return (
    <div className="screen">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col justify-center gap-8"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            style={{
              width: '80px',
              height: '80px',
              background: 'rgba(16, 185, 129, 0.2)',
              borderRadius: '24px',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--accent)'
            }}
          >
            <ShieldCheck size={32} color="var(--accent)" />
          </motion.div>
          <h1 className="text-gradient" style={{ fontSize: '32px', marginBottom: '12px' }}>Verify OTP</h1>
          <p style={{ color: 'var(--text-dim)' }}>
            Sent to <span style={{ color: 'white' }}>+91 {phoneNumber}</span>
          </p>
        </div>

        <div className="glass-card">
          <form onSubmit={handleVerify}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  className="glass-input"
                  style={{ width: '60px', height: '60px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  maxLength={1}
                />
              ))}
            </div>

            <button type="submit" className="primary-btn">
              Verify & Continue <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            {timer > 0 ? (
              <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>
                Resend code in <span style={{ color: 'var(--primary)' }}>{timer}s</span>
              </p>
            ) : (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  margin: '0 auto'
                }}
                onClick={() => setTimer(30)}
              >
                <RefreshCw size={14} /> Resend OTP
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
