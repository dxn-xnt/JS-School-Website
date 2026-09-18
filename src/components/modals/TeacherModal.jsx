import React, { useState, useEffect } from "react";
import { Modal, Button } from "../common/UIComponents";
import { useSchool } from "../../context/SchoolContext";
import { DEPARTMENTS } from "../../data";

export function TeacherModal({ isOpen, onClose, initialData = null }) {
  const { addTeacher, editTeacher } = useSchool();
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: DEPARTMENTS[0],
    qualification: "",
    specialtiesString: "",
    experienceYears: 5,
    status: "Active"
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        department: initialData.department || DEPARTMENTS[0],
        qualification: initialData.qualification || "",
        specialtiesString: Array.isArray(initialData.subjectSpecialties)
          ? initialData.subjectSpecialties.join(", ")
          : "",
        experienceYears: initialData.experienceYears || 5,
        status: initialData.status || "Active"
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: DEPARTMENTS[0],
        qualification: "",
        specialtiesString: "",
        experienceYears: 5,
        status: "Active"
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const formattedData = {
      ...formData,
      subjectSpecialties: formData.specialtiesString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    };

    if (isEditing) {
      editTeacher(initialData.id, formattedData);
    } else {
      addTeacher(formattedData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Faculty Teacher" : "Add Faculty Teacher"}
      description={
        isEditing
          ? "Update teacher qualifications, department, and contact info."
          : "Register a new educator into the faculty roster."
      }
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Teacher Name *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Dr. Eleanor Vance"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. e.vance@evergreen.edu"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Academic Department
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
              Years of Experience
            </label>
            <input
              type="number"
              name="experienceYears"
              min="0"
              max="50"
              value={formData.experienceYears}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Academic Qualification & Degree
          </label>
          <input
            type="text"
            name="qualification"
            placeholder="e.g. Ph.D. in Applied Mathematics (MIT)"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Subject Specialties (comma-separated)
          </label>
          <input
            type="text"
            name="specialtiesString"
            placeholder="e.g. Advanced Calculus, Linear Algebra, Geometry"
            value={formData.specialtiesString}
            onChange={handleChange}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Contact Phone
            </label>
            <input
              type="text"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Faculty Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active Faculty</option>
              <option value="Sabbatical">On Sabbatical</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? "Save Faculty Info" : "Add Teacher"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
