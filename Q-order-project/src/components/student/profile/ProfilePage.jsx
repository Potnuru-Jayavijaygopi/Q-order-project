import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  FileText, 
  Star, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Pencil,
  Download,
  ChevronDown,
  Home as HomeIcon, 
  ClipboardList, 
  Plus, 
  Bell 
} from 'lucide-react';
import './ProfilePage.css';

const dummyOrders = [
  { id: 1, invoiceNo: '#32053', type: 'Dining', name: 'Kartik Patel', tableNo: 32, price: 300, date: '18 January 2024' },
  { id: 2, invoiceNo: '#32053', type: 'Dining', name: 'Kartik Patel', tableNo: 32, price: 300, date: '18 January 2024' },
  { id: 3, invoiceNo: '#32053', type: 'Dining', name: 'Kartik Patel', tableNo: 32, price: 300, date: '18 January 2024' },
  { id: 4, invoiceNo: '#32053', type: 'Dining', name: 'Kartik Patel', tableNo: 32, price: 300, date: '18 January 2024' },
];

const policySections = [
  { id: 'i', title: '1. Account Responsibility & Usage', text: 'Users are responsible for maintaining the confidentiality of account credentials and all activities occurring under their registered profiles.' },
  { id: 'ii', title: '2. Order Acceptance & Processing', text: 'All placed orders are processed in real-time subject to food item availability and kitchen operating hours.' },
  { id: 'iii', title: '3. Pricing & Payment Policy', text: 'Prices listed on the menu include applicable taxes and service charges. Payments must be settled prior to order preparation.' },
  { id: 'iv', title: '4. Cancellation & Refund Policy', text: 'Orders cannot be cancelled once preparation has commenced. Valid refund requests for unfulfilled orders are processed within 24 hours.' },
  { id: 'v', title: '5. Data Protection & Privacy', text: 'Personal information is securely stored and used strictly for facilitating food orders and enhancing user experience.' },
  { id: 'vi', title: '6. Food Hygiene & Quality Standards', text: 'Kitchen staff adhere strictly to food safety guidelines to ensure high quality and hygienic meal preparation.' },
  { id: 'vii', title: '7. Policy Updates & Modifications', text: 'Terms and conditions may be updated periodically to reflect operational changes and compliance standards.' }
];

