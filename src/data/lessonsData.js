export const LESSON_MODULES = [
  {
    id: "intro",
    title: "Introduction",
    lessons: [
      {
        id: "overview",
        number: 0,
        title: "Course Overview",
        tag: "Introduction",
        readTime: "5 min",
        description: "Welcome to the JavaScript Basic Course. Learn what JavaScript is, why it powers the modern web, and how this course is structured.",
        objectives: [
          "Understand the role of JavaScript in web development",
          "Learn how JavaScript works alongside HTML and CSS",
          "Get familiar with the course structure and interactive coding environment"
        ],
        explanation: `JavaScript (JS) is the world's most popular programming language. It is the programming language of the Web, responsible for making web pages dynamic, interactive, and intelligent.\n\nWhile HTML provides the structure of a webpage and CSS provides styling, JavaScript adds behavior: responding to button clicks, processing forms, updating data in real time, and building complete applications.`,
        syntax: `// Running your first line of JavaScript
console.log("Hello, World!");`,
        codeExample: `// Welcome to JavaScript Basic Course
let schoolName = "DevCampus JS Academy";
let studentCount = 1250;
let isCourseActive = true;

console.log("Welcome to " + schoolName + "!");
console.log("Active Students: " + studentCount);
console.log("Course Status Active: " + isCourseActive);`,
        codeExplanation: [
          "Line 2: We declare a variable 'schoolName' storing the string text 'DevCampus JS Academy'.",
          "Line 3: We store the number 1250 in the variable 'studentCount'.",
          "Line 4: We store the boolean value 'true' indicating the course is active.",
          "Lines 6-8: 'console.log()' prints the combined messages to our output screen."
        ],
        realWorldExample: `In a real school portal, when you log in, JavaScript checks your credentials, displays your enrolled courses, and updates your notification badge dynamically without needing to reload the entire web page.`,
        commonMistakes: [
          "Forgetting that JavaScript is case-sensitive (e.g. 'myVariable' is different from 'myvariable').",
          "Confusing JavaScript with Java — they are two completely different programming languages with different uses."
        ],
        tips: [
          "Use the 'Try It Yourself' code editor at any time to experiment with the code.",
          "Use the 'console.log()' function frequently to inspect what your code is doing."
        ],
        editorCode: `// Try running your first JavaScript code!
let studentName = "Alex";
let currentGrade = 95;

console.log("Student: " + studentName);
console.log("Grade: " + currentGrade + "%");
console.log("Status: Passing with Honors!");`,
        practiceQuestion: {
          question: "What is the primary role of JavaScript in web development?",
          options: [
            "Defining the visual layout and fonts of a page",
            "Structuring headings, paragraphs, and tables",
            "Adding dynamic interactivity and logic to web pages",
            "Hosting files on a remote web server"
          ],
          correctIndex: 2,
          hint: "Think about what makes buttons react when clicked or calculates live scores."
        }
      }
    ]
  },
  {
    id: "variables-module",
    title: "Variables",
    lessons: [
      {
        id: "variables",
        number: 1,
        title: "Variables",
        tag: "Variables",
        readTime: "8 min",
        description: "Learn how variables act as containers to store data values, the differences between let, const, and var, and JavaScript naming rules.",
        objectives: [
          "Understand what variables are and why programs need them",
          "Declare variables using let, const, and var",
          "Learn the correct rules for naming identifiers in JavaScript",
          "Understand the differences between let, const, and var"
        ],
        explanation: `Variables are containers for storing data values. In JavaScript, before you can use a variable, you must declare it.\n\nThink of a variable as a labeled storage box in a school locker room. You label the box (the variable name) and place an item inside it (the value). Whenever you want to inspect or change what is inside, you reference that label.\n\nJavaScript offers three keywords to declare variables: 'let', 'const', and 'var'.\n• 'let': Block-scoped variable that can be updated/reassigned later.\n• 'const': Block-scoped constant that cannot be reassigned once created.\n• 'var': Older keyword with function scope (rarely used in modern JavaScript).`,
        syntax: `// Declaring variables
let variableName = value;       // Can be reassigned
const CONSTANT_NAME = value;    // Cannot be reassigned
var legacyName = value;         // Older syntax`,
        codeExample: `// Variable Declaration & Assignment
let studentName = "John";
let age = 18;
const school = "ABC University";
var course = "JavaScript";

// Updating a variable declared with let
age = 19;

console.log("Student: " + studentName);
console.log("Age: " + age);
console.log("University: " + school);
console.log("Enrolled Course: " + course);`,
        codeExplanation: [
          "Line 2: 'let studentName = \"John\"' declares a variable named studentName and assigns the text 'John' to it.",
          "Line 3: 'let age = 18' declares an age variable with a number value.",
          "Line 4: 'const school = \"ABC University\"' creates a permanent variable that cannot be changed later.",
          "Line 5: 'var course = \"JavaScript\"' demonstrates older var syntax.",
          "Line 8: 'age = 19' successfully reassigns the value of age from 18 to 19."
        ],
        realWorldExample: `In a university registration system, a student's 'studentID' and 'dateOfBirth' would be declared with 'const' because they never change. However, 'currentGPA' or 'completedCredits' would be declared with 'let' because they change each semester.`,
        namingRules: [
          "Names must begin with a letter, an underscore (_), or a dollar sign ($).",
          "Names cannot start with a number (e.g. '1student' is invalid, but 'student1' is valid).",
          "Names can only contain letters, digits, underscores, and dollar signs.",
          "Names are case-sensitive ('lastName' vs 'lastname').",
          "Reserved JavaScript keywords (such as let, const, class, return) cannot be used as variable names.",
          "Convention: Use camelCase for standard variables (e.g. 'studentFirstName')."
        ],
        comparisonTable: {
          headers: ["Keyword", "Reassignable?", "Re-declarable?", "Scope", "Recommended Use"],
          rows: [
            ["let", "Yes", "No (same scope)", "Block Scope { }", "For values that change (counters, scores)"],
            ["const", "No", "No", "Block Scope { }", "Default choice for fixed values & objects"],
            ["var", "Yes", "Yes", "Function / Global", "Legacy code (avoid in modern JS)"]
          ]
        },
        commonMistakes: [
          "Attempting to reassign a variable declared with 'const' (e.g., 'const pi = 3.14; pi = 3.14159;' throws a TypeError).",
          "Starting variable names with numbers (e.g., 'let 2students = 20;').",
          "Forgetting quotation marks around text strings (e.g., 'let name = John;' will look for a variable called John instead of the string 'John')."
        ],
        tips: [
          "Rule of thumb: Always declare with 'const' by default. Only switch to 'let' if you know the value will be reassigned.",
          "Avoid 'var' in modern JavaScript to prevent unexpected scoping issues."
        ],
        editorCode: `let name = "John";
let age = 18;
const school = "ABC University";

console.log("Original Name: " + name);
console.log("Age: " + age);
console.log("School: " + school);

// Let's modify the name and age
name = "Johnathan Doe";
age = age + 1;

console.log("Updated Name: " + name);
console.log("Updated Age: " + age);`,
        practiceQuestion: {
          question: "Which keyword should you use to declare a variable whose value will NEVER be reassigned?",
          options: ["let", "const", "var", "static"],
          correctIndex: 1,
          hint: "The keyword is short for 'constant'."
        }
      },
      {
        id: "types-of-variables",
        number: 2,
        title: "Types of Variables",
        tag: "Variables",
        readTime: "9 min",
        description: "Master JavaScript's 8 essential data types: String, Number, Boolean, Undefined, Null, Object, Symbol, and BigInt.",
        objectives: [
          "Identify the primitive and complex data types in JavaScript",
          "Understand the differences between undefined and null",
          "Use the typeof operator to inspect the type of any variable",
          "Recognize how JavaScript is a dynamically typed language"
        ],
        explanation: `In JavaScript, every value has a data type. JavaScript is a dynamically typed language, meaning variables are not directly bound to a specific type, and their types can change during execution.\n\nJavaScript has 8 fundamental data types divided into two categories:\n1. Primitive Types (immutable values):\n   • String (text data inside quotes)\n   • Number (integers and floating-point numbers)\n   • Boolean (true or false)\n   • Undefined (a variable that has been declared but not assigned a value)\n   • Null (represents an intentional absence of any object value)\n   • Symbol (unique identifier)\n   • BigInt (arbitrarily large integers)\n\n2. Complex / Non-Primitive Types:\n   • Object (collections of properties, arrays, functions, dates, etc.)`,
        syntax: `// Checking the type of any variable using typeof
typeof "Hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" (historical JavaScript quirk)
typeof { age: 20 }  // "object"`,
        codeExample: `// Exploring JavaScript Data Types
let name = "Maria";           // String
let age = 20;                 // Number
let enrolled = true;          // Boolean
let score;                    // Undefined (declared without value)
let result = null;            // Null (intentional empty value)
let studentID = Symbol("id"); // Symbol (unique)
let largeNumber = 9007199254740991n; // BigInt

console.log("name is:", typeof name, "| value:", name);
console.log("age is:", typeof age, "| value:", age);
console.log("enrolled is:", typeof enrolled, "| value:", enrolled);
console.log("score is:", typeof score, "| value:", score);
console.log("result is:", typeof result, "| value:", result);`,
        codeExplanation: [
          "Line 2: 'let name = \"Maria\"' is a String representing textual data.",
          "Line 3: 'let age = 20' is a Number representing numeric quantities.",
          "Line 4: 'let enrolled = true' is a Boolean (can only be true or false).",
          "Line 5: 'let score;' has no value assigned yet, so JavaScript gives it the value and type 'undefined'.",
          "Line 6: 'let result = null' intentionally represents an empty or non-existent value."
        ],
        realWorldExample: `Consider an online exam system:
• Student's name: "Maria Garcia" (String)
• Number of questions: 50 (Number)
• Exam submitted: false (Boolean)
• Grade before exam starts: null (Null - intentionally empty until graded)
• Unanswered question feedback: undefined (Undefined - not yet computed)`,
        comparisonTable: {
          headers: ["Data Type", "Example", "Description", "typeof Return"],
          rows: [
            ["String", "\"Hello\", 'Maria', `2026`", "Textual data enclosed in quotes", "\"string\""],
            ["Number", "25, 3.14, -100", "Integers and floating-point decimal numbers", "\"number\""],
            ["Boolean", "true, false", "Logical true or false conditions", "\"boolean\""],
            ["Undefined", "let x;", "A variable declared but not assigned a value", "\"undefined\""],
            ["Null", "let x = null;", "Intentional representation of empty/no value", "\"object\"*"],
            ["Object", "{ name: 'John' }, [1, 2, 3]", "Key-value collections or lists of data", "\"object\""],
            ["BigInt", "9007199254740991n", "Very large integers beyond Number.MAX_SAFE_INTEGER", "\"bigint\""],
            ["Symbol", "Symbol('key')", "Unique and immutable primitive identifier", "\"symbol\""]
          ]
        },
        commonMistakes: [
          "Putting quotes around numbers (e.g., 'let age = \"20\";'). This makes it a String, causing unexpected concatenation like '20' + 5 = '205' instead of 25.",
          "Confusing 'undefined' (automatic missing value) with 'null' (manual empty value).",
          "Forgetting that 'typeof null' returns 'object'. This is a well-known historical bug in JavaScript, but it is preserved for backward compatibility."
        ],
        tips: [
          "Use template literals with backticks (`` `Hello ${name}` ``) for easy string interpolation.",
          "Use 'typeof' whenever you are unsure what data format an API or user input returned."
        ],
        editorCode: `let studentName = "Maria";
let studentAge = 20;
let isEnrolled = true;
let midtermScore;
let finalGrade = null;

console.log("--- Student Data Types ---");
console.log("studentName:", studentName, "-> Type:", typeof studentName);
console.log("studentAge:", studentAge, "-> Type:", typeof studentAge);
console.log("isEnrolled:", isEnrolled, "-> Type:", typeof isEnrolled);
console.log("midtermScore:", midtermScore, "-> Type:", typeof midtermScore);
console.log("finalGrade:", finalGrade, "-> Type:", typeof finalGrade);`,
        practiceQuestion: {
          question: "What is the data type of the variable 'score' if declared as: let score = \"95\"; ?",
          options: ["Number", "String", "Undefined", "Boolean"],
          correctIndex: 1,
          hint: "Look closely at the quotation marks around the digits."
        }
      }
    ]
  },
  {
    id: "objects-module",
    title: "Objects",
    lessons: [
      {
        id: "objects",
        number: 3,
        title: "Objects",
        tag: "Objects",
        readTime: "10 min",
        description: "Understand JavaScript objects: key-value pairs, accessing properties via dot and bracket notation, modifying, adding, and deleting object properties.",
        objectives: [
          "Understand how objects represent structured real-world entities",
          "Create objects using object literal syntax",
          "Access properties using dot notation and bracket notation",
          "Add, modify, and delete object properties dynamically"
        ],
        explanation: `In JavaScript, objects are collections of key-value pairs. They allow you to group related variables and functions into a single entity.\n\nIf variables are single storage boxes, an object is a file cabinet containing many labeled drawers. Each drawer has a label (the property name or key) and contains a value (the property value).\n\nObjects are written using curly braces '{ }', with properties written as 'name: value' separated by commas.`,
        syntax: `// Object Declaration Syntax
const objectName = {
  key1: value1,
  key2: value2,
  key3: value3
};

// Accessing properties:
objectName.key1;       // Dot notation (recommended)
objectName["key1"];    // Bracket notation (useful for dynamic keys)`,
        codeExample: `// Creating a Student Object
let student = {
  name: "John",
  age: 18,
  course: "Information Technology",
  gpa: 3.85,
  isGraduated: false
};

// Accessing properties
console.log("Student Name:", student.name);
console.log("Enrolled Course:", student["course"]);

// Modifying an existing property
student.age = 19;

// Adding a new property
student.school = "ABC University";

// Deleting a property
delete student.isGraduated;

console.log("Updated Student Object:", student);
console.log("School:", student.school);`,
        codeExplanation: [
          "Lines 2-8: We define a 'student' object with 5 properties: name, age, course, gpa, and isGraduated.",
          "Line 11: 'student.name' uses dot notation to retrieve 'John'.",
          "Line 12: 'student[\"course\"]' uses bracket notation to retrieve 'Information Technology'.",
          "Line 15: 'student.age = 19' updates the age property from 18 to 19.",
          "Line 18: 'student.school = \"ABC University\"' adds a new key 'school' to the object.",
          "Line 21: 'delete student.isGraduated' permanently removes that key from the student object."
        ],
        realWorldExample: `A student management system represents each learner as an object containing their personal details, academic history, enrolled courses, and grades:
\`\`\`javascript
const student = {
  id: "STU-2026-081",
  fullName: "John Doe",
  department: "Computer Science",
  enrolledYear: 2024
};
\`\`\``,
        commonMistakes: [
          "Forgetting commas between key-value pairs inside the object.",
          "Using dot notation with property names that contain spaces or special characters (use bracket notation instead: \`student['first name']\`).",
          "Accessing a property that does not exist returns 'undefined' rather than throwing an error."
        ],
        tips: [
          "Use dot notation (\`student.name\`) for standard clean property access.",
          "Use bracket notation (\`student[variable]\`) when the property name is stored inside another variable."
        ],
        editorCode: `let student = {
  name: "John",
  age: 18,
  course: "Information Technology",
  school: "ABC University"
};

console.log("Original Student:", student.name, "| Age:", student.age);

// Update age and add a major
student.age = 19;
student.major = "Web Development";
student.honorRoll = true;

console.log("Name:", student.name);
console.log("New Age:", student.age);
console.log("Major:", student.major);
console.log("Honor Roll:", student.honorRoll);`,
        practiceQuestion: {
          question: "How do you access the 'age' property of an object named 'student' using dot notation?",
          options: ["student->age", "student.age", "student(age)", "student::age"],
          correctIndex: 1,
          hint: "In JavaScript, the period (.) operator is used for property access."
        }
      },
      {
        id: "types-of-objects",
        number: 4,
        title: "Types of Objects",
        tag: "Objects",
        readTime: "9 min",
        description: "Explore the different types of objects in JavaScript: Object Literals, Built-in Objects (Date, Math, String, Array), and Custom Objects.",
        objectives: [
          "Differentiate between Object Literals and Built-in standard JavaScript objects",
          "Work with the Date and Math built-in objects",
          "Understand wrapper objects for primitives (String, Number)",
          "Learn how custom objects and constructor functions structure data"
        ],
        explanation: `In JavaScript, 'almost everything is an object'. In addition to custom objects you create yourself, JavaScript comes with powerful standard built-in objects.\n\nThe main types of objects you will encounter include:\n1. Object Literals: Standard user-created '{ key: value }' structures.\n2. Built-in Utility Objects:\n   • Math: Provides mathematical constants and functions (e.g., Math.random(), Math.round(), Math.PI).\n   • Date: Handles dates, times, and calendars.\n   • JSON: Parses and converts data between JavaScript objects and JSON text.\n3. Wrapper Objects for Primitives: String, Number, Boolean objects that grant primitives helpful methods (e.g. \"hello\".toUpperCase()).\n4. Data Structure Objects: Array, Map, Set for managing lists and collections.\n5. Custom Objects & Classes: Blueprints for creating multiple objects of the same structure.`,
        syntax: `// Object Literal
const student = { name: "Maria", age: 19 };

// Built-in Date Object
const today = new Date();
today.getFullYear(); // returns current year

// Built-in Math Object (no instantiation needed)
Math.random(); // returns random float between 0 and 1
Math.round(4.7); // returns 5`,
        codeExample: `// Working with Different Object Types
// 1. Object Literal
let student = {
  name: "Maria",
  age: 19
};

// 2. Built-in Date Object
let today = new Date();
let currentYear = today.getFullYear();

// 3. Built-in Math Object
let randomNumber = Math.floor(Math.random() * 100) + 1; // 1 to 100
let highestScore = Math.max(88, 95, 76, 99, 91);

console.log("Student Object:", student.name, "is", student.age, "years old.");
console.log("Current Year from Date Object:", currentYear);
console.log("Random Student Score (Math):", randomNumber);
console.log("Highest Score (Math.max):", highestScore);`,
        codeExplanation: [
          "Line 2: 'student' is an Object Literal defining custom user data.",
          "Line 8: 'new Date()' creates an instance of the built-in Date object containing current system time.",
          "Line 9: 'today.getFullYear()' calls a method on the Date object to get the 4-digit year.",
          "Line 12: 'Math' is a static built-in object with utility methods like Math.random() and Math.floor().",
          "Line 13: 'Math.max()' calculates the largest numeric value among the passed arguments."
        ],
        realWorldExample: `When building an online quiz timer, JavaScript uses the 'Date' object to record when the student started the quiz and calculate elapsed seconds, and uses 'Math.round()' to format their final percentage score.`,
        comparisonTable: {
          headers: ["Object Type", "Description / Purpose", "Example Code"],
          rows: [
            ["Object Literal", "User-defined key-value record", "let student = { name: 'Maria' };"],
            ["Date Object", "Represents moments in time and calendars", "let now = new Date();"],
            ["Math Object", "Provides mathematical formulas and constants", "Math.sqrt(16); // 4"],
            ["Array Object", "Ordered list of values indexed by number", "let grades = [90, 85, 92];"],
            ["String Object", "Provides helper methods for text manipulation", "\"hello\".toUpperCase();"]
          ]
        },
        commonMistakes: [
          "Trying to create a new Math object with 'new Math()'. Math is a static object, not a constructor!",
          "Month numbering in Date objects: JavaScript months are 0-indexed (January = 0, December = 11).",
          "Modifying properties on primitive wrapper strings without reassigning."
        ],
        tips: [
          "Use 'Math.floor(Math.random() * N)' to generate random integers from 0 to N-1.",
          "Use 'new Date().toLocaleDateString()' to display clean, localized date text."
        ],
        editorCode: `// Experiment with Date and Math objects
let now = new Date();
let randomRoll = Math.floor(Math.random() * 6) + 1; // 1 to 6 dice roll
let roundUp = Math.ceil(84.2);
let roundDown = Math.floor(84.9);

console.log("Today's Date:", now.toDateString());
console.log("Current Year:", now.getFullYear());
console.log("Dice Roll (1-6):", randomRoll);
console.log("Math.ceil(84.2):", roundUp);
console.log("Math.floor(84.9):", roundDown);`,
        practiceQuestion: {
          question: "Which built-in JavaScript object provides methods like .random(), .round(), and .max()?",
          options: ["Number", "Math", "Calc", "Date"],
          correctIndex: 1,
          hint: "It shares its name with the school subject of mathematics."
        }
      }
    ]
  },
  {
    id: "arrays-module",
    title: "Arrays",
    lessons: [
      {
        id: "arrays",
        number: 5,
        title: "Arrays",
        tag: "Arrays",
        readTime: "9 min",
        description: "Master JavaScript arrays: zero-based indexing, creating arrays, accessing and modifying items, array length, and core methods like push, pop, shift, and unshift.",
        objectives: [
          "Understand how arrays store ordered lists of data",
          "Master zero-based indexing in JavaScript",
          "Access and mutate array items by index",
          "Add and remove elements using push(), pop(), shift(), and unshift()",
          "Inspect array size with the .length property"
        ],
        explanation: `An array is a special variable that can hold more than one value at a time. If you have a list of school subjects (e.g., 'JavaScript', 'HTML', 'CSS'), storing them in separate variables would be cumbersome.\n\nArrays store an ordered list of elements, where each element has a numerical position called an **index**.\n\n**Crucial Concept: Zero-Based Indexing**\nIn JavaScript, array indexing begins at 0:\n• Index 0: First element\n• Index 1: Second element\n• Index 2: Third element\n\nArrays come with built-in methods to manipulate elements:\n• \`push(item)\`: Adds an element to the **end**\n• \`pop()\`: Removes the last element from the **end**\n• \`shift()\`: Removes the first element from the **beginning**\n• \`unshift(item)\`: Adds an element to the **beginning**`,
        syntax: `// Creating an Array
let subjects = ["JavaScript", "HTML", "CSS"];

// Accessing by index
subjects[0]; // "JavaScript"

// Adding and removing items
subjects.push("React");    // adds to end
subjects.pop();            // removes from end
subjects.unshift("Python");// adds to start
subjects.shift();          // removes from start`,
        codeExample: `// Working with School Subjects Array
let subjects = ["JavaScript", "HTML", "CSS"];

console.log("First Subject (index 0):", subjects[0]);
console.log("Total Subjects:", subjects.length);

// Modifying an element
subjects[1] = "Modern HTML5";

// Adding a new subject to the end
subjects.push("Node.js");

// Adding a subject to the beginning
subjects.unshift("Programming Basics");

console.log("Updated Subjects Array:", subjects);
console.log("New Length:", subjects.length);

// Removing the last subject
let removedLast = subjects.pop();
console.log("Removed from end:", removedLast);
console.log("Final List:", subjects);`,
        codeExplanation: [
          "Line 2: We declare an array 'subjects' containing 3 string items.",
          "Line 4: 'subjects[0]' accesses the first element, which is 'JavaScript'.",
          "Line 5: 'subjects.length' returns the total count of elements (3).",
          "Line 8: 'subjects[1] = \"Modern HTML5\"' changes the second element from 'HTML' to 'Modern HTML5'.",
          "Line 11: 'subjects.push(\"Node.js\")' appends 'Node.js' to the end of the array.",
          "Line 14: 'subjects.unshift(\"Programming Basics\")' inserts an item at index 0, shifting others forward.",
          "Line 20: 'subjects.pop()' removes and returns the last item ('Node.js')."
        ],
        realWorldExample: `A course enrollment roster is stored as an array of student names. When a student enrolls, the portal calls 'roster.push(\"New Student\")'. When a student drops the class, their name is removed.`,
        arrayMethodsTable: {
          headers: ["Method", "Action", "Where it operates", "Return Value"],
          rows: [
            ["push(item)", "Adds one or more elements", "End of array", "New length of array"],
            ["pop()", "Removes the last element", "End of array", "The removed element"],
            ["unshift(item)", "Adds one or more elements", "Beginning of array", "New length of array"],
            ["shift()", "Removes the first element", "Beginning of array", "The removed element"],
            [".length", "Property (not method)", "Whole array", "Total number of items"]
          ]
        },
        commonMistakes: [
          "Trying to access the last element with 'array[array.length]'. Because of zero-indexing, the last element is always at 'array[array.length - 1]'.",
          "Confusing 'push' (adds to end) with 'unshift' (adds to start).",
          "Using round brackets instead of square brackets to index (e.g. 'subjects(0)' throws an error; use 'subjects[0]')."
        ],
        tips: [
          "To quickly get the last item of an array, use \`array.at(-1)\` or \`array[array.length - 1]\`.",
          "Arrays can hold mixed data types, though keeping items consistent is best practice."
        ],
        editorCode: `let subjects = ["JavaScript", "HTML", "CSS"];

console.log("Original List:", subjects);
console.log("Number of courses:", subjects.length);

// Add two new courses
subjects.push("React");
subjects.push("Database Design");

console.log("After push:", subjects);

// Access first and last course
let first = subjects[0];
let last = subjects[subjects.length - 1];

console.log("First course:", first);
console.log("Last course:", last);`,
        practiceQuestion: {
          question: "If let courses = ['Math', 'Science', 'English'];, what is the value of courses[1]?",
          options: ["Math", "Science", "English", "undefined"],
          correctIndex: 1,
          hint: "Remember that JavaScript arrays start counting at index 0."
        }
      },
      {
        id: "types-of-arrays",
        number: 6,
        title: "Types of Arrays",
        tag: "Arrays",
        readTime: "9 min",
        description: "Explore the different array data structures: One-dimensional arrays, Multidimensional (nested) arrays, and Arrays of Objects.",
        objectives: [
          "Differentiate between 1D arrays, 2D multidimensional arrays, and arrays of objects",
          "Access items inside nested arrays using multi-index notation",
          "Iterate over arrays of objects to manage real-world tabular data",
          "Know when to choose each array structure for problem solving"
        ],
        explanation: `In JavaScript, arrays can store any kind of data—including other arrays and objects! Depending on how data is organized, we classify arrays into three main structures:\n\n1. **One-Dimensional (1D) Arrays**:\nA single linear list of simple primitive items (e.g., list of course names or test scores).\n\n2. **Multidimensional Arrays (Arrays of Arrays)**:\nArrays that contain other arrays as elements. These are great for representing grids, matrices, coordinate tables, or spreadsheet rows.\n\n3. **Arrays of Objects**:\nArrays where every element is an object. This is the most common format in modern web development for displaying tables of records (like students, products, or invoices).`,
        syntax: `// 1. One-dimensional array
let subjects = ["Math", "Science", "JavaScript"];

// 2. Multidimensional array (2D)
let classroom = [
  ["John", 18],
  ["Maria", 19]
];
classroom[0][0]; // "John"
classroom[0][1]; // 18

// 3. Array of Objects
let students = [
  { name: "John", age: 18, grade: "A" },
  { name: "Maria", age: 19, grade: "A+" }
];
students[1].name; // "Maria"`,
        codeExample: `// 1. One-Dimensional Array
let subjects = ["Math", "Science", "JavaScript"];

// 2. Multidimensional Array (Student name & age pairs)
let studentMatrix = [
  ["John", 18],
  ["Maria", 19],
  ["David", 20]
];

console.log("First Student Name in Matrix:", studentMatrix[0][0]);
console.log("Second Student Age in Matrix:", studentMatrix[1][1]);

// 3. Array of Objects (The gold standard for records)
let studentRecords = [
  { id: 101, name: "John", age: 18, major: "Computer Science" },
  { id: 102, name: "Maria", age: 19, major: "Data Science" },
  { id: 103, name: "David", age: 20, major: "Web Development" }
];

console.log("Second Student Record:", studentRecords[1].name);
console.log("Major:", studentRecords[1].major);

// Iterating through the array of objects
console.log("--- Student Roster ---");
studentRecords.forEach((student) => {
  console.log(student.name + " is majoring in " + student.major);
});`,
        codeExplanation: [
          "Line 2: 'subjects' is a simple 1D array of strings.",
          "Lines 5-9: 'studentMatrix' contains 3 child arrays representing rows in a table.",
          "Line 11: 'studentMatrix[0][0]' selects row 0, column 0 ('John').",
          "Line 12: 'studentMatrix[1][1]' selects row 1, column 1 (19).",
          "Lines 15-19: 'studentRecords' contains 3 structured objects.",
          "Line 21: 'studentRecords[1].name' accesses the name property of the object at index 1 ('Maria').",
          "Lines 25-27: '.forEach()' loops through each student object to print their summary."
        ],
        realWorldExample: `When you fetch data from a school database or REST API, the response almost always arrives as an **Array of Objects**: a list where every item represents a student record with properties like id, name, gpa, and courses.`,
        comparisonTable: {
          headers: ["Array Structure", "Structure Format", "Best Use Case", "Access Example"],
          rows: [
            ["One-Dimensional", "[val1, val2, val3]", "Simple lists (names, colors, scores)", "arr[0]"],
            ["Multidimensional", "[[r1c1, r1c2], [r2c1, r2c2]]", "Grids, game boards, coordinate tables", "arr[0][1]"],
            ["Array of Objects", "[{ id: 1, name: 'A' }, { id: 2 }]", "Complex database records, product catalogs", "arr[0].name"]
          ]
        },
        commonMistakes: [
          "Forgetting the second bracket in 2D arrays: 'matrix[0, 1]' is incorrect syntax; you must write 'matrix[0][1]'.",
          "Treating an array of objects as a flat array (e.g., trying 'students.name' instead of 'students[0].name').",
          "OutOfBounds errors when nesting arrays beyond the available dimension."
        ],
        tips: [
          "Arrays of Objects are the foundation of modern React and API development.",
          "Use '.filter()', '.map()', and '.forEach()' to effortlessly search and transform arrays of objects."
        ],
        editorCode: `let students = [
  { name: "John", age: 18, grade: 92 },
  { name: "Maria", age: 19, grade: 98 },
  { name: "David", age: 20, grade: 85 }
];

console.log("Total students:", students.length);
console.log("Top student:", students[1].name, "with grade:", students[1].grade);

// Add a new student object
students.push({ name: "Elena", age: 18, grade: 95 });

console.log("--- All Students ---");
for (let i = 0; i < students.length; i++) {
  console.log((i + 1) + ". " + students[i].name + " - Score: " + students[i].grade);
}`,
        practiceQuestion: {
          question: "Given: let grid = [['A', 'B'], ['C', 'D']];, how do you access the letter 'D'?",
          options: ["grid[1][1]", "grid[2][2]", "grid[1, 1]", "grid[0][1]"],
          correctIndex: 0,
          hint: "'D' is in the second row (index 1) and second column (index 1)."
        }
      }
    ]
  },
  {
    id: "functions-module",
    title: "Functions",
    lessons: [
      {
        id: "functions",
        number: 7,
        title: "Functions",
        tag: "Functions",
        readTime: "10 min",
        description: "Understand reusable blocks of code: declaring functions, calling functions, parameters, arguments, and return values.",
        objectives: [
          "Understand why functions eliminate code duplication (DRY principle)",
          "Declare and invoke functions in JavaScript",
          "Pass data into functions using parameters and arguments",
          "Output results from functions using the return keyword"
        ],
        explanation: `A function is a reusable block of code designed to perform a specific task. Instead of writing the same 10 lines of code every time you want to calculate a grade or greet a student, you define a function once and call it whenever needed.\n\n**Core Concepts**:\n• **Function Declaration**: Defining the instructions of the function.\n• **Function Call / Invocation**: Telling JavaScript to execute the function.\n• **Parameters**: Placeholder variable names listed in the function definition.\n• **Arguments**: The real values passed into the function when invoking it.\n• **Return Value**: The final computed result that the function sends back to where it was called.`,
        syntax: `// Basic Function Definition
function functionName(parameter1, parameter2) {
  // code to be executed
  return result; // optional return value
}

// Function Call (Invocation)
let output = functionName(argument1, argument2);`,
        codeExample: `// 1. Simple Function without parameters
function greet() {
  console.log("Welcome to JavaScript Basic Course!");
}

greet(); // Calling the function

// 2. Function with a Parameter
function greetStudent(name) {
  console.log("Hello " + name + ", welcome to class!");
}

greetStudent("John");
greetStudent("Maria");

// 3. Function with Parameters and a Return Value
function calculateGrade(score, total) {
  let percentage = (score / total) * 100;
  return percentage;
}

let johnGrade = calculateGrade(45, 50);
let mariaGrade = calculateGrade(49, 50);

console.log("John's Grade: " + johnGrade + "%");
console.log("Maria's Grade: " + mariaGrade + "%");`,
        codeExplanation: [
          "Lines 2-4: We declare a basic function 'greet' that logs a message.",
          "Line 6: 'greet()' executes the function body.",
          "Lines 9-11: 'greetStudent(name)' defines 'name' as a parameter.",
          "Lines 13-14: We call 'greetStudent' with real arguments \"John\" and \"Maria\".",
          "Lines 17-20: 'calculateGrade(score, total)' calculates percentage and sends it back with 'return'.",
          "Lines 22-23: We capture the returned numbers into variables 'johnGrade' and 'mariaGrade'."
        ],
        realWorldExample: `A grading portal has a function 'calculateGPA(gradesArray)'. Every semester, it passes the student's current grades into that function, which computes the average and returns their updated GPA.`,
        commonMistakes: [
          "Forgetting to call the function with parentheses (e.g. writing 'greet' instead of 'greet()'). Writing 'greet' without parentheses references the function object itself instead of running it.",
          "Confusing 'console.log()' with 'return'. 'console.log()' only prints to the screen, while 'return' sends the value back so other code can use it.",
          "Writing code after the 'return' statement inside a function. Code after 'return' is unreachable and will never execute."
        ],
        tips: [
          "Keep functions small and focused on doing one single task well.",
          "Choose descriptive verb-based names for functions (e.g., 'calculateTotal', 'validateEmail', 'fetchStudentData')."
        ],
        editorCode: `// Function that calculates final course average
function getAverage(exam1, exam2, exam3) {
  let sum = exam1 + exam2 + exam3;
  let average = sum / 3;
  return Math.round(average);
}

let studentScore = getAverage(85, 92, 96);
console.log("Final Course Average: " + studentScore + "/100");

if (studentScore >= 90) {
  console.log("Final Grade: A");
} else {
  console.log("Final Grade: B");
}`,
        practiceQuestion: {
          question: "Which keyword is used inside a function to send a calculated value back to the caller?",
          options: ["send", "output", "return", "export"],
          correctIndex: 2,
          hint: "It completes the function execution and hands the result back."
        }
      },
      {
        id: "types-of-functions",
        number: 8,
        title: "Types of Functions",
        tag: "Functions",
        readTime: "11 min",
        description: "Master all modern JavaScript function formats: Function Declarations, Function Expressions, Arrow Functions, Anonymous Functions, and Callback Functions.",
        objectives: [
          "Understand and write Function Declarations and Function Expressions",
          "Master modern ES6 Arrow Function syntax (=>)",
          "Understand Anonymous Functions and where they are used",
          "Learn Callback Functions and how functions can be passed as arguments"
        ],
        explanation: `JavaScript offers several ways to define and write functions to suit different scenarios. In modern JavaScript development, knowing which function format to use makes your code concise, expressive, and readable.\n\n**The 5 Main Function Types**:\n1. **Function Declaration**: The classic named function declaration hoisted to the top of its scope.\n2. **Function Expression**: A function assigned to a variable.\n3. **Arrow Function (ES6)**: Compact syntax using the fat-arrow '=>' token, widely used in modern JavaScript and React.\n4. **Anonymous Function**: A function without a name, typically passed directly into other functions.\n5. **Callback Function**: A function passed as an argument into another function to be executed later.`,
        syntax: `// 1. Function Declaration
function greet(name) { return "Hello " + name; }

// 2. Function Expression
const greet = function(name) { return "Hello " + name; };

// 3. Arrow Function
const greet = (name) => "Hello " + name;

// 4. Anonymous Function (inline)
setTimeout(function() { console.log("Time's up!"); }, 1000);

// 5. Callback Function
const scores = [80, 90, 100];
scores.forEach((score) => console.log(score));`,
        codeExample: `// 1. Function Declaration
function add(a, b) {
  return a + b;
}

// 2. Function Expression
const subtract = function(a, b) {
  return a - b;
};

// 3. Arrow Function (Concise syntax)
const multiply = (a, b) => a * b;

// 4. Anonymous & Callback Function with forEach
let students = ["John", "Maria", "David"];

console.log("Add:", add(10, 5));
console.log("Subtract:", subtract(10, 5));
console.log("Multiply:", multiply(10, 5));

console.log("--- Processing Students with Callback ---");
students.forEach((student, index) => {
  console.log((index + 1) + ". " + student.toUpperCase());
});`,
        codeExplanation: [
          "Lines 2-4: 'function add(a, b)' is a standard Function Declaration.",
          "Lines 7-9: 'const subtract = function(a, b)' is a Function Expression stored inside a variable.",
          "Line 12: 'const multiply = (a, b) => a * b' is an Arrow Function with an implicit return.",
          "Lines 15: We have a list of student names.",
          "Lines 20-22: 'students.forEach()' takes an Arrow Callback Function and executes it for every item in the array."
        ],
        realWorldExample: `In web development, event listeners and array methods use callback functions constantly. When a student clicks a 'Submit Assignment' button, JavaScript executes a callback function to upload their file.`,
        comparisonTable: {
          headers: ["Function Type", "Syntax Example", "Key Characteristic", "Common Use Case"],
          rows: [
            ["Function Declaration", "function greet() {}", "Hoisted to top of scope", "Standard standalone utility functions"],
            ["Function Expression", "const greet = function() {}", "Stored in variable, not hoisted", "Conditional function assignment"],
            ["Arrow Function", "const greet = () => {}", "Concise, lexical 'this' binding", "Modern JS, array methods, React components"],
            ["Anonymous Function", "function() {} (no name)", "Declared inline without identifier", "Event handlers, one-time execution"],
            ["Callback Function", "array.forEach(item => ...)", "Passed as an argument to another function", "Array iteration, asynchronous operations, event listeners"]
          ]
        },
        commonMistakes: [
          "Calling a Function Expression or Arrow Function before its line of declaration (unlike Function Declarations, they are not hoisted).",
          "Forgetting that if you use curly braces '{ }' in an arrow function, you must explicitly write 'return' (e.g. \`(a, b) => { return a + b; }\`).",
          "Misunderstanding callback execution order."
        ],
        tips: [
          "Use Arrow Functions for short single-line operations and array methods like .map(), .filter(), and .forEach().",
          "If an arrow function only takes one parameter, you can even omit the parameter parentheses: \`x => x * 2\`."
        ],
        editorCode: `// Comparison of function styles
const calculateTotal = (price, taxRate = 0.08) => price + (price * taxRate);

let items = [
  { name: "JavaScript Textbook", price: 50 },
  { name: "Code Editor License", price: 30 }
];

console.log("--- Calculating Totals with Arrow Functions ---");
items.forEach(item => {
  let total = calculateTotal(item.price);
  console.log(item.name + ": $" + total.toFixed(2));
});`,
        practiceQuestion: {
          question: "Which of the following is the valid syntax for an ES6 Arrow Function that multiplies a number by 2?",
          options: [
            "const double = (x) => x * 2;",
            "const double = function(x) -> x * 2;",
            "const double = (x) => { x * 2 };",
            "arrow double(x) = x * 2;"
          ],
          correctIndex: 0,
          hint: "Look for the fat arrow '=>' and implicit return without curly braces."
        }
      }
    ]
  }
];

