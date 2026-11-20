import React, { useState, useEffect, useRef, useMemo } from 'react';
import { projectsData } from '../../data/projects';
import { personalInfo } from '../../data/personalInfo';
import { trackResumeDownload } from '../../utils/analytics';

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenTerminal,
  onOpenRecruiter,
  onOpenArchitecture
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Global key listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via parent
          window.dispatchEvent(new CustomEvent('toggle-command-palette'));
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const commandItems = useMemo(() => {
    const items = [
      // Quick Developer Actions
      {
        id: 'term',
        category: 'Developer Tools',
        title: 'Open Developer Terminal',
        subtitle: 'Interactive CLI shell with commands, matrix mode & project inspector',
        icon: 'fa-solid fa-terminal text-info',
        action: () => {
          onClose();
          onOpenTerminal?.();
        }
      },
      {
        id: 'arch',
        category: 'Developer Tools',
        title: 'Project Architecture Explorer',
        subtitle: 'Inspect air-gapped RAG, multi-tier e-commerce & real-time RLS diagrams',
        icon: 'fa-solid fa-diagram-project text-primary',
        action: () => {
          onClose();
          onOpenArchitecture?.();
        }
      },
      {
        id: 'recruiter',
        category: 'Recruiter Quick Access',
        title: 'Open 60-Second Recruiter Brief',
        subtitle: 'Executive summary of skills, DRDO background, CGPA 8.09 & contact info',
        icon: 'fa-solid fa-bolt text-warning',
        action: () => {
          onClose();
          onOpenRecruiter?.();
        }
      },
      {
        id: 'resume',
        category: 'Recruiter Quick Access',
        title: 'Download Verified Resume PDF',
        subtitle: 'Direct PDF download of Sumit Rathor’s verified resume',
        icon: 'fa-solid fa-file-pdf text-danger',
        action: () => {
          trackResumeDownload();
          window.open(personalInfo.resumePath, '_blank');
          onClose();
        }
      },

      // Navigation
      {
        id: 'nav-home',
        category: 'Navigation',
        title: 'Jump to Home',
        subtitle: 'Hero greeting & executive bio',
        icon: 'fa-solid fa-house text-secondary',
        action: () => {
          window.location.hash = '#hero';
          onClose();
        }
      },
      {
        id: 'nav-about',
        category: 'Navigation',
        title: 'Jump to About Me',
        subtitle: 'Background, education at MITS Gwalior & core focus',
        icon: 'fa-solid fa-user text-secondary',
        action: () => {
          window.location.hash = '#about-me';
          onClose();
        }
      },
      {
        id: 'nav-exp',
        category: 'Navigation',
        title: 'Jump to Experience',
        subtitle: 'DRDO CFEES Research Internship & technical leadership',
        icon: 'fa-solid fa-briefcase text-secondary',
        action: () => {
          window.location.hash = '#experience';
          onClose();
        }
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        title: 'Jump to Projects Section',
        subtitle: '11+ verified engineering projects & live demos',
        icon: 'fa-solid fa-code text-secondary',
        action: () => {
          window.location.hash = '#projects';
          onClose();
        }
      },
      {
        id: 'nav-skills',
        category: 'Navigation',
        title: 'Jump to Skills & Technologies',
        subtitle: 'Full-stack, AI/RAG, databases, and IoT capabilities',
        icon: 'fa-solid fa-layer-group text-secondary',
        action: () => {
          window.location.hash = '#skills';
          onClose();
        }
      },
      {
        id: 'nav-achieve',
        category: 'Navigation',
        title: 'Jump to Achievements',
        subtitle: 'NPTEL Cloud & HCI Certifications, Hackathons, and HoD LOR',
        icon: 'fa-solid fa-trophy text-secondary',
        action: () => {
          window.location.hash = '#achievements';
          onClose();
        }
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        title: 'Jump to Contact',
        subtitle: 'Direct email form & availability (< 24hr response)',
        icon: 'fa-solid fa-envelope text-secondary',
        action: () => {
          window.location.hash = '#contact-us';
          onClose();
        }
      },

      // Featured Projects
      ...projectsData.slice(0, 6).map((proj) => ({
        id: `proj-${proj.slug}`,
        category: 'Featured Projects',
        title: proj.title,
        subtitle: `${proj.subtitle || ''} [${proj.stack.slice(0, 3).join(', ')}]`,
        icon: 'fa-solid fa-laptop-code text-accent',
        action: () => {
          if (proj.slug) {
            window.location.href = `/projects/${proj.slug}/`;
          } else {
            window.location.hash = '#projects';
          }
          onClose();
        }
      })),

      // External Links
      {
        id: 'ext-github',
        category: 'External Links',
        title: 'GitHub Profile',
        subtitle: 'Explore open source code repositories (sumitrathor1)',
        icon: 'fa-brands fa-github text-white',
        action: () => {
          window.open('https://github.com/sumitrathor1', '_blank');
          onClose();
        }
      },
      {
        id: 'ext-linkedin',
        category: 'External Links',
        title: 'LinkedIn Profile',
        subtitle: 'Connect professionally on LinkedIn (sumitrathor)',
        icon: 'fa-brands fa-linkedin text-info',
        action: () => {
          window.open('https://www.linkedin.com/in/sumitrathor/', '_blank');
          onClose();
        }
      }
    ];

    return items;
  }, [onClose, onOpenTerminal, onOpenRecruiter, onOpenArchitecture]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return commandItems;
    const q = query.toLowerCase().trim();
    return commandItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [commandItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="palette-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="palette-modal glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* SEARCH HEADER */}
        <div className="palette-search-box">
          <i className="fa-solid fa-magnifying-glass palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="palette-input"
            placeholder="Type a command, project, or section... (e.g. 'terminal', 'rag', 'resume')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search portfolio"
          />
          <kbd className="palette-kbd">ESC</kbd>
        </div>

        {/* RESULTS LIST */}
        <div className="palette-list" ref={listRef}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`palette-item ${isSelected ? 'active' : ''}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="palette-item-icon">
                    <i className={item.icon} />
                  </div>
                  <div className="palette-item-content">
                    <div className="palette-item-header">
                      <span className="palette-item-title">{item.title}</span>
                      <span className="palette-item-category">{item.category}</span>
                    </div>
                    <div className="palette-item-subtitle">{item.subtitle}</div>
                  </div>
                  {isSelected && (
                    <span className="palette-select-hint">
                      <kbd>↵</kbd>
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="palette-no-results text-center py-4 text-muted">
              <i className="fa-regular fa-face-frown me-2" />
              No matching commands or projects found for "<strong>{query}</strong>"
            </div>
          )}
        </div>

        {/* FOOTER SHORTCUT HINTS */}
        <div className="palette-footer">
          <div className="palette-footer-keys">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div className="palette-footer-brand text-muted">
            Sumit Rathor 2026 Engine
          </div>
        </div>
      </div>
    </div>
  );
}
