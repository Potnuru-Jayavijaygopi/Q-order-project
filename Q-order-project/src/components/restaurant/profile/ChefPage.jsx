import React, { useState } from 'react';
import { ChevronLeft, Plus, Search, Edit, Trash2 } from 'lucide-react';
import CreateChefPage from './CreateChefPage';
import './ChefPage.css';

const initialChefs = [
  { id: 1, name: 'Manoj' },
  { id: 2, name: 'Saroj' },
  { id: 3, name: 'Paresh' },
  { id: 4, name: 'Chirag' },
  { id: 5, name: 'Manoj' },
  { id: 6, name: 'Saroj' },
  { id: 7, name: 'Paresh' },
  { id: 8, name: 'Manoj' },
  { id: 9, name: 'Saroj' },
];

const ChefPage = ({ onBackToProfile }) => {
  const [chefs, setChefs] = useState(initialChefs);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingChef, setIsCreatingChef] = useState(false);
  const [editingChef, setEditingChef] = useState(null);

  const handleSaveChef = (savedChef) => {
    if (editingChef) {
      setChefs(chefs.map(c => c.id === savedChef.id ? savedChef : c));
    } else {
      setChefs([savedChef, ...chefs]);
    }
    setIsCreatingChef(false);
    setEditingChef(null);
  };

  const handleDeleteChef = (id) => {
    if (window.confirm('Are you sure you want to delete this chef?')) {
      setChefs(chefs.filter(c => c.id !== id));
    }
  };

  if (isCreatingChef || editingChef) {
    return (
      <CreateChefPage 
        chef={editingChef} 
        onBackToChefList={() => { setIsCreatingChef(false); setEditingChef(null); }}
        onSaveSuccess={handleSaveChef}
      />
    );
  }

  const filteredChefs = chefs.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chef-page-content">
      
      <div className="chef-header">
        <div className="chef-header-left">
          {onBackToProfile && (
            <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
          )}
          <h1 className="chef-title">Chef</h1>
        </div>

        <button className="create-chef-btn" onClick={() => setIsCreatingChef(true)}>
          <Plus size={18} strokeWidth={2.5} />
          <span>Create</span>
        </button>
      </div>

      <div className="chef-search-container">
        <Search size={20} className="search-icon" />
        <input 
          type="text" 
          className="chef-search-input" 
          placeholder="Search here..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="chef-table-container">
        
        <div className="chef-table-header">
          <span className="header-col-name">Name</span>
          <span className="header-col-action">Action</span>
        </div>

        <div className="chef-items-list">
          {filteredChefs.length === 0 ? (
            <div className="empty-chefs">No chefs found</div>
          ) : (
            filteredChefs.map((chef) => (
              <div key={chef.id} className="chef-item-row">
                <span className="chef-name">{chef.name}</span>
                <div className="chef-actions">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => setEditingChef(chef)}
                    title="Edit Chef"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDeleteChef(chef.id)}
                    title="Delete Chef"
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

export default ChefPage;
