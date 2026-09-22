import React, { useState } from 'react';
import { ChevronLeft, Pencil, ChevronDown } from 'lucide-react';
import './EditProfilePage.css';

const EditProfilePage = ({ onBackToProfile, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: 'Kartik',
    lastName: 'Patel',
    restaurantName: 'QOrder Restaurant',
    gstNumber: '24AAAAA0000A1Z5',
    fssaiNumber: '10022ABC000000',
    googleReviewLink: 'https://g.page/r/qorder-restaurant',
    email: 'kartik.patel@qorder.com',
    contactNumber: '+91 91000 12345',
    address: 'Hostel Complex, Main Campus Road',
    city: 'Surat',
    state: 'Gujarat',
    country: 'India',
    pincode: '123456',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile details saved successfully!');
    if (onSaveSuccess) onSaveSuccess(`${formData.firstName} ${formData.lastName}`);
    if (onBackToProfile) onBackToProfile();
  };

  const handleDownloadQR = () => {
    alert('Downloading Restaurant QR Code...');
  };

  return (
    <div className="edit-profile-content">
      
      <div className="edit-profile-header">
        <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
          <ChevronLeft size={28} />
        </button>
        <h1 className="edit-profile-title">Profile</h1>
      </div>

      <div className="profile-avatar-wrapper">
        <div className="avatar-edit-container" onClick={() => alert('Change profile photo')}>
          <div className="large-avatar-circle">KP</div>
          <div className="avatar-edit-badge">
            <Pencil size={14} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-profile-form">

        <div className="form-group">
          <label className="form-label">First Name</label>
          <input 
            type="text" 
            name="firstName"
            className="input-orange-profile" 
            value={formData.firstName} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input 
            type="text" 
            name="lastName"
            className="input-orange-profile" 
            value={formData.lastName} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Restaurant Name</label>
          <input 
            type="text" 
            name="restaurantName"
            className="input-orange-profile" 
            value={formData.restaurantName} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">GST Number</label>
          <input 
            type="text" 
            name="gstNumber"
            className="input-orange-profile" 
            value={formData.gstNumber} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">FSSAI Number</label>
          <input 
            type="text" 
            name="fssaiNumber"
            className="input-orange-profile" 
            value={formData.fssaiNumber} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Google Review Link</label>
          <input 
            type="text" 
            name="googleReviewLink"
            className="input-orange-profile" 
            value={formData.googleReviewLink} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            name="email"
            className="input-orange-profile" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contact Number</label>
          <input 
            type="text" 
            name="contactNumber"
            className="input-orange-profile" 
            value={formData.contactNumber} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <input 
            type="text" 
            name="address"
            className="input-orange-profile" 
            value={formData.address} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Select City</label>
          <div className="select-orange-profile-wrapper">
            <select 
              name="city"
              className="select-orange-profile" 
              value={formData.city} 
              onChange={handleChange}
            >
              <option value="Surat">Surat</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
            <ChevronDown size={20} className="select-chevron" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Select State</label>
          <div className="select-orange-profile-wrapper">
            <select 
              name="state"
              className="select-orange-profile" 
              value={formData.state} 
              onChange={handleChange}
            >
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Telangana">Telangana</option>
              <option value="Karnataka">Karnataka</option>
            </select>
            <ChevronDown size={20} className="select-chevron" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Select Country</label>
          <div className="select-orange-profile-wrapper">
            <select 
              name="country"
              className="select-orange-profile" 
              value={formData.country} 
              onChange={handleChange}
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
            <ChevronDown size={20} className="select-chevron" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Pincode</label>
          <input 
            type="text" 
            name="pincode"
            className="input-orange-profile" 
            value={formData.pincode} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <span className="qr-code-link" onClick={handleDownloadQR}>
            Download qr code
          </span>
        </div>

        <button type="submit" className="btn-save-details">
          Save Details
        </button>

      </form>
    </div>
  );
};

export default EditProfilePage;
