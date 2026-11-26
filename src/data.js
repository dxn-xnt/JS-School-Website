// ==========================================================================
// EVERGREEN HORIZON ACADEMY - src/data.js
// All app data, helper functions, factories and the shared DataStore live here.
// Read this file from top to bottom: each section teaches one JavaScript topic.
//
// TOPIC CHECKLIST (where each required topic is shown)
// [x] Variables & Types   -> Section 1, line  17 (const, let, string, number, boolean, null, undefined)
// [x] Objects             -> Section 2, line  55 (SCHOOL_INFO: nested object + method, subject/schedule shapes)
// [x] Arrays              -> Section 3, line  78 (initialSubjects, initialSchedules, students, teachers, classes)
// [x] Functions           -> Section 4, line 771 (declaration, expression, arrow, default parameters)
// [x] Factory             -> Section 5, line 915 (createSubject, createSchedule, createRecord)
// [x] Singleton Pattern   -> Section 6, line 979 (DataStore.getInstance())
// Section 7, line 1079 lists everything this file exports.
// ==========================================================================

// ==========================================
// SECTION 1: VARIABLES & TYPES
// const = a value that never gets reassigned, let = a value that changes (we never use var)
// ==========================================
const SCHOOL_NAME = "Evergreen Horizon Academy"; // string
const ACADEMIC_YEAR = "2026-2027"; // string
const SEMESTER = "Spring Term"; // string

const DEFAULT_CREDITS = 3; // number
const DEFAULT_WEEKLY_HOURS = 3; // number
const DEFAULT_SESSION_TYPE = "Lecture"; // string
const DEFAULT_ROOM = "Room TBA"; // string
const DEFAULT_SUBJECT_COLOR = "from-blue-500 to-indigo-600"; // string (Tailwind gradient classes)
const STORAGE_KEY = "evergreen_school_admin_v2"; // string: prefix for the browser's localStorage keys

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; // array of strings
const GRADE_LEVELS = ["Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const DEPARTMENTS = [
  "Mathematics",
  "Sciences",
  "Humanities",
  "Languages",
  "Computer Science",
  "Arts & Physical Ed"
];
const SCHEDULE_TIME_SLOTS = [
  "08:00 - 09:00",
  "09:15 - 10:15",
  "10:30 - 11:30",
  "11:45 - 12:45",
  "13:30 - 14:30",
  "14:45 - 15:45"
];

const DEFAULT_UNASSIGNED_TEACHER = null; // null: "empty on purpose" (a schedule with no teacher)
let optionalConfiguration = undefined; // undefined: "not set yet" (let, because it may change later)
let createdIdCount = 0; // number that goes up every time generateId() runs

// ==========================================
// SECTION 2: OBJECTS
// An object groups related values under named properties: { name: value }
// ==========================================

// One school object. It shows a nested object (term) and a method (getTitle).
const SCHOOL_INFO = {
  name: SCHOOL_NAME, // string property
  academicYear: ACADEMIC_YEAR, // string property
  isOpen: true, // boolean property
  website: optionalConfiguration, // undefined property (no website set yet)
  term: { name: SEMESTER, startMonth: "January", endMonth: "June" }, // nested object
  // Method: a function stored inside an object. "this" means SCHOOL_INFO itself.
  getTitle() {
    return `${this.name} (${this.academicYear})`;
  }
};

// Shape of a SUBJECT object (real examples are in Section 3):
//   { id, code, name, department, credits, weeklyHours, description, color, isActive, isLab }
// Shape of a SCHEDULE object (real examples are in Section 3):
//   { id, classId, subjectId, teacherId, day, time: { start, end }, room, type }

// ==========================================
// SECTION 3: ARRAYS
// An array is an ordered list. Here every list holds objects (one per record).
// ==========================================

