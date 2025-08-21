# StudyMate Design Guide - Google Gemini Inspired

## Overview
This design guide establishes StudyMate's visual language, heavily inspired by Google Gemini's clean, modern, and AI-focused interface design. The goal is to create an intuitive, professional, and accessible learning platform that feels cutting-edge yet approachable.

## Design Philosophy

### Core Principles
- **Minimalist Clarity**: Clean, uncluttered interfaces that prioritize content and functionality
- **Intelligent Interactions**: AI-driven features feel seamless and helpful, not overwhelming
- **Adaptive Responsiveness**: Interfaces that work beautifully across all device sizes
- **Professional Accessibility**: Medical-grade reliability with student-friendly approachability

## Visual Identity

### Color Palette

#### Primary Colors (Gemini-Inspired)
```css
/* Primary Blues - Clean, trustworthy, professional */
--gemini-primary: #1a73e8;        /* Primary blue - main brand color */
--gemini-primary-dark: #1557b0;   /* Dark blue - hover states, emphasis */
--gemini-primary-light: #4285f4;  /* Light blue - accents, highlights */

/* Neutral Grays - Clean, modern */
--gemini-surface: #ffffff;        /* Pure white backgrounds */
--gemini-surface-variant: #f8f9fa; /* Subtle gray backgrounds */
--gemini-outline: #dadce0;        /* Borders, dividers */
--gemini-on-surface: #202124;     /* Primary text color */
--gemini-on-surface-variant: #5f6368; /* Secondary text color */

/* Semantic Colors */
--gemini-success: #34a853;        /* Success states, confirmations */
--gemini-warning: #fbbc04;        /* Warnings, attention */
--gemini-error: #ea4335;          /* Errors, destructive actions */
```

#### Medical Context Colors (Retained)
```css
/* Medical Professional Colors - Keep for domain relevance */
--medical-blue: #2563eb;
--medical-navy: #1e3a8a;
--medical-light-blue: #dbeafe;
--medical-card: #ffffff;
--medical-background: #f8fafc;
```

### Typography

#### Font Stack (Google Fonts - Gemini Style)
```css
/* Primary Font - Google Sans inspired clean sans-serif */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Monospace - For code, technical terms */
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
```

#### Font Sizes & Hierarchy
```css
/* Gemini-style typography scale */
--text-xs: 0.75rem;     /* 12px - Fine print, labels */
--text-sm: 0.875rem;    /* 14px - Body text, descriptions */
--text-base: 1rem;      /* 16px - Primary reading text */
--text-lg: 1.125rem;    /* 18px - Emphasized text */
--text-xl: 1.25rem;     /* 20px - Small headings */
--text-2xl: 1.5rem;     /* 24px - Section headings */
--text-3xl: 1.875rem;   /* 30px - Page headings */
--text-4xl: 2.25rem;    /* 36px - Hero headings */
```

## Layout & Spacing

### Grid System (Gemini-Inspired)
- **8px base unit**: All spacing should be multiples of 8px
- **Container max-width**: 1200px for content areas
- **Responsive breakpoints**:
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+

### Spacing Scale
```css
/* Gemini-style spacing system */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
```

## Component Design Language

### Cards & Containers
```css
.gemini-card {
  background: var(--gemini-surface);
  border: 1px solid var(--gemini-outline);
  border-radius: 12px;
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.gemini-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
```

### Buttons (Gemini Style)
```css
/* Primary Button */
.gemini-button-primary {
  background: var(--gemini-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: var(--space-3) var(--space-6);
  font-weight: 500;
  font-size: var(--text-sm);
  transition: all 0.2s ease;
  cursor: pointer;
}

.gemini-button-primary:hover {
  background: var(--gemini-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(26, 115, 232, 0.3);
}

/* Secondary Button */
.gemini-button-secondary {
  background: transparent;
  color: var(--gemini-primary);
  border: 1px solid var(--gemini-outline);
  border-radius: 8px;
  padding: var(--space-3) var(--space-6);
  font-weight: 500;
  transition: all 0.2s ease;
}

.gemini-button-secondary:hover {
  background: var(--gemini-surface-variant);
  border-color: var(--gemini-primary);
}
```

### Input Fields
```css
.gemini-input {
  background: var(--gemini-surface);
  border: 1px solid var(--gemini-outline);
  border-radius: 8px;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.gemini-input:focus {
  outline: none;
  border-color: var(--gemini-primary);
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}
```

## AI-Specific Design Patterns

### Smart Lookup Popup (Enhanced)
```css
.smart-lookup-popup {
  background: var(--gemini-surface);
  border: 1px solid var(--gemini-outline);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: var(--space-4);
  max-width: 360px;
  backdrop-filter: blur(8px);
  animation: gemini-popup-appear 0.2s ease-out;
}

@keyframes gemini-popup-appear {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### Loading States (Gemini-Inspired)
```css
.gemini-loading {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--gemini-primary);
  font-size: var(--text-sm);
  font-weight: 500;
}

.gemini-loading::before {
  content: '';
  width: 16px;
  height: 16px;
  border: 2px solid var(--gemini-outline);
  border-top-color: var(--gemini-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Clear, high-contrast focus rings on all interactive elements
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML

### Focus Management
```css
.gemini-focus {
  outline: 2px solid var(--gemini-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

## Animation & Transitions

### Micro-Interactions (Gemini Style)
```css
/* Smooth, purposeful animations */
.gemini-transition {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.gemini-bounce {
  animation: gemini-bounce 0.6s ease-out;
}

@keyframes gemini-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
```

## Implementation Guidelines

### CSS Custom Properties
All design tokens should be defined as CSS custom properties for easy theming and consistency.

### Component Modularity
- Each component should be self-contained with its own styles
- Use BEM methodology for CSS class naming
- Prefer composition over inheritance

### Responsive Design
- Mobile-first approach
- Use CSS Grid and Flexbox for layouts
- Ensure touch targets are minimum 44px on mobile

## Future Considerations

### Dark Mode Support
```css
@media (prefers-color-scheme: dark) {
  :root {
    --gemini-surface: #1f1f1f;
    --gemini-on-surface: #e8eaed;
    --gemini-outline: #5f6368;
    /* Additional dark mode tokens */
  }
}
```

### AI-Enhanced Theming
- Dynamic color adaptation based on content
- Personalized UI preferences
- Context-aware design adjustments

---

*This design guide should be updated as we implement new features and gather user feedback. The goal is to maintain consistency while evolving with user needs and design trends.*