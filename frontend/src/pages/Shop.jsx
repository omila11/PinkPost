import React, { useState } from 'react';
import '../styles/Shop.css';
import Navbar from '../components/Navbar';
import ShopHero from '../components/ShopHero';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import FooterLinks from '../components/FooterLinks';

// Sample product data
const products = [
  // Page 1
  { id: 1, name: 'The Self-Care Box', price: '59.99', image: '/products/self-care-box.jpg' },
  { id: 2, name: 'Luxe Candle', price: '24.99', image: '/products/luxe-candle.jpg' },
  { id: 3, name: 'The Birthday Box', price: '64.99', image: '/products/birthday-box.jpg' },
  { id: 4, name: 'Gourmet Chocolate Set', price: '32.00', image: '/products/chocolate-set.jpg' },
  { id: 5, name: 'The Wedding Box', price: '79.99', image: '/products/wedding-box.jpg' },
  { id: 6, name: 'Artisan Soap Bar', price: '12.50', image: '/products/soap-bar.jpg' },
  // Page 2
  { id: 7, name: 'The Spa Day Box', price: '69.99', image: '/products/spa-box.jpg' },
  { id: 8, name: 'Premium Tea Collection', price: '38.00', image: '/products/tea-collection.jpg' },
  { id: 9, name: 'The Coffee Lover Box', price: '54.99', image: '/products/coffee-box.jpg' },
  { id: 10, name: 'Organic Skincare Set', price: '45.00', image: '/products/skincare-set.jpg' },
  { id: 11, name: 'The New Mom Box', price: '73.00', image: '/products/new-mom-box.jpg' },
  { id: 12, name: 'Gourmet Snack Box', price: '41.50', image: '/products/snack-box.jpg' },
  // Page 3
  { id: 13, name: 'The Celebration Box', price: '85.00', image: '/products/celebration-box.jpg' },
  { id: 14, name: 'Luxury Bath Set', price: '52.99', image: '/products/bath-set.jpg' },
  { id: 15, name: 'The Thank You Box', price: '48.00', image: '/products/thank-you-box.jpg' },
  { id: 16, name: 'Artisan Cheese Board', price: '62.00', image: '/products/cheese-board.jpg' },
  { id: 17, name: 'The Wellness Box', price: '67.50', image: '/products/wellness-box.jpg' },
  { id: 18, name: 'Scented Candle Trio', price: '36.99', image: '/products/candle-trio.jpg' },
  // Page 4
  { id: 19, name: 'The Romance Box', price: '74.99', image: '/products/romance-box.jpg' },
  { id: 20, name: 'Gourmet Coffee Set', price: '44.00', image: '/products/coffee-set.jpg' },
  { id: 21, name: 'The Pamper Box', price: '68.50', image: '/products/pamper-box.jpg' },
  { id: 22, name: 'Handmade Chocolate Box', price: '39.99', image: '/products/handmade-chocolate.jpg' },
  { id: 23, name: 'The Zen Box', price: '71.00', image: '/products/zen-box.jpg' },
  { id: 24, name: 'Herbal Tea Collection', price: '29.99', image: '/products/herbal-tea.jpg' },
  // Page 5
  { id: 25, name: 'The Adventure Box', price: '82.00', image: '/products/adventure-box.jpg' },
  { id: 26, name: 'Luxury Skincare Box', price: '95.99', image: '/products/luxury-skincare.jpg' },
  { id: 27, name: 'The Cozy Night Box', price: '56.50', image: '/products/cozy-night.jpg' },
  { id: 28, name: 'Artisan Bakery Box', price: '47.00', image: '/products/bakery-box.jpg' },
  { id: 29, name: 'The Fitness Box', price: '63.99', image: '/products/fitness-box.jpg' },
  { id: 30, name: 'Organic Tea Gift Set', price: '33.50', image: '/products/organic-tea.jpg' },
  // Page 6
  { id: 31, name: 'The Luxury Box', price: '125.00', image: '/products/luxury-box.jpg' },
  { id: 32, name: 'Gourmet Wine Box', price: '89.99', image: '/products/wine-box.jpg' },
  { id: 33, name: 'The Comfort Box', price: '59.50', image: '/products/comfort-box.jpg' },
  { id: 34, name: 'Handcrafted Soap Set', price: '28.00', image: '/products/soap-set.jpg' },
  { id: 35, name: 'The Gardener Box', price: '65.00', image: '/products/gardener-box.jpg' },
  { id: 36, name: 'Artisan Honey Collection', price: '42.99', image: '/products/honey-collection.jpg' },
];

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  
  // Calculate which products to show
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="shop-page">
      <Navbar />
      <ShopHero />
      
      <div className="shop-container">
        <FilterSidebar />
        
        <div className="shop-content">
          <div className="products-grid">
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      
      <FooterLinks />
    </div>
  );
}
