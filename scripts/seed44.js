const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '44. Wildcard Matching',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Greedy',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Implement wildcard pattern matching with support for '?' and '*'.",
        problemStatement: [
            '## 44. Wildcard Matching',
            '',
            'Given an input string (`s`) and a pattern (`p`), implement wildcard pattern matching with support for `\'?\'` and `\'*\'` where:',
            '',
            '* `\'?\'` Matches any single character.',
            '* `\'*\'` Matches any sequence of characters (including the empty sequence).',
            '',
            'The matching should cover the **entire** input string (not partial).',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "aa", p = "a"',
            '**Output:** false',
            '**Explanation:** "a" does not match the entire string "aa".',
            '',
            '### Example 2:',
            '**Input:** s = "aa", p = "*"',
            '**Output:** true',
            '**Explanation:** \'*\' matches any sequence.',
            '',
            '### Example 3:',
            '**Input:** s = "cb", p = "?a"',
            '**Output:** false',
            '**Explanation:** \'?\' matches \'c\', but the second letter is \'a\', which does not match \'b\'.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= s.length, p.length <= 2000`',
            '* `s` contains only lowercase English letters.',
            '* `p` contains only lowercase English letters, `\'?\'` or `\'*\'`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @param {string} p',
            ' * @return {boolean}',
            ' */',
            'var isMatch = function(s, p) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"aa", "a"',
                expected: 'false',
                description: 'Pattern does not cover string.'
            },
            {
                input: '"aa", "*"',
                expected: 'true',
                description: 'Star matches everything.'
            },
            {
                input: '"cb", "?a"',
                expected: 'false',
                description: 'Question mark matches exactly one char.'
            }
        ],
        tags: ['String', 'Dynamic Programming', 'Greedy', 'Recursion'],
        hints: [
            "You can use dynamic programming or a greedy approach with two pointers.",
            "In the greedy approach, keep track of the last seen '*' in the pattern and the corresponding index in the string. If there's a mismatch, fallback to the last seen '*'."
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
