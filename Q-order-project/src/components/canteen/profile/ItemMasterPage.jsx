import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Search, Edit, Trash2 } from 'lucide-react';
import './ItemMasterPage.css';

const initialItems = [
  { id: 1, name: 'Dhokla', unit: 'Kg', inStock: '02', outStock: '08' },
  { id: 2, name: 'Khaman', unit: 'Kg', inStock: '00', outStock: '06' },
  { id: 3, name: 'Pasta', unit: 'Kg', inStock: '03', outStock: '05' },
  { id: 4, name: 'Dhokla', unit: 'Kg', inStock: '07', outStock: '03' },
  { id: 5, name: 'Khaman', unit: 'Kg', inStock: '03', outStock: '02' },
  { id: 6, name: 'Pasta', unit: 'Kg', inStock: '02', outStock: '01' },
  { id: 7, name: 'Dhokla', unit: 'Kg', inStock: '03', outStock: '09' },
  { id: 8, name: 'Khaman', unit: 'Kg', inStock: '02', outStock: '00' },
  { id: 9, name: 'Pasta', unit: 'Kg', inStock: '05', outStock: '01' },
];

const ItemMasterPage = ({ onBackToProfile }) => {
  const [items, setItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [materialName, setMaterialName] = useState('Tomato');
  const [inStock, setInStock] = useState('10');
  const [unit, setUnit] = useState('Kg');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isCreating]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setMaterialName('');
    setInStock('');
    setUnit('Kg');
    setIsCreating(true);
    window.scrollTo(0, 0);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setMaterialName(item.name);
    setInStock(item.inStock);
    setUnit(item.unit);
    setIsCreating(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item master?')) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!materialName.trim()) {
      alert('Please enter material name');
      return;
    }

    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? { 
        ...i, 
        name: materialName.trim(), 
        inStock: inStock.trim() || '0', 
        unit: unit.trim() || 'Kg' 
      } : i));
    } else {
      const newItem = {
        id: Date.now(),
        name: materialName.trim(),
        unit: unit.trim() || 'Kg',
        inStock: inStock.trim() || '0',
        outStock: '00'
      };
      setItems([newItem, ...items]);
    }

    setIsCreating(false);
    setEditingItem(null);
  };

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isCreating) {
    return (
      <div className="item-master-page-content">
        
        <div className="item-master-header">
          <div className="item-master-header-left">
            <button className="back-btn" onClick={() => setIsCreating(false)} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="item-master-title">Item Masters</h1>
          </div>
        </div>

        <form onSubmit={handleSave} className="item-master-form">
          <div className="form-group-profile">
            <label className="form-label-orange">Material Name</label>
            <input 
              type="text"
              className="input-orange-profile"
              placeholder="Tomato"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
            />
          </div>

          <div className="form-group-profile">
            <label className="form-label-orange">In-Stock</label>
            <input 
              type="text"
              className="input-orange-profile"
              placeholder="10"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
            />
          </div>

          <div className="form-group-profile">
            <label className="form-label-orange">Unit</label>
            <input 
              type="text"
              className="input-orange-profile"
              placeholder="Kg"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
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
    <div className="item-master-page-content">
      
      <div className="item-master-header">
        <div className="item-master-header-left">
          {onBackToProfile && (
            <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
          )}
          <h1 className="item-master-title">Item Masters</h1>
        </div>

        <button className="create-item-master-btn" onClick={handleOpenCreate}>
          <Plus size={18} strokeWidth={2.5} />
          <span>Create</span>
        </button>
      </div>

      <div className="item-master-search-container">
        <Search size={20} className="search-icon" />
        <input 
          type="text"
          className="item-master-search-input"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="item-master-table-container">
        
        <div className="item-master-table-header">
          <span className="col-name">Name</span>
          <span className="col-unit">Unit</span>
          <span className="col-instock">In-Stock</span>
          <span className="col-outstock">Out-Stock</span>
          <span className="col-action">Action</span>
        </div>

        <div className="item-master-items-list">
          {filteredItems.length === 0 ? (
            <div className="empty-item-masters">No item masters found</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="item-master-row">
                <span className="col-name item-master-name">{item.name}</span>
                <span className="col-unit item-master-unit">{item.unit}</span>
                <span className="col-instock item-master-stock">{item.inStock}</span>
                <span className="col-outstock item-master-stock">{item.outStock}</span>
                <div className="col-action item-master-actions">
                  <button className="action-btn edit-btn" onClick={() => handleOpenEdit(item)}>
                    <Edit size={18} />
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(item.id)}>
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

export default ItemMasterPage;
