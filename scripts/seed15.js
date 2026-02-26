const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '15. 3Sum',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Two Pointers',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find all unique triplets in an array that sum up to zero.",
        problemStatement: [
            '## 15. 3Sum',
            '',
            '**Difficulty:** Medium | **Topics:** Array, Two Pointers, Sorting',
            '',
            'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.',
            '',
            '> Notice that the solution set must **not** contain duplicate triplets.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: nums = [-1,0,1,2,-1,-4]',
            'Output: [[-1,-1,2],[-1,0,1]]',
            'Explanation: ',
            'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.',
            'nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.',
            'nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.',
            'The distinct triplets are [-1,0,1] and [-1,-1,2].',
            'Notice that the order of the output and the order of the triplets does not matter.',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: nums = [0,1,1]',
            'Output: []',
            'Explanation: The only possible triplet does not sum up to 0.',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: nums = [0,0,0]',
            'Output: [[0,0,0]]',
            'Explanation: The only possible triplet sums up to 0.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `3 <= nums.length <= 3000`',
            '* `-10^5 <= nums[i] <= 10^5`',
            '',
            '---',
            '',
            '### 💡 Hints:',
            '> 1. So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!',
            '> 2. For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y, which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?',
            '> 3. The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number[][]}',
            ' */',
            'var threeSum = function(nums) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '"[-1,0,1,2,-1,-4]"', expected: '"[[-1,-1,2],[-1,0,1]]"', description: 'Standard case with multiple triplets' },
            { input: '"[0,1,1]"', expected: '"[]"', description: 'No valid triplets' },
            { input: '"[0,0,0]"', expected: '"[[0,0,0]]"', description: 'All zeros' },
        ],
        tags: ['Array', 'Two Pointers', 'Sorting'],
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
