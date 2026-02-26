const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '3737. Count Subarrays With Majority Element I',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Merge Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given an integer array nums and an integer target, return the number of subarrays in which target is the majority element.",
        problemStatement: [
            '## 3737. Count Subarrays With Majority Element I',
            '',
            'You are given an integer array `nums` and an integer `target`.',
            '',
            'Return the number of **subarrays** of `nums` in which `target` is the **majority element**.',
            '',
            'The **majority element** of a subarray is the element that appears **strictly more than half** of the times in that subarray.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: nums = [1,2,2,3], target = 2',
            'Output: 5',
            'Explanation:',
            'Valid subarrays with target = 2 as the majority element:',
            'nums[1..1] = [2]',
            'nums[2..2] = [2]',
            'nums[1..2] = [2,2]',
            'nums[0..2] = [1,2,2]',
            'nums[1..3] = [2,2,3]',
            'So there are 5 such subarrays.',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: nums = [1,1,1,1], target = 1',
            'Output: 10',
            'Explanation:',
            'All 10 subarrays have 1 as the majority element.',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: nums = [1,2,3], target = 4',
            'Output: 0',
            'Explanation:',
            'target = 4 does not appear in nums at all. Therefore, there cannot be any subarray where 4 is the majority element. Hence the answer is 0.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 1000`',
            '* `1 <= nums[i] <= 10^9`',
            '* `1 <= target <= 10^9`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @param {number} target',
            ' * @return {number}',
            ' */',
            'var countMajoritySubarrays = function(nums, target) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"[1,2,2,3]", 2',
                expected: '5',
                description: 'Target appears multiple times.'
            },
            {
                input: '"[1,1,1,1]", 1',
                expected: '10',
                description: 'All elements match target.'
            },
            {
                input: '"[1,2,3]", 4',
                expected: '0',
                description: 'Target does not appear.'
            },
        ],
        tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Segment Tree', 'Merge Sort', 'Counting', 'Prefix Sum'],
        hints: [
            "Use brute force for O(N^2) given N=1000.",
            "Count all subarrays where 2 * count(target) > length."
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
