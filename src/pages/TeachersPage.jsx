import React, { useState, useMemo } from "react";
import { useSchool } from "../context/SchoolContext";
import {
  Button,
  Badge,
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
  BookOpen,
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
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Faculty & Educator Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage certified instructors, teaching assignments, subject specialties, and departments.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setModalState({ isOpen: true, data: null })}
        >
          Add Faculty Teacher
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
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
            // Assigned classes
            const assignedClasses = classes.filter((c) =>
              teacher.assignedClassIds?.includes(c.id) || c.teacherId === teacher.id
            );

            return (
              <div
                key={teacher.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {teacher.name}
                        </h3>
                        <Badge size="sm" variant="purple">
                          {teacher.department}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Qualification & Experience */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-start gap-2">
                      <Award className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="leading-tight font-medium text-slate-700 dark:text-slate-300">
                        {teacher.qualification || "Faculty Degree"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{teacher.experienceYears} Years Academic Experience</span>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950/40 p-2.5 text-xs space-y-1 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{teacher.phone || "+1 (555) 000-0000"}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  {teacher.subjectSpecialties && teacher.subjectSpecialties.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Subject Specialties
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {teacher.subjectSpecialties.map((spec) => (
                          <span
                            key={spec}
                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Assigned Classes */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Assigned Class Cohorts
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {assignedClasses.length === 0 ? (
                        <span className="text-xs text-slate-400 italic">No assigned classes</span>
                      ) : (
                        assignedClasses.map((cls) => (
                          <button
                            key={cls.id}
                            onClick={() => navigateTo("class-details", cls.id)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors border border-blue-200 dark:border-blue-900"
                          >
                            <GraduationCap className="w-3 h-3" />
                            <span>{cls.name}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Edit2}
                    onClick={() => setModalState({ isOpen: true, data: teacher })}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900"
                    icon={Trash2}
                    onClick={() =>
                      setDeleteConfirm({
                        isOpen: true,
                        teacherId: teacher.id,
                        teacherName: teacher.name
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
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
