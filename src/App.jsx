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
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ContactSection from './components/sections/ContactSection';
import { useTiltEffect } from './hooks/useTiltEffect';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { initGA } from './utils/analytics';

export default function App() {
  useTiltEffect();
  useScrollAnimations();

  React.useEffect(() => {
    initGA();
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <StarCanvas />
      <FuturisticCursor />

      <div id="content">
        <Header />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <AchievementsSection />
          <ContactSection />
        </main>

        <Footer />
        <ScrollProgress />
        <div className="end-line" />
      </div>

      <StarOverlay />
    </>
  );
}
