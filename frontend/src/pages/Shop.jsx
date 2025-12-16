import React, { useState, useEffect } from 'react';
import '../styles/Shop.css';
import Navbar from '../components/Navbar';
import ShopHero from '../components/ShopHero';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import FooterLinks from '../components/FooterLinks';

export default function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const [completeBoxes, setCompleteBoxes] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const itemsPerPage = 6;

  useEffect(() => {
    fetchCompleteBoxes();
  }, []);

  useEffect(() => {
    filterBoxes();
  }, [selectedCategory, completeBoxes]);

  const fetchCompleteBoxes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/complete-boxes?inStock=true');
      const data = await response.json();
      
      if (data.success && data.boxes) {
        const transformedBoxes = data.boxes.map(box => ({
          id: box._id,
          name: box.name,
          price: parseFloat(box.price).toFixed(2),
          image: box.image || '/images/box1.jpeg',
          category: box.category,
          description: box.description,
          isFeatured: box.isFeatured
        }));
        
        // Sort featured boxes first
        transformedBoxes.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
        
        setCompleteBoxes(transformedBoxes);
        setFilteredBoxes(transformedBoxes);
      }
    } catch (error) {
      console.error('Error fetching complete boxes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBoxes = () => {
    if (selectedCategory === 'All') {
      setFilteredBoxes(completeBoxes);
    } else {
      setFilteredBoxes(completeBoxes.filter(box => box.category === selectedCategory));
    }
    setCurrentPage(1); // Reset to first page when filtering
  };

  const totalPages = Math.ceil(filteredBoxes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredBoxes.slice(startIndex, endIndex);

  return (
    <div className="shop-page">
      <Navbar />
      <ShopHero />
      
      <div className="shop-container">
        <FilterSidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="shop-content">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
              <p>Loading gift boxes...</p>
            </div>
          ) : currentProducts.length > 0 ? (
            <>
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
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
              <p>No gift boxes found for this category.</p>
            </div>
          )}
        </div>
      </div>
      
      <FooterLinks />
    </div>
  );
}
