const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '383. Ransom Note',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Hashmap',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Determine if ransomNote can be constructed by using the letters from magazine.",
        problemStatement: [
            '## 383. Ransom Note',
            '',
            '**Difficulty:** Easy | **Topics:** Hash Table, String, Counting',
            '',
            'Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise.',
            '',
            'Each letter in `magazine` can only be used once in `ransomNote`.',
            '',
            '---',
            '',
            '### Example 1:',
            '```',
            'Input: ransomNote = "a", magazine = "b"',
            'Output: false',
            '```',
            '',
            '### Example 2:',
            '```',
            'Input: ransomNote = "aa", magazine = "ab"',
            'Output: false',
            '```',
            '',
            '### Example 3:',
            '```',
            'Input: ransomNote = "aa", magazine = "aab"',
            'Output: true',
            '```',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= ransomNote.length, magazine.length <= 10^5`',
            '* `ransomNote` and `magazine` consist of lowercase English letters.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} ransomNote',
            ' * @param {string} magazine',
            ' * @return {boolean}',
            ' */',
            'var canConstruct = function(ransomNote, magazine) {',
            '    ',
            '};',
        ].join('\n'),
        testCases: [
            { input: '"a", "b"', expected: 'false', description: 'Cannot construct' },
            { input: '"aa", "ab"', expected: 'false', description: 'Not enough letters' },
            { input: '"aa", "aab"', expected: 'true', description: 'Can construct' }
        ],
        tags: ['Hash Table', 'String', 'Counting']
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
