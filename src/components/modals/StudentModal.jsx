import React, { useState, useEffect } from "react";
import { Modal } from "../common/UIComponents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
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
    phone: "",
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
        phone: initialData.contact?.phone || "",
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
        phone: "",
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
          ? "Update student academic records, contact info, and class enrollments."
          : "Add a new student profile and allocate to active school classes."
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Full Name *
            </label>
            <Input
              type="text"
              name="name"
              required
              placeholder="e.g. Benjamin Scott"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              placeholder="e.g. ben.scott@student.evergreen.edu"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Grade Level
            </label>
            <Select
              value={formData.grade}
              onValueChange={(val) => val && setFormData((prev) => ({ ...prev, grade: val }))}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {GRADE_LEVELS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Gender
            </label>
            <Select
              value={formData.gender}
              onValueChange={(val) => val && setFormData((prev) => ({ ...prev, gender: val }))}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Academic Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(val) => val && setFormData((prev) => ({ ...prev, status: val }))}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Probation">Probation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Contact info (Nested Object Demo) */}
        <div className="rounded-xl border border-border p-3.5 bg-muted/30 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Contact & Address Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Contact Phone
              </label>
              <Input
                type="text"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                Residential Address
              </label>
              <Input
                type="text"
                name="address"
                placeholder="Street Address, City"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Enrolled Classes */}
        {/* <div>
          <label className="block text-xs font-semibold text-foreground mb-2">
            Enroll in Classes ({formData.enrolledClassIds.length} selected)
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border border-border rounded-xl bg-muted/30">
            {classes.map((cls) => {
              const isSelected = formData.enrolledClassIds.includes(cls.id);
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => handleClassToggle(cls.id)}
                  className={`px-2.5 py-1.5 text-xs text-left rounded-lg font-medium transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-card text-foreground border-border hover:bg-muted"
                  }`}
                >
                  <div className="truncate font-semibold">{cls.name}</div>
                  <div className={`text-[10px] ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {cls.grade} • {cls.room}
                  </div>
                </button>
              );
            })}
          </div>
        </div> */}

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm">
            {isEditing ? "Save Profile" : "Register Student"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
