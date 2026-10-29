import React, { useState, useRef, useEffect } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { TabId, TerminalOutputItem } from '../../types';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play, Trash2, CornerDownLeft } from 'lucide-react';

export const InteractiveTerminal: React.FC = () => {
  const {
    isTerminalOpen,
    setIsTerminalOpen,
    setActiveTab,
    projects,
    metrics,
    bugTickets,
    setIsResumeOpen,
    setIsAdminOpen,
    toggleTheme,
    profile,
  } = useConfig();

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isRunningSim, setIsRunningSim] = useState<boolean>(false);

  const [outputs, setOutputs] = useState<TerminalOutputItem[]>([
    {
      id: 'boot-1',
      type: 'system',
      content: '╔══════════════════════════════════════════════════════════════╗\n║  QA-OS v1.4.2 [BugTracker & Automation Debugger Environment]  ║\n║  Session: Recruiter Inspection Console · Shell: bash         ║\n╚══════════════════════════════════════════════════════════════╝\nType "help" for executable QA commands, or click the quick action chips below.',
      timestamp: '00:00:01',
    },
  ]);

  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs, isRunningSim]);

  if (!isTerminalOpen) return null;

  const quickCommands = [
    'help',
    'run test',
    'cucumber --tags @smoke',
    'cat report',
    'triage',
    'flaky --analyze',
    'metrics',
    'resume',
  ];

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const now = new Date().toTimeString().split(' ')[0];

    // Append input command
    setOutputs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        type: 'input',
        content: `$ ${trimmed}`,
        timestamp: now,
      },
    ]);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const subCmd = parts[1]?.toLowerCase();

    if (mainCmd === 'clear') {
      setOutputs([]);
      return;
    }

    if (mainCmd === 'help') {
      const helpText = `Available QA Commands:
  run test [suite]        - Execute automated test suite (e.g. playwright, selenium, cypress)
  cucumber [--tags @smoke] - Run Cucumber BDD feature scenarios with live assertions
  cat report              - Output latest test run execution summary
  triage                  - List open defect reports and reproduction tickets
  flaky --analyze         - Run flakiness diagnostic and locator race condition analysis
  metrics                 - Display QA metrics summary table (Pass Rate, Tests, CI speed)
  resume                  - Open/download the Associate Test Engineer PDF Resume
  goto [page]             - Navigate to: begin, build, journey, learned, chaos, talk
  theme [dark|light]      - Toggle editor interface theme
  admin                   - Launch Central Configuration Admin Console (PIN: qa2026)
  clear                   - Clear terminal screen`;

      setOutputs((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', content: helpText, timestamp: now },
      ]);
      return;
    }

    if (mainCmd === 'run' || mainCmd === 'npm' || mainCmd === 'yarn') {
      if (subCmd === 'test' || subCmd === 'run' || mainCmd === 'run') {
        setIsRunningSim(true);
        setOutputs((prev) => [
          ...prev,
          {
            id: `test-start-${Date.now()}`,
            type: 'system',
            content: `▶ Initializing Playwright Test Runner (Worker Threads: 4, Headless: true)...\nRunning 142 tests across 3 browsers (Chromium, Firefox, WebKit)...`,
            timestamp: now,
          },
        ]);

        // Simulate step output
        setTimeout(() => {
          setOutputs((prev) => [
            ...prev,
            {
              id: `test-step-1-${Date.now()}`,
              type: 'output',
              content: `  ✔ [chromium] › checkout.spec.ts:18:5 › Apply VIP15 promo code and verify cart total (412ms)\n  ✔ [webkit]   › customer_grid.spec.ts:32:5 › Dynamic AJAX filter reloads table rows (520ms)\n  ✔ [firefox]  › notification.spec.ts:12:3 › WebSocket mention broadcast banner visible (180ms)`,
              timestamp: now,
            },
          ]);
        }, 600);

        setTimeout(() => {
          setOutputs((prev) => [
            ...prev,
            {
              id: `test-finish-${Date.now()}`,
              type: 'success',
              content: `======================================================\n✔ 142 passed (100%) · 0 failed · 0 flaky\nExecution Time: 3.42s · Artifacts: trace.zip, allure-report.html\nResult: ALL QUALITY GATES PASSED`,
              timestamp: now,
            },
          ]);
          setIsRunningSim(false);
        }, 1300);
        return;
      }
    }

    if (mainCmd === 'cucumber') {
      setIsRunningSim(true);
      setOutputs((prev) => [
        ...prev,
        {
          id: `cuke-start-${Date.now()}`,
          type: 'system',
          content: `Feature: Checkout & Promotional Discount Validation (@e2e @checkout @smoke)\n  Scenario: Apply 15% VIP discount code on cart over $100\n    Given the customer has 2 items in their cart totaling $120.00 ... ✔ PASSED (410ms)\n    When they apply promo code "VIP15" and proceed to payment ... ✔ PASSED (520ms)\n    And they fill shipping address with valid postal details ... ✔ PASSED (290ms)\n    Then the subtotal reflects $102.00 after discount ... ✔ PASSED (110ms)\n    And the order confirmation should be displayed within 3 seconds ... ✔ PASSED (90ms)`,
          timestamp: now,
        },
      ]);

      setTimeout(() => {
        setOutputs((prev) => [
          ...prev,
          {
            id: `cuke-finish-${Date.now()}`,
            type: 'success',
            content: `1 scenario (1 passed)\n5 steps (5 passed)\nDuration: 1.42s\nGherkin compliance verified with 0 step definition mismatches.`,
            timestamp: now,
          },
        ]);
        setIsRunningSim(false);
      }, 700);
      return;
    }

    if (mainCmd === 'cat' && subCmd === 'report') {
      const report = `======================================================
TEST RUN EXECUTION REPORT (CI RUN #841)
Timestamp: ${new Date().toUTCString()}
Target: Staging Cluster (v2.8.4-rc)
======================================================
  Total Test Cases    : ${metrics.totalTestCases}
  Overall Pass Rate   : ${metrics.overallPassRate}%
  Flakiness Index     : ${metrics.flakinessIndexPercent}% (Target < 2.0%)
  Defects Caught      : ${metrics.preProdDefectsCaught} Pre-Production
  Automated Suites    : ${projects.length} Distinct Frameworks
  Average Run Time    : ${metrics.averageExecutionMinutes} min (Parallelized)
======================================================
STATUS: READY FOR RELEASE CANDIDATE DEPLOYMENT`;

      setOutputs((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', content: report, timestamp: now },
      ]);
      return;
    }

    if (mainCmd === 'triage') {
      const triageList = bugTickets
        .map(
          (t) =>
            `[${t.id}] [${t.severity.toUpperCase()}] ${t.title}\n   Status: ${t.status} | Module: ${t.module} | Guard: ${t.automationTestGuard ? 'Automated Test in Place' : 'Manual Triage'}`
        )
        .join('\n\n');

      setOutputs((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          content: `CURRENT DEFECT TRIAGE BACKLOG (Curated chaos):\n\n${triageList}`,
          timestamp: now,
        },
      ]);
      return;
    }

    if (mainCmd === 'flaky') {
      const flakyText = `FLAKINESS ROOT-CAUSE DIAGNOSTIC REPORT:
- Total Flakiness Score : ${metrics.flakinessIndexPercent}% (Exceptional stability)
- Primary Root Cause 1   : Async UI animation expanding after element lookup (Fixed via web-first locators)
- Primary Root Cause 2   : StaleElementReferenceException during AJAX table reload (Fixed via staleness wait)
- Primary Root Cause 3   : Local timezone UTC discrepancy on expiring auth tokens (Fixed via UTC epoch sync)
- Rule Enforced          : STRICT ZERO Thread.sleep() POLICY ACROSS ALL REPOSITORIES`;

      setOutputs((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', content: flakyText, timestamp: now },
      ]);
      return;
    }

    if (mainCmd === 'metrics') {
      const table = `QA METRICS DASHBOARD
┌──────────────────────────────┬───────────────────┐
│ Metric                       │ Value             │
├──────────────────────────────┼───────────────────┤
│ Total Automated Tests        │ ${metrics.totalTestCases.toString().padEnd(17)} │
│ Overall Pass Rate            │ ${(metrics.overallPassRate + '%').padEnd(17)} │
│ Flakiness Index              │ ${(metrics.flakinessIndexPercent + '%').padEnd(17)} │
│ Pre-Prod Defects Caught      │ ${metrics.preProdDefectsCaught.toString().padEnd(17)} │
│ Cucumber Scenarios Covered   │ ${metrics.cucumberScenariosCount.toString().padEnd(17)} │
│ Average Suite Runtime        │ ${(metrics.averageExecutionMinutes + ' mins').padEnd(17)} │
└──────────────────────────────┴───────────────────┘`;

      setOutputs((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'output', content: table, timestamp: now },
      ]);
      return;
    }

    if (mainCmd === 'resume') {
      setIsResumeOpen(true);
      setOutputs((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'success',
          content: `Opening Associate Test Engineer PDF Resume generator modal...`,
          timestamp: now,
        },
      ]);
      return;
    }

    if (mainCmd === 'goto' || mainCmd === 'cd') {
      const target = subCmd as TabId;
      const validTabs: TabId[] = ['begin', 'build', 'journey', 'learned', 'chaos', 'talk'];
      if (validTabs.includes(target)) {
        setActiveTab(target);
        setOutputs((prev) => [
          ...prev,
          {
            id: `out-${Date.now()}`,
            type: 'success',
            content: `Switched buffer to tab: "${target}".`,
            timestamp: now,
          },
        ]);
      } else {
        setOutputs((prev) => [
          ...prev,
          {
            id: `out-${Date.now()}`,
            type: 'error',
            content: `Unknown tab: "${subCmd}". Available tabs: begin, build, journey, learned, chaos, talk`,
            timestamp: now,
          },
        ]);
      }
      return;
    }

    if (mainCmd === 'theme') {
      toggleTheme();
      setOutputs((prev) => [
        ...prev,
        { id: `out-${Date.now()}`, type: 'success', content: `Theme toggled.`, timestamp: now },
      ]);
      return;
    }

    if (mainCmd === 'admin' || mainCmd === 'sudo') {
      setIsAdminOpen(true);
      setOutputs((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: 'output',
          content: `Opening Central Configuration Admin Console (PIN: qa2026)...`,
          timestamp: now,
        },
      ]);
      return;
    }

    // Default: Command not found
    setOutputs((prev) => [
      ...prev,
      {
        id: `err-${Date.now()}`,
        type: 'error',
        content: `bash: ${mainCmd}: command not found. Type "help" to view executable QA commands.`,
        timestamp: now,
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal;
    setInputVal('');
    handleCommand(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete match
      const matched = quickCommands.find((c) => c.startsWith(inputVal.trim().toLowerCase()));
      if (matched) {
        setInputVal(matched);
      }
    }
  };

  return (
    <div
      className={`fixed bottom-7 left-0 right-0 z-40 bg-[#0D1117] border-t border-[#30363D] shadow-2xl flex flex-col transition-all duration-200 no-print ${
        isExpanded ? 'h-[75vh]' : 'h-80 sm:h-96'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="h-9 bg-[#161B22] border-b border-[#30363D] px-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-200">bash</span>
          <span className="text-slate-500">—</span>
          <span className="text-slate-400 truncate hidden sm:inline">
            {profile.name.toLowerCase()}@qa-os:~ (interactive debugger)
          </span>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOutputs([])}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-[#30363D]/50 rounded cursor-pointer"
            title="Clear Terminal Output"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-[#30363D]/50 rounded cursor-pointer hidden sm:inline-block"
            title={isExpanded ? 'Restore Size' : 'Maximize Terminal'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsTerminalOpen(false)}
            className="p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded cursor-pointer"
            title="Close Terminal (Ctrl+K)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Action Command Chips */}
      <div className="bg-[#161B22]/60 border-b border-[#30363D]/50 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] font-mono">
        <span className="text-slate-500 shrink-0">Quick Run:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-[#21262D] hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-[#30363D] whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Output Console Buffer */}
      <div className="flex-1 p-3 font-mono text-xs overflow-y-auto space-y-2 select-text leading-relaxed">
        {outputs.map((item) => {
          let colorClass = 'text-slate-300';
          if (item.type === 'input') colorClass = 'text-emerald-400 font-medium';
          else if (item.type === 'error') colorClass = 'text-rose-400';
          else if (item.type === 'success') colorClass = 'text-emerald-300';
          else if (item.type === 'system') colorClass = 'text-cyan-400';

          return (
            <div key={item.id} className="whitespace-pre-wrap break-words">
              <span className="text-slate-600 mr-2 text-[10px] select-none">[{item.timestamp}]</span>
              <span className={colorClass}>{item.content}</span>
            </div>
          );
        })}
        {isRunningSim && (
          <div className="flex items-center gap-2 text-amber-400 animate-pulse text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
            <span>Executing automated test harness...</span>
          </div>
        )}
        <div ref={outputEndRef} />
      </div>

      {/* Command Input Prompt Form */}
      <form
        onSubmit={handleSubmit}
        className="h-10 bg-[#161B22] border-t border-[#30363D] px-3 flex items-center gap-2 font-mono text-xs"
      >
        <span className="text-emerald-400 font-bold select-none">{profile.name.toLowerCase()}@qa-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Type a command (e.g. "run test", "cucumber", "help")...'
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs"
          spellCheck={false}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isRunningSim}
          className="p-1 rounded text-slate-400 hover:text-emerald-400 disabled:opacity-30 cursor-pointer"
          title="Send command"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
