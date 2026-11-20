import React, { useEffect, useRef } from 'react';

export default function FuturisticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isTouch && !prefersReduced) {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      let mouseX = -100;
      let mouseY = -100;
      let ringX = -100;
      let ringY = -100;
      let animId;

      const onMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      };

      const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        animId = requestAnimationFrame(renderCursor);
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      animId = requestAnimationFrame(renderCursor);

      const attachHover = () => {
        const interactables = document.querySelectorAll(
          'a, button, input, textarea, select, .skill-chip, .glass-panel, .btn, .hover-lift, .coursework-chip, .project-tech-pill, .tech-pill'
        );
        interactables.forEach((el) => {
          if (el.dataset.cursorBound) return;
          el.dataset.cursorBound = 'true';
          el.addEventListener('mouseenter', () => ring.classList.add('active-hover'));
          el.addEventListener('mouseleave', () => ring.classList.remove('active-hover'));
        });
      };

      attachHover();
      const obs = new MutationObserver(attachHover);
      obs.observe(document.body, { childList: true, subtree: true });

      const onMouseLeave = () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      };
      const onMouseEnter = () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      };

      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mouseenter', onMouseEnter);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
        document.removeEventListener('mouseenter', onMouseEnter);
        cancelAnimationFrame(animId);
        obs.disconnect();
      };
    } else {
      // Mobile touch sparkle effect
      let lastTouchTime = 0;
      const createTouchSparkle = (x, y) => {
        const now = Date.now();
        if (now - lastTouchTime < 60) return;
        lastTouchTime = now;

        const particle = document.createElement('div');
        particle.className = 'touch-sparkle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);

        setTimeout(() => {
          if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, 500);
      };

      const onTouch = (e) => {
        if (e.touches.length) {
          createTouchSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      window.addEventListener('touchstart', onTouch, { passive: true });
      window.addEventListener('touchmove', onTouch, { passive: true });

      return () => {
        window.removeEventListener('touchstart', onTouch);
        window.removeEventListener('touchmove', onTouch);
      };
    }
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
