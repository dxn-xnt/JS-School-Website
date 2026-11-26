import React, { useState, useMemo } from "react";
import { useSchool } from "../context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import {
  SelectFilter,
  EmptyState,
  ConfirmDialog
} from "../components/common/UIComponents";
import {
  CalendarDays,
  Plus,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  Clock,
  MapPin,
  GraduationCap
} from "lucide-react";
import { ScheduleModal } from "../components/modals/ScheduleModal";
import {
  WEEKDAYS,
  SCHEDULE_TIME_SLOTS,
  SCHOOL_INFO,
  DataStore,
  isSingletonStore,
  getTimeSlotLabel,
  getSubjectLabel,
  getSchedulesByDay,
  sortSchedulesByDayAndTime,
  countSchedulesByDay
} from "../data";

export function SchedulesPage() {
  const {
    schedules,
    classes,
    subjects,
    teachers,
    deleteSchedule,
    getClassById,
    getSubjectById,
    getTeacherById
  } = useSchool();

  const [viewMode, setViewMode] = useState("timetable");
  const [dayFilter, setDayFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");
  const [subjectFilter, setSubjectFilter] = useState("ALL");

  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, scheduleId: null });

  // FILTER by day (getSchedulesByDay), then by class and subject.
  const filteredSchedules = useMemo(() => {
    const schedulesOnDay = dayFilter === "ALL" ? schedules : getSchedulesByDay(schedules, dayFilter);
    return schedulesOnDay.filter(
      (sch) =>
        (classFilter === "ALL" || sch.classId === classFilter) &&
        (subjectFilter === "ALL" || sch.subjectId === subjectFilter)
    );
  }, [schedules, dayFilter, classFilter, subjectFilter]);

  // REDUCE: how many schedules happen on each weekday (shown as the chips below).
  const schedulesPerDay = countSchedulesByDay(schedules);

  // SORT: the list view is ordered by weekday, then start time.
  const sortedSchedules = sortSchedulesByDayAndTime(filteredSchedules);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary" />
            School Weekly Schedules & Timetable
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Coordinate weekly periods, room allocations, instructor assignments, and cohort timelines.
          </p>
        </div>

        <Button
          variant="default"
          onClick={() => setModalState({ isOpen: true, data: null })}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timetable Slot</span>
        </Button>
      </div>

      {/* Filter and View Bar */}
      <Card className="p-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <SelectFilter
              value={dayFilter}
              onChange={setDayFilter}
              label="All Weekdays"
              options={WEEKDAYS}
            />

            <SelectFilter
              value={classFilter}
              onChange={setClassFilter}
              label="All Classes"
              options={classes.map((c) => ({ value: c.id, label: c.name }))}
            />

            <SelectFilter
              value={subjectFilter}
              onChange={setSubjectFilter}
              label="All Subjects"
              options={subjects.map((s) => ({ value: s.id, label: getSubjectLabel(s) }))}
            />
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 border border-border p-1 rounded-lg bg-muted/40 shrink-0 self-end md:self-auto">
            <button
              onClick={() => setViewMode("timetable")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "timetable"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Weekly Matrix</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Schedules per weekday (REDUCE). Click a day to filter by it. */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {WEEKDAYS.map((day) => (
          <button
            key={day}
            onClick={() => setDayFilter(dayFilter === day ? "ALL" : day)}
            className="cursor-pointer"
          >
            <Badge variant={dayFilter === day ? "default" : "outline"}>
              {day}: {schedulesPerDay[day]}
            </Badge>
          </button>
        ))}
        <span className="ml-auto text-muted-foreground font-semibold">
          {filteredSchedules.length} of {schedules.length} slots shown
        </span>
      </div>

      {/* TIMETABLE MATRIX VIEW */}
      {viewMode === "timetable" ? (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="p-4 w-36 border-r border-border">
                    Time Period
                  </th>
                  {WEEKDAYS.map((day) => (
                    <th
                      key={day}
                      className={`p-4 border-r border-border last:border-r-0 ${
                        dayFilter !== "ALL" && dayFilter !== day ? "opacity-40" : ""
                      }`}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SCHEDULE_TIME_SLOTS.map((timeSlot) => (
                  <tr key={timeSlot} className="hover:bg-muted/20">
                    {/* Time slot column */}
                    <td className="p-3.5 border-r border-border bg-muted/20 font-semibold text-xs text-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{timeSlot}</span>
                      </div>
                    </td>

                    {/* Days columns */}
                    {WEEKDAYS.map((day) => {
                      const matchingSlots = filteredSchedules.filter(
                        (s) => s.day === day && getTimeSlotLabel(s) === timeSlot
                      );

                      const isDimmed = dayFilter !== "ALL" && dayFilter !== day;

                      return (
                        <td
                          key={day}
                          className={`p-2.5 border-r border-border last:border-r-0 align-top min-w-[170px] ${
                            isDimmed ? "opacity-30" : ""
                          }`}
                        >
                          {matchingSlots.length === 0 ? (
                            <div className="h-14 rounded-xl border border-dashed border-border/60 flex items-center justify-center text-[11px] text-muted-foreground/60">
                              Available
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {matchingSlots.map((slot) => {
                                const cls = getClassById(slot.classId);
                                const subject = getSubjectById(slot.subjectId);
                                const teacher = getTeacherById(slot.teacherId);

                                return (
                                  <div
                                    key={slot.id}
                                    className="group rounded-xl p-2.5 border border-primary/20 bg-primary/5 text-xs space-y-1.5 relative shadow-2xs hover:shadow-xs transition-all"
                                  >
                                    <div className="flex items-start justify-between gap-1">
                                      <span className="font-bold text-foreground leading-tight">
                                        {subject?.name || "Subject"}
                                      </span>
                                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                          variant="ghost"
                                          size="icon-xs"
                                          onClick={() => setModalState({ isOpen: true, data: slot })}
                                          title="Edit Slot"
                                        >
                                          <Edit2 className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon-xs"
                                          className="text-destructive hover:bg-destructive/10"
                                          onClick={() =>
                                            setDeleteConfirm({
                                              isOpen: true,
                                              scheduleId: slot.id
                                            })
                                          }
                                          title="Delete Slot"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                                      <GraduationCap className="w-3 h-3" />
                                      <span className="truncate">{cls?.name || "Class"}</span>
                                    </div>

                                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                      <span className="flex items-center gap-0.5">
                                        <MapPin className="w-2.5 h-2.5" />
                                        {slot.room || "Room TBA"}
                                      </span>
                                      <span>{teacher ? teacher.name.split(" ")[1] : "No Teacher"}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* LIST / TABLE VIEW */
        <Card className="overflow-hidden p-0">
          {filteredSchedules.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No Schedule Slots"
              description="No timetable slots matched your active filters."
              actionLabel="Add Schedule Slot"
              onAction={() => setModalState({ isOpen: true, data: null })}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="px-5 py-3.5">Day & Time</TableHead>
                  <TableHead className="px-5 py-3.5">Subject</TableHead>
                  <TableHead className="px-5 py-3.5">Class Section</TableHead>
                  <TableHead className="px-5 py-3.5">Classroom</TableHead>
                  <TableHead className="px-5 py-3.5">Instructor</TableHead>
                  <TableHead className="px-5 py-3.5">Session Type</TableHead>
                  <TableHead className="px-5 py-3.5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSchedules.map((slot) => {
                  const cls = getClassById(slot.classId);
                  const subject = getSubjectById(slot.subjectId);
                  const teacher = getTeacherById(slot.teacherId);

                  return (
                    <TableRow key={slot.id}>
                      <TableCell className="px-5 py-4">
                        <div className="font-bold text-foreground flex items-center gap-2">
                          <Badge variant="secondary" className="font-bold">
                            {slot.day}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{getTimeSlotLabel(slot)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 font-bold text-foreground">
                        {subject?.name || "Subject"}
                        <div className="text-xs text-muted-foreground font-normal">{subject?.code}</div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-xs font-semibold text-foreground">
                        {cls?.name || "Class"}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-xs font-medium text-muted-foreground">
                        {slot.room || cls?.room || "TBA"}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-xs font-medium text-foreground">
                        {teacher?.name || "Unassigned"}
                      </TableCell>
                      <TableCell className="px-5 py-4">
                        <Badge variant="outline">
                          {slot.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => setModalState({ isOpen: true, data: slot })}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              setDeleteConfirm({
                                isOpen: true,
                                scheduleId: slot.id
                              })
                            }
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card>
      )}

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
      />

      {/* Proof that this page reads from the same DataStore singleton as the Subjects page */}
      <p className="text-[11px] text-muted-foreground text-center">
        {SCHOOL_INFO.getTitle()} · Data source: DataStore singleton ({DataStore.getInstance().schedules.length} schedules) ·
        same instance every time: {isSingletonStore ? "yes" : "no"}
      </p>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, scheduleId: null })}
        onConfirm={() => deleteSchedule(deleteConfirm.scheduleId)}
        title="Remove Timetable Slot"
        message="Are you sure you want to remove this timetable schedule slot?"
        confirmLabel="Remove Slot"
      />
    </div>
  );
}
