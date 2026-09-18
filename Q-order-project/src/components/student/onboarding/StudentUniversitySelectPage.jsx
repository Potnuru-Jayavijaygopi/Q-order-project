import React, { useState } from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import './StudentUniversitySelectPage.css';

const StudentUniversitySelectPage = ({ onSubmitUniversity, onBackToLogin }) => {
  const [university, setUniversity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitUniversity) {
      onSubmitUniversity(university || 'JNTU Hyderabad');
    }
  };

  return (
    <div className="student-select-page-wrapper">
      <div className="student-select-card-container">
        {onBackToLogin && (
          <button className="student-select-back-btn" onClick={onBackToLogin} aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
        )}

        <h1 className="student-select-title">Sign Up</h1>
        <p className="student-select-subtitle">Please sign up to get started</p>

        <form onSubmit={handleSubmit} className="student-select-form">
          
          <div className="input-field-group">
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className={`pill-input pill-select ${!university ? 'placeholder-active' : ''}`}
            >
              <option value="" disabled hidden>Select University/college</option>
              <option value="JNTU Hyderabad">JNTU Hyderabad</option>
              <option value="Osmania University">Osmania University</option>
              <option value="IIT Hyderabad">IIT Hyderabad</option>
              <option value="CBIT Hyderabad">CBIT Hyderabad</option>
              <option value="Vasavi College of Engineering">Vasavi College of Engineering</option>
              <option value="Gokaraju Rangaraju (GRIET)">Gokaraju Rangaraju (GRIET)</option>
              <option value="KL University">KL University</option>
            </select>
            <ChevronDown className="input-right-icon pointer-events-none" size={20} />
          </div>

          <button type="submit" className="pill-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentUniversitySelectPage;
