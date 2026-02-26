const mongoose = require('mongoose');
const Exam = require('../models/Exam');
const Domain = require('../models/Domain');
require('dotenv').config();

const questions = [
    // --- MCQs (1-10: HTML) ---
    { questionText: "HTML ka full form kya hai?", type: "mcq", options: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Tool Mark Language"], correctAnswer: "Hyper Text Markup Language", difficulty: "Easy" },
    { questionText: "<a> tag ka use kis liye hota hai?", type: "mcq", options: ["Image add karne ke liye", "Link create karne ke liye", "Table banane ke liye", "Form submit karne ke liye"], correctAnswer: "Link create karne ke liye", difficulty: "Easy" },
    { questionText: "Semantic tag ka example kaunsa hai?", type: "mcq", options: ["<div>", "<span>", "<section>", "<b>"], correctAnswer: "<section>", difficulty: "Easy" },
    { questionText: "Image path kis attribute me dete hain?", type: "mcq", options: ["href", "src", "link", "path"], correctAnswer: "src", difficulty: "Easy" },
    { questionText: "Form data server ko bhejne ke liye kya use hota hai?", type: "mcq", options: ["action", "method", "Dono", "submit"], correctAnswer: "Dono", difficulty: "Easy" },
    { questionText: "Ordered list tag kaunsa hai?", type: "mcq", options: ["<ul>", "<ol>", "<li>", "<dl>"], correctAnswer: "<ol>", difficulty: "Easy" },
    { questionText: "Table row define karne ka tag?", type: "mcq", options: ["<td>", "<th>", "<tr>", "<table>"], correctAnswer: "<tr>", difficulty: "Easy" },
    { questionText: "HTML comment syntax kya hai?", type: "mcq", options: ["// comment", "<!-- comment -->", "/* comment */", "** comment **"], correctAnswer: "<!-- comment -->", difficulty: "Easy" },
    { questionText: "Password input field ka syntax?", type: "mcq", options: ["<input type=\"text\">", "<input type=\"password\">", "<password>", "<input hidden>"], correctAnswer: "<input type=\"password\">", difficulty: "Easy" },
    { questionText: "Favicon add karne ka tag?", type: "mcq", options: ["<icon>", "<link rel=\"icon\">", "<fav>", "<meta icon>"], correctAnswer: "<link rel=\"icon\">", difficulty: "Medium" },

    // --- MCQs (11-20: CSS) ---
    { questionText: "CSS full form kya hai?", type: "mcq", options: ["Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Syntax", "Computer Style Sheets"], correctAnswer: "Cascading Style Sheets", difficulty: "Easy" },
    { questionText: "CSS apply karne ke kitne tarike hote hain?", type: "mcq", options: ["1", "2", "3", "4"], correctAnswer: "3", difficulty: "Easy" },
    { questionText: "Highest priority CSS ki hoti hai:", type: "mcq", options: ["External", "Internal", "Inline", "Browser default"], correctAnswer: "Inline", difficulty: "Easy" },
    { questionText: "Flexbox enable karne ka property?", type: "mcq", options: ["display: block", "display: flex", "flex: 1", "position: flex"], correctAnswer: "display: flex", difficulty: "Easy" },
    { questionText: "Flex items center align kaise karte hain?", type: "mcq", options: ["align-items: center", "text-align: center", "justify-text", "align-center"], correctAnswer: "align-items: center", difficulty: "Medium" },
    { questionText: "Grid start karne ka property?", type: "mcq", options: ["display: flex", "display: grid", "grid-start", "layout: grid"], correctAnswer: "display: grid", difficulty: "Easy" },
    { questionText: "position absolute kis par depend karta hai?", type: "mcq", options: ["Body", "Parent relative", "Screen", "Margin"], correctAnswer: "Parent relative", difficulty: "Medium" },
    { questionText: "z-index ka use?", type: "mcq", options: ["Color change", "Layer order control", "Size change", "Opacity"], correctAnswer: "Layer order control", difficulty: "Easy" },
    { questionText: "Media query ka use?", type: "mcq", options: ["Animation", "Responsive design", "Grid", "Font"], correctAnswer: "Responsive design", difficulty: "Easy" },
    { questionText: "box-sizing: border-box kya karta hai?", type: "mcq", options: ["Border remove", "Width me padding include karta hai", "Height double karta hai", "Margin add karta hai"], correctAnswer: "Width me padding include karta hai", difficulty: "Medium" },

    // --- MCQs (21-35: JavaScript) ---
    { questionText: "JS me variable declare kaise karte hain?", type: "mcq", options: ["var", "let", "const", "All"], correctAnswer: "All", difficulty: "Easy" },
    { questionText: "Strict equality operator?", type: "mcq", options: ["==", "===", "!=", "="], correctAnswer: "===", difficulty: "Easy" },
    { questionText: "Arrow function syntax?", type: "mcq", options: ["function(){}", "()=>{}", "func=>{}", "arrow(){}"], correctAnswer: "()=>{}", difficulty: "Easy" },
    { questionText: "Promise ka state nahi hota:", type: "mcq", options: ["Pending", "Resolved", "Rejected", "Finished"], correctAnswer: "Finished", difficulty: "Medium" },
    { questionText: "Async/Await kis par based hai?", type: "mcq", options: ["Callback", "Promise", "Loop", "Event"], correctAnswer: "Promise", difficulty: "Medium" },
    { questionText: "Closure kya hai?", type: "mcq", options: ["Function + lexical scope", "Loop", "Object", "Array"], correctAnswer: "Function + lexical scope", difficulty: "Hard" },
    { questionText: "Hoisting apply hoti hai:", type: "mcq", options: ["Variables par", "Functions par", "Dono", "None"], correctAnswer: "Dono", difficulty: "Medium" },
    { questionText: "NaN ka type kya hai?", type: "mcq", options: ["Number", "String", "Boolean", "Undefined"], correctAnswer: "Number", difficulty: "Medium" },
    { questionText: "setTimeout kya hai?", type: "mcq", options: ["Sync function", "Async function", "Loop", "API"], correctAnswer: "Async function", difficulty: "Medium" },
    { questionText: "Event bubbling ka direction:", type: "mcq", options: ["Parent → Child", "Child → Parent", "Parallel", "None"], correctAnswer: "Child → Parent", difficulty: "Medium" },
    { questionText: "DOM me element select karne ka modern method?", type: "mcq", options: ["querySelector", "getElementById", "getElementsByTagName", "All"], correctAnswer: "querySelector", difficulty: "Easy" },
    { questionText: "localStorage me data kab tak rehta hai?", type: "mcq", options: ["Browser close hone tak", "Tab close hone tak", "Jab tak manual delete na ho", "1 hour"], correctAnswer: "Jab tak manual delete na ho", difficulty: "Medium" },
    { questionText: "event.preventDefault() kya karta hai?", type: "mcq", options: ["Stop propagation", "Stop default action (like form submit)", "Delete event", "None"], correctAnswer: "Stop default action (like form submit)", difficulty: "Easy" },
    { questionText: "JSON.parse() ka role?", type: "mcq", options: ["Object ko String banana", "String ko Object banana", "Encryption", "None"], correctAnswer: "String ko Object banana", difficulty: "Easy" },
    { questionText: "Window object represent karta hai:", type: "mcq", options: ["Tab content", "HTML tag", "Browser Window", "Node JS"], correctAnswer: "Browser Window", difficulty: "Easy" },

    // --- MCQs (36-45: React) ---
    { questionText: "React kya hai?", type: "mcq", options: ["Framework", "Library", "Language", "DB"], correctAnswer: "Library", difficulty: "Easy" },
    { questionText: "Virtual DOM ka main benefit?", type: "mcq", options: ["Faster UI updates", "Direct DB access", "Less CSS", "None"], correctAnswer: "Faster UI updates", difficulty: "Medium" },
    { questionText: "useState hook ka use?", type: "mcq", options: ["Managing local state", "API call", "Routing", "Design"], correctAnswer: "Managing local state", difficulty: "Easy" },
    { questionText: "useEffect kab run hota hai?", type: "mcq", options: ["After render", "Before render", "Only on button click", "None"], correctAnswer: "After render", difficulty: "Medium" },
    { questionText: "React Props hote hain:", type: "mcq", options: ["Immutable", "Mutable", "Hidden", "Static"], correctAnswer: "Immutable", difficulty: "Medium" },
    { questionText: "Controlled component kise kehte hain?", type: "mcq", options: ["Form managed by React state", "External library component", "Static component", "None"], correctAnswer: "Form managed by React state", difficulty: "Hard" },
    { questionText: "React Router use hota hai:", type: "mcq", options: ["Navigation between pages", "Styling", "Data fetching", "None"], correctAnswer: "Navigation between pages", difficulty: "Easy" },
    { questionText: "Redux ka purpose?", type: "mcq", options: ["Global state management", "Local state", "Routing", "None"], correctAnswer: "Global state management", difficulty: "Medium" },
    { questionText: "Lists me 'key' prop kyu use hota hai?", type: "mcq", options: ["Help React identify which items changed", "For CSS", "Database unique ID", "None"], correctAnswer: "Help React identify which items changed", difficulty: "Medium" },
    { questionText: "React Fragment syntax?", type: "mcq", options: ["<> </>", "<Fragment> </Fragment>", "Both", "None"], correctAnswer: "Both", difficulty: "Easy" },

    // --- MCQs (46-50: Backend / Node) ---
    { questionText: "Node.js kis engine par run hota hai?", type: "mcq", options: ["V8", "SpiderMonkey", "Chakra", "Gecko"], correctAnswer: "V8", difficulty: "Easy" },
    { questionText: "Express kya hai?", type: "mcq", options: ["Web Framework for Node.js", "Database", "Library for React", "None"], correctAnswer: "Web Framework for Node.js", difficulty: "Easy" },
    { questionText: "Middleware ka role?", type: "mcq", options: ["Code executed between request and response", "Final result", "Database driver", "None"], correctAnswer: "Code executed between request and response", difficulty: "Medium" },
    { questionText: "REST API stands for:", type: "mcq", options: ["Representational State Transfer", "Real State", "Rapid Secure", "None"], correctAnswer: "Representational State Transfer", difficulty: "Easy" },
    { questionText: "JWT (JSON Web Token) typically use hota hai:", type: "mcq", options: ["Authentication & Authorization", "Data compression", "UI Design", "None"], correctAnswer: "Authentication & Authorization", difficulty: "Medium" },

    // --- MCQs (51-60: Database + DevOps) ---
    { questionText: "SQL vs NoSQL primary difference?", type: "mcq", options: ["Relational vs Document/Key-Value", "Speed vs Size", "Open source vs Paid", "None"], correctAnswer: "Relational vs Document/Key-Value", difficulty: "Medium" },
    { questionText: "MongoDB ek _______ database hai.", type: "mcq", options: ["Relational", "Document-oriented", "Graph", "None"], correctAnswer: "Document-oriented", difficulty: "Easy" },
    { questionText: "Primary Key ka goal?", type: "mcq", options: ["Uniquely identify a record", "Duplicate data", "Indexing only", "None"], correctAnswer: "Uniquely identify a record", difficulty: "Easy" },
    { questionText: "Indexing in DB help karta hai:", type: "mcq", options: ["Faster query results", "Deleting data", "Changing schema", "None"], correctAnswer: "Faster query results", difficulty: "Medium" },
    { questionText: "MongoDB me Aggregate pipeline ka use?", type: "mcq", options: ["Data processing and transformation", "Simple find", "Connecting to SQL", "None"], correctAnswer: "Data processing and transformation", difficulty: "Hard" },
    { questionText: "Database Normalization is used to:", type: "mcq", options: ["Reduce data redundancy", "Increase speed", "Change colors", "None"], correctAnswer: "Reduce data redundancy", difficulty: "Hard" },
    { questionText: "Git kya hai?", type: "mcq", options: ["Version Control System", "Programming language", "Cloud provider", "Database"], correctAnswer: "Version Control System", difficulty: "Easy" },
    { questionText: "CI/CD stands for:", type: "mcq", options: ["Continuous Integration / Continuous Deployment", "Code Internal / Cloud Data", "Correct Interface / Change Data", "None"], correctAnswer: "Continuous Integration / Continuous Deployment", difficulty: "Easy" },
    { questionText: "Docker ka objective?", type: "mcq", options: ["Containerization of applications", "Virtual Machine emulator", "Code Editor", "None"], correctAnswer: "Containerization of applications", difficulty: "Medium" },
    { questionText: "Mainstream Cloud Provider example?", type: "mcq", options: ["AWS", "Google Cloud", "Azure", "All"], correctAnswer: "All", difficulty: "Easy" },

    // --- Coding Questions (61-75: Easy) ---
    { questionText: "Coding Question: Write a script to Reverse a string in JavaScript.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Check if a given string is a Palindrome.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Find the Largest number in an array.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Count the number of Vowels in a string.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Remove duplicates from an array using modern JS.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Sort an array of numbers in Ascending order.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Calculate the Sum of all elements in an array.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Capitalize the first letter of each word in a sentence.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Create a function for Celsius to Fahrenheit conversion.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Generate a Random Number between 1 and 100.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Calculate Factorial of a number using a loop.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Write an Even/Odd checker function.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Merge two arrays into one.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Flatten a nested array (e.g. [[1,2],[3]]) to [1,2,3].", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Find the Second largest number in an array.", type: "coding", difficulty: "Medium" },

    // --- Coding Questions (76-80: DOM) ---
    { questionText: "Coding Question: Write JS code to change the text of an element with id 'btn' to 'Clicked' when it is clicked.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Implement simple Form Validation to check if input fields are empty.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Create a script for a Dark Mode toggle (change body background and text color).", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Build a Textarea character counter that updates as the user types.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Write the logic for a basic Image Slider (Next/Prev buttons changing image src).", type: "coding", difficulty: "Hard" },

    // --- Coding Questions (81-88: React) ---
    { questionText: "Coding Question: Build a Counter app using the useState hook.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Implement a Todo list with 'Add' and 'Delete' functionality in React.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Fetch data from 'https://jsonplaceholder.typicode.com/posts' and display it in a list.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Create a Search Filter that updates a list of names as you type in an input box.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Build a 'Controlled Form' component with two inputs (Name, Email) and a submit button.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Setup basic React Router with 3 pages: Home, About, Contact.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Demonstrate Global state management using React Context API (user data passed to child).", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Implement a Debounce function for a search input to limit API calls.", type: "coding", difficulty: "Hard" },

    // --- Coding Questions (89-94: Backend) ---
    { questionText: "Coding Question: Setup a basic Express.js server and listen on port 3000.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Create a GET API endpoint '/info' that returns a JSON message: { status: 'ok' }.", type: "coding", difficulty: "Easy" },
    { questionText: "Coding Question: Create a POST API endpoint '/submit' that reads JSON body and logs it.", type: "coding", difficulty: "Medium" },
    { questionText: "Coding Question: Implement a middleware for JWT authentication checking for a 'Bearer' token in headers.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Setup a File Upload endpoint using Multer middleware.", type: "coding", difficulty: "Hard" },
    { questionText: "Coding Question: Create basic MongoDB CRUD (Create, Read, Update, Delete) APIs for a 'User' model.", type: "coding", difficulty: "Hard" },

    // --- Coding Questions (95-100: Full Stack + Advanced) ---
    { questionText: "Full Stack: Write a React useEffect that fetches data from an Express backend endpoint '/api/data'.", type: "coding", difficulty: "Medium" },
    { questionText: "Auth: Build the complete flow for Login using JWT and persist token in localStorage.", type: "coding", difficulty: "Hard" },
    { questionText: "Routing: Create a Protected Route component in React that checks for auth token before allowing access.", type: "coding", difficulty: "Hard" },
    { questionText: "Authorization: Implement Role-based access control (RBAC) on an Express route (e.g. Admin only).", type: "coding", difficulty: "Hard" },
    { questionText: "Full Stack: Design and implement the core logic for a URL Shortener (Shorten and Redirect).", type: "coding", difficulty: "Hard" },
    { questionText: "Real-time: Code the server-side setup for Socket.io to broadcast 'message' to all connected clients.", type: "coding", difficulty: "Hard" }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const domain = await Domain.findOne({ name: 'Web Development' });
        if (!domain) {
            console.error('Web Development domain not found. Please ensure domains are seeded first.');
            process.exit(1);
        }

        // Delete existing exam if it exists to avoid duplicates
        await Exam.deleteMany({ title: "Full Stack Development – 100 Questions Exam" });

        const webDevExam = new Exam({
            domainId: domain._id,
            title: "Full Stack Development – 100 Questions Exam",
            type: "Full-length Mock",
            durationMinutes: 120, // 2 hours
            questions: questions
        });

        await webDevExam.save();
        console.log('Successfully seeded Web Development - 100 Questions Exam');

        await mongoose.connection.close();
        console.log('Done');
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
