const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problemData = {
    title: "3. Container With Most Water",
    difficulty: "Medium",
    subject: "DSA",
    topicGroup: "Arrays",
    lessonType: "practice",
    level: "Intermediate",
    isCoreCS: true,
    content: {
        problemStatement: "You are given an integer array **height** of length **n**. There are **n** vertical lines drawn such that the two endpoints of the **ith** line are **(i, 0)** and **(i, height[i])**.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn *the maximum amount of water a container can store*.\n\n**Notice** that you may not slant the container.",
        inputFormat: "height = [array of integers]",
        outputFormat: "integer (max area)",
        sampleInput: "height = [1,8,6,2,5,4,8,3,7]",
        sampleOutput: "49",
        constraints: "- n == height.length\n- 2 <= n <= 10^5\n- 0 <= height[i] <= 10^4",
        starterCode: "/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    // Write your code here\n};",
        testCases: [
            {
                input: "[1,8,6,2,5,4,8,3,7]",
                expected: "49",
                description: "Example 1: Standard case"
            },
            {
                input: "[1,1]",
                expected: "1",
                description: "Example 2: Minimum length"
            }
        ],
        tags: ["Array", "Two Pointers", "Greedy"],
        keyPoints: [
            "If you simulate the problem, it will be O(n^2) which is not efficient.",
            "Try to use two-pointers. Set one pointer to the left and one to the right of the array. Always move the pointer that points to the lower line.",
            "How can you calculate the amount of water at each step? The area is determined by the shorter line and the distance between the two lines."
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
