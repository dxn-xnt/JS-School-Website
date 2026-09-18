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
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Clock,
  Award,
  Layers
} from "lucide-react";
import { SubjectModal } from "../components/modals/SubjectModal";
import { DEPARTMENTS } from "../data";

export function SubjectsPage() {
  const {
    subjects,
    classes,
    deleteSubject,
    navigateTo,
    searchQuery: globalSearch
  } = useSchool();

  const [localSearch, setLocalSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");

  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, subjectId: null, subjectName: "" });

  const activeSearch = localSearch || globalSearch;

  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      if (deptFilter !== "ALL" && s.department !== deptFilter) return false;

      if (activeSearch.trim()) {
        const query = activeSearch.toLowerCase().trim();
        const matchesName = s.name.toLowerCase().includes(query);
        const matchesCode = s.code.toLowerCase().includes(query);
        const matchesDept = s.department.toLowerCase().includes(query);
        const matchesDesc = s.description?.toLowerCase().includes(query);

        return matchesName || matchesCode || matchesDept || matchesDesc;
      }

      return true;
    });
  }, [subjects, deptFilter, activeSearch]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            Subject & Curriculum Catalog
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure academic courses, credits, weekly hours, and department curricula.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setModalState({ isOpen: true, data: null })}
        >
          Add Course Subject
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="w-full sm:w-80">
          <SearchInput
            value={localSearch}
            onChange={setLocalSearch}
            placeholder="Search subjects by title or code..."
          />
        </div>

        <div className="w-full sm:w-56">
          <SelectFilter
            value={deptFilter}
            onChange={setDeptFilter}
            label="All Departments"
            options={DEPARTMENTS}
          />
        </div>
      </div>

      {/* Subject Cards */}
      {filteredSubjects.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No Subjects Found"
          description="No curriculum subjects found matching your active filter or search terms."
          actionLabel="Create Subject"
          onAction={() => setModalState({ isOpen: true, data: null })}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((subject) => {
            const assignedClasses = classes.filter((c) =>
              c.subjectIds?.includes(subject.id)
            );

            return (
              <div
                key={subject.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge size="sm" variant="purple">
                      {subject.code}
                    </Badge>
                    <Badge size="sm" variant="default">
                      {subject.department}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {subject.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {subject.description || "Course curriculum and learning objectives."}
                  </p>

                  {/* Credits & Hours pill */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>{subject.credits} Credit Units</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{subject.weeklyHours} Hrs / Week</span>
                    </div>
                  </div>

                  {/* Taught in Classes */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Taught in Classes ({assignedClasses.length})
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

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Edit2}
                    onClick={() => setModalState({ isOpen: true, data: subject })}
                  >
                    Edit Course
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900"
                    icon={Trash2}
                    onClick={() =>
                      setDeleteConfirm({
                        isOpen: true,
                        subjectId: subject.id,
                        subjectName: subject.name
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

      {/* Subject Modal */}
      <SubjectModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, subjectId: null, subjectName: "" })}
        onConfirm={() => deleteSubject(deleteConfirm.subjectId)}
        title="Delete Subject Course"
        message={`Are you sure you want to delete "${deleteConfirm.subjectName}"? It will be removed from all class section curricula.`}
        confirmLabel="Delete Subject"
      />
    </div>
  );
}
