import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = ({ onLogin, onSubmitEmail, onBackToLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitEmail) {
      onSubmitEmail(email);
    } else if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="forgot-password-page-wrapper">
      <div className="forgot-password-card-container">
        {onBackToLogin && (
          <button className="forgot-back-btn" onClick={onBackToLogin} aria-label="Go back to login">
            <ChevronLeft size={24} />
          </button>
        )}

        <h1 className="forgot-title">Forgot Password</h1>
        <p className="forgot-subtitle">Please sign in to your existing account</p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="input-field-group">
            <input 
              type="text"
              placeholder="Email or user name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pill-input"
            />
          </div>

          <button type="submit" className="pill-login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
