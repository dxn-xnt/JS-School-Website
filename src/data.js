/**
 * ============================================================================
 * SCHOOL STATIC DATA MODULE (src/data.js)
 * ============================================================================
 * 
 * JAVASCRIPT CONCEPTS DEMONSTRATED IN THIS FILE:
 * ----------------------------------------------------------------------------
 * 1. VARIABLES: const, let, var
 * 2. TYPES OF VARIABLES:
 *    - String: "Grade 10-A", "Sarah Jenkins"
 *    - Number: 30 (capacity), 92.5 (attendanceRate), 4 (credits)
 *    - Boolean: true / false (isArchived, isActive)
 *    - Null: null (unassigned teacher or placeholder)
 *    - Undefined: undefined (demonstrated in helper/optional fields)
 *    - Object: { id: "cls-1", ... }
 *    - Array: ["Monday", "Wednesday"]
 * 3. OBJECTS: Class, Student, Teacher, Subject, Schedule entities
 * 4. TYPES OF OBJECTS:
 *    - Object literals: { id: "std-1", ... }
 *    - Nested objects: contact: { phone: "...", guardianName: "..." }
 *    - Arrays of objects: initialClasses, initialStudents, etc.
 * 5. ARRAYS: classes, students, teachers, subjects, schedules
 * 6. TYPES OF ARRAYS:
 *    - One-dimensional arrays: WEEKDAYS, GRADE_LEVELS, DEPARTMENTS
 *    - Arrays of objects: initialStudents, initialTeachers
 *    - Nested arrays: matrix / enrolledClassIds
 * ============================================================================
 */

// 1. VARIABLES & TYPES: Constants & primitive string/number arrays
export const SCHOOL_NAME = "Evergreen Horizon Academy";
export const ACADEMIC_YEAR = "2026-2027";
export const SEMESTER = "Spring Term";

// 6. TYPES OF ARRAYS: One-dimensional primitive string arrays
export const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const GRADE_LEVELS = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];
export const DEPARTMENTS = [
  "Mathematics",
  "Sciences",
  "Humanities",
  "Languages",
  "Computer Science",
  "Arts & Physical Ed"
];
export const SCHEDULE_TIME_SLOTS = [
  "08:00 - 09:00",
  "09:15 - 10:15",
  "10:30 - 11:30",
  "11:45 - 12:45",
  "13:30 - 14:30",
  "14:45 - 15:45"
];

// Variable showing undefined & null usage explicitly
export const DEFAULT_UNASSIGNED_TEACHER = null;
export let optionalConfiguration = undefined; // Concept 2: Undefined variable

