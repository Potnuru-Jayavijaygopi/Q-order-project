import React, { useState } from 'react';
import { ChevronLeft, Image as ImageIcon, ChevronDown, Check } from 'lucide-react';
import './AddItemPage.css';

const AddItemPage = ({ onBackToHome, onItemAdded }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [priceWithTax, setPriceWithTax] = useState('inclusive'); 
  const [taxPercentage, setTaxPercentage] = useState('');
  const [miscItems, setMiscItems] = useState({
    extraPaneer: true,
    coldDrink: false,
    extraMasala: true,
  });
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleMisc = (key) => {
    setMiscItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName) {
      alert('Please enter item name');
      return;
    }
    alert('New item added successfully!');
    if (onItemAdded) {
      onItemAdded({
        id: Date.now(),
        name: itemName,
        price: parseInt(price.replace(/[^0-9]/g, ''), 10) || 100,
      });
    }
    if (onBackToHome) onBackToHome();
  };

  return (
    <div className="add-item-content">
      
      <div className="add-header">
        {onBackToHome && (
          <button className="back-btn" onClick={onBackToHome} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
        )}
        <h1 className="add-title">Add Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="add-form">

        <div className="form-group">
          <label className="form-label">Upload Photo</label>
          <label className="photo-upload-box">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
              style={{ display: 'none' }} 
            />
            {photoPreview ? (
              <img src={photoPreview} alt="Food Preview" className="preview-image" />
            ) : (
              <>
                <ImageIcon size={48} className="upload-icon" />
                <span className="upload-text">Add Food Photo</span>
                <span className="upload-subtext">(up to 2 Mb)</span>
              </>
            )}
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Add Item Name</label>
          <input 
            type="text" 
            className="input-gray-outline" 
            placeholder="Add  new item"
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input 
            type="text" 
            className="input-gray-outline" 
            placeholder="Add price"
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Select Cuisine</label>
          <div className="select-gray-wrapper">
            <select 
              className={`select-gray ${!cuisine ? 'placeholder' : ''}`}
              value={cuisine} 
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="" disabled hidden>Select Cuisine</option>
              <option value="Biriyani">Biriyani</option>
              <option value="Chinese">Chinese</option>
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Dessert">Dessert</option>
            </select>
            <ChevronDown size={20} className="select-chevron" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Price With Tax</label>
          <div className="radio-options-group">
            <div 
              className={`radio-option ${priceWithTax === 'inclusive' ? 'selected' : ''}`}
              onClick={() => setPriceWithTax('inclusive')}
            >
              <div className={`custom-radio ${priceWithTax === 'inclusive' ? 'checked' : ''}`}>
                {priceWithTax === 'inclusive' && <div className="radio-dot" />}
              </div>
              <span>Inclusive of tax in invoice</span>
            </div>

            <div 
              className={`radio-option ${priceWithTax === 'exclusive' ? 'selected' : ''}`}
              onClick={() => setPriceWithTax('exclusive')}
            >
              <div className={`custom-radio ${priceWithTax === 'exclusive' ? 'checked' : ''}`}>
                {priceWithTax === 'exclusive' && <div className="radio-dot" />}
              </div>
              <span>Exclusive of tax in invoice</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tax Percentage</label>
          <div className="percentage-input-wrapper">
            <input 
              type="text" 
              className="input-gray-outline" 
              placeholder="Tax percentage"
              value={taxPercentage} 
              onChange={(e) => setTaxPercentage(e.target.value)} 
            />
            <span className="percentage-symbol">%</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Miscellaneous items</label>
          <div className="checkbox-options-group">
            <div 
              className={`checkbox-option ${miscItems.extraPaneer ? 'checked-text' : ''}`}
              onClick={() => toggleMisc('extraPaneer')}
            >
              <div className={`custom-checkbox ${miscItems.extraPaneer ? 'checked' : ''}`}>
                {miscItems.extraPaneer && <Check size={14} strokeWidth={3} />}
              </div>
              <span>Extra Paneer</span>
            </div>

            <div 
              className={`checkbox-option ${miscItems.coldDrink ? 'checked-text' : ''}`}
              onClick={() => toggleMisc('coldDrink')}
            >
              <div className={`custom-checkbox ${miscItems.coldDrink ? 'checked' : ''}`}>
                {miscItems.coldDrink && <Check size={14} strokeWidth={3} />}
              </div>
              <span>Cold Drink</span>
            </div>

            <div 
              className={`checkbox-option ${miscItems.extraMasala ? 'checked-text' : ''}`}
              onClick={() => toggleMisc('extraMasala')}
            >
              <div className={`custom-checkbox ${miscItems.extraMasala ? 'checked' : ''}`}>
                {miscItems.extraMasala && <Check size={14} strokeWidth={3} />}
              </div>
              <span>Extra Masala</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea 
            className="textarea-gray-outline" 
            placeholder="Add description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="form-action-buttons">
          <button type="submit" className="btn-submit">
            Submit
          </button>
          <button type="button" className="btn-cancel" onClick={onBackToHome}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddItemPage;
