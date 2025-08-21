# Claude Code Development Guide for StudyMate

## Project Overview
StudyMate is an AI-powered spaced repetition study platform for medical and law students, featuring intelligent word lookup and educational content delivery.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: FastAPI + MongoDB Atlas (Phase 2)
- **AI**: Ollama (local) + Gemini/Claude (cloud)
- **Testing**: Playwright for visual validation

## Design Philosophy & UI Preferences

### 🎨 Design Language: Google Gemini Inspired
**IMPORTANT**: This project follows Google Gemini's clean, modern, AI-focused design language. Always reference the `DESIGN_GUIDE.md` for detailed specifications.

#### Key Design Principles:
1. **Minimalist Clarity** - Clean, uncluttered interfaces
2. **Intelligent Interactions** - AI features feel seamless, not overwhelming
3. **Adaptive Responsiveness** - Beautiful across all device sizes
4. **Professional Accessibility** - Medical-grade reliability with student-friendly approach

#### Visual Identity:
- **Primary Colors**: Gemini blue palette (#1a73e8, #1557b0, #4285f4)
- **Typography**: Inter font family with Google Sans-inspired hierarchy
- **Components**: Rounded corners (12px), subtle shadows, smooth transitions
- **Spacing**: 8px base unit system
- **Cards**: Clean white backgrounds with subtle borders and hover effects

### 🎯 UI Component Patterns
When creating or modifying UI components, always apply:

```css
/* Example Gemini-inspired button */
.gemini-button-primary {
  background: #1a73e8;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.gemini-button-primary:hover {
  background: #1557b0;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(26, 115, 232, 0.3);
}
```

## Development Guidelines

### 🧩 Component Architecture
- Use functional components with hooks
- Follow composition over inheritance
- Implement proper accessibility (WCAG 2.1 AA)
- Ensure mobile-first responsive design

### 🎨 Styling Approach
- Use Tailwind CSS as the primary styling framework
- Reference design tokens from `DESIGN_GUIDE.md`
- Apply Gemini-inspired aesthetics to all new components
- Maintain consistency with existing medical color scheme where appropriate

### ⚡ Performance Standards
- 200ms response time for smart lookup features
- Smooth animations (0.2s cubic-bezier transitions)
- Optimized bundle sizes
- Accessibility-first development

### 🔧 Development Commands
```bash
# Development server
npm run dev

# Build
npm run build

# Test (when available)
npm run test

# Lint (when available)
npm run lint
```

### 📁 Project Structure
```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── SmartWordLookup.jsx
│   │   └── ExplanationPopup.jsx
│   ├── utils/            # Utility functions
│   ├── mock-data/        # Development data
│   └── App.jsx           # Main application
├── tests/                # Playwright tests
└── public/               # Static assets
```

## AI & Smart Features

### 🧠 Smart Word Lookup System
- Debounced lookup with 200ms response time
- Medical terminology recognition
- Three difficulty levels: Student, Resident, Attending
- Accessible popup design with keyboard navigation
- Speech synthesis for pronunciation

### 🎯 Implementation Priorities
1. **User Experience**: Smooth, intuitive interactions
2. **Accessibility**: WCAG compliance, screen reader support
3. **Performance**: Fast response times, optimized loading
4. **Design Consistency**: Gemini-inspired aesthetics throughout

## Future Development

### 🚀 Planned Features
- Backend integration with FastAPI
- MongoDB Atlas database
- User authentication and profiles
- Spaced repetition algorithms
- Progress tracking and analytics

### 🎨 Design Evolution
- Dark mode support (following Gemini patterns)
- AI-enhanced theming
- Personalized UI preferences
- Context-aware design adjustments

## Code Quality Standards

### 🔍 Before Committing
1. Ensure all components follow Gemini design language
2. Test accessibility features (keyboard navigation, screen readers)
3. Verify responsive design on mobile/tablet/desktop
4. Check performance (especially lookup response times)
5. Validate against design guide specifications

### 📝 Documentation Requirements
- Comment complex logic, especially AI integration points
- Update this CLAUDE.md when adding new patterns
- Maintain design guide documentation
- Document any deviations from Gemini design patterns

---

**Remember**: This project aims to capture the clean, modern, intelligent feel of Google Gemini while serving the specific needs of medical and law students. Every UI decision should feel both cutting-edge and trustworthy.