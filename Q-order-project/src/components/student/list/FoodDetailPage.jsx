import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Minus, 
  Plus, 
  CheckSquare, 
  Square 
} from 'lucide-react';
import paneerChilliImg from '../../../assets/paneer chilli.png';
import FoodCartPage from './FoodCartPage';
import './FoodDetailPage.css';

const FoodDetailPage = ({ item, onBack, onBuyNow, onOrderConfirmed }) => {
  const [quantity, setQuantity] = useState(2);
  const [customText, setCustomText] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [miscOptions, setMiscOptions] = useState([
    { id: 1, name: 'Extra Panner', price: 40, checked: true },
    { id: 2, name: 'Cold Drink', price: 20, checked: true },
    { id: 3, name: 'Extra Masala', price: 20, checked: true },
  ]);

  const toggleMiscOption = (id) => {
    setMiscOptions(prev => prev.map(opt => 
      opt.id === id ? { ...opt, checked: !opt.checked } : opt
    ));
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const basePrice = (item?.price || 300) * quantity;
  const miscTotal = miscOptions
    .filter(opt => opt.checked)
    .reduce((sum, opt) => sum + opt.price, 0);
  const totalPrice = basePrice + miscTotal;

  if (isCartOpen) {
    return (
      <FoodCartPage 
        onBack={() => setIsCartOpen(false)}
        onPayNowSuccess={(amount) => {
          setIsCartOpen(false);
          if (onOrderConfirmed) {
            onOrderConfirmed();
          } else if (onBack) {
            onBack();
          }
        }}
      />
    );
  }

  return (
    <div className="food-detail-page-wrapper">
      <div className="food-detail-container">

        <div className="food-detail-header">
          <button 
            className="food-detail-back-btn" 
            onClick={onBack}
            aria-label="Go Back"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="food-detail-title">{item?.name || 'Panir Chilli'}</h1>
          <button 
            className="food-detail-cart-btn" 
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={20} />
          </button>
        </div>

        <div className="hero-img-container">
          <img 
            src={paneerChilliImg} 
            alt={item?.name || 'Paneer Chilli'} 
            className="hero-food-img" 
          />
        </div>

        <div className="item-meta-card">
          <div className="item-meta-left">
            <h2 className="item-name">{item?.name || 'Paneer Chilli'}</h2>
            <span className="item-subtext">{item?.desc || 'Delicious cottage cheese tossed in spicy sauce'}</span>
            <span className="item-base-price">₹{item?.price || 300}</span>
          </div>

          <div className="quantity-counter">
            <button 
              className="qty-btn qty-minus-btn" 
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="qty-count">{quantity}</span>
            <button 
              className="qty-btn qty-plus-btn" 
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="detail-section">
          <h3 className="section-title">Description</h3>
          <div className="description-card">
            <p>
              Delicious cottage cheese tossed in spicy Indo-Chinese sauce with bell peppers and onions. Prepared fresh to order.
            </p>
          </div>
        </div>

        <div className="detail-section">
          <h3 className="section-title">Miscellaneous Items</h3>
          <div className="misc-items-list">
            {miscOptions.map((opt) => (
              <div 
                key={opt.id} 
                className="misc-item-row"
                onClick={() => toggleMiscOption(opt.id)}
              >
                <div className="misc-left">
                  <div className={`checkbox-box ${opt.checked ? 'checked' : ''}`}>
                    {opt.checked ? (
                      <CheckSquare size={22} className="check-icon" />
                    ) : (
                      <Square size={22} className="uncheck-icon" />
                    )}
                  </div>
                  <span className={`misc-name ${opt.checked ? 'active' : ''}`}>{opt.name}</span>
                </div>
                <span className="misc-price">₹{opt.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3 className="section-title">Food Customization</h3>
          <textarea 
            className="customization-textarea"
            placeholder="Enter"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
          />
        </div>

        <div className="food-detail-footer">
          <div className="footer-price-meta">
            <span className="price-label">Price</span>
            <span className="total-price-value">₹{totalPrice}</span>
          </div>
          <button 
            className="buy-now-btn"
            onClick={() => {
              if (onBuyNow) {
                onBuyNow({ item, quantity, totalPrice, customText, miscOptions });
              }
              setIsCartOpen(true);
            }}
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default FoodDetailPage;
