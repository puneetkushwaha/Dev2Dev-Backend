const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '347. Top K Frequent Elements',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Hash Table',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Return the k most frequent elements in an array.",
        problemStatement: [
            '## 347. Top K Frequent Elements',
            '',
            'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [1,1,1,2,2,3], k = 2',
            '**Output:** [1,2]',
            '',
            '### Example 2:',
            '**Input:** nums = [1], k = 1',
            '**Output:** [1]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^5`',
            '* `-10^4 <= nums[i] <= 10^4`',
            '* `k` is in the range `[1, the number of unique elements in the array]`.',
            '* It is **guaranteed** that the answer is **unique**.',
            '',
            '---',
            '',
            '**Follow up:** Your algorithm\'s time complexity must be better than `O(n log n)`, where n is the array\'s size.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @param {number} k',
            ' * @return {number[]}',
            ' */',
            'var topKFrequent = function(nums, k) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,1,1,2,2,3], 2',
                expected: '[1,2]',
                description: 'Multiple elements with different frequencies.'
            },
            {
                input: '[1], 1',
                expected: '[1]',
                description: 'Single element.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Sorting', 'Heap (Priority Queue)', 'Bucket Sort', 'Counting', 'Quickselect'],
        hints: [
            "Use a Hash Table to count frequencies.",
            "Use Bucket Sort where the index represents frequency to achieve O(N) time complexity.",
            "You can also use a priority queue of size k to keep the top elements."
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
