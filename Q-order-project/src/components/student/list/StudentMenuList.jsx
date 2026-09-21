import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Home as HomeIcon, 
  ClipboardList, 
  Plus, 
  Bell, 
  User 
} from 'lucide-react';
import chinesImg from '../../../assets/chines.jpg';
import panjabiImg from '../../../assets/panjabi.jpg';
import southImg from '../../../assets/south.jpg';
import gujratiImg from '../../../assets/gujrati.jpg';
import paneerChilliImg from '../../../assets/paneer chilli.png';
import FoodDetailPage from './FoodDetailPage';
import './StudentMenuList.css';

const categories = [
  { id: 1, name: 'Chines', image: chinesImg },
  { id: 2, name: 'Panjabi', image: panjabiImg },
  { id: 3, name: 'South', image: southImg },
  { id: 4, name: 'Gujrati', image: gujratiImg },
  { id: 5, name: 'Chines', image: chinesImg },
  { id: 6, name: 'Panjabi', image: panjabiImg },
];

const foodItems = [
  { id: 1, name: 'Paneer Chilli', desc: 'Delicious cottage cheese tossed in spicy sauce', price: 300, image: paneerChilliImg },
  { id: 2, name: 'Paneer Chilli', desc: 'Delicious cottage cheese tossed in spicy sauce', price: 300, image: paneerChilliImg },
  { id: 3, name: 'Paneer Chilli', desc: 'Delicious cottage cheese tossed in spicy sauce', price: 300, image: paneerChilliImg },
  { id: 4, name: 'Paneer Chilli', desc: 'Delicious cottage cheese tossed in spicy sauce', price: 300, image: paneerChilliImg },
];

const StudentMenuList = ({ onBackToHome, activeNavTab = 'history', onNavTabChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    setCartItems(prev => [...prev, item]);
    setSelectedFoodItem(item);
  };

  if (selectedFoodItem) {
    return (
      <FoodDetailPage 
        item={selectedFoodItem}
        onBack={() => setSelectedFoodItem(null)}
        onOrderConfirmed={() => {
          setSelectedFoodItem(null);
          if (onBackToHome) onBackToHome();
        }}
      />
    );
  }

  return (
    <div className="student-menu-list-wrapper">
      <div className="student-menu-container">

        <div className="student-menu-header">
          <button 
            className="student-back-btn" 
            onClick={onBackToHome}
            aria-label="Go Back"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="student-menu-title">My Food</h1>
        </div>

        <div className="student-discount-banner">
          <div className="banner-text-left">
            <span className="banner-heading">Hurry Up!</span>
            <span className="banner-subheading">The Discount is</span>
          </div>
          <div className="banner-text-right">
            50%
          </div>
        </div>

        <div className="category-scroll-container">
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              className={`category-item-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <div className="category-avatar-circle">
                <img src={cat.image} alt={cat.name} className="category-img" />
              </div>
              <span className="category-name-label">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="food-grid-container">
          {foodItems.map((item, index) => (
            <div 
              key={index} 
              className="food-card"
              onClick={() => setSelectedFoodItem(item)}
            >
              <div className="food-card-img-wrapper">
                <img src={item.image} alt={item.name} className="food-card-img" />
              </div>
              <div className="food-card-body">
                <h3 className="food-card-title">{item.name}</h3>
                <p className="food-card-desc">{item.desc}</p>
                <div className="food-card-footer">
                  <span className="food-card-price">₹{item.price}</span>
                  <button 
                    className="food-cart-bag-btn" 
                    onClick={(e) => handleAddToCart(e, item)}
                    aria-label="Add to cart"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <nav className="student-bottom-nav">
          <button 
            className={`student-nav-item ${activeNavTab === 'home' ? 'active' : ''}`}
            onClick={() => onNavTabChange && onNavTabChange('home')}
          >
            <div className="nav-icon">
              <HomeIcon size={22} />
            </div>
            <span>Home</span>
          </button>

          <button 
            className={`student-nav-item ${activeNavTab === 'history' || activeNavTab === 'list' ? 'active' : ''}`}
            onClick={() => onNavTabChange && onNavTabChange('history')}
          >
            <div className="nav-icon">
              <ClipboardList size={22} />
            </div>
            <span>History</span>
          </button>

          <button 
            className="student-nav-item-add"
            onClick={() => alert('Add Item Action')}
          >
            <div className="add-btn-circle">
              <Plus size={28} strokeWidth={2.5} />
            </div>
            <span>Add</span>
          </button>

          <button 
            className={`student-nav-item ${activeNavTab === 'notification' ? 'active' : ''}`}
            onClick={() => onNavTabChange && onNavTabChange('notification')}
          >
            <div className="nav-icon">
              <Bell size={22} />
            </div>
            <span>Notification</span>
          </button>

          <button 
            className={`student-nav-item ${activeNavTab === 'profile' ? 'active' : ''}`}
            onClick={() => onNavTabChange && onNavTabChange('profile')}
          >
            <div className="nav-icon">
              <User size={22} />
            </div>
            <span>Profile</span>
          </button>
        </nav>

      </div>
    </div>
  );
};

export default StudentMenuList;
