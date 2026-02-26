const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '220. Contains Duplicate III',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Sorting',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find a pair of indices satisfying difference constraints on both indices and values.",
        problemStatement: [
            '## 220. Contains Duplicate III',
            '',
            'You are given an integer array `nums` and two integers `indexDiff` and `valueDiff`.',
            '',
            'Find a pair of indices `(i, j)` such that:',
            '',
            '* `i != j`',
            '* `abs(i - j) <= indexDiff`',
            '* `abs(nums[i] - nums[j]) <= valueDiff`',
            '',
            'Return `true` if such pair exists or `false` otherwise.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [1,2,3,1], indexDiff = 3, valueDiff = 0',
            '**Output:** true',
            '**Explanation:** We can choose (i, j) = (0, 3).',
            'We satisfy the three conditions:',
            'i != j --> 0 != 3',
            'abs(i - j) <= indexDiff --> abs(0 - 3) <= 3',
            'abs(nums[i] - nums[j]) <= valueDiff --> abs(1 - 1) <= 0',
            '',
            '### Example 2:',
            '**Input:** nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3',
            '**Output:** false',
            '**Explanation:** After trying all the possible pairs (i, j), we cannot satisfy the three conditions, so we return false.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `2 <= nums.length <= 10^5`',
            '* `-10^9 <= nums[i] <= 10^9`',
            '* `1 <= indexDiff <= nums.length`',
            '* `0 <= valueDiff <= 10^9`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @param {number} indexDiff',
            ' * @param {number} valueDiff',
            ' * @return {boolean}',
            ' */',
            'var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,2,3,1], 3, 0',
                expected: 'true',
                description: 'Exact duplicate within index window.'
            },
            {
                input: '[1,5,9,1,5,9], 2, 3',
                expected: 'false',
                description: 'No values within valueDiff constraint.'
            }
        ],
        tags: ['Array', 'Sliding Window', 'Sorting', 'Bucket Sort', 'Ordered Set'],
        hints: [
            "Time complexity O(n logk) - This will give an indication that sorting is involved for k elements.",
            "Use already existing state to evaluate next state - Like, a set of k sorted numbers are only needed to be tracked.",
            "Using Bucket Sort approach simplifies the O(1) checking if elements are close."
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
