import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { TimelineStage } from '../../types/legal';

interface TimelineCardProps {
  timeline: TimelineStage[];
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ timeline }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 my-3 text-left shadow-xs">
      <div className="flex items-center gap-2 border-b border-[#EAE8E0] pb-3 mb-4">
        <div className="p-1.5 rounded-md bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C]">
          <Calendar className="w-4 h-4 text-[#2C3E50]" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
            ESTIMATED RESOLUTION TIMELINE
          </h4>
          <span className="text-[11px] text-[#6B7280]">
            Chronological stages from reporting to potential outcome
          </span>
        </div>
      </div>

      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#E5E7EB]">
        {timeline.map((item, idx) => (
          <div key={item.stage || idx} className="relative flex items-start gap-4">
            <div className="w-7 h-7 rounded-full bg-[#1F242C] text-white flex items-center justify-center text-xs font-bold shrink-0 ring-4 ring-white z-10">
              {item.stage || idx + 1}
            </div>

            <div className="flex-1 bg-[#FAF9F5] rounded-lg border border-[#EAE8E0] p-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#111827]">{item.title}</span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white border border-[#D1D5DB] text-[#4B5563] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#6B7280]" />
                  {item.timeframe}
                </span>
              </div>

              <p className="text-xs text-[#4B5563] mt-1.5 leading-relaxed">
                {item.description}
              </p>

              {item.keyAction && (
                <div className="mt-2 text-[11px] font-medium text-[#1E293B] bg-white px-2.5 py-1 rounded border border-[#E2E8F0] flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>Key Action: {item.keyAction}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
