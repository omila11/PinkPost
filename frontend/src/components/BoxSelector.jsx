import React, { useState, useEffect } from 'react';
import { boxAPI } from '../api/adminAPI';

export default function BoxSelector({ selectedBox, onSelectBox }) {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await boxAPI.getAll({ inStock: true });
        setBoxes(response.boxes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching boxes:', error);
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  return (
    <div className="box-selector-section">
      <h2>Start by Choosing a Box</h2>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          Loading boxes...
        </div>
      ) : boxes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          No boxes available yet.
        </div>
      ) : (
        <div className="boxes-grid">
          {boxes.map(box => (
            <div 
              key={box._id}
              className={`box-option ${selectedBox?._id === box._id ? 'selected' : ''}`}
              onClick={() => onSelectBox(box)}
            >
              <div className="box-image-wrapper" style={{ backgroundColor: box.color }}>
                <img src={box.image} alt={box.name} />
                {selectedBox?._id === box._id && (
                  <div className="selected-checkmark">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="box-info">
                <h3>{box.name}</h3>
                <p className="box-size">{box.size}</p>
                <p className="box-price">${parseFloat(box.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
