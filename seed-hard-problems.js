const mongoose = require('mongoose');
const Domain = require('./models/Domain');
const Topic = require('./models/Topic');
require('dotenv').config();

const hardProblems = [
    {
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Example 1:
**Input:** height = [0,1,0,2,1,0,1,3,2,1,2,1]
**Output:** 6
**Explanation:** The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.`,
            testCases: [
                { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
                { input: '[4,2,0,3,2,5]', expected: '9' }
            ],
            starterCode: '/**\n * @param {number[]} height\n * @return {number}\n */\nvar trap = function(height) {\n    \n};',
            constraints: 'n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5',
            keyPoints: ['Two Pointers approach', 'Monotonic Stack approach', 'Dynamic Programming (Precomputing left and right max)']
        }
    },
    {
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

### Example 1:
**Input:** nums1 = [1,3], nums2 = [2]
**Output:** 2.00000
**Explanation:** merged array = [1,2,3] and median is 2.`,
            testCases: [
                { input: '[1,3], [2]', expected: '2.00000' },
                { input: '[1,2], [3,4]', expected: '2.50000' }
            ],
            starterCode: '/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};',
            constraints: 'nums1.length == m\nnums2.length == n\n0 <= m <= 1000\n0 <= n <= 1000\n1 <= m + n <= 2000\n-10^6 <= nums1[i], nums2[i] <= 10^6',
            keyPoints: ['Binary Search on the smaller array', 'Partitioning the arrays', 'Binary Search']
        }
    },
    {
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.`,
            testCases: [
                { input: '[1,2,3]', expected: '6' },
                { input: '[-10,9,20,null,null,15,7]', expected: '42' }
            ],
            starterCode: '/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxPathSum = function(root) {\n    \n};',
            constraints: 'The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000',
            keyPoints: ['Recursion with two values: max path ending at node, and global max path', 'Handling negative values']
        }
    },
    {
        title: 'Sliding Window Maximum',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

### Example 1:
**Input:** nums = [1,3,-1,-3,5,3,6,7], k = 3
**Output:** [3,3,5,5,6,7]`,
            testCases: [
                { input: '[1,3,-1,-3,5,3,6,7], 3', expected: '[3,3,5,5,6,7]' },
                { input: '[1], 1', expected: '[1]' }
            ],
            starterCode: '/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nvar maxSlidingWindow = function(nums, k) {\n    \n};',
            constraints: '1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= nums.length',
            keyPoints: ['Use a Deque to store indices', 'Monotonic queue (decreasing order)', 'O(n) time complexity']
        }
    },
    {
        title: 'Edit Distance',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:
1. Insert a character
2. Delete a character
3. Replace a character

### Example 1:
**Input:** word1 = "horse", word2 = "ros"
**Output:** 3
**Explanation:** 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')`,
            testCases: [
                { input: '"horse", "ros"', expected: '3' },
                { input: '"intention", "execution"', expected: '5' }
            ],
            starterCode: '/**\n * @param {string} word1\n * @param {string} word2\n * @return {number}\n */\nvar minDistance = function(word1, word2) {\n    \n};',
            constraints: '0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.',
            keyPoints: ['Dynamic Programming (2D table)', 'Levenshtein Distance', 'Space optimization']
        }
    }
];

const seedLongTerm = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to DB');

        let domain = await Domain.findOne({ name: 'Interview Preparation' });
        if (!domain) {
            domain = await Domain.create({
                name: 'Interview Preparation',
                description: 'Advanced technical interview practice with FAANG-level hard problems.',
                icon: 'Briefcase',
                color: '#6366f1'
            });
            console.log('Created Interview Preparation Domain');
        } else {
            // Update description to reflect quality
            domain.description = 'Advanced technical interview practice with FAANG-level hard problems.';
            await domain.save();
        }

        for (const prob of hardProblems) {
            const topicData = {
                title: prob.title,
                domainId: domain._id,
                subject: prob.subject,
                difficulty: prob.difficulty,
                content: {
                    ...prob.content,
                    tags: ['Interview', 'Hard', 'FAANG', prob.title.split(' ')[0]]
                }
            };

            const exists = await Topic.findOne({ title: prob.title, domainId: domain._id });
            if (exists) {
                await Topic.findByIdAndUpdate(exists._id, topicData);
                console.log(`Updated topic: ${prob.title}`);
            } else {
                await Topic.create(topicData);
                console.log(`Created topic: ${prob.title}`);
            }
        }

        // Also update regular Exams that might be tagged as Interview Preparation
        console.log('All Interview Prep topics updated to Hard quality.');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedLongTerm();
