import React from 'react';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import { Navbar } from './components/layout/Navbar';
import { EditorStatusBar } from './components/layout/EditorStatusBar';
import { InteractiveTerminal } from './components/terminal/InteractiveTerminal';
import { ResumeModal } from './components/resume/ResumeModal';
import { AdminStudioModal } from './components/admin/AdminStudioModal';

import { LetsBegin } from './components/pages/LetsBegin';
import { WhatIBuild } from './components/pages/WhatIBuild';
import { TheJourney } from './components/pages/TheJourney';
import { HowILearned } from './components/pages/HowILearned';
import { CuratedChaos } from './components/pages/CuratedChaos';
import { LetsTalk } from './components/pages/LetsTalk';
import { SiteFooter } from './components/layout/SiteFooter';

const PortfolioContent: React.FC = () => {
  const { activeTab } = useConfig();

  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] dark:bg-[#0D1117] light:bg-[#F6F8FA] text-[#C9D1D9] dark:text-[#C9D1D9] light:text-slate-800 transition-colors selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* 1-Row 3-Zone Navigation */}
      <Navbar />

      {/* Main Code Editor Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24">
        {activeTab === 'begin' && <LetsBegin />}
        {activeTab === 'build' && <WhatIBuild />}
        {activeTab === 'journey' && <TheJourney />}
        {activeTab === 'learned' && <HowILearned />}
        {activeTab === 'chaos' && <CuratedChaos />}
        {activeTab === 'talk' && <LetsTalk />}

        {/* Global Footer with Instagram, X, LinkedIn, and GitHub on every tab */}
        <SiteFooter />
      </main>

      {/* Integrated Terminal Emulator */}
      <InteractiveTerminal />

      {/* IDE Status Strip */}
      <EditorStatusBar />

      {/* Modals */}
      <ResumeModal />
      <AdminStudioModal />
    </div>
  );
};

export default function App() {
  return (
    <ConfigProvider>
      <PortfolioContent />
    </ConfigProvider>
  );
}
