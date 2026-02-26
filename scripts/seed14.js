const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '14. Longest Common Prefix',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'String',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the longest common prefix string amongst an array of strings.",
        problemStatement: [
            '## 14. Longest Common Prefix',
            '',
            'Write a function to find the longest common prefix string amongst an array of strings.',
            '',
            'If there is no common prefix, return an empty string `""`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** strs = ["flower","flow","flight"]',
            '**Output:** "fl"',
            '',
            '### Example 2:',
            '**Input:** strs = ["dog","racecar","car"]',
            '**Output:** ""',
            '**Explanation:** There is no common prefix among the input strings.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= strs.length <= 200`',
            '* `0 <= strs[i].length <= 200`',
            '* `strs[i]` consists of only lowercase English letters if it is non-empty.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string[]} strs',
            ' * @return {string}',
            ' */',
            'var longestCommonPrefix = function(strs) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '["flower","flow","flight"]',
                expected: '"fl"',
                description: 'Standard common prefix.'
            },
            {
                input: '["dog","racecar","car"]',
                expected: '""',
                description: 'No common prefix.'
            }
        ],
        tags: ['String', 'Trie'],
        hints: [
            "We can sort the array of strings and just compare the first and the last strings in the sorted array. The common prefix of these two will be the common prefix for all strings."
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
