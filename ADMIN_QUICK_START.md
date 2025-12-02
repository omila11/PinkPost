# Admin System - Quick Start Guide

## 🚀 What I've Created

I've implemented a complete admin system for Pink Post Gift Box that allows you to:
- ✅ Login as an admin
- ✅ Add new gift items
- ✅ Edit existing items
- ✅ Delete items
- ✅ Mark items as in/out of stock
- ✅ Filter and search items
- ✅ View statistics (total items, in stock, out of stock)

## 📁 Files Created

### Backend (7 files)
1. `backend/models/userModel.js` - User authentication model
2. `backend/models/giftItemModel.js` - Gift items database model
3. `backend/controllers/authController.js` - Login/register logic
4. `backend/controllers/giftItemController.js` - Gift items CRUD operations
5. `backend/middlewares/authMiddleware.js` - JWT authentication & admin check
6. `backend/routes/authRoutes.js` - Auth API routes
7. `backend/routes/giftItemRoutes.js` - Gift items API routes

### Frontend (5 files)
1. `frontend/src/pages/AdminLogin.jsx` - Admin login page
2. `frontend/src/pages/AdminLogin.css` - Login page styles
3. `frontend/src/pages/AdminDashboard.jsx` - Admin dashboard with item management
4. `frontend/src/pages/AdminDashboard.css` - Dashboard styles
5. `frontend/src/api/adminAPI.js` - API helper functions

### Scripts & Data (3 files)
1. `backend/scripts/createAdmin.js` - Creates first admin user
2. `backend/scripts/importGiftItems.js` - Import items to database
3. `backend/data/giftItemsData.js` - Gift items data template

### Documentation
1. `ADMIN_SETUP.md` - Complete setup guide

## ⚡ Quick Setup (5 Steps)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Update .env File
Add to your `backend/.env`:
```env
JWT_SECRET=pink-post-super-secret-key-2024
```

### Step 3: Create Admin Account
```bash
cd backend
node scripts/createAdmin.js
```

**Admin Credentials Created:**
- Email: `admin@pinkpost.com`
- Password: `admin123`

### Step 4: Start Backend
```bash
cd backend
npm run dev
```

### Step 5: Start Frontend
```bash
cd frontend
npm run dev
```

## 🎯 How to Access

1. **Admin Login**: Navigate to `http://localhost:5173/admin/login`
2. **Login with**: 
   - Email: admin@pinkpost.com
   - Password: admin123
3. **You'll be redirected to**: Admin Dashboard

## 🎨 Admin Dashboard Features

### Main Actions:
- **Add New Item** - Click the "+ Add New Item" button
- **Search Items** - Use the search box to find items by name
- **Filter by Category** - Click category buttons to filter
- **View Statistics** - See total items, in stock, and out of stock counts

### Item Actions:
- **📦 Toggle Stock** - Click to mark item in/out of stock
- **✏️ Edit** - Click to edit item details
- **🗑️ Delete** - Click to remove item permanently

### Adding a New Item:
1. Click "+ Add New Item"
2. Fill in:
   - Name (e.g., "Premium Chocolate Box")
   - Price (e.g., 15.00)
   - Category (dropdown)
   - Subcategory (e.g., "Chocolates")
   - Image URL (path to image)
   - Background Color (color picker)
   - Stock Quantity (default: 100)
   - In Stock checkbox
3. Click "Create"

## 🔒 Security Features

- Passwords are hashed with bcrypt
- JWT tokens for authentication
- Admin-only routes protected
- Tokens expire after 7 days
- Role-based access control (admin/user)

## 🔌 API Endpoints

All admin operations require `Authorization: Bearer <token>` header.

**Public:**
- GET `/api/gift-items` - Get all items
- GET `/api/gift-items/:id` - Get single item

**Admin Only:**
- POST `/api/gift-items` - Create item
- PUT `/api/gift-items/:id` - Update item
- DELETE `/api/gift-items/:id` - Delete item
- PATCH `/api/gift-items/:id/toggle-stock` - Toggle stock status

## 📊 Database Models

### Gift Item Fields:
```javascript
{
  name: "Artisan Chocolate Box",
  price: 15.00,
  category: "Sweet Treats",
  subcategory: "Chocolates",
  image: "/images/products/Sweet_Treats/Chocolates/chocolate1.jpg",
  bg: "#3d2817",
  inStock: true,
  stockQuantity: 100
}
```

## 🔄 Making GiftSelector Dynamic

To fetch items from database instead of hardcoded array:

```javascript
// In GiftSelector.jsx
const [gifts, setGifts] = useState([]);

useEffect(() => {
  // Fetch only items that are in stock
  fetch('http://localhost:5000/api/gift-items?inStock=true')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setGifts(data.items);
      }
    })
    .catch(error => console.error('Error fetching items:', error));
}, []);
```

## 📝 Next Steps

1. **Import Existing Items**: 
   - Copy your 422 items from GiftSelector.jsx to `backend/data/giftItemsData.js`
   - Remove the `id` field from each item
   - Run `node scripts/importGiftItems.js`

2. **Change Admin Password**:
   - Login to admin dashboard
   - (You can add a password change feature later)

3. **Test the System**:
   - Add a test item
   - Edit it
   - Toggle stock status
   - Delete it

4. **Connect Frontend**:
   - Update GiftSelector to fetch from API
   - Out-of-stock items won't appear in Create a Box

## ❓ Troubleshooting

**Can't login?**
- Make sure MongoDB is running
- Check that you ran `createAdmin.js`
- Verify .env has JWT_SECRET

**CORS errors?**
- Backend must be on port 5000
- Frontend on port 5173
- CORS is enabled in backend/app.js

**Items not saving?**
- Check MongoDB connection
- Look at browser console for errors
- Verify token is being sent

## 📞 Need Help?

All the code is fully functional and ready to use. Just follow the 5 setup steps above and you'll have a working admin system!

The admin dashboard is styled with Pink Post's pink theme and has a modern, professional interface. 🎀
