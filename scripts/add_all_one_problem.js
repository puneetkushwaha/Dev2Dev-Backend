const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problem = {
    title: "10. All O`one Data Structure",
    difficulty: "Hard",
    isCoreCS: true,
    subject: "DSA",
    topicGroup: "Design",
    lessonType: "practice",
    level: "Advanced",
    content: {
        problemStatement: `Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the **AllOne** class:

- **AllOne()** Initializes the object of the data structure.
- **inc(String key)** Increments the count of the string \`key\` by 1. If \`key\` does not exist in the data structure, insert it with count 1.
- **dec(String key)** Decrements the count of the string \`key\` by 1. If the count of \`key\` is 0 after the decrement, remove it from the data structure. It is guaranteed that \`key\` exists in the data structure before the decrement.
- **getMaxKey()** Returns one of the keys with the maximal count. If no element exists, return an empty string "".
- **getMinKey()** Returns one of the keys with the minimum count. If no element exists, return an empty string "".

**Note** that each function must run in **O(1)** average time complexity.

### Example 1:
**Input**
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]

**Output**
[null, null, null, "hello", "hello", null, "hello", "leet"]

**Explanation**
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"`,
        inputFormat: "Sequence of method calls and arguments",
        outputFormat: "Sequence of return values",
        sampleInput: '["AllOne", "inc", "inc", "getMaxKey", "getMinKey"]',
        sampleOutput: '[null, null, null, "hello", "hello"]',
        constraints: "- 1 <= key.length <= 10\n- key consists of lowercase English letters.\n- It is guaranteed that for each call to dec, key is existing in the data structure.\n- At most 5 * 10^4 calls will be made to inc, dec, getMaxKey, and getMinKey.",
        starterCode: `/**
 * Initializes your data structure here.
 */
var AllOne = function() {
    // Write your constructor here
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function(key) {
    // Write your code here
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function(key) {
    // Write your code here
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
    // Write your code here
};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {
    // Write your code here
};

/** 
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */`,
        testCases: [
            {
                input: '["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"] \\n [[], ["hello"], ["hello"], [], [], ["leet"], [], []]',
                expected: '[null, null, null, "hello", "hello", null, "hello", "leet"]',
                description: "Standard increment and min/max check"
            }
        ],
        tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
        keyPoints: [
            "Use a Hash Map to store key -> node mapping for O(1) access.",
            "Use a Doubly Linked List to maintain the order of counts.",
            "Each node in the list represents a specific count and contains a set of keys with that count.",
            "When a count changes, move the key to the adjacent node in the list (or create one)."
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
