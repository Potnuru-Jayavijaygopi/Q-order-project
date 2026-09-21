import React, { useState } from 'react';
import { 
  Bell, 
  Home as HomeIcon, 
  ClipboardList, 
  User 
} from 'lucide-react';
import RunningOrdersModal from './RunningOrdersModal';
import ChefMyOrdersPage from '../orders/ChefMyOrdersPage';
import ChefMenuList from '../list/ChefMenuList';
import ChefProfilePage from '../profile/ChefProfilePage';
import NotificationPage from '../../restaurant/notification/NotificationPage';
import './ChefHome.css';

const initialRunningOrders = [
  { id: 1, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: 32, price: 300, date: '18 January 2024', type: 'Dining' },
  { id: 2, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: null, price: 300, date: '18 January 2024', type: 'Parcel' },
  { id: 3, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: 32, price: 300, date: '18 January 2024', type: 'Dining' },
  { id: 4, invoiceNo: '#32053', name: 'Kartik Patel', tableNo: null, price: 300, date: '18 January 2024', type: 'Parcel' },
];

const ChefHome = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [runningOrders, setRunningOrders] = useState(initialRunningOrders);
  const [isSeeAllModalOpen, setIsSeeAllModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCancelOrder = (orderId) => {
    setRunningOrders(prev => prev.filter(o => o.id !== orderId));
  };

  if (selectedOrder) {
    return (
      <ChefMyOrdersPage 
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className={`chef-home-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="chef-container">
        
        {activeTab === 'notification' ? (
          <NotificationPage onBackToHome={() => setActiveTab('home')} />
        ) : activeTab === 'profile' ? (
          <ChefProfilePage 
            onBackToHome={() => setActiveTab('home')} 
            activeNavTab={activeTab}
            onNavTabChange={(tab) => setActiveTab(tab)}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onLogout={onLogout}
          />
        ) : activeTab === 'history' ? (
          <ChefMenuList 
            onBackToHome={() => setActiveTab('home')}
            activeNavTab={activeTab}
            onNavTabChange={(tab) => setActiveTab(tab)}
          />
        ) : (
          
          <>
            <div className="chef-home-content">
              
              <div className="chef-header">
                <div className="chef-greeting">
                  <h1>Hello,</h1>
                </div>
                <button 
                  className="chef-notification-btn" 
                  onClick={() => setActiveTab('notification')}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  <span className="chef-notification-badge" />
                </button>
              </div>

              <div className="chef-discount-banner">
                <div className="banner-text-left">
                  <span className="banner-heading">Hurry Up!</span>
                  <span className="banner-subheading">The Discount is</span>
                </div>
                <div className="banner-text-right">
                  50%
                </div>
              </div>

              <div className="section-header-row">
                <h2 className="section-title-bold">Running Orders</h2>
                <button 
                  className="see-all-link-btn"
                  onClick={() => setIsSeeAllModalOpen(true)}
                >
                  See All
                </button>
              </div>

              <div className="running-orders-list">
                {runningOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className="chef-order-card"
                    onClick={() => setSelectedOrder(order)}
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

                    <button 
                      className="cancel-order-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelOrder(order.id);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>

            </div>

            {isSeeAllModalOpen && (
              <RunningOrdersModal 
                orders={runningOrders}
                onClose={() => setIsSeeAllModalOpen(false)}
                onSelectOrder={(order) => {
                  setIsSeeAllModalOpen(false);
                  setSelectedOrder(order);
                }}
                onCancelOrder={handleCancelOrder}
              />
            )}

            <nav className="chef-bottom-nav">
              <button 
                className={`chef-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                <div className="nav-icon">
                  <HomeIcon size={22} />
                </div>
                <span>Home</span>
              </button>

              <button 
                className={`chef-nav-item ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <div className="nav-icon">
                  <ClipboardList size={22} />
                </div>
                <span>History</span>
              </button>

              <button 
                className={`chef-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
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

export default ChefHome;
