import React from 'react';

export default function FooterLinks() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Pink Post</h3>
          <p>Curated gift boxes for every moment that matters. Gifting made personal and beautiful.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="10" cy="10" r="8" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                <path d="M12 7h-1a2 2 0 00-2 2v1H7v2h2v5h2v-5h2l.5-2H11V9a1 1 0 011-1h1V7z" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                <circle cx="10" cy="10" r="3.5" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                <circle cx="15" cy="5" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="10" cy="10" r="8" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                <path d="M10 6c-2.5 0-4 1.5-4 3.5 0 1 .5 2 1.5 2 .3 0 .5-.5.5-.8 0-.5-.5-1-.5-1.7 0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5c0 2-1 3.5-2.5 3.5-.5 0-1-.3-1-.8 0-.7.5-1.3.5-2 0-1.2-1.5-1-1.5.5 0 .3 0 .7.2 1-.5 2-1.2 4.5-1.2 6.5v.3" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/create">Create a Box</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Info</h4>
          <p>hello@pinkpost.com</p>
          <p>(123) 456-7890</p>
          <p>123 Gifting Lane, Celebration, FL 12345</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Pink Post. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
