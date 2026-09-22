import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import './ChangePasswordPage.css';

const ChangePasswordPage = ({ onBackToSetting }) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New Password and Confirm Password do not match');
      return;
    }
    alert('Password updated successfully!');
    if (onBackToSetting) onBackToSetting();
  };

  const handleReset = () => {
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="change-password-content">
      
      <div className="password-header">
        {onBackToSetting && (
          <button className="back-btn" onClick={onBackToSetting} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
        )}
        <h1 className="password-title">Change Password</h1>
      </div>

      <form onSubmit={handleUpdate} className="password-form">

        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input 
            type="password" 
            name="currentPassword"
            className="input-password-outline"
            placeholder="Add current password"
            value={passwords.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <input 
            type="password" 
            name="newPassword"
            className="input-password-outline"
            placeholder="Add new password"
            value={passwords.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword"
            className="input-password-outline"
            placeholder="Add confirm password"
            value={passwords.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-action-buttons">
          <button type="submit" className="btn-update-password">
            Update
          </button>
          <button type="button" className="btn-reset-password" onClick={handleReset}>
            Reset
          </button>
        </div>

      </form>
    </div>
  );
};

export default ChangePasswordPage;
