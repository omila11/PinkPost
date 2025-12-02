import { useState, useEffect } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [giftItems, setGiftItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    fetchGiftItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedCategory, searchTerm, giftItems]);

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
    window.location.href = '/admin/login';
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

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <button className="add-item-btn" onClick={() => setShowAddModal(true)}>
              + Add New Item
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="items-stats">
          <div className="stat-card">
            <h3>{giftItems.length}</h3>
            <p>Total Items</p>
          </div>
          <div className="stat-card">
            <h3>{giftItems.filter(item => item.inStock).length}</h3>
            <p>In Stock</p>
          </div>
          <div className="stat-card">
            <h3>{giftItems.filter(item => !item.inStock).length}</h3>
            <p>Out of Stock</p>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading items...</div>
        ) : (
          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item._id}>
                    <td>
                      <div className="item-image" style={{ backgroundColor: item.bg }}>
                        <img src={item.image} alt={item.name} onError={(e) => e.target.style.display = 'none'} />
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.subcategory || '-'}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.stockQuantity}</td>
                    <td>
                      <span className={`status-badge ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="toggle-btn"
                          onClick={() => toggleStock(item._id)}
                          title={item.inStock ? 'Mark as out of stock' : 'Mark as in stock'}
                        >
                          {item.inStock ? '📦' : '❌'}
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => setEditingItem(item)}
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteItem(item._id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
      }
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="Sweet Treats">Sweet Treats</option>
                <option value="Drinks">Drinks</option>
                <option value="Beauty">Beauty</option>
                <option value="Lifestyle Items">Lifestyle Items</option>
                <option value="Soft Items">Soft Items</option>
                <option value="Handmade">Handmade</option>
                <option value="Accessories">Accessories</option>
                <option value="Tech">Tech</option>
                <option value="Snacks">Snacks</option>
                <option value="Flowers">Flowers</option>
              </select>
            </div>
            <div className="form-group">
              <label>Subcategory</label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Background Color</label>
              <input
                type="color"
                value={formData.bg}
                onChange={(e) => setFormData({ ...formData, bg: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              />
              In Stock
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              {item ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
