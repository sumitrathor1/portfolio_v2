import React, { useState, useRef } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const togglerIconRef = useRef(null);

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

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg nav-floating position-fixed w-100">
        <div id="mainNavbar" className="container-fluid container-xxl nav-shell glass-panel">
          <a className="navbar-brand text-gradient" href="#hero" onClick={closeNavbar}>
            SUMIT RATHOR
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
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
              <li className="nav-item">
                <a className="nav-link hover-lift" href="#hero" onClick={closeNavbar}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-lift" href="#about-me" onClick={closeNavbar}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-lift" href="#experience" onClick={closeNavbar}>
                  Experience
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-lift" href="#projects" onClick={closeNavbar}>
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-lift" href="#skills" onClick={closeNavbar}>
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link hover-lift" href="#contact-us" onClick={closeNavbar}>
                  Contact
                </a>
              </li>
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
