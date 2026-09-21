import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Edit, Trash2 } from 'lucide-react';
import './MiscellaneousPage.css';

const initialItems = [
  { id: 1, name: 'Dhokla', price: 50 },
  { id: 2, name: 'Khaman', price: 50 },
  { id: 3, name: 'Pasta', price: 80 },
  { id: 4, name: 'Dhokla', price: 50 },
  { id: 5, name: 'Khaman', price: 50 },
  { id: 6, name: 'Pasta', price: 80 },
  { id: 7, name: 'Dhokla', price: 50 },
  { id: 8, name: 'Khaman', price: 50 },
];

const MiscellaneousPage = ({ onBackToProfile }) => {
  const [items, setItems] = useState(initialItems);
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [nameInput, setNameInput] = useState('Biryani');
  const [priceInput, setPriceInput] = useState('₹300');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isCreating]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setNameInput('');
    setPriceInput('');
    setIsCreating(true);
    window.scrollTo(0, 0);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setNameInput(item.name);
    setPriceInput(`₹${item.price}`);
    setIsCreating(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      alert('Please enter item name');
      return;
    }
    const cleanPrice = priceInput.replace(/[^0-9]/g, '') || '0';

    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { ...i, name: nameInput.trim(), price: Number(cleanPrice) } : i));
    } else {
      const newItem = {
        id: Date.now(),
        name: nameInput.trim(),
        price: Number(cleanPrice)
      };
      setItems([newItem, ...items]);
    }

    setIsCreating(false);
    setEditingItem(null);
  };

  if (isCreating) {
    return (
      <div className="misc-page-content">
        <div className="misc-header">
          <div className="misc-header-left">
            <button className="back-btn" onClick={() => setIsCreating(false)} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="misc-title">Miscellaneous</h1>
          </div>
        </div>

        <form onSubmit={handleSave} className="misc-form">
          <div className="form-group-profile">
            <label className="form-label-orange">Miscellaneous items</label>
            <input 
              type="text"
              className="input-orange-profile"
              placeholder="Biryani"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>

          <div className="form-group-profile">
            <label className="form-label-orange">Price</label>
            <input 
              type="text"
              className="input-orange-profile"
              placeholder="₹300"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
            />
          </div>

          <div className="form-actions-bottom">
            <button type="submit" className="submit-btn-orange">
              Submit
            </button>
            <button type="button" className="cancel-btn-outline" onClick={() => setIsCreating(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="misc-page-content">
      
      <div className="misc-header">
        <div className="misc-header-left">
          {onBackToProfile && (
            <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
          )}
          <h1 className="misc-title">Miscellaneous</h1>
        </div>

        <button className="create-misc-btn" onClick={handleOpenCreate}>
          <Plus size={18} strokeWidth={2.5} />
          <span>Add</span>
        </button>
      </div>

      <div className="misc-table-container">
        
        <div className="misc-table-header">
          <span className="col-name">Name</span>
          <span className="col-price">Price</span>
          <span className="col-action">Action</span>
        </div>

        <div className="misc-items-list">
          {items.map((item) => (
            <div key={item.id} className="misc-item-row">
              <span className="col-name misc-item-name">{item.name}</span>
              <span className="col-price misc-item-price">{item.price}</span>
              <div className="col-action misc-actions">
                <button className="action-btn edit-btn" onClick={() => handleOpenEdit(item)}>
                  <Edit size={18} />
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiscellaneousPage;
