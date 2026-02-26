const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '338. Counting Bits',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Dynamic Programming',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given an integer n, return an array consisting of the number of 1's in the binary representation of i for 0 <= i <= n.",
        problemStatement: [
            '## 338. Counting Bits',
            '',
            'Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the **number of `1`\'s** in the binary representation of `i`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** n = 2',
            '**Output:** [0,1,1]',
            '**Explanation:**',
            '0 --> 0',
            '1 --> 1',
            '2 --> 10',
            '',
            '### Example 2:',
            '**Input:** n = 5',
            '**Output:** [0,1,1,2,1,2]',
            '**Explanation:**',
            '0 --> 0',
            '1 --> 1',
            '2 --> 10',
            '3 --> 11',
            '4 --> 100',
            '5 --> 101',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= n <= 10^5`',
            '',
            '### Follow up:',
            '* It is very easy to come up with a solution with a runtime of `O(n log n)`. Can you do it in linear time `O(n)` and possibly in a single pass?',
            '* Can you do it without using any built-in function (i.e., like `__builtin_popcount` in C++)?'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} n',
            ' * @return {number[]}',
            ' */',
            'var countBits = function(n) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '2',
                expected: '[0,1,1]',
                description: 'Array elements matching binary 1s count.'
            },
            {
                input: '5',
                expected: '[0,1,1,2,1,2]',
                description: 'Checking larger range of n.'
            }
        ],
        tags: ['Dynamic Programming', 'Bit Manipulation'],
        hints: [
            "Divide the numbers in ranges like [2-3], [4-7], [8-15] and so on. And try to generate new range from previous.",
            "Or does the odd/even status of the number help you in calculating the number of 1s?"
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
