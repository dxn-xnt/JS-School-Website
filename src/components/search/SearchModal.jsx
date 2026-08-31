import React, { useState, useEffect, useRef } from "react";
import { useCourse } from "@/context/CourseContext";
import { ALL_LESSONS } from "@/data/lessonsData";
import { PRACTICE_EXERCISES } from "@/data/practiceData";
import { Search, X, BookOpen, Code2, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, navigateToLesson, setActivePage } = useCourse();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search lessons
  const matchingLessons = trimmed
    ? ALL_LESSONS.filter((lesson) => {
        return (
          lesson.title.toLowerCase().includes(trimmed) ||
          lesson.description.toLowerCase().includes(trimmed) ||
          lesson.explanation.toLowerCase().includes(trimmed) ||
          lesson.tag.toLowerCase().includes(trimmed) ||
          lesson.objectives.some((o) => o.toLowerCase().includes(trimmed))
        );
      })
    : ALL_LESSONS;

  // Search practice exercises
  const matchingExercises = trimmed
    ? PRACTICE_EXERCISES.filter((ex) => {
        return (
          ex.title.toLowerCase().includes(trimmed) ||
          ex.topic.toLowerCase().includes(trimmed) ||
          ex.instruction.toLowerCase().includes(trimmed)
        );
      })
    : [];

  const handleSelectLesson = (lessonId) => {
    setIsSearchOpen(false);
    navigateToLesson(lessonId);
  };

  const handleSelectExercise = (ex) => {
    setIsSearchOpen(false);
    setActivePage("practice");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, keywords (e.g. let, objects, push, arrow functions)..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-4">
          {/* Quick Keyword Filters */}
          {!trimmed && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Popular Search Topics
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Variables", "let vs const", "Data Types", "Objects", "Math & Date", "Arrays", "push & pop", "Functions", "Arrow Functions", "Callbacks"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-950/40 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Lessons ({matchingLessons.length})
              </span>
            </div>

            {matchingLessons.length === 0 ? (
              <div className="py-6 text-center text-sm text-slate-500">
                No matching lessons found for "{query}".
              </div>
            ) : (
              <div className="space-y-1.5">
                {matchingLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.id)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-950/30 border border-transparent hover:border-amber-300 dark:hover:border-amber-700/50 cursor-pointer group transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-mono font-bold text-xs shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        {lesson.number === 0 ? "★" : lesson.number}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                            {lesson.title}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {lesson.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Practice Exercises (if query matches) */}
          {matchingExercises.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Coding Exercises ({matchingExercises.length})
              </p>
              <div className="space-y-1.5">
                {matchingExercises.map((ex) => (
                  <div
                    key={ex.id}
                    onClick={() => handleSelectExercise(ex)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Code2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {ex.title}
                        </span>
                        <span className="text-[11px] text-slate-400 ml-2">({ex.topic})</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      Practice <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search across 8 major JavaScript modules</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">↵ to select</kbd>
            <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">ESC to close</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
