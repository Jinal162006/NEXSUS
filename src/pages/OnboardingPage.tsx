import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../services/database';
import { Check, ArrowRight, Sparkles, Scale, BookOpen } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const legalTopics = [
    'Cyber Crime',
    'Consumer Rights',
    'Employment',
    'Property',
    'Business',
    'Finance',
    'Family',
    'Technology & Privacy',
    'General Legal Awareness',
  ];

  const languages: ('English' | 'Hindi' | 'Marathi')[] = ['English', 'Hindi', 'Marathi'];

  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    user?.interests && user.interests.length > 0
      ? user.interests
      : ['Business', 'Cyber Crime', 'Consumer Rights']
  );
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Hindi' | 'Marathi'>(
    user?.preferredLanguage || 'English'
  );

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleComplete = () => {
    // Save to user profile and persistent database
    updateUser({
      interests: selectedTopics,
      preferredLanguage: selectedLanguage,
      isOnboarded: true,
    });

    const prefs = database.getPreferences();
    prefs.interests = selectedTopics;
    if (user?.name) prefs.name = user.name;
    database.savePreferences(prefs);

    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E232A] flex items-center justify-center p-4 py-12 font-sans">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-[#E3E1D9] p-7 sm:p-10 shadow-sm text-left">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E3E1D9] text-xs font-semibold text-[#1F242C] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Welcome to NyayaPath</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827]">
            Personalize your legal workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-2 max-w-md mx-auto leading-relaxed">
            Tell us which legal topics and languages matter to you. We'll tailor your dashboard, reels, quizzes, and statutory guidance.
          </p>
        </div>

        {/* Section 1: Topics Selection */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">STEP 1 OF 2</span>
            <h3 className="text-sm font-bold text-[#111827] mt-0.5">
              What legal topics are relevant to you?
            </h3>
            <p className="text-xs text-[#6B7280]">Select at least one category to receive tailored updates and rights.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {legalTopics.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1F242C] border-[#1F242C] text-white shadow-2xs'
                      : 'bg-[#FAF9F5] border-[#E3E1D9] text-[#374151] hover:border-[#1F242C]'
                  }`}
                >
                  <span className="truncate">{topic}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Preferred Language */}
        <div className="mt-8 pt-6 border-t border-[#EAE8E0] space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">STEP 2 OF 2</span>
            <h3 className="text-sm font-bold text-[#111827] mt-0.5">
              Preferred Language for Legal Explanations
            </h3>
            <p className="text-xs text-[#6B7280]">
              You can toggle language in guidance and reels at any time.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1F242C] border-[#1F242C] text-white shadow-2xs'
                      : 'bg-[#FAF9F5] border-[#E3E1D9] text-[#374151] hover:border-[#1F242C]'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 pt-6 border-t border-[#EAE8E0] flex justify-end">
          <button
            type="button"
            onClick={handleComplete}
            disabled={selectedTopics.length === 0}
            className={`px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs ${
              selectedTopics.length > 0
                ? 'bg-[#1F242C] text-white hover:bg-black'
                : 'bg-[#EAE8E0] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            <span>Enter My Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
