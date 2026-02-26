const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '561. Array Partition',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Counting Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Group numbers into pairs to maximize the sum of the minimums of each pair.",
        problemStatement: [
            '## 561. Array Partition',
            '',
            'Given an integer array `nums` of `2n` integers, group these integers into `n` pairs `(a1, b1), (a2, b2), ..., (an, bn)` such that the sum of `min(ai, bi)` for all `i` is **maximized**. Return the maximized sum.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [1,4,3,2]',
            '**Output:** 4',
            '**Explanation:** All possible pairings (ignoring the ordering of elements) are:',
            '1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3',
            '2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3',
            '3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4',
            'So the maximum possible sum is 4.',
            '',
            '### Example 2:',
            '**Input:** nums = [6,2,6,5,1,2]',
            '**Output:** 9',
            '**Explanation:** The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= n <= 10^4`',
            '* `nums.length == 2 * n`',
            '* `-10^4 <= nums[i] <= 10^4`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number}',
            ' */',
            'var arrayPairSum = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,4,3,2]',
                expected: '4',
                description: 'Basic pairs.'
            },
            {
                input: '[6,2,6,5,1,2]',
                expected: '9',
                description: 'Multiple pairs requiring optimal grouping.'
            }
        ],
        tags: ['Array', 'Greedy', 'Sorting', 'Counting Sort'],
        hints: [
            "How will you make pairs to get the result? There must be some pattern.",
            "Did you observe that the minimum element gets added into the result in sacrifice of the maximum element.",
            "Sort the array and try to pair adjacent elements together."
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
