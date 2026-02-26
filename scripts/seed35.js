const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '35. Search Insert Position',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Binary Search',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given a sorted array and a target value, return the index if the target is found, or the index it would be inserted.",
        problemStatement: [
            '## 35. Search Insert Position',
            '',
            'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
            '',
            'You must write an algorithm with `O(log n)` runtime complexity.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [1,3,5,6], target = 5',
            '**Output:** 2',
            '',
            '### Example 2:',
            '**Input:** nums = [1,3,5,6], target = 2',
            '**Output:** 1',
            '',
            '### Example 3:',
            '**Input:** nums = [1,3,5,6], target = 7',
            '**Output:** 4',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^4`',
            '* `-10^4 <= nums[i] <= 10^4`',
            '* `nums` contains **distinct** values sorted in **ascending** order.',
            '* `-10^4 <= target <= 10^4`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @param {number} target',
            ' * @return {number}',
            ' */',
            'var searchInsert = function(nums, target) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,3,5,6], 5',
                expected: '2',
                description: 'Target exists in array.'
            },
            {
                input: '[1,3,5,6], 2',
                expected: '1',
                description: 'Target needs to be inserted.'
            },
            {
                input: '[1,3,5,6], 7',
                expected: '4',
                description: 'Target inserted at the end of the array.'
            }
        ],
        tags: ['Array', 'Binary Search'],
        hints: [
            "Use standard binary search. If the target is not found, the `left` pointer will represent the exact position where it should be inserted."
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
