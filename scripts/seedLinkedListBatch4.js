const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config();

const batch4LinkedListQuestions = [
    {
        title: "Remove Linked List Elements",
        difficulty: "Easy",
        level: "Beginner",
        content: {
            description: "Remove all nodes from a linked list that have a specific value.",
            explanation: "### Remove LL Elements\n\n**Concept:** Iterative Removal with Dummy Node\n\n**Intuition:**\nWhen removing nodes, the 'head' itself might need to be removed. To avoid complex `if (head == target)` logic at every step, we use a **Dummy Node** that points to the head.\n\n**Approach:**\n1. Create a `dummy` node: `dummy.next = head`.\n2. Use a `curr` pointer starting at `dummy`.\n3. While `curr.next` exists:\n   - If `curr.next.val == target`: Skip the next node (`curr.next = curr.next.next`).\n   - Else: Move forward (`curr = curr.next`).\n4. Return `dummy.next`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return the new head.",
            sampleInput: "head = [1,2,6,3,4,5,6], val = 6",
            sampleOutput: "[1,2,3,4,5]",
            constraints: "Nodes in range [0, 10^4]. 0 <= Node.val <= 50. 0 <= val <= 50.",
            starterCode: "/**\n * @param {ListNode} head\n * @param {number} val\n * @return {ListNode}\n */\nvar removeElements = function(head, val) {\n    \n};",
            tags: ["Linked List", "Recursion"]
        }
    },
    {
        title: "Delete Node in a Linked List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Delete a node from a singly linked list given only access to that node.",
            explanation: "### Delete Node (No Head Access)\n\n**Concept:** Value Copying\n\n**Intuition:**\nNormally, we delete a node by changing the `next` pointer of its *previous* node. But here, we don't have access to the previous node or the head.\n\n**Trick:**\nIf we can't delete 'this' node, we can make 'this' node look exactly like the 'next' node, and then delete the 'next' node.\n\n**Steps:**\n1. Copy the value of the next node into the current node: `node.val = node.next.val`.\n2. Skip the next node: `node.next = node.next.next`.\n\n**Time Complexity:** O(1)\n**Space Complexity:** O(1)",
            problemStatement: "Write a function to delete a node in a singly-linked list. You will not be given access to the head of the list, instead you will be given access to the node to be deleted directly. It is guaranteed that the node to be deleted is not a tail node.",
            sampleInput: "head = [4,5,1,9], node = 5",
            sampleOutput: "[4,1,9]",
            constraints: "Number of nodes is in range [2, 1000]. Node to be deleted is in the list and not the tail.",
            starterCode: "/**\n * @param {ListNode} node\n * @return {void} Do not return anything, modify node in-place instead.\n */\nvar deleteNode = function(node) {\n    \n};",
            tags: ["Linked List"]
        }
    },
    {
        title: "Odd Even Linked List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Group all odd-indexed nodes together followed by all even-indexed nodes.",
            explanation: "### Odd Even Linked List\n\n**Concept:** Two Pointers (Interweaving)\n\n**Intuition:**\nMaintain two separate chains: one for 'odd' nodes and one for 'even' nodes. At the end, connect the tail of the odd chain to the head of the even chain.\n\n**Approach:**\n1. `odd = head`, `even = head.next`, `evenHead = even`.\n2. Loop while `even` and `even.next` are not null:\n   - `odd.next = even.next` (Jump to next odd)\n   - `odd = odd.next` (Move odd pointer)\n   - `even.next = odd.next` (Jump to next even)\n   - `even = even.next` (Move even pointer)\n3. `odd.next = evenHead` (Connect chains).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list. The first node is considered odd, and the second node is even, and so on.",
            sampleInput: "head = [1,2,3,4,5]",
            sampleOutput: "[1,3,5,2,4]",
            constraints: "Number of nodes is in range [0, 10^4].",
            starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar oddEvenList = function(head) {\n    \n};",
            tags: ["Linked List"]
        }
    },
    {
        title: "Split Linked List in Parts",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Split a linked list into k consecutive parts with balanced lengths.",
            explanation: "### Split LL in Parts\n\n**Concept:** Math + Pointer Manipulation\n\n**Intuition:**\nIf length `N` is not divisible by `k`, the first `N % k` parts should have one extra node.\n\n**Steps:**\n1. Calculate total length `N`.\n2. Determine base size `width = floor(N / k)` and remainder `rem = N % k`.\n3. Iterate `k` times:\n   - Current part size = `width + (rem > 0 ? 1 : 0)`.\n   - Traverse the list to cut off a part of that size.\n   - Store the head of the part and move the global pointer to the start of the next part.\n   - Decrement `rem`.\n\n**Time Complexity:** O(n + k)\n**Space Complexity:** O(k) for the result array.",
            problemStatement: "Given the head of a singly linked list and an integer `k`, split the linked list into `k` consecutive linked list parts. The length of each part should be as equal as possible.",
            sampleInput: "head = [1,2,3], k = 5",
            sampleOutput: "[[1],[2],[3],[],[]]",
            constraints: "Number of nodes in range [0, 1000]. 1 <= k <= 50.",
            starterCode: "/**\n * @param {ListNode} head\n * @param {number} k\n * @return {ListNode[]}\n */\nvar splitListToParts = function(head, k) {\n    \n};",
            tags: ["Linked List"]
        }
    },
    {
        title: "Rotate List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Rotate a linked list to the right by k places.",
            explanation: "### Rotate List\n\n**Concept:** Cyclic Connection\n\n**Intuition:**\nRotating a list by `k` is equivalent to making the list circular and then breaking it at the new tail.\n\n**Steps:**\n1. Find length `N` and get the `lastNode`.\n2. Perform `k = k % N`. If `k == 0`, return `head`.\n3. Connect `lastNode.next = head` (make circular).\n4. Move `N - k` steps from the original head to find the **new tail**.\n5. `newHead = newTail.next`, then `newTail.next = null`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given the head of a linked list, rotate the list to the right by `k` places.",
            sampleInput: "head = [1,2,3,4,5], k = 2",
            sampleOutput: "[4,5,1,2,3]",
            constraints: "Nodes in range [0, 500]. 0 <= k <= 2 * 10^9.",
            starterCode: "/**\n * @param {ListNode} head\n * @param {number} k\n * @return {ListNode}\n */\nvar rotateRight = function(head, k) {\n    \n};",
            tags: ["Linked List", "Two Pointers"]
        }
    },
    {
        title: "Reverse Linked List II",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Reverse a linked list from position left to position right.",
            explanation: "### Reverse LL II (Range Reversal)\n\n**Concept:** Pointers Management\n\n**Intuition:**\nWe only want to reverse a specific sub-segment. We need to save the nodes just *before* and *after* the segment to reconnect properly.\n\n**Steps:**\n1. Use a dummy node to handle `left=1`.\n2. Reach the node at position `left - 1` (let's call it `pre`).\n3. Reach the node at position `left` (let's call it `start`).\n4. Perform standard reversal for `right - left` times using a `curr` pointer starting from `start.next`.\n5. Reconnect carefully.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given the head of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.",
            sampleInput: "head = [1,2,3,4,5], left = 2, right = 4",
            sampleOutput: "[1,4,3,2,5]",
            constraints: "Number of nodes is `n`. 1 <= n <= 500. 1 <= left <= right <= n.",
            starterCode: "/**\n * @param {ListNode} head\n * @param {number} left\n * @param {number} right\n * @return {ListNode}\n */\nvar reverseBetween = function(head, left, right) {\n    \n};",
            tags: ["Linked List"]
        }
    },
    {
        title: "Partition List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Partition a linked list such that all nodes less than x come before nodes greater than or equal to x.",
            explanation: "### Partition List\n\n**Concept:** Two Chain Merge\n\n**Intuition:**\nMaintain two separate linked lists: `before` (for values `< x`) and `after` (for values `>= x`). Maintain the original relative order.\n\n**Steps:**\n1. Initialize two dummy heads: `beforeHead` and `afterHead`.\n2. Iterate through the original list.\n3. If `val < x`, attach to the `before` chain. Else, attach to the `after` chain.\n4. Connect the tail of `before` to the head of `after`.\n5. Ensure the tail of `after` points to `null`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(1)",
            problemStatement: "Given the head of a linked list and a value `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x`. You should preserve the original relative order of the nodes in each of the two partitions.",
            sampleInput: "head = [1,4,3,2,5,2], x = 3",
            sampleOutput: "[1,2,2,4,3,5]",
            constraints: "Number of nodes is in range [0, 200]. -100 <= val <= 100. -200 <= x <= 200.",
            starterCode: "/**\n * @param {ListNode} head\n * @param {number} x\n * @return {ListNode}\n */\nvar partition = function(head, x) {\n    \n};",
            tags: ["Linked List", "Two Pointers"]
        }
    },
    {
        title: "Swap Nodes in Pairs",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Swap every two adjacent nodes in a linked list.",
            explanation: "### Swap Nodes in Pairs\n\n**Concept:** Recursive or Iterative Pointer Re-linking\n\n**Intuition:**\nA pair `(1, 2)` should become `(2, 1)`. The new tail `1` must now point to the head of the *next* swapped pair.\n\n**Recursive Approach:**\n1. Base case: If 0 or 1 node left, return `head`.\n2. `nextPairHead = head.next.next`.\n3. `newHead = head.next`.\n4. `newHead.next = head`.\n5. `head.next = swapPairs(nextPairHead)`.\n6. Return `newHead`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n) recursive stack, O(1) iterative.",
            problemStatement: "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)",
            sampleInput: "head = [1,2,3,4]",
            sampleOutput: "[2,1,4,3]",
            constraints: "Nodes in range [0, 100].",
            starterCode: "/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar swapPairs = function(head) {\n    \n};",
            tags: ["Linked List", "Recursion"]
        }
    },
    {
        title: "Linked List Components",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "Count the number of connected components in the linked list that are also in the given set.",
            explanation: "### LL Components\n\n**Concept:** HashSet + Linear Scan\n\n**Intuition:**\nA 'component' is a contiguous segment of nodes in the Linked List where every node's value exists in the set `G`.\n\n**Steps:**\n1. Convert the array `G` into a `Set` for O(1) lookups.\n2. Iterate through the list.\n3. Increment count ONLY when you see a node that is in `G` AND (the next node is NOT in `G` OR the current node is the tail).\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(m) where m is size of G.",
            problemStatement: "We are given `head`, the head node of a linked list containing unique integer values. We are also given the list `nums`, a subset of the values in the linked list. Return the number of connected components in `nums`, where two values are connected if they appear consecutively in the linked list.",
            sampleInput: "head = [0,1,2,3], nums = [0,1,3]",
            sampleOutput: "2 (Components: [0,1] and [3])",
            constraints: "n in [1, 10^4]. m in [1, n].",
            starterCode: "/**\n * @param {ListNode} head\n * @param {number[]} nums\n * @return {number}\n */\nvar numComponents = function(head, nums) {\n    \n};",
            tags: ["Array", "Hash Table", "Linked List"]
        }
    },
    {
        title: "Next Greater Node In Linked List",
        difficulty: "Medium",
        level: "Intermediate",
        content: {
            description: "For each node, find the value of the next node that is strictly larger.",
            explanation: "### Next Greater Node\n\n**Concept:** Monotonic Stack\n\n**Intuition:**\nFinding the 'next greater' for an array is a classic stack problem. Since we can't easily traverse backwards in a LL, we first convert to an array or store results in an array.\n\n**Steps:**\n1. Convert the Linked List values into an array `vals`.\n2. Initialize `res` array with zeros and an empty `stack` (to store indices).\n3. Iterate through `vals`:\n   - While `stack` is not empty and `vals[i] > vals[stack.top()]`:\n     - We found the next greater for the index on stack. \n     - `res[pop()] = vals[i]`.\n   - Push current index `i` onto stack.\n4. Return `res`.\n\n**Time Complexity:** O(n)\n**Space Complexity:** O(n)",
            problemStatement: "You are given the `head` of a linked list with `n` nodes. For each node in the list, find the value of the **next greater node**. If a node does not have a next greater node, the value is `0`.",
            sampleInput: "head = [2,7,4,3,5]",
            sampleOutput: "[7,0,5,5,0]",
            constraints: "Number of nodes is `n`. 1 <= n <= 10^4. 1 <= Node.val <= 10^9.",
            starterCode: "/**\n * @param {ListNode} head\n * @return {number[]}\n */\nvar nextLargerNodes = function(head) {\n    \n};",
            tags: ["Array", "Linked List", "Stack", "Monotonic Stack"]
        }
    }
];

const seedLinkedListBatch4 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existingTitles = await Topic.find({
            isCoreCS: true,
            subject: 'DSA',
            topicGroup: 'Linked Lists'
        }).distinct('title');

        const filteredQuestions = batch4LinkedListQuestions.filter(q => !existingTitles.includes(q.title));

        if (filteredQuestions.length === 0) {
            console.log('All Batch 4 Linked List questions already exist. Skipping.');
        } else {
            const topicsToInsert = filteredQuestions.map(q => ({
                ...q,
                subject: 'DSA',
                topicGroup: 'Linked Lists',
                isCoreCS: true,
                lessonType: 'practice'
            }));

            await Topic.insertMany(topicsToInsert);
            console.log(`Successfully seeded ${filteredQuestions.length} new Linked List questions (Batch 4).`);
        }

        mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seedLinkedListBatch4();
