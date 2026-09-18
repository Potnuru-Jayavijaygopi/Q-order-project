import React, { useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import './RunningOrders.css';

const initialOrders = [
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
    tableNo: 'Table No: 32',
    price: '₹ 300',
    type: 'Dining',
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
  },
  {
    id: 5,
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

const RunningOrdersModal = ({ isOpen, onClose, onSelectOrder }) => {
  const [orders, setOrders] = useState(initialOrders);

  if (!isOpen) return null;

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const activeOrdersCount = orders.filter(o => o.status === 'pending').length;
  const formattedCount = activeOrdersCount < 10 ? `0${activeOrdersCount}` : activeOrdersCount;

  return (
    <div className="orders-modal-backdrop" onClick={onClose}>
      <div className="orders-modal-sheet" onClick={(e) => e.stopPropagation()}>

        <div className="sheet-header-handle" onClick={onClose}>
          <div className="handle-bar" />
        </div>

        <div className="sheet-header">
          <div className="sheet-title-group">
            <h2 className="sheet-title">{formattedCount} Running Orders</h2>
          </div>
          <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="orders-list-body">
          {orders.length === 0 ? (
            <div className="empty-orders">No running orders available</div>
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
                      <span className="table-no-text">{order.tableNo}</span>
                      <span className="order-price">{order.price}</span>
                    </div>
                  </div>

                  <div className="order-right-meta">
                    <span className="dining-tag">{order.type}</span>
                    <span className="order-date-text">{order.date}</span>
                  </div>

                </div>

                <div className="order-action-buttons">
                  {order.status === 'pending' ? (
                    <>
                      <button 
                        className="btn-completed" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, 'completed');
                        }}
                      >
                        Completed
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
                  ) : order.status === 'completed' ? (
                    <div className="status-badge-completed">
                      ✓ Order Completed
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

export default RunningOrdersModal;
