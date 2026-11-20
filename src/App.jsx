import React, { useState, useEffect } from 'react';
import Header from './components/navigation/Header';
import Footer from './components/layout/Footer';
import StarCanvas from './components/layout/StarCanvas';
import StarOverlay from './components/layout/StarOverlay';
import ScrollProgress from './components/common/ScrollProgress';
import BackToTop from './components/common/BackToTop';
import FuturisticCursor from './components/common/FuturisticCursor';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import AchievementsSection from './components/sections/AchievementsSection';
import ContactSection from './components/sections/ContactSection';
import DeveloperActivity from './features/developer/DeveloperActivity';
import Chatbot from './features/chatbot/Chatbot';
import RecruiterSnapshotModal from './features/recruiter/RecruiterSnapshotModal';
import { features } from './config/features';
import { useTiltEffect } from './hooks/useTiltEffect';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { initGA } from './utils/analytics';

export default function App() {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);

  if (features.cardTilt) {
    useTiltEffect();
  }
  useScrollAnimations();

  useEffect(() => {
    initGA();
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {features.starCanvas && <StarCanvas />}
      {features.futuristicCursor && <FuturisticCursor />}

      <div id="content">
        <Header onOpenRecruiter={() => setIsRecruiterOpen(true)} />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          {features.developerActivity && <DeveloperActivity />}
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <AchievementsSection />
          <ContactSection />
        </main>

        <Footer />
        <ScrollProgress />
        {features.backToTop && <BackToTop />}
        <div className="end-line" />
      </div>

      <StarOverlay />

      {/* INTERACTIVE CHATBOT (Sumit's Portfolio Assistant) */}
      {features.chatbot && <Chatbot />}

      {/* RECRUITER 60-SECOND SNAPSHOT MODAL */}
      {features.recruiterSnapshot && (
        <RecruiterSnapshotModal
          isOpen={isRecruiterOpen}
          onClose={() => setIsRecruiterOpen(false)}
        />
      )}
    </>
  );
}
