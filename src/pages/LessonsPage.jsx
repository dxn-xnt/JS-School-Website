import React, { useState, useEffect } from "react";
import { useCourse } from "@/context/CourseContext";
import { LESSON_MODULES, ALL_LESSONS } from "@/data/lessonsData";
import { CodeEditor } from "@/components/editor/CodeEditor";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  XCircle,
  Check,
  Code2,
  Terminal,
  Share2,
  BookmarkCheck,
  HelpCircle,
  List,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Copy
} from "lucide-react";

export function LessonsPage() {
  const {
    activeLessonId,
    setActiveLessonId,
    completedLessons,
    toggleLessonComplete,
    markLessonComplete,
    isLessonCompleted,
    courseProgressPercent,
    completedCount,
    totalLessons,
    setActivePage
  } = useCourse();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // In-lesson mini practice question state
  const [selectedPracticeOption, setSelectedPracticeOption] = useState(null);
  const [practiceFeedback, setPracticeFeedback] = useState(null); // 'correct' | 'incorrect'
  const [showHint, setShowHint] = useState(false);

  const currentLesson =
    ALL_LESSONS.find((l) => l.id === activeLessonId) || ALL_LESSONS[1];

  // Find previous and next lessons
  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? ALL_LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < ALL_LESSONS.length - 1 ? ALL_LESSONS[currentIndex + 1] : null;

  // Reset in-lesson mini quiz state when lesson changes
  useEffect(() => {
    setSelectedPracticeOption(null);
    setPracticeFeedback(null);
    setShowHint(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeLessonId]);

  const handlePracticeSubmit = () => {
    if (selectedPracticeOption === null) return;
    if (selectedPracticeOption === currentLesson.practiceQuestion.correctIndex) {
      setPracticeFeedback("correct");
      markLessonComplete(currentLesson.id);
    } else {
      setPracticeFeedback("incorrect");
    }
  };

  const copyStaticCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isCurrentCompleted = isLessonCompleted(currentLesson.id);

  const tocItems = [
    { id: "section-objectives", label: "Learning Objectives" },
    { id: "section-explanation", label: "Concept Explanation" },
    { id: "section-syntax", label: "Syntax & Example" },
    { id: "section-breakdown", label: "Code Breakdown" },
    { id: "section-real-world", label: "Real-World Context" },
    currentLesson.namingRules ? { id: "section-naming", label: "Naming Rules" } : null,
    currentLesson.comparisonTable || currentLesson.arrayMethodsTable ? { id: "section-table", label: "Reference Table" } : null,
    { id: "section-mistakes", label: "Common Mistakes" },
    { id: "section-try-it", label: "Try It Yourself" },
    { id: "section-practice", label: "Quick Check Question" },
  ].filter(Boolean);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Mobile Drawer Trigger Bar */}
      <div className="lg:hidden flex items-center justify-between p-3 mb-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Lesson {currentLesson.number}: {currentLesson.title}
          </span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
        >
          <List className="w-3.5 h-3.5" />
          <span>Curriculum Menu</span>
        </button>
      </div>

      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= COLUMN 1: LEFT SIDEBAR (LESSON NAVIGATION) ================= */}
        <aside
          className={`lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto ${
            mobileSidebarOpen ? "block mb-6" : "hidden lg:block"
          }`}
        >
          {/* Course Sidebar Header */}
          <div className="pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Course Syllabus
              </span>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                {courseProgressPercent}% Done
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              JavaScript Basic Course
            </h3>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${courseProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Module-by-Module Navigation List */}
          <div className="space-y-4">
            {LESSON_MODULES.map((module) => (
              <div key={module.id} className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1">
                  {module.title}
                </div>
                <div className="space-y-0.5">
                  {module.lessons.map((lesson) => {
                    const isActive = lesson.id === currentLesson.id;
                    const isDone = completedLessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setActiveLessonId(lesson.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                          isActive
                            ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isDone ? (
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isActive ? "text-slate-950" : "text-emerald-500"
                              }`}
                            />
                          ) : (
                            <Circle
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isActive ? "text-slate-950 opacity-60" : "text-slate-400"
                              }`}
                            />
                          )}
                          <span className="truncate">
                            {lesson.number === 0 ? "Overview" : `${lesson.number}. ${lesson.title}`}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono shrink-0 ml-1 ${
                            isActive ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {lesson.readTime}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer Link to Practice & Quiz */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
            <button
              onClick={() => setActivePage("practice")}
              className="w-full flex items-center justify-between p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-500" />
                Practice Exercises
              </span>
              <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">8</span>
            </button>
            <button
              onClick={() => setActivePage("quiz")}
              className="w-full flex items-center justify-between p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                Course Final Quiz
              </span>
              <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">12 Qs</span>
            </button>
          </div>
        </aside>

        {/* ================= COLUMN 2: CENTER MAIN LESSON CONTENT ================= */}
        <main className="lg:col-span-6 space-y-10">
          {/* Lesson Header */}
          <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  {currentLesson.tag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentLesson.readTime} read
                </span>
              </div>

              {/* Mark as Complete Toggle */}
              <button
                onClick={() => toggleLessonComplete(currentLesson.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  isCurrentCompleted
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20"
                    : "border-slate-300 dark:border-slate-700 hover:border-amber-400 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {isCurrentCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span>Mark as Complete</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {currentLesson.number > 0 ? `Lesson ${currentLesson.number}: ${currentLesson.title}` : currentLesson.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentLesson.description}
            </p>
          </div>

          {/* 1. Learning Objectives */}
          <section id="section-objectives" className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Learning Objectives
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {currentLesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2. Simple Explanation */}
          <section id="section-explanation" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Concept Explanation
            </h2>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
              {currentLesson.explanation}
            </div>
          </section>

          {/* 3. Syntax & Standard Code Example */}
          <section id="section-syntax" className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Syntax & Example
            </h2>

            {/* Syntax Box */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Syntax Pattern
              </div>
              <pre className="whitespace-pre-wrap">{currentLesson.syntax}</pre>
            </div>

            {/* Code Example Box */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-md">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800">
                <span className="text-xs font-mono text-amber-400 font-medium">
                  JavaScript Example
                </span>
                <button
                  onClick={() => copyStaticCode(currentLesson.codeExample)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="p-4 font-mono text-xs leading-5 overflow-x-auto text-emerald-300">
                {currentLesson.codeExample}
              </pre>
            </div>
          </section>

          {/* 4. Code Explanation Breakdown */}
          <section id="section-breakdown" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Code Explanation Breakdown
            </h3>
            <div className="space-y-2">
              {currentLesson.codeExplanation.map((line, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Real-World Context Example */}
          <section id="section-real-world" className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/40 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Real-World School Application
            </h3>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {currentLesson.realWorldExample}
            </div>
          </section>

          {/* Optional: Naming Rules if present */}
          {currentLesson.namingRules && (
            <section id="section-naming" className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                JavaScript Identifier & Naming Rules
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {currentLesson.namingRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Optional: Comparison or Reference Table */}
          {(currentLesson.comparisonTable || currentLesson.arrayMethodsTable) && (
            <section id="section-table" className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Reference Table
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                {currentLesson.comparisonTable && (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-200 font-semibold">
                      <tr>
                        {currentLesson.comparisonTable.headers.map((h, i) => (
                          <th key={i} className="p-3 border-b border-slate-200 dark:border-slate-800">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {currentLesson.comparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {currentLesson.arrayMethodsTable && (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-200 font-semibold">
                      <tr>
                        {currentLesson.arrayMethodsTable.headers.map((h, i) => (
                          <th key={i} className="p-3 border-b border-slate-200 dark:border-slate-800">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {currentLesson.arrayMethodsTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          )}

          {/* Callout Boxes: Common Mistakes & Tips */}
          <section id="section-mistakes" className="space-y-4">
            {/* Common Mistakes */}
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-2">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>❌ Common Mistakes to Avoid</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {currentLesson.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold mt-0.5">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>💡 Pro Tips & Best Practices</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {currentLesson.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 6. Interactive "Try It Yourself" Editor */}
          <section id="section-try-it" className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Try It Yourself
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Modify the code and click "Run Code" to test execution live.
                </p>
              </div>
            </div>

            <CodeEditor
              initialCode={currentLesson.editorCode}
              title={`Sandbox: ${currentLesson.title}`}
              showReset={true}
              showClear={true}
              runLabel="Run Code"
            />
          </section>

          {/* 7. Mini In-Lesson Practice Question */}
          <section id="section-practice" className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                Lesson Quick Check
              </span>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                {showHint ? "Hide Hint" : "Need a Hint?"}
              </button>
            </div>

            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {currentLesson.practiceQuestion.question}
            </p>

            {showHint && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                💡 Hint: {currentLesson.practiceQuestion.hint}
              </div>
            )}

            {/* Options */}
            <div className="space-y-2">
              {currentLesson.practiceQuestion.options.map((opt, optIdx) => {
                const isSelected = selectedPracticeOption === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setSelectedPracticeOption(optIdx);
                      setPracticeFeedback(null);
                    }}
                    className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-semibold"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="font-mono font-bold mr-2 text-slate-400">
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Check Button & Feedback */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={handlePracticeSubmit}
                disabled={selectedPracticeOption === null}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-sm"
              >
                Check Answer
              </button>

              {practiceFeedback === "correct" && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Correct! Great job. Lesson marked as complete!</span>
                </div>
              )}

              {practiceFeedback === "incorrect" && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium animate-in fade-in">
                  <XCircle className="w-4 h-4" />
                  <span>Not quite. Review the explanation or hint and try again!</span>
                </div>
              )}
            </div>
          </section>

          {/* Lesson Navigation Footer: Previous & Next Buttons */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            {prevLesson ? (
              <button
                onClick={() => {
                  setActiveLessonId(prevLesson.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400">Previous Lesson</div>
                  <div>{prevLesson.title}</div>
                </div>
              </button>
            ) : (
              <div></div>
            )}

            {nextLesson ? (
              <button
                onClick={() => {
                  markLessonComplete(currentLesson.id);
                  setActiveLessonId(nextLesson.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <div className="text-right">
                  <div className="text-[10px] text-slate-800">Next Lesson</div>
                  <div>{nextLesson.title}</div>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  markLessonComplete(currentLesson.id);
                  setActivePage("quiz");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Take Final Course Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>

        {/* ================= COLUMN 3: RIGHT SIDEBAR ("ON THIS PAGE" & QUICK SCRATCHPAD) ================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 lg:sticky lg:top-20">
          {/* On This Page Navigation Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              On This Page
            </span>
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left text-xs text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all py-1 px-1 rounded block"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Scratchpad / Practice Mini-Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-transparent to-transparent border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs">
              <Code2 className="w-4 h-4" />
              <span>Practice Exercises</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Test what you learned in this lesson by solving interactive automated coding exercises.
            </p>
            <button
              onClick={() => {
                setActivePage("practice");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full py-2 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Launch Practice Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Current Lesson Badge */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Completed Status</span>
            <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-bold">
              {isCurrentCompleted ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Circle className="w-3.5 h-3.5" /> In Progress
                </span>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
