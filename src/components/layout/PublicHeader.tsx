import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, ArrowRight } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group text-left select-none">
            <div className="font-serif text-2xl tracking-wider font-bold text-[#111827] leading-none">
              <span className="text-[#111827]">NYAYA</span>
              <span className="text-[#525F6F] font-normal">PATH</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#4B5563]">
            <a href="#product" className="hover:text-[#111827] transition-colors">
              Product
            </a>
            <a href="#how-it-works" className="hover:text-[#111827] transition-colors">
              How It Works
            </a>
            <a href="#rights" className="hover:text-[#111827] transition-colors">
              Rights
            </a>
            <a href="#reels" className="hover:text-[#111827] transition-colors">
              Legal Reels
            </a>
            <a href="#quiz" className="hover:text-[#111827] transition-colors">
              Daily Quiz
            </a>
            <a href="#updates" className="hover:text-[#111827] transition-colors">
              Updates
            </a>
            <Link to="/about" className="hover:text-[#111827] transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Auth CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-semibold text-[#1F242C] hover:text-black transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#111827] hover:bg-[#F0EFEB] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F5] border-b border-[#E3E1D9] p-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#374151]">
            <a
              href="#product"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#F0EFEB]"
            >
              Product
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#F0EFEB]"
            >
              How It Works
            </a>
            <a
              href="#rights"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#F0EFEB]"
            >
              Rights
            </a>
            <a
              href="#reels"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#F0EFEB]"
            >
              Legal Reels
            </a>
            <a
              href="#quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#F0EFEB]"
            >
              Daily Quiz
            </a>
            <a
              href="#updates"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#F0EFEB]"
            >
              Updates
            </a>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#F0EFEB]"
            >
              About
            </Link>
          </nav>

          <div className="pt-3 border-t border-[#EAE8E0] flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="w-full py-2.5 rounded-lg bg-[#1F242C] text-white text-xs font-semibold text-center"
              >
                Go to Dashboard ({user?.name})
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-lg border border-[#D5D3CB] bg-white text-[#111827] text-xs font-semibold text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#1F242C] text-white text-xs font-semibold text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
