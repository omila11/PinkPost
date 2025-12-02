import React, { useState } from 'react';

export default function CheckoutItem({ item, onUpdateQuantity, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onUpdateQuantity(item.id, newQty);
    }
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onUpdateQuantity(item.id, newQty);
  };

  return (
    <div className="checkout-item">
      <div className="checkout-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="checkout-item-info">
        <h4>{item.name}</h4>
        <p>{item.description || item.category}</p>
        <p className="checkout-item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="checkout-item-controls">
        <div className="quantity-control">
          <button onClick={handleDecrease}>−</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <button className="remove-item-btn" onClick={() => onRemove(item.id)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path d="M14 4h-3V3c0-.6-.4-1-1-1H8c-.6 0-1 .4-1 1v1H4c-.6 0-1 .4-1 1s.4 1 1 1v9c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c.6 0 1-.4 1-1s-.4-1-1-1zM8 3h2v1H8V3zm4 12H6V6h6v9z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
