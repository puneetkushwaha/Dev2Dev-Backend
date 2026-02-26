const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '268. Missing Number',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Sorting',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the missing number in an array of numbers representing a sequence from 0 to n.",
        problemStatement: [
            '## 268. Missing Number',
            '',
            'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [3,0,1]',
            '**Output:** 2',
            '**Explanation:** n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.',
            '',
            '### Example 2:',
            '**Input:** nums = [0,1]',
            '**Output:** 2',
            '**Explanation:** n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.',
            '',
            '### Example 3:',
            '**Input:** nums = [9,6,4,2,3,5,7,0,1]',
            '**Output:** 8',
            '**Explanation:** n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `n == nums.length`',
            '* `1 <= n <= 10^4`',
            '* `0 <= nums[i] <= n`',
            '* All the numbers of `nums` are **unique**.',
            '',
            '**Follow up:** Could you implement a solution using only `O(1)` extra space complexity and `O(n)` runtime complexity?'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number}',
            ' */',
            'var missingNumber = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[3,0,1]',
                expected: '2',
                description: 'Missing from middle of range.'
            },
            {
                input: '[0,1]',
                expected: '2',
                description: 'Missing max item.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Math', 'Binary Search', 'Bit Manipulation', 'Sorting'],
        hints: [
            "You can use math: the sum of the first N integers is N*(N+1)/2. Find this sum and subtract all elements in the array.",
            "You can also use Bit Manipulation using XOR."
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
