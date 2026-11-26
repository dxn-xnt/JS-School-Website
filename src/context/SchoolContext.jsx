import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import {
  DataStore,
  calculateSchoolSummary,
  generateId,
  getSubjectById as findSubjectById,
  createRecord,
  createSchedule
} from "../data";

const SchoolContext = createContext(null);

// The ONE shared DataStore (singleton, see data.js Section 6). All records live there.
const store = DataStore.getInstance();

// Reads one list from the DataStore and re-renders React whenever the store changes.
// Returns [list, setList] so the code below can keep using setX(prev => ...).
function useStoreList(listName) {
  const list = useSyncExternalStore(store.subscribe, () => store.getList(listName));
  const setList = (newListOrUpdater) => store.update(listName, newListOrUpdater);
  return [list, setList];
}

export function SchoolProvider({ children }) {
  const [classes, setClasses] = useStoreList("classes");
  const [students, setStudents] = useStoreList("students");
  const [teachers, setTeachers] = useStoreList("teachers");
  const [subjects, setSubjects] = useStoreList("subjects");
  const [schedules, setSchedules] = useStoreList("schedules");

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    const toastId = generateId("toast");
    setToast({ id: toastId, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === toastId ? null : current));
    }, 3500);
  };

  const navigateTo = (page, classId = null) => {
    setActivePage(page);
    if (classId !== null) {
      setSelectedClassId(classId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getClassById = (id) => classes.find((c) => c.id === id) || null;
  const getTeacherById = (id) => teachers.find((t) => t.id === id) || null;
  const getSubjectById = (id) => findSubjectById(subjects, id);
  const getStudentById = (id) => students.find((st) => st.id === id) || null;

  const getEnrolledStudentsForClass = (classId) => {
    return students.filter((s) => s.enrolledClassIds?.includes(classId));
  };

  const getSubjectsForClass = (classId) => {
    const cls = getClassById(classId);
    if (!cls || !Array.isArray(cls.subjectIds)) return [];
    return subjects.filter((s) => cls.subjectIds.includes(s.id));
  };

  const getSchedulesForClass = (classId) => {
    return schedules.filter((sch) => sch.classId === classId);
  };

  const addClass = (classData) => {
    const newClass = {
      id: generateId("cls"),
      name: classData.name.trim(),
      code: classData.code ? classData.code.trim().toUpperCase() : `CLS-${classes.length + 1}`,
      grade: classData.grade,
      room: classData.room || "Room TBA",
      capacity: Number(classData.capacity) || 25,
      teacherId: classData.teacherId || null,
      subjectIds: classData.subjectIds || [],
      studentIds: classData.studentIds || [],
      isArchived: false,
      description: classData.description || "Class overview and description.",
      metadata: {
        semester: classData.semester || "Spring 2026",
        academicYear: "2026-2027",
        colorTheme: classData.colorTheme || "blue"
      }
    };

    setClasses((prev) => [newClass, ...prev]);

    if (newClass.teacherId) {
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === newClass.teacherId && !t.assignedClassIds.includes(newClass.id)
            ? { ...t, assignedClassIds: [...t.assignedClassIds, newClass.id] }
            : t
        )
      );
    }

    showToast(`Class "${newClass.name}" created successfully!`, "success");
    return newClass;
  };

  const editClass = (id, updatedFields) => {
    let oldTeacherId = null;
    let newTeacherId = updatedFields.teacherId;

    setClasses((prev) =>
      prev.map((cls) => {
        if (cls.id === id) {
          oldTeacherId = cls.teacherId;
          return {
            ...cls,
            ...updatedFields,
            capacity: Number(updatedFields.capacity) || cls.capacity,
            metadata: {
              ...cls.metadata,
              ...(updatedFields.metadata || {})
            }
          };
        }
        return cls;
      })
    );

    if (newTeacherId !== undefined && oldTeacherId !== newTeacherId) {
      setTeachers((prev) =>
        prev.map((t) => {
          if (t.id === oldTeacherId) {
            return {
              ...t,
              assignedClassIds: t.assignedClassIds.filter((cId) => cId !== id)
            };
          }
          if (t.id === newTeacherId && !t.assignedClassIds.includes(id)) {
            return {
              ...t,
              assignedClassIds: [...t.assignedClassIds, id]
            };
          }
          return t;
        })
      );
    }

    showToast("Class details updated successfully!", "success");
  };

  const toggleArchiveClass = (id) => {
    setClasses((prev) =>
      prev.map((cls) => {
        if (cls.id === id) {
          const updatedStatus = !cls.isArchived;
          showToast(
            `Class "${cls.name}" is now ${updatedStatus ? "Archived" : "Active"}.`,
            updatedStatus ? "warning" : "success"
          );
          return { ...cls, isArchived: updatedStatus };
        }
        return cls;
      })
    );
  };

  const deleteClass = (id) => {
    const clsToDelete = getClassById(id);
    const className = clsToDelete ? clsToDelete.name : "Class";

    setClasses((prev) => prev.filter((c) => c.id !== id));
    setStudents((prev) =>
      prev.map((st) => ({
        ...st,
        enrolledClassIds: st.enrolledClassIds.filter((cId) => cId !== id)
      }))
    );
    setTeachers((prev) =>
      prev.map((t) => ({
        ...t,
        assignedClassIds: t.assignedClassIds.filter((cId) => cId !== id)
      }))
    );
    setSchedules((prev) => prev.filter((sch) => sch.classId !== id));

    if (selectedClassId === id) {
      setSelectedClassId(null);
      setActivePage("classes");
    }

    showToast(`Class "${className}" deleted successfully.`, "info");
  };

  const assignStudentToClass = (classId, studentId) => {
    const cls = getClassById(classId);
    const student = getStudentById(studentId);

    if (!cls || !student) {
      showToast("Error: Class or Student not found.", "error");
      return;
    }

    const currentEnrolled = getEnrolledStudentsForClass(classId).length;
    if (currentEnrolled >= cls.capacity) {
      showToast(`Cannot enroll: ${cls.name} has reached maximum capacity (${cls.capacity}).`, "error");
      return;
    }

    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId && !c.studentIds.includes(studentId)
          ? { ...c, studentIds: [...c.studentIds, studentId] }
          : c
      )
    );

    setStudents((prev) =>
      prev.map((st) =>
        st.id === studentId && !st.enrolledClassIds.includes(classId)
          ? { ...st, enrolledClassIds: [...st.enrolledClassIds, classId] }
          : st
      )
    );

    showToast(`Assigned ${student.name} to ${cls.name}!`, "success");
  };

  const removeStudentFromClass = (classId, studentId) => {
    const cls = getClassById(classId);
    const student = getStudentById(studentId);

    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId
          ? { ...c, studentIds: c.studentIds.filter((id) => id !== studentId) }
          : c
      )
    );

    setStudents((prev) =>
      prev.map((st) =>
        st.id === studentId
          ? { ...st, enrolledClassIds: st.enrolledClassIds.filter((id) => id !== classId) }
          : st
      )
    );

    showToast(`Removed ${student?.name || "Student"} from ${cls?.name || "Class"}.`, "info");
  };

  const addStudent = (studentData) => {
    const newStudent = {
      id: generateId("std"),
      name: studentData.name.trim(),
      email: studentData.email || `${studentData.name.toLowerCase().replace(/\s+/g, ".")}@student.evergreen.edu`,
      grade: studentData.grade || "Grade 10",
      gender: studentData.gender || "Male",
      status: studentData.status || "Active",
      contact: {
        phone: studentData.phone || "+1 (555) 000-0000",
        address: studentData.address || "Main City"
      },
      enrolledClassIds: studentData.enrolledClassIds || []
    };

    setStudents((prev) => [newStudent, ...prev]);

    if (newStudent.enrolledClassIds.length > 0) {
      setClasses((prev) =>
        prev.map((c) =>
          newStudent.enrolledClassIds.includes(c.id) && !c.studentIds.includes(newStudent.id)
            ? { ...c, studentIds: [...c.studentIds, newStudent.id] }
            : c
        )
      );
    }

    showToast(`Student "${newStudent.name}" registered successfully!`, "success");
    return newStudent;
  };

  const editStudent = (id, updatedFields) => {
    setStudents((prev) =>
      prev.map((st) => {
        if (st.id === id) {
          return {
            ...st,
            ...updatedFields,
            contact: {
              ...st.contact,
              ...(updatedFields.contact || {})
            }
          };
        }
        return st;
      })
    );
    showToast("Student profile updated successfully!", "success");
  };

  const deleteStudent = (id) => {
    const student = getStudentById(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setClasses((prev) =>
      prev.map((c) => ({
        ...c,
        studentIds: c.studentIds.filter((stId) => stId !== id)
      }))
    );
    showToast(`Student "${student?.name || "Record"}" deleted.`, "info");
  };

  const assignTeacherToClass = (classId, teacherId) => {
    const cls = getClassById(classId);
    const teacher = getTeacherById(teacherId);

    if (!cls) return;

    const oldTeacherId = cls.teacherId;

    setClasses((prev) =>
      prev.map((c) => (c.id === classId ? { ...c, teacherId: teacherId || null } : c))
    );

    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === oldTeacherId) {
          return {
            ...t,
            assignedClassIds: t.assignedClassIds.filter((id) => id !== classId)
          };
        }
        if (teacherId && t.id === teacherId && !t.assignedClassIds.includes(classId)) {
          return {
            ...t,
            assignedClassIds: [...t.assignedClassIds, classId]
          };
        }
        return t;
      })
    );

    showToast(
      teacher
        ? `Assigned ${teacher.name} as lead teacher of ${cls.name}.`
        : `Removed lead teacher from ${cls.name}.`,
      "success"
    );
  };

  const addTeacher = (teacherData) => {
    const newTeacher = {
      id: generateId("tch"),
      name: teacherData.name.trim(),
      email: teacherData.email || `${teacherData.name.toLowerCase().replace(/\s+/g, ".")}@evergreen.edu`,
      phone: teacherData.phone || "+1 (555) 000-0000",
      department: teacherData.department || "Mathematics",
      qualification: teacherData.qualification || "B.Ed & Certified Educator",
      assignedClassIds: teacherData.assignedClassIds || [],
      subjectSpecialties: Array.isArray(teacherData.subjectSpecialties)
        ? teacherData.subjectSpecialties
        : (teacherData.specialtiesString || "").split(",").map((s) => s.trim()).filter(Boolean),
      status: "Active",
      avatarColor: "bg-blue-600",
      experienceYears: Number(teacherData.experienceYears) || 5
    };

    setTeachers((prev) => [newTeacher, ...prev]);
    showToast(`Teacher "${newTeacher.name}" added successfully!`, "success");
    return newTeacher;
  };

  const editTeacher = (id, updatedFields) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            ...updatedFields,
            experienceYears: Number(updatedFields.experienceYears) || t.experienceYears
          };
        }
        return t;
      })
    );
    showToast("Teacher information updated!", "success");
  };

  const deleteTeacher = (id) => {
    const teacher = getTeacherById(id);
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    setClasses((prev) =>
      prev.map((c) => (c.teacherId === id ? { ...c, teacherId: null } : c))
    );
    setSchedules((prev) =>
      prev.map((sch) => (sch.teacherId === id ? { ...sch, teacherId: null } : sch))
    );
    showToast(`Teacher "${teacher?.name || "Record"}" removed.`, "info");
  };

  const assignSubjectToClass = (classId, subjectId) => {
    const cls = getClassById(classId);
    const subject = getSubjectById(subjectId);

    if (!cls || !subject) return;

    if (cls.subjectIds.includes(subjectId)) {
      showToast(`${subject.name} is already assigned to this class.`, "warning");
      return;
    }

    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId ? { ...c, subjectIds: [...c.subjectIds, subjectId] } : c
      )
    );
    showToast(`Subject "${subject.name}" assigned to ${cls.name}!`, "success");
  };

  const removeSubjectFromClass = (classId, subjectId) => {
    const cls = getClassById(classId);
    const subject = getSubjectById(subjectId);

    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId
          ? { ...c, subjectIds: c.subjectIds.filter((sId) => sId !== subjectId) }
          : c
      )
    );

    setSchedules((prev) =>
      prev.filter((sch) => !(sch.classId === classId && sch.subjectId === subjectId))
    );

    showToast(`Removed subject "${subject?.name || "Subject"}" from ${cls?.name || "Class"}.`, "info");
  };

  const addSubject = (subjectData) => {
    // The factory validates the input, fills defaults and generates the id (data.js Section 5).
    let newSubject;
    try {
      newSubject = createRecord("subject", subjectData);
    } catch (error) {
      showToast(error.message, "error");
      return null;
    }

    setSubjects((prev) => [newSubject, ...prev]);
    showToast(`Subject "${newSubject.name}" created!`, "success");
    return newSubject;
  };

  const editSubject = (id, updatedFields) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            ...updatedFields,
            credits: Number(updatedFields.credits) || s.credits,
            weeklyHours: Number(updatedFields.weeklyHours) || s.weeklyHours
          };
        }
        return s;
      })
    );
    showToast("Subject details updated!", "success");
  };

  const deleteSubject = (id) => {
    const subject = getSubjectById(id);
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    setClasses((prev) =>
      prev.map((c) => ({
        ...c,
        subjectIds: c.subjectIds.filter((sId) => sId !== id)
      }))
    );
    setSchedules((prev) => prev.filter((sch) => sch.subjectId !== id));
    showToast(`Subject "${subject?.name || "Record"}" deleted.`, "info");
  };

  const addSchedule = (scheduleData) => {
    // The factory validates the input, fills defaults and generates the id (data.js Section 5).
    let newSchedule;
    try {
      newSchedule = createRecord("schedule", scheduleData);
    } catch (error) {
      showToast(error.message, "error");
      return null;
    }

    const targetClass = getClassById(newSchedule.classId);
    if (targetClass && !targetClass.subjectIds.includes(newSchedule.subjectId)) {
      assignSubjectToClass(newSchedule.classId, newSchedule.subjectId);
    }

    setSchedules((prev) => [newSchedule, ...prev]);
    showToast("Schedule slot added to timetable!", "success");
    return newSchedule;
  };

  const editSchedule = (id, updatedFields) => {
    try {
      // Rebuild the slot through the factory so the edited time is validated too.
      setSchedules((prev) =>
        prev.map((sch) => (sch.id === id ? createSchedule({ ...sch, ...updatedFields }) : sch))
      );
    } catch (error) {
      showToast(error.message, "error");
      return;
    }
    showToast("Schedule timetable slot updated!", "success");
  };

  const deleteSchedule = (id) => {
    setSchedules((prev) => prev.filter((sch) => sch.id !== id));
    showToast("Schedule slot removed.", "info");
  };

  const resetToDefaultData = () => {
    store.reset(); // the singleton restores the starting data and notifies React
    setSelectedClassId(null);
    showToast("All records reset to initial static school data!", "info");
  };

  const summaryStats = calculateSchoolSummary(classes, students, teachers, subjects, schedules);

  return (
    <SchoolContext.Provider
      value={{
        classes,
        students,
        teachers,
        subjects,
        schedules,
        activePage,
        selectedClassId,
        searchQuery,
        setSearchQuery,
        toast,
        summaryStats,

        navigateTo,
        setSelectedClassId,
        showToast,

        getClassById,
        getTeacherById,
        getSubjectById,
        getStudentById,
        getEnrolledStudentsForClass,
        getSubjectsForClass,
        getSchedulesForClass,

        addClass,
        editClass,
        toggleArchiveClass,
        deleteClass,

        assignStudentToClass,
        removeStudentFromClass,
        addStudent,
        editStudent,
        deleteStudent,

        assignTeacherToClass,
        addTeacher,
        editTeacher,
        deleteTeacher,

        assignSubjectToClass,
        removeSubjectFromClass,
        addSubject,
        editSubject,
        deleteSubject,

        addSchedule,
        editSchedule,
        deleteSchedule,

        resetToDefaultData
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error("useSchool must be used within a SchoolProvider");
  }
  return context;
}
