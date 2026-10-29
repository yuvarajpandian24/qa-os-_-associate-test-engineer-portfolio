import React from 'react';
import { useConfig } from '../../context/ConfigContext';
import {
  Github,
  Linkedin,
  Instagram,
  Terminal,
  FileDown,
  ShieldCheck,
  ExternalLink,
  Code2,
} from 'lucide-react';

export const SiteFooter: React.FC = () => {
  const { profile, toggleTerminal, setIsResumeOpen, activeTab } = useConfig();

  const allSocialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-4 h-4" />,
      href: profile.github || 'https://github.com',
      hoverClass: 'hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10',
      handle: '@yuvaraj',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      href: profile.linkedin || 'https://linkedin.com',
      hoverClass: 'hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10',
      handle: 'in/yuvaraj',
    },
    {
      name: 'X',
      // Authentic X (formerly Twitter) SVG mark
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-4 h-4 fill-current"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: profile.x || 'https://x.com',
      hoverClass: 'hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10',
      handle: '@yuvaraj_qa',
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-4 h-4" />,
      href: profile.instagram || 'https://instagram.com',
      hoverClass: 'hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10',
      handle: '@yuvaraj_automation',
    },
  ];

  // On the "Let's Talk" tab, omit GitHub and LinkedIn from footer as requested
  const socialLinks =
    activeTab === 'talk'
      ? allSocialLinks.filter((item) => item.name !== 'GitHub' && item.name !== 'LinkedIn')
      : allSocialLinks;

  return (
    <footer className="mt-12 pt-8 border-t border-[#30363D] dark:border-[#30363D] light:border-slate-300 font-mono text-xs select-none no-print">
      <div className="rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white border border-[#30363D] dark:border-[#30363D] light:border-slate-200 p-6 space-y-6 shadow-xs">
        {/* Top row: Candidate Brand & Social Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
                {profile.name} // {profile.role}
              </span>
            </div>
            <p className="text-slate-400 text-xs font-sans max-w-md">
              Passionate about resilient test architecture, automated regression suites, Cucumber BDD workflows, and continuous integration quality gates.
            </p>
          </div>

          {/* Social Media Platforms Section */}
          <div className="space-y-2">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <span>Connect on Social Platforms:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${item.name} profile`}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 transition-all cursor-pointer ${item.hoverClass} group`}
                >
                  <span className="text-slate-400 group-hover:text-inherit transition-colors">
                    {item.icon}
                  </span>
                  <span className="font-semibold text-xs">{item.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: QA-OS Telemetry & Quick Action links */}
        <div className="pt-4 border-t border-[#30363D]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>QA-OS Kernel: Healthy</span>
            </span>
            <span>·</span>
            <span>Zero Unhandled Assertions</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} {profile.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTerminal}
              className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Terminal className="w-3 h-3" />
              <span>Terminal (^K)</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <FileDown className="w-3 h-3" />
              <span>PDF Resume</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
