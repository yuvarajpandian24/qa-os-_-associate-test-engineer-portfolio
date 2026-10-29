import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TabId,
  UserProfile,
  PortfolioMetrics,
  ProjectSuite,
  CareerMilestone,
  DebuggingIncident,
  LearningTopic,
  BugTicket,
} from '../types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_METRICS,
  INITIAL_PROJECT_SUITES,
  INITIAL_CAREER_MILESTONES,
  INITIAL_DEBUG_INCIDENTS,
  INITIAL_LEARNING_TOPICS,
  INITIAL_BUG_TICKETS,
} from '../data/initialData';

interface ConfigContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  profile: UserProfile;
  metrics: PortfolioMetrics;
  projects: ProjectSuite[];
  milestones: CareerMilestone[];
  debugIncidents: DebuggingIncident[];
  learningTopics: LearningTopic[];
  bugTickets: BugTicket[];
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
  isOffline: boolean;
  updateMetrics: (newMetrics: Partial<PortfolioMetrics>) => void;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  updateProject: (projectId: string, updated: Partial<ProjectSuite>) => void;
  updateBugTicket: (ticket: BugTicket) => void;
  addBugTicket: (ticket: Omit<BugTicket, 'id' | 'comments'>) => void;
  addCommentToTicket: (ticketId: string, text: string, author?: string) => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => { success: boolean; message: string };
}

const STORAGE_KEY = 'qa_os_portfolio_state_v1';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabId>('begin');
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Theme state with HTML class synchronization
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('qa_os_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // High-contrast developer dark by default
  });

  // Data states initialized from local storage or defaults
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [metrics, setMetrics] = useState<PortfolioMetrics>(INITIAL_METRICS);
  const [projects, setProjects] = useState<ProjectSuite[]>(INITIAL_PROJECT_SUITES);
  const [milestones, setMilestones] = useState<CareerMilestone[]>(INITIAL_CAREER_MILESTONES);
  const [debugIncidents, setDebugIncidents] = useState<DebuggingIncident[]>(INITIAL_DEBUG_INCIDENTS);
  const [learningTopics, setLearningTopics] = useState<LearningTopic[]>(INITIAL_LEARNING_TOPICS);
  const [bugTickets, setBugTickets] = useState<BugTicket[]>(INITIAL_BUG_TICKETS);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.metrics) setMetrics(parsed.metrics);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.milestones) setMilestones(parsed.milestones);
        if (parsed.debugIncidents) setDebugIncidents(parsed.debugIncidents);
        if (parsed.learningTopics) setLearningTopics(parsed.learningTopics);
        if (parsed.bugTickets) setBugTickets(parsed.bugTickets);
      }
    } catch (e) {
      console.warn('Failed to parse saved QA-OS state', e);
    }
  }, []);

  // Save to LocalStorage on changes
  useEffect(() => {
    try {
      const dataToSave = {
        profile,
        metrics,
        projects,
        milestones,
        debugIncidents,
        learningTopics,
        bugTickets,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
  }, [profile, metrics, projects, milestones, debugIncidents, learningTopics, bugTickets]);

  // Handle Theme class on root document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('qa_os_theme', theme);
  }, [theme]);

  // Online / Offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Keyboard shortcut listeners (Ctrl/Cmd + K for terminal, Alt + 1..6 for tabs, ESC to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        if (isAdminOpen) setIsAdminOpen(false);
        if (isResumeOpen) setIsResumeOpen(false);
      }
      if (e.altKey) {
        if (e.key === '1') setActiveTab('begin');
        if (e.key === '2') setActiveTab('build');
        if (e.key === '3') setActiveTab('journey');
        if (e.key === '4') setActiveTab('learned');
        if (e.key === '5') setActiveTab('chaos');
        if (e.key === '6') setActiveTab('talk');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen, isResumeOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleTerminal = () => {
    setIsTerminalOpen((prev) => !prev);
  };

  const updateMetrics = (newMetrics: Partial<PortfolioMetrics>) => {
    setMetrics((prev) => ({ ...prev, ...newMetrics }));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...newProfile }));
  };

  const updateProject = (projectId: string, updated: Partial<ProjectSuite>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updated } : p))
    );
  };

  const updateBugTicket = (ticket: BugTicket) => {
    setBugTickets((prev) =>
      prev.map((t) => (t.id === ticket.id ? ticket : t))
    );
  };

  const addBugTicket = (newTicket: Omit<BugTicket, 'id' | 'comments'>) => {
    const nextNum = bugTickets.length + 105;
    const ticket: BugTicket = {
      ...newTicket,
      id: `BUG-${nextNum}`,
      comments: [
        {
          id: `c-${Date.now()}`,
          author: profile.name,
          avatarText: profile.name.slice(0, 2).toUpperCase(),
          timeAgo: 'Just now',
          content: 'Logged defect to triage backlog. Automated test guard pending.',
        },
      ],
    };
    setBugTickets((prev) => [ticket, ...prev]);
  };

  const addCommentToTicket = (ticketId: string, text: string, author?: string) => {
    if (!text.trim()) return;
    const commentAuthor = author || 'Guest Recruiter';
    const initials = commentAuthor
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    setBugTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        return {
          ...t,
          comments: [
            ...t.comments,
            {
              id: `c-${Date.now()}`,
              author: commentAuthor,
              avatarText: initials || 'GR',
              timeAgo: 'Just now',
              content: text.trim(),
            },
          ],
        };
      })
    );
  };

  const resetToDefaults = () => {
    setProfile(INITIAL_USER_PROFILE);
    setMetrics(INITIAL_METRICS);
    setProjects(INITIAL_PROJECT_SUITES);
    setMilestones(INITIAL_CAREER_MILESTONES);
    setDebugIncidents(INITIAL_DEBUG_INCIDENTS);
    setLearningTopics(INITIAL_LEARNING_TOPICS);
    setBugTickets(INITIAL_BUG_TICKETS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportJson = () => {
    const data = {
      profile,
      metrics,
      projects,
      milestones,
      debugIncidents,
      learningTopics,
      bugTickets,
      exportedAt: new Date().toISOString(),
      schemaVersion: '1.0',
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qa_os_portfolio_config_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importJson = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, message: 'Invalid JSON configuration format.' };
      }
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.metrics) setMetrics(parsed.metrics);
      if (parsed.projects && Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (parsed.milestones && Array.isArray(parsed.milestones)) setMilestones(parsed.milestones);
      if (parsed.debugIncidents && Array.isArray(parsed.debugIncidents)) setDebugIncidents(parsed.debugIncidents);
      if (parsed.learningTopics && Array.isArray(parsed.learningTopics)) setLearningTopics(parsed.learningTopics);
      if (parsed.bugTickets && Array.isArray(parsed.bugTickets)) setBugTickets(parsed.bugTickets);

      return { success: true, message: 'Configuration successfully loaded and synchronized!' };
    } catch (e) {
      return { success: false, message: (e as Error).message || 'Failed to parse JSON string.' };
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        activeTab,
        setActiveTab,
        profile,
        metrics,
        projects,
        milestones,
        debugIncidents,
        learningTopics,
        bugTickets,
        theme,
        toggleTheme,
        isTerminalOpen,
        setIsTerminalOpen,
        toggleTerminal,
        isAdminOpen,
        setIsAdminOpen,
        isResumeOpen,
        setIsResumeOpen,
        isOffline,
        updateMetrics,
        updateProfile,
        updateProject,
        updateBugTicket,
        addBugTicket,
        addCommentToTicket,
        resetToDefaults,
        exportJson,
        importJson,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
