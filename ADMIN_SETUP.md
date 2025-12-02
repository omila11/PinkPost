# Pink Post Gift Box - Admin System Setup Guide

## Features Implemented

### Backend
- ✅ User authentication with JWT
- ✅ Admin role-based access control
- ✅ Gift items CRUD operations
- ✅ Stock management (toggle in/out of stock)
- ✅ Bulk import functionality
- ✅ MongoDB database integration

### Frontend
- ✅ Admin login page
- ✅ Admin dashboard
- ✅ Gift items management interface
- ✅ Add/Edit/Delete items
- ✅ Toggle stock status
- ✅ Filter by category
- ✅ Search functionality

## Setup Instructions

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install the new dependencies:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation and verification

### 2. Environment Variables

Make sure your `.env` file in the backend folder has:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### 3. Create Admin User

Run this script to create your first admin account:

```bash
cd backend
node scripts/createAdmin.js
```

This will create an admin user with:
- **Email**: admin@pinkpost.com
- **Password**: admin123

⚠️ **IMPORTANT**: Change this password after first login!

### 4. Start the Backend Server

```bash
cd backend
npm run dev
```

The server will run on `http://localhost:5000`

### 5. Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## How to Use the Admin System

### Accessing Admin Panel

1. Navigate to: `http://localhost:5173/admin/login`
2. Login with:
   - Email: `admin@pinkpost.com`
   - Password: `admin123`

### Admin Dashboard Features

#### View All Items
- See all gift items in a table format
- Filter by category
- Search by item name
- View stock status

#### Add New Item
1. Click "Add New Item" button
2. Fill in the form:
   - Name
   - Price
   - Category
   - Subcategory
   - Image URL
   - Background color
   - Stock quantity
   - In Stock status
3. Click "Create"

#### Edit Item
1. Click the edit (✏️) button on any item
2. Modify the fields
3. Click "Update"

#### Toggle Stock Status
- Click the 📦/❌ button to mark items as in/out of stock
- Out of stock items will not appear in the Create a Box page

#### Delete Item
1. Click the delete (🗑️) button
2. Confirm deletion

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (requires token)

### Gift Items (Admin Protected)
- `GET /api/gift-items` - Get all items (public)
- `GET /api/gift-items/:id` - Get single item
- `POST /api/gift-items` - Create item (admin only)
- `PUT /api/gift-items/:id` - Update item (admin only)
- `DELETE /api/gift-items/:id` - Delete item (admin only)
- `PATCH /api/gift-items/:id/toggle-stock` - Toggle stock (admin only)
- `POST /api/gift-items/bulk-import` - Bulk import (admin only)

## Updating GiftSelector to Use Database

Currently, the `GiftSelector` component uses hardcoded data. To make it dynamic:

1. Update `GiftSelector.jsx` to fetch from API:

```javascript
const [gifts, setGifts] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/api/gift-items?inStock=true')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setGifts(data.items);
      }
    });
}, []);
```

2. Filter out-of-stock items automatically by passing `?inStock=true` query parameter

## Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: 'admin' | 'user',
  isActive: Boolean,
  timestamps: true
}
```

### GiftItem Model
```javascript
{
  name: String,
  price: Number,
  category: String,
  subcategory: String,
  image: String,
  bg: String,
  inStock: Boolean,
  stockQuantity: Number,
  timestamps: true
}
```

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Protected admin routes
- ✅ Token expiration (7 days)

## Next Steps

1. **Import Existing Items**: Convert your hardcoded gift items to database entries
2. **Image Upload**: Implement image upload functionality instead of URLs
3. **Stock Alerts**: Add notifications when items are low in stock
4. **Order Management**: Track which items are being ordered
5. **Analytics**: Add dashboard statistics and reports

## Troubleshooting

### Cannot login as admin
- Make sure you ran the `createAdmin.js` script
- Check that MongoDB is running
- Verify JWT_SECRET is set in .env

### CORS errors
- Ensure backend is running on port 5000
- Check that CORS is enabled in `app.js`

### Token errors
- Make sure you're sending the token in headers: `Authorization: Bearer <token>`
- Check token hasn't expired (7 days)

## Support

For issues or questions, check:
- MongoDB connection string is correct
- All dependencies are installed
- Environment variables are set properly
