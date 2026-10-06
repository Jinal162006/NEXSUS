import {
  CaseRecord,
  TaskRecord,
  LegalDocument,
  NotificationItem,
  UserPreferences,
  DocumentAnalysisResult,
} from '../types/legal';

const CASES_KEY = 'nyayapath_cases';
const TASKS_KEY = 'nyayapath_tasks';
const DOCS_KEY = 'nyayapath_documents';
const NOTIFS_KEY = 'nyayapath_notifications';
const PREFS_KEY = 'nyayapath_user_preferences';

const DEFAULT_CASES: CaseRecord[] = [
  {
    id: 'case-gst-notice',
    title: 'GST Billing Notice & Input Tax Credit Dispute',
    category: 'Business',
    summary:
      'Received intimation DRC-01A from Department regarding ITC variance and GSTR-2B reconciliation discrepancy under Section 16(2)(aa).',
    status: 'Active',
    priority: 'High',
    createdDate: '02 Oct 2026',
    lastUpdated: '04 Oct 2026',
    documentIds: ['doc-gst-notice'],
    taskIds: ['task-gst-review', 'task-gst-invoices'],
    guidanceQuery: 'My business received a GST billing legal notice regarding ITC mismatch.',
    timeline: [
      {
        title: 'DRC-01A Intimation Received',
        date: '28 Sep 2026',
        desc: 'Jurisdictional State Tax Authority flagged ₹1,42,800 mismatch in supplier returns.',
      },
      {
        title: 'Uploaded to NyayaPath & Analyzed',
        date: '02 Oct 2026',
        desc: 'Analyzed document. Extracted CGST Act Section 16(2) and Rule 36(4) provisions.',
      },
      {
        title: 'Action Tasks Created',
        date: '03 Oct 2026',
        desc: 'Created reconciliation checklist and vendor communication reminders.',
      },
    ],
    notes: [
      'Vendor XYZ Logistics confirmed they filed GSTR-1 in late cycle; proof of challan received.',
      'Statutory reply due on or before 15 Oct 2026.',
    ],
  },
  {
    id: 'case-unauthorized-upi',
    title: 'Unauthorized UPI Fraud & Bank Liability',
    category: 'Cyber Crime',
    summary:
      'Disputed transaction of ₹45,000 debited without OTP sharing; reported within 4 hours to bank and 1930 helpline.',
    status: 'In Review',
    priority: 'Urgent',
    createdDate: '29 Sep 2026',
    lastUpdated: '01 Oct 2026',
    documentIds: ['doc-bank-statement'],
    taskIds: ['task-cyber-portal'],
    guidanceQuery: 'My online payment was fraudulent and bank has not refunded within 3 days.',
    timeline: [
      {
        title: 'Fraudulent Debit Occurred',
        date: '29 Sep 2026',
        desc: 'Debit triggered at 14:22 via rogue merchant gateway.',
      },
      {
        title: 'Called 1930 & Bank Frozen',
        date: '29 Sep 2026',
        desc: 'Helpline acknowledgment generated within golden hour; formal written intimation delivered.',
      },
    ],
    notes: [
      'Bank ombudsman escalation eligible if unresolved by 29 Oct 2026 under RBI Integrated Ombudsman Scheme.',
    ],
  },
];

