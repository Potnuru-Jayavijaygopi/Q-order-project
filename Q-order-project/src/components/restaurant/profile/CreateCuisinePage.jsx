import React, { useState, useEffect } from 'react';
import { ChevronLeft, Image as ImageIcon } from 'lucide-react';
import './CreateCuisinePage.css';

const CreateCuisinePage = ({ cuisine, onBackToCuisineList, onSaveSuccess }) => {
  const [recipeName, setRecipeName] = useState(cuisine ? cuisine.name : 'Cuisines');
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipeName.trim()) {
      alert('Please enter a name');
      return;
    }
    const saved = {
      id: cuisine ? cuisine.id : Date.now(),
      name: recipeName.trim(),
    };
    onSaveSuccess(saved);
  };

  return (
    <div className="create-cuisine-container">
      
      <div className="create-cuisine-header">
        <div className="create-cuisine-header-left">
          <button className="back-btn" onClick={onBackToCuisineList} aria-label="Go Back">
            <ChevronLeft size={28} />
          </button>
          <h1 className="create-cuisine-title">Cuisines</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-cuisine-form">
        
        <div className="form-group-profile">
          <label className="form-label-orange">Recipes Name</label>
          <input
            type="text"
            className="input-orange-profile"
            placeholder="Cuisines"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>

        <div className="form-group-profile">
          <label className="form-label-orange">Upload Photo</label>
          <div className="photo-upload-box">
            <input
              type="file"
              accept="image/*"
              id="cuisine-photo-input"
              style={{ display: 'none' }}
              onChange={handlePhotoUpload}
            />
            <label htmlFor="cuisine-photo-input" className="photo-upload-label">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="photo-preview-img" />
              ) : (
                <div className="photo-upload-placeholder">
                  <div className="photo-icon-gray">
                    <ImageIcon size={48} />
                  </div>
                  <span className="add-photo-text">Add Photo</span>
                  <span className="photo-size-limit">(up to 2 Mb)</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="form-actions-bottom">
          <button type="submit" className="submit-btn-orange">
            Submit
          </button>
          <button type="button" className="cancel-btn-outline" onClick={onBackToCuisineList}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCuisinePage;
