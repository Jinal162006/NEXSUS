import React from 'react';
import { ArrowDown, HelpCircle, CheckCircle, Scale } from 'lucide-react';
import { FeedPost } from '../../types/legal';

interface OldNewComparisonProps {
  post: FeedPost;
  onExplore?: (title: string) => void;
}

export const OldNewComparison: React.FC<OldNewComparisonProps> = ({ post, onExplore }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 my-4 text-left shadow-xs">
      <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-3 mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#1F242C] text-white">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              STATUTORY EVOLUTION
            </span>
            <h4 className="text-base font-serif font-bold text-[#111827]">
              {post.title}
            </h4>
          </div>
        </div>

        <span className="text-xs text-[#6B7280] font-mono">{post.category}</span>
      </div>

      <div className="space-y-3 relative">
        {/* 1. OLD LAW */}
        <div className="bg-[#FAF9F5] p-3.5 rounded-lg border border-[#EAE8E0]">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            <span>1. OLD LAW / PREVIOUS STATUTE</span>
            <span className="px-1.5 py-0.2 rounded bg-stone-200 text-stone-700">Past Practice</span>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            {post.oldLaw || 'Earlier procedural regime required extensive physical paperwork and jurisdictional hurdles.'}
          </p>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center -my-1 text-[#9CA3AF]">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* 2. WHAT CHANGED */}
        <div className="bg-amber-50/60 p-3.5 rounded-lg border border-amber-200">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-900 mb-1">
            <span>2. WHAT CHANGED</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900">Legislative Amendment</span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed">
            {post.whatChanged || post.shortHook}
          </p>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center -my-1 text-[#9CA3AF]">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* 3. NEW LAW */}
        <div className="bg-emerald-50/50 p-3.5 rounded-lg border border-emerald-200">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-900 mb-1">
            <span>3. NEW LAW / CURRENT LEGAL STANDARD</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900">Active Norm</span>
          </div>
          <p className="text-xs text-emerald-950 font-medium leading-relaxed">
            {post.newLaw || 'Modern statutory provisions mandate transparency, time limits, and digital redressal.'}
          </p>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center -my-1 text-[#9CA3AF]">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* 4. WHY IT MATTERS */}
        <div className="bg-[#1F242C] text-white p-3.5 rounded-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-300 block mb-1">
            4. WHY IT MATTERS TO CITIZENS
          </span>
          <p className="text-xs text-stone-100 leading-relaxed">
            {post.whyItMatters || 'Empowers citizens to demand statutory rights and accountability without multi-year legal paralysis.'}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs text-[#6B7280]">
        <span className="font-mono text-[11px]">Ref: {post.source}</span>
        {onExplore && (
          <button
            onClick={() => onExplore(post.title)}
            className="font-semibold text-[#1F242C] hover:underline"
          >
            Explore Related Rights →
          </button>
        )}
      </div>
    </div>
  );
};
