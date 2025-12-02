import React from 'react';

export default function Navbar() {
  const currentPath = window.location.pathname;
  
  const isActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    if (path === '/faq' && (currentPath === '/faq' || currentPath === '/faqs')) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">PinkPost</span>
        </div>
        <ul className="nav-menu">
          <li><a href="/" className={isActive('/') ? 'active' : ''}>Home</a></li>
          <li><a href="/shop" className={isActive('/shop') ? 'active' : ''}>Shop</a></li>
          <li><a href="/create" className={isActive('/create') ? 'active' : ''}>Create a Box</a></li>
          <li><a href="/about" className={isActive('/about') ? 'active' : ''}>About</a></li>
          <li><a href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</a></li>
          <li><a href="/faq" className={isActive('/faq') ? 'active' : ''}>FAQs</a></li>
        </ul>
        <div className="nav-actions">
          <button className="signup-btn" onClick={() => window.location.href = '/signup'}>Sign Up</button>
          <button className="signin-link" onClick={() => window.location.href = '/signin'}>Sign In</button>
          <button className="icon-btn user-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn wishlist-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 17.5l-1.45-1.32C4.4 12.36 2 10.28 2 7.5 2 5.42 3.42 4 5.5 4c1.74 0 3.41.81 4.5 2.09C11.09 4.81 12.76 4 14.5 4 16.58 4 18 5.42 18 7.5c0 2.78-2.4 4.86-6.55 8.68L10 17.5z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <button className="cart-btn" onClick={() => window.location.href = '/checkout'}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 3h2l1.5 9h10l1.5-6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="17" r="1" fill="currentColor"/>
              <circle cx="16" cy="17" r="1" fill="currentColor"/>
            </svg>
            <span className="cart-count">3</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