// ----------------------------------------------------------------------------
// 3. OBJECTS: TEACHERS DATA (Array of Teacher Objects)
// ----------------------------------------------------------------------------
export const initialTeachers = [
  {
    id: "tch-1",
    name: "Dr. Eleanor Vance",
    email: "eleanor.vance@evergreen.edu",
    phone: "+1 (555) 234-5671",
    department: "Mathematics",
    qualification: "Ph.D. in Applied Mathematics (MIT)",
    assignedClassIds: ["cls-1", "cls-3"],
    subjectSpecialties: ["Advanced Mathematics", "Computer Science & Logic"],
    status: "Active",
    avatarColor: "bg-blue-600",
    experienceYears: 12
  },
  {
    id: "tch-2",
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@evergreen.edu",
    phone: "+1 (555) 345-6782",
    department: "Sciences",
    qualification: "M.Sc. in Theoretical Physics (Stanford)",
    assignedClassIds: ["cls-1", "cls-2", "cls-6"],
    subjectSpecialties: ["Applied Physics", "Physical Health & Athletics"],
    status: "Active",
    avatarColor: "bg-emerald-600",
    experienceYears: 8
  },
  {
    id: "tch-3",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@evergreen.edu",
    phone: "+1 (555) 456-7893",
    department: "Languages",
    qualification: "M.A. in English Literature (Oxford)",
    assignedClassIds: ["cls-2", "cls-4"],
    subjectSpecialties: ["World Literature"],
    status: "Active",
    avatarColor: "bg-purple-600",
    experienceYears: 10
  },
  {
    id: "tch-4",
    name: "David Zhang",
    email: "david.zhang@evergreen.edu",
    phone: "+1 (555) 567-8904",
    department: "Computer Science",
    qualification: "M.S. in Software Engineering (Carnegie Mellon)",
    assignedClassIds: ["cls-1", "cls-3"],
    subjectSpecialties: ["Computer Science & Logic"],
    status: "Active",
    avatarColor: "bg-indigo-600",
    experienceYears: 7
  },
  {
    id: "tch-5",
    name: "Dr. Amanda Chen",
    email: "amanda.chen@evergreen.edu",
    phone: "+1 (555) 678-9015",
    department: "Sciences",
    qualification: "Ph.D. in Organic Chemistry (UC Berkeley)",
    assignedClassIds: ["cls-5"],
    subjectSpecialties: ["Organic & Inorganic Chemistry", "Cellular Biology & Genetics"],
    status: "Active",
    avatarColor: "bg-amber-600",
    experienceYears: 14
  },
  {
    id: "tch-6",
    name: "Robert Morales",
    email: "robert.morales@evergreen.edu",
    phone: "+1 (555) 789-0126",
    department: "Humanities",
    qualification: "M.A. in World History (Columbia)",
    assignedClassIds: ["cls-2", "cls-4", "cls-6"],
    subjectSpecialties: ["Modern World History", "Studio Fine Arts & Design"],
    status: "Active",
    avatarColor: "bg-rose-600",
    experienceYears: 9
  }
];

// ----------------------------------------------------------------------------
// 3. OBJECTS: SUBJECTS DATA (Array of Subject Objects)
// ----------------------------------------------------------------------------
export const initialSubjects = [
  {
    id: "sbj-1",
    code: "MATH-101",
    name: "Advanced Mathematics",
    department: "Mathematics",
    credits: 4,
    weeklyHours: 5,
    description: "Calculus, analytical geometry, functions, and mathematical modeling.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "sbj-2",
    code: "PHYS-201",
    name: "Applied Physics",
    department: "Sciences",
    credits: 4,
    weeklyHours: 4,
    description: "Newtonian mechanics, thermodynamics, wave optics, and electromagnetic fields.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "sbj-3",
    code: "LIT-102",
    name: "World Literature",
    department: "Languages",
    credits: 3,
    weeklyHours: 4,
    description: "Critical analysis of classical & contemporary global literature and composition.",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "sbj-4",
    code: "CS-301",
    name: "Computer Science & Logic",
    department: "Computer Science",
    credits: 4,
    weeklyHours: 5,
    description: "Algorithms, structured data, web technologies, and computational problem solving.",
    color: "from-cyan-500 to-blue-600"
  },
  {
    id: "sbj-5",
    code: "CHEM-202",
    name: "Organic & Inorganic Chemistry",
    department: "Sciences",
    credits: 4,
    weeklyHours: 4,
    description: "Atomic structure, chemical kinetics, organic reactions, and laboratory safety.",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "sbj-6",
    code: "HIST-105",
    name: "Modern World History",
    department: "Humanities",
    credits: 3,
    weeklyHours: 3,
    description: "Major social, political, and economic revolutions of the 19th and 20th centuries.",
    color: "from-rose-500 to-red-600"
  },
  {
    id: "sbj-7",
    code: "BIO-104",
    name: "Cellular Biology & Genetics",
    department: "Sciences",
    credits: 4,
    weeklyHours: 4,
    description: "Cellular structures, DNA replication, heredity principles, and ecology.",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: "sbj-8",
    code: "ART-110",
    name: "Studio Fine Arts & Design",
    department: "Arts & Physical Ed",
    credits: 2,
    weeklyHours: 2,
    description: "Visual composition, perspective drawing, color theory, and digital graphics.",
    color: "from-violet-500 to-purple-600"
  },
  {
    id: "sbj-9",
    code: "PE-101",
    name: "Physical Health & Athletics",
    department: "Arts & Physical Ed",
    credits: 2,
    weeklyHours: 2,
    description: "Cardiovascular endurance, team sports tactics, and nutritional health.",
    color: "from-teal-500 to-cyan-600"
  }
];

