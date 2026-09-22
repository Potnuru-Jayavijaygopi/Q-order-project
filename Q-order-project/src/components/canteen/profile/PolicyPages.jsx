import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import './PolicyPages.css';

const samplePolicies = [
  { id: 'i', heading: '1. Account Responsibility & Usage', text: 'Users are responsible for maintaining the confidentiality of account credentials and all activities occurring under their registered profiles.' },
  { id: 'ii', heading: '2. Order Acceptance & Processing', text: 'All placed orders are processed in real-time subject to food item availability and kitchen operating hours.' },
  { id: 'iii', heading: '3. Pricing & Payment Policy', text: 'Prices listed on the menu include applicable taxes and service charges. Payments must be settled prior to order preparation.' },
  { id: 'iv', heading: '4. Cancellation & Refund Policy', text: 'Orders cannot be cancelled once preparation has commenced. Valid refund requests for unfulfilled orders are processed within 24 hours.' },
  { id: 'v', heading: '5. Data Protection & Privacy', text: 'Personal information is securely stored and used strictly for facilitating food orders and enhancing user experience.' },
  { id: 'vi', heading: '6. Food Hygiene & Quality Standards', text: 'Kitchen staff adhere strictly to food safety guidelines to ensure high quality and hygienic meal preparation.' },
  { id: 'vii', heading: '7. Policy Updates & Modifications', text: 'Terms and conditions may be updated periodically to reflect operational changes and compliance standards.' }
];

export const TermsPage = ({ onBackToProfile }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page-content">
      <div className="policy-header">
        {onBackToProfile && (
          <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
        )}
        <h1 className="policy-title">Term & Condition</h1>
      </div>

      <div className="policy-sections-list">
        {samplePolicies.map((item) => (
          <div key={item.id} className="policy-item">
            <h3 className="policy-item-heading">{item.heading}</h3>
            <p className="policy-item-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PrivacyPolicyPage = ({ onBackToProfile }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page-content">
      <div className="policy-header">
        {onBackToProfile && (
          <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
        )}
        <h1 className="policy-title">Privacy Policy</h1>
      </div>

      <div className="policy-sections-list">
        {samplePolicies.map((item) => (
          <div key={item.id} className="policy-item">
            <h3 className="policy-item-heading">{item.heading}</h3>
            <p className="policy-item-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
