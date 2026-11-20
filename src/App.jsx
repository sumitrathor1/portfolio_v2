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
import DeveloperTerminal from './features/terminal/DeveloperTerminal';
import CommandPalette from './features/palette/CommandPalette';
import SkillsExplorerModal from './features/skills/SkillsExplorerModal';
import ArchitectureExplorer from './features/projects/ArchitectureExplorer';
import { features } from './config/features';
import { useTiltEffect } from './hooks/useTiltEffect';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { initGA } from './utils/analytics';
import { initEasterEggs } from './utils/easterEgg';

export default function App() {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSkillsExplorerOpen, setIsSkillsExplorerOpen] = useState(false);
  const [selectedSkillForExplorer, setSelectedSkillForExplorer] = useState(null);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);

  if (features.cardTilt) {
    useTiltEffect();
  }
  useScrollAnimations();

  useEffect(() => {
    initGA();

    // Listen for custom toggle-command-palette event from global keys
    const handlePaletteEvent = () => setIsPaletteOpen((prev) => !prev);
    window.addEventListener('toggle-command-palette', handlePaletteEvent);

    // Easter egg listener
    const cleanupEasterEgg = initEasterEggs(() => {
      setEasterEggUnlocked(true);
      setTimeout(() => setEasterEggUnlocked(false), 6000);
    });

    return () => {
      window.removeEventListener('toggle-command-palette', handlePaletteEvent);
      cleanupEasterEgg?.();
    };
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {features.starCanvas && <StarCanvas />}
      {features.futuristicCursor && <FuturisticCursor />}

      <div id="content">
        <Header
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenCommandPalette={() => setIsPaletteOpen(true)}
        />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          {features.developerActivity && <DeveloperActivity />}
          <ProjectsSection
            onOpenArchitecture={() => setIsArchitectureOpen(true)}
          />
          <SkillsSection
            onSelectSkill={(skillName) => {
              setSelectedSkillForExplorer(skillName);
              setIsSkillsExplorerOpen(true);
            }}
          />
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

      {/* FLOATING TERMINAL LAUNCHER BUTTON (Bottom Left) */}
      {features.terminal && (
        <button
          type="button"
          className="terminal-floating-btn hover-lift"
          onClick={() => setIsTerminalOpen((prev) => !prev)}
          title="Open Developer Terminal (Ctrl+~)"
          aria-label="Open Developer Terminal"
        >
          <i className="fa-solid fa-terminal" />
          <span className="d-none d-sm-inline ms-1.5 fw-bold">CLI</span>
        </button>
      )}

      {/* INTERACTIVE CHATBOT (Sumit's Portfolio Assistant) */}
      {features.chatbot && <Chatbot />}

      {/* DEVELOPER COMMAND TERMINAL */}
      {features.terminal && (
        <DeveloperTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onToggle={() => setIsTerminalOpen((prev) => !prev)}
        />
      )}

      {/* QUICK COMMAND PALETTE (Ctrl+K) */}
      {features.commandPalette && (
        <CommandPalette
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenRecruiter={() => setIsRecruiterOpen(true)}
          onOpenArchitecture={() => setIsArchitectureOpen(true)}
        />
      )}

      {/* SKILLS-TO-PROJECTS INTERACTIVE EXPLORER */}
      {features.skillsExplorer && (
        <SkillsExplorerModal
          isOpen={isSkillsExplorerOpen}
          initialSkill={selectedSkillForExplorer}
          onClose={() => setIsSkillsExplorerOpen(false)}
        />
      )}

      {/* SYSTEM ARCHITECTURE EXPLORER */}
      {features.architectureExplorer && (
        <ArchitectureExplorer
          isOpen={isArchitectureOpen}
          onClose={() => setIsArchitectureOpen(false)}
        />
      )}

      {/* RECRUITER 60-SECOND SNAPSHOT MODAL */}
      {features.recruiterSnapshot && (
        <RecruiterSnapshotModal
          isOpen={isRecruiterOpen}
          onClose={() => setIsRecruiterOpen(false)}
        />
      )}

      {/* EASTER EGG UNLOCKED TOAST */}
      {easterEggUnlocked && (
        <div className="easter-egg-toast glass-panel" role="alert">
          <div className="d-flex align-items-center gap-3">
            <span className="easter-egg-badge">🎮 +500 XP</span>
            <div>
              <div className="fw-bold text-white">Konami Code Unlocked!</div>
              <div className="text-muted small">
                Welcome, fellow hacker! Developer terminal & secret matrix mode enabled.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