// Teachers: array of teacher objects
const initialTeachers = [
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

// Subjects: array of subject objects (isActive and isLab are booleans)
const initialSubjects = [
  {
    id: "sbj-1",
    code: "MATH-101",
    name: "Advanced Mathematics",
    department: "Mathematics",
    credits: 4, // number
    weeklyHours: 5, // number
    description: "Calculus, analytical geometry, functions, and mathematical modeling.", // string
    color: "from-blue-500 to-indigo-600",
    isActive: true, // boolean
    isLab: false // boolean: does this subject use a lab?
  },
  {
    id: "sbj-2",
    code: "PHYS-201",
    name: "Applied Physics",
    department: "Sciences",
    credits: 4, // number
    weeklyHours: 4, // number
    description: "Newtonian mechanics, thermodynamics, wave optics, and electromagnetic fields.", // string
    color: "from-emerald-500 to-teal-600",
    isActive: true, // boolean
    isLab: true // boolean: does this subject use a lab?
  },
  {
    id: "sbj-3",
    code: "LIT-102",
    name: "World Literature",
    department: "Languages",
    credits: 3, // number
    weeklyHours: 4, // number
    description: "Critical analysis of classical & contemporary global literature and composition.", // string
    color: "from-purple-500 to-pink-600",
    isActive: true, // boolean
    isLab: false // boolean: does this subject use a lab?
  },
  {
    id: "sbj-4",
    code: "CS-301",
    name: "Computer Science & Logic",
    department: "Computer Science",
    credits: 4, // number
    weeklyHours: 5, // number
    description: "Algorithms, structured data, web technologies, and computational problem solving.", // string
    color: "from-cyan-500 to-blue-600",
    isActive: true, // boolean
    isLab: true // boolean: does this subject use a lab?
  },
  {
    id: "sbj-5",
    code: "CHEM-202",
    name: "Organic & Inorganic Chemistry",
    department: "Sciences",
    credits: 4, // number
    weeklyHours: 4, // number
    description: "Atomic structure, chemical kinetics, organic reactions, and laboratory safety.", // string
    color: "from-amber-500 to-orange-600",
    isActive: true, // boolean
    isLab: true // boolean: does this subject use a lab?
  },
  {
    id: "sbj-6",
    code: "HIST-105",
    name: "Modern World History",
    department: "Humanities",
    credits: 3, // number
    weeklyHours: 3, // number
    description: "Major social, political, and economic revolutions of the 19th and 20th centuries.", // string
    color: "from-rose-500 to-red-600",
    isActive: true, // boolean
    isLab: false // boolean: does this subject use a lab?
  },
  {
    id: "sbj-7",
    code: "BIO-104",
    name: "Cellular Biology & Genetics",
    department: "Sciences",
    credits: 4, // number
    weeklyHours: 4, // number
    description: "Cellular structures, DNA replication, heredity principles, and ecology.", // string
    color: "from-green-500 to-emerald-600",
    isActive: true, // boolean
    isLab: true // boolean: does this subject use a lab?
  },
  {
    id: "sbj-8",
    code: "ART-110",
    name: "Studio Fine Arts & Design",
    department: "Arts & Physical Ed",
    credits: 2, // number
    weeklyHours: 2, // number
    description: "Visual composition, perspective drawing, color theory, and digital graphics.", // string
    color: "from-violet-500 to-purple-600",
    isActive: true, // boolean
    isLab: false // boolean: does this subject use a lab?
  },
  {
    id: "sbj-9",
    code: "PE-101",
    name: "Physical Health & Athletics",
    department: "Arts & Physical Ed",
    credits: 2, // number
    weeklyHours: 2, // number
    description: "Cardiovascular endurance, team sports tactics, and nutritional health.", // string
    color: "from-teal-500 to-cyan-600",
    isActive: true, // boolean
    isLab: false // boolean: does this subject use a lab?
  }
];

// Students: array of student objects (each has a nested contact object)
const initialStudents = [
  {
    id: "std-1",
    name: "Alexander Hayes",
    email: "alex.hayes@student.evergreen.edu",
    grade: "Grade 10",
    gender: "Male",
    status: "Active",
    contact: {
      phone: "+1 (555) 111-2233",
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
    contact: {
      phone: "+1 (555) 222-3344",
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
    contact: {
      phone: "+1 (555) 333-4455",
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
    contact: {
      phone: "+1 (555) 444-5566",
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
    contact: {
      phone: "+1 (555) 555-6677",
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
    contact: {
      phone: "+1 (555) 666-7788",
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
    contact: {
      phone: "+1 (555) 777-8899",
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
    contact: {
      phone: "+1 (555) 888-9900",
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
    contact: {
      phone: "+1 (555) 999-0011",
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
    contact: {
      phone: "+1 (555) 123-4567",
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
    contact: {
      phone: "+1 (555) 234-5678",
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
    contact: {
      phone: "+1 (555) 345-6789",
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
    contact: {
      phone: "+1 (555) 456-7890",
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
    contact: {
      phone: "+1 (555) 567-8901",
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
    contact: {
      phone: "+1 (555) 678-9012",
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
    contact: {
      phone: "+1 (555) 789-0123",
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
    contact: {
      phone: "+1 (555) 890-1234",
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
    contact: {
      phone: "+1 (555) 901-2345",
      address: "512 Walnut Row, Westwood"
    },
    enrolledClassIds: ["cls-6"]
  }
];

// Classes: array of class objects
const initialClasses = [
  {
    id: "cls-1",
    name: "Grade 10-A (Honors STEM)",
    code: "G10-A",
    grade: "Grade 10",
    room: "Science Wing 301",
    capacity: 25,
    teacherId: "tch-1",
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
    teacherId: "tch-3",
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
    teacherId: "tch-4",
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
    teacherId: "tch-3",
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
    teacherId: "tch-5",
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
    teacherId: "tch-6",
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

// Schedules: array of schedule objects (each has a nested time object)
const initialSchedules = [
  {
    id: "sch-1",
    classId: "cls-1",
    subjectId: "sbj-1",
    teacherId: "tch-1",
    day: "Monday",
    time: { start: "08:00", end: "09:00" }, // nested object
    room: "Science Wing 301",
    type: "Lecture"
  },
  {
    id: "sch-2",
    classId: "cls-1",
    subjectId: "sbj-2",
    teacherId: "tch-2",
    day: "Monday",
    time: { start: "09:15", end: "10:15" }, // nested object
    room: "Physics Lab 102",
    type: "Lab Practical"
  },
  {
    id: "sch-3",
    classId: "cls-1",
    subjectId: "sbj-4",
    teacherId: "tch-4",
    day: "Wednesday",
    time: { start: "10:30", end: "11:30" }, // nested object
    room: "Tech Lab 202",
    type: "Lab Practical"
  },
  {
    id: "sch-4",
    classId: "cls-2",
    subjectId: "sbj-3",
    teacherId: "tch-3",
    day: "Tuesday",
    time: { start: "08:00", end: "09:00" }, // nested object
    room: "Main Hall 104",
    type: "Seminar"
  },
  {
    id: "sch-5",
    classId: "cls-2",
    subjectId: "sbj-2",
    teacherId: "tch-2",
    day: "Thursday",
    time: { start: "09:15", end: "10:15" }, // nested object
    room: "Main Hall 104",
    type: "Lecture"
  },
  {
    id: "sch-6",
    classId: "cls-2",
    subjectId: "sbj-8",
    teacherId: "tch-6",
    day: "Friday",
    time: { start: "13:30", end: "14:30" }, // nested object
    room: "Art Studio B",
    type: "Studio Workshop"
  },
  {
    id: "sch-7",
    classId: "cls-3",
    subjectId: "sbj-4",
    teacherId: "tch-4",
    day: "Monday",
    time: { start: "11:45", end: "12:45" }, // nested object
    room: "Tech Lab 202",
    type: "Lecture"
  },
  {
    id: "sch-8",
    classId: "cls-3",
    subjectId: "sbj-1",
    teacherId: "tch-1",
    day: "Wednesday",
    time: { start: "13:30", end: "14:30" }, // nested object
    room: "Tech Lab 202",
    type: "Tutorial"
  },
  {
    id: "sch-9",
    classId: "cls-4",
    subjectId: "sbj-3",
    teacherId: "tch-3",
    day: "Tuesday",
    time: { start: "10:30", end: "11:30" }, // nested object
    room: "Humanities Wing 112",
    type: "Lecture"
  },
  {
    id: "sch-10",
    classId: "cls-4",
    subjectId: "sbj-6",
    teacherId: "tch-6",
    day: "Thursday",
    time: { start: "11:45", end: "12:45" }, // nested object
    room: "Humanities Wing 112",
    type: "Seminar"
  },
  {
    id: "sch-11",
    classId: "cls-5",
    subjectId: "sbj-5",
    teacherId: "tch-5",
    day: "Monday",
    time: { start: "14:45", end: "15:45" }, // nested object
    room: "Chemistry Lab 304",
    type: "Lab Practical"
  },
  {
    id: "sch-12",
    classId: "cls-5",
    subjectId: "sbj-7",
    teacherId: "tch-5",
    day: "Wednesday",
    time: { start: "09:15", end: "10:15" }, // nested object
    room: "Bio Lab 305",
    type: "Lecture"
  },
  {
    id: "sch-13",
    classId: "cls-6",
    subjectId: "sbj-6",
    teacherId: "tch-6",
    day: "Tuesday",
    time: { start: "13:30", end: "14:30" }, // nested object
    room: "West Hall 210",
    type: "Lecture"
  },
  {
    id: "sch-14",
    classId: "cls-6",
    subjectId: "sbj-9",
    teacherId: "tch-2",
    day: "Friday",
    time: { start: "14:45", end: "15:45" }, // nested object
    room: "Athletic Gymnasium",
    type: "Physical Session"
  }
];

// ==========================================
// SECTION 4: FUNCTIONS
// Small, single-purpose helpers. Pages and the factories reuse them.
// ==========================================

// Function declaration with a DEFAULT PARAMETER (prefix = "item").
// Makes a unique id such as "sbj-lq3k2a-1"; the counter keeps ids unique within one session.
function generateId(prefix = "item") {
  createdIdCount += 1;
  return `${prefix}-${Date.now().toString(36)}-${createdIdCount}`;
}

// Function with a DEFAULT PARAMETER (separator = " - ").
// Turns "08:00" and "09:00" into "08:00 - 09:00", the label used by the timetable.
function formatTimeRange(start, end, separator = " - ") {
  return `${start}${separator}${end}`;
}

// Splits a label like "08:00 - 09:00" back into { start, end } (the opposite of formatTimeRange).
function parseTimeSlot(timeSlotLabel) {
  const [start, end] = String(timeSlotLabel)
    .split("-")
    .map((part) => part.trim());
  if (!start || !end) {
    throw new Error(`Time slot must look like "08:00 - 09:00" (got "${timeSlotLabel}").`);
  }
  return { start, end };
}

// Function declaration: gives the timetable label of a schedule, e.g. "08:00 - 09:00".
function getTimeSlotLabel(schedule) {
  return formatTimeRange(schedule.time.start, schedule.time.end);
}

// Arrow function: names the real type of a value (typeof alone says "object" for null and arrays).
const getTypeName = (value) => {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
};

// Function expression: a short text label for a subject, e.g. "MATH-101 - Advanced Mathematics".
const getSubjectLabel = function (subject) {
  return `${subject.code} - ${subject.name}`;
};

// FIND: returns the subject with this id, or null when it does not exist.
function getSubjectById(subjects, subjectId) {
  return subjects.find((subject) => subject.id === subjectId) || null;
}

// FILTER: returns only the schedules that happen on the given day.
function getSchedulesByDay(schedules, day) {
  return schedules.filter((schedule) => schedule.day === day);
}

// SORT: returns a new list of subjects ordered A-Z by name (the original list is not changed).
const sortSubjectsByName = (subjects) =>
  [...subjects].sort((first, second) => first.name.localeCompare(second.name));

// SORT: returns a new list of schedules ordered by weekday first, then by start time.
function sortSchedulesByDayAndTime(schedules) {
  return [...schedules].sort((first, second) => {
    const dayDifference = WEEKDAYS.indexOf(first.day) - WEEKDAYS.indexOf(second.day);
    if (dayDifference !== 0) return dayDifference;
    return first.time.start.localeCompare(second.time.start);
  });
}

// REDUCE: counts subjects per department, e.g. { Sciences: 3, Mathematics: 1 }.
const countSubjectsByDepartment = (subjects) =>
  subjects.reduce((counts, subject) => {
    counts[subject.department] = (counts[subject.department] || 0) + 1;
    return counts;
  }, {});

// REDUCE: counts schedules per weekday, e.g. { Monday: 4, Tuesday: 3, ... } (days with none show 0).
function countSchedulesByDay(schedules) {
  const emptyCounts = Object.fromEntries(WEEKDAYS.map((day) => [day, 0]));
  return schedules.reduce((counts, schedule) => {
    counts[schedule.day] = (counts[schedule.day] || 0) + 1;
    return counts;
  }, emptyCounts);
}

// Higher-order function: builds a search function for the chosen fields.
// Example: createEntityFilter("math", ["name", "code"]) returns a function to use with .filter().
function createEntityFilter(searchQuery, keysToMatch) {
  return function (entity) {
    if (!searchQuery || searchQuery.trim() === "") return true;
    const query = searchQuery.toLowerCase().trim();

    return keysToMatch.some((key) => {
      const value = entity[key];
      if (value === null || value === undefined) return false;
      if (Array.isArray(value)) {
        return value.some((item) => String(item).toLowerCase().includes(query));
      }
      return String(value).toLowerCase().includes(query);
    });
  };
}

// Totals used by the dashboard cards (classes, students, teachers, subjects, schedules, seats).
function calculateSchoolSummary(classes, students, teachers, subjects, schedules) {
  const activeClasses = classes.filter((cls) => !cls.isArchived);
  const totalStudentCapacity = activeClasses.reduce(
    (total, cls) => total + (Number(cls.capacity) || 0),
    0
  );
  const occupancyPercentage =
    totalStudentCapacity > 0 ? Math.round((students.length / totalStudentCapacity) * 100) : 0;

  return {
    totalClasses: classes.length,
    activeClassesCount: activeClasses.length,
    archivedClassesCount: classes.length - activeClasses.length,
    totalStudents: students.length,
    totalTeachers: teachers.length,
    totalSubjects: subjects.length,
    totalSchedules: schedules.length,
    totalStudentCapacity,
    occupancyPercentage
  };
}

// Validation helper for the factories: returns the trimmed text, or throws if it is empty.
function requireText(value, fieldLabel) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldLabel} is required (got ${getTypeName(value)}).`);
  }
  return value.trim();
}

// Validation helper for the factories: turns a value into a positive number, or uses the fallback.
function toPositiveNumber(value, fallback, fieldLabel) {
  if (value === undefined || value === null || value === "") return fallback;
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`${fieldLabel} must be a positive number (got "${value}").`);
  }
  return number;
}

// ==========================================
// SECTION 5: FACTORY PATTERN
// Creates new subject and schedule objects in one place:
// validates the input, fills in defaults, generates an id, and returns a new object
// ==========================================

// Factory: builds one valid subject object. Throws an Error when name or code is missing.
function createSubject(subjectData = {}) {
  return {
    id: subjectData.id || generateId("sbj"),
    code: requireText(subjectData.code, "Subject code").toUpperCase(),
    name: requireText(subjectData.name, "Subject name"),
    department: subjectData.department || "General",
    credits: toPositiveNumber(subjectData.credits, DEFAULT_CREDITS, "Credits"),
    weeklyHours: toPositiveNumber(subjectData.weeklyHours, DEFAULT_WEEKLY_HOURS, "Weekly hours"),
    description: subjectData.description || "Course description.",
    color: subjectData.color || DEFAULT_SUBJECT_COLOR,
    isActive: subjectData.isActive ?? true,
    isLab: subjectData.isLab ?? false
  };
}

// Factory: builds one valid schedule object with a nested time { start, end }.
// The time can be given as a "08:00 - 09:00" label (startTime, used by the form) or as a time object.
function createSchedule(scheduleData = {}) {
  const day = scheduleData.day || WEEKDAYS[0];
  if (!WEEKDAYS.includes(day)) {
    throw new Error(`Day must be one of ${WEEKDAYS.join(", ")} (got "${day}").`);
  }

  const time = scheduleData.startTime
    ? parseTimeSlot(scheduleData.startTime)
    : scheduleData.time || parseTimeSlot(SCHEDULE_TIME_SLOTS[0]);
  if (time.end <= time.start) {
    throw new Error(`End time (${time.end}) must be after start time (${time.start}).`);
  }

  return {
    id: scheduleData.id || generateId("sch"),
    classId: requireText(scheduleData.classId, "Class"),
    subjectId: requireText(scheduleData.subjectId, "Subject"),
    teacherId: scheduleData.teacherId || DEFAULT_UNASSIGNED_TEACHER,
    day,
    time: { start: time.start, end: time.end },
    room: scheduleData.room || DEFAULT_ROOM,
    type: scheduleData.type || DEFAULT_SESSION_TYPE
  };
}

// Lookup object: maps a record type name to the factory that builds it.
const RECORD_FACTORIES = {
  subject: createSubject,
  schedule: createSchedule
};

// Factory of factories: createRecord("subject", data) picks the right factory from the lookup object.
function createRecord(recordType, recordData) {
  const factory = RECORD_FACTORIES[recordType];
  if (!factory) {
    throw new Error(`Unknown record type "${recordType}".`);
  }
  return factory(recordData);
}

// ==========================================
// SECTION 6: SINGLETON PATTERN
// ONE shared DataStore holds all school data, so every page sees the same records
// ==========================================

// Singleton class: only one DataStore can ever exist. Get it with DataStore.getInstance().
// It keeps classes, students, teachers, subjects and schedules, saves them in localStorage,
// and tells React (through subscribe) whenever something changes.
class DataStore {
  static instance = null; // the single shared copy (null until first requested)

  constructor() {
    if (DataStore.instance) {
      throw new Error("DataStore already exists. Use DataStore.getInstance() instead of new DataStore().");
    }
    this.listeners = new Set(); // functions to call after every change
    this.data = {
      classes: DataStore.loadList("classes", initialClasses),
      students: DataStore.loadList("students", initialStudents),
      teachers: DataStore.loadList("teachers", initialTeachers),
      subjects: DataStore.loadList("subjects", initialSubjects, createSubject),
      schedules: DataStore.loadList("schedules", initialSchedules, createSchedule)
    };
  }

  // Returns the one shared DataStore, creating it the first time only.
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  // Reads one saved list from localStorage. Saved records pass through the factory (when given)
  // so old saved data gets the newest fields. Falls back to the starting data on any problem.
  static loadList(listName, startingList, buildRecord = (record) => record) {
    try {
      const savedText = localStorage.getItem(`${STORAGE_KEY}_${listName}`);
      return savedText ? JSON.parse(savedText).map(buildRecord) : startingList;
    } catch (error) {
      console.warn(`Could not load saved ${listName}; using starting data.`, error);
      return startingList;
    }
  }

  get classes() { return this.data.classes; }
  get students() { return this.data.students; }
  get teachers() { return this.data.teachers; }
  get subjects() { return this.data.subjects; }
  get schedules() { return this.data.schedules; }

  // Returns one list by name, for example getList("subjects").
  getList(listName) {
    return this.data[listName];
  }

  // Replaces one list. Pass the new list, or a function that receives the old list and returns the new one.
  update(listName, newListOrUpdater) {
    const newList =
      typeof newListOrUpdater === "function" ? newListOrUpdater(this.data[listName]) : newListOrUpdater;
    this.data = { ...this.data, [listName]: newList };
    localStorage.setItem(`${STORAGE_KEY}_${listName}`, JSON.stringify(newList));
    this.listeners.forEach((listener) => listener());
  }

  // Lets React watch the store: the listener runs after every change. Returns an "unsubscribe" function.
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  // How many records exist right now (the sidebar badges read this).
  getCounts() {
    return {
      students: this.students.length,
      teachers: this.teachers.length,
      subjects: this.subjects.length,
      schedules: this.schedules.length
    };
  }

  // Reset Data button: forget everything saved and go back to the starting data.
  reset() {
    ["classes", "students", "teachers", "subjects", "schedules"].forEach((listName) =>
      localStorage.removeItem(`${STORAGE_KEY}_${listName}`)
    );
    this.data = {
      classes: initialClasses,
      students: initialStudents,
      teachers: initialTeachers,
      subjects: initialSubjects,
      schedules: initialSchedules
    };
    this.listeners.forEach((listener) => listener());
  }
}

// Proof that it is a singleton: asking twice returns the very same object, so this is true.
const isSingletonStore = DataStore.getInstance() === DataStore.getInstance();

// ==========================================
// SECTION 7: EXPORTS
// Everything other files are allowed to import from data.js
// ==========================================
export {
  // Section 1: variables & types
  SCHOOL_NAME,
  ACADEMIC_YEAR,
  SEMESTER,
  WEEKDAYS,
  GRADE_LEVELS,
  DEPARTMENTS,
  SCHEDULE_TIME_SLOTS,
  // Section 2: objects
  SCHOOL_INFO,
  // Section 3: arrays
  initialTeachers,
  initialSubjects,
  initialStudents,
  initialClasses,
  initialSchedules,
  // Section 4: functions
  generateId,
  formatTimeRange,
  getTimeSlotLabel,
  getSubjectLabel,
  getSubjectById,
  getSchedulesByDay,
  sortSubjectsByName,
  sortSchedulesByDayAndTime,
  countSubjectsByDepartment,
  countSchedulesByDay,
  createEntityFilter,
  calculateSchoolSummary,
  // Section 5: factory
  createSubject,
  createSchedule,
  createRecord,
  // Section 6: singleton
  DataStore,
  isSingletonStore
};