// ----------------------------------------------------------------------------
// 4. TYPES OF OBJECTS: NESTED OBJECTS & ARRAYS OF OBJECTS (STUDENTS)
// ----------------------------------------------------------------------------
export const initialStudents = [
  {
    id: "std-1",
    name: "Alexander Hayes",
    email: "alex.hayes@student.evergreen.edu",
    grade: "Grade 10",
    gender: "Male",
    status: "Active",
    attendanceRate: 96.5,
    gpa: 3.88,
    contact: {
      phone: "+1 (555) 111-2233",
      guardianName: "Thomas & Rebecca Hayes",
      address: "742 Evergreen Terrace, Springfield"
    },
    enrolledClassIds: ["cls-1"]
  },
  {
    id: "std-2",
    name: "Sophia Martinez",
    email: "sophia.m@student.evergreen.edu",
    grade: "Grade 10",
    gender: "Female",
    status: "Active",
    attendanceRate: 98.2,
    gpa: 3.95,
    contact: {
      phone: "+1 (555) 222-3344",
      guardianName: "Carlos Martinez",
      address: "128 Oakridge Lane, Highpoint"
    },
    enrolledClassIds: ["cls-1"]
  },
  {
    id: "std-3",
    name: "Ethan Wright",
    email: "ethan.w@student.evergreen.edu",
    grade: "Grade 10",
    gender: "Male",
    status: "Active",
    attendanceRate: 91.0,
    gpa: 3.45,
    contact: {
      phone: "+1 (555) 333-4455",
      guardianName: "Karen Wright",
      address: "45 Pinecrest Blvd, Highpoint"
    },
    enrolledClassIds: ["cls-1"]
  },
  {
    id: "std-4",
    name: "Olivia Kim",
    email: "olivia.kim@student.evergreen.edu",
    grade: "Grade 9",
    gender: "Female",
    status: "Active",
    attendanceRate: 99.1,
    gpa: 4.00,
    contact: {
      phone: "+1 (555) 444-5566",
      guardianName: "Min-Jun Kim",
      address: "89 Cedar Ave, Riverdale"
    },
    enrolledClassIds: ["cls-2"]
  },
  {
    id: "std-5",
    name: "Liam O'Connor",
    email: "liam.oc@student.evergreen.edu",
    grade: "Grade 9",
    gender: "Male",
    status: "Active",
    attendanceRate: 94.0,
    gpa: 3.60,
    contact: {
      phone: "+1 (555) 555-6677",
      guardianName: "Sean O'Connor",
      address: "12 Maple Court, Riverdale"
    },
    enrolledClassIds: ["cls-2"]
  },
  {
    id: "std-6",
    name: "Emma Watson",
    email: "emma.watson@student.evergreen.edu",
    grade: "Grade 9",
    gender: "Female",
    status: "Active",
    attendanceRate: 95.8,
    gpa: 3.75,
    contact: {
      phone: "+1 (555) 666-7788",
      guardianName: "Helen Watson",
      address: "31 Willow Drive, Riverdale"
    },
    enrolledClassIds: ["cls-2"]
  },
  {
    id: "std-7",
    name: "Lucas Rivera",
    email: "lucas.r@student.evergreen.edu",
    grade: "Grade 11",
    gender: "Male",
    status: "Active",
    attendanceRate: 92.4,
    gpa: 3.52,
    contact: {
      phone: "+1 (555) 777-8899",
      guardianName: "Elena Rivera",
      address: "65 Magnolia Way, Sunnyvale"
    },
    enrolledClassIds: ["cls-3"]
  },
  {
    id: "std-8",
    name: "Mia Patel",
    email: "mia.patel@student.evergreen.edu",
    grade: "Grade 11",
    gender: "Female",
    status: "Active",
    attendanceRate: 97.6,
    gpa: 3.91,
    contact: {
      phone: "+1 (555) 888-9900",
      guardianName: "Rajesh & Anita Patel",
      address: "201 Elm Street, Sunnyvale"
    },
    enrolledClassIds: ["cls-3"]
  },
  {
    id: "std-9",
    name: "Noah Brooks",
    email: "noah.b@student.evergreen.edu",
    grade: "Grade 11",
    gender: "Male",
    status: "Active",
    attendanceRate: 88.5,
    gpa: 3.20,
    contact: {
      phone: "+1 (555) 999-0011",
      guardianName: "Gregory Brooks",
      address: "14 Birch Lane, Sunnyvale"
    },
    enrolledClassIds: ["cls-3"]
  },
  {
    id: "std-10",
    name: "Ava Johnson",
    email: "ava.j@student.evergreen.edu",
    grade: "Grade 10",
    gender: "Female",
    status: "Active",
    attendanceRate: 96.0,
    gpa: 3.82,
    contact: {
      phone: "+1 (555) 123-4567",
      guardianName: "Dorothy Johnson",
      address: "53 Aspen Street, Highpoint"
    },
    enrolledClassIds: ["cls-1"]
  },
  {
    id: "std-11",
    name: "Benjamin Scott",
    email: "ben.scott@student.evergreen.edu",
    grade: "Grade 12",
    gender: "Male",
    status: "Active",
    attendanceRate: 94.7,
    gpa: 3.68,
    contact: {
      phone: "+1 (555) 234-5678",
      guardianName: "Walter Scott",
      address: "77 Redwood Road, Westwood"
    },
    enrolledClassIds: ["cls-4"]
  },
  {
    id: "std-12",
    name: "Chloe Bennett",
    email: "chloe.b@student.evergreen.edu",
    grade: "Grade 12",
    gender: "Female",
    status: "Active",
    attendanceRate: 98.9,
    gpa: 3.97,
    contact: {
      phone: "+1 (555) 345-6789",
      guardianName: "Patricia Bennett",
      address: "109 Laurel Crest, Westwood"
    },
    enrolledClassIds: ["cls-4"]
  },
  {
    id: "std-13",
    name: "Daniel Foster",
    email: "daniel.f@student.evergreen.edu",
    grade: "Grade 12",
    gender: "Male",
    status: "Active",
    attendanceRate: 90.2,
    gpa: 3.35,
    contact: {
      phone: "+1 (555) 456-7890",
      guardianName: "James Foster",
      address: "240 Cypress Plaza, Westwood"
    },
    enrolledClassIds: ["cls-4"]
  },
  {
    id: "std-14",
    name: "Grace Taylor",
    email: "grace.t@student.evergreen.edu",
    grade: "Grade 11",
    gender: "Female",
    status: "Active",
    attendanceRate: 95.3,
    gpa: 3.79,
    contact: {
      phone: "+1 (555) 567-8901",
      guardianName: "Simon Taylor",
      address: "18 Hickory Circle, Sunnyvale"
    },
    enrolledClassIds: ["cls-5"]
  },
  {
    id: "std-15",
    name: "Henry Campbell",
    email: "henry.c@student.evergreen.edu",
    grade: "Grade 11",
    gender: "Male",
    status: "Active",
    attendanceRate: 93.1,
    gpa: 3.55,
    contact: {
      phone: "+1 (555) 678-9012",
      guardianName: "Clara Campbell",
      address: "302 Sycamore Way, Sunnyvale"
    },
    enrolledClassIds: ["cls-5"]
  },
  {
    id: "std-16",
    name: "Isabella Garcia",
    email: "isabella.g@student.evergreen.edu",
    grade: "Grade 12",
    gender: "Female",
    status: "Active",
    attendanceRate: 97.4,
    gpa: 3.86,
    contact: {
      phone: "+1 (555) 789-0123",
      guardianName: "Mateo Garcia",
      address: "411 Alder Street, Westwood"
    },
    enrolledClassIds: ["cls-6"]
  },
  {
    id: "std-17",
    name: "Jack Robinson",
    email: "jack.r@student.evergreen.edu",
    grade: "Grade 12",
    gender: "Male",
    status: "Active",
    attendanceRate: 89.9,
    gpa: 3.15,
    contact: {
      phone: "+1 (555) 890-1234",
      guardianName: "Victoria Robinson",
      address: "88 Chestnut Ave, Westwood"
    },
    enrolledClassIds: ["cls-6"]
  },
  {
    id: "std-18",
    name: "Lily Zhang",
    email: "lily.zhang@student.evergreen.edu",
    grade: "Grade 12",
    gender: "Female",
    status: "Active",
    attendanceRate: 99.4,
    gpa: 4.00,
    contact: {
      phone: "+1 (555) 901-2345",
      guardianName: "Wei & Lin Zhang",
      address: "512 Walnut Row, Westwood"
    },
    enrolledClassIds: ["cls-6"]
  }
];

