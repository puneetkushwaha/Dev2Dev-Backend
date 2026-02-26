const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '315. Count of Smaller Numbers After Self',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Merge Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].",
        problemStatement: [
            '## 315. Count of Smaller Numbers After Self',
            '',
            'Given an integer array `nums`, return an integer array `counts` where `counts[i]` is the number of smaller elements to the right of `nums[i]`.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: nums = [5,2,6,1]',
            'Output: [2,1,1,0]',
            'Explanation:',
            'To the right of 5 there are 2 smaller elements (2 and 1).',
            'To the right of 2 there is only 1 smaller element (1).',
            'To the right of 6 there is 1 smaller element (1).',
            'To the right of 1 there is 0 smaller element.',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: nums = [-1]',
            'Output: [0]',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: nums = [-1,-1]',
            'Output: [0,0]',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^5`',
            '* `-10^4 <= nums[i] <= 10^4`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number[]}',
            ' */',
            'var countSmaller = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"[5,2,6,1]"',
                expected: '"[2,1,1,0]"',
                description: 'Standard case with unsorted numbers.'
            },
            {
                input: '"[-1]"',
                expected: '"[0]"',
                description: 'Single element array.'
            },
            {
                input: '"[-1,-1]"',
                expected: '"[0,0]"',
                description: 'Duplicate elements.'
            },
        ],
        tags: ['Array', 'Binary Search', 'Divide and Conquer', 'Binary Indexed Tree', 'Segment Tree', 'Merge Sort', 'Ordered Set'],
        hints: [
            "This problem can be solved by modifying the Merge Sort algorithm to count inversions.",
            "Consider using a Binary Indexed Tree (Fenwick Tree) or Segment Tree after coordinate compression."
        ]
    },
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
