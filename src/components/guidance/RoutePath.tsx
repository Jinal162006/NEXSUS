import React from 'react';
import { ArrowDown, CheckCircle2, ChevronRight, Compass, FileText, Landmark, MapPin } from 'lucide-react';

interface RoutePathProps {
  situation: string;
  legalArea: string;
  recommendedRoute: string;
  authorityForum: string;
  primaryDocuments: string[];
  immediateNextStep: string;
}

export const RoutePath: React.FC<RoutePathProps> = ({
  situation,
  legalArea,
  recommendedRoute,
  authorityForum,
  primaryDocuments,
  immediateNextStep,
}) => {
  const steps = [
    {
      step: 1,
      label: 'YOUR SITUATION',
      title: situation,
      tag: 'Reported Issue',
      color: 'border-stone-400 bg-stone-50',
    },
    {
      step: 2,
      label: 'LEGAL AREA',
      title: legalArea,
      tag: 'Statutory Subject',
      color: 'border-slate-500 bg-slate-50',
    },
    {
      step: 3,
      label: 'POSSIBLE ROUTE',
      title: recommendedRoute,
      tag: 'Recommended Course',
      color: 'border-zinc-600 bg-zinc-50',
    },
    {
      step: 4,
      label: 'AUTHORITY / FORUM',
      title: authorityForum,
      tag: 'Where to Seek Help',
      color: 'border-stone-700 bg-stone-50',
    },
    {
      step: 5,
      label: 'DOCUMENTS & EVIDENCE',
      title: primaryDocuments.slice(0, 3).join(' • '),
      tag: 'Prerequisite Proofs',
      color: 'border-neutral-600 bg-neutral-50',
    },
    {
      step: 6,
      label: 'IMMEDIATE NEXT STEP',
      title: immediateNextStep,
      tag: 'Priority Action',
      color: 'border-[#1F242C] bg-[#FAF9F5]',
    },
  ];

  return (
    <div className="bg-[#FAF9F5] rounded-xl border border-[#E3E1D9] p-5 my-4">
      <div className="flex items-center justify-between mb-4 border-b border-[#EAE8E0] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#1F242C] text-white flex items-center justify-center text-xs font-serif font-bold">
            §
          </div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
            Recommended Legal Journey Path
          </h4>
        </div>
        <span className="text-[11px] text-[#6B7280] font-medium hidden sm:inline">
          Step-by-step navigation map
        </span>
      </div>

      <div className="space-y-2 relative">
        {steps.map((st, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div key={st.step} className="relative flex items-start gap-3">
              {/* Connector line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full border text-[11px] font-semibold flex items-center justify-center shrink-0 ${
                    isLast
                      ? 'bg-[#1F242C] text-white border-[#1F242C]'
                      : 'bg-white text-[#374151] border-[#D1D5DB]'
                  }`}
                >
                  {st.step}
                </div>
                {!isLast && <div className="w-0.5 h-7 bg-[#D1D5DB] my-1" />}
              </div>

              {/* Step Content */}
              <div className={`flex-1 rounded-lg border p-2.5 text-left mb-1 ${st.color}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#4B5563]">
                    {st.label}
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/80 border border-[#E5E7EB] text-[#4B5563] font-medium">
                    {st.tag}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#111827] mt-1 leading-snug">
                  {st.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
