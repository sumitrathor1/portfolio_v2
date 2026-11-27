import { useEffect } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-aos], .reveal'));
    if (targets.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => {
        el.classList.add('aos-animate', 'visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        el.classList.add('aos-animate', 'visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);
}
