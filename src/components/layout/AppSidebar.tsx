import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  FileText,
  CheckSquare,
  Scale,
  BookOpen,
  CheckCircle2,
  Newspaper,
  ShieldAlert,
  User,
  LogOut,
  Flame,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { database } from '../../services/database';

export const AppSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const prefs = database.getPreferences();

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/guidance', label: 'Legal Guidance', icon: <Compass className="w-4 h-4" /> },
    { to: '/cases', label: 'My Cases', icon: <Briefcase className="w-4 h-4" /> },
    { to: '/documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { to: '/tasks', label: 'Tasks', icon: <CheckSquare className="w-4 h-4" /> },
    { to: '/rights', label: 'Know Your Rights', icon: <Scale className="w-4 h-4" /> },
    { to: '/feed', label: 'Legal Reels', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/quiz', label: 'Daily Quiz', icon: <CheckCircle2 className="w-4 h-4" /> },
    { to: '/updates', label: 'Legal Updates', icon: <Newspaper className="w-4 h-4" /> },
    { to: '/authorities', label: 'Authorities', icon: <ShieldAlert className="w-4 h-4" /> },
    { to: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#FAF9F5] border-r border-[#E7E5DF] h-screen sticky top-0 select-none z-30">
      {/* Brand Wordmark */}
      <div className="h-16 flex items-center px-6 border-b border-[#E7E5DF]">
        <NavLink to="/dashboard" className="flex flex-col text-left">
          <div className="font-serif text-xl tracking-wider font-bold text-[#111827] leading-none">
            <span className="text-[#111827]">NYAYA</span>
            <span className="text-[#525F6F] font-normal">PATH</span>
          </div>
          <span className="text-[10px] text-[#6B7280] font-medium mt-1">
            Legal Workspace
          </span>
        </NavLink>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
          Workspace
        </div>

        {navLinks.slice(0, 5).map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-[#1F242C] text-white shadow-2xs'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F0EFEB]'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}

        <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
          Intelligence & Learning
        </div>

        {navLinks.slice(5).map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-[#1F242C] text-white shadow-2xs'
                  : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F0EFEB]'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>

      {/* User Status Bar & Logout */}
      <div className="p-3 border-t border-[#E7E5DF] bg-[#F4F2EC]/60 space-y-2">
        <div className="flex items-center justify-between px-2 py-1 text-xs">
          <div className="flex items-center gap-1.5 text-[#78350F] font-semibold">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
            <span className="tabular-nums">{prefs.quizStreak} Day Streak</span>
          </div>
          <span className="text-[10px] text-[#6B7280] font-mono">Free Plan</span>
        </div>

        <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E3E1D9]">
          <div
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1"
          >
            <div className="w-7 h-7 rounded-md bg-[#1F242C] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <div className="text-xs font-bold text-[#111827] truncate">
                {user?.name || 'Citizen User'}
              </div>
              <div className="text-[10px] text-[#6B7280] truncate">
                {user?.email || 'Logged in'}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            title="Sign Out"
            className="p-1.5 text-[#6B7280] hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