// ----------------------------------------------------------------------------
// 3. OBJECTS: CLASSES DATA (Array of Class Objects)
// ----------------------------------------------------------------------------
export const initialClasses = [
  {
    id: "cls-1",
    name: "Grade 10-A (Honors STEM)",
    code: "G10-A",
    grade: "Grade 10",
    room: "Science Wing 301",
    capacity: 25,
    teacherId: "tch-1", // Dr. Eleanor Vance
    subjectIds: ["sbj-1", "sbj-2", "sbj-4"],
    studentIds: ["std-1", "std-2", "std-3", "std-10"],
    isArchived: false,
    description: "Accelerated science, technology, engineering, and mathematics cohort.",
    metadata: {
      semester: "Spring 2026",
      academicYear: "2026-2027",
      colorTheme: "blue"
    }
  },
  {
    id: "cls-2",
    name: "Grade 9-B (General Studies)",
    code: "G9-B",
    grade: "Grade 9",
    room: "Main Hall 104",
    capacity: 28,
    teacherId: "tch-3", // Sarah Jenkins
    subjectIds: ["sbj-3", "sbj-2", "sbj-8"],
    studentIds: ["std-4", "std-5", "std-6"],
    isArchived: false,
    description: "Foundational high-school curriculum covering world languages, sciences, and fine arts.",
    metadata: {
      semester: "Spring 2026",
      academicYear: "2026-2027",
      colorTheme: "purple"
    }
  },
  {
    id: "cls-3",
    name: "Grade 11-A (Computer & Data Science)",
    code: "G11-A",
    grade: "Grade 11",
    room: "Tech Lab 202",
    capacity: 24,
    teacherId: "tch-4", // David Zhang
    subjectIds: ["sbj-4", "sbj-1", "sbj-9"],
    studentIds: ["std-7", "std-8", "std-9"],
    isArchived: false,
    description: "Pre-college software engineering, algorithms, and computational thinking stream.",
    metadata: {
      semester: "Spring 2026",
      academicYear: "2026-2027",
      colorTheme: "indigo"
    }
  },
  {
    id: "cls-4",
    name: "Grade 12-A (Advanced Humanities & Lit)",
    code: "G12-A",
    grade: "Grade 12",
    room: "Humanities Wing 112",
    capacity: 22,
    teacherId: "tch-3", // Sarah Jenkins
    subjectIds: ["sbj-3", "sbj-6", "sbj-8"],
    studentIds: ["std-11", "std-12", "std-13"],
    isArchived: false,
    description: "Comprehensive study in world literature, global history, and rhetorical analysis.",
    metadata: {
      semester: "Spring 2026",
      academicYear: "2026-2027",
      colorTheme: "rose"
    }
  },
  {
    id: "cls-5",
    name: "Grade 11-B (Applied Sciences)",
    code: "G11-B",
    grade: "Grade 11",
    room: "Lab Block 205",
    capacity: 26,
    teacherId: "tch-5", // Dr. Amanda Chen
    subjectIds: ["sbj-5", "sbj-7", "sbj-1"],
    studentIds: ["std-14", "std-15"],
    isArchived: false,
    description: "Laboratory-intensive biology, organic chemistry, and environmental science study.",
    metadata: {
      semester: "Spring 2026",
      academicYear: "2026-2027",
      colorTheme: "amber"
    }
  },
  {
    id: "cls-6",
    name: "Grade 12-B (Social Sciences & Civics)",
    code: "G12-B",
    grade: "Grade 12",
    room: "West Hall 210",
    capacity: 20,
    teacherId: "tch-6", // Robert Morales
    subjectIds: ["sbj-6", "sbj-7", "sbj-9"],
    studentIds: ["std-16", "std-17", "std-18"],
    isArchived: false,
    description: "Capstone year curriculum in international relations, historical revolutions, and health.",
    metadata: {
      semester: "Spring 2026",
      academicYear: "2026-2027",
      colorTheme: "emerald"
    }
  }
];

