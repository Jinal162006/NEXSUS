import React, { useState } from 'react';
import { Bookmark, Share2, ArrowRight, Clock, Scale, BookOpen, Check } from 'lucide-react';
import { FeedPost } from '../../types/legal';

interface FeedCardProps {
  post: FeedPost;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  onExploreInGuidance?: (query: string) => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({
  post,
  isSaved = false,
  onToggleSave,
  onExploreInGuidance,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getThemeBg = (theme: FeedPost['visualTheme']) => {
    switch (theme) {
      case 'cyber':
        return 'border-l-4 border-l-stone-700';
      case 'employment':
        return 'border-l-4 border-l-slate-700';
      case 'consumer':
        return 'border-l-4 border-l-amber-700';
      case 'property':
        return 'border-l-4 border-l-emerald-800';
      default:
        return 'border-l-4 border-l-[#1F242C]';
    }
  };

  return (
    <article
      className={`bg-white rounded-xl border border-[#E3E1D9] p-5 text-left transition-all hover:border-[#CBD5E1] shadow-xs ${getThemeBg(
        post.visualTheme
      )}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C]">
            {post.type}
          </span>
          <span className="text-xs text-[#6B7280] font-medium">• {post.category}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
          <Clock className="w-3.5 h-3.5" />
          <span>{post.readTime}</span>
        </div>
      </div>

      <h3 className="text-base sm:text-lg font-serif font-bold text-[#111827] leading-snug">
        {post.title}
      </h3>

      <p className="text-xs sm:text-sm text-[#4B5563] mt-2 leading-relaxed">
        {post.shortHook}
      </p>

      {/* 1 - 3 Key Points */}
      <div className="mt-3.5 bg-[#FAF9F5] rounded-lg p-3 border border-[#EAE8E0]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1.5">
          Key Takeaways:
        </span>
        <ul className="space-y-1.5 pl-4 list-disc text-xs text-[#374151]">
          {post.keyPoints.map((point, i) => (
            <li key={i} className="leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Old Law vs New Law snippet if present */}
      {post.oldLaw && post.newLaw && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded bg-stone-50 border border-stone-200">
            <span className="font-semibold text-stone-700 block text-[10px] uppercase">
              Old Law / Earlier Rule:
            </span>
            <p className="text-[#4B5563] mt-0.5">{post.oldLaw}</p>
          </div>
          <div className="p-2.5 rounded bg-emerald-50/60 border border-emerald-200">
            <span className="font-semibold text-emerald-900 block text-[10px] uppercase">
              New Law / Current Position:
            </span>
            <p className="text-emerald-950 mt-0.5">{post.newLaw}</p>
          </div>
        </div>
      )}

      {/* Footer controls: Source, Learn More, Save, Share */}
      <div className="mt-4 pt-3 border-t border-[#F3F4F6] flex items-center justify-between gap-2 flex-wrap text-xs">
        <span className="text-[11px] text-[#6B7280] font-mono truncate max-w-[50%]">
          Source: {post.source}
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {onExploreInGuidance && (
            <button
              onClick={() => onExploreInGuidance(post.title)}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#FAF9F5] border border-[#D5D3CB] text-[#1F242C] hover:bg-[#F0EFEB] transition-colors flex items-center gap-1"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {onToggleSave && (
            <button
              onClick={() => onToggleSave(post.id)}
              className={`p-1.5 rounded-md border transition-colors ${
                isSaved
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white border-[#D1D5DB] text-[#6B7280] hover:text-[#111827]'
              }`}
              title="Save post"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600' : ''}`} />
            </button>
          )}

          <button
            onClick={handleShare}
            className="p-1.5 rounded-md border border-[#D1D5DB] bg-white text-[#6B7280] hover:text-[#111827] transition-colors"
            title="Share post"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </article>
  );
};
