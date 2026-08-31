import React, { useState } from "react";
import { useCourse } from "@/context/CourseContext";
import { QUIZ_QUESTIONS } from "@/data/quizData";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Award,
  Sparkles,
  ArrowRight,
  BookOpen,
  Check,
  GraduationCap
} from "lucide-react";

export function QuizPage() {
  const { quizResults, saveQuizResult, setActivePage, navigateToLesson } = useCourse();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score += 1;
      }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    const resultObj = {
      score,
      total: totalQuestions,
      percentage,
      answers: selectedAnswers,
      date: new Date().toLocaleDateString(),
    };

    saveQuizResult(resultObj);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Score stats if submitted
  const score = Object.keys(selectedAnswers).reduce((acc, idx) => {
    const qIndex = parseInt(idx, 10);
    return selectedAnswers[qIndex] === QUIZ_QUESTIONS[qIndex].correctAnswer ? acc + 1 : acc;
  }, 0);
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= 70;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Quiz Header Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Official Knowledge Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            JavaScript Basic Course Quiz
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Comprehensive 12-question quiz testing all 8 modules of the curriculum.
          </p>
        </div>

        {quizResults && !isSubmitted && (
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right shrink-0">
            <div className="text-[10px] uppercase font-bold text-slate-400">Best Score</div>
            <div className="text-lg font-bold text-amber-500 font-mono">
              {quizResults.percentage}% ({quizResults.score}/{quizResults.total})
            </div>
          </div>
        )}
      </div>

      {/* If Submitted: Show Results & Detailed Review */}
      {isSubmitted ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Result Card */}
          <div
            className={`p-8 rounded-3xl border text-center space-y-4 ${
              isPassed
                ? "bg-emerald-500/5 border-emerald-500/30"
                : "bg-rose-500/5 border-rose-500/30"
            }`}
          >
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
              {isPassed ? <Award className="w-8 h-8 text-slate-950" /> : <RotateCcw className="w-8 h-8 text-slate-950" />}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {isPassed ? "🎉 Congratulations! You Passed!" : "Keep Practicing!"}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {isPassed
                  ? `You achieved an excellent score of ${percentage}%. You have demonstrated a strong understanding of JavaScript fundamentals!`
                  : `You scored ${percentage}%. A minimum score of 70% is required to pass. Review your incorrect answers below and retry!`}
              </p>
            </div>

            {/* Score Metrics */}
            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="text-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {score} / {totalQuestions}
                </span>
                <p className="text-xs text-slate-400 uppercase font-semibold">Correct Answers</p>
              </div>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />
              <div className="text-center">
                <span className="text-3xl font-black text-amber-500 font-mono">
                  {percentage}%
                </span>
                <p className="text-xs text-slate-400 uppercase font-semibold">Final Grade</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={handleRestartQuiz}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>

              <button
                onClick={() => setActivePage("lessons")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Review Lessons</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Question-by-Question Review
            </h3>

            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? "bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-500/30"
                        : "bg-rose-500/5 dark:bg-rose-950/10 border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          {q.topic}
                        </span>
                      </div>
                      <span
                        className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          isCorrect
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                            : "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                        }`}
                      >
                        {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{isCorrect ? "Correct" : "Incorrect"}</span>
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userAns === optIdx;
                        const isActualCorrect = optIdx === q.correctAnswer;

                        let style = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400";
                        if (isActualCorrect) {
                          style = "bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                        } else if (isChosen && !isCorrect) {
                          style = "bg-rose-500/10 border-rose-500 text-rose-800 dark:text-rose-300 line-through";
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}
                          >
                            <span>
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </span>
                            {isActualCorrect && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300">
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Active In-Progress Runner */
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
              <span className="text-amber-600 dark:text-amber-400 font-mono">
                {answeredCount} Answered ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Topic & Prompt */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {currentQ.topic}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Multiple Choice Answers */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-bold shadow-sm"
                      : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                        isSelected
                          ? "bg-amber-500 text-slate-950"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 disabled:opacity-40 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={answeredCount < totalQuestions}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Award className="w-4 h-4" />
                <span>Submit Final Quiz</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
