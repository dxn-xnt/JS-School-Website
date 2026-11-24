import React, { useState, useMemo } from "react";
import { useSchool } from "../context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
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
  Award
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
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Subject & Curriculum Catalog
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure academic courses, credits, weekly hours, and department curricula.
          </p>
        </div>

        <Button
          variant="default"
          onClick={() => setModalState({ isOpen: true, data: null })}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course Subject</span>
        </Button>
      </div>

      {/* Filter and Search */}
      <Card className="p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
      </Card>

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
              <Card
                key={subject.id}
                className="p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="secondary">
                      {subject.code}
                    </Badge>
                    <Badge variant="outline">
                      {subject.department}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-foreground">
                    {subject.name}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {subject.description || "Course curriculum and learning objectives."}
                  </p>

                  {/* Credits & Hours pill */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-foreground">
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-muted/40 border border-border">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>{subject.credits} Credit Units</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-muted/40 border border-border">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{subject.weeklyHours} Hrs / Week</span>
                    </div>
                  </div>

                  {/* Taught in Classes */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                      Taught in Classes ({assignedClasses.length})
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
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-border flex justify-end gap-1.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setModalState({ isOpen: true, data: subject })}
                    className="gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Course</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10 gap-1 border-destructive/30"
                    onClick={() =>
                      setDeleteConfirm({
                        isOpen: true,
                        subjectId: subject.id,
                        subjectName: subject.name
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
