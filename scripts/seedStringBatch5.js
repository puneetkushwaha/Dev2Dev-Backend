const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch5StringQuestions = [
    {
        title: "Longest Common Subsequence (LCS)",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the length of the longest subsequence common to two strings.",
            explanation: "### Longest Common Subsequence (LCS)\n\n**Concept:** Dynamic Programming (2D)\n\n**Intuition:**\nAt any pair of indices `(i, j)`:\n- If characters match (`text1[i-1] == text2[j-1]`): Include this character in LCS: `1 + dp[i-1][j-1]`.\n- Else: The LCS must be the maximum of either matching `text1[0...i-2]` with `text2[0...j-1]` OR matching `text1[0...i-1]` with `text2[0...j-2]`.\n\n**DP State:** `dp[i][j]` = length of LCS of prefix `text1[0...i-1]` and `text2[0...j-1]`.\n\n**Time Complexity:** O(n × m)\n**Space Complexity:** O(n × m)",
            problemStatement: "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
            sampleInput: "text1 = \"abcde\", text2 = \"ace\"",
            sampleOutput: "3 (\"ace\")",
            constraints: "1 <= text1.length, text2.length <= 1000, lowercase English letters.",
            starterCode: "/**\n * @param {string} text1\n * @param {string} text2\n * @return {number}\n */\nvar longestCommonSubsequence = function(text1, text2) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Longest Common Substring",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the length of the longest contiguous substring common to two strings.",
            explanation: "### Longest Common Substring\n\n**Difference from LCS:** Substring must be contiguous, while subsequence can skip characters.\n\n**DP State:** `dp[i][j]` = length of common substring ending exactly at index `i` of `s1` and index `j` of `s2`.\n\n**Transition:**\n- If characters match: `dp[i][j] = 1 + dp[i-1][j-1]`.\n- Else: `dp[i][j] = 0` (continuity is broken).\n- Track the global maximum during the process.\n\n**Time Complexity:** O(n × m)\n**Space Complexity:** O(n × m)",
            problemStatement: "Given two strings `s1` and `s2`, find the length of the longest common substring between them.",
            sampleInput: "s1 = \"abcde\", s2 = \"abfce\"",
            sampleOutput: "2 (\"ab\")",
            constraints: "1 <= s1.length, s2.length <= 1000.",
            starterCode: "/**\n * @param {string} s1\n * @param {string} s2\n * @return {number}\n */\nvar longestCommonSubstring = function(s1, s2) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Interleaving String",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Check if a string is formed by interleaving two other strings.",
            explanation: "### Interleaving String\n\n**Concept:** Dynamic Programming (2D)\n\n**Intuition:**\nAt index `(i, j)` in the DP table, we check if `s1[0...i-1]` and `s2[0...j-1]` can interleave to form `s3[0...i+j-1]`.\n\n**Transition:**\n- `dp[i][j]` is true if:\n  - `(s1[i-1] == s3[i+j-1] AND dp[i-1][j])` (we just took a character from s1)\n  - OR `(s2[j-1] == s3[i+j-1] AND dp[i][j-1])` (we just took a character from s2)\n\n**Time Complexity:** O(n × m)\n**Space Complexity:** O(n × m)",
            problemStatement: "Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an interleaving of `s1` and `s2`.",
            sampleInput: "s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"",
            sampleOutput: "true",
            constraints: "0 <= s1.length, s2.length <= 100, 0 <= s3.length <= 200.",
            starterCode: "/**\n * @param {string} s1\n * @param {string} s2\n * @param {string} s3\n * @return {boolean}\n */\nvar isInterleave = function(s1, s2, s3) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Regular Expression Matching",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Implement regex matching with support for '.' and '*'.",
            explanation: "### Regular Expression Matching\n\n**Concept:** Dynamic Programming (Hard)\n\n**Intuition:**\n- `.` matches any single character.\n- `*` matches zero or more of the PRECEDING element.\n\n**Transition for `p[j-1] == '*' `:**\n1. zero occurrences of `p[j-2]`: `dp[i][j] = dp[i][j-2]`.\n2. one or more occurrences (if `s[i-1]` matches `p[j-2]`): `dp[i][j] = dp[i-1][j]`.\n\n**Time Complexity:** O(n × m)\n**Space Complexity:** O(n × m)",
            problemStatement: "Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'`. `'.'` matches any single character. `'*'` matches zero or more of the preceding element.",
            sampleInput: "s = \"aa\", p = \"a*\"",
            sampleOutput: "true",
            constraints: "1 <= s.length <= 20, 1 <= p.length <= 20.",
            starterCode: "/**\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatch = function(s, p) {\n    \n};",
            tags: ["String", "Dynamic Programming", "Recursion"]
        }
    },
    {
        title: "Wildcard Matching",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Implement wildcard pattern matching with support for '?' and '*'.",
            explanation: "### Wildcard Matching\n\n**Concept:** Dynamic Programming (Hard)\n\n**Intuition:**\n- `?` matches any single character.\n- `*` matches any sequence of characters (including empty).\n\n**Transition for `p[j-1] == '*' `:**\n1. `*` matches empty: `dp[i][j] = dp[i][j-1]`.\n2. `*` consumes one or more chars from `s`: `dp[i][j] = dp[i-1][j]`.\n\n**Time Complexity:** O(n × m)\n**Space Complexity:** O(n × m)",
            problemStatement: "Given an input string `s` and a pattern `p`, implement wildcard pattern matching with support for `'?'` and `'*'`. `'?'` matches any single character. `'*'` matches any sequence of characters (including the empty sequence).",
            sampleInput: "s = \"aa\", p = \"*\"",
            sampleOutput: "true",
            constraints: "0 <= s.length, p.length <= 2000.",
            starterCode: "/**\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatchWildcard = function(s, p) {\n    \n};",
            tags: ["String", "Dynamic Programming", "Greedy", "Recursion"]
        }
    },
    {
        title: "Palindromic Substrings",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Count the number of palindromic substrings in a string.",
            explanation: "### Palindromic Substrings\n\n**Concept:** Expand Around Center\n\n**Intuition:**\nEvery character (and the space between every two characters) can be the center of a palindrome.\n- Iterate through each index `i`.\n- Expand as a center for odd-length palindromes (`i, i`).\n- Expand as a center for even-length palindromes (`i, i+1`).\n- Count how many valid palindromes you can form while expanding.\n\n**Time Complexity:** O(n²)\n**Space Complexity:** O(1)",
            problemStatement: "Given a string `s`, return the number of palindromic substrings in it.",
            sampleInput: "s = \"aaa\"",
            sampleOutput: "6 (\"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\")",
            constraints: "1 <= s.length <= 1000.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar countSubstrings = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Longest Palindrome by Concatenating Two-Letter Words",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the length of the longest palindrome that can be formed by concatenating given two-letter words.",
            explanation: "### Longest Palindrome Pairs\n\n**Concept:** HashMap Pairing\n\n**Logic:**\n1. Use a HashMap to count frequencies of each 2-letter word.\n2. For each word like \"ab\", if \"ba\" exists, they form a symmetric pair (length +4). Decrement counts.\n3. For symmetric words like \"aa\", if frequency >= 2, they form a pair (length +4). Decrement count.\n4. If any symmetric word has a remaining count of 1, it can go in the center (length +2). Only one such center can be used.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(min(n, 26²))",
            problemStatement: "You are given an array of strings `words`. Each element of `words` consists of two lowercase English letters. Create the longest possible palindrome by selecting some elements from `words` and concatenating them in any order. Each element can be used at most once.",
            sampleInput: "words = [\"lc\",\"cl\",\"gg\"]",
            sampleOutput: "6 (\"lc\" + \"gg\" + \"cl\")",
            constraints: "1 <= words.length <= 10^5.",
            starterCode: "/**\n * @param {string[]} words\n * @return {number}\n */\nvar longestPalindrome = function(words) {\n    \n};",
            tags: ["Array", "Hash Table", "String", "Greedy", "Counting"]
        }
    },
    {
        title: "Minimum Insertions to Make String Palindrome",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the minimum number of insertions to make a string a palindrome.",
            explanation: "### Min Insertions to Palindrome\n\n**Key Insight:**\n`Answer = Total Length - Longest Palindromic Subsequence`.\nThe characters already forming a palindromic subsequence don't need additions; every other character needs a corresponding mirror insertion.\n\n**Time Complexity:** O(n²)\n**Space Complexity:** O(n²)",
            problemStatement: "Given a string `s`, return the minimum number of steps to make `s` palindrome in one step you can insert any character at any index of the string.",
            sampleInput: "s = \"mbadm\"",
            sampleOutput: "2 (\"mbdadbm\")",
            constraints: "1 <= s.length <= 500.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar minInsertions = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Partition Labels",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Partition a string so each letter appears in at most one part.",
            explanation: "### Partition Labels\n\n**Concept:** Greedy\n\n**Approach:**\n1. Record the `lastIndex` of each character in the string.\n2. Iterate through the string. Maintain a `maxIndexSeen` for the current partition.\n3. `maxIndexSeen = Math.max(maxIndexSeen, lastIndex[s[i]])`.\n4. If the current index `i` equals `maxIndexSeen`, it means all characters in the current part won't appear later. Close the partition.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (for alphabet size).",
            problemStatement: "You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.",
            sampleInput: "s = \"ababcbacadefegdehijhklij\"",
            sampleOutput: "[9,7,8]",
            constraints: "1 <= s.length <= 500.",
            starterCode: "/**\n * @param {string} s\n * @return {number[]}\n */\nvar partitionLabels = function(s) {\n    \n};",
            tags: ["Hash Table", "Two Pointers", "String", "Greedy"]
        }
    },
    {
        title: "Remove Duplicate Letters",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Remove duplicate letters so that every letter appears once and the result is the smallest in lexicographical order.",
            explanation: "### Remove Duplicate Letters\n\n**Concept:** Monotonic Stack + Greedy\n\n**Logic:**\n1. Record the `lastOccurrence` index of each character.\n2. Use a stack and a `seen` set to build the result.\n3. For each char, if not already in result:\n   - While the stack is not empty, `chars[i] < stack.top()`, and the `stack.top()` appears again later in the string:\n     - Pop from stack and remove from `seen`.\n   - Push `chars[i]` and add to `seen`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (alphabet size).",
            problemStatement: "Given a string `s`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.",
            sampleInput: "s = \"bcabc\"",
            sampleOutput: "\"abc\"",
            constraints: "1 <= s.length <= 10^4.",
            starterCode: "/**\n * @param {string} s\n * @return {string}\n */\nvar removeDuplicateLetters = function(s) {\n    \n};",
            tags: ["String", "Stack", "Greedy", "Monotonic Stack"]
        }
    }
];

const seedStringBatch5 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Strings'
        }).distinct('title');

        const filteredQuestions = batch5StringQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 5 String questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Strings',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new String questions (Batch 5).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedStringBatch5();
