// SmartWordLookup.jsx - Main component for medical term lookup functionality
// Handles text selection, popup positioning, and integrates with medical terminology database

import { useState, useEffect, useRef, useCallback } from 'react';
import ExplanationPopup from './ExplanationPopup.jsx';
import { 
  getSelectionData, 
  clearSelection, 
  isClickOutside, 
  getOptimalPopupPosition,
  sanitizeSelectedText,
  isMedicalTerm,
  debounce
} from '../utils/textSelection.js';
import { getMockExplanation } from '../mock-data/medical-terms.js';

const SmartWordLookup = ({ children, className = '', disabled = false }) => {
  const [popup, setPopup] = useState({
    isVisible: false,
    term: '',
    explanation: null,
    position: { top: 0, left: 0 }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const selectionTimeoutRef = useRef(null);

  // Close popup and clear selection
  const closePopup = useCallback(() => {
    setPopup(prev => ({ ...prev, isVisible: false }));
    setIsLoading(false);
    clearSelection();
  }, []);

  // Debounced lookup function to meet 200ms response requirement
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedLookup = useCallback(
    debounce(async (term, selectionRect) => {
      if (!term || disabled) return;
      
      setIsLoading(true);
      
      try {
        // Simulate API delay - in real app this would be an actual API call
        await new Promise(resolve => setTimeout(resolve, 50));
        
        const explanation = getMockExplanation(term);
        const position = getOptimalPopupPosition(selectionRect);
        
        setPopup({
          isVisible: true,
          term,
          explanation,
          position
        });
      } catch (error) {
        console.error('Error fetching explanation:', error);
        // Show basic explanation on error
        setPopup({
          isVisible: true,
          term,
          explanation: {
            simple: `${term} is a medical term. Explanation temporarily unavailable.`,
            category: 'general'
          },
          position: getOptimalPopupPosition(selectionRect)
        });
      } finally {
        setIsLoading(false);
      }
    }, 200),
    [disabled, closePopup]
  );

  // Handle text selection (mouse and touch)
  const handleSelection = useCallback(() => {
    if (disabled) return;
    
    // Clear existing timeout
    if (selectionTimeoutRef.current) {
      clearTimeout(selectionTimeoutRef.current);
    }
    
    // Small delay to ensure selection is complete
    selectionTimeoutRef.current = setTimeout(() => {
      const selectionData = getSelectionData();
      
      if (!selectionData) {
        closePopup();
        return;
      }
      
      const sanitizedText = sanitizeSelectedText(selectionData.text);
      
      // Only show popup for terms that look medical or are in our database
      if (sanitizedText && (isMedicalTerm(sanitizedText) || getMockExplanation(sanitizedText))) {
        debouncedLookup(sanitizedText, selectionData.rect);
      } else {
        closePopup();
      }
    }, 100);
  }, [disabled, debouncedLookup, closePopup]);

  // Handle clicks outside popup
  const handleClickOutside = useCallback((event) => {
    const popupElement = document.querySelector('[role="dialog"]');
    if (popup.isVisible && isClickOutside(event, popupElement)) {
      closePopup();
    }
  }, [popup.isVisible, closePopup]);

  // Setup event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    // Mouse events
    const handleMouseUp = () => {
      // Small delay to ensure selection is registered
      setTimeout(handleSelection, 10);
    };

    // Touch events for mobile
    const handleTouchEnd = (event) => {
      // Prevent showing popup on scroll gestures
      if (event.touches && event.touches.length > 0) return;
      
      setTimeout(handleSelection, 10);
    };

    // Double-click for quick selection
    const handleDoubleClick = () => {
      setTimeout(handleSelection, 10);
    };

    // Keyboard selection support
    const handleKeyUp = (event) => {
      // Handle Shift+Arrow selections
      if (event.shiftKey && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        setTimeout(handleSelection, 10);
      }
    };

    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('dblclick', handleDoubleClick);
    container.addEventListener('keyup', handleKeyUp);

    return () => {
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('dblclick', handleDoubleClick);
      container.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleSelection, disabled]);

  // Handle clicks outside to close popup
  useEffect(() => {
    if (popup.isVisible) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [popup.isVisible, handleClickOutside]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (selectionTimeoutRef.current) {
        clearTimeout(selectionTimeoutRef.current);
      }
    };
  }, []);

  // Handle window resize to reposition popup
  useEffect(() => {
    if (!popup.isVisible) return;

    const handleResize = () => {
      const selectionData = getSelectionData();
      if (selectionData) {
        const newPosition = getOptimalPopupPosition(selectionData.rect);
        setPopup(prev => ({ ...prev, position: newPosition }));
      } else {
        closePopup();
      }
    };

    const debouncedResize = debounce(handleResize, 150);
    window.addEventListener('resize', debouncedResize);
    
    return () => window.removeEventListener('resize', debouncedResize);
  }, [popup.isVisible, closePopup]);

  return (
    <div 
      ref={containerRef}
      className={`smart-word-lookup ${className}`}
      style={{ 
        // Enable text selection
        userSelect: disabled ? 'none' : 'text',
        WebkitUserSelect: disabled ? 'none' : 'text',
        MozUserSelect: disabled ? 'none' : 'text',
        msUserSelect: disabled ? 'none' : 'text'
      }}
      role="region"
      aria-label="Medical text with smart lookup"
    >
      {children}
      
      {/* Loading indicator for quick feedback */}
      {isLoading && (
        <div className="fixed z-40 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg gemini-loading">
          Looking up...
        </div>
      )}
      
      {/* Explanation popup */}
      <ExplanationPopup
        term={popup.term}
        explanation={popup.explanation}
        position={popup.position}
        onClose={closePopup}
        isVisible={popup.isVisible}
      />
    </div>
  );
};

export default SmartWordLookup;