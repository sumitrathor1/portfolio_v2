import { useEffect } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('[data-aos], .reveal');
      const windowHeight = window.innerHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight - 60) {
          el.classList.add('aos-animate');
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially
    handleScroll();

    // In case content renders after mount
    const timer = setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
}
