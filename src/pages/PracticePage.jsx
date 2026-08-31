import React, { useState } from "react";
import { useCourse } from "@/context/CourseContext";
import { PRACTICE_EXERCISES } from "@/data/practiceData";
import { CodeEditor } from "@/components/editor/CodeEditor";
import {
  Code2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Check,
  Award,
  Layers,
  ChevronRight,
  Eye
} from "lucide-react";

export function PracticePage() {
  const { practiceCompleted, markPracticeComplete, setActivePage, navigateToLesson } = useCourse();
  const [selectedExerciseId, setSelectedExerciseId] = useState(PRACTICE_EXERCISES[0].id);
  const [currentCode, setCurrentCode] = useState(PRACTICE_EXERCISES[0].starterCode);
  const [validationResult, setValidationResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const activeExercise =
    PRACTICE_EXERCISES.find((ex) => ex.id === selectedExerciseId) || PRACTICE_EXERCISES[0];

  const handleSelectExercise = (ex) => {
    setSelectedExerciseId(ex.id);
    setCurrentCode(ex.starterCode);
    setValidationResult(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const handleCheckAnswer = () => {
    const logs = [];
    const customConsole = {
      log: (...args) => {
        logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
      },
      warn: (...args) => logs.push(args.join(" ")),
      error: (...args) => logs.push(args.join(" ")),
      info: (...args) => logs.push(args.join(" ")),
    };

    try {
      const runFn = new Function("console", `"use strict";\n${currentCode}`);
      runFn(customConsole);

      if (activeExercise.validator) {
        const result = activeExercise.validator(currentCode, logs);
        setValidationResult(result);
        if (result.success) {
          markPracticeComplete(activeExercise.id);
        }
      } else {
        setValidationResult({
          success: true,
          message: "Correct! Great job completing this practice drill.",
        });
        markPracticeComplete(activeExercise.id);
      }
    } catch (err) {
      setValidationResult({
        success: false,
        message: `JavaScript Error: ${err.message}. Fix the error and try again.`,
      });
    }
  };

  const completedCount = Object.keys(practiceCompleted).length;
  const isCurrentDone = !!practiceCompleted[activeExercise.id];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-transparent border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Interactive Code Laboratory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            JavaScript Practice Exercises
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Solve hands-on coding drills. Write code, test it with automated validation, and master fundamentals.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Drills Solved</span>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {completedCount} / {PRACTICE_EXERCISES.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Practice Workspace: Left Exercise List + Right Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Exercise Selector (Left) */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Practice Drills (8 Exercises)
          </h3>
          <div className="space-y-1.5">
            {PRACTICE_EXERCISES.map((ex, index) => {
              const isSelected = ex.id === selectedExerciseId;
              const isDone = !!practiceCompleted[ex.id];
              return (
                <button
                  key={ex.id}
                  onClick={() => handleSelectExercise(ex)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm"
                      : isDone
                      ? "bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30 text-slate-800 dark:text-slate-200"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    {isDone ? (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? "text-slate-950" : "text-emerald-500"
                        }`}
                      />
                    ) : (
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                          isSelected
                            ? "bg-slate-950 text-amber-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                    <div className="truncate">
                      <div className="text-xs truncate">{ex.title}</div>
                      <div
                        className={`text-[10px] ${
                          isSelected ? "text-slate-800" : "text-slate-400"
                        }`}
                      >
                        {ex.topic} • {ex.difficulty}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? "text-slate-950" : "text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Exercise Coding Studio (Right) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Exercise Instructions Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  {activeExercise.topic}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Difficulty: {activeExercise.difficulty}
                </span>
              </div>

              {isCurrentDone && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Solved
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeExercise.title}
            </h2>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {activeExercise.instruction}
            </p>

            {/* Hint & Solution Toggles */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? "Hide Hint" : "Get Hint"}</span>
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showSolution ? "Hide Solution" : "Reveal Solution"}</span>
              </button>
            </div>

            {showHint && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200">
                💡 <strong>Hint:</strong> {activeExercise.hint}
              </div>
            )}

            {showSolution && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Reference Solution
                </div>
                <pre className="whitespace-pre-wrap">{activeExercise.solution}</pre>
              </div>
            )}
          </div>

          {/* Live Code Editor */}
          <div className="space-y-4">
            <CodeEditor
              initialCode={activeExercise.starterCode}
              onCodeChange={(code) => setCurrentCode(code)}
              title={`Exercise: ${activeExercise.title}`}
              showReset={true}
              showClear={true}
              runLabel="Run Code"
            />

            {/* Validation Actions & Feedback */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <button
                onClick={handleCheckAnswer}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-900/20 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Check Answer & Verify</span>
              </button>

              {validationResult && (
                <div
                  className={`flex items-center gap-2 text-xs font-semibold p-2.5 rounded-lg border ${
                    validationResult.success
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {validationResult.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  )}
                  <span>{validationResult.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
