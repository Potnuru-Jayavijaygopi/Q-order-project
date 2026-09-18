import React, { useState } from 'react';
import { 
  Bell, 
  Home as HomeIcon, 
  ClipboardList, 
  User 
} from 'lucide-react';
import StudentNotificationPage from '../notification/NotificationPage';
import StudentProfilePage from '../profile/ProfilePage';
import StudentMenuList from '../list/StudentMenuList';
import './StudentHome.css';

const initialCanteens = [
  { id: 1, name: 'Bapasitharam canteen' },
  { id: 2, name: 'Grill Bar canteen' },
  { id: 3, name: 'Tulsi canteen' },
  { id: 4, name: 'Bapasitharam canteen' },
  { id: 5, name: 'Grill Bar canteen' },
  { id: 6, name: 'Tulsi canteen' },
  { id: 7, name: 'Bapasitharam canteen' },
  { id: 8, name: 'Grill Bar canteen' },
  { id: 9, name: 'Tulsi canteen' },
  { id: 10, name: 'Bapasitharam canteen' },
  { id: 11, name: 'Grill Bar canteen' },
  { id: 12, name: 'Tulsi canteen' },
];

const StudentHome = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home'); 
  const [selectedCanteenId, setSelectedCanteenId] = useState(null);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSelectCanteen = (id) => {
    setSelectedCanteenId(id);
    setActiveTab('list');
  };

  return (
    <div className={`student-home-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="student-container">
        
        {activeTab === 'list' || activeTab === 'history' ? (
          <StudentMenuList 
            onBackToHome={() => setActiveTab('home')} 
            activeNavTab={activeTab}
            onNavTabChange={(tab) => setActiveTab(tab)}
          />
        ) : activeTab === 'notification' ? (
          <StudentNotificationPage 
            onBackToHome={() => setActiveTab('home')} 
            activeNavTab={activeTab}
            onNavTabChange={(tab) => setActiveTab(tab)}
          />
        ) : activeTab === 'profile' ? (
          <StudentProfilePage 
            onBackToHome={() => setActiveTab('home')} 
            activeNavTab={activeTab}
            onNavTabChange={(tab) => setActiveTab(tab)}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onLogout={onLogout}
          />
        ) : (
          
          <>
            <div className="student-home-content">

              <div className="student-header">
                <div className="student-greeting">
                  <h1>Hello,</h1>
                </div>
                <button 
                  className="student-notification-btn" 
                  onClick={() => setActiveTab('notification')}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {notificationsCount > 0 && <span className="student-notification-badge" />}
                </button>
              </div>

              <div className="canteen-banner-card">
                <h2 className="canteen-banner-title">List of Canteen</h2>
              </div>

              <div className="canteen-list-container">
                {initialCanteens.map((canteen) => {
                  const isSelected = selectedCanteenId === canteen.id;
                  return (
                    <div 
                      key={canteen.id} 
                      className={`canteen-item-row ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectCanteen(canteen.id)}
                    >
                      <span className="canteen-name">{canteen.name}</span>
                      <div className="canteen-radio-circle">
                        {isSelected && <div className="canteen-radio-inner" />}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            <nav className="student-bottom-nav">
              <button 
                className={`student-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                <div className="nav-icon">
                  <HomeIcon size={22} />
                </div>
                <span>Home</span>
              </button>

              <button 
                className={`student-nav-item ${activeTab === 'list' || activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('list')}
              >
                <div className="nav-icon">
                  <ClipboardList size={22} />
                </div>
                <span>History</span>
              </button>

              <button 
                className={`student-nav-item ${activeTab === 'notification' ? 'active' : ''}`}
                onClick={() => setActiveTab('notification')}
              >
                <div className="nav-icon">
                  <Bell size={22} />
                </div>
                <span>Notification</span>
              </button>

              <button 
                className={`student-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <div className="nav-icon">
                  <User size={22} />
                </div>
                <span>Profile</span>
              </button>
            </nav>
          </>
        )}

      </div>
    </div>
  );
};

export default StudentHome;
