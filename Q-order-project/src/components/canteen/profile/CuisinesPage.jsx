import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Search, Edit, Trash2 } from 'lucide-react';
import CreateCuisinePage from './CreateCuisinePage';
import './CuisinesPage.css';

const initialCuisines = [
  { id: 1, name: 'Chines' },
  { id: 2, name: 'Panjabi' },
  { id: 3, name: 'South' },
  { id: 4, name: 'Gujarati' },
  { id: 5, name: 'Panjabi' },
  { id: 6, name: 'South' },
  { id: 7, name: 'Gujarati' },
];

const CuisinesPage = ({ onBackToProfile }) => {
  const [cuisines, setCuisines] = useState(initialCuisines);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingCuisine, setEditingCuisine] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSaveCuisine = (savedCuisine) => {
    if (editingCuisine) {
      setCuisines(cuisines.map(c => c.id === savedCuisine.id ? savedCuisine : c));
    } else {
      setCuisines([savedCuisine, ...cuisines]);
    }
    setIsCreating(false);
    setEditingCuisine(null);
  };

  const handleDeleteCuisine = (id) => {
    if (window.confirm('Are you sure you want to delete this cuisine?')) {
      setCuisines(cuisines.filter(c => c.id !== id));
    }
  };

  if (isCreating || editingCuisine) {
    return (
      <CreateCuisinePage
        cuisine={editingCuisine}
        onBackToCuisineList={() => { setIsCreating(false); setEditingCuisine(null); }}
        onSaveSuccess={handleSaveCuisine}
      />
    );
  }

  const filteredCuisines = cuisines.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cuisines-page-content">
      
      <div className="cuisines-header">
        <div className="cuisines-header-left">
          {onBackToProfile && (
            <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
          )}
          <h1 className="cuisines-title">Cuisines</h1>
        </div>

        <button className="create-cuisine-btn" onClick={() => setIsCreating(true)}>
          <Plus size={18} strokeWidth={2.5} />
          <span>Create</span>
        </button>
      </div>

      <div className="cuisines-search-container">
        <Search size={20} className="search-icon" />
        <input 
          type="text" 
          className="cuisines-search-input" 
          placeholder="Search here..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="cuisines-table-container">
        
        <div className="cuisines-table-header">
          <span className="header-col-name">Name</span>
          <span className="header-col-action">Action</span>
        </div>

        <div className="cuisines-items-list">
          {filteredCuisines.length === 0 ? (
            <div className="empty-cuisines">No cuisines found</div>
          ) : (
            filteredCuisines.map((item) => (
              <div key={item.id} className="cuisines-item-row">
                <span className="cuisines-name">{item.name}</span>
                <div className="cuisines-actions">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => setEditingCuisine(item)}
                    title="Edit Cuisine"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDeleteCuisine(item.id)}
                    title="Delete Cuisine"
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

export default CuisinesPage;
