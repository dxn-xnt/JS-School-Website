import React, { useState, useEffect } from "react";
import { useSchool } from "../../context/SchoolContext";
import {
  Search,
  Plus,
  RotateCcw,
  Sun,
  Moon,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  CalendarDays,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { Button, SearchInput } from "../common/UIComponents";
import { ClassModal } from "../modals/ClassModal";
import { StudentModal } from "../modals/StudentModal";
import { TeacherModal } from "../modals/TeacherModal";
import { SubjectModal } from "../modals/SubjectModal";
import { ScheduleModal } from "../modals/ScheduleModal";

export function Header() {
  const {
    activePage,
    selectedClassId,
    getClassById,
    navigateTo,
    searchQuery,
    setSearchQuery,
    resetToDefaultData
  } = useSchool();

  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'class' | 'student' | 'teacher' | 'subject' | 'schedule'

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const getPageTitle = () => {
    if (activePage === "dashboard") return "School Overview & Analytics";
    if (activePage === "classes") return "Class Cohort Management";
    if (activePage === "class-details") {
      const cls = getClassById(selectedClassId);
      return cls ? `Class Details: ${cls.name}` : "Class Details";
    }
    if (activePage === "students") return "Student Enrollment Directory";
    if (activePage === "teachers") return "Faculty & Teacher Directory";
    if (activePage === "subjects") return "Subject & Course Catalog";
    if (activePage === "schedules") return "School Weekly Schedules & Timetable";
    if (activePage === "js-concepts") return "JavaScript Core Concepts Reference";
    return "Admin Portal";
  };

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between gap-4 transition-colors">
        {/* Left Title & Breadcrumbs */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <span
              className="cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => navigateTo("dashboard")}
            >
              Admin
            </span>
            <span>/</span>
            <span className="capitalize text-slate-600 dark:text-slate-300 font-semibold">
              {activePage.replace("-", " ")}
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
            {getPageTitle()}
          </h2>
        </div>

        {/* Center/Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Bar */}
          <div className="w-56 lg:w-72 hidden sm:block">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Quick search records..."
            />
          </div>

          {/* Quick Create Dropdown */}
          <div className="relative">
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => setIsQuickAddOpen((prev) => !prev)}
            >
              <span className="hidden md:inline">Quick Add</span>
              <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </Button>

            {isQuickAddOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsQuickAddOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      setModalType("class");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    <span>Add New Class</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalType("student");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span>Register Student</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalType("teacher");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <UserCheck className="w-4 h-4 text-purple-500" />
                    <span>Add Faculty Teacher</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalType("subject");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>Add Course Subject</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalType("schedule");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                  >
                    <CalendarDays className="w-4 h-4 text-rose-500" />
                    <span>Add Schedule Slot</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Reset Data Button */}
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={resetToDefaultData}
            title="Reset to default static mock data"
          >
            <span className="hidden xl:inline">Reset Data</span>
          </Button>

          {/* Theme Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                Principal Admin
              </p>
              <p className="text-[10px] text-slate-400 font-medium">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Add Modals */}
      <ClassModal
        isOpen={modalType === "class"}
        onClose={() => setModalType(null)}
      />
      <StudentModal
        isOpen={modalType === "student"}
        onClose={() => setModalType(null)}
      />
      <TeacherModal
        isOpen={modalType === "teacher"}
        onClose={() => setModalType(null)}
      />
      <SubjectModal
        isOpen={modalType === "subject"}
        onClose={() => setModalType(null)}
      />
      <ScheduleModal
        isOpen={modalType === "schedule"}
        onClose={() => setModalType(null)}
      />
    </>
  );
}