const DEFAULT_TASKS: TaskRecord[] = [
  {
    id: 'task-gst-review',
    title: 'Review GST billing notice & identify invoice mismatches',
    description:
      'Compare GSTR-2B statement against physical purchase registers for invoice variance flagged in notice.',
    caseId: 'case-gst-notice',
    caseTitle: 'GST Billing Notice & Input Tax Credit Dispute',
    dueDate: '2026-10-10',
    priority: 'High',
    status: 'In Progress',
    createdDate: '2026-10-02',
  },
  {
    id: 'task-gst-invoices',
    title: 'Collect vendor tax invoice copies & proof of tax payment',
    description:
      'Obtain signed ledger confirmation and GSTR-3B filing acknowledgement from XYZ Logistics.',
    caseId: 'case-gst-notice',
    caseTitle: 'GST Billing Notice & Input Tax Credit Dispute',
    dueDate: '2026-10-12',
    priority: 'Medium',
    status: 'To Do',
    createdDate: '2026-10-03',
  },
  {
    id: 'task-cyber-portal',
    title: 'Download cyber crime formal acknowledgment slip for bank submission',
    description:
      'Export PDF acknowledgement from cybercrime.gov.in and deliver to branch manager.',
    caseId: 'case-unauthorized-upi',
    caseTitle: 'Unauthorized UPI Fraud & Bank Liability',
    dueDate: '2026-10-06',
    priority: 'Urgent',
    status: 'Completed',
    createdDate: '2026-09-30',
  },
  {
    id: 'task-rental-notice',
    title: 'Draft demand letter for security deposit return',
    description:
      'Cite Model Tenancy Act Section 11 provisions regarding 30-day post-tenancy refund.',
    dueDate: '2026-10-14',
    priority: 'Medium',
    status: 'To Do',
    createdDate: '2026-10-04',
  },
];

const DEFAULT_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-gst-notice',
    name: 'GST_Billing_Legal_Notice_DRC01A.pdf',
    type: 'PDF',
    size: '245 KB',
    uploadedDate: '02 Oct 2026',
    caseId: 'case-gst-notice',
    caseTitle: 'GST Billing Notice & Input Tax Credit Dispute',
    status: 'Analyzed',
    analysis: {
      documentType: 'Legal Notice / Intimation DRC-01A',
      potentialIssue: 'Input Tax Credit (ITC) Mismatch & Vendor Tax Invoice Compliance',
      referencedSections: [
        'Central Goods and Services Tax Act 2017 — Section 16(2)(aa)',
        'Central Goods and Services Tax Act 2017 — Section 73 (Determination of Tax)',
        'Central Goods and Services Tax Rules 2017 — Rule 36(4)',
      ],
      importantDates: [
        { label: 'Date of Notice Issuance', date: '28 Sep 2026' },
        { label: 'Mandatory Written Reply Due', date: '15 Oct 2026' },
        { label: 'Financial Assessment Period', date: 'FY 2025–26 Q1' },
      ],
      keyPoints: [
        'Differential variance of ₹1,42,800 between claimed credit in GSTR-3B and GSTR-2B details uploaded by supplier.',
        'Recipient registered entity is called upon to pay tax with applicable interest under Section 50 or submit reconciliation.',
        'Failure to furnish explanation may initiate adjudication order under Section 73.',
      ],
      suggestedTasks: [
        'Review GST billing notice & identify invoice mismatches',
        'Collect vendor tax invoice copies & proof of tax payment',
        'Draft formal reply in Part B of Form GST DRC-01A',
      ],
    },
  },
  {
    id: 'doc-bank-statement',
    name: 'HDFC_Bank_Statement_Sept2026.pdf',
    type: 'PDF',
    size: '1.2 MB',
    uploadedDate: '29 Sep 2026',
    caseId: 'case-unauthorized-upi',
    caseTitle: 'Unauthorized UPI Fraud & Bank Liability',
    status: 'Analyzed',
    analysis: {
      documentType: 'Banking Statement / Electronic Audit Trail',
      potentialIssue: 'Unauthorized Electronic Banking Transaction',
      referencedSections: [
        'RBI Customer Protection Directive (DBR.No.Leg.BC.78/09.07.005/2017-18)',
        'Information Technology Act 2000 — Section 43A',
      ],
      importantDates: [
        { label: 'Disputed Transaction Date', date: '29 Sep 2026, 14:22' },
        { label: 'First Intimation to Bank', date: '29 Sep 2026, 16:10' },
      ],
      keyPoints: [
        'Three rapid debits totalling ₹45,000 within 4 minutes.',
        'Reported within 3 working days establishing zero customer liability framework.',
      ],
      suggestedTasks: [
        'Obtain branch manager formal written seal on dispute letter.',
      ],
    },
  },
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'GST Notice Review Due Soon',
    message: 'Your task "Review GST billing notice" is scheduled for 10 Oct 2026.',
    date: 'Today, 09:30',
    type: 'task',
    read: false,
    linkTo: '/tasks',
  },
  {
    id: 'notif-2',
    title: 'New Update in Your Interests',
    message: 'Central Consumer Protection Authority issued new dark-pattern guidelines for e-commerce.',
    date: 'Yesterday',
    type: 'update',
    read: false,
    linkTo: '/updates',
  },
  {
    id: 'notif-3',
    title: "Today's Legal Quiz Ready",
    message: 'Keep your 4-day learning streak active with today’s 2-minute scenario.',
    date: 'Today, 08:00',
    type: 'quiz',
    read: true,
    linkTo: '/quiz',
  },
];

