import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Utensils, 
  ClipboardList, 
  LogOut 
} from 'lucide-react';
import CuisinesPage from './CuisinesPage';
import MiscellaneousPage from './MiscellaneousPage';
import RecipesMasterPage from './RecipesMasterPage';
import './ProfilePage.css';

const ProfilePage = ({ onBackToHome, isDarkMode, setIsDarkMode, onLogout }) => {
  const [activeSubPage, setActiveSubPage] = useState(null); 

  const accountsMenu = [
    { id: 1, title: 'Cuisines', icon: Utensils, action: 'cuisines' },
    { id: 2, title: 'Miscellaneous Items', icon: ClipboardList, action: 'misc' },
    { id: 3, title: 'Recipes Master', icon: ClipboardList, action: 'recipes' },
  ];

  const handleMenuClick = (item) => {
    if (!item) return;
    if (item.action === 'cuisines' || item.title === 'Cuisines') {
      setActiveSubPage('cuisines');
    } else if (item.action === 'misc' || item.title === 'Miscellaneous Items') {
      setActiveSubPage('misc');
    } else if (item.action === 'recipes' || item.title === 'Recipes Master') {
      setActiveSubPage('recipes');
    }
  };

  if (activeSubPage === 'cuisines') {
    return <CuisinesPage onBackToProfile={() => setActiveSubPage(null)} />;
  }
  if (activeSubPage === 'misc') {
    return <MiscellaneousPage onBackToProfile={() => setActiveSubPage(null)} />;
  }
  if (activeSubPage === 'recipes') {
    return <RecipesMasterPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-btn" onClick={onBackToHome}>
          <ChevronLeft size={20} />
        </button>
        <h2>Profile & Settings</h2>
      </div>

      <div className="profile-info-card">
        <div className="avatar-placeholder">
          <Utensils size={32} />
        </div>
        <div className="user-details">
          <h3>Canteen Manager</h3>
          <p>canteen@example.com</p>
        </div>
      </div>

      <div className="menu-section">
        <h4>Management</h4>
        <div className="menu-list">
          {accountsMenu.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="menu-item"
                onClick={() => handleMenuClick(item)}
              >
                <div className="menu-item-left">
                  <Icon size={20} className="menu-icon" />
                  <span>{item.title}</span>
                </div>
                <ChevronRight size={18} className="arrow-icon" />
              </div>
            );
          })}
        </div>
      </div>

      {onLogout && (
        <div className="logout-section" style={{ marginTop: '20px' }}>
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
