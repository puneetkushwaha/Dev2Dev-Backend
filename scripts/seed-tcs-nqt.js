const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Contest = require('../models/Contest');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('✅ MongoDB Connected for seeding');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

const contestsData = [
    {
        title: "TCS NQT Prep - Quantitative Aptitude Mastery",
        description: "Focus on Time & Work, Time & Distance, Probability, and general arithmetic. Essential for TCS NQT Quantitative section.",
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        durationMinutes: 90,
        questions: [
            { questionText: "If a train travels 120 km in 2 hours, what is its speed?", options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"], correctAnswer: "60 km/h", difficulty: "Easy", explanation: "Speed = Distance/Time = 120/2 = 60 km/h" },
            { questionText: "What is 25% of 400?", options: ["50", "75", "100", "125"], correctAnswer: "100", difficulty: "Easy", explanation: "25% of 400 = (25/100) × 400 = 100" },
            { questionText: "If 5x + 3 = 28, then x = ?", options: ["3", "4", "5", "6"], correctAnswer: "5", difficulty: "Easy", explanation: "5x + 3 = 28 → 5x = 25 → x = 5" },
            { questionText: "The average of 5 numbers is 20. If one number is excluded, the average becomes 15. What is the excluded number?", options: ["30", "35", "40", "45"], correctAnswer: "40", difficulty: "Medium", explanation: "Sum of 5 numbers = 100. Sum of 4 numbers = 60. Excluded = 100-60=40" },
            { questionText: "A man buys an article for ₹500 and sells it for ₹600. What is his profit percentage?", options: ["10%", "15%", "20%", "25%"], correctAnswer: "20%", difficulty: "Easy", explanation: "Profit = 100. Profit% = (100/500) * 100 = 20%" },
            { questionText: "Find the next number in the series: 2, 6, 12, 20, ?", options: ["28", "30", "32", "34"], correctAnswer: "30", difficulty: "Medium", explanation: "Differences: 4, 6, 8, 10. Next difference = 10, so 20 + 10 = 30" },
            { questionText: "If the ratio of A:B is 3:4 and B:C is 2:3, what is A:C?", options: ["1:2", "2:3", "3:4", "4:5"], correctAnswer: "1:2", difficulty: "Medium", explanation: "A:B = 3:4, B:C = 4:6, so A:C = 3:6 = 1:2" },
            { questionText: "A pipe can fill a tank in 6 hours. Another pipe can empty it in 8 hours. If both are open, how long to fill the tank?", options: ["12 hours", "18 hours", "24 hours", "30 hours"], correctAnswer: "24 hours", difficulty: "Medium", explanation: "Net filling rate = 1/6 - 1/8 = 1/24 per hour. Time = 24 hours" },
            { questionText: "Simple Interest on ₹1000 at 5% per annum for 2 years is?", options: ["₹50", "₹100", "₹150", "₹200"], correctAnswer: "₹100", difficulty: "Easy", explanation: "SI = (P×R×T)/100 = (1000×5×2)/100 = ₹100" },
            { questionText: "If 2^x = 32, then x = ?", options: ["3", "4", "5", "6"], correctAnswer: "5", difficulty: "Easy", explanation: "2^x = 32 = 2^5, so x = 5" },
            { questionText: "A can do work in 10 days, B in 15 days. Together in how many days?", options: ["5 days", "6 days", "7 days", "8 days"], correctAnswer: "6 days", difficulty: "Medium", explanation: "Combined rate = 1/10 + 1/15 = 5/30 = 1/6. Time = 6 days" },
            { questionText: "12 men complete work in 9 days. How many men for 6 days?", options: ["15", "18", "20", "24"], correctAnswer: "18", difficulty: "Medium", explanation: "Total work = 108 man-days. Men needed = 108/6 = 18" },
            { questionText: "A car travels 60 km in 1 hour. How far in 2.5 hours?", options: ["120 km", "130 km", "140 km", "150 km"], correctAnswer: "150 km", difficulty: "Easy", explanation: "60 * 2.5 = 150 km" },
            { questionText: "Probability of getting a prime number when a die is rolled?", options: ["1/6", "1/3", "1/2", "2/3"], correctAnswer: "1/2", difficulty: "Easy", explanation: "Primes: 2, 3, 5. Probability = 3/6 = 1/2" },
            { questionText: "In a class of 50 students, 30 play cricket, 25 play football, 15 play both. How many play neither?", options: ["5", "10", "15", "20"], correctAnswer: "10", difficulty: "Medium", explanation: "Total = 30 + 25 - 15 + N = 50. N = 10" }
        ],
        isActive: true,
        contestType: "special",
        tags: ["TCS NQT", "Aptitude", "Quant"]
    },
    {
        title: "TCS NQT Prep - Logical Reasoning & Verbal Ability",
        description: "Sharpen your logical deduction, verbal reasoning, and linguistic skills for the TCS NQT foundation section.",
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        durationMinutes: 60,
        questions: [
            { questionText: "If all roses are flowers and some flowers are red, which statement is definitely true?", options: ["All roses are red", "Some roses are red", "Some flowers are roses", "All red things are flowers"], correctAnswer: "Some flowers are roses", difficulty: "Medium", explanation: "Logic follows from all roses being flowers." },
            { questionText: "Find the odd one out: 3, 9, 27, 81, 243, 729, 2188", options: ["243", "81", "2188", "729"], correctAnswer: "2188", difficulty: "Easy", explanation: "Others are powers of 3." },
            { questionText: "If CODING is written as DPEJOH, how is MOTHER written?", options: ["NPUIFS", "NPTIFS", "OPUIFS", "NPUIFT"], correctAnswer: "NPUIFS", difficulty: "Easy", explanation: "Each letter is shifted by +1." },
            { questionText: "Blood Relations: A is B's sister. B is C's father. D is C's sister. How is A related to D?", options: ["Aunt", "Sister", "Mother", "Cousin"], correctAnswer: "Aunt", difficulty: "Medium", explanation: "A is sister of D's father." },
            { questionText: "Ram walks 5m North, then 3m East, then 5m South. How far is he from starting point?", options: ["2m", "3m", "5m", "8m"], correctAnswer: "3m", difficulty: "Easy", explanation: "Ends up 3m East of start." },
            { questionText: "Choose the correct synonym for 'Benevolent':", options: ["Malicious", "Kind", "Angry", "Sad"], correctAnswer: "Kind", difficulty: "Easy", explanation: "Benevolent means kind." },
            { questionText: "Choose the antonym for 'Abundant':", options: ["Plentiful", "Scarce", "Sufficient", "Ample"], correctAnswer: "Scarce", difficulty: "Easy", explanation: "Scarce is opposite of abundant." },
            { questionText: "Identify the error: 'Neither of the two students are present today.'", options: ["Neither", "two students", "are", "present today"], correctAnswer: "are", difficulty: "Medium", explanation: "Should be 'is' for 'Neither'." },
            { questionText: "What is the meaning of the idiom 'A piece of cake'?", options: ["Difficult task", "Easy task", "Delicious food", "Birthday celebration"], correctAnswer: "Easy task", difficulty: "Easy", explanation: "Means something very easy." },
            { questionText: "One word substitution for 'A person who loves books':", options: ["Bibliophile", "Philanthropist", "Narcissist", "Hedonist"], correctAnswer: "Bibliophile", difficulty: "Easy", explanation: "Bibliophile loves books." }
        ],
        isActive: true,
        contestType: "special",
        tags: ["TCS NQT", "Logical Reasoning", "Verbal"]
    },
    {
        title: "TCS NQT Prep - Programming Essentials & DSA",
        description: "Concepts of C, C++, Java, Python, and core Data Structures & Algorithms. Critical for the technical hiring round.",
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        durationMinutes: 90,
        questions: [
            { questionText: "What is the output of: print(10 // 3) in Python?", options: ["3.33", "3", "4", "3.0"], correctAnswer: "3", difficulty: "Easy", explanation: "// is floor division." },
            { questionText: "Which data structure uses LIFO principle?", options: ["Queue", "Stack", "Array", "Linked List"], correctAnswer: "Stack", difficulty: "Easy", explanation: "Last In First Out." },
            { questionText: "Time complexity of Binary Search is:", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctAnswer: "O(log n)", difficulty: "Easy", explanation: "Divides search space by half." },
            { questionText: "What is the size of int data type in C?", options: ["2 bytes", "4 bytes", "8 bytes", "Depends on compiler"], correctAnswer: "4 bytes", difficulty: "Medium", explanation: "Usually 4 bytes on modern systems." },
            { questionText: "Which sorting algorithm is fastest on average?", options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], correctAnswer: "Quick Sort", difficulty: "Medium", explanation: "O(n log n) average." },
            { questionText: "Which traversal visits root node first?", options: ["Inorder", "Preorder", "Postorder", "Level order"], correctAnswer: "Preorder", difficulty: "Easy", explanation: "Root-Left-Right." },
            { questionText: "Which has constant time insertion at beginning?", options: ["Array", "Linked List", "Stack", "Queue"], correctAnswer: "Linked List", difficulty: "Medium", explanation: "O(1) time complexity." },
            { questionText: "What is the worst-case time complexity of linear search?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)" ], correctAnswer: "O(n)", difficulty: "Easy", explanation: "May check all n elements." },
            { questionText: "What is recursion?", options: ["Function calling itself", "Looping", "Iteration", "Function calling another function"], correctAnswer: "Function calling itself", difficulty: "Easy" },
            { questionText: "What is polymorphism in OOP?", options: ["Many forms of same entity", "Multiple classes", "Multiple objects", "Multiple methods"], correctAnswer: "Many forms of same entity", difficulty: "Medium" }
        ],
        isActive: true,
        contestType: "special",
        tags: ["TCS NQT", "Programming", "DSA"]
    },
    {
        title: "TCS NQT Prep - CS Fundamentals (OS, DBMS, Networks)",
        description: "Operating Systems, Databases, and Computer Networks. Core CS subjects asked in technical rounds.",
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        durationMinutes: 60,
        questions: [
            { questionText: "What is primary key?", options: ["A key that uniquely identifies each record", "The first key in table", "A foreign key", "An index"], correctAnswer: "A key that uniquely identifies each record", difficulty: "Easy" },
            { questionText: "Which command is used to retrieve data from database?", options: ["GET", "FETCH", "SELECT", "RETRIEVE"], correctAnswer: "SELECT", difficulty: "Easy" },
            { questionText: "What does IP stand for?", options: ["Internet Protocol", "Internal Protocol", "Internet Process", "International Protocol"], correctAnswer: "Internet Protocol", difficulty: "Easy" },
            { questionText: "Which layer of OSI model handles routing?", options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"], correctAnswer: "Network Layer", difficulty: "Medium" },
            { questionText: "What is deadlock?", options: ["When system crashes", "When processes wait indefinitely for resources", "When CPU is idle", "When memory is full"], correctAnswer: "When processes wait indefinitely for resources", difficulty: "Medium" },
            { questionText: "Which scheduling algorithm is non-preemptive?", options: ["Round Robin", "FCFS", "Priority Scheduling", "Multilevel Queue"], correctAnswer: "FCFS", difficulty: "Medium" },
            { questionText: "What is normalization?", options: ["Organizing data to reduce redundancy", "Creating backups", "Indexing tables", "Encrypting data"], correctAnswer: "Organizing data to reduce redundancy", difficulty: "Medium" },
            { questionText: "What is virtual memory?", options: ["RAM", "Using disk space as extended RAM", "ROM", "Cache memory"], correctAnswer: "Using disk space as extended RAM", difficulty: "Medium" },
            { questionText: "HTTP uses which default port?", options: ["21", "22", "80", "443"], correctAnswer: "80", difficulty: "Easy" },
            { questionText: "What is the brain of computer?", options: ["RAM", "CPU", "Hard Disk", "Monitor"], correctAnswer: "CPU", difficulty: "Easy" }
        ],
        isActive: true,
        contestType: "special",
        tags: ["TCS NQT", "OS", "DBMS", "Networking"]
    },
    {
        title: "TCS NQT Prep - Modern Tech & Software Engineering",
        description: "Cloud Computing, Cybersecurity, AI/ML basics, and Software Engineering practices (SDLC, Agile).",
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        durationMinutes: 60,
        questions: [
            { questionText: "Which is a cloud service provider?", options: ["Microsoft", "AWS", "Intel", "Cisco"], correctAnswer: "AWS", difficulty: "Easy" },
            { questionText: "What is SaaS?", options: ["Software as a Service", "Security as a Service", "Storage as a Service", "System as a Service"], correctAnswer: "Software as a Service", difficulty: "Easy" },
            { questionText: "What is encryption?", options: ["Converting data into coded form", "Deleting data", "Copying data", "Moving data"], correctAnswer: "Converting data into coded form", difficulty: "Easy" },
            { questionText: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Applied Intelligence"], correctAnswer: "Artificial Intelligence", difficulty: "Easy" },
            { questionText: "What is machine learning?", options: ["Machines learning from humans", "Algorithms that improve through experience", "Building machines", "Operating machines"], correctAnswer: "Algorithms that improve through experience", difficulty: "Medium" },
            { questionText: "Which is NOT a phase of SDLC?", options: ["Planning", "Design", "Marketing", "Testing"], correctAnswer: "Marketing", difficulty: "Easy" },
            { questionText: "What is agile methodology?", options: ["Sequential development", "Iterative software development approach", "Fast development", "Quick testing"], correctAnswer: "Iterative software development approach", difficulty: "Medium" },
            { questionText: "What is Docker?", options: ["Containerization platform", "Documentation tool", "Database", "Programming language"], correctAnswer: "Containerization platform", difficulty: "Medium" },
            { questionText: "What does HTML stand for?", options: ["Hypertext Markup Language", "Hypertext Machine Language", "Hightext Markup Language", "Hyperlink Markup Language"], correctAnswer: "Hypertext Markup Language", difficulty: "Easy" },
            { questionText: "What is load balancing?", options: ["Distributing workload across multiple servers", "Balancing database load", "Loading balance sheet", "CPU load management"], correctAnswer: "Distributing workload across multiple servers", difficulty: "Medium" }
        ],
        isActive: true,
        contestType: "special",
        tags: ["TCS NQT", "Cloud", "AI", "Software Engineering"]
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        await Contest.deleteMany({ tags: "TCS NQT" });
        console.log('🗑️ Old TCS NQT contests cleared');

        await Contest.insertMany(contestsData);
        console.log('✨ TCS NQT contests seeded successfully!');
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding Error:', err.message);
        process.exit(1);
    }
};

seedDB();
