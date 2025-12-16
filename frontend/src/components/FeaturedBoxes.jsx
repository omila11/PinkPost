import React, { useState, useEffect } from 'react';

export default function FeaturedBoxes() {
  const [mostLovedBoxes, setMostLovedBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMostLovedBoxes();
  }, []);

  const fetchMostLovedBoxes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/complete-boxes?isMostLoved=true&inStock=true');
      const data = await response.json();
      
      if (data.success && data.boxes) {
        // Transform the data to match the component's format
        const transformedBoxes = data.boxes.map(box => ({
          id: box._id,
          title: box.name,
          price: `$${parseFloat(box.price).toFixed(2)}`,
          image: box.image ? `/images/products/complete-boxes/${box.image}` : '/images/box1.jpeg',
          bgColor: '#f5dcc8',
          category: box.category,
          description: box.description
        }));
        setMostLovedBoxes(transformedBoxes);
      }
    } catch (error) {
      console.error('Error fetching most loved boxes:', error);
      // Fallback to default boxes if API fails
      setMostLovedBoxes([
        {
          id: 1,
          title: 'The Birthday Box',
          price: '$100.00',
          image: '/images/box1.jpeg',
          bgColor: '#d4d4d4'
        },
        {
          id: 2,
          title: 'The Spa Day Box',
          price: '$94.99',
          image: '/images/box2.jpeg',
          bgColor: '#f5dcc8'
        },
        {
          id: 3,
          title: 'The Coffee Lover Box',
          price: '$54.00',
          image: '/images/box3.jpeg',
          bgColor: '#1a4d3e'
        },
        {
          id: 4,
          title: 'The New Mom Box',
          price: '$73.00',
          image: '/images/box5.jpeg',
          bgColor: '#f5d4e0'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="loved-boxes-section">
        <h2>Our Most Loved Boxes</h2>
        <div className="loved-boxes-grid" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="loved-boxes-section">
      <h2>Our Most Loved Boxes</h2>
      <div className="loved-boxes-grid">
        {mostLovedBoxes.map((box) => (
          <div key={box.id} className="box-card">
            <div className="box-image" style={{ backgroundColor: box.bgColor }}>
              <img src={box.image} alt={box.title} />
            </div>
            <h3>{box.title}</h3>
            <p className="box-price">{box.price}</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}
