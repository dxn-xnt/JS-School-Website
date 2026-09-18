import React, { useState, useEffect } from "react";
import { Modal, Button } from "../common/UIComponents";
import { useSchool } from "../../context/SchoolContext";
import { GRADE_LEVELS } from "../../data";

export function StudentModal({ isOpen, onClose, initialData = null }) {
  const { classes, addStudent, editStudent } = useSchool();
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: GRADE_LEVELS[0],
    gender: "Male",
    status: "Active",
    attendanceRate: 95.0,
    gpa: 3.5,
    phone: "",
    guardianName: "",
    address: "",
    enrolledClassIds: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        grade: initialData.grade || GRADE_LEVELS[0],
        gender: initialData.gender || "Male",
        status: initialData.status || "Active",
        attendanceRate: initialData.attendanceRate ?? 95.0,
        gpa: initialData.gpa ?? 3.5,
        phone: initialData.contact?.phone || "",
        guardianName: initialData.contact?.guardianName || "",
        address: initialData.contact?.address || "",
        enrolledClassIds: initialData.enrolledClassIds || []
      });
    } else {
      setFormData({
        name: "",
        email: "",
        grade: GRADE_LEVELS[0],
        gender: "Male",
        status: "Active",
        attendanceRate: 95.0,
        gpa: 3.5,
        phone: "",
        guardianName: "",
        address: "",
        enrolledClassIds: []
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassToggle = (classId) => {
    setFormData((prev) => {
      const exists = prev.enrolledClassIds.includes(classId);
      return {
        ...prev,
        enrolledClassIds: exists
          ? prev.enrolledClassIds.filter((id) => id !== classId)
          : [...prev.enrolledClassIds, classId]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (isEditing) {
      editStudent(initialData.id, formData);
    } else {
      addStudent(formData);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Student Profile" : "Register New Student"}
      description={
        isEditing
          ? "Update student academic records, guardian contacts, and enrollments."
          : "Add a new student profile and allocate to active school classes."
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Benjamin Scott"
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
              placeholder="e.g. ben.scott@student.evergreen.edu"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Grade Level
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {GRADE_LEVELS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Academic Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Probation">Probation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Attendance Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              name="attendanceRate"
              value={formData.attendanceRate}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Current GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Guardian & Contact info (Nested Object Demo) */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50 dark:bg-slate-950/40 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Guardian & Emergency Contact
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Guardian Name
              </label>
              <input
                type="text"
                name="guardianName"
                placeholder="Parent or Guardian"
                value={formData.guardianName}
                onChange={handleChange}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Residential Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Street Address, City"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Enrolled Classes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Enroll in Classes ({formData.enrolledClassIds.length} selected)
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950/40">
            {classes.map((cls) => {
              const isSelected = formData.enrolledClassIds.includes(cls.id);
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => handleClassToggle(cls.id)}
                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg font-medium transition-all border ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="truncate font-semibold">{cls.name}</div>
                  <div className={`text-[10px] ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                    {cls.grade} • {cls.room}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? "Save Profile" : "Register Student"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
