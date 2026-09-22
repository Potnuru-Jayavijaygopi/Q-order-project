import React from 'react';
import './RunningOrdersModal.css';

const RunningOrdersModal = ({ orders, onClose, onSelectOrder, onCancelOrder }) => {
  return (
    <div className="running-orders-modal-overlay" onClick={onClose}>
      <div 
        className="running-orders-modal-sheet" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-drag-handle-bar" />

        <div className="sheet-header">
          <h2 className="sheet-title">Running Orders</h2>
        </div>

        <div className="sheet-orders-scroll-list">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="chef-order-card"
              onClick={() => onSelectOrder(order)}
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
                  onCancelOrder(order.id);
                }}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RunningOrdersModal;
