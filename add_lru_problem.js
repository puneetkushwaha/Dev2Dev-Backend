const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problemData = {
    title: "8. LRU Cache",
    difficulty: "Medium",
    subject: "DSA",
    topicGroup: "Design",
    lessonType: "practice",
    level: "Intermediate",
    isCoreCS: true,
    content: {
        problemStatement: "Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the **LRUCache** class:\n\n- **LRUCache(int capacity)** Initialize the LRU cache with positive size **capacity**.\n- **int get(int key)** Return the value of the **key** if the key exists, otherwise return **-1**.\n- **void put(int key, int value)** Update the value of the **key** if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the **capacity** from this operation, **evict** the least recently used key.\n\nThe functions **get** and **put** must each run in **O(1)** average time complexity.",
        inputFormat: "Methods: LRUCache, get, put",
        outputFormat: "As specified in methods",
        sampleInput: "[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]",
        sampleOutput: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        constraints: "- 1 <= capacity <= 3000\n- 0 <= key <= 10^4\n- 0 <= value <= 10^5\n- At most 2 * 10^5 calls will be made to **get** and **put**.",
        starterCode: "/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n    \n};\n\n/** \n * @param {number} key\n * @return {number}\n */\nLRUCache.prototype.get = function(key) {\n    \n};\n\n/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */\nLRUCache.prototype.put = function(key, value) {\n    \n};",
        testCases: [
            {
                input: "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]",
                expected: "[null,null,null,1,null,-1,null,-1,3,4]",
                description: "Standard LRU operations"
            }
        ],
        tags: ["Hash Table", "Linked List", "Design", "Doubly-Linked List"],
        keyPoints: [
            "Use a Hash Map to store the key and the node reference for O(1) access.",
            "Use a Doubly Linked List to maintain the order of elements for O(1) eviction and updates.",
            "The most recently used element should be moved to the head, and the least recently used element will be at the tail.",
            "Handle capacity carefully during the 'put' operation."
        ]
    }
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const existing = await Topic.findOne({ title: problemData.title });
        if (existing) {
            console.log("Problem already exists. Updating...");
            await Topic.updateOne({ _id: existing._id }, problemData);
        } else {
            const newTopic = new Topic(problemData);
            await newTopic.save();
            console.log("Problem added successfully!");
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
