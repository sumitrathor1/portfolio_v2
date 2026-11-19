import React from 'react';
import { educationData } from '../../data/education';

export default function EducationSection() {
  return (
    <section className="section education-section container-xxl" id="education">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <h2 className="mb-2">✨Education✨</h2>
      </div>

      <div className="education-grid" data-aos="fade-up">
        {educationData.map((item) => (
          <article
            key={item.id}
            className="education-card glass-panel hover-lift"
            style={{ marginInline: '0.75rem' }}
          >
            <div className="d-flex flex-column justify-content-between h-100 gap-2">
              <div>
                {/* TOP ROW: DURATION & SCORE */}
                <div className="education-card__top">
                  <span className="education-card__duration">
                    <i className="fa-regular fa-calendar text-info" />{' '}
                    {item.timeline}
                  </span>

                  {item.score && (
                    <span className="education-score-badge">
                      <i className="fa-solid fa-award text-warning me-1" style={{ fontSize: '0.75rem' }} />
                      <span className="score-val">{item.scoreVal}</span>
                      {item.scoreLbl && (
                        <span className="score-lbl">{item.scoreLbl}</span>
                      )}
                    </span>
                  )}
                </div>

                {/* DEGREE & INSTITUTION */}
                <h3 className="education-program">
                  <i className="fa-solid fa-graduation-cap text-gradient me-1.5" style={{ fontSize: '1rem' }} />
                  {item.program}
                </h3>

                <p className="education-institution">
                  <i className="fa-solid fa-building-columns text-secondary mt-1 flex-shrink-0" style={{ fontSize: '0.8rem' }} />
                  <span>{item.institution}</span>
                </p>
              </div>

              {/* COURSEWORK / FOCUS TAGS */}
              {item.focus && item.focus.length > 0 && (
                <div className="coursework-wrap">
                  <span className="coursework-label">
                    <i className="fa-solid fa-book-open text-primary" style={{ fontSize: '0.65rem' }} />{' '}
                    Key Coursework
                  </span>
                  <div className="coursework-chips">
                    {item.focus.map((subject, idx) => (
                      <span key={idx} className="coursework-chip">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
