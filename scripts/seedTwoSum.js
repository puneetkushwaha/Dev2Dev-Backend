const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const twoSumProblem = {
    title: "Two Sum",
    level: "Beginner",
    difficulty: "Easy",
    subject: "DSA",
    topicGroup: "Array",
    isCoreCS: true,
    lessonType: "practice",
    content: {
        description: "Find two numbers in an array that add up to a specific target.",
        problemStatement: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

&nbsp;

### Example 1:
**Input:** \`nums = [2,7,11,15], target = 9\`
**Output:** \`[0,1]\`
**Explanation:** Because \`nums[0] + nums[1] == 9\`, we return \`[0, 1]\`.

### Example 2:
**Input:** \`nums = [3,2,4], target = 6\`
**Output:** \`[1,2]\`

### Example 3:
**Input:** \`nums = [3,3], target = 6\`
**Output:** \`[0,1]\`

&nbsp;

### Constraints:
* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
* **Only one valid answer exists.**`,
        inputFormat: "An array of integers 'nums' and an integer 'target'.",
        outputFormat: "An array of two indices [i, j].",
        sampleInput: "nums = [2,7,11,15], target = 9",
        sampleOutput: "[0,1]",
        constraints: "2 <= nums.length <= 10^4",
        starterCode: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
        starterCodes: {
            javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
            python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ",
            java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};",
            c: "/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    \n}"
        },
        testCases: [
            { input: "[2,7,11,15], 9", expected: "[0,1]", description: "Standard case" },
            { input: "[3,2,4], 6", expected: "[1,2]", description: "Target at indices 1 and 2" },
            { input: "[3,3], 6", expected: "[0,1]", description: "Duplicate elements" }
        ],
        tags: ["Array", "Hash Table"]
    }
};

const seedTwoSum = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const existing = await Topic.findOne({ title: "Two Sum", subject: "DSA" });
        if (existing) {
            console.log('Problem "Two Sum" already exists. Updating...');
            await Topic.findByIdAndUpdate(existing._id, twoSumProblem);
        } else {
            await new Topic(twoSumProblem).save();
            console.log('Successfully seeded "Two Sum" problem.');
        }

        mongoose.connection.close();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedTwoSum();
