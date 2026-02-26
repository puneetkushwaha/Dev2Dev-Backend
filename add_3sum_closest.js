const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problemData = {
    title: "6. 3Sum Closest",
    difficulty: "Medium",
    subject: "DSA",
    topicGroup: "Arrays",
    lessonType: "practice",
    level: "Intermediate",
    isCoreCS: true,
    content: {
        problemStatement: "Given an integer array **nums** of length **n** and an integer **target**, find three integers at distinct indices in **nums** such that the sum is closest to **target**.\n\nReturn *the sum of the three integers*.\n\nYou may assume that each input would have exactly one solution.",
        inputFormat: "nums = [array of integers], target = integer",
        outputFormat: "integer (sum)",
        sampleInput: "nums = [-1,2,1,-4], target = 1",
        sampleOutput: "2",
        constraints: "- 3 <= nums.length <= 500\n- -1000 <= nums[i] <= 1000\n- -10^4 <= target <= 10^4",
        starterCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar threeSumClosest = function(nums, target) {\n    // Write your code here\n};",
        testCases: [
            {
                input: "[-1,2,1,-4], 1",
                expected: "2",
                description: "Example 1"
            },
            {
                input: "[0,0,0], 1",
                expected: "0",
                description: "Example 2"
            }
        ],
        tags: ["Array", "Two Pointers", "Sorting"],
        keyPoints: [
            "Similar to 3Sum, sorting the array helps in using the two-pointer approach efficiently.",
            "Initialize a variable to store the closest sum found so far. For each element *i*, use two pointers *j* and *k* to narrow down the search.",
            "Update the closest sum if the absolute difference between the current sum and the target is smaller than the smallest difference seen so far."
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
