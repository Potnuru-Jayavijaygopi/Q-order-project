import React, { useState } from 'react';
import { ChevronLeft, Pencil } from 'lucide-react';
import './CreateChefPage.css';

const CreateChefPage = ({ chef, onBackToChefList, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: chef?.name || 'Kartik',
    email: 'chef.kartik@qorder.com',
    cuisine: 'Panner',
    phoneNumber: '+91 123 456 7890',
    password: '********',
    confirmPassword: '********',
    salary: '₹15,000',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getInitials = (name) => {
    if (!name) return 'KP';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName.trim()) {
      alert('Please enter chef name');
      return;
    }
    const newChef = {
      id: chef?.id || Date.now(),
      name: formData.firstName.trim(),
    };
    alert('Chef details saved successfully!');
    if (onSaveSuccess) onSaveSuccess(newChef);
    if (onBackToChefList) onBackToChefList();
  };

  return (
    <div className="create-chef-content">
      
      <div className="create-chef-header">
        <div className="create-chef-header-left">
          <button className="back-btn" onClick={onBackToChefList} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
          <h1 className="create-chef-title">{chef ? 'Edit Chef' : 'Create Chef'}</h1>
        </div>
      </div>

      <div className="chef-avatar-wrapper">
        <div className="avatar-edit-container" onClick={() => alert('Change chef photo')}>
          <div className="large-avatar-circle">{getInitials(formData.firstName)}</div>
          <div className="avatar-edit-badge">
            <Pencil size={14} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-chef-form">

        <div className="form-group">
          <label className="form-label">First Name</label>
          <input 
            type="text" 
            name="firstName"
            className="input-orange-chef" 
            value={formData.firstName} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            name="email"
            className="input-orange-chef" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Select Cuisine</label>
          <input 
            type="text" 
            name="cuisine"
            className="input-orange-chef" 
            value={formData.cuisine} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input 
            type="text" 
            name="phoneNumber"
            className="input-orange-chef" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            name="password"
            className="input-orange-chef" 
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword"
            className="input-orange-chef" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Salary</label>
          <input 
            type="text" 
            name="salary"
            className="input-orange-chef" 
            value={formData.salary} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="btn-save-chef">
          Save Details
        </button>

      </form>
    </div>
  );
};

export default CreateChefPage;
