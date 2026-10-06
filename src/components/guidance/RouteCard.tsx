import React from 'react';
import { Clock, Banknote, CheckCircle, ShieldCheck } from 'lucide-react';
import { RouteOption } from '../../types/legal';

interface RouteCardProps {
  route: RouteOption;
  index: number;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, index }) => {
  const getBadgeTypeStyle = (type: RouteOption['type']) => {
    switch (type) {
      case 'Informal / Direct':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Regulatory / Grievance':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Mediation / Conciliation':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Formal Legal Action':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      className={`rounded-xl border p-4 text-left relative transition-all ${
        route.recommendedFirst
          ? 'bg-[#FAF9F5] border-[#1F242C] shadow-xs ring-1 ring-[#1F242C]/10'
          : 'bg-white border-[#E3E1D9] hover:border-[#CBD5E1]'
      }`}
    >
      {route.recommendedFirst && (
        <div className="absolute -top-2.5 right-4 bg-[#1F242C] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          Recommended First Step
        </div>
      )}

      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-xs font-bold font-mono text-[#6B7280]">
          Route {String.fromCharCode(65 + index)}
        </span>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getBadgeTypeStyle(
            route.type
          )}`}
        >
          {route.type}
        </span>
      </div>

      <h4 className="text-sm font-bold text-[#111827] leading-snug">{route.title}</h4>

      <p className="text-xs text-[#374151] mt-2 leading-relaxed">{route.description}</p>

      {/* Meta indicators */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#EAE8E0] text-[11px]">
        <div className="flex items-center gap-1.5 text-[#4B5563]">
          <Clock className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
          <span className="truncate">Est: {route.timeframe}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#4B5563]">
          <Banknote className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
          <span className="truncate">Cost: {route.costIndicator}</span>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-[#4B5563] bg-[#F4F3EE] px-2.5 py-1.5 rounded border border-[#E3E1D9]/60">
        <span className="font-semibold text-[#1F2937]">When suitable: </span>
        {route.suitability}
      </div>
    </div>
  );
};
