import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { TAB_DEFINITIONS } from '../../data/initialData';
import { TabId } from '../../types';
import {
  Sun,
  Moon,
  Terminal,
  FileDown,
  Shield,
  Menu,
  X,
  Bug,
  CheckCircle2,
  Cpu,
  GitCommit,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-3.5 h-3.5" />,
  Cpu: <Cpu className="w-3.5 h-3.5" />,
  GitCommit: <GitCommit className="w-3.5 h-3.5" />,
  BookOpen: <BookOpen className="w-3.5 h-3.5" />,
  AlertTriangle: <Bug className="w-3.5 h-3.5" />,
  MessageSquare: <MessageSquare className="w-3.5 h-3.5" />,
};

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    toggleTerminal,
    isTerminalOpen,
    setIsAdminOpen,
    setIsResumeOpen,
    profile,
  } = useConfig();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#30363D] dark:border-[#30363D] light:border-slate-200 bg-[#0D1117]/95 dark:bg-[#0D1117]/95 light:bg-white/95 backdrop-blur-md">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <button
            onClick={() => handleTabClick('begin')}
            className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-slate-100 dark:text-slate-100 light:text-slate-900 hover:text-emerald-400 dark:hover:text-emerald-400 transition-colors focus:outline-none"
            title="QA Operating System v1.0"
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span>QA-OS</span>
            <span className="text-slate-500 font-normal">/</span>
            <span className="text-emerald-400 font-medium">{profile.name}</span>
          </button>
        </div>

        {/* Zone 2: The 6 exact navigation tabs (desktop single-line links) */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {TAB_DEFINITIONS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#161B22] dark:bg-[#161B22] light:bg-slate-100 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 shadow-xs'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-[#161B22]/50'
                }`}
              >
                <span className={isActive ? 'text-emerald-400' : 'text-slate-500'}>
                  {iconMap[tab.fileIcon] || <Terminal className="w-3.5 h-3.5" />}
                </span>
                <span>{tab.name}</span>
                {tab.id === 'chaos' && (
                  <span className="px-1.5 py-0.2 text-[10px] font-mono rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    4
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Terminal, Resume, Theme, Admin, Mobile Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Terminal Launcher */}
          <button
            onClick={toggleTerminal}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono rounded-md border transition-all cursor-pointer ${
              isTerminalOpen
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                : 'bg-[#161B22] dark:bg-[#161B22] light:bg-slate-100 border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-slate-500'
            }`}
            title="Toggle Debug Terminal (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Terminal</span>
            <kbd className="hidden lg:inline text-[10px] px-1 py-0.5 bg-[#0D1117] rounded border border-slate-700 text-slate-400">
              ^K
            </kbd>
          </button>

          {/* Download PDF Resume CTA */}
          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
            <span className="sm:hidden">PDF</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md border border-[#30363D] dark:border-[#30363D] light:border-slate-300 bg-[#161B22] dark:bg-[#161B22] light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-emerald-400 transition-colors cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Central Admin Settings */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-1.5 rounded-md border border-[#30363D] dark:border-[#30363D] light:border-slate-300 bg-[#161B22] dark:bg-[#161B22] light:bg-slate-100 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            title="Open Central Config Admin (PIN: qa2026)"
            aria-label="Open Admin Settings"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md border border-[#30363D] text-slate-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Code Editor Tabs Bar for Mobile & Secondary Navigation */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-1.5 border-t border-[#30363D]/60 overflow-x-auto scrollbar-none bg-[#161B22]/70">
        {TAB_DEFINITIONS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#0D1117] text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#30363D] bg-[#161B22] px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider px-2 pb-1 border-b border-[#30363D]">
            QA Operating System Tabs
          </div>
          {TAB_DEFINITIONS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-mono rounded-md text-left ${
                activeTab === tab.id
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-300 hover:bg-[#0D1117]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-slate-500 text-xs">0{idx + 1}.</span>
                <span>{tab.name}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase">{tab.badge}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-[#30363D] flex items-center gap-2">
            <button
              onClick={() => {
                toggleTerminal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono rounded-md bg-[#0D1117] border border-[#30363D] text-slate-200"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isTerminalOpen ? 'Hide Terminal' : 'Open Terminal'}</span>
            </button>
            <button
              onClick={() => {
                setIsResumeOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-mono font-medium rounded-md bg-emerald-500 text-slate-950"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
