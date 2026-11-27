import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { personalInfo } from '../src/data/personalInfo.js';
import { projectsData } from '../src/data/projects.js';
import { experienceData } from '../src/data/experience.js';
import { skillsData } from '../src/data/skills.js';
import { educationData } from '../src/data/education.js';
import { achievementsData } from '../src/data/achievements.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

console.log('[Prerender] Starting build-time static HTML generation...');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[Prerender] Error: dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexHtmlPath, 'utf-8');

// Find asset CSS and JS from dist/index.html to reuse in sub-pages
const cssMatch = template.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/);
const mainCssHref = cssMatch ? cssMatch[1] : '';
const currentYear = new Date().getFullYear();

/**
 * 1. Generate Semantic HTML for Homepage
 */
function generateHomepageHtml() {
  // Navigation
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about-me', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact-us', label: 'Contact' }
  ];

  const navHtml = `
    <header class="site-header">
      <nav class="navbar navbar-expand-lg nav-floating position-fixed w-100" aria-label="Primary Navigation">
        <div id="mainNavbar" class="container-fluid container-xxl nav-shell glass-panel border-primary" style="background-color: #0E122E">
          <a class="navbar-brand text-gradient" href="#hero">SUMIT RATHOR</a>
          <ul class="navbar-nav ms-auto align-items-lg-center gap-2 gap-lg-4 d-none d-lg-flex">
            ${navItems.map(n => `<li class="nav-item"><a class="nav-link hover-lift" href="#${n.id}">${n.label}</a></li>`).join('')}
          </ul>
        </div>
      </nav>
    </header>
  `;

  // Hero Section
  const heroHtml = `
    <section class="section hero-section container-xxl" id="hero" style="background-image: url('/assets/images/bg-dark.png')">
      <div class="hero-glow hero-glow-left"></div>
      <div class="hero-glow hero-glow-right"></div>
      <div class="content-shell">
        <div class="row align-items-center gy-5 position-relative">
          <div class="col-12 col-lg-6 hero-copy">
            <div class="eyebrow-chip mb-3">
              <span class="pulse-dot"></span>
              <p class="eyebrow-text">${personalInfo.role}</p>
            </div>
            <h1 class="hero-title mb-3">
              Hi, I’m <br />
              <span id="typing-text" class="gradient-text stop-cursor">${personalInfo.name}</span>
            </h1>
            <p class="hero-lead mb-4">${personalInfo.lead}</p>
            <div class="hero-tags mb-4">
              ${personalInfo.tags.map(t => `<span class="hero-tag">${t}</span>`).join('')}
            </div>
            <div class="hero-actions mb-4">
              <a href="${personalInfo.resumePath}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary-ghost hover-lift">Download Resume</a>
              <a href="#projects" class="btn btn-primary-gradient hover-lift">View Projects</a>
              <a href="#contact-us" class="btn btn-secondary-ghost hover-lift">Contact Me</a>
            </div>
            <div class="hero-social" aria-label="Social links">
              ${personalInfo.socialLinks.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hover-lift" aria-label="${s.name} Profile">
                  <i class="${s.icon}"></i>
                </a>
              `).join('')}
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex justify-content-end hero-visual">
            <div class="hero-portrait">
              <div class="portrait-frame">
                <img src="${personalInfo.heroImage}" alt="${personalInfo.name} - Full Stack Software Engineer portrait" width="540" height="540" fetchpriority="high" decoding="sync" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // About Section
  const aboutHtml = `
    <section class="section about-section container-xxl" id="about-me">
      <div class="section-heading text-center mb-4">
        <h2 class="mb-2">✨About Me✨</h2>
      </div>
      <div class="about-grid">
        <article class="about-card glass-panel hover-lift">
          <div>
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill" style="background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3)">
              <span class="pulse-dot" style="width: 8px; height: 8px"></span>
              <span style="font-size: 0.8rem; font-weight: 600; color: #38bdf8">Full Stack Developer</span>
            </div>
            <h3 class="mb-2" style="font-size: 1.45rem; font-weight: 700; line-height: 1.3">
              ${personalInfo.aboutHeading} <br />
              <span class="text-gradient">${personalInfo.aboutInstitution}</span>
            </h3>
            <p class="mb-3" style="font-size: 1rem; color: var(--text-primary); line-height: 1.55">${personalInfo.aboutSummary}</p>
            <div class="d-flex flex-wrap gap-2 pt-2 border-top border-secondary border-opacity-10 mb-3">
              ${personalInfo.aboutBadges.map(b => `
                <span class="badge px-3 py-2 rounded-pill" style="background: ${b.bg}; color: ${b.color}; font-size: 0.82rem; border: 1px solid ${b.border}">
                  <i class="${b.icon} me-1"></i> ${b.label}
                </span>
              `).join('')}
            </div>
            <a href="/about/" class="btn btn-sm btn-secondary-ghost hover-lift px-3 py-1">
              <i class="fa-solid fa-user-check me-1 text-info"></i> Full Profile &amp; Developer FAQ
            </a>
          </div>
        </article>
        <article class="about-profile glass-panel hover-lift">
          <div class="profile-header pb-3 border-bottom border-secondary border-opacity-10">
            <img src="${personalInfo.profileImage}" alt="Sumit Rathor - Profile Avatar" width="72" height="72" loading="lazy" decoding="async" style="box-shadow: 0 0 20px rgba(56, 189, 248, 0.3)" />
            <div>
              <span class="badge rounded-pill bg-success bg-opacity-25 text-success border border-success border-opacity-25 mb-2 px-3 py-1" style="font-size: 0.72rem">
                <i class="fa-solid fa-circle text-success me-1" style="font-size: 0.55rem"></i> ${personalInfo.status}
              </span>
              <h3 class="mb-0" style="font-size: 1.25rem">${personalInfo.name}</h3>
              <p class="subtitle mb-0" style="font-size: 0.85rem">Software Engineer &amp; Builder</p>
            </div>
          </div>
          <div class="profile-stats pt-2">
            ${personalInfo.stats.map(s => `
              <div class="stat-box p-3 rounded-4 text-center d-flex flex-column align-items-center justify-content-center gap-2" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08)">
                <i class="${s.icon} ${s.colorClass}" style="font-size: 1.35rem"></i>
                <p class="value mb-0 ${s.colorClass}" style="font-size: 1.65rem; font-weight: 800; line-height: 1.1">${s.value}</p>
                <p class="label mb-0" style="font-size: 0.74rem; color: #cbd5e1">${s.label}</p>
              </div>
            `).join('')}
          </div>
        </article>
      </div>
    </section>
  `;

  // Experience Section
  const experienceHtml = `
    <section class="section experience-section container-xxl" id="experience">
      <div class="section-heading text-center mb-4">
        <h2 class="mb-2">✨Experience✨</h2>
      </div>
      <div class="experience-grid">
        ${experienceData.map(exp => `
          <article class="experience-card glass-panel hover-lift" style="margin-inline: 0.75rem">
            <div class="d-flex flex-column justify-content-between h-100 gap-3">
              <div>
                <div class="experience-card__header mb-2.5">
                  <div class="company-logo-wrap">
                    <span class="company-logo-placeholder">${exp.initials}</span>
                  </div>
                  <div class="flex-grow-1">
                    <h3 class="experience-role mb-0.5">${exp.role}</h3>
                    <p class="experience-company mb-1">${exp.company}</p>
                    <div class="experience-meta">
                      <span class="date-badge"><i class="fa-regular fa-calendar text-info"></i> ${exp.period}</span>
                      ${exp.work_mode ? `<span class="mode-badge"><i class="fa-solid fa-house-laptop me-1"></i> ${exp.work_mode}</span>` : ''}
                    </div>
                  </div>
                </div>
                <div class="tech-stack my-2.5">
                  ${(exp.stack || []).map(t => `<span class="tech-pill"><i class="fa-solid fa-code text-gradient" style="font-size: 0.65rem"></i> ${t}</span>`).join('')}
                </div>
                <ul class="experience-points mt-2">
                  ${(exp.bullets || []).map(b => `<li>${b}</li>`).join('')}
                </ul>
              </div>
              ${(exp.certificate_path || exp.company_website) ? `
                <div class="d-flex flex-wrap gap-2 pt-2 border-top border-secondary border-opacity-10 mt-2">
                  ${exp.certificate_path ? `<a href="${exp.certificate_path}" class="btn btn-sm btn-secondary-ghost hover-lift py-1 px-3" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-certificate me-1 text-warning"></i> Certificate</a>` : ''}
                  ${exp.company_website ? `<a href="${exp.company_website}" class="btn btn-sm btn-primary-gradient hover-lift py-1 px-3" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-globe me-1"></i> Website</a>` : ''}
                </div>
              ` : ''}
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;

  // Projects Section
  const projectsHtml = `
    <section class="section projects-section container-xxl" id="projects">
      <div class="section-heading text-center mb-4">
        <h2 class="mb-2">✨Featured Projects✨</h2>
      </div>
      <div class="projects-grid">
        ${projectsData.map(p => `
          <article class="project-card glass-panel hover-lift" style="margin-inline: 0.75rem">
            <div class="project-card__visual">
              <img src="${p.image}" alt="${p.title} screenshot" class="project-card__img" loading="lazy" decoding="async" width="600" height="356" />
              ${p.date ? `<span class="project-date-badge"><i class="fa-regular fa-calendar me-1"></i> ${p.date}</span>` : ''}
            </div>
            <div class="project-card__body">
              <div>
                <h3 class="project-card__title">${p.title}</h3>
                ${p.subtitle ? `<div class="project-card__subtitle">${p.subtitle}</div>` : ''}
                <p class="project-card__description">${p.description}</p>
                <div class="project-stack-wrap">
                  ${(p.stack || []).map(s => `<span class="project-tech-pill">${s}</span>`).join('')}
                </div>
              </div>
              <div class="project-card__actions">
                ${p.slug ? `<a href="/projects/${p.slug}/" class="project-btn project-btn-details hover-lift"><i class="fa-solid fa-circle-info"></i> Case Study</a>` : ''}
                ${p.github ? `<a href="${p.github}" class="project-btn project-btn-ghost hover-lift" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> GitHub</a>` : ''}
                ${p.live ? `<a href="${p.live}" class="project-btn project-btn-primary hover-lift" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;

  // Skills Section
  const skillsHtml = `
    <section class="section skills-section container-xxl" id="skills">
      <div class="section-heading text-center mb-5">
        <h2 class="mb-3">✨Skills & Technologies✨</h2>
      </div>
      <div class="row g-4" style="margin-inline: 0.75rem">
        ${Object.entries(skillsData).map(([group, list]) => `
          <div class="col-12 col-md-6 col-lg-4" style="padding-right: 0.5rem; padding-left: 0.5rem">
            <article class="skill-card glass-panel hover-lift h-100">
              <h3 class="mb-3 d-flex align-items-center gap-2">
                <i class="fa-solid fa-layer-group text-gradient" style="font-size: 1rem"></i> ${group}
              </h3>
              <div class="skill-chips">
                ${list.map(s => `
                  <span class="skill-chip hover-lift">
                    <i class="${s.icon}"></i>
                    <span>${s.name}</span>
                  </span>
                `).join('')}
              </div>
            </article>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  // Education Section
  const educationHtml = `
    <section class="section education-section container-xxl" id="education">
      <div class="section-heading text-center mb-4">
        <h2 class="mb-2">✨Education✨</h2>
      </div>
      <div class="education-grid">
        ${educationData.map(e => `
          <article class="education-card glass-panel hover-lift" style="margin-inline: 0.75rem">
            <div class="d-flex flex-column justify-content-between h-100 gap-2">
              <div>
                <div class="education-card__top">
                  <span class="education-card__duration"><i class="fa-regular fa-calendar text-info"></i> ${e.timeline}</span>
                  ${e.score ? `
                    <span class="education-score-badge">
                      <i class="fa-solid fa-award text-warning me-1" style="font-size: 0.75rem"></i>
                      <span class="score-val">${e.scoreVal}</span>
                      ${e.scoreLbl ? `<span class="score-lbl">${e.scoreLbl}</span>` : ''}
                    </span>
                  ` : ''}
                </div>
                <h3 class="education-program"><i class="fa-solid fa-graduation-cap text-gradient me-1.5" style="font-size: 1rem"></i> ${e.program}</h3>
                <p class="education-institution"><i class="fa-solid fa-building-columns text-secondary mt-1 flex-shrink-0" style="font-size: 0.8rem"></i> <span>${e.institution}</span></p>
              </div>
              ${(e.focus && e.focus.length > 0) ? `
                <div class="coursework-wrap">
                  <span class="coursework-label"><i class="fa-solid fa-book-open text-primary" style="font-size: 0.65rem"></i> Key Coursework</span>
                  <div class="coursework-chips">
                    ${e.focus.map(f => `<span class="coursework-chip">${f}</span>`).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;

  // Achievements Section
  const achievementsHtml = `
    <section class="section achievements-section container-xxl" id="achievements">
      <div class="section-heading text-center mb-4">
        <h2 class="mb-2">✨Achievements✨</h2>
      </div>
      <div class="achievements-grid">
        ${achievementsData.map(a => `
          <article class="achievement-card glass-panel hover-lift" style="margin-inline: 0.75rem">
            <div>
              <div class="achievement-card__top">
                <div class="achievement-icon"><i class="${a.icon}"></i></div>
                ${a.category ? `<span class="achievement-meta-badge">${a.category}</span>` : ''}
              </div>
              <h3 class="achievement-title">${a.title}</h3>
              ${a.organization ? `<p class="achievement-org"><i class="fa-solid fa-building text-info me-1" style="font-size: 0.72rem"></i> ${a.organization}</p>` : ''}
              ${a.description ? `<p class="achievement-description">${a.description}</p>` : ''}
            </div>
            ${(a.date || a.certificate_url) ? `
              <div class="achievement-card__footer">
                ${a.date ? `<span class="achievement-date"><i class="fa-regular fa-calendar me-1 text-primary"></i> ${a.date}</span>` : ''}
                ${a.certificate_url ? `<a href="${a.certificate_url}" class="achievement-btn hover-lift" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i> Certificate</a>` : ''}
              </div>
            ` : ''}
          </article>
        `).join('')}
      </div>
    </section>
  `;

  // Contact Section
  const contactHtml = `
    <section class="section contact-section container-xxl" id="contact-us">
      <div class="section-heading text-center mb-4">
        <p class="eyebrow">Contact</p>
        <h2 class="mb-2">Let's Build Something Together</h2>
        <p class="subtitle mx-auto" style="max-width: 620px">Have a project, opportunity, or idea? Let's talk.</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info glass-panel hover-lift" style="margin-inline: 0.75rem">
          <div class="contact-info-items">
            <div class="info-item">
              <div class="info-item-icon"><i class="fa-solid fa-envelope"></i></div>
              <div class="info-item-content">
                <span class="info-item-label">Email</span>
                <p class="info-item-value"><a href="mailto:${personalInfo.email}">${personalInfo.email}</a></p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-icon"><i class="fa-solid fa-location-dot"></i></div>
              <div class="info-item-content">
                <span class="info-item-label">Location</span>
                <p class="info-item-value">${personalInfo.location}</p>
              </div>
            </div>
            ${personalInfo.responseTime ? `
            <div class="info-item">
              <div class="info-item-icon"><i class="fa-solid fa-bolt"></i></div>
              <div class="info-item-content">
                <span class="info-item-label">Response Time</span>
                <p class="info-item-value" style="color: #38bdf8; font-weight: 700">${personalInfo.responseTime}</p>
              </div>
            </div>` : ''}
          </div>
          <div>
            <a href="${personalInfo.resumePath}" class="btn btn-secondary-ghost hover-lift w-100 mb-3 py-2" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem">
              <i class="fa-solid fa-download me-1.5 text-primary"></i> Download Resume
            </a>
            <div class="contact-social-row">
              ${personalInfo.socialLinks.map(s => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="contact-social-btn" aria-label="${s.name}" title="${s.name}">
                  <i class="${s.icon}"></i>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
        <form class="contact-form glass-panel hover-lift" style="margin-inline: 0.75rem" action="mailto:${personalInfo.email}" method="POST" enctype="text/plain">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label for="user_name" class="form-label">Name <span>*</span></label>
              <input type="text" id="user_name" name="user_name" placeholder="Your name" required />
            </div>
            <div class="col-12 col-md-6">
              <label for="user_email" class="form-label">Email <span>*</span></label>
              <input type="email" id="user_email" name="user_email" placeholder="you@example.com" required />
            </div>
            <div class="col-12">
              <label for="user_message" class="form-label">Message <span>*</span></label>
              <textarea id="user_message" name="user_message" rows="4" placeholder="Write your message here..." required></textarea>
            </div>
          </div>
          <button type="submit" class="btn btn-primary-gradient w-100 mt-3 py-2.5 hover-lift">
            <i class="fa-solid fa-paper-plane me-1.5"></i> Send Message
          </button>
        </form>
      </div>
    </section>
  `;

  // Footer
  const currentYear = new Date().getFullYear();
  const footerHtml = `
    <footer class="footer-minimal">
      <div class="container-xxl">
        <div class="footer-minimal__inner">
          <div class="footer-minimal__left">
            <p class="footer-minimal__copy">&copy; ${currentYear} <span class="footer-minimal__name">${personalInfo.name}</span></p>
            <p class="footer-minimal__role">${personalInfo.role}</p>
          </div>
          <div class="footer-minimal__center">
            ${personalInfo.socialLinks.map(s => `
              <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="footer-minimal__link" aria-label="${s.name}">
                <i class="${s.icon}"></i> ${s.name}
              </a>
            `).join('')}
            <a href="${personalInfo.resumePath}" target="_blank" rel="noopener noreferrer" class="footer-minimal__link footer-minimal__link--resume">Resume &rarr;</a>
          </div>
          <div class="footer-minimal__right">
            <a href="#hero" class="footer-minimal__top-btn">&uarr; Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // Developer Activity Section (for crawler visibility)
  const developerActivityHtml = `
    <section class="section developer-activity-section container-xxl" id="developer-activity">
      <div class="section-heading text-center mb-4">
        <p class="eyebrow">Engineering Profiles</p>
        <h2 class="mb-2 dev-activity-heading">💻 Developer Activity &amp; Repositories 💻</h2>
        <p class="subtitle mx-auto" style="max-width: 640px">
          Explore open-source contributions, verified GitHub projects, and algorithmic problem-solving profiles.
        </p>
      </div>
      <div class="row g-4 mb-4">
        <div class="col-12 col-md-6">
          <div class="dev-profile-card glass-panel h-100">
            <h3 class="mb-1 fw-bold">GitHub Developer Profile (@sumitrathor1)</h3>
            <p class="dev-profile-desc mb-3">
              Building open-source developer utilities, RAG workflows, and full-stack systems. Project Admin for GirlScript Summer of Code 2025.
            </p>
            <a href="https://github.com/sumitrathor1" target="_blank" rel="noopener noreferrer" class="text-info">github.com/sumitrathor1</a>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="dev-profile-card glass-panel h-100">
            <h3 class="mb-1 fw-bold">LeetCode Problem Solving (@SumitRathor)</h3>
            <p class="dev-profile-desc mb-3">
              Practicing Core Data Structures, Algorithms, Dynamic Programming, Graph Theory, and System Design patterns in C++ and Python.
            </p>
            <a href="https://leetcode.com/u/SumitRathor/" target="_blank" rel="noopener noreferrer" class="text-warning">leetcode.com/u/SumitRathor</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return `
    <div id="content">
      ${navHtml}
      <main id="main-content">
        ${heroHtml}
        ${aboutHtml}
        ${experienceHtml}
        ${developerActivityHtml}
        ${projectsHtml}
        ${skillsHtml}
        ${educationHtml}
        ${achievementsHtml}
        ${contactHtml}
      </main>
      ${footerHtml}
      <div class="end-line"></div>
    </div>
  `;
}

// Inject semantic HTML into dist/index.html
const homepageHtml = generateHomepageHtml();
const prerenderedIndexHtml = template.replace('<div id="root"></div>', `<div id="root">${homepageHtml}</div>`);
fs.writeFileSync(indexHtmlPath, prerenderedIndexHtml, 'utf-8');
console.log(`[Prerender] Injected full semantic HTML into dist/index.html (${prerenderedIndexHtml.length} bytes)`);

/**
 * 2. Generate Dedicated Project Detail Pages at dist/projects/<slug>/index.html
 */
const projectsOutputDir = path.join(distDir, 'projects');
if (!fs.existsSync(projectsOutputDir)) {
  fs.mkdirSync(projectsOutputDir, { recursive: true });
}

projectsData.forEach((project) => {
  if (!project.slug) return;

  const projectDir = path.join(projectsOutputDir, project.slug);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  const projectUrl = `https://sumitrathor.vercel.app/projects/${project.slug}/`;
  const projectTitle = `${project.title} | Sumit Rathor Project Case Study`;
  const projectDesc = project.description.replace(/"/g, '&quot;');
  const projectKeywords = [
    project.title,
    'Sumit Rathor',
    'Sumit Rathor Projects',
    ...(project.stack || []),
    'Case Study'
  ].join(', ').replace(/"/g, '&quot;');
  const relatedProjects = projectsData
    .filter((p) => p.slug && p.slug !== project.slug)
    .slice(0, 3);

  const projectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#0a58ca" />
    <title>${projectTitle}</title>
    <meta name="description" content="${projectDesc}" />
    <meta name="keywords" content="${projectKeywords}" />
    <meta name="author" content="Sumit Rathor" />
    <link rel="canonical" href="${projectUrl}" />
    <meta property="og:title" content="${projectTitle}" />
    <meta property="og:description" content="${projectDesc}" />
    <meta property="og:url" content="${projectUrl}" />
    <meta property="og:image" content="https://sumitrathor.vercel.app${project.image}" />
    <meta property="og:site_name" content="Sumit Rathor Portfolio" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${projectTitle}" />
    <meta name="twitter:description" content="${projectDesc}" />
    <meta name="twitter:image" content="https://sumitrathor.vercel.app${project.image}" />
    
    <!-- CDNs -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    ${mainCssHref ? `<link rel="stylesheet" crossorigin href="${mainCssHref}">` : ''}

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "${project.title.replace(/"/g, '\\"')}",
          "description": "${project.description.replace(/"/g, '\\"')}",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web, Cross-platform",
          "image": "https://sumitrathor.vercel.app${project.image}",
          "keywords": "${(project.stack || []).join(', ').replace(/"/g, '\\"')}",
          ${project.github ? `"codeRepository": "${project.github}",` : ''}
          "author": {
            "@type": "Person",
            "@id": "https://sumitrathor.vercel.app/#person",
            "name": "Sumit Rathor",
            "url": "https://sumitrathor.vercel.app/",
            "sameAs": [
              "https://www.linkedin.com/in/sumitrathor/",
              "https://github.com/sumitrathor1",
              "https://leetcode.com/u/SumitRathor/"
            ]
          },
          "url": "${projectUrl}"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://sumitrathor.vercel.app/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Projects",
              "item": "https://sumitrathor.vercel.app/#projects"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "${project.title.replace(/"/g, '\\"')}",
              "item": "${projectUrl}"
            }
          ]
        }
      ]
    }
    </script>
