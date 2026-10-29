import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import {
  Terminal,
  Play,
  FileDown,
  CheckCircle2,
  AlertTriangle,
  GitBranch,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const LetsBegin: React.FC = () => {
  const {
    profile,
    metrics,
    setActiveTab,
    toggleTerminal,
    setIsResumeOpen,
    projects,
  } = useConfig();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Editor Buffer Header */}
      <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white overflow-hidden shadow-sm">
        <div className="px-4 py-2 bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-100 border-b border-[#30363D] dark:border-[#30363D] light:border-slate-200 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-slate-300 dark:text-slate-300 light:text-slate-800 font-medium">
              begin.spec.ts — [System Boot & Candidate Profile]
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Assertions Verified</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400 light:text-slate-600">Candidate Role</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold">{profile.role}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 dark:text-slate-400 light:text-slate-600">{profile.status}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 text-balance">
              Building Resilient Test Automation & High-Signal QA Pipelines
            </h1>

            <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm sm:text-base leading-relaxed max-w-3xl">
              Hi, I'm <strong className="text-white dark:text-white light:text-slate-950 font-semibold">{profile.name}</strong>. An Associate Test Engineer actively mastering browser automation, Cucumber BDD architectures, locator resilience, and CI/CD quality gates. I view testing not as a post-facto checklist, but as a core engineering discipline that accelerates shipping confidence.
            </p>
          </div>

          {/* Quick-Action Command Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </button>

            <button
              onClick={() => {
                toggleTerminal();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#21262D] dark:bg-[#21262D] light:bg-slate-100 hover:bg-[#30363D] dark:hover:bg-[#30363D] light:hover:bg-slate-200 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-800 font-mono text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Open Debug Terminal</span>
              <kbd className="text-[10px] bg-[#0D1117] text-slate-400 px-1 py-0.5 rounded border border-slate-700">
                ^K
              </kbd>
            </button>

            <button
              onClick={() => setActiveTab('talk')}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#21262D] dark:hover:bg-[#21262D] light:hover:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 text-xs sm:text-sm transition-colors cursor-pointer border border-transparent hover:border-[#30363D]"
            >
              <span>Schedule Recruiter Triage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* High-Contrast QA Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <div className="p-4 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200">
          <div className="text-xs text-slate-400 mb-1">Total Test Cases</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 tabular-nums">
            {metrics.totalTestCases}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>4 Framework Suites</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200">
          <div className="text-xs text-slate-400 mb-1">Overall Pass Rate</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
            {metrics.overallPassRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span>Last 20 CI runs</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200">
          <div className="text-xs text-slate-400 mb-1">Flakiness Index</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 tabular-nums">
            {metrics.flakinessIndexPercent}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span>Target &lt; 2.0%</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200">
          <div className="text-xs text-slate-400 mb-1">Pre-Prod Bugs Caught</div>
          <div className="text-2xl sm:text-3xl font-bold text-cyan-400 tabular-nums">
            {metrics.preProdDefectsCaught}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <span>Zero escape criticals</span>
          </div>
        </div>
      </div>

      {/* Honest Learner Manifesto */}
      <div className="p-6 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span className="uppercase tracking-wider font-semibold">Honest Positioning Manifesto</span>
        </div>
        <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
          Why I Embrace the "Associate" Title with Pride
        </h2>
        <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
          In an industry where many claim immediate senior mastery, I value technical integrity and curiosity. I actively study the anatomy of failed assertions, dissect asynchronous timing races in CI workers, and experiment with different locator strategies until a test suite is deterministic. Rather than relying on fragile workarounds like hardcoded sleeps, I dig into the browser event loop and DOM lifecycle to understand <em>why</em> a test fails.
        </p>
      </div>

      {/* Recruiter Navigation Fast-Path */}
      <div className="space-y-3">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Suggested Inspection Workflow
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveTab('build')}
            className="p-4 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200 text-left hover:border-emerald-500/50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-emerald-400 font-mono text-xs mb-2">
              <span>02. What I Build</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-semibold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
              Cucumber BDD & Frameworks
            </div>
            <div className="text-xs text-slate-400">
              Run interactive Gherkin scenarios with live step assertion diagnostics across Playwright and Selenium.
            </div>
          </button>

          <button
            onClick={() => setActiveTab('learned')}
            className="p-4 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200 text-left hover:border-emerald-500/50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-cyan-400 font-mono text-xs mb-2">
              <span>04. How I Learned</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-semibold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
              Interactive Debugging Lab
            </div>
            <div className="text-xs text-slate-400">
              Inspect real StaleElement and race condition stack traces, select fixes, and execute regression guards.
            </div>
          </button>

          <button
            onClick={() => setActiveTab('chaos')}
            className="p-4 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200 text-left hover:border-emerald-500/50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between text-amber-400 font-mono text-xs mb-2">
              <span>05. Curated chaos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-semibold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
              BugTracker Triage Board
            </div>
            <div className="text-xs text-slate-400">
              Browse actual defect reports with reproduction steps, expected vs actual behaviors, and triage team comments.
            </div>
          </button>
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div className="p-6 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200 space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Core Testing Tools & Frameworks
        </div>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {profile.coreTools.map((tool) => (
            <span
              key={tool}
              className="px-2.5 py-1 rounded bg-[#21262D] dark:bg-[#21262D] light:bg-slate-100 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-800"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
