import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { BugTicket, DefectSeverity, DefectStatus } from '../../types';
import {
  Bug,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  Zap,
  Filter,
  ShieldAlert,
  Terminal,
  RotateCcw,
  Plus,
} from 'lucide-react';

export const CuratedChaos: React.FC = () => {
  const { bugTickets, addCommentToTicket, addBugTicket, profile } = useConfig();
  const [selectedTicket, setSelectedTicket] = useState<BugTicket | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  // Chaos Simulator state
  const [chaosRunning, setChaosRunning] = useState(false);
  const [chaosLog, setChaosLog] = useState<string[]>([]);
  const [chaosOutcome, setChaosOutcome] = useState<'idle' | 'flaky_caught' | 'stable'>('idle');

  // Quick ticket creation modal
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketModule, setNewTicketModule] = useState('Checkout');
  const [newTicketSeverity, setNewTicketSeverity] = useState<DefectSeverity>('High');
  const [newTicketSteps, setNewTicketSteps] = useState('');
  const [newTicketExpected, setNewTicketExpected] = useState('');
  const [newTicketActual, setNewTicketActual] = useState('');

  const filteredTickets = bugTickets.filter((t) => {
    if (severityFilter === 'all') return true;
    return t.severity.toLowerCase() === severityFilter.toLowerCase();
  });

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !newCommentText.trim()) return;
    addCommentToTicket(selectedTicket.id, newCommentText, commentAuthor || undefined);
    setNewCommentText('');

    // Update local selected ticket view
    const updated = bugTickets.find((t) => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;

    addBugTicket({
      title: newTicketTitle,
      severity: newTicketSeverity,
      status: 'Triage',
      module: newTicketModule,
      discoveredIn: 'Manual Recruiter Inspection',
      reportedBy: profile.name,
      stepsToReproduce: newTicketSteps
        ? newTicketSteps.split('\n')
        : ['1. Load active application route', '2. Trigger asynchronous user action'],
      expectedResult: newTicketExpected || 'Feature executes with atomic state consistency.',
      actualResult: newTicketActual || 'Intermittent timing discrepancy observed.',
      automationTestGuard: 'await expect(page.getByRole("alert")).toBeHidden();',
    });

    setIsCreatingTicket(false);
    setNewTicketTitle('');
    setNewTicketSteps('');
    setNewTicketExpected('');
    setNewTicketActual('');
  };

  const runChaosSimulation = () => {
    setChaosRunning(true);
    setChaosOutcome('idle');
    setChaosLog([
      '⚙ [Chaos Injection]: Spawning headless worker with 350ms artificial network latency...',
      '⚙ [Chaos Injection]: Injecting DOM micro-animation race condition on submit element...',
    ]);

    setTimeout(() => {
      setChaosLog((prev) => [
        ...prev,
        '⚠ [Attempt 1]: Standard locator hit ElementNotInteractableException (Element still animating).',
      ]);
    }, 500);

    setTimeout(() => {
      setChaosLog((prev) => [
        ...prev,
        '⚡ [Smart Retry Policy Triggered]: Web-first locator auto-waiting for actionability (pointer-events: auto, opacity: 1.0)...',
      ]);
    }, 1100);

    setTimeout(() => {
      setChaosLog((prev) => [
        ...prev,
        '✔ [Attempt 2 Pass]: Auto-wait completed in 420ms. Assertion verified with zero flakiness escape.',
        '★ Quality Gate Intact: Test healed automatically using web-first assertions without hardcoded sleep!',
      ]);
      setChaosRunning(false);
      setChaosOutcome('flaky_caught');
    }, 1700);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header buffer banner */}
      <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <Bug className="w-4 h-4" />
          <span>TRIAGE_BOARD // DEFECT ROOT-CAUSES & FLAKINESS MITIGATION</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
              Curated chaos: The BugTracker Triage Board
            </h1>
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-2xl leading-relaxed mt-1">
              Real-world bugs caught, isolated, and guarded with automated regression tests. Examine defect reproduction steps, team triage conversations, or run the interactive Chaos Simulator.
            </p>
          </div>
          <button
            onClick={() => setIsCreatingTicket(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs font-mono transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Recruiter Defect</span>
          </button>
        </div>

        {/* Severity filter row */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto text-xs font-mono">
          <span className="text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['all', 'critical', 'high', 'medium'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer capitalize ${
                severityFilter === sev
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'bg-[#21262D] dark:bg-[#21262D] light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Chaos & Flakiness Simulator */}
      <div className="border border-amber-500/30 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-5 space-y-3 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <Zap className="w-4 h-4" />
            <span>Interactive Flakiness & Chaos Simulator</span>
          </div>
          <button
            onClick={runChaosSimulation}
            disabled={chaosRunning}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold transition-colors cursor-pointer disabled:opacity-50"
          >
            {chaosRunning ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Injecting Chaos...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Inject Latency & Race Condition</span>
              </>
            )}
          </button>
        </div>

        <p className="text-slate-400 text-[11px] font-sans">
          See in real time how resilient web-first assertions gracefully recover from simulated headless race conditions where traditional scripts crash.
        </p>

        {chaosLog.length > 0 && (
          <div className="p-3 rounded bg-[#0D1117] border border-[#30363D] space-y-1 text-slate-300">
            {chaosLog.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.includes('✔') || line.includes('★')
                    ? 'text-emerald-400 font-semibold'
                    : line.includes('⚠')
                    ? 'text-amber-400'
                    : 'text-slate-400'
                }
              >
                {line}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Defect Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTickets.map((ticket) => {
          let sevColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
          if (ticket.severity === 'Critical') {
            sevColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
          } else if (ticket.severity === 'Medium') {
            sevColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
          }

          return (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="p-5 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200 hover:border-emerald-500/50 transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-900 group-hover:text-emerald-400 transition-colors">
                    {ticket.id}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${sevColor}`}>
                    {ticket.severity}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#21262D] text-slate-400 border border-[#30363D]">
                  {ticket.status}
                </span>
              </div>

              <h2 className="text-sm sm:text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-emerald-300 transition-colors">
                {ticket.title}
              </h2>

              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <div>
                  <span className="text-slate-500">Module:</span> {ticket.module}
                </div>
                <div>
                  <span className="text-slate-500">Found via:</span> {ticket.discoveredIn}
                </div>
              </div>

              <div className="pt-2 border-t border-[#30363D]/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{ticket.comments.length} triage notes</span>
                </div>
                <span className="text-emerald-400 group-hover:underline">Inspect Details →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] bg-[#161B22] border border-[#30363D] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal header */}
            <div className="px-5 py-3.5 bg-[#0D1117] border-b border-[#30363D] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">{selectedTicket.id}</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-300">{selectedTicket.module}</span>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-white px-2 py-1 rounded"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs font-mono">
              <div>
                <h2 className="text-base font-bold text-slate-100 font-sans mb-1">
                  {selectedTicket.title}
                </h2>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span>Reported by: {selectedTicket.reportedBy}</span>
                  <span>·</span>
                  <span>Discovered in: {selectedTicket.discoveredIn}</span>
                </div>
              </div>

              {/* Steps to Reproduce */}
              <div className="p-3.5 rounded bg-[#0D1117] border border-[#30363D] space-y-2">
                <span className="text-amber-400 font-semibold uppercase text-[10px] block">
                  Steps to Reproduce
                </span>
                <div className="space-y-1 text-slate-300">
                  {selectedTicket.stepsToReproduce.map((step, sIdx) => (
                    <div key={sIdx}>{step}</div>
                  ))}
                </div>
              </div>

              {/* Expected vs Actual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-[#0D1117] border border-[#30363D] space-y-1">
                  <span className="text-emerald-400 font-semibold uppercase text-[10px] block">
                    Expected Behavior
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {selectedTicket.expectedResult}
                  </p>
                </div>
                <div className="p-3 rounded bg-[#0D1117] border border-[#30363D] space-y-1">
                  <span className="text-rose-400 font-semibold uppercase text-[10px] block">
                    Actual Behavior
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {selectedTicket.actualResult}
                  </p>
                </div>
              </div>

              {/* Automated Regression Guard */}
              {selectedTicket.automationTestGuard && (
                <div className="p-3 rounded bg-[#0D1117] border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-semibold uppercase text-[10px] block">
                    Automated Test Guard (CI Prevention)
                  </span>
                  <pre className="text-emerald-300 text-[11px] overflow-x-auto">
                    <code>{selectedTicket.automationTestGuard}</code>
                  </pre>
                </div>
              )}

              {/* Triage Comments Thread */}
              <div className="space-y-3 pt-2 border-t border-[#30363D]">
                <div className="text-slate-400 font-semibold uppercase text-[10px]">
                  Triage Discussion & Reproduction Notes
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedTicket.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-2.5 rounded bg-[#0D1117] border border-[#30363D] space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-semibold text-emerald-400">{comment.author}</span>
                        <span>{comment.timeAgo}</span>
                      </div>
                      <p className="text-slate-300 font-sans text-xs">{comment.content}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handlePostComment} className="space-y-2 pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Recruiter / Tech Lead)"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="w-1/3 px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      placeholder="Add reproduction note or triage comment..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors disabled:opacity-40 cursor-pointer"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Recruiter Defect Modal */}
      {isCreatingTicket && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#161B22] border border-[#30363D] rounded-lg shadow-2xl p-6 space-y-4 font-mono text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
              <span className="font-bold text-sm text-slate-100">Log Defect to Triage Backlog</span>
              <button onClick={() => setIsCreatingTicket(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Defect Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asynchronous race condition on search bar submit"
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Module</label>
                  <input
                    type="text"
                    value={newTicketModule}
                    onChange={(e) => setNewTicketModule(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Severity</label>
                  <select
                    value={newTicketSeverity}
                    onChange={(e) => setNewTicketSeverity(e.target.value as DefectSeverity)}
                    className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Steps to Reproduce (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="1. Open page&#10;2. Click button&#10;3. Inspect console"
                  value={newTicketSteps}
                  onChange={(e) => setNewTicketSteps(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingTicket(false)}
                  className="px-3 py-1.5 rounded bg-[#21262D] text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold cursor-pointer"
                >
                  Create Defect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
