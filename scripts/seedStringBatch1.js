const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch1StringQuestions = [
    {
        title: "Valid Anagram",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Check if two strings are anagrams of each other.",
            explanation: "### Valid Anagram\n\n**Concept:** Frequency Counting\n\n**Approach:**\n1. If strings have different lengths, they cannot be anagrams.\n2. Use a frequency array of size 26 (for lowercase English letters).\n3. Increment count for each character in string `s` and decrement for each character in string `t`.\n4. If all counts are zero at the end, the strings are anagrams.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (fixed size array of 26)",
            problemStatement: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
            sampleInput: "s = \"anagram\", t = \"nagaram\"",
            sampleOutput: "true",
            constraints: "1 <= s.length, t.length <= 5 * 10^4, s and t consist of lowercase English letters.",
            starterCode: "/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nvar isAnagram = function(s, t) {\n    \n};",
            tags: ["String", "Hash Table", "Sorting"]
        }
    },
    {
        title: "Valid Palindrome",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Check if a string is a palindrome, ignoring non-alphanumeric characters.",
            explanation: "### Valid Palindrome\n\n**Concept:** Two Pointers\n\n**Approach:**\n1. Use two pointers, `left` at the start and `right` at the end.\n2. Skip non-alphanumeric characters by moving pointers inward.\n3. Compare characters at `left` and `right` (convert to lowercase first).\n4. If they don't match, return `false`. Continue until pointers meet.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
            sampleInput: "s = \"A man, a plan, a canal: Panama\"",
            sampleOutput: "true (\"amanaplanacanalpanama\")",
            constraints: "1 <= s.length <= 2 * 10^5, s consists only of printable ASCII characters.",
            starterCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isPalindrome = function(s) {\n    \n};",
            tags: ["String", "Two Pointers"]
        }
    },
    {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the length of the longest substring without repeating characters.",
            explanation: "### Longest Substring Without Repeat\n\n**Concept:** Sliding Window + HashSet\n\n**Approach:**\n1. Use a sliding window defined by two pointers `left` and `right`.\n2. Use a Set to store characters in the current window.\n3. Expand `right`. If `s[right]` is already in the Set, remove characters at `left` from the Set and increment `left` until the duplicate is gone.\n4. Track the maximum `right - left + 1` observed.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(min(m, n)) where m is the size of the character set.",
            problemStatement: "Given a string `s`, find the length of the longest substring without repeating characters.",
            sampleInput: "s = \"abcabcbb\"",
            sampleOutput: "3 (\"abc\")",
            constraints: "0 <= s.length <= 5 * 10^4, s consists of English letters, digits, symbols and spaces.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    \n};",
            tags: ["String", "Hash Table", "Sliding Window"]
        }
    },
    {
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the longest palindromic substring in a given string.",
            explanation: "### Longest Palindromic Substring\n\n**Concept:** Expand Around Center\n\n**Approach:**\n1. A palindrome can be expanded from its center.\n2. Centers can be a single character (odd length: `aba`) or between two characters (even length: `abba`).\n3. For each index `i` in the string, expand as far as possible for both odd and even centers.\n4. Keep track of the maximum length found and the start/end indices.\n\n**Time Complexity:** O(n²)\n**Space Complexity:** O(1)",
            problemStatement: "Given a string `s`, return the longest palindromic substring in `s`.",
            sampleInput: "s = \"babad\"",
            sampleOutput: "\"bab\" (or \"aba\")",
            constraints: "1 <= s.length <= 1000, s consists of only digits and English letters.",
            starterCode: "/**\n * @param {string} s\n * @return {string}\n */\nvar longestPalindrome = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Convert a string to a 32-bit signed integer.",
            explanation: "### String to Integer (atoi)\n\n**Concept:** Simulation + Overflow Handling\n\n**Steps:**\n1. Read in and ignore any leading whitespace.\n2. Check if the next character is '-' or '+'. Read this character in if it is either.\n3. Read next characters until the next non-digit character or the end of the input is reached.\n4. Convert these digits into an integer using multiplication by 10 and addition.\n5. Handle 32-bit integer overflow (clamp to `[-2²¹, 2²¹-1]`).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function).",
            sampleInput: "s = \"   -42\"",
            sampleOutput: "-42",
            constraints: "0 <= s.length <= 200, s consists of English letters, digits, ' ', '+', '-', and '.'.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar myAtoi = function(s) {\n    \n};",
            tags: ["String"]
        }
    },
    {
        title: "Implement strStr()",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Find the index of the first occurrence of needle in haystack.",
            explanation: "### Implement strStr()\n\n**Concepts:** Brute Force / KMP\n\n**Approach:**\n1. **Brute Force:** Compare substrings of size `needle.length` at every index in `haystack`.\n2. **KMP (Optimal):** Precompute a 'failure function' array to avoid redundant comparisons after a partial match fails.\n\n**Time Complexity:** O(n) with KMP, O(n*m) with brute force.\n**Space Complexity:** O(m) with KMP, O(1) with brute force.",
            problemStatement: "Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or -1 if `needle` is not part of `haystack`.",
            sampleInput: "haystack = \"sadbutsad\", needle = \"sad\"",
            sampleOutput: "0",
            constraints: "1 <= haystack.length, needle.length <= 10^4, consist of lowercase English letters.",
            starterCode: "/**\n * @param {string} haystack\n * @param {string} needle\n * @return {number}\n */\nvar strStr = function(haystack, needle) {\n    \n};",
            tags: ["Two Pointers", "String", "String Matching"]
        }
    },
    {
        title: "Group Anagrams",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Group a list of strings into groups of anagrams.",
            explanation: "### Group Anagrams\n\n**Concept:** Sorting OR Frequency Signature\n\n**Approach:**\n1. Use a HashMap to store lists of words.\n2. For each word, generate a 'key'.\n   - Option A: Sort the word alphabetically.\n   - Option B: Count frequencies of characters to create a signature string (e.g., \"a1b2c0...\").\n3. Map words with the same key together in the HashMap and return the values of the map.\n\n**Time Complexity:** O(n * k log k) with sorting, or O(n * k) with frequency count.\n**Space Complexity:** O(n * k)",
            problemStatement: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
            sampleInput: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]",
            sampleOutput: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
            constraints: "1 <= strs.length <= 10^4, 0 <= strs[i].length <= 100, lowercase English letters.",
            starterCode: "/**\n * @param {string[]} strs\n * @return {string[][]}\n */\nvar groupAnagrams = function(strs) {\n    \n};",
            tags: ["Array", "Hash Table", "String", "Sorting"]
        }
    },
    {
        title: "Minimum Window Substring",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the smallest window in a string that contains all characters of another string.",
            explanation: "### Minimum Window Substring\n\n**Concept:** Sliding Window + Frequency Map\n\n**Approach:**\n1. Use two frequency maps: one for the target string `t` and another for the current window in `s`.\n2. Use a `missing` variable to track how many characters still need to be satisfied.\n3. Expand `right`. If `s[right]` is in `t` and we need more of it, decrement `missing`.\n4. While `missing == 0`, shrink from `left`. Update minimum length and start index if a smaller window is found.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(K) where K is character set size.",
            problemStatement: "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string \"\".",
            sampleInput: "s = \"ADOBECODEBANC\", t = \"ABC\"",
            sampleOutput: "\"BANC\"",
            constraints: "m, n <= 10^5",
            starterCode: "/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nvar minWindow = function(s, t) {\n    \n};",
            tags: ["Hash Table", "String", "Sliding Window"]
        }
    },
    {
        title: "Valid Parentheses",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Check if a string of brackets is valid using a stack.",
            explanation: "### Valid Parentheses\n\n**Concept:** Stack\n\n**Approach:**\n1. Use a stack to store opening brackets.\n2. Iterate through the string. If it's an opening bracket `(`, `[`, or `{`, push it onto the stack.\n3. If it's a closing bracket, check if the stack is non-empty and if the top of the stack matches the closing bracket type.\n4. If it matches, pop; otherwise return `false`.\n5. If the stack is empty at the end, the string is valid.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
            sampleInput: "s = \"()[]{}\"",
            sampleOutput: "true",
            constraints: "1 <= s.length <= 10^4, s consists of parentheses only.",
            starterCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};",
            tags: ["String", "Stack"]
        }
    },
    {
        title: "Encode and Decode Strings",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Design an algorithm to encode a list of strings to a string and decode it back.",
            explanation: "### Encode and Decode Strings\n\n**Concept:** Delimiter Encoding\n\n**Approach:**\n1. **Encode:** Join strings using a pattern like `length + \"#\" + string`. Example: `[\"hello\", \"world\"]` -> `\"5#hello5#world\"`.\n2. **Decode:** Find the delimiter `#`. Read the number before it to get the length `L`. Extract the next `L` characters as the original string. Repeat until the end.\n\n**Time Complexity:** O(n) for both operations.\n**Space Complexity:** O(1) (excluding result storage).",
            problemStatement: "Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.",
            sampleInput: "[\"Hello\",\"World\"]",
            sampleOutput: "[\"Hello\",\"World\"]",
            constraints: "0 <= strs.length <= 200, 0 <= strs[i].length <= 200",
            starterCode: "/**\n * @param {string[]} strs\n * @return {string}\n */\nvar encode = function(strs) {\n    \n};\n\n/**\n * @param {string} s\n * @return {string[]}\n */\nvar decode = function(s) {\n    \n};",
            tags: ["Array", "String", "Design"]
        }
    }
];

const seedStringBatch1 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Strings'
        }).distinct('title');

        const filteredQuestions = batch1StringQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 1 String questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Strings',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new String questions (Batch 1).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedStringBatch1();
