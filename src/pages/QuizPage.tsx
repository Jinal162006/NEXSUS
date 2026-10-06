import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  Scale,
  Award,
} from 'lucide-react';
import { QuizQuestion, UserPreferences } from '../types/legal';
import { QuizQuestionView } from '../components/quiz/QuizQuestionView';
import { QuizResultView } from '../components/quiz/QuizResultView';
import { database } from '../services/database';

interface QuizPageProps {
  onExploreRights?: (category?: string) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onExploreRights }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: string; selectedIndex: number; isCorrect: boolean }[]
  >([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userPrefs, setUserPrefs] = useState<UserPreferences>(database.getPreferences());

  useEffect(() => {
    fetchDailyQuiz();
  }, [userPrefs.interests]);

  const fetchDailyQuiz = async () => {
    setLoading(true);
    try {
      const interestsParam = userPrefs.interests.join(',');
      const res = await fetch(`/api/quiz/today?interests=${encodeURIComponent(interestsParam)}`);
      const data = await res.json();
      setQuestions(data.questions || []);
      setCurrentIndex(0);
      setAnswers([]);
      setQuizComplete(false);
    } catch (err) {
      console.error('Failed to load quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmitted = (isCorrect: boolean, selectedIndex: number) => {
    const q = questions[currentIndex];
    setAnswers((prev) => [
      ...prev,
      { questionId: q.id, selectedIndex, isCorrect },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = () => {
    setQuizComplete(true);
    const correctCount = answers.filter((a) => a.isCorrect).length;
    database.recordQuizScore(correctCount, questions.length, questions[0]?.category || 'General');
    setUserPrefs(database.getPreferences());
  };

  const handleExplore = (category?: string) => {
    if (onExploreRights) {
      onExploreRights(category);
    } else {
      navigate('/rights');
    }
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;

  return (
    <div className="max-w-4xl mx-auto py-2 text-left">
      {/* Header */}
      <div className="border-b border-[#E7E5DF] pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
              DAILY LEGAL CHALLENGE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111827] mt-1">
            Today's Legal Quiz
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
            Test your legal awareness in two minutes with practical scenario questions.
          </p>
        </div>

        {/* Learning Streak Pill */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E3E1D9] text-[#78350F] text-xs font-semibold self-start sm:self-auto shadow-2xs">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
          <div>
            <span className="block leading-none text-[#111827] font-bold">
              {userPrefs.quizStreak} Day Streak
            </span>
            <span className="text-[10px] text-[#92400E] font-normal">Active learner</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-16 text-center text-xs text-[#9CA3AF]">
          Loading today's challenge questions...
        </div>
      ) : quizComplete ? (
        <QuizResultView
          score={correctCount}
          total={questions.length}
          streak={userPrefs.quizStreak}
          wrongCategories={Array.from(new Set(questions.filter((q) => !answers.find((a) => a.questionId === q.id && a.isCorrect)).map((q) => q.category)))}
          onReviewAnswers={() => {}}
          onRetakeQuiz={fetchDailyQuiz}
          onExploreRights={() => handleExplore()}
        />
      ) : questions.length > 0 ? (
        <QuizQuestionView
          question={questions[currentIndex]}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          onAnswerSubmitted={handleAnswerSubmitted}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentIndex === questions.length - 1}
        />
      ) : (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E3E1D9] text-xs text-[#6B7280]">
          No quiz questions available today.
        </div>
      )}
    </div>
  );
};

export default QuizPage;
