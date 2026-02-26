const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '69. Sqrt(x)',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Binary Search',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given a non-negative integer x, return the square root of x rounded down to the nearest integer.",
        problemStatement: [
            '## 69. Sqrt(x)',
            '',
            'Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. The returned integer should be **non-negative** as well.',
            '',
            'You **must not use** any built-in exponent function or operator.',
            '',
            '* For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** x = 4',
            '**Output:** 2',
            '**Explanation:** The square root of 4 is 2, so we return 2.',
            '',
            '### Example 2:',
            '**Input:** x = 8',
            '**Output:** 2',
            '**Explanation:** The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= x <= 2^31 - 1`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} x',
            ' * @return {number}',
            ' */',
            'var mySqrt = function(x) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '4',
                expected: '2',
                description: 'Perfect square.'
            },
            {
                input: '8',
                expected: '2',
                description: 'Truncated square root.'
            }
        ],
        tags: ['Math', 'Binary Search'],
        hints: [
            "You can use binary search on the range [0, x] to find the integer `r` such that `r * r <= x < (r + 1) * (r + 1)`.",
            "Make sure to avoid integer overflow while calculating `mid * mid` in languages with 32-bit limits."
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
