import React from 'react';
import { BookMarked, HelpCircle, Lightbulb } from 'lucide-react';

interface SectionExplainerProps {
  explainer: {
    provision: string;
    simpleMeaning: string;
    whenApplies: string;
    example: string;
    relatedLegalArea: string;
    sourceReference: string;
  };
}

export const SectionExplainerCard: React.FC<SectionExplainerProps> = ({ explainer }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 my-3 text-left shadow-xs">
      <div className="flex items-center gap-2 border-b border-[#EAE8E0] pb-3 mb-3">
        <div className="p-1.5 rounded-md bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C]">
          <BookMarked className="w-4 h-4 text-[#2C3E50]" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
            STATUTORY EXPLAINER ({explainer.relatedLegalArea})
          </span>
          <h4 className="text-sm font-bold text-[#111827] mt-0.5 leading-snug">
            {explainer.provision}
          </h4>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#EAE8E0]">
          <span className="font-semibold text-[#111827] block mb-1">Simple Meaning:</span>
          <p className="text-[#374151] leading-relaxed">{explainer.simpleMeaning}</p>
        </div>

        <div>
          <span className="font-semibold text-[#111827] block mb-0.5">When it generally applies:</span>
          <p className="text-[#4B5563] leading-relaxed">{explainer.whenApplies}</p>
        </div>

        <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200/80 text-amber-950">
          <div className="flex items-center gap-1.5 font-semibold mb-1 text-amber-900 text-[11px] uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
            <span>Practical Example:</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-900">{explainer.example}</p>
        </div>

        <div className="pt-2 border-t border-[#F3F4F6] text-[11px] text-[#6B7280] font-mono">
          Statutory Source: {explainer.sourceReference}
        </div>
      </div>
    </div>
  );
};
