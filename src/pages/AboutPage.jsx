import React from "react";
import { useCourse } from "@/context/CourseContext";
import { TOPIC_CARDS } from "@/data/lessonsData";
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Code2,
  Sparkles,
  HelpCircle,
  Clock,
  Laptop,
  Check,
  Download,
  Printer
} from "lucide-react";

export function AboutPage() {
  const { studentProfile, courseProgressPercent, completedCount, totalLessons, navigateToLesson } = useCourse();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Course Overview Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Curriculum Specification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About the JavaScript Basic Course
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          The JavaScript Basic Course is a hands-on, academic learning program designed to help students master core programming fundamentals without confusion or unnecessary complexity.
        </p>
      </div>

      {/* Key Course Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Laptop className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Zero Prerequisites
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            No previous programming background required. Every concept starts from first principles with clear, human explanations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Hands-on Sandbox
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every lesson comes with an embedded "Try It Yourself" sandbox where you can modify, experiment, and run JavaScript code in real time.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Verifiable Mastery
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Track your progress across 8 modules and take the comprehensive assessment to earn your printable course completion certificate.
          </p>
        </div>
      </div>

      {/* Complete Syllabus Roadmap */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Curriculum Breakdown
          </h2>
          <p className="text-xs text-slate-500">
            A comprehensive overview of all 8 core modules in the JavaScript Basic Course.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOPIC_CARDS.map((topic) => (
            <div
              key={topic.id}
              onClick={() => navigateToLesson(topic.lessonId)}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-amber-400/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                {topic.number}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {topic.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">({topic.duration})</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {topic.shortDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Certificate Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 text-white border border-amber-500/30 shadow-xl space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg">
              JS
            </div>
            <div>
              <span className="text-xs uppercase font-semibold tracking-widest text-amber-400">
                DevCampus JS Academy
              </span>
              <h3 className="text-lg font-bold">Certificate of Completion</h3>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>
        </div>

        {/* Certificate Display Mock */}
        <div className="p-8 rounded-2xl bg-white text-slate-900 border-4 border-double border-amber-500/40 text-center space-y-4 shadow-inner">
          <div className="text-xs uppercase tracking-widest text-amber-600 font-bold">
            Official Course Completion Award
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900">
            {studentProfile.name}
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Has successfully demonstrated proficiency in JavaScript fundamentals, variables, data types, objects, arrays, and functions in the <strong>JavaScript Basic Course</strong> at <strong>{studentProfile.school}</strong>.
          </p>
          <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200 max-w-md mx-auto">
            <span>Date: {new Date().toLocaleDateString()}</span>
            <span>Course ID: DC-JSB-2026</span>
            <span className="font-semibold text-emerald-600">Status: Verified</span>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Do I need to install Node.js or any software to learn?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              No! All lessons and practice exercises run entirely in your web browser. You can start coding immediately.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Is my progress saved if I close the browser?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Yes. Your completed lessons, practice drill milestones, and quiz results are automatically saved in your browser's localStorage.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              What is the difference between let and const?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              `const` is for variables that will never be reassigned. `let` is for variables whose values may change over time (like counters or sums).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