</head>
<body class="portfolio-site" style="background-color: #010313; background-image: url('/assets/images/bg-dark1.png'); background-repeat: repeat; background-position: 0 0; background-size: auto; color: #f8f9ff;">
    <!-- Navigation Bar -->
    <header class="site-header">
      <nav class="navbar navbar-expand-lg nav-floating position-fixed w-100">
        <div id="mainNavbar" class="container-fluid container-xxl nav-shell glass-panel border-primary" style="background-color: #0E122E">
          <a class="navbar-brand text-gradient" href="/">SUMIT RATHOR</a>
          <div class="ms-auto d-flex align-items-center gap-3">
            <a href="/about/" class="btn btn-sm btn-secondary-ghost hover-lift py-1 px-3 d-none d-sm-inline-flex" style="font-size: 0.85rem">About</a>
            <a href="/#projects" class="btn btn-sm btn-secondary-ghost hover-lift py-1 px-3" style="font-size: 0.85rem">
              <i class="fa-solid fa-arrow-left me-1"></i> Back to Portfolio
            </a>
          </div>
        </div>
      </nav>
    </header>

    <main class="container-xxl" style="padding-top: clamp(6rem, 10vw, 8rem); padding-bottom: 5rem; min-height: 85vh;">
      <article class="content-shell" style="max-width: 900px; margin-inline: auto;">
        <nav aria-label="Breadcrumb" class="mb-3 text-center">
          <ol class="breadcrumb justify-content-center mb-0 small" style="background: transparent;">
            <li class="breadcrumb-item"><a href="/" class="text-info text-decoration-none">Home</a></li>
            <li class="breadcrumb-item"><a href="/#projects" class="text-info text-decoration-none">Projects</a></li>
            <li class="breadcrumb-item active text-light" aria-current="page">${project.title}</li>
          </ol>
        </nav>
        <!-- Header -->
        <div class="mb-4 text-center">
          <div class="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill" style="background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3)">
            <span class="pulse-dot" style="width: 8px; height: 8px"></span>
            <span style="font-size: 0.8rem; font-weight: 600; color: #38bdf8">${project.date || 'Featured Project'}</span>
          </div>
          <h1 class="hero-title mb-2" style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 700;">${project.title}</h1>
          ${project.subtitle ? `<p class="subtitle mx-auto" style="font-size: 1.1rem; color: #38bdf8; max-width: 700px;">${project.subtitle}</p>` : ''}
        </div>

        <!-- Banner Visual -->
        <div class="glass-panel p-2 mb-4 hover-lift" style="border-radius: 20px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.1);">
          <img src="${project.image}" alt="${project.title} screenshot preview" style="width: 100%; border-radius: 16px; aspect-ratio: 16 / 9; object-fit: cover;" />
        </div>

        <!-- Tech Stack -->
        <div class="glass-panel p-3 mb-4 text-center">
          <p class="mb-2" style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: #9facd8; font-weight: 600;">Technology Stack</p>
          <div class="d-flex flex-wrap justify-content-center gap-2">
            ${(project.stack || []).map(s => `<span class="badge px-3 py-2 rounded-pill" style="background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.85rem; color: #f8f9ff;"><i class="fa-solid fa-code text-gradient me-1.5"></i>${s}</span>`).join('')}
          </div>
        </div>

        <!-- Overview & Problem -->
        <div class="row g-4 mb-4">
          <div class="col-12 col-md-6">
            <div class="glass-panel p-4 h-100 hover-lift">
              <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: #38bdf8;">
                <i class="fa-solid fa-circle-question me-2"></i> Problem Statement
              </h2>
              <p style="font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">${project.problem || project.description}</p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="glass-panel p-4 h-100 hover-lift">
              <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.75rem; color: #a855f7;">
                <i class="fa-solid fa-microchip me-2"></i> Technical Architecture
              </h2>
              <p style="font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">${project.architecture || 'Engineered with clean code practices, responsive cross-device layout principles, and performant asynchronous client-server workflows.'}</p>
            </div>
          </div>
        </div>

        <!-- Features -->
        ${(project.features && project.features.length > 0) ? `
          <div class="glass-panel p-4 mb-4 hover-lift">
            <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: #f8f9ff;">
              <i class="fa-solid fa-star text-warning me-2"></i> Key Implemented Features
            </h2>
            <ul style="padding-left: 1.25rem; margin-bottom: 0;">
              ${project.features.map(f => `<li style="margin-bottom: 0.6rem; font-size: 0.95rem; color: #cbd5e1; line-height: 1.55;">${f}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Actions -->
        <div class="d-flex flex-wrap justify-content-center gap-3 pt-3 mb-5">
          ${project.live ? `
            <a href="${project.live}" class="btn btn-primary-gradient px-4 py-2 hover-lift" target="_blank" rel="noopener noreferrer" style="font-weight: 600;">
              <i class="fa-solid fa-arrow-up-right-from-square me-2"></i> Open Live Platform
            </a>
          ` : ''}
          ${project.github ? `
            <a href="${project.github}" class="btn btn-secondary-ghost px-4 py-2 hover-lift" target="_blank" rel="noopener noreferrer" style="font-weight: 600;">
              <i class="fa-brands fa-github me-2"></i> View Source on GitHub
            </a>
          ` : ''}
          <a href="/#contact-us" class="btn btn-secondary-ghost px-4 py-2 hover-lift" style="font-weight: 600;">
            <i class="fa-solid fa-envelope me-2"></i> Discuss this Project
          </a>
        </div>

        <!-- Related Projects Internal Links -->
        <section class="glass-panel p-4" aria-label="More Projects">
          <h2 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem; color: #f8f9ff;">More Engineering Projects by Sumit Rathor</h2>
          <div class="row g-3">
            ${relatedProjects.map(rp => `
              <div class="col-12 col-md-4">
                <a href="/projects/${rp.slug}/" class="d-block p-3 rounded-3 text-decoration-none h-100" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);">
                  <div class="fw-bold text-info mb-1" style="font-size: 0.92rem;">${rp.title}</div>
                  <div style="font-size: 0.8rem; color: #cbd5e1;">${rp.subtitle || ''}</div>
                </a>
              </div>
            `).join('')}
          </div>
        </section>
      </article>
    </main>

    <footer class="footer-minimal">
      <div class="container-xxl text-center py-3">
        <p class="mb-0" style="font-size: 0.85rem; color: #9facd8;">
          &copy; ${currentYear} Sumit Rathor · <a href="/" class="text-gradient" style="text-decoration: none;">Home</a> · <a href="/about/" class="text-info" style="text-decoration: none;">About &amp; FAQ</a>
        </p>
      </div>
    </footer>
</body>
</html>`;

  fs.writeFileSync(path.join(projectDir, 'index.html'), projectHtml, 'utf-8');
  console.log(`[Prerender] Created static project page: dist/projects/${project.slug}/index.html`);
});

/**
 * 3. Generate Dedicated Static /about/index.html Page for AEO / GEO / Entity Clarity
 */
const aboutOutputDir = path.join(distDir, 'about');
if (!fs.existsSync(aboutOutputDir)) {
  fs.mkdirSync(aboutOutputDir, { recursive: true });
}

const aboutFaqItems = [
  {
    q: 'Who is Sumit Rathor?',
    a: 'Sumit Rathor (also known as Sumit Rathore) is a Full Stack Software Engineer pursuing a B.Tech in Computer Science & Design at Madhav Institute of Technology & Science (MITS), Gwalior (CGPA 8.09). He specializes in React.js, Next.js, TypeScript, Node.js, Python, PHP, MySQL, C++, and offline AI/RAG systems.'
  },
  {
    q: 'What did Sumit Rathor build during his DRDO internship?',
    a: 'During his research internship at DRDO-CFEES (Centre for Fire, Explosive and Environment Safety, Ministry of Defence, Delhi) from June to August 2026 under Scientist \'F\' Sh. Trilochan Singh Rathore, Sumit built Rakshak AI (Enterprise Local Knowledge Assistant) — a 100% offline, air-gapped Retrieval-Augmented Generation (RAG) system using Python, Streamlit, LangChain, Ollama, ChromaDB, and PyPDF.'
  },
  {
    q: 'What is Rakshak AI?',
    a: 'Rakshak AI is an air-gapped, offline Retrieval-Augmented Generation (RAG) knowledge assistant built for DRDO-CFEES that enables engineers and researchers to semantically search internal technical manuals and PDFs locally with zero external internet or cloud API dependencies.'
  },
  {
    q: 'What are Sumit Rathor\'s key technical skills?',
    a: 'Sumit works across Frontend (React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap 5), Backend (Node.js, Express.js, PHP, CodeIgniter 4, REST APIs, WebSockets, Supabase), AI & RAG (LangChain, Ollama, ChromaDB, Streamlit, Vector Embeddings), Databases (MySQL, PostgreSQL), and Core CS (C++, Python, Data Structures and Algorithms, System Design).'
  },
  {
    q: 'What are Sumit Rathor\'s major projects?',
    a: 'His notable projects include Rakshak AI (DRDO offline RAG assistant), Hardware Inventory & Borrowing Portal (Next.js + Supabase RLS), Certificate Authentication & Verification Portal (React + PDF.js + QR scanning), 11acre.ai & 36 Broking Hub (PropTech platforms), FPV Surveillance Robot (ESP32-CAM IoT), Smart Resume (AI Resume Builder), Data Science Quiz Platform, VibeTune, and JEE & NEET Prep Tracker.'
  },
  {
    q: 'What open-source and leadership roles has Sumit Rathor held?',
    a: 'Sumit served as a Project Administrator for GirlScript Summer of Code (GSSoC) 2025, President of the Innovation & DIY Club at MITS Gwalior (Feb 2026 – Sep 2026), and achieved Google Cloud Arcade Legend Tier (Phase 1, 2025).'
  },
  {
    q: 'What is Sumit Rathor\'s educational background?',
    a: 'He is pursuing a B.Tech in Computer Science & Design at MITS Gwalior (2024–2027, CGPA 8.09), following a Diploma in Computer Science & Engineering from Dr. B.R. Ambedkar Polytechnic College, Gwalior (2021–2024, CGPA 8.42).'
  },
  {
    q: 'Where can I find Sumit Rathor\'s GitHub, LinkedIn, and projects?',
    a: 'His official GitHub is github.com/sumitrathor1, LinkedIn is linkedin.com/in/sumitrathor, LeetCode is leetcode.com/u/SumitRathor, and portfolio is sumitrathor.vercel.app.'
  }
];

const aboutPageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#0a58ca" />
    <title>About Sumit Rathor | Full Stack Developer, DRDO Intern &amp; MITS Gwalior</title>
    <meta name="description" content="Complete developer profile, biography, education, DRDO CFEES internship, Rakshak AI, open-source leadership (GSSoC 2025), and FAQ about Sumit Rathor (Sumit Rathore), Full Stack Software Engineer at MITS Gwalior." />
    <meta name="keywords" content="Who is Sumit Rathor, Sumit Rathor About, Sumit Rathor MITS Gwalior, Sumit Rathor DRDO Internship, Rakshak AI, GirlScript Summer of Code 2025 Project Admin, Innovation and DIY Club President, Google Cloud Arcade Legend" />
    <meta name="author" content="Sumit Rathor" />
    <link rel="canonical" href="https://sumitrathor.vercel.app/about/" />
    <meta property="og:title" content="About Sumit Rathor | Full Stack Software Engineer &amp; AI Builder" />
    <meta property="og:description" content="Learn about Sumit Rathor's education at MITS Gwalior, DRDO CFEES research internship, Rakshak AI, GSSoC 2025 leadership, technical skills, and verified projects." />
    <meta property="og:url" content="https://sumitrathor.vercel.app/about/" />
    <meta property="og:image" content="https://sumitrathor.vercel.app/assets/images/thumbnail.png" />
    <meta property="og:site_name" content="Sumit Rathor Portfolio" />
    <meta property="og:type" content="profile" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About Sumit Rathor | Full Stack Software Engineer" />
    <meta name="twitter:description" content="Verified profile, DRDO internship, Rakshak AI, skills, and FAQ for Sumit Rathor." />
    <meta name="twitter:image" content="https://sumitrathor.vercel.app/assets/images/thumbnail.png" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    ${mainCssHref ? `<link rel="stylesheet" crossorigin href="${mainCssHref}">` : ''}

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://sumitrathor.vercel.app/about/#profilepage",
          "url": "https://sumitrathor.vercel.app/about/",
          "name": "About Sumit Rathor | Full Stack Developer & DRDO Intern",
          "mainEntity": {
            "@type": "Person",
            "@id": "https://sumitrathor.vercel.app/#person",
            "name": "Sumit Rathor",
            "alternateName": ["Sumit Rathore", "Sumit Kumar Rathor"],
            "url": "https://sumitrathor.vercel.app/",
            "image": "https://sumitrathor.vercel.app/assets/images/sumit.jpg",
            "jobTitle": "Full Stack Software Engineer",
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "Madhav Institute of Technology & Science (MITS), Gwalior"
            },
            "sameAs": [
              "https://www.linkedin.com/in/sumitrathor/",
              "https://github.com/sumitrathor1",
              "https://leetcode.com/u/SumitRathor/",
              "https://sumitrathor.rf.gd/"
            ]
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sumitrathor.vercel.app/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://sumitrathor.vercel.app/about/" }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": ${JSON.stringify(aboutFaqItems.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a
            }
          })))}
        }
      ]
    }
    </script>
</head>
<body class="portfolio-site" style="background-color: #010313; background-image: url('/assets/images/bg-dark1.png'); background-repeat: repeat; color: #f8f9ff;">
    <header class="site-header">
      <nav class="navbar navbar-expand-lg nav-floating position-fixed w-100">
        <div id="mainNavbar" class="container-fluid container-xxl nav-shell glass-panel border-primary" style="background-color: #0E122E">
          <a class="navbar-brand text-gradient" href="/">SUMIT RATHOR</a>
          <div class="ms-auto d-flex align-items-center gap-3">
            <a href="/#projects" class="btn btn-sm btn-secondary-ghost hover-lift py-1 px-3 d-none d-sm-inline-flex" style="font-size: 0.85rem">Projects</a>
            <a href="/" class="btn btn-sm btn-secondary-ghost hover-lift py-1 px-3" style="font-size: 0.85rem">
              <i class="fa-solid fa-arrow-left me-1"></i> Back to Portfolio
            </a>
          </div>
        </div>
      </nav>
    </header>

    <main class="container-xxl" style="padding-top: clamp(6rem, 10vw, 8rem); padding-bottom: 5rem;">
      <article class="content-shell" style="max-width: 920px; margin-inline: auto;">
        <nav aria-label="Breadcrumb" class="mb-3">
          <ol class="breadcrumb mb-0 small">
            <li class="breadcrumb-item"><a href="/" class="text-info text-decoration-none">Home</a></li>
            <li class="breadcrumb-item active text-light" aria-current="page">About Sumit Rathor</li>
          </ol>
        </nav>

        <header class="glass-panel p-4 mb-4">
          <h1 class="hero-title mb-2" style="font-size: clamp(1.85rem, 4vw, 2.75rem); font-weight: 700;">
            About <span class="text-gradient">Sumit Rathor</span>
          </h1>
          <p class="mb-3" style="font-size: 1.05rem; color: #e2e8f0; line-height: 1.65;">
            Sumit Rathor is a Full Stack Software Engineer and B.Tech Computer Science &amp; Design student at Madhav Institute of Technology &amp; Science (MITS), Gwalior (CGPA 8.09). He builds scalable full-stack web applications, offline Retrieval-Augmented Generation (RAG) AI tools, real-time systems, and embedded IoT platforms.
          </p>
          <div class="d-flex flex-wrap gap-2">
            <a href="https://github.com/sumitrathor1" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary-ghost px-3 py-1">GitHub (@sumitrathor1)</a>
            <a href="https://www.linkedin.com/in/sumitrathor/" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary-ghost px-3 py-1">LinkedIn</a>
            <a href="https://leetcode.com/u/SumitRathor/" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary-ghost px-3 py-1">LeetCode</a>
            <a href="/#contact-us" class="btn btn-sm btn-primary-gradient px-3 py-1">Contact Sumit</a>
          </div>
        </header>

        <section class="glass-panel p-4 mb-4" aria-label="Frequently Asked Questions">
          <h2 class="mb-3" style="font-size: 1.4rem; font-weight: 700; color: #38bdf8;">Developer Profile &amp; Frequently Asked Questions</h2>
          <div class="d-flex flex-column gap-3">
            ${aboutFaqItems.map(item => `
              <div class="p-3 rounded-3" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);">
                <h3 style="font-size: 1.02rem; font-weight: 700; color: #f8f9ff; margin-bottom: 0.4rem;">${item.q}</h3>
                <p class="mb-0" style="font-size: 0.94rem; color: #cbd5e1; line-height: 1.6;">${item.a}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="glass-panel p-4" aria-label="Project Case Studies">
          <h2 class="mb-3" style="font-size: 1.35rem; font-weight: 700; color: #a855f7;">Verified Engineering Case Studies</h2>
          <div class="row g-3">
            ${projectsData.filter(p => p.slug).map(p => `
              <div class="col-12 col-md-6">
                <a href="/projects/${p.slug}/" class="d-block p-3 rounded-3 text-decoration-none h-100" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);">
                  <div class="fw-bold text-info mb-1">${p.title}</div>
                  <div class="small" style="color: #cbd5e1;">${p.subtitle || p.description.slice(0, 100)}</div>
                </a>
              </div>
            `).join('')}
          </div>
        </section>
      </article>
    </main>

    <footer class="footer-minimal">
      <div class="container-xxl text-center py-3">
        <p class="mb-0" style="font-size: 0.85rem; color: #9facd8;">
          &copy; ${currentYear} Sumit Rathor · <a href="/" class="text-gradient" style="text-decoration: none;">Return to Home Portfolio</a>
        </p>
      </div>
    </footer>
</body>
</html>`;

fs.writeFileSync(path.join(aboutOutputDir, 'index.html'), aboutPageHtml, 'utf-8');
console.log('[Prerender] Created static about & FAQ page: dist/about/index.html');

console.log('[Prerender] Static HTML generation complete!');
