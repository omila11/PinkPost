import React, { useState } from 'react';
import '../styles/Payment.css';
import Navbar from '../components/Navbar';
import PaymentOrderSummary from '../components/PaymentOrderSummary';

function Payment() {
  // Sample order items - in real app, would come from cart state
  const [orderItems] = useState([
    {
      name: 'The Signature Pink Box',
      quantity: 1,
      price: 89.00,
      image: '/images/box-signature.jpg'
    },
    {
      name: 'Rose Petal Candle',
      quantity: 1,
      price: 15.00,
      image: '/images/candle-rose.jpg'
    }
  ]);

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const taxes = subtotal * 0.08;
  const total = subtotal + shipping + taxes;

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    billingAddressSame: true,
    cardNumber: '',
    expirationDate: '',
    cvc: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order placement
    console.log('Order submitted:', formData);
    alert('Order placed successfully!');
  };

  const handleReturnToCart = () => {
    window.location.href = '/checkout';
  };

  return (
    <div className="payment-page">
      <Navbar />
      
      <div className="payment-container">
        <div className="payment-breadcrumb">
          <span>Cart</span>
          <span className="breadcrumb-separator">/</span>
          <span>Checkout</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">Payment</span>
        </div>

        <div className="payment-content">
          <div className="payment-form-section">
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit}>
              {/* Shipping Details */}
              <div className="payment-section">
                <h2>Shipping Details</h2>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Blossom Lane"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Roseville"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State / Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="CA"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP / Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="90210"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="payment-section">
                <h2>Payment Information</h2>

                <div className="billing-checkbox">
                  <input
                    type="checkbox"
                    id="billingAddressSame"
                    name="billingAddressSame"
                    checked={formData.billingAddressSame}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="billingAddressSame">
                    Billing address is the same as shipping.
                  </label>
                </div>

                <div className="payment-method">
                  <div className="payment-method-header">
                    <input
                      type="radio"
                      id="creditCard"
                      name="paymentMethod"
                      defaultChecked
                    />
                    <label htmlFor="creditCard">Credit Card</label>
                    <div className="payment-icons">
                      <span className="payment-icon">Visa</span>
                      <span className="payment-icon">MC</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="**** **** **** 1234"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expirationDate">Expiration Date</label>
                      <input
                        type="text"
                        id="expirationDate"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvc">CVC</label>
                      <input
                        type="text"
                        id="cvc"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="payment-actions">
                <button
                  type="button"
                  className="return-to-cart-btn"
                  onClick={handleReturnToCart}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Return to Cart
                </button>
                <button type="submit" className="place-order-btn">
                  Place Order
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="payment-sidebar">
            <PaymentOrderSummary
              items={orderItems}
              subtotal={subtotal}
              shipping={shipping}
              taxes={taxes}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
