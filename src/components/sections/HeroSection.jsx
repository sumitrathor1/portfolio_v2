import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { personalInfo } from '../../data/personalInfo';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  useEffect(() => {
    const fullText = personalInfo.name;
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(interval);
      }
    }, 180);

    return () => clearInterval(interval);
  }, []);

  const handleSecretClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 10) {
      clickCountRef.current = 0;
      Swal.fire({
        title: "Portfolio Management",
        text: "You unlocked the secret developer console! This portfolio is now fully static, React + Vite powered, and deployed without PHP or MySQL.",
        icon: "info",
        confirmButtonText: "Awesome!",
        customClass: {
          popup: "swal2-admin-login"
        }
      });
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 4000);
  };

  return (
    <section
      className="section hero-section container-xxl"
      id="hero"
      style={{ backgroundImage: "url('/assets/images/bg-dark.png')" }}
    >
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <div className="content-shell">
        <div className="row align-items-center gy-5 position-relative">
          {/* LEFT CONTENT */}
          <div className="col-12 col-lg-6 hero-copy" data-aos="fade-right">
            <div className="eyebrow-chip mb-3">
              <span className="pulse-dot" />
              <p className="eyebrow-text">{personalInfo.role}</p>
            </div>

            <h1 className="hero-title mb-3">
              Hi, I’m <br />
              <span
                id="typing-text"
                className={`gradient-text ${isTypingComplete ? 'stop-cursor' : ''}`}
                onClick={handleSecretClick}
                title="Click me"
                style={{ cursor: 'pointer' }}
              >
                {typedText}
              </span>
            </h1>

            <p className="hero-lead mb-4">
              {personalInfo.lead}
            </p>

            <div className="hero-tags mb-4">
              {personalInfo.tags.map((tag) => (
                <span key={tag} className="hero-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="hero-actions mb-4">
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary-ghost hover-lift"
              >
                Download Resume
              </a>
              <a href="#projects" className="btn btn-primary-gradient hover-lift">
                View Projects
              </a>
              <a href="#contact-us" className="btn btn-secondary-ghost hover-lift">
                Contact Me
              </a>
            </div>

            <div className="hero-social" aria-label="Social links">
              <a
                href="https://www.linkedin.com/in/sumitrathor/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift"
                aria-label="LinkedIn Profile"
              >
                <i className="fab fa-linkedin" />
              </a>
              <a
                href="https://github.com/sumitrathor1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift"
                aria-label="GitHub Profile"
              >
                <i className="fab fa-github" />
              </a>
              <a
                href="mailto:sumitrathor142272@gmail.com"
                className="hover-lift"
                aria-label="Send Email to Sumit Rathor"
              >
                <i className="fa-solid fa-envelope" />
              </a>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="col-12 col-lg-6 d-flex justify-content-end hero-visual" data-aos="fade-left">
            <div className="hero-portrait">
              <div className="portrait-frame">
                <img
                  src={personalInfo.heroImage}
                  alt="Sumit Rathor - Full Stack Software Engineer portrait"
                  width="540"
                  height="540"
                  fetchpriority="high"
                  decoding="sync"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
