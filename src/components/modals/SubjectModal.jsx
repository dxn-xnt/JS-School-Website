import React, { useState, useEffect } from "react";
import { Modal } from "../common/UIComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSchool } from "../../context/SchoolContext";
import { DEPARTMENTS } from "../../data";

export function SubjectModal({ isOpen, onClose, initialData = null }) {
  const { addSubject, editSubject } = useSchool();
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    department: DEPARTMENTS[0],
    credits: 3,
    weeklyHours: 4,
    description: "",
    color: "from-blue-500 to-indigo-600"
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || "",
        name: initialData.name || "",
        department: initialData.department || DEPARTMENTS[0],
        credits: initialData.credits || 3,
        weeklyHours: initialData.weeklyHours || 4,
        description: initialData.description || "",
        color: initialData.color || "from-blue-500 to-indigo-600"
      });
    } else {
      setFormData({
        code: "",
        name: "",
        department: DEPARTMENTS[0],
        credits: 3,
        weeklyHours: 4,
        description: "",
        color: "from-blue-500 to-indigo-600"
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) return;

    if (isEditing) {
      editSubject(initialData.id, formData);
    } else {
      addSubject(formData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Subject Course" : "Create New Subject"}
      description={
        isEditing
          ? "Modify course curriculum credits, department, and weekly hours."
          : "Add a new course syllabus to the school's subject catalog."
      }
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Subject Name *
            </label>
            <Input
              type="text"
              name="name"
              required
              placeholder="e.g. Advanced Mathematics"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Course Code *
            </label>
            <Input
              type="text"
              name="code"
              required
              placeholder="e.g. MATH-101"
              value={formData.code}
              onChange={handleChange}
              className="uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-foreground focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept} className="bg-background text-foreground">
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Credit Units
            </label>
            <Input
              type="number"
              name="credits"
              min="1"
              max="10"
              value={formData.credits}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Weekly Hours
            </label>
            <Input
              type="number"
              name="weeklyHours"
              min="1"
              max="15"
              value={formData.weeklyHours}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Syllabus & Course Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Brief overview of course topics, prerequisites, and learning outcomes..."
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-input bg-transparent p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm">
            {isEditing ? "Save Subject" : "Create Subject"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
