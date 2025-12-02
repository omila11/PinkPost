import React, { useState } from 'react';
import '../styles/Checkout.css';
import Navbar from '../components/Navbar';
import CheckoutItem from '../components/CheckoutItem';
import OrderSummary from '../components/OrderSummary';
import FooterLinks from '../components/FooterLinks';

// Sample cart items for demo
const initialCartItems = [
  {
    id: 1,
    name: 'Scented Soy Candle',
    description: 'Lavender & Chamomile',
    price: 18.00,
    quantity: 1,
    image: '/products/candle.jpg'
  },
  {
    id: 2,
    name: 'Artisan Chocolate Bar',
    description: 'Dark Chocolate with Rose Petals',
    price: 12.00,
    quantity: 2,
    image: '/products/chocolate.jpg'
  },
  {
    id: 3,
    name: 'Silk Eye Mask',
    description: 'Blush Pink',
    price: 25.00,
    quantity: 1,
    image: '/products/eye-mask.jpg'
  }
];

export default function Checkout() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleProceedToCheckout = () => {
    alert('Proceeding to payment...');
  };

  return (
    <div className="checkout-page">
      <Navbar />
      
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Your Pink Post Gift Box</h1>
          <p>Review your items and proceed to checkout.</p>
        </div>
        
        <div className="checkout-content">
          <div className="checkout-items-section">
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <CheckoutItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))
            ) : (
              <div className="empty-checkout">
                <p>Your cart is empty</p>
                <a href="/shop" className="shop-link">Continue Shopping</a>
              </div>
            )}
          </div>
          
          <OrderSummary 
            items={cartItems}
            onProceedToCheckout={handleProceedToCheckout}
          />
        </div>
      </div>
      
      <FooterLinks />
    </div>
  );
}
