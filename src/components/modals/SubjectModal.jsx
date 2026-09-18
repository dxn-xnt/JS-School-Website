import React, { useState, useEffect } from "react";
import { Modal, Button } from "../common/UIComponents";
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
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Subject Name *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Advanced Mathematics"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Course Code *
            </label>
            <input
              type="text"
              name="code"
              required
              placeholder="e.g. MATH-101"
              value={formData.code}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Credit Units
            </label>
            <input
              type="number"
              name="credits"
              min="1"
              max="10"
              value={formData.credits}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Weekly Hours
            </label>
            <input
              type="number"
              name="weeklyHours"
              min="1"
              max="15"
              value={formData.weeklyHours}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Syllabus & Course Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Brief overview of course topics, prerequisites, and learning outcomes..."
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? "Save Subject" : "Create Subject"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
