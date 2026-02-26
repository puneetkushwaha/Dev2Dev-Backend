const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '49. Group Anagrams',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Sorting',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Group an array of strings into sub-arrays of anagrams.",
        problemStatement: [
            '## 49. Group Anagrams',
            '',
            'Given an array of strings `strs`, group the **anagrams** together. You can return the answer in **any order**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** strs = ["eat","tea","tan","ate","nat","bat"]',
            '**Output:** [["bat"],["nat","tan"],["ate","eat","tea"]]',
            '**Explanation:**',
            '* There is no string in `strs` that can be rearranged to form "bat".',
            '* The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.',
            '* The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.',
            '',
            '### Example 2:',
            '**Input:** strs = [""]',
            '**Output:** [[""]]',
            '',
            '### Example 3:',
            '**Input:** strs = ["a"]',
            '**Output:** [["a"]]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= strs.length <= 10^4`',
            '* `0 <= strs[i].length <= 100`',
            '* `strs[i]` consists of lowercase English letters.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string[]} strs',
            ' * @return {string[][]}',
            ' */',
            'var groupAnagrams = function(strs) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '["eat","tea","tan","ate","nat","bat"]',
                expected: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
                description: 'Various string anagrams.'
            },
            {
                input: '[""]',
                expected: '[[""]]',
                description: 'Empty string.'
            }
        ],
        tags: ['Array', 'Hash Table', 'String', 'Sorting'],
        hints: [
            "Two strings are anagrams if and only if their character counts (or their sorted string representation) are the same.",
            "Use a hash map where the key is the sorted version of the string (or frequency array), and the value is a list of matching strings."
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