export const database = {
  // Cases
  getCases: (): CaseRecord[] => {
    try {
      const data = localStorage.getItem(CASES_KEY);
      return data ? JSON.parse(data) : DEFAULT_CASES;
    } catch {
      return DEFAULT_CASES;
    }
  },

  getCaseById: (id: string): CaseRecord | undefined => {
    const cases = database.getCases();
    return cases.find((c) => c.id === id);
  },

  createCase: (newCase: Omit<CaseRecord, 'id' | 'createdDate' | 'lastUpdated'>): CaseRecord => {
    const cases = database.getCases();
    const id = `case-${Date.now()}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const fullCase: CaseRecord = {
      ...newCase,
      id,
      createdDate: today,
      lastUpdated: today,
    };
    const updated = [fullCase, ...cases];
    localStorage.setItem(CASES_KEY, JSON.stringify(updated));
    return fullCase;
  },

  updateCase: (id: string, updates: Partial<CaseRecord>): CaseRecord | undefined => {
    const cases = database.getCases();
    const idx = cases.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    cases[idx] = { ...cases[idx], ...updates, lastUpdated: today };
    localStorage.setItem(CASES_KEY, JSON.stringify(cases));
    return cases[idx];
  },

  deleteCase: (id: string) => {
    const cases = database.getCases().filter((c) => c.id !== id);
    localStorage.setItem(CASES_KEY, JSON.stringify(cases));
  },

  // Tasks
  getTasks: (): TaskRecord[] => {
    try {
      const data = localStorage.getItem(TASKS_KEY);
      return data ? JSON.parse(data) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  },

  createTask: (newTask: Omit<TaskRecord, 'id' | 'createdDate'>): TaskRecord => {
    const tasks = database.getTasks();
    const id = `task-${Date.now()}`;
    const fullTask: TaskRecord = {
      ...newTask,
      id,
      createdDate: new Date().toISOString().split('T')[0],
    };
    const updated = [fullTask, ...tasks];
    localStorage.setItem(TASKS_KEY, JSON.stringify(updated));
    return fullTask;
  },

  updateTask: (id: string, updates: Partial<TaskRecord>): TaskRecord | undefined => {
    const tasks = database.getTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    tasks[idx] = { ...tasks[idx], ...updates };
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return tasks[idx];
  },

  toggleTaskComplete: (id: string): TaskRecord | undefined => {
    const tasks = database.getTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    const current = tasks[idx].status;
    tasks[idx].status = current === 'Completed' ? 'To Do' : 'Completed';
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return tasks[idx];
  },

  deleteTask: (id: string) => {
    const tasks = database.getTasks().filter((t) => t.id !== id);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  // Documents
  getDocuments: (): LegalDocument[] => {
    try {
      const data = localStorage.getItem(DOCS_KEY);
      return data ? JSON.parse(data) : DEFAULT_DOCUMENTS;
    } catch {
      return DEFAULT_DOCUMENTS;
    }
  },

  addDocument: (doc: Omit<LegalDocument, 'id' | 'uploadedDate'>): LegalDocument => {
    const docs = database.getDocuments();
    const id = `doc-${Date.now()}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const fullDoc: LegalDocument = {
      ...doc,
      id,
      uploadedDate: today,
    };
    const updated = [fullDoc, ...docs];
    localStorage.setItem(DOCS_KEY, JSON.stringify(updated));
    return fullDoc;
  },

  deleteDocument: (id: string) => {
    const docs = database.getDocuments().filter((d) => d.id !== id);
    localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
  },

  // Notifications
  getNotifications: (): NotificationItem[] => {
    try {
      const data = localStorage.getItem(NOTIFS_KEY);
      return data ? JSON.parse(data) : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  },

  markNotificationRead: (id: string) => {
    const notifs = database.getNotifications();
    const idx = notifs.findIndex((n) => n.id === id);
    if (idx !== -1) {
      notifs[idx].read = true;
      localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifs));
    }
  },

  // Preferences & Bookmarks
  getPreferences: (): UserPreferences => {
    try {
      const data = localStorage.getItem(PREFS_KEY);
      return data
        ? JSON.parse(data)
        : {
            name: 'Pravin Jain',
            interests: ['Business', 'Cyber Crime', 'Consumer Rights', 'Finance'],
            savedRightsIds: ['right-1', 'right-gst'],
            savedUpdatesIds: ['up-1'],
            savedFeedIds: ['feed-1'],
            quizStreak: 4,
            lastQuizDate: '2026-10-04',
            quizHistory: [{ date: '2026-10-04', score: 5, total: 5, category: 'Business' }],
            reminders: [],
          };
    } catch {
      return {
        name: 'Pravin Jain',
        interests: ['Business', 'Cyber Crime', 'Consumer Rights'],
        savedRightsIds: ['right-1'],
        savedUpdatesIds: [],
        savedFeedIds: [],
        quizStreak: 4,
        lastQuizDate: null,
        quizHistory: [],
        reminders: [],
      };
    }
  },

  savePreferences: (prefs: UserPreferences) => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  },

  toggleBookmarkRight: (rightId: string): boolean => {
    const prefs = database.getPreferences();
    const exists = prefs.savedRightsIds.includes(rightId);
    prefs.savedRightsIds = exists
      ? prefs.savedRightsIds.filter((id) => id !== rightId)
      : [...prefs.savedRightsIds, rightId];
    database.savePreferences(prefs);
    return !exists;
  },

  toggleBookmarkUpdate: (updateId: string): boolean => {
    const prefs = database.getPreferences();
    const exists = prefs.savedUpdatesIds.includes(updateId);
    prefs.savedUpdatesIds = exists
      ? prefs.savedUpdatesIds.filter((id) => id !== updateId)
      : [...prefs.savedUpdatesIds, updateId];
    database.savePreferences(prefs);
    return !exists;
  },

  toggleBookmarkFeed: (feedId: string): boolean => {
    const prefs = database.getPreferences();
    const exists = prefs.savedFeedIds.includes(feedId);
    prefs.savedFeedIds = exists
      ? prefs.savedFeedIds.filter((id) => id !== feedId)
      : [...prefs.savedFeedIds, feedId];
    database.savePreferences(prefs);
    return !exists;
  },

  recordQuizScore: (score: number, total: number, category: string) => {
    const prefs = database.getPreferences();
    const today = new Date().toISOString().split('T')[0];
    const isConsecutive = prefs.lastQuizDate !== today;
    const newStreak = isConsecutive ? prefs.quizStreak + 1 : prefs.quizStreak;

    prefs.quizStreak = newStreak;
    prefs.lastQuizDate = today;
    prefs.quizHistory = [{ date: today, score, total, category }, ...prefs.quizHistory];
    database.savePreferences(prefs);
  },
};
