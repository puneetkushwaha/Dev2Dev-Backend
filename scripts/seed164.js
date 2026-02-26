const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '164. Maximum Gap',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Sorting',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Return the maximum difference between two successive elements in a sorted array.",
        problemStatement: [
            '## 164. Maximum Gap',
            '',
            'Given an integer array `nums`, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return `0`.',
            '',
            'You must write an algorithm that runs in linear time and uses linear extra space.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [3,6,9,1]',
            '**Output:** 3',
            '**Explanation:** The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.',
            '',
            '### Example 2:',
            '**Input:** nums = [10]',
            '**Output:** 0',
            '**Explanation:** The array contains less than 2 elements, therefore return 0.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^5`',
            '* `0 <= nums[i] <= 10^9`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number}',
            ' */',
            'var maximumGap = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[3,6,9,1]',
                expected: '3',
                description: 'Typical array with multiple gaps.'
            },
            {
                input: '[10]',
                expected: '0',
                description: 'Single element array.'
            }
        ],
        tags: ['Array', 'Sorting', 'Bucket Sort', 'Radix Sort'],
        hints: [
            "We can use a bucket-sort like algorithm.",
            "The maximum gap will be no smaller than ceil((max - min) / (N - 1)).",
            "Put numbers into buckets of size equal to the minimum possible maximum gap.",
            "The maximum gap will always occur between two different buckets."
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
