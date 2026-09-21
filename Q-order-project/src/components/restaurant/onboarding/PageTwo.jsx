import React, { useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import './PageTwo.css';

const PageTwo = ({ onLogin, onSignUp, onForgotPassword }) => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      setRoleError(true);
      return;
    }
    if (!email.trim() || !password.trim()) {
      setInputError('Please enter your email/username and password');
      return;
    }
    setRoleError(false);
    setInputError('');
    if (onLogin) onLogin(role, email.trim(), password.trim());
  };

  return (
    <div className="onboarding-page-two-wrapper">
      <div className="onboarding-card-container">
        <h1 className="welcome-title">Welcome Back!</h1>

        <form onSubmit={handleSubmit} className="onboarding-form" autoComplete="off">
          
          <div className="input-field-group">
            <select 
              required
              value={role} 
              onChange={(e) => {
                setRole(e.target.value);
                if (e.target.value) setRoleError(false);
              }} 
              className={`pill-input pill-select ${!role ? 'placeholder-active' : ''} ${roleError ? 'input-error' : ''}`}
            >
              <option value="" disabled hidden>Select role</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Chef">Chef</option>
              <option value="Student">Student</option>
              <option value="Canteen">Canteen</option>
            </select>
            <ChevronDown className="input-right-icon pointer-events-none" size={20} />
            {roleError && (
              <span className="role-error-message">
                * Please select a role
              </span>
            )}
          </div>

          <div className="input-field-group">
            <input 
              type="text"
              required
              autoComplete="off"
              placeholder="Email or user name"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value) setInputError('');
              }}
              className={`pill-input ${inputError && !email.trim() ? 'input-error' : ''}`}
            />
          </div>

          <div className="input-field-group">
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value) setInputError('');
              }}
              className={`pill-input ${inputError && !password.trim() ? 'input-error' : ''}`}
            />
            <button 
              type="button" 
              className="input-right-icon-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {inputError && (
            <span className="role-error-message">
              * {inputError}
            </span>
          )}

          <div className="forgot-password-wrapper">
            <button 
              type="button" 
              className="forgot-password-link" 
              onClick={onForgotPassword || (() => alert('Forgot password clicked'))}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="pill-login-btn">
            Login
          </button>
        </form>

        <div className="social-login-section">
          <span className="social-divider-text">Or continue with</span>
          <div className="social-buttons-group">
            <a 
              href="https://www.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn google-btn"
            >
              <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </a>

            <a 
              href="https://www.apple.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn apple-btn"
            >
              <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.34c.67-.82 1.12-1.96.99-3.1-.96.04-2.13.64-2.82 1.44-.61.71-1.15 1.87-1.01 2.98 1.07.08 2.17-.5 2.84-1.32z"/>
              </svg>
              <span>Apple</span>
            </a>
          </div>
        </div>

        <div className="signup-footer-text">
          <span>Don't have any account? </span>
          <button type="button" className="signup-link" onClick={onSignUp || onLogin}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
