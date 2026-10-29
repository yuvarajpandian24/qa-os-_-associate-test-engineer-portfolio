import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { ProjectSuite, CucumberScenario, StepStatus } from '../../types';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Layers,
  Code2,
  ExternalLink,
  Tag,
  Cpu,
  FileCode,
  Check,
  AlertCircle,
} from 'lucide-react';

export const WhatIBuild: React.FC = () => {
  const { projects } = useConfig();
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(projects[0]?.id || '');
  const [simulatingScenarioId, setSimulatingScenarioId] = useState<string | null>(null);
  const [scenarioStepStates, setScenarioStepStates] = useState<Record<string, StepStatus[]>>({});

  const activeSuite: ProjectSuite =
    projects.find((p) => p.id === selectedSuiteId) || projects[0];

  const handleRunScenario = (scenario: CucumberScenario) => {
    setSimulatingScenarioId(scenario.id);
    // Initialize all steps as pending
    const initialStatuses: StepStatus[] = scenario.steps.map(() => 'pending');
    setScenarioStepStates((prev) => ({ ...prev, [scenario.id]: initialStatuses }));

    // Sequentially mark each step running, then passed
    scenario.steps.forEach((step, idx) => {
      setTimeout(() => {
        setScenarioStepStates((prev) => {
          const current = [...(prev[scenario.id] || initialStatuses)];
          current[idx] = 'running';
          return { ...prev, [scenario.id]: current };
        });
      }, idx * 350);

      setTimeout(() => {
        setScenarioStepStates((prev) => {
          const current = [...(prev[scenario.id] || initialStatuses)];
          current[idx] = 'passed';
          return { ...prev, [scenario.id]: current };
        });
        if (idx === scenario.steps.length - 1) {
          setSimulatingScenarioId(null);
        }
      }, (idx + 1) * 350);
    });
  };

  const getStepStatus = (scenarioId: string, stepIdx: number, defaultStatus: StepStatus): StepStatus => {
    if (scenarioStepStates[scenarioId] && scenarioStepStates[scenarioId][stepIdx]) {
      return scenarioStepStates[scenarioId][stepIdx];
    }
    return defaultStatus;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header buffer banner */}
      <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <Cpu className="w-4 h-4" />
          <span>SUITE_CATALOG // AUTOMATED FRAMEWORKS & BDD GHERKIN SPECS</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
          End-to-End Automation Frameworks & Cucumber Scenarios
        </h1>
        <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-3xl leading-relaxed">
          Explore real-world test suites engineered for maintainability, zero-flakiness, and fast parallel CI execution. Each project showcases declarative BDD Gherkin scenarios, Page Object Model design patterns, and resilient locator architectures.
        </p>
      </div>

      {/* Suite Tabs Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {projects.map((suite) => {
          const isSelected = suite.id === activeSuite.id;
          return (
            <button
              key={suite.id}
              onClick={() => setSelectedSuiteId(suite.id)}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer font-mono ${
                isSelected
                  ? 'bg-[#161B22] dark:bg-[#161B22] light:bg-white border-emerald-500 ring-1 ring-emerald-500/50 shadow-sm'
                  : 'bg-[#161B22]/50 dark:bg-[#161B22]/50 light:bg-slate-50 border-[#30363D] dark:border-[#30363D] light:border-slate-200 hover:border-slate-500'
              }`}
            >
              <div className="text-[11px] text-emerald-400 font-semibold mb-1 truncate">
                {suite.framework}
              </div>
              <div className="font-semibold text-xs sm:text-sm text-slate-200 dark:text-slate-200 light:text-slate-900 truncate mb-1">
                {suite.name}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="tabular-nums">{suite.stats.totalTests} tests</span>
                <span>·</span>
                <span className="text-emerald-400 tabular-nums">{suite.stats.passRate}% pass</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Framework Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cucumber BDD Feature Runner (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white overflow-hidden">
            {/* Feature Header bar */}
            <div className="px-4 py-2.5 bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-100 border-b border-[#30363D] dark:border-[#30363D] light:border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-medium text-slate-200 dark:text-slate-200 light:text-slate-800">
                  {activeSuite.cucumberFeature.title}.feature
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeSuite.cucumberFeature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature Description */}
            <div className="p-4 border-b border-[#30363D]/60 text-xs font-mono text-slate-400">
              <span className="text-purple-400 font-semibold">Feature:</span>{' '}
              <span className="text-slate-300 dark:text-slate-300 light:text-slate-700">
                {activeSuite.cucumberFeature.title}
              </span>
              <p className="mt-1 text-slate-500 italic">
                {activeSuite.cucumberFeature.description}
              </p>
            </div>

            {/* Scenarios List */}
            <div className="p-4 space-y-4">
              {activeSuite.cucumberFeature.scenarios.map((scenario) => {
                const isRunning = simulatingScenarioId === scenario.id;

                return (
                  <div
                    key={scenario.id}
                    className="p-3.5 rounded-md bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-200 font-mono text-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-semibold">Scenario:</span>
                          <span className="text-slate-200 dark:text-slate-200 light:text-slate-900 font-medium">
                            {scenario.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                          {scenario.tags.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRunScenario(scenario)}
                        disabled={isRunning}
                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 cursor-pointer disabled:opacity-50 transition-colors"
                      >
                        {isRunning ? (
                          <>
                            <RotateCcw className="w-3 h-3 animate-spin" />
                            <span>Executing...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3 fill-emerald-400" />
                            <span>Run Scenario</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Step Execution Sequence */}
                    <div className="space-y-1.5 pt-1 pl-2 border-l border-[#30363D]">
                      {scenario.steps.map((step, sIdx) => {
                        const status = getStepStatus(scenario.id, sIdx, step.status);

                        let statusColor = 'text-slate-500';
                        let statusIcon = <Clock className="w-3 h-3 text-slate-500" />;

                        if (status === 'passed') {
                          statusColor = 'text-emerald-400';
                          statusIcon = <CheckCircle2 className="w-3 h-3 text-emerald-400" />;
                        } else if (status === 'running') {
                          statusColor = 'text-amber-400';
                          statusIcon = <RotateCcw className="w-3 h-3 text-amber-400 animate-spin" />;
                        } else if (status === 'failed') {
                          statusColor = 'text-rose-400';
                          statusIcon = <AlertCircle className="w-3 h-3 text-rose-400" />;
                        }

                        return (
                          <div
                            key={sIdx}
                            className="flex items-start justify-between gap-2 py-0.5"
                          >
                            <div className="flex items-start gap-2">
                              <span className="mt-0.5">{statusIcon}</span>
                              <span className="text-cyan-400 font-semibold shrink-0">
                                {step.keyword}
                              </span>
                              <span className="text-slate-300 dark:text-slate-300 light:text-slate-800 break-words">
                                {step.text}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 tabular-nums shrink-0">
                              {step.durationMs}ms
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Code Snippet & Architecture Highlights (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Key Metrics Card */}
          <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-4 font-mono space-y-3">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Automation Health Metrics
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-200">
                <span className="text-slate-500 block">Suite Pass Rate</span>
                <span className="text-lg font-bold text-emerald-400 tabular-nums">
                  {activeSuite.stats.passRate}%
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-200">
                <span className="text-slate-500 block">Parallel Runtime</span>
                <span className="text-lg font-bold text-slate-200 dark:text-slate-200 light:text-slate-900 tabular-nums">
                  {activeSuite.stats.durationSec}s
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-200">
                <span className="text-slate-500 block">Code Coverage</span>
                <span className="text-lg font-bold text-cyan-400 tabular-nums">
                  {activeSuite.stats.coveragePercent}%
                </span>
              </div>
              <div className="p-2.5 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-200">
                <span className="text-slate-500 block">Flaky Retry Rate</span>
                <span className="text-lg font-bold text-amber-400 tabular-nums">
                  {activeSuite.stats.flakinessReduction}
                </span>
              </div>
            </div>

            {/* Architectural Highlights list */}
            <div className="pt-2 border-t border-[#30363D] space-y-1.5 text-xs">
              <span className="text-slate-400 block font-semibold mb-1">Architecture Decisions:</span>
              {activeSuite.featuresList.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-slate-300 dark:text-slate-300 light:text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor Preview */}
          <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#0D1117] overflow-hidden text-xs font-mono shadow-sm">
            <div className="px-3 py-2 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-slate-300 font-medium">
                  {activeSuite.sampleCodeSnippet.filename}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase">
                {activeSuite.sampleCodeSnippet.language}
              </span>
            </div>

            <div className="p-3 overflow-x-auto max-h-80 text-slate-300 leading-relaxed font-mono">
              <pre className="text-[11px]">
                <code>{activeSuite.sampleCodeSnippet.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
