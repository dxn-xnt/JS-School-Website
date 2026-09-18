import React, { useState } from "react";
import { Modal, Button, SearchInput, Badge } from "../common/UIComponents";
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

        <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {filteredSubjects.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No subjects found matching your query.
            </div>
          ) : (
            filteredSubjects.map((subject) => {
              const isAssigned = currentSubjectIds.includes(subject.id);
              return (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {subject.name}
                      </span>
                      <Badge size="sm" variant="default">
                        {subject.code}
                      </Badge>
                      {isAssigned && (
                        <Badge size="sm" variant="primary">
                          Taught Here
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {subject.department} • {subject.credits} Credit Units • {subject.weeklyHours} hrs/week
                    </p>
                  </div>

                  <div>
                    {isAssigned ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900"
                        icon={Trash2}
                        onClick={() => removeSubjectFromClass(classId, subject.id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        icon={BookPlus}
                        onClick={() => assignSubjectToClass(classId, subject.id)}
                      >
                        Assign Subject
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose} size="sm">
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
