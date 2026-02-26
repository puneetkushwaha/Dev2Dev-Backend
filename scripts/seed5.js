const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '5. Longest Palindromic Substring',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'String',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given a string s, return the longest palindromic substring in s.",
        problemStatement: [
            '## 5. Longest Palindromic Substring',
            '',
            'Given a string `s`, return the longest palindromic substring in `s`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "babad"',
            '**Output:** "bab"',
            '**Explanation:** "aba" is also a valid answer.',
            '',
            '### Example 2:',
            '**Input:** s = "cbbd"',
            '**Output:** "bb"',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 1000`',
            '* `s` consist of only digits and English letters.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {string}',
            ' */',
            'var longestPalindrome = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"babad"',
                expected: '"bab"',
                description: 'Odd length palindrome.'
            },
            {
                input: '"cbbd"',
                expected: '"bb"',
                description: 'Even length palindrome.'
            }
        ],
        tags: ['Two Pointers', 'String', 'Dynamic Programming'],
        hints: [
            "We can reuse a previously computed palindrome to compute a larger palindrome.",
            "Can we expand from the center? There are 2n - 1 centers to consider."
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
