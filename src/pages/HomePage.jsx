import React from "react";
import { useCourse } from "@/context/CourseContext";
import { TOPIC_CARDS } from "@/data/lessonsData";
import { CodeEditor } from "@/components/editor/CodeEditor";
import {
  BookOpen,
  Code2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Box,
  Layers,
  Database,
  Cpu,
  ListOrdered,
  Grid,
  Terminal,
  GraduationCap,
  Play,
  Flame,
  Award
} from "lucide-react";

export function HomePage() {
  const {
    setActivePage,
    navigateToLesson,
    courseProgressPercent,
    completedCount,
    totalLessons,
    isLessonCompleted,
    completedLessons
  } = useCourse();

  // Find next lesson to take
  const firstIncomplete = TOPIC_CARDS.find((t) => !completedLessons.includes(t.lessonId)) || TOPIC_CARDS[0];

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case "Box":
        return <Box className="w-5 h-5 text-amber-500" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-sky-500" />;
      case "Database":
        return <Database className="w-5 h-5 text-emerald-500" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-purple-500" />;
      case "ListOrdered":
        return <ListOrdered className="w-5 h-5 text-rose-500" />;
      case "Grid":
        return <Grid className="w-5 h-5 text-indigo-500" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-amber-600" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-teal-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-amber-500" />;
    }
  };

  const heroStarterCode = `// Welcome to DevCampus JS Academy!
let courseTitle = "JavaScript Basic Course";
let topicsCount = 8;
let isBeginnerFriendly = true;

console.log("Course: " + courseTitle);
console.log("Total Core Topics: " + topicsCount);
console.log("Beginner Friendly: " + isBeginnerFriendly);
console.log("Ready to code? Click 'Run Code' below!");`;

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Beginner-Friendly Interactive Platform</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                  JavaScript Basic Course
                </h1>
                <p className="text-lg sm:text-xl font-medium text-amber-600 dark:text-amber-400">
                  Build your programming foundation with JavaScript.
                </p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  Learn the fundamentals of JavaScript through simple lessons, real-world examples, and hands-on interactive practice. Designed specifically for students with zero prior coding experience.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateToLesson(firstIncomplete.lessonId)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Learning ({firstIncomplete.title})</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById("what-you-will-learn");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold transition-all cursor-pointer"
                >
                  <span>Explore 8 Lessons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Course Progress Banner */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    Your Progress
                  </span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {courseProgressPercent}% Complete ({completedCount}/{totalLessons} Lessons)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${courseProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right Hero Graphic: Live Interactive Code Runner */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-300 opacity-20 blur-lg"></div>
                <CodeEditor
                  initialCode={heroStarterCode}
                  title="Live JavaScript Sandbox"
                  subtitle="Edit and click Run"
                  showReset={true}
                  showClear={true}
                  runLabel="Run Code"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Learn Section (8 Major Topics) */}
      <section id="what-you-will-learn" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Structured Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What You Will Learn
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore the 8 fundamental topics structured to take you from foundational syntax to writing modular, modern JavaScript.
          </p>
        </div>

        {/* 8 Major Topic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOPIC_CARDS.map((topic) => {
            const isCompleted = isLessonCompleted(topic.lessonId);
            return (
              <div
                key={topic.id}
                className={`group relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  isCompleted
                    ? "bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400/60 dark:hover:border-amber-500/60 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  {/* Card Header: Icon & Lesson Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getTopicIcon(topic.icon)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                          Lesson {topic.number}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {topic.tag}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-[10px] text-slate-400 font-mono">{topic.duration}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {topic.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => navigateToLesson(topic.lessonId)}
                  className={`w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                    isCompleted
                      ? "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600/20"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200"
                  }`}
                >
                  <span>{isCompleted ? "Review Lesson" : "Start Lesson"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Platform Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Interactive Try It Yourself</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Run, edit, and experiment with JavaScript directly in your browser with real-time console stdout and error capture.
              </p>
              <button
                onClick={() => {
                  setActivePage("practice");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 pt-1"
              >
                Go to Practice Drills <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Concept Verification Quiz</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Test your knowledge across all 8 modules with multiple-choice questions, detailed explanations, and score tracking.
              </p>
              <button
                onClick={() => {
                  setActivePage("quiz");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 pt-1"
              >
                Take the Quiz <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">Progress & Certificate</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mark lessons as complete to track your mastery in localStorage and unlock your verifiable course certificate.
              </p>
              <button
                onClick={() => {
                  setActivePage("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 pt-1"
              >
                View Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
