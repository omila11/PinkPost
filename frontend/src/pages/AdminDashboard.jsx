import { useState, useEffect } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [giftItems, setGiftItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categories = [
    'All',
    'Sweet Treats',
    'Drinks',
    'Beauty',
    'Lifestyle Items',
    'Soft Items',
    'Handmade',
    'Accessories',
    'Tech',
    'Snacks',
    'Flowers'
  ];

  const subcategories = {
    'Sweet Treats': ['Chocolates', 'Candies', 'Cookies', 'Cake_Pops', 'Macarons'],
    'Drinks': ['Tea_Bags', 'Coffee_Sachets', 'Hot_Chocolate_Mix', 'Milk_Tea_Packets', 'Mini_Juice_Bottles'],
    'Beauty': ['Face_Masks', 'Lip_Balm', 'Perfume_Minis', 'Body_Lotion', 'Bath_Bombs', 'Scented_Candles'],
    'Accessories': ['Necklaces', 'Bracelets', 'Earrings', 'Hair_Clips', 'Watches'],
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/signin';
      return;
    }
    fetchGiftItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, selectedSubcategory, searchTerm, giftItems]);

  const fetchGiftItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/gift-items');
      const data = await response.json();
      if (data.success) {
        setGiftItems(data.items);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = giftItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedSubcategory !== 'All') {
      filtered = filtered.filter(item => item.subcategory === selectedSubcategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
  };

  const toggleStock = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/gift-items/${itemId}/toggle-stock`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchGiftItems();
      }
    } catch (error) {
      console.error('Error toggling stock:', error);
    }
  };

  const deleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/gift-items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        fetchGiftItems();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory('All');
    if (category === 'All' || !subcategories[category]) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(activeDropdown === category ? null : category);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1>🎁 Admin Dashboard</h1>
            <p>Manage your Pink Post gift items</p>
          </div>
          <div className="header-actions">
            <button className="add-item-btn" onClick={() => setShowAddModal(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Item
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search items by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fff0f5' }}>
              <span style={{ fontSize: '2rem' }}>📦</span>
            </div>
            <div className="stat-info">
              <h3>{giftItems.length}</h3>
              <p>Total Items</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e6ffe6' }}>
              <span style={{ fontSize: '2rem' }}>✅</span>
            </div>
            <div className="stat-info">
              <h3>{giftItems.filter(item => item.inStock).length}</h3>
              <p>In Stock</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ffe6e6' }}>
              <span style={{ fontSize: '2rem' }}>❌</span>
            </div>
            <div className="stat-info">
              <h3>{giftItems.filter(item => !item.inStock).length}</h3>
              <p>Out of Stock</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fff4e6' }}>
              <span style={{ fontSize: '2rem' }}>💰</span>
            </div>
            <div className="stat-info">
              <h3>${(giftItems.reduce((sum, item) => sum + item.price, 0) / giftItems.length || 0).toFixed(2)}</h3>
              <p>Avg Price</p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <div key={category} className="category-wrapper">
              <button
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
              
              {activeDropdown === category && subcategories[category] && (
                <div className="subcategory-dropdown">
                  <button
                    className={`subcategory-item ${selectedSubcategory === 'All' ? 'active' : ''}`}
                    onClick={() => setSelectedSubcategory('All')}
                  >
                    All {category}
                  </button>
                  {subcategories[category].map(sub => (
                    <button
                      key={sub}
                      className={`subcategory-item ${selectedSubcategory === sub ? 'active' : ''}`}
                      onClick={() => setSelectedSubcategory(sub)}
                    >
                      {sub.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize: '4rem' }}>📭</span>
            <h3>No items found</h3>
            <p>Try adjusting your filters or add a new item</p>
          </div>
        ) : (
          <div className="gifts-grid">
            {filteredItems.map(item => (
              <div key={item._id} className="gift-card">
                <div className="gift-image-wrapper" style={{ background: item.bg }}>
                  <img src={item.image} alt={item.name} onError={(e) => e.target.src = '/images/placeholder.png'} />
                  <div className="stock-badge" style={{ 
                    background: item.inStock ? '#4caf50' : '#f44336' 
                  }}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                
                <div className="gift-details">
                  <h4>{item.name}</h4>
                  <div className="gift-meta">
                    <span className="category-badge">{item.category}</span>
                    {item.subcategory && (
                      <span className="subcategory-badge">{item.subcategory.replace(/_/g, ' ')}</span>
                    )}
                  </div>
                  <div className="gift-price">${item.price.toFixed(2)}</div>
                  <div className="gift-stock">Stock: {item.stockQuantity}</div>
                </div>

                <div className="gift-actions">
                  <button
                    className="action-btn edit"
                    onClick={() => setEditingItem(item)}
                    title="Edit item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                  </button>
                  <button
                    className={`action-btn toggle ${item.inStock ? 'in-stock' : 'out-stock'}`}
                    onClick={() => toggleStock(item._id)}
                    title={item.inStock ? 'Mark out of stock' : 'Mark in stock'}
                  >
                    {item.inStock ? '✓' : '✗'}
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => deleteItem(item._id)}
                    title="Delete item"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <ItemModal
          item={editingItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
          onSave={() => {
            fetchGiftItems();
            setShowAddModal(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

function ItemModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState(item || {
    name: '',
    price: '',
    category: 'Sweet Treats',
    subcategory: '',
    image: '',
    bg: '#ffffff',
    inStock: true,
    stockQuantity: 100
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(item?.image || '');

  const categories = [
    'Sweet Treats',
    'Drinks',
    'Beauty',
    'Lifestyle Items',
    'Soft Items',
    'Handmade',
    'Accessories',
    'Tech',
    'Snacks',
    'Flowers'
  ];

  const subcategoryOptions = {
    'Sweet Treats': ['Chocolates', 'Candy Jars', 'Cookies', 'Cupcakes', 'Macarons', 'Brownies'],
    'Drinks': ['Coffee Sachets', 'Hot Chocolate Mix', 'Tea Bags', 'Mini Juice Bottles', 'Milk Tea Packets'],
    'Beauty': ['Scented Candles', 'Bath Bombs', 'Body Lotion', 'Face Masks', 'Lip Balm', 'Perfume Minis'],
    'Lifestyle Items': ['Keychains', 'Mini Photo Frames', 'Notebooks', 'Pens', 'Stickers', 'Pocket Mirrors'],
    'Soft Items': ['Small Plush Toys', 'Soft Towels', 'Mini Pillows'],
    'Handmade': ['Handmade Soaps', 'Essential Oils', 'Herbal Packets', 'Beeswax Candles'],
    'Accessories': ['Bracelets', 'Necklaces', 'Earrings', 'Watches', 'Hair Clips'],
    'Tech': ['Earbuds', 'Phone Covers', 'Power Bank', 'Phone Stand'],
    'Snacks': ['Chips', 'Nuts', 'Crackers'],
    'Flowers': []
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = item
      ? `http://localhost:5000/api/gift-items/${item._id}`
      : 'http://localhost:5000/api/gift-items';

    try {
      const response = await fetch(url, {
        method: item ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        onSave();
      } else {
        alert(data.message || 'Failed to save item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{item ? '✏️ Edit Item' : '➕ Add New Item'}</h2>
          <button className="close-modal-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Item Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Chocolate Bar"
                required
              />
            </div>
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Subcategory {subcategoryOptions[formData.category]?.length > 0 && '*'}</label>
              {subcategoryOptions[formData.category]?.length > 0 ? (
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  required={subcategoryOptions[formData.category]?.length > 0}
                >
                  <option value="">Select subcategory</option>
                  {subcategoryOptions[formData.category]?.map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="No subcategories available"
                  disabled
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Product Image *</label>
            <div className="image-upload-section">
              <div className="image-upload-options">
                <label className="file-upload-btn">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Browse Image
                </label>
                <span className="upload-divider">or</span>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({ ...formData, image: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="Enter image URL"
                  className="image-url-input"
                />
              </div>
              {imagePreview && (
                <div className="image-preview" style={{ background: formData.bg }}>
                  <img src={imagePreview} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Background Color</label>
              <div className="color-input-wrapper">
                <input
                  type="color"
                  value={formData.bg}
                  onChange={(e) => setFormData({ ...formData, bg: e.target.value })}
                />
                <input
                  type="text"
                  value={formData.bg}
                  onChange={(e) => setFormData({ ...formData, bg: e.target.value })}
                  placeholder="#ffffff"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Stock Quantity *</label>
              <input
                type="number"
                min="0"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              />
              <span>Item is in stock</span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {item ? 'Update Item' : 'Create Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
