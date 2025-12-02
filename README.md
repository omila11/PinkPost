# Pink Post – Customized Gift Box Platform

Pink Post is a modern, user-friendly web platform that allows users to create personalized gift boxes by choosing items they love. Whether it's for birthdays, anniversaries, celebrations, or corporate gifting, Pink Post makes it easy to design meaningful gifts with just a few clicks. The platform also features curated gift boxes from partner brands and creators, giving users more variety and creativity.

---

## 🌟 Features

### 🎁 Customized Gift Boxes
- Choose items from multiple categories such as chocolates, stationery, accessories, skincare, handmade items, and more.
- Real-time preview of selected items.
- Add or remove items from the box at any time.

### 🛍️ Third-Party Gift Box Services
- Browse and order gift boxes created by partnered sellers.
- Helps users discover unique and creative gift options.

### 💳 Secure Payments
- Supports ATM/debit card payments.
- Encrypted and secure checkout experience.

### 📦 Smart Ordering System
- Users can schedule the delivery date/time.
- Track order progress (coming soon).

### 📱 Responsive Design
- Optimized for mobile, tablet, and desktop.
- Smooth and modern UI.

---

## 🏗️ Tech Stack

### Frontend
- React 19
- Vite (fast build tool)
- CSS / Tailwind (optional)
- Axios / Fetch API

### Backend
- Node.js / Express
- MongoDB (with Mongoose ODM)
- dotenv for environment variables

### Other Integrations
- Payment Gateway API (planned)
- Email / SMS Notifications (planned)
- Cloud Storage for images (planned)

---

## 🚀 How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/omila11/pink-post-giftbox.git
cd pink-post-giftbox
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB URI and other secrets
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend URL
npm start
```

### 4. Build for Production
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### 5. Docker (Optional)
```bash
cd backend
docker build -t pinkpost-backend .
docker run -e MONGO_URI=your_mongo_uri -p 3001:3001 pinkpost-backend
```

---

## 📁 Project Structure

```
/pink-post-giftbox
│
├── /backend
│   ├── /config          # Configuration files
│   ├── /controllers     # Business logic
│   ├── /middlewares     # Custom middleware
│   ├── /models          # MongoDB schemas
│   ├── /routes          # API routes
│   ├── /utils           # Helper functions
│   ├── app.js           # Express app setup
│   ├── server.js        # Server entry point
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── /frontend
│   ├── /public          # Static assets
│   ├── /src
│   │   ├── /api         # API helper functions
│   │   ├── /assets      # Images, logos
│   │   ├── /components  # Reusable components
│   │   ├── /pages       # Page components
│   │   ├── /utils       # Utility functions
│   │   ├── App.jsx      # Root component
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── .env.example
│
├── /.github
│   └── /workflows
│       └── ci.yml       # GitHub Actions CI
│
├── LICENSE              # MIT License
├── README.md            # This file
└── .gitignore
```

---

## 🖼️ Screenshots

_Coming soon – screenshots of the UI will be added here._

---

## 📝 Future Enhancements

- 🎉 Discount codes & promotions
- 🛒 Wishlist feature
- 🏷️ Personalized greeting card generator
- 📍 Smart delivery tracking with map
- 🤝 More partner brands for curated gift boxes
- 🔐 User authentication (JWT)
- 👤 User profile & order history
- ⭐ Product reviews & ratings

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to open issues, suggest new features, or submit pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

For feedback or collaboration:

📮 **Email:** your-email@example.com  
🌐 **Website:** https://your-pinkpost-site.com  
💼 **GitHub:** [@omila11](https://github.com/omila11)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

**Pink Post** — Where creativity meets convenience. Gifting made personal, beautiful, and effortless. 🎀
