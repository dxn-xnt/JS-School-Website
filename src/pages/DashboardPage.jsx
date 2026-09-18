import React, { useState } from "react";
import { useSchool } from "../context/SchoolContext";
import {
  StatCard,
  Button,
  Badge
} from "../components/common/UIComponents";
import {
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  CalendarDays,
  Percent,
  Plus,
  ArrowRight,
  Sparkles,
  Layers,
  Clock,
  MapPin
} from "lucide-react";
import { ClassModal } from "../components/modals/ClassModal";
import { StudentModal } from "../components/modals/StudentModal";
import { TeacherModal } from "../components/modals/TeacherModal";
import { ScheduleModal } from "../components/modals/ScheduleModal";

export function DashboardPage() {
  const {
    classes,
    students,
    teachers,
    subjects,
    schedules,
    summaryStats,
    navigateTo,
    getTeacherById,
    getSubjectById,
    getEnrolledStudentsForClass
  } = useSchool();

  const [modalType, setModalType] = useState(null);

  const activeClasses = classes.filter((c) => !c.isArchived);

  // Group classes by Grade level (Arrays & Higher order concept)
  const gradeDistribution = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => {
    const matching = activeClasses.filter((c) => c.grade === grade);
    const studentCount = matching.reduce(
      (sum, c) => sum + getEnrolledStudentsForClass(c.id).length,
      0
    );
    return {
      grade,
      classCount: matching.length,
      studentCount
    };
  });

  // Monday / Current day schedules sample
  const sampleSchedules = schedules.slice(0, 5);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>School Administration System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Academic Operations Dashboard
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed">
            Manage student cohorts, assign certified faculty, configure subject syllabi, and organize class timetables seamlessly.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5 pt-3">
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => setModalType("class")}
              className="bg-white text-blue-900 hover:bg-blue-50 border-0 font-bold"
            >
              Add Class
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => setModalType("student")}
              className="bg-white/20 text-white hover:bg-white/30 border-0 font-medium backdrop-blur-md"
            >
              Enroll Student
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={Plus}
              onClick={() => setModalType("schedule")}
              className="bg-white/20 text-white hover:bg-white/30 border-0 font-medium backdrop-blur-md"
            >
              Schedule Timetable
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowRight}
              onClick={() => navigateTo("js-concepts")}
              className="bg-white/20 text-white hover:bg-white/30 border-0 font-medium backdrop-blur-md"
            >
              View JS Concepts
            </Button>
          </div>
        </div>
      </div>

      {/* 6 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Active Classes"
          value={summaryStats.activeClassesCount}
          subtitle={`${summaryStats.archivedClassesCount} Archived`}
          icon={GraduationCap}
          color="blue"
          onClick={() => navigateTo("classes")}
        />
        <StatCard
          title="Enrolled Students"
          value={summaryStats.totalStudents}
          subtitle={`Avg Attendance: ${summaryStats.averageAttendance}%`}
          icon={Users}
          color="emerald"
          onClick={() => navigateTo("students")}
        />
        <StatCard
          title="Faculty Teachers"
          value={summaryStats.totalTeachers}
          subtitle="All Active Departments"
          icon={UserCheck}
          color="purple"
          onClick={() => navigateTo("teachers")}
        />
        <StatCard
          title="Curriculum Subjects"
          value={summaryStats.totalSubjects}
          subtitle="Across 6 Academic Depts"
          icon={BookOpen}
          color="amber"
          onClick={() => navigateTo("subjects")}
        />
        <StatCard
          title="Class Occupancy"
          value={`${summaryStats.occupancyPercentage}%`}
          subtitle={`${summaryStats.totalStudents}/${summaryStats.totalStudentCapacity} Total Seats`}
          icon={Percent}
          color="indigo"
        />
        <StatCard
          title="Weekly Timetables"
          value={summaryStats.totalSchedules}
          subtitle="Active Schedule Slots"
          icon={CalendarDays}
          color="rose"
          onClick={() => navigateTo("schedules")}
        />
      </div>

      {/* 2-Column Content Grid: Grade Distribution & Today's Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Cohort Breakdown */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Grade Level Cohorts
            </h3>
            <span className="text-xs text-slate-400 font-medium">4 Levels</span>
          </div>

          <div className="space-y-3.5">
            {gradeDistribution.map((item) => {
              const maxScale = Math.max(...gradeDistribution.map((g) => g.studentCount), 1);
              const percentage = Math.round((item.studentCount / maxScale) * 100);

              return (
                <div key={item.grade} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{item.grade}</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {item.classCount} classes • {item.studentCount} students
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Capacity Utilization</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {summaryStats.totalStudents} / {summaryStats.totalStudentCapacity} Allocated Seats
            </span>
          </div>
        </div>

        {/* Timetable Schedule Preview */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Featured Schedule Highlights
              </h3>
              <Button
                variant="ghost"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigateTo("schedules")}
              >
                View Full Timetable
              </Button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {sampleSchedules.map((slot) => {
                const cls = classes.find((c) => c.id === slot.classId);
                const teacher = getTeacherById(slot.teacherId);
                const subject = getSubjectById(slot.subjectId);

                return (
                  <div
                    key={slot.id}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl px-2.5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-purple-50 dark:bg-purple-950/60 p-2 text-purple-600 dark:text-purple-400 font-bold text-xs">
                        {slot.day.substring(0, 3)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            {subject?.name || "Subject"}
                          </span>
                          <Badge size="sm" variant="default">
                            {cls?.name || "Class"}
                          </Badge>
                          <Badge size="sm" variant="purple">
                            {slot.type}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {slot.startTime}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {slot.room}
                          </span>
                          <span>•</span>
                          <span>{teacher?.name || "No Teacher"}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Active Classes Grid Preview */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Active Class Sections
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any class card to view full roster, subject syllabus, and timetable slots.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigateTo("classes")}
          >
            Manage All Classes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeClasses.map((cls) => {
            const leadTeacher = getTeacherById(cls.teacherId);
            const enrolled = getEnrolledStudentsForClass(cls.id);
            const capacityRatio = (enrolled.length / cls.capacity) * 100;

            return (
              <div
                key={cls.id}
                onClick={() => navigateTo("class-details", cls.id)}
                className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4.5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge size="sm" variant="primary">
                      {cls.grade}
                    </Badge>
                    <h4 className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {cls.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cls.room} • {cls.code}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>

                {/* Teacher info */}
                <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lead: {leadTeacher?.name || "Unassigned"}</span>
                </div>

                {/* Capacity progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-500">
                    <span>Enrolled Roster</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {enrolled.length} / {cls.capacity}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        capacityRatio >= 90
                          ? "bg-rose-500"
                          : capacityRatio >= 70
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(capacityRatio, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Modals */}
      <ClassModal isOpen={modalType === "class"} onClose={() => setModalType(null)} />
      <StudentModal isOpen={modalType === "student"} onClose={() => setModalType(null)} />
      <TeacherModal isOpen={modalType === "teacher"} onClose={() => setModalType(null)} />
      <ScheduleModal isOpen={modalType === "schedule"} onClose={() => setModalType(null)} />
    </div>
  );
}
