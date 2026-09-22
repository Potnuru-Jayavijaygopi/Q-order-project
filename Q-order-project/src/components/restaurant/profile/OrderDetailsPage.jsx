import React, { useEffect } from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import paneerChilliImg from '../../../assets/paneer chilli.png';
import './OrderDetailsPage.css';

const OrderDetailsPage = ({ order, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const invoiceNumber = order?.invoiceId 
    ? (order.invoiceId.includes('#') ? order.invoiceId.substring(order.invoiceId.indexOf('#')) : `#${order.invoiceId}`) 
    : (order?.id ? `#32658${order.id}` : '#326589');
  
  const customerName = order?.customerName || 'Kartik Patel';
  const createdDate = order?.date || '18/01/2024';
  const orderType = order?.type || 'Parcel';

  const handleDownloadInvoice = () => {
    alert(`Downloading invoice ${invoiceNumber}...`);
  };

  return (
    <div className="order-details-wrapper">
      
      <div className="order-details-header">
        <div className="header-left-group">
          <button className="back-btn" onClick={onBack} aria-label="Go Back">
            <ChevronLeft size={26} />
          </button>
          <h1 className="header-page-title">My Orders</h1>
        </div>

        <button className="download-invoice-btn" onClick={handleDownloadInvoice}>
          <span className="download-icon-circle">
            <Download size={14} color="#ffffff" />
          </span>
          <span>Download Invoice</span>
        </button>
      </div>

      <div className="order-section">
        <h2 className="section-heading">Order Details</h2>

        <div className="order-details-card">
          <div className="detail-row">
            <span className="detail-label">Order Id</span>
            <span className="detail-value">{invoiceNumber}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">User name</span>
            <span className="detail-value">{customerName}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Phone Number</span>
            <span className="detail-value">+91 123 456 7890</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Subtotal</span>
            <span className="detail-value">₹400</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Discount</span>
            <span className="detail-value discount-text">-₹50</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Total Misc.</span>
            <span className="detail-value">₹100</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Total Tax</span>
            <span className="detail-value">₹150</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Platform Free</span>
            <span className="detail-value">₹20</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Created Date</span>
            <span className="detail-value date-green">{createdDate}</span>
          </div>

          <div className="card-dashed-divider" />

          <div className="detail-row total-row">
            <span className="total-label">Total Pay</span>
            <span className="total-value">₹620</span>
          </div>
        </div>
      </div>

      <div className="order-section">
        <h2 className="section-heading">Address Details</h2>

        <div className="order-details-card">
          <div className="detail-row">
            <span className="detail-label">Canteen Address</span>
            <span className="detail-value bold-text">Room 500 hostel</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">City</span>
            <span className="detail-value bold-text">Surat</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Dining/Parcel</span>
            <span className="dining-parcel-badge">
              {orderType}
            </span>
          </div>
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
  );
};

export default OrderDetailsPage;
