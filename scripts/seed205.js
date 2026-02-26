const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '205. Isomorphic Strings',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Hashmap',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Determine if two strings s and t are isomorphic.",
        problemStatement: [
            '## 205. Isomorphic Strings',
            '',
            '**Difficulty:** Easy | **Topics:** Hash Table, String',
            '',
            'Given two strings `s` and `t`, determine if they are **isomorphic**.',
            '',
            'Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.',
            '',
            'All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: s = "egg", t = "add"',
            'Output: true',
            'Explanation:',
            'The strings s and t can be made identical by:',
            'Mapping \'e\' to \'a\'.',
            'Mapping \'g\' to \'d\'.',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: s = "f11", t = "b23"',
            'Output: false',
            'Explanation:',
            'The strings s and t can not be made identical as \'1\' needs to be mapped to both \'2\' and \'3\'.',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: s = "paper", t = "title"',
            'Output: true',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 5 * 10^4`',
            '* `t.length == s.length`',
            '* `s` and `t` consist of any valid ascii character.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @param {string} t',
            ' * @return {boolean}',
            ' */',
            'var isIsomorphic = function(s, t) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '"egg", "add"', expected: 'true', description: 'Valid isomorphic strings' },
            { input: '"f11", "b23"', expected: 'false', description: 'Multiple mappings for one char' },
            { input: '"paper", "title"', expected: 'true', description: 'Longer valid isomorphic strings' },
            { input: '"badc", "baba"', expected: 'false', description: 'Cross mapping failure' }
        ],
        tags: ['Hash Table', 'String']
    }
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
