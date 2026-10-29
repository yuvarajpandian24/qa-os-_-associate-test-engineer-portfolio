import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import { TAB_DEFINITIONS } from '../../data/initialData';
import { GitBranch, CheckCircle2, Wifi, WifiOff, Terminal, Shield } from 'lucide-react';

export const EditorStatusBar: React.FC = () => {
  const {
    activeTab,
    metrics,
    isOffline,
    toggleTerminal,
    setIsAdminOpen,
    theme,
  } = useConfig();

  const currentTab = TAB_DEFINITIONS.find((t) => t.id === activeTab) || TAB_DEFINITIONS[0];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 h-7 bg-[#161B22] dark:bg-[#161B22] light:bg-slate-200 border-t border-[#30363D] dark:border-[#30363D] light:border-slate-300 px-3 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none no-print">
      {/* Left zone: Git branch, current buffer, test suite indicator */}
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1 text-slate-300 dark:text-slate-300 light:text-slate-800 whitespace-nowrap">
          <GitBranch className="w-3 h-3 text-emerald-400" />
          <span>main</span>
        </div>

        <span className="text-slate-600 hidden sm:inline">|</span>

        <div className="hidden sm:flex items-center gap-1.5 text-slate-300 dark:text-slate-300 light:text-slate-800 truncate">
          <span className="text-slate-500">buffer:</span>
          <span className="text-emerald-400 font-medium">~/qa-os/{currentTab.id}.spec.ts</span>
        </div>

        <span className="text-slate-600 hidden md:inline">|</span>

        <div className="hidden md:flex items-center gap-1 text-emerald-400 whitespace-nowrap">
          <CheckCircle2 className="w-3 h-3" />
          <span>CI Passing ({metrics.overallPassRate}%)</span>
        </div>
      </div>

      {/* Right zone: Terminal toggle, network state, encoding, admin */}
      <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
        <button
          onClick={toggleTerminal}
          className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer"
          title="Toggle Terminal Emulator (Ctrl+K)"
        >
          <Terminal className="w-3 h-3" />
          <span className="hidden sm:inline">Terminal</span>
        </button>

        <span className="text-slate-600 hidden sm:inline">|</span>

        {/* Network / Offline state */}
        <div
          className={`flex items-center gap-1 ${
            isOffline ? 'text-amber-400' : 'text-slate-400'
          }`}
          title={isOffline ? 'Offline Mode (Local Cache Active)' : 'Online Synchronization Active'}
        >
          {isOffline ? <WifiOff className="w-3 h-3 text-amber-400" /> : <Wifi className="w-3 h-3 text-emerald-400" />}
          <span className="hidden sm:inline">{isOffline ? 'Offline Cache' : 'Online'}</span>
        </div>

        <span className="text-slate-600 hidden lg:inline">|</span>

        <span className="hidden lg:inline text-slate-500">UTF-8</span>
        <span className="hidden lg:inline text-slate-500">Spaces: 2</span>

        <span className="text-slate-600">|</span>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
          title="Admin Config Studio (PIN: qa2026)"
        >
          <Shield className="w-3 h-3" />
          <span className="hidden sm:inline">Admin</span>
        </button>
      </div>
    </footer>
  );
};
