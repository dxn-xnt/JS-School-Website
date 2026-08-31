export const QUIZ_QUESTIONS = [
  {
    id: 1,
    lessonId: "variables",
    topic: "Variables",
    question: "Which keyword is used to declare a variable that cannot be reassigned in JavaScript?",
    options: [
      "var",
      "let",
      "const",
      "variable"
    ],
    correctAnswer: 2,
    explanation: "'const' creates a block-scoped constant whose value cannot be reassigned after its initial declaration."
  },
  {
    id: 2,
    lessonId: "variables",
    topic: "Variables",
    question: "Which of the following is an INVALID variable name in JavaScript?",
    options: [
      "_studentName",
      "student1",
      "$course",
      "1stStudent"
    ],
    correctAnswer: 3,
    explanation: "Variable names in JavaScript cannot start with a number. They must start with a letter, underscore (_), or dollar sign ($)."
  },
  {
    id: 3,
    lessonId: "types-of-variables",
    topic: "Types of Variables",
    question: "What will 'typeof true' return in JavaScript?",
    options: [
      "\"boolean\"",
      "\"number\"",
      "\"string\"",
      "\"truthy\""
    ],
    correctAnswer: 0,
    explanation: "The typeof operator returns the string \"boolean\" for both true and false values."
  },
  {
    id: 4,
    lessonId: "types-of-variables",
    topic: "Types of Variables",
    question: "What value and type does a variable have if it is declared with 'let score;' without an initial value?",
    options: [
      "null",
      "0",
      "undefined",
      "empty"
    ],
    correctAnswer: 2,
    explanation: "In JavaScript, any variable declared without an explicit initial value automatically receives the value and type 'undefined'."
  },
  {
    id: 5,
    lessonId: "objects",
    topic: "Objects",
    question: "Given 'let student = { name: \"John\", age: 18 };', how do you access the student's name using dot notation?",
    options: [
      "student->name",
      "student.name",
      "student::name",
      "student(name)"
    ],
    correctAnswer: 1,
    explanation: "Dot notation uses a period: 'student.name'. Bracket notation is also valid as 'student[\"name\"]'."
  },
  {
    id: 6,
    lessonId: "objects",
    topic: "Objects",
    question: "Which keyword is used to remove a property completely from a JavaScript object?",
    options: [
      "remove",
      "clear",
      "delete",
      "pop"
    ],
    correctAnswer: 2,
    explanation: "The 'delete' operator (e.g. delete student.age) removes a property and its key from an object."
  },
  {
    id: 7,
    lessonId: "types-of-objects",
    topic: "Types of Objects",
    question: "Which standard built-in JavaScript object provides mathematical formulas like .random(), .round(), and .floor()?",
    options: [
      "Date",
      "Math",
      "Calculator",
      "NumberUtils"
    ],
    correctAnswer: 1,
    explanation: "The built-in 'Math' object provides static mathematical constants (Math.PI) and utility functions."
  },
  {
    id: 8,
    lessonId: "arrays",
    topic: "Arrays",
    question: "What is the index of the FIRST element in any JavaScript array?",
    options: [
      "0",
      "1",
      "-1",
      "first"
    ],
    correctAnswer: 0,
    explanation: "JavaScript arrays use zero-based indexing, meaning the first element is always located at index 0."
  },
  {
    id: 9,
    lessonId: "arrays",
    topic: "Arrays",
    question: "Which array method adds one or more elements to the END of an array?",
    options: [
      "shift()",
      "unshift()",
      "push()",
      "pop()"
    ],
    correctAnswer: 2,
    explanation: "'push()' adds elements to the end of an array, while 'unshift()' adds to the beginning."
  },
  {
    id: 10,
    lessonId: "types-of-arrays",
    topic: "Types of Arrays",
    question: "Given 'let matrix = [ [10, 20], [30, 40] ];', what is the value of 'matrix[1][0]'?",
    options: [
      "10",
      "20",
      "30",
      "40"
    ],
    correctAnswer: 2,
    explanation: "matrix[1] selects the second row '[30, 40]', and [0] selects the first item of that row, which is 30."
  },
  {
    id: 11,
    lessonId: "functions",
    topic: "Functions",
    question: "Which keyword is used inside a function to output and return a calculated result back to the caller?",
    options: [
      "return",
      "send",
      "output",
      "yield"
    ],
    correctAnswer: 0,
    explanation: "The 'return' keyword terminates function execution and specifies the value to be handed back to where the function was called."
  },
  {
    id: 12,
    lessonId: "types-of-functions",
    topic: "Types of Functions",
    question: "Which of the following is the modern ES6 Arrow Function syntax that adds two numbers?",
    options: [
      "const add = (a, b) => a + b;",
      "const add = function(a, b) -> a + b;",
      "function add => (a, b) { a + b };",
      "arrow add(a, b) { return a + b; }"
    ],
    correctAnswer: 0,
    explanation: "'const add = (a, b) => a + b;' uses the ES6 arrow syntax with an implicit return of the sum."
  }
];
