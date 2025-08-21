# Claude Coding Standards & Documentation References

## 📚 **Primary Claude Documentation Sources**

### **Always Reference These Official Docs**
When implementing any feature, Claude should first consult:

1. **Claude Desktop Documentation**: https://docs.anthropic.com/en/docs/claude-desktop
2. **Claude API Documentation**: https://docs.anthropic.com/en/api/
3. **Prompt Engineering Guide**: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
4. **Claude Code Best Practices**: https://docs.anthropic.com/en/docs/claude-code
5. **MCP Documentation**: https://docs.anthropic.com/en/docs/mcp/overview

### **Technology-Specific Documentation Priority**

#### **React Development**
1. **React Official Docs**: https://react.dev/
2. **React Hooks Guide**: https://react.dev/reference/react
3. **React Performance**: https://react.dev/learn/render-and-commit
4. **React Accessibility**: https://react.dev/learn/accessibility

#### **Tailwind CSS**
1. **Tailwind Docs**: https://tailwindcss.com/docs
2. **Tailwind Components**: https://tailwindcss.com/docs/reusing-styles
3. **Tailwind Responsive**: https://tailwindcss.com/docs/responsive-design

#### **Playwright Testing**
1. **Playwright Docs**: https://playwright.dev/
2. **Playwright Best Practices**: https://playwright.dev/docs/best-practices
3. **Visual Testing**: https://playwright.dev/docs/test-screenshots

## 🤖 **Documentation-Driven Development Process**

### **Before Writing Any Code**
1. **Research Phase** (5 minutes)
   - Check official documentation for the technology
   - Review Claude documentation for best practices
   - Look up accessibility guidelines
   - Find performance recommendations

2. **Planning Phase** (10 minutes)
   - Reference design patterns from docs
   - Plan component structure following React guidelines
   - Consider performance implications from documentation

3. **Implementation Phase** (Variable)
   - Follow coding standards from official sources
   - Include inline documentation references
   - Implement accessibility features per WCAG guidelines
   - Add error handling per React documentation

4. **Testing Phase** (15 minutes)
   - Write Playwright tests following documentation
   - Test accessibility with axe-core
   - Verify responsive design

5. **Review Phase** (10 minutes)
   - Code review against checklist
   - Performance check with Lighthouse
   - Final accessibility audit

### **Code Review Checklist**
- [ ] Follows React documentation patterns
- [ ] Uses Tailwind CSS according to official docs
- [ ] Meets accessibility standards (WCAG 2.1)
- [ ] Includes proper error boundaries
- [ ] Performance optimized per React docs
- [ ] Responsive design follows mobile-first principles
- [ ] Includes proper TypeScript/PropTypes validation
- [ ] Tests follow Playwright documentation

### **Smart Word Lookup Implementation Standards**

#### **Component Architecture (React Docs Reference)**
```jsx
// Following React documentation patterns:
// https://react.dev/learn/thinking-in-react

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