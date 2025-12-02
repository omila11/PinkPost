import React from 'react';

const boxes = [
  { 
    id: 1, 
    name: 'Classic Pink Box', 
    price: 10.00, 
    image: '/images/ebox/ebox1.jpeg',
    color: '#ffc0cb',
    size: '8 x 8 x 3'
  },
  { 
    id: 2, 
    name: 'Luxe White Box', 
    price: 12.00, 
    image: '/images/ebox/ebox2.jpeg',
    color: '#f5e6d3',
    size: '10 x 10 x 4'
  },
  { 
    id: 3, 
    name: 'Midnight Luxe Box', 
    price: 15.00, 
    image: '/images/ebox/ebox3.jpeg',
    color: '#2c2c2c',
    size: '12 x 12 x 5'
  },
  { 
    id: 4, 
    name: 'Rose Gold Box', 
    price: 13.00, 
    image: '/images/ebox/ebox4.jpeg',
    color: '#e0c4a8',
    size: '9 x 9 x 3.5'
  },
  { 
    id: 5, 
    name: 'Navy Blue Box', 
    price: 14.00, 
    image: '/images/ebox/ebox5.jpeg',
    color: '#1e3a5f',
    size: '11 x 11 x 4.5'
  },
  { 
    id: 6, 
    name: 'Ivory Pearl Box', 
    price: 11.00, 
    image: '/images/ebox/ebox6.jpeg',
    color: '#fffff0',
    size: '8.5 x 8.5 x 3'
  },
  { 
    id: 7, 
    name: 'Champagne Box', 
    price: 16.00, 
    image: '/images/ebox/ebox7.jpeg',
    color: '#f7e7ce',
    size: '13 x 13 x 5.5'
  }
];

export default function BoxSelector({ selectedBox, onSelectBox }) {
  return (
    <div className="box-selector-section">
      <h2>Start by Choosing a Box</h2>
      <div className="boxes-grid">
        {boxes.map(box => (
          <div 
            key={box.id}
            className={`box-option ${selectedBox?.id === box.id ? 'selected' : ''}`}
            onClick={() => onSelectBox(box)}
          >
            <div className="box-image-wrapper" style={{ backgroundColor: box.color }}>
              <img src={box.image} alt={box.name} />
              {selectedBox?.id === box.id && (
                <div className="selected-checkmark">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="box-info">
              <h3>{box.name}</h3>
              <p className="box-price">${box.price.toFixed(2)}</p>
            </div>
            <button className="add-box-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 5v10M5 10h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
