import React, { useState } from 'react';
import { Navigate, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AppSidebar } from './AppSidebar';
import { AppBottomNav } from './AppBottomNav';
import { Bell, Flame, Search, ChevronRight, CheckCircle, ExternalLink, X } from 'lucide-react';
import { database } from '../../services/database';

export const AppLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(database.getNotifications());
  const prefs = database.getPreferences();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="font-serif text-2xl font-bold tracking-wider text-[#111827]">
            NYAYA<span className="text-[#525F6F] font-normal">PATH</span>
          </div>
          <div className="text-xs text-[#6B7280]">Loading your legal workspace...</div>
        </div>
      </div>
    );
  }

  // Redirect unauthenticated visitors to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect new users who haven't completed onboarding to /onboarding
  if (user && !user.isOnboarded && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string, linkTo?: string) => {
    database.markNotificationRead(id);
    setNotifications(database.getNotifications());
    setNotificationsOpen(false);
    if (linkTo) navigate(linkTo);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/guidance')) return 'Legal Guidance Bot';
    if (path.startsWith('/cases')) return 'Case Workspace';
    if (path.startsWith('/documents')) return 'Document Center';
    if (path.startsWith('/tasks')) return 'Task Management';
    if (path.startsWith('/rights')) return 'Know Your Rights';
    if (path.startsWith('/feed')) return 'Legal Reels & Awareness';
    if (path.startsWith('/quiz')) return "Today's Legal Challenge";
    if (path.startsWith('/updates')) return 'Legislative & Regulatory Updates';
    if (path.startsWith('/authorities')) return 'Jurisdiction & Authority Directory';
    if (path.startsWith('/profile')) return 'Citizen Profile & Settings';
    return 'Workspace';
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E232A] flex font-sans selection:bg-[#2C3E50]/15 selection:text-[#111827]">
      {/* Desktop Left Navigation */}
      <AppSidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Header */}
        <header className="sticky top-0 z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E5DF] h-16 flex items-center justify-between px-4 sm:px-6">
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-2 text-left">
            <span className="font-serif text-lg font-bold text-[#111827] truncate">
              {getPageTitle()}
            </span>
          </div>

          {/* Right Header Affordances */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Link to Guidance */}
            <button
              onClick={() => navigate('/guidance')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer shadow-2xs"
            >
              <span>Ask NyayaPath</span>
            </button>

            {/* Daily Streak Indicator */}
            <div
              onClick={() => navigate('/quiz')}
              title="Daily Challenge Streak"
              className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#F4F2EC] border border-[#E3E1D9] text-[#78350F] text-xs font-semibold hover:bg-[#EBE8E0] transition-colors"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span className="tabular-nums">{prefs.quizStreak}d</span>
            </div>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-md border border-[#E3E1D9] bg-white text-[#374151] hover:bg-[#F4F2EC] transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E3E1D9] rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
                  <div className="p-3.5 border-b border-[#EAE8E0] flex items-center justify-between bg-[#FAF9F5]">
                    <div className="text-xs font-bold text-[#111827]">In-App Notifications</div>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[#9CA3AF] hover:text-[#111827] text-xs font-bold p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-[#F3F4F6]">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[#9CA3AF]">
                        No notifications at this time.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n.id, n.linkTo)}
                          className={`p-3 text-left hover:bg-[#FAF9F5] transition-colors cursor-pointer ${
                            !n.read ? 'bg-amber-50/40' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-[#6B7280]">
                            <span className="font-semibold uppercase tracking-wider">{n.type}</span>
                            <span>{n.date}</span>
                          </div>
                          <div className="text-xs font-bold text-[#111827] mt-0.5">{n.title}</div>
                          <p className="text-[11px] text-[#4B5563] mt-1 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={() => navigate('/profile')}
              className="w-8 h-8 rounded-md bg-[#1F242C] text-white flex items-center justify-center text-xs font-bold shadow-2xs hover:bg-black transition-colors cursor-pointer"
              title="View Profile"
            >
              {user?.name?.charAt(0) || 'U'}
            </button>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12 text-left">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <AppBottomNav />
      </div>
    </div>
  );
};
