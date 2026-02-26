const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch3LinkedListQuestions = [
    {
        title: "Detect Cycle Length in Linked List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the total number of nodes in the cycle of a linked list.",
            explanation: "### Cycle Length\n\n**Concept:** Floyd’s Cycle Detection Extension\n\n**Logic:**\n1. Use slow and fast pointers to detect if a cycle exists. If they meet, a cycle is present.\n2. Once they meet, keep one pointer fixed at the meeting point.\n3. Move the other pointer one step at a time and count the steps until it returns to the fixed pointer.\n4. The count is the length of the cycle.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given a linked list that contains a cycle, find the length of the cycle. If there is no cycle, return 0.",
            sampleInput: "head = [3,2,0,-4], pos = 1",
            sampleOutput: "3 (Nodes in cycle: 2, 0, -4)",
            constraints: "Number of nodes is in range [0, 10^4].",
            starterCode: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {number}\n */\nvar getCycleLength = function(head) {\n    \n};",
            tags: ["Linked List", "Two Pointers"]
        }
    },
    {
        title: "Remove Duplicates from Sorted List II",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Remove all nodes that have duplicate values from a sorted linked list.",
            explanation: "### Remove Duplicates II\n\n**Concept:** Dummy Node + Iterative Skip\n\n**Key Insight:**\nUnlike 'Remove Duplicates I' where we keep one instance, here we must remove the number entirely if it repeats.\n\n**Approach:**\n1. Create a `dummy` node pointing to `head` (to handle cases where the head itself is a duplicate).\n2. Maintain a `prev` pointer (initially at dummy).\n3. In each step, check if `head.val == head.next.val`.\n4. If true, keep skipping all nodes with that same value using a while loop.\n5. Then set `prev.next = head.next` (essentially deleting the entire sequence).\n6. If false (no duplicates for current value), just move `prev = prev.next`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted.",
            sampleInput: "head = [1,2,3,3,4,4,5]",
            sampleOutput: "[1,2,5]",
            constraints: "The number of nodes is in range [0, 300]. -100 <= Node.val <= 100.",
            starterCode: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar deleteDuplicates = function(head) {\n    \n};",
            tags: ["Linked List", "Two Pointers"]
        }
    },
    {
        title: "Remove Zero Sum Consecutive Nodes",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Remove sublists that sum to zero from a linked list.",
            explanation: "### Remove Zero Sum Sublists\n\n**Concept:** Prefix Sum on Linked List\n\n**Logic:**\n1. Maintain a running `prefixSum` as you traverse the list.\n2. Store the mapping of `sum -> node` in a HashMap.\n3. If a `prefixSum` value repeats, it means the nodes between the first occurrence and the current occurrence sum to exactly zero.\n4. Update the `next` pointer of the node from the first occurrence to skip all intermediate nodes.\n5. Repeat until the end of the list.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) for the HashMap.",
            problemStatement: "Given the head of a linked list, we repeatedly delete consecutive sequences of nodes that sum to 0 until there are no such sequences. After doing so, return the head of the final linked list.",
            sampleInput: "head = [1,2,-3,3,1]",
            sampleOutput: "[3,1] (or [1,2,1])",
            constraints: "Number of nodes in the list is between 1 and 1000. -1000 <= node.val <= 1000.",
            starterCode: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar removeZeroSumSublists = function(head) {\n    \n};",
            tags: ["Hash Table", "Linked List"]
        }
    },
    {
        title: "Convert Sorted List to Height Balanced BST",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Convert a sorted linked list into a height-balanced binary search tree.",
            explanation: "### Sorted List to BST\n\n**Concept:** Divide and Conquer (Recursive)\n\n**Strategy:**\n1. Find the middle element of the linked list using slow and fast pointers. This middle element will be the root of the current BST segment.\n2. Split the list into two halves: the part before the middle and the part after the middle.\n3. Recursively convert the left half into the left subtree and the right half into the right subtree.\n\n**Constraint:** To achieve constant space complexity (ignoring recursion stack), we can use an 'In-order traversal simulation' approach by keeping a global head pointer.\n\n**Time Complexity:** O(n log n)\n**Space Complexity:** O(log n) (recursion stack).",
            problemStatement: "Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height-balanced binary search tree.",
            sampleInput: "head = [-10,-3,0,5,9]",
            sampleOutput: "[0,-3,9,-10,null,5]",
            constraints: "Number of nodes is in range [0, 2 * 10^4]. -10^5 <= val <= 10^5.",
            starterCode: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {TreeNode}\n */\nvar sortedListToBST = function(head) {\n    \n};",
            tags: ["Linked List", "Divide and Conquer", "Tree", "Binary Search Tree", "Binary Tree"]
        }
    },
    {
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Merge k sorted linked lists into one sorted linked list.",
            explanation: "### Merge k Sorted Lists\n\n**Concept:** Priority Queue (Min-Heap)\n\n**Approach:**\n1. Use a Min-Heap to store the current head nodes of all `k` lists.\n2. Extract the minimum node from the heap and append it to the resulting merged list.\n3. If the extracted node has a `next` node, insert that `next` node into the heap.\n4. Repeat until the heap is empty.\n\n**Alternative:** Use Divide and Conquer (Merge lists in pairs) - O(N log k) time, O(1) extra space.\n\n**Time Complexity:** O(N log k) where N is the total number of nodes.\n**Space Complexity:** O(k) for the priority queue.",
            problemStatement: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
            sampleInput: "lists = [[1,4,5],[1,3,4],[2,6]]",
            sampleOutput: "[1,1,2,3,4,4,5,6]",
            constraints: "k == lists.length. 0 <= k <= 10^4. 0 <= lists[i].length <= 500.",
            starterCode: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function(lists) {\n    \n};",
            tags: ["Linked List", "Divide and Conquer", "Heap (Priority Queue)", "Merge Sort"]
        }
    }
];

const seedLinkedListBatch3 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Linked Lists'
        }).distinct('title');

        const filteredQuestions = batch3LinkedListQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 3 Linked List questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Linked Lists',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new Linked List questions (Batch 3).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedLinkedListBatch3();