// ----------------------------------------------------------------------------
// 3. OBJECTS: SCHEDULES DATA (Array of Schedule Objects - Timetable)
// ----------------------------------------------------------------------------
export const initialSchedules = [
  {
    id: "sch-1",
    classId: "cls-1",
    subjectId: "sbj-1",
    teacherId: "tch-1",
    day: "Monday",
    startTime: "08:00 - 09:00",
    room: "Science Wing 301",
    type: "Lecture"
  },
  {
    id: "sch-2",
    classId: "cls-1",
    subjectId: "sbj-2",
    teacherId: "tch-2",
    day: "Monday",
    startTime: "09:15 - 10:15",
    room: "Physics Lab 102",
    type: "Lab Practical"
  },
  {
    id: "sch-3",
    classId: "cls-1",
    subjectId: "sbj-4",
    teacherId: "tch-4",
    day: "Wednesday",
    startTime: "10:30 - 11:30",
    room: "Tech Lab 202",
    type: "Lab Practical"
  },
  {
    id: "sch-4",
    classId: "cls-2",
    subjectId: "sbj-3",
    teacherId: "tch-3",
    day: "Tuesday",
    startTime: "08:00 - 09:00",
    room: "Main Hall 104",
    type: "Seminar"
  },
  {
    id: "sch-5",
    classId: "cls-2",
    subjectId: "sbj-2",
    teacherId: "tch-2",
    day: "Thursday",
    startTime: "09:15 - 10:15",
    room: "Main Hall 104",
    type: "Lecture"
  },
  {
    id: "sch-6",
    classId: "cls-2",
    subjectId: "sbj-8",
    teacherId: "tch-6",
    day: "Friday",
    startTime: "13:30 - 14:30",
    room: "Art Studio B",
    type: "Studio Workshop"
  },
  {
    id: "sch-7",
    classId: "cls-3",
    subjectId: "sbj-4",
    teacherId: "tch-4",
    day: "Monday",
    startTime: "11:45 - 12:45",
    room: "Tech Lab 202",
    type: "Lecture"
  },
  {
    id: "sch-8",
    classId: "cls-3",
    subjectId: "sbj-1",
    teacherId: "tch-1",
    day: "Wednesday",
    startTime: "13:30 - 14:30",
    room: "Tech Lab 202",
    type: "Tutorial"
  },
  {
    id: "sch-9",
    classId: "cls-4",
    subjectId: "sbj-3",
    teacherId: "tch-3",
    day: "Tuesday",
    startTime: "10:30 - 11:30",
    room: "Humanities Wing 112",
    type: "Lecture"
  },
  {
    id: "sch-10",
    classId: "cls-4",
    subjectId: "sbj-6",
    teacherId: "tch-6",
    day: "Thursday",
    startTime: "11:45 - 12:45",
    room: "Humanities Wing 112",
    type: "Seminar"
  },
  {
    id: "sch-11",
    classId: "cls-5",
    subjectId: "sbj-5",
    teacherId: "tch-5",
    day: "Monday",
    startTime: "14:45 - 15:45",
    room: "Chemistry Lab 304",
    type: "Lab Practical"
  },
  {
    id: "sch-12",
    classId: "cls-5",
    subjectId: "sbj-7",
    teacherId: "tch-5",
    day: "Wednesday",
    startTime: "09:15 - 10:15",
    room: "Bio Lab 305",
    type: "Lecture"
  },
  {
    id: "sch-13",
    classId: "cls-6",
    subjectId: "sbj-6",
    teacherId: "tch-6",
    day: "Tuesday",
    startTime: "13:30 - 14:30",
    room: "West Hall 210",
    type: "Lecture"
  },
  {
    id: "sch-14",
    classId: "cls-6",
    subjectId: "sbj-9",
    teacherId: "tch-2",
    day: "Friday",
    startTime: "14:45 - 15:45",
    room: "Athletic Gymnasium",
    type: "Physical Session"
  }
];

