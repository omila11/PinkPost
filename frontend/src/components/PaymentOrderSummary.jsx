import React from 'react';

function PaymentOrderSummary({ items, subtotal, shipping, taxes, total }) {
  return (
    <div className="payment-order-summary">
      <h2>Order Summary</h2>
      
      <div className="payment-summary-items">
        {items.map((item, index) => (
          <div key={index} className="payment-summary-item">
            <div className="payment-summary-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="payment-summary-item-info">
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div className="payment-summary-item-price">
              ${item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="payment-summary-totals">
        <div className="payment-summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="payment-summary-row">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="payment-summary-row">
          <span>Taxes</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <div className="payment-summary-row payment-summary-total">
          <strong>Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}

export default PaymentOrderSummary;
