import { useEffect } from 'react';

export function useTiltEffect() {
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const maxTilt = 6;

    const bindTilt = (card) => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = 'true';

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
      };

      const onMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    };

    const initTilt = () => {
      const targets = document.querySelectorAll('.glass-panel, .project-card, .experience-card, .education-card, .achievement-card, .stat-card');
      targets.forEach(bindTilt);
    };

    initTilt();
    const obs = new MutationObserver(initTilt);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
    };
  }, []);
}
