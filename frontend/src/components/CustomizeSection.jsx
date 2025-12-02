import React from 'react';

export default function CustomizeSection() {
  return (
    <section className="steps-section">
      <h2>Create a Custom Box in 3 Easy Steps</h2>
      <p className="steps-subtitle">Personalize the perfect gift with our simple, intuitive process. From box to bow, you're in control.</p>
      <div className="steps-grid">
        <div className="step-card">
          <div className="step-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h3>1. Pick a Box</h3>
          <p>Start by choosing the perfect style and size for your occasion.</p>
        </div>
        <div className="step-card">
          <div className="step-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="1.5">
              <polyline points="20 12 20 22 4 22 4 12"></polyline>
              <rect x="2" y="7" width="20" height="5"></rect>
              <line x1="12" y1="22" x2="12" y2="7"></line>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
          </div>
          <h3>2. Fill with Gifts</h3>
          <p>Browse our curated selection of high-quality gifts to fill your box.</p>
        </div>
        <div className="step-card">
          <div className="step-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ff6b9d" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h3>3. Add a Card</h3>
          <p>Finish with a personal touch by selecting a card and writing a heartfelt message.</p>
        </div>
      </div>
    </section>
  );
}
