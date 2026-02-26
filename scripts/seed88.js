const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '88. Merge Sorted Array',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Sorting',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Merge two sorted arrays in-place into one sorted array.",
        problemStatement: [
            '## 88. Merge Sorted Array',
            '',
            'You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.',
            '',
            '**Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.',
            '',
            'The final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
            '**Output:** [1,2,2,3,5,6]',
            '**Explanation:** The arrays we are merging are [1,2,3] and [2,5,6].',
            'The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.',
            '',
            '### Example 2:',
            '**Input:** nums1 = [1], m = 1, nums2 = [], n = 0',
            '**Output:** [1]',
            '**Explanation:** The arrays we are merging are [1] and [].',
            'The result of the merge is [1].',
            '',
            '### Example 3:',
            '**Input:** nums1 = [0], m = 0, nums2 = [1], n = 1',
            '**Output:** [1]',
            '**Explanation:** The arrays we are merging are [] and [1].',
            'The result of the merge is [1].',
            'Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `nums1.length == m + n`',
            '* `nums2.length == n`',
            '* `0 <= m, n <= 200`',
            '* `1 <= m + n <= 200`',
            '* `-10^9 <= nums1[i], nums2[j] <= 10^9`',
            '',
            '**Follow up:** Can you come up with an algorithm that runs in `O(m + n)` time?'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums1',
            ' * @param {number} m',
            ' * @param {number[]} nums2',
            ' * @param {number} n',
            ' * @return {void} Do not return anything, modify nums1 in-place instead.',
            ' */',
            'var merge = function(nums1, m, nums2, n) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,2,3,0,0,0], 3, [2,5,6], 3',
                expected: '[1,2,2,3,5,6]',
                description: 'Merging equal length arrays.'
            },
            {
                input: '[1], 1, [], 0',
                expected: '[1]',
                description: 'Empty second array.'
            }
        ],
        tags: ['Array', 'Two Pointers', 'Sorting'],
        hints: [
            "You can easily solve this problem if you simply think about two elements at a time rather than two arrays.",
            "If you perform the merge backwards (from the end of nums1 down to the start), you can avoid overwriting elements in nums1 that haven't been processed yet."
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
