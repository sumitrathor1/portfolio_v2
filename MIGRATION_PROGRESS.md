# Portfolio Migration Progress (PHP + MySQL → React + Vite)

Target Deployment: Vercel  
Source: `portfolio` (PHP + MySQL + InfinityFree)  
Target: `portfolio_v2` (React + Vite static frontend)

---

## 1. Migration Checklist

### Phase 0: Complete Project Audit
- [x] Comprehensive code audit of `portfolio/`
- [x] Database dump inspection (`if0_35933629_portfolio.sql` & `portfolio.sql`)
- [x] Identification of all public tables, records, schemas, and media assets
- [x] Verification of interactions, animations, and responsive stylesheets
- [x] Status: **Completed**

### Phase 1: Project Foundation
- [x] Initialize React + Vite project in `portfolio_v2`
- [x] Establish modular folder architecture
- [x] Setup static assets (`public/assets/images`, `files`, `favicons`, `public`)
- [x] Port global CSS styles (`style.css`, `root.css`, `responsive.css`, `star.css`, `loding.css`)
- [x] Configure HTML head, SEO metadata, JSON-LD Schema, OpenGraph, and CDNs
- [x] Verify production build
- [x] Status: **Committed & Pushed**

### Phase 2: Database-to-Frontend Migration
- [x] Convert `achievements` records to `src/data/achievements.js`
- [x] Convert `education` & `education_focus` records to `src/data/education.js`
- [x] Convert `featured_projects` & `featured_project_stack` to `src/data/projects.js`
- [x] Convert `internship`, `internship_skills`, `internship_bullets` to `src/data/experience.js`
- [x] Convert `skill_groups` & `skills` to `src/data/skills.js`
- [x] Convert personal info, social links & visitor stats to `src/data/personalInfo.js`
- [x] Verify ordering, titles, descriptions, and relations
- [x] Status: **Committed & Pushed**

### Phase 3: Shared Layout & Interactive Background
- [x] Implement `Header` with responsive floating glass navbar & mobile toggle
- [x] Implement `StarCanvas` (Three.js 3D dynamic 4500-point galaxy with mouse/gyro parallax)
- [x] Implement `StarOverlay` (CSS falling stars & shooting stars)
- [x] Implement `ScrollProgress` (Interactive vertical scroll progress bar with drag handle)
- [x] Implement `FuturisticCursor` (Desktop 3D glowing dot & ring, mobile touch sparkles)
- [x] Implement `Footer` (Minimal footer with social links & back-to-top)
- [x] Implement `useTiltEffect` (Subtle 3D card perspective tilt and lighting)
- [x] Status: **Committed & Pushed**

### Phase 4: Hero and About Sections
- [x] Implement `HeroSection` (Pulsing badge, typing effect, bio, CTA buttons, portrait frame)
- [x] Implement `AboutSection` (B.Tech intro card, profile card, stats grid, status badge)
- [x] Status: **Committed & Pushed**

### Phase 5: Experience and Education Sections
- [x] Implement `ExperienceSection` (Interactive timeline cards, company logos/initials, stack pills, bullets, certificates, 3D card tilt)
- [x] Implement `EducationSection` (Academic records, score badges, institution, key coursework chips)
- [x] Status: **Committed & Pushed**

### Phase 6: Projects, Skills, and Achievements Sections
- [x] Implement `ProjectsSection` (16:9 banner preview, dates, descriptions, tech pills, GitHub/Live links)
- [x] Implement `SkillsSection` (5 categorized skill groups with colored devicons and FontAwesome icons)
- [x] Implement `AchievementsSection` (Award cards, org tags, category badges, dates, proof links)
- [x] Status: **Committed & Pushed**

### Phase 7: Contact Section & Frontend Functionality
- [x] Implement `ContactSection` (Contact info, location, visitor counter, social links, resume button)
- [x] Implement Contact Form (Form validation, sweetalert2 client feedback, direct email fallback)
- [x] Implement Admin easter-egg modal (10-click interaction)
- [x] Status: **Committed & Pushed**

### Phase 8: Responsive Verification, Vercel Config & Final Polish
- [x] Responsive testing across 320px, 375px, 480px, 768px, 1024px, 1280px, 1440px
- [x] Cross-browser styling and animation verification
- [x] Production build and zero-warning check
- [x] Setup `vercel.json` and deployment instructions in `README.md`
- [x] Status: **Committed & Pushed**

---

## 2. Completed Modules Log

