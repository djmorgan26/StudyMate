// ExplanationPopup.jsx - Medical term explanation popup component
// Follows design standards: 200ms response time, WCAG accessibility, medical color palette

import { useState, useEffect, useRef } from 'react';
import { X, Volume2, BookOpen, Users, ChevronDown, ChevronUp } from 'lucide-react';

const ExplanationPopup = ({ 
  term, 
  explanation, 
  position, 
  onClose, 
  isVisible 
}) => {
  const [difficulty, setDifficulty] = useState('simple');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const popupRef = useRef(null);
  const firstFocusableRef = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    if (isVisible && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isVisible]);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isVisible, onClose]);

  // Speech synthesis for pronunciation
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(term);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyDisplay = () => {
    const levels = {
      simple: { icon: Users, label: 'Student', color: 'text-medical-blue' },
      detailed: { icon: BookOpen, label: 'Resident', color: 'text-medical-navy' },
      expert: { icon: Users, label: 'Attending', color: 'text-medical-dark-gray' }
    };
    return levels[difficulty] || levels.simple;
  };

  const getCurrentExplanation = () => {
    if (typeof explanation === 'string') return explanation;
    return explanation?.[difficulty] || explanation?.simple || 'No explanation available';
  };

  const difficultyLevel = getDifficultyDisplay();
  const DifficultyIcon = difficultyLevel.icon;

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop for mobile - slightly transparent */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Main popup */}
      <div
        ref={popupRef}
        className="fixed z-50 bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-900/5 max-w-sm w-full mx-4 md:mx-0 md:max-w-xs"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          // Mobile: center on screen
          ...(window.innerWidth < 768 && {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '80vh',
            overflow: 'auto'
          })
        }}
        role="dialog"
        aria-labelledby="popup-title"
        aria-describedby="popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <h3 
              id="popup-title"
              className="font-medium text-gray-900 text-base truncate">
            >
              {term}
            </h3>
            <button
              onClick={handleSpeak}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              aria-label={isSpeaking ? 'Stop pronunciation' : 'Pronounce term'}
              disabled={!('speechSynthesis' in window)}
            >
              <Volume2 
                size={14} 
                className={`${isSpeaking ? 'text-blue-600' : 'text-gray-500'} transition-colors`}
              />
            </button>
          </div>
          
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
            aria-label="Close explanation"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Difficulty selector */}
        <div className="px-6 pt-4 pb-3">
          <div className="flex items-center space-x-1">
            <DifficultyIcon size={12} className={difficultyLevel.color} />
            <span className="text-xs font-medium text-gray-600">
              {difficultyLevel.label} Level
            </span>
          </div>
          
          <div className="flex mt-3 bg-gray-50 rounded-xl p-1">
            {['simple', 'detailed', 'expert'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none ${
                  difficulty === level
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-pressed={difficulty === level}
              >
                {level === 'simple' ? 'Basic' : level === 'detailed' ? 'Detailed' : 'Expert'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div 
            id="popup-content"
            className="text-sm text-gray-600 leading-relaxed">
          >
            {getCurrentExplanation()}
          </div>

          {/* Related terms (if available) */}
          {explanation?.related && explanation.related.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center w-full text-left text-xs font-medium text-blue-600 hover:text-blue-700 focus:outline-none rounded-lg transition-colors">
                aria-expanded={isExpanded}
                aria-controls="related-terms"
              >
                Related Terms
                {isExpanded ? (
                  <ChevronUp size={12} className="ml-1" />
                ) : (
                  <ChevronDown size={12} className="ml-1" />
                )}
              </button>
              
              {isExpanded && (
                <div id="related-terms" className="mt-2 space-y-1">
                  {explanation.related.map((relatedTerm, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs mr-1 mb-1 font-medium"
                    >
                      {relatedTerm}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Category badge */}
          {explanation?.category && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="inline-block bg-gray-50 text-gray-500 px-3 py-1.5 rounded-xl text-xs font-medium">
                {explanation.category}
              </span>
            </div>
          )}
        </div>

        {/* Mobile-specific close button */}
        <div className="md:hidden border-t border-gray-100 p-6">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-full font-medium text-sm hover:bg-blue-700 focus:outline-none transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ExplanationPopup;