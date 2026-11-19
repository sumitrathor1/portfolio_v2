import React from 'react';
import { skillsData } from '../../data/skills';

export default function SkillsSection() {
  const groups = Object.entries(skillsData);

  return (
    <section className="section skills-section container-xxl" id="skills">
      <div className="section-heading text-center mb-5" data-aos="fade-up">
        <h2 className="mb-3">✨Skills & Technologies✨</h2>
      </div>

      <div className="row g-4" data-aos="fade-up" style={{ marginInline: '0.75rem' }}>
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
                    <span key={skill.name} className="skill-chip hover-lift">
                      <i
                        className={skill.icon}
                        style={{ fontSize: isDevicon ? '1.1rem' : '0.85rem' }}
                      />
                      <span>{skill.name}</span>
                    </span>
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
