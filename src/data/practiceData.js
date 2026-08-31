export const PRACTICE_EXERCISES = [
  {
    id: "ex-1",
    lessonId: "variables",
    title: "Exercise 1: Create a Name Variable",
    topic: "Variables",
    difficulty: "Easy",
    instruction: "Create a variable called `name` and assign your name (or any string name) to it. Then print it using `console.log(name)`.",
    starterCode: `// 1. Declare a variable called name and assign a string value to it
// 2. Print it to the console

`,
    solution: `let name = "Alex";
console.log(name);`,
    hint: "Use `let name = \"Your Name\";` followed by `console.log(name);`",
    validator: (code, logs) => {
      if (!code.includes("name") || !code.includes("=")) {
        return { success: false, message: "Make sure you declare a variable called 'name' and assign a value to it with '='." };
      }
      if (logs.length === 0) {
        return { success: false, message: "Make sure to output your variable using console.log(name)." };
      }
      return { success: true, message: "Correct! Great job declaring and logging your variable." };
    }
  },
  {
    id: "ex-2",
    lessonId: "types-of-variables",
    title: "Exercise 2: Identify Variable Types",
    topic: "Types of Variables",
    difficulty: "Easy",
    instruction: "Create a variable `age` holding a number, and a variable `isStudent` holding a boolean. Then log `typeof age` and `typeof isStudent`.",
    starterCode: `// Create age (number) and isStudent (boolean)
let age = 20;
let isStudent = true;

// Output their types using typeof
console.log(typeof age);
console.log(typeof isStudent);`,
    solution: `let age = 20;
let isStudent = true;
console.log(typeof age);
console.log(typeof isStudent);`,
    hint: "Use `console.log(typeof age)` and `console.log(typeof isStudent)`.",
    validator: (code, logs) => {
      const hasNumber = logs.some(l => l.includes("number"));
      const hasBoolean = logs.some(l => l.includes("boolean"));
      if (hasNumber && hasBoolean) {
        return { success: true, message: "Correct! Great job checking JavaScript primitive types." };
      }
      return { success: false, message: "Not quite. Ensure you print both 'typeof age' and 'typeof isStudent'." };
    }
  },
  {
    id: "ex-3",
    lessonId: "objects",
    title: "Exercise 3: Represent a Student Object",
    topic: "Objects",
    difficulty: "Medium",
    instruction: "Create an object representing a student with properties `name` (string), `age` (number), and `course` (string). Then log the student's name using dot notation.",
    starterCode: `// Create a student object with name, age, and course
let student = {
  // Add properties here
};

// Log student.name
`,
    solution: `let student = {
  name: "Maria",
  age: 19,
  course: "Computer Science"
};
console.log(student.name);`,
    hint: "Define properties inside curly braces: `{ name: \"Maria\", age: 19, course: \"CS\" }` and access with `student.name`.",
    validator: (code, logs) => {
      if (!code.includes("student") || !code.includes("name") || !code.includes("course")) {
        return { success: false, message: "Ensure your student object contains 'name', 'age', and 'course' keys." };
      }
      if (logs.length === 0) {
        return { success: false, message: "Remember to log the student's name with console.log(student.name)." };
      }
      return { success: true, message: "Correct! Great job creating and accessing object properties." };
    }
  },
  {
    id: "ex-4",
    lessonId: "types-of-objects",
    title: "Exercise 4: Use Built-in Math Object",
    topic: "Types of Objects",
    difficulty: "Medium",
    instruction: "Use `Math.max()` to find the highest test score among `85`, `92`, `78`, `99`, and `88`. Log the result.",
    starterCode: `// Use Math.max with scores: 85, 92, 78, 99, 88
let highestScore = Math.max(85, 92, 78, 99, 88);
console.log("Highest Score:", highestScore);`,
    solution: `let highestScore = Math.max(85, 92, 78, 99, 88);
console.log("Highest Score:", highestScore);`,
    hint: "Call `Math.max(85, 92, 78, 99, 88)` and print it to the console.",
    validator: (code, logs) => {
      const has99 = logs.some(l => l.includes("99"));
      if (code.includes("Math.max") && has99) {
        return { success: true, message: "Correct! Great job using JavaScript's built-in Math object." };
      }
      return { success: false, message: "Not quite. Call Math.max() with the given scores and log the answer (should be 99)." };
    }
  },
  {
    id: "ex-5",
    lessonId: "arrays",
    title: "Exercise 5: Array of School Subjects",
    topic: "Arrays",
    difficulty: "Easy",
    instruction: "Create an array called `subjects` containing three subjects (e.g. `\"JavaScript\"`, `\"HTML\"`, `\"CSS\"`). Then use `.push()` to add `\"Node.js\"` and log `subjects.length`.",
    starterCode: `// 1. Create subjects array with 3 subjects
let subjects = ["JavaScript", "HTML", "CSS"];

// 2. Add "Node.js" using push

// 3. Log subjects.length
`,
    solution: `let subjects = ["JavaScript", "HTML", "CSS"];
subjects.push("Node.js");
console.log(subjects.length);`,
    hint: "Use `subjects.push(\"Node.js\");` and `console.log(subjects.length);`.",
    validator: (code, logs) => {
      if (!code.includes("push")) {
        return { success: false, message: "Make sure to use the .push() method to add an element." };
      }
      const has4 = logs.some(l => l.includes("4"));
      if (has4) {
        return { success: true, message: "Correct! Great job manipulating array elements and checking length." };
      }
      return { success: false, message: "Log the new length of the array after pushing (should output 4)." };
    }
  },
  {
    id: "ex-6",
    lessonId: "types-of-arrays",
    title: "Exercise 6: Array of Student Objects",
    topic: "Types of Arrays",
    difficulty: "Medium",
    instruction: "Create an array called `students` with two objects. Each object should have a `name` and `grade`. Then log the grade of the first student.",
    starterCode: `let students = [
  { name: "John", grade: 90 },
  { name: "Maria", grade: 95 }
];

// Log the first student's grade (students[0].grade)
console.log(students[0].grade);`,
    solution: `let students = [
  { name: "John", grade: 90 },
  { name: "Maria", grade: 95 }
];
console.log(students[0].grade);`,
    hint: "Access the first element using index 0: `students[0].grade`.",
    validator: (code, logs) => {
      if (logs.length > 0 && (code.includes("students[0]") || code.includes("students[0].grade"))) {
        return { success: true, message: "Correct! Great job querying nested data in an array of objects." };
      }
      return { success: false, message: "Not quite. Access the first student at index 0 and print their grade." };
    }
  },
  {
    id: "ex-7",
    lessonId: "functions",
    title: "Exercise 7: Create an Add Function",
    topic: "Functions",
    difficulty: "Easy",
    instruction: "Create a function called `add` that takes two parameters (`a` and `b`), adds them together, and returns the result. Call `add(15, 25)` and log the returned value.",
    starterCode: `// Define the add function
function add(a, b) {
  // Return sum
}

// Call add(15, 25) and log the result
`,
    solution: `function add(a, b) {
  return a + b;
}
let sum = add(15, 25);
console.log(sum);`,
    hint: "Inside the function write `return a + b;` then call `console.log(add(15, 25));`.",
    validator: (code, logs) => {
      if (!code.includes("return")) {
        return { success: false, message: "Make sure your function uses the 'return' keyword to return the sum." };
      }
      const has40 = logs.some(l => l.includes("40"));
      if (has40) {
        return { success: true, message: "Correct! Great job creating a reusable function with return values." };
      }
      return { success: false, message: "Call add(15, 25) and log the output (should output 40)." };
    }
  },
  {
    id: "ex-8",
    lessonId: "types-of-functions",
    title: "Exercise 8: Write an ES6 Arrow Function",
    topic: "Types of Functions",
    difficulty: "Medium",
    instruction: "Convert a greeting into an arrow function called `greet` that takes a `name` parameter and returns `\"Hello \" + name`. Test it with `\"Sarah\"`.",
    starterCode: `// Write an arrow function named greet
const greet = (name) => {
  // Return the greeting
};

console.log(greet("Sarah"));`,
    solution: `const greet = (name) => "Hello " + name;
console.log(greet("Sarah"));`,
    hint: "Use arrow syntax: `const greet = (name) => \"Hello \" + name;`",
    validator: (code, logs) => {
      if (!code.includes("=>")) {
        return { success: false, message: "Make sure you use the ES6 fat arrow '=>' syntax." };
      }
      const hasSarah = logs.some(l => l.toLowerCase().includes("hello sarah"));
      if (hasSarah) {
        return { success: true, message: "Correct! Great job writing modern ES6 arrow functions." };
      }
      return { success: false, message: "Make sure greet(\"Sarah\") returns and prints 'Hello Sarah'." };
    }
  }
];
