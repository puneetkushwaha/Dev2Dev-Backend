const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '224. Basic Calculator',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Stack',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Implement a basic calculator to evaluate a valid expression string containing numbers, +, -, and parentheses.",
        problemStatement: [
            '## 224. Basic Calculator',
            '',
            'Given a string `s` representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.',
            '',
            '**Note:** You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "1 + 1"',
            '**Output:** 2',
            '',
            '### Example 2:',
            '**Input:** s = " 2-1 + 2 "',
            '**Output:** 3',
            '',
            '### Example 3:',
            '**Input:** s = "(1+(4+5+2)-3)+(6+8)"',
            '**Output:** 23',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 3 * 10^5`',
            '* `s` consists of digits, `\'+\'`, `\'-\'`, `\'(\'`, `\')\'`, and `\' \'`.',
            '* `s` represents a valid expression.',
            '* `\'+\'` is not used as a unary operation.',
            '* `\'-\'` could be used as a unary operation.',
            '* Every number and running calculation will fit in a signed 32-bit integer.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {number}',
            ' */',
            'var calculate = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"1 + 1"',
                expected: '2',
                description: 'Basic addition.'
            },
            {
                input: '"(1+(4+5+2)-3)+(6+8)"',
                expected: '23',
                description: 'Nested parentheses.'
            }
        ],
        tags: ['Math', 'String', 'Stack', 'Recursion'],
        hints: [
            "Use a stack to keep track of the results and signs outside of parentheses.",
            "Iterate through the string, maintaining a running total and identifying numbers. When a '(' is reached, push the current total and the sign onto the stack and reset for the inside."
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
