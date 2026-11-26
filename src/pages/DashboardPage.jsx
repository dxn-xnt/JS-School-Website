import React, { useState } from "react";
import { useSchool } from "../context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  StatCard
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
import { getTimeSlotLabel } from "../data";

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

  // Group classes by Grade level
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

  const sampleSchedules = schedules.slice(0, 5);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white p-6 sm:p-8 border border-zinc-800 shadow-lg shadow-black/10">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-zinc-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-12 w-48 h-48 bg-zinc-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-zinc-200 backdrop-blur-md text-xs font-semibold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>School Administration System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Academic Operations Dashboard
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Manage student cohorts, assign certified faculty, configure subject syllabi, and organize class timetables seamlessly.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5 pt-3">
            {/* <Button
              variant="secondary"
              size="sm"
              onClick={() => setModalType("class")}
              className="gap-1.5 font-semibold bg-white text-zinc-950 hover:bg-zinc-200 border-0 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Class
            </Button> */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalType("student")}
              className="gap-1.5 font-medium bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Enroll Student
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalType("teacher")}
              className="gap-1.5 font-medium bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Faculty Teacher
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalType("schedule")}
              className="gap-1.5 font-medium bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Schedule Timetable
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateTo("js-concepts")}
              className="gap-1.5 font-medium text-zinc-200 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <span>View JS Concepts</span>
              <ArrowRight className="w-4 h-4" />
            </Button> */}
          </div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* <StatCard
          title="Active Classes"
          value={summaryStats.activeClassesCount}
          subtitle={`${summaryStats.archivedClassesCount} Archived`}
          icon={GraduationCap}
          onClick={() => navigateTo("classes")}
        /> */}
        <StatCard
          title="Enrolled Students"
          value={summaryStats.totalStudents}
          subtitle="Active School Enrollment"
          icon={Users}
          onClick={() => navigateTo("students")}
        />
        <StatCard
          title="Faculty Teachers"
          value={summaryStats.totalTeachers}
          subtitle="All Active Departments"
          icon={UserCheck}
          onClick={() => navigateTo("teachers")}
        />
        <StatCard
          title="Curriculum Subjects"
          value={summaryStats.totalSubjects}
          subtitle="Across 6 Academic Depts"
          icon={BookOpen}
          onClick={() => navigateTo("subjects")}
        />
        {/* <StatCard
          title="Class Occupancy"
          value={`${summaryStats.occupancyPercentage}%`}
          subtitle={`${summaryStats.totalStudents}/${summaryStats.totalStudentCapacity} Total Seats`}
          icon={Percent}
        /> */}
        <StatCard
          title="Weekly Timetables"
          value={summaryStats.totalSchedules}
          subtitle="Active Schedule Slots"
          icon={CalendarDays}
          onClick={() => navigateTo("schedules")}
        />
      </div>

      {/* Featured Schedule Highlights */}
      <Card className="p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Featured Schedule Highlights
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateTo("schedules")}
              className="gap-1 text-xs"
            >
              <span>View Full Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="divide-y divide-border">
            {sampleSchedules.map((slot) => {
              const cls = classes.find((c) => c.id === slot.classId);
              const teacher = getTeacherById(slot.teacherId);
              const subject = getSubjectById(slot.subjectId);

              return (
                <div
                  key={slot.id}
                  className="py-3 flex items-center justify-between gap-4 hover:bg-muted/40 rounded-xl px-2.5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary font-bold text-xs">
                      {slot.day.substring(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">
                          {subject?.name || "Subject"}
                        </span>
                        <Badge variant="outline">
                          {cls?.name || "Class"}
                        </Badge>
                        <Badge variant="secondary">
                          {slot.type}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getTimeSlotLabel(slot)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
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
      </Card>

      {/* Active Classes Grid Preview */}
      {/* <Card className="p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Active Class Sections
            </h3>
            <p className="text-xs text-muted-foreground">
              Click any class card to view full roster, subject syllabus, and timetable slots.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateTo("classes")}
            className="gap-1 text-xs"
          >
            <span>Manage All Classes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeClasses.map((cls) => {
            const leadTeacher = getTeacherById(cls.teacherId);
            const enrolled = getEnrolledStudentsForClass(cls.id);
            const capacityRatio = (enrolled.length / cls.capacity) * 100;

            return (
              <Card
                key={cls.id}
                onClick={() => navigateTo("class-details", cls.id)}
                className="group relative p-4 hover:shadow-md hover:border-primary/50 transition-all cursor-pointer space-y-3 bg-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="default">
                      {cls.grade}
                    </Badge>
                    <h4 className="mt-1.5 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {cls.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {cls.room} • {cls.code}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Lead: {leadTeacher?.name || "Unassigned"}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                    <span>Enrolled Roster</span>
                    <span className="font-bold text-foreground">
                      {enrolled.length} / {cls.capacity}
                    </span>
                  </div>
                  <Progress value={Math.min(capacityRatio, 100)} className="h-1.5" />
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-primary font-semibold">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            );
          })}
        </div>
      </Card> */}

      {/* Global Modals */}
      {/* <ClassModal isOpen={modalType === "class"} onClose={() => setModalType(null)} /> */}
      <StudentModal isOpen={modalType === "student"} onClose={() => setModalType(null)} />
      <TeacherModal isOpen={modalType === "teacher"} onClose={() => setModalType(null)} />
      <ScheduleModal isOpen={modalType === "schedule"} onClose={() => setModalType(null)} />
    </div>
  );
}
