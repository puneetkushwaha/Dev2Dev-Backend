const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '55. Jump Game',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Greedy',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Determine if it is possible to reach the last index of an array.",
        problemStatement: [
            '## 55. Jump Game',
            '',
            'You are given an integer array `nums`. You are initially positioned at the array\'s **first index**, and each element in the array represents your maximum jump length at that position.',
            '',
            'Return `true` if you can reach the last index, or `false` otherwise.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [2,3,1,1,4]',
            '**Output:** true',
            '**Explanation:** Jump 1 step from index 0 to 1, then 3 steps to the last index.',
            '',
            '### Example 2:',
            '**Input:** nums = [3,2,1,0,4]',
            '**Output:** false',
            '**Explanation:** You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^4`',
            '* `0 <= nums[i] <= 10^5`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {boolean}',
            ' */',
            'var canJump = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[2,3,1,1,4]',
                expected: 'true',
                description: 'End is reachable.'
            },
            {
                input: '[3,2,1,0,4]',
                expected: 'false',
                description: 'Trapped at a zero.'
            }
        ],
        tags: ['Array', 'Dynamic Programming', 'Greedy'],
        hints: [
            "Use a greedy approach: keep track of the maximum reach you can achieve at any given step.",
            "If `i > max_reach`, then you can't reach index `i`. Otherwise, `max_reach = max(max_reach, i + nums[i])`."
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
