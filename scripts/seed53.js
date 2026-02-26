const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '53. Maximum Subarray',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Divide and Conquer',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the contiguous subarray with the largest sum.",
        problemStatement: [
            '## 53. Maximum Subarray',
            '',
            'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** nums = [-2,1,-3,4,-1,2,1,-5,4]',
            '**Output:** 6',
            '**Explanation:** The subarray `[4,-1,2,1]` has the largest sum `6`.',
            '',
            '### Example 2:',
            '**Input:** nums = [1]',
            '**Output:** 1',
            '**Explanation:** The subarray `[1]` has the largest sum `1`.',
            '',
            '### Example 3:',
            '**Input:** nums = [5,4,-1,7,8]',
            '**Output:** 23',
            '**Explanation:** The subarray `[5,4,-1,7,8]` has the largest sum `23`.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= nums.length <= 10^5`',
            '* `-10^4 <= nums[i] <= 10^4`',
            '',
            '**Follow up:** If you have figured out the `O(n)` solution, try coding another solution using the **divide and conquer** approach, which is more subtle.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} nums',
            ' * @return {number}',
            ' */',
            'var maxSubArray = function(nums) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[-2,1,-3,4,-1,2,1,-5,4]',
                expected: '6',
                description: 'Array with negative and positive numbers.'
            },
            {
                input: '[1]',
                expected: '1',
                description: 'Single element array.'
            },
            {
                input: '[5,4,-1,7,8]',
                expected: '23',
                description: 'Array with mostly positive numbers.'
            }
        ],
        tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
        hints: [
            "Kadane's algorithm works in O(N).",
            "For divide and conquer, you can split the array in half and find the maximum subarray in the left half, right half, and the maximum subarray crossing the midpoint."
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
