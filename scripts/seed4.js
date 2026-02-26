const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '4. Median of Two Sorted Arrays',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Divide and Conquer',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the median of two sorted arrays with O(log (m+n)) runtime complexity.",
        problemStatement: [
            '## 4. Median of Two Sorted Arrays',
            '',
            'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.',
            '',
            'The overall run time complexity should be `O(log (m+n))`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums1 = [1,3], nums2 = [2]',
            '**Output:** 2.00000',
            '**Explanation:** merged array = [1,2,3] and median is 2.',
            '',
            '### Example 2:',
            '**Input:** nums1 = [1,2], nums2 = [3,4]',
            '**Output:** 2.50000',
            '**Explanation:** merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `nums1.length == m`',
            '* `nums2.length == n`',
            '* `0 <= m <= 1000`',
            '* `0 <= n <= 1000`',
            '* `1 <= m + n <= 2000`',
            '* `-10^6 <= nums1[i], nums2[i] <= 10^6`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums1',
            ' * @param {number[]} nums2',
            ' * @return {number}',
            ' */',
            'var findMedianSortedArrays = function(nums1, nums2) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,3], [2]',
                expected: '2.00000',
                description: 'Odd total length.'
            },
            {
                input: '[1,2], [3,4]',
                expected: '2.50000',
                description: 'Even total length.'
            }
        ],
        tags: ['Array', 'Binary Search', 'Divide and Conquer'],
        hints: [
            "Use binary search to partition both arrays such that the left half has the same number of elements as the right half."
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
