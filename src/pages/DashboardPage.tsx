import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../services/database';
import {
  Compass,
  Upload,
  CheckSquare,
  Briefcase,
  Flame,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Scale,
  BookOpen,
  Newspaper,
  ChevronRight,
} from 'lucide-react';
import { DEMO_RIGHTS, DEMO_UPDATES } from '../../server/data/demoData';
import { CaseRecord, TaskRecord } from '../types/legal';
import { LEGAL_REELS } from '../data/legalReels';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const prefs = database.getPreferences();

  useEffect(() => {
    setCases(database.getCases());
    setTasks(database.getTasks());
  }, []);

  const handleToggleTask = (id: string) => {
    database.toggleTaskComplete(id);
    setTasks(database.getTasks());
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Filter personalized rights and updates
  const userInterests = user?.interests && user.interests.length > 0
    ? user.interests
    : ['Business', 'Cyber Crime', 'Consumer Rights'];

  const personalizedRights = DEMO_RIGHTS.filter((r) =>
    userInterests.some((int) => r.category.toLowerCase().includes(int.toLowerCase()))
  ).slice(0, 2);

  const relevantUpdates = DEMO_UPDATES.filter((u) =>
    userInterests.some((int) => u.category.toLowerCase().includes(int.toLowerCase()))
  ).slice(0, 2);

  const latestReel = LEGAL_REELS[0];

  const pendingTasks = tasks.filter((t) => t.status !== 'Completed');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');

  return (
    <div className="space-y-8 max-w-6xl">
      {/* 1. Dashboard Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
            {getTimeGreeting()}, {user?.name || 'Citizen'}
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            Here's your legal activity at a glance.
          </p>
        </div>

        {/* Quick Streak Card */}
        <div
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-[#E3E1D9] text-[#78350F] text-xs font-semibold cursor-pointer shadow-2xs hover:border-[#1F242C] transition-all self-start sm:self-auto"
        >
          <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
          <div>
            <span className="block leading-none text-[#111827]">
              {prefs.quizStreak} Day Streak
            </span>
            <span className="text-[10px] text-[#92400E] font-normal">
              Take today's quiz
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
        </div>
      </div>

      {/* 2. Primary Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => navigate('/guidance')}
          className="p-4 rounded-xl bg-[#1F242C] text-white flex items-center justify-between shadow-2xs hover:bg-black transition-all cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <Compass className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Ask NyayaPath</div>
              <div className="text-[11px] text-stone-300 mt-0.5">Start step-by-step guidance</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate('/documents')}
          className="p-4 rounded-xl bg-white border border-[#E3E1D9] text-[#1F242C] flex items-center justify-between shadow-2xs hover:border-[#1F242C] transition-all cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] flex items-center justify-center text-[#2C3E50]">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Upload Document</div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">Analyze notices & contracts</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate('/tasks')}
          className="p-4 rounded-xl bg-white border border-[#E3E1D9] text-[#1F242C] flex items-center justify-between shadow-2xs hover:border-[#1F242C] transition-all cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0] flex items-center justify-center text-[#2C3E50]">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Check My Tasks</div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">{pendingTasks.length} pending deadlines</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3. Main Grid: Active Cases & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Cases */}
        <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#2C3E50]" />
                <h3 className="text-sm font-bold text-[#111827]">My Active Cases</h3>
              </div>
              <Link
                to="/cases"
                className="text-xs font-semibold text-[#1F242C] hover:underline flex items-center gap-1"
              >
                <span>View All ({cases.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#F3F4F6] mt-2">
              {cases.slice(0, 3).map((cs) => (
                <div
                  key={cs.id}
                  onClick={() => navigate(`/cases/${cs.id}`)}
                  className="py-3 group cursor-pointer text-left"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#6B7280] mb-1">
                    <span className="font-semibold uppercase tracking-wider text-[#111827]">
                      {cs.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-medium ${
                        cs.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {cs.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#111827] group-hover:text-black leading-snug">
                    {cs.title}
                  </h4>

                  <p className="text-[11px] text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
                    {cs.summary}
                  </p>

                  <div className="flex items-center justify-between mt-2.5 text-[10px] text-[#6B7280]">
                    <span>Updated {cs.lastUpdated}</span>
                    <span className="font-semibold text-[#1F242C] group-hover:underline">
                      Open Case →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#F3F4F6] flex justify-end">
            <button
              onClick={() => navigate('/guidance')}
              className="text-xs font-semibold text-[#1F242C] hover:underline"
            >
              + Create New Case from Guidance
            </button>
          </div>
        </div>

        {/* My Tasks */}
        <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0]">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#2C3E50]" />
                <h3 className="text-sm font-bold text-[#111827]">My Tasks</h3>
              </div>
              <Link
                to="/tasks"
                className="text-xs font-semibold text-[#1F242C] hover:underline flex items-center gap-1"
              >
                <span>View All ({tasks.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#F3F4F6] mt-2">
              {tasks.slice(0, 4).map((task) => {
                const isCompleted = task.status === 'Completed';
                return (
                  <div key={task.id} className="py-2.5 flex items-start gap-3 text-left">
                    <button
                      type="button"
                      onClick={() => handleToggleTask(task.id)}
                      className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        isCompleted
                          ? 'bg-[#1F242C] border-[#1F242C] text-white'
                          : 'border-[#D5D3CB] hover:border-black'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-semibold truncate ${
                            isCompleted ? 'line-through text-[#9CA3AF]' : 'text-[#111827]'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                            task.priority === 'Urgent'
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : task.priority === 'High'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-stone-50 text-stone-700 border border-stone-200'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[10px] text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Due {task.dueDate}
                        </span>
                        {task.caseTitle && (
                          <>
                            <span>·</span>
                            <span className="truncate max-w-[150px]">{task.caseTitle}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#F3F4F6] flex justify-end">
            <Link to="/tasks" className="text-xs font-semibold text-[#1F242C] hover:underline">
              Manage Task Board →
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Secondary Row: Daily Learning & Personalized Rights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Learning: Quiz & Reel */}
        <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-[#111827]">Today's Legal Learning</h3>
            </div>
            <Link to="/quiz" className="text-xs font-semibold text-[#1F242C] hover:underline">
              Quiz Hub
            </Link>
          </div>

          {/* Daily Quiz Card */}
          <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#EAE8E0] space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#6B7280]">
              <span className="font-semibold text-[#111827] uppercase">2-Min Challenge</span>
              <span className="text-amber-800 font-bold">{prefs.quizStreak}d streak</span>
            </div>
            <p className="text-xs font-serif font-bold text-[#111827] leading-snug">
              What is your liability if unauthorized debit is reported within 3 days?
            </p>
            <button
              onClick={() => navigate('/quiz')}
              className="w-full py-1.5 rounded-md bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              Start Today's Quiz
            </button>
          </div>

          {/* Featured Legal Reel */}
          <div
            onClick={() => navigate('/feed')}
            className="p-3 rounded-lg border border-[#E3E1D9] hover:border-[#1F242C] cursor-pointer transition-colors overflow-hidden"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              TODAY'S LEGAL REEL
            </span>
            {latestReel.mediaType === 'video' ? (
              <video
                src={latestReel.assetPath}
                className="w-full aspect-video object-cover rounded-md mt-2 bg-black"
                muted
                playsInline
                loop
                autoPlay
              />
            ) : (
              <div className="mt-2 rounded-md bg-[#1F242C] text-white p-4 text-xs">
                Audio Reel · Click to open the full feed
              </div>
            )}
            <div className="text-xs font-bold text-[#111827] mt-2 leading-snug">
              {latestReel.title}
            </div>
            <p className="text-[11px] text-[#6B7280] mt-1 line-clamp-2">
              {latestReel.description}
            </p>
          </div>
        </div>

        {/* Personalized Rights */}
        <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs space-y-3 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0]">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#2C3E50]" />
              <h3 className="text-sm font-bold text-[#111827]">Personalized Rights</h3>
            </div>
            <Link to="/rights" className="text-xs font-semibold text-[#1F242C] hover:underline">
              All Rights
            </Link>
          </div>

          <div className="space-y-2.5">
            {personalizedRights.map((r) => (
              <div
                key={r.id}
                onClick={() => navigate('/rights')}
                className="p-3 rounded-lg border border-[#E3E1D9] hover:border-[#1F242C] cursor-pointer transition-colors text-left"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  {r.category}
                </div>
                <div className="text-xs font-bold text-[#111827] mt-0.5 leading-snug">
                  {r.title}
                </div>
                <p className="text-[11px] text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
                  {r.simpleMeaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Legal Updates */}
        <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 shadow-2xs space-y-3 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0]">
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-[#2C3E50]" />
              <h3 className="text-sm font-bold text-[#111827]">Legal Updates</h3>
            </div>
            <Link to="/updates" className="text-xs font-semibold text-[#1F242C] hover:underline">
              All Updates
            </Link>
          </div>

          <div className="space-y-2.5">
            {relevantUpdates.map((u) => (
              <div
                key={u.id}
                onClick={() => navigate('/updates')}
                className="p-3 rounded-lg border border-[#E3E1D9] hover:border-[#1F242C] cursor-pointer transition-colors text-left"
              >
                <div className="flex items-center justify-between text-[10px] text-[#6B7280]">
                  <span className="font-semibold text-[#111827] uppercase">{u.tag}</span>
                  <span className="font-mono">{u.date}</span>
                </div>
                <div className="text-xs font-bold text-[#111827] mt-0.5 leading-snug">
                  {u.headline}
                </div>
                <p className="text-[11px] text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
                  {u.whyItMatters}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
