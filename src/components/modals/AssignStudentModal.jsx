import React, { useState } from "react";
import { Modal, Button, SearchInput, Badge } from "../common/UIComponents";
import { useSchool } from "../../context/SchoolContext";
import { UserPlus, Check, UserMinus } from "lucide-react";

export function AssignStudentModal({ isOpen, onClose, classId }) {
  const { classes, students, assignStudentToClass, removeStudentFromClass } = useSchool();
  const [search, setSearch] = useState("");

  const targetClass = classes.find((c) => c.id === classId);
  if (!targetClass) return null;

  const enrolledStudentIds = targetClass.studentIds || [];
  const enrolledCount = enrolledStudentIds.length;
  const isFull = enrolledCount >= targetClass.capacity;

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Students: ${targetClass.name}`}
      description={`Current Enrollment: ${enrolledCount} / ${targetClass.capacity} students (Capacity: ${
        isFull ? "Full" : `${targetClass.capacity - enrolledCount} seats left`
      })`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search students by name, email, or grade..."
        />

        <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {filteredStudents.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No students found matching your search.
            </div>
          ) : (
            filteredStudents.map((student) => {
              const isEnrolled = enrolledStudentIds.includes(student.id);
              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-xs">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {student.name}
                        </span>
                        <Badge size="sm" variant="default">
                          {student.grade}
                        </Badge>
                        {isEnrolled && (
                          <Badge size="sm" variant="success">
                            Enrolled
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {student.email} • GPA {student.gpa} • Attendance {student.attendanceRate}%
                      </p>
                    </div>
                  </div>

                  <div>
                    {isEnrolled ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900"
                        icon={UserMinus}
                        onClick={() => removeStudentFromClass(classId, student.id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        disabled={isFull}
                        icon={UserPlus}
                        onClick={() => assignStudentToClass(classId, student.id)}
                      >
                        {isFull ? "Class Full" : "Enroll"}
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
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
