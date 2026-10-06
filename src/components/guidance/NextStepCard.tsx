import React from 'react';
import { CheckCircle2, ArrowRightCircle, BellPlus } from 'lucide-react';

interface NextStepCardProps {
  nextSteps: string[];
  onAddReminder?: (title: string) => void;
}

export const NextStepCard: React.FC<NextStepCardProps> = ({ nextSteps, onAddReminder }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 my-3 text-left shadow-xs">
      <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#1F242C] text-white">
            <ArrowRightCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
              PRIORITIZED NEXT STEPS
            </h4>
            <span className="text-[11px] text-[#6B7280]">
              Immediate actions to protect your interests
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {nextSteps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between gap-3 p-3 rounded-lg bg-[#FAF9F5] border border-[#EAE8E0]"
          >
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#1F242C] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs text-[#1F2937] font-medium leading-relaxed">{step}</p>
            </div>

            {onAddReminder && (
              <button
                onClick={() => onAddReminder(step)}
                title="Create a local reminder for this action"
                className="shrink-0 p-1 text-[#6B7280] hover:text-[#111827] hover:bg-[#EAE8E0] rounded transition-colors"
              >
                <BellPlus className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
