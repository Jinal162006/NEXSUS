import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../services/database';
import {
  User as UserIcon,
  Flame,
  Bookmark,
  Bell,
  Clock,
  CheckCircle2,
  Trash2,
  Plus,
  Scale,
  Newspaper,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  LogOut,
  Briefcase,
  CheckSquare,
} from 'lucide-react';
import { UserPreferences, LocalReminder, RightItem, LegalUpdateItem } from '../types/legal';
import { DEMO_RIGHTS, DEMO_UPDATES } from '../../server/data/demoData';

interface ProfilePageProps {
  onStartGuidancePrompt?: (prompt: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onStartGuidancePrompt,
  onNavigateTab,
}) => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [prefs, setPrefs] = useState<UserPreferences>(database.getPreferences());
  const [casesCount, setCasesCount] = useState<number>(database.getCases().length);
  const [tasksCount, setTasksCount] = useState<number>(database.getTasks().length);
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Hindi' | 'Marathi'>(
    user?.preferredLanguage || 'English'
  );

  const availableInterests = [
    'Cyber Crime',
    'Consumer Rights',
    'Employment',
    'Property',
    'Business',
    'Finance',
    'Family',
    'Technology & Privacy',
  ];

  const handleToggleInterest = (interest: string) => {
    const exists = prefs.interests.includes(interest);
    const updated = exists
      ? prefs.interests.filter((i) => i !== interest)
      : [...prefs.interests, interest];

    const newPrefs = { ...prefs, interests: updated };
    setPrefs(newPrefs);
    database.savePreferences(newPrefs);
    updateUser({ interests: updated });
  };

  const handleLanguageChange = (lang: 'English' | 'Hindi' | 'Marathi') => {
    setSelectedLanguage(lang);
    updateUser({ preferredLanguage: lang });
  };

  const handleNavigate = (path: string) => {
    if (onNavigateTab) {
      onNavigateTab(path);
    } else {
      navigate(`/${path}`);
    }
  };

  const savedRights = DEMO_RIGHTS.filter((r) => prefs.savedRightsIds.includes(r.id));
  const savedUpdates = DEMO_UPDATES.filter((u) => prefs.savedUpdatesIds.includes(u.id));

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-6 text-left">
      {/* Header Profile Identity */}
      <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#1F242C] text-white flex items-center justify-center font-serif text-2xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif font-bold text-[#111827]">
                  {user?.name || 'Citizen User'}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Active Workspace
                </span>
              </div>
              <p className="text-xs text-[#6B7280] mt-0.5">{user?.email || 'Logged In'}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-3.5 py-2 rounded-lg border border-[#D5D3CB] bg-white text-xs font-semibold text-rose-700 hover:bg-rose-50 hover:border-rose-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#EAE8E0]">
          <div className="p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              DAILY STREAK
            </div>
            <div className="text-lg font-bold text-[#78350F] flex items-center gap-1 mt-0.5">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
              <span>{prefs.quizStreak} Days</span>
            </div>
          </div>

          <div
            onClick={() => handleNavigate('cases')}
            className="p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] cursor-pointer hover:border-[#1F242C] transition-colors"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              MY CASES
            </div>
            <div className="text-lg font-bold text-[#111827] mt-0.5">
              {casesCount}
            </div>
          </div>

          <div
            onClick={() => handleNavigate('tasks')}
            className="p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] cursor-pointer hover:border-[#1F242C] transition-colors"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              ACTIVE TASKS
            </div>
            <div className="text-lg font-bold text-[#111827] mt-0.5">
              {tasksCount}
            </div>
          </div>

          <div
            onClick={() => handleNavigate('rights')}
            className="p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] cursor-pointer hover:border-[#1F242C] transition-colors"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              SAVED RIGHTS
            </div>
            <div className="text-lg font-bold text-[#111827] mt-0.5">
              {prefs.savedRightsIds.length}
            </div>
          </div>
        </div>
      </div>

      {/* Language Preference */}
      <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
          Preferred Language for Legal Explanations
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(['English', 'Hindi', 'Marathi'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => handleLanguageChange(lang)}
              className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                selectedLanguage === lang
                  ? 'bg-[#1F242C] border-[#1F242C] text-white shadow-2xs'
                  : 'bg-[#FAF9F5] border-[#E3E1D9] text-[#374151] hover:border-[#1F242C]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Interests Selection */}
      <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
          Selected Legal Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableInterests.map((interest) => {
            const isSelected = prefs.interests.includes(interest);
            return (
              <button
                key={interest}
                onClick={() => handleToggleInterest(interest)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F242C] text-white'
                    : 'bg-[#FAF9F5] border border-[#D5D3CB] text-[#374151] hover:border-black'
                }`}
              >
                {interest} {isSelected && '✓'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookmarked Rights */}
      <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#2C3E50]" />
            <h3 className="text-sm font-bold text-[#111827]">
              Saved Rights ({savedRights.length})
            </h3>
          </div>
          <button
            onClick={() => handleNavigate('rights')}
            className="text-xs font-semibold text-[#1F242C] hover:underline"
          >
            Explore Rights Directory →
          </button>
        </div>

        {savedRights.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#9CA3AF]">
            No rights bookmarked yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {savedRights.map((r) => (
              <div
                key={r.id}
                onClick={() => navigate('/rights')}
                className="p-3.5 rounded-lg border border-[#E3E1D9] bg-[#FAF9F5] hover:border-[#1F242C] transition-all cursor-pointer"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  {r.category}
                </span>
                <h4 className="text-xs font-bold text-[#111827] mt-0.5 leading-snug">
                  {r.title}
                </h4>
                <p className="text-[11px] text-[#4B5563] mt-1.5 line-clamp-2">
                  {r.simpleMeaning}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quiz History */}
      <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-[#111827]">
              Recent Quiz History
            </h3>
          </div>
          <button
            onClick={() => handleNavigate('quiz')}
            className="text-xs font-semibold text-[#1F242C] hover:underline"
          >
            Take Today's Quiz →
          </button>
        </div>

        <div className="space-y-2">
          {prefs.quizHistory.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#6B7280]">{item.date}</span>
                <span className="font-semibold text-[#111827]">· {item.category}</span>
              </div>
              <div className="font-mono font-bold text-[#111827]">
                {item.score} / {item.total} ({Math.round((item.score / item.total) * 100)}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
