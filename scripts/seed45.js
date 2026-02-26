const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '45. Jump Game II',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Greedy',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the minimum number of jumps to reach the end of an array.",
        problemStatement: [
            '## 45. Jump Game II',
            '',
            'You are given a **0-indexed** array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.',
            '',
            'Each element `nums[i]` represents the maximum length of a forward jump from index `i`. In other words, if you are at `nums[i]`, you can jump to any `nums[i + j]` where:',
            '',
            '* `0 <= j <= nums[i]` and',
            '* `i + j < n`',
            '',
            'Return the minimum number of jumps to reach `nums[n - 1]`. The test cases are generated such that you can reach `nums[n - 1]`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [2,3,1,1,4]',
            '**Output:** 2',
            '**Explanation:** The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.',
            '',
            '### Example 2:',
            '**Input:** nums = [2,3,0,1,4]',
            '**Output:** 2',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^4`',
            '* `0 <= nums[i] <= 1000`',
            '* It\'s guaranteed that you can reach `nums[n - 1]`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number}',
            ' */',
            'var jump = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[2,3,1,1,4]',
                expected: '2',
                description: 'Optimal path skips some indices.'
            },
            {
                input: '[2,3,0,1,4]',
                expected: '2',
                description: 'Must jump over the zero.'
            }
        ],
        tags: ['Array', 'Dynamic Programming', 'Greedy'],
        hints: [
            "Use a greedy approach: keep track of the farthest index you can reach with the current number of jumps.",
            "When you reach the end of the current jump's range, increment your jump count and update the boundary to the farthest index you've discovered."
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
