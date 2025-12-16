import React, { useState } from 'react';

export default function FilterSidebar({ selectedCategory, onCategoryChange }) {
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([10, 200]);

  const categories = [
    'All',
    'Birthday',
    'Anniversary',
    'Wedding',
    'Baby Shower',
    'Graduation',
    'Thank You',
    'Get Well',
    'Sympathy',
    'Holiday',
    'Just Because'
  ];

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter & Sort</h3>
        <button className="clear-all-btn" onClick={() => onCategoryChange('All')}>Clear All</button>
      </div>

      {/* Sort By */}
      <div className="filter-section">
        <h4>Sort By</h4>
        <select 
          className="sort-select" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Occasion Category */}
      <div className="filter-section">
        <h4>Occasion</h4>
        <div className="filter-options">
          {categories.map(category => (
            <label key={category} className="filter-checkbox">
              <input 
                type="radio" 
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <input 
            type="number" 
            className="price-input" 
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
          />
          <span>-</span>
          <input 
            type="number" 
            className="price-input" 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
        </div>
        <input 
          type="range" 
          min="10" 
          max="200" 
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="price-slider"
        />
        <div className="price-labels">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </aside>
  );
}
