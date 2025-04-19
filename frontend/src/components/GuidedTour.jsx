import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const GuidedTour = ({ steps, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if tour was completed before
    const tourCompleted = localStorage.getItem('kaspaPortalTourCompleted');
    if (tourCompleted === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('kaspaPortalTourCompleted', 'true');
    if (onComplete) {
      onComplete();
    }
  };

  const currentStep = steps?.[currentStepIndex];

  // Basic positioning logic (can be enhanced)
  const getPositionStyle = (targetElement) => {
    if (!targetElement) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    
    const rect = targetElement.getBoundingClientRect();
    // Position tooltip below the target element by default
    return {
      top: `${rect.bottom + 10}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translateX(-50%)',
      maxWidth: '300px', // Limit width
    };
  };

  const targetElement = currentStep.target ? document.querySelector(currentStep.target) : null;
  const style = getPositionStyle(targetElement);

  // Highlight target element (basic implementation)
  useEffect(() => {
    if (targetElement) {
      targetElement.style.transition = 'box-shadow 0.3s ease-in-out';
      targetElement.style.boxShadow = '0 0 0 4px rgba(52, 211, 153, 0.7)'; // Green glow
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Cleanup highlight on step change or unmount
    return () => {
      if (targetElement) {
        targetElement.style.boxShadow = '';
      }
    };
  }, [targetElement]);

  return isVisible && steps && steps.length > 0 && currentStepIndex < steps.length ? (
    <div 
      className="absolute bg-green-800 text-white p-4 rounded-lg shadow-xl z-[1000]"
      style={style}
    >
      <button 
        onClick={handleSkip} 
        className="absolute top-2 right-2 text-green-300 hover:text-white"
        aria-label="Skip Tour"
      >
        <X size={18} />
      </button>
      <h3 className="text-lg font-semibold mb-2 text-green-200">{currentStep.title}</h3>
      <div className="text-sm mb-4">{currentStep.content}</div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-green-300">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
        <button 
          onClick={handleNext} 
          className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  ) : null;
};

export default GuidedTour;
