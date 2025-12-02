import React from 'react';

const paymentIcons = [
  { name: 'visa', icon: '💳' },
  { name: 'mastercard', icon: '💳' },
  { name: 'amex', icon: '💳' },
  { name: 'paypal', icon: '💳' }
];

export default function OrderSummary({ items, onProceedToCheckout }) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = 'Calculated at next step';
  const taxes = 'Calculated at next step';
  const total = subtotal;

  const handleProceedToCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout();
    } else {
      // Navigate to payment page
      window.location.href = '/payment';
    }
  };

  return (
    <div className="order-summary-card">
      <h3>Order Summary</h3>
      
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping}</span>
      </div>
      
      <div className="summary-row">
        <span>Taxes</span>
        <span>{taxes}</span>
      </div>
      
      <div className="summary-total">
        <strong>Total</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>
      
      <button className="checkout-proceed-btn" onClick={handleProceedToCheckout}>
        Proceed to Checkout
      </button>
      
      <button className="continue-shopping-btn" onClick={() => window.location.href = '/shop'}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Continue Shopping
      </button>
      
      <div className="secure-payment">
        <p>Secure payments by</p>
        <div className="payment-icons">
          {paymentIcons.map((payment, index) => (
            <span key={index} className="payment-icon">{payment.icon}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
