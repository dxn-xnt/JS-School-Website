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
  Users,
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Mail,
  Phone,
  User,
  Activity
} from "lucide-react";
import { StudentModal } from "../components/modals/StudentModal";
import { GRADE_LEVELS } from "../data";

export function StudentsPage() {
  const {
    students,
    classes,
    deleteStudent,
    navigateTo,
    searchQuery: globalSearch
  } = useSchool();

  const [localSearch, setLocalSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [classFilter, setClassFilter] = useState("ALL");

  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, studentId: null, studentName: "" });

  const activeSearch = localSearch || globalSearch;

  // Filter students (Callback & higher order function logic)
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      // Grade filter
      if (gradeFilter !== "ALL" && st.grade !== gradeFilter) return false;

      // Status filter
      if (statusFilter !== "ALL" && st.status !== statusFilter) return false;

      // Class filter
      if (classFilter !== "ALL" && !st.enrolledClassIds.includes(classFilter)) return false;

      // Search query filter
      if (activeSearch.trim()) {
        const query = activeSearch.toLowerCase().trim();
        const matchesName = st.name.toLowerCase().includes(query);
        const matchesEmail = st.email.toLowerCase().includes(query);
        const matchesGuardian = st.contact?.guardianName?.toLowerCase().includes(query);
        const matchesPhone = st.contact?.phone?.toLowerCase().includes(query);

        return matchesName || matchesEmail || matchesGuardian || matchesPhone;
      }

      return true;
    });
  }, [students, gradeFilter, statusFilter, classFilter, activeSearch]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Student Enrollment Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage academic profiles, attendance records, guardian contacts, and class allocations.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setModalState({ isOpen: true, data: null })}
        >
          Register New Student
        </Button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <SearchInput
            value={localSearch}
            onChange={setLocalSearch}
            placeholder="Search by student, email, or guardian..."
          />

          <SelectFilter
            value={gradeFilter}
            onChange={setGradeFilter}
            label="All Grade Levels"
            options={GRADE_LEVELS}
          />

          <SelectFilter
            value={statusFilter}
            onChange={setStatusFilter}
            label="All Statuses"
            options={["Active", "On Leave", "Probation"]}
          />

          <SelectFilter
            value={classFilter}
            onChange={setClassFilter}
            label="All Classes"
            options={classes.map((c) => ({ value: c.id, label: c.name }))}
          />
        </div>
      </div>

      {/* Student List */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Students Found"
          description="No student profiles matched your search and filter parameters."
          actionLabel="Register New Student"
          onAction={() => setModalState({ isOpen: true, data: null })}
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-950/50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Student Information</th>
                <th className="px-5 py-3.5">Grade Level</th>
                <th className="px-5 py-3.5">Enrolled Class</th>
                <th className="px-5 py-3.5">Attendance</th>
                <th className="px-5 py-3.5">GPA</th>
                <th className="px-5 py-3.5">Guardian Contact</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((student) => {
                const enrolledClasses = classes.filter((c) =>
                  student.enrolledClassIds?.includes(c.id)
                );

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Name & Email */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {student.name}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Grade */}
                    <td className="px-5 py-4">
                      <Badge size="sm" variant="default">
                        {student.grade}
                      </Badge>
                    </td>

                    {/* Enrolled Classes */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {enrolledClasses.length === 0 ? (
                          <span className="text-xs text-slate-400 italic">Not Assigned</span>
                        ) : (
                          enrolledClasses.map((cls) => (
                            <button
                              key={cls.id}
                              onClick={() => navigateTo("class-details", cls.id)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors border border-blue-200 dark:border-blue-900"
                            >
                              <GraduationCap className="w-3 h-3" />
                              <span className="truncate max-w-[120px]">{cls.name}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </td>

                    {/* Attendance */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs font-bold ${
                          student.attendanceRate >= 95
                            ? "text-emerald-600"
                            : student.attendanceRate >= 90
                            ? "text-amber-600"
                            : "text-rose-600"
                        }`}
                      >
                        {student.attendanceRate}%
                      </span>
                    </td>

                    {/* GPA */}
                    <td className="px-5 py-4 text-xs font-bold text-slate-900 dark:text-white">
                      {student.gpa}
                    </td>

                    {/* Guardian & Phone */}
                    <td className="px-5 py-4 text-xs">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {student.contact?.guardianName || "N/A"}
                      </div>
                      <div className="text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        {student.contact?.phone || "N/A"}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <Badge
                        size="sm"
                        variant={
                          student.status === "Active"
                            ? "success"
                            : student.status === "On Leave"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {student.status}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setModalState({ isOpen: true, data: student })}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit Student"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              isOpen: true,
                              studentId: student.id,
                              studentName: student.name
                            })
                          }
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Delete Student"
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

      {/* Student Modal */}
      <StudentModal
        isOpen={modalState.isOpen}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, data: null })}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, studentId: null, studentName: "" })}
        onConfirm={() => deleteStudent(deleteConfirm.studentId)}
        title="Delete Student Profile"
        message={`Are you sure you want to permanently delete "${deleteConfirm.studentName}"? They will be removed from all enrolled classes.`}
        confirmLabel="Delete Student"
      />
    </div>
  );
}
