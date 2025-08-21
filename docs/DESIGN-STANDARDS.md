# StudyMate Design Standards & Best Practices

## 🎨 **Medical App Design Principles**

### **Core Design Philosophy**
- **Trust & Credibility**: Medical students need to trust this tool for board exams
- **Cognitive Load Reduction**: UI should not distract from learning
- **Accessibility First**: Meet WCAG 2.1 AA standards minimum
- **Mobile-First**: Touch interactions are primary, desktop is secondary
- **Professional Appearance**: Match industry standards (Medscape, UpToDate)

### **Color Palette & Psychology**
```css
/* Medical Professional Colors */
:root {
  /* Primary Blues - Trust, Medical Authority */
  --medical-blue: #2563eb;
  --medical-navy: #1e3a8a;
  --medical-light-blue: #dbeafe;
  
  /* Grays - Clinical Neutrality */
  --medical-gray: #64748b;
  --medical-light-gray: #f1f5f9;
  --medical-dark-gray: #334155;
  
  /* Backgrounds - Clean, Clinical */
  --medical-background: #f8fafc;
  --medical-card: #ffffff;
  
  /* Status Colors - Clear Medical Communication */
  --success-green: #059669;
  --warning-amber: #d97706;
  --error-red: #dc2626;
  --info-blue: #0284c7;
  
  /* Smart Word Lookup Specific */
  --lookup-popup-bg: #ffffff;
  --lookup-popup-shadow: rgba(0, 0, 0, 0.1);
  --lookup-border: #e2e8f0;
  --lookup-highlight: #fef3c7;
}