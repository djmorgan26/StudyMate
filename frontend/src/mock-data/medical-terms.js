// Mock medical terminology database for Smart Word Lookup
// Following design standards for realistic explanations

export const medicalTerms = {
  "hemodynamic": {
    simple: "Related to blood flow and pressure in your circulatory system.",
    detailed: "Hemodynamic refers to the physical properties that govern blood flow through the cardiovascular system, including pressure, flow rate, and resistance.",
    expert: "Hemodynamic parameters include cardiac output, systemic vascular resistance, central venous pressure, and mean arterial pressure, all crucial for maintaining adequate tissue perfusion.",
    related: ["cardiac output", "blood pressure", "circulation"],
    category: "cardiology"
  },
  "myocardial infarction": {
    simple: "Heart attack - when blood flow to part of the heart muscle is blocked.",
    detailed: "Myocardial infarction occurs when coronary artery blockage prevents oxygen-rich blood from reaching heart muscle, causing tissue death.",
    expert: "MI results from coronary thrombosis, typically due to atherosclerotic plaque rupture, leading to cardiomyocyte necrosis and potential complications including arrhythmias, heart failure, and mechanical complications.",
    related: ["coronary artery", "atherosclerosis", "cardiac enzymes"],
    category: "cardiology"
  },
  "bradycardia": {
    simple: "Slow heart rate, usually below 60 beats per minute.",
    detailed: "Bradycardia is a slower than normal heart rate, which can be normal in athletes or indicate underlying cardiac conduction problems.",
    expert: "Bradycardia may result from SA node dysfunction, AV blocks, or increased vagal tone. Clinical significance depends on hemodynamic stability and underlying etiology.",
    related: ["heart rate", "conduction system", "arrhythmia"],
    category: "cardiology"
  },
  "electrocardiogram": {
    simple: "A test that records the electrical activity of your heart, also called an ECG or EKG.",
    detailed: "An electrocardiogram measures the electrical impulses that cause your heart to beat, helping diagnose heart rhythm problems and damage.",
    expert: "ECG records cardiac electrical activity via surface electrodes, displaying P waves (atrial depolarization), QRS complexes (ventricular depolarization), and T waves (ventricular repolarization).",
    related: ["cardiac rhythm", "heart block", "ST elevation"],
    category: "cardiology"
  }
};

// Mock AI explanation generator (simulates backend response)
export const getMockExplanation = (term) => {
  const termData = medicalTerms[term.toLowerCase()];
  
  if (!termData) {
    return {
      simple: `${term} is a medical term. (This would be explained by AI in the real app)`,
      detailed: `${term} is a medical term. (Detailed explanation would be provided by AI in the real app)`,
      expert: `${term} is a medical term. (Expert-level explanation would be provided by AI in the real app)`,
      related: [],
      category: "general"
    };
  }
  
  return {
    simple: termData.simple,
    detailed: termData.detailed,
    expert: termData.expert,
    related: termData.related,
    category: termData.category
  };
};

// Sample medical flashcard content with terms for testing
export const sampleMedicalContent = `
The patient presents with bradycardia and signs of hemodynamic instability. 
The electrocardiogram shows evidence of myocardial infarction with ST elevation 
in leads II, III, and aVF, suggesting an inferior wall MI.
`;
