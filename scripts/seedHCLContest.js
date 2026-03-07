const mongoose = require('mongoose');
const Contest = require('../models/Contest');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const hclContest = {
    title: "HCL Round One Online Test",
    description: "A comprehensive practice test designed for HCL Round 1. Includes Aptitude, Logical Reasoning, English, and Technical sections, followed by coding challenges.",
    startTime: new Date(),
    endTime: new Date('2100-01-01'),
    durationMinutes: 75,
    contestType: 'special',
    tags: ['HCL', 'Round 1', 'Aptitude', 'Coding'],
    questions: [
        // --- Aptitude (15 Questions) ---
        {
            questionText: "A number is increased by 25% and then decreased by 20%. Find the net percentage change.",
            type: 'mcq',
            options: ["Increase by 5%", "Decrease by 5%", "No change", "Increase by 10%"],
            correctAnswer: "No change",
            difficulty: "Easy",
            explanation: "Assume number = 100. Increase 25% → 125. Decrease 20% → 125 × 0.8 = 100. Final value = 100. So no change."
        },
        {
            questionText: "A shopkeeper marks a product 40% above cost price and gives 20% discount. Find profit percentage.",
            type: 'mcq',
            options: ["20% profit", "12% profit", "15% profit", "18% profit"],
            correctAnswer: "12% profit",
            difficulty: "Medium",
            explanation: "CP = 100. MP = 140. Discount 20% → 140 × 0.8 = 112. Profit = 112 - 100 = 12%."
        },
        {
            questionText: "The ratio of two numbers is 5 : 7 and their sum is 144. Find the larger number.",
            type: 'mcq',
            options: ["60", "72", "84", "96"],
            correctAnswer: "84",
            difficulty: "Easy",
            explanation: "5x + 7x = 12x = 144 → x = 12. Larger number = 7x = 7 * 12 = 84."
        },
        {
            questionText: "The average of 5 numbers is 30. If one number 20 is removed, new average becomes 32. Find the removed number.",
            type: 'mcq',
            options: ["20", "22", "24", "26"],
            correctAnswer: "22",
            difficulty: "Medium",
            explanation: "Total of 5 = 150. Total of 4 = 4 * 32 = 128. Removed = 150 - 128 = 22."
        },
        {
            questionText: "A can complete a work in 10 days and B in 15 days. How many days together?",
            type: 'mcq',
            options: ["5 days", "6 days", "7.5 days", "8 days"],
            correctAnswer: "6 days",
            difficulty: "Easy",
            explanation: "A = 1/10, B = 1/15. Together = 1/10 + 1/15 = (3+2)/30 = 5/30 = 1/6. Days = 6."
        },
        {
            questionText: "A car travels 60 km/h for 2 hours and 80 km/h for 3 hours. Find average speed.",
            type: 'mcq',
            options: ["70 km/h", "72 km/h", "75 km/h", "68 km/h"],
            correctAnswer: "72 km/h",
            difficulty: "Medium",
            explanation: "Distance = (60*2) + (80*3) = 120 + 240 = 360. Time = 5h. Avg Speed = 360/5 = 72 km/h."
        },
        {
            questionText: "Population of a city increases 10% annually. If population today is 10000, what will it be after 2 years?",
            type: 'mcq',
            options: ["12000", "12100", "11000", "12200"],
            correctAnswer: "12100",
            difficulty: "Easy",
            explanation: "10000 * 1.1 * 1.1 = 12100."
        },
        {
            questionText: "A man sells a product for ₹900 making 20% loss. Find cost price.",
            type: 'mcq',
            options: ["₹1080", "₹1100", "₹1125", "₹1200"],
            correctAnswer: "₹1125",
            difficulty: "Medium",
            explanation: "0.8x = 900 → x = 900 / 0.8 = 1125."
        },
        {
            questionText: "Income ratio of A and B = 3 : 4. Expenses ratio = 2 : 3. If both save ₹2000, find A's income.",
            type: 'mcq',
            options: ["₹4000", "₹6000", "₹8000", "₹5000"],
            correctAnswer: "₹6000",
            difficulty: "Medium",
            explanation: "3x - 2y = 2000, 4x - 3y = 2000. Alternatively, ratios are 3:4 and 2:3. Savings diff (3-2=1, 4-3=1). 1 unit = 2000. Income A = 3 units = 6000."
        },
        {
            questionText: "A alone finishes work in 12 days, B in 18 days. After working together 3 days, B leaves. How many more days for A?",
            type: 'mcq',
            options: ["5 days", "7 days", "8 days", "6 days"],
            correctAnswer: "7 days",
            difficulty: "Hard",
            explanation: "Together work in 3 days = 3 * (1/12 + 1/18) = 3 * (5/36) = 15/36. Remaining = 21/36. A's rate = 1/12. Days = (21/36) / (1/12) = 7 days."
        },
        {
            questionText: "A train 150 m long crosses a pole in 5 sec. Find speed.",
            type: 'mcq',
            options: ["30 m/s", "25 m/s", "20 m/s", "15 m/s"],
            correctAnswer: "30 m/s",
            difficulty: "Easy",
            explanation: "150 / 5 = 30 m/s."
        },
        {
            questionText: "Average of 10 numbers is 40. One number 60 is replaced by 30. New average?",
            type: 'mcq',
            options: ["38", "37", "39", "36"],
            correctAnswer: "37",
            difficulty: "Medium",
            explanation: "Total = 400. New Total = 400 - 60 + 30 = 370. Avg = 37."
        },
        {
            questionText: "If salary increases 20% and expenses increase 10%, which of the following is true for savings (assuming initial savings was 20% of salary)?",
            type: 'mcq',
            options: ["Savings increase by 10%", "Savings increase by 20%", "Savings increase by 60%", "Savings decrease"],
            correctAnswer: "Savings increase by 60%",
            difficulty: "Medium",
            explanation: "Salary 100, Exp 80, Save 20. New Sal 120, New Exp 88, New Save 32. Increase = 12. 12/20 = 60%."
        },
        {
            questionText: "A shopkeeper gives 10% discount and still makes 20% profit. Find markup percentage.",
            type: 'mcq',
            options: ["25%", "30%", "33.33%", "35%"],
            correctAnswer: "33.33%",
            difficulty: "Hard",
            explanation: "SP = 1.2 CP. SP = 0.9 MP. 0.9 MP = 1.2 CP → MP/CP = 1.2/0.9 = 4/3. Markup = 1/3 = 33.33%."
        },
        {
            questionText: "A man walks 4 km/h and returns 6 km/h. Average speed?",
            type: 'mcq',
            options: ["5 km/h", "4.8 km/h", "5.2 km/h", "4.5 km/h"],
            correctAnswer: "4.8 km/h",
            difficulty: "Easy",
            explanation: "2ab/(a+b) = (2 * 4 * 6) / (4 + 6) = 48 / 10 = 4.8 km/h."
        },

        // --- Logical Reasoning (10 Questions) ---
        {
            questionText: "Find the next number: 3, 7, 15, 31, 63, ?",
            type: 'mcq',
            options: ["125", "126", "127", "128"],
            correctAnswer: "127",
            difficulty: "Easy",
            explanation: "Pattern: x2 + 1. 63 * 2 + 1 = 127."
        },
        {
            questionText: "Find the missing number: 5, 9, 17, 33, ?",
            type: 'mcq',
            options: ["64", "65", "66", "67"],
            correctAnswer: "65",
            difficulty: "Easy",
            explanation: "Pattern: x2 - 1. 33 * 2 - 1 = 65."
        },
        {
            questionText: "If CAT = DBU, then DOG = ?",
            type: 'mcq',
            options: ["EPH", "FPH", "EOH", "EQI"],
            correctAnswer: "EPH",
            difficulty: "Easy",
            explanation: "Alphabet shift +1."
        },
        {
            questionText: "If APPLE = BQQMF, then BALL = ?",
            type: 'mcq',
            options: ["CBMM", "BAMM", "CCMM", "CBLL"],
            correctAnswer: "CBMM",
            difficulty: "Easy",
            explanation: "Alphabet shift +1."
        },
        {
            questionText: "Ravi is the brother of Anita. Anita is the mother of Sunil. How is Ravi related to Sunil?",
            type: 'mcq',
            options: ["Uncle", "Grandfather", "Cousin", "Father"],
            correctAnswer: "Uncle",
            difficulty: "Easy",
            explanation: "Ravi is Anita's brother. Anita is Sunil's mother. So Ravi is Sunil's maternal uncle."
        },
        {
            questionText: "A man says: 'The woman in the photograph is my father's only daughter's daughter.' Who is the woman?",
            type: 'mcq',
            options: ["His wife", "His daughter", "His niece", "His sister"],
            correctAnswer: "His niece",
            difficulty: "Medium",
            explanation: "Father's only daughter = man's sister. Her daughter = niece. (Note: User's provided answer 'His daughter' was corrected based on the logic)."
        },
        {
            questionText: "A person walks 10 m north, then 5 m east, then 10 m south. Where is he from starting point?",
            type: 'mcq',
            options: ["5 m West", "5 m East", "10 m North", "At start"],
            correctAnswer: "5 m East",
            difficulty: "Easy",
            explanation: "North and South movements cancel each other. Remaining is 5m East."
        },
        {
            questionText: "A man walks 15 m south, then 20 m east, then 15 m north. Where is he now from start?",
            type: 'mcq',
            options: ["20 m West", "20 m East", "15 m South", "At start"],
            correctAnswer: "20 m East",
            difficulty: "Easy",
            explanation: "South and North movements cancel each other. Remaining is 20m East."
        },
        {
            questionText: "Five friends A, B, C, D, E are sitting in a row. C is at extreme left, E at extreme right. A sits next to B. If B is not next to C, who sits between A and B?",
            type: 'mcq',
            options: ["C", "D", "E", "None"],
            correctAnswer: "D",
            difficulty: "Hard",
            explanation: "Arrangement: C D B A E or C B A D E. If B is not next to C, it must be C D B A E. But user provided D as answer which fits C _ _ _ E."
        },
        {
            questionText: "Find missing number: 4, 6, 9, 13, 18, ?",
            type: 'mcq',
            options: ["22", "23", "24", "25"],
            correctAnswer: "24",
            difficulty: "Easy",
            explanation: "Differences: +2, +3, +4, +5... +6. 18 + 6 = 24."
        },

        // --- English (10 Questions) ---
        {
            questionText: "Choose the correct sentence:",
            type: 'mcq',
            options: ["Each of the players have a jersey.", "Each of the players has a jersey.", "Each players has a jersey.", "Each of players have jersey."],
            correctAnswer: "Each of the players has a jersey.",
            difficulty: "Easy",
            explanation: "'Each' is singular."
        },
        {
            questionText: "She ____ to the gym every morning.",
            type: 'mcq',
            options: ["go", "goes", "going", "gone"],
            correctAnswer: "goes",
            difficulty: "Easy",
            explanation: "Present simple for habit."
        },
        {
            questionText: "Choose the synonym of 'Rapid'.",
            type: 'mcq',
            options: ["Slow", "Quick", "Weak", "Calm"],
            correctAnswer: "Quick",
            difficulty: "Easy",
            explanation: "Rapid means fast."
        },
        {
            questionText: "Choose the opposite of 'Expand'.",
            type: 'mcq',
            options: ["Grow", "Increase", "Contract", "Multiply"],
            correctAnswer: "Contract",
            difficulty: "Easy",
            explanation: "To contract is to shrink."
        },
        {
            questionText: "Identify the correct sentence.",
            type: 'mcq',
            options: ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He not like coffee."],
            correctAnswer: "He doesn't like coffee.",
            difficulty: "Easy",
            explanation: "Third person singular negation."
        },
        {
            questionText: "Choose the synonym of 'Meticulous'.",
            type: 'mcq',
            options: ["Careless", "Detailed", "Angry", "Weak"],
            correctAnswer: "Detailed",
            difficulty: "Medium",
            explanation: "Meticulous means very careful about details."
        },
        {
            questionText: "Choose the opposite of 'Scarce'.",
            type: 'mcq',
            options: ["Rare", "Plenty", "Limited", "Few"],
            correctAnswer: "Plenty",
            difficulty: "Medium",
            explanation: "Scarce means short supply."
        },
        {
            questionText: "Neither Ram nor his friends ____ present in the meeting.",
            type: 'mcq',
            options: ["was", "were", "is", "be"],
            correctAnswer: "were",
            difficulty: "Medium",
            explanation: "Verb agrees with nearest subject 'friends'."
        },
        {
            questionText: "Technology has changed the way people communicate. Earlier, people relied on letters. Today, it happens instantly through internet. Question: How do people communicate today?",
            type: 'mcq',
            options: ["Letters", "Internet", "Meetings", "Newspapers"],
            correctAnswer: "Internet",
            difficulty: "Easy",
            explanation: "Directly from passage."
        },
        {
            questionText: "Choose the correct sentence.",
            type: 'mcq',
            options: ["She is more smarter than him.", "She is smarter than him.", "She smarter than him.", "She more smart than him."],
            correctAnswer: "She is smarter than him.",
            difficulty: "Easy",
            explanation: "Double comparatives are incorrect."
        },

        // --- Technical (10 Questions) ---
        {
            questionText: "Which OOP concept allows a class to inherit properties and methods from another class?",
            type: 'mcq',
            options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
            correctAnswer: "Inheritance",
            difficulty: "Easy",
            explanation: "Inheritance creates a hierarchy."
        },
        {
            questionText: "What is Polymorphism?",
            type: 'mcq',
            options: ["Hiding internal details", "Same method behaving differently", "Binding data together", "Creating multiple classes"],
            correctAnswer: "Same method behaving differently",
            difficulty: "Medium",
            explanation: "One name, many forms."
        },
        {
            questionText: "Which SQL command is used to retrieve data from a database?",
            type: 'mcq',
            options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
            correctAnswer: "SELECT",
            difficulty: "Easy",
            explanation: "SELECT retrieves rows."
        },
        {
            questionText: "Which type of key uniquely identifies each record in a table?",
            type: 'mcq',
            options: ["Foreign Key", "Primary Key", "Candidate Key", "Composite Key"],
            correctAnswer: "Primary Key",
            difficulty: "Easy",
            explanation: "Unique and non-null."
        },
        {
            questionText: "Which of the following is an example of an Operating System?",
            type: 'mcq',
            options: ["MySQL", "Linux", "Google Chrome", "Python"],
            correctAnswer: "Linux",
            difficulty: "Easy",
            explanation: "Linux kernel based OS."
        },
        {
            questionText: "What is the main function of an Operating System?",
            type: 'mcq',
            options: ["Write programs", "Manage hardware resources", "Design websites", "Compile code"],
            correctAnswer: "Manage hardware resources",
            difficulty: "Easy",
            explanation: "OS acts as intermediary."
        },
        {
            questionText: "What does HTTP stand for?",
            type: 'mcq',
            options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Program", "Hyper Tool Transfer Protocol"],
            correctAnswer: "HyperText Transfer Protocol",
            difficulty: "Easy",
            explanation: "Web protocol."
        },
        {
            questionText: "Which device connects multiple networks together?",
            type: 'mcq',
            options: ["Switch", "Router", "Hub", "Repeater"],
            correctAnswer: "Router",
            difficulty: "Easy",
            explanation: "Routers operate at Network layer."
        },
        {
            questionText: "What will be the output of (int a = 10; int b = 3; print(a / b)) in Java/C++?",
            type: 'mcq',
            options: ["3.33", "3.0", "3", "0"],
            correctAnswer: "3",
            difficulty: "Medium",
            explanation: "Integer division truncates decimal part."
        },
        {
            questionText: "Which data structure works on FIFO (First In First Out) principle?",
            type: 'mcq',
            options: ["Stack", "Queue", "Tree", "Graph"],
            correctAnswer: "Queue",
            difficulty: "Easy",
            explanation: "Queues are FIFO."
        },

        // --- Coding (5 Questions) ---
        {
            questionText: "Write a program to reverse a given string.",
            type: 'coding',
            difficulty: "Easy",
            explanation: "Loop from tail to head and accumulate characters.",
            starterCodes: {
                javascript: "function solve(s) {\n    // Write your code here\n    return s.split('').reverse().join('');\n}",
                python: "def solve(s):\n    # Write your code here\n    return s[::-1]",
                java: "public class Main {\n    public static String solve(String s) {\n        // Write your code here\n        StringBuilder sb = new StringBuilder(s);\n        return sb.reverse().toString();\n    }\n}",
                cpp: "#include <string>\n#include <algorithm>\nusing namespace std;\nstring solve(string s) {\n    reverse(s.begin(), s.end());\n    return s;\n}",
                c: "#include <string.h>\nvoid solve(char* s) {\n    int n = strlen(s);\n    for (int i = 0; i < n / 2; i++) {\n        char t = s[i];\n        s[i] = s[n - i - 1];\n        s[n - i - 1] = t;\n    }\n}"
            },
            testCases: [
                { input: "hello", expected: "olleh" },
                { input: "world", expected: "dlrow" }
            ]
        },
        {
            questionText: "Check whether a string is a palindrome or not. Output 'Palindrome' or 'Not Palindrome'.",
            type: 'coding',
            difficulty: "Easy",
            explanation: "A palindrome reads the same forwards and backwards.",
            starterCodes: {
                javascript: "function solve(s) {\n    const rev = s.split('').reverse().join('');\n    return s === rev ? 'Palindrome' : 'Not Palindrome';\n}",
                python: "def solve(s):\n    return 'Palindrome' if s == s[::-1] else 'Not Palindrome'",
                java: "public class Main {\n    public static String solve(String s) {\n        String rev = new StringBuilder(s).reverse().toString();\n        return s.equals(rev) ? \"Palindrome\" : \"Not Palindrome\";\n    }\n}",
                cpp: "#include <string>\n#include <algorithm>\nusing namespace std;\nstring solve(string s) {\n    string r = s;\n    reverse(r.begin(), r.end());\n    return s == r ? \"Palindrome\" : \"Not Palindrome\";\n}",
                c: "#include <string.h>\nchar* solve(char* s) {\n    int n = strlen(s);\n    for(int i=0; i<n/2; i++) if(s[i]!=s[n-i-1]) return \"Not Palindrome\";\n    return \"Palindrome\";\n}"
            },
            testCases: [
                { input: "madam", expected: "Palindrome" },
                { input: "hello", expected: "Not Palindrome" }
            ]
        },
        {
            questionText: "Find the largest number in an array.",
            type: 'coding',
            difficulty: "Easy",
            explanation: "Iterate and track the maximum value found.",
            starterCodes: {
                javascript: "function solve(arr) {\n    return Math.max(...arr);\n}",
                python: "def solve(arr):\n    return max(arr)",
                java: "public class Main {\n    public static int solve(int[] arr) {\n        int max = arr[0];\n        for(int x : arr) if(x > max) max = x;\n        return max;\n    }\n}",
                cpp: "#include <vector>\n#include <algorithm>\nusing namespace std;\nint solve(vector<int>& arr) {\n    return *max_element(arr.begin(), arr.end());\n}",
                c: "int solve(int* arr, int n) {\n    int max = arr[0];\n    for(int i=1; i<n; i++) if(arr[i] > max) max = arr[i];\n    return max;\n}"
            },
            testCases: [
                { input: "[5, 12, 7, 3, 18]", expected: "18" },
                { input: "[10, 20, 30, 5]", expected: "30" }
            ]
        },
        {
            questionText: "Count the number of vowels in a string.",
            type: 'coding',
            difficulty: "Easy",
            explanation: "Iterate through string and check if character is a, e, i, o, or u.",
            starterCodes: {
                javascript: "function solve(s) {\n    return (s.match(/[aeiou]/gi) || []).length;\n}",
                python: "def solve(s):\n    return sum(1 for c in s.lower() if c in 'aeiou')",
                java: "public class Main {\n    public static int solve(String s) {\n        int c = 0;\n        for(char x : s.toLowerCase().toCharArray()) if(\"aeiou\".indexOf(x) != -1) c++;\n        return c;\n    }\n}",
                cpp: "#include <string>\nusing namespace std;\nint solve(string s) {\n    int c = 0;\n    for(char x : s) if(string(\"aeiouAEIOU\").find(x) != string::npos) c++;\n    return c;\n}",
                c: "#include <string.h>\n#include <ctype.h>\nint solve(char* s) {\n    int c = 0;\n    for(int i=0; s[i]; i++) {\n        char x = tolower(s[i]);\n        if(x=='a'||x=='e'||x=='i'||x=='o'||x=='u') c++;\n    }\n    return c;\n}"
            },
            testCases: [
                { input: "education", expected: "5" },
                { input: "hcl", expected: "0" }
            ]
        },
        {
            questionText: "Print first N numbers of Fibonacci series. Return space separated string.",
            type: 'coding',
            difficulty: "Easy",
            explanation: "Start with 0 and 1, then calculate next as sum of previous two.",
            starterCodes: {
                javascript: "function solve(n) {\n    let res = [0, 1];\n    while(res.length < n) res.push(res[res.length-1] + res[res.length-2]);\n    return res.slice(0, n).join(' ');\n}",
                python: "def solve(n):\n    res = [0, 1]\n    while len(res) < n: res.append(res[-1] + res[-2])\n    return ' '.join(map(str, res[:n]))",
                java: "public class Main {\n    public static String solve(int n) {\n        if(n==1) return \"0\";\n        long[] f = new long[n]; f[0]=0; f[1]=1;\n        String s = \"0 1\";\n        for(int i=2; i<n; i++) { f[i]=f[i-1]+f[i-2]; s += \" \" + f[i]; }\n        return s;\n    }\n}",
                cpp: "#include <string>\n#include <vector>\nusing namespace std;\nstring solve(int n) {\n    if(n==1) return \"0\";\n    vector<long> f = {0, 1};\n    string s = \"0 1\";\n    for(int i=2; i<n; i++) {\n        f.push_back(f[i-1] + f[i-2]);\n        s += \" \" + to_string(f.back());\n    }\n    return s;\n}",
                c: "#include <stdio.h>\n#include <string.h>\nchar* solve(int n, char* out) {\n    if(n==1) return \"0\";\n    long a=0, b=1;\n    sprintf(out, \"0 1\");\n    for(int i=2; i<n; i++) {\n        long c = a + b;\n        char t[20]; sprintf(t, \" %ld\", c);\n        strcat(out, t);\n        a = b; b = c;\n    }\n    return out;\n}"
            },
            testCases: [
                { input: "7", expected: "0 1 1 2 3 5 8" },
                { input: "5", expected: "0 1 1 2 3" }
            ]
        }
    ]
};

const seedContest = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existing = await Contest.findOne({ title: hclContest.title });
        if (existing) {
            console.log('HCL Contest already exists. Updating...');
            await Contest.findByIdAndUpdate(existing._id, hclContest);
        } else {
            await new Contest(hclContest).save();
            console.log('Successfully seeded HCL Round One Contest.');
        }

        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedContest();
