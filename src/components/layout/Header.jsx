import React, { useState, useEffect } from "react";
import { useSchool } from "../../context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
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
import { SearchInput } from "../common/UIComponents";
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
  const [modalType, setModalType] = useState(null);

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
      <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border px-6 py-3.5 flex items-center justify-between gap-4 transition-colors">
        {/* Left Title & Breadcrumbs */}
        <div>
          {/* <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => navigateTo("dashboard")}
            >
              Admin
            </span>
            <span>/</span>
            <span className="capitalize text-foreground font-semibold">
              {activePage.replace("-", " ")}
            </span>
          </div> */}
          <h2 className="text-base font-bold text-foreground leading-tight">
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
              variant="default"
              size="sm"
              onClick={() => setIsQuickAddOpen((prev) => !prev)}
              className="gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Quick Add</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </Button>

            {isQuickAddOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsQuickAddOpen(false)}
                />
                <Card className="absolute right-0 mt-2 w-48 shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95">
                  {/* <button
                    onClick={() => {
                      setModalType("class");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors text-left cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span>Add New Class</span>
                  </button> */}
                  <button
                    onClick={() => {
                      setModalType("student");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors text-left cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-primary" />
                    <span>Register Student</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalType("teacher");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors text-left cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-primary" />
                    <span>Add Faculty Teacher</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalType("subject");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors text-left cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>Add Course Subject</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalType("schedule");
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-foreground hover:bg-muted transition-colors text-left cursor-pointer"
                  >
                    <CalendarDays className="w-4 h-4 text-primary" />
                    <span>Add Schedule Slot</span>
                  </button>
                </Card>
              </>
            )}
          </div>

          {/* Reset Data Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefaultData}
            title="Reset to default static mock data"
            className="gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Reset Data</span>
          </Button>

          {/* Theme Switcher */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={toggleDarkMode}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Admin Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <Avatar size="sm" className="bg-primary text-primary-foreground font-bold">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <ShieldCheck className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-foreground leading-none">
                Principal Admin
              </p>
              <p className="text-[10px] text-muted-foreground font-medium">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Add Modals */}
      {/* <ClassModal
        isOpen={modalType === "class"}
        onClose={() => setModalType(null)}
      /> */}
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
