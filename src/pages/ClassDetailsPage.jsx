import React, { useState } from "react";
import { useSchool } from "../context/SchoolContext";
import {
  Button,
  Badge,
  SearchInput,
  EmptyState,
  ConfirmDialog
} from "../components/common/UIComponents";
import {
  ArrowLeft,
  GraduationCap,
  Users,
  BookOpen,
  CalendarDays,
  UserCheck,
  UserPlus,
  BookPlus,
  Clock,
  MapPin,
  Edit2,
  Trash2,
  UserMinus,
  Archive,
  RotateCcw,
  Sparkles,
  Layers
} from "lucide-react";
import { ClassModal } from "../components/modals/ClassModal";
import { AssignStudentModal } from "../components/modals/AssignStudentModal";
import { AssignSubjectModal } from "../components/modals/AssignSubjectModal";
import { ScheduleModal } from "../components/modals/ScheduleModal";

export function ClassDetailsPage() {
  const {
    selectedClassId,
    classes,
    teachers,
    subjects,
    schedules,
    navigateTo,
    getTeacherById,
    getSubjectById,
    getEnrolledStudentsForClass,
    getSubjectsForClass,
    getSchedulesForClass,
    assignTeacherToClass,
    removeStudentFromClass,
    removeSubjectFromClass,
    deleteSchedule,
    toggleArchiveClass
  } = useSchool();

  const [activeTab, setActiveTab] = useState("students"); // 'students' | 'subjects' | 'schedules' | 'info'
  const [studentSearch, setStudentSearch] = useState("");
  const [isEditClassOpen, setIsEditClassOpen] = useState(false);
  const [isAssignStudentOpen, setIsAssignStudentOpen] = useState(false);
  const [isAssignSubjectOpen, setIsAssignSubjectOpen] = useState(false);
  const [scheduleModalState, setScheduleModalState] = useState({ isOpen: false, data: null });

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  if (!currentClass) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <EmptyState
          icon={GraduationCap}
          title="Class Not Found"
          description="The selected class could not be found or has been removed."
          actionLabel="Back to Classes"
          onAction={() => navigateTo("classes")}
        />
      </div>
    );
  }

  const leadTeacher = getTeacherById(currentClass.teacherId);
  const enrolledStudents = getEnrolledStudentsForClass(currentClass.id);
  const classSubjects = getSubjectsForClass(currentClass.id);
  const classSchedules = getSchedulesForClass(currentClass.id);

  const filteredEnrolledStudents = enrolledStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const capacityRatio = Math.round((enrolledStudents.length / currentClass.capacity) * 100);
  const seatsAvailable = Math.max(0, currentClass.capacity - enrolledStudents.length);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigateTo("classes")}
        >
          Back to All Classes
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => setIsEditClassOpen(true)}
          >
            Edit Class
          </Button>
          <Button
            variant={currentClass.isArchived ? "success" : "outline"}
            size="sm"
            icon={currentClass.isArchived ? RotateCcw : Archive}
            onClick={() => toggleArchiveClass(currentClass.id)}
          >
            {currentClass.isArchived ? "Restore Class" : "Archive Class"}
          </Button>
        </div>
      </div>

      {/* Class Hero Header Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Class Title and Core Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge size="md" variant={currentClass.isArchived ? "warning" : "primary"}>
                {currentClass.grade}
              </Badge>
              <Badge size="md" variant="default">
                Code: {currentClass.code}
              </Badge>
              <Badge size="md" variant="outline">
                Room: {currentClass.room}
              </Badge>
              {currentClass.isArchived && (
                <Badge size="md" variant="warning">
                  Archived Section
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {currentClass.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              {currentClass.description || "Academic syllabus and cohort administration profile."}
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="grid grid-cols-3 gap-3 shrink-0 bg-slate-50 dark:bg-slate-950/50 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center">
            <div className="px-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Enrolled</span>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                {enrolledStudents.length}
              </div>
              <span className="text-[10px] text-slate-500">of {currentClass.capacity}</span>
            </div>
            <div className="px-2 border-x border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400">Subjects</span>
              <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                {classSubjects.length}
              </div>
              <span className="text-[10px] text-slate-500">Taught</span>
            </div>
            <div className="px-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Schedules</span>
              <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400">
                {classSchedules.length}
              </div>
              <span className="text-[10px] text-slate-500">Slots</span>
            </div>
          </div>
        </div>

        {/* Lead Teacher & Capacity Row */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Lead Teacher Quick-Assign */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lead Class Teacher
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {leadTeacher?.name || "No Faculty Assigned"}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {leadTeacher ? `${leadTeacher.department} • ${leadTeacher.email}` : "Select a teacher below"}
              </div>
            </div>
            <select
              value={currentClass.teacherId || ""}
              onChange={(e) => assignTeacherToClass(currentClass.id, e.target.value || null)}
              className="text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-1.5 px-2.5 font-semibold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Reassign Lead Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity Meter */}
          <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">
                Seat Capacity ({capacityRatio}% Filled)
              </span>
              <span className="text-slate-900 dark:text-white font-bold">
                {seatsAvailable > 0 ? `${seatsAvailable} Seats Available` : "Class Full"}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  capacityRatio >= 100
                    ? "bg-rose-500"
                    : capacityRatio >= 80
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(capacityRatio, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab("students")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "students"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Enrolled Students</span>
          <Badge size="sm" variant={activeTab === "students" ? "primary" : "default"}>
            {enrolledStudents.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("subjects")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "subjects"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Assigned Subjects</span>
          <Badge size="sm" variant={activeTab === "subjects" ? "primary" : "default"}>
            {classSubjects.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("schedules")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "schedules"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Weekly Timetable</span>
          <Badge size="sm" variant={activeTab === "schedules" ? "primary" : "default"}>
            {classSchedules.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("info")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "info"
              ? "border-blue-600 text-blue-600 dark:text-blue-400"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Overview & Metadata</span>
        </button>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* TAB 1: ENROLLED STUDENTS */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "students" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <SearchInput
                value={studentSearch}
                onChange={setStudentSearch}
                placeholder="Search enrolled students..."
              />
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={UserPlus}
              onClick={() => setIsAssignStudentOpen(true)}
            >
              Manage Enrollment ({enrolledStudents.length}/{currentClass.capacity})
            </Button>
          </div>

          {filteredEnrolledStudents.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No Students Enrolled"
              description="There are currently no students enrolled matching your criteria in this class section."
              actionLabel="Enroll Students"
              onAction={() => setIsAssignStudentOpen(true)}
            />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3.5">Student Name</th>
                    <th className="px-5 py-3.5">Email</th>
                    <th className="px-5 py-3.5">Grade</th>
                    <th className="px-5 py-3.5">Attendance</th>
                    <th className="px-5 py-3.5">GPA</th>
                    <th className="px-5 py-3.5">Guardian Phone</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredEnrolledStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                            {student.name.charAt(0)}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500">{student.email}</td>
                      <td className="px-5 py-3.5">
                        <Badge size="sm" variant="default">
                          {student.grade}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-semibold text-emerald-600">
                        {student.attendanceRate}%
                      </td>
                      <td className="px-5 py-3.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                        {student.gpa}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-500">
                        {student.contact?.phone || "N/A"}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          icon={UserMinus}
                          onClick={() => removeStudentFromClass(currentClass.id, student.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 2: ASSIGNED SUBJECTS */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "subjects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curriculum syllabi taught to students in {currentClass.name}.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={BookPlus}
              onClick={() => setIsAssignSubjectOpen(true)}
            >
              Assign / Remove Subjects
            </Button>
          </div>

          {classSubjects.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No Subjects Assigned"
              description="No curriculum subjects have been assigned to this class section yet."
              actionLabel="Assign Subjects"
              onAction={() => setIsAssignSubjectOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <Badge size="sm" variant="purple">
                        {subject.code}
                      </Badge>
                      <button
                        onClick={() => removeSubjectFromClass(currentClass.id, subject.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove Subject from Class"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {subject.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Department: {subject.department}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {subject.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{subject.credits} Credit Units</span>
                    <span>{subject.weeklyHours} Hours / Week</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 3: TIMETABLE SCHEDULE */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "schedules" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Weekly schedule periods and classroom assignments for {currentClass.name}.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={CalendarDays}
              onClick={() => setScheduleModalState({ isOpen: true, data: null })}
            >
              Add Schedule Period
            </Button>
          </div>

          {classSchedules.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No Schedule Slots"
              description="No timetable slots configured for this class yet."
              actionLabel="Add Schedule Slot"
              onAction={() => setScheduleModalState({ isOpen: true, data: null })}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {classSchedules.map((slot) => {
                const subject = getSubjectById(slot.subjectId);
                const teacher = getTeacherById(slot.teacherId);

                return (
                  <div
                    key={slot.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge size="sm" variant="default">
                          {slot.day}
                        </Badge>
                        <Badge size="sm" variant="purple">
                          {slot.type}
                        </Badge>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {subject?.name || "Subject"}
                      </h4>

                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{slot.startTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{slot.room || currentClass.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                          <span>Instructor: {teacher?.name || "Unassigned"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                      <button
                        onClick={() => setScheduleModalState({ isOpen: true, data: slot })}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit Slot"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSchedule(slot.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete Slot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* TAB 4: OVERVIEW & METADATA */}
      {/* -------------------------------------------------------------------- */}
      {activeTab === "info" && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Class Specifications & Metadata
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Technical object parameters and academic identifiers for this class entity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Class ID</span>
              <p className="font-mono font-bold text-slate-900 dark:text-white">{currentClass.id}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Academic Year</span>
              <p className="font-bold text-slate-900 dark:text-white">
                {currentClass.metadata?.academicYear || "2026-2027"}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Semester</span>
              <p className="font-bold text-slate-900 dark:text-white">
                {currentClass.metadata?.semester || "Spring 2026"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ClassModal
        isOpen={isEditClassOpen}
        initialData={currentClass}
        onClose={() => setIsEditClassOpen(false)}
      />
      <AssignStudentModal
        isOpen={isAssignStudentOpen}
        classId={currentClass.id}
        onClose={() => setIsAssignStudentOpen(false)}
      />
      <AssignSubjectModal
        isOpen={isAssignSubjectOpen}
        classId={currentClass.id}
        onClose={() => setIsAssignSubjectOpen(false)}
      />
      <ScheduleModal
        isOpen={scheduleModalState.isOpen}
        initialData={scheduleModalState.data}
        defaultClassId={currentClass.id}
        onClose={() => setScheduleModalState({ isOpen: false, data: null })}
      />
    </div>
  );
}
