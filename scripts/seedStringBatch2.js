const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch2StringQuestions = [
    {
        title: "Zigzag Conversion",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Convert a string into a zigzag pattern across multiple rows and read row by row.",
            explanation: "### Zigzag Conversion\n\n**Concept:** Simulation\n\n**Approach:**\n1. If `numRows == 1` or `numRows >= s.length`, return the original string.\n2. Create an array of strings, one for each row.\n3. Iterate through characters in `s`, appending each to the current row.\n4. Use a `direction` variable to toggle between 'moving down' and 'moving up' when you reach the first or last row.\n5. Join all row strings to get the final result.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "The string `\"PAYPALISHIRING\"` is written in a zigzag pattern on a given number of rows like this: \n\nP   A   H   N\nA P L S I I G\nY   I   R\n\nAnd then read line by line: `\"PAHNAPLSIIGYIR\"`.\n\nWrite the code that will take a string and make this conversion given a number of rows.",
            sampleInput: "s = \"PAYPALISHIRING\", numRows = 3",
            sampleOutput: "\"PAHNAPLSIIGYIR\"",
            constraints: "1 <= s.length <= 1000, 1 <= numRows <= 1000, lowercase/uppercase English letters, '.' and ','.",
            starterCode: "/**\n * @param {string} s\n * @param {number} numRows\n * @return {string}\n */\nvar convert = function(s, numRows) {\n    \n};",
            tags: ["String"]
        }
    },
    {
        title: "Roman to Integer",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Convert a Roman numeral string to an integer.",
            explanation: "### Roman to Integer\n\n**Concept:** Symbol Value Mapping\n\n**Approach:**\n1. Create a map for Roman symbols (`I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000`).\n2. Iterate through the string.\n3. If the current symbol's value is less than the next symbol's value (e.g., `IV`), subtract the current value from the result (subtract 1, then add 5).\n4. Otherwise, add the current symbol's value to the result.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (fixed map)",
            problemStatement: "Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.\n\nSymbol       Value\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000\n\nGiven a roman numeral, convert it to an integer.",
            sampleInput: "s = \"LVIII\"",
            sampleOutput: "58",
            constraints: "1 <= s.length <= 15, s contains only characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar romanToInt = function(s) {\n    \n};",
            tags: ["Hash Table", "Math", "String"]
        }
    },
    {
        title: "Integer to Roman",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Convert an integer to a Roman numeral string.",
            explanation: "### Integer to Roman\n\n**Concept:** Greedy Mapping\n\n**Approach:**\n1. Define sorted lists of values and their corresponding Roman symbols (including cases like 4, 9, 40, etc.).\n2. Iterate through the values from largest to smallest.\n3. While the input `num` is greater than or equal to the current value, append the Roman symbol to the result string and subtract the value from `num`.\n\n**Time Complexity:** O(1) (The number of symbols is capped by the range of input).\n**Space Complexity:** O(1).",
            problemStatement: "Roman numerals are formed by appending the values of each character together. For example, 12 is `XII`, which is simply `X + II`.\n\nSeven different symbols are used: `I, V, X, L, C, D, M`.\n\nGiven an integer, convert it to a roman numeral.",
            sampleInput: "num = 3749",
            sampleOutput: "\"MMMDCCXLIX\"",
            constraints: "1 <= num <= 3999",
            starterCode: "/**\n * @param {number} num\n * @return {string}\n */\nvar intToRoman = function(num) {\n    \n};",
            tags: ["Hash Table", "Math", "String"]
        }
    },
    {
        title: "Longest Common Prefix",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Find the longest common prefix string amongst an array of strings.",
            explanation: "### Longest Common Prefix\n\n**Concepts:** Horizontal/Vertical Scanning\n\n**Approach:**\n1. **Horizontal:** Assume the first string is the prefix. Compare it with the next string and truncate the prefix until it matches. Repeat for all strings.\n2. **Vertical:** Compare characters at index `i` for all strings. If they all match, index `i` is part of the prefix. Stop at the first mismatch.\n\n**Time Complexity:** O(n * m) where n is word count and m is average length.\n**Space Complexity:** O(1).",
            problemStatement: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `\"\"`.",
            sampleInput: "strs = [\"flower\",\"flow\",\"flight\"]",
            sampleOutput: "\"fl\"",
            constraints: "1 <= strs.length <= 200, 0 <= strs[i].length <= 200, lowercase English letters.",
            starterCode: "/**\n * @param {string[]} strs\n * @return {string}\n */\nvar longestCommonPrefix = function(strs) {\n    \n};",
            tags: ["String", "Trie"]
        }
    },
    {
        title: "Reverse Words in a String",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Reverse the order of words in a string, removing extra spaces.",
            explanation: "### Reverse Words in a String\n\n**Concept:** String Parsing\n\n**Approach:**\n1. Use built-in methods: `split(' ')` to get words, filter out empty strings (extra spaces), `reverse()` the array, and `join(' ')` back.\n2. Manually: Read word by word from the end of the string or use two pointers to extract words and build the result.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given an input string `s`, reverse the order of the words.\nA word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space.\n\nReturn a string of the words in reverse order concatenated by a single space.",
            sampleInput: "s = \"  hello world  \"",
            sampleOutput: "\"world hello\"",
            constraints: "1 <= s.length <= 10^4, English letters, digits, and spaces.",
            starterCode: "/**\n * @param {string} s\n * @return {string}\n */\nvar reverseWords = function(s) {\n    \n};",
            tags: ["Two Pointers", "String"]
        }
    },
    {
        title: "Compare Version Numbers",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Compare two version strings segment-wise.",
            explanation: "### Compare Version Numbers\n\n**Concept:** String Splitting + Integer Compare\n\n**Approach:**\n1. Split both strings `v1` and `v2` by the dot `.` operator.\n2. Iterate through segments. If one version has fewer segments, treat the missing segments as 0.\n3. Convert segments to integers and compare them.\n4. If `v1 > v2` return 1, if `v1 < v2` return -1, else continue. Return 0 if all segments are equal.\n\n**Time Complexity:** O(n + m)\n**Space Complexity:** O(n + m)",
            problemStatement: "Given two version numbers, `version1` and `version2`, compare them.\nTo compare version numbers, split them into revisions. Compare the revisions in left-to-right order. Revisions are compared using their integer value ignoring any leading zeros.",
            sampleInput: "version1 = \"1.01\", version2 = \"1.001\"",
            sampleOutput: "0",
            constraints: "1 <= version1.length, version2.length <= 500.",
            starterCode: "/**\n * @param {string} version1\n * @param {string} version2\n * @return {number}\n */\nvar compareVersion = function(version1, version2) {\n    \n};",
            tags: ["Two Pointers", "String"]
        }
    },
    {
        title: "Multiply Strings",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Multiply two large integers represented as strings.",
            explanation: "### Multiply Strings\n\n**Concept:** Grade-School Multiplication\n\n**Approach:**\n1. Create a result array of size `m + n` filled with zeros.\n2. Iterate through `num1` and `num2` from right to left.\n3. Multiply digits at `i` and `j`. Add the product to the value at `result[i + j + 1]`.\n4. Handle carry: `result[i + j] += Math.floor(result[i + j + 1] / 10)` and `result[i + j + 1] %= 10`.\n5. Convert the result array back to a string, skipping leading zeros.\n\n**Time Complexity:** O(n * m)\n**Space Complexity:** O(n + m)",
            problemStatement: "Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string.\n\nNote: You must not use any built-in BigInteger library or convert the inputs to integer directly.",
            sampleInput: "num1 = \"123\", num2 = \"456\"",
            sampleOutput: "\"56088\"",
            constraints: "1 <= num1.length, num2.length <= 200, consist of digits only.",
            starterCode: "/**\n * @param {string} num1\n * @param {string} num2\n * @return {string}\n */\nvar multiply = function(num1, num2) {\n    \n};",
            tags: ["Math", "String", "Simulation"]
        }
    },
    {
        title: "Add Strings",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Add two non-negative integers represented as strings without direct conversion.",
            explanation: "### Add Strings\n\n**Concept:** Manual Addition\n\n**Approach:**\n1. Use two pointers starting from the end of `num1` and `num2`.\n2. Maintain a `carry` variable (initially 0).\n3. In each step, add digits at pointers (or 0 if pointer is out of bounds) plus the carry.\n4. Prepend `sum % 10` to the result string and update `carry = Math.floor(sum / 10)`.\n5. Continue until both strings are exhausted and carry is 0.\n\n**Time Complexity:** O(max(n, m))\n**Space Complexity:** O(max(n, m))",
            problemStatement: "Given two non-negative integers, `num1` and `num2` represented as strings, return the sum of `num1` and `num2` as a string.",
            sampleInput: "num1 = \"11\", num2 = \"123\"",
            sampleOutput: "\"134\"",
            constraints: "1 <= num1.length, num2.length <= 10^4.",
            starterCode: "/**\n * @param {string} num1\n * @param {string} num2\n * @return {string}\n */\nvar addStrings = function(num1, num2) {\n    \n};",
            tags: ["Math", "String", "Simulation"]
        }
    },
    {
        title: "First Unique Character in a String",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Find the index of the first non-repeating character in a string.",
            explanation: "### First Unique Char\n\n**Concept:** Frequency Counting\n\n**Approach:**\n1. Use a frequency map (or an array of size 26) to store the count of each character in the string.\n2. Iterate through the string once to populate the map.\n3. Iterate through the string a second time. The first character with a frequency of 1 is the result.\n4. If no such character exists, return -1.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (fixed size array/map).",
            problemStatement: "Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return -1.",
            sampleInput: "s = \"leetcode\"",
            sampleOutput: "0",
            constraints: "1 <= s.length <= 10^5, lowercase English letters.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar firstUniqChar = function(s) {\n    \n};",
            tags: ["Hash Table", "String", "Queue", "Counting"]
        }
    },
    {
        title: "Find All Anagrams in a String",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find all start indices of p's anagrams in s.",
            explanation: "### Find All Anagrams\n\n**Concept:** Sliding Window + Frequency Array\n\n**Approach:**\n1. Use two frequency arrays of size 26, one for `p` and one for the current window in `s` of size `p.length`.\n2. Slide the window across `s`.\n3. In each step, compare the two frequency arrays. If they are equal, the current `left` index is an anagram start.\n4. Efficiently update the window array by incrementing the count for the new character and decrementing for the character that left the window.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1).",
            problemStatement: "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order.",
            sampleInput: "s = \"cbaebabacd\", p = \"abc\"",
            sampleOutput: "[0,6]",
            constraints: "1 <= s.length, p.length <= 3 * 10^4.",
            starterCode: "/**\n * @param {string} s\n * @param {string} p\n * @return {number[]}\n */\nvar findAnagrams = function(s, p) {\n    \n};",
            tags: ["Hash Table", "String", "Sliding Window"]
        }
    }
];

const seedStringBatch2 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Strings'
        }).distinct('title');

        const filteredQuestions = batch2StringQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 2 String questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Strings',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new String questions (Batch 2).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedStringBatch2();
