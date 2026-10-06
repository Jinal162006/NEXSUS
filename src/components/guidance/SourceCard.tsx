import React from 'react';
import { BookOpen, ShieldAlert, AlertTriangle } from 'lucide-react';

interface SourceCardProps {
  sources: string[];
  disclaimer: string;
}

export const SourceCard: React.FC<SourceCardProps> = ({ sources, disclaimer }) => {
  return (
    <div className="space-y-3 my-3 text-left">
      {/* Sources & Citations */}
      {sources && sources.length > 0 && (
        <div className="bg-[#FAF9F5] rounded-xl border border-[#E3E1D9] p-4">
          <div className="flex items-center gap-2 mb-2 text-[#4B5563]">
            <BookOpen className="w-3.5 h-3.5 text-[#1F242C]" />
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#1F242C]">
              Statutory References & Sources
            </h5>
          </div>
          <ul className="space-y-1 pl-4 list-disc text-xs text-[#4B5563]">
            {sources.map((src, i) => (
              <li key={i} className="font-mono text-[11px]">
                {src}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Legal Information Disclaimer */}
      <div className="bg-[#F8F9FA] rounded-xl border border-[#D5D9DE] p-4 text-xs text-[#4A5568] flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-[#2C3E50] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-[#1A202C] block mb-0.5 uppercase text-[10px] tracking-wider">
            Legal Information Notice
          </span>
          <p className="leading-relaxed text-[11px]">{disclaimer}</p>
        </div>
      </div>
    </div>
  );
};
