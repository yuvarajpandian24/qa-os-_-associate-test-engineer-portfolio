import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { DebuggingIncident } from '../../types';
import {
  BookOpen,
  Bug,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Code2,
  Wrench,
  Check,
  Search,
  FileCode,
} from 'lucide-react';

export const HowILearned: React.FC = () => {
  const { learningTopics, debugIncidents } = useConfig();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(debugIncidents[0]?.id || '');
  const [verifyingIncident, setVerifyingIncident] = useState<boolean>(false);
  const [verifiedIncidentMap, setVerifiedIncidentMap] = useState<Record<string, boolean>>({});

  const activeIncident =
    debugIncidents.find((i) => i.id === selectedIncidentId) || debugIncidents[0];

  const handleVerifyGuard = () => {
    setVerifyingIncident(true);
    setTimeout(() => {
      setVerifyingIncident(false);
      setVerifiedIncidentMap((prev) => ({ ...prev, [activeIncident.id]: true }));
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header buffer banner */}
      <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <BookOpen className="w-4 h-4" />
          <span>DEBUG_LAB // CURRICULUM & INTERACTIVE INCIDENT POST-MORTEMS</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
          How I Learned: The Engineering of Debugging
        </h1>
        <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-3xl leading-relaxed">
          Mastering test automation is fundamentally about mastering failure analysis. Below is my structured learning curriculum and an interactive Debugging Lab where you can inspect real asynchronous race conditions, examine stack traces, and verify regression guards.
        </p>
      </div>

      {/* Interactive Debugging Lab Section */}
      <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white overflow-hidden space-y-0">
        <div className="px-4 py-3 bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-100 border-b border-[#30363D] dark:border-[#30363D] light:border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-200 dark:text-slate-200 light:text-slate-900">
              Interactive Incident Post-Mortem Lab
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Select an incident to review root cause & regression guard
          </span>
        </div>

        {/* Incident Selector Tabs */}
        <div className="p-4 border-b border-[#30363D]/60 flex flex-wrap gap-2">
          {debugIncidents.map((incident) => {
            const isSelected = incident.id === activeIncident.id;
            const isVerified = verifiedIncidentMap[incident.id];
            return (
              <button
                key={incident.id}
                onClick={() => setSelectedIncidentId(incident.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'bg-[#21262D] text-slate-300 hover:text-white border border-[#30363D]'
                }`}
              >
                <span>{incident.id}:</span>
                <span className="truncate max-w-[180px]">{incident.title}</span>
                {isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />}
              </button>
            );
          })}
        </div>

        {/* Active Incident Deep Dive */}
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Target Test:</span>
              <span className="text-emerald-400 font-medium">{activeIncident.testFile}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
              {activeIncident.title}
            </h2>
            <div className="text-xs text-slate-400 font-mono">
              Scenario: "{activeIncident.scenarioName}"
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Symptoms & Root Cause */}
            <div className="p-4 rounded-md bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-200 space-y-3 font-mono text-xs">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Symptoms & Failure Mode:</span>
              </div>
              <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed font-sans">
                {activeIncident.symptoms}
              </p>

              <div className="pt-2 border-t border-[#30363D] text-cyan-400 font-semibold flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                <span>Root-Cause Analysis:</span>
              </div>
              <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed font-sans">
                {activeIncident.rootCause}
              </p>

              <div className="pt-2 border-t border-[#30363D] text-slate-400 text-[11px]">
                <span className="font-semibold block mb-1">Diagnostic Tools Used:</span>
                <div className="flex flex-wrap gap-1">
                  {activeIncident.diagnosticTools.map((tool) => (
                    <span key={tool} className="px-1.5 py-0.5 rounded bg-[#161B22] border border-[#30363D]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stack Trace and Fix Applied */}
            <div className="space-y-4">
              {/* Failed Stack Trace */}
              <div className="rounded-md bg-[#0D1117] border border-rose-500/40 p-3 font-mono text-xs overflow-x-auto space-y-1">
                <div className="text-rose-400 font-semibold text-[11px] uppercase tracking-wider">
                  Original Assertion Failure Stack:
                </div>
                <pre className="text-[11px] text-rose-300 leading-relaxed overflow-x-auto">
                  <code>{activeIncident.stackTraceSnippet}</code>
                </pre>
              </div>

              {/* Fix & Regression Guard */}
              <div className="rounded-md bg-[#0D1117] border border-emerald-500/40 p-3 font-mono text-xs space-y-2">
                <div className="text-emerald-400 font-semibold text-[11px] uppercase tracking-wider flex items-center justify-between">
                  <span>Engineered Regression Guard:</span>
                  {verifiedIncidentMap[activeIncident.id] ? (
                    <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED PASS
                    </span>
                  ) : null}
                </div>
                <pre className="text-[11px] text-emerald-300 leading-relaxed overflow-x-auto">
                  <code>{activeIncident.regressionGuard}</code>
                </pre>

                <button
                  onClick={handleVerifyGuard}
                  disabled={verifyingIncident}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {verifyingIncident ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Running Regression Suite...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Verify Regression Guard (Execute Test)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum & Skill Matrix */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
          Automation Learning Curriculum & Mastery Trajectory
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-5 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200 space-y-3 font-mono"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-semibold">{topic.category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    topic.depth === 'Mastered'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : topic.depth === 'Practicing'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
                  }`}
                >
                  {topic.depth}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 font-sans">
                {topic.title}
              </h2>

              <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 font-sans leading-relaxed">
                {topic.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Confidence Level</span>
                  <span>{topic.progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0D1117] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${topic.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Practical Outcome */}
              <div className="pt-2 border-t border-[#30363D]/60 text-[11px] text-slate-400 font-sans">
                <strong className="text-slate-200 dark:text-slate-200 light:text-slate-800 font-mono block text-[10px] uppercase">
                  Production Takeaway:
                </strong>
                {topic.practicalApplication}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
