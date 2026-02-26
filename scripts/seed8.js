const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '8. String to Integer (atoi)',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'String',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
        problemStatement: [
            '## 8. String to Integer (atoi)',
            '',
            'Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.',
            '',
            'The algorithm for `myAtoi(string s)` is as follows:',
            '',
            '1. **Whitespace:** Ignore any leading whitespace (`" "`).',
            '2. **Signedness:** Determine the sign by checking if the next character is `\'-\'` or `\'+\'`, assuming positivity if neither present.',
            '3. **Conversion:** Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is `0`.',
            '4. **Rounding:** If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then round the integer to remain in the range. Specifically, integers less than `-2^31` should be rounded to `-2^31`, and integers greater than `2^31 - 1` should be rounded to `2^31 - 1`.',
            '',
            'Return the integer as the final result.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "42"',
            '**Output:** 42',
            '',
            '### Example 2:',
            '**Input:** s = " -042"',
            '**Output:** -42',
            '',
            '### Example 3:',
            '**Input:** s = "1337c0d3"',
            '**Output:** 1337',
            '',
            '### Example 4:',
            '**Input:** s = "0-1"',
            '**Output:** 0',
            '',
            '### Example 5:',
            '**Input:** s = "words and 987"',
            '**Output:** 0',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= s.length <= 200`',
            '* `s` consists of English letters (lower-case and upper-case), digits (`0-9`), `\' \'`, `\'+\'`, `\'-\'`, and `\'.\'`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {number}',
            ' */',
            'var myAtoi = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"42"',
                expected: '42',
                description: 'Simple integer string.'
            },
            {
                input: '" -042"',
                expected: '-42',
                description: 'Leading whitespace and negative.'
            },
            {
                input: '"1337c0d3"',
                expected: '1337',
                description: 'Stops reading at first character.'
            },
            {
                input: '"words and 987"',
                expected: '0',
                description: 'Starts with words.'
            }
        ],
        tags: ['String'],
        hints: [
            "We can use a pointer to iterate through the string, carefully processing rules in order: whitespace, sign, and then digits.",
            "Make sure to clamp the number dynamically if it exceeds the 32-bit numeric limits."
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
