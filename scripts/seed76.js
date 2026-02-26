const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '76. Minimum Window Substring',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'Sliding Window',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the minimum window in s which will contain all the characters in t.",
        problemStatement: [
            '## 76. Minimum Window Substring',
            '',
            '**Difficulty:** Hard | **Topics:** Hash Table, String, Sliding Window',
            '',
            'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.',
            '',
            '> The testcases will be generated such that the answer is **unique**.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: s = "ADOBECODEBANC", t = "ABC"',
            'Output: "BANC"',
            'Explanation: The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: s = "a", t = "a"',
            'Output: "a"',
            'Explanation: The entire string s is the minimum window.',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: s = "a", t = "aa"',
            'Output: ""',
            'Explanation: Both \'a\'s from t must be included in the window.',
            '             Since the largest window of s only has one \'a\', return empty string.',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `m == s.length`',
            '* `n == t.length`',
            '* `1 <= m, n <= 10^5`',
            '* `s` and `t` consist of uppercase and lowercase English letters.',
            '',
            '---',
            '',
            '### 💡 Hints:',
            '> 1. Use two pointers to create a window of letters in `s`, which would have all the characters from `t`.',
            '> 2. Expand the right pointer until all the characters of `t` are covered.',
            '> 3. Once all the characters are covered, move the left pointer and ensure that all the characters are still covered to minimize the subarray size.',
            '> 4. Continue expanding the right and left pointers until you reach the end of `s`.',
            '',
            '**Follow up:** Could you find an algorithm that runs in `O(m + n)` time?'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @param {string} t',
            ' * @return {string}',
            ' */',
            'var minWindow = function(s, t) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '"ADOBECODEBANC", "ABC"', expected: '"BANC"', description: 'Standard case' },
            { input: '"a", "a"', expected: '"a"', description: 'Single character match' },
            { input: '"a", "aa"', expected: '""', description: 'Missing characters' },
        ],
        tags: ['Hash Table', 'String', 'Sliding Window']
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
