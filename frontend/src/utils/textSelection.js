// Text selection detection utilities for Smart Word Lookup
// Handles both mouse and touch interactions per design standards

/**
 * Debounce utility to prevent excessive API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Gets the selected text and its position information
 * @returns {Object|null} Selection data or null if no valid selection
 */
export const getSelectionData = () => {
  const selection = window.getSelection();
  
  if (!selection || selection.rangeCount === 0) {
    return null;
  }
  
  const range = selection.getRangeAt(0);
  const selectedText = selection.toString().trim();
  
  // Only process single word selections (medical terms are typically 1-3 words)
  if (!selectedText || selectedText.split(/\s+/).length > 3) {
    return null;
  }
  
  // Get bounding rectangle for popup positioning
  const rect = range.getBoundingClientRect();
  
  return {
    text: selectedText,
    rect: {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
      width: rect.width,
      height: rect.height
    },
    range,
    selection
  };
};

/**
 * Clears the current text selection
 */
export const clearSelection = () => {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }
};

/**
 * Checks if a click is outside the specified element
 * @param {Event} event - Click event
 * @param {HTMLElement} element - Element to check against
 * @returns {boolean} True if click is outside
 */
export const isClickOutside = (event, element) => {
  return element && !element.contains(event.target);
};

/**
 * Gets the optimal popup position to stay within viewport
 * @param {DOMRect} selectionRect - Selected text bounding rectangle
 * @param {number} popupWidth - Popup width in pixels
 * @param {number} popupHeight - Popup height in pixels
 * @returns {Object} Position coordinates
 */
export const getOptimalPopupPosition = (selectionRect, popupWidth = 320, popupHeight = 200) => {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY
  };
  
  // Default position: centered above selection with 8px gap
  let top = selectionRect.top + viewport.scrollY - popupHeight - 8;
  let left = selectionRect.left + viewport.scrollX + (selectionRect.width / 2) - (popupWidth / 2);
  
  // Adjust for viewport boundaries
  
  // If popup would be off the left edge
  if (left < viewport.scrollX + 16) {
    left = viewport.scrollX + 16;
  }
  
  // If popup would be off the right edge
  if (left + popupWidth > viewport.scrollX + viewport.width - 16) {
    left = viewport.scrollX + viewport.width - popupWidth - 16;
  }
  
  // If popup would be above viewport, show below selection instead
  if (top < viewport.scrollY + 16) {
    top = selectionRect.bottom + viewport.scrollY + 8;
  }
  
  // If popup would be below viewport when showing below, keep it above
  if (top + popupHeight > viewport.scrollY + viewport.height - 16) {
    top = selectionRect.top + viewport.scrollY - popupHeight - 8;
    // If still doesn't fit, position at top of viewport
    if (top < viewport.scrollY + 16) {
      top = viewport.scrollY + 16;
    }
  }
  
  return { top, left };
};

/**
 * Sanitizes text to prevent XSS and normalize for lookup
 * @param {string} text - Selected text
 * @returns {string} Sanitized text
 */
export const sanitizeSelectedText = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  return text
    .trim()
    .replace(/[<>&"']/g, '') // Remove potential HTML/XSS characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .toLowerCase();
};

/**
 * Checks if the selected text is likely a medical term worth looking up
 * @param {string} text - Selected text
 * @returns {boolean} True if text seems like a medical term
 */
export const isMedicalTerm = (text) => {
  if (!text || text.length < 3) {
    return false;
  }
  
  // Simple heuristics for medical terms
  const medicalPatterns = [
    /ology$/i,       // cardiology, neurology
    /itis$/i,        // arthritis, hepatitis
    /osis$/i,        // fibrosis, cirrhosis
    /pathy$/i,       // neuropathy, myopathy
    /emia$/i,        // anemia, hyperemia
    /uria$/i,        // hematuria, proteinuria
    /gram$/i,        // electrocardiogram, mammogram
    /scopy$/i,       // endoscopy, colonoscopy
    /cardia/i,       // bradycardia, tachycardia
    /cardio/i,       // cardiovascular
    /neuro/i,        // neurological terms
    /gastro/i,       // gastrointestinal terms
    /pulmon/i,       // pulmonary terms
    /renal/i,        // renal terms
    /hepat/i,        // hepatic terms
    /dermat/i,       // dermatological terms
  ];
  
  return medicalPatterns.some(pattern => pattern.test(text));
};