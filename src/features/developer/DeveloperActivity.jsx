import React, { useState } from 'react';
import { features } from '../../config/features';
import { personalInfo } from '../../data/personalInfo';
import { trackSocialClick } from '../../utils/analytics';

export default function DeveloperActivity() {
  if (!features.developerActivity) return null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleSharePortfolio = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sumit Rathor - Full Stack Software Engineer',
          text: 'Check out Sumit Rathor’s portfolio: Full Stack Developer, AI & Systems Engineer.',
          url: personalInfo.canonicalDomain || window.location.href
        });
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: Copy URL to clipboard
      try {
        await navigator.clipboard.writeText(personalInfo.canonicalDomain || window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2200);
      } catch {
        // Fallback
      }
    }
  };

  const handleCopyGithub = async () => {
    try {
      await navigator.clipboard.writeText('https://github.com/sumitrathor1');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Fallback
    }
  };

  const repositories = [
    {
      name: 'Rakshak-AI-Ragbot',
      desc: '100% offline, air-gapped RAG system for querying local technical PDF documentation using Ollama, LangChain & ChromaDB.',
      lang: 'Python',
      langColor: '#3572A5',
      stars: 'DRDO',
      url: 'https://github.com/sumitrathor1/Rakshak-AI-Ragbot'
    },
    {
      name: 'FPV_Car',
      desc: 'Real-time FPV surveillance robot with sub-second Wi-Fi video streaming and teleoperation via ESP32-CAM and L298N.',
      lang: 'C++',
      langColor: '#f34b7d',
      stars: 'IoT',
      url: 'https://github.com/sumitrathor1/FPV_Car'
    },
    {
      name: 'Data-Science-Quiz',
      desc: 'Full-stack assessment platform benchmarked on Python, ML, and statistics with instructor performance dashboards.',
      lang: 'PHP',
      langColor: '#4F5D95',
      stars: 'Full Stack',
      url: 'https://github.com/sumitrathor1/Data-Science-Quiz'
    },
    {
      name: 'bitBrief',
      desc: 'Fast URL shortener engine with duplicate hash prevention, MySQL persistence, and automated GitHub Actions CI/CD.',
      lang: 'JavaScript',
      langColor: '#f1e05a',
      stars: 'CI/CD',
      url: 'https://github.com/sumitrathor1/bitBrief'
    }
  ];

  return (
    <section className="section developer-activity-section container-xxl" id="developer-activity">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <p className="eyebrow">Engineering Profiles</p>
        <h2 className="mb-2 dev-activity-heading">💻 Developer Activity & Repositories 💻</h2>
        <p className="subtitle mx-auto" style={{ maxWidth: '640px' }}>
          Explore open-source contributions, verified GitHub projects, and algorithmic problem-solving profiles.
        </p>
      </div>

      {/* DEVELOPER PROFILE BADGES */}
      <div className="row g-4 mb-4" data-aos="fade-up">
        {/* GITHUB CARD */}
        <div className="col-12 col-md-6">
          <div className="dev-profile-card glass-panel hover-lift h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="dev-profile-icon github-icon">
                  <i className="fa-brands fa-github" />
                </div>
                <div>
                  <h4 className="mb-0 fw-bold">GitHub Developer Profile</h4>
                  <a
                    href="https://github.com/sumitrathor1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info text-decoration-none"
                    style={{ fontSize: '0.84rem' }}
                    onClick={() => trackSocialClick('GitHub')}
                  >
                    @sumitrathor1 <i className="fa-solid fa-arrow-up-right-from-square ms-1.5" style={{ fontSize: '0.7rem' }} />
                  </a>
                </div>
              </div>
              <button
                type="button"
                className="copy-chip-btn"
                onClick={handleCopyGithub}
                title="Copy GitHub URL"
              >
                <i className={copiedLink ? 'fa-solid fa-check text-success me-2' : 'fa-regular fa-copy me-2'} />
                {copiedLink ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <p className="dev-profile-desc mb-3">
              Building open-source developer utilities, RAG workflows, and full-stack systems. Project Admin for GirlScript Summer of Code 2025.
            </p>

            <div className="d-flex flex-wrap gap-2 pt-2 border-top border-secondary-subtle">
              <span className="dev-meta-pill">
                <i className="fa-solid fa-code-fork me-2 text-primary" /> 16+ Public Repos
              </span>
              <span className="dev-meta-pill">
                <i className="fa-solid fa-circle-nodes me-2 text-info" /> Open Source Contributor
              </span>
              <span className="dev-meta-pill">
                <i className="fa-solid fa-award me-2 text-warning" /> GSSoC '25 Admin
              </span>
            </div>
          </div>
        </div>

        {/* LEETCODE CARD */}
        <div className="col-12 col-md-6">
          <div className="dev-profile-card glass-panel hover-lift h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="dev-profile-icon leetcode-icon">
                  <i className="fa-solid fa-code" />
                </div>
                <div>
                  <h4 className="mb-0 fw-bold">LeetCode Problem Solving</h4>
                  <a
                    href="https://leetcode.com/u/SumitRathor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warning text-decoration-none"
                    style={{ fontSize: '0.84rem' }}
                    onClick={() => trackSocialClick('LeetCode')}
                  >
                    @SumitRathor <i className="fa-solid fa-arrow-up-right-from-square ms-1.5" style={{ fontSize: '0.7rem' }} />
                  </a>
                </div>
              </div>
              <button
                type="button"
                className="copy-chip-btn"
                onClick={handleSharePortfolio}
                title="Share Portfolio Link"
              >
                <i className={shareSuccess ? 'fa-solid fa-check text-success me-2' : 'fa-solid fa-share-nodes me-2'} />
                {shareSuccess ? 'Copied URL!' : 'Share Portfolio'}
              </button>
            </div>

            <p className="dev-profile-desc mb-3">
              Practicing Core Data Structures, Algorithms, Dynamic Programming, Graph Theory, and System Design patterns in C++ and Python.
            </p>

            <div className="d-flex flex-wrap gap-2 pt-2 border-top border-secondary-subtle">
              <span className="dev-meta-pill">
                <i className="fa-solid fa-sitemap me-2 text-warning" /> DSA Practice
              </span>
              <span className="dev-meta-pill">
                <i className="fa-solid fa-terminal me-2 text-danger" /> C++ & Python
              </span>
              <span className="dev-meta-pill">
                <i className="fa-solid fa-cubes me-2 text-success" /> OOP Architecture
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED REPOSITORY HIGHLIGHTS */}
      <div className="row g-3" data-aos="fade-up">
        {repositories.map((repo) => (
          <div key={repo.name} className="col-12 col-md-6 col-lg-3">
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-highlight-card glass-panel hover-lift text-decoration-none d-block h-100"
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center gap-2 text-primary">
                  <i className="fa-regular fa-folder" />
                  <span className="repo-name">{repo.name}</span>
                </div>
                <span className="repo-badge">{repo.stars}</span>
              </div>

              <p className="repo-desc mb-3">{repo.desc}</p>

              <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.74rem' }}>
                <span className="lang-color-dot" style={{ backgroundColor: repo.langColor }} />
                <span>{repo.lang}</span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
