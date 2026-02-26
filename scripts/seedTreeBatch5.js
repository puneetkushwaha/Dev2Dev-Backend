const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch5TreeQuestions = [
    {
        title: "Minimum Distance Between BST Nodes",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Find the minimum difference between the values of any two different nodes in the BST.",
            explanation: "### Min Distance in BST\n\n**Concept:** Inorder Traversal Property\n\n**Logic:**\nIn a BST, the minimum difference always occurs between two nodes that are adjacent in level-order traversal (sorted order).\n\n**Approach:**\n1. Perform a recursive inorder traversal.\n2. Keep track of the `previousNodeValue` visit.\n3. At each node, `minDiff = min(minDiff, currentNodeValue - previousNodeValue)`.\n4. Update `previousNodeValue`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h).",
            problemStatement: "Given the `root` of a Binary Search Tree (BST), return the minimum difference between the values of any two different nodes in the tree.",
            sampleInput: "root = [4,2,6,1,3]",
            sampleOutput: "1",
            constraints: "Nodes in range [2, 100].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar minDiffInBST = function(root) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"]
        }
    },
    {
        title: "Binary Tree Paths",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Return all root-to-leaf paths as strings.",
            explanation: "### Binary Tree Paths\n\n**Concept:** DFS + String Concatenation\n\n**Approach:**\n1. Use a recursive function `dfs(node, path)`.\n2. Add `node.val` to `path`.\n3. If leaf, add `path` string to result.\n4. Else, recurse for children with `path + \"->\"`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) for path storage in recursive calls.",
            problemStatement: "Given the `root` of a binary tree, return all root-to-leaf paths in **any order**.",
            sampleInput: "root = [1,2,3,null,5]",
            sampleOutput: "[\"1->2->5\",\"1->3\"]",
            constraints: "Nodes in range [1, 100].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {string[]}\n */\nvar binaryTreePaths = function(root) {\n    \n};",
            tags: ["String", "Backtracking", "Tree", "Depth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Maximum Binary Tree",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Construct a binary tree from an array where each node is the maximum in its subarray.",
            explanation: "### Maximum Binary Tree\n\n**Concept:** Recursion (Divide & Conquer)\n\n**Logic:**\n1. Find the maximum element in the current array range. This is the `root`.\n2. Elements to the left of the maximum form the left subtree.\n3. Elements to the right form the right subtree.\n\n**Time Complexity:** O(n²) in worst case (skewed), O(n log n) average.\n**Space Complexity:** O(n).",
            problemStatement: "You are given an integer array `nums` with no duplicates. Build a binary tree where: The root is the maximum number in `nums`. The left subtree is the maximum tree constructed from elements to the left of the max. The right subtree is from elements to the right.",
            sampleInput: "nums = [3,2,1,6,0,5]",
            sampleOutput: "[6,3,5,null,2,0,null,null,1]",
            constraints: "1 <= nums.length <= 1000.",
            starterCode: "/**\n * @param {number[]} nums\n * @return {TreeNode}\n */\nvar constructMaximumBinaryTree = function(nums) {\n    \n};",
            tags: ["Array", "Divide and Conquer", "Stack", "Tree", "Monotonic Stack", "Binary Tree"]
        }
    },
    {
        title: "Delete Nodes And Return Forest",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Delete specified nodes from a tree and return a list of roots of the remaining disjoint trees.",
            explanation: "### Delete Nodes & Return Forest\n\n**Concept:** Postorder Traversal (Bottom-up deletion)\n\n**Approach:**\n1. Use a Set for `to_delete` for O(1) lookup.\n2. `dfs(node, is_root)`:\n   - Check if `node` is to be deleted.\n   - If `node` is a root and not deleted, add to result.\n   - Recursively call for children.\n   - If current node is deleted, its children (if not deleted) become new roots.\n   - Return `null` if node is deleted, else `node`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h) + O(to_delete.length).",
            problemStatement: "Given the `root` of a binary tree and an array of integers `to_delete` containing the values of nodes to delete. After deleting all nodes with a value in `to_delete`, we are left with a forest (a disjoint union of trees). Return the roots of the trees in the remaining forest.",
            sampleInput: "root = [1,2,3,4,5,6,7], to_delete = [3,5]",
            sampleOutput: "[[1,2,null,4],[6],[7]]",
            constraints: "Nodes in range [1, 1000].",
            starterCode: "/**\n * @param {TreeNode} root\n * @param {number[]} to_delete\n * @return {TreeNode[]}\n */\nvar delNodes = function(root, to_delete) {\n    \n};",
            tags: ["Array", "Hash Table", "Tree", "Depth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Smallest String Starting From Leaf",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the lexicographically smallest string that starts at a leaf and ends at the root.",
            explanation: "### Smallest String from Leaf\n\n**Concept:** DFS + String comparison\n\n**Intuition:**\nBuild paths from root to leaf, reverse them, and compare.\n\n**Approach:**\n1. `dfs(node, currentString)`:\n   - Convert `node.val` to char: `String.fromCharCode(97 + node.val)`.\n   - `currentString = char + currentString`.\n   - If leaf, update `minString = min(minString, currentString)`.\n   - Recurse for children.\n\n**Time Complexity:** O(n * log n) due to string reversals/comparisons.\n**Space Complexity:** O(n).",
            problemStatement: "You are given the `root` of a binary tree where each node has a value from 0 to 25 representing the letters 'a' to 'z'. Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.",
            sampleInput: "root = [0,1,2,3,4,3,4]",
            sampleOutput: "\"dba\"",
            constraints: "Nodes in range [1, 8500].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {string}\n */\nvar smallestFromLeaf = function(root) {\n    \n};",
            tags: ["String", "Tree", "Depth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Maximum Level Sum of a Binary Tree",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the level with the maximum sum of node values.",
            explanation: "### Max Level Sum\n\n**Concept:** BFS (Level Order Transaction)\n\n**Approach:**\n1. Perform a standard level-order traversal using a queue.\n2. For each level, calculate the sum of its nodes.\n3. Track the maximum sum found and the corresponding level index.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(w).",
            problemStatement: "Given the `root` of a binary tree, the level of its root is 1, the level of its children is 2, and so on. Return the **smallest** level `x` such that the sum of all the values of nodes at level `x` is **maximal**.",
            sampleInput: "root = [1,7,0,7,-8,null,null]",
            sampleOutput: "2 (Level 2 sum = 7 + 0 = 7. Level 1 = 1. Level 3 = -1.)",
            constraints: "Nodes in range [1, 10^4].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxLevelSum = function(root) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Range Sum of BST",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Calculate the sum of values of all nodes in a BST within the range [low, high].",
            explanation: "### Range Sum in BST\n\n**Concept:** Pruned DFS\n\n**Approach:**\n1. If `root == null`, return 0.\n2. If `root.val < low`: All nodes in left are too small, returns `rangeSum(root.right)`.\n3. If `root.val > high`: All nodes in right are too big, returns `rangeSum(root.left)`.\n4. If in range: `return root.val + rangeSum(left) + rangeSum(right)`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h).",
            problemStatement: "Given the `root` node of a binary search tree and two integers `low` and `high`, return the sum of values of all nodes with a value in the **inclusive** range `[low, high]`.",
            sampleInput: "root = [10,5,15,3,7,null,18], low = 7, high = 15",
            sampleOutput: "32 (10 + 7 + 15)",
            constraints: "Nodes in range [1, 2 * 10^4].",
            starterCode: "/**\n * @param {TreeNode} root\n * @param {number} low\n * @param {number} high\n * @return {number}\n */\nvar rangeSumBST = function(root, low, high) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"]
        }
    },
    {
        title: "Find Mode in Binary Search Tree",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Find the most frequently occurring value(s) in a BST.",
            explanation: "### Find Mode in BST\n\n**Concept:** Inorder Traversal + Counting\n\n**Logic:**\nInorder traversal gives sorted values. You can find modes in a sorted stream by tracking current frequency and maximum frequency.\n\n**Approach:**\n1. Traverse inorder.\n2. If `curr.val == prev.val`, `count++`. Else, `count = 1`.\n3. If `count > maxFreq`, clear results, add `curr.val`, update `maxFreq`.\n4. If `count == maxFreq`, add `curr.val` to results.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) if result array doesn't count, or O(h) for stack.",
            problemStatement: "Given the `root` of a binary search tree (BST) with duplicates, return all the **mode(s)** (i.e., the most frequently occurred element) in it.",
            sampleInput: "root = [1,null,2,2]",
            sampleOutput: "[2]",
            constraints: "Nodes in range [1, 10^4].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {number[]}\n */\nvar findMode = function(root) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"]
        }
    },
    {
        title: "Maximum Binary Tree II",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Insert a new value into a Maximum Binary Tree as if it was appended to the original array.",
            explanation: "### Max Binary Tree II\n\n**Concept:** Structural Insertion logic\n\n**Logic:**\nIf the new value is greater than the current root, the current root becomes its left child. Otherwise, it must be in the right subtree.\n\n**Approach:**\n1. If `val > root.val`: `newNode.left = root; return newNode;`.\n2. Else: `root.right = insertIntoMaxTree(root.right, val); return root;`.\n\n**Time Complexity:** O(h)\n**Space Complexity:** O(h).",
            problemStatement: "A maximum tree is constructed from an array where the root is the max element. Suppose `A` is the array and `t` is the max tree. Suppose we append `val` to `A` to get `B`. Return the max tree for `B`.",
            sampleInput: "root = [4,1,3,null,null,2], val = 5",
            sampleOutput: "[5,4,null,1,3,null,null,2]",
            constraints: "Nodes in range [1, 100].",
            starterCode: "/**\n * @param {TreeNode} root\n * @param {number} val\n * @return {TreeNode}\n */\nvar insertIntoMaxTree = function(root, val) {\n    \n};",
            tags: ["Tree", "Binary Tree"]
        }
    },
    {
        title: "Binary Tree Cameras",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the minimum number of cameras needed to monitor all nodes in a tree.",
            explanation: "### Binary Tree Cameras\n\n**Concept:** Greedy / Postorder DFS (State Management)\n\n**Logic:**\nEvery node has 3 possible states:\n0: Node needs covered.\n1: Node has a camera.\n2: Node is already covered.\n\n**Strategy:**\nOnly place a camera if a child absolutely needs it. This covers parent and siblings too.\n\n**Approach:**\n1. `dfs(node)`:\n   - If `node == null`, return `2` (covered).\n   - `L = dfs(left), R = dfs(right)`.\n   - If `L == 0` or `R == 0`: Put camera here. `cameras++`, return `1`.\n   - If `L == 1` or `R == 1`: Already covered. Return `2`.\n   - Else: Return `0` (this node needs cover from parent).\n2. If root returns `0`, add one last camera.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h).",
            problemStatement: "You are given the `root` of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children. Return the minimum number of cameras needed to monitor all nodes of the tree.",
            sampleInput: "root = [0,0,null,0,0]",
            sampleOutput: "1",
            constraints: "Nodes in range [1, 1000].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar minCameraCover = function(root) {\n    \n};",
            tags: ["Dynamic Programming", "Tree", "Depth-First Search", "Binary Tree"]
        }
    }
];

const seedTreeBatch5 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Trees'
        }).distinct('title');

        const filteredQuestions = batch5TreeQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 5 Tree questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Trees',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new Tree questions (Batch 5).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedTreeBatch5();
