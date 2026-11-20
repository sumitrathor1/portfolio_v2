import React from 'react';
import { personalInfo } from '../../data/personalInfo';

export default function AboutSection() {
  return (
    <section className="section about-section container-xxl" id="about-me">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <h2 className="mb-2">✨About Me✨</h2>
      </div>

      <div className="about-grid" data-aos="fade-up">
        {/* LEFT SHORT INTRO CARD */}
        <article className="about-card glass-panel hover-lift">
          <div className="d-flex flex-column justify-content-between h-100 gap-3">
            <div>
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-2.5 rounded-pill"
                style={{
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.3)'
                }}
              >
                <span className="pulse-dot" style={{ width: '8px', height: '8px' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38bdf8' }}>
                  Full Stack Developer
                </span>
              </div>

              <h3 className="mb-2" style={{ fontSize: '1.45rem', fontWeight: 700, lineHeight: 1.3 }}>
                {personalInfo.aboutHeading} <br />
                <span className="text-gradient">{personalInfo.aboutInstitution}</span>
              </h3>

              <p className="mb-3" style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                {personalInfo.aboutSummary}
              </p>

              <div className="d-flex flex-wrap gap-2 pt-2 border-top border-secondary border-opacity-10">
                {personalInfo.aboutBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="badge px-3 py-1.5 rounded-pill"
                    style={{
                      background: badge.bg,
                      color: badge.color,
                      fontSize: '0.82rem',
                      border: `1px solid ${badge.border}`
                    }}
                  >
                    <i className={`${badge.icon} me-1`} /> {badge.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="tag-grid pt-1">
              {personalInfo.aboutPills.map((pill, idx) => (
                <span key={idx} className="skill-chip">
                  <i className={`${pill.icon} me-1`} /> {pill.label}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* RIGHT VISUAL STATS CARD */}
        <article className="about-profile glass-panel hover-lift">
          <div className="profile-header pb-2.5 border-bottom border-secondary border-opacity-10">
            <img
              src={personalInfo.profileImage}
              alt="Sumit Rathor - Profile Avatar"
              width="72"
              height="72"
              loading="lazy"
              decoding="async"
              style={{ boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' }}
            />
            <div>
              <span
                className="badge rounded-pill bg-success bg-opacity-25 text-success border border-success border-opacity-25 mb-1 px-2.5 py-0.5"
                style={{ fontSize: '0.72rem' }}
              >
                <i className="fa-solid fa-circle text-success me-1" style={{ fontSize: '0.55rem' }} />{' '}
                {personalInfo.status}
              </span>
              <h3 className="mb-0" style={{ fontSize: '1.25rem' }}>{personalInfo.name}</h3>
              <p className="subtitle mb-0" style={{ fontSize: '0.85rem' }}>Software Engineer & Builder</p>
            </div>
          </div>

          {/* VISUAL STATS GRID */}
          <div className="profile-stats pt-1">
            {personalInfo.stats.map((stat, idx) => (
              <div
                key={idx}
                className="stat-box p-2.5 rounded-4 text-center d-flex flex-column align-items-center justify-content-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <i className={`${stat.icon} ${stat.colorClass}`} style={{ fontSize: '1.35rem' }} />
                <p
                  className={`value mb-0 ${stat.colorClass}`}
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: stat.colorClass === 'text-info' ? '#38bdf8' : stat.colorClass === 'text-primary' ? '#a855f7' : stat.colorClass === 'text-warning' ? '#fbbf24' : undefined
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="label mb-0"
                  style={{
                    fontWeight: 600,
                    fontSize: '0.74rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#cbd5e1'
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
