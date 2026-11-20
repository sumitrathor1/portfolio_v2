# Future Feature Expansion & Developer Architecture Guide

This guide documents the modular architecture of Sumit Rathor's portfolio (`portfolio_v2`). It is designed to help you quickly toggle, add, customize, test, and deploy features as your career and project portfolio expand.

---

## 1. Central Feature Flag System (`src/config/features.js`)

All major features are controlled by centralized boolean flags in `src/config/features.js`:

```javascript
export const features = {
  chatbot: true,              // Interactive AI Portfolio Assistant
  recruiterSnapshot: true,    // 60-Second Recruiter Brief Modal
  developerActivity: true,    // GitHub stats, Repositories, LeetCode & Open Source
  projectExplorer: true,      // Interactive Category filtering, search & Quick View
  terminal: true,             // Interactive Developer Command Line (ZSH / Matrix)
  commandPalette: true,       // Quick Spotlight Navigation & Search (Ctrl+K / Cmd+K)
  skillsExplorer: true,       // Skills-to-Project Verified Matrix Explorer
  architectureExplorer: true, // Visual System Architecture Diagram Inspector
  easterEgg: true,            // Konami Code listener (↑↑↓↓←→←→BA) & DevTools Banner
  resumeDownload: true,       // Direct PDF resume downloads with analytics tracking
  contactForm: true,          // Serverless email dispatch with anti-bot honeypot
  backToTop: true,            // Smooth floating scroll-to-top button
  starCanvas: true,           // Three.js 4500-particle interactive galaxy
  futuristicCursor: true,     // Desktop interactive cursor / mobile sparkle
  cardTilt: true,             // Interactive 3D card tilt & hover lighting
  blog: false,                // Technical Articles (Staged for future expansion)
  testimonials: false         // Recommendations (Staged for future expansion)
};
```

To enable or disable any feature, simply flip its boolean flag to `true` or `false`. Components automatically check their flag and cleanly unmount without breaking the layout.

---

## 2. How to Add a New Portfolio Section

To add a new section (e.g., `TestimonialsSection` or `BlogSection`):

1. **Create the Component**:
   Create a new file in `src/components/sections/BlogSection.jsx` or in `src/features/blog/BlogSection.jsx`:
   ```jsx
   import React from 'react';
   import { features } from '../../config/features';

   export default function BlogSection() {
     if (!features.blog) return null;

     return (
       <section className="section blog-section container-xxl" id="blog">
         <div className="section-heading text-center mb-4" data-aos="fade-up">
           <p className="eyebrow">Articles</p>
           <h2 className="mb-2">Technical Insights</h2>
         </div>
         {/* Your section content */}
       </section>
     );
   }
   ```

2. **Mount in `src/App.jsx`**:
   Import your component and place it inside `<main id="main-content">`:
   ```jsx
   import BlogSection from './features/blog/BlogSection';

   // Inside <main id="main-content">:
   {features.blog && <BlogSection />}
   ```

3. **Add Navigation Link in `src/components/navigation/Header.jsx`**:
   Add an entry to `navLinks`:
   ```javascript
   { id: 'blog', label: 'Blog' }
   ```

4. **Update Static Prerendering**:
   In `scripts/prerender.js`, add your section's markup to `generateHomepageHtml()` so search engines crawl it without JavaScript.

---

## 3. How to Add Chatbot Questions & Answers

