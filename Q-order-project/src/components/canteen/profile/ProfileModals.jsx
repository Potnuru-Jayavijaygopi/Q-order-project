import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import './ProfileModals.css';

export const ReviewModal = ({ isOpen, onClose }) => {
  const [reviewText, setReviewText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Review submitted successfully!');
    onClose();
  };

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="profile-modal-title">Review</h3>
        
        <textarea 
          className="profile-modal-textarea"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <div className="profile-modal-buttons">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const DiscountModal = ({ isOpen, onClose }) => {
  const [discountValue, setDiscountValue] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!discountValue) {
      alert('Please enter discount percentage');
      return;
    }
    alert(`Discount ${discountValue}% applied successfully!`);
    onClose();
  };

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="profile-modal-title">Enter Discount</h3>
        
        <input 
          type="text"
          className="profile-modal-input"
          placeholder="Enter discount"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
        />

        <div className="modal-divider" />

        <div className="profile-modal-buttons">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const WaterBottleModal = ({ isOpen, onClose }) => {
  const [size, setSize] = useState('500ml');
  const [lotSize, setLotSize] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lotSize) {
      alert('Please enter lot size');
      return;
    }
    alert(`Water bottle order placed for ${size} (${lotSize} lots)!`);
    onClose();
  };

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-radio-group">
          <div 
            className={`modal-radio-option ${size === '500ml' ? 'selected' : ''}`}
            onClick={() => setSize('500ml')}
          >
            <div className={`modal-custom-radio ${size === '500ml' ? 'checked' : ''}`}>
              {size === '500ml' && <div className="modal-radio-dot" />}
            </div>
            <span>500ml</span>
          </div>

          <div 
            className={`modal-radio-option ${size === '1000ml' ? 'selected' : ''}`}
            onClick={() => setSize('1000ml')}
          >
            <div className={`modal-custom-radio ${size === '1000ml' ? 'checked' : ''}`}>
              {size === '1000ml' && <div className="modal-radio-dot" />}
            </div>
            <span>1000ml</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>
            Enter lot size
          </label>
          <input 
            type="text"
            className="profile-modal-input"
            placeholder="Enter lot size"
            value={lotSize}
            onChange={(e) => setLotSize(e.target.value)}
          />
        </div>

        <div className="modal-divider" />

        <div className="profile-modal-buttons">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal-box logout-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="logout-icon-circle">
          <LogOut size={26} color="#ff5200" />
        </div>

        <div className="logout-text-content">
          <h3 className="logout-modal-title">Log Out</h3>
          <p className="logout-modal-subtitle">Would you like to log out, are you sure?</p>
        </div>

        <div className="modal-divider" />

        <div className="profile-modal-buttons">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn-submit" onClick={onConfirm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
