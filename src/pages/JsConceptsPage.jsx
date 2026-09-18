import React, { useState } from "react";
import { Badge, Button } from "../components/common/UIComponents";
import {
  Code2,
  CheckCircle2,
  FileCode,
  Sparkles,
  Layers,
  BookOpen,
  ArrowRight,
  ChevronRight
} from "lucide-react";

export function JsConceptsPage() {
  const [selectedConcept, setSelectedConcept] = useState(1);

  const concepts = [
    {
      id: 1,
      title: "1. Variables (const, let, var)",
      summary: "Declaration of mutable, immutable, and functional-scoped variables across the application.",
      fileReferences: ["src/data.js", "src/context/SchoolContext.jsx", "src/pages/DashboardPage.jsx"],
      codeSnippet: `// 1. Immutable constant declarations
export const SCHOOL_NAME = "Evergreen Horizon Academy";
export const ACADEMIC_YEAR = "2026-2027";

// 2. Mutable let variables for accumulator counters & algorithms
let activeClassesCount = 0;
let archivedClassesCount = 0;
for (let i = 0; i < classes.length; i++) {
  if (classes[i].isArchived) {
    archivedClassesCount += 1;
  } else {
    activeClassesCount += 1;
  }
}`,
      explanation:
        "We use 'const' for immutable definitions (state constants, context references, function pointers) and 'let' for loop counters and dynamic metric aggregations."
    },
    {
      id: 2,
      title: "2. Types of Variables (Primitive & Non-Primitive)",
      summary: "Demonstrates String, Number, Boolean, Null, Undefined, Object, and Array in real school logic.",
      fileReferences: ["src/data.js", "src/context/SchoolContext.jsx"],
      codeSnippet: `// String Type
const schoolName = "Evergreen Horizon Academy"; // String

// Number Type
const studentCapacity = 25; // Number (Integer)
const attendanceRate = 96.5; // Number (Float)

// Boolean Type
const isArchived = false; // Boolean flag for archive status

// Null Type (Represents intentional absence of any object value)
export const DEFAULT_UNASSIGNED_TEACHER = null; // Unassigned lead teacher

// Undefined Type
export let optionalConfiguration = undefined; // Unset config

// Object Type
const classEntity = { id: "cls-1", name: "Grade 10-A" };

// Array Type
const weekdays = ["Monday", "Tuesday", "Wednesday"];`,
      explanation:
        "Every JavaScript fundamental data type is utilized in modeling school entities: Strings for codes/names, Numbers for attendance/credits, Booleans for archive state, Null for unassigned teachers, Objects for entities, and Arrays for collections."
    },
    {
      id: 3,
      title: "3. Objects (Class, Student, Teacher, Subject, Schedule)",
      summary: "5 core entity objects with clean structures and domain-specific attributes.",
      fileReferences: ["src/data.js", "src/context/SchoolContext.jsx"],
      codeSnippet: `// 1. Class Object
const classObj = {
  id: "cls-1",
  name: "Grade 10-A (Honors STEM)",
  grade: "Grade 10",
  room: "Science Wing 301",
  capacity: 25,
  teacherId: "tch-1",
  subjectIds: ["sbj-1", "sbj-2"],
  studentIds: ["std-1", "std-2"],
  isArchived: false
};

// 2. Student Object
const studentObj = {
  id: "std-1",
  name: "Alexander Hayes",
  email: "alex.hayes@student.evergreen.edu",
  grade: "Grade 10",
  attendanceRate: 96.5,
  gpa: 3.88
};

// 3. Teacher Object
const teacherObj = {
  id: "tch-1",
  name: "Dr. Eleanor Vance",
  department: "Mathematics",
  qualification: "Ph.D. in Applied Mathematics"
};`,
      explanation:
        "Our system models 5 interconnected domain entities: Classes, Students, Teachers, Subjects, and Timetable Schedules."
    },
    {
      id: 4,
      title: "4. Types of Objects (Literals, Nested, Arrays of Objects)",
      summary: "Object literals, deeply nested property objects, and arrays composed of objects.",
      fileReferences: ["src/data.js", "src/components/modals/StudentModal.jsx"],
      codeSnippet: `// 1. Object Literal
const schoolConfig = { semester: "Spring 2026", maxClasses: 50 };

// 2. Nested Object (Contact information & Metadata)
const studentRecord = {
  id: "std-1",
  name: "Alexander Hayes",
  // Nested Object inside student
  contact: {
    phone: "+1 (555) 111-2233",
    guardianName: "Thomas & Rebecca Hayes",
    address: "742 Evergreen Terrace"
  },
  metadata: {
    enrolledDate: "2026-01-15",
    homeroom: "Room 301"
  }
};

// 3. Arrays of Objects
export const initialClasses = [
  { id: "cls-1", name: "Grade 10-A" },
  { id: "cls-2", name: "Grade 9-B" }
];`,
      explanation:
        "Nested objects allow clean grouping of emergency contacts and semester metadata, while arrays of objects store all school database records."
    },
    {
      id: 5,
      title: "5. Arrays (Classes, Students, Teachers, Subjects, Schedules)",
      summary: "Core collections managed as state arrays with full React reactivity.",
      fileReferences: ["src/context/SchoolContext.jsx", "src/data.js"],
      codeSnippet: `// State collections of each school domain
const [classes, setClasses] = useState(initialClasses);
const [students, setStudents] = useState(initialStudents);
const [teachers, setTeachers] = useState(initialTeachers);
const [subjects, setSubjects] = useState(initialSubjects);
const [schedules, setSchedules] = useState(initialSchedules);

// Adding to array immutably
const addClass = (newClass) => {
  setClasses(prevClasses => [newClass, ...prevClasses]);
};

// Removing from array
const deleteClass = (id) => {
  setClasses(prevClasses => prevClasses.filter(c => c.id !== id));
};`,
      explanation:
        "The state arrays power the interactive admin UI, updated immutably using modern ES6 array methods."
    },
    {
      id: 6,
      title: "6. Types of Arrays (One-Dimensional, Arrays of Objects, Nested Arrays)",
      summary: "Primitive arrays, collections of objects, and multi-dimensional / nested matrices.",
      fileReferences: ["src/data.js", "src/pages/SchedulesPage.jsx"],
      codeSnippet: `// 1. One-Dimensional Primitive Array
export const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const GRADE_LEVELS = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];

// 2. Array of Objects
export const initialSubjects = [
  { id: "sbj-1", code: "MATH-101", name: "Advanced Mathematics" },
  { id: "sbj-2", code: "PHYS-201", name: "Applied Physics" }
];

// 3. Nested Array (Array within an Object & Matrix Grid)
const student = {
  id: "std-1",
  enrolledClassIds: ["cls-1", "cls-3"] // Nested array of IDs
};

// Multi-Dimensional Timetable Matrix Grid
export const TIMETABLE_GRID_MATRIX = [
  ["08:00 - 09:00", ["sch-1"], ["sch-4"], [], [], []],
  ["09:15 - 10:15", ["sch-2"], [], ["sch-12"], ["sch-5"], []]
];`,
      explanation:
        "One-dimensional arrays provide categorical options; arrays of objects structure dataset tables; nested arrays maintain relational foreign keys and the weekly timetable grid."
    },
    {
      id: 7,
      title: "7. Functions (CRUD, Search, Filter, Assign, Retrieve)",
      summary: "Modular functions for add, edit, delete, search, filter, assign, and retrieve operations.",
      fileReferences: ["src/context/SchoolContext.jsx", "src/pages/ClassesPage.jsx"],
      codeSnippet: `// Add Operation
function addStudent(studentData) { /* creates & prepends student */ }

// Edit Operation
function editClass(id, updatedFields) { /* immutably updates class */ }

// Delete Operation
function deleteTeacher(id) { /* deletes & cleans up references */ }

// Assign Operation
function assignStudentToClass(classId, studentId) {
  // checks capacity limit and binds IDs in both records
}

// Remove Operation
function removeStudentFromClass(classId, studentId) {
  // unlinks student from class studentIds array
}

// Retrieve / Lookup Helper
function getEnrolledStudentsForClass(classId) {
  return students.filter(s => s.enrolledClassIds?.includes(classId));
}`,
      explanation:
        "Every user action is backed by pure, functional handlers that manage relational integrity across classes, teachers, students, and schedules."
    },
    {
      id: 8,
      title: "8. Types of Functions (Declarations, Expressions, Arrows, Callbacks, Higher-Order)",
      summary: "Comprehensive showcase of all JavaScript function types in actual application code.",
      fileReferences: ["src/data.js", "src/context/SchoolContext.jsx", "src/pages/DashboardPage.jsx"],
      codeSnippet: `// 1. Function Declaration
export function calculateSchoolSummary(classes, students, teachers, subjects, schedules) {
  // Computes aggregate analytics
  return { totalClasses: classes.length, totalStudents: students.length };
}

// 2. Function Expression
export const formatAcademicCode = function(prefix, number) {
  return \`\${String(prefix).toUpperCase()}-\${String(number).padStart(3, "0")}\`;
};

// 3. Arrow Function
export const matchesQuery = (targetStr, queryStr) => {
  return targetStr.toString().toLowerCase().includes(queryStr.trim().toLowerCase());
};

// 4. Callback Functions inside Array methods (.map, .filter, .reduce)
const highAttendanceStudents = students.filter(function(st) {
  return st.attendanceRate >= 95; // Callback predicate
});

// 5. Higher-Order Function (Function that returns a Function)
export function createEntityFilter(searchQuery, keysToMatch) {
  return function(entity) {
    if (!searchQuery) return true;
    return keysToMatch.some(key => matchesQuery(entity[key], searchQuery));
  };
}`,
      explanation:
        "Function declarations are used for global algorithms, expressions for formatters, arrow functions for concise predicates and event handlers, callback functions for collection transforms, and higher-order functions for reusable dynamic search generators."
    }
  ];

  const current = concepts.find((c) => c.id === selectedConcept) || concepts[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 p-6 sm:p-8 text-white shadow-xl shadow-purple-500/10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>School Presentation Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          JavaScript Core Concepts Reference
        </h1>
        <p className="text-sm text-purple-100 max-w-3xl leading-relaxed">
          This interactive showcase demonstrates how all 8 required JavaScript concepts are deeply integrated into the data models, state operations, and rendering pipeline of this School Management Website.
        </p>
      </div>

      {/* 2-Column Explorer: Concept List & Code Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Concept Selection Menu */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 mb-2">
            Required 8 JS Concepts
          </div>

          {concepts.map((concept) => {
            const isSelected = concept.id === selectedConcept;

            return (
              <button
                key={concept.id}
                onClick={() => setSelectedConcept(concept.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20"
                    : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {concept.id}
                  </div>
                  <div className="truncate text-xs font-bold">{concept.title}</div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? "translate-x-0.5 text-white" : "text-slate-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Detail & Code Viewer */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5">
            <div>
              <Badge size="md" variant="purple" className="mb-2">
                Concept #{current.id}
              </Badge>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {current.summary}
              </p>
            </div>

            {/* Implementation Explanation */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                Application Context & Rationale:
              </span>
              {current.explanation}
            </div>

            {/* Code Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Code Implementation Snippet
                </span>
                <span className="text-[11px] text-slate-400 font-mono">JavaScript (ES6+)</span>
              </div>

              <div className="relative rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800 shadow-inner">
                <pre className="leading-relaxed whitespace-pre">
                  <code>{current.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* File References */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 block mb-2">
                Where to inspect this concept in project files:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.fileReferences.map((file) => (
                  <span
                    key={file}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    {file}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
