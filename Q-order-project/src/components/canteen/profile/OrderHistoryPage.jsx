import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import OrderDetailsPage from './OrderDetailsPage';
import './OrderHistoryPage.css';

const historyOrders = [
  { id: 1, number: '#1', invoiceId: 'Invoice ID: #32053', customerName: 'Kartik Patel', tableNo: 'Table No: 32', price: '₹ 300', type: 'Dining', date: '01/01/2024' },
  { id: 2, number: '#1', invoiceId: 'Invoice ID: #32053', customerName: 'Kartik Patel', tableNo: '', price: '₹ 300', type: 'Parcel', date: '01/01/2024' },
  { id: 3, number: '#1', invoiceId: 'Invoice ID: #32053', customerName: 'Kartik Patel', tableNo: '', price: '₹ 300', type: 'Parcel', date: '01/01/2024' },
  { id: 4, number: '#1', invoiceId: 'Invoice ID: #32053', customerName: 'Kartik Patel', tableNo: '', price: '₹ 300', type: 'Parcel', date: '01/01/2024' },
  { id: 5, number: '#1', invoiceId: 'Invoice ID: #32053', customerName: 'Kartik Patel', tableNo: 'Table No: 32', price: '₹ 300', type: 'Dining', date: '01/01/2024' },
  { id: 6, number: '#1', invoiceId: 'Invoice ID: #32053', customerName: 'Kartik Patel', tableNo: 'Table No: 32', price: '₹ 300', type: 'Dining', date: '01/01/2024' },
  { id: 7, number: '#1', invoiceId: 'Invoice ID: #32053', customerName: 'Kartik Patel', tableNo: 'Table No: 32', price: '₹ 300', type: 'Dining', date: '01/01/2024' },
];

const OrderHistoryPage = ({ onBackToProfile }) => {
  const [startDate, setStartDate] = useState('01/01/2024');
  const [endDate, setEndDate] = useState('31/01/2024');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDateSelect = (type) => {
    const newDate = prompt(`Enter ${type} (DD/MM/YYYY):`, type === 'Start Date' ? startDate : endDate);
    if (newDate && newDate.trim() !== '') {
      if (type === 'Start Date') setStartDate(newDate.trim());
      else setEndDate(newDate.trim());
    }
  };

  if (selectedOrder) {
    return <OrderDetailsPage order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="order-history-content">
      
      <div className="order-history-header">
        <div className="history-header-left">
          {onBackToProfile && (
            <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
          )}
          <h1 className="order-history-title">Order History</h1>
        </div>

        <div className="date-filter-group">
          <button className="date-pill" onClick={() => handleDateSelect('Start Date')}>
            {startDate}
          </button>
          <button className="date-pill" onClick={() => handleDateSelect('End Date')}>
            {endDate}
          </button>
        </div>
      </div>

      <div className="history-cards-list">
        {historyOrders.map((order) => (
          <div key={order.id} className="history-order-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(order)}>

            <div className="history-card-left">
              <div className="history-number-box">
                {order.number}
              </div>
              <div className="history-details-info">
                <span className="invoice-id-text">{order.invoiceId}</span>
                <h3 className="customer-name">{order.customerName}</h3>
                {order.tableNo && <span className="table-no-text">{order.tableNo}</span>}
                <span className="order-price">{order.price}</span>
              </div>
            </div>

            <div className="history-card-right">
              <span className={order.type === 'Parcel' ? 'parcel-tag' : 'dining-tag'}>
                {order.type}
              </span>
              <span className="order-date-text">{order.date}</span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
