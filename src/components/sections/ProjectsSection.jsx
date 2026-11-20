import React, { useState, useMemo } from 'react';
import { projectsData } from '../../data/projects';
import { trackProjectClick } from '../../utils/analytics';
import ProjectModal from '../common/ProjectModal';

export default function ProjectsSection({ onOpenArchitecture }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const fallbackImage = '/assets/images/project-image/4ff159345bfd216b4d7db7fffd5eccc4.png';

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: projectsData.length,
      fullstack: projectsData.filter((p) => p.category === 'fullstack').length,
      ai: projectsData.filter((p) => p.category === 'ai').length,
      iot: projectsData.filter((p) => p.category === 'iot').length
    };
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // 1. Category check
      const matchesCategory =
        activeCategory === 'all' || project.category === activeCategory;

      if (!matchesCategory) return false;

      // 2. Search query check
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = project.title?.toLowerCase().includes(q);
      const subtitleMatch = project.subtitle?.toLowerCase().includes(q);
      const descMatch = project.description?.toLowerCase().includes(q);
      const stackMatch = (project.stack || []).some((tech) =>
        tech.toLowerCase().includes(q)
      );

      return titleMatch || subtitleMatch || descMatch || stackMatch;
    });
  }, [activeCategory, searchQuery]);

  const categories = [
    { key: 'all', label: 'All Projects', count: categoryCounts.all, icon: 'fa-solid fa-shapes' },
    { key: 'fullstack', label: 'Full Stack', count: categoryCounts.fullstack, icon: 'fa-solid fa-layer-group' },
    { key: 'ai', label: 'AI & Systems', count: categoryCounts.ai, icon: 'fa-solid fa-brain' },
    { key: 'iot', label: 'IoT & Hardware', count: categoryCounts.iot, icon: 'fa-solid fa-microchip' }
  ];

  return (
    <section className="section projects-section container-xxl" id="projects">
      <div className="section-heading text-center mb-4" data-aos="fade-up">
        <p className="eyebrow">Portfolio</p>
        <h2 className="mb-2">✨Featured Projects✨</h2>
        <p className="subtitle mx-auto" style={{ maxWidth: '640px' }}>
          Explore production platforms, AI research implementations, and hardware systems engineered with modern standards.
        </p>
      </div>

      {/* FILTER TABS & SEARCH BAR */}
      <div className="project-controls mb-4" data-aos="fade-up">
        {/* CATEGORY TABS */}
        <div className="project-filter-tabs" role="tablist" aria-label="Project Categories">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.key}
              className={`project-filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <i className={`${cat.icon} me-1.5`} />
              <span>{cat.label}</span>
              <span className="project-filter-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* SYSTEM ARCHITECTURE EXPLORER TRIGGER */}
        {onOpenArchitecture && (
          <button
            type="button"
            className="project-arch-toggle-btn hover-lift"
            onClick={onOpenArchitecture}
            title="Inspect Deep System Architecture Diagrams"
          >
            <i className="fa-solid fa-diagram-project text-primary me-1.5" />
            <span>Architecture Explorer</span>
          </button>
        )}

        {/* SEARCH INPUT */}
        <div className="project-search-wrapper">
          <i className="fa-solid fa-magnifying-glass search-icon" />
          <input
            type="text"
            className="project-search-input"
            placeholder="Search projects by tech (e.g. React, Python, RAG, Supabase)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search projects"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          )}
        </div>
      </div>

      {/* PROJECTS GRID */}
      {filteredProjects.length > 0 ? (
        <div className="projects-grid" data-aos="fade-up">
          {filteredProjects.map((project) => {
            const projectImage = project.image || fallbackImage;
            const stackChips = (project.stack || []).slice(0, 5);

            return (
              <article
                key={project.id}
                className="project-card glass-panel hover-lift"
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
                  <div className="project-card__actions">
                    {/* QUICK VIEW BUTTON */}
                    <button
                      type="button"
                      className="project-btn project-btn-quickview hover-lift"
                      onClick={() => {
                        setSelectedProject(project);
                        trackProjectClick(project.title, 'quick-view');
                      }}
                      title="Quick architecture preview"
                      aria-label={`Quick view ${project.title}`}
                    >
                      <i className="fa-regular fa-eye" /> Quick View
                    </button>

                    {/* CASE STUDY LINK */}
                    {project.slug && (
                      <a
                        href={`/projects/${project.slug}/`}
                        className="project-btn project-btn-details hover-lift"
                        onClick={() => trackProjectClick(project.title, 'details')}
                        title={`View ${project.title} Case Study`}
                      >
                        <i className="fa-solid fa-circle-info" /> Case Study
                      </a>
                    )}

                    {/* GITHUB LINK */}
                    {project.github && (
                      <a
                        href={project.github}
                        className="project-btn project-btn-ghost hover-lift"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectClick(project.title, 'github')}
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <i className="fa-brands fa-github" /> Code
                      </a>
                    )}

                    {/* LIVE DEMO LINK */}
                    {project.live && (
                      <a
                        href={project.live}
                        className="project-btn project-btn-primary hover-lift"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackProjectClick(project.title, 'live')}
                        aria-label={`Open live demo of ${project.title}`}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* EMPTY STATE WHEN FILTER/SEARCH YIELDS NO RESULTS */
        <div className="project-empty-state glass-panel text-center py-5" data-aos="fade-up">
          <div className="empty-state-icon mb-3">
            <i className="fa-solid fa-magnifying-glass fa-2x text-muted" />
          </div>
          <h3 className="mb-2">No Matching Projects Found</h3>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: '480px' }}>
            No projects matched your search criteria for "<strong>{searchQuery}</strong>" under {activeCategory.toUpperCase()}.
          </p>
          <button
            type="button"
            className="btn btn-secondary-ghost hover-lift"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
          >
            <i className="fa-solid fa-rotate-left me-1.5 text-primary" /> Reset All Filters
          </button>
        </div>
      )}

      {/* QUICK VIEW INTERACTIVE MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
