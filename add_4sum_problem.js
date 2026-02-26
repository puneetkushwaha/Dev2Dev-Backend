const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problemData = {
    title: "7. 4Sum",
    difficulty: "Medium",
    subject: "DSA",
    topicGroup: "Arrays",
    lessonType: "practice",
    level: "Intermediate",
    isCoreCS: true,
    content: {
        problemStatement: "Given an array **nums** of **n** integers, return an array of all the **unique** quadruplets **[nums[a], nums[b], nums[c], nums[d]]** such that:\n\n- **0 <= a, b, c, d < n**\n- **a, b, c, and d** are **distinct**.\n- **nums[a] + nums[b] + nums[c] + nums[d] == target**\n\nYou may return the answer in any order.",
        inputFormat: "nums = [array of integers], target = integer",
        outputFormat: "array of arrays [quadruplets]",
        sampleInput: "nums = [1,0,-1,0,-2,2], target = 0",
        sampleOutput: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]",
        constraints: "- 1 <= nums.length <= 200\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9",
        starterCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[][]}\n */\nvar fourSum = function(nums, target) {\n    // Write your code here\n};",
        testCases: [
            {
                input: "[1,0,-1,0,-2,2], 0",
                expected: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]",
                description: "Example 1"
            },
            {
                input: "[2,2,2,2,2], 8",
                expected: "[[2,2,2,2]]",
                description: "Example 2"
            }
        ],
        tags: ["Array", "Two Pointers", "Sorting"],
        keyPoints: [
            "If we fix two numbers nums[i] and nums[j], we are left with the two-sum problem for the remaining target: target - (nums[i] + nums[j]).",
            "Sorting the array is essential to efficiently skip duplicates and use the two-pointer approach for the inner two numbers.",
            "Make sure to handle the cases where pointers i and j are skipped to avoid duplicate quadruplets in the result set."
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
