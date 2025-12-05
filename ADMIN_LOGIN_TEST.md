# PinkPost - Admin Login Test Instructions

## Both Servers are Running! ✓

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

## How to Test Admin Login

### Step 1: Open Admin Login Page
1. Open your browser
2. Navigate to: `http://localhost:5173/admin/login`

### Step 2: Sign In with Admin Credentials
- **Email**: `admin@pinkpost.com`
- **Password**: `admin123`

### Step 3: After Successful Login
You should be automatically redirected to: `http://localhost:5173/admin/dashboard`

## If the Dashboard Doesn't Load:

### Quick Fix 1: Manual Navigation
After logging in, if you're not redirected, manually type in browser:
```
http://localhost:5173/admin/dashboard
```

### Quick Fix 2: Check Browser Console
1. Press F12 to open Developer Tools
2. Check the Console tab for any errors
3. Check the Network tab to see if the login request succeeded

### Quick Fix 3: Clear Cache and Retry
1. Press Ctrl+Shift+R to hard refresh
2. Try logging in again

## Troubleshooting

If you still can't access the dashboard:
1. Check that you're logged in: Open browser console and type:
   ```javascript
   localStorage.getItem('token')
   ```
   This should show a token string.

2. Check user role:
   ```javascript
   JSON.parse(localStorage.getItem('user'))
   ```
   This should show `role: "admin"`.

## Current Status
✅ MongoDB connected (Cluster1)
✅ Backend server running (port 5000)
✅ Frontend server running (port 5173)
✅ Admin user created
✅ Login endpoint working
✅ Routing configured for /admin/dashboard

You should now be able to log in and access the admin dashboard!
