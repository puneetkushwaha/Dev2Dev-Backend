const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problem = {
    title: "9. Flatten a Multilevel Doubly Linked List",
    difficulty: "Medium",
    isCoreCS: true,
    subject: "DSA",
    topicGroup: "Linked List",
    lessonType: "practice",
    level: "Intermediate",
    content: {
        problemStatement: `You are given a doubly linked list, which contains nodes that have a **next** pointer, a **previous** pointer, and an additional **child** pointer. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure.

Given the head of the first level of the list, **flatten the list** so that all the nodes appear in a single-level, doubly linked list. Let \`curr\` be a node with a child list. The nodes in the child list should appear after \`curr\` and before \`curr.next\` in the flattened list.

Return the *head of the flattened list*. The nodes in the list must have all of their child pointers set to **null**.

### Example 1:
**Input:** head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
**Output:** [1,2,3,7,8,11,12,9,10,4,5,6]
**Explanation:** The multilevel linked list in the input is shown.
After flattening the multilevel linked list it becomes:
[1,2,3,7,8,11,12,9,10,4,5,6]

### Example 2:
**Input:** head = [1,2,null,3]
**Output:** [1,3,2]

### Example 3:
**Input:** head = []
**Output:** []`,
        inputFormat: "head = [multilevel list serialization]",
        outputFormat: "[flattened list serialization]",
        sampleInput: "head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]",
        sampleOutput: "[1,2,3,7,8,11,12,9,10,4,5,6]",
        constraints: "- The number of Nodes will not exceed 1000.\n- 1 <= Node.val <= 10^5",
        starterCode: `/**
 * // Definition for a _Node.
 * function _Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var flatten = function(head) {
    if (!head) return head;
    
    let curr = head;
    while (curr) {
        if (curr.child) {
            let next = curr.next;
            let child = flatten(curr.child);
            
            curr.next = child;
            child.prev = curr;
            curr.child = null;
            
            let tail = child;
            while (tail.next) {
                tail = tail.next;
            }
            
            tail.next = next;
            if (next) next.prev = tail;
        }
        curr = curr.next;
    }
    
    return head;
};`,
        testCases: [
            {
                input: "[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]",
                expected: "[1,2,3,7,8,11,12,9,10,4,5,6]",
                description: "Multilevel list with nested children"
            },
            {
                input: "[1,2,null,3]",
                expected: "[1,3,2]",
                description: "Simple multilevel list"
            },
            {
                input: "[]",
                expected: "[]",
                description: "Empty list"
            }
        ],
        tags: ["Linked List", "Depth-First Search", "Doubly-Linked List"],
        keyPoints: [
            "Use Recursion or a Stack to handle child pointers.",
            "When you encounter a node with a child, solve the sub-structure first.",
            "Remember to reconnect the original next node to the end of the flattened child list.",
            "Ensure all child pointers are set to null in the final result."
        ]
    }
};

const addProblem = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const existing = await Topic.findOne({ title: problem.title });
        if (existing) {
            console.log("Problem already exists. Updating...");
            await Topic.updateOne({ title: problem.title }, { $set: problem });
        } else {
            const newTopic = new Topic(problem);
            await newTopic.save();
            console.log("Problem added successfully!");
        }

        process.exit();
    } catch (error) {
        console.error("Error adding problem:", error);
        process.exit(1);
    }
};

addProblem();