export const ALL_LESSONS = LESSON_MODULES.flatMap(m => m.lessons);

export const TOPIC_CARDS = [
  {
    id: "variables",
    lessonId: "variables",
    number: 1,
    title: "Variables",
    shortDesc: "Learn how variables store data using let, const, and var, and master JavaScript naming rules.",
    icon: "Box",
    tag: "Core Basics",
    duration: "8 min"
  },
  {
    id: "types-of-variables",
    lessonId: "types-of-variables",
    number: 2,
    title: "Types of Variables",
    shortDesc: "Explore the 8 fundamental JavaScript data types including String, Number, Boolean, Undefined, and Null.",
    icon: "Layers",
    tag: "Data Types",
    duration: "9 min"
  },
  {
    id: "objects",
    lessonId: "objects",
    number: 3,
    title: "Objects",
    shortDesc: "Structure real-world entities using key-value pairs, property access, and dynamic object manipulation.",
    icon: "Database",
    tag: "Data Structures",
    duration: "10 min"
  },
  {
    id: "types-of-objects",
    lessonId: "types-of-objects",
    number: 4,
    title: "Types of Objects",
    shortDesc: "Master Object Literals, built-in utilities like Date and Math, and standard wrapper objects.",
    icon: "Cpu",
    tag: "Standard Library",
    duration: "9 min"
  },
  {
    id: "arrays",
    lessonId: "arrays",
    number: 5,
    title: "Arrays",
    shortDesc: "Store ordered collections of data, master zero-based indexing, and use push, pop, shift, and unshift.",
    icon: "ListOrdered",
    tag: "Collections",
    duration: "9 min"
  },
  {
    id: "types-of-arrays",
    lessonId: "types-of-arrays",
    number: 6,
    title: "Types of Arrays",
    shortDesc: "Understand 1D lists, multidimensional grid matrices, and arrays of objects for database records.",
    icon: "Grid",
    tag: "Advanced Arrays",
    duration: "9 min"
  },
  {
    id: "functions",
    lessonId: "functions",
    number: 7,
    title: "Functions",
    shortDesc: "Build reusable blocks of code, pass parameters and arguments, and return computed results.",
    icon: "Terminal",
    tag: "Logic & Reusability",
    duration: "10 min"
  },
  {
    id: "types-of-functions",
    lessonId: "types-of-functions",
    number: 8,
    title: "Types of Functions",
    shortDesc: "Master Function Declarations, Expressions, ES6 Arrow Functions, and Callback Functions.",
    icon: "Code2",
    tag: "Modern Syntax",
    duration: "11 min"
  }
];
