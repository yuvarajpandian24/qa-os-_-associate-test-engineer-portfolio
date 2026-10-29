export type TabId = 'begin' | 'build' | 'journey' | 'learned' | 'chaos' | 'talk';

export interface TabDefinition {
  id: TabId;
  name: string; // Exact names: "Let's Begin", "What I Build", "The Journey", "How I Learned", "Curated chaos", "Let's Talk"
  fileIcon: string;
  badge?: string;
  description: string;
}

export type StepStatus = 'passed' | 'failed' | 'skipped' | 'running' | 'pending';

export interface CucumberStep {
  keyword: 'Given' | 'When' | 'Then' | 'And' | 'But';
  text: string;
  status: StepStatus;
  durationMs: number;
  errorTrace?: string;
}

export interface CucumberScenario {
  id: string;
  name: string;
  tags: string[];
  steps: CucumberStep[];
  status: 'passed' | 'failed' | 'running';
  totalDurationMs: number;
}

export interface CucumberFeature {
  title: string;
  tags: string[];
  description: string;
  scenarios: CucumberScenario[];
}

export interface ProjectSuite {
  id: string;
  name: string;
  framework: string; // e.g. "Playwright + TypeScript + BDD"
  badgeColor: string;
  tagline: string;
  description: string;
  repoUrl: string;
  ciStatus: 'passing' | 'failing' | 'running';
  stats: {
    totalTests: number;
    passRate: number;
    durationSec: number;
    coveragePercent: number;
    flakinessReduction: string;
  };
  featuresList: string[];
  sampleCodeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
  cucumberFeature: CucumberFeature;
}

export interface CareerMilestone {
  id: string;
  commitHash: string;
  date: string;
  title: string;
  role: string;
  organization: string;
  summary: string;
  achievements: string[];
  techStack: string[];
  type: 'experience' | 'breakthrough' | 'learning';
  flakyInsight?: string;
}

export interface DebuggingIncident {
  id: string;
  title: string;
  scenarioName: string;
  symptoms: string;
  rootCause: string;
  diagnosticTools: string[];
  fixApplied: string;
  regressionGuard: string;
  stackTraceSnippet: string;
  testFile: string;
}

export interface LearningTopic {
  id: string;
  category: 'Automation Core' | 'BDD & Architecture' | 'API & Performance' | 'CI/CD & DevOps';
  title: string;
  depth: 'Mastered' | 'Practicing' | 'Exploring';
  progressPercent: number;
  description: string;
  keySkills: string[];
  practicalApplication: string;
  tools: string[];
}

export type DefectSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type DefectStatus = 'Triage' | 'Investigating' | 'Fix Verified' | 'Automated';

export interface BugComment {
  id: string;
  author: string;
  avatarText: string;
  timeAgo: string;
  content: string;
}

export interface BugTicket {
  id: string; // e.g. "BUG-104"
  title: string;
  severity: DefectSeverity;
  status: DefectStatus;
  module: string;
  discoveredIn: string;
  reportedBy: string;
  stepsToReproduce: string[];
  expectedResult: string;
  actualResult: string;
  automationTestGuard: string;
  comments: BugComment[];
}

export interface PortfolioMetrics {
  totalTestCases: number;
  overallPassRate: number;
  flakinessIndexPercent: number;
  preProdDefectsCaught: number;
  automatedSuitesCount: number;
  cucumberScenariosCount: number;
  averageExecutionMinutes: number;
}

export interface UserProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  x: string;
  instagram: string;
  location: string;
  status: string;
  yearsExperience: string;
  coreTools: string[];
}

export interface TerminalOutputItem {
  id: string;
  command?: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
  timestamp: string;
}
