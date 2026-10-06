import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicHeader } from '../components/layout/PublicHeader';
import {
  Compass,
  Scale,
  BookOpen,
  CheckCircle2,
  FileText,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  Landmark,
  Check,
  Flame,
  Upload,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  DEMO_RIGHTS,
  DEMO_UPDATES,
  DEMO_QUIZ_QUESTIONS,
} from '../../server/data/demoData';
import { LEGAL_REELS } from '../data/legalReels';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Interactive sample quiz state on landing page
  const [quizSelectedIndex, setQuizSelectedIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const sampleQuiz = DEMO_QUIZ_QUESTIONS[0]; // Banking fraud question

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1E232A] flex flex-col font-sans selection:bg-[#2C3E50]/15 selection:text-[#111827]">
      {/* 1. Header */}
      <PublicHeader />

      <main className="flex-1 w-full space-y-24 sm:space-y-32 pb-24 text-left">
        {/* ========================================================
            1. HERO SECTION
            ======================================================== */}
        <section className="pt-16 sm:pt-24 pb-8 max-w-5xl mx-auto text-center px-4 sm:px-6">
          {/* Subtle Top Kicker */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-[#4B5563] uppercase mb-6">
            <span className="font-serif tracking-widest text-[#111827] font-bold">NYAYAPATH</span>
            <span aria-hidden="true" className="text-[#9CA3AF]">·</span>
            <span>From Legal Confusion to the Right Path</span>
          </div>

          {/* Animated Headline with subtle fade-in-up */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111827] tracking-tight leading-[1.12] max-w-4xl mx-auto animate-fade-in-up"
            style={{ textWrap: 'balance' }}
          >
            Legal problems shouldn't begin with confusion.
          </h1>

          {/* Animated Subheadline with delayed fade-in-up */}
          <p
            className="text-base sm:text-xl text-[#4B5563] mt-6 max-w-2xl mx-auto leading-relaxed font-normal animate-fade-in-up-delayed"
            style={{ textWrap: 'balance' }}
          >
            Understand your rights, explore possible legal routes, find the right authority, and take your next step with confidence.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#1F242C] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span className="tracking-wide">Start Your Legal Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#product"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white border border-[#D5D3CB] text-[#1F242C] text-xs sm:text-sm font-semibold hover:bg-[#FAF9F5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Scale className="w-4 h-4 text-[#4B5563]" />
              <span className="tracking-wide">Explore NyayaPath</span>
            </a>
          </div>

          {/* Refined Visual Legal Journey */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">
              The NyayaPath Legal Navigation Journey
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 bg-white rounded-xl border border-[#E3E1D9] p-3 shadow-2xs">
              {[
                { num: '01', title: 'Problem', sub: 'What happened' },
                { num: '02', title: 'Understand', sub: 'Plain English' },
                { num: '03', title: 'Rights', sub: 'Codified remedy' },
                { num: '04', title: 'Routes', sub: 'Action courses' },
                { num: '05', title: 'Authority', sub: 'Forum / Tribunal' },
                { num: '06', title: 'Next Step', sub: 'Priority action' },
              ].map((st, i) => (
                <div
                  key={i}
                  className="bg-[#FAF9F5] rounded-lg border border-[#EAE8E0] p-3 text-left flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#6B7280]">
                    <span>{st.num}</span>
                    {i < 5 && <span className="hidden sm:inline text-[#9CA3AF]">→</span>}
                  </div>
                  <div className="mt-2">
                    <span className="text-xs font-bold text-[#111827] block leading-snug">
                      {st.title}
                    </span>
                    <span className="text-[10px] text-[#6B7280] block mt-0.5">
                      {st.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            2. THE PROBLEM SECTION
            ======================================================== */}
        <section id="problem" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border-b border-[#E7E5DF] pb-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              THE PROBLEM
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
              Legal information is everywhere. Clear legal direction isn't.
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1 max-w-2xl leading-relaxed">
              When citizens encounter an unexpected dispute or notice, they are overwhelmed by jargon, unclear procedures, and opaque jurisdiction.
            </p>
          </div>

          {/* 4 Real Pain Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: '01',
                quote: '“I don\'t know what legal category my problem belongs to.”',
                desc: 'Is an unpaid salary breach of contract or labour commissioner grievance? Is an unauthorized card debit cyber crime or consumer deficiency?',
              },
              {
                num: '02',
                quote: '“I don\'t understand the legal language.”',
                desc: 'Notices reference statutory subsections and legal Latin that trigger anxiety instead of actionable understanding.',
              },
              {
                num: '03',
                quote: '“I don\'t know where I should go.”',
                desc: 'Citizens bounce between local police stations, online cyber desks, consumer forums, and banking ombudsmen.',
              },
              {
                num: '04',
                quote: '“I don\'t know what to do next.”',
                desc: 'Without knowing which evidence to preserve or deadline applies, critical opportunities for early dispute resolution are lost.',
              },
            ].map((pt, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#E3E1D9] p-5 text-left shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#9CA3AF] block mb-2">
                    {pt.num}.
                  </span>
                  <div className="text-xs font-serif font-bold text-[#111827] leading-snug">
                    {pt.quote}
                  </div>
                  <p className="text-[11px] text-[#4B5563] mt-3 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            3. HOW NYAYAPATH HELPS (4 FEATURE SECTIONS)
            ======================================================== */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border-b border-[#E7E5DF] pb-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              SOLUTION ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
              How NyayaPath Helps
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              Structured legal clarity from initial uncertainty to concrete next steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 shadow-2xs text-left flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#1F242C] text-white flex items-center justify-center mb-3">
                  <Compass className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  PILLAR 01
                </div>
                <h3 className="text-base font-serif font-bold text-[#111827] mt-1">
                  Legal Guidance
                </h3>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Explain your situation in simple, natural words. Our AI assistant classifies your issue and provides structured, non-jargon route recommendations.
                </p>
              </div>
              <Link
                to="/signup"
                className="mt-4 text-xs font-semibold text-[#1F242C] hover:underline flex items-center gap-1"
              >
                <span>Try Guidance Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 shadow-2xs text-left flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C] flex items-center justify-center mb-3">
                  <Landmark className="w-4 h-4 text-[#2C3E50]" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  PILLAR 02
                </div>
                <h3 className="text-base font-serif font-bold text-[#111827] mt-1">
                  Legal Navigation
                </h3>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Find possible routes and relevant authority. Compare informal settlement, mediation, regulatory ombudsmen, and judicial filing options.
                </p>
              </div>
              <Link
                to="/signup"
                className="mt-4 text-xs font-semibold text-[#1F242C] hover:underline flex items-center gap-1"
              >
                <span>Explore Navigation Routes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 shadow-2xs text-left flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C] flex items-center justify-center mb-3">
                  <Scale className="w-4 h-4 text-[#2C3E50]" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  PILLAR 03
                </div>
                <h3 className="text-base font-serif font-bold text-[#111827] mt-1">
                  Know Your Rights
                </h3>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Understand the rights that may matter to you. Browse codified statutory protections with plain meanings, statutory citations, and action tips.
                </p>
              </div>
              <Link
                to="/signup"
                className="mt-4 text-xs font-semibold text-[#1F242C] hover:underline flex items-center gap-1"
              >
                <span>Browse Rights Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 shadow-2xs text-left flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mb-3">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  PILLAR 04
                </div>
                <h3 className="text-base font-serif font-bold text-[#111827] mt-1">
                  Legal Learning
                </h3>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Stay informed through reels, updates, and daily quizzes. Build active legal literacy in 2 minutes each day with scenario-based challenges.
                </p>
              </div>
              <Link
                to="/signup"
                className="mt-4 text-xs font-semibold text-[#1F242C] hover:underline flex items-center gap-1"
              >
                <span>Start Daily Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. PRODUCT PREVIEWS (Interactive Mini Cards with "Explore")
            ======================================================== */}
        <section id="product" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border-b border-[#E7E5DF] pb-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              PRODUCT MODULES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
              Explore the NyayaPath Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              Five specialized tools connected into a single coherent workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Guidance Bot */}
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">ASSISTANT</span>
                  <Compass className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="text-sm font-bold text-[#111827]">Guidance Bot</h4>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Multimodal input (Text, Camera, Document, Audio) with 10-part structured legal path breakdown.
                </p>
                <div className="mt-3 p-2 rounded-md bg-[#FAF9F5] border border-[#EAE8E0] text-[11px] text-[#374151]">
                  "My landlord refused to refund my deposit..."
                </div>
              </div>
              <Link
                to="/guidance"
                className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#1F242C] hover:underline flex items-center justify-between"
              >
                <span>Explore Guidance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. Document Analysis */}
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">INTELLIGENCE</span>
                  <FileText className="w-4 h-4 text-[#2C3E50]" />
                </div>
                <h4 className="text-sm font-bold text-[#111827]">Document Intelligence</h4>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Upload legal notices & contracts to extract verified statutory sections, key dates, and action items.
                </p>
                <div className="mt-3 p-2 rounded-md bg-[#FAF9F5] border border-[#EAE8E0] text-[11px] text-[#374151]">
                  Extracted: CGST Act Section 16(2)(aa)
                </div>
              </div>
              <Link
                to="/documents"
                className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#1F242C] hover:underline flex items-center justify-between"
              >
                <span>Explore Documents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3. Task Management */}
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">MANAGEMENT</span>
                  <CheckSquare className="w-4 h-4 text-[#2C3E50]" />
                </div>
                <h4 className="text-sm font-bold text-[#111827]">Task Management</h4>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Case-connected action items generated automatically from guidance and document analysis.
                </p>
                <div className="mt-3 p-2 rounded-md bg-[#FAF9F5] border border-[#EAE8E0] text-[11px] text-[#374151]">
                  Due 10 Oct: Review tax invoice reconciliation
                </div>
              </div>
              <Link
                to="/tasks"
                className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#1F242C] hover:underline flex items-center justify-between"
              >
                <span>Explore Tasks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4. Legal Reels */}
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">AWARENESS</span>
                  <BookOpen className="w-4 h-4 text-[#2C3E50]" />
                </div>
                <h4 className="text-sm font-bold text-[#111827]">Legal Reels</h4>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Bite-sized video and editorial explainers covering old law vs. new amendments.
                </p>
                <div className="mt-3 p-2 rounded-md bg-[#FAF9F5] border border-[#EAE8E0] text-[11px] text-[#374151]">
                  60-sec explainer: Zero liability for banking fraud
                </div>
              </div>
              <Link
                to="/feed"
                className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#1F242C] hover:underline flex items-center justify-between"
              >
                <span>Explore Legal Reels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 5. Daily Quiz */}
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">EDUCATION</span>
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                </div>
                <h4 className="text-sm font-bold text-[#111827]">Daily Legal Quiz</h4>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  LinkedIn-style daily challenge with source references and streak tracking.
                </p>
                <div className="mt-3 p-2 rounded-md bg-[#FAF9F5] border border-[#EAE8E0] text-[11px] text-[#374151]">
                  Today: Central bank customer compensation rules
                </div>
              </div>
              <Link
                to="/quiz"
                className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#1F242C] hover:underline flex items-center justify-between"
              >
                <span>Explore Daily Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 6. Case Workspace */}
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span className="font-semibold uppercase tracking-wider text-[10px]">ORGANIZATION</span>
                  <Landmark className="w-4 h-4 text-[#2C3E50]" />
                </div>
                <h4 className="text-sm font-bold text-[#111827]">Case Workspace</h4>
                <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                  Unified dashboard linking notice documents, deadlines, notes, and timeline.
                </p>
                <div className="mt-3 p-2 rounded-md bg-[#FAF9F5] border border-[#EAE8E0] text-[11px] text-[#374151]">
                  Active: GST Notice & Tax Invoice Reconciliation
                </div>
              </div>
              <Link
                to="/cases"
                className="mt-4 pt-3 border-t border-[#F3F4F6] text-xs font-semibold text-[#1F242C] hover:underline flex items-center justify-between"
              >
                <span>Explore Cases</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. DOCUMENT INTELLIGENCE PREVIEW (GST NOTICE DEMO)
            ======================================================== */}
        <section id="document-analysis" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE8E0] pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#4B5563] mb-1">
                  <span className="font-semibold text-[#111827] uppercase tracking-wider text-[10px]">
                    DOCUMENT INTELLIGENCE
                  </span>
                  <span aria-hidden="true" className="text-[#9CA3AF]">·</span>
                  <span>PDF / DOCX / Image Analysis</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
                  Upload a legal document. Understand what matters.
                </h2>
                <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                  Analyze contracts, legal intimations, and statutory notices without decoding obscure legalese manually.
                </p>
              </div>

              <Link
                to="/documents"
                className="px-5 py-2.5 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto shadow-xs"
              >
                <span>Try Document Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* GST Notice Demonstration Preview */}
            <div className="bg-[#FAF9F5] rounded-lg border border-[#E3E1D9] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAE8E0] text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-700" />
                  <span className="font-bold text-[#111827]">
                    GST_Billing_Legal_Notice_DRC01A.pdf
                  </span>
                  <span className="text-[10px] text-[#6B7280] font-mono">245 KB</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Analyzed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                      Document Type
                    </span>
                    <div className="font-semibold text-[#111827]">
                      Statutory Demand / Intimation Notice (Form GST DRC-01A)
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                      Potential Legal Issue
                    </span>
                    <div className="text-[#374151]">
                      Input Tax Credit (ITC) mismatch between GSTR-3B claimed credit and supplier GSTR-2B details.
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                      Referenced Statutory Sections & Rules
                    </span>
                    <div className="space-y-1 font-mono text-[11px] text-[#1E232A]">
                      <div className="bg-white px-2 py-1 rounded border border-[#E3E1D9]">
                        CGST Act 2017 — Section 16(2)(aa)
                      </div>
                      <div className="bg-white px-2 py-1 rounded border border-[#E3E1D9]">
                        CGST Act 2017 — Section 73 (Determination of Tax)
                      </div>
                      <div className="bg-white px-2 py-1 rounded border border-[#E3E1D9]">
                        CGST Rules 2017 — Rule 36(4)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                      Important Extracted Dates
                    </span>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between bg-white px-2.5 py-1.5 rounded border border-[#E3E1D9]">
                        <span className="text-[#4B5563]">Notice Issue Date:</span>
                        <span className="font-semibold text-[#111827]">28 Sep 2026</span>
                      </div>
                      <div className="flex justify-between bg-white px-2.5 py-1.5 rounded border border-[#E3E1D9]">
                        <span className="text-rose-700 font-semibold">Reply Due Date:</span>
                        <span className="font-bold text-rose-700">15 Oct 2026</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                      Recommended Action Tasks
                    </span>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-1.5 text-[#374151]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Reconcile supplier invoice e-way bills with purchase register</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#374151]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Request Form GSTR-1 filing acknowledgment from vendor</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#374151]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Prepare written submission in Part B of DRC-01A</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. LEGAL REELS PREVIEW
            ======================================================== */}
        <section id="reels" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border-b border-[#E7E5DF] pb-4 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                SHORT-FORM LEGAL EDUCATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
                Legal knowledge, in your feed.
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                Public educational video breakdowns with creator attribution and verified statutory sources.
              </p>
            </div>

            <Link
              to="/feed"
              className="text-xs font-semibold text-[#1F242C] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore Legal Reels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LEGAL_REELS.filter((reel) => reel.mediaType === 'video').slice(0, 3).map((reel) => (
              <div
                key={reel.id}
                onClick={() => navigate('/feed')}
                className="bg-white rounded-xl border border-[#E3E1D9] p-3 flex flex-col justify-between hover:border-[#1F242C] transition-all cursor-pointer group shadow-2xs overflow-hidden"
              >
                <video
                  src={reel.assetPath}
                  className="w-full aspect-[9/16] max-h-[360px] object-cover rounded-lg bg-black"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="metadata"
                />
                <div className="pt-3">
                  <div className="flex items-center gap-2 mb-1 text-[10px] text-[#6B7280]">
                    <span className="font-semibold text-[#111827] uppercase">LEGAL REEL</span>
                    <span aria-hidden="true">·</span>
                    <span>{reel.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#111827] leading-snug group-hover:text-black">
                    {reel.title}
                  </h4>
                  <div className="mt-3 pt-2.5 border-t border-[#F3F4F6] flex items-center justify-between text-[11px]">
                    <span className="text-[#6B7280]">Video</span>
                    <span className="font-semibold text-[#1F242C] group-hover:underline flex items-center gap-1">
                      Watch Reel <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            7. DAILY QUIZ PREVIEW
            ======================================================== */}
        <section id="quiz" className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE8E0] pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#4B5563] mb-1">
                  <span className="font-semibold text-[#111827] uppercase tracking-wider text-[10px]">
                    DAILY CHALLENGE
                  </span>
                  <span aria-hidden="true" className="text-[#9CA3AF]">·</span>
                  <span>Two-Minute Habit</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
                  Today's Legal Challenge
                </h2>
                <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                  Test your legal awareness with real practical scenarios.
                </p>
              </div>

              <Link
                to="/quiz"
                className="px-4 py-2 rounded-lg bg-[#1F242C] text-white text-xs font-semibold hover:bg-black transition-colors shrink-0 shadow-xs"
              >
                Take Today's Quiz
              </Link>
            </div>

            {/* Interactive Sample Question */}
            <div className="bg-[#FAF9F5] rounded-lg border border-[#E3E1D9] p-5 max-w-2xl mx-auto text-left">
              <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3">
                <span className="font-semibold text-[#111827]">{sampleQuiz.category}</span>
                <span className="font-mono text-[11px]">Daily Literacy Sample</span>
              </div>

              <h4 className="text-sm font-serif font-bold text-[#111827] leading-relaxed">
                {sampleQuiz.question}
              </h4>

              <div className="space-y-2 my-4">
                {sampleQuiz.options.map((opt, idx) => {
                  const isSelected = quizSelectedIndex === idx;
                  const isCorrect = idx === sampleQuiz.correctIndex;
                  let optClass = 'bg-white border-[#E5E7EB] hover:border-[#1F242C] text-[#374151]';

                  if (quizSubmitted) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-rose-50 border-rose-500 text-rose-950';
                    } else {
                      optClass = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-[#FAF9F5] border-[#1F242C] ring-1 ring-[#1F242C] text-[#111827] font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizSubmitted}
                      onClick={() => setQuizSelectedIndex(idx)}
                      className={`w-full p-2.5 rounded-md border text-xs text-left flex items-start gap-2.5 transition-all cursor-pointer ${optClass}`}
                    >
                      <span className="font-mono font-bold shrink-0">{String.fromCharCode(65 + idx)}.</span>
                      <span className="flex-1">{opt}</span>
                      {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted ? (
                <div className="bg-white p-3 rounded-md border border-[#E3E1D9] text-xs space-y-1 mt-3">
                  <span className="font-bold text-[#111827] block text-[10px] uppercase">
                    Explanation:
                  </span>
                  <p className="text-[#4B5563] leading-relaxed">{sampleQuiz.explanation}</p>
                  <div className="pt-2 text-[10px] text-[#6B7280] font-mono">
                    Source: {sampleQuiz.source}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end pt-1">
                  <button
                    disabled={quizSelectedIndex === null}
                    onClick={() => setQuizSubmitted(true)}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold cursor-pointer ${
                      quizSelectedIndex !== null
                        ? 'bg-[#1F242C] text-white hover:bg-black'
                        : 'bg-[#EAE8E0] text-[#9CA3AF] cursor-not-allowed'
                    }`}
                  >
                    Check Answer
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================
            8. BUSINESS MODEL / PLANS SECTION
            ======================================================== */}
        <section id="plans" className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              PLANS & TIERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
              Transparent, Accessible Access
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              Public legal literacy is fundamentally free for all citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Free Tier */}
            <div className="bg-white rounded-xl border border-[#E3E1D9] p-6 shadow-2xs text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#111827]">Citizen Basic</span>
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Always Free
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#111827] mt-3">₹0</div>
                <p className="text-xs text-[#6B7280] mt-1">
                  For individual legal literacy and rights navigation.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-[#374151]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Basic legal guidance assistant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Complete codified rights directory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Legal awareness feed & reels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Daily legal quiz & streak tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Legislative & regulatory updates</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="mt-6 w-full py-2.5 rounded-lg border border-[#D5D3CB] bg-white text-[#111827] text-xs font-semibold text-center hover:bg-[#FAF9F5] transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Premium Tier (UI Ready) */}
            <div className="bg-white rounded-xl border border-[#1F242C] p-6 shadow-2xs text-left flex flex-col justify-between relative">
              <div className="absolute -top-2.5 right-4 bg-[#1F242C] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                WORKSPACE PRO
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#111827]">NyayaPath Pro</span>
                  <span className="font-mono text-xs font-bold text-[#6B7280]">Preview Tier</span>
                </div>
                <div className="font-serif text-2xl font-bold text-[#111827] mt-3">₹499<span className="text-xs font-normal text-[#6B7280]">/mo</span></div>
                <p className="text-xs text-[#6B7280] mt-1">
                  For businesses and individuals with ongoing disputes.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-[#374151]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Everything in Citizen Basic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Full legal document intelligence & OCR</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Case workspace & timeline management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Automated compliance task scheduler</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Priority statutory section explainers</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/signup"
                className="mt-6 w-full py-2.5 rounded-lg bg-[#1F242C] text-white text-xs font-semibold text-center hover:bg-black transition-colors"
              >
                Start 14-Day Pro Trial
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            9. FINAL CALL TO ACTION
            ======================================================== */}
        <section className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#1F242C] text-white rounded-2xl p-8 sm:p-14 border border-stone-800 shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300">
              START YOUR LEGAL NAVIGATION
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-3 tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
              Don't start with confusion.<br />
              Start with the right path.
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 mt-4 max-w-xl mx-auto leading-relaxed" style={{ textWrap: 'balance' }}>
              Explain what happened in everyday language. Find relevant rights, possible routes, forums, and your immediate next step.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white text-[#111827] text-xs sm:text-sm font-semibold hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/guidance"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-transparent border border-stone-600 text-white text-xs sm:text-sm font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Ask NyayaPath</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E7E5DF] bg-[#FAF9F5] py-12 text-center text-xs text-[#6B7280]">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          <div className="font-serif text-xl tracking-wider font-bold text-[#111827]">
            <span>NYAYA</span>
            <span className="text-[#525F6F] font-normal">PATH</span>
          </div>
          <p className="text-xs text-[#4B5563]">
            Understand your rights. Find your way forward. · From legal confusion to the right path.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap text-xs font-semibold text-[#374151] pt-2">
            <Link to="/guidance" className="hover:text-black">Guidance</Link>
            <span>·</span>
            <Link to="/rights" className="hover:text-black">Rights</Link>
            <span>·</span>
            <Link to="/feed" className="hover:text-black">Legal Reels</Link>
            <span>·</span>
            <Link to="/quiz" className="hover:text-black">Quiz</Link>
            <span>·</span>
            <Link to="/updates" className="hover:text-black">Updates</Link>
            <span>·</span>
            <Link to="/authorities" className="hover:text-black">Authorities</Link>
            <span>·</span>
            <Link to="/about" className="hover:text-black">About</Link>
          </div>

          <div className="pt-4 border-t border-[#EAE8E0] text-[11px] text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed">
            NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
