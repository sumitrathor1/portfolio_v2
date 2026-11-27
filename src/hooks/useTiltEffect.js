import { useEffect } from 'react';

export function useTiltEffect() {
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    const maxTilt = 5;
    const selector = '.project-card, .experience-card, .education-card, .achievement-card, .stat-card';

    const bindTilt = (card) => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';

      let rect = null;
      let rafId = null;

      const onMouseEnter = () => {
        rect = card.getBoundingClientRect();
        card.style.transition = 'transform 0.12s ease-out, box-shadow 0.22s ease, border-color 0.22s ease';
      };

      const onMouseMove = (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -maxTilt;
          const rotateY = ((x - centerX) / centerX) * maxTilt;

          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });
      };

      const onMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rect = null;
        card.style.transition = 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease, border-color 0.25s ease';
        card.style.transform = '';
      };

      card.addEventListener('mouseenter', onMouseEnter, { passive: true });
      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
    };

    const initTilt = () => {
      document.querySelectorAll(selector).forEach(bindTilt);
    };

    initTilt();
    const timer = setTimeout(initTilt, 400);

    return () => {
      clearTimeout(timer);
    };
  }, []);
}
