import React from 'react';
import { ChevronLeft, UtensilsCrossed } from 'lucide-react';
import './NotificationPage.css';

const notificationsList = [
  { id: 1, title: 'Deals Just For You!', desc: 'Get 50% discount on your special meal orders today!', time: '12 min ago', unread: true },
  { id: 2, title: 'New Order Received', desc: 'Order #32053 has been placed by Kartik Patel.', time: '15 min ago', unread: true },
  { id: 3, title: 'Order Completed', desc: 'Order #32052 has been successfully completed.', time: '1 hour ago', unread: false },
  { id: 4, title: 'Special Offer Available', desc: 'Enjoy free platform delivery on orders above ₹300!', time: '2 hours ago', unread: false },
  { id: 5, title: 'Menu Item Updated', desc: 'Paneer Chilli status updated to available in stock.', time: '3 hours ago', unread: false },
  { id: 6, title: 'Kitchen Status Normal', desc: 'Peak lunch hours ended smoothly with 45 completed orders.', time: '5 hours ago', unread: false }
];

const NotificationPage = ({ onBackToHome }) => {
  return (
    <div className="notification-page-content">
      
      <div className="notification-header">
        {onBackToHome && (
          <button className="back-btn" onClick={onBackToHome} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
        )}
        <h1 className="notification-title">Notification</h1>
      </div>

      <div className="notification-list">
        {notificationsList.map((item) => (
          <div key={item.id} className="notification-item-row">

            <div className="notification-icon-box">
              <UtensilsCrossed size={24} />
            </div>

            <div className="notification-info">
              <div className="notification-item-title-row">
                <h3 className="notification-item-title">{item.title}</h3>
                {item.unread && <span className="orange-dot" />}
              </div>
              <p className="notification-desc">{item.desc}</p>
              <span className="notification-time">{item.time}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
