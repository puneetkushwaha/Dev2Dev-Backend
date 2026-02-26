const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '80. Remove Duplicates from Sorted Array II',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Array',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: 'Remove duplicates in-place so each unique element appears at most twice.',
        problemStatement: [
            '## 80. Remove Duplicates from Sorted Array II',
            '',
            '**Difficulty:** Medium | **Topics:** Array, Two Pointers',
            '',
            'Given an integer array `nums` sorted in non-decreasing order, remove some duplicates **in-place** such that each unique element appears **at most twice**. The relative order of the elements should be kept the same.',
            '',
            'Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the **first k elements** of `nums` should hold the final result.',
            '',
            'Return `k` after placing the final result in the first `k` slots of `nums`.',
            '',
            '> Do not allocate extra space for another array. You must do this by modifying the input array **in-place** with `O(1)` extra memory.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input:  nums = [1,1,1,2,2,3]',
            'Output: 5, nums = [1,1,2,2,3,_]',
            'Explanation: Return k = 5, with the first five elements being 1,1,2,2,3.',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input:  nums = [0,0,1,1,1,1,2,3,3]',
            'Output: 7, nums = [0,0,1,1,2,3,3,_,_]',
            'Explanation: Return k = 7, with the first seven elements being 0,0,1,1,2,3,3.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 3 * 10^4`',
            '* `-10^4 <= nums[i] <= 10^4`',
            '* `nums` is sorted in **non-decreasing order**',
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number}',
            ' */',
            'var removeDuplicates = function(nums) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '[1,1,1,2,2,3]', expected: '5', description: 'Triple duplicate - basic case' },
            { input: '[0,0,1,1,1,1,2,3,3]', expected: '7', description: 'Multiple excess duplicates' },
            { input: '[1,1,1]', expected: '2', description: 'All same elements' },
            { input: '[1,2,3]', expected: '3', description: 'No duplicates' },
        ],
        tags: ['Array', 'Two Pointers'],
    },
};

mongoose.connect(process.env.MONGO_URI).then(async () => {
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
