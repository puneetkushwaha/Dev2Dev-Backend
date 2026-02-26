const mongoose = require('mongoose');
require('dotenv').config();
const Topic = require('./models/Topic');

const problem = {
    title: "1. Two Sum",
    difficulty: "Easy",
    isCoreCS: true,
    subject: "DSA",
    topicGroup: "Arrays",
    lessonType: "practice",
    content: {
        problemStatement: `Given an array of integers **nums** and an integer **target**, return *indices of the two numbers such that they add up to target*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:
**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].

### Example 2:
**Input:** nums = [3,2,4], target = 6
**Output:** [1,2]

### Example 3:
**Input:** nums = [3,3], target = 6
**Output:** [0,1]`,
        inputFormat: "nums = [array of integers], target = integer",
        outputFormat: "[index1, index2]",
        sampleInput: "nums = [2,7,11,15], target = 9",
        sampleOutput: "[0,1]",
        constraints: "- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Only one valid answer exists.",
        starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
};`,
        testCases: [
            {
                input: "[2,7,11,15], 9",
                expected: "[0,1]",
                description: "Basic case"
            },
            {
                input: "[3,2,4], 6",
                expected: "[1,2]",
                description: "Middle case"
            },
            {
                input: "[3,3], 6",
                expected: "[0,1]",
                description: "Duplicate elements"
            }
        ],
        tags: ["Array", "Hash Table"],
        keyPoints: [
            "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions just for completeness. It is from these brute force solutions that you can come up with optimizations.",
            "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
            "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
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
