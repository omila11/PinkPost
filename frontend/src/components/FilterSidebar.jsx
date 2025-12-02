import React, { useState } from 'react';

export default function FilterSidebar() {
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategories, setSelectedCategories] = useState(['self-care']);
  const [priceRange, setPriceRange] = useState([10, 200]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter & Sort</h3>
        <button className="clear-all-btn">Clear All</button>
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

      {/* Category */}
      <div className="filter-section">
        <h4>Category</h4>
        <div className="filter-options">
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('birthday')}
              onChange={() => toggleCategory('birthday')}
            />
            <span>Birthday</span>
          </label>
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('wedding')}
              onChange={() => toggleCategory('wedding')}
            />
            <span>Wedding</span>
          </label>
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('self-care')}
              onChange={() => toggleCategory('self-care')}
            />
            <span>Self-Care</span>
          </label>
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('thank-you')}
              onChange={() => toggleCategory('thank-you')}
            />
            <span>Thank You</span>
          </label>
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

      {/* Product Type */}
      <div className="filter-section">
        <h4>Product Type</h4>
        <div className="filter-options">
          <label className="filter-checkbox">
            <input type="checkbox" defaultChecked />
            <span>Gift Boxes</span>
          </label>
          <label className="filter-checkbox">
            <input type="checkbox" />
            <span>Individual Items</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
