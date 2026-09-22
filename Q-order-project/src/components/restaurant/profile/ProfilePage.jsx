import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Utensils, 
  ClipboardList, 
  ChefHat, 
  History, 
  Star, 
  Percent, 
  Headphones, 
  ShieldCheck, 
  FileText, 
  Settings, 
  LogOut 
} from 'lucide-react';
import EditProfilePage from './EditProfilePage';
import ChefPage from './ChefPage';
import CuisinesPage from './CuisinesPage';
import MiscellaneousPage from './MiscellaneousPage';
import RecipesMasterPage from './RecipesMasterPage';
import ItemMasterPage from './ItemMasterPage';
import OrderHistoryPage from './OrderHistoryPage';
import SupportPage from './SupportPage';
import SettingPage from './SettingPage';
import ChangePasswordPage from './ChangePasswordPage';
import MenuList from '../list/MenuList';
import { ReviewModal, DiscountModal, WaterBottleModal, LogoutModal } from './ProfileModals';
import { TermsPage, PrivacyPolicyPage } from './PolicyPages';
import './ProfilePage.css';

const ProfilePage = ({ onBackToHome, isDarkMode, setIsDarkMode, onLogout }) => {
  const [activeSubPage, setActiveSubPage] = useState(null); 
  const [activeModal, setActiveModal] = useState(null); 

  const accountsMenu = [
    { id: 1, title: 'Personal Info', icon: User, action: 'edit_profile' },
    { id: 2, title: 'Cuisines', icon: Utensils, action: 'cuisines' },
    { id: 3, title: 'Menu', icon: ClipboardList, action: 'menu' },
    { id: 4, title: 'Miscellaneous Items', icon: ClipboardList, action: 'misc' },
    { id: 5, title: 'Item Master', icon: ClipboardList, action: 'item_master' },
    { id: 6, title: 'Recipes Master', icon: ClipboardList, action: 'recipes' },
    { id: 7, title: 'Chefs', icon: ChefHat, action: 'chefs' },
    { id: 8, title: 'Order History', icon: History, action: 'order_history' },
  ];

  const moreMenu = [
    { id: 1, title: 'Review', icon: Star, action: 'review' },
    { id: 2, title: 'Discount', icon: Percent, action: 'discount' },
    { id: 3, title: 'Order Water Bottle', icon: Percent, action: 'water_bottle' },
    { id: 4, title: 'Support', icon: Headphones, action: 'support' },
    { id: 5, title: 'Privacy Policy', icon: ShieldCheck, action: 'privacy_policy' },
    { id: 6, title: 'Term & Condition', icon: FileText, action: 'terms' },
    { id: 7, title: 'Setting', icon: Settings, action: 'settings' },
    { id: 8, title: 'Log out', icon: LogOut, isLogout: true },
  ];

  const handleMenuClick = (item) => {
    if (!item) return;

    if (item.action === 'edit_profile' || item.title === 'Personal Info') {
      setActiveSubPage('edit_profile');
    } else if (item.action === 'cuisines' || item.title === 'Cuisines') {
      setActiveSubPage('cuisines');
    } else if (item.action === 'menu' || item.title === 'Menu') {
      setActiveSubPage('menu');
    } else if (item.action === 'misc' || item.title === 'Miscellaneous Items') {
      setActiveSubPage('misc');
    } else if (item.action === 'item_master' || item.title === 'Item Master') {
      setActiveSubPage('item_master');
    } else if (item.action === 'recipes' || item.title === 'Recipes Master') {
      setActiveSubPage('recipes');
    } else if (item.action === 'chefs' || item.title === 'Chefs') {
      setActiveSubPage('chefs');
    } else if (item.action === 'order_history' || item.title === 'Order History') {
      setActiveSubPage('order_history');
    } else if (item.action === 'terms' || item.title === 'Term & Condition') {
      setActiveSubPage('terms');
    } else if (item.action === 'privacy_policy' || item.title === 'Privacy Policy') {
      setActiveSubPage('privacy_policy');
    } else if (item.action === 'support' || item.title === 'Support') {
      setActiveSubPage('support');
    } else if (item.action === 'settings' || item.title === 'Setting') {
      setActiveSubPage('settings');
    } else if (item.action === 'review' || item.title === 'Review') {
      setActiveModal('review');
    } else if (item.action === 'discount' || item.title === 'Discount') {
      setActiveModal('discount');
    } else if (item.action === 'water_bottle' || item.title === 'Order Water Bottle') {
      setActiveModal('water_bottle');
    } else if (item.title === 'Log out' || item.isLogout) {
      setActiveModal('logout');
    } else {
      alert(`${item.title} section opened!`);
    }
  };

  if (activeSubPage === 'edit_profile') {
    return <EditProfilePage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'cuisines') {
    return <CuisinesPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'menu') {
    return <MenuList onBackToHome={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'item_master') {
    return <ItemMasterPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'misc') {
    return <MiscellaneousPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'recipes') {
    return <RecipesMasterPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'chefs') {
    return <ChefPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'order_history') {
    return <OrderHistoryPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'terms') {
    return <TermsPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'privacy_policy') {
    return <PrivacyPolicyPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'support') {
    return <SupportPage onBackToProfile={() => setActiveSubPage(null)} />;
  }

  if (activeSubPage === 'settings') {
    return (
      <SettingPage 
        onBackToProfile={() => setActiveSubPage(null)}
        onNavigateToChangePassword={() => setActiveSubPage('change_password')}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    );
  }

  if (activeSubPage === 'change_password') {
    return (
      <ChangePasswordPage 
        onBackToSetting={() => setActiveSubPage('settings')}
      />
    );
  }

  return (
    <div className="profile-page-content">
      
      <div className="profile-header">
        {onBackToHome && (
          <button className="back-btn" onClick={onBackToHome} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
        )}
        <h1 className="profile-title">Profile</h1>
      </div>

      <div className="user-profile-card" onClick={() => setActiveSubPage('edit_profile')}>
        <div className="user-profile-left">
          <div className="avatar-circle">KP</div>
          <span className="user-name-text">Kartik Patel</span>
        </div>
        <ChevronRight size={20} className="chevron-gray" />
      </div>

      <div className="profile-section-group">
        <h2 className="section-group-title">Accounts</h2>
        <div className="profile-menu-card">
          {accountsMenu.map((item) => {
            const IconComponent = item.icon;
            return (
              <button 
                key={item.id} 
                className="profile-menu-item" 
                onClick={() => handleMenuClick(item)}
              >
                <div className="menu-item-left">
                  <div className="icon-circle-orange">
                    <IconComponent size={18} />
                  </div>
                  <span className="menu-item-text">{item.title}</span>
                </div>
                <ChevronRight size={18} className="chevron-gray" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="profile-section-group">
        <h2 className="section-group-title">More</h2>
        <div className="profile-menu-card">
          {moreMenu.map((item) => {
            const IconComponent = item.icon;
            return (
              <button 
                key={item.id} 
                className={`profile-menu-item ${item.isLogout ? 'logout-item' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <div className="menu-item-left">
                  <div className="icon-circle-orange">
                    <IconComponent size={18} />
                  </div>
                  <span className="menu-item-text">{item.title}</span>
                </div>
                <ChevronRight size={18} className="chevron-gray" />
              </button>
            );
          })}
        </div>
      </div>

      <ReviewModal 
        isOpen={activeModal === 'review'} 
        onClose={() => setActiveModal(null)} 
      />

      <DiscountModal 
        isOpen={activeModal === 'discount'} 
        onClose={() => setActiveModal(null)} 
      />

      <WaterBottleModal 
        isOpen={activeModal === 'water_bottle'} 
        onClose={() => setActiveModal(null)} 
      />

      <LogoutModal 
        isOpen={activeModal === 'logout'} 
        onClose={() => setActiveModal(null)} 
        onConfirm={() => {
          setActiveModal(null);
          if (onLogout) onLogout();
        }}
      />

    </div>
  );
};

export default ProfilePage;
