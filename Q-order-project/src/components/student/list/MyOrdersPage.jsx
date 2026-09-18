import React, { useState, useEffect } from 'react';
import { ChevronLeft, Download, Check } from 'lucide-react';
import paneerChilliImg from '../../../assets/paneer chilli.png';
import './MyOrdersPage.css';

const MyOrdersPage = ({ onBack, onGoToHome }) => {
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThankYouModal(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-orders-page-wrapper">
      <div className="my-orders-container">

        <div className="my-orders-header">
          <div className="header-left-title">
            <button 
              className="my-orders-back-btn" 
              onClick={onBack || onGoToHome}
              aria-label="Go Back"
            >
              <ChevronLeft size={28} />
            </button>
            <h1 className="my-orders-title">My Orders</h1>
          </div>

          <button 
            className="download-invoice-pill-btn"
            onClick={() => alert('Downloading Invoice #326589...')}
          >
            <Download size={14} className="download-icon" />
            <span>Download Invoice</span>
          </button>
        </div>

        <div className="my-orders-section">
          <h2 className="section-title">Order Details</h2>
          <div className="orders-card-box">
            
            <div className="meta-row">
              <span className="meta-label">Order Id</span>
              <span className="meta-value bold-dark">#326589</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">User name</span>
              <span className="meta-value bold-dark">Kartik Patel</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Phone Number</span>
              <span className="meta-value bold-dark">+91 123 456 7890</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Subtotal</span>
              <span className="meta-value bold-dark">₹400</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Discount</span>
              <span className="meta-value discount-red">-₹50</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Total Misc.</span>
              <span className="meta-value bold-dark">₹100</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Total Tax</span>
              <span className="meta-value bold-dark">₹150</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Platform Free</span>
              <span className="meta-value bold-dark">₹20</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Created Date</span>
              <span className="meta-value date-green">18/01/2024</span>
            </div>

            <div className="dashed-line-divider" />

            <div className="meta-row total-pay-row">
              <span className="total-pay-label">Total Pay</span>
              <span className="total-pay-price">₹620</span>
            </div>

          </div>
        </div>

        <div className="my-orders-section">
          <h2 className="section-title">Address Details</h2>
          <div className="orders-card-box">
            
            <div className="meta-row">
              <span className="meta-label">Canteen Address</span>
              <span className="meta-value bold-dark">Room 500 hostel</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">City</span>
              <span className="meta-value bold-dark">Surat</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">Dining/Parcel</span>
              <span className="parcel-orange-badge">Parcel</span>
            </div>

          </div>
        </div>

        <div className="my-orders-section">
          <h2 className="section-title">Items</h2>
          
          <div className="items-cards-list">

            <div className="order-item-card">
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

            <div className="order-item-card">
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

        {showThankYouModal && (
          <div className="thankyou-modal-overlay">
            <div className="thankyou-modal-card">
              
              <div className="checkmark-circle-icon">
                <Check size={32} color="#ffffff" strokeWidth={3} />
              </div>

              <h2 className="thankyou-title">Thank You!</h2>
              <p className="thankyou-subtitle">Thank you for placing the order</p>

              <div className="thankyou-divider" />

              <button 
                className="go-to-home-btn"
                onClick={() => {
                  setShowThankYouModal(false);
                  if (onGoToHome) onGoToHome();
                }}
              >
                Go to Home
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrdersPage;
