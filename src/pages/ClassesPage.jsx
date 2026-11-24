import React, { useState, useMemo } from "react";
import { useSchool } from "../context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import {
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
  ArrowRight
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

  // Filter classes
  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      if (statusFilter === "ACTIVE" && cls.isArchived) return false;
      if (statusFilter === "ARCHIVED" && !cls.isArchived) return false;

      if (gradeFilter !== "ALL" && cls.grade !== gradeFilter) return false;

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
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Class Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create and maintain academic class sections, teacher assignments, and rosters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            onClick={() => setModalState({ isOpen: true, data: null })}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create Class Section</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
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
          <div className="flex items-center gap-1 border border-border p-1 rounded-lg bg-muted/40 shrink-0 self-end md:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

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
              <Card
                key={cls.id}
                className={`p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all ${
                  cls.isArchived
                    ? "border-amber-500/30 opacity-80 bg-amber-500/5"
                    : ""
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={cls.isArchived ? "secondary" : "default"}>
                          {cls.grade}
                        </Badge>
                        <Badge variant="outline">
                          {cls.code}
                        </Badge>
                        {cls.isArchived && (
                          <Badge variant="destructive">
                            Archived
                          </Badge>
                        )}
                      </div>
                      <h3 className="mt-2 text-base font-bold text-foreground">
                        {cls.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Room: <span className="font-semibold text-foreground">{cls.room}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {cls.description || "Curriculum program and student cohort."}
                  </p>

                  {/* Teacher & Subjects Pills */}
                  <div className="rounded-xl bg-muted/40 p-3 space-y-2 border border-border text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Lead Teacher:</span>
                      <span className="font-semibold text-foreground truncate max-w-[150px]">
                        {leadTeacher?.name || "Unassigned"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Subjects Taught:</span>
                      <span className="font-semibold text-primary">
                        {cls.subjectIds?.length || 0} Courses
                      </span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-muted-foreground flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        Class Capacity
                      </span>
                      <span className="text-foreground">
                        {enrolled.length} / {cls.capacity} students ({capacityRatio}%)
                      </span>
                    </div>
                    <Progress value={Math.min(capacityRatio, 100)} className="h-2" />
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigateTo("class-details", cls.id)}
                    className="gap-1.5"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setModalState({ isOpen: true, data: cls })}
                      title="Edit Class"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleArchiveClass(cls.id)}
                      title={cls.isArchived ? "Restore Class" : "Archive Class"}
                    >
                      {cls.isArchived ? (
                        <RotateCcw className="w-3.5 h-3.5" />
                      ) : (
                        <Archive className="w-3.5 h-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() =>
                        setDeleteConfirm({
                          isOpen: true,
                          classId: cls.id,
                          className: cls.name
                        })
                      }
                      title="Delete Class"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <Card className="overflow-hidden p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="px-5 py-3.5">Class Section</TableHead>
                <TableHead className="px-5 py-3.5">Grade</TableHead>
                <TableHead className="px-5 py-3.5">Room</TableHead>
                <TableHead className="px-5 py-3.5">Lead Teacher</TableHead>
                <TableHead className="px-5 py-3.5">Enrollment</TableHead>
                <TableHead className="px-5 py-3.5">Status</TableHead>
                <TableHead className="px-5 py-3.5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => {
                const leadTeacher = getTeacherById(cls.teacherId);
                const enrolled = getEnrolledStudentsForClass(cls.id);

                return (
                  <TableRow key={cls.id}>
                    <TableCell className="px-5 py-3.5">
                      <div>
                        <span className="font-bold text-foreground">
                          {cls.name}
                        </span>
                        <div className="text-xs text-muted-foreground">{cls.code}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <Badge variant="outline">
                        {cls.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-xs font-semibold text-foreground">
                      {cls.room}
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <span className="text-xs font-medium text-foreground">
                        {leadTeacher?.name || "Unassigned"}
                      </span>
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <div className="text-xs font-semibold text-foreground">
                        {enrolled.length} / {cls.capacity} students
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-3.5">
                      <Badge
                        variant={cls.isArchived ? "secondary" : "default"}
                      >
                        {cls.isArchived ? "Archived" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigateTo("class-details", cls.id)}
                        >
                          Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => setModalState({ isOpen: true, data: cls })}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => toggleArchiveClass(cls.id)}
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            setDeleteConfirm({
                              isOpen: true,
                              classId: cls.id,
                              className: cls.name
                            })
                          }
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
