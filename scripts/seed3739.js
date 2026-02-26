const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '3739. Count Subarrays With Majority Element II',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Merge Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given an integer array nums and an integer target, return the number of subarrays in which target is the majority element. Optimized for large constraints.",
        problemStatement: [
            '## 3739. Count Subarrays With Majority Element II',
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
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: nums = [1,1,1,1], target = 1',
            'Output: 10',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: nums = [1,2,3], target = 4',
            'Output: 0',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^5`',
            '* `1 <= nums[i] <= 10^9`',
            '* `1 <= target <= 10^9`',
            '',
            '### 💡 Hint:',
            '> For large constraints, a simple O(N^2) solution will TLE. Consider transforming the problem into a prefix sum count problem.'
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
                description: 'Standard case.'
            },
            {
                input: '"[1,1,1,1]", 1',
                expected: '10',
                description: 'All elements match target.'
            },
        ],
        tags: ['Array', 'Hash Table', 'Divide and Conquer', 'Segment Tree', 'Merge Sort', 'Prefix Sum', 'Binary Indexed Tree'],
        hints: [
            "Convert the array: let arr[i] = 1 if nums[i] == target else -1.",
            "Build prefix sums: pref[0]=0, pref[k] = pref[k - 1] + arr[k - 1].",
            "Count pairs (i < j) with pref[j] > pref[i].",
            "Use a Fenwick tree or Segment Tree with coordinate compression to count these pairs in O(N log N)."
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
