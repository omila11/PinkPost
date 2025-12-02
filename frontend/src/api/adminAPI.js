const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return authFetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (username, email, password, role = 'user') => {
    return authFetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role }),
    });
  },

  getCurrentUser: async () => {
    return authFetch(`${API_BASE_URL}/auth/me`);
  },
};

// Gift Items API
export const giftItemsAPI = {
  // Get all items with optional filters
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.subcategory) queryParams.append('subcategory', filters.subcategory);
    if (filters.inStock !== undefined) queryParams.append('inStock', filters.inStock);

    const url = `${API_BASE_URL}/gift-items${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return authFetch(url);
  },

  // Get single item by ID
  getById: async (id) => {
    return authFetch(`${API_BASE_URL}/gift-items/${id}`);
  },

  // Create new item (admin only)
  create: async (itemData) => {
    return authFetch(`${API_BASE_URL}/gift-items`, {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  // Update item (admin only)
  update: async (id, itemData) => {
    return authFetch(`${API_BASE_URL}/gift-items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  },

  // Delete item (admin only)
  delete: async (id) => {
    return authFetch(`${API_BASE_URL}/gift-items/${id}`, {
      method: 'DELETE',
    });
  },

  // Toggle stock status (admin only)
  toggleStock: async (id) => {
    return authFetch(`${API_BASE_URL}/gift-items/${id}/toggle-stock`, {
      method: 'PATCH',
    });
  },

  // Bulk import items (admin only)
  bulkImport: async (items) => {
    return authFetch(`${API_BASE_URL}/gift-items/bulk-import`, {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  },
};

// Giftbox API (existing)
export const giftboxAPI = {
  getAll: async () => {
    return authFetch(`${API_BASE_URL}/giftboxes`);
  },

  create: async (giftboxData) => {
    return authFetch(`${API_BASE_URL}/giftboxes`, {
      method: 'POST',
      body: JSON.stringify(giftboxData),
    });
  },
};

export default {
  auth: authAPI,
  giftItems: giftItemsAPI,
  giftbox: giftboxAPI,
};
