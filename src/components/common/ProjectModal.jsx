import React, { useEffect } from 'react';
import { trackProjectClick } from '../../utils/analytics';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle ESC key to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const fallbackImage = '/assets/images/project-image/4ff159345bfd216b4d7db7fffd5eccc4.png';
  const projectImage = project.image || fallbackImage;

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="project-modal-dialog glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        {/* MODAL HEADER IMAGE BANNER */}
        <div className="project-modal-visual">
          <img
            src={projectImage}
            alt={`${project.title} banner`}
            className="project-modal-img"
            onError={(e) => {
              if (e.target.src !== fallbackImage) {
                e.target.src = fallbackImage;
              }
            }}
          />
          {project.date && (
            <span className="project-modal-date">
              <i className="fa-regular fa-calendar me-1.5" />
              {project.date}
            </span>
          )}
        </div>

        {/* MODAL BODY */}
        <div className="project-modal-content">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <span className="project-modal-category">
              <i className="fa-solid fa-tag me-1" />
              {project.category === 'ai'
                ? 'AI & Systems'
                : project.category === 'iot'
                ? 'IoT & Embedded'
                : 'Full Stack Web'}
            </span>
          </div>

          <h2 id="modal-project-title" className="project-modal-title">
            {project.title}
          </h2>

          {project.subtitle && (
            <p className="project-modal-subtitle">{project.subtitle}</p>
          )}

          {/* TECH STACK CHIPS */}
          {project.stack && project.stack.length > 0 && (
            <div className="project-modal-stack mb-3">
              {project.stack.map((tech, idx) => (
                <span key={idx} className="project-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* OVERVIEW */}
          <div className="project-modal-section">
            <h4><i className="fa-solid fa-circle-info text-info me-1.5" /> Overview</h4>
            <p>{project.description}</p>
          </div>

          {/* PROBLEM SOLVED */}
          {project.problem && (
            <div className="project-modal-section">
              <h4><i className="fa-solid fa-triangle-exclamation text-warning me-1.5" /> Challenge & Problem Solved</h4>
              <p>{project.problem}</p>
            </div>
          )}

          {/* TECHNICAL ARCHITECTURE */}
          {project.architecture && (
            <div className="project-modal-section">
              <h4><i className="fa-solid fa-network-wired text-primary me-1.5" /> Technical Architecture</h4>
              <p>{project.architecture}</p>
            </div>
          )}

          {/* KEY FEATURES */}
          {project.features && project.features.length > 0 && (
            <div className="project-modal-section">
              <h4><i className="fa-solid fa-check-double text-success me-1.5" /> Key Engineering Features</h4>
              <ul className="project-modal-features">
                {project.features.map((feat, idx) => (
                  <li key={idx}>
                    <i className="fa-solid fa-chevron-right text-info me-2" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="project-modal-actions mt-4 pt-3">
            {project.live && (
              <a
                href={project.live}
                className="btn btn-primary-gradient hover-lift"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectClick(project.title, 'modal-live')}
              >
                <i className="fa-solid fa-arrow-up-right-from-square me-1.5" /> Open Live Application
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                className="btn btn-secondary-ghost hover-lift"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectClick(project.title, 'modal-github')}
              >
                <i className="fa-brands fa-github me-1.5" /> View Source Code
              </a>
            )}

            {project.slug && (
              <a
                href={`/projects/${project.slug}/`}
                className="btn btn-secondary-ghost hover-lift"
                onClick={() => trackProjectClick(project.title, 'modal-case-study')}
              >
                <i className="fa-solid fa-book-open me-1.5" /> Full Case Study Page
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
