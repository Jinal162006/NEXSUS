import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { DocumentItem } from '../../types/legal';
import { getChecklistState, saveChecklistState } from '../../utils/storage';

interface DocumentChecklistProps {
  documents: DocumentItem[];
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ documents }) => {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCheckedMap(getChecklistState());
  }, []);

  const toggleCheck = (id: string) => {
    const updated = { ...checkedMap, [id]: !checkedMap[id] };
    setCheckedMap(updated);
    saveChecklistState(updated);
  };

  const completedCount = documents.filter((d) => checkedMap[d.id]).length;

  return (
    <div className="bg-white rounded-xl border border-[#E3E1D9] p-5 my-3 text-left shadow-xs">
      <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C]">
            <FileText className="w-4 h-4 text-[#2C3E50]" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
              EVIDENCE & DOCUMENTS CHECKLIST
            </h4>
            <span className="text-[11px] text-[#6B7280]">
              Keep copies ready before filing or sending formal communications
            </span>
          </div>
        </div>

        <div className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#F4F3EE] text-[#374151] border border-[#E3E1D9]">
          {completedCount}/{documents.length} Ready
        </div>
      </div>

      <div className="space-y-2.5">
        {documents.map((doc) => {
          const isDone = Boolean(checkedMap[doc.id]);
          return (
            <div
              key={doc.id}
              onClick={() => toggleCheck(doc.id)}
              className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 select-none ${
                isDone
                  ? 'bg-[#F9FAF8] border-emerald-200'
                  : 'bg-white border-[#E5E7EB] hover:border-[#CBD5E1]'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-[#4B5563] focus:outline-none shrink-0"
              >
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-700" />
                ) : (
                  <Square className="w-4 h-4 text-[#9CA3AF]" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-bold leading-snug ${
                      isDone ? 'line-through text-[#6B7280]' : 'text-[#111827]'
                    }`}
                  >
                    {doc.name}
                  </span>
                  {doc.required && (
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                      Required
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#4B5563] mt-1 leading-normal">
                  {doc.purpose}
                </p>

                {doc.exampleOrTip && (
                  <div className="text-[11px] text-[#556987] italic mt-1 bg-[#FAF9F5] px-2 py-1 rounded border border-[#EAE8E0]/70">
                    💡 Tip: {doc.exampleOrTip}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
