import React, { useState, useEffect } from 'react';
import {
  Home,
  Compass,
  Scale,
  BookOpen,
  CheckCircle2,
  User,
  Flame,
  Newspaper,
  ShieldAlert,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export type NavTab =
  | 'home'
  | 'guidance'
  | 'feed'
  | 'quiz'
  | 'rights'
  | 'updates'
  | 'authorities'
  | 'profile';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { tab: NavTab; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      tab: 'home',
      label: 'Home',
      icon: <Home className="w-4 h-4" />,
      desc: 'Overview and navigation journey',
    },
    {
      tab: 'guidance',
      label: 'Guidance',
      icon: <Compass className="w-4 h-4" />,
      desc: 'Interactive step-by-step guidance bot',
    },
    {
      tab: 'rights',
      label: 'Rights',
      icon: <Scale className="w-4 h-4" />,
      desc: 'Codified citizen protections & remedies',
    },
    {
      tab: 'feed',
      label: 'Feed',
      icon: <BookOpen className="w-4 h-4" />,
      desc: 'Short-form legal awareness cards',
    },
    {
      tab: 'quiz',
      label: 'Daily Quiz',
      icon: <CheckCircle2 className="w-4 h-4" />,
      desc: '2-minute scenario-based challenges',
    },
    {
      tab: 'updates',
      label: 'Updates',
      icon: <Newspaper className="w-4 h-4" />,
      desc: 'Recent statutory shifts & circulars',
    },
    {
      tab: 'authorities',
      label: 'Authorities',
      icon: <ShieldAlert className="w-4 h-4" />,
      desc: 'Jurisdictional forums & ombudsmen',
    },
    {
      tab: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      desc: 'Saved bookmarks, streak & reminders',
    },
  ];

  return (
    <>
      {/* ========================================================
          1. TOP NAVIGATION BAR (Desktop & Mobile Header)
          ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E5DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Zone 1: Single text wordmark */}
            <div
              onClick={() => handleTabChange('home')}
              className="flex items-center gap-2 cursor-pointer select-none group text-left"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTabChange('home')}
              aria-label="NyayaPath Home"
            >
              <div className="font-serif text-2xl tracking-wider font-bold text-[#111827] leading-none">
                <span className="text-[#111827]">NYAYA</span>
                <span className="text-[#525F6F] font-normal">PATH</span>
              </div>
            </div>

            {/* Zone 2: Desktop 4-6 Text Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
              {navItems
                .filter((item) => item.tab !== 'profile')
                .map((item) => {
                  const isActive = activeTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleTabChange(item.tab)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#1F242C] text-white shadow-2xs'
                          : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F0EFEB]'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
            </nav>

            {/* Zone 3: Actions (Streak & Profile / Mobile Drawer Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Daily Streak Counter - Unboxed Clean Typography */}
              <button
                onClick={() => handleTabChange('quiz')}
                title="Daily Learning Streak"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#F4F2EC] border border-[#E3E1D9] text-[#78350F] text-xs font-medium hover:bg-[#EBE8E0] transition-colors cursor-pointer"
                aria-label={`Daily Streak: ${streakCount} days`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span className="tabular-nums font-semibold">{streakCount}d</span>
                <span className="hidden sm:inline text-[11px] text-[#92400E]">streak</span>
              </button>

              {/* Desktop Profile Icon */}
              <button
                onClick={() => handleTabChange('profile')}
                className={`hidden md:flex p-1.5 rounded-md border transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#1F242C] text-white border-[#1F242C]'
                    : 'bg-[#F4F2EC] border-[#E3E1D9] text-[#374151] hover:bg-[#EAE7DF]'
                }`}
                title="Citizen Profile & Reminders"
                aria-label="Open Profile and Reminders"
              >
                <User className="w-4 h-4" />
              </button>

              {/* Mobile Drawer Toggle Button (min 44px touch target) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-[#111827] hover:bg-[#F0EFEB] transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. MOBILE DRAWER OVERLAY (Full Sections Menu)
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop Scrim */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-Down Drawer Sheet */}
          <div className="relative z-51 w-full bg-[#FAF9F5] border-b border-[#E3E1D9] shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 border-b border-[#EAE8E0] flex items-center justify-between">
              <div>
                <div className="font-serif text-lg font-bold text-[#111827]">
                  <span>NYAYA</span>
                  <span className="text-[#525F6F] font-normal">PATH</span>
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  Understand your rights. Find your way forward.
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-md text-[#4B5563] hover:text-[#111827] hover:bg-[#F0EFEB]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation List */}
            <div className="p-3 space-y-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => handleTabChange(item.tab)}
                    className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-lg text-left flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#1F242C] text-white'
                        : 'text-[#1E232A] hover:bg-[#F0EFEB]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${isActive ? 'bg-white/10' : 'bg-[#EAE8E0]'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold leading-tight">{item.label}</div>
                        <div className={`text-[11px] mt-0.5 ${isActive ? 'text-stone-300' : 'text-[#6B7280]'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#9CA3AF]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer Notice */}
            <div className="p-4 bg-[#F4F2EC] border-t border-[#EAE8E0] text-[11px] text-[#6B7280] leading-relaxed">
              NyayaPath provides legal information and navigation support. It does not replace a licensed advocate or formal court representation.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. MOBILE BOTTOM NAVIGATION (Thumb-Accessible 6 Tabs)
          ======================================================== */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F5]/98 backdrop-blur-md border-t border-[#E3E1D9] px-1 py-1 shadow-md"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="grid grid-cols-6 gap-0.5">
          {/* 1. Home / Landing */}
          <button
            onClick={() => handleTabChange('home')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 px-0.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'home'
                ? 'text-[#111827] font-bold'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            aria-label="Home page"
            aria-current={activeTab === 'home' ? 'page' : undefined}
          >
            <div className={`p-1 rounded-md transition-colors ${activeTab === 'home' ? 'bg-[#E8E6DF] text-[#111827]' : ''}`}>
              <Home className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">Home</span>
          </button>

          {/* 2. Guidance */}
          <button
            onClick={() => handleTabChange('guidance')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 px-0.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'guidance'
                ? 'text-[#111827] font-bold'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            aria-label="Guidance Bot"
            aria-current={activeTab === 'guidance' ? 'page' : undefined}
          >
            <div className={`p-1 rounded-md transition-colors ${activeTab === 'guidance' ? 'bg-[#E8E6DF] text-[#111827]' : ''}`}>
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">Guide</span>
          </button>

          {/* 3. Rights */}
          <button
            onClick={() => handleTabChange('rights')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 px-0.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'rights'
                ? 'text-[#111827] font-bold'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            aria-label="Know Your Rights"
            aria-current={activeTab === 'rights' ? 'page' : undefined}
          >
            <div className={`p-1 rounded-md transition-colors ${activeTab === 'rights' ? 'bg-[#E8E6DF] text-[#111827]' : ''}`}>
              <Scale className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">Rights</span>
          </button>

          {/* 4. Feed */}
          <button
            onClick={() => handleTabChange('feed')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 px-0.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'feed'
                ? 'text-[#111827] font-bold'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            aria-label="Legal Awareness Feed"
            aria-current={activeTab === 'feed' ? 'page' : undefined}
          >
            <div className={`p-1 rounded-md transition-colors ${activeTab === 'feed' ? 'bg-[#E8E6DF] text-[#111827]' : ''}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">Feed</span>
          </button>

          {/* 5. Daily Quiz */}
          <button
            onClick={() => handleTabChange('quiz')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 px-0.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'quiz'
                ? 'text-[#111827] font-bold'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            aria-label="Daily Legal Quiz"
            aria-current={activeTab === 'quiz' ? 'page' : undefined}
          >
            <div className={`p-1 rounded-md transition-colors ${activeTab === 'quiz' ? 'bg-[#E8E6DF] text-[#111827]' : ''}`}>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">Quiz</span>
          </button>

          {/* 6. Profile */}
          <button
            onClick={() => handleTabChange('profile')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 px-0.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'text-[#111827] font-bold'
                : 'text-[#6B7280] hover:text-[#111827]'
            }`}
            aria-label="User Profile and Saved Items"
            aria-current={activeTab === 'profile' ? 'page' : undefined}
          >
            <div className={`p-1 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-[#E8E6DF] text-[#111827]' : ''}`}>
              <User className="w-4 h-4" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">Profile</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
