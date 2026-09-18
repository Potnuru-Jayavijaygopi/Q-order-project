import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Edit, Trash2 } from 'lucide-react';
import './RecipesMasterPage.css';

const initialRecipes = [
  { id: 1, name: 'Dhokla' },
  { id: 2, name: 'Khaman' },
  { id: 3, name: 'Pasta' },
  { id: 4, name: 'Dhokla' },
  { id: 5, name: 'Khaman' },
  { id: 6, name: 'Pasta' },
  { id: 7, name: 'Dhokla' },
  { id: 8, name: 'Khaman' },
  { id: 9, name: 'Pasta' },
];

const availableRecipeNames = ['Paneer Chili', 'Dhokla', 'Khaman', 'Pasta', 'Biryani', 'Chana Masala'];

const RecipesMasterPage = ({ onBackToProfile }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const [recipeName, setRecipeName] = useState('Paneer Chili');
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Paneer', stock: '10', unit: 'Kg' },
    { id: 2, name: 'Green Chili', stock: '1', unit: 'Kg' }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenCreate = () => {
    setEditingRecipe(null);
    setRecipeName('Paneer Chili');
    setMaterials([
      { id: 1, name: 'Paneer', stock: '10', unit: 'Kg' },
      { id: 2, name: 'Green Chili', stock: '1', unit: 'Kg' }
    ]);
    setIsCreating(true);
  };

  const handleOpenEdit = (recipe) => {
    setEditingRecipe(recipe);
    setRecipeName(recipe.name);
    setMaterials([
      { id: 1, name: 'Paneer', stock: '10', unit: 'Kg' },
      { id: 2, name: 'Green Chili', stock: '1', unit: 'Kg' }
    ]);
    setIsCreating(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe master?')) {
      setRecipes(recipes.filter(r => r.id !== id));
    }
  };

  const handleAddMaterial = () => {
    setMaterials([
      ...materials,
      { id: Date.now(), name: '', stock: '', unit: '' }
    ]);
  };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!recipeName.trim()) {
      alert('Please select a recipe name');
      return;
    }

    if (editingRecipe) {
      setRecipes(recipes.map(r => r.id === editingRecipe.id ? { ...r, name: recipeName.trim() } : r));
    } else {
      const newRecipe = {
        id: Date.now(),
        name: recipeName.trim()
      };
      setRecipes([newRecipe, ...recipes]);
    }

    setIsCreating(false);
    setEditingRecipe(null);
  };

  if (isCreating) {
    return (
      <div className="recipes-page-content">
        <div className="recipes-header">
          <div className="recipes-header-left">
            <button className="back-btn" onClick={() => setIsCreating(false)} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
            <h1 className="recipes-title">Recipes Masters</h1>
          </div>
        </div>

        <form onSubmit={handleSave} className="recipes-form">
          
          <div className="form-group-profile">
            <label className="form-label-orange">Recipes Name</label>
            <div className="select-dropdown-wrapper">
              <select 
                className="select-orange-profile"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              >
                {availableRecipeNames.map((name, i) => (
                  <option key={i} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>

          {materials.map((mat, index) => (
            <React.Fragment key={mat.id}>
              {index > 0 && (
                <div className="add-material-divider-box" onClick={handleAddMaterial}>
                  <Plus size={24} color="#111827" />
                </div>
              )}

              <div className="material-block">
                <div className="form-group-profile">
                  <label className="form-label-orange">Material Name</label>
                  <input 
                    type="text"
                    className="input-orange-profile"
                    placeholder="Paneer"
                    value={mat.name}
                    onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                  />
                </div>

                <div className="form-group-profile">
                  <label className="form-label-orange">Stock</label>
                  <input 
                    type="text"
                    className="input-orange-profile"
                    placeholder="10"
                    value={mat.stock}
                    onChange={(e) => handleMaterialChange(index, 'stock', e.target.value)}
                  />
                </div>

                <div className="form-group-profile">
                  <label className="form-label-orange">Unit</label>
                  <input 
                    type="text"
                    className="input-orange-profile"
                    placeholder="Kg"
                    value={mat.unit}
                    onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}

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
    <div className="recipes-page-content">
      
      <div className="recipes-header">
        <div className="recipes-header-left">
          {onBackToProfile && (
            <button className="back-btn" onClick={onBackToProfile} aria-label="Go Back">
              <ChevronLeft size={28} />
            </button>
          )}
          <h1 className="recipes-title">Recipes Masters</h1>
        </div>

        <button className="create-recipes-btn" onClick={handleOpenCreate}>
          <Plus size={18} strokeWidth={2.5} />
          <span>Create</span>
        </button>
      </div>

      <div className="recipes-table-container">
        
        <div className="recipes-table-header">
          <span className="header-col-name">Name</span>
          <span className="header-col-action">Action</span>
        </div>

        <div className="recipes-items-list">
          {recipes.map((item) => (
            <div key={item.id} className="recipes-item-row">
              <span className="recipes-name">{item.name}</span>
              <div className="recipes-actions">
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

export default RecipesMasterPage;
