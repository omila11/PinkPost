import React from 'react';

const lovedBoxes = [
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
];

export default function FeaturedBoxes() {
  return (
    <section className="loved-boxes-section">
      <h2>Our Most Loved Boxes</h2>
      <div className="loved-boxes-grid">
        {lovedBoxes.map((box) => (
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
