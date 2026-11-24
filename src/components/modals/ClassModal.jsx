import React, { useState, useEffect } from "react";
import { Modal } from "../common/UIComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSchool } from "../../context/SchoolContext";
import { GRADE_LEVELS } from "../../data";

export function ClassModal({ isOpen, onClose, initialData = null }) {
  const { teachers, subjects, addClass, editClass } = useSchool();
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    grade: GRADE_LEVELS[0],
    room: "",
    capacity: 25,
    teacherId: "",
    subjectIds: [],
    description: "",
    semester: "Spring 2026"
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        code: initialData.code || "",
        grade: initialData.grade || GRADE_LEVELS[0],
        room: initialData.room || "",
        capacity: initialData.capacity || 25,
        teacherId: initialData.teacherId || "",
        subjectIds: initialData.subjectIds || [],
        description: initialData.description || "",
        semester: initialData.metadata?.semester || "Spring 2026"
      });
    } else {
      setFormData({
        name: "",
        code: "",
        grade: GRADE_LEVELS[0],
        room: "",
        capacity: 25,
        teacherId: "",
        subjectIds: [],
        description: "",
        semester: "Spring 2026"
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subjectId) => {
    setFormData((prev) => {
      const exists = prev.subjectIds.includes(subjectId);
      return {
        ...prev,
        subjectIds: exists
          ? prev.subjectIds.filter((id) => id !== subjectId)
          : [...prev.subjectIds, subjectId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (isEditing) {
      editClass(initialData.id, formData);
    } else {
      addClass(formData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Class Details" : "Create New Class"}
      description={
        isEditing
          ? "Update class specifications, assigned faculty, and capacity."
          : "Define class section, assigned teacher, and student capacity limit."
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Class Name *
            </label>
            <Input
              type="text"
              name="name"
              required
              placeholder="e.g. Grade 10-A (Honors STEM)"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Class Code
            </label>
            <Input
              type="text"
              name="code"
              placeholder="e.g. G10-A"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Grade Level
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {GRADE_LEVELS.map((g) => (
                <option key={g} value={g} className="bg-background text-foreground">
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Assigned Room
            </label>
            <Input
              type="text"
              name="room"
              placeholder="e.g. Science Wing 301"
              value={formData.room}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Max Student Capacity
            </label>
            <Input
              type="number"
              name="capacity"
              min="5"
              max="50"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Lead Class Teacher
          </label>
          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
          >
            <option value="" className="bg-background text-foreground">-- No Lead Teacher Assigned --</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id} className="bg-background text-foreground">
                {t.name} ({t.department})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Course Description
          </label>
          <textarea
            name="description"
            rows="2"
            placeholder="Brief overview of curriculum or cohort focus..."
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-transparent p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-2">
            Assign Initial Subjects ({formData.subjectIds.length} selected)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto p-2 border border-border rounded-xl bg-muted/30">
            {subjects.map((sbj) => {
              const isSelected = formData.subjectIds.includes(sbj.id);
              return (
                <button
                  key={sbj.id}
                  type="button"
                  onClick={() => handleSubjectToggle(sbj.id)}
                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg font-medium transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-card text-foreground border-border hover:bg-muted"
                  }`}
                >
                  <div className="truncate font-semibold">{sbj.name}</div>
                  <div className={`text-[10px] ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {sbj.code} • {sbj.credits} cr
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm">
            {isEditing ? "Save Changes" : "Create Class"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
