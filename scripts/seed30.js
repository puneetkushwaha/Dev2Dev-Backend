const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '30. Substring with Concatenation of All Words',
    level: 'Advanced',
    difficulty: 'Hard',
    subject: 'DSA',
    topicGroup: 'String',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the starting indices of concatenated substrings of given words.",
        problemStatement: [
            '## 30. Substring with Concatenation of All Words',
            '',
            'You are given a string `s` and an array of strings `words`. All the strings of `words` are of **the same length**.',
            '',
            'A **concatenated string** is a string that exactly contains all the strings of any permutation of `words` concatenated.',
            '',
            '*   For example, if `words = ["ab","cd","ef"]`, then `"abcdef"`, `"abefcd"`, `"cdabef"`, `"cdefab"`, `"efabcd"`, and `"efcdab"` are all concatenated strings. `"acdbef"` is not a concatenated string because it is not the concatenation of any permutation of `words`.',
            '',
            'Return an array of the starting indices of all the concatenated substrings in `s`. You can return the answer in **any order**.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "barfoothefoobarman", words = ["foo","bar"]',
            '**Output:** [0,9]',
            '**Explanation:**',
            'The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.',
            'The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.',
            '',
            '### Example 2:',
            '**Input:** s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]',
            '**Output:** []',
            '**Explanation:** There is no concatenated substring.',
            '',
            '### Example 3:',
            '**Input:** s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]',
            '**Output:** [6,9,12]',
            '**Explanation:**',
            'The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].',
            'The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].',
            'The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 10^4`',
            '* `1 <= words.length <= 5000`',
            '* `1 <= words[i].length <= 30`',
            '* `s` and `words[i]` consist of lowercase English letters.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @param {string[]} words',
            ' * @return {number[]}',
            ' */',
            'var findSubstring = function(s, words) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"barfoothefoobarman", ["foo","bar"]',
                expected: '[0,9]',
                description: 'Simple matching words.'
            },
            {
                input: '"wordgoodgoodgoodbestword", ["word","good","best","word"]',
                expected: '[]',
                description: 'No permutation found.'
            }
        ],
        tags: ['Hash Table', 'String', 'Sliding Window'],
        hints: [
            "Since all words are of the same size, we can use a sliding window approach with a window step equal to the word size.",
            "Use a hash map to keep track of the frequency of words currently residing in the window."
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
