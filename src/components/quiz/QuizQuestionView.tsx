import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, BookOpen, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../../types/legal';

interface QuizQuestionViewProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSubmitted: (isCorrect: boolean, selectedIndex: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export const QuizQuestionView: React.FC<QuizQuestionViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSubmitted,
  onNextQuestion,
  isLastQuestion,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedIndex === null || isSubmitted) return;
    setIsSubmitted(true);
    const isCorrect = selectedIndex === question.correctIndex;
    onAnswerSubmitted(isCorrect, selectedIndex);
  };

  const handleNext = () => {
    setSelectedIndex(null);
    setIsSubmitted(false);
    onNextQuestion();
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-2xl border border-[#E3E1D9] p-5 sm:p-7 text-left shadow-xs max-w-2xl mx-auto">
      {/* Progress & Category Header */}
      <div className="flex items-center justify-between border-b border-[#EAE8E0] pb-3.5 mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF9F5] border border-[#E3E1D9] text-[#1F242C]">
            {question.category}
          </span>
          <span className="text-xs text-[#6B7280]">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        <div className="w-28 bg-[#F4F3EE] h-2 rounded-full overflow-hidden border border-[#E3E1D9]">
          <div
            className="bg-[#1F242C] h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-serif font-bold text-[#111827] leading-relaxed">
        {question.question}
      </h3>

      {/* 4 Options */}
      <div className="space-y-2.5 my-5">
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === question.correctIndex;

          let optionStyle =
            'bg-white border-[#E5E7EB] hover:border-[#1F242C] text-[#374151]';

          if (isSubmitted) {
            if (isCorrect) {
              optionStyle =
                'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500/30';
            } else if (isSelected && !isCorrect) {
              optionStyle =
                'bg-rose-50 border-rose-500 text-rose-950 ring-1 ring-rose-500/30';
            } else {
              optionStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
            }
          } else if (isSelected) {
            optionStyle =
              'bg-[#FAF9F5] border-[#1F242C] ring-1 ring-[#1F242C] text-[#111827] font-semibold';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isSubmitted}
              onClick={() => setSelectedIndex(idx)}
              className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${optionStyle}`}
            >
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 font-mono ${
                  isSubmitted && isCorrect
                    ? 'bg-emerald-600 text-white'
                    : isSubmitted && isSelected && !isCorrect
                    ? 'bg-rose-600 text-white'
                    : isSelected
                    ? 'bg-[#1F242C] text-white'
                    : 'bg-[#F4F3EE] text-[#4B5563]'
                }`}
              >
                {optionLetters[idx]}
              </span>

              <span className="text-xs sm:text-sm leading-relaxed flex-1 mt-0.5">
                {option}
              </span>

              {isSubmitted && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation & Source Section when submitted */}
      {isSubmitted && (
        <div className="bg-[#FAF9F5] rounded-xl border border-[#E3E1D9] p-4 text-xs space-y-2 mb-5 animate-fadeIn">
          <div className="flex items-center gap-1.5 font-bold text-[#1F242C] uppercase tracking-wider text-[10px]">
            <BookOpen className="w-3.5 h-3.5 text-[#2C3E50]" />
            <span>Legal Explanation:</span>
          </div>
          <p className="text-[#374151] leading-relaxed">{question.explanation}</p>
          <div className="pt-2 border-t border-[#EAE8E0] text-[11px] text-[#6B7280] font-mono">
            Source: {question.source}
          </div>
        </div>
      )}

      {/* Action Footer Button */}
      <div className="pt-2 flex justify-end">
        {!isSubmitted ? (
          <button
            type="button"
            disabled={selectedIndex === null}
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedIndex !== null
                ? 'bg-[#1F242C] text-white hover:bg-black shadow-xs'
                : 'bg-[#EAE8E0] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#1F242C] text-white hover:bg-black transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
