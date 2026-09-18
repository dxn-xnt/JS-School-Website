import React, { useState, useMemo } from "react";
import { useSchool } from "../context/SchoolContext";
import {
  Button,
  Badge,
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
  UserCheck,
  GraduationCap
} from "lucide-react";
import { ScheduleModal } from "../components/modals/ScheduleModal";
import { WEEKDAYS, SCHEDULE_TIME_SLOTS } from "../data";

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

  const [viewMode, setViewMode] = useState("timetable"); // 'timetable' | 'list'
  const [dayFilter, setDayFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");
  const [subjectFilter, setSubjectFilter] = useState("ALL");

  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, scheduleId: null });

  // Filter schedules
  const filteredSchedules = useMemo(() => {
    return schedules.filter((sch) => {
      if (dayFilter !== "ALL" && sch.day !== dayFilter) return false;
      if (classFilter !== "ALL" && sch.classId !== classFilter) return false;
      if (subjectFilter !== "ALL" && sch.subjectId !== subjectFilter) return false;
      return true;
    });
  }, [schedules, dayFilter, classFilter, subjectFilter]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            School Weekly Schedules & Timetable
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Coordinate weekly periods, room allocations, instructor assignments, and cohort timelines.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setModalState({ isOpen: true, data: null })}
        >
          Add Timetable Slot
        </Button>
      </div>

      {/* Filter and View Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
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
            options={subjects.map((s) => ({ value: s.id, label: `${s.code} - ${s.name}` }))}
          />
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 p-1 rounded-xl bg-slate-50 dark:bg-slate-950/40 shrink-0 self-end md:self-auto">
          <button
            onClick={() => setViewMode("timetable")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "timetable"
                ? "bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Weekly Matrix</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "list"
                ? "bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-xs"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* TIMETABLE MATRIX VIEW */}
      {/* -------------------------------------------------------------------- */}
      {viewMode === "timetable" ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-sm border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="p-4 w-36 border-r border-slate-200 dark:border-slate-800">
                  Time Period
                </th>
                {WEEKDAYS.map((day) => (
                  <th
                    key={day}
                    className={`p-4 border-r border-slate-200 dark:border-slate-800 last:border-r-0 ${
                      dayFilter !== "ALL" && dayFilter !== day ? "opacity-40" : ""
                    }`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {SCHEDULE_TIME_SLOTS.map((timeSlot) => (
                <tr key={timeSlot} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20">
                  {/* Time slot column */}
                  <td className="p-3.5 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 font-semibold text-xs text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{timeSlot}</span>
                    </div>
                  </td>

                  {/* Days columns */}
                  {WEEKDAYS.map((day) => {
                    // Match schedules in this cell
                    const matchingSlots = filteredSchedules.filter(
                      (s) => s.day === day && s.startTime === timeSlot
                    );

                    const isDimmed = dayFilter !== "ALL" && dayFilter !== day;

                    return (
                      <td
                        key={day}
                        className={`p-2.5 border-r border-slate-200 dark:border-slate-800 last:border-r-0 align-top min-w-[170px] ${
                          isDimmed ? "opacity-30" : ""
                        }`}
                      >
                        {matchingSlots.length === 0 ? (
                          <div className="h-14 rounded-xl border border-dashed border-slate-100 dark:border-slate-800/60 flex items-center justify-center text-[11px] text-slate-300 dark:text-slate-700">
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
                                  className="group rounded-xl p-2.5 border border-blue-100 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40 text-xs space-y-1.5 relative shadow-2xs hover:shadow-xs transition-all"
                                >
                                  <div className="flex items-start justify-between gap-1">
                                    <span className="font-bold text-slate-900 dark:text-white leading-tight">
                                      {subject?.name || "Subject"}
                                    </span>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => setModalState({ isOpen: true, data: slot })}
                                        className="p-1 rounded text-slate-500 hover:text-blue-600"
                                        title="Edit Slot"
                                      >
                                        <Edit2 className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          setDeleteConfirm({
                                            isOpen: true,
                                            scheduleId: slot.id
                                          })
                                        }
                                        className="p-1 rounded text-slate-500 hover:text-rose-600"
                                        title="Delete Slot"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                                    <GraduationCap className="w-3 h-3" />
                                    <span className="truncate">{cls?.name || "Class"}</span>
                                  </div>

                                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
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
      ) : (
        /* ------------------------------------------------------------------ */
        /* LIST / TABLE VIEW */
        /* ------------------------------------------------------------------ */
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          {filteredSchedules.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No Schedule Slots"
              description="No timetable slots matched your active filters."
              actionLabel="Add Schedule Slot"
              onAction={() => setModalState({ isOpen: true, data: null })}
            />
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Day & Time</th>
                  <th className="px-5 py-3.5">Subject</th>
                  <th className="px-5 py-3.5">Class Section</th>
                  <th className="px-5 py-3.5">Classroom</th>
                  <th className="px-5 py-3.5">Instructor</th>
                  <th className="px-5 py-3.5">Session Type</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSchedules.map((slot) => {
                  const cls = getClassById(slot.classId);
                  const subject = getSubjectById(slot.subjectId);
                  const teacher = getTeacherById(slot.teacherId);

                  return (
                    <tr
                      key={slot.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold">
                            {slot.day}
                          </span>
                          <span className="text-xs text-slate-500">{slot.startTime}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                        {subject?.name || "Subject"}
                        <div className="text-xs text-slate-400 font-normal">{subject?.code}</div>
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {cls?.name || "Class"}
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                        {slot.room || cls?.room || "TBA"}
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-slate-800 dark:text-slate-200">
                        {teacher?.name || "Unassigned"}
                      </td>
                      <td className="px-5 py-4">
                        <Badge size="sm" variant="purple">
                          {slot.type}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => setModalState({ isOpen: true, data: slot })}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirm({
                                isOpen: true,
                                scheduleId: slot.id
                              })
                            }
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
      />

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
