import React from 'react';
import { ChevronLeft } from 'lucide-react';
import paneerChilliImg from '../../../assets/paneer chilli.png';
import './ChefMyOrdersPage.css';

const ChefMyOrdersPage = ({ order, onBack }) => {
  const isDining = order?.type === 'Dining';

  return (
    <div className="chef-my-orders-page-wrapper">
      <div className="chef-my-orders-container">
        
        <div className="chef-my-orders-header">
          <button 
            className="chef-back-btn" 
            onClick={onBack}
            aria-label="Go Back"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="chef-my-orders-title">My Orders</h1>
        </div>

        <div className="chef-orders-section">
          <h2 className="section-title">Address Details</h2>
          <div className="chef-card-box">
            
            <div className="meta-row">
              <span className="meta-label">User name</span>
              <span className="meta-value bold-dark">{order?.name || 'Kartik Patel'}</span>
            </div>

            {!isDining && (
              <div className="meta-row">
                <span className="meta-label">Address</span>
                <span className="meta-value bold-dark">Room 500 hostel</span>
              </div>
            )}

            <div className="meta-row">
              <span className="meta-label">Phone Number</span>
              <span className="meta-value bold-dark">+91 123 456 7890</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Dining/Parcel</span>
              <span className="parcel-orange-badge">{isDining ? 'Dining' : 'Parcel'}</span>
            </div>

            {isDining && (
              <div className="meta-row">
                <span className="meta-label">Table No.</span>
                <span className="meta-value bold-dark">{order?.tableNo || 7}</span>
              </div>
            )}

          </div>
        </div>

        <div className="chef-orders-section">
          <h2 className="section-title">Items</h2>
          
          <div className="chef-items-list">
            
            <div className="chef-item-card">
              <div className="item-img-wrapper">
                <img src={paneerChilliImg} alt="Panner Chilli" className="item-food-img" />
              </div>

              <div className="item-details-meta">
                <h3 className="item-title">Panner Chilli</h3>
                
                <div className="item-sub-meta">
                  <span className="red-label">Description:</span>
                  <span className="gray-subtext">Make this more spicy</span>
                </div>

                <div className="item-sub-meta">
                  <span className="red-label">Quantity:</span>
                  <span className="gray-subtext">1</span>
                </div>

                <div className="item-sub-meta">
                  <span className="red-label">Misc. Item:</span>
                  <span className="gray-subtext">Extra cheese</span>
                </div>

                <div className="item-sub-meta">
                  <span className="red-label">Misc. amount:</span>
                  <span className="gray-subtext">100</span>
                </div>

                <div className="item-sub-meta">
                  <span className="red-label">Tax:</span>
                  <span className="gray-subtext">50</span>
                </div>

                <span className="item-card-price">₹ 300</span>
              </div>
            </div>

            <div className="chef-item-card">
              <div className="item-img-wrapper">
                <img src={paneerChilliImg} alt="Panner Chilli" className="item-food-img" />
              </div>

              <div className="item-details-meta">
                <h3 className="item-title">Panner Chilli</h3>
                
                <div className="item-sub-meta">
                  <span className="red-label">Description:</span>
                  <span className="gray-subtext">Make this more spicy</span>
                </div>

                <div className="item-sub-meta">
                  <span className="red-label">Quantity:</span>
                  <span className="gray-subtext">2</span>
                </div>

                <div className="item-sub-meta">
                  <span className="red-label">Tax:</span>
                  <span className="gray-subtext">50</span>
                </div>

                <span className="item-card-price">₹ 300</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ChefMyOrdersPage;
