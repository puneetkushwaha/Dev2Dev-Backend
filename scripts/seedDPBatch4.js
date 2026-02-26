const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch4DPQuestions = [
    {
        title: "Best Time to Buy and Sell Stock with Cooldown",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Maximize profit from stock trading with a one-day cooldown period after selling.",
            explanation: "### Stock with Cooldown\n\n**Concept:** State Machine DP\n\n**Logic:**\nEach day, you can be in one of 3 states:\n1. **held**: You currently own a stock.\n2. **sold**: You just sold a stock today (forces cooldown tomorrow).\n3. **reset**: You don't own a stock and didn't sell today.\n\n**Transitions:**\n- `held[i] = max(held[i-1], reset[i-1] - prices[i])`\n- `sold[i] = held[i-1] + prices[i]`\n- `reset[i] = max(reset[i-1], sold[i-1])`\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1).",
            problemStatement: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. Design an algorithm to find the maximum profit. After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).",
            sampleInput: "prices = [1,2,3,0,2]",
            sampleOutput: "3 (Buy at 1, Sell at 2, Cooldown, Buy at 0, Sell at 2)",
            constraints: "prices.length <= 5000.",
            starterCode: "/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    \n};",
            tags: ["Array", "Dynamic Programming"]
        }
    },
    {
        title: "Best Time to Buy and Sell Stock with Transaction Fee",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Maximize profit from stock trading with a fixed transaction fee per trade.",
            explanation: "### Stock with Transaction Fee\n\n**Concept:** Greedy DP (Two States)\n\n**Logic:**\n1. `hold`: Max profit if we hold a stock today.\n2. `free`: Max profit if we don't hold a stock today.\n\n**Transitions:**\n- `hold = max(hold, free - prices[i])`\n- `free = max(free, hold + prices[i] - fee)`\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1).",
            problemStatement: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day, and an integer `fee` representing a transaction fee. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.",
            sampleInput: "prices = [1,3,2,8,4,9], fee = 2",
            sampleOutput: "8",
            constraints: "prices.length <= 5 * 10^4.",
            starterCode: "/**\n * @param {number[]} prices\n * @param {number} fee\n * @return {number}\n */\nvar maxProfit = function(prices, fee) {\n    \n};",
            tags: ["Array", "Dynamic Programming"]
        }
    },
    {
        title: "Best Time to Buy and Sell Stock III",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Maximize profit with at most two transactions.",
            explanation: "### Stock III (Max 2 Trades)\n\n**Concept:** Forward & Backward passes OR 4-state DP\n\n**4-State Logic:**\nTrack 4 variables: `firstBuy`, `firstSell`, `secondBuy`, `secondSell`.\n1. `firstBuy = min(firstBuy, prices[i])` (Minimizing cost)\n2. `firstSell = max(firstSell, prices[i] - firstBuy)` (Profit from 1st trade)\n3. `secondBuy = min(secondBuy, prices[i] - firstSell)` (Reinvesting: minimize net cost)\n4. `secondSell = max(secondSell, prices[i] - secondBuy)` (Final total profit)\n\n**Time Complexity:** O(N)\n**Space Complexity:** O(1).",
            problemStatement: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. Design an algorithm to find the maximum profit. You may complete **at most two** transactions.",
            sampleInput: "prices = [3,3,5,0,0,3,1,4]",
            sampleOutput: "6 (3-0=3 + 4-1=3)",
            constraints: "prices.length <= 10^5.",
            starterCode: "/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    \n};",
            tags: ["Array", "Dynamic Programming"]
        }
    },
    {
        title: "Best Time to Buy and Sell Stock IV",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Maximize profit with at most k transactions.",
            explanation: "### Stock IV (K Trades)\n\n**Concept:** Generalized State DP\n\n**Logic:**\nSimilar to Stock III, but use arrays of size `K` to track `buy[k]` and `sell[k]` for all possible trade counts.\n\n**Approach:**\n- If `k >= n/2`, it becomes 'Stock II' (unlimited trades).\n- Else, iterate through prices and update `buy[j]` and `sell[j]` for `j` in range `1` to `k`.\n\n**Time Complexity:** O(N * K)\n**Space Complexity:** O(K).",
            problemStatement: "You are given an integer `k` and an array `prices`. Design an algorithm to find the maximum profit. You may complete at most `k` transactions.",
            sampleInput: "k = 2, prices = [2,4,1]",
            sampleOutput: "2",
            constraints: "k <= 100, prices.length <= 1000.",
            starterCode: "/**\n * @param {number} k\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(k, prices) {\n    \n};",
            tags: ["Array", "Dynamic Programming"]
        }
    },
    {
        title: "Maximum Profit in Job Scheduling",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find maximum profit from non-overlapping jobs.",
            explanation: "### Weighted Interval Scheduling\n\n**Concept:** DP + Binary Search\n\n**Logic:**\n1. Sort jobs by `endTime`.\n2. `dp[i]` = max profit considering first `i` jobs.\n3. For job `i`, we have two choices:\n   - **Skip it:** `dp[i] = dp[i-1]`.\n   - **Include it:** `profit = job[i].profit + dp[idx]` where `idx` is the last job that finished before `job[i].startTime`.\n4. Use **Binary Search** to find `idx` efficiently in O(log n).\n\n**Time Complexity:** O(N log N)\n**Space Complexity:** O(N).",
            problemStatement: "We have `n` jobs, each with a start time, end time, and profit. Return the maximum profit you can take such that there are no two jobs in the subset with overlapping time ranges.",
            sampleInput: "startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]",
            sampleOutput: "120 (Job 1 and 4)",
            constraints: "n <= 5 * 10^4.",
            starterCode: "/**\n * @param {number[]} startTime\n * @param {number[]} endTime\n * @param {number[]} profit\n * @return {number}\n */\nvar jobScheduling = function(startTime, endTime, profit) {\n    \n};",
            tags: ["Array", "Binary Search", "Dynamic Programming", "Sorting"]
        }
    },
    {
        title: "Minimum Insertion Steps to Make a String Palindrome",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the minimum number of insertions to make a string a palindrome.",
            explanation: "### Palindrome Insertion\n\n**Concept:** LPS Relation\n\n**Logic:**\nTo make a string `s` a palindrome with minimum insertions, we just need to keep the **Longest Palindromic Subsequence (LPS)** as it is and duplicate everything else.\n`Answer = s.length - LPS(s)`.\n\n**Time Complexity:** O(N²)\n**Space Complexity:** O(N).",
            problemStatement: "Given a string `s`. In one step you can insert any character at any index of the string. Return the minimum number of steps to make `s` palindrome.",
            sampleInput: "s = \"leetcode\"",
            sampleOutput: "5 (\"leetcodocteel\")",
            constraints: "s.length <= 500.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar minInsertions = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Burst Balloons",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find maximum coins obtained by bursting balloons in an optimal order.",
            explanation: "### Range DP\n\n**Concept:** Matrix Chain Multiplication variant\n\n**Logic:**\nThink backwards: What was the **last** balloon `k` to be burst in the range `[i, j]`?\nIf `k` is burst last, its neighbors are `i-1` and `j+1` (which are outside our current range).\n`coins = nums[i-1] * nums[k] * nums[j+1] + solve(i, k-1) + solve(k+1, j)`.\n\n**Time Complexity:** O(N³)\n**Space Complexity:** O(N²).",
            problemStatement: "You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it. Burst all balloons and return the maximum coins you can collect.",
            sampleInput: "nums = [3,1,5,8]",
            sampleOutput: "167",
            constraints: "n <= 300.",
            starterCode: "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxCoins = function(nums) {\n    \n};",
            tags: ["Array", "Dynamic Programming"]
        }
    },
    {
        title: "Palindrome Partitioning II",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the minimum cuts needed for a palindrome partitioning of a string.",
            explanation: "### Palindrome Partitioning DP\n\n**Concept:** 2-Stage DP\n\n**Steps:**\n1. Precompute `isPalindrome[i][j]` for all ranges (O(N²)).\n2. `cuts[i]` = min cuts for prefix `s[0...i]`.\n3. `cuts[i] = min(1 + cuts[j])` for all `j < i` where `s[j+1...i]` is a palindrome.\n\n**Time Complexity:** O(N²)\n**Space Complexity:** O(N²).",
            problemStatement: "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return the **minimum** cuts needed for a palindrome partitioning of `s`.",
            sampleInput: "s = \"aab\"",
            sampleOutput: "1 ([\"aa\",\"b\"])",
            constraints: "s.length <= 2000.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar minCut = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming"]
        }
    },
    {
        title: "Super Egg Drop",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the minimum number of drops needed to determine the highest floor from which an egg won't break.",
            explanation: "### Egg Drop Optimization\n\n**Concept:** Inverse DP (Maximize floor for given moves)\n\n**Logic:**\nInstead of `dp[eggs][floors]`, define `dp[moves][eggs]` as the maximum floors we can check with `moves` moves and `eggs` eggs.\n- When we drop an egg:\n  - It breaks: we can check `dp[m-1][e-1]` floors below.\n  - It survives: we can check `dp[m-1][e]` floors above.\n- Plus the current floor: `dp[m][e] = dp[m-1][e-1] + dp[m-1][e] + 1`.\n\n**Time Complexity:** O(K * MoveCount) ≈ O(K log N)\n**Space Complexity:** O(K).",
            problemStatement: "You are given `k` identical eggs and `n` floors. Find the minimum number of moves that you need to determine with certainty what the value of `f` is (the highest floor where egg doesn't break).",
            sampleInput: "k = 2, n = 6",
            sampleOutput: "3",
            constraints: "k <= 100, n <= 10^4.",
            starterCode: "/**\n * @param {number} k\n * @param {number} n\n * @return {number}\n */\nvar superEggDrop = function(k, n) {\n    \n};",
            tags: ["Math", "Binary Search", "Dynamic Programming"]
        }
    },
    {
        title: "Can I Win",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Determine if the first player can force a win in a chosen-integer game.",
            explanation: "### Bitmask DP + Memoization\n\n**Concept:** Game State compression\n\n**Logic:**\nUse a bitmask to represent which numbers have been chosen. Since `maxChoosableInteger <= 20`, the mask fits in an integer.\n- `solve(mask, currentTotal)`:\n  - For each number `i` not in `mask`:\n    - If `currentTotal + i >= desiredTotal`, return `true`.\n    - If `!solve(mask | (1 << i), currentTotal + i)`, return `true` (opponent loses).\n  - If no choice leads to a win, return `false`.\n\n**Time Complexity:** O(2^N * N)\n**Space Complexity:** O(2^N).",
            problemStatement: "In the \"100 game\", two players take turns choosing an integer from 1 to `maxChoosableInteger`. Once chosen, it cannot be used again. The first player to reach a total >= `desiredTotal` wins. Can the first player force a win?",
            sampleInput: "maxChoosableInteger = 10, desiredTotal = 11",
            sampleOutput: "false",
            constraints: "maxChoosableInteger <= 20.",
            starterCode: "/**\n * @param {number} maxChoosableInteger\n * @param {number} desiredTotal\n * @return {boolean}\n */\nvar canIWin = function(maxChoosableInteger, desiredTotal) {\n    \n};",
            tags: ["Math", "Dynamic Programming", "Bit Manipulation", "Memoization", "Game Theory", "Bitmask"]
        }
    }
];

const seedDPBatch4 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Dynamic Programming'
        }).distinct('title');

        const filteredQuestions = batch4DPQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 4 DP questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Dynamic Programming',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new DP questions (Batch 4).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedDPBatch4();
