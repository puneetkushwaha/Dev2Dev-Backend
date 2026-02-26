const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '18. 4Sum',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Sorting',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find all unique quadruplets in an array that sum to a target value.",
        problemStatement: [
            '## 18. 4Sum',
            '',
            'Given an array `nums` of `n` integers, return an array of all the **unique** quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that:',
            '',
            '* `0 <= a, b, c, d < n`',
            '* `a`, `b`, `c`, and `d` are **distinct**.',
            '* `nums[a] + nums[b] + nums[c] + nums[d] == target`',
            '',
            'You may return the answer in **any order**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [1,0,-1,0,-2,2], target = 0',
            '**Output:** [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]',
            '',
            '### Example 2:',
            '**Input:** nums = [2,2,2,2,2], target = 8',
            '**Output:** [[2,2,2,2]]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 200`',
            '* `-10^9 <= nums[i] <= 10^9`',
            '* `-10^9 <= target <= 10^9`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @param {number} target',
            ' * @return {number[][]}',
            ' */',
            'var fourSum = function(nums, target) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,0,-1,0,-2,2], 0',
                expected: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]',
                description: 'Multiple quadruplets.'
            },
            {
                input: '[2,2,2,2,2], 8',
                expected: '[[2,2,2,2]]',
                description: 'Duplicate values in array.'
            }
        ],
        tags: ['Array', 'Two Pointers', 'Sorting'],
        hints: [
            "Sort the array first. This will allow you to skip duplicate elements and use a two-pointer approach.",
            "Use two nested loops to fix the first two numbers (a and b), then use two pointers (left and right) for the remaining array to find c and d."
        ]
    }
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/develevate').then(async () => {
    console.log('Connected to MongoDB');
    const existing = await Topic.findOne({ title: problem.title, subject: 'DSA' });
    if (existing) {
        await Topic.findByIdAndUpdate(existing._id, problem);
        console.log('Updated:', problem.title);
    } else {
        await new Topic(problem).save();
        console.log('Added:', problem.title);
    }
    mongoose.connection.close();
}).catch(e => { console.error(e); process.exit(1); });