// ----------------------------------------------------------------------------
// 6. TYPES OF ARRAYS: Nested matrix demo (Weekly Time Matrix representation)
// ----------------------------------------------------------------------------
export const TIMETABLE_GRID_MATRIX = [
  // [Slot Name, Monday, Tuesday, Wednesday, Thursday, Friday]
  ["08:00 - 09:00", ["sch-1"], ["sch-4"], [], [], []],
  ["09:15 - 10:15", ["sch-2"], [], ["sch-12"], ["sch-5"], []],
  ["10:30 - 11:30", [], ["sch-9"], ["sch-3"], [], []],
  ["11:45 - 12:45", ["sch-7"], [], [], ["sch-10"], []],
  ["13:30 - 14:30", [], ["sch-13"], ["sch-8"], [], ["sch-6"]],
  ["14:45 - 15:45", ["sch-11"], [], [], [], ["sch-14"]]
];

// ----------------------------------------------------------------------------
// 8. TYPES OF FUNCTIONS: Helper Functions Demonstrating Declarations,
// Expressions, Arrows, Callbacks, and Higher-Order Functions
// ----------------------------------------------------------------------------

// Function Declaration: Calculate school metrics
export function calculateSchoolSummary(classes, students, teachers, subjects, schedules) {
  // Concept 1: let vs const
  let activeClassesCount = 0;
  let archivedClassesCount = 0;
  let totalStudentCapacity = 0;

  // Concept 8: Callback function inside forEach
  classes.forEach(function (cls) {
    if (cls.isArchived) {
      archivedClassesCount += 1;
    } else {
      activeClassesCount += 1;
      totalStudentCapacity += Number(cls.capacity) || 0;
    }
  });

  const totalEnrolledStudents = students.length;
  // Compute average attendance rate using reduce (Callback)
  const averageAttendance = (
    students.reduce((acc, curr) => acc + (curr.attendanceRate || 0), 0) / (totalEnrolledStudents || 1)
  ).toFixed(1);

  // Compute average class occupancy rate
  const occupancyPercentage = totalStudentCapacity > 0
    ? Math.round((totalEnrolledStudents / totalStudentCapacity) * 100)
    : 0;

  return {
    totalClasses: classes.length,
    activeClassesCount,
    archivedClassesCount,
    totalStudents: totalEnrolledStudents,
    totalTeachers: teachers.length,
    totalSubjects: subjects.length,
    totalSchedules: schedules.length,
    totalStudentCapacity,
    averageAttendance: Number(averageAttendance),
    occupancyPercentage
  };
}

// Function Expression: Format academic code
export const formatAcademicCode = function (prefix, number) {
  return `${String(prefix).toUpperCase()}-${String(number).padStart(3, "0")}`;
};

// Arrow Function: Quick predicate search
export const matchesQuery = (targetStr, queryStr) => {
  if (!targetStr || !queryStr) return false;
  return targetStr.toString().toLowerCase().includes(queryStr.trim().toLowerCase());
};

// Higher-Order Function: Creates a filter function for given search query and keys
export function createEntityFilter(searchQuery, keysToMatch) {
  // Returns a callback function (Higher-Order Function pattern)
  return function (entity) {
    if (!searchQuery || searchQuery.trim() === "") return true;
    const query = searchQuery.toLowerCase().trim();

    return keysToMatch.some((key) => {
      const value = entity[key];
      if (value === null || value === undefined) return false;
      if (Array.isArray(value)) {
        return value.some((v) => String(v).toLowerCase().includes(query));
      }
      return String(value).toLowerCase().includes(query);
    });
  };
}

// Utility to generate unique ID with prefix
export const generateId = (prefix = "item") => {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
};
