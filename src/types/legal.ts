export type LegalCategory =
  | 'Cyber Crime'
  | 'Consumer'
  | 'Employment'
  | 'Property'
  | 'Business'
  | 'Privacy'
  | 'Family'
  | 'Finance'
  | 'Technology'
  | 'General';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  interests: string[];
  preferredLanguage: 'English' | 'Hindi' | 'Marathi';
  isOnboarded: boolean;
  createdAt: number;
}

export interface RightItem {
  id: string;
  title: string;
  category: LegalCategory;
  simpleMeaning: string;
  whenApplies: string;
  reference: string;
  keyPoints: string[];
  actionTips?: string[];
  sourceUrl?: string;
}

export interface RouteOption {
  id: string;
  title: string;
  type: 'Informal / Direct' | 'Regulatory / Grievance' | 'Mediation / Conciliation' | 'Formal Legal Action';
  description: string;
  timeframe: string;
  costIndicator: 'Low / Free' | 'Moderate' | 'Varies' | 'Court Fee Applicable';
  suitability: string;
  recommendedFirst?: boolean;
}

export interface AuthorityDetail {
  id: string;
  name: string;
  category: string;
  handles: string;
  reason: string;
  jurisdiction: string;
  state?: string;
  city?: string;
  address?: string;
  officialPhone?: string;
  officialEmail?: string;
  officialWebsite?: string;
  onlineFilingUrl?: string;
  isVerifiedReal?: boolean;
  isDemoData: boolean;
}

export interface DocumentItem {
  id: string;
  name: string;
  purpose: string;
  required: boolean;
  exampleOrTip?: string;
}

export interface TimelineStage {
  stage: number;
  title: string;
  timeframe: string;
  description: string;
  keyAction: string;
}

export interface GuidanceResponse {
  id: string;
  timestamp: number;
  userQuery: string;
  possibleArea: string;
  category: LegalCategory;
  summary: string;
  whatThisMayInvolve: string;
  rights: RightItem[];
  routes: RouteOption[];
  routeJourney?: {
    situation: string;
    legalArea: string;
    recommendedRoute: string;
    authorityForum: string;
    primaryDocuments: string[];
    immediateNextStep: string;
  };
  authority: AuthorityDetail;
  documents: DocumentItem[];
  timeline: TimelineStage[];
  nextSteps: string[];
  sources: string[];
  disclaimer: string;
  relevantSectionExplainer?: {
    provision: string;
    simpleMeaning: string;
    whenApplies: string;
    example: string;
    relatedLegalArea: string;
    sourceReference: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system' | 'assistant';
  timestamp: number;
  text: string;
  attachedFile?: {
    name: string;
    type: string;
    previewUrl?: string;
    size?: string;
  };
  guidanceData?: GuidanceResponse;
  quickReplies?: string[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface CaseRecord {
  id: string;
  title: string;
  category: LegalCategory;
  summary: string;
  status: 'Active' | 'In Review' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  createdDate: string;
  lastUpdated: string;
  documentIds: string[];
  taskIds: string[];
  guidanceQuery?: string;
  timeline: {
    title: string;
    date: string;
    desc: string;
  }[];
  notes: string[];
}

export interface TaskRecord {
  id: string;
  title: string;
  description: string;
  caseId?: string;
  caseTitle?: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'To Do' | 'In Progress' | 'Completed';
  createdDate: string;
}

export interface DocumentAnalysisResult {
  documentType: string;
  potentialIssue: string;
  referencedSections: string[];
  importantDates: { label: string; date: string }[];
  keyPoints: string[];
  suggestedTasks: string[];
}

export interface LegalDocument {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'JPG' | 'PNG';
  size: string;
  uploadedDate: string;
  caseId?: string;
  caseTitle?: string;
  status: 'Analyzed' | 'Pending';
  analysis?: DocumentAnalysisResult;
}

export interface FeedPost {
  id: string;
  type: 'KNOW YOUR RIGHTS' | 'NEW LAWS' | 'AMENDMENTS' | 'OLD LAW VS NEW LAW' | 'LEGAL TERMS' | 'LEGAL AWARENESS' | 'REGULATORY UPDATES';
  category: LegalCategory;
  title: string;
  shortHook: string;
  keyPoints: string[];
  source: string;
  date: string;
  readTime: string;
  oldLaw?: string;
  whatChanged?: string;
  newLaw?: string;
  whyItMatters?: string;
  affectedParties?: string;
  visualTheme: 'cyber' | 'employment' | 'consumer' | 'property' | 'business' | 'privacy';
  creatorName?: string;
  creatorPlatform?: 'YouTube' | 'LinkedIn' | 'Bar & Bench' | 'Official Gazette';
  videoEmbedUrl?: string;
  sourceUrl?: string;
  saved?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  category: 'Cyber Crime' | 'Consumer Rights' | 'Employment' | 'Property' | 'Business' | 'Privacy' | 'General Legal Awareness';
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  source: string;
  difficulty: 'Basic' | 'Intermediate' | 'Practical';
}

export interface LegalUpdateItem {
  id: string;
  headline: string;
  date: string;
  category: string;
  tag: 'New Law' | 'Amendment' | 'Regulatory' | 'Court Ruling' | 'Public Advisory';
  whatChanged: string;
  whyItMatters: string;
  whoAffected: string;
  source: string;
  oldLaw?: string;
  newLaw?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'task' | 'update' | 'quiz' | 'case';
  read: boolean;
  linkTo?: string;
}

export interface LocalReminder {
  id: string;
  title: string;
  date: string;
  time: string;
  relatedGuidance?: string;
  completed: boolean;
  createdAt: number;
}

export interface UserPreferences {
  name: string;
  interests: string[];
  savedRightsIds: string[];
  savedUpdatesIds: string[];
  savedFeedIds: string[];
  quizStreak: number;
  lastQuizDate: string | null;
  quizHistory: {
    date: string;
    score: number;
    total: number;
    category: string;
  }[];
  reminders: LocalReminder[];
}
