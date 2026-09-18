import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit, Trash2 } from 'lucide-react';
import EditItem from './EditItem';
import './MenuList.css';

const MenuList = ({ items: propItems, setItems: propSetItems, onBackToHome }) => {
  const [localItems, setLocalItems] = useState([
    { id: 1, name: 'Dhokla', price: 50 },
    { id: 2, name: 'Khaman', price: 50 },
    { id: 3, name: 'Pasta', price: 80 },
    { id: 4, name: 'Dhokla', price: 50 },
    { id: 5, name: 'Khaman', price: 50 },
    { id: 6, name: 'Pasta', price: 80 },
    { id: 7, name: 'Dhokla', price: 50 },
    { id: 8, name: 'Khaman', price: 50 },
    { id: 9, name: 'Pasta', price: 80 },
  ]);

  const items = propItems || localItems;
  const setItems = propSetItems || setLocalItems;

  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    setEditingItem({ id: Date.now(), name: '', price: 300, isNew: true });
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
  };

  const handleSaveEditedItem = (updatedItem) => {
    if (updatedItem.isNew) {
      delete updatedItem.isNew;
      setItems([updatedItem, ...items]);
    } else {
      setItems(items.map(i => i.id === updatedItem.id ? updatedItem : i));
    }
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  if (editingItem) {
    return (
      <EditItem 
        item={editingItem} 
        onSave={handleSaveEditedItem} 
        onCancel={() => setEditingItem(null)} 
      />
    );
  }

  return (
    <div className="menu-list-content">
      
      <div className="menu-header">
        <div className="menu-header-left">
          {onBackToHome && (
            <button className="back-btn" onClick={onBackToHome} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
          )}
          <h1 className="menu-title">Menu</h1>
        </div>

        <button className="add-menu-item-btn" onClick={handleAddItem}>
          <Plus size={18} strokeWidth={2.5} />
          <span>Add</span>
        </button>
      </div>

      <div className="menu-table-container">
        
        <div className="menu-table-header">
          <span className="header-col-name">Name</span>
          <span className="header-col-price">Price</span>
          <span className="header-col-action">Action</span>
        </div>

        <div className="menu-items-list">
          {items.length === 0 ? (
            <div className="empty-menu">No items in menu</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="menu-item-row">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price}</span>
                <div className="item-actions">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => handleEditClick(item)}
                    title="Edit Item"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDeleteItem(item.id)}
                    title="Delete Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
