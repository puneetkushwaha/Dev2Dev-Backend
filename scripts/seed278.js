const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '278. First Bad Version',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Binary Search',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Given an API to check if a version is bad, find the first bad version using binary search.",
        problemStatement: [
            '## 278. First Bad Version',
            '',
            'You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.',
            '',
            'Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.',
            '',
            'You are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** n = 5, bad = 4',
            '**Output:** 4',
            '**Explanation:**',
            'call isBadVersion(3) -> false',
            'call isBadVersion(5) -> true',
            'call isBadVersion(4) -> true',
            'Then 4 is the first bad version.',
            '',
            '### Example 2:',
            '**Input:** n = 1, bad = 1',
            '**Output:** 1',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= bad <= n <= 2^31 - 1`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * Definition for isBadVersion()',
            ' * ',
            ' * @param {integer} version number',
            ' * @return {boolean} whether the version is bad',
            ' * isBadVersion = function(version) {',
            ' *     ...',
            ' * };',
            ' */',
            '',
            '/**',
            ' * @param {function} isBadVersion()',
            ' * @return {function}',
            ' */',
            'var solution = function(isBadVersion) {',
            '    /**',
            '     * @param {integer} n Total versions',
            '     * @return {integer} The first bad version',
            '     */',
            '    return function(n) {',
            '        ',
            '    };',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '5, 4',
                expected: '4',
                description: 'Midpoint iterations find bad version.'
            },
            {
                input: '1, 1',
                expected: '1',
                description: 'First version is the bad one.'
            }
        ],
        tags: ['Binary Search', 'Interactive'],
        hints: [
            "Use binary search. If mid is bad, the first bad version is either mid or before mid. If mid is good, it must be after mid."
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
