const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '6. Zigzag Conversion',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'String',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given a string and number of rows, return the string arranged in a zigzag pattern.",
        problemStatement: [
            '## 6. Zigzag Conversion',
            '',
            'The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this:',
            '',
            '```',
            'P   A   H   N',
            'A P L S I I G',
            'Y   I   R',
            '```',
            '',
            'And then read line by line: `"PAHNAPLSIIGYIR"`',
            '',
            'Write the code that will take a string and make this conversion given a number of rows:',
            '',
            '`string convert(string s, int numRows);`',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "PAYPALISHIRING", numRows = 3',
            '**Output:** "PAHNAPLSIIGYIR"',
            '',
            '### Example 2:',
            '**Input:** s = "PAYPALISHIRING", numRows = 4',
            '**Output:** "PINALSIGYAHRPI"',
            '**Explanation:**',
            '```',
            'P     I    N',
            'A   L S  I G',
            'Y A   H R',
            'P     I',
            '```',
            '',
            '### Example 3:',
            '**Input:** s = "A", numRows = 1',
            '**Output:** "A"',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 1000`',
            '* `s` consists of English letters (lower-case and upper-case), `\',\'` and `\'.\'`.',
            '* `1 <= numRows <= 1000`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @param {number} numRows',
            ' * @return {string}',
            ' */',
            'var convert = function(s, numRows) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"PAYPALISHIRING", 3',
                expected: '"PAHNAPLSIIGYIR"',
                description: 'Three rows.'
            },
            {
                input: '"PAYPALISHIRING", 4',
                expected: '"PINALSIGYAHRPI"',
                description: 'Four rows.'
            }
        ],
        tags: ['String'],
        hints: [
            "We can simulate the zigzag pattern by using an array of Strings, one for each row.",
            "Traverse the string, adding each character to the appropriate row, and reversing direction when reaching the top or bottom row."
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
