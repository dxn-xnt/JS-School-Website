import React from "react";
import { useSchool } from "../../context/SchoolContext";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  CalendarDays,
  Code2,
  School,
  Sparkles
} from "lucide-react";
import { SCHOOL_NAME, ACADEMIC_YEAR, SEMESTER } from "../../data";

export function Sidebar() {
  const { activePage, navigateTo, classes, students, teachers, subjects, schedules } = useSchool();

  const activeClassesCount = classes.filter((c) => !c.isArchived).length;

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: "classes",
      label: "Classes",
      icon: GraduationCap,
      badge: activeClassesCount
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
      badge: students.length
    },
    {
      id: "teachers",
      label: "Teachers",
      icon: UserCheck,
      badge: teachers.length
    },
    {
      id: "subjects",
      label: "Subjects",
      icon: BookOpen,
      badge: subjects.length
    },
    {
      id: "schedules",
      label: "Schedules",
      icon: CalendarDays,
      badge: schedules.length
    },
    {
      id: "js-concepts",
      label: "JS Concepts",
      icon: Code2,
      badge: "8 Concepts",
      special: true
    }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-screen sticky top-0 z-30 transition-colors">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <School className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
              {SCHOOL_NAME}
            </h1>
            <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activePage === item.id || (item.id === "classes" && activePage === "class-details");

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? item.special
                    ? "bg-purple-600 text-white shadow-sm shadow-purple-500/30"
                    : "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                  : item.special
                  ? "text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : ""
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : item.special
                      ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="p-3 m-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>{SEMESTER}</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Academic Year: <span className="font-medium text-slate-700 dark:text-slate-300">{ACADEMIC_YEAR}</span>
        </p>
      </div>
    </aside>
  );
}