const StudentProfilePage = ({ 
  onBackToHome, 
  onLogout, 
  activeNavTab = 'profile', 
  onNavTabChange,
  isDarkMode = false,
  setIsDarkMode
}) => {
  const [activeSubView, setActiveSubView] = useState('main'); 
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Kartik',
    lastName: 'Patel',
    phoneNumber: '+91 123 456 7890',
    emailAddress: 'kartik.patel@qorder.com',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const container = document.querySelector('.student-profile-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [activeSubView]);

  const handleSaveDetails = (e) => {
    e.preventDefault();
    alert('Profile details saved successfully!');
    setActiveSubView('main');
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.currentPassword) {
      alert('Please enter your current password.');
      return;
    }
    if (!passwords.newPassword || passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match. Please verify.');
      return;
    }
    alert('Password updated successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setActiveSubView('settings');
  };

  const handleResetPasswordForm = () => {
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const renderBottomNav = () => (
    <nav className="student-bottom-nav">
      <button 
        className={`student-nav-item ${activeNavTab === 'home' ? 'active' : ''}`}
        onClick={() => onNavTabChange && onNavTabChange('home')}
      >
        <div className="nav-icon"><HomeIcon size={22} /></div>
        <span>Home</span>
      </button>

      <button 
        className={`student-nav-item ${activeNavTab === 'history' || activeNavTab === 'list' ? 'active' : ''}`}
        onClick={() => onNavTabChange && onNavTabChange('list')}
      >
        <div className="nav-icon"><ClipboardList size={22} /></div>
        <span>History</span>
      </button>

      <button 
        className="student-nav-item-add"
        onClick={() => alert('Add Item Action')}
      >
        <div className="add-btn-circle">
          <Plus size={28} strokeWidth={2.5} />
        </div>
        <span>Add</span>
      </button>

      <button 
        className={`student-nav-item ${activeNavTab === 'notification' ? 'active' : ''}`}
        onClick={() => onNavTabChange && onNavTabChange('notification')}
      >
        <div className="nav-icon"><Bell size={22} /></div>
        <span>Notification</span>
      </button>

      <button 
        className={`student-nav-item ${activeNavTab === 'profile' ? 'active' : ''}`}
        onClick={() => {
          setActiveSubView('main');
          if (onNavTabChange) onNavTabChange('profile');
        }}
      >
        <div className="nav-icon"><User size={22} /></div>
        <span>Profile</span>
      </button>
    </nav>
  );

  if (activeSubView === 'personal_info') {
    return (
      <div className="student-profile-page-wrapper">
        <div className="student-profile-container">
          
          <div className="student-profile-header sticky-header">
            <button className="student-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="student-profile-title">Profile</h1>
          </div>

          <div className="personal-info-avatar-section">
            <div className="avatar-wrapper">
              <div className="large-avatar-circle">
                <span>KP</span>
              </div>
              <button className="avatar-edit-badge" aria-label="Edit Avatar">
                <Pencil size={14} color="#ffffff" />
              </button>
            </div>
          </div>

          <form className="personal-info-form" onSubmit={handleSaveDetails}>
            <div className="form-group-item">
              <label className="input-label">First Name</label>
              <input 
                type="text" 
                name="firstName"
                className="orange-outline-input"
                value={profileData.firstName}
                onChange={handleProfileChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                className="orange-outline-input"
                value={profileData.lastName}
                onChange={handleProfileChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">Phone Number</label>
              <input 
                type="text" 
                name="phoneNumber"
                className="orange-outline-input"
                value={profileData.phoneNumber}
                onChange={handleProfileChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">Email Address</label>
              <input 
                type="email" 
                name="emailAddress"
                className="orange-outline-input"
                value={profileData.emailAddress}
                onChange={handleProfileChange}
              />
            </div>

            <button type="submit" className="save-details-btn">
              Save Details
            </button>
          </form>

          {renderBottomNav()}
        </div>
      </div>
    );
  }

  if (activeSubView === 'order_history') {
    return (
      <div className="student-profile-page-wrapper">
        <div className="student-profile-container">
          
          <div className="order-history-header-row sticky-header">
            <div className="student-profile-header">
              <button className="student-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
                <ChevronLeft size={28} />
              </button>
              <h1 className="student-profile-title">Order History</h1>
            </div>
            
            <div className="date-filter-pill">
              <span>18 Jan - 21 Jan</span>
              <ChevronDown size={16} />
            </div>
          </div>

          <div className="order-history-list">
            {dummyOrders.map((order, idx) => (
              <div key={idx} className="order-history-card">
                <div className="order-card-top">
                  <div className="order-number-box">
                    <span>#1</span>
                  </div>

                  <div className="order-details-meta">
                    <div className="invoice-row">
                      <span className="invoice-no">Invoice ID: {order.invoiceNo}</span>
                      <span className="dining-badge">{order.type}</span>
                    </div>
                    <h3 className="order-user-name">{order.name}</h3>
                    <span className="table-no">Table No: {order.tableNo}</span>
                    <div className="price-date-row">
                      <span className="order-price">₹ {order.price}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="download-invoice-btn"
                  onClick={() => alert(`Downloading invoice for order ${order.invoiceNo}...`)}
                >
                  <Download size={16} className="download-icon" />
                  <span>Download Invoice</span>
                </button>
              </div>
            ))}
          </div>

          {renderBottomNav()}
        </div>
      </div>
    );
  }

  if (activeSubView === 'terms') {
    return (
      <div className="student-profile-page-wrapper">
        <div className="student-profile-container">
          
          <div className="student-profile-header sticky-header">
            <button className="student-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="student-profile-title">Term & Condition</h1>
          </div>

          <div className="policy-text-list">
            {policySections.map((sec) => (
              <div key={sec.id} className="policy-block">
                <h3 className="policy-heading">{sec.id}) {sec.title}</h3>
                <p className="policy-paragraph">{sec.text}</p>
              </div>
            ))}
          </div>

          {renderBottomNav()}
        </div>
      </div>
    );
  }

  if (activeSubView === 'privacy_policy') {
    return (
      <div className="student-profile-page-wrapper">
        <div className="student-profile-container">
          
          <div className="student-profile-header sticky-header">
            <button className="student-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="student-profile-title">Privacy Policy</h1>
          </div>

          <div className="policy-text-list">
            {policySections.map((sec) => (
              <div key={sec.id} className="policy-block">
                <h3 className="policy-heading">{sec.id}) {sec.title}</h3>
                <p className="policy-paragraph">{sec.text}</p>
              </div>
            ))}
          </div>

          {renderBottomNav()}
        </div>
      </div>
    );
  }

  if (activeSubView === 'settings') {
    return (
      <div className="student-profile-page-wrapper">
        <div className="student-profile-container">
          
          <div className="student-profile-header sticky-header">
            <button className="student-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="student-profile-title">Setting</h1>
          </div>

          <div className="settings-list-container">
            
            <div 
              className="settings-item-card clickable"
              onClick={() => setIsDarkMode && setIsDarkMode(!isDarkMode)}
            >
              <span className="settings-item-label">Themes</span>
              <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode && setIsDarkMode(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div 
              className="settings-item-card clickable"
              onClick={() => setActiveSubView('change_password')}
            >
              <span className="settings-item-label">Change Password</span>
            </div>

            <div className="settings-item-card language-card">
              <span className="settings-item-label">Language</span>
              
              <div className="language-selector-wrapper">
                <button 
                  type="button"
                  className="language-dropdown-btn"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <span>{selectedLanguage}</span>
                </button>

                {isLanguageOpen && (
                  <div className="language-popover-menu">
                    {['Telugu', 'English', 'Hindi'].map((lang) => (
                      <button 
                        key={lang}
                        type="button"
                        className={`language-option-btn ${selectedLanguage === lang ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {renderBottomNav()}
        </div>
      </div>
    );
  }

  if (activeSubView === 'change_password') {
    return (
      <div className="student-profile-page-wrapper">
        <div className="student-profile-container">
          
          <div className="student-profile-header sticky-header">
            <button className="student-profile-back-btn" onClick={() => setActiveSubView('settings')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="student-profile-title">Change Password</h1>
          </div>

          <form className="change-password-form" onSubmit={handleChangePasswordSubmit}>
            <div className="form-group-item">
              <label className="input-label">Current Password</label>
              <input 
                type="password" 
                name="currentPassword"
                className="gray-pill-input"
                placeholder="Add current password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">New Password</label>
              <input 
                type="password" 
                name="newPassword"
                className="gray-pill-input"
                placeholder="Add new password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                className="gray-pill-input"
                placeholder="Add confirm password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="change-password-actions-row">
              <button type="submit" className="update-btn">
                Update
              </button>
              <button 
                type="button" 
                className="reset-btn"
                onClick={handleResetPasswordForm}
              >
                Reset
              </button>
            </div>
          </form>

          {renderBottomNav()}
        </div>
      </div>
    );
  }

  return (
    <div className="student-profile-page-wrapper">
      <div className="student-profile-container">

        <div className="student-profile-header sticky-header">
          <button 
            className="student-profile-back-btn" 
            onClick={onBackToHome}
            aria-label="Go Back"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="student-profile-title">Profile</h1>
        </div>

        <div className="student-user-card" onClick={() => setActiveSubView('personal_info')}>
          <div className="user-avatar-circle">
            <span>KP</span>
          </div>
          <div className="user-info-meta">
            <h2 className="user-name">Kartik Patel</h2>
            <span className="user-phone">+91 123 456 7890</span>
          </div>
          <ChevronRight size={20} className="chevron-right-icon" />
        </div>

        <div className="profile-section">
          <h3 className="section-heading">Accounts</h3>
          <div className="profile-card-group">
            
            <div className="profile-row-item" onClick={() => setActiveSubView('personal_info')}>
              <div className="row-item-left">
                <div className="item-icon-circle">
                  <User size={18} />
                </div>
                <span className="item-label">Personal Info</span>
              </div>
              <ChevronRight size={18} className="chevron-right-icon" />
            </div>

            <div className="row-divider" />

            <div className="profile-row-item" onClick={() => setActiveSubView('order_history')}>
              <div className="row-item-left">
                <div className="item-icon-circle">
                  <FileText size={18} />
                </div>
                <span className="item-label">Order History</span>
              </div>
              <ChevronRight size={18} className="chevron-right-icon" />
            </div>

          </div>
        </div>

        <div className="profile-section">
          <h3 className="section-heading">More</h3>
          <div className="profile-card-group">
            
            <div className="profile-row-item" onClick={() => alert('Review Action')}>
              <div className="row-item-left">
                <div className="item-icon-circle">
                  <Star size={18} />
                </div>
                <span className="item-label">Review</span>
              </div>
              <ChevronRight size={18} className="chevron-right-icon" />
            </div>

            <div className="row-divider" />

            <div className="profile-row-item" onClick={() => setActiveSubView('privacy_policy')}>
              <div className="row-item-left">
                <div className="item-icon-circle">
                  <ShieldCheck size={18} />
                </div>
                <span className="item-label">Privacy Policy</span>
              </div>
              <ChevronRight size={18} className="chevron-right-icon" />
            </div>

            <div className="row-divider" />

            <div className="profile-row-item" onClick={() => setActiveSubView('terms')}>
              <div className="row-item-left">
                <div className="item-icon-circle">
                  <FileText size={18} />
                </div>
                <span className="item-label">Term & Condition</span>
              </div>
              <ChevronRight size={18} className="chevron-right-icon" />
            </div>

            <div className="row-divider" />

            <div className="profile-row-item" onClick={() => setActiveSubView('settings')}>
              <div className="row-item-left">
                <div className="item-icon-circle">
                  <Settings size={18} />
                </div>
                <span className="item-label">Setting</span>
              </div>
              <ChevronRight size={18} className="chevron-right-icon" />
            </div>

            <div className="row-divider" />

            <div className="profile-row-item logout-row" onClick={() => setShowLogoutModal(true)}>
              <div className="row-item-left">
                <div className="item-icon-circle">
                  <LogOut size={18} />
                </div>
                <span className="item-label">Log out</span>
              </div>
              <ChevronRight size={18} className="chevron-right-icon" />
            </div>

          </div>
        </div>

        {showLogoutModal && (
          <div className="logout-modal-overlay">
            <div className="logout-modal-card">
              <div className="modal-icon-circle">
                <LogOut size={26} />
              </div>
              
              <h2 className="modal-title">Log Out</h2>
              <p className="modal-subtitle">Would you like to log out, are you sure?</p>

              <div className="modal-divider" />

              <div className="modal-actions-row">
                <button 
                  className="modal-cancel-btn"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-submit-btn"
                  onClick={() => {
                    setShowLogoutModal(false);
                    if (onLogout) onLogout();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {renderBottomNav()}

      </div>
    </div>
  );
};

export default StudentProfilePage;
