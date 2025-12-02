import React from 'react';

export default function CartSummary({ selectedBox, selectedGifts, onProceedToCheckout }) {
  const subtotal = (selectedBox?.price || 0) + 
    selectedGifts.reduce((sum, gift) => sum + (gift.price * gift.quantity), 0);
  
  const total = subtotal;

  return (
    <div className="cart-summary">
      <h3>Your Pink Post Box</h3>
      
      <div className="cart-items">
        {selectedBox && (
          <div className="cart-item">
            <img src={selectedBox.image} alt={selectedBox.name} />
            <div className="cart-item-info">
              <h4>{selectedBox.name}</h4>
              <p>{selectedBox.size}</p>
            </div>
            <p className="cart-item-price">${selectedBox.price.toFixed(2)}</p>
          </div>
        )}
        
        {selectedGifts.map(gift => (
          <div key={gift.id} className="cart-item">
            <img src={gift.image} alt={gift.name} />
            <div className="cart-item-info">
              <h4>{gift.name}</h4>
              <div className="item-quantity">
                <span className="quantity-badge">×{gift.quantity}</span>
              </div>
            </div>
            <p className="cart-item-price">${(gift.price * gift.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {selectedGifts.length === 0 && !selectedBox && (
        <p className="empty-cart">No items selected yet</p>
      )}

      <div className="cart-totals">
        <div className="cart-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-row total">
          <strong>Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>

      <button 
        className="proceed-btn"
        disabled={!selectedBox || selectedGifts.length === 0}
        onClick={() => window.location.href = '/checkout'}
      >
        Proceed to Checkout
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
