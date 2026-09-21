import React, { useState } from 'react';
import { ChevronLeft, Minus, Plus, Trash2 } from 'lucide-react';
import paneerChilliImg from '../../../assets/paneer chilli.png';
import MyOrdersPage from './MyOrdersPage';
import './FoodCartPage.css';

const FoodCartPage = ({ onBack, onPayNowSuccess }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Panner Chilli', desc: 'Delicious cottage cheese tossed in spicy sauce', price: 300, quantity: 2, image: paneerChilliImg },
    { id: 2, name: 'Panner Chilli', desc: 'Delicious cottage cheese tossed in spicy sauce', price: 300, quantity: 1, image: paneerChilliImg },
  ]);
  const [address, setAddress] = useState('');
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState(false);

  const handleIncrement = (id) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrement = (id) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const discount = 100;
  const finalTotalPay = Math.max(0, subtotalPrice - discount);

  if (isMyOrdersOpen) {
    return (
      <MyOrdersPage 
        onBack={() => setIsMyOrdersOpen(false)}
        onGoToHome={() => {
          setIsMyOrdersOpen(false);
          if (onPayNowSuccess) {
            onPayNowSuccess(finalTotalPay);
          } else if (onBack) {
            onBack();
          }
        }}
      />
    );
  }

  return (
    <div className="food-cart-page-wrapper">
      <div className="food-cart-container">

        <div className="food-cart-header">
          <button 
            className="food-cart-back-btn" 
            onClick={onBack}
            aria-label="Go Back"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="food-cart-title">Food Cart</h1>
        </div>

        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-img-wrapper">
                <img src={item.image} alt={item.name} className="cart-item-img" />
              </div>
              
              <div className="cart-item-info">
                <h2 className="cart-item-name">{item.name}</h2>
                <span className="cart-item-desc">{item.desc}</span>
                <span className="cart-item-price">₹ {item.price}</span>
              </div>

              <div className="cart-qty-pill">
                {index === 1 ? (
                  <button 
                    className="cart-qty-btn trash-btn" 
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </button>
                ) : (
                  <button 
                    className="cart-qty-btn" 
                    onClick={() => handleDecrement(item.id)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                )}
                
                <span className="cart-qty-number">{item.quantity}</span>
                
                <button 
                  className="cart-qty-btn" 
                  onClick={() => handleIncrement(item.id)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-section">
          <h2 className="summary-title">Summary</h2>
          
          <div className="summary-row">
            <span className="summary-label">Price({totalItemsCount} item)</span>
            <span className="summary-value">₹{subtotalPrice}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Discount</span>
            <span className="summary-value discount-value">-₹{discount}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Delivery Change</span>
            <span className="summary-value free-delivery">Free Delivery</span>
          </div>

          <div className="dashed-divider" />

          <div className="summary-row total-pay-row">
            <span className="total-pay-label">Total Pay</span>
            <span className="total-pay-value">₹{finalTotalPay}</span>
          </div>
        </div>

        <div className="address-section">
          <h2 className="address-title">Address</h2>
          <input 
            type="text"
            className="address-pill-input"
            placeholder="Add address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="cart-action-wrapper">
          <button 
            className="pay-now-btn"
            onClick={() => setIsMyOrdersOpen(true)}
          >
            Pay Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default FoodCartPage;
