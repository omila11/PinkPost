import React, { useState } from 'react';
import '../styles/CreateBox.css';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import BoxSelector from '../components/BoxSelector';
import GiftSelector from '../components/GiftSelector';
import CartSummary from '../components/CartSummary';
import FooterLinks from '../components/FooterLinks';

export default function CreateBox() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [showCartSummary, setShowCartSummary] = useState(false);

  const handleSelectBox = (box) => {
    setSelectedBox(box);
    setCurrentStep(2);
  };

  const handleAddGift = (gift) => {
    const existingGift = selectedGifts.find(g => g.id === gift.id);
    if (existingGift) {
      setSelectedGifts(selectedGifts.map(g => 
        g.id === gift.id ? { ...g, quantity: g.quantity + 1 } : g
      ));
    } else {
      setSelectedGifts([...selectedGifts, { ...gift, quantity: 1 }]);
    }
  };

  const handleRemoveGift = (gift) => {
    const existingGift = selectedGifts.find(g => g.id === gift.id);
    if (existingGift && existingGift.quantity > 1) {
      setSelectedGifts(selectedGifts.map(g => 
        g.id === gift.id ? { ...g, quantity: g.quantity - 1 } : g
      ));
    } else {
      setSelectedGifts(selectedGifts.filter(g => g.id !== gift.id));
    }
  };

  const handleProceedToCheckout = () => {
    alert('Proceeding to checkout...');
  };

  const calculateTotal = () => {
    const subtotal = (selectedBox?.price || 0) + 
      selectedGifts.reduce((sum, gift) => sum + (gift.price * gift.quantity), 0);
    return subtotal.toFixed(2);
  };

  return (
    <div className="create-box-page">
      <Navbar />
      
      <div className="create-box-container">
        <ProgressBar currentStep={currentStep} totalSteps={3} />
        
        <div className="create-box-content">
          <div className="builder-section">
            {currentStep === 1 && (
              <BoxSelector 
                selectedBox={selectedBox}
                onSelectBox={handleSelectBox}
              />
            )}
            
            {currentStep >= 2 && (
              <GiftSelector 
                selectedGifts={selectedGifts}
                onAddGift={handleAddGift}
                onRemoveGift={handleRemoveGift}
              />
            )}
          </div>
        </div>
      </div>

      {/* Fixed Total Button */}
      <button 
        className="fixed-total-btn"
        onClick={() => setShowCartSummary(!showCartSummary)}
      >
        <span className="total-label">Total</span>
        <span className="total-amount">${calculateTotal()}</span>
      </button>

      {/* Mobile Cart Summary Overlay */}
      {showCartSummary && (
        <>
          <div className="cart-overlay" onClick={() => setShowCartSummary(false)}></div>
          <div className="mobile-cart-summary">
            <div className="mobile-cart-header">
              <h3>Your Pink Post Box</h3>
              <button className="close-btn" onClick={() => setShowCartSummary(false)}>×</button>
            </div>
            <CartSummary 
              selectedBox={selectedBox}
              selectedGifts={selectedGifts}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </>
      )}
      
      <FooterLinks />
    </div>
  );
}
