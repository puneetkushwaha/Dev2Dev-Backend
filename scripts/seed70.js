const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '70. Climbing Stairs',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Dynamic Programming',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find how many distinct ways you can climb from the bottom to the top of a staircase.",
        problemStatement: [
            '## 70. Climbing Stairs',
            '',
            'You are climbing a staircase. It takes `n` steps to reach the top.',
            '',
            'Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** n = 2',
            '**Output:** 2',
            '**Explanation:** There are two ways to climb to the top.',
            '1. 1 step + 1 step',
            '2. 2 steps',
            '',
            '### Example 2:',
            '**Input:** n = 3',
            '**Output:** 3',
            '**Explanation:** There are three ways to climb to the top.',
            '1. 1 step + 1 step + 1 step',
            '2. 1 step + 2 steps',
            '3. 2 steps + 1 step',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= n <= 45`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} n',
            ' * @return {number}',
            ' */',
            'var climbStairs = function(n) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '2',
                expected: '2',
                description: 'Two steps required.'
            },
            {
                input: '3',
                expected: '3',
                description: 'Three steps required.'
            }
        ],
        tags: ['Math', 'Dynamic Programming', 'Memoization'],
        hints: [
            "To reach nth step, what could have been your previous steps? (Think about the step sizes).",
            "This problem can be transformed into the Fibonacci sequence."
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
