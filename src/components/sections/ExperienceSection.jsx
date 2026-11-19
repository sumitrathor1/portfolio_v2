import React, { useState } from 'react';
import { experienceData } from '../../data/experience';

export default function ExperienceSection() {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="section experience-section container-xxl" id="experience">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <h2 className="mb-2">✨Experience✨</h2>
      </div>

      <div className="experience-grid" data-aos="fade-up">
        {experienceData.map((exp) => {
          const hasImageError = imageErrors[exp.id] || !exp.logo_path;

          return (
            <article
              key={exp.id}
              className="experience-card glass-panel hover-lift"
              style={{ marginInline: '0.75rem' }}
            >
              <div className="d-flex flex-column justify-content-between h-100 gap-3">
                <div>
                  {/* HEADER: LOGO + ROLE + COMPANY */}
                  <div className="experience-card__header mb-2.5">
                    <div className="company-logo-wrap">
                      {!hasImageError ? (
                        <img
                          src={exp.logo_path}
                          alt={`${exp.company} logo`}
                          className="company-logo-img"
                          onError={() => handleImageError(exp.id)}
                        />
                      ) : (
                        <span className="company-logo-placeholder">
                          {exp.initials}
                        </span>
                      )}
                    </div>

                    <div className="flex-grow-1">
                      <h3 className="experience-role mb-0.5">{exp.role}</h3>
                      <p className="experience-company mb-1">{exp.company}</p>

                      <div className="experience-meta">
                        <span className="date-badge">
                          <i className="fa-regular fa-calendar text-info" />{' '}
                          {exp.period}
                        </span>
                        {exp.work_mode && (
                          <span className="mode-badge">
                            <i className="fa-solid fa-house-laptop me-1" />
                            {exp.work_mode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TECH STACK BADGES */}
                  {exp.stack && exp.stack.length > 0 && (
                    <div className="tech-stack my-2.5">
                      {exp.stack.map((tech, idx) => (
                        <span key={idx} className="tech-pill">
                          <i className="fa-solid fa-code text-gradient" style={{ fontSize: '0.65rem' }} />{' '}
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* BULLET POINTS */}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="experience-points mt-2">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                {(exp.certificate_path || exp.company_website) && (
                  <div className="d-flex flex-wrap gap-2 pt-2 border-top border-secondary border-opacity-10 mt-2">
                    {exp.certificate_path && (
                      <a
                        href={exp.certificate_path}
                        className="btn btn-sm btn-secondary-ghost hover-lift py-1 px-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.78rem' }}
                      >
                        <i className="fa-solid fa-certificate me-1 text-warning" /> Certificate
                      </a>
                    )}
                    {exp.company_website && (
                      <a
                        href={exp.company_website}
                        className="btn btn-sm btn-primary-gradient hover-lift py-1 px-3"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.78rem' }}
                      >
                        <i className="fa-solid fa-globe me-1" /> Website
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
