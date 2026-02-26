const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '32. Longest Valid Parentheses',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Dynamic Programming',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the length of the longest valid (well-formed) parentheses substring.",
        problemStatement: [
            '## 32. Longest Valid Parentheses',
            '',
            'Given a string containing just the characters `\'(\'` and `\')\'`, return the length of the longest valid (well-formed) parentheses substring.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "(()"',
            '**Output:** 2',
            '**Explanation:** The longest valid parentheses substring is "()".',
            '',
            '### Example 2:',
            '**Input:** s = ")()())"',
            '**Output:** 4',
            '**Explanation:** The longest valid parentheses substring is "()()".',
            '',
            '### Example 3:',
            '**Input:** s = ""',
            '**Output:** 0',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= s.length <= 3 * 10^4`',
            '* `s[i]` is `\'(\'`, or `\')\'`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {number}',
            ' */',
            'var longestValidParentheses = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"(()"',
                expected: '2',
                description: 'Valid substring starts at index 1.'
            },
            {
                input: '")()())"',
                expected: '4',
                description: 'Valid substring is in the middle.'
            },
            {
                input: '""',
                expected: '0',
                description: 'Empty string.'
            }
        ],
        tags: ['String', 'Dynamic Programming', 'Stack'],
        hints: [
            "A stack can be used to keep track of the indices of the brackets.",
            "Dynamic Programming Approach: Let DP[i] denote the length of the longest valid parentheses substring ending at index i."
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
