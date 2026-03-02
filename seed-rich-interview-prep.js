const mongoose = require('mongoose');
const Domain = require('./models/Domain');
const Topic = require('./models/Topic');
require('dotenv').config();

const richProblems = [
    {
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Example 1:
**Input:** \`height = [0,1,0,2,1,0,1,3,2,1,2,1]\`
**Output:** \`6\`
**Explanation:** The above elevation map (black section) is represented by array \`[0,1,0,2,1,0,1,3,2,1,2,1]\`. In this case, 6 units of rain water (blue section) are being trapped.

### Example 2:
**Input:** \`height = [4,2,0,3,2,5]\`
**Output:** \`9\``,
            testCases: [
                { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
                { input: '[4,2,0,3,2,5]', expected: '9' }
            ],
            starterCode: '/**\n * @param {number[]} height\n * @return {number}\n */\nvar trap = function(height) {\n    \n};',
            constraints: 'n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5',
            keyPoints: [
                'Find the maximum height to the left and right of each bar.',
                'The water trapped above each bar is min(left_max, right_max) - height[i].',
                'Can you optimize this using two pointers to O(1) space?'
            ]
        }
    },
    {
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.

The overall run time complexity should be \`O(log (m+n))\`.

### Example 1:
**Input:** \`nums1 = [1,3], nums2 = [2]\`
**Output:** \`2.00000\`
**Explanation:** merged array = \`[1,2,3]\` and median is 2.

### Example 2:
**Input:** \`nums1 = [1,2], nums2 = [3,4]\`
**Output:** \`2.50000\`
**Explanation:** merged array = \`[1,2,3,4]\` and median is \`(2 + 3) / 2 = 2.5\`.`,
            testCases: [
                { input: '[1,3], [2]', expected: '2.00000' },
                { input: '[1,2], [3,4]', expected: '2.50000' }
            ],
            starterCode: '/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};',
            constraints: 'nums1.length == m\nnums2.length == n\n0 <= m, n <= 1000\n1 <= m + n <= 2000\n-10^6 <= nums1[i], nums2[i] <= 10^6',
            keyPoints: [
                'Use binary search to find the correct partition point in the smaller array.',
                'Ensure the left side total elements equals the right side (or +1 if odd).',
                'Compare boundaries: \`maxLeft1 <= minRight2\` and \`maxLeft2 <= minRight1\`.'
            ]
        }
    },
    {
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return the maximum path sum of any **non-empty** path.

### Example 1:
**Input:** \`root = [1,2,3]\`
**Output:** \`6\`
**Explanation:** The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.`,
            testCases: [
                { input: '[1,2,3]', expected: '6' },
                { input: '[-10,9,20,null,null,15,7]', expected: '42' }
            ],
            starterCode: '/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxPathSum = function(root) {\n    \n};',
            constraints: 'The number of nodes in the tree is in the range [1, 3 * 10^4].\n-1000 <= Node.val <= 1000',
            keyPoints: [
                'Use recursion to find the maximum contribution a subtree can provide to its parent.',
                'A node can either be the "apex" of the path (incorporating both left and right children) or a part of a path extending to its parent.',
                'Handle negative values by taking \`max(0, recursive_call)\`.'
            ]
        }
    },
    {
        title: 'Merge K Sorted Lists',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*

### Example 1:
**Input:** \`lists = [[1,4,5],[1,3,4],[2,6]]\`
**Output:** \`[1,1,2,3,4,4,5,6]\`
**Explanation:** The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6`,
            testCases: [
                { input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]' },
                { input: '[]', expected: '[]' }
            ],
            starterCode: '/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function(lists) {\n    \n};',
            constraints: 'k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500\n-10^4 <= lists[i][j] <= 10^4',
            keyPoints: [
                'You can use a Priority Queue (Min-Heap) to keep track of the smallest node among all heads.',
                'Alternatively, use a Divide and Conquer approach similar to Merge Sort.',
                'O(N log k) complexity where N is the total number of nodes.'
            ]
        }
    },
    {
        title: 'LRU Cache Implementation',
        difficulty: 'Hard',
        subject: 'DSA',
        content: {
            problemStatement: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
* \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
* \`int get(int key)\` Return the value of the \`key\` if the \`key\` exists, otherwise return \`-1\`.
* \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
            testCases: [
                { input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]', expected: '[null, null, null, 1, null, -1, null, -1, 3, 4]' }
            ],
            starterCode: 'class LRUCache {\n    /**\n     * @param {number} capacity\n     */\n    constructor(capacity) {\n        \n    }\n\n    /**\n     * @param {number} key\n     * @return {number}\n     */\n    get(key) {\n        \n    }\n\n    /**\n     * @param {number} key\n     * @param {number} value\n     * @return {void}\n     */\n    put(key, value) {\n        \n    }\n}',
            constraints: '1 <= capacity <= 3000\n0 <= key <= 10^4\n0 <= value <= 10^5\nAt most 2 * 10^5 calls will be made to get and put.',
            keyPoints: [
                'Use a Hash Map for O(1) lookups of keys.',
                'Use a Doubly Linked List to keep track of the usage order (Most Recent at head, Least Recent at tail).',
                'When a key is accessed or added, move it to the head of the list.'
            ]
        }
    }
];

const seedRich = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate');
        console.log('Connected to DB');

        const domain = await Domain.findOne({ name: 'Interview Preparation' });
        if (!domain) {
            console.error('Domain not found! Seed domain first.');
            process.exit(1);
        }

        for (const prob of richProblems) {
            const topicData = {
                title: prob.title,
                domainId: domain._id,
                subject: prob.subject,
                difficulty: prob.difficulty,
                content: {
                    ...prob.content,
                    tags: ['Interview', 'Hard', 'FAANG', 'Rich Content']
                }
            };

            const exists = await Topic.findOne({ title: prob.title, domainId: domain._id });
            if (exists) {
                await Topic.findByIdAndUpdate(exists._id, topicData);
                console.log(`Updated topic with rich content: ${prob.title}`);
            } else {
                await Topic.create(topicData);
                console.log(`Created topic with rich content: ${prob.title}`);
            }
        }

        console.log('Seeding of rich content complete');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedRich();
