import React from 'react';
import '../styles/About.css';
import Navbar from '../components/Navbar';
import FooterLinks from '../components/FooterLinks';

function About() {
  const values = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      title: 'Thoughtfulness',
      description: 'Every gift is curated with intention and care to create a meaningful experience.'
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>
      ),
      title: 'Quality',
      description: 'We source only the finest products to ensure your gift is nothing short of perfect.'
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      ),
      title: 'Personalization',
      description: 'Your vision, your gift. We provide the tools to create a truly unique present.'
    }
  ];

  const curators = [
    {
      name: 'Jane Doe',
      role: 'Founder & Chief Gifter',
      image: '/images/curator-1.jpg'
    },
    {
      name: 'John Smith',
      role: 'Head of Curation',
      image: '/images/curator-2.jpg'
    },
    {
      name: 'Emily White',
      role: 'Customer Happiness Lead',
      image: '/images/curator-3.jpg'
    }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>The Art of Thoughtful Gifting</h1>
          <p>Discover the story behind Pink Post and our mission to make every gift a memorable experience.</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="our-story-container">
          <div className="our-story-text">
            <h2>Our Story</h2>
            <p>Pink Post was born from a simple idea: that gifting should be personal, beautiful, and effortless. We started our journey to bring joy and thoughtfulness back into the art of giving, one curated box at a time. Our passion is creating moments of delight and connection through perfectly personalized presents.</p>
          </div>
          <div className="our-story-image">
            <img src="/images/gift-box-hands.jpg" alt="Pink Post Gift Box" />
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="mission-values-section">
        <h2>Our Mission & Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Curators Section */}
      <section className="curators-section">
        <h2>Meet the Curators</h2>
        <div className="curators-grid">
          {curators.map((curator, index) => (
            <div key={index} className="curator-card">
              <div className="curator-image">
                <img src={curator.image} alt={curator.name} />
              </div>
              <h3>{curator.name}</h3>
              <p>{curator.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="testimonial-content">
          <div className="quote-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#ff6b9d">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path>
            </svg>
          </div>
          <blockquote>
            "The most beautiful and thoughtful gift I've ever received. The attention to detail was incredible. Pink Post made my friend's birthday so special!"
          </blockquote>
          <p className="testimonial-author">Sarah L.</p>
          <div className="testimonial-stars">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-content">
          <h2>Ready to Create a Moment?</h2>
          <p>Start by exploring our curated collections or build a personalized gift box from scratch.</p>
          <div className="about-cta-buttons">
            <button className="cta-btn-primary" onClick={() => window.location.href = '/shop'}>
              Shop Now
            </button>
            <button className="cta-btn-secondary" onClick={() => window.location.href = '/create'}>
              Build a Box
            </button>
          </div>
        </div>
      </section>

      <FooterLinks />
    </div>
  );
}

export default About;
