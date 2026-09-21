import React, { useState } from 'react';
import { 
  Bell, 
  ShoppingCart, 
  Home as HomeIcon, 
  List, 
  Plus, 
  User 
} from 'lucide-react';
import RunningOrdersModal from './RunningOrdersModal';
import OrdersRequestModal from './OrdersRequestModal';
import MenuList from '../list/MenuList';
import NotificationPage from '../notification/NotificationPage';
import AddItemPage from '../addItem/AddItemPage';
import ProfilePage from '../profile/ProfilePage';
import OrderDetailsPage from '../profile/OrderDetailsPage';
import './Home.css';

const initialMenuItems = [
  { id: 1, name: 'Dhokla', price: 50 },
  { id: 2, name: 'Khaman', price: 50 },
  { id: 3, name: 'Pasta', price: 80 },
  { id: 4, name: 'Dhokla', price: 50 },
  { id: 5, name: 'Khaman', price: 50 },
  { id: 6, name: 'Pasta', price: 80 },
  { id: 7, name: 'Dhokla', price: 50 },
  { id: 8, name: 'Khaman', price: 50 },
  { id: 9, name: 'Pasta', price: 80 },
];

const Home = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home'); 
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [timeframe, setTimeframe] = useState('Weekly');
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [isRunningOrdersOpen, setIsRunningOrdersOpen] = useState(false);
  const [isOrdersRequestOpen, setIsOrdersRequestOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

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
    setActiveTab('list');
  };

  return (
    <div className={`restaurant-home-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="restaurant-container">

        {selectedOrderDetails ? (
          <OrderDetailsPage 
            order={selectedOrderDetails}
            onBack={() => setSelectedOrderDetails(null)}
          />
        ) : activeTab === 'list' ? (
          <MenuList 
            items={menuItems}
            setItems={setMenuItems}
            onBackToHome={() => setActiveTab('home')} 
          />
        ) : activeTab === 'add' ? (
          <AddItemPage 
            onBackToHome={() => setActiveTab('home')}
            onItemAdded={handleAddNewItem}
          />
        ) : activeTab === 'notification' ? (
          <NotificationPage onBackToHome={() => setActiveTab('home')} />
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
                <h1>Hello,</h1>
              </div>
              <button 
                className="notification-btn" 
                onClick={() => setActiveTab('notification')}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notificationsCount > 0 && <span className="notification-badge" />}
              </button>
            </div>

            <div className="discount-banner">
              <div className="banner-left">
                <span className="banner-title">Hurry Up!</span>
                <span className="banner-subtitle">The Discount is</span>
              </div>
              <div className="banner-right">
                50%
              </div>
            </div>

            <div className="action-grid">
              <button 
                className="action-card" 
                onClick={() => setIsRunningOrdersOpen(true)}
              >
                <div className="action-icon">
                  <ShoppingCart size={22} />
                </div>
                <span>Running Orders</span>
              </button>

              <button 
                className="action-card" 
                onClick={() => setIsOrdersRequestOpen(true)}
              >
                <div className="action-icon">
                  <ShoppingCart size={22} />
                </div>
                <span>Orders Request</span>
              </button>
            </div>

            <div className="revenue-section">
              <div className="revenue-header">
                <h2 className="revenue-title">Revenue</h2>
                <button 
                  className="see-details-btn" 
                  onClick={() => alert('Viewing detailed revenue analytics...')}
                >
                  See Details
                </button>
              </div>

              <div className="revenue-card">
                <div className="revenue-card-top">
                  <div className="total-revenue-meta">
                    <span className="revenue-label">Total Revenue</span>
                    <span className="revenue-amount">₹ 80,000</span>
                  </div>
                  
                  <div className="period-dropdown-wrapper">
                    <select 
                      className="period-dropdown"
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                <div className="chart-container">
                  
                  <div className="chart-y-axis">
                    <span>60K</span>
                    <span>40K</span>
                    <span>20K</span>
                    <span>0</span>
                  </div>

                  <div className="chart-bars-wrapper">
                    
                    <div className="chart-grid-lines">
                      <div className="grid-line" />
                      <div className="grid-line" />
                      <div className="grid-line" />
                      <div className="grid-line" />
                    </div>

                    <div className="chart-bars">
                      {revenueData.map((item, index) => (
                        <div key={index} className="bar-column">
                          <span className="bar-tooltip">{item.label}</span>
                          <div 
                            className="bar-fill" 
                            style={{ height: `${item.height}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="chart-x-axis">
                  {revenueData.map((item, index) => (
                    <span 
                      key={index} 
                      className={`x-label ${item.isToday ? 'today' : ''}`}
                    >
                      {item.day}
                    </span>
                  ))}
                </div>
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
            className={`nav-item ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <div className="nav-icon">
              <List size={22} />
            </div>
            <span>List</span>
          </button>

          <button 
            className={`nav-item-add ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <div className="add-btn-circle">
              <Plus size={28} strokeWidth={2.5} />
            </div>
            <span>Add</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'notification' ? 'active' : ''}`}
            onClick={() => setActiveTab('notification')}
          >
            <div className="nav-icon">
              <Bell size={22} />
            </div>
            <span>Notification</span>
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
          onSelectOrder={(order) => {
            setIsRunningOrdersOpen(false);
            setSelectedOrderDetails(order);
          }}
        />

        <OrdersRequestModal 
          isOpen={isOrdersRequestOpen}
          onClose={() => setIsOrdersRequestOpen(false)}
          onSelectOrder={(order) => {
            setIsOrdersRequestOpen(false);
            setSelectedOrderDetails(order);
          }}
        />

      </div>
    </div>
  );
};

export default Home;
