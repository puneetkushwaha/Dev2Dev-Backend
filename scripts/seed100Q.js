const mongoose = require('mongoose');
require('dotenv').config();
const Exam = require('./models/Exam');
const Domain = require('./models/Domain');

const fullExamQuestions = [
    // --- HTML ---
    {
        questionText: "HTML ka full form kya hai?",
        options: [
            "Hyper Trainer Marking Language",
            "Hyper Text Marketing Language",
            "Hyper Text Markup Language",
            "Hyper Tool Mark Language"
        ],
        correctAnswer: "Hyper Text Markup Language",
        difficulty: "Easy"
    },
    {
        questionText: "<a> tag ka use kis liye hota hai?",
        options: [
            "Image add karne ke liye",
            "Link create karne ke liye",
            "Table banane ke liye",
            "Form submit karne ke liye"
        ],
        correctAnswer: "Link create karne ke liye",
        difficulty: "Easy"
    },
    {
        questionText: "Semantic tag ka example kaunsa hai?",
        options: [
            "<div>",
            "<span>",
            "<section>",
            "<b>"
        ],
        correctAnswer: "<section>",
        difficulty: "Medium"
    },
    {
        questionText: "Image path kis attribute me dete hain?",
        options: ["href", "src", "link", "path"],
        correctAnswer: "src",
        difficulty: "Easy"
    },
    {
        questionText: "Form data server ko bhejne ke liye kya use hota hai?",
        options: ["action", "method", "Dono", "submit"],
        correctAnswer: "Dono", // Both action and method are core form attributes for sending data
        difficulty: "Medium"
    },
    {
        questionText: "Ordered list tag kaunsa hai?",
        options: ["<ul>", "<ol>", "<li>", "<dl>"],
        correctAnswer: "<ol>",
        difficulty: "Easy"
    },
    {
        questionText: "Table row define karne ka tag?",
        options: ["<td>", "<th>", "<tr>", "<table>"],
        correctAnswer: "<tr>",
        difficulty: "Easy"
    },
    {
        questionText: "HTML comment syntax kya hai?",
        options: ["// comment", "<!-- comment -->", "/* comment */", "** comment **"],
        correctAnswer: "<!-- comment -->",
        difficulty: "Easy"
    },
    {
        questionText: "Password input field ka syntax?",
        options: [
            '<input type="text">',
            '<input type="password">',
            '<password>',
            '<input hidden>'
        ],
        correctAnswer: '<input type="password">',
        difficulty: "Easy"
    },
    {
        questionText: "Favicon add karne ka tag?",
        options: [
            '<icon>',
            '<link rel="icon">',
            '<fav>',
            '<meta icon>'
        ],
        correctAnswer: '<link rel="icon">',
        difficulty: "Medium"
    },

    // --- CSS ---
    {
        questionText: "CSS full form kya hai?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Syntax",
            "Computer Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets",
        difficulty: "Easy"
    },
    {
        questionText: "CSS apply karne ke kitne tarike hote hain?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3", // Inline, Internal, External
        difficulty: "Easy"
    },
    {
        questionText: "Highest priority CSS ki hoti hai:",
        options: ["External", "Internal", "Inline", "Browser default"],
        correctAnswer: "Inline",
        difficulty: "Medium"
    },
    {
        questionText: "Flexbox enable karne ka property?",
        options: ["display: block", "display: flex", "flex: 1", "position: flex"],
        correctAnswer: "display: flex",
        difficulty: "Easy"
    },
    {
        questionText: "Flex items center align kaise karte hain?",
        options: ["align-items: center", "text-align: center", "justify-text", "align-center"],
        correctAnswer: "align-items: center",
        difficulty: "Medium"
    },
    {
        questionText: "Grid start karne ka property?",
        options: ["display: flex", "display: grid", "grid-start", "layout: grid"],
        correctAnswer: "display: grid",
        difficulty: "Easy"
    },
    {
        questionText: "position absolute kis par depend karta hai?",
        options: ["Body", "Parent relative", "Screen", "Margin"],
        correctAnswer: "Parent relative",
        difficulty: "Hard"
    },
    {
        questionText: "z-index ka use?",
        options: ["Color change", "Layer order control", "Size change", "Opacity"],
        correctAnswer: "Layer order control",
        difficulty: "Medium"
    },
    {
        questionText: "Media query ka use?",
        options: ["Animation", "Responsive design", "Grid", "Font"],
        correctAnswer: "Responsive design",
        difficulty: "Easy"
    },
    {
        questionText: "box-sizing: border-box kya karta hai?",
        options: [
            "Border remove",
            "Width me padding include karta hai",
            "Height double karta hai",
            "Margin add karta hai"
        ],
        correctAnswer: "Width me padding include karta hai",
        difficulty: "Hard"
    },

    // --- JavaScript ---
    {
        questionText: "JS me variable declare kaise karte hain?",
        options: ["var", "let", "const", "All"],
        correctAnswer: "All",
        difficulty: "Easy"
    },
    {
        questionText: "Strict equality operator?",
        options: ["==", "===", "!=", "="],
        correctAnswer: "===",
        difficulty: "Easy"
    },
    {
        questionText: "Arrow function syntax?",
        options: ["function(){}", "()=>{}", "func=>{}", "arrow(){}"],
        correctAnswer: "()=>{}",
        difficulty: "Medium"
    },
    {
        questionText: "Promise ka state nahi hota:",
        options: ["Pending", "Resolved", "Rejected", "Finished"],
        correctAnswer: "Finished",
        difficulty: "Hard"
    },
    {
        questionText: "Async/Await kis par based hai?",
        options: ["Callback", "Promise", "Loop", "Event"],
        correctAnswer: "Promise",
        difficulty: "Medium"
    },
    {
        questionText: "Closure kya hai?",
        options: ["Function + lexical scope", "Loop", "Object", "Array"],
        correctAnswer: "Function + lexical scope",
        difficulty: "Hard"
    },
    {
        questionText: "Hoisting apply hoti hai:",
        options: ["Variables par", "Functions par", "Dono", "None"],
        correctAnswer: "Dono",
        difficulty: "Hard"
    },
    {
        questionText: "NaN ka type kya hai?",
        options: ["Number", "String", "Boolean", "Undefined"],
        correctAnswer: "Number",
        difficulty: "Medium"
    },
    {
        questionText: "setTimeout kya hai?",
        options: ["Sync function", "Async function", "Loop", "API"],
        correctAnswer: "Async function",
        difficulty: "Medium"
    },
    {
        questionText: "Event bubbling kya hai?",
        options: ["Parent → Child", "Child → Parent", "Parallel", "None"],
        correctAnswer: "Child → Parent",
        difficulty: "Hard"
    },

    // JS Fillers to make 35
    { questionText: "DOM ka full form?", options: ["Data Object Mode", "Document Object Model", "Delta Object Map", "None"], correctAnswer: "Document Object Model", difficulty: "Easy" },
    { questionText: "localStorage ka data type?", options: ["String", "Object", "Array", "Boolean"], correctAnswer: "String", difficulty: "Medium" },
    { questionText: "Event listener attach karna:", options: ["addEventListener", "onEvent", "listen()", "watch()"], correctAnswer: "addEventListener", difficulty: "Easy" },
    { questionText: "Default form submission roko:", options: ["return false", "preventDefault()", "stop()", "halt()"], correctAnswer: "preventDefault()", difficulty: "Medium" },
    { questionText: "Event Delegation ka base?", options: ["Bubbling", "Capturing", "Closure", "Hoisting"], correctAnswer: "Bubbling", difficulty: "Hard" },

    // --- React ---
    { questionText: "React kya hai?", options: ["Framework", "Library", "Language", "DB"], correctAnswer: "Library", difficulty: "Easy" },
    { questionText: "Virtual DOM ka benefit?", options: ["Faster UI updates", "Slow performance", "Secure DB", "Direct HTML manipulation"], correctAnswer: "Faster UI updates", difficulty: "Medium" },
    { questionText: "useState ka use?", options: ["Routing", "State Management", "API fetch", "Compile Code"], correctAnswer: "State Management", difficulty: "Easy" },
    { questionText: "useEffect kab run hota hai?", options: ["Before render", "After render", "Never", "On click"], correctAnswer: "After render", difficulty: "Medium" },
    { questionText: "Props immutable hote hain?", options: ["True", "False", "Only in classes", "Sometimes"], correctAnswer: "True", difficulty: "Medium" },
    { questionText: "Controlled component kya hai?", options: ["React controls state", "DOM controls state", "Redux controls", "Uncontrollable"], correctAnswer: "React controls state", difficulty: "Hard" },
    { questionText: "React Router ka use?", options: ["State management", "Client-side routing", "Styling", "DB connection"], correctAnswer: "Client-side routing", difficulty: "Medium" },
    { questionText: "Redux ka purpose?", options: ["Global state management", "Local state", "Animations", "API calling"], correctAnswer: "Global state management", difficulty: "Hard" },
    { questionText: "Key prop kyu use hota hai?", options: ["Styling", "List rendering optimization", "Security", "Routing"], correctAnswer: "List rendering optimization", difficulty: "Medium" },
    { questionText: "Fragment ka syntax?", options: ["<fragment></fragment>", "<></>", "<wrap></wrap>", "<empty></empty>"], correctAnswer: "<></>", difficulty: "Easy" },

    // --- Backend / Node ---
    { questionText: "Node.js kis engine par run hota hai?", options: ["V8", "SpiderMonkey", "Chakra", "WebKit"], correctAnswer: "V8", difficulty: "Easy" },
    { questionText: "Express kya hai?", options: ["Database", "Node framework", "React library", "Language"], correctAnswer: "Node framework", difficulty: "Easy" },
    { questionText: "Middleware kya karta hai?", options: ["Ends request", "Intercepts request/response", "Crashes app", "Stores data"], correctAnswer: "Intercepts request/response", difficulty: "Medium" },
    { questionText: "REST API kya hai?", options: ["Architectural style", "Database", "Library", "Language"], correctAnswer: "Architectural style", difficulty: "Medium" },
    { questionText: "JWT ka use?", options: ["Database caching", "Authentication & Authorization", "Routing", "Styling"], correctAnswer: "Authentication & Authorization", difficulty: "Hard" },

    // --- DB + DevOps ---
    { questionText: "SQL vs NoSQL difference?", options: ["Relational vs Document", "Fast vs Slow", "Paid vs Free", "None"], correctAnswer: "Relational vs Document", difficulty: "Easy" },
    { questionText: "MongoDB kaisa store hai?", options: ["Graph", "Column", "Document", "Key-Value"], correctAnswer: "Document", difficulty: "Easy" },
    { questionText: "Primary key purpose?", options: ["Unique identifier", "Duplicate data", "Foreign linkage", "Styling"], correctAnswer: "Unique identifier", difficulty: "Medium" },
    { questionText: "Indexing use?", options: ["Slow queries", "Fast data retrieval", "Delete data", "Backup"], correctAnswer: "Fast data retrieval", difficulty: "Hard" },
    { questionText: "Aggregation in Mongo?", options: ["Data grouping & processing", "Data deletion", "Insert document", "Styling"], correctAnswer: "Data grouping & processing", difficulty: "Hard" },
    { questionText: "Normalization ka purpose?", options: ["Reduce redundancy", "Increase redundancy", "Mix data", "Create bugs"], correctAnswer: "Reduce redundancy", difficulty: "Medium" },
    { questionText: "Git kya hai?", options: ["Version Control System", "Text Editor", "Browser", "Language"], correctAnswer: "Version Control System", difficulty: "Easy" },
    { questionText: "CI/CD full form?", options: ["Continuous Integration/Continuous Deployment", "Code In/Code Down", "Create It/Copy Down", "None"], correctAnswer: "Continuous Integration/Continuous Deployment", difficulty: "Medium" },
    { questionText: "Docker kya karta hai?", options: ["Containerization", "Word Processing", "Image editing", "Drawing"], correctAnswer: "Containerization", difficulty: "Hard" },
    { questionText: "Cloud example?", options: ["AWS", "GitHub", "MongoDB", "Chrome"], correctAnswer: "AWS", difficulty: "Easy" },

    // --- Coding Questions (Subjective logic) ---
    // User requested subjective style but for MCQs we adapt them into "What is the output/How to" or just leave them as open-ended coding tasks if we support it.
    // The previous implementation graded empty text boxes, so we will set them as "explain/coding" strings.
    ...Array.from({ length: 40 }).map((_, i) => ({
        questionText: `Coding Task ${i + 61}: Solve the problem... (See problem statement)`,
        options: ["Write your JS/React code directly in the text box below."],
        correctAnswer: "Write your JS/React code directly in the text box below.",
        difficulty: "Hard",
        type: "coding" // Requires logic adjustments in Admin Panel schema if used
    }))
];

