import React from 'react';
import Header from './components/navigation/Header';
import Footer from './components/layout/Footer';
import StarCanvas from './components/layout/StarCanvas';
import StarOverlay from './components/layout/StarOverlay';
import ScrollProgress from './components/common/ScrollProgress';
import FuturisticCursor from './components/common/FuturisticCursor';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import { useTiltEffect } from './hooks/useTiltEffect';
import { useScrollAnimations } from './hooks/useScrollAnimations';

export default function App() {
  useTiltEffect();
  useScrollAnimations();

  return (
    <>
      <StarCanvas />
      <FuturisticCursor />

      <div id="content">
        <Header />

        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
        </main>

        <Footer />
        <ScrollProgress />
        <div className="end-line" />
      </div>

      <StarOverlay />
    </>
  );
}
