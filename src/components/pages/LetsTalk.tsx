import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import {
  MessageSquare,
  FileDown,
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  Linkedin,
  Github,
  Clock,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const LetsTalk: React.FC = () => {
  const { profile, setIsResumeOpen } = useConfig();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleTitle: 'Associate Test Engineer (Automation)',
    priority: 'Normal (P2)',
    message: '',
  });

  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `TICKET-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicketId(generatedId);
      setIsSubmitting(false);

      // Save locally to dispatched recruiter tickets
      try {
        const existing = JSON.parse(localStorage.getItem('qa_os_recruiter_dispatches') || '[]');
        existing.push({ id: generatedId, ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('qa_os_recruiter_dispatches', JSON.stringify(existing));
      } catch (err) {
        console.warn('Could not save dispatch ticket to localStorage', err);
      }
    }, 700);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header buffer banner */}
      <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <MessageSquare className="w-4 h-4" />
          <span>CONTACT_DISPATCH // RECRUITER TICKETING & RESUME GATEWAY</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
          Let's Talk: Inbound Recruiter Triage & Connect
        </h1>
        <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-3xl leading-relaxed">
          Looking for an Associate Test Engineer who writes clean, resilient test automation, understands Cucumber BDD frameworks, and continuously seeks technical depth? Dispatch an interview request, schedule a technical screening, or download my printable PDF resume.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#30363D]/60 pb-3 text-xs font-mono">
              <span className="font-bold text-slate-200 dark:text-slate-200 light:text-slate-900 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>File Recruiter Dispatch Ticket</span>
              </span>
              <span className="text-slate-500">Target: {profile.name}</span>
            </div>

            {submittedTicketId ? (
              <div className="p-6 rounded-md bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-emerald-500/40 text-center space-y-4 font-mono animate-in fade-in zoom-in-95 duration-150">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                    Dispatch Ticket Created: {submittedTicketId}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
                    Thank you, <strong>{formData.name}</strong>! Your message has been logged to my triage inbox. I typically respond within 24 hours.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedTicketId(null);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        roleTitle: 'Associate Test Engineer (Automation)',
                        priority: 'Normal (P2)',
                        message: '',
                      });
                    }}
                    className="px-4 py-1.5 text-xs rounded bg-[#21262D] text-slate-300 hover:text-white border border-[#30363D] cursor-pointer"
                  >
                    File Another Dispatch
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Recruiter / Hiring Lead Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme FinTech Labs"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Priority SLA</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Urgent (P1)">Urgent (P1) · Immediate Interview Request</option>
                      <option value="Normal (P2)">Normal (P2) · General Opportunity Discussion</option>
                      <option value="Low (P3)">Low (P3) · Technical Mentorship / Advice</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Opportunity Role / Subject</label>
                  <input
                    type="text"
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Message / Job Details *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your team, tech stack, testing challenges, or scheduling requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#0D1117] dark:bg-[#0D1117] light:bg-slate-50 border border-[#30363D] dark:border-[#30363D] light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching Ticket...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Dispatch Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: PDF Resume Download & Direct Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Download PDF Resume Highlight Box */}
          <div className="border border-emerald-500/40 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/10 light:bg-emerald-50 p-6 space-y-4 font-mono">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <FileDown className="w-4 h-4" />
              <span>ATS-OPTIMIZED PDF RESUME</span>
            </div>
            <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 font-sans">
              Download Full Curriculum Vitae
            </h2>
            <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed font-sans">
              A comprehensive single-document PDF formatted specifically for technical recruiters, applicant tracking systems, and engineering managers. Includes full test metrics, project links, and skills breakdown.
            </p>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>View & Download PDF Resume</span>
            </button>
          </div>

          {/* Direct Coordinates Card */}
          <div className="border border-[#30363D] dark:border-[#30363D] light:border-slate-300 rounded-lg bg-[#161B22] dark:bg-[#161B22] light:bg-white p-6 space-y-4 font-mono text-xs">
            <div className="text-slate-400 uppercase tracking-wider font-semibold">
              Direct Engineering Coordinates
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300 dark:text-slate-300 light:text-slate-700">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-emerald-400 transition-colors truncate"
                >
                  {profile.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-300 dark:text-slate-300 light:text-slate-700">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{profile.location}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300 dark:text-slate-300 light:text-slate-700">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Availability: Immediate / 2-Week Notice</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#30363D] flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-[#21262D] dark:bg-[#21262D] light:bg-slate-100 hover:bg-[#30363D] text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-[#21262D] dark:bg-[#21262D] light:bg-slate-100 hover:bg-[#30363D] text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
