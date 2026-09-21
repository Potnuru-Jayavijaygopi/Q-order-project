import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import './CheckYourEmailPage.css';

const generateRandomOtp = () => {
  
  let otp = Math.floor(1000 + Math.random() * 9000).toString();
  if (otp === '8876') otp = '5391';
  return otp;
};

const CheckYourEmailPage = ({ onVerifySuccess, onBackToForgot }) => {
  const [generatedOtp, setGeneratedOtp] = useState(() => generateRandomOtp());
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const digits = generatedOtp.split('');
    setOtpValues(digits);
  }, [generatedOtp]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (onVerifySuccess) {
      onVerifySuccess();
    }
  };

  const handleResendOtp = () => {
    const newOtp = generateRandomOtp();
    setGeneratedOtp(newOtp);
    alert(`New verification code sent to your email: ${newOtp}`);
  };

  return (
    <div className="check-email-page-wrapper">
      <div className="check-email-card-container">
        {onBackToForgot && (
          <button className="forgot-back-btn" onClick={onBackToForgot} aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
        )}

        <h1 className="check-email-title">Check your email</h1>
        <p className="check-email-subtitle">We have sent the code to your email</p>

        <form onSubmit={handleVerify} className="check-email-form">
          
          <div className="otp-inputs-group">
            {otpValues.map((digit, idx) => (
              <input
                key={idx}
                ref={inputRefs[idx]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`otp-box-input ${digit ? 'filled' : ''} ${idx === 3 ? 'active-border' : ''}`}
              />
            ))}
          </div>

          <button type="submit" className="pill-verify-btn">
            Verify
          </button>

          <button 
            type="button" 
            className="pill-send-again-btn"
            onClick={handleResendOtp}
          >
            Send again
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckYourEmailPage;
