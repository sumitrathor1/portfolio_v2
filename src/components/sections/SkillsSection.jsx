import React from 'react';
import { skillsData } from '../../data/skills';

export default function SkillsSection({ onSelectSkill }) {
  const groups = Object.entries(skillsData);

  return (
    <section className="section skills-section container-xxl" id="skills">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <h2 className="mb-2">✨Skills & Technologies✨</h2>
        <p className="text-muted small mx-auto" style={{ maxWidth: '600px' }}>
          Production-tested full-stack frameworks, AI/RAG architectures, and hardware protocols.
          <span className="d-block text-info mt-1">
            <i className="fa-solid fa-hand-pointer me-1.5" />
            Click any skill chip below to inspect verified real-world project applications.
          </span>
        </p>
      </div>

      <div className="row g-4" data-aos="fade-up">
        {groups.map(([groupName, skills]) => (
          <div
            key={groupName}
            className="col-12 col-md-6 col-lg-4"
            style={{ paddingRight: '0.5rem', paddingLeft: '0.5rem' }}
          >
            <article className="skill-card glass-panel hover-lift h-100">
              <h3 className="mb-3 d-flex align-items-center gap-2">
                <i className="fa-solid fa-layer-group text-gradient" style={{ fontSize: '1rem' }} />
                {groupName}
              </h3>

              <div className="skill-chips">
                {skills.map((skill) => {
                  const isDevicon = skill.icon.includes('devicon-');
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      className="skill-chip hover-lift clickable-skill"
                      onClick={() => onSelectSkill?.(skill.name)}
                      title={`Inspect projects built with ${skill.name}`}
                    >
                      <i
                        className={skill.icon}
                        style={{ fontSize: isDevicon ? '1.1rem' : '0.85rem' }}
                      />
                      <span>{skill.name}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square skill-chip-icon-hint" />
                    </button>
                  );
                })}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
