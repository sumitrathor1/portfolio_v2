import React from 'react';
import { projectsData } from '../../data/projects';

export default function ProjectsSection() {
  const fallbackImage = '/assets/images/project-image/4ff159345bfd216b4d7db7fffd5eccc4.png';

  return (
    <section className="section projects-section container-xxl" id="projects">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <h2 className="mb-2">✨Featured Projects✨</h2>
      </div>

      <div className="projects-grid" data-aos="fade-up">
        {projectsData.map((project) => {
          const projectImage = project.image || fallbackImage;
          const stackChips = (project.stack || []).slice(0, 5);

          return (
            <article
              key={project.id}
              className="project-card glass-panel hover-lift"
              style={{ marginInline: '0.75rem' }}
            >
              {/* 16:9 COMPACT IMAGE BANNER */}
              <div className="project-card__visual">
                <img
                  src={projectImage}
                  alt={`${project.title} screenshot`}
                  className="project-card__img"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="356"
                  onError={(e) => {
                    if (e.target.src !== fallbackImage) {
                      e.target.src = fallbackImage;
                    }
                  }}
                />
                {project.date && (
                  <span className="project-date-badge">
                    <i className="fa-regular fa-calendar me-1" />
                    {project.date}
                  </span>
                )}
              </div>

              {/* CARD BODY */}
              <div className="project-card__body">
                <div>
                  <h3 className="project-card__title" title={project.title}>
                    {project.title}
                  </h3>

                  {project.subtitle && (
                    <div className="project-card__subtitle" title={project.subtitle}>
                      {project.subtitle}
                    </div>
                  )}

                  {project.description && (
                    <p className="project-card__description" title={project.description}>
                      {project.description}
                    </p>
                  )}

                  {/* TECH STACK CHIPS */}
                  {stackChips.length > 0 && (
                    <div className="project-stack-wrap">
                      {stackChips.map((chip, idx) => (
                        <span key={idx} className="project-tech-pill">
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                {(project.github || project.live) && (
                  <div className="project-card__actions">
                    {project.github && (
                      <a
                        href={project.github}
                        className="project-btn project-btn-ghost hover-lift"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-github" /> GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="project-btn project-btn-primary hover-lift"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square" /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
