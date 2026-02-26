const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '34. Find First and Last Position of Element in Sorted Array',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Binary Search',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the starting and ending position of a given target value in a sorted array.",
        problemStatement: [
            '## 34. Find First and Last Position of Element in Sorted Array',
            '',
            'Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.',
            '',
            'If `target` is not found in the array, return `[-1, -1]`.',
            '',
            'You must write an algorithm with `O(log n)` runtime complexity.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [5,7,7,8,8,10], target = 8',
            '**Output:** [3,4]',
            '',
            '### Example 2:',
            '**Input:** nums = [5,7,7,8,8,10], target = 6',
            '**Output:** [-1,-1]',
            '',
            '### Example 3:',
            '**Input:** nums = [], target = 0',
            '**Output:** [-1,-1]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= nums.length <= 10^5`',
            '* `-10^9 <= nums[i] <= 10^9`',
            '* `nums` is a non-decreasing array.',
            '* `-10^9 <= target <= 10^9`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @param {number} target',
            ' * @return {number[]}',
            ' */',
            'var searchRange = function(nums, target) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[5,7,7,8,8,10], 8',
                expected: '[3,4]',
                description: 'Target exists multiple times.'
            },
            {
                input: '[5,7,7,8,8,10], 6',
                expected: '[-1,-1]',
                description: 'Target does not exist.'
            }
        ],
        tags: ['Array', 'Binary Search'],
        hints: [
            "Use binary search twice: once to find the leftmost occurence, and once to find the rightmost occurence."
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
