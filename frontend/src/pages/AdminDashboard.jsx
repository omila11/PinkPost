import { useState, useEffect } from 'react';
import './AdminDashboard.css';
import './ProductsManagement.css';
import { giftItemsAPI } from '../api/adminAPI';

// Categories with subcategories
const categories = [
  { 
    name: 'Sweet Treats', 
    subcategories: ['Chocolates', 'Candy Jars', 'Cookies', 'Cupcakes', 'Macarons', 'Brownies']
  },
  {
    name: 'Drinks',
    subcategories: ['Coffee Sachets', 'Hot Chocolate Mix', 'Tea Bags', 'Mini Juice Bottles', 'Milk Tea Packets']
  },
  {
    name: 'Beauty',
    subcategories: ['Scented Candles', 'Bath Bombs', 'Body Lotion', 'Face Masks', 'Lip Balm', 'Perfume Minis']
  },
  {
    name: 'Lifestyle Items',
    subcategories: ['Keychains', 'Mini Photo Frames', 'Notebooks', 'Pens', 'Stickers', 'Pocket Mirrors']
  },
  {
    name: 'Soft Items',
    subcategories: ['Small Plush Toys', 'Soft Towels', 'Mini Pillows']
  },
  {
    name: 'Handmade',
    subcategories: ['Handmade Soaps', 'Essential Oils', 'Herbal Packets', 'Beeswax Candles']
  },
  {
    name: 'Accessories',
    subcategories: ['Bracelets', 'Necklaces', 'Earrings', 'Watches', 'Hair Clips']
  },
  {
    name: 'Tech',
    subcategories: ['Earbuds', 'Phone Covers', 'Power Bank', 'Phone Stand']
  },
  {
    name: 'Snacks',
    subcategories: ['Chips', 'Nuts', 'Crackers']
  },
  { 
    name: 'Flowers', 
    subcategories: [] 
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [giftItems, setGiftItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [stats, setStats] = useState({
    totalRevenue: 12450.00,
    revenueChange: 6.2,
    newOrders: 142,
    ordersChange: 12,
    activeCustomers: 1205,
    customersChange: 3.1,
    lowStockItems: 3
  });

  // Products page state
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('Any');
  const [currentPage, setCurrentPage] = useState(1);
  const [showProductModal, setShowProductModal] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: '',
    subcategory: '',
    price: '',
    stock: '',
    status: 'Draft',
    description: '',
    image: null,
    imagePreview: null
  });

  // Orders page state
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('This Month');
  const [sortOrder, setSortOrder] = useState('High to Low');

  // Customers page state
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState('All');

  // Content page state
  const [contentTab, setContentTab] = useState('banners');

  // Settings page state
  const [settingsSection, setSettingsSection] = useState('general');
  const [siteTitle, setSiteTitle] = useState('Pink Post');
  const [tagline, setTagline] = useState('Custom Gift Boxes');
  const [storeDescription, setStoreDescription] = useState('');

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

  // Mock data for dashboard
  const topSellingBoxes = [
    { id: 1, name: 'Birthday Bliss Box', theme: 'Premium customization', sold: 124, image: '🎁' },
    { id: 2, name: 'Sea Retreat Set', theme: 'Relaxation theme', sold: 98, image: '🎁' },
    { id: 3, name: 'Sweet Treats Bundle', theme: 'Food & beverage', sold: 85, image: '🎁' }
  ];

  const recentOrders = [
    { id: '#ORD-7829', customer: 'Sarah Jenkins', email: 'sarah@example.com', date: 'Oct 24, 2023', total: 125.00, status: 'Processing', avatar: 'SJ' },
    { id: '#ORD-7828', customer: 'Mike Johnson', email: 'mike@example.com', date: 'Oct 24, 2023', total: 89.50, status: 'Delivered', avatar: 'MJ' },
    { id: '#ORD-7827', customer: 'Emma Wilson', email: 'emma@example.com', date: 'Oct 23, 2023', total: 156.00, status: 'Shipped', avatar: 'EW' },
  ];

  const renderDashboard = () => (
    <div className="dashboard-view">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, Admin 👋</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
        <div className="header-search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" placeholder="Search orders, products..." />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card-new">
          <div className="stat-header">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(255, 107, 157, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <span className={`trend ${stats.revenueChange > 0 ? 'up' : 'down'}`}>
              +{stats.revenueChange}% ↗
            </span>
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">${stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card-new">
          <div className="stat-header">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <span className={`trend ${stats.ordersChange > 0 ? 'up' : 'down'}`}>
              +{stats.ordersChange}% ↗
            </span>
          </div>
          <div className="stat-content">
            <h3>New Orders</h3>
            <p className="stat-value">{stats.newOrders}</p>
          </div>
        </div>

        <div className="stat-card-new">
          <div className="stat-header">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <span className={`trend ${stats.customersChange > 0 ? 'up' : 'down'}`}>
              +{stats.customersChange}% ↗
            </span>
          </div>
          <div className="stat-content">
            <h3>Active Customers</h3>
            <p className="stat-value">{stats.activeCustomers.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card-new">
          <div className="stat-header">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <span className="trend down">-2% ↘</span>
          </div>
          <div className="stat-content">
            <h3>Low Stock Alerts</h3>
            <p className="stat-value">{stats.lowStockItems} Items</p>
          </div>
        </div>
      </div>

      {/* Charts and Tables Row */}
      <div className="content-grid">
        {/* Revenue Chart */}
        <div className="chart-card">
          <div className="card-header">
            <div>
              <h3>Revenue Overview</h3>
              <p>Monthly revenue performance</p>
            </div>
            <select className="time-filter">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="chart-container">
            <svg viewBox="0 0 700 300" className="revenue-chart">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ff6b9d', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: '#ff6b9d', stopOpacity: 0.05 }} />
                </linearGradient>
              </defs>
              <path
                d="M 50 250 Q 100 220, 150 200 T 250 150 T 350 120 T 450 100 T 550 90 T 650 80"
                stroke="#ff6b9d"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 50 250 Q 100 220, 150 200 T 250 150 T 350 120 T 450 100 T 550 90 T 650 80 L 650 280 L 50 280 Z"
                fill="url(#gradient)"
              />
              {/* Week labels */}
              <text x="90" y="295" fontSize="12" fill="#999" textAnchor="middle">Week 1</text>
              <text x="250" y="295" fontSize="12" fill="#999" textAnchor="middle">Week 2</text>
              <text x="410" y="295" fontSize="12" fill="#999" textAnchor="middle">Week 3</text>
              <text x="570" y="295" fontSize="12" fill="#999" textAnchor="middle">Week 4</text>
            </svg>
          </div>
        </div>

        {/* Top Selling Gift Boxes */}
        <div className="top-boxes-card">
          <div className="card-header">
            <div>
              <h3>Top Selling Gift Boxes</h3>
              <p className="view-all-link">View All</p>
            </div>
          </div>
          <div className="top-boxes-list">
            {topSellingBoxes.map(box => (
              <div key={box.id} className="box-item">
                <div className="box-icon">{box.image}</div>
                <div className="box-info">
                  <h4>{box.name}</h4>
                  <p>{box.theme}</p>
                </div>
                <div className="box-sold">{box.sold}<br/><span>Sold</span></div>
              </div>
            ))}
            <button className="add-product-btn">
              + Add New Product
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="orders-card">
        <div className="card-header">
          <div>
            <h3>Recent Orders</h3>
            <p>Manage your latest transactions</p>
          </div>
          <div className="header-actions">
            <button className="filter-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filter
            </button>
            <button className="export-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export
            </button>
          </div>
        </div>
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>
                    <div className="customer-cell">
                      <div className="customer-avatar">{order.avatar}</div>
                      <div>
                        <div className="customer-name">{order.customer}</div>
                        <div className="customer-email">{order.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{order.date}</td>
                  <td className="order-total">${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-menu-btn">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => {
    const mockOrders = [
      { id: '#PP-2401', customer: { name: 'Jane Cooper', email: 'jane@example.com', avatar: 'JC' }, date: 'Oct 24, 2023', items: '3 items (Custom Box)', total: 120.00, status: 'Processing' },
      { id: '#PP-2402', customer: { name: 'Wade Warren', email: 'wade.w@example.com', avatar: 'WW' }, date: 'Oct 24, 2023', items: '1 item', total: 45.00, status: 'Shipped' },
      { id: '#PP-2403', customer: { name: 'Esther Howard', email: 'esther.h@example.com', avatar: 'EH' }, date: 'Oct 23, 2023', items: '2 items', total: 85.00, status: 'Delivered' },
      { id: '#PP-2404', customer: { name: 'Cameron W.', email: 'cameron.w@example.com', avatar: 'CW' }, date: 'Oct 23, 2023', items: '5 items', total: 320.00, status: 'Cancelled' },
      { id: '#PP-2405', customer: { name: 'Jenny Wilson', email: 'jenny.wilson@example.com', avatar: 'JW' }, date: 'Oct 22, 2023', items: '1 item', total: 65.00, status: 'Shipped' },
    ];

    return (
      <div className="orders-view">
        {/* Header */}
        <div className="orders-header">
          <div>
            <h1>Order Management</h1>
            <p>Manage and track customer orders</p>
          </div>
          <div className="orders-header-actions">
            <button className="export-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export CSV
            </button>
            <button className="create-order-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Create Order
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="orders-stats">
          <div className="order-stat-card">
            <div className="order-stat-icon" style={{ background: 'rgba(255, 107, 157, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <div className="order-stat-content">
              <div className="order-stat-label">TOTAL ORDERS</div>
              <div className="order-stat-value">1,245</div>
              <div className="order-stat-trend positive">↗ 12%</div>
            </div>
          </div>

          <div className="order-stat-card">
            <div className="order-stat-icon" style={{ background: 'rgba(251, 191, 36, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <div className="order-stat-content">
              <div className="order-stat-label">PENDING SHIPMENTS</div>
              <div className="order-stat-value">45</div>
              <div className="order-stat-trend positive">↗ 5%</div>
            </div>
          </div>

          <div className="order-stat-card">
            <div className="order-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <div className="order-stat-content">
              <div className="order-stat-label">REVENUE TODAY</div>
              <div className="order-stat-value">$12,450</div>
              <div className="order-stat-trend positive">↗ 8%</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="orders-filters">
          <div className="search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by Order ID or Customer Name"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-group">
            <select value={orderStatusFilter} onChange={(e) => setOrderStatusFilter(e.target.value)} className="filter-select">
              <option>Status: All</option>
              <option>Status: Processing</option>
              <option>Status: Shipped</option>
              <option>Status: Delivered</option>
              <option>Status: Cancelled</option>
            </select>
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="filter-select">
              <option>Date: This Month</option>
              <option>Date: Last 7 Days</option>
              <option>Date: Last 30 Days</option>
              <option>Date: Last 3 Months</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="filter-select">
              <option>Value: High to Low</option>
              <option>Value: Low to High</option>
              <option>Date: Newest First</option>
              <option>Date: Oldest First</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="orders-table-container">
          <table className="orders-table-main">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>DATE</th>
                <th>ITEMS</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td className="order-id-cell">{order.id}</td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar-small">{order.customer.avatar}</div>
                      <div>
                        <div className="customer-name-small">{order.customer.name}</div>
                        <div className="customer-email-small">{order.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="date-cell">{order.date}</td>
                  <td className="items-cell">{order.items}</td>
                  <td className="total-cell">${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`status-pill status-${order.status.toLowerCase()}`}>
                      {order.status === 'Processing' && '● Processing'}
                      {order.status === 'Shipped' && '● Shipped'}
                      {order.status === 'Delivered' && '✓ Delivered'}
                      {order.status === 'Cancelled' && '✕ Cancelled'}
                    </span>
                  </td>
                  <td>
                    <button className="action-dots">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderProducts = () => {
    // Mock product data
    const mockProducts = [
      { id: 1, name: 'Luxury Birthday Box', sku: 'SKU: GB-001', category: 'Gift Boxes', categoryColor: '#ff6b9d', price: 45.00, stock: 124, stockStatus: 'In Stock', status: 'Published', image: '📦' },
      { id: 2, name: 'Pink Crinkle Paper', sku: 'SKU: FL-045', category: 'Fillers', categoryColor: '#8b5cf6', price: 4.50, stock: 5, stockStatus: 'Low Stock', status: 'Published', image: '📄' },
      { id: 3, name: 'Dark Truffles (6pc)', sku: 'SKU: AO-089', category: 'Edibles', categoryColor: '#3b82f6', price: 12.00, stock: 0, stockStatus: 'Out of Stock', status: 'Inactive', image: '🍫' },
      { id: 4, name: 'Summer Floral Card', sku: 'SKU: CD-202', category: 'Cards', categoryColor: '#f59e0b', price: 3.50, stock: null, stockStatus: '-', status: 'Draft', image: '💌' },
      { id: 5, name: 'Satin Gold Ribbon', sku: 'SKU: RB-016', category: 'Add-ons', categoryColor: '#ec4899', price: 1.50, stock: 350, stockStatus: 'In Stock', status: 'Published', image: '🎀' },
    ];

    const totalProducts = 145;
    const lowStockCount = 3;
    const outOfStockCount = 8;
    const draftsCount = 12;

    return (
      <div className="products-management-view">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item">Products</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Management</span>
        </div>

        {/* Header */}
        <div className="products-header">
          <div>
            <h1>Product Management</h1>
            <p>Manage your inventory, prices, and product details</p>
          </div>
          <button className="new-product-btn" onClick={() => setShowProductModal(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="products-stats">
          <div className="product-stat-card">
            <div className="product-stat-icon" style={{ background: 'rgba(255, 107, 157, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <div className="product-stat-info">
              <div className="product-stat-label">Total Products</div>
              <div className="product-stat-value">{totalProducts}</div>
            </div>
          </div>

          <div className="product-stat-card">
            <div className="product-stat-icon" style={{ background: 'rgba(251, 191, 36, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div className="product-stat-info">
              <div className="product-stat-label">Low Stock</div>
              <div className="product-stat-value">{lowStockCount}</div>
            </div>
          </div>

          <div className="product-stat-card">
            <div className="product-stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="product-stat-info">
              <div className="product-stat-label">Out of Stock</div>
              <div className="product-stat-value">{outOfStockCount}</div>
            </div>
          </div>

          <div className="product-stat-card">
            <div className="product-stat-icon" style={{ background: 'rgba(156, 163, 175, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="product-stat-info">
              <div className="product-stat-label">Drafts</div>
              <div className="product-stat-value">{draftsCount}</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="products-filters">
          <div className="search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by name, SKU, or tag..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-group">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="filter-select">
              <option>Category: All</option>
              <option>Category: Gift Boxes</option>
              <option>Category: Fillers</option>
              <option>Category: Edibles</option>
              <option>Category: Cards</option>
              <option>Category: Add-ons</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option>Status: All</option>
              <option>Status: Published</option>
              <option>Status: Inactive</option>
              <option>Status: Draft</option>
            </select>
            <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} className="filter-select">
              <option>Stock: Any</option>
              <option>Stock: In Stock</option>
              <option>Stock: Low Stock</option>
              <option>Stock: Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-table-container">
          <table className="products-table-main">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id}>
                  <td><input type="checkbox" /></td>
                  <td>
                    <div className="product-info">
                      <div className="product-image-small">{product.image}</div>
                      <div>
                        <div className="product-name-small">{product.name}</div>
                        <div className="product-sku-small">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge-small" style={{ background: `${product.categoryColor}15`, color: product.categoryColor }}>
                      {product.category}
                    </span>
                  </td>
                  <td className="price-cell">${product.price.toFixed(2)}</td>
                  <td>
                    {product.stock !== null ? (
                      <>
                        <div className="stock-number" style={{
                          color: product.stockStatus === 'Low Stock' ? '#f59e0b' : 
                                 product.stockStatus === 'Out of Stock' ? '#ef4444' : '#6b7280'
                        }}>
                          {product.stock}
                        </div>
                        <div className="stock-status" style={{
                          color: product.stockStatus === 'Low Stock' ? '#f59e0b' : 
                                 product.stockStatus === 'Out of Stock' ? '#ef4444' : '#22c55e'
                        }}>
                          {product.stockStatus}
                        </div>
                      </>
                    ) : (
                      <span className="stock-dash">-</span>
                    )}
                  </td>
                  <td>
                    <span className={`product-status-badge status-${product.status.toLowerCase()}`}>
                      ● {product.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-dots">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="products-pagination">
          <div className="pagination-info">
            Showing <strong>1-5</strong> of <strong>{totalProducts}</strong> products
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span className="pagination-dots">...</span>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    );
  };

  // Product Modal Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({
        ...newProduct,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      // Reset subcategory when category changes
      setNewProduct({
        ...newProduct,
        category: value,
        subcategory: ''
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };

  const handleAddProduct = async () => {
    try {
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      if (newProduct.subcategory) {
        formData.append('subcategory', newProduct.subcategory);
      }
      formData.append('price', newProduct.price);
      formData.append('stock', newProduct.stock || 0);
      formData.append('inStock', newProduct.status === 'Published');
      if (newProduct.description) {
        formData.append('description', newProduct.description);
      }
      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }

      // Send to backend
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/gift-items', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        alert('Product added successfully!');
        setShowProductModal(false);
        setNewProduct({
          name: '',
          sku: '',
          category: '',
          subcategory: '',
          price: '',
          stock: '',
          status: 'Draft',
          description: '',
          image: null,
          imagePreview: null
        });
      } else {
        const error = await response.json();
        alert('Error adding product: ' + (error.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    }
  };

  const renderProductModal = () => {
    if (!showProductModal) return null;

    return (
      <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
        <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Add New Product</h2>
            <button className="modal-close" onClick={() => setShowProductModal(false)}>×</button>
          </div>
          
          <div className="modal-body">
            <div className="product-form-grid">
              {/* Image Upload */}
              <div className="form-section full-width">
                <label className="form-label">Product Image</label>
                <div className="image-upload-area">
                  {newProduct.imagePreview ? (
                    <div className="image-preview-container">
                      <img 
                        src={newProduct.imagePreview} 
                        alt="Preview" 
                        className="image-preview" 
                        style={{ transform: `scale(${imageZoom})` }}
                      />
                      <div className="image-controls">
                        <button 
                          className="zoom-btn"
                          onClick={() => setImageZoom(prev => Math.min(prev + 0.1, 3))}
                          type="button"
                        >
                          +
                        </button>
                        <span className="zoom-level">{Math.round(imageZoom * 100)}%</span>
                        <button 
                          className="zoom-btn"
                          onClick={() => setImageZoom(prev => Math.max(prev - 0.1, 0.5))}
                          type="button"
                        >
                          −
                        </button>
                        <button 
                          className="zoom-btn reset-btn"
                          onClick={() => setImageZoom(1)}
                          type="button"
                        >
                          Reset
                        </button>
                      </div>
                      <button 
                        className="remove-image-btn"
                        onClick={() => {
                          setNewProduct({...newProduct, image: null, imagePreview: null});
                          setImageZoom(1);
                        }}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="image-upload-label">
                      <input 
                        type="file" 
                        accept="image/*,.jfif" 
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                      <div className="upload-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <p>Click to upload or drag and drop</p>
                        <span>PNG, JPG or GIF (max. 800x400px)</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Product Name */}
              <div className="form-section full-width">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleProductInputChange}
                  className="form-input"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* SKU */}
              <div className="form-section">
                <label className="form-label">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={newProduct.sku}
                  onChange={handleProductInputChange}
                  className="form-input"
                  placeholder="e.g., GB-001"
                />
              </div>

              {/* Category */}
              <div className="form-section">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleProductInputChange}
                  className="form-input"
                  style={{ color: newProduct.category ? '#1f2937' : '#9ca3af' }}
                  required
                >
                  <option value="" disabled hidden>Select category</option>
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

              {/* Subcategory */}
              {newProduct.category && newProduct.category !== 'Flowers' && (
                <div className="form-section">
                  <label className="form-label">Subcategory *</label>
                  <select
                    name="subcategory"
                    value={newProduct.subcategory}
                    onChange={handleProductInputChange}
                    className="form-input"
                    style={{ color: newProduct.subcategory ? '#1f2937' : '#9ca3af' }}
                    required
                  >
                    <option value="" disabled hidden>Select subcategory</option>
                    
                    {newProduct.category === 'Sweet Treats' && (
                      <>
                        <option value="Chocolates">Chocolates</option>
                        <option value="Candy Jars">Candy Jars</option>
                        <option value="Cookies">Cookies</option>
                        <option value="Cupcakes">Cupcakes</option>
                        <option value="Macarons">Macarons</option>
                        <option value="Brownies">Brownies</option>
                      </>
                    )}
                    
                    {newProduct.category === 'Drinks' && (
                      <>
                        <option value="Coffee Sachets">Coffee Sachets</option>
                        <option value="Hot Chocolate Mix">Hot Chocolate Mix</option>
                        <option value="Tea Bags">Tea Bags</option>
                        <option value="Mini Juice Bottles">Mini Juice Bottles</option>
                        <option value="Milk Tea Packets">Milk Tea Packets</option>
                      </>
                    )}
                    
                    {newProduct.category === 'Beauty' && (
                      <>
                        <option value="Scented Candles">Scented Candles</option>
                        <option value="Bath Bombs">Bath Bombs</option>
                        <option value="Body Lotion">Body Lotion</option>
                        <option value="Face Masks">Face Masks</option>
                        <option value="Lip Balm">Lip Balm</option>
                        <option value="Perfume Minis">Perfume Minis</option>
                      </>
                    )}
                    
                    {newProduct.category === 'Lifestyle Items' && (
                      <>
                        <option value="Keychains">Keychains</option>
                        <option value="Mini Photo Frames">Mini Photo Frames</option>
                        <option value="Notebooks">Notebooks</option>
                        <option value="Pens">Pens</option>
                        <option value="Stickers">Stickers</option>
                        <option value="Pocket Mirrors">Pocket Mirrors</option>
                      </>
                    )}
                    
                    {newProduct.category === 'Soft Items' && (
                      <>
                        <option value="Small Plush Toys">Small Plush Toys</option>
                        <option value="Soft Towels">Soft Towels</option>
                        <option value="Mini Pillows">Mini Pillows</option>
                      </>
                    )}
                    
                    {newProduct.category === 'Handmade' && (
                      <>
                        <option value="Handmade Soaps">Handmade Soaps</option>
                        <option value="Essential Oils">Essential Oils</option>
                        <option value="Herbal Packets">Herbal Packets</option>
                        <option value="Beeswax Candles">Beeswax Candles</option>
                      </>
                    )}
                    
                    {newProduct.category === 'Accessories' && (
                      <>
                        <option value="Bracelets">Bracelets</option>
                        <option value="Necklaces">Necklaces</option>
                        <option value="Earrings">Earrings</option>
                        <option value="Watches">Watches</option>
                        <option value="Hair Clips">Hair Clips</option>
                      </>
                    )}
                    
                    {newProduct.category === 'Tech' && (
                      <>
                        <option value="Earbuds">Earbuds</option>
                        <option value="Phone Covers">Phone Covers</option>
                        <option value="Power Bank">Power Bank</option>
                        <option value="Phone Stand">Phone Stand</option>
                      </>
                    )}
                    
                    {newProduct.category === 'Snacks' && (
                      <>
                        <option value="Chips">Chips</option>
                        <option value="Nuts">Nuts</option>
                        <option value="Crackers">Crackers</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              {/* Price */}
              <div className="form-section">
                <label className="form-label">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleProductInputChange}
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {/* Stock */}
              <div className="form-section">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleProductInputChange}
                  className="form-input"
                  placeholder="0"
                  min="0"
                />
              </div>

              {/* Status */}
              <div className="form-section">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={newProduct.status}
                  onChange={handleProductInputChange}
                  className="form-input"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Description */}
              <div className="form-section full-width">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleProductInputChange}
                  className="form-textarea"
                  placeholder="Enter product description"
                  rows="4"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="modal-btn-secondary" onClick={() => setShowProductModal(false)}>
              Cancel
            </button>
            <button className="modal-btn-primary" onClick={handleAddProduct}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCustomers = () => {
    const mockCustomers = [
      { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+1 (555) 123-4567', avatar: null, memberSince: 'Jan 2023', orders: 12, totalSpent: 1240.00, status: 'Active' },
      { id: 2, name: 'Mike Ross', email: 'mike.ross@law.com', phone: '+1 (555) 987-6543', avatar: 'MR', memberSince: 'Feb 2023', orders: 3, totalSpent: 450.50, status: 'Inactive' },
      { id: 3, name: 'Jessica Pearson', email: 'jessica.p@firm.com', phone: '+1 (555) 222-3333', avatar: null, memberSince: 'Mar 2023', orders: 28, totalSpent: 3890.00, status: 'Active' },
      { id: 4, name: 'Harvey Specter', email: 'harvey@specter.com', phone: '+1 (555) 777-8888', avatar: null, memberSince: 'Apr 2023', orders: 56, totalSpent: 12450.00, status: 'Pending' },
      { id: 5, name: 'Donna Paulsen', email: 'donna@admin.com', phone: '+1 (555) 444-5556', avatar: 'DP', memberSince: 'May 2023', orders: 5, totalSpent: 620.00, status: 'Active' },
    ];

    const totalCustomers = 2453;
    const newThisMonth = 128;
    const activeUsers = 1890;

    return (
      <div className="customers-management-view">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="breadcrumb-item">Dashboard</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Customers</span>
        </div>

        {/* Header */}
        <div className="customers-header">
          <div>
            <h1>Customer Management</h1>
            <p>Manage user accounts, view order history, and handle support requests efficiently</p>
          </div>
          <button className="add-customer-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Customer
          </button>
        </div>

        {/* Stats Cards */}
        <div className="customers-stats">
          <div className="customer-stat-card">
            <div className="customer-stat-label">Total Customers</div>
            <div className="customer-stat-value">
              {totalCustomers.toLocaleString()}
              <span className="customer-stat-change positive">+12%</span>
            </div>
          </div>

          <div className="customer-stat-card">
            <div className="customer-stat-label">New This Month</div>
            <div className="customer-stat-value">
              {newThisMonth}
              <span className="customer-stat-change positive">+5%</span>
            </div>
          </div>

          <div className="customer-stat-card">
            <div className="customer-stat-label">Active Users</div>
            <div className="customer-stat-value">
              {activeUsers.toLocaleString()}
              <span className="customer-stat-change positive">+2%</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="customers-filters">
          <div className="search-wrapper-customers">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or phone number..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-actions">
            <button className="filters-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
            </button>
            <button className="export-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="customers-table-container">
          <table className="customers-table-main">
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>CONTACT</th>
                <th>ORDERS</th>
                <th>TOTAL SPENT</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-info-cell">
                      {customer.avatar ? (
                        <div className="customer-avatar-initials" style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #c94b7d 100%)' }}>
                          {customer.avatar}
                        </div>
                      ) : (
                        <div className="customer-avatar-img">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                      )}
                      <div>
                        <div className="customer-name">{customer.name}</div>
                        <div className="customer-since">Member since {customer.memberSince}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="contact-email">{customer.email}</div>
                      <div className="contact-phone">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="orders-count">{customer.orders}</td>
                  <td className="total-spent">${customer.totalSpent.toFixed(2)}</td>
                  <td>
                    <span className={`customer-status-badge status-${customer.status.toLowerCase()}`}>
                      ● {customer.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-dots">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="customers-pagination">
          <div className="pagination-info">
            Showing <strong>1-5</strong> of <strong>{totalCustomers.toLocaleString()}</strong> customers
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <span className="pagination-dots">...</span>
            <button className="pagination-btn">Next</button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const mockBanners = [
      { id: 1, title: 'Spring Collection 2024', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400', status: 'active' },
      { id: 2, title: "Mother's Day Special", image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400', status: 'active' },
      { id: 3, title: 'New Arrivals Teaser', image: 'https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?w=400', status: 'draft' },
    ];

    const mockBlogPosts = [
      { id: 1, title: '5 Tips for Perfect Gift Wrapping', author: 'Sarah Jenkins', date: 'Oct 24, 2023', status: 'Published', icon: '🎁' },
      { id: 2, title: 'Corporate Gifting Guide 2024', author: 'Mike Ross', date: 'Oct 20, 2023', status: 'Pending Review', icon: '💼' },
      { id: 3, title: 'DIY Card Making for Beginners', author: 'Sarah Jenkins', date: 'Oct 15, 2023', status: 'Published', icon: '✂️' },
    ];

    return (
      <div className="content-management-view">
        {/* Header */}
        <div className="content-header">
          <div>
            <h1>Content Management</h1>
            <p>Manage banners, blog posts, and static pages</p>
          </div>
          <button className="create-content-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Content
          </button>
        </div>

        {/* Stats Cards */}
        <div className="content-stats">
          <div className="content-stat-card">
            <div className="content-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div className="content-stat-info">
              <div className="content-stat-label">ACTIVE BANNERS</div>
              <div className="content-stat-value">4</div>
              <div className="content-stat-change positive">↗ +1 this week</div>
            </div>
          </div>

          <div className="content-stat-card">
            <div className="content-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <div className="content-stat-info">
              <div className="content-stat-label">PUBLISHED POSTS</div>
              <div className="content-stat-value">12</div>
              <div className="content-stat-change positive">↗ +2 this month</div>
            </div>
          </div>

          <div className="content-stat-card">
            <div className="content-stat-icon" style={{ background: 'rgba(249, 115, 22, 0.1)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="content-stat-info">
              <div className="content-stat-label">STATIC PAGES</div>
              <div className="content-stat-value">6</div>
              <div className="content-stat-change neutral">— No change</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="content-tabs">
          <button
            className={`content-tab ${contentTab === 'banners' ? 'active' : ''}`}
            onClick={() => setContentTab('banners')}
          >
            Homepage Banners
          </button>
          <button
            className={`content-tab ${contentTab === 'posts' ? 'active' : ''}`}
            onClick={() => setContentTab('posts')}
          >
            Blog Posts
          </button>
          <button
            className={`content-tab ${contentTab === 'pages' ? 'active' : ''}`}
            onClick={() => setContentTab('pages')}
          >
            Static Pages
          </button>
          <button
            className={`content-tab ${contentTab === 'promotions' ? 'active' : ''}`}
            onClick={() => setContentTab('promotions')}
          >
            Promotions
          </button>
        </div>

        {/* Homepage Sliders */}
        {contentTab === 'banners' && (
          <div className="homepage-sliders-section">
            <div className="section-header">
              <h2>Homepage Sliders</h2>
              <a href="#" className="reorder-link">Reorder</a>
            </div>
            <div className="sliders-grid">
              {mockBanners.map((banner) => (
                <div key={banner.id} className="slider-card">
                  <div className="slider-image-wrapper">
                    <img src={banner.image} alt={banner.title} />
                    <span className={`slider-status-badge ${banner.status}`}>
                      {banner.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="slider-title">{banner.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Section */}
        {contentTab === 'posts' && (
          <div className="blog-posts-section">
            <div className="section-header">
              <h2>Recent Blog Posts</h2>
              <a href="#" className="view-all-link">View All</a>
            </div>
            <div className="blog-posts-table-container">
              <table className="blog-posts-table">
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>AUTHOR</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBlogPosts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <div className="blog-title-cell">
                          <div className="blog-icon">{post.icon}</div>
                          <span>{post.title}</span>
                        </div>
                      </td>
                      <td>{post.author}</td>
                      <td>{post.date}</td>
                      <td>
                        <span className={`blog-status-badge status-${post.status.toLowerCase().replace(' ', '-')}`}>
                          {post.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-edit-btn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {contentTab === 'pages' && (
          <div className="placeholder-section">
            <div className="placeholder-icon">📄</div>
            <h3>Static Pages</h3>
            <p>Manage your website's static pages like About, Contact, FAQ, etc.</p>
          </div>
        )}

        {contentTab === 'promotions' && (
          <div className="placeholder-section">
            <div className="placeholder-icon">🎉</div>
            <h3>Promotions</h3>
            <p>Create and manage promotional campaigns and discount codes.</p>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="settings-page-view">
        {/* Top Navigation */}
        <div className="settings-breadcrumb">
          <span className="breadcrumb-item">Dashboard</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">Settings</span>
        </div>

        {/* Settings Header */}
        <div className="settings-page-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your store preferences and system configurations</p>
          </div>
          <div className="settings-actions">
            <button className="discard-btn">Discard</button>
            <button className="save-changes-btn">Save Changes</button>
          </div>
        </div>

        <div className="settings-container">
          {/* Settings Sidebar */}
          <div className="settings-sidebar">
            <div className="settings-section-label">CONFIGURATION</div>
            
            <button
              className={`settings-nav-item ${settingsSection === 'general' ? 'active' : ''}`}
              onClick={() => setSettingsSection('general')}
            >
              <div className="settings-nav-icon" style={{ background: '#ff6b9d' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="settings-nav-text">
                <div className="settings-nav-title">General</div>
                <div className="settings-nav-subtitle">Identity & Contact</div>
              </div>
            </button>

            <button
              className={`settings-nav-item ${settingsSection === 'store' ? 'active' : ''}`}
              onClick={() => setSettingsSection('store')}
            >
              <div className="settings-nav-icon" style={{ background: '#8b5cf6' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div className="settings-nav-text">
                <div className="settings-nav-title">Store Preferences</div>
                <div className="settings-nav-subtitle">Currency & Timezone</div>
              </div>
            </button>

            <button
              className={`settings-nav-item ${settingsSection === 'payments' ? 'active' : ''}`}
              onClick={() => setSettingsSection('payments')}
            >
              <div className="settings-nav-icon" style={{ background: '#3b82f6' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div className="settings-nav-text">
                <div className="settings-nav-title">Payments</div>
                <div className="settings-nav-subtitle">Gateways & Taxes</div>
              </div>
            </button>

            <button
              className={`settings-nav-item ${settingsSection === 'shipping' ? 'active' : ''}`}
              onClick={() => setSettingsSection('shipping')}
            >
              <div className="settings-nav-icon" style={{ background: '#f59e0b' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <div className="settings-nav-text">
                <div className="settings-nav-title">Shipping</div>
                <div className="settings-nav-subtitle">Zones & Rates</div>
              </div>
            </button>

            <button
              className={`settings-nav-item ${settingsSection === 'team' ? 'active' : ''}`}
              onClick={() => setSettingsSection('team')}
            >
              <div className="settings-nav-icon" style={{ background: '#ec4899' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="settings-nav-text">
                <div className="settings-nav-title">Team & Roles</div>
                <div className="settings-nav-subtitle">Permissions</div>
              </div>
            </button>
          </div>

          {/* Settings Content */}
          <div className="settings-content">
            {settingsSection === 'general' && (
              <>
                {/* Site Identity */}
                <div className="settings-card">
                  <div className="settings-card-header">
                    <h2>Site Identity</h2>
                    <p>Basic information about your store</p>
                  </div>
                  <div className="settings-card-body">
                    <div className="settings-form-row">
                      <div className="settings-form-group">
                        <label>Site Title</label>
                        <input
                          type="text"
                          value={siteTitle}
                          onChange={(e) => setSiteTitle(e.target.value)}
                          className="settings-input"
                        />
                      </div>
                      <div className="settings-form-group">
                        <label>Tagline</label>
                        <input
                          type="text"
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                          className="settings-input"
                        />
                      </div>
                    </div>
                    <div className="settings-form-group">
                      <label>Store Description</label>
                      <textarea
                        value={storeDescription}
                        onChange={(e) => setStoreDescription(e.target.value)}
                        placeholder="Enter a short description for SEO purposes"
                        className="settings-textarea"
                        rows="4"
                      ></textarea>
                      <div className="settings-hint">This description will appear in search engine results.</div>
                    </div>
                  </div>
                </div>

                {/* Branding */}
                <div className="settings-card">
                  <div className="settings-card-header">
                    <h2>Branding</h2>
                    <p>Upload your logo and favicon</p>
                  </div>
                  <div className="settings-card-body">
                    <div className="settings-form-row">
                      <div className="settings-form-group">
                        <label>Logo Image</label>
                        <div className="file-upload-area">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                          <div className="file-upload-text">Click to upload</div>
                          <div className="file-upload-hint">SVG, PNG, JPG or GIF (max. 800x400px)</div>
                        </div>
                      </div>
                      <div className="settings-form-group">
                        <label>Favicon</label>
                        <div className="favicon-upload">
                          <div className="favicon-preview">
                            <div className="favicon-icon" style={{ background: '#ff6b9d' }}></div>
                            <div>
                              <div className="favicon-name">favicon.ico</div>
                              <div className="favicon-size">32kb</div>
                            </div>
                          </div>
                          <button className="favicon-delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="settings-card">
                  <div className="settings-card-header">
                    <h2>Contact Information</h2>
                    <p>How customers can reach you</p>
                  </div>
                  <div className="settings-card-body">
                    <div className="settings-form-row">
                      <div className="settings-form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          placeholder="contact@pinkpost.com"
                          className="settings-input"
                        />
                      </div>
                      <div className="settings-form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="settings-input"
                        />
                      </div>
                    </div>
                    <div className="settings-form-group">
                      <label>Business Address</label>
                      <textarea
                        placeholder="Enter your business address"
                        className="settings-textarea"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </>
            )}

            {settingsSection === 'store' && (
              <div className="settings-placeholder">
                <div className="placeholder-icon">🏪</div>
                <h3>Store Preferences</h3>
                <p>Configure currency, timezone, and other store settings</p>
              </div>
            )}

            {settingsSection === 'payments' && (
              <div className="settings-placeholder">
                <div className="placeholder-icon">💳</div>
                <h3>Payment Settings</h3>
                <p>Manage payment gateways and tax configurations</p>
              </div>
            )}

            {settingsSection === 'shipping' && (
              <div className="settings-placeholder">
                <div className="placeholder-icon">🚚</div>
                <h3>Shipping Settings</h3>
                <p>Configure shipping zones, rates, and delivery options</p>
              </div>
            )}

            {settingsSection === 'team' && (
              <div className="settings-placeholder">
                <div className="placeholder-icon">👥</div>
                <h3>Team & Roles</h3>
                <p>Manage team members and their permissions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard-new">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">P</div>
            <div className="logo-text">
              <h2>Pink Post</h2>
              <p>Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </button>

          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Orders
          </button>

          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Products
          </button>

          <button 
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Customers
          </button>

          <button 
            className={`nav-item ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Content
          </button>

          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m5.66-15.66l-4.24 4.24m-2.82 2.84l-4.24 4.24m16.56-6.36l-4.24-4.24m-2.84 2.82l-4.24-4.24m15.66 11.72l-6-6m-6 6l-6-6"></path>
            </svg>
            Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="help-card">
            <div className="help-icon">💡</div>
            <h4>Need Help?</h4>
            <p>Check our docs</p>
            <button className="docs-btn">Documentation</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="admin-user">
            <div className="user-avatar">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
            </div>
            <div className="user-info">
              <h3>Sarah Jenkins</h3>
              <p>Super Admin</p>
            </div>
          </div>
          <div className="top-bar-actions">
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">3</span>
            </button>
            <button className="logout-btn-new" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'customers' && renderCustomers()}
          {activeTab === 'content' && renderContent()}
          {activeTab === 'settings' && renderSettings()}
        </div>
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

      {/* Product Modal */}
      {renderProductModal()}
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
