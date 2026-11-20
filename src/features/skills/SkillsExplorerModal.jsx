import React, { useState, useMemo } from 'react';
import { skillsData } from '../../data/skills';
import { projectsData } from '../../data/projects';
import { trackProjectClick } from '../../utils/analytics';

export default function SkillsExplorerModal({
  isOpen,
  initialSkill,
  onClose,
  onSelectProject
}) {
  const [selectedSkillName, setSelectedSkillName] = useState(initialSkill || 'ReactJS');

  // Flatten all skills
  const allSkills = useMemo(() => {
    const list = [];
    Object.entries(skillsData).forEach(([category, skills]) => {
      skills.forEach((s) => {
        list.push({ ...s, category });
      });
    });
    return list;
  }, []);

  // Sync when initialSkill changes
  React.useEffect(() => {
    if (initialSkill) {
      setSelectedSkillName(initialSkill);
    }
  }, [initialSkill]);

  // Current selected skill object
  const currentSkill = useMemo(() => {
    return allSkills.find(
      (s) => s.name.toLowerCase() === selectedSkillName.toLowerCase()
    ) || allSkills[0];
  }, [allSkills, selectedSkillName]);

  // Projects that use this skill
  const matchingProjects = useMemo(() => {
    if (!currentSkill) return [];
    const skillNorm = currentSkill.name.toLowerCase().replace(/js|css|\.js/g, '').trim();

    return projectsData.filter((p) => {
      return (p.stack || []).some((st) => {
        const stNorm = st.toLowerCase().replace(/js|css|\.js/g, '').trim();
        return (
          stNorm === skillNorm ||
          stNorm.includes(skillNorm) ||
          skillNorm.includes(stNorm)
        );
      });
    });
  }, [currentSkill]);

  if (!isOpen) return null;

  return (
    <div
      className="skills-explorer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Skills to Projects Explorer"
    >
      <div
        className="skills-explorer-modal glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="skills-explorer-header">
          <div className="d-flex align-items-center gap-3">
            <div className="skill-active-badge-icon">
              <i className={currentSkill?.icon || 'fa-solid fa-code'} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h3 className="mb-0 text-white fw-bold">{currentSkill?.name}</h3>
                <span className="skill-category-tag">{currentSkill?.category}</span>
              </div>
              <p className="text-muted mb-0 small mt-0.5">
                Verified implementations across {matchingProjects.length} production & research projects
              </p>
            </div>
          </div>
          <button
            type="button"
            className="skills-explorer-close-btn"
            onClick={onClose}
            aria-label="Close skills explorer"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* QUICK SELECT CHIPS TO SWITCH SKILLS */}
        <div className="skills-chip-selector-bar">
          <span className="selector-label text-muted">Switch Skill:</span>
          <div className="chips-scroll-container">
            {allSkills.slice(0, 16).map((skill) => (
              <button
                key={skill.name}
                type="button"
                className={`skill-select-chip ${
                  skill.name.toLowerCase() === (currentSkill?.name || '').toLowerCase()
                    ? 'active'
                    : ''
                }`}
                onClick={() => setSelectedSkillName(skill.name)}
              >
                <i className={skill.icon} style={{ fontSize: '0.85rem' }} />
                <span>{skill.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MATCHING PROJECTS LIST */}
        <div className="skills-matching-projects-body">
          {matchingProjects.length > 0 ? (
            <div className="skills-project-list">
              {matchingProjects.map((proj) => (
                <div key={proj.id} className="skill-project-card glass-panel hover-lift">
                  <div className="skill-project-header">
                    <div>
                      <h4 className="mb-1 text-white fw-bold">{proj.title}</h4>
                      {proj.subtitle && (
                        <div className="text-muted small mb-2">{proj.subtitle}</div>
                      )}
                    </div>
                    {proj.date && (
                      <span className="badge-timeline">{proj.date}</span>
                    )}
                  </div>

                  <p className="skill-project-desc text-muted mb-3">
                    {proj.architecture || proj.problem || proj.description}
                  </p>

                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-auto pt-2 border-top border-secondary">
                    <div className="d-flex flex-wrap gap-1">
                      {proj.stack.map((t, i) => {
                        const isMatch = t.toLowerCase().includes(currentSkill?.name.toLowerCase().replace(/js|css/g, '').trim());
                        return (
                          <span
                            key={i}
                            className={`mini-tech-chip ${isMatch ? 'highlight' : ''}`}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {proj.slug && (
                        <a
                          href={`/projects/${proj.slug}/`}
                          className="btn-skill-action"
                          onClick={() => trackProjectClick(proj.title, 'skills-case-study')}
                        >
                          <i className="fa-solid fa-circle-info me-1" /> Case Study
                        </a>
                      )}
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-skill-action btn-skill-primary"
                          onClick={() => trackProjectClick(proj.title, 'skills-live-demo')}
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square me-1" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="skills-empty-state text-center py-5">
              <i className="fa-solid fa-code-compare fa-2x text-muted mb-3" />
              <h4 className="text-white">Core Technology & Tooling</h4>
              <p className="text-muted mx-auto" style={{ maxWidth: '440px' }}>
                <strong>{currentSkill?.name}</strong> is a foundational skill utilized across Sumit's development workflows, toolchains, or experimental prototypes.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="skills-explorer-footer text-muted small">
          <span>💡 Click any skill to explore verified production implementations and case studies.</span>
          <button type="button" className="btn-close-text" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
