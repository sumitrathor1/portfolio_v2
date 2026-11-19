# Sumit Rathor - Personal Portfolio (React + Vite)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Galaxy-000000?logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, high-performance, and serverless personal portfolio website completely migrated from legacy PHP + MySQL to **React + Vite**. The application preserves the original visual identity, layout, animations, 3D interactive elements, and content while operating with 100% client-side static optimization suitable for zero-maintenance hosting on **Vercel**, Netlify, or GitHub Pages.

---

## 🚀 Key Features & Highlights

- **3D Interactive Galaxy Canvas:** Built with Three.js featuring 4,500 particles with custom color grading (cyan, purple, crystal white), mouse parallax, mobile touch tracking, and device gyroscope responsiveness.
- **Glassmorphic UI Design:** High-fidelity glass panels (`backdrop-filter: blur(14px)`), gradient borders, glowing accent orbs, and dark theme by default.
- **Interactive 3D Card Tilt Effect:** Subtle desktop mouse-driven 3D perspective tilts on cards with dynamic cursor spotlight variables (`--mouse-x`, `--mouse-y`).
- **Futuristic Custom Cursor & Touch Glow:** Dual-layer desktop cursor (direct dot + smooth trailing ring with hover scale) and throttled touch sparkle particles on mobile.
- **Interactive Vertical Scroll Progress Bar:** Floating draggable handle with smooth scrolling, progress tracking, and full keyboard accessibility (`ArrowUp`/`ArrowDown`, `PageUp`/`PageDown`, `Home`, `End`).
- **Zero Backend / Zero MySQL Runtime:** All public records (featured projects, internship experiences, academic history, skills, achievements, and metrics) are converted into structured, modular JavaScript data modules.
- **Serverless Contact Solution:** Client-side form validation, SweetAlert2 feedback, and instant `mailto:` link generation for direct email dispatch without PHP or external paid APIs.
- **Full Responsive Adaptation:** Tested and optimized across mobile, tablet, laptop, and ultra-wide viewports (320px to 1440px+).

---

## 📁 Project Structure

```text
portfolio_v2/
│
├── public/
│   ├── assets/
│   │   ├── favicon-dark/           # Favicons & dark theme web manifest
│   │   ├── favicon-light/          # Light theme favicons
│   │   ├── files/
│   │   │   └── experience-certificates/ # Internship certificate documents
│   │   ├── images/
│   │   │   ├── company-logos/      # Company and organization brand logos
│   │   │   ├── project-image/      # Project thumbnail screenshots
│   │   │   ├── skills/             # Skill icons
│   │   │   ├── hero-image.png      # Hero portrait
│   │   │   ├── sumit.jpg           # About section portrait
│   │   │   └── thumbnail.png       # OpenGraph / social preview card
│   │   └── public/
│   │       └── Sumit Rathor Resume.pdf # Downloadable resume PDF
│   ├── robots.txt                  # Search engine crawling rules
│   └── sitemap.xml                 # XML sitemap
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── FuturisticCursor.jsx # 3D cursor dot & ring + touch sparkles
│   │   │   └── ScrollProgress.jsx   # Interactive vertical scroll indicator
│   │   ├── layout/
│   │   │   ├── Footer.jsx           # Minimal footer with social & top links
│   │   │   ├── StarCanvas.jsx       # Three.js 3D starry galaxy background
│   │   │   └── StarOverlay.jsx      # Falling and shooting star CSS animations
│   │   ├── navigation/
│   │   │   └── Header.jsx           # Floating glass navbar with hamburger menu
│   │   └── sections/
│   │       ├── HeroSection.jsx      # Hero copy, typing name effect, CTA buttons
│   │       ├── AboutSection.jsx     # B.Tech CS & Design card, stats grid
│   │       ├── ExperienceSection.jsx # Chronological internship cards & stack
│   │       ├── EducationSection.jsx # Academic milestones & key coursework chips
│   │       ├── ProjectsSection.jsx  # 16:9 featured project cards & live links
│   │       ├── SkillsSection.jsx    # 5 categorized skill groups with devicons
│   │       ├── AchievementsSection.jsx # Achievements, categories, and proof links
│   │       └── ContactSection.jsx   # Contact info, visitor counter & contact form
│   │
│   ├── data/
│   │   ├── achievements.js         # 4 public achievement records
│   │   ├── education.js            # 3 academic degree records & 15 focus areas
│   │   ├── experience.js           # 4 internship records with bullets & stack
│   │   ├── personalInfo.js         # Profile, social links, bio, stats
│   │   ├── projects.js             # 9 featured projects with links & stack
│   │   └── skills.js               # 23 skills categorized across 5 groups
│   │
│   ├── hooks/
│   │   ├── useScrollAnimations.js  # Reveal on scroll observer
│   │   └── useTiltEffect.js        # 3D interactive card tilt effect
│   │
│   ├── styles/
│   │   ├── loding.css              # Loading animation styles
│   │   ├── responsive.css          # Responsive breakpoint overrides
│   │   ├── root.css                # CSS custom variables & glassmorphism
│   │   ├── star.css                # Falling stars & shooting stars CSS
│   │   └── style.css               # Core layout and component styling
│   │
│   ├── App.jsx                     # Root application assembler
│   └── main.jsx                    # React entry point
│
├── index.html                      # HTML shell with SEO meta & JSON-LD schema
├── package.json                    # Project dependencies & scripts
├── vercel.json                     # Vercel SPA rewrite & cache headers
└── vite.config.js                  # Vite configuration & chunk optimization
```

---

## 🛠️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm`

### Installation & Run

1. Clone or navigate into the project directory:
   ```bash
   cd portfolio_v2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment to Vercel

The project is pre-configured for one-click deployment on **Vercel** via `vercel.json`.

### Option 1: Automatic Deployment via GitHub (Recommended)
1. Push your repository to GitHub (`https://github.com/sumitrathor1/portfolio_v2`).
2. Log in to [Vercel](https://vercel.com).
3. Click **"Add New Project"** and import `sumitrathor1/portfolio_v2`.
4. Framework Preset will be automatically detected as **Vite**.
5. Build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**. Your portfolio will be live in seconds with an SSL-enabled domain.

### Option 2: Deploy Using Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```
For production release:
```bash
vercel --prod
```

---

## 📊 Database to Frontend Mapping Reference

| MySQL Table | Target JavaScript Module | Items Migrated | Status |
| :--- | :--- | :--- | :--- |
| `achievements` | `src/data/achievements.js` | 4 records | ✅ Complete |
| `education` & `education_focus` | `src/data/education.js` | 3 degrees, 15 coursework areas | ✅ Complete |
| `featured_projects` & `stack` | `src/data/projects.js` | 9 projects, 48 stack items | ✅ Complete |
| `internship`, `skills`, `bullets` | `src/data/experience.js` | 4 internships, 25 skills, 11 bullets | ✅ Complete |
| `skill_groups` & `skills` | `src/data/skills.js` | 5 groups, 23 skills with devicon maps | ✅ Complete |
| `visitors` & `user` | `src/data/personalInfo.js` | Visitor metric (450+) & public profile | ✅ Complete |

---

## 🔒 Security & Privacy Notice
All sensitive database credentials, admin passwords, VAPID push keys, and environment variables from the legacy PHP application have been safely removed. Only public portfolio data is included in the frontend client bundle.