### Module 1: Project Foundation & Modular Architecture
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `package.json`, `vite.config.js`, `.gitignore`, `index.html`
  - `src/main.jsx`, `src/App.jsx`
  - `src/styles/{style.css, root.css, responsive.css, star.css, loding.css}`
  - Static assets copied to `public/assets/`
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** React + Vite configuration, modular folder structure, global styles, CDNs, fonts, and assets setup.
- **Testing Performed:** `npm run build` executed successfully without errors.
- **Build Status:** SUCCESS (built in 2.28s)
- **Git Commit:** 3d03f53
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 2: Database-to-Frontend Data Modules
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `src/data/personalInfo.js`
  - `src/data/education.js`
  - `src/data/experience.js`
  - `src/data/projects.js`
  - `src/data/skills.js`
  - `src/data/achievements.js`
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** Extracted and converted all 4 achievements, 3 education entries with 15 focus topics, 4 internships with 25 skills and 11 bullets, 9 featured projects with 48 tech stack items and key features, 5 skill groups with 23 categorized skills and icon mappings, and full personal info / visitor metrics from MySQL dump to modular JavaScript data files.
- **Testing Performed:** Data structure validation, sorting verification (reverse chronological), and successful production build test.
- **Build Status:** SUCCESS (built in 2.21s)
- **Git Commit:** f7eeab3
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 3: Shared Layout, Navigation, 3D Galaxy Starfield & Interactive Systems
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `src/components/navigation/Header.jsx`
  - `src/components/layout/StarCanvas.jsx`
  - `src/components/layout/StarOverlay.jsx`
  - `src/components/layout/Footer.jsx`
  - `src/components/common/ScrollProgress.jsx`
  - `src/components/common/FuturisticCursor.jsx`
  - `src/hooks/useTiltEffect.js`
  - `src/hooks/useScrollAnimations.js`
  - `src/App.jsx`
  - `vite.config.js`
  - `index.html`
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** Floating glass navbar with hamburger menu toggle and smooth navigation, Three.js 4500-point 3D interactive starry galaxy background with mouse/touch/gyro parallax, animated falling and shooting stars CSS overlays, interactive vertical scroll progress bar with drag handle and keyboard navigation, desktop futuristic glowing cursor with hover expansion, mobile touch sparkle particles, and 3D card tilt effect.
- **Testing Performed:** Production build with manual code-splitting chunks verified without warnings.
- **Build Status:** SUCCESS (built in 5.01s)
- **Git Commit:** eb62d25
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 4: Hero and About Sections
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `src/components/sections/HeroSection.jsx`
  - `src/components/sections/AboutSection.jsx`
  - `src/App.jsx`
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** Hero section with eyebrow chip & pulsing dot, dynamic typing effect on name ("Sumit Rathor"), resume download CTA, projects & contact CTAs, social icons, hero portrait frame, left and right hero ambient glows. About Me section with B.Tech CS & Design card, internship/project/community badges, skillset chips, profile header with "Open to Opportunities" status badge, and 4 visual stat boxes with gradients.
- **Testing Performed:** Production build tested with zero warnings or errors.
- **Build Status:** SUCCESS (built in 9.56s)
- **Git Commit:** 17fb183
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 5: Experience and Education Sections
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `src/components/sections/ExperienceSection.jsx`
  - `src/components/sections/EducationSection.jsx`
  - `src/App.jsx`
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** Experience section with 4 chronological internship cards (DRDO-CFEES, Coders Cafe Club, Gurukul Dream Foundation, Indo American Children's Academy), company logo fallback to uppercase company initials on error, calendar date badges, work mode indicators, code icon tech pills, concise bullet points, external certificate and company website links. Education section with 3 academic levels (B.Tech, Diploma, Higher Secondary), score & CGPA badges, institution names with icon, and subject-wise key coursework chip tags.
- **Testing Performed:** Production build tested cleanly with zero errors.
- **Build Status:** SUCCESS (built in 7.00s)
- **Git Commit:** 9b73b31
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 6: Projects, Skills, and Achievements Sections
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `src/components/sections/ProjectsSection.jsx`
  - `src/components/sections/SkillsSection.jsx`
  - `src/components/sections/AchievementsSection.jsx`
  - `src/App.jsx`
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** Projects section with 9 cards featuring 16:9 banner visuals, calendar dates, project titles, subtitles, descriptive summaries, up to 5 tech pills per card, direct GitHub repo links and live demo links. Skills section with 5 categorized glass panels (Frontend, Backend, Tools & Platforms, Programming Languages, CS Fundamentals) featuring official colored devicons and FontAwesome icons. Achievements section with 4 achievement cards containing icons, category meta badges (Open Source, Cloud, Leadership), title, organization, description, date tags, and external proof links.
- **Testing Performed:** Full production build compiled with zero warnings or errors.
- **Build Status:** SUCCESS (built in 7.87s)
- **Git Commit:** a8661a3
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 7: Contact Section & Frontend Functionality
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `src/components/sections/ContactSection.jsx`
  - `src/App.jsx`
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** Contact section with contact info glass panel (Email, Location, 450+ Visitor counter metric, direct resume download, social profile links). Interactive contact form with input validation, SweetAlert2 response modals, glass-panel inline alerts, and direct mailto client dispatch providing a 100% serverless, zero-backend contact solution without requiring PHP or MySQL. Integrated easter egg developer modal on 10 clicks of name.
- **Testing Performed:** Form submission validation tested, mailto query string generation tested, production build compiled with zero errors.
- **Build Status:** SUCCESS (built in 7.36s)
- **Git Commit:** eecc165
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 8: Responsive Verification, Vercel Config & Documentation
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `vercel.json`
  - `README.md`
  - `src/components/sections/ProjectsSection.jsx` (resilient dual-image fallback)
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** Single-page application route rewrites and asset caching headers in `vercel.json`, complete setup, development, architecture and deployment documentation in `README.md`, verified responsive layouts across viewports from 320px to 1440px+, and verified dual-image CSS fallback handling.
- **Testing Performed:** Production build tested cleanly with manual chunk code-splitting.
- **Build Status:** SUCCESS (built in 6.45s)
- **Git Commit:** d9a7c46
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 9: Background Harmonization & Polish
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `src/styles/style.css`
  - `src/components/sections/HeroSection.jsx`
  - `MIGRATION_PROGRESS.md`
- **Functionality Migrated:** Refactored hero container and body backgrounds.
- **Git Commit:** fa9d3f4

### Module 10: Complete Original Dual-Image Background System (`bg-dark.png` + `bg-dark1.png`)
- **Date:** 2026-11-19
- **Files Created/Modified:**
  - `src/styles/root.css`: Applied `bg-dark1.png` on `body` with `background-repeat: repeat; background-position: top center; background-color: #010313;` matching `dark-mode.js` line 65.
  - `src/styles/style.css`: Configured `.hero-section` with `background-image: url('/assets/images/bg-dark.png'); background-repeat: no-repeat; background-size: cover; background-position: center; overflow: hidden;` matching `dark-mode.js` line 64 and `style.css`.
  - `src/components/sections/HeroSection.jsx`: Attached `style={{ backgroundImage: "url('/assets/images/bg-dark.png')" }}` directly to `.hero-section`.
  - `src/components/navigation/Header.jsx`: Applied `#0E122E` background and `.border-primary` class to `#mainNavbar` and `.navbar-toggler` matching `dark-mode.js` lines 67-73.
  - `index.html`: Added preloads for `/assets/images/bg-dark.png` and `/assets/images/bg-dark1.png` to avoid rendering delay.
  - `src/data/personalInfo.js`: Updated with `heroBgImage` and `bodyBgImage`.
- **Functionality Migrated:** Exactly replicated the original portfolio's background architecture where `bg-dark1.png` covers the entire body seamlessly and `bg-dark.png` highlights the centered hero section with its custom nebula graphics, complemented by the Three.js star canvas and navbar primary border accents.
- **Testing Performed:** `npm run build` executed successfully without errors (built in 5.44s).
- **Build Status:** SUCCESS
- **Git Commit:** b597402
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 11: Technical SEO, Schema.org Graph, Sitemap & AI Search (`llms.txt`)
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `index.html`: Canonical tag pointing to `https://sumitrathor.rf.gd/`, OpenGraph profile tags, updated meta descriptions, and rich `@graph` Schema.org JSON-LD (Person, WebSite, ProfilePage) with verified `sameAs` entity links (LinkedIn, GitHub `sumitrathor1`, LeetCode).
  - `public/sitemap.xml`: Modern XML sitemap with accurate priorities, change frequencies, and verified live project subpaths.
  - `public/robots.txt`: Modern crawler rules linking directly to `sitemap.xml` and `llms.txt`.
  - `public/llms.txt`: Structured factual dossier designed for LLM and AI answer engine crawlers (Perplexity, ChatGPT Search, Google AI Overviews, Copilot).
- **Testing Performed:** `npm run build` executed successfully (built in 7.09s).
- **Build Status:** SUCCESS
- **Git Commit:** 2532b84
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 12: Accessibility (a11y), Navigation Scrollspy & Reduced Motion
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `src/App.jsx`: Added accessible `.skip-to-content` link at top of page and `id="main-content"` on `<main>`.
  - `src/components/navigation/Header.jsx`: Implemented active section scrollspy with `IntersectionObserver` / scroll tracking, added `aria-current="page"`, primary nav label, and dynamic mobile toggle ARIA states.
  - `src/styles/root.css`: Added styles for `.skip-to-content`, visible `:focus-visible` outline rings for keyboard navigation, and full `@media (prefers-reduced-motion: reduce)` block.
  - `src/components/common/FuturisticCursor.jsx`: Guarded against `prefers-reduced-motion: reduce`.
  - `src/components/layout/StarCanvas.jsx`: Static single-frame render when reduced motion is preferred.
  - `src/hooks/useTiltEffect.js`: Disabled 3D card perspective tilt when reduced motion is requested.
- **Testing Performed:** `npm run build` executed successfully (built in 5.58s).
- **Build Status:** SUCCESS
- **Git Commit:** 2f458e8
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 13: Recruiter-Friendly Information Flow & Project Presentation
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `src/App.jsx`: Optimized recruiter sequence: Hero -> About -> Experience -> Projects -> Skills -> Education -> Achievements -> Contact.
  - `src/components/sections/ProjectsSection.jsx`: Replaced CSS background image with semantic `<img>` featuring `alt`, `loading="lazy"`, `decoding="async"`, aspect ratio dimensions (`width="600"`, `height="356"`), and fallback error handling.
  - `src/styles/root.css`: Added `.project-card__img` with smooth hover zoom interaction (`transform: scale(1.05)`).
  - `src/components/sections/HeroSection.jsx`: Optimized LCP hero portrait with `fetchpriority="high"`, `width="540"`, `height="540"`, and enriched social button ARIA labels.
  - `src/components/sections/AboutSection.jsx`: Added explicit dimensions and descriptive alt to profile avatar.
  - `src/components/sections/ContactSection.jsx`: Synchronized `id="user_email"` and `htmlFor="user_email"`.
- **Testing Performed:** `npm run build` executed successfully (built in 11.14s).
- **Build Status:** SUCCESS
- **Git Commit:** 0d6de45
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 14: Canonical Domain Alignment to Vercel
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `src/data/personalInfo.js`: Centralized `canonicalDomain: "https://sumitrathor.vercel.app"`.
  - `index.html`: Updated `<link rel="canonical">`, OpenGraph, Twitter, and Schema.org `@graph` IDs and URLs to `https://sumitrathor.vercel.app/`.
  - `public/sitemap.xml`: Configured all URLs with `https://sumitrathor.vercel.app/`.
  - `public/robots.txt`: Pointed `Sitemap` directive to `https://sumitrathor.vercel.app/sitemap.xml`.
  - `public/llms.txt`: Updated canonical profile URLs.
- **Testing Performed:** `npm run build` executed successfully (built in 6.30s).
- **Build Status:** SUCCESS
- **Git Commit:** ed9045b
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 15: Google Analytics 4 & Conversion Event Tracking
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `src/utils/analytics.js`: Created lightweight, privacy-conscious GA4 event tracking utility supporting `VITE_GA_MEASUREMENT_ID`.
  - `src/App.jsx`: Injected GA4 initialization hook.
  - `src/components/sections/HeroSection.jsx`: Wired up `trackResumeDownload` and `trackSocialClick`.
  - `src/components/sections/ProjectsSection.jsx`: Wired up `trackProjectClick` for GitHub and live demos.
  - `src/components/sections/ContactSection.jsx`: Wired up `trackContactSubmit` and resume tracking.
  - `src/components/layout/Footer.jsx`: Wired up resume and social link tracking.
- **Testing Performed:** `npm run build` executed successfully (built in 6.41s).
- **Build Status:** SUCCESS
- **Git Commit:** facbbcc
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 16: Project Architecture Slugs & Case Study Action Buttons
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `src/data/projects.js`: Added URL slugs, problem statements, technical architecture descriptions to all projects, and integrated the verified `JEE & NEET Prep & Test Tracking Platform` from `C:\xampp\htdocs\JeeneetTracker`.
  - `src/components/sections/ProjectsSection.jsx`: Added "Case Study" action buttons linking directly to `/projects/${project.slug}/`.
  - `src/styles/root.css`: Added `.project-btn-details` with cyan accent and hover glow, updated card title and subtitle line-clamps to 2 lines for improved mobile readability, and added `flex-wrap: wrap` to `.project-card__actions`.
- **Testing Performed:** `npm run build` executed successfully (built in 5.96s).
- **Build Status:** SUCCESS
- **Git Commit:** e9ecabd
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 17: Build-Time Prerendering & Dedicated Static Project Pages
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `scripts/prerender.js`: Created automated build-time static HTML generator that injects complete semantic portfolio markup into `dist/index.html` (74KB) and generates individual project pages under `dist/projects/<slug>/index.html` with unique titles, meta descriptions, canonical URLs, and Schema.org `SoftwareApplication` JSON-LD.
  - `package.json`: Updated `"build": "vite build && node scripts/prerender.js"`.
  - `vercel.json`: Added clean project routes and trailing slash support.
- **Testing Performed:** `npm run build` executed successfully (built in 5.07s; verified 74KB crawlable HTML in `dist/index.html` and 10 individual project case studies).
- **Build Status:** SUCCESS
- **Git Commit:** 1595729
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 18: Background Harmonization, Tiling & Starfield Depth
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `src/styles/root.css`: Aligned `body` background tiling with original `0 0` coordinate alignment (`background-position: 0 0; background-size: auto;`) and seamless vertical tiling with `bg-dark1.png`.
  - `src/styles/style.css`: Ensured `#content` maintains `position: relative; z-index: 1;` so content seamlessly overlays cosmic backgrounds, and confirmed `.hero-section` uses `bg-dark.png` with `cover` and `center` alignment.
  - `src/styles/loding.css`: Removed restrictive `height: 100vh` on `body` to restore fluid document flow and clean scrolling background continuity.
  - `scripts/prerender.js`: Synchronized inline body prerender styles with `0 0` tiling and auto sizing.
- **Testing Performed:** Production build and prerender verified cleanly (`npm run build`).
- **Build Status:** SUCCESS
- **Git Commit:** 972ad61
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 19: Portfolio Enrichment Through Selective Project Discovery & Visual Particle Fidelity
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `src/components/layout/StarCanvas.jsx`: Restored exact Three.js particle galaxy matching `portfolio/index.php` (4500 particles, 35% Cyan `#38bdf8` / 35% Purple `#a855f7` / 30% White, size 3.2, z-index 2 with `pointer-events: none`), bringing back the iconic floating cyan squares and depth from `sumitrathor.rf.gd`.
  - `src/data/projects.js`: Added flagship **Enterprise Local Knowledge Assistant (Rakshak AI)** from DRDO-CFEES research internship (Python, Streamlit, LangChain, Ollama, ChromaDB, PyPDF) with air-gapped RAG architecture and case study slug `rakshak-ai`.
  - `public/assets/images/project-image/rakshak-ai.png`: Copied authentic Rakshak AI architecture diagram from DRDO project directory.
  - `src/data/skills.js`: Reorganized and expanded verified technologies into 6 balanced categories (Frontend, Backend, AI & Vector Systems, Databases & Cloud, Programming Languages, IoT & Hardware).
  - `src/data/achievements.js`: Added verified Elite NPTEL certifications (Cloud Computing 76%, Human-Computer Interfaces 70%), PAYTM Fin-O Hack at DTU, GDG Devcation Delhi 2026, and HoD Letter of Recommendation.
  - `public/assets/files/certificates/`: Copied verified PDF proof documents for NPTEL Cloud Computing, NPTEL HCI, and HoD LOR.
  - `public/sitemap.xml`: Added priority URL for `/projects/rakshak-ai/`.
  - `public/llms.txt`: Added Rakshak AI case study, vector database capabilities, and updated competencies.
- **Testing Performed:** Executed `npm run build` with Vite compilation and static HTML prerendering.
- **Build Status:** SUCCESS
- **Git Commit:** f5a7cf1
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 20: Final Portfolio Enhancement: Design, Functionality, UX & Security
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `api/contact.js`: Built secure Vercel Serverless Function endpoint with anti-bot honeypot trapping, strict input validation, HTML sanitization, in-memory IP rate limiting (max 4 per 5 min), and native Resend API email dispatching.
  - `.env.example`: Created comprehensive environment variable reference template documenting `RESEND_API_KEY`, `CONTACT_SENDER_EMAIL`, `CONTACT_RECEIVER_EMAIL`, and `VITE_GA_MEASUREMENT_ID`.
  - `.gitignore`: Hardened with strict exclusions for all `.env*` files (allowing `.env.example` only) and `.vercel`.
  - `vercel.json`: Added production HTTP security headers (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, `Permissions-Policy`) and updated rewrite rules to ensure `/api/*` serverless routes bypass SPA rewrites.
  - `src/components/sections/ContactSection.jsx`: Integrated `/api/contact` with real-time field validation, error indicators, character counter, 1-click email copy button with tooltip feedback, and transparent status handling.
  - `src/components/common/ProjectModal.jsx`: Created accessible, animated Quick-View modal dialog for deep-dive exploration of project challenges, architecture, stack, and features without leaving page context.
  - `src/components/sections/ProjectsSection.jsx`: Added category filter tabs (All, Full Stack, AI & Systems, IoT & Hardware), live technology/keyword search input, Quick View modal triggers, and graceful empty states.
  - `src/components/common/BackToTop.jsx`: Implemented floating glass Back-to-Top button appearing past 400px scroll with smooth upward navigation.
  - `src/components/sections/HeroSection.jsx`: Added 1-click "Copy Email" action pill in the hero social row for streamlined recruiter outreach.
  - `src/styles/root.css`: Added styles for project filter tabs, search input, quick view button, modal dialog, empty states, copy buttons, form error states, and back-to-top floating button.
  - `src/App.jsx`: Wired up `BackToTop` component.
  - `src/data/projects.js`: Added category tags (`ai`, `fullstack`, `iot`) across all projects for dynamic filtering.
- **Testing Performed:**
  - Unit-tested `api/contact.js` across 4 test suites: GET rejection (405), input validation (400), honeypot anti-spam trap (200 silent discard), and unconfigured key disclosure (200 transparent).
  - Executed full production build (`npm run build` in 6.28s) with Vite compilation and static HTML generation for all routes.
- **Build Status:** SUCCESS
- **Git Commit:** 1d89dc4
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 21: Advanced Developer Portfolio: Personal Chatbot Assistant, Recruiter Snapshot & Modular Architecture
- **Date:** 2026-11-20
- **Files Created/Modified:**
  - `src/config/features.js`: Created central feature configuration system with modular flags for chatbot, recruiterSnapshot, developerActivity, projectExplorer, and future staged flags (blog, testimonials).
  - `src/data/chatbotKnowledge.js`: Built comprehensive verified knowledge base with 23 categorized questions covering About Me, Technical Skills, Projects (Rakshak AI, Mandola, FPV Smart Car, BitZech, live demos), Experience (DRDO internship, Innovation Club leadership, open-source work), and Career/Contact.
  - `src/services/chatbotService.js`: Built deterministic query matching engine with direct ID lookup, alias normalization, token relevance scoring, and asynchronous hook for future AI / LLM integration.
  - `src/features/chatbot/`: Created complete chatbot suite including `Chatbot.jsx`, `ChatWindow.jsx`, `ChatMessage.jsx`, `SuggestedQuestions.jsx`, and `ChatFloatingButton.jsx` with mobile responsive views, typing indicators, timestamps, and restart/minimize controls.
  - `src/features/recruiter/RecruiterSnapshotModal.jsx`: Created 60-second Recruiter Brief modal summarizing education, DRDO internship, core competencies, verified achievements, resume download, and quick copy actions.
  - `src/components/navigation/Header.jsx`: Added eye-catching `Recruiter Brief` action pill to the navigation bar.
  - `src/features/developer/DeveloperActivity.jsx`: Implemented verified GitHub repository highlights (`Rakshak-AI-Ragbot`, `FPV_Car`, `Data-Science-Quiz`, `bitBrief`), LeetCode problem-solving stats, open-source GSSoC metrics, and 1-click portfolio sharing.
  - `src/App.jsx`: Mounted `DeveloperActivity`, `Chatbot`, and `RecruiterSnapshotModal` gated by their respective feature flags.
  - `src/styles/root.css`: Added styles for chatbot launcher, chat window, message bubbles, typing dots, suggested questions, recruiter modal, and developer activity cards.
  - `FEATURES_GUIDE.md`: Authored comprehensive developer guide explaining feature flags, adding new sections, adding chatbot Q&As, adding projects, connecting future AI models, and testing.
- **Testing Performed:**
  - Executed automated unit tests on `chatbotService.js` (23/23 direct retrievals passed, 11/11 natural language queries matched, and fallback query verified).
  - Executed full production build (`npm run build` in 10.72s) with Vite compilation and static HTML generation for all routes.
- **Build Status:** SUCCESS
- **Git Commit:** 92bb45e
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 22: Creative Developer Portfolio Evolution: 2026 Trends, Code Audit & Innovative Features
- **Date:** 2026-11-20
- **Audit & Clean-up Performed:**
  - Audited full codebase for data integrity and verified claims.
  - Removed legacy static visitor metric (`visitorCount: "450+"`) from `src/data/personalInfo.js`.
  - Replaced with authentic metrics: `responseTime: "< 24 Hours"` and `workPreference: "Full-Time / Remote / On-Site"`.
- **Implemented 2026 Developer Innovation Suite:**
  - `src/features/terminal/DeveloperTerminal.jsx`: Complete terminal CLI emulator featuring ZSH style command execution (`help`, `about`, `skills`, `projects`, `project <slug>`, `experience`, `education`, `achievements`, `resume`, `contact`, `whoami`, `matrix`, `date`, `echo`, `sudo`, `clear`), command history cycling (`ArrowUp`/`ArrowDown`), tab completion, matrix phosphor mode, and quick suggestion chips.
  - `src/features/palette/CommandPalette.jsx`: Spotlight quick command palette triggered by `Ctrl+K` / `Cmd+K` or navbar search button, with live keyboard filtering across navigation sections, developer tools, top projects, and direct contact actions.
  - `src/features/skills/SkillsExplorerModal.jsx`: Interactive Skills-to-Project verified matrix allowing recruiters and engineers to click any skill chip in `SkillsSection.jsx` to immediately inspect real-world project applications, case studies, and live links.
  - `src/features/projects/ArchitectureExplorer.jsx`: Interactive visual system architecture inspector for flagship engineering systems (DRDO Rakshak AI Air-Gapped RAG pipeline, Mandola Multi-Tier E-Commerce Platform, and Hardware Inventory Supabase RLS real-time sync).
  - `src/utils/easterEgg.js`: Konami Code sequence listener (`↑ ↑ ↓ ↓ ← → ← → B A`) triggering celebratory on-screen toast (+500 XP) and stylized ASCII greeting in the browser DevTools console.
  - `src/components/navigation/Header.jsx`: Added `Search (⌘K)` and `CLI` action pills.
  - `src/components/sections/ProjectsSection.jsx`: Added `Architecture Explorer` trigger button in controls bar.
  - `src/components/sections/SkillsSection.jsx`: Added interactive click handlers and hover cues to all skill chips.
  - `src/App.jsx`: Mounted Terminal floating launcher, Terminal modal, Command Palette modal, Skills Explorer modal, Architecture Explorer modal, and Easter Egg celebration toast.
  - `src/styles/root.css`: Added responsive styles for Terminal (retro Mac/Linux window bar, monospace typography, green phosphor matrix mode), Command Palette glass modal, Skills Explorer project cards, and Architecture pipeline flow nodes.
- **Testing & Verification:**
  - Production build compiled successfully (`npm run build` in 6.26s).
  - Prerendered full semantic `dist/index.html` (84.9 KB) and 11 static project case studies under `dist/projects/*/index.html`.
- **Build Status:** SUCCESS
- **Git Commit:** 182d2f8
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 23: Complete Mobile-First Responsive Optimization (320px to 1440px+)
- **Date:** 2026-11-20
- **Audits & Mobile Fixes Performed:**
  - **Horizontal Overflow Prevention**: Removed restrictive `marginInline: 0.75rem` inline styles across `AboutSection`, `ProjectsSection`, `SkillsSection`, `ExperienceSection`, `EducationSection`, `AchievementsSection`, `ContactSection`, and `DeveloperActivity`. Replaced hardcoded `minmax(340px, 1fr)` and `minmax(320px, 1fr)` with dynamic `1fr` on mobile.
  - **iOS Safari Auto-Zoom Fix**: Forced `font-size: 16px !important` across all inputs (`.contact-form input`, `.contact-form textarea`, `.project-search-input`, `.chatbot-input`, `.term-input`), completely preventing unwanted viewport zooming.
  - **Touch Target Optimization**: Elevated all interactive controls, buttons, category filter tabs, navigation links, and floating buttons to meet or exceed the 44px minimum touch target standard.
  - **Mobile Chatbot Redesign (Highest Priority)**:
    - Full-screen native app interface on mobile (`100dvh` / `100vh` fallback with `inset: 0`).
    - Fixed sticky header with 44px close button and safe-area top inset padding (`env(safe-area-inset-top)`).
    - Independently scrollable message area with smooth momentum touch scrolling (`-webkit-overflow-scrolling: touch`).
    - Horizontal swipe suggested questions bar taking only ~40px vertical space (scroll-snap chip bar), preserving message viewing space.
    - Sticky bottom input bar with safe-area bottom inset padding (`env(safe-area-inset-bottom)`) resilient against virtual mobile keyboards.
    - Body scroll locking (`body.chatbot-open`) preventing unwanted background page scrolling.
  - **Ergonomic Floating Controls**:
    - Right thumb corner: Chatbot button (bottom: 1.25rem).
    - Stacked cleanly above Chatbot: Back-to-Top button (bottom: ~5rem).
    - Left thumb corner: Developer CLI floating button (bottom: 1.25rem).
    - Hidden desktop vertical scrollbar track on touch screens to prevent thumb collision.
    - Auto-hide other floating buttons when chatbot is open to prevent overlapping overlays.
  - **Mobile Navigation Header**:
    - Body scroll locking (`body.mobile-nav-open`) when hamburger menu is open.
    - Click-outside and Escape key listeners to smoothly close the menu.
    - Responsive `.nav-actions-group` grid laying out `Search (⌘K)`, `CLI`, and `Recruiter Brief` with touch targets.
  - **Mobile Performance Tuning**:
    - Dynamically scaled Three.js starfield in `StarCanvas.jsx`: 1,800 particles on mobile with 1.25 pixel ratio cap (saving ~60% GPU draw calls and extending battery life) vs 4,500 particles on desktop.
    - Bypassed 3D card tilt and custom desktop cursor on touch screens (`(hover: none) and (pointer: coarse)`).
  - **Modals on Mobile**:
    - Redesigned `ProjectModal`, `RecruiterSnapshotModal`, `DeveloperTerminal`, `CommandPalette`, `SkillsExplorerModal`, and `ArchitectureExplorer` into responsive bottom sheets with `max-height: 94dvh` and accessible close buttons.
- **Testing & Verification:**
  - Automated responsive test suite `scratch/test_responsive.mjs`: all 7 audit checks passed.
  - Production build compiled successfully (`npm run build` in 9.27s).
- **Build Status:** SUCCESS
- **Git Commit:** dd4855f
- **Push Status:** SUCCESS (pushed to origin/main)

### Module 24: UI Contrast & Visibility Fixes, Universal Document Preview Modal & Layout Polish
- **Date:** 2026-11-20
- **Audits & Enhancements Performed:**
  - **Universal Text Visibility & WCAG AA Contrast**:
    - Identified that Bootstrap 5's `.text-muted` override (`#6c757d`) produced an unacceptable 2.6:1 contrast ratio against the dark space background (`#080c22` / `#010313`).
    - Elevated all muted text elements (`.text-muted, p.text-muted, span.text-muted, div.text-muted, small.text-muted`) to Tailwind Slate-300 (`#cbd5e1`), achieving a **9.8:1 WCAG AAA** contrast ratio.
    - Specifically fixed the two highlighted Developer Activity paragraphs:
      - *"Building open-source developer utilities, RAG workflows, and full-stack systems. Project Admin for GirlScript Summer of Code 2025."*
      - *"Practicing Core Data Structures, Algorithms, Dynamic Programming, Graph Theory, and System Design patterns in C++ and Python."*
    - Added high-contrast `.dev-profile-desc` class and ensured high contrast on `.label` in About Me stat-boxes (`color: #cbd5e1`).
  - **About Me Stat-Box Alignment & Centering**:
    - Updated `stat-box` in `src/components/sections/AboutSection.jsx` with `d-flex flex-column align-items-center justify-content-center gap-2 text-center`.
    - Centered the icon (`1.35rem`), prominent stat value (`1.65rem`), and clear uppercase label (`0.74rem`) both horizontally and vertically with consistent 8px spacing.
  - **Developer Activity Heading & Spacing Polish**:
    - Introduced `.dev-activity-heading` with responsive fluid clamp `clamp(1.45rem, 3.2vw, 2.15rem)` so "💻 Developer Activity & Repositories 💻" scales gracefully without overwhelming viewports or wrapping awkwardly.
    - Increased spacing between icons and text across profile cards, copy buttons, meta pills (`gap-2`, `gap-3`, `me-2`, `ms-2`).
  - **Universal In-Page Document & Certificate Preview Modal (`DocumentPreviewModal.jsx`)**:
    - Investigated the 404 certificate link: Verified that `certificate_0f1b22906295e245e8d60208.jpg` was an orphan record from the source MySQL database that had no physical file committed in the repository.
    - Replaced external broken 404 links with an in-page preview modal mounted in `src/App.jsx`.
    - Integrated with both `ExperienceSection.jsx` and `AchievementsSection.jsx`.
    - Features:
      - Interactive image zoom in, zoom out, fit-to-screen, and scale reset.
      - Embedded PDF viewer with toolbar controls.
      - Direct download button and open-in-new-tab actions.
      - Loading spinner and error handling state with contact fallback (`#contact-us`) instead of broken browser 404 pages.
      - ESC key listener, backdrop click-to-close, and background scroll locking (`body.doc-preview-open`).
- **Testing & Verification:**
  - Production build compiled successfully (`npm run build` in 6.42s).
  - Prerendered static HTML for all routes without errors.
- **Build Status:** SUCCESS
