import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import {
  X,
  Printer,
  Download,
  Mail,
  MapPin,
  Linkedin,
  Github,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { isResumeOpen, setIsResumeOpen, profile, metrics, projects, milestones } = useConfig();

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const content = `================================================================================
${profile.name.toUpperCase()} - ${profile.role.toUpperCase()}
Email: ${profile.email} | Location: ${profile.location}
GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}
================================================================================

PROFESSIONAL SUMMARY
${profile.bio}

AUTOMATION TESTING METRICS
- Total Automated Test Cases: ${metrics.totalTestCases}
- Overall Suite Pass Rate: ${metrics.overallPassRate}%
- Flakiness Index: ${metrics.flakinessIndexPercent}%
- Pre-Production Defects Caught: ${metrics.preProdDefectsCaught}

CORE SKILLS & TECHNOLOGIES
${profile.coreTools.join(' · ')}

PROFESSIONAL EXPERIENCE & SPRINT TIMELINE
${milestones
  .map(
    (m) => `
${m.title} | ${m.organization} (${m.date})
Role: ${m.role}
Summary: ${m.summary}
Key Deliverables:
${m.achievements.map((a) => `  * ${a}`).join('\n')}
Tech Stack: ${m.techStack.join(', ')}
`
  )
  .join('\n')}

FEATURED AUTOMATION TEST SUITES
${projects
  .map(
    (p) => `
- ${p.name} (${p.framework})
  ${p.description}
  Stats: ${p.stats.totalTests} tests | ${p.stats.passRate}% pass rate | ${p.stats.durationSec}s runtime
`
  )
  .join('')}
================================================================================
Generated via QA-OS Developer Portfolio
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white text-slate-900 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Controls Bar (Hidden during print) */}
        <div className="no-print h-12 bg-[#0D1117] border-b border-[#30363D] px-4 flex items-center justify-between text-xs font-mono select-none">
          <div className="flex items-center gap-2 text-slate-300">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-100">{profile.name}_Resume.pdf</span>
            <span className="text-slate-500 hidden sm:inline">(ATS-Optimized Printable Format)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors cursor-pointer"
              title="Print to PDF via browser dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#21262D] hover:bg-[#30363D] text-slate-300 transition-colors cursor-pointer hidden sm:flex"
              title="Download Plain Text Format"
            >
              <Download className="w-3.5 h-3.5" />
              <span>TXT</span>
            </button>

            <button
              onClick={() => setIsResumeOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Modal (Escape)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-6 bg-white text-slate-900 font-sans print:p-0 print:overflow-visible">
          {/* Header section */}
          <div className="border-b-2 border-slate-900 pb-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                  {profile.name}
                </h1>
                <div className="text-base font-semibold text-emerald-700 font-mono">
                  {profile.role}
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 font-mono text-right sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed max-w-3xl pt-1">
              {profile.bio}
            </p>
          </div>

          {/* Key QA Metrics Table */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1">
              Automated Testing Metrics & Quality Impact
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-500 text-[10px] block">Test Cases</span>
                <span className="text-base font-bold text-slate-900">{metrics.totalTestCases}</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-500 text-[10px] block">Pass Rate</span>
                <span className="text-base font-bold text-emerald-700">{metrics.overallPassRate}%</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-500 text-[10px] block">Flakiness Index</span>
                <span className="text-base font-bold text-slate-900">{metrics.flakinessIndexPercent}%</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-200 rounded">
                <span className="text-slate-500 text-[10px] block">Bugs Prevented</span>
                <span className="text-base font-bold text-slate-900">{metrics.preProdDefectsCaught}</span>
              </div>
            </div>
          </div>

          {/* Technical Skills & Tools Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1">
              Core Technical Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {profile.coreTools.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Experience History */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1">
              Professional QA Experience
            </h2>
            <div className="space-y-4">
              {milestones
                .filter((m) => m.type === 'experience')
                .map((m) => (
                  <div key={m.id} className="space-y-1.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="font-bold text-sm text-slate-900">
                        {m.title} · <span className="font-semibold text-slate-700">{m.organization}</span>
                      </div>
                      <span className="font-mono text-slate-500">{m.date}</span>
                    </div>
                    <div className="text-emerald-700 font-mono text-[11px]">{m.role}</div>
                    <p className="text-slate-700">{m.summary}</p>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
                      {m.achievements.map((ach, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>

          {/* Featured Automation Test Suites */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1">
              Featured Test Automation Frameworks
            </h2>
            <div className="space-y-2 text-xs">
              {projects.map((p) => (
                <div key={p.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{p.name}</span>
                    <span className="font-mono text-[11px] text-emerald-700">{p.framework}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{p.description}</p>
                  <div className="text-[10px] font-mono text-slate-500 flex gap-2">
                    <span>Tests: {p.stats.totalTests}</span>
                    <span>·</span>
                    <span>Pass Rate: {p.stats.passRate}%</span>
                    <span>·</span>
                    <span>Runtime: {p.stats.durationSec}s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
