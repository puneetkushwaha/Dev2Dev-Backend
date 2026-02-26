const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '997. Find the Town Judge',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Graph Theory',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Find the town judge who trusts nobody but is trusted by everybody.",
        problemStatement: [
            '## 997. Find the Town Judge',
            '',
            'In a town, there are `n` people labeled from `1` to `n`. There is a rumor that one of these people is secretly the town judge.',
            '',
            'If the town judge exists, then:',
            '',
            '1. The town judge trusts nobody.',
            '2. Everybody (except for the town judge) trusts the town judge.',
            '3. There is exactly one person that satisfies properties 1 and 2.',
            '',
            'You are given an array `trust` where `trust[i] = [ai, bi]` representing that the person labeled `ai` trusts the person labeled `bi`. If a trust relationship does not exist in `trust` array, then such a trust relationship does not exist.',
            '',
            'Return the label of the town judge if the town judge exists and can be identified, or return `-1` otherwise.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** n = 2, trust = [[1,2]]',
            '**Output:** 2',
            '',
            '### Example 2:',
            '**Input:** n = 3, trust = [[1,3],[2,3]]',
            '**Output:** 3',
            '',
            '### Example 3:',
            '**Input:** n = 3, trust = [[1,3],[2,3],[3,1]]',
            '**Output:** -1',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= n <= 1000`',
            '* `0 <= trust.length <= 10^4`',
            '* `trust[i].length == 2`',
            '* All the pairs of `trust` are **unique**.',
            '* `ai != bi`',
            '* `1 <= ai, bi <= n`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number} n',
            ' * @param {number[][]} trust',
            ' * @return {number}',
            ' */',
            'var findJudge = function(n, trust) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '2, [[1,2]]',
                expected: '2',
                description: 'Simple two person trust network.'
            },
            {
                input: '3, [[1,3],[2,3]]',
                expected: '3',
                description: 'Judge trusted by all.'
            },
            {
                input: '3, [[1,3],[2,3],[3,1]]',
                expected: '-1',
                description: 'Judge trusts someone.'
            }
        ],
        tags: ['Array', 'Hash Table', 'Graph Theory'],
        hints: [
            "Consider the problem as a directed graph where an edge from A to B means A trusts B.",
            "The town judge is the only node with an out-degree of 0 and an in-degree of N - 1."
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
