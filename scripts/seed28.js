const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '28. Find the Index of the First Occurrence in a String',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'String',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack.",
        problemStatement: [
            '## 28. Find the Index of the First Occurrence in a String',
            '',
            'Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** haystack = "sadbutsad", needle = "sad"',
            '**Output:** 0',
            '**Explanation:** "sad" occurs at index 0 and 6.',
            'The first occurrence is at index 0, so we return 0.',
            '',
            '### Example 2:',
            '**Input:** haystack = "leetcode", needle = "leeto"',
            '**Output:** -1',
            '**Explanation:** "leeto" did not occur in "leetcode", so we return -1.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= haystack.length, needle.length <= 10^4`',
            '* `haystack` and `needle` consist of only lowercase English characters.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} haystack',
            ' * @param {string} needle',
            ' * @return {number}',
            ' */',
            'var strStr = function(haystack, needle) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"sadbutsad", "sad"',
                expected: '0',
                description: 'Needle is at the start.'
            },
            {
                input: '"leetcode", "leeto"',
                expected: '-1',
                description: 'Needle does not exist in haystack.'
            }
        ],
        tags: ['Two Pointers', 'String', 'String Matching'],
        hints: [
            "We can use the standard substring search algorithm or simply use built-in string find functions.",
            "For an optimized solution, consider using algorithms like KMP (Knuth-Morris-Pratt)."
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
