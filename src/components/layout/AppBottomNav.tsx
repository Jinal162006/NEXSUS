import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  CheckSquare,
  User,
  MoreHorizontal,
  FileText,
  Scale,
  BookOpen,
  CheckCircle2,
  Newspaper,
  ShieldAlert,
  X,
  Flame,
} from 'lucide-react';
import { database } from '../../services/database';

export const AppBottomNav: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const prefs = database.getPreferences();

  const primaryItems = [
    { to: '/dashboard', label: 'Home', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/guidance', label: 'Guidance', icon: <Compass className="w-4 h-4" /> },
    { to: '/cases', label: 'Cases', icon: <Briefcase className="w-4 h-4" /> },
    { to: '/tasks', label: 'Tasks', icon: <CheckSquare className="w-4 h-4" /> },
    { to: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  const secondaryItems = [
    { to: '/documents', label: 'Documents & Analysis', icon: <FileText className="w-4 h-4" /> },
    { to: '/rights', label: 'Know Your Rights', icon: <Scale className="w-4 h-4" /> },
    { to: '/feed', label: 'Legal Reels', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/quiz', label: 'Daily Legal Quiz', icon: <CheckCircle2 className="w-4 h-4" /> },
    { to: '/updates', label: 'Legal Updates', icon: <Newspaper className="w-4 h-4" /> },
    { to: '/authorities', label: 'Jurisdiction & Authorities', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile Drawer for Secondary Links */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative z-51 bg-[#FAF9F5] border-t border-[#E3E1D9] rounded-t-2xl p-5 shadow-2xl space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0]">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-[#111827]">More Features</span>
                <span className="text-xs text-[#78350F] flex items-center gap-1 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                  {prefs.quizStreak}d streak
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-md text-[#6B7280] hover:text-black hover:bg-[#F0EFEB]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {secondaryItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate(item.to);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E3E1D9] text-xs font-semibold text-[#1F242C] text-left hover:border-black transition-all"
                >
                  <div className="p-1.5 rounded-md bg-[#FAF9F5] text-[#2C3E50]">
                    {item.icon}
                  </div>
                  <span className="leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation (6 targets: 5 primary + More drawer) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F5]/98 backdrop-blur-md border-t border-[#E3E1D9] px-2 py-1 shadow-lg">
        <div className="grid grid-cols-6 gap-0.5">
          {primaryItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `min-h-[44px] flex flex-col items-center justify-center py-1 px-0.5 rounded-md transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#111827] font-bold'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-md transition-colors ${
                      isActive ? 'bg-[#E8E6DF] text-[#111827]' : ''
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}

          {/* More Drawer Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="min-h-[44px] flex flex-col items-center justify-center py-1 px-0.5 rounded-md text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
            aria-label="Open more tools"
          >
            <div className="p-1 rounded-md">
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
