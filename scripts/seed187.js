const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '187. Repeated DNA Sequences',
    level: 'Intermediate',
    difficulty: 'Medium',
    subject: 'DSA',
    topicGroup: 'Hash Function',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find all 10-letter-long DNA sequences that occur more than once.",
        problemStatement: [
            '## 187. Repeated DNA Sequences',
            '',
            "The **DNA sequence** is composed of a series of nucleotides abbreviated as `'A'`, `'C'`, `'G'`, and `'T'`.",
            '',
            '* For example, `"ACGAATTCCG"` is a **DNA sequence**.',
            '',
            'When studying **DNA**, it is useful to identify repeated sequences within the DNA.',
            '',
            'Given a string `s` that represents a **DNA sequence**, return all the **10-letter-long** sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in **any order**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"',
            '**Output:** ["AAAAACCCCC","CCCCCAAAAA"]',
            '',
            '### Example 2:',
            '**Input:** s = "AAAAAAAAAAAAA"',
            '**Output:** ["AAAAAAAAAA"]',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 10^5`',
            '* `s[i]` is either `\'A\'`, `\'C\'`, `\'G\'`, or `\'T\'`.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {string[]}',
            ' */',
            'var findRepeatedDnaSequences = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"',
                expected: '["AAAAACCCCC", "CCCCCAAAAA"]',
                description: 'Multiple repeating sequences of length 10.'
            },
            {
                input: '"AAAAAAAAAAAAA"',
                expected: '["AAAAAAAAAA"]',
                description: 'Overlapping repeating sequences.'
            }
        ],
        tags: ['Hash Table', 'String', 'Bit Manipulation', 'Sliding Window', 'Rolling Hash', 'Hash Function'],
        hints: [
            "You can use a dictionary (hash map) to count occurrences of each 10-letter substring.",
            "Use a sliding window of size 10 to extract every possible sequence.",
            "To optimize memory and speed, use Rolling Hash / Rabin-Karp or bit manipulation to encode 'A', 'C', 'G', 'T'."
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
