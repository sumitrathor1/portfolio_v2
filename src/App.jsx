import React from 'react';
import Header from './components/navigation/Header';
import Footer from './components/layout/Footer';
import StarCanvas from './components/layout/StarCanvas';
import StarOverlay from './components/layout/StarOverlay';
import ScrollProgress from './components/common/ScrollProgress';
import FuturisticCursor from './components/common/FuturisticCursor';
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
          {/* Main sections will go here */}
        </main>

        <Footer />
        <ScrollProgress />
        <div className="end-line" />
      </div>

      <StarOverlay />
    </>
  );
}
