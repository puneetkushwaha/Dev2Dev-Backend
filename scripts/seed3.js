const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '3. Longest Substring Without Repeating Characters',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'String',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the length of the longest substring without duplicate characters.",
        problemStatement: [
            '## 3. Longest Substring Without Repeating Characters',
            '',
            'Given a string `s`, find the length of the **longest substring** without repeating characters.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "abcabcbb"',
            '**Output:** 3',
            '**Explanation:** The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.',
            '',
            '### Example 2:',
            '**Input:** s = "bbbbb"',
            '**Output:** 1',
            '**Explanation:** The answer is "b", with the length of 1.',
            '',
            '### Example 3:',
            '**Input:** s = "pwwkew"',
            '**Output:** 3',
            '**Explanation:** The answer is "wke", with the length of 3.',
            'Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `0 <= s.length <= 5 * 10^4`',
            '* `s` consists of English letters, digits, symbols and spaces.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {number}',
            ' */',
            'var lengthOfLongestSubstring = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"abcabcbb"',
                expected: '3',
                description: 'Characters repeat periodically.'
            },
            {
                input: '"bbbbb"',
                expected: '1',
                description: 'All identical characters.'
            },
            {
                input: '"pwwkew"',
                expected: '3',
                description: 'Substring contains no repeating.'
            }
        ],
        tags: ['Hash Table', 'String', 'Sliding Window'],
        hints: [
            "You can use a sliding window approach with two pointers.",
            "Maintain a set or hash map of characters in the current window to quickly check for duplicates."
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
