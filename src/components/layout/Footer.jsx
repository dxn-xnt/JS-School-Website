import React from "react";
import { useCourse } from "@/context/CourseContext";
import { TOPIC_CARDS } from "@/data/lessonsData";
import { Code2, BookOpen, GraduationCap, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";

export function Footer() {
  const { setActivePage, navigateToLesson, resetAllProgress, courseProgressPercent } = useCourse();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: School Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-mono font-bold text-slate-950 text-sm shadow-sm">
                JS
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base">
                DevCampus JS School
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An interactive educational school platform designed for learning modern JavaScript fundamentals step-by-step with live code practice.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Current Progress: {courseProgressPercent}% Complete</span>
            </div>
          </div>

          {/* Column 2: Core Curriculum (Topics 1-4) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Curriculum (Part 1)
            </h4>
            <ul className="space-y-2 text-xs">
              {TOPIC_CARDS.slice(0, 4).map((topic) => (
                <li key={topic.id}>
                  <button
                    onClick={() => navigateToLesson(topic.lessonId)}
                    className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-left"
                  >
                    {topic.number}. {topic.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Advanced Curriculum (Topics 5-8) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Curriculum (Part 2)
            </h4>
            <ul className="space-y-2 text-xs">
              {TOPIC_CARDS.slice(4, 8).map((topic) => (
                <li key={topic.id}>
                  <button
                    onClick={() => navigateToLesson(topic.lessonId)}
                    className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-left"
                  >
                    {topic.number}. {topic.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Platform Quick Links & Reset */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActivePage("practice");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Interactive Code Practice Drills
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("quiz");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Comprehensive Course Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("about");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  About Syllabus & Certificate
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset your course progress and quiz scores?")) {
                      resetAllProgress();
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Course Data</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-3">
          <p>© 2026 DevCampus JS Academy. Built for teaching JavaScript Basic Course.</p>
          <div className="flex items-center gap-4">
            <span>Vanilla JS Foundation</span>
            <span>•</span>
            <span>Zero-Dependency Learning</span>
            <span>•</span>
            <span>Interactive Sandbox</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
