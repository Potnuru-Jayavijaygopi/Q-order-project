import React, { useState } from 'react';
import { 
  Bell, 
  ShoppingCart, 
  Home as HomeIcon, 
  Plus, 
  User 
} from 'lucide-react';
import RunningOrdersModal from './RunningOrdersModal';
import OrdersRequestModal from './OrdersRequestModal';
import AddItemPage from '../addItem/AddItemPage';
import ProfilePage from '../profile/ProfilePage';
import './Home.css';

const initialMenuItems = [
  { id: 1, name: 'Dhokla', price: 50 },
  { id: 2, name: 'Khaman', price: 50 },
  { id: 3, name: 'Pasta', price: 80 },
];

const Home = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home'); 
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [timeframe, setTimeframe] = useState('Weekly');
  const [isRunningOrdersOpen, setIsRunningOrdersOpen] = useState(false);
  const [isOrdersRequestOpen, setIsOrdersRequestOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const revenueData = [
    { day: 'M', amount: 25000, height: 42, label: '₹ 25,000' },
    { day: 'T', amount: 50000, height: 83, label: '₹ 50,000' },
    { day: 'W', amount: 18000, height: 30, label: '₹ 18,000' },
    { day: 'T', amount: 58000, height: 96, label: '₹ 58,000' },
    { day: 'F', amount: 45000, height: 75, label: '₹ 45,000' },
    { day: 'S', amount: 20000, height: 33, label: '₹ 20,000' },
    { day: 'Today', amount: 29000, height: 48, label: '₹ 29,000', isToday: true }
  ];

  const handleAddNewItem = (newItem) => {
    setMenuItems(prev => [newItem, ...prev]);
    setActiveTab('home');
  };

  return (
    <div className={`restaurant-home-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="restaurant-container">

        {activeTab === 'add' ? (
          <AddItemPage 
            onBackToHome={() => setActiveTab('home')}
            onItemAdded={handleAddNewItem}
          />
        ) : activeTab === 'profile' ? (
          <ProfilePage 
            onBackToHome={() => setActiveTab('home')} 
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onLogout={onLogout}
          />
        ) : (
          <div className="home-content">
            <div className="home-header">
              <div className="user-greeting">
                <h1>Hello, Canteen</h1>
              </div>
            </div>

            <div className="stat-cards-grid">
              <div 
                className="stat-card running-orders-card"
                onClick={() => setIsRunningOrdersOpen(true)}
              >
                <div className="stat-info">
                  <h2>50</h2>
                  <p>Running Orders</p>
                </div>
              </div>

              <div 
                className="stat-card order-request-card"
                onClick={() => setIsOrdersRequestOpen(true)}
              >
                <div className="stat-info">
                  <h2>05</h2>
                  <p>Order Request</p>
                </div>
              </div>
            </div>

            <div className="revenue-chart-section">
              <div className="section-header">
                <h3>Total Revenue</h3>
                <select 
                  className="timeframe-select"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div className="revenue-bars-container">
                {revenueData.map((item, index) => (
                  <div key={index} className="bar-column">
                    <div className="bar-wrapper">
                      <div 
                        className={`bar-fill ${item.isToday ? 'today-bar' : ''}`}
                        style={{ height: `${item.height}%` }}
                      >
                        <span className="bar-tooltip">{item.label}</span>
                      </div>
                    </div>
                    <span className={`bar-label ${item.isToday ? 'today-label' : ''}`}>
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <nav className="bottom-nav">
          <button 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <div className="nav-icon">
              <HomeIcon size={22} />
            </div>
            <span>Home</span>
          </button>

          <button 
            className={`nav-item add-tab ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <div className="add-icon-circle">
              <Plus size={28} strokeWidth={2.5} />
            </div>
            <span>Add Item</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <div className="nav-icon">
              <User size={22} />
            </div>
            <span>Profile</span>
          </button>
        </nav>

        <RunningOrdersModal 
          isOpen={isRunningOrdersOpen}
          onClose={() => setIsRunningOrdersOpen(false)}
        />

        <OrdersRequestModal 
          isOpen={isOrdersRequestOpen}
          onClose={() => setIsOrdersRequestOpen(false)}
        />

      </div>
    </div>
  );
};

export default Home;
