const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '125. Valid Palindrome',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Two Pointers',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Check if a string is a valid palindrome, considering only alphanumeric characters and ignoring cases.",
        problemStatement: [
            '## 125. Valid Palindrome',
            '',
            '**Difficulty:** Easy | **Topics:** Two Pointers, String',
            '',
            'A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.',
            '',
            'Given a string `s`, return `true` if it is a **palindrome**, or `false` otherwise.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: s = "A man, a plan, a canal: Panama"',
            'Output: true',
            'Explanation: "amanaplanacanalpanama" is a palindrome.',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: s = "race a car"',
            'Output: false',
            'Explanation: "raceacar" is not a palindrome.',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: s = " "',
            'Output: true',
            'Explanation: s is an empty string "" after removing non-alphanumeric characters.',
            '             Since an empty string reads the same forward and backward, it is a palindrome.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 2 * 10^5`',
            '* `s` consists only of printable ASCII characters.',
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {boolean}',
            ' */',
            'var isPalindrome = function(s) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '"A man, a plan, a canal: Panama"', expected: 'true', description: 'Complex string with spaces and punctuation' },
            { input: '"race a car"', expected: 'false', description: 'Not a palindrome' },
            { input: '" "', expected: 'true', description: 'Empty/whitespace string' },
            { input: '"0P"', expected: 'false', description: 'Alphanumeric edge case' },
        ],
        tags: ['Two Pointers', 'String'],
    },
};

mongoose.connect(process.env.MONGO_URI).then(async () => {
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
