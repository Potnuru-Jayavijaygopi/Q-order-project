import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import './SettingPage.css';

const SettingPage = ({ onBackToProfile, onNavigateToChangePassword, isDarkMode, setIsDarkMode }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  const handleToggleTheme = () => {
    if (setIsDarkMode) {
      setIsDarkMode(!isDarkMode);
    }
  };

  const handleSelectLang = (lang) => {
    setSelectedLang(lang);
    setIsLangOpen(false);
    alert(`Language changed to ${lang}`);
  };

  return (
    <div className="settings-page-content">
      
      <div className="settings-header">
        {onBackToProfile && (
          <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
        )}
        <h1 className="settings-title">Setting</h1>
      </div>

      <div className="settings-list">

        <div className="settings-card" onClick={handleToggleTheme}>
          <span>Themes</span>
          <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
            <input 
              type="checkbox" 
              checked={isDarkMode} 
              onChange={handleToggleTheme} 
            />
            <span className="slider" />
          </label>
        </div>

        <div className="settings-card" onClick={onNavigateToChangePassword}>
          <span>Change Password</span>
        </div>

        <div className="language-card-wrapper">
          <div className="settings-card" onClick={() => setIsLangOpen(!isLangOpen)}>
            <span>Language</span>
          </div>

          {isLangOpen && (
            <div className="language-dropdown-menu">
              <button 
                className={`language-option ${selectedLang === 'Telugu' ? 'active' : ''}`}
                onClick={() => handleSelectLang('Telugu')}
              >
                Telugu
              </button>
              <button 
                className={`language-option ${selectedLang === 'English' ? 'active' : ''}`}
                onClick={() => handleSelectLang('English')}
              >
                English
              </button>
              <button 
                className={`language-option ${selectedLang === 'Hindi' ? 'active' : ''}`}
                onClick={() => handleSelectLang('Hindi')}
              >
                Hindi
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SettingPage;
