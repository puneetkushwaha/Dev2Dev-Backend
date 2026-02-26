const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch4TreeQuestions = [
    {
        title: "Lowest Common Ancestor of a Binary Tree",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Find the lowest common ancestor of two given nodes in a binary tree.",
            explanation: "### LCA of Binary Tree\n\n**Concept:** Backtracking / Postorder Traversal\n\n**Logic:**\n1. If `root` is one of `p` or `q`, or `null`, return `root`.\n2. Recursively find LCA in left and right subtrees.\n3. If both left and right recursive calls return non-null, `root` is the LCA (one node is in left, one is in right).\n4. If only one call is non-null, return that non-null value (both nodes are in that subtree).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h).",
            problemStatement: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
            sampleInput: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
            sampleOutput: "3",
            constraints: "Nodes in range [2, 10^5].",
            starterCode: "/**\n * @param {TreeNode} root\n * @param {TreeNode} p\n * @param {TreeNode} q\n * @return {TreeNode}\n */\nvar lowestCommonAncestor = function(root, p, q) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Path Sum III",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Count the number of paths that sum to a target value. Paths do not need to start at the root or end at a leaf.",
            explanation: "### Path Sum III\n\n**Concept:** Prefix Sum + DFS\n\n**Intuition:**\nSimilar to finding subarrays that sum to K. Maintain a prefix sum map as you traverse down the tree.\n\n**Steps:**\n1. Use a HashMap to store `runningSum -> frequency`.\n2. `dfs(node, currentSum)`:\n   - `currentSum += node.val`.\n   - `count += map.get(currentSum - targetSum)`.\n   - Update map with `currentSum`.\n   - Recursively call for children.\n   - **Backtrack:** Remove `currentSum` from map before returning.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h).",
            problemStatement: "Given the `root` of a binary tree and an integer `targetSum`, return the number of paths where the sum of the values along the path equals `targetSum`. The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).",
            sampleInput: "root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8",
            sampleOutput: "3",
            constraints: "Nodes in range [0, 1000].",
            starterCode: "/**\n * @param {TreeNode} root\n * @param {number} targetSum\n * @return {number}\n */\nvar pathSum = function(root, targetSum) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Binary Tree"]
        }
    },
    {
        title: "All Nodes Distance K in Binary Tree",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Return a list of the values of all nodes that have a distance k from the target node.",
            explanation: "### All Nodes Distance K\n\n**Concept:** Tree to Graph (BFS) or Parent Pointers\n\n**Approach:**\n1. Traverse the tree once to build a map of `node -> parent` or convert the tree into an adjacency list (graph).\n2. Perform BFS starting from the `target` node.\n3. Move outwards level by level (including the parent direction).\n4. After `k` steps, all nodes in the queue are at distance `k`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n).",
            problemStatement: "Given the `root` of a binary tree, the value of a target node `target`, and an integer `k`, return an array of the values of all nodes that have a distance `k` from the target node.",
            sampleInput: "root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2",
            sampleOutput: "[7,4,1]",
            constraints: "Nodes in range [1, 500].",
            starterCode: "/**\n * @param {TreeNode} root\n * @param {TreeNode} target\n * @param {number} k\n * @return {number[]}\n */\nvar distanceK = function(root, target, k) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Count Complete Tree Nodes",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Count total nodes in a complete binary tree in less than O(n) time.",
            explanation: "### Count Complete Nodes\n\n**Concept:** Binary Search on Tree Properties\n\n**Logic:**\nA complete binary tree has a depth `h`. If the `height(leftSubtree) == height(rightSubtree)`, then the left subtree is a full tree of height `h-1`. If not, the right subtree is a full tree of height `h-2`.\n\n**Optimization:**\nCompare the height of the leftmost path and the rightmost path. If they are equal, the tree is full and size is `2^h - 1`. Otherwise, recurse.\n\n**Time Complexity:** O(log² n)\n**Space Complexity:** O(log n).",
            problemStatement: "Given the `root` of a **complete** binary tree, return the number of the nodes in the tree.",
            sampleInput: "root = [1,2,3,4,5,6]",
            sampleOutput: "6",
            constraints: "Nodes in range [0, 5 * 10^4].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar countNodes = function(root) {\n    \n};",
            tags: ["Binary Search", "Tree", "Depth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Vertical Order Traversal of a Binary Tree",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Find the vertical order traversal of a binary tree, sorting by row and column.",
            explanation: "### Vertical Order Traversal\n\n**Concept:** Coordinate System + Sorting\n\n**Logic:**\nAssign each node `(row, col)`. Root is `(0, 0)`. Left child is `(row + 1, col - 1)`, right is `(row + 1, col + 1)`.\n\n**Steps:**\n1. Traverse (BFS/DFS) and store nodes as `[col, row, val]`.\n2. Sort all nodes by: `col` (primary), `row` (secondary), `val` (tertiary - for same coordinate).\n3. Group sorted nodes by `col` and return values.\n\n**Time Complexity:** O(n log n)\n**Space Complexity:** O(n).",
            problemStatement: "Given the `root` of a binary tree, calculate the **vertical order traversal** of the binary tree.",
            sampleInput: "root = [1,2,3,4,5,6,7]",
            sampleOutput: "[[4],[2],[1,5,6],[3],[7]]",
            constraints: "Nodes in range [1, 1000].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nvar verticalTraversal = function(root) {\n    \n};",
            tags: ["Hash Table", "Tree", "Depth-First Search", "Breadth-First Search", "Sorting", "Binary Tree"]
        }
    },
    {
        title: "Populating Next Right Pointers in Each Node II",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Connect each node to its next right node in a general binary tree (not necessarily perfect).",
            explanation: "### Populate Next Right II\n\n**Concept:** Level Traversal using established 'next' links\n\n**Logic:**\nUnlike a perfect tree, children may be missing. We need a dummy node to track the head of the *next* level while we iterate through the *current* level using `next` pointers.\n\n**Steps:**\n1. `curr` starts at `root`.\n2. While `curr` is not null (starting a new level):\n   - `dummy = new Node()`, `prev = dummy`.\n   - While `curr` is not null (traversing current level):\n     - If `curr.left`: `prev.next = curr.left`, `prev = prev.next`.\n     - If `curr.right`: `prev.next = curr.right`, `prev = prev.next`.\n     - `curr = curr.next`.\n   - `curr = dummy.next` (Move to next level).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1).",
            problemStatement: "Given a binary tree, populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.",
            sampleInput: "root = [1,2,3,4,5,null,7]",
            sampleOutput: "[1,#,2,3,#,4,5,7,#]",
            constraints: "Nodes in range [0, 6000].",
            starterCode: "/**\n * @param {Node} root\n * @return {Node}\n */\nvar connect = function(root) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Binary Tree Zigzag Level Order Traversal",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Return the zigzag level order traversal of nodes' values.",
            explanation: "### Zigzag Traversal\n\n**Concept:** BFS with Direction Flag\n\n**Approach:**\nUse a queue for level-order traversal. For each level, check a flag `leftToRight`. If false, reverse the level's values before adding to the result.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n).",
            problemStatement: "Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).",
            sampleInput: "root = [3,9,20,null,null,15,7]",
            sampleOutput: "[[3],[20,9],[15,7]]",
            constraints: "Nodes in range [0, 2000].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nvar zigzagLevelOrder = function(root) {\n    \n};",
            tags: ["Tree", "Breadth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Binary Tree Tilt",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Calculate the sum of all node tilts in a binary tree.",
            explanation: "### Tree Tilt\n\n**Concept:** Postorder Traversal (Bottom-up)\n\n**Logic:**\nTilt of a node = `abs(sumOfLeftSubtree - sumOfRightSubtree)`.\n\n**Steps:**\n1. `traverse(node)` returns the sum of the subtree rooted at `node`.\n2. `L = traverse(node.left)`, `R = traverse(node.right)`.\n3. `totalTilt += abs(L - R)`.\n4. `return node.val + L + R`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h).",
            problemStatement: "Given the `root` of a binary tree, return the sum of every tree node's tilt.",
            sampleInput: "root = [4,2,9,3,5,null,7]",
            sampleOutput: "15",
            constraints: "Nodes in range [0, 10^4].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar findTilt = function(root) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Binary Tree"]
        }
    },
    {
        title: "Convert BST to Greater Tree",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Convert a BST to a Greater Tree where every key is replaced with the original key plus the sum of all keys greater than the original key in BST.",
            explanation: "### BST to Greater Tree\n\n**Concept:** Reverse Inorder Traversal (Right -> Root -> Left)\n\n**Logic:**\nIn a BST, the nodes greater than the current node are always to the right. If we visit in decreasing order (Right -> Root -> Left), we can maintain a running sum.\n\n**Steps:**\n1. `runningSum = 0`.\n2. `dfs(node)`:\n   - `dfs(right)`\n   - `runningSum += node.val`\n   - `node.val = runningSum`\n   - `dfs(left)`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h).",
            problemStatement: "Given the `root` of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.",
            sampleInput: "root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]",
            sampleOutput: "[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]",
            constraints: "Nodes in range [0, 10^4].",
            starterCode: "/**\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nvar convertBST = function(root) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"]
        }
    },
    {
        title: "Trim a Binary Search Tree",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Trim a BST such that all nodes are within the range [low, high].",
            explanation: "### Trim BST\n\n**Concept:** Recursive Filtering\n\n**Logic:**\n1. If `root.val < low`: All nodes in root's left subtree are also too small. Return `trim(root.right)`.\n2. If `root.val > high`: All nodes in root's right subtree are also too big. Return `trim(root.left)`.\n3. If `root.val` is in range: Recurse for both children and return `root`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(h).",
            problemStatement: "Given the `root` of a binary search tree and the lowest and highest boundaries as `low` and `high`, trim the tree so that all its elements lies in `[low, high]`. Trimming the tree should **not** change the relative structure of the elements that will remain in the tree.",
            sampleInput: "root = [3,0,4,null,2,null,null,1], low = 1, high = 3",
            sampleOutput: "[3,2,null,1]",
            constraints: "Nodes in range [1, 10^4].",
            starterCode: "/**\n * @param {TreeNode} root\n * @param {number} low\n * @param {number} high\n * @return {TreeNode}\n */\nvar trimBST = function(root, low, high) {\n    \n};",
            tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"]
        }
    }
];

const seedTreeBatch4 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Trees'
        }).distinct('title');

        const filteredQuestions = batch4TreeQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 4 Tree questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Trees',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new Tree questions (Batch 4).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedTreeBatch4();
