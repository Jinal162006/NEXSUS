import React from 'react';
import { Award, Flame, CheckCircle, ArrowRight, RotateCcw, Scale } from 'lucide-react';
import { QuizQuestion } from '../../types/legal';

interface QuizResultViewProps {
  score: number;
  total: number;
  streak: number;
  wrongCategories: string[];
  onReviewAnswers: () => void;
  onExploreRights: () => void;
  onRetakeQuiz: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  score,
  total,
  streak,
  wrongCategories,
  onReviewAnswers,
  onExploreRights,
  onRetakeQuiz,
}) => {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-[#E3E1D9] p-6 sm:p-8 text-center max-w-xl mx-auto shadow-xs">
      <div className="w-12 h-12 rounded-xl bg-[#1F242C] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
        <Award className="w-6 h-6 text-amber-400" />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
        Daily Challenge Completed
      </span>

      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111827] mt-1">
        TODAY'S LEGAL CHALLENGE COMPLETE
      </h2>

      <p className="text-xs text-[#4B5563] mt-2">
        You've sharpened your legal literacy and rights awareness for today.
      </p>

      {/* Primary Score Grid */}
      <div className="grid grid-cols-3 gap-3 my-6 text-left">
        <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE8E0]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
            Score
          </span>
          <div className="text-lg sm:text-xl font-bold font-serif text-[#111827] mt-0.5">
            {score} / {total}
          </div>
        </div>

        <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE8E0]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
            Accuracy
          </span>
          <div className="text-lg sm:text-xl font-bold font-serif text-[#111827] mt-0.5">
            {percentage}%
          </div>
        </div>

        <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-[#EAE8E0]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
            Streak
          </span>
          <div className="text-lg sm:text-xl font-bold font-serif text-amber-700 flex items-center gap-1 mt-0.5">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
            <span>{streak} Days</span>
          </div>
        </div>
      </div>

      {/* Topics to Review */}
      {wrongCategories.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-1">
            Topics to Review Based on Your Answers:
          </span>
          <div className="flex items-center gap-2 flex-wrap mt-1.5">
            {wrongCategories.map((cat, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={onExploreRights}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#1F242C] text-white hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          <Scale className="w-4 h-4" />
          <span>Explore Related Rights</span>
        </button>

        <button
          type="button"
          onClick={onReviewAnswers}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold bg-white border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB] transition-colors"
        >
          Review Questions
        </button>

        <button
          type="button"
          onClick={onRetakeQuiz}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold text-[#6B7280] hover:text-[#111827] flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retake</span>
        </button>
      </div>
    </div>
  );
};
