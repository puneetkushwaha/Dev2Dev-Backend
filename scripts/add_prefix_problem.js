const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problemData = {
    title: "4. Longest Common Prefix",
    difficulty: "Easy",
    subject: "DSA",
    topicGroup: "Arrays",
    lessonType: "practice",
    level: "Beginner",
    isCoreCS: true,
    content: {
        problemStatement: "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string **\"\"**.",
        inputFormat: "strs = [array of strings]",
        outputFormat: "string (longest common prefix)",
        sampleInput: "strs = [\"flower\",\"flow\",\"flight\"]",
        sampleOutput: "\"fl\"",
        constraints: "- 1 <= strs.length <= 200\n- 0 <= strs[i].length <= 200\n- **strs[i]** consists of only lowercase English letters if it is non-empty.",
        starterCode: "/**\n * @param {string[]}\n * @return {string}\n */\nvar longestCommonPrefix = function(strs) {\n    // Write your code here\n};",
        testCases: [
            {
                input: "[\"flower\",\"flow\",\"flight\"]",
                expected: "\"fl\"",
                description: "Example 1: Common prefix 'fl'"
            },
            {
                input: "[\"dog\",\"racecar\",\"car\"]",
                expected: "\"\"",
                description: "Example 2: No common prefix"
            }
        ],
        tags: ["Array", "String", "Trie"],
        keyPoints: [
            "A simple way is to take the first string as the current prefix and then compare it with the next string, updating the prefix to the longest common part until you've checked all strings.",
            "Vertical scanning: Compare characters at the same index for all strings simultaneously. If a mismatch is found at index *i*, return the prefix up to *i-1*.",
            "Sorting approach: Sort the array. The longest common prefix of the entire array must be the common prefix of the first and last strings in the sorted list."
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
