const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problemData = {
    title: "2. Median of Two Sorted Arrays",
    difficulty: "Hard",
    subject: "DSA",
    topicGroup: "Arrays",
    lessonType: "practice",
    level: "Advanced",
    isCoreCS: true,
    content: {
        problemStatement: "Given two sorted arrays **nums1** and **nums2** of size **m** and **n** respectively, return *the median of the two sorted arrays*.\n\nThe overall run time complexity should be **O(log (m+n))**.",
        inputFormat: "nums1 = [array of integers], nums2 = [array of integers]",
        outputFormat: "float (median)",
        sampleInput: "nums1 = [1,3], nums2 = [2]",
        sampleOutput: "2.00000",
        constraints: "- nums1.length == m\n- nums2.length == n\n- 0 <= m <= 1000\n- 0 <= n <= 1000\n- 1 <= m + n <= 2000\n- -10^6 <= nums1[i], nums2[i] <= 10^6",
        starterCode: "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    // Write your code here\n};",
        testCases: [
            {
                input: "[1,3], [2]",
                expected: "2.0",
                description: "Example 1: Odd total length"
            },
            {
                input: "[1,2], [3,4]",
                expected: "2.5",
                description: "Example 2: Even total length"
            }
        ],
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        keyPoints: [
            "Binary Search on the shorter array is the key to achieving O(log(min(m, n))).",
            "We need to find a partition such that the left half has roughly the same number of elements as the right half, and all elements on the left are less than or equal to all elements on the right.",
            "Handle edge cases where one or both arrays could be empty or have single elements."
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
