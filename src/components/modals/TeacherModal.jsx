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
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Teacher Name *
            </label>
            <Input
              type="text"
              name="name"
              required
              placeholder="e.g. Dr. Eleanor Vance"
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
              placeholder="e.g. e.vance@evergreen.edu"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Academic Department
            </label>
            <Select
              value={formData.department}
              onValueChange={(val) => val && setFormData((prev) => ({ ...prev, department: val }))}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Years of Experience
            </label>
            <Input
              type="number"
              name="experienceYears"
              min="0"
              max="50"
              value={formData.experienceYears}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Academic Qualification & Degree
          </label>
          <Input
            type="text"
            name="qualification"
            placeholder="e.g. Ph.D. in Applied Mathematics (MIT)"
            value={formData.qualification}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">
            Subject Specialties (comma-separated)
          </label>
          <Input
            type="text"
            name="specialtiesString"
            placeholder="e.g. Advanced Calculus, Linear Algebra, Geometry"
            value={formData.specialtiesString}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
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
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Faculty Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(val) => val && setFormData((prev) => ({ ...prev, status: val }))}
            >
              <SelectTrigger className="w-full h-8">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active Faculty</SelectItem>
                <SelectItem value="Sabbatical">On Sabbatical</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm">
            {isEditing ? "Save Faculty Info" : "Add Teacher"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
