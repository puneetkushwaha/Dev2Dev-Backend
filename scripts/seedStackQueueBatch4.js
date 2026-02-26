const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch4StackQueueQuestions = [
    {
        title: "Basic Calculator III",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Evaluate a mathematical expression string containing non-negative integers, +, -, *, / operators and open '(' and closing ')' parentheses.",
            explanation: "### Basic Calculator III\n\n**Concept:** Stack + Recursion (or Nested Stack Management)\n\n**Approach:**\n1. This is the most complete version of 'Basic Calculator'. It combines precedence (`*`, `/` over `+`, `-`) and nesting (`( )`).\n2. Use a recursive function `calculate(s)` that maintains a pointer.\n3. Inside, use a stack to store values. For `(`, recursively call the function to get the evaluated value within brackets.\n4. Handle `*` and `/` immediately by popping from stack, operating, and pushing back.\n5. Sum the stack at the end of each scope.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Implement a basic calculator to evaluate a simple expression string. The expression string may contain open '(' and closing parentheses ')', the plus '+' or minus sign '-', non-negative integers and empty spaces ' '. The expression string contains only non-negative integers, '+', '-', '*', '/' operators, and open '(' and closing ')' parentheses.",
            sampleInput: "s = \"2*(5+5*2)/3+(6/2+8)\"",
            sampleOutput: "21",
            constraints: "1 <= s.length <= 10^4.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar calculate = function(s) {\n    \n};",
            tags: ["Math", "String", "Stack", "Recursion"]
        }
    },
    {
        title: "Longest Valid Parentheses",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the length of the longest valid (well-formed) parentheses substring.",
            explanation: "### Longest Valid Parentheses\n\n**Concept:** Stack (Index Tracking)\n\n**Intuition:**\nWe need to find the distance between indices that form valid boundaries. A stack can store indices of unmatched parentheses.\n\n**Approach:**\n1. Push `-1` onto the stack initially (base for boundary calculation).\n2. For each char `s[i]`:\n   - If `(`: Push `i` to stack.\n   - If `)`:\n     - Pop the stack.\n     - If stack is empty: Push current index `i` (new boundary base).\n     - If stack is not empty: `maxLen = max(maxLen, i - stack.top())`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.",
            sampleInput: "s = \")()())\"",
            sampleOutput: "4 (\"()()\")",
            constraints: "0 <= s.length <= 3 * 10^4.",
            starterCode: "/**\n * @param {string} s\n * @return {number}\n */\nvar longestValidParentheses = function(s) {\n    \n};",
            tags: ["String", "Dynamic Programming", "Stack"]
        }
    },
    {
        title: "Shortest Subarray with Sum at Least K",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the length of the shortest non-empty subarray with a sum of at least k.",
            explanation: "### Shortest Subarray with Sum >= K\n\n**Concept:** Prefix Sum + Monotonic Deque\n\n**Logic:**\nSince values can be negative, a simple sliding window doesn't work. We need to store prefix sums in a monotonic increasing deque.\n\n**Steps:**\n1. Compute prefix sums: `P[i] = nums[0] + ... + nums[i-1]`.\n2. Iterate through `P` with index `i`:\n   - While `deque` not empty and `P[i] - P[deque.front()] >= k`:\n     - Update `minLen = min(minLen, i - deque.shift())`.\n   - While `deque` not empty and `P[i] <= P[deque.back()]`:\n     - Pop back (current prefix sum is smaller and appears later, making it a better 'start' for future subarrays).\n   - Push current index `i` to back.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given an integer array `nums` and an integer `k`, return the length of the shortest non-empty subarray of `nums` with a sum of at least `k`. If there is no such subarray, return -1.",
            sampleInput: "nums = [2,-1,2], k = 3",
            sampleOutput: "3",
            constraints: "1 <= nums.length <= 10^5, -10^5 <= nums[i] <= 10^5, 1 <= k <= 10^9.",
            starterCode: "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nvar shortestSubarray = function(nums, k) {\n    \n};",
            tags: ["Array", "Binary Search", "Queue", "Sliding Window", "Heap (Priority Queue)", "Prefix Sum", "Monotonic Queue"]
        }
    },
    {
        title: "Constrained Subsequence Sum",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the maximum sum of a non-empty subsequence such that for every two consecutive integers in the subsequence, their indices in the original array differ by at most k.",
            explanation: "### Constrained Subsequence Sum\n\n**Concept:** DP + Monotonic Deque\n\n**Logic:**\n`dp[i]` = max subsequence sum ending at index `i`.\n`dp[i] = nums[i] + max(0, max(dp[i-k...i-1]))`.\n\n**Optimization:**\nInstead of searching for `max` in `O(k)`, use a monotonic deque (Decreasing) to keep track of the maximum `dp` value in the sliding window of size `k`.\n\n**Steps:**\n1. Iterate through `nums`:\n   - `dp[i] = nums[i] + (deque.isEmpty() ? 0 : deque.front())`.\n   - Maintain deque: remove values `< current_dp` from back, remove values outside window `k` from front.\n   - Push `current_dp` (if positive) to deque.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given an integer array `nums` and an integer `k`, return the maximum sum of a **non-empty** subsequence of that array such that for every two **consecutive** integers in the subsequence, `nums[i]` and `nums[j]` (where `i < j`), the condition `j - i <= k` is satisfied.",
            sampleInput: "nums = [10,2,-10,5,20], k = 2",
            sampleOutput: "37 (10, 2, 5, 20)",
            constraints: "1 <= k <= nums.length <= 10^5.",
            starterCode: "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number}\n */\nvar constrainedSubsetSum = function(nums, k) {\n    \n};",
            tags: ["Array", "Dynamic Programming", "Queue", "Sliding Window", "Monotonic Queue"]
        }
    },
    {
        title: "Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the length of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.",
            explanation: "### Longest Subarray (Min/Max Limit)\n\n**Concept:** Sliding Window + Two Deques\n\n**Intuition:**\nTo check if a window is valid in O(1), we need easy access to the **current max** and **current min** in that window.\n\n**Approach:**\n1. Use two deques: `maxDeque` (decreasing) and `minDeque` (increasing).\n2. Expand `right`. Update both deques.\n3. If `maxDeque.front() - minDeque.front() > limit`:\n   - The window is invalid. Shrink `left`.\n   - If `left` index matches the front of either deque, pop it.\n4. Result is the maximum `right - left + 1` seen.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given an array of integers `nums` and an integer `limit`, return the size of the longest **non-empty** subarray such that the absolute difference between any two elements of this subarray is less than or equal to `limit`.",
            sampleInput: "nums = [8,2,4,7], limit = 4",
            sampleOutput: "2 ([2,4], [4,7])",
            constraints: "1 <= nums.length <= 10^5, 0 <= limit <= 10^9.",
            starterCode: "/**\n * @param {number[]} nums\n * @param {number} limit\n * @return {number}\n */\nvar longestSubarray = function(nums, limit) {\n    \n};",
            tags: ["Array", "Queue", "Sliding Window", "Heap (Priority Queue)", "Ordered Set", "Monotonic Queue"]
        }
    },
    {
        title: "Maximum Frequency Stack",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Design a stack-like data structure that removes the most frequent element.",
            explanation: "### Freq Stack\n\n**Concept:** Map of Stacks\n\n**Intuition:**\nWe need to track frequencies. But when multiple elements have the same max frequency, we must remove the one most recently pushed (LIFO).\n\n**Approach:**\n1. `freqMap`: Element -> Frequency.\n2. `groupStack`: Frequency -> Stack of elements with that frequency.\n3. `maxFreq`: Current overall max frequency.\n\n**Operations:**\n- `push(x)`: \n  - Increment `freqMap[x]`.\n  - `f = freqMap[x]`.\n  - Push `x` to `groupStack[f]`.\n  - Update `maxFreq`.\n- `pop()`:\n  - `x = groupStack[maxFreq].pop()`.\n  - Decrement `freqMap[x]`.\n  - If `groupStack[maxFreq]` is empty, `maxFreq--`.\n\n**Time Complexity:** O(1) for all.\n**Space Complexity:** O(n)",
            problemStatement: "Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.",
            sampleInput: "push(5), push(7), push(5), push(7), push(4), push(5), pop(), pop()",
            sampleOutput: "pop: 5 (then 7)",
            constraints: "Calls <= 2 * 10^4.",
            starterCode: "var FreqStack = function() {\n    \n};\n\nFreqStack.prototype.push = function(val) {\n    \n};\n\nFreqStack.prototype.pop = function() {\n    \n};",
            tags: ["Hash Table", "Stack", "Design"]
        }
    },
    {
        title: "Moving Average from Data Stream",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Calculate the moving average of all integers in the sliding window.",
            explanation: "### Moving Average\n\n**Concept:** Queue (FIFO Window)\n\n**Approach:**\n1. Use a queue of maximum size `size`.\n2. Keep a running `sum` of elements in the queue.\n3. When a new number arrives:\n   - If queue is at capacity, pop from front and subtract from `sum`.\n   - Add new number to back and to `sum`.\n   - Return `sum / queue.size()`.\n\n**Time Complexity:** O(1)\n**Space Complexity:** O(size)",
            problemStatement: "Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.",
            sampleInput: "MovingAverage(3), next(1), next(10), next(3), next(5)",
            sampleOutput: "1.0, 5.5, 4.66, 6.0",
            constraints: "size <= 1000, calls <= 10^4.",
            starterCode: "/**\n * @param {number} size\n */\nvar MovingAverage = function(size) {\n    \n};\n\n/** \n * @param {number} val\n * @return {number}\n */\nMovingAverage.prototype.next = function(val) {\n    \n};",
            tags: ["Array", "Design", "Queue", "Data Stream"]
        }
    },
    {
        title: "Build an Array With Stack Operations",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Determine the sequence of Push/Pop operations needed to build a target array.",
            explanation: "### Build Array Operations\n\n**Concept:** Simulation\n\n**Approach:**\nIterate through numbers `1, 2, 3...` until the target is built.\n1. For each number `n`:\n   - If `n` is in `target`: \"Push\". Move to next target element.\n   - If `n` is not in `target`: \"Push\", then \"Pop\".\n2. Stop when target is completely built.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "You are given an array `target` and an integer `n`. You have an empty stack with two operations: \"Push\" and \"Pop\". You are also given the stream of integers `1, 2, 3, ..., n`. Build the target array using these stack operations.",
            sampleInput: "target = [1,3], n = 3",
            sampleOutput: "[\"Push\",\"Push\",\"Pop\",\"Push\"]",
            constraints: "1 <= target.length <= 100.",
            starterCode: "/**\n * @param {number[]} target\n * @param {number} n\n * @return {string[]}\n */\nvar buildArray = function(target, n) {\n    \n};",
            tags: ["Array", "Stack", "Simulation"]
        }
    },
    {
        title: "Final Prices With a Special Discount",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Apply a discount to prices based on the next smaller or equal price to the right.",
            explanation: "### Final Prices (Discount)\n\n**Concept:** Monotonic Stack (Increasing)\n\n**Intuition:**\nThis is the 'Next Smaller Element' problem. The discount is the value of the next smaller or equal element found to the right.\n\n**Approach:**\n1. Iterate through prices.\n2. While stack is not empty and `prices[i] <= prices[stack.top()]`:\n   - Pop index `j` from stack.\n   - `prices[j] -= prices[i]` (Apply discount).\n3. Push current index `i` to stack.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "Given the array `prices`, where `prices[i]` is the price of the `i`th item in a shop. There is a special discount for a shop, if you buy the `i`th item, then you will receive a discount equivalent to `prices[j]` where `j` is the minimum index such that `j > i` and `prices[j] <= prices[i]`. Return the final prices.",
            sampleInput: "prices = [8,4,6,2,3]",
            sampleOutput: "[4,2,4,2,3]",
            constraints: "1 <= prices.length <= 500.",
            starterCode: "/**\n * @param {number[]} prices\n * @return {number[]}\n */\nvar finalPrices = function(prices) {\n    \n};",
            tags: ["Array", "Stack", "Monotonic Stack"]
        }
    },
    {
        title: "Crawler Log Folder",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Find the minimum number of steps to return to the main folder after a series of change folder operations.",
            explanation: "### Crawler Log\n\n**Concept:** Stack / Counter\n\n**Approach:**\nTreat it like a stack depth.\n1. `depth = 0`.\n2. Iterate through logs:\n   - `\"../\"`: `depth = max(0, depth - 1)`.\n   - `\"./\"`: Do nothing.\n   - `\"folder/\"`: `depth++`.\n3. Return `depth`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Return the minimum number of operations needed to go back to the main folder after the change folder operations.",
            sampleInput: "logs = [\"d1/\",\"d2/\",\"../\",\"d21/\",\"./\"]",
            sampleOutput: "2",
            constraints: "1 <= logs.length <= 1000.",
            starterCode: "/**\n * @param {string[]} logs\n * @return {number}\n */\nvar minOperations = function(logs) {\n    \n};",
            tags: ["Array", "String", "Stack"]
        }
    }
];

const seedStackQueueBatch4 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Stack/Queue'
        }).distinct('title');

        const filteredQuestions = batch4StackQueueQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 4 Stack/Queue questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Stack/Queue',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new Stack/Queue questions (Batch 4).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedStackQueueBatch4();
