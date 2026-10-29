import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { CareerMilestone } from '../../types';
import { GitCommit, GitBranch, Calendar, CheckCircle2, Lightbulb, Building2, Tag } from 'lucide-react';

export const TheJourney: React.FC = () => {
  const { milestones } = useConfig();
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = milestones.filter((m) => {
    if (filterType === 'all') return true;
    return m.type === filterType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header buffer banner */}
      <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <GitBranch className="w-4 h-4" />
          <span>GIT_LOG // CAREER COMMITS & AUTOMATION TRANSITION</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
          The Journey: From Manual Rigor to Automation Architecture
        </h1>
        <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-3xl leading-relaxed">
          A transparent sprint timeline documenting my path as an Associate Test Engineer. Each milestone represents concrete lessons learned in framework design, asynchronous timing triage, and bridging engineering gaps.
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto text-xs font-mono">
          <span className="text-slate-500 mr-1">Filter Log:</span>
          {['all', 'experience', 'breakthrough', 'learning'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer capitalize ${
                filterType === type
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'bg-[#21262D] dark:bg-[#21262D] light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Git Commit Sprint Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#30363D]">
        {filtered.map((item, idx) => (
          <div key={item.id} className="relative space-y-2">
            {/* Git Commit Node Indicator */}
            <div className="absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full bg-[#161B22] border-2 border-emerald-400 flex items-center justify-center">
              <GitCommit className="w-3 h-3 text-emerald-400" />
            </div>

            {/* Commit Metadata Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                commit {item.commitHash}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{item.date}</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300 font-semibold flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span>{item.organization}</span>
              </span>
            </div>

            {/* Milestone Card */}
            <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-5 space-y-3">
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                  {item.title}
                </h2>
                <div className="text-xs font-mono text-emerald-400">{item.role}</div>
              </div>

              <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                {item.summary}
              </p>

              {/* Achievements Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-[#30363D]/60 text-xs">
                {item.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2 text-slate-300 dark:text-slate-300 light:text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Flaky Insight Callout (if present) */}
              {item.flakyInsight && (
                <div className="p-3 rounded-md bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-amber-500/30 text-xs font-mono space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Learner Triage Insight:</span>
                  </div>
                  <div className="text-slate-300 dark:text-slate-300 light:text-slate-700 italic">
                    "{item.flakyInsight}"
                  </div>
                </div>
              )}

              {/* Tech Stack tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#21262D] dark:bg-[#21262D] light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-[#30363D] dark:border-[#30363D] light:border-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
