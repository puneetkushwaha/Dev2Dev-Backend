const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch5DPQuestions = [
    {
        title: "Distinct Subsequences",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Count the number of ways s can be transformed into t by deleting characters.",
            explanation: "### String Subsequence Counting\n\n**Concept:** 2D DP (Character Matching)\n\n**Logic:**\n`dp[i][j]` = number of ways `t[0...i-1]` appears as a subsequence in `s[0...j-1]`.\n\n**Transitions:**\n1. If `t[i-1] == s[j-1]`:\n   - We can either use this matching character: `dp[i-1][j-1]`\n   - Or skip this character in `s`: `dp[i][j-1]`\n   - `dp[i][j] = dp[i-1][j-1] + dp[i][j-1]`.\n2. If not equal:\n   - We MUST skip `s[j-1]`: `dp[i][j] = dp[i][j-1]`.\n\n**Time Complexity:** O(M * N)\n**Space Complexity:** O(N) optimized.",
            problemStatement: "Given two strings `s` and `t`, return the number of distinct **subsequences** of `s` which equals `t`.",
            sampleInput: "s = \"rabbbit\", t = \"rabbit\"",
            sampleOutput: "3",
            constraints: "s.length, t.length <= 1000.",
            starterCode: "/**\n * @param {string} s\n * @param {string} t\n * @return {number}\n */\nvar numDistinct = function(s, t) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Regular Expression Matching",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Implement regular expression matching with support for '.' and '*'.",
            explanation: "### Regex DP\n\n**Concept:** 2D Boolean DP (Pattern Matching)\n\n**Logic:**\n`dp[i][j]` is true if `s[i:]` matches `p[j:]`.\n\n**Transitions for '*':**\nIf `p[j+1] == '*'`, we have two choices:\n1. **Zero occurrences:** `dp[i][j+2]`\n2. **One/More occurrences:** If `s[i]` matches `p[j]`, then `dp[i+1][j]`.\n\n**Time Complexity:** O(M * N)\n**Space Complexity:** O(M * N).",
            problemStatement: "Given an input string `s` and a pattern `p`, implement regular expression matching with support for '.' and '*' where: '.' Matches any single character. '*' Matches zero or more of the preceding element.",
            sampleInput: "s = \"aa\", p = \"a*\"",
            sampleOutput: "true",
            constraints: "s.length <= 20, p.length <= 30.",
            starterCode: "/**\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatch = function(s, p) {\n    \n};",
            tags: ["String", "Dynamic Programming", "Recursion"]
        }
    },
    {
        title: "Dungeon Game",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the knight's minimum initial health to reach the bottom-right princess.",
            explanation: "### Reverse DP on Grid\n\n**Concept:** Backward induction (Minimizing required resource)\n\n**Logic:**\nStandard forward DP is hard because we don't know the health needed *later*. If we start from the princess and go backwards, we can calculate the exact health needed to *reach* the end.\n\n**Transitions:**\n- `need[i][j] = max(1, min(need[i+1][j], need[i][j+1]) - dungeon[i][j])`.\n- Base case: `need[m-1][n-1] = max(1, 1 - dungeon[m-1][n-1])`.\n\n**Time Complexity:** O(M * N)\n**Space Complexity:** O(N).",
            problemStatement: "The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon. Find the knight's minimum initial health so that he can rescue the princess.",
            sampleInput: "dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]",
            sampleOutput: "7",
            constraints: "m, n <= 200.",
            starterCode: "/**\n * @param {number[][]} dungeon\n * @return {number}\n */\nvar calculateMinimumHP = function(dungeon) {\n    \n};",
            tags: ["Array", "Dynamic Programming", "Matrix"]
        }
    },
    {
        title: "Knight Probability in Chessboard",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the probability that a knight remains on the chessboard after k moves.",
            explanation: "### Probability DP\n\n**Concept:** 3D DP (Space x Time)\n\n**Logic:**\n`dp[k][r][c]` = probability knight is at `(r, c)` exactly after `k` moves.\n\n**Transitions:**\n- `dp[k][r][c] = Sum over neighbors (dp[k-1][prevR][prevC] * 1/8)`.\n- Base case: `dp[0][startR][startC] = 1.0`.\n- Total probability = Sum of all `dp[K][r][c]` over the entire board.\n\n**Time Complexity:** O(K * N²)\n**Space Complexity:** O(N²).",
            problemStatement: "On an `n x n` chessboard, a knight starts at `(row, column)` and attempts to make `k` moves. If it moves out of board, it stops. Return the probability that the knight remains on the board after making exactly `k` moves.",
            sampleInput: "n = 3, k = 2, row = 0, column = 0",
            sampleOutput: "0.0625",
            constraints: "n <= 25, k <= 100.",
            starterCode: "/**\n * @param {number} n\n * @param {number} k\n * @param {number} row\n * @param {number} column\n * @return {number}\n */\nvar knightProbability = function(n, k, row, column) {\n    \n};",
            tags: ["Dynamic Programming"]
        }
    },
    {
        title: "Numbers At Most N Given Digit Set",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Count positive integers less than or equal to n that can be written using digits from a given set.",
            explanation: "### Digit DP\n\n**Concept:** Positional Counting\n\n**Logic:**\n1. Count numbers with fewer digits than `n`: `Sum over len (digits.length ^ len)`.\n2. Count numbers with same length as `n` using positional placement:\n   - For each position `i` in `n`:\n     - Iterate through `digits` smaller than `n[i]`. These can fill all remaining slots freely.\n     - If `n[i]` is in `digits`, continue to next position.\n     - If `n[i]` is not in `digits`, stop counting.\n\n**Time Complexity:** O(log N)\n**Space Complexity:** O(log N).",
            problemStatement: "Given an array of `digits` which is sorted non-decreasingly and an integer `n`, return the number of positive integers that can be generated using `digits` that are less than or equal to `n`.",
            sampleInput: "digits = [\"1\",\"3\",\"5\",\"7\"], n = 100",
            sampleOutput: "20",
            constraints: "n <= 10^9.",
            starterCode: "/**\n * @param {string[]} digits\n * @param {number} n\n * @return {number}\n */\nvar atMostNGivenDigitSet = function(digits, n) {\n    \n};",
            tags: ["Array", "Math", "String", "Binary Search", "Dynamic Programming"]
        }
    },
    {
        title: "Cherry Pickup",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the maximum cherries you can collect by going from top-left to bottom-right and back.",
            explanation: "### Two Simultaneous Paths\n\n**Concept:** State transformation (Going out and back is same as two people going out synchronously)\n\n**Logic:**\nState: `(r1, c1, r2, c2)`. Since `r1+c1 == r2+c2` (time/step), we simplify to `(step, r1, r2)`.\n\n**Transitions:**\nFor each step, both people can move Down/Right. 4 possible combinations.\nIf `r1 == r2 && c1 == c2`, they pick the same cherry once. Otherwise, both pick theirs.\n\n**Time Complexity:** O(N³)\n**Space Complexity:** O(N²).",
            problemStatement: "You are given an `n x n` grid. You start at (0, 0), go to (n-1, n-1) and return. Find the maximum cherries you can collect. Some cells are blocked (-1).",
            sampleInput: "grid = [[0,1,-1],[1,0,-1],[1,1,1]]",
            sampleOutput: "5",
            constraints: "n <= 50.",
            starterCode: "/**\n * @param {number[][]} grid\n * @return {number}\n */\nvar cherryPickup = function(grid) {\n    \n};",
            tags: ["Array", "Dynamic Programming", "Matrix"]
        }
    },
    {
        title: "Smallest Sufficient Team",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the smallest number of people whose combined skills cover the entire required skill set.",
            explanation: "### Bitmask DP + Search\n\n**Concept:** State Compression of Skills\n\n**Logic:**\n`dp[mask]` = smallest list of indices that cover the skills in `mask`.\n\n**Approach:**\n1. Map each skill to a bit index.\n2. Convert each person's skill set into a bitmask.\n3. Iterate people: `dp[newMask] = min(dp[newMask], [...dp[prevMask], personIndex])` where `newMask = prevMask | personMask`.\n\n**Time Complexity:** O(N * 2^S) where S is number of skills.\n**Space Complexity:** O(2^S).",
            problemStatement: "Given a list of `req_skills` and a list of `people` (each having a list of skills), return the **smallest sufficient team** (a subset of people who cover all skills).",
            sampleInput: "req_skills = [\"java\",\"nodejs\",\"reactjs\"], people = [[\"java\"],[\"nodejs\"],[\"nodejs\",\"reactjs\"]]",
            sampleOutput: "[0, 2]",
            constraints: "req_skills.length <= 16, people.length <= 60.",
            starterCode: "/**\n * @param {string[]} req_skills\n * @param {string[][]} people\n * @return {number[]}\n */\nvar smallestSufficientTeam = function(req_skills, people) {\n    \n};",
            tags: ["Array", "Dynamic Programming", "Bit Manipulation", "Bitmask"]
        }
    },
    {
        title: "Tallest Billboard",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the maximum possible height for two equal-height steel supports.",
            explanation: "### Meet-in-the-middle or Offset DP\n\n**Concept:** Difference-based DP\n\n**Logic:**\n`dp[diff]` = maximum height of the shorter support when the height difference between the two is `diff`.\nFor each rod `L`:\n1. Add to longer: `newDiff = diff + L`, `newHeight = height`.\n2. Add to shorter: \n   - If `L < diff`: `newDiff = diff - L`, `newHeight = height + L`.\n   - If `L > diff`: `newDiff = L - diff`, `newHeight = height + diff`.\n3. Put aside: `newDiff = diff`, `newHeight = height`.\n\n**Time Complexity:** O(N * Sum)\n**Space Complexity:** O(Sum).",
            problemStatement: "You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each support must be an equal height. Return the largest possible height of your billboard.",
            sampleInput: "rods = [1,2,3,6]",
            sampleOutput: "6 (One side: 6, Other side: 1+2+3)",
            constraints: "rods.length <= 20, sum <= 5000.",
            starterCode: "/**\n * @param {number[]} rods\n * @return {number}\n */\nvar tallestBillboard = function(rods) {\n    \n};",
            tags: ["Array", "Dynamic Programming"]
        }
    },
    {
        title: "Maximize Score After N Operations",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Maximize the sum of (operation_index * gcd(x, y)) by picking pairs from an array.",
            explanation: "### Bitmask + GCD Precomputation\n\n**Concept:** State recursion (Remaining numbers)\n\n**Logic:**\n`solve(mask, opIndex)` returns max score for numbers remaining (indicated by `mask`).\n- Precompute GCD for all pairs `(i, j)`.\n- For current state:\n  - Pick any two available numbers `i` and `j`.\n  - `score = opIndex * gcd(i, j) + solve(mask | (1 << i) | (1 << j), opIndex + 1)`.\n\n**Time Complexity:** O(2^N * N²)\n**Space Complexity:** O(2^N).",
            problemStatement: "You are given `nums`, an array of positive integers of size `2*n`. You must perform `n` operations. In the `i`th operation, pick two elements `x` and `y`, and receive a score of `i * gcd(x,y)`. Return the maximum total score.",
            sampleInput: "nums = [3,4,6,8]",
            sampleOutput: "11 (1*gcd(3,4) + 2*gcd(6,8) = 1*1 + 2*2 = 5... wait 2*gcd(6,8)+1*gcd(3,4)=11? No: 1*gcd(3,4)+2*gcd(6,8)=5. Max is 11? 1*gcd(4,8)+2*gcd(3,6) = 1*4 + 2*3 = 10. 1*gcd(3,4)+2*gcd(6,8)=5. 1*gcd(3,8)+2*gcd(4,6)=1*1+2*2=5. Wait. Let's recheck: gcd(3,6)=3, gcd(4,8)=4. 2*4 + 1*3 = 11.)",
            constraints: "n <= 7 (nums.length <= 14).",
            starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxScore = function(nums) {\n    \n};",
            tags: ["Array", "Math", "Dynamic Programming", "Backtracking", "Bit Manipulation", "Number Theory", "Bitmask"]
        }
    },
    {
        title: "Check If It Is a Good Array",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Determine if there exists a sum of multiples of array elements that equals 1 (Bézout's identity).",
            explanation: "### Number Theory + DP logic\n\n**Concept:** GCD property\n\n**Logic:**\nBézout's identity states that for integers `a` and `b`, there exist `x` and `y` such that `ax + by = d`, where `d = gcd(a, b)`. To have `ax + by + ... = 1`, the GCD of the entire array must be 1.\n\n**Wait, is this DP?**\nIt can be viewed as an iterative reduction, but logically it's just a GCD calculation.\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1).",
            problemStatement: "Given an array `nums` of positive integers. Your task is to select some subset of `nums` and some integers `x_i` such that the sum of `nums[i]*x_i` for the selected subset is equal to 1. Return `true` if you can find such a subset, else `false`.",
            sampleInput: "nums = [12,5,7,23]",
            sampleOutput: "true",
            constraints: "nums.length <= 10^5.",
            starterCode: "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar isGoodArray = function(nums) {\n    \n};",
            tags: ["Array", "Math", "Number Theory"]
        }
    }
];

const seedDPBatch5 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Dynamic Programming'
        }).distinct('title');

        const filteredQuestions = batch5DPQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 5 DP questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Dynamic Programming',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new DP questions (Batch 5).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedDPBatch5();
