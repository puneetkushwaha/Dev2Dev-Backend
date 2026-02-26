const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problemData = {
    title: "5. 3Sum",
    difficulty: "Medium",
    subject: "DSA",
    topicGroup: "Arrays",
    lessonType: "practice",
    level: "Intermediate",
    isCoreCS: true,
    content: {
        problemStatement: "Given an integer array **nums**, return all the triplets **[nums[i], nums[j], nums[k]]** such that **i != j**, **i != k**, and **j != k**, and **nums[i] + nums[j] + nums[k] == 0**.\n\nNotice that the solution set must not contain duplicate triplets.",
        inputFormat: "nums = [array of integers]",
        outputFormat: "array of arrays [triplets]",
        sampleInput: "nums = [-1,0,1,2,-1,-4]",
        sampleOutput: "[[-1,-1,2],[-1,0,1]]",
        constraints: "- 3 <= nums.length <= 3000\n- -10^5 <= nums[i] <= 10^5",
        starterCode: "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    // Write your code here\n};",
        testCases: [
            {
                input: "[-1,0,1,2,-1,-4]",
                expected: "[[-1,-1,2],[-1,0,1]]",
                description: "Example 1: Multiple triplets"
            },
            {
                input: "[0,1,1]",
                expected: "[]",
                description: "Example 2: No valid triplet"
            },
            {
                input: "[0,0,0]",
                expected: "[[0,0,0]]",
                description: "Example 3: All zeros"
            }
        ],
        tags: ["Array", "Two Pointers", "Sorting"],
        keyPoints: [
            "So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!",
            "For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y, which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
            "The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
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
