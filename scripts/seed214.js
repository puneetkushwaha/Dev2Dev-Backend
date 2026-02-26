const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '214. Shortest Palindrome',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Hash Function',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the shortest palindrome transformation by adding characters to the front.",
        problemStatement: [
            '## 214. Shortest Palindrome',
            '',
            'You are given a string `s`. You can convert `s` to a palindrome by adding characters in front of it.',
            '',
            'Return the shortest palindrome you can find by performing this transformation.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "aacecaaa"',
            '**Output:** "aaacecaaa"',
            '',
            '### Example 2:',
            '**Input:** s = "abcd"',
            '**Output:** "dcbabcd"',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= s.length <= 5 * 10^4`',
            '* `s` consists of lowercase English letters only.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {string}',
            ' */',
            'var shortestPalindrome = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"aacecaaa"',
                expected: '"aaacecaaa"',
                description: 'Partial palindrome at the start.'
            },
            {
                input: '"abcd"',
                expected: '"dcbabcd"',
                description: 'No initial palindrome sequence.'
            }
        ],
        tags: ['String', 'Rolling Hash', 'String Matching', 'Hash Function'],
        hints: [
            "We can use Rolling Hash to find the longest palindromic prefix.",
            "Compare the rolling hash of the prefix from left-to-right to the rolling hash from right-to-left.",
            "Alternatively, KMP algorithm's partial match table can solve this efficiently."
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
