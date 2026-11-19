import React from 'react';
import { personalInfo } from '../../data/personalInfo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-minimal">
      <div className="container-xxl">
        <div className="footer-minimal__inner">
          <div className="footer-minimal__left">
            <p className="footer-minimal__copy">
              &copy; {currentYear}{' '}
              <span className="footer-minimal__name">{personalInfo.name}</span>
            </p>
            <p className="footer-minimal__role">
              {personalInfo.role}
            </p>
          </div>

          <div className="footer-minimal__center">
            {personalInfo.socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="footer-minimal__link"
                aria-label={link.name}
              >
                <i className={link.icon.includes('linkedin') ? 'fab fa-linkedin-in' : link.icon} />{' '}
                {link.name}
              </a>
            ))}
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-minimal__link footer-minimal__link--resume"
              aria-label="Resume"
            >
              Resume &rarr;
            </a>
          </div>

          <div className="footer-minimal__right">
            <a href="#hero" className="footer-minimal__top-btn">
              &uarr; Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
