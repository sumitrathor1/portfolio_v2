import React, { useEffect, useState } from 'react';
import { personalInfo } from '../../data/personalInfo';
import { trackResumeDownload, trackSocialClick } from '../../utils/analytics';

export default function RecruiterSnapshotModal({ isOpen, onClose }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      const input = document.createElement('input');
      input.value = personalInfo.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

  return (
    <div
      className="recruiter-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-snapshot-title"
    >
      <div
        className="recruiter-modal-dialog glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="recruiter-modal-close"
          onClick={onClose}
          aria-label="Close Recruiter Snapshot"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        {/* HEADER */}
        <div className="recruiter-modal-header mb-3">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge-pill-cyan">
              <i className="fa-solid fa-bolt text-warning me-1" /> 60-Second Brief
            </span>
            <span className="badge-pill-green">
              <span className="pulse-mini-dot me-1" /> Open to Opportunities
            </span>
          </div>
          <h2 id="recruiter-snapshot-title" className="recruiter-modal-title">
            Recruiter & Hiring Manager Snapshot
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '0.86rem' }}>
            A fast summary of Sumit Rathor's engineering background, core competencies, and verified achievements.
          </p>
        </div>

        {/* SNAPSHOT GRID */}
        <div className="recruiter-snapshot-grid">
          {/* EDUCATION & DEGREE */}
          <div className="snapshot-card glass-panel">
            <div className="snapshot-card-icon text-info">
              <i className="fa-solid fa-graduation-cap" />
            </div>
            <div>
              <h4 className="snapshot-card-title">Education & Standing</h4>
              <p className="snapshot-card-text mb-1">
                <strong>B.Tech in Computer Science & Design</strong> (2024–2027)
              </p>
              <p className="snapshot-card-subtext mb-0">
                Madhav Institute of Technology & Science, Gwalior · <strong>CGPA 8.09</strong>
              </p>
              <p className="snapshot-card-subtext mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                Diploma in CSE · <strong>CGPA 8.42</strong> (Ambedkar Polytechnic College)
              </p>
            </div>
          </div>

          {/* KEY EXPERIENCE HIGHLIGHT */}
          <div className="snapshot-card glass-panel">
            <div className="snapshot-card-icon text-primary">
              <i className="fa-solid fa-shield-halved" />
            </div>
            <div>
              <h4 className="snapshot-card-title">Flagship Experience</h4>
              <p className="snapshot-card-text mb-1">
                <strong>DRDO-CFEES Research Intern</strong> (Delhi)
              </p>
              <p className="snapshot-card-subtext mb-0">
                Architected <strong>Rakshak AI</strong> — fully offline, air-gapped RAG assistant querying classified defence documentation using Python, LangChain, Ollama & ChromaDB.
              </p>
            </div>
          </div>

          {/* CORE TECH STACK */}
          <div className="snapshot-card glass-panel">
            <div className="snapshot-card-icon text-warning">
              <i className="fa-solid fa-cubes" />
            </div>
            <div>
              <h4 className="snapshot-card-title">Core Competencies</h4>
              <div className="snapshot-stack-pills mt-1">
                {['React', 'Next.js', 'Node.js', 'Python', 'PHP', 'MySQL', 'Supabase', 'LangChain', 'C++', 'ESP32 IoT'].map(
                  (tech) => (
                    <span key={tech} className="snapshot-pill">
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* LEADERSHIP & CREDENTIALS */}
          <div className="snapshot-card glass-panel">
            <div className="snapshot-card-icon text-success">
              <i className="fa-solid fa-trophy" />
            </div>
            <div>
              <h4 className="snapshot-card-title">Verified Honors & Leadership</h4>
              <ul className="snapshot-list mb-0">
                <li><strong>President</strong>, Innovation & DIY Club (50+ members at MITS)</li>
                <li><strong>Elite NPTEL</strong>: Cloud Computing (76%) & HCI (70%)</li>
                <li><strong>Finalist</strong>, PAYTM Fin-O Hack (Fortune'26, DTU Delhi)</li>
                <li><strong>Project Admin</strong>, GirlScript Summer of Code (GSSoC 2025)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RECRUITER ACTIONS */}
        <div className="recruiter-modal-footer mt-4 pt-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="d-flex flex-wrap gap-2">
            <a
              href={personalInfo.resumePath}
              className="btn btn-primary-gradient hover-lift"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackResumeDownload()}
            >
              <i className="fa-solid fa-download me-1.5" /> Download Full Resume
            </a>
            <button
              type="button"
              className="btn btn-secondary-ghost hover-lift"
              onClick={handleCopyEmail}
            >
              <i className={isCopied ? 'fa-solid fa-check text-success me-1.5' : 'fa-regular fa-copy me-1.5'} />
              {isCopied ? 'Email Copied!' : 'Copy Direct Email'}
            </button>
          </div>

          <div className="d-flex align-items-center gap-2">
            <a
              href={personalInfo.socialLinks.find((l) => l.name === 'LinkedIn')?.url || '#'}
              className="btn btn-secondary-ghost hover-lift"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick('LinkedIn')}
            >
              <i className="fab fa-linkedin me-1" /> LinkedIn
            </a>
            <a
              href="#contact-us"
              className="btn btn-secondary-ghost hover-lift"
              onClick={onClose}
            >
              <i className="fa-solid fa-paper-plane me-1" /> Send Inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
