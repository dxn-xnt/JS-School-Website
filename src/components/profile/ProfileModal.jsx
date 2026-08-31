import React, { useState } from "react";
import { useCourse } from "@/context/CourseContext";
import { ALL_LESSONS } from "@/data/lessonsData";
import {
  X,
  User,
  GraduationCap,
  Award,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  BookOpen,
  Code2,
  Calendar,
  Download
} from "lucide-react";

export function ProfileModal() {
  const {
    isProfileOpen,
    setIsProfileOpen,
    studentProfile,
    setStudentProfile,
    completedLessons,
    courseProgressPercent,
    completedCount,
    totalLessons,
    practiceCompleted,
    quizResults,
    resetAllProgress,
    navigateToLesson
  } = useCourse();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(studentProfile.name || "Student Learner");
  const [schoolInput, setSchoolInput] = useState(studentProfile.school || "DevCampus JS Academy");

  if (!isProfileOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setStudentProfile((prev) => ({
      ...prev,
      name: nameInput.trim() || "Student Learner",
      school: schoolInput.trim() || "DevCampus JS Academy",
    }));
    setIsEditing(false);
  };

  const completedPracticeCount = Object.keys(practiceCompleted).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Student Learning Dashboard
            </h3>
          </div>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Student Profile Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-md">
                {studentProfile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Student Name"
                    />
                    <input
                      type="text"
                      value={schoolInput}
                      onChange={(e) => setSchoolInput(e.target.value)}
                      className="px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      placeholder="School / University"
                    />
                    <button
                      type="submit"
                      className="text-xs px-2 py-1 rounded bg-amber-500 text-slate-950 font-semibold"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {studentProfile.name}
                      </h4>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {studentProfile.school} • Enrolled {studentProfile.joinedYear}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-amber-500 font-mono">
                {courseProgressPercent}%
              </span>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Overall Progress
              </p>
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <BookOpen className="w-4 h-4 mx-auto mb-1 text-amber-500" />
              <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                {completedCount} / {totalLessons}
              </div>
              <div className="text-[11px] text-slate-500">Lessons Completed</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <Code2 className="w-4 h-4 mx-auto mb-1 text-emerald-500" />
              <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                {completedPracticeCount} / 8
              </div>
              <div className="text-[11px] text-slate-500">Practice Drills</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <Award className="w-4 h-4 mx-auto mb-1 text-sky-500" />
              <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                {quizResults ? `${quizResults.percentage}%` : "Not Taken"}
              </div>
              <div className="text-[11px] text-slate-500">Quiz Score</div>
            </div>
          </div>

          {/* Lesson Checklist */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
              <span>Curriculum Completion Status</span>
              <span>{completedCount} of {totalLessons} Done</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_LESSONS.filter((l) => l.number > 0).map((lesson) => {
                const isDone = completedLessons.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigateToLesson(lesson.id);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isDone
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300 font-medium"
                        : "bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span>
                        {lesson.number}. {lesson.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {lesson.readTime}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificate of Completion Card */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  JavaScript Basic Certificate
                </h5>
                <p className="text-xs text-slate-500">
                  {courseProgressPercent === 100
                    ? "🎉 Congratulations! You have completed all 8 lessons."
                    : `Complete all 8 lessons (${8 - completedCount} remaining) to unlock certificate.`}
                </p>
              </div>
            </div>

            {courseProgressPercent === 100 && (
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Certificate</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all your completed lessons, practice tasks, and quiz scores?")) {
                resetAllProgress();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Progress</span>
          </button>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
