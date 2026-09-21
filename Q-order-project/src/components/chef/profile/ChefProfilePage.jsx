import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  FileText, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Pencil,
  ClipboardList,
  Home as HomeIcon,
  ChevronDown
} from 'lucide-react';
import ChefMyOrdersPage from '../orders/ChefMyOrdersPage';
import './ChefProfilePage.css';

const policySections = [
  { id: 'i', title: '1. Account Responsibility & Usage', text: 'Users are responsible for maintaining the confidentiality of account credentials and all activities occurring under their registered profiles.' },
  { id: 'ii', title: '2. Order Acceptance & Processing', text: 'All placed orders are processed in real-time subject to food item availability and kitchen operating hours.' },
  { id: 'iii', title: '3. Pricing & Payment Policy', text: 'Prices listed on the menu include applicable taxes and service charges. Payments must be settled prior to order preparation.' },
  { id: 'iv', title: '4. Cancellation & Refund Policy', text: 'Orders cannot be cancelled once preparation has commenced. Valid refund requests for unfulfilled orders are processed within 24 hours.' },
  { id: 'v', title: '5. Data Protection & Privacy', text: 'Personal information is securely stored and used strictly for facilitating food orders and enhancing user experience.' },
  { id: 'vi', title: '6. Food Hygiene & Quality Standards', text: 'Kitchen staff adhere strictly to food safety guidelines to ensure high quality and hygienic meal preparation.' },
  { id: 'vii', title: '7. Policy Updates & Modifications', text: 'Terms and conditions may be updated periodically to reflect operational changes and compliance standards.' }
];

const chefOrderHistory = [
  { id: 1, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: 32, price: 300, date: '01/01/2024', type: 'Dining' },
  { id: 2, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: null, price: 300, date: '01/01/2024', type: 'Parcel' },
  { id: 3, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: 32, price: 300, date: '01/01/2024', type: 'Dining' },
  { id: 4, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: 32, price: 300, date: '01/01/2024', type: 'Dining' },
  { id: 5, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: 32, price: 300, date: '01/01/2024', type: 'Dining' },
];

