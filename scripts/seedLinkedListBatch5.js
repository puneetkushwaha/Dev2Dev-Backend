const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch5LinkedListQuestions = [
    {
        title: "Double a Number Represented as a Linked List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Double the value of a number where each digit is a node in a linked list.",
            explanation: "### Double a Number LL\n\n**Concept:** Reverse and Add / Stack\n\n**Intuition:**\nDoubling a number needs us to handle carries from right to left (standard math). Since LL is head-to-tail, we either reverse it or use recursion/stack.\n\n**Approach:**\n1. Reverse the Linked List.\n2. Iterate through the reversed list, doubling each digit and adding the `carry`.\n3. If `doubledDigit >= 10`: `digit = doubledDigit % 10`, `carry = 1`. Else `carry = 0`.\n4. After the loop, if carry remains, add a new node with value `1`.\n5. Reverse the list back.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "You are given the `head` of a non-empty linked list representing a non-negative integer without leading zeroes. Return the `head` of the linked list after **doubling** it.",
            sampleInput: "head = [1,8,9]",
            sampleOutput: "[3,7,8] (189 * 2 = 378)",
            constraints: "Number of nodes is in range [1, 10^4]. 0 <= Node.val <= 9.",
            starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar doubleIt = function(head) {\n    \n};",
            tags: ["Linked List", "Math", "Stack"]
        }
    },
    {
        title: "Remove Nodes From Linked List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Remove nodes that have a node with a strictly greater value anywhere to their right.",
            explanation: "### Remove Nodes (Monotonic Logic)\n\n**Concept:** Reverse + Linear Scan OR Monotonic Stack\n\n**Intuition:**\nA node stays only if it is greater than or equal to all nodes to its right. This means from right-to-left, the values should be non-decreasing.\n\n**Approach (Reverse):**\n1. Reverse the Linked List.\n2. Keep the new head. Maintain a `maxValSeen` (initially the value of new head).\n3. Traverse the list: \n   - If `next.val >= maxValSeen`, keep the node and update `maxValSeen`.\n   - Else, delete the node.\n4. Reverse back and return.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "You are given the `head` of a linked list. Remove every node which has a node with a **strictly greater** value anywhere to the right side of it.",
            sampleInput: "head = [5,2,13,3,8]",
            sampleOutput: "[13,8]",
            constraints: "Number of nodes in range [1, 10^5].",
            starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar removeNodes = function(head) {\n    \n};",
            tags: ["Linked List", "Stack", "Recursion", "Monotonic Stack"]
        }
    },
    {
        title: "Insert Greatest Common Divisors in Linked List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Insert a new node with the GCD value between every two adjacent nodes.",
            explanation: "### Insert GCD Nodes\n\n**Concept:** GCD Math + Pointer Injection\n\n**Approach:**\n1. Iterate through the list using a `curr` pointer while `curr.next` exists.\n2. Calculate `val1 = curr.val` and `val2 = curr.next.val`.\n3. Find their GCD using the Euclidean algorithm: `gcd(a, b) = (b == 0) ? a : gcd(b, a % b)`.\n4. Create a new node with this GCD value.\n5. Insert it: `newNode.next = curr.next`, `curr.next = newNode`.\n6. Move `curr` to `newNode.next` (original next node).\n\n**Time Complexity:** O(n * log(min(v1, v2)))\n**Space Complexity:** O(1)",
            problemStatement: "Given the head of a linked list `head`, in which each node contains an integer value. Between every pair of adjacent nodes, insert a new node with a value equal to the **greatest common divisor** of them.",
            sampleInput: "head = [18,6,10,3]",
            sampleOutput: "[18,6,6,2,10,1,3]",
            constraints: "Number of nodes in range [1, 5000]. 1 <= Node.val <= 1000.",
            starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar insertGreatestCommonDivisors = function(head) {\n    \n};",
            tags: ["Linked List", "Math"]
        }
    },
    {
        title: "Spiral Matrix IV",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Fill an m x n matrix with linked list values in a clockwise spiral order.",
            explanation: "### Spiral Matrix filling\n\n**Concept:** Matrix Simulation + LL traversal\n\n**Approach:**\n1. Initialize an `m x n` matrix with `-1`.\n2. Define boundaries: `top=0, bottom=m-1, left=0, right=n-1`.\n3. Use a loop while `head != null` and boundaries aren't crossed:\n   - Move right: fill `matrix[top][i]`, then `top++`.\n   - Move down: fill `matrix[i][right]`, then `right--`.\n   - Move left: fill `matrix[bottom][i]`, then `bottom--`.\n   - Move up: fill `matrix[i][left]`, then `left++`.\n4. Return matrix.\n\n**Time Complexity:** O(m * n)\n**Space Complexity:** O(1) (excluding result).",
            problemStatement: "You are given two integers `m` and `n`, which represent the dimensions of a matrix. You are also given the `head` of a linked list of integers. Generate an `m x n` matrix that contains the integers in the linked list presented in **spiral order** (clockwise), starting from the top-left of the matrix.",
            sampleInput: "m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]",
            sampleOutput: "[[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]",
            constraints: "1 <= m, n <= 10^5, m * n <= 10^5.",
            starterCode: "/**\n * @param {number} m\n * @param {number} n\n * @param {ListNode} head\n * @return {number[][]}\n */\nvar spiralMatrix = function(m, n, head) {\n    \n};",
            tags: ["Array", "Linked List", "Matrix", "Simulation"]
        }
    },
    {
        title: "Swapping Nodes in a Linked List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Swap the values of the kth node from the beginning and the kth node from the end.",
            explanation: "### Swapping Nodes\n\n**Concept:** Two Pointers (Fixed Gap)\n\n**Approach:**\n1. Find the `k`th node from the front (let's call it `first`).\n2. To find the `k`th node from the end (let's call it `second`), start a pointer at `head` when the first pointer reaches the `k`th node. Move both until the first reaches the tail.\n3. Swap `first.val` and `second.val`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "You are given the `head` of a linked list, and an integer `k`. Return the head of the linked list after **swapping the values** of the `k`th node from the beginning and the `k`th node from the end (the list is 1-indexed).",
            sampleInput: "head = [1,2,3,4,5], k = 2",
            sampleOutput: "[1,4,3,2,5]",
            constraints: "Number of nodes is `n`. 1 <= k <= n <= 10^5.",
            starterCode: "/**\n * @param {ListNode} head\n * @param {number} k\n * @return {ListNode}\n */\nvar swapNodes = function(head, k) {\n    \n};",
            tags: ["Linked List", "Two Pointers"]
        }
    },
    {
        title: "LFU Cache",
        difficulty: "Hard",
        level: "Advanced",
        content: {
            description: "Design and implement a Least Frequently Used (LFU) cache data structure.",
            explanation: "### LFU Cache\n\n**Concept:** Doubly Linked List + HashMaps\n\n**Logic:**\nWe need to track both 'Recently used' and 'Frequently used'.\n- `keyToNode`: Map to store key -> node.\n- `freqToList`: Map to store freq -> Doubly Linked List of nodes with that frequency.\n- `minFreq`: Track the current minimum frequency globally.\n\n**Operations:**\n- `get(key)`: If exists, increment its frequency. Move node from old freq list to new freq list. Update `minFreq` if necessary. Return value.\n- `put(key, value)`: If exists, update value and increment frequency. If full, remove a node from the `freqToList[minFreq]` (LRU within that min frequency). Then insert new node with freq 1.\n\n**Time Complexity:** O(1) for both.\n**Space Complexity:** O(capacity).",
            problemStatement: "Design and implement a data structure for a Least Frequently Used (LFU) cache.",
            sampleInput: "LFUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), get(3)",
            sampleOutput: "get(1)->1, get(2)->-1 (evicted), get(3)->3",
            constraints: "capacity <= 10^4.",
            starterCode: "/**\n * @param {number} capacity\n */\nvar LFUCache = function(capacity) {\n    \n};\n\n/** \n * @param {number} key\n * @return {number}\n */\nLFUCache.prototype.get = function(key) {\n    \n};\n\n/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */\nLFUCache.prototype.put = function(key, value) {\n    \n};",
            tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"]
        }
    },
    {
        title: "LRU Cache",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Design and implement a Least Recently Used (LRU) cache data structure.",
            explanation: "### LRU Cache\n\n**Concept:** HashMap + Doubly Linked List\n\n**Approach:**\n1. Use a **Doubly Linked List** to store the items in order of usage (MRU at tail, LRU at head).\n2. Use a **HashMap** to map keys to their corresponding nodes in the DLL (for O(1) access).\n3. On `get(key)`: If key exists, move its node to the tail (MRU) and return value.\n4. On `put(key, val)`: If key exists, update value and move to tail. If new, add to tail. If capacity exceeded, remove node from head (LRU).\n\n**Time Complexity:** O(1) for both operations.\n**Space Complexity:** O(capacity).",
            problemStatement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
            sampleInput: "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)",
            sampleOutput: "get(1)->1, get(2)->-1 (evicted)",
            constraints: "capacity <= 3000.",
            starterCode: "/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n    \n};\n\n/** \n * @param {number} key\n * @return {number}\n */\nLRUCache.prototype.get = function(key) {\n    \n};",
            tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"]
        }
    },
    {
        title: "Design Browser History",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Implement a browser history management system using a doubly linked list.",
            explanation: "### Browser History\n\n**Concept:** Doubly Linked List\n\n**Intuition:**\nA doubly linked list is perfect because we need to move both 'forward' and 'back'.\n\n**Operations:**\n- `visit(url)`: Create a new node. Connect it after current node. IMPORTANT: Clear any 'forward' history by setting `current.next = newNode` and `newNode.prev = current`.\n- `back(steps)`: Move the current pointer `prev` up to `steps` times or until start.\n- `forward(steps)`: Move the current pointer `next` up to `steps` times or until end.\n\n**Time Complexity:** O(steps) for back/forward, O(1) for visit.\n**Space Complexity:** O(N) where N is visit count.",
            problemStatement: "You have a browser of one tab where you start on the homepage and you can visit another url, get back in the history number of steps or move forward in the history number of steps.",
            sampleInput: "BrowserHistory(\"leetcode.com\"), visit(\"google.com\"), visit(\"facebook.com\"), back(1), back(1), forward(1)",
            sampleOutput: "\"google.com\", \"leetcode.com\", \"google.com\"",
            constraints: "1 <= steps <= 100.",
            starterCode: "/**\n * @param {string} homepage\n */\nvar BrowserHistory = function(homepage) {\n    \n};",
            tags: ["Array", "Linked List", "Stack", "Design", "Doubly-Linked List", "Data Stream"]
        }
    },
    {
        title: "Reverse Nodes in Even Groups",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Reverse nodes in groups that have an even number of nodes.",
            explanation: "### Even Group Reversal\n\n**Concept:** Sequence Simulation + Range Reversal\n\n**Approach:**\n1. Groups grow as 1, 2, 3, 4, ... etc.\n2. In each step, check how many nodes are actually present in the next group (the last group might be smaller).\n3. If the group size is **even**, reverse that segment.\n4. If odd, keep it as is.\n5. Keep track of the `prev` node of the group to reconnect reversed segments.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (if iterative reversal used).",
            problemStatement: "You are given the head of a linked list. The nodes are assigned to groups of lengths 1, 2, 3, 4, ... and so on. If the length of a group is **even**, reverse the nodes in that group.",
            sampleInput: "head = [5,2,6,3,9,1,7,3,8,4]",
            sampleOutput: "[5,6,2,3,9,1,4,8,3,7]",
            constraints: "Number of nodes in range [1, 10^5].",
            starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseEvenGroups = function(head) {\n    \n};",
            tags: ["Linked List"]
        }
    },
    {
        title: "Merge Nodes in Between Zeros",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Merge all nodes between consecutive zeros into a single node with the sum of their values.",
            explanation: "### Merge Nodes Between Zeros\n\n**Concept:** Linear Scan with Summation\n\n**Approach:**\n1. Skip the initial '0' node.\n2. Iterate through the list. Maintain a `sum` of values.\n3. When you encounter another `0`:\n   - Create a new node (or modify in-place) with the accumulated `sum`.\n   - Reset `sum` and continue until the end of the list.\n4. Ensure the resulting list is correctly terminated.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1) (if in-place).",
            problemStatement: "You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list along with every group of non-zero nodes are guaranteed to be separated by a 0. For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes.",
            sampleInput: "head = [0,3,1,0,4,5,2,0]",
            sampleOutput: "[4,11] (3+1=4, 4+5+2=11)",
            constraints: "Nodes in range [3, 2 * 10^5].",
            starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar mergeNodes = function(head) {\n    \n};",
            tags: ["Linked List", "Simulation"]
        }
    }
];

const seedLinkedListBatch5 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Linked Lists'
        }).distinct('title');

        const filteredQuestions = batch5LinkedListQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 5 Linked List questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Linked Lists',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new Linked List questions (Batch 5).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedLinkedListBatch5();
