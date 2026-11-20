import React from 'react';
import { achievementsData } from '../../data/achievements';

export default function AchievementsSection({ onPreviewDocument }) {
  return (
    <section className="section achievements-section container-xxl" id="achievements">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <h2 className="mb-2">✨Achievements✨</h2>
      </div>

      <div className="achievements-grid" data-aos="fade-up">
        {achievementsData.map((item) => (
          <article
            key={item.id}
            className="achievement-card glass-panel hover-lift"
          >
            <div>
              {/* TOP: ICON & CATEGORY PILL */}
              <div className="achievement-card__top">
                <div className="achievement-icon">
                  <i className={item.icon} />
                </div>
                {item.category && (
                  <span className="achievement-meta-badge">
                    {item.category}
                  </span>
                )}
              </div>

              {/* TITLE & ORGANIZATION */}
              <h3 className="achievement-title">{item.title}</h3>

              {item.organization && (
                <p className="achievement-org">
                  <i className="fa-solid fa-building text-info me-1" style={{ fontSize: '0.72rem' }} />
                  {item.organization}
                </p>
              )}

              {/* SHORT DESCRIPTION */}
              {item.description && (
                <p className="achievement-description">
                  {item.description}
                </p>
              )}
            </div>

            {/* BOTTOM: DATE & OPTIONAL PROOF LINK */}
            {(item.date || item.certificate_url) && (
              <div className="achievement-card__footer">
                {item.date && (
                  <span className="achievement-date">
                    <i className="fa-regular fa-calendar me-1 text-primary" />
                    {item.date}
                  </span>
                )}

                {item.certificate_url && (
                  item.certificate_url.startsWith('http') ? (
                    <a
                      href={item.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="achievement-link"
                      aria-label={`View external credential for ${item.title}`}
                    >
                      Proof <i className="fa-solid fa-arrow-up-right-from-square ms-1" style={{ fontSize: '0.65rem' }} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="achievement-link"
                      onClick={() => {
                        onPreviewDocument?.({
                          title: item.title,
                          url: item.certificate_url,
                          type: item.certificate_url.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image',
                          description: item.description
                        });
                      }}
                      aria-label={`Preview credential for ${item.title}`}
                    >
                      <span>Proof</span> <i className="fa-solid fa-expand ms-1" style={{ fontSize: '0.7rem' }} />
                    </button>
                  )
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
