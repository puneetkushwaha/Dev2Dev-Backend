const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch4StringQuestions = [
    {
        title: "Edit Distance (Levenshtein Distance)",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the minimum number of operations to convert one string into another.",
            explanation: "### Edit Distance\n\n**Concept:** Dynamic Programming (2D)\n\n**Intuition:**\nCompare characters character by character. At any position `(i, j)`:\n- If `chars` same: No operation needed (`dp[i][j] = dp[i-1][j-1]`).\n- If `chars` different: Choice of **Insert**, **Delete**, or **Replace**. Take `1 + min(choices)`.\n\n**DP State:** `dp[i][j]` = min operations to convert first `i` chars of `word1` to first `j` chars of `word2`.\n\n**Time Complexity:** O(n × m)\n**Space Complexity:** O(n × m)",
            problemStatement: "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character",
            sampleInput: "word1 = \"horse\", word2 = \"ros\"",
            sampleOutput: "3 (\"horse\" -> \"rorse\" -> \"rose\" -> \"ros\")",
            constraints: "0 <= word1.length, word2.length <= 500, strings consist of lowercase English letters.",
            starterCode: "/**\n * @param {string} word1\n * @param {string} word2\n * @return {number}\n */\nvar minDistance = function(word1, word2) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Distinct Subsequences",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Count how many distinct subsequences of s equal t.",
            explanation: "### Distinct Subsequences\n\n**Concept:** DP counting\n\n**Intuition:**\nFor each character, we can either use it (if it matches) or skip it.\n- If `s[i] == t[j]`: We can match them (`dp[i-1][j-1]`) OR skip the current `s[0...i]` character and try to form `t` using fewer chars of `s` (`dp[i-1][j]`).\n- Else: We must skip the current `s` character.\n\n**DP State:** `dp[i][j]` = number of ways first `i` chars of `s` form first `j` chars of `t`.\n\n**Time Complexity:** O(n × m)\n**Space Complexity:** O(n × m)",
            problemStatement: "Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.",
            sampleInput: "s = \"rabbbit\", t = \"rabbit\"",
            sampleOutput: "3",
            constraints: "1 <= s.length, t.length <= 1000, lowercase English letters.",
            starterCode: "/**\n * @param {string} s\n * @param {string} t\n * @return {number}\n */\nvar numDistinct = function(s, t) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Rabin-Karp (Rolling Hash Pattern Search)",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find an occurrence of a pattern in a string efficiently using hashing.",
            explanation: "### Rabin-Karp\n\n**Concept:** Rolling Hash\n\n**Intuition:**\nInstead of comparing characters repeatedly, convert the substring into a numeric hash. As the window slides, update the hash in O(1) time.\n`newHash = (oldHash - leftChar * power) * base + newChar`.\nIf hashes match, verify the actual string to handle collisions.\n\n**Time Complexity:** Average O(n + m), Worst O(nm)\n**Space Complexity:** O(1)",
            problemStatement: "Implement an algorithm to find the first occurrence of `pattern` in `text` using the Rabin-Karp rolling hash technique.",
            sampleInput: "text = \"abcabcbb\", pattern = \"abc\"",
            sampleOutput: "0",
            constraints: "Length up to 10^5.",
            starterCode: "/**\n * @param {string} text\n * @param {string} pattern\n * @return {number}\n */\nvar rabinKarp = function(text, pattern) {\n    \n};",
            tags: ["String", "Rolling Hash", "String Matching"]
        }
    },
    {
        title: "Longest Palindromic Subsequence",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the length of the longest palindromic subsequence in a string.",
            explanation: "### Longest Palindromic Subsequence\n\n**Concept:** DP interval\n\n**Intuition:**\n- If `s[i] == s[j]`: Include both (`2 + dp[i+1][j-1]`).\n- Else: Skip one side and take the max (`max(dp[i+1][j], dp[i][j-1])`).\n\n**DP State:** `dp[i][j]` = longest palindrome in substring `i...j`.\n\n**Time Complexity:** O(n²)\n**Space Complexity:** O(n²)",
            problemStatement: "Given a string `s`, find the longest palindromic subsequence's length in `s`.",
            sampleInput: "s = \"bbbab\"",
            sampleOutput: "4 (\"bbbb\")",
            constraints: "1 <= s.length <= 1000, lowercase English letters.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar longestPalindromeSubseq = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Count and Say",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Generate the nth term in the count-and-say sequence.",
            explanation: "### Count and Say\n\n**Concept:** Simulation\n\n**Approach:**\nTo generate the sequence for `n`, read the sequence for `n-1` and describe what you see.\nExample: \"21\" is read as \"one 2, one 1\" -> \"1211\".\nIterate through the string, count consecutive characters, and append `count + character` to the builder.\n\n**Time Complexity:** O(n × lengthOfStrings)\n**Space Complexity:** O(lengthOfStrings)",
            problemStatement: "The **count-and-say** sequence is a sequence of digit strings where each string is the description of the previous one.\n\nTo determine how you \"say\" a digit string, split it into the **minimal** number of groups so that each group is a contiguous section all of the **same character**. Then for each group, say the number of characters, then say the character.\n\nGiven a positive integer `n`, return the `n`th term of the count-and-say sequence.",
            sampleInput: "n = 4",
            sampleOutput: "\"1211\" (1 -> 11 -> 21 -> 1211)",
            constraints: "1 <= n <= 30",
            starterCode: "/**\n * @param {number} n\n * @return {string}\n */\nvar countAndSay = function(n) {\n    \n};",
            tags: ["String"]
        }
    }
];

const seedStringBatch4 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Strings'
        }).distinct('title');

        const filteredQuestions = batch4StringQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 4 String questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Strings',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new String questions (Batch 4).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedStringBatch4();
