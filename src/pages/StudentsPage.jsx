import React, { useState, useMemo } from "react";
import { useSchool } from "../context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
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
  MapPin
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

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      if (gradeFilter !== "ALL" && st.grade !== gradeFilter) return false;
      if (statusFilter !== "ALL" && st.status !== statusFilter) return false;
      if (classFilter !== "ALL" && !st.enrolledClassIds.includes(classFilter)) return false;

      if (activeSearch.trim()) {
        const query = activeSearch.toLowerCase().trim();
        const matchesName = st.name.toLowerCase().includes(query);
        const matchesEmail = st.email.toLowerCase().includes(query);
        const matchesPhone = st.contact?.phone?.toLowerCase().includes(query);
        const matchesAddress = st.contact?.address?.toLowerCase().includes(query);

        return matchesName || matchesEmail || matchesPhone || matchesAddress;
      }

      return true;
    });
  }, [students, gradeFilter, statusFilter, classFilter, activeSearch]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Student Enrollment Directory
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage student academic profiles, contact information, and class allocations.
          </p>
        </div>

        <Button
          variant="default"
          onClick={() => setModalState({ isOpen: true, data: null })}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Student</span>
        </Button>
      </div>

      {/* Filter and Search Toolbar */}
      <Card className="p-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <SearchInput
            value={localSearch}
            onChange={setLocalSearch}
            placeholder="Search by student name, email, or address..."
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

          {/* <SelectFilter
            value={classFilter}
            onChange={setClassFilter}
            label="All Classes"
            options={classes.map((c) => ({ value: c.id, label: c.name }))}
          /> */}
        </div>
      </Card>

      {/* Student List Table */}
      {filteredStudents.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Students Found"
          description="No student profiles matched your search and filter parameters."
          actionLabel="Register New Student"
          onAction={() => setModalState({ isOpen: true, data: null })}
        />
      ) : (
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="px-5 py-3.5">Student Information</TableHead>
                <TableHead className="px-5 py-3.5">Grade Level</TableHead>
                <TableHead className="px-5 py-3.5">Gender</TableHead>
                {/* <TableHead className="px-5 py-3.5">Enrolled Class</TableHead> */}
                <TableHead className="px-5 py-3.5">Contact Details</TableHead>
                <TableHead className="px-5 py-3.5">Status</TableHead>
                <TableHead className="px-5 py-3.5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                // const enrolledClasses = classes.filter((c) =>
                //   student.enrolledClassIds?.includes(c.id)
                // );

                return (
                  <TableRow key={student.id}>
                    {/* Name & Email */}
                    <TableCell className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-foreground">
                            {student.name}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Grade */}
                    <TableCell className="px-5 py-3.5">
                      <Badge variant="outline">
                        {student.grade}
                      </Badge>
                    </TableCell>

                    {/* Gender */}
                    <TableCell className="px-5 py-3.5 text-xs text-muted-foreground">
                      {student.gender || "Male"}
                    </TableCell>

                    {/* Enrolled Classes */}
                    {/* <TableCell className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {enrolledClasses.length === 0 ? (
                          <span className="text-xs text-muted-foreground italic">Not Assigned</span>
                        ) : (
                          enrolledClasses.map((cls) => (
                            <button
                              key={cls.id}
                              onClick={() => navigateTo("class-details", cls.id)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20 cursor-pointer"
                            >
                              <GraduationCap className="w-3 h-3" />
                              <span className="truncate max-w-[120px]">{cls.name}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </TableCell> */}

                    {/* Contact Phone & Address */}
                    <TableCell className="px-5 py-3.5 text-xs">
                      <div className="text-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span>{student.contact?.phone || "N/A"}</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate max-w-[180px]">{student.contact?.address || "Main City"}</span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-5 py-3.5">
                      <Badge
                        variant={
                          student.status === "Active"
                            ? "default"
                            : student.status === "On Leave"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setModalState({ isOpen: true, data: student })}
                          title="Edit Student"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            setDeleteConfirm({
                              isOpen: true,
                              studentId: student.id,
                              studentName: student.name
                            })
                          }
                          title="Delete Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
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