The chatbot knowledge base is stored in [src/data/chatbotKnowledge.js](file:///C:/Users/Sumit/Desktop/Project/portfolio_v2/src/data/chatbotKnowledge.js).

To add a new Q&A pair:

```javascript
{
  id: 'my-new-question',                     // Unique identifier string
  category: 'projects',                      // Category: 'about' | 'skills' | 'projects' | 'experience' | 'contact'
  question: 'What is Project X?',            // Display question
  aliases: [                                 // Alternative ways a user might type this
    'project x',
    'tell me about project x',
    'what did you build in project x'
  ],
  keywords: ['project', 'x', 'react', 'api'], // Search keywords for fuzzy relevance scoring
  answer:
    "Project X is a high-performance web service built with React and Node.js that solves...",
  suggestedFollowUps: ['best-projects', 'contact-how'], // Follow-up question IDs
  action: {                                  // Optional call-to-action button
    label: 'View Live Demo',
    url: 'https://project-x.vercel.app'
  }
}
```

The response engine in `src/services/chatbotService.js` automatically indexes new questions, matches natural language variations, and presents relevant follow-ups.

---

## 4. How to Add a New Project

Project data is centrally managed in [src/data/projects.js](file:///C:/Users/Sumit/Desktop/Project/portfolio_v2/src/data/projects.js).

To add a project:

1. Add an entry to `projectsData`:
   ```javascript
   {
     id: 14,
     slug: 'my-new-app',                       // Unique URL slug for /projects/my-new-app/
     category: 'fullstack',                    // 'fullstack' | 'ai' | 'iot'
     title: 'My New Application',
     subtitle: 'Real-time Analytics Dashboard',
     description: 'A comprehensive full-stack platform built with...',
     date: 'Nov 2026',
     image: '/assets/images/project-image/my-app.png',
     github: 'https://github.com/sumitrathor1/my-new-app',
     live: 'https://my-new-app.vercel.app/',
     stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
     problem: 'What specific problem was solved...',
     architecture: 'Detailed technical description of frontend, backend, and database pipeline...',
     features: [
       'Real-time streaming via WebSockets',
       'Role-based access control with JWT',
       'Sub-second query caching'
     ]
   }
   ```

2. Add image assets to `public/assets/images/project-image/`.
3. Add the route to `public/sitemap.xml`:
   ```xml
   <url>
     <loc>https://sumitrathor.vercel.app/projects/my-new-app/</loc>
     <lastmod>2026-11-20</lastmod>
     <priority>0.85</priority>
   </url>
   ```
4. Run `npm run build`: `scripts/prerender.js` automatically generates a dedicated static HTML case study under `dist/projects/my-new-app/index.html` with Schema.org `SoftwareApplication` JSON-LD!

---

## 5. How to Integrate a New Backend or Serverless API

All serverless backend endpoints reside in the `api/` directory:

1. Create a new handler in `api/my-endpoint.js`:
   ```javascript
   export default async function handler(req, res) {
     if (req.method !== 'POST') {
       return res.status(405).json({ error: 'Method Not Allowed' });
     }

     const { data } = req.body;
     // Process data securely using process.env secrets
     return res.status(200).json({ success: true });
   }
   ```
2. Keep secrets in environment variables (`process.env.MY_SECRET_KEY`).
3. Add variable documentation to `.env.example`.
4. Vercel automatically deploys every file in `api/*.js` as an isolated serverless function accessible at `/api/my-endpoint`.

---

## 6. How to Connect Future AI Models to the Chatbot

The chatbot service in [src/services/chatbotService.js](file:///C:/Users/Sumit/Desktop/Project/portfolio_v2/src/services/chatbotService.js) contains an integrated async method `queryChatbot(query)` that looks for `/api/chat`.

To enable an LLM (e.g., Google Gemini or OpenAI):

1. Create `api/chat.js`:
   ```javascript
   export default async function handler(req, res) {
     if (req.method !== 'POST') return res.status(405).end();

     const { message } = req.body;
     const apiKey = process.env.GEMINI_API_KEY;
     if (!apiKey) {
       return res.status(503).json({ error: 'AI key not configured' });
     }

     // Call Gemini API with grounded system prompt containing verified portfolio facts
     // Return { reply: responseText }
   }
   ```
2. Add `GEMINI_API_KEY` to Vercel Environment Variables.
3. If the API is offline or unconfigured, the chatbot automatically falls back to the deterministic local knowledge engine with zero downtime.

---

## 7. Testing & Deployment Checklist

Before committing or pushing changes:

```bash
# 1. Run local dev server
npm run dev

# 2. Test chatbot engine
node scratch/test_chatbot.mjs

# 3. Test contact API handler
node -e "import('./api/contact.js').then(m => console.log('Handler ready'))"

# 4. Verify production build & prerender
npm run build

# 5. Review git status & commit
git status
git add -A
git commit -m "feat: your descriptive message"
git push origin main
```

Vercel automatically triggers a zero-downtime deployment on push to `main`.
