import React, { useState } from "react";
import { useSchool } from "../context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
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
  Layers,
  Phone
} from "lucide-react";
import { ClassModal } from "../components/modals/ClassModal";
import { AssignStudentModal } from "../components/modals/AssignStudentModal";
import { AssignSubjectModal } from "../components/modals/AssignSubjectModal";
import { ScheduleModal } from "../components/modals/ScheduleModal";
import { getTimeSlotLabel } from "../data";

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

  const [activeTab, setActiveTab] = useState("students");
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
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo("classes")}
          className="gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Classes</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditClassOpen(true)}
            className="gap-1.5"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Class</span>
          </Button>
          <Button
            variant={currentClass.isArchived ? "default" : "outline"}
            size="sm"
            onClick={() => toggleArchiveClass(currentClass.id)}
            className="gap-1.5"
          >
            {currentClass.isArchived ? <RotateCcw className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
            <span>{currentClass.isArchived ? "Restore Class" : "Archive Class"}</span>
          </Button>
        </div>
      </div>

      {/* Class Hero Header Card */}
      <Card className="p-6 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Class Title and Core Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={currentClass.isArchived ? "secondary" : "default"}>
                {currentClass.grade}
              </Badge>
              <Badge variant="outline">
                Code: {currentClass.code}
              </Badge>
              <Badge variant="outline">
                Room: {currentClass.room}
              </Badge>
              {currentClass.isArchived && (
                <Badge variant="destructive">
                  Archived Section
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {currentClass.name}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              {currentClass.description || "Academic syllabus and cohort administration profile."}
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="grid grid-cols-3 gap-3 shrink-0 bg-muted/40 p-3.5 rounded-2xl border border-border text-center">
            <div className="px-2">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Enrolled</span>
              <div className="text-xl font-extrabold text-foreground">
                {enrolledStudents.length}
              </div>
              <span className="text-[10px] text-muted-foreground">of {currentClass.capacity}</span>
            </div>
            <div className="px-2 border-x border-border">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Subjects</span>
              <div className="text-xl font-extrabold text-primary">
                {classSubjects.length}
              </div>
              <span className="text-[10px] text-muted-foreground">Taught</span>
            </div>
            <div className="px-2">
              <span className="text-[10px] uppercase font-bold text-muted-foreground">Schedules</span>
              <div className="text-xl font-extrabold text-primary">
                {classSchedules.length}
              </div>
              <span className="text-[10px] text-muted-foreground">Slots</span>
            </div>
          </div>
        </div>

        {/* Lead Teacher & Capacity Row */}
        <div className="pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Lead Teacher Quick-Assign */}
          <div className="flex items-center gap-3 bg-muted/40 p-3 rounded-2xl border border-border">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center shrink-0 shadow-xs">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Lead Class Teacher
              </div>
              <div className="text-sm font-bold text-foreground truncate">
                {leadTeacher?.name || "No Faculty Assigned"}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {leadTeacher ? `${leadTeacher.department} • ${leadTeacher.email}` : "Select a teacher below"}
              </div>
            </div>
            <select
              value={currentClass.teacherId || ""}
              onChange={(e) => assignTeacherToClass(currentClass.id, e.target.value || null)}
              className="text-xs rounded-lg border border-input bg-background py-1.5 px-2.5 font-semibold text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              <option value="">Reassign Lead Teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id} className="bg-background text-foreground">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Capacity Meter */}
          <div className="bg-muted/40 p-3 rounded-2xl border border-border space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">
                Seat Capacity ({capacityRatio}% Filled)
              </span>
              <span className="text-foreground font-bold">
                {seatsAvailable > 0 ? `${seatsAvailable} Seats Available` : "Class Full"}
              </span>
            </div>
            <Progress value={Math.min(capacityRatio, 100)} className="h-2.5" />
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex border-b border-border gap-6">
        <button
          onClick={() => setActiveTab("students")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "students"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Enrolled Students</span>
          <Badge variant={activeTab === "students" ? "default" : "secondary"}>
            {enrolledStudents.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("subjects")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "subjects"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Assigned Subjects</span>
          <Badge variant={activeTab === "subjects" ? "default" : "secondary"}>
            {classSubjects.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("schedules")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "schedules"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Weekly Timetable</span>
          <Badge variant={activeTab === "schedules" ? "default" : "secondary"}>
            {classSchedules.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab("info")}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "info"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Overview & Metadata</span>
        </button>
      </div>

      {/* TAB 1: STUDENTS */}
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
              variant="default"
              size="sm"
              onClick={() => setIsAssignStudentOpen(true)}
              className="gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Manage Enrollment ({enrolledStudents.length}/{currentClass.capacity})</span>
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
            <Card className="overflow-hidden p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="px-5 py-3.5">Student Name</TableHead>
                    <TableHead className="px-5 py-3.5">Email</TableHead>
                    <TableHead className="px-5 py-3.5">Grade</TableHead>
                    <TableHead className="px-5 py-3.5">Gender</TableHead>
                    <TableHead className="px-5 py-3.5">Contact Phone</TableHead>
                    <TableHead className="px-5 py-3.5 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnrolledStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="px-5 py-3.5 font-bold text-foreground">
                        <div className="flex items-center gap-2.5">
                          <Avatar size="sm" className="bg-primary/10 text-primary font-bold">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-xs text-muted-foreground">{student.email}</TableCell>
                      <TableCell className="px-5 py-3.5">
                        <Badge variant="outline">
                          {student.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-xs text-muted-foreground">
                        {student.gender || "Male"}
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span>{student.contact?.phone || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 gap-1"
                          onClick={() => removeStudentFromClass(currentClass.id, student.id)}
                        >
                          <UserMinus className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      )}

      {/* TAB 2: SUBJECTS */}
      {activeTab === "subjects" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Curriculum syllabi taught to students in {currentClass.name}.
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsAssignSubjectOpen(true)}
              className="gap-1.5"
            >
              <BookPlus className="w-4 h-4" />
              <span>Assign / Remove Subjects</span>
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
                <Card
                  key={subject.id}
                  className="p-5 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="secondary">
                        {subject.code}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removeSubjectFromClass(currentClass.id, subject.id)}
                        className="text-muted-foreground hover:text-destructive"
                        title="Remove Subject from Class"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <h4 className="text-base font-bold text-foreground">
                      {subject.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Department: {subject.department}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {subject.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-foreground">
                    <span>{subject.credits} Credit Units</span>
                    <span>{subject.weeklyHours} Hours / Week</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SCHEDULES */}
      {activeTab === "schedules" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Weekly schedule periods and classroom assignments for {currentClass.name}.
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => setScheduleModalState({ isOpen: true, data: null })}
              className="gap-1.5"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Add Schedule Period</span>
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
                  <Card
                    key={slot.id}
                    className="p-5 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          {slot.day}
                        </Badge>
                        <Badge variant="secondary">
                          {slot.type}
                        </Badge>
                      </div>

                      <h4 className="text-base font-bold text-foreground">
                        {subject?.name || "Subject"}
                      </h4>

                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{getTimeSlotLabel(slot)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{slot.room || currentClass.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Instructor: {teacher?.name || "Unassigned"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setScheduleModalState({ isOpen: true, data: slot })}
                        title="Edit Slot"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => deleteSchedule(slot.id)}
                        title="Delete Slot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: METADATA */}
      {activeTab === "info" && (
        <Card className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-foreground mb-1">
              Class Specifications & Metadata
            </h3>
            <p className="text-xs text-muted-foreground">
              Technical object parameters and academic identifiers for this class entity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1">
              <span className="text-muted-foreground font-semibold uppercase text-[10px]">Class ID</span>
              <p className="font-mono font-bold text-foreground">{currentClass.id}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1">
              <span className="text-muted-foreground font-semibold uppercase text-[10px]">Academic Year</span>
              <p className="font-bold text-foreground">
                {currentClass.metadata?.academicYear || "2026-2027"}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-1">
              <span className="text-muted-foreground font-semibold uppercase text-[10px]">Semester</span>
              <p className="font-bold text-foreground">
                {currentClass.metadata?.semester || "Spring 2026"}
              </p>
            </div>
          </div>
        </Card>
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
