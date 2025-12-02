import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-text">Step {currentStep} of {totalSteps}: {currentStep === 1 ? 'Choose Your Box' : currentStep === 2 ? 'Fill It with Gifts' : 'Review & Checkout'}</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
