import React, { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const togglerIconRef = useRef(null);

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

            <span id="themeModebtn" className="d-none">
              <span id="themeIcon" />
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}
