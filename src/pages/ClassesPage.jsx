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
  GraduationCap,
  Plus,
  LayoutGrid,
  List,
  Edit2,
  Archive,
  RotateCcw,
  Trash2,
  Users,
  BookOpen,
  ArrowRight,
  UserCheck
} from "lucide-react";
import { ClassModal } from "../components/modals/ClassModal";
import { GRADE_LEVELS } from "../data";

export function ClassesPage() {
  const {
    classes,
    teachers,
    navigateTo,
    toggleArchiveClass,
    deleteClass,
    getTeacherById,
    getEnrolledStudentsForClass,
    searchQuery: globalSearch
  } = useSchool();

  const [localSearch, setLocalSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ACTIVE"); // 'ALL' | 'ACTIVE' | 'ARCHIVED'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'

  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, classId: null, className: "" });

  const activeSearch = localSearch || globalSearch;

  // 8. TYPES OF FUNCTIONS: Filter higher order memoization
  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      // Status filter
      if (statusFilter === "ACTIVE" && cls.isArchived) return false;
      if (statusFilter === "ARCHIVED" && !cls.isArchived) return false;

      // Grade filter
      if (gradeFilter !== "ALL" && cls.grade !== gradeFilter) return false;

      // Search filter
      if (activeSearch.trim()) {
        const query = activeSearch.toLowerCase().trim();
        const teacher = getTeacherById(cls.teacherId);
        const matchesName = cls.name.toLowerCase().includes(query);
        const matchesCode = cls.code?.toLowerCase().includes(query);
        const matchesRoom = cls.room?.toLowerCase().includes(query);
        const matchesTeacher = teacher?.name?.toLowerCase().includes(query);

        return matchesName || matchesCode || matchesRoom || matchesTeacher;
      }

      return true;
    });
  }, [classes, gradeFilter, statusFilter, activeSearch, getTeacherById]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Class Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Create and maintain academic class sections, teacher assignments, and rosters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setModalState({ isOpen: true, data: null })}
          >
            Create Class Section
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-2.5">
          <div className="w-full sm:w-72">
            <SearchInput
              value={localSearch}
              onChange={setLocalSearch}
              placeholder="Search by name, room, or code..."
            />
          </div>

          <div className="w-full sm:w-40">
            <SelectFilter
              value={gradeFilter}
              onChange={setGradeFilter}
              label="All Grade Levels"
              options={GRADE_LEVELS}
            />
          </div>

          <div className="w-full sm:w-36">
            <SelectFilter
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "ALL", label: "All Statuses" },
                { value: "ACTIVE", label: "Active Only" },
                { value: "ARCHIVED", label: "Archived Only" }
              ]}
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 p-1 rounded-xl bg-slate-50 dark:bg-slate-950/40 shrink-0 self-end md:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "grid"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "table"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Class Content Area */}
      {filteredClasses.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No Classes Found"
          description="No class sections matched your active search and filter criteria."
          actionLabel="Create New Class"
          onAction={() => setModalState({ isOpen: true, data: null })}
        />
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((cls) => {
            const leadTeacher = getTeacherById(cls.teacherId);
            const enrolled = getEnrolledStudentsForClass(cls.id);
            const capacityRatio = Math.round((enrolled.length / cls.capacity) * 100);

            return (
              <div
                key={cls.id}
                className={`rounded-2xl border bg-white dark:bg-slate-900 p-5 shadow-xs transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                  cls.isArchived
                    ? "border-amber-200 dark:border-amber-900/40 opacity-75 bg-amber-50/20"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge size="sm" variant={cls.isArchived ? "warning" : "primary"}>
                          {cls.grade}
                        </Badge>
                        <Badge size="sm" variant="outline">
                          {cls.code}
                        </Badge>
                        {cls.isArchived && (
                          <Badge size="sm" variant="warning">
                            Archived
                          </Badge>
                        )}
                      </div>
                      <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                        {cls.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Room: <span className="font-semibold text-slate-700 dark:text-slate-300">{cls.room}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {cls.description || "Curriculum program and student cohort."}
                  </p>

                  {/* Teacher & Subjects Pills */}
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-950/40 p-3 space-y-2 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Lead Teacher:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">
                        {leadTeacher?.name || "Unassigned"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-medium">Subjects Taught:</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {cls.subjectIds?.length || 0} Courses
                      </span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        Class Capacity
                      </span>
                      <span className="text-slate-900 dark:text-white">
                        {enrolled.length} / {cls.capacity} students ({capacityRatio}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          capacityRatio >= 100
                            ? "bg-rose-500"
                            : capacityRatio >= 80
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(capacityRatio, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => navigateTo("class-details", cls.id)}
                  >
                    View Details
                  </Button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setModalState({ isOpen: true, data: cls })}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit Class"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleArchiveClass(cls.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title={cls.isArchived ? "Restore Class" : "Archive Class"}
                    >
                      {cls.isArchived ? (
                        <RotateCcw className="w-4 h-4" />
                      ) : (
                        <Archive className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        setDeleteConfirm({
                          isOpen: true,
                          classId: cls.id,
                          className: cls.name
                        })
                      }
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete Class"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-950/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Class Section</th>
                <th className="px-5 py-3.5">Grade</th>
                <th className="px-5 py-3.5">Room</th>
                <th className="px-5 py-3.5">Lead Teacher</th>
                <th className="px-5 py-3.5">Enrollment</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredClasses.map((cls) => {
                const leadTeacher = getTeacherById(cls.teacherId);
                const enrolled = getEnrolledStudentsForClass(cls.id);

                return (
                  <tr
                    key={cls.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {cls.name}
                        </span>
                        <div className="text-xs text-slate-400">{cls.code}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge size="sm" variant="default">
                        {cls.grade}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {cls.room}
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                        {leadTeacher?.name || "Unassigned"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        {enrolled.length} / {cls.capacity} students
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        size="sm"
                        variant={cls.isArchived ? "warning" : "success"}
                      >
                        {cls.isArchived ? "Archived" : "Active"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigateTo("class-details", cls.id)}
                        >
                          Details
                        </Button>
                        <button
                          onClick={() => setModalState({ isOpen: true, data: cls })}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleArchiveClass(cls.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              isOpen: true,
                              classId: cls.id,
                              className: cls.name
                            })
                          }
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Class Modal */}
      <ClassModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, classId: null, className: "" })}
        onConfirm={() => deleteClass(deleteConfirm.classId)}
        title="Delete Class Section"
        message={`Are you sure you want to permanently delete "${deleteConfirm.className}"? Enrolled students and associated schedules will be unassigned.`}
        confirmLabel="Delete Class"
      />
    </div>
  );
}
