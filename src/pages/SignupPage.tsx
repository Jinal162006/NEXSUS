import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PublicHeader } from '../components/layout/PublicHeader';
import { ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { signupWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and a valid email.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signupWithEmail(name, email, password);
      navigate('/onboarding', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/onboarding', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Google Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E232A] flex flex-col font-sans">
      <PublicHeader />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#E3E1D9] p-7 sm:p-9 shadow-sm text-left">
          <div className="text-center mb-6">
            <div className="font-serif text-2xl font-bold text-[#111827]">
              <span>NYAYA</span>
              <span className="text-[#525F6F] font-normal">PATH</span>
            </div>
            <h2 className="text-lg font-bold text-[#111827] mt-3">Create your workspace</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Start your legal journey. Track cases, documents, and codified rights.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl border border-[#D5D3CB] bg-white hover:bg-[#FAF9F5] text-[#1F242C] text-xs font-semibold flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-2xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center my-5 text-xs text-[#9CA3AF]">
            <div className="flex-1 border-t border-[#EAE8E0]" />
            <span className="px-3">or register with email</span>
            <div className="flex-1 border-t border-[#EAE8E0]" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Pravin Jain"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] focus:outline-hidden focus:border-[#1F242C] focus:ring-1 focus:ring-[#1F242C] bg-[#FAF9F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pravin@domain.com"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] focus:outline-hidden focus:border-[#1F242C] focus:ring-1 focus:ring-[#1F242C] bg-[#FAF9F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#D5D3CB] focus:outline-hidden focus:border-[#1F242C] focus:ring-1 focus:ring-[#1F242C] bg-[#FAF9F5]"
              />
            </div>

            <div className="text-[11px] text-[#6B7280] leading-relaxed pt-1">
              By creating an account, you agree to NyayaPath's terms and understand that information provided is for educational navigation support.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs mt-2"
            >
              <span>{loading ? 'Creating workspace...' : 'Continue to Onboarding'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-[#6B7280]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#111827] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
