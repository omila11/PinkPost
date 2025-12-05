# MongoDB Atlas IP Whitelist Fix

## Problem
The "Failed to fetch" error when signing in as admin is caused by:
1. Backend server not running (now fixed - server is running on port 5000)
2. MongoDB Atlas connection failing due to IP whitelist restrictions

## Solution

### Step 1: Get Your Current IP Address
Run this command in PowerShell to get your current public IP:
```powershell
(Invoke-WebRequest -Uri "https://api.ipify.org").Content
```

### Step 2: Add IP to MongoDB Atlas Whitelist

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Log in with your credentials (omila account)
3. Select your cluster ("omila")
4. Click on "Network Access" in the left sidebar
5. Click "Add IP Address"
6. Either:
   - Click "Add Current IP Address" to automatically add your current IP
   - OR enter `0.0.0.0/0` to allow access from anywhere (NOT recommended for production!)
7. Click "Confirm"
8. Wait 1-2 minutes for the changes to take effect

### Step 3: Restart the Backend Server
The server should automatically reconnect once your IP is whitelisted.

### Alternative: Use Local MongoDB (Development Only)

If you want to test locally without MongoDB Atlas:

1. Install MongoDB Community Edition locally
2. Update `.env` file:
```
MONGO_URI=mongodb://localhost:27017/pinkpost
```
3. Restart the server

## Current Server Status
✓ Backend server is running on http://localhost:5000
✗ MongoDB connection: Waiting for IP whitelist
⚠ Login will work once MongoDB is connected

## Testing
Once MongoDB is connected, test login with:
```powershell
$body = @{ email = "admin@pinkpost.com"; password = "admin123" } | ConvertTo-Json
Invoke-WebRequest -Uri 'http://localhost:5000/api/auth/login' -Method POST -Body $body -ContentType 'application/json'
```
