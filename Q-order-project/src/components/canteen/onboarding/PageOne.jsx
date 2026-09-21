import React from 'react';
import logoImg from '../../../assets/logo (2).png';
import './PageOne.css';

const PageOne = ({ onNext }) => {
  return (
    <div className="onboarding-page-one-wrapper" onClick={onNext}>
      <div className="onboarding-logo-container">
        <img 
          src={logoImg} 
          alt="QOrder Logo" 
          className="onboarding-logo-img" 
        />
      </div>
    </div>
  );
};

export default PageOne;
