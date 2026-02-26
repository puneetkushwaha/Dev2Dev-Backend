const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch7StringQuestions = [
    {
        title: "Valid Palindrome II",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Check if a string can be a palindrome after deleting at most one character.",
            explanation: "### Valid Palindrome II\n\n**Concept:** Two Pointers\n\n**Approach:**\n1. Use two pointers, `left = 0` and `right = s.length - 1`.\n2. While `left < right`, if `s[left] == s[right]`, move both inwards.\n3. If a mismatch occurs at `(left, right)`, user has one 'delete' chance. \n4. Check if the remaining substring becomes a palindrome by either skipping `left` (`s[left+1...right]`) OR skipping `right` (`s[left...right-1]`).\n5. If either is true, the original string is valid.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given a string `s`, return `true` if the `s` can be palindrome after deleting **at most one** character from it.",
            sampleInput: "s = \"abca\"",
            sampleOutput: "true (Delete 'c' to get 'aba')",
            constraints: "1 <= s.length <= 10^5, lowercase English letters.",
            starterCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar validPalindrome = function(s) {\n    \n};",
            tags: ["Two Pointers", "String", "Greedy"]
        }
    },
    {
        title: "Longest Happy Prefix",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the longest prefix that is also a suffix (excluding the string itself).",
            explanation: "### Longest Happy Prefix\n\n**Concept:** KMP (LPS Array) / Rolling Hash\n\n**Approach:**\n1. This is exactly what the `LPS` (Longest Prefix Suffix) array in the KMP algorithm computes for the entire string.\n2. Compute the LPS value for the last index of the string.\n3. The value `LPS[n-1]` gives the length of the longest happy prefix.\n4. Return the substring of that length.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) (for LPS array).",
            problemStatement: "A string is called a **happy prefix** if it is a non-empty prefix which is also a suffix (excluding itself).\nGiven a string `s`, return the longest happy prefix of `s`. Return an empty string \"\" if no such prefix exists.",
            sampleInput: "s = \"level\"",
            sampleOutput: "\"l\"",
            constraints: "1 <= s.length <= 10^5, lowercase English letters.",
            starterCode: "/**\n * @param {string} s\n * @return {string}\n */\nvar longestPrefix = function(s) {\n    \n};",
            tags: ["String", "Rolling Hash", "String Matching", "Hash Function"]
        }
    },
    {
        title: "Minimum Deletions to Make String Balanced",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find minimum deletions to ensure all 'a's appear before all 'b's.",
            explanation: "### Minimum Deletions for Balance\n\n**Concept:** DP / Stack / Prefix Counting\n\n**Intuition:**\nWe want to avoid the pattern \"...b...a...\".\n\n**Approach:**\n1. Iterate through the string, keeping track of the number of 'b's encountered.\n2. When an 'a' is seen, if we already have 'b's, we have two choices:\n   - Delete the current 'a' (1 operation).\n   - Delete one of the previous 'b's (essentially 'resolving' a conflict).\n3. Maintain `minDeletions = min(prev_minDeletions + 1, countB)`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "You are given a string `s` consisting only of characters 'a' and 'b'​​​​. You can delete any number of characters in `s` to make `s` balanced. `s` is balanced if there is no pair of indices `(i,j)` such that `i < j` and `s[i] = 'b'` and `s[j] = 'a'`. Return the minimum number of deletions needed.",
            sampleInput: "s = \"aababbab\"",
            sampleOutput: "2 (Delete 'b' at index 2 and 'a' at index 6)",
            constraints: "1 <= s.length <= 10^5.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar minimumDeletions = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming", "Stack"]
        }
    },
    {
        title: "Orderly Queue",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the lexicographically smallest string possible after repeated move-to-back operations.",
            explanation: "### Orderly Queue\n\n**Concept:** Observation / Mathematical Insight\n\n**Logic:**\n1. **Case 1 (k = 1):** We can only perform cyclic shifts. There are `n` possible strings. Compare all `n` shifts and pick the smallest.\n2. **Case 2 (k > 1):** With `k >= 2`, we can effectively perform a bubble sort by moving any two adjacent characters. This means we can achieve ANY permutation of the string.\n3. The smallest permutation is simply the sorted string.\n\n**Time Complexity:** O(n²) for k=1, O(n log n) for k > 1.\n**Space Complexity:** O(n).",
            problemStatement: "You are given a string `s` and an integer `k`. You can choose one of the first `k` letters of `s` and append it to the end of the string. Return the lexicographically smallest string you could have after any number of moves.",
            sampleInput: "s = \"baaca\", k = 3",
            sampleOutput: "\"aaabc\"",
            constraints: "1 <= k <= s.length <= 1000.",
            starterCode: "/**\n * @param {string} s\n * @param {number} k\n * @return {string}\n */\nvar orderlyQueue = function(s, k) {\n    \n};",
            tags: ["Math", "String", "Sorting"]
        }
    },
    {
        title: "Swap Adjacent in LR String",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Check if one string can be transformed into another using specific L/R movement rules.",
            explanation: "### Swap Adjacent (LR String)\n\n**Concept:** Invariants and Two Pointers\n\n**Rules:**\n- `XL` -> `LX` (L can move left through X)\n- `RX` -> `XR` (R can move right through X)\n\n**Invariants:**\n1. If we ignore 'X', the sequence of 'L' and 'R' must be identical in both strings.\n2. An 'L' in `start` can only move left, so its index in `start` must be `>=` its index in `end`.\n3. An 'R' in `start` can only move right, so its index in `start` must be `<=` its index in `end`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "In a string composed of 'L', 'R', and 'X' characters, a move consists of replacing one occurrence of \"XL\" with \"LX\", or replacing one occurrence of \"RX\" with \"XR\". Given `start` and `end`, return `true` if it is possible to transform `start` to `end`.",
            sampleInput: "start = \"RXXLRXRXL\", end = \"XRLXXRRLX\"",
            sampleOutput: "true",
            constraints: "1 <= start.length <= 10^4, start.length == end.length.",
            starterCode: "/**\n * @param {string} start\n * @param {string} end\n * @return {boolean}\n */\nvar canTransform = function(start, end) {\n    \n};",
            tags: ["Two Pointers", "String"]
        }
    },
    {
        title: "Palindrome Pairs",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find all pairs of unique indices (i, j) such that the concatenation of words[i] and words[j] is a palindrome.",
            explanation: "### Palindrome Pairs\n\n**Concept:** Hashing / Trie + Substring Checking\n\n**Approach:**\n1. Store all words in a HashMap (word -> index).\n2. For each word, split it into two parts `(prefix, suffix)` at every possible position.\n3. **Case 1:** If `prefix` is a palindrome, and the reverse of `suffix` exists in the map as another word, then `reversed(suffix) + word` is a palindrome.\n4. **Case 2:** If `suffix` is a palindrome, and the reverse of `prefix` exists in the map, then `word + reversed(prefix)` is a palindrome.\n\n**Time Complexity:** O(n * k²) where k is the max word length.\n**Space Complexity:** O(n * k).",
            problemStatement: "Given a list of unique words, return all the pairs of the distinct indices `(i, j)` in the given list, so that the concatenation of the two words `words[i] + words[j]` is a palindrome.",
            sampleInput: "words = [\"abcd\",\"dcba\",\"lls\",\"s\",\"sssll\"]",
            sampleOutput: "[[0,1],[1,0],[3,2],[2,4]]",
            constraints: "1 <= words.length <= 5000, 0 <= words[i].length <= 300.",
            starterCode: "/**\n * @param {string[]} words\n * @return {number[][]}\n */\nvar palindromePairs = function(words) {\n    \n};",
            tags: ["Array", "Hash Table", "String", "Trie"]
        }
    },
    {
        title: "Basic Calculator II",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Evaluate a mathematical expression string containing non-negative integers and basic operators (+, -, *, /).",
            explanation: "### Basic Calculator II\n\n**Concept:** Stack / Simulation with Precedence\n\n**Approach:**\n1. Use a stack to store values. Standard multiplication and division have higher precedence, so they should be evaluated immediately.\n2. Iterate through the string. Maintain the current number being read and the `lastOperator` (initially '+').\n3. When an operator or the end of the string is reached:\n   - If `+`: push `num` to stack.\n   - If `-`: push `-num` to stack.\n   - If `*`: pop from stack, multiply with `num`, and push back.\n   - If `/`: pop from stack, divide by `num` (truncate toward zero), and push back.\n4. Sum all values in the stack at the end.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given a string `s` which represents an expression, evaluate this expression and return its value. The integer division should truncate toward zero.",
            sampleInput: "s = \" 3+2*2 \"",
            sampleOutput: "7",
            constraints: "1 <= s.length <= 3 * 10^5, non-negative integers, +, -, *, /.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar calculate = function(s) {\n    \n};",
            tags: ["Math", "String", "Stack"]
        }
    },
    {
        title: "Reverse Substrings Between Each Pair of Parentheses",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Reverse substrings inside parentheses, starting from the innermost pair.",
            explanation: "### Reverse Parentheses\n\n**Concept:** Stack / Simulation\n\n**Approach:**\n1. Use a stack to track the characters built so far.\n2. When an opening bracket `(` is seen, it marks the start of a nested group.\n3. When a closing bracket `)` is seen, pop characters from the stack until the matching `(` is found, reverse them, and push them back onto the stack.\n4. Final result is the joined characters in the stack.\n\n**Optimization (Wormhole Trick):** O(n) approach using paired bracket indices to 'jump' and change direction.\n\n**Time Complexity:** O(n²) with simple stack, O(n) with Wormhole trick.\n**Space Complexity:** O(n).",
            problemStatement: "You are given a string `s` that consists of lower case English letters and brackets. Reverse the strings in each pair of matching parentheses, starting from the innermost one. Your result should not contain any brackets.",
            sampleInput: "s = \"(u(love)i)\"",
            sampleOutput: "\"iloveu\"",
            constraints: "1 <= s.length <= 2000.",
            starterCode: "/**\n * @param {string} s\n * @return {string}\n */\nvar reverseParentheses = function(s) {\n    \n};",
            tags: ["String", "Stack"]
        }
    },
    {
        title: "Find the Longest Substring Containing Vowels in Even Counts",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the length of the longest substring where every vowel (a, e, i, o, u) appears an even number of times.",
            explanation: "### Longest Substring with Even Vowels\n\n**Concept:** Bitmask + Prefix Hash\n\n**Logic:**\n1. We only care whether vowel counts are odd or even (0 or 1). This can be represented by a 5-bit mask (one bit for each vowel).\n2. Initial state: `mask = 00000`.\n3. Iterate through `s`. If `s[i]` is a vowel, flip its corresponding bit in the mask (`mask ^= (1 << vowel_index)`).\n4. A substring between `i` and `j` has even vowels if the mask at `i` is identical to the mask at `j`.\n5. Store the first occurrence of each mask in a HashMap. If a mask repeats, calculate the distance.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (Only 32 possible masks).",
            problemStatement: "Given the string `s`, return the size of the longest substring where each vowel ('a', 'e', 'i', 'o', 'u') appears an even number of times.",
            sampleInput: "s = \"eleetminicoworoep\"",
            sampleOutput: "13 (\"leetminicowor\")",
            constraints: "1 <= s.length <= 5 * 10^5.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar findTheLongestSubstring = function(s) {\n    \n};",
            tags: ["Hash Table", "String", "Bit Manipulation", "Prefix Sum"]
        }
    },
    {
        title: "Shortest Palindrome",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the shortest palindrome by adding characters at the front of a string.",
            explanation: "### Shortest Palindrome\n\n**Concept:** KMP (LPS) / Hashing\n\n**Intuition:**\nWe need to find the longest prefix of `s` that is already a palindrome. Let this length be `L`. The remaining `n-L` characters at the end of `s` must be reversed and prepended to the front.\n\n**Approach:**\n1. Create a combined string `T = s + \"#\" + reverse(s)`.\n2. Compute the LPS array for `T`.\n3. The value `LPS[T.length - 1]` tells us the longest prefix of `s` that matches the suffix of `reverse(s)`, which is exactly the longest palindromic prefix.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "You are given a string `s`. You can convert `s` to a palindrome by adding characters in front of it. Find and return the shortest palindrome you can find by performing this transformation.",
            sampleInput: "s = \"aacecaaa\"",
            sampleOutput: "\"aaacecaaa\"",
            constraints: "0 <= s.length <= 5 * 10^4.",
            starterCode: "/**\n * @param {string} s\n * @return {string}\n */\nvar shortestPalindrome = function(s) {\n    \n};",
            tags: ["String", "Rolling Hash", "String Matching", "Hash Function"]
        }
    }
];

const seedStringBatch7 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Strings'
        }).distinct('title');

        const filteredQuestions = batch7StringQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 7 String questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Strings',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new String questions (Batch 7 - AI Gen).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedStringBatch7();
