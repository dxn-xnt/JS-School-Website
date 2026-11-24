import React from "react";
import { useSchool } from "../../context/SchoolContext";
import { Badge } from "@/components/ui/badge";
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
    // {
    //   id: "classes",
    //   label: "Classes",
    //   icon: GraduationCap,
    //   badge: activeClassesCount
    // },
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
    // {
    //   id: "subjects",
    //   label: "Subjects",
    //   icon: BookOpen,
    //   badge: subjects.length
    // },
    // {
    //   id: "schedules",
    //   label: "Schedules",
    //   icon: CalendarDays,
    //   badge: schedules.length
    // },
    // {
    //   id: "js-concepts",
    //   label: "JS Concepts",
    //   icon: Code2,
    //   badge: "8 Concepts",
    //   special: true
    // }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0 z-30 transition-colors">
      {/* Brand Header */}
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/20">
            <School className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-sidebar-foreground leading-tight truncate">
              {SCHOOL_NAME}
            </h1>
            <p className="text-[11px] font-semibold text-sidebar-foreground/70">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/60">
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
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 group cursor-pointer ${isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-sidebar-primary-foreground" : ""
                    }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive
                    ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                    : "bg-sidebar-accent text-sidebar-accent-foreground"
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
      <div className="p-3 m-3 rounded-xl bg-sidebar-accent/50 border border-sidebar-border text-xs text-sidebar-foreground">
        <div className="flex items-center gap-2 text-sidebar-foreground font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-sidebar-primary" />
          <span>{SEMESTER}</span>
        </div>
        <p className="text-[11px] text-sidebar-foreground/70">
          Academic Year: <span className="font-medium text-sidebar-foreground">{ACADEMIC_YEAR}</span>
        </p>
      </div>
    </aside>
  );
}