const ChefProfilePage = ({ 
  onBackToHome, 
  onLogout, 
  activeNavTab = 'profile', 
  onNavTabChange,
  isDarkMode = false,
  setIsDarkMode
}) => {
  const [activeSubView, setActiveSubView] = useState('main');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState(null);

  const [chefData, setChefData] = useState({
    firstName: 'Kartik',
    emailAddress: 'chef.kartik@qorder.com',
    selectCuisine: 'Panner',
    phoneNumber: '+91 123 456 7890',
    salary: '₹15,000',
  });

  const handleChefDataChange = (e) => {
    const { name, value } = e.target;
    setChefData((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const container = document.querySelector('.chef-profile-container');
    if (container) {
      container.scrollTop = 0;
    }
  }, [activeSubView]);

  if (selectedOrderForDetail) {
    return (
      <ChefMyOrdersPage 
        order={selectedOrderForDetail}
        onBack={() => setSelectedOrderForDetail(null)}
      />
    );
  }

  const renderBottomNav = () => (
    <nav className="chef-bottom-nav">
      <button 
        className={`chef-nav-item ${activeNavTab === 'home' ? 'active' : ''}`}
        onClick={() => onNavTabChange && onNavTabChange('home')}
      >
        <div className="nav-icon"><HomeIcon size={22} /></div>
        <span>Home</span>
      </button>

      <button 
        className={`chef-nav-item ${activeNavTab === 'history' ? 'active' : ''}`}
        onClick={() => onNavTabChange && onNavTabChange('history')}
      >
        <div className="nav-icon"><ClipboardList size={22} /></div>
        <span>History</span>
      </button>

      <button 
        className={`chef-nav-item ${activeNavTab === 'profile' ? 'active' : ''}`}
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
      <div className="chef-profile-page-wrapper">
        <div className="chef-profile-container">
          
          <div className="chef-profile-header sticky-header">
            <button className="chef-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="chef-profile-title">View Chef</h1>
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

          <form className="personal-info-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group-item">
              <label className="input-label">First Name</label>
              <input 
                type="text" 
                name="firstName"
                className="orange-outline-input"
                value={chefData.firstName}
                onChange={handleChefDataChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">Email Address</label>
              <input 
                type="email" 
                name="emailAddress"
                className="orange-outline-input"
                value={chefData.emailAddress}
                onChange={handleChefDataChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">Select Cuisine</label>
              <input 
                type="text" 
                name="selectCuisine"
                className="orange-outline-input"
                value={chefData.selectCuisine}
                onChange={handleChefDataChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">Phone Number</label>
              <input 
                type="text" 
                name="phoneNumber"
                className="orange-outline-input"
                value={chefData.phoneNumber}
                onChange={handleChefDataChange}
              />
            </div>

            <div className="form-group-item">
              <label className="input-label">Salary</label>
              <input 
                type="text" 
                name="salary"
                className="orange-outline-input"
                value={chefData.salary}
                onChange={handleChefDataChange}
              />
            </div>
          </form>

          {renderBottomNav()}
        </div>
      </div>
    );
  }

  if (activeSubView === 'order_history') {
    return (
      <div className="chef-profile-page-wrapper">
        <div className="chef-profile-container">
          
          <div className="order-history-header-row sticky-header">
            <div className="chef-profile-header">
              <button className="chef-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
                <ChevronLeft size={28} />
              </button>
              <h1 className="chef-profile-title">Order History</h1>
            </div>
            
            <div className="date-filter-pills-row">
              <div className="date-pill">01/01/2024</div>
              <div className="date-pill">31/01/2024</div>
            </div>
          </div>

          <div className="running-orders-list">
            {chefOrderHistory.map((order) => (
              <div 
                key={order.id} 
                className="chef-order-card"
                onClick={() => setSelectedOrderForDetail(order)}
              >
                <div className="card-top-row">
                  <div className="order-number-avatar">
                    <span>#1</span>
                  </div>

                  <div className="order-main-meta">
                    <div className="invoice-badge-row">
                      <span className="invoice-id">Invoice ID: {order.invoiceNo}</span>
                      <span className={`type-tag ${order.type === 'Dining' ? 'dining' : 'parcel'}`}>
                        {order.type}
                      </span>
                    </div>

                    <h3 className="customer-name">{order.name}</h3>

                    {order.type === 'Dining' && (
                      <span className="table-no">Table No: {order.tableNo}</span>
                    )}

                    <div className="price-date-row">
                      <span className="order-price">₹ {order.price}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                  </div>
                </div>
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
      <div className="chef-profile-page-wrapper">
        <div className="chef-profile-container">
          
          <div className="chef-profile-header sticky-header">
            <button className="chef-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="chef-profile-title">Setting</h1>
          </div>

          <div className="settings-list-container">
            
            <div className="settings-item-card">
              <span className="settings-item-label">Themes</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode && setIsDarkMode(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="settings-item-card language-card">
              <span className="settings-item-label">Language</span>
              
              <div className="language-selector-wrapper">
                <button 
                  type="button"
                  className="language-dropdown-btn orange-theme"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <span className="orange-lang-text">{selectedLanguage}</span>
                  <ChevronDown size={16} className="orange-arrow-icon" />
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

  if (activeSubView === 'terms') {
    return (
      <div className="chef-profile-page-wrapper">
        <div className="chef-profile-container">
          
          <div className="chef-profile-header sticky-header">
            <button className="chef-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="chef-profile-title">Term & Condition</h1>
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
      <div className="chef-profile-page-wrapper">
        <div className="chef-profile-container">
          
          <div className="chef-profile-header sticky-header">
            <button className="chef-profile-back-btn" onClick={() => setActiveSubView('main')} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="chef-profile-title">Privacy Policy</h1>
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

  return (
    <div className="chef-profile-page-wrapper">
      <div className="chef-profile-container">
        
        <div className="chef-profile-header sticky-header">
          <button 
            className="chef-profile-back-btn" 
            onClick={onBackToHome}
            aria-label="Go Back"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="chef-profile-title">Profile</h1>
        </div>

        <div className="chef-user-card" onClick={() => setActiveSubView('personal_info')}>
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

            <div 
              className="profile-row-item" 
              onClick={() => {
                if (onNavTabChange) onNavTabChange('history');
              }}
            >
              <div className="row-item-left">
                <div className="item-icon-circle">
                  <ClipboardList size={18} />
                </div>
                <span className="item-label">Menu</span>
              </div>
              <ChevronRight size={18} className="chevron-right-icon" />
            </div>

            <div className="row-divider" />

            <div 
              className="profile-row-item" 
              onClick={() => setActiveSubView('order_history')}
            >
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

            <div 
              className="profile-row-item" 
              onClick={() => setActiveSubView('settings')}
            >
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

export default ChefProfilePage;
