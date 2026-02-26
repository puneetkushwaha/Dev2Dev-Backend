const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '2289. Steps to Make Array Non-decreasing',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Linked List',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the number of steps required to make an array non-decreasing by removing elements.",
        problemStatement: [
            '## 2289. Steps to Make Array Non-decreasing',
            '',
            'You are given a **0-indexed** integer array `nums`. In one step, remove all elements `nums[i]` where `nums[i - 1] > nums[i]` for all `0 < i < nums.length`.',
            '',
            'Return the number of steps performed until `nums` becomes a **non-decreasing** array.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [5,3,4,4,7,3,6,11,8,5,11]',
            '**Output:** 3',
            '**Explanation:** The following are the steps performed:',
            '- Step 1: `[5,3,4,4,7,3,6,11,8,5,11]` becomes `[5,4,4,7,6,11,11]`',
            '- Step 2: `[5,4,4,7,6,11,11]` becomes `[5,4,7,11,11]`',
            '- Step 3: `[5,4,7,11,11]` becomes `[5,7,11,11]`',
            '`[5,7,11,11]` is a non-decreasing array. Therefore, we return 3.',
            '',
            '### Example 2:',
            '**Input:** nums = [4,5,7,7,13]',
            '**Output:** 0',
            '**Explanation:** `nums` is already a non-decreasing array. Therefore, we return 0.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^5`',
            '* `1 <= nums[i] <= 10^9`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number}',
            ' */',
            'var totalSteps = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[5,3,4,4,7,3,6,11,8,5,11]',
                expected: '3',
                description: 'Needs multiple steps of removal.'
            },
            {
                input: '[4,5,7,7,13]',
                expected: '0',
                description: 'Already non-decreasing.'
            }
        ],
        tags: ['Array', 'Linked List', 'Dynamic Programming', 'Stack', 'Monotonic Stack', 'Simulation'],
        hints: [
            "Notice that an element will be removed if and only if there exists a strictly greater element to the left of it.",
            "Use a stack of the indices. While processing element nums[i], remove from the stack all the indices of elements that are smaller than nums[i].",
            "Maintain an array `dp` to hold the maximum number of rounds for all elements."
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
