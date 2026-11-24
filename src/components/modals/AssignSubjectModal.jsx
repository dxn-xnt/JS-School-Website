import React, { useState } from "react";
import { Modal, SearchInput } from "../common/UIComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useSchool } from "../../context/SchoolContext";
import { BookPlus, Trash2 } from "lucide-react";

export function AssignSubjectModal({ isOpen, onClose, classId }) {
  const { classes, subjects, assignSubjectToClass, removeSubjectFromClass } = useSchool();
  const [search, setSearch] = useState("");

  const targetClass = classes.find((c) => c.id === classId);
  if (!targetClass) return null;

  const currentSubjectIds = targetClass.subjectIds || [];

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Assign Subjects: ${targetClass.name}`}
      description="Manage the academic curriculum courses assigned to this class section."
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search subjects by title, code, or department..."
        />

        <Card className="divide-y divide-border max-h-80 overflow-y-auto p-0">
          {filteredSubjects.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              No subjects found matching your query.
            </div>
          ) : (
            filteredSubjects.map((subject) => {
              const isAssigned = currentSubjectIds.includes(subject.id);
              return (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-3.5 hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {subject.name}
                      </span>
                      <Badge variant="outline">
                        {subject.code}
                      </Badge>
                      {isAssigned && (
                        <Badge variant="default">
                          Taught Here
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {subject.department} • {subject.credits} Credit Units • {subject.weeklyHours} hrs/week
                    </p>
                  </div>

                  <div>
                    {isAssigned ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10 border-destructive/30 gap-1"
                        onClick={() => removeSubjectFromClass(classId, subject.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => assignSubjectToClass(classId, subject.id)}
                        className="gap-1"
                      >
                        <BookPlus className="w-3.5 h-3.5" />
                        <span>Assign Subject</span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </Card>

        <div className="flex justify-end pt-3 border-t border-border">
          <Button variant="outline" onClick={onClose} size="sm">
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
