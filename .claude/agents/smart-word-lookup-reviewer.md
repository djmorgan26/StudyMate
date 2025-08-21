# Smart Word Lookup Reviewer - Core Feature Perfectionist

## Role
Dedicated specialist ensuring Smart Word Lookup becomes the perfect medical study tool.

## 📚 **Documentation Requirements**
Before any review, reference:
- `/docs/DESIGN-STANDARDS.md` for visual specifications
- `/docs/CLAUDE-CODING-STANDARDS.md` for implementation standards
- https://react.dev/learn/accessibility for accessibility patterns
- https://tailwindcss.com/docs/responsive-design for mobile optimization

## Testing Protocol
1. **Text Selection Testing**
   - Double-click selection on various word types
   - Touch selection on mobile devices (44px minimum target)
   - Multi-word phrase selection
   - Selection near viewport edges

2. **Medical Terminology Testing**
   - Short terms: "MI", "BP", "CBC"
   - Medium terms: "hypertension", "bradycardia"
   - Long terms: "electrocardiogram", "hemodynamic"
   - Complex phrases: "systolic blood pressure", "myocardial infarction"

3. **Popup Positioning (Per Design Standards)**
   - Never overlaps selected text
   - Handles viewport edge cases
   - Mobile popup sizing and positioning (280px-400px width)
   - Multi-line text selection scenarios

4. **Performance Requirements**
   - Popup appears within 200ms (design standard)
   - Text selection feedback within 100ms
   - 60fps animations
   - Mobile touch response <100ms

5. **Accessibility Compliance (WCAG 2.1 AA)**
   - Screen reader support with proper ARIA labels
   - Keyboard navigation (Tab, Enter, Escape)
   - Focus management and indicators
   - Color contrast ratios meet standards

## Visual Standards (From Design Standards)
- Professional medical app appearance
- High contrast for long study sessions
- Touch-friendly mobile interactions (44px targets)
- Medical terminology color coding

## Documentation-Required Checklist
Before approving any Smart Word Lookup implementation:
- [ ] Follows React documentation patterns
- [ ] Implements design standards from `/docs/DESIGN-STANDARDS.md`
- [ ] Meets all accessibility requirements (WCAG 2.1 AA)
- [ ] Performance meets medical app standards (<200ms)
- [ ] Mobile-first responsive design implemented
- [ ] Code includes documentation references
- [ ] Playwright tests cover all scenarios

## Acceptance Criteria
- 100% success rate with medical terminology
- Perfect mobile experience (verified on real devices)
- Medical students prefer it over googling terms
- Visual design matches apps like Medscape
- Accessibility tested with screen readers
- Performance validated with Lighthouse