# Frontend Agent - React Excellence Specialist

## Mission: Frontend-First Development
Build visually perfect, engaging frontend with mock data for medical students.

## 📚 **Documentation-First Approach**
Before implementing any feature, ALWAYS reference:

### **Primary Documentation Sources**
1. **React Official Docs**: https://react.dev/ (component patterns, hooks, performance)
2. **Tailwind CSS Docs**: https://tailwindcss.com/docs (styling, responsive design)
3. **Accessibility Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/ (WCAG 2.1)
4. **Claude Documentation**: https://docs.anthropic.com/ (best practices, prompt engineering)
5. **StudyMate Design Standards**: `/docs/DESIGN-STANDARDS.md` (medical app requirements)

### **Implementation Process**
1. **Research**: Check official documentation for best practices
2. **Plan**: Reference design standards and accessibility requirements
3. **Code**: Follow documentation patterns with inline references
4. **Test**: Implement according to testing documentation
5. **Review**: Verify against quality standards

## Current Responsibilities
- Smart Word Lookup implementation (PRIORITY #1)
- React component architecture following official patterns
- Professional medical app visual design per design standards
- Responsive design (mobile-first per Tailwind docs)
- Mock data integration with realistic medical content

## Phase 1 Constraints
- NO backend integration - use mock data only
- Focus on UI/UX perfection over functionality
- Use localStorage for temporary persistence
- Prioritize Smart Word Lookup above all features
- Follow documentation-driven development approach

## Code Quality Requirements
- Reference official docs in code comments
- Follow React best practices from react.dev
- Implement accessibility per WCAG guidelines
- Use Tailwind CSS according to official documentation
- Include Playwright tests following testing docs

## Success Criteria
- Smart Word Lookup works perfectly on all devices
- UI matches professional medical app standards
- Code follows all official documentation patterns
- Medical students approve in testing
- Accessibility meets WCAG 2.1 AA standards
- Performance meets Core Web Vitals requirements

## Example Implementation Pattern
```jsx
// Smart Word Lookup component following React docs
// Reference: https://react.dev/learn/thinking-in-react
const SmartWordLookup = ({ term, onExplain }) => {
  // State management per React hooks documentation
  const [isVisible, setIsVisible] = useState(false);
  
  // Accessibility implementation per WCAG guidelines
  return (
    <button
      onClick={onExplain}
      aria-label={`Explain medical term: ${term}`}
      className="medical-term" // From design standards
    >
      {term}
    </button>
  );
};
cat > .claude/session-state.json << 'EOF'
{
  "project_info": {
    "name": "StudyMate",
    "version": "Frontend MVP 1.0",
    "phase": "Frontend Excellence",
    "started_date": "2025-08-21"
  },
  "current_session": {
    "session_id": "2025-08-21-frontend-setup",
    "active_agents": [],
    "current_tasks": ["Setup project structure", "Create frontend foundation"],
    "session_goals": [
      "Complete frontend-first project setup",
      "Create Smart Word Lookup component foundation",
      "Establish visual testing workflow",
      "Implement documentation-driven development"
    ]
  },
  "documentation_requirements": {
    "always_reference": [
      "https://react.dev/",
      "https://tailwindcss.com/docs",
      "https://docs.anthropic.com/",
      "https://playwright.dev/",
      "/docs/DESIGN-STANDARDS.md",
      "/docs/CLAUDE-CODING-STANDARDS.md"
    ],
    "coding_standards": "documentation-first approach",
    "quality_gates": ["accessibility", "performance", "design compliance"]
  },
  "environment_status": {
    "ollama_installed": false,
    "models_downloaded": [],
    "frontend_setup": true,
    "playwright_configured": false,
    "design_standards_created": true,
    "documentation_standards_created": true
  },
  "completed_tasks": [
    "Frontend React + Vite setup",
    "Tailwind CSS configuration", 
    "Design standards documentation",
    "Claude coding standards guide"
  ],
  "current_blockers": [],
  "next_priorities": [
    "Setup Playwright visual testing",
    "Create Smart Word Lookup component (following React docs)",
    "Implement mock medical terminology",
    "Setup MCP servers for visual validation"
  ],
  "technical_decisions": {
    "development_approach": "frontend-first with documentation-driven development",
    "core_feature": "Smart Word Lookup",
    "testing_strategy": "Playwright visual validation",
    "mock_data": "realistic medical terminology",
    "code_quality": "documentation-first, accessibility-compliant"
  }
}
