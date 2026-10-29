import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import {
  Shield,
  Lock,
  Unlock,
  X,
  Save,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
} from 'lucide-react';

export const AdminStudioModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    profile,
    updateProfile,
    metrics,
    updateMetrics,
    projects,
    updateProject,
    exportJson,
    importJson,
    resetToDefaults,
  } = useConfig();

  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'metrics' | 'suites' | 'json'>('profile');

  // JSON import state
  const [jsonPaste, setJsonPaste] = useState('');
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);

  if (!isAdminOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'qa2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid PIN code. Hint: qa2026');
    }
  };

  const handleImportSubmit = () => {
    if (!jsonPaste.trim()) return;
    const res = importJson(jsonPaste);
    setImportStatus(res);
    if (res.success) {
      setJsonPaste('');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all portfolio data back to defaults?')) {
      resetToDefaults();
      setIsAdminOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#161B22] border border-[#30363D] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-mono text-xs text-slate-300">
        {/* Header Bar */}
        <div className="h-11 bg-[#0D1117] border-b border-[#30363D] px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-100">Central Configuration Admin Studio</span>
            {isAuthenticated && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                AUTHORIZED
              </span>
            )}
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="text-slate-400 hover:text-white px-2 py-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Auth Barrier if not yet authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 text-center space-y-4 max-w-sm mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-100 font-sans">
                Admin Console Authentication
              </h2>
              <p className="text-slate-400 text-[11px] font-sans">
                Enter your security PIN to modify portfolio metrics, test suite links, and data structures.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3 pt-2">
              <input
                type="password"
                placeholder="Enter PIN (Default: qa2026)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className="w-full text-center tracking-widest text-sm px-3 py-2 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />

              {authError && <div className="text-rose-400 text-[11px]">{authError}</div>}

              <button
                type="submit"
                className="w-full py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors cursor-pointer"
              >
                Unlock Studio
              </button>
            </form>

            <div className="text-[10px] text-slate-500">
              Demo credentials: PIN is <code className="text-emerald-400">qa2026</code>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Admin Nav Tabs */}
            <div className="px-4 py-2 bg-[#0D1117] border-b border-[#30363D] flex items-center gap-2 overflow-x-auto">
              {[
                { id: 'profile', label: 'Candidate Profile' },
                { id: 'metrics', label: 'QA Metrics' },
                { id: 'suites', label: 'Framework Suites' },
                { id: 'json', label: 'JSON Export & Import' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-[#21262D] text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Admin View Pane */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-4 max-w-xl">
                  <div className="space-y-1">
                    <label className="text-slate-400 block">Candidate Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => updateProfile({ name: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Job Role / Title</label>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => updateProfile({ role: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfile({ email: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => updateProfile({ location: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 block">GitHub URL</label>
                      <input
                        type="text"
                        value={profile.github}
                        onChange={(e) => updateProfile({ github: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 block">LinkedIn URL</label>
                      <input
                        type="text"
                        value={profile.linkedin}
                        onChange={(e) => updateProfile({ linkedin: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 block">X (Twitter) URL</label>
                      <input
                        type="text"
                        value={profile.x || ''}
                        onChange={(e) => updateProfile({ x: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 block">Instagram URL</label>
                      <input
                        type="text"
                        value={profile.instagram || ''}
                        onChange={(e) => updateProfile({ instagram: e.target.value })}
                        className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Candidate Bio / Learner Statement</label>
                    <textarea
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => updateProfile({ bio: e.target.value })}
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Metrics Tab */}
              {activeTab === 'metrics' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                  <div className="space-y-1">
                    <label className="text-slate-400 block">Total Test Cases</label>
                    <input
                      type="number"
                      value={metrics.totalTestCases}
                      onChange={(e) =>
                        updateMetrics({ totalTestCases: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Overall Pass Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={metrics.overallPassRate}
                      onChange={(e) =>
                        updateMetrics({ overallPassRate: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Flakiness Index (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={metrics.flakinessIndexPercent}
                      onChange={(e) =>
                        updateMetrics({ flakinessIndexPercent: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 block">Pre-Prod Defects Caught</label>
                    <input
                      type="number"
                      value={metrics.preProdDefectsCaught}
                      onChange={(e) =>
                        updateMetrics({ preProdDefectsCaught: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Suites Tab */}
              {activeTab === 'suites' && (
                <div className="space-y-4">
                  {projects.map((suite) => (
                    <div
                      key={suite.id}
                      className="p-3.5 rounded bg-[#0D1117] border border-[#30363D] space-y-2"
                    >
                      <div className="font-bold text-emerald-400">{suite.framework}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-500 block">Suite Name</label>
                          <input
                            type="text"
                            value={suite.name}
                            onChange={(e) => updateProject(suite.id, { name: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-[#161B22] border border-[#30363D] text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 block">GitHub Repo URL</label>
                          <input
                            type="text"
                            value={suite.repoUrl}
                            onChange={(e) => updateProject(suite.id, { repoUrl: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-[#161B22] border border-[#30363D] text-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* JSON Export / Import Tab */}
              {activeTab === 'json' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={exportJson}
                      className="flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download JSON Backup</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#21262D] hover:bg-rose-500/20 text-rose-300 border border-[#30363D] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-400 block font-semibold">
                      Paste JSON Configuration to Restore / Synchronize:
                    </label>
                    <textarea
                      rows={6}
                      placeholder='Paste valid JSON here (e.g. {"profile": {...}, "metrics": {...}})...'
                      value={jsonPaste}
                      onChange={(e) => setJsonPaste(e.target.value)}
                      className="w-full p-2.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-200 font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                    />

                    {importStatus && (
                      <div
                        className={`p-2 rounded flex items-center gap-2 text-xs ${
                          importStatus.success
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {importStatus.success ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        <span>{importStatus.message}</span>
                      </div>
                    )}

                    <button
                      onClick={handleImportSubmit}
                      disabled={!jsonPaste.trim()}
                      className="flex items-center gap-2 px-4 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer disabled:opacity-40"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Validate & Apply JSON</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Footer bar */}
            <div className="p-3 bg-[#0D1117] border-t border-[#30363D] flex justify-between items-center text-[10px] text-slate-500">
              <span>All changes automatically persist in local browser storage.</span>
              <button
                onClick={() => setIsAdminOpen(false)}
                className="px-3 py-1 rounded bg-[#21262D] text-slate-300 hover:text-white cursor-pointer"
              >
                Close Admin Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
