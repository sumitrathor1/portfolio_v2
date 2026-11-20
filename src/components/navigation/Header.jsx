import React, { useState, useRef, useEffect } from 'react';

export default function Header({
  onOpenRecruiter,
  onOpenTerminal,
  onOpenCommandPalette
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const togglerIconRef = useRef(null);

  // Active section spy
  useEffect(() => {
    const sections = ['hero', 'about-me', 'experience', 'projects', 'skills', 'contact-us'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.classList.remove('mobile-nav-open');
    }
    return () => {
      document.body.classList.remove('mobile-nav-open');
    };
  }, [isOpen]);

  // Click outside and Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      const navEl = document.getElementById('mainNavbar');
      if (navEl && !navEl.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Delay adding click listener to prevent immediate close on toggle click
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsRotating(true);
    setIsOpen(!isOpen);
    setTimeout(() => {
      setIsRotating(false);
    }, 400);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about-me', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact-us', label: 'Contact' }
  ];

  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-lg nav-floating position-fixed w-100"
        aria-label="Primary Navigation"
      >
        <div
          id="mainNavbar"
          className="container-fluid container-xxl nav-shell glass-panel border-primary"
          style={{ backgroundColor: '#0E122E' }}
        >
          <a className="navbar-brand text-gradient" href="#hero" onClick={closeNavbar}>
            SUMIT RATHOR
          </a>

          <button
            className="navbar-toggler border-primary"
            style={{ backgroundColor: '#0E122E' }}
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={handleToggle}
          >
            <div className="d-flex justify-content-center align-items-center">
              <i
                ref={togglerIconRef}
                className={`fa-solid fa-bars ${isRotating ? 'rotate' : ''}`}
                id="navbarToggler"
              />
            </div>
          </button>

          <div
            className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto align-items-lg-center gap-2 gap-lg-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="nav-item">
                    <a
                      className={`nav-link hover-lift ${isActive ? 'active' : ''}`}
                      href={`#${link.id}`}
                      onClick={closeNavbar}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="nav-actions-group">
              {onOpenCommandPalette && (
                <button
                  type="button"
                  className="nav-search-pill hover-lift"
                  onClick={() => {
                    closeNavbar();
                    onOpenCommandPalette();
                  }}
                  title="Quick Search & Navigation (Ctrl+K)"
                  aria-label="Search and Navigation (Ctrl+K)"
                >
                  <i className="fa-solid fa-magnifying-glass me-1.5 text-info" />
                  <span>Search</span>
                  <kbd className="nav-kbd ms-1">⌘K</kbd>
                </button>
              )}

              {onOpenTerminal && (
                <button
                  type="button"
                  className="nav-terminal-pill hover-lift"
                  onClick={() => {
                    closeNavbar();
                    onOpenTerminal();
                  }}
                  title="Open Developer Terminal (Ctrl+~)"
                  aria-label="Open Developer Terminal"
                >
                  <i className="fa-solid fa-terminal me-1 text-success" />
                  <span>CLI</span>
                </button>
              )}

              {onOpenRecruiter && (
                <button
                  type="button"
                  className="nav-recruiter-pill hover-lift"
                  onClick={() => {
                    closeNavbar();
                    onOpenRecruiter();
                  }}
                  title="Open 60-Second Recruiter Brief"
                  aria-label="Open 60-Second Recruiter Brief"
                >
                  <i className="fa-solid fa-bolt text-warning me-1.5" />
                  <span>Recruiter Brief</span>
                </button>
              )}
            </div>

            <span id="themeModebtn" className="d-none">
              <span id="themeIcon" />
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
