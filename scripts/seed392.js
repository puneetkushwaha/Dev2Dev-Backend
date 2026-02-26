const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '392. Is Subsequence',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Two Pointers',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given two strings s and t, return true if s is a subsequence of t, or false otherwise.",
        problemStatement: [
            '## 392. Is Subsequence',
            '',
            '**Difficulty:** Easy | **Topics:** Two Pointers, String, Dynamic Programming',
            '',
            'Given two strings `s` and `t`, return `true` if `s` is a **subsequence** of `t`, or `false` otherwise.',
            '',
            'A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: s = "abc", t = "ahbgdc"',
            'Output: true',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: s = "axc", t = "ahbgdc"',
            'Output: false',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= s.length <= 100`',
            '* `0 <= t.length <= 10^4`',
            '* `s` and `t` consist only of lowercase English letters.',
            '',
            '---',
            '',
            '### 💡 Follow Up:',
            '> Suppose there are lots of incoming `s`, say `s1, s2, ..., sk` where `k >= 10^9`, and you want to check one by one to see if `t` has its subsequence. In this scenario, how would you change your code?',
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @param {string} t',
            ' * @return {boolean}',
            ' */',
            'var isSubsequence = function(s, t) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '"abc", "ahbgdc"', expected: 'true', description: 'Standard true case' },
            { input: '"axc", "ahbgdc"', expected: 'false', description: 'Standard false case' },
            { input: '"", "ahbgdc"', expected: 'true', description: 'Empty string s is always a subsequence' },
            { input: '"b", "c"', expected: 'false', description: 's longer or mismatched single char' },
        ],
        tags: ['Two Pointers', 'String', 'Dynamic Programming'],
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
