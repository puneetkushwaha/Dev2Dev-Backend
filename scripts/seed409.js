const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '409. Longest Palindrome',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Greedy',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the length of the longest palindrome that can be built using characters from a string.",
        problemStatement: [
            '## 409. Longest Palindrome',
            '',
            'Given a string `s` which consists of lowercase or uppercase letters, return the length of the **longest palindrome** that can be built with those letters.',
            '',
            'Letters are **case sensitive**, for example, `"Aa"` is not considered a palindrome.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** s = "abccccdd"',
            '**Output:** 7',
            '**Explanation:** One longest palindrome that can be built is "dccaccd", whose length is 7.',
            '',
            '### Example 2:',
            '**Input:** s = "a"',
            '**Output:** 1',
            '**Explanation:** The longest palindrome that can be built is "a", whose length is 1.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= s.length <= 2000`',
            '* `s` consists of lowercase **and/or** uppercase English letters only.'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {string} s',
            ' * @return {number}',
            ' */',
            'var longestPalindrome = function(s) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '"abccccdd"',
                expected: '7',
                description: 'We can use all even counts and one odd count character.'
            },
            {
                input: '"a"',
                expected: '1',
                description: 'Single character.'
            }
        ],
        tags: ['Hash Table', 'String', 'Greedy'],
        hints: [
            "Use a Hash Table to count the frequencies of each character.",
            "Any even frequency character can be fully used. For any odd frequency characters, they can be utilized partially (count - 1). Finally, if any odd frequency character existed, you can place exactly one of them exactly in the center of the palindrome."
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