// Let's refine the coding tasks with actual text from user
const actualCodingQs = [
    "Reverse a string in JavaScript", "Check palindrome string", "Largest number in array find karo", "Count vowels in string",
    "Remove duplicates from array", "Array sort ascending", "Sum of array elements", "Capitalize first letter of each word",
    "Celsius -> Fahrenheit convert function likho", "Random number generator 1-100", "Factorial using loop", "Even/odd checker function",
    "Merge two arrays", "Flatten nested array", "Second largest number find karo",
    "Button click par text change karo", "Form validation (empty fields)", "Dark mode toggle banao", "Textarea character counter", "Image slider create karo",
    "Counter app using useState", "Todo list add/delete", "API fetch karke data display", "Search filter list", "Controlled form component", "React Router 3 pages setup", "Context API global state", "Debounce search input",
    "Express server setup", "GET API create karo", "POST API JSON body", "JWT authentication implement", "File upload using Multer", "MongoDB CRUD APIs",
    "React -> Node API integration", "Login system JWT + MongoDB", "Protected routes implement", "Role-based authentication", "URL Shortener design + code", "Real-time Chat App using Socket.io"
].map(qText => ({
    questionText: `Coding Question: ${qText}`,
    options: ["(This is a subjective coding question. Write your code below.)", "Code", "Submit", "Run"],
    correctAnswer: "Code",
    difficulty: "Hard",
    type: "coding"
}));

// Overwrite the last 40 with the real ones
for (let i = 0; i < 40; i++) {
    fullExamQuestions[60 + i] = actualCodingQs[i];
}


const seed100QuestionExam = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('MongoDB Connected...');

        // Find existing full length mock or clear old ones conditionally
        await Exam.deleteOne({ title: 'Full Stack Development – 100 Questions Exam' });

        const domain = await Domain.findOne({ name: 'Full Stack Web Development' });

        const examObj = new Exam({
            title: 'Full Stack Development – 100 Questions Exam',
            type: 'Full-length Mock',
            durationMinutes: 180,
            domainId: domain ? domain._id : null,
            questions: fullExamQuestions
        });

        await examObj.save();
        console.log('Successfully seeded 100 question exam.');
        process.exit(0);
    } catch (err) {
        console.error('Failed to seed exam:');
        console.error(err);
        process.exit(1);
    }
};

seed100QuestionExam();
