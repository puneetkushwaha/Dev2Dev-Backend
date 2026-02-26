const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '20. Valid Parentheses',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'String',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given a string containing just brackets, determine if the input string is valid.",
        problemStatement: [
            '## 20. Valid Parentheses',
            '',
            'Given a string `s` containing just the characters `\'(\'`, `\')\'`, `\'{\'`, `\'}\'`, `\'[\'` and `\']\'`, determine if the input string is valid.',
            '',
            'An input string is valid if:',
            '',
            '1. Open brackets must be closed by the same type of brackets.',
            '2. Open brackets must be closed in the correct order.',
            '3. Every close bracket has a corresponding open bracket of the same type.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "()"',
            '**Output:** true',
            '',
            '### Example 2:',
            '**Input:** s = "()[]{}"',
            '**Output:** true',
            '',
            '### Example 3:',
            '**Input:** s = "(]"',
            '**Output:** false',
            '',
            '### Example 4:',
            '**Input:** s = "([])"',
            '**Output:** true',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 10^4`',
            '* `s` consists of parentheses only `\'()[]{}\'`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {boolean}',
            ' */',
            'var isValid = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"()"',
                expected: 'true',
                description: 'Single pair.'
            },
            {
                input: '"()[]{}"',
                expected: 'true',
                description: 'Multiple continuous pairs.'
            },
            {
                input: '"(]"',
                expected: 'false',
                description: 'Mismatched brackets.'
            },
            {
                input: '"([])"',
                expected: 'true',
                description: 'Nested pairs.'
            }
        ],
        tags: ['String', 'Stack'],
        hints: [
            "Use a stack of characters.",
            "When you encounter a closing bracket, check if the top of the stack was the opening for it. If yes, pop it from the stack. Otherwise, return false."
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
