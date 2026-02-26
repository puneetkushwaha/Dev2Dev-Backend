const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '209. Minimum Size Subarray Sum',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Sliding Window',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the minimal length of a subarray whose sum is greater than or equal to the target.",
        problemStatement: [
            '## 209. Minimum Size Subarray Sum',
            '',
            '**Difficulty:** Medium | **Topics:** Array, Binary Search, Sliding Window, Prefix Sum',
            '',
            'Given an array of positive integers `nums` and a positive integer `target`, return the **minimal length** of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: target = 7, nums = [2,3,1,2,4,3]',
            'Output: 2',
            'Explanation: The subarray [4,3] has the minimal length under the problem constraint.',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: target = 4, nums = [1,4,4]',
            'Output: 1',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: target = 11, nums = [1,1,1,1,1,1,1,1]',
            'Output: 0',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= target <= 10^9`',
            '* `1 <= nums.length <= 10^5`',
            '* `1 <= nums[i] <= 10^4`',
            '',
            '---',
            '',
            '### 💡 Follow up:',
            '> If you have figured out the `O(n)` solution, try coding another solution of which the time complexity is `O(n log(n))`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} target',
            ' * @param {number[]} nums',
            ' * @return {number}',
            ' */',
            'var minSubArrayLen = function(target, nums) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '7, "[2,3,1,2,4,3]"', expected: '2', description: 'Standard case' },
            { input: '4, "[1,4,4]"', expected: '1', description: 'Single element satisfies target' },
            { input: '11, "[1,1,1,1,1,1,1,1]"', expected: '0', description: 'Sum of all elements is still less than target' },
        ],
        tags: ['Array', 'Binary Search', 'Sliding Window', 'Prefix Sum'],
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
