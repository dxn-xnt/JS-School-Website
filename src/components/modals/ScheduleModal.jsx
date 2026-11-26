import React, { useState, useEffect } from "react";
import { Modal } from "../common/UIComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSchool } from "../../context/SchoolContext";
import { WEEKDAYS, SCHEDULE_TIME_SLOTS, getTimeSlotLabel } from "../../data";

export function ScheduleModal({ isOpen, onClose, initialData = null, defaultClassId = null }) {
  const { classes, subjects, teachers, addSchedule, editSchedule } = useSchool();
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    classId: defaultClassId || (classes[0]?.id ?? ""),
    subjectId: subjects[0]?.id ?? "",
    teacherId: teachers[0]?.id ?? "",
    day: WEEKDAYS[0],
    startTime: SCHEDULE_TIME_SLOTS[0],
    room: "",
    type: "Lecture"
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        classId: initialData.classId || (classes[0]?.id ?? ""),
        subjectId: initialData.subjectId || (subjects[0]?.id ?? ""),
        teacherId: initialData.teacherId || "",
        day: initialData.day || WEEKDAYS[0],
        startTime: initialData.time ? getTimeSlotLabel(initialData) : SCHEDULE_TIME_SLOTS[0],
        room: initialData.room || "",
        type: initialData.type || "Lecture"
      });
    } else {
      setFormData({
        classId: defaultClassId || (classes[0]?.id ?? ""),
        subjectId: subjects[0]?.id ?? "",
        teacherId: teachers[0]?.id ?? "",
        day: WEEKDAYS[0],
        startTime: SCHEDULE_TIME_SLOTS[0],
        room: "",
        type: "Lecture"
      });
    }
  }, [initialData, defaultClassId, isOpen, classes, subjects, teachers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.classId || !formData.subjectId) return;

    if (isEditing) {
      editSchedule(initialData.id, formData);
    } else {
      addSchedule(formData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Timetable Schedule" : "Add Schedule Slot"}
      description={
        isEditing
          ? "Update the timetable slot day, time, assigned room, and instructor."
          : "Schedule a class lecture, lab, or tutorial into the weekly school timetable."
      }
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Class Section *
            </label>
            <select
              name="classId"
              required
              value={formData.classId}
              onChange={handleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id} className="bg-background text-foreground">
                  {c.name} ({c.grade})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Subject Course *
            </label>
            <select
              name="subjectId"
              required
              value={formData.subjectId}
              onChange={handleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id} className="bg-background text-foreground">
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Day of the Week
            </label>
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {WEEKDAYS.map((day) => (
                <option key={day} value={day} className="bg-background text-foreground">
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Time Period
            </label>
            <select
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {SCHEDULE_TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot} className="bg-background text-foreground">
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Instructor / Teacher
            </label>
            <select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              <option value="" className="bg-background text-foreground">-- No Teacher --</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id} className="bg-background text-foreground">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Room / Lab
            </label>
            <Input
              type="text"
              name="room"
              placeholder="e.g. Lab 202"
              value={formData.room}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Session Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              <option value="Lecture" className="bg-background text-foreground">Lecture</option>
              <option value="Lab Practical" className="bg-background text-foreground">Lab Practical</option>
              <option value="Tutorial" className="bg-background text-foreground">Tutorial</option>
              <option value="Seminar" className="bg-background text-foreground">Seminar</option>
              <option value="Studio Workshop" className="bg-background text-foreground">Studio Workshop</option>
              <option value="Physical Session" className="bg-background text-foreground">Physical Session</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm">
            {isEditing ? "Save Slot" : "Add Schedule"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
