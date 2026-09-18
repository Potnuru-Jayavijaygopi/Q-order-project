import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import './SignUpPage.css';

const SignUpPage = ({ onSignUpSuccess, onBackToLogin, onRoleChange }) => {
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    emailId: '',
    restaurantName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'role' && onRoleChange) {
      onRoleChange(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignUpSuccess) {
      onSignUpSuccess(formData.role || 'Restaurant');
    }
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-card-container">
        {onBackToLogin && (
          <button className="signup-back-btn" onClick={onBackToLogin} aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
        )}

        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-subtitle">Please sign up to get started</p>

        <form onSubmit={handleSubmit} className="signup-form">
          
          <div className="input-field-group">
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className={`pill-input pill-select ${!formData.role ? 'placeholder-active' : ''}`}
            >
              <option value="" disabled hidden>Select Roll</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Chef">Chef</option>
              <option value="Student">Student</option>
              <option value="Canteen">Canteen</option>
            </select>
            <ChevronDown className="input-right-icon pointer-events-none" size={20} />
          </div>

          <div className="input-field-group">
            <input
              type="text"
              placeholder="Your First name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="pill-input"
            />
          </div>

          <div className="input-field-group">
            <input
              type="text"
              placeholder="Your Last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="pill-input"
            />
          </div>

          <div className="input-field-group">
            <input
              type="tel"
              placeholder="Mobile number"
              value={formData.mobileNumber}
              onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
              className="pill-input"
            />
          </div>

          <div className="input-field-group">
            <input
              type="email"
              placeholder="Email Id"
              value={formData.emailId}
              onChange={(e) => handleInputChange('emailId', e.target.value)}
              className="pill-input"
            />
          </div>

          <div className="input-field-group">
            <input
              type="text"
              placeholder="Name of restaurant"
              value={formData.restaurantName}
              onChange={(e) => handleInputChange('restaurantName', e.target.value)}
              className="pill-input"
            />
          </div>

          <div className="input-field-group">
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="pill-input"
            />
          </div>

          <div className="input-field-group">
            <select
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`pill-input pill-select ${!formData.city ? 'placeholder-active' : ''}`}
            >
              <option value="" disabled hidden>City</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
            </select>
            <ChevronDown className="input-right-icon pointer-events-none" size={20} />
          </div>

          <div className="input-field-group">
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={`pill-input pill-select ${!formData.state ? 'placeholder-active' : ''}`}
            >
              <option value="" disabled hidden>State</option>
              <option value="Telangana">Telangana</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
            <ChevronDown className="input-right-icon pointer-events-none" size={20} />
          </div>

          <div className="input-field-group">
            <select
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={`pill-input pill-select ${!formData.country ? 'placeholder-active' : ''}`}
            >
              <option value="" disabled hidden>Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="UAE">UAE</option>
            </select>
            <ChevronDown className="input-right-icon pointer-events-none" size={20} />
          </div>

          <div className="input-field-group">
            <input
              type="text"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              className="pill-input"
            />
          </div>

          <div className="input-field-group">
            <input
              type="text"
              placeholder="User name"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="pill-input"
            />
          </div>

          <div className="input-field-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pill-input"
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

          <div className="input-field-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="pill-input"
            />
            <button
              type="button"
              className="input-right-icon-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="pill-signup-btn">
            Signup
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
      </div>
    </div>
  );
};

export default SignUpPage;
