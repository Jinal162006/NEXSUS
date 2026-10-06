import React, { useState } from 'react';
import { Bookmark, ChevronDown, ChevronUp, Scale, Check, Info } from 'lucide-react';
import { RightItem } from '../../types/legal';

interface RightsCardProps {
  right: RightItem;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export const RightsCard: React.FC<RightsCardProps> = ({ right, isSaved = false, onToggleSave }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-[#E3E1D9] p-4 text-left transition-all hover:border-[#CBD5E1] shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-md bg-[#F4F3EE] text-[#1E232A] mt-0.5 shrink-0">
            <Scale className="w-4 h-4 text-[#2C3E50]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                {right.category}
              </span>
              <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                May apply depending on facts
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#111827] mt-1 leading-snug">
              {right.title}
            </h4>
          </div>
        </div>

        {onToggleSave && (
          <button
            onClick={() => onToggleSave(right.id)}
            title={isSaved ? 'Remove from saved rights' : 'Save to profile'}
            className={`p-1.5 rounded-md transition-colors ${
              isSaved
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F3F4F6]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600' : ''}`} />
          </button>
        )}
      </div>

      {/* Simple Meaning */}
      <div className="mt-3 text-xs text-[#374151] leading-relaxed bg-[#FAF9F5] p-3 rounded-md border border-[#EAE8E0]">
        <span className="font-semibold text-[#111827]">Simple Meaning: </span>
        {right.simpleMeaning}
      </div>

      {/* When this may apply */}
      <div className="mt-2.5 text-xs text-[#4B5563]">
        <span className="font-semibold text-[#1F2937]">When this may apply: </span>
        <span className="italic">{right.whenApplies}</span>
      </div>

      {/* Reference & Expandable details */}
      <div className="mt-3 pt-2.5 border-t border-[#F3F4F6] flex items-center justify-between">
        <div className="text-[11px] text-[#6B7280] font-mono truncate max-w-[70%]">
          Ref: {right.reference}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-[#2C3E50] hover:text-black flex items-center gap-1 transition-colors"
        >
          <span>{expanded ? 'Less' : 'Learn More'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-dashed border-[#E5E7EB] space-y-2 text-xs">
          {right.keyPoints && right.keyPoints.length > 0 && (
            <div>
              <span className="font-semibold text-[#111827] block mb-1">Key Principles:</span>
              <ul className="space-y-1 pl-4 list-disc text-[#4B5563]">
                {right.keyPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          )}

          {right.actionTips && right.actionTips.length > 0 && (
            <div className="bg-slate-50 p-2.5 rounded border border-slate-200 mt-2">
              <span className="font-semibold text-slate-900 block mb-1 text-[11px] uppercase tracking-wider">
                Action Tips:
              </span>
              <ul className="space-y-1 pl-4 list-disc text-slate-700">
                {right.actionTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
