import React from 'react';
import { 
  ChevronLeft, 
  UtensilsCrossed, 
  Home as HomeIcon, 
  ClipboardList, 
  Plus, 
  Bell, 
  User 
} from 'lucide-react';
import './NotificationPage.css';

const notificationsList = [
  { id: 1, title: 'Deals Just For You!', desc: 'Get 50% discount on your special meal orders today!', time: '12 min ago', unread: true },
  { id: 2, title: 'Order Prepared!', desc: 'Your Paneer Chilli order is ready for pickup at the canteen.', time: '15 min ago', unread: true },
  { id: 3, title: 'Order Confirmed', desc: 'Order #32052 has been accepted by the kitchen.', time: '1 hour ago', unread: false },
  { id: 4, title: 'Special Student Offer', desc: 'Enjoy free delivery on all campus orders above ₹200!', time: '2 hours ago', unread: false },
  { id: 5, title: 'Canteen Menu Added', desc: 'New South Indian and Punjabi specials are now live.', time: '3 hours ago', unread: false }
];

const StudentNotificationPage = ({ 
  onBackToHome, 
  activeNavTab = 'notification', 
  onNavTabChange 
}) => {
  return (
    <div className="student-notification-page-wrapper">
      <div className="student-notification-container">

        <div className="student-notification-header">
          <button 
            className="student-notification-back-btn" 
            onClick={onBackToHome}
            aria-label="Go Back"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="student-notification-title">Notification</h1>
        </div>

        <div className="student-notification-list">
          {notificationsList.map((item) => (
            <div key={item.id} className="student-notification-item-row">

              <div className="student-notification-icon-box">
                <UtensilsCrossed size={22} />
              </div>

              <div className="student-notification-info">
                <div className="student-notification-title-row">
                  <h3 className="student-notification-item-title">{item.title}</h3>
                  {item.unread && <span className="student-orange-dot" />}
                </div>
                <p className="student-notification-desc">{item.desc}</p>
                <span className="student-notification-time">{item.time}</span>
              </div>

            </div>
          ))}
        </div>

        <nav className="student-bottom-nav">
          <button 
            className={`student-nav-item ${activeNavTab === 'home' ? 'active' : ''}`}
            onClick={() => onNavTabChange && onNavTabChange('home')}
          >
            <div className="nav-icon">
              <HomeIcon size={22} />
            </div>
            <span>Home</span>
          </button>

          <button 
            className={`student-nav-item ${activeNavTab === 'history' || activeNavTab === 'list' ? 'active' : ''}`}
            onClick={() => onNavTabChange && onNavTabChange('list')}
          >
            <div className="nav-icon">
              <ClipboardList size={22} />
            </div>
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
            <div className="nav-icon">
              <Bell size={22} />
            </div>
            <span>Notification</span>
          </button>

          <button 
            className={`student-nav-item ${activeNavTab === 'profile' ? 'active' : ''}`}
            onClick={() => onNavTabChange && onNavTabChange('profile')}
          >
            <div className="nav-icon">
              <User size={22} />
            </div>
            <span>Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
};

export default StudentNotificationPage;
