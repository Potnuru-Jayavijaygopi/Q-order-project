import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import './SupportPage.css';

const supportOptions = [
  'Order Cancellation & Payment Refund',
  'Order Delayed or Incomplete Items',
  'Account Profile & Password Issue',
  'App Feedback & Bug Reporting',
  'Canteen Menu & Pricing Support',
];

const SupportPage = ({ onBackToProfile }) => {
  const [selectedSupport, setSelectedSupport] = useState('Order Cancellation & Payment Refund');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [supportText, setSupportText] = useState('');

  const handleSelectOption = (option) => {
    setSelectedSupport(option);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!supportText.trim()) {
      alert('Please enter your support query text');
      return;
    }
    alert('Support request submitted successfully!');
    setSupportText('');
    if (onBackToProfile) onBackToProfile();
  };

  return (
    <div className="support-page-content">
      
      <div className="support-header">
        {onBackToProfile && (
          <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
        )}
        <h1 className="support-title">Support</h1>
      </div>

      <form onSubmit={handleSubmit} className="support-form">

        <div className="form-group">
          <label className="form-label">Type Support</label>
          
          <div 
            className="custom-select-trigger" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedSupport}</span>
            <ChevronDown size={20} className="select-chevron" />
          </div>

          {isDropdownOpen && (
            <div className="support-dropdown-menu">
              {supportOptions.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`support-dropdown-option ${selectedSupport === opt && idx === 1 ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Text</label>
          <textarea 
            className="textarea-gray-support"
            placeholder="Enter text"
            value={supportText}
            onChange={(e) => setSupportText(e.target.value)}
            rows={5}
          />
        </div>

        <button type="submit" className="btn-submit-support">
          Submit
        </button>

      </form>
    </div>
  );
};

export default SupportPage;
