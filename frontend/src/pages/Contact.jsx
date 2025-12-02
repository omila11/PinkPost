import React, { useState } from 'react';
import '../styles/Contact.css';
import Navbar from '../components/Navbar';
import FooterLinks from '../components/FooterLinks';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', newsletterEmail);
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you! Whether you have a question about our gift boxes, an order, or just want to say hello, use the form below or contact us directly.</p>
        </div>

        {/* Main Content Grid */}
        <div className="contact-content-grid">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is your message about?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="send-message-btn">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="contact-info-section">
            <div className="contact-info-card">
              <h2>Other Ways to Connect</h2>
              
              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <a href="mailto:hello@pinkpost.com">hello@pinkpost.com</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <a href="tel:+12345678910">+1 (234) 567-890</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="contact-info-text">
                  <span>Mon - Fri: 9am - 5pm</span>
                </div>
              </div>
            </div>

            {/* Boutique Location */}
            <div className="boutique-card">
              <h3>Visit Our Boutique</h3>
              <p>123 Blossom Lane, Petaluma, CA 94952</p>
              <div className="boutique-map">
                <svg width="100%" height="200" viewBox="0 0 300 200" fill="none">
                  <rect width="300" height="200" fill="#f5ebe0"/>
                  {/* Simple map illustration */}
                  <line x1="50" y1="40" x2="250" y2="40" stroke="#d4a574" strokeWidth="2"/>
                  <line x1="50" y1="80" x2="250" y2="80" stroke="#d4a574" strokeWidth="2"/>
                  <line x1="50" y1="120" x2="250" y2="120" stroke="#d4a574" strokeWidth="2"/>
                  <line x1="50" y1="160" x2="250" y2="160" stroke="#d4a574" strokeWidth="2"/>
                  <line x1="80" y1="20" x2="80" y2="180" stroke="#d4a574" strokeWidth="2"/>
                  <line x1="130" y1="20" x2="130" y2="180" stroke="#d4a574" strokeWidth="2"/>
                  <line x1="180" y1="20" x2="180" y2="180" stroke="#d4a574" strokeWidth="2"/>
                  <line x1="220" y1="20" x2="220" y2="180" stroke="#d4a574" strokeWidth="2"/>
                  {/* Location pin */}
                  <path d="M150 60 C150 60, 140 80, 140 90 C140 100, 145 105, 150 105 C155 105, 160 100, 160 90 C160 80, 150 60, 150 60 Z" fill="#2d5a5a" stroke="#2d5a5a" strokeWidth="2"/>
                  <circle cx="150" cy="85" r="5" fill="#f5ebe0"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="contact-social-section">
          <div className="social-links-contact">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h3>Join Our Newsletter</h3>
            <p>Get the latest on new arrivals, special offers, and more.</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <FooterLinks />
    </div>
  );
}

export default Contact;
