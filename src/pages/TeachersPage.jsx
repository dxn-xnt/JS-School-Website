import React, { useState, useMemo } from "react";
import { useSchool } from "../context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SearchInput,
  SelectFilter,
  EmptyState,
  ConfirmDialog
} from "../components/common/UIComponents";
import {
  UserCheck,
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Mail,
  Phone,
  Award,
  Clock
} from "lucide-react";
import { TeacherModal } from "../components/modals/TeacherModal";
import { DEPARTMENTS } from "../data";

export function TeachersPage() {
  const {
    teachers,
    classes,
    deleteTeacher,
    navigateTo,
    searchQuery: globalSearch
  } = useSchool();

  const [localSearch, setLocalSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");

  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, teacherId: null, teacherName: "" });

  const activeSearch = localSearch || globalSearch;

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      if (deptFilter !== "ALL" && t.department !== deptFilter) return false;

      if (activeSearch.trim()) {
        const query = activeSearch.toLowerCase().trim();
        const matchesName = t.name.toLowerCase().includes(query);
        const matchesEmail = t.email.toLowerCase().includes(query);
        const matchesSpecialty = t.subjectSpecialties?.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchesQual = t.qualification?.toLowerCase().includes(query);

        return matchesName || matchesEmail || matchesSpecialty || matchesQual;
      }

      return true;
    });
  }, [teachers, deptFilter, activeSearch]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-primary" />
            Faculty & Educator Directory
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage certified instructors, teaching assignments, subject specialties, and departments.
          </p>
        </div>

        <Button
          variant="default"
          onClick={() => setModalState({ isOpen: true, data: null })}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Teacher</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="w-full sm:w-80">
            <SearchInput
              value={localSearch}
              onChange={setLocalSearch}
              placeholder="Search teacher by name, degree, or specialty..."
            />
          </div>

          <div className="w-full sm:w-56">
            <SelectFilter
              value={deptFilter}
              onChange={setDeptFilter}
              label="All Academic Departments"
              options={DEPARTMENTS}
            />
          </div>
        </div>
      </Card>

      {/* Teachers Grid */}
      {filteredTeachers.length === 0 ? (
        <EmptyState
          icon={UserCheck}
          title="No Teachers Found"
          description="No faculty members matched your selected department or search query."
          actionLabel="Add Faculty Teacher"
          onAction={() => setModalState({ isOpen: true, data: null })}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTeachers.map((teacher) => {
            const assignedClasses = classes.filter((c) =>
              teacher.assignedClassIds?.includes(c.id) || c.teacherId === teacher.id
            );

            return (
              <Card
                key={teacher.id}
                className="p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar size="lg">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-base">
                          {teacher.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-base font-bold text-foreground">
                          {teacher.name}
                        </h3>
                        <Badge variant="secondary">
                          {teacher.department}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Qualification & Experience */}
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Award className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="leading-tight font-medium text-foreground">
                        {teacher.qualification || "Faculty Degree"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{teacher.experienceYears} Years Academic Experience</span>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="rounded-xl bg-muted/40 p-2.5 text-xs space-y-1 border border-border">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{teacher.phone || "+1 (555) 000-0000"}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  {teacher.subjectSpecialties && teacher.subjectSpecialties.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                        Subject Specialties
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjectSpecialties.map((spec) => (
                          <Badge
                            key={spec}
                            variant="outline"
                            className="text-[11px] font-medium"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assigned Classes */}
                  {/* <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                      Assigned Class Cohorts
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {assignedClasses.length === 0 ? (
                        <span className="text-xs text-muted-foreground italic">No assigned classes</span>
                      ) : (
                        assignedClasses.map((cls) => (
                          <button
                            key={cls.id}
                            onClick={() => navigateTo("class-details", cls.id)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20 cursor-pointer"
                          >
                            <GraduationCap className="w-3 h-3" />
                            <span>{cls.name}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div> */}
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-border flex justify-end gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setModalState({ isOpen: true, data: teacher })}
                    className="gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 gap-1 border-destructive/30"
                    onClick={() =>
                      setDeleteConfirm({
                        isOpen: true,
                        teacherId: teacher.id,
                        teacherName: teacher.name
                      })
                    }
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Teacher Modal */}
      <TeacherModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, teacherId: null, teacherName: "" })}
        onConfirm={() => deleteTeacher(deleteConfirm.teacherId)}
        title="Remove Faculty Teacher"
        message={`Are you sure you want to remove "${deleteConfirm.teacherName}" from the faculty directory?`}
        confirmLabel="Remove Teacher"
      />
    </div>
  );
}
