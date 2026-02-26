const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch3StringQuestions = [
    {
        title: "Implement KMP (Find Substring Index)",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Efficiently find the first occurrence of a needle in a haystack using the KMP algorithm.",
            explanation: "### KMP (Knuth-Morris-Pratt)\n\n**Concept:** Reuse partial matches using LPS array.\n\n**Key Idea:**\n1. Precompute the LPS (Longest Prefix Suffix) array for the needle. `LPS[i]` stores the length of the longest proper prefix that is also a suffix for the substring `needle[0...i]`.\n2. When a mismatch occurs during the search, use the LPS array to skip unnecessary comparisons instead of restarting from the next character in the haystack.\n\n**Time Complexity:** O(n + m)\n**Space Complexity:** O(m) for the LPS array.",
            problemStatement: "Implement `strStr()` with the Knuth-Morris-Pratt algorithm to find the first index of `needle` in `haystack`.",
            sampleInput: "haystack = \"abcde\", needle = \"cde\"",
            sampleOutput: "2",
            constraints: "1 <= haystack.length, needle.length <= 10^5.",
            starterCode: "/**\n * @param {string} haystack\n * @param {string} needle\n * @return {number}\n */\nvar strStrKMP = function(haystack, needle) {\n    \n};",
            tags: ["String", "String Matching", "KMP"]
        }
    },
    {
        title: "Repeated Substring Pattern",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Check if a string can be constructed by taking a substring of it and appending multiple copies of the substring together.",
            explanation: "### Repeated Substring Pattern\n\n**Concept:** String Trick\n\n**Approach:**\n1. If a string `s` is formed by repeating a substring, then `s + s` will contain `s` at least twice.\n2. By removing the first and last characters of `s + s`, the remaining string will still contain `s` if `s` itself is a repeated pattern.\n3. Implementation: `return (s + s).slice(1, -1).includes(s)`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given a string `s`, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.",
            sampleInput: "s = \"abab\"",
            sampleOutput: "true",
            constraints: "1 <= s.length <= 10^4, lowercase English letters.",
            starterCode: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar repeatedSubstringPattern = function(s) {\n    \n};",
            tags: ["String", "String Matching"]
        }
    },
    {
        title: "String Compression",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Compress an array of characters in-place using the given rules.",
            explanation: "### String Compression\n\n**Concept:** Two Pointers (Read and Write)\n\n**Approach:**\n1. Use a `write` pointer to track where to put compressed characters.\n2. Iterate through the array using a `read` pointer.\n3. For each group of consecutive repeating characters, write the character itself.\n4. If the group size is > 1, convert the count to a string/digits and write each digit.\n5. Return the new length (`write` pointer position).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given an array of characters `chars`, compress it using the following algorithm: Begin with an empty string `s`. For each group of consecutive repeating characters in `chars`, if the group's length is 1, append the character to `s`. Otherwise, append the character followed by the group's length.",
            sampleInput: "chars = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]",
            sampleOutput: "6 ([\"a\",\"2\",\"b\",\"2\",\"c\",\"3\"])",
            constraints: "1 <= chars.length <= 2000.",
            starterCode: "/**\n * @param {character[]} chars\n * @return {number}\n */\nvar compress = function(chars) {\n    \n};",
            tags: ["Two Pointers", "String"]
        }
    },
    {
        title: "Decode String",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Decode an encoded string following specific square bracket rules.",
            explanation: "### Decode String\n\n**Concept:** Stack Simulation\n\n**Approach:**\n1. Use a stack to store the current multiplier and the string built so far.\n2. When you see a digit, build the full number.\n3. When you see `[`, push the current number and current accumulated string onto the stack, and reset them.\n4. When you see `]`, pop the count and previous string. Repeat the current string `count` times and append it to the previous string.\n5. When you see a character, append it to the current accumulated string.\n\n**Time Complexity:** O(maxK * n) where k is the multiplier.\n**Space Complexity:** O(n).",
            problemStatement: "The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.",
            sampleInput: "s = \"3[a2[c]]\"",
            sampleOutput: "\"accaccacc\"",
            constraints: "1 <= s.length <= 30.",
            starterCode: "/**\n * @param {string} s\n * @return {string}\n */\nvar decodeString = function(s) {\n    \n};",
            tags: ["String", "Stack", "Recursion"]
        }
    },
    {
        title: "Palindrome Partitioning",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Partition a string such that every substring of the partition is a palindrome.",
            explanation: "### Palindrome Partitioning\n\n**Concept:** Backtracking\n\n**Approach:**\n1. At each step, try all possible prefixes of the current string.\n2. If a prefix is a palindrome, add it to the current path and recursively process the remainder of the string.\n3. If the entire string is processed (base case), add the current path to the results.\n4. Backtrack by removing the last prefix added.\n\n**Time Complexity:** O(n * 2ⁿ)\n**Space Complexity:** O(n).",
            problemStatement: "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of `s`.",
            sampleInput: "s = \"aab\"",
            sampleOutput: "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
            constraints: "1 <= s.length <= 16, lowercase English letters.",
            starterCode: "/**\n * @param {string} s\n * @return {string[][]}\n */\nvar partition = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming", "Backtracking"]
        }
    },
    {
        title: "Word Break",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Determine if a string can be segmented into a space-separated sequence of one or more dictionary words.",
            explanation: "### Word Break\n\n**Concept:** Dynamic Programming + HashSet\n\n**Approach:**\n1. Use an array `dp` of size `n+1` where `dp[i]` is true if the prefix `s[0...i-1]` can be segmented.\n2. Set `dp[0] = true`.\n3. For each `i` from 1 to `n`, check all `j < i`. If `dp[j]` is true and the substring `s[j...i]` is in the dictionary, set `dp[i] = true` and break inner loop.\n4. Return `dp[n]`.\n\n**Time Complexity:** O(n²)\n**Space Complexity:** O(n).",
            problemStatement: "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
            sampleInput: "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
            sampleOutput: "true",
            constraints: "1 <= s.length <= 300, 1 <= wordDict.length <= 1000.",
            starterCode: "/**\n * @param {string} s\n * @param {string[]} wordDict\n * @return {boolean}\n */\nvar wordBreak = function(s, wordDict) {\n    \n};",
            tags: ["Array", "Hash Table", "String", "Dynamic Programming", "Memoization", "Trie"]
        }
    },
    {
        title: "Word Break II",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Return all possible space-separated sequences of dictionary words that sum up to the target string.",
            explanation: "### Word Break II\n\n**Concept:** Backtracking + Memoization\n\n**Approach:**\n1. Similar to Word Break I, but instead of just checking feasibility, we want to construct all sentences.\n2. Use recursion with a cache (memoization) to store valid sentences for a given suffix.\n3. For the current string, if any prefix is in the dictionary, recursively find all sentences for the remainder and combine them.\n\n**Time Complexity:** O(2ⁿ) in worst case.\n**Space Complexity:** O(2ⁿ).",
            problemStatement: "Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.",
            sampleInput: "s = \"catsanddog\", wordDict = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
            sampleOutput: "[\"cats and dog\",\"cat sand dog\"]",
            constraints: "1 <= s.length <= 20, wordDict.length <= 1000.",
            starterCode: "/**\n * @param {string} s\n * @param {string[]} wordDict\n * @return {string[]}\n */\nvar wordBreak = function(s, wordDict) {\n    \n};",
            tags: ["Hash Table", "String", "Dynamic Programming", "Backtracking", "Memoization", "Trie"]
        }
    },
    {
        title: "Longest Repeating Character Replacement",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the length of the longest substring containing the same letter after at most k replacements.",
            explanation: "### Longest Char Replacement\n\n**Concept:** Sliding Window\n\n**Logic:**\n1. For a window to be valid, `windowSize - maxFreq` must be less than or equal to `k`. (Where `maxFreq` is the frequency of the most common character in that window).\n2. Expand the `right` pointer and update frequency of characters.\n3. Track the global maximum frequency (`maxF`) found in ANY window so far (this is a greedy optimization: we only care about windows that might beat our current record).\n4. If the window becomes invalid (`right - left + 1 - maxF > k`), shrink from `left`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (for alphabet size).",
            problemStatement: "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.",
            sampleInput: "s = \"AABABBA\", k = 1",
            sampleOutput: "4 (\"AABA\" or \"ABBA\")",
            constraints: "1 <= s.length <= 10^5, uppercase English letters, 0 <= k <= s.length.",
            starterCode: "/**\n * @param {string} s\n * @param {number} k\n * @return {number}\n */\nvar characterReplacement = function(s, k) {\n    \n};",
            tags: ["Hash Table", "String", "Sliding Window"]
        }
    },
    {
        title: "Isomorphic Strings",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Determine if two strings are isomorphic (mapping of characters).",
            explanation: "### Isomorphic Strings\n\n**Concept:** Bi-directional Mapping\n\n**Approach:**\n1. Two strings are isomorphic if characters in `s` can be replaced to get `t` while preserving character positions.\n2. Use two HashMaps to store mappings: `s2t` and `t2s`.\n3. Iterate simultaneously through `s` and `t`. If a character `s[i]` is already mapped to something other than `t[i]`, OR `t[i]` is already mapped to something other than `s[i]`, return `false`.\n4. Otherwise, establish the mapping and continue.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(k) where k is character set size.",
            problemStatement: "Given two strings `s` and `t`, determine if they are isomorphic.",
            sampleInput: "s = \"egg\", t = \"add\"",
            sampleOutput: "true",
            constraints: "1 <= s.length <= 5 * 10^4, t.length == s.length.",
            starterCode: "/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nvar isIsomorphic = function(s, t) {\n    \n};",
            tags: ["Hash Table", "String"]
        }
    },
    {
        title: "Check if Two Strings Are Close",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Determine if two strings are considered 'close' based on given swap and transform operations.",
            explanation: "### Close Strings\n\n**Concept:** Frequency + Set Comparison\n\n**Conditions for closeness:**\n1. Both strings must have the same length.\n2. Both strings must contain the same unique characters (same character set).\n3. The multi-set of frequencies must be the same (e.g., if one has frequencies 2, 3, 1, the other must also have frequencies 1, 2, 3 in some order).\n\n**Time Complexity:** O(n log n) (due to frequency sorting) or O(n) (since alphabet size is fixed).\n**Space Complexity:** O(1) (fixed size frequency arrays/sets).",
            problemStatement: "Two strings are considered close if you can attain one from the other using two operations: Swap any two existing characters, or Transform every occurrence of one existing character into another existing character, and do the same with the other character.",
            sampleInput: "word1 = \"cabbba\", word2 = \"abbccc\"",
            sampleOutput: "true",
            constraints: "1 <= word1.length, word2.length <= 10^5, lowercase English letters.",
            starterCode: "/**\n * @param {string} word1\n * @param {string} word2\n * @return {boolean}\n */\nvar closeStrings = function(word1, word2) {\n    \n};",
            tags: ["Hash Table", "String", "Sorting", "Counting"]
        }
    }
];

const seedStringBatch3 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Strings'
        }).distinct('title');

        const filteredQuestions = batch3StringQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 3 String questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Strings',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new String questions (Batch 3).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedStringBatch3();
