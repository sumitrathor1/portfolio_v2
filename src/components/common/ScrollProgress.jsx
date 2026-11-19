import React, { useEffect, useRef, useState } from 'react';

export default function ScrollProgress() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const indicatorRef = useRef(null);
  const handleRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progressVal, setProgressVal] = useState(0);

  const clamp = (val, min = 0, max = 1) => Math.min(Math.max(val, min), max);

  const setProgress = (ratio) => {
    const clamped = clamp(ratio);
    const handlePos = 1 - clamped;

    if (rootRef.current) {
      rootRef.current.style.setProperty('--scroll-progress', handlePos.toString());
    }
    if (indicatorRef.current) {
      indicatorRef.current.style.height = `${clamped * 100}%`;
    }
    setProgressVal(Math.round(clamped * 100));
    return clamped;
  };

  const updateScroll = () => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const viewportHeight = window.innerHeight || clientHeight;
    const scrollableDistance = scrollHeight - viewportHeight;

    if (scrollableDistance <= 0) {
      setProgress(0);
      setIsVisible(false);
      return;
    }

    const ratio = clamp(window.scrollY / scrollableDistance);
    setProgress(ratio);

    if (ratio > 0.02 || window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    updateScroll();

    let resizeObs;
    if (window.ResizeObserver) {
      resizeObs = new ResizeObserver(updateScroll);
      resizeObs.observe(document.body);
    }

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      if (resizeObs) resizeObs.disconnect();
    };
  }, []);

  const scrollToRatio = (ratio, behavior = 'auto') => {
    const clamped = clamp(ratio);
    const { scrollHeight, clientHeight } = document.documentElement;
    const viewportHeight = window.innerHeight || clientHeight;
    const scrollableDistance = Math.max(scrollHeight - viewportHeight, 0);

    setProgress(clamped);
    window.scrollTo({
      top: scrollableDistance * clamped,
      behavior
    });
  };

  const getPointerRatio = (e) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    const clientY = typeof e.clientY === 'number' ? e.clientY : rect.top;
    const ratio = (clientY - rect.top) / rect.height;
    return clamp(ratio);
  };

  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    setIsDragging(true);
    handleRef.current?.focus({ preventScroll: true });

    e.preventDefault();
    scrollToRatio(1 - getPointerRatio(e));

    const onMove = (moveEvt) => {
      moveEvt.preventDefault();
      scrollToRatio(1 - getPointerRatio(moveEvt));
    };

    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  const handleKeyDown = (e) => {
    const currentRatio = progressVal / 100;
    const smallStep = e.shiftKey ? 0.15 : 0.08;
    const largeStep = e.shiftKey ? 0.5 : 0.25;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        scrollToRatio(currentRatio + smallStep, 'smooth');
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        scrollToRatio(currentRatio - smallStep, 'smooth');
        break;
      case 'PageDown':
        e.preventDefault();
        scrollToRatio(currentRatio + largeStep, 'smooth');
        break;
      case 'PageUp':
        e.preventDefault();
        scrollToRatio(currentRatio - largeStep, 'smooth');
        break;
      case 'Home':
        e.preventDefault();
        scrollToRatio(0, 'smooth');
        break;
      case 'End':
        e.preventDefault();
        scrollToRatio(1, 'smooth');
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={rootRef}
      className={`scroll-progress ${isVisible ? 'scroll-progress--visible' : ''} ${isDragging ? 'scroll-progress--dragging' : ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="scroll-progress__track"
        onPointerDown={handlePointerDown}
      >
        <div ref={indicatorRef} className="scroll-progress__indicator" />
        <button
          ref={handleRef}
          type="button"
          className="scroll-progress__handle"
          aria-label="Scroll position"
          role="slider"
          aria-orientation="vertical"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={progressVal}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
