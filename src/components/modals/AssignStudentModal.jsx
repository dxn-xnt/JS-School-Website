import React, { useState } from "react";
import { Modal, SearchInput } from "../common/UIComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useSchool } from "../../context/SchoolContext";
import { UserPlus, UserMinus } from "lucide-react";

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

        <Card className="divide-y divide-border max-h-80 overflow-y-auto p-0">
          {filteredStudents.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              No students found matching your search.
            </div>
          ) : (
            filteredStudents.map((student) => {
              const isEnrolled = enrolledStudentIds.includes(student.id);
              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" className="bg-primary/10 text-primary font-bold">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {student.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {student.name}
                        </span>
                        <Badge variant="outline">
                          {student.grade}
                        </Badge>
                        {isEnrolled && (
                          <Badge variant="default">
                            Enrolled
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {student.email} • {student.contact?.phone || "No phone"}
                      </p>
                    </div>
                  </div>

                  <div>
                    {isEnrolled ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10 border-destructive/30 gap-1"
                        onClick={() => removeStudentFromClass(classId, student.id)}
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="default"
                        disabled={isFull}
                        onClick={() => assignStudentToClass(classId, student.id)}
                        className="gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>{isFull ? "Class Full" : "Enroll"}</span>
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
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
