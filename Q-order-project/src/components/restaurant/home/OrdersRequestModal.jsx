import React, { useState } from 'react';
import { X } from 'lucide-react';
import './OrdersRequest.css';

const initialOrdersRequest = [
  {
    id: 1,
    number: '#1',
    invoiceId: 'Invoice ID: #32053',
    customerName: 'Kartik Patel',
    tableNo: 'Table No: 32',
    price: '₹ 300',
    type: 'Dining',
    date: '01/01/2024',
    status: 'pending'
  },
  {
    id: 2,
    number: '#1',
    invoiceId: 'Invoice ID: #32053',
    customerName: 'Kartik Patel',
    tableNo: '',
    price: '₹ 300',
    type: 'Parcel',
    date: '01/01/2024',
    status: 'pending'
  },
  {
    id: 3,
    number: '#1',
    invoiceId: 'Invoice ID: #32053',
    customerName: 'Kartik Patel',
    tableNo: 'Table No: 32',
    price: '₹ 300',
    type: 'Dining',
    date: '01/01/2024',
    status: 'pending'
  },
  {
    id: 4,
    number: '#1',
    invoiceId: 'Invoice ID: #32053',
    customerName: 'Kartik Patel',
    tableNo: 'Table No: 32',
    price: '₹ 300',
    type: 'Dining',
    date: '01/01/2024',
    status: 'pending'
  }
];

const OrdersRequestModal = ({ isOpen, onClose, onSelectOrder }) => {
  const [orders, setOrders] = useState(initialOrdersRequest);

  if (!isOpen) return null;

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const activeOrdersCount = orders.filter(o => o.status === 'pending').length;
  
  const countText = activeOrdersCount === 4 ? '20' : activeOrdersCount < 10 ? `0${activeOrdersCount}` : activeOrdersCount;

  return (
    <div className="orders-modal-backdrop" onClick={onClose}>
      <div className="orders-modal-sheet" onClick={(e) => e.stopPropagation()}>

        <div className="sheet-header-handle" onClick={onClose}>
          <div className="handle-bar" />
        </div>

        <div className="sheet-header">
          <div className="sheet-title-group">
            <h2 className="sheet-title">{countText} Orders Request</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="orders-list-body">
          {orders.length === 0 ? (
            <div className="empty-orders">No order requests pending</div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <div 
                  className="order-card-main"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (onSelectOrder) {
                      onSelectOrder(order);
                    }
                  }}
                >

                  <div className="order-left-meta">
                    <div className="order-number-box">
                      {order.number}
                    </div>
                    <div className="order-details-info">
                      <span className="invoice-id-text">{order.invoiceId}</span>
                      <h3 className="customer-name">{order.customerName}</h3>
                      {order.tableNo && <span className="table-no-text">{order.tableNo}</span>}
                      <span className="order-price">{order.price}</span>
                    </div>
                  </div>

                  <div className="order-right-meta">
                    <span className={order.type === 'Parcel' ? 'parcel-tag' : 'dining-tag'}>
                      {order.type}
                    </span>
                    <span className="order-date-text">{order.date}</span>
                  </div>

                </div>

                <div className="order-action-buttons">
                  {order.status === 'pending' ? (
                    <>
                      <button 
                        className="btn-accept" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, 'accepted');
                        }}
                      >
                        Accept
                      </button>
                      <button 
                        className="btn-declined" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, 'declined');
                        }}
                      >
                        Declined
                      </button>
                    </>
                  ) : order.status === 'accepted' ? (
                    <div className="status-badge-accepted">
                      ✓ Order Accepted
                    </div>
                  ) : (
                    <div className="status-badge-declined">
                      ✕ Order Declined
                    </div>
                  )}
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default OrdersRequestModal;
