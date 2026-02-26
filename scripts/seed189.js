const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '189. Rotate Array',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Array',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: 'Rotate an array to the right by k steps in-place.',
        problemStatement: [
            '## 189. Rotate Array',
            '',
            '**Difficulty:** Medium | **Topics:** Array, Math, Two Pointers',
            '',
            'Given an integer array `nums`, rotate the array to the **right** by `k` steps, where `k` is non-negative.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input:  nums = [1,2,3,4,5,6,7], k = 3',
            'Output: [5,6,7,1,2,3,4]',
            'Explanation:',
            '  rotate 1 step  → [7,1,2,3,4,5,6]',
            '  rotate 2 steps → [6,7,1,2,3,4,5]',
            '  rotate 3 steps → [5,6,7,1,2,3,4]',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input:  nums = [-1,-100,3,99], k = 2',
            'Output: [3,99,-1,-100]',
            'Explanation:',
            '  rotate 1 step  → [99,-1,-100,3]',
            '  rotate 2 steps → [3,99,-1,-100]',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^5`',
            '* `-2^31 <= nums[i] <= 2^31 - 1`',
            '* `0 <= k <= 10^5`',
            '',
            '---',
            '',
            '### 💡 Follow Up:',
            '> Try to come up with as many solutions as you can. There are at least **three** different ways to solve this problem.',
            '> Could you do it **in-place** with `O(1)` extra space?',
            '',
            '**Hint:** Think about reversing the entire array and then reversing parts of it!',
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @param {number} k',
            ' * @return {void} Do not return anything, modify nums in-place instead.',
            ' */',
            'var rotate = function(nums, k) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '[1,2,3,4,5,6,7], 3', expected: '[5,6,7,1,2,3,4]', description: 'Standard rotation by 3' },
            { input: '[-1,-100,3,99], 2', expected: '[3,99,-1,-100]', description: 'Negative numbers rotation by 2' },
            { input: '[1,2], 1', expected: '[2,1]', description: 'Two elements' },
            { input: '[1], 0', expected: '[1]', description: 'Single element, k=0' },
            { input: '[1,2,3], 4', expected: '[3,1,2]', description: 'k greater than array length' },
        ],
        tags: ['Array', 'Math', 'Two Pointers'],
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
