// ==============================================================================
// Sumit Rathor Portfolio - Central Feature Flag Configuration
// ==============================================================================
// Enable or disable features modularly without modifying component internals.
// Toggle any feature to false to disable it cleanly across the entire portfolio.
// See FEATURES_GUIDE.md for instructions on adding and extending features.
// ==============================================================================

export const features = {
  // Interactive Chatbot Assistant (offline predefined Q&A engine with future AI readiness)
  chatbot: true,

  // Interactive Developer Command Center (Terminal CLI with history, autocomplete & tools)
  terminal: true,

  // Quick Command Palette (Ctrl+K / Cmd+K Spotlight search across sections & projects)
  commandPalette: true,

  // Interactive Skills-to-Project Matrix (Clicking a skill reveals verified project usage)
  skillsExplorer: true,

  // Project Architecture Explorer (Visual layer inspector for Rakshak AI, Mandola, Inventory)
  architectureExplorer: true,

  // Developer Easter Eggs (Konami code, console greeting, secret commands)
  easterEgg: true,

  // Recruiter Snapshot (30-60 second high-impact summary modal & header action)
  recruiterSnapshot: true,

  // Developer Profile & GitHub highlights (verified repositories, LeetCode, Open Source)
  developerActivity: true,

  // Interactive Project Explorer (Category tabs, keyword search, Quick View modal)
  projectExplorer: true,

  // Resume Download functionality & analytics tracking
  resumeDownload: true,

  // Functional Contact Form (Vercel Serverless Function /api/contact & honeypot spam protection)
  contactForm: true,

  // Floating Back-to-Top smooth scroll navigation
  backToTop: true,

  // Three.js interactive 3D particle galaxy background
  starCanvas: true,

  // Custom futuristic desktop cursor / touch sparkles
  futuristicCursor: true,

  // Card perspective tilt & lighting effects on hover
  cardTilt: true,

  // Technical Articles / Blog (Staging flag for future expansion)
  blog: false,

  // Client and peer testimonials (Staging flag for future expansion)
  testimonials: false
};
