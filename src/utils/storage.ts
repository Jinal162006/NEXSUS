import { UserPreferences, LocalReminder, ChatMessage } from '../types/legal';

const PREFS_KEY = 'legalconnect_user_preferences';
const CHAT_HISTORY_KEY = 'legalconnect_chat_history';
const CHECKLIST_KEY = 'legalconnect_doc_checklist';

export const DEFAULT_PREFERENCES: UserPreferences = {
  name: 'Demo Citizen',
  interests: ['Cyber Crime', 'Consumer', 'Employment'],
  savedRightsIds: ['right-1', 'right-2', 'right-3'],
  savedUpdatesIds: ['update-1', 'update-2'],
  savedFeedIds: ['feed-1'],
  quizStreak: 4,
  lastQuizDate: null,
  quizHistory: [
    { date: '2026-10-04', score: 5, total: 5, category: 'Cyber Crime' },
    { date: '2026-10-03', score: 4, total: 5, category: 'Consumer Rights' },
    { date: '2026-10-02', score: 5, total: 5, category: 'Employment' },
    { date: '2026-10-01', score: 4, total: 5, category: 'Property' },
  ],
  reminders: [
    {
      id: 'rem-1',
      title: 'Check bank statement for shadow-credit reversal',
      date: '2026-10-08',
      time: '11:00',
      relatedGuidance: 'Cyber Crime / Online Fraud',
      completed: false,
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'rem-2',
      title: 'Send formal email follow-up regarding full & final settlement',
      date: '2026-10-09',
      time: '14:30',
      relatedGuidance: 'Employment / Unpaid Wages',
      completed: false,
      createdAt: Date.now() - 172800000,
    },
  ],
};

export function getStoredPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) {
      localStorage.setItem(PREFS_KEY, JSON.stringify(DEFAULT_PREFERENCES));
      return DEFAULT_PREFERENCES;
    }
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error loading preferences from localStorage:', e);
    return DEFAULT_PREFERENCES;
  }
}

export function saveStoredPreferences(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Error saving preferences to localStorage:', e);
  }
}

export function getStoredChatHistory(): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading chat history:', e);
    return [];
  }
}

export function saveStoredChatHistory(messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('Error saving chat history:', e);
  }
}

export function getChecklistState(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CHECKLIST_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveChecklistState(state: Record<string, boolean>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving checklist:', e);
  }
}
