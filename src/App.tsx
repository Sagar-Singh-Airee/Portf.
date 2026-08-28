import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ExhibitionsSection } from './components/ExhibitionsSection';
import { ContactSection } from './components/ContactSection';
import { OutroTypography } from './components/OutroTypography';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ProjectModal } from './components/ProjectModal';
import { TicketModal } from './components/TicketModal';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { ShowreelModal } from './components/ShowreelModal';

import { Project, Exhibition } from './types';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  // Cursor state
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'view' | 'hover' | 'hidden'>('default');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // Cursor handlers
  const handleHoverCard = (text: string) => {
    setCursorText(text);
    setCursorVariant('view');
  };

  const handleLeaveCard = () => {
    setCursorText('');
    setCursorVariant('default');
  };

  const handleHoverLink = () => {
    setCursorVariant('hover');
  };

  const handleLeaveLink = () => {
    setCursorVariant('default');
  };

  // Project handlers
  const handleSelectProject = (proj: Project) => {
    setSelectedProject(proj);
    setIsProjectModalOpen(true);
  };

  // Exhibition handlers
  const handleSelectExhibition = (ex: Exhibition) => {
    setSelectedExhibition(ex);
    setIsTicketModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F8F7F3] text-[#050505] font-sans selection:bg-[#FFB52E] selection:text-[#050505]">
      {/* Bespoke Desktop Custom Cursor */}
      <CustomCursor cursorText={cursorText} cursorVariant={cursorVariant} />

      {/* Top Fixed Minimalist Navigation Bar */}
      <Navbar
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
        onHoverLink={handleHoverLink}
        onLeaveLink={handleLeaveLink}
      />

      <main>
        {/* Section 1: Hero Section */}
        <Hero
          onHoverCard={handleHoverCard}
          onLeaveCard={handleLeaveCard}
          onOpenReel={() => setIsShowreelOpen(true)}
        />

        {/* Section 2: Dramatic Black About Section */}
        <AboutSection
          onHoverCard={handleHoverCard}
          onLeaveCard={handleLeaveCard}
          onOpenInquiry={() => setIsInquiryModalOpen(true)}
        />

        {/* Section 3: Asymmetric Editorial Portfolio Section */}
        <PortfolioSection
          onSelectProject={handleSelectProject}
          onHoverCard={handleHoverCard}
          onLeaveCard={handleLeaveCard}
        />

        {/* Section 4: Exhibitions / Experience Schedule */}
        <ExhibitionsSection
          onSelectExhibition={handleSelectExhibition}
          onHoverCard={handleHoverCard}
          onLeaveCard={handleLeaveCard}
        />

        {/* Section 5: Dramatic Black Contact Section */}
        <ContactSection
          onOpenInquiry={() => setIsInquiryModalOpen(true)}
          onHoverCard={handleHoverCard}
          onLeaveCard={handleLeaveCard}
        />

        {/* Section 6: Oversized Outro Typography ("vidéaste") */}
        <OutroTypography />
      </main>

      {/* Section 7: Minimalist Editorial Footer */}
      <Footer
        onHoverLink={handleHoverLink}
        onLeaveLink={handleLeaveLink}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        allProjects={PROJECTS}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenInquiry={() => {
          setIsProjectModalOpen(false);
          setIsInquiryModalOpen(true);
        }}
      />

      <TicketModal
        exhibition={selectedExhibition}
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      <ProjectInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />
    </div>
  );
}
