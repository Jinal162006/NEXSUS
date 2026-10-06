import React from 'react';
import { Link } from 'react-router-dom';
import { PublicHeader } from '../components/layout/PublicHeader';
import { Scale, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E232A] flex flex-col font-sans">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-16 text-left space-y-12">
        {/* Title */}
        <div className="border-b border-[#E7E5DF] pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            ABOUT NYAYAPATH
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827] mt-2">
            Technology for a More Accessible Legal Ecosystem
          </h1>
          <p className="text-base text-[#4B5563] mt-3 leading-relaxed">
            NyayaPath helps people understand legal information, explore possible legal routes, learn about their rights, and find their next step with confidence.
          </p>
        </div>

        {/* The Core Mission */}
        <div className="space-y-4 text-sm text-[#374151] leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-[#111827]">Our Mission</h2>
          <p>
            In traditional legal ecosystems, citizens face immense friction when an unexpected dispute arises. Statutes, notices, and procedural rules are written in dense legalese that creates panic rather than clarity. When an issue occurs, people rarely know whether their problem is cyber crime, consumer deficiency, contract breach, or civil nuisance.
          </p>
          <p>
            NyayaPath bridges this knowledge gap by structuring the citizen journey: from initial confusion to plain-English understanding, codified statutory rights, procedural routes, designated grievance authorities, and an actionable evidence checklist.
          </p>
        </div>

        {/* 3 Pillars of Accessibility */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white border border-[#E3E1D9] space-y-2">
            <Scale className="w-5 h-5 text-[#2C3E50]" />
            <h3 className="text-sm font-bold text-[#111827]">Rights Transparency</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Every citizen deserves to understand their rights in plain language, backed by verified statutory citations and official circulars.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E3E1D9] space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-sm font-bold text-[#111827]">Ethical Restraint</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              We never promise guaranteed legal outcomes. We clearly mark possibilities, multiple routes, and encourage licensed counsel for formal litigation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E3E1D9] space-y-2">
            <HeartHandshake className="w-5 h-5 text-amber-700" />
            <h3 className="text-sm font-bold text-[#111827]">Public Education</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Daily scenario quizzes, bite-sized reels, and legislative comparison cards build practical legal literacy for everyday life.
            </p>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E3E1D9] space-y-3">
          <h2 className="text-sm font-bold text-[#111827] uppercase tracking-wider">
            Scope & Legal Disclaimer
          </h2>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment. All outputs—including potential statutory claims, procedural routes, and forum recommendations—are informational and should not be construed as legal counsel. For active court litigation, always engage a licensed advocate enrolled with the Bar Council.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4 flex items-center gap-4">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-xl bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-2"
          >
            <span>Start Legal Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="text-xs font-semibold text-[#1F242C] hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};
