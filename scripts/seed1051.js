const mongoose = require('mongoose');
const Topic = require('../models/Topic');
require('dotenv').config({ path: '../.env' });

const problem = {
    title: '1051. Height Checker',
    level: 'Beginner',
    difficulty: 'Easy',
    subject: 'DSA',
    topicGroup: 'Counting Sort',
    isCoreCS: true,
    lessonType: 'practice',
    content: {
        description: "Count the number of students standing in the wrong positions based on sorted heights.",
        problemStatement: [
            '## 1051. Height Checker',
            '',
            'A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in **non-decreasing order** by height. Let this ordering be represented by the integer array `expected` where `expected[i]` is the expected height of the `i`th student in line.',
            '',
            'You are given an integer array `heights` representing the **current order** that the students are standing in. Each `heights[i]` is the height of the `i`th student in line (**0-indexed**).',
            '',
            'Return the **number of indices** where `heights[i] != expected[i]`.',
            '',
            '---',
            '',
            '### Example 1:',
            '**Input:** heights = [1,1,4,2,1,3]',
            '**Output:** 3',
            '**Explanation:**',
            'heights:  [1,1,4,2,1,3]',
            'expected: [1,1,1,2,3,4]',
            'Indices 2, 4, and 5 do not match.',
            '',
            '### Example 2:',
            '**Input:** heights = [5,1,2,3,4]',
            '**Output:** 5',
            '**Explanation:**',
            'heights:  [5,1,2,3,4]',
            'expected: [1,2,3,4,5]',
            'All indices do not match.',
            '',
            '### Example 3:',
            '**Input:** heights = [1,2,3,4,5]',
            '**Output:** 0',
            '**Explanation:**',
            'heights:  [1,2,3,4,5]',
            'expected: [1,2,3,4,5]',
            'All indices match.',
            '',
            '---',
            '',
            '### Constraints:',
            '* `1 <= heights.length <= 100`',
            '* `1 <= heights[i] <= 100`'
        ].join('\n'),
        starterCode: [
            '/**',
            ' * @param {number[]} heights',
            ' * @return {number}',
            ' */',
            'var heightChecker = function(heights) {',
            '    ',
            '};'
        ].join('\n'),
        testCases: [
            {
                input: '[1,1,4,2,1,3]',
                expected: '3',
                description: 'Mix of correct and incorrectly placed heights.'
            },
            {
                input: '[5,1,2,3,4]',
                expected: '5',
                description: 'All elements misplaced.'
            }
        ],
        tags: ['Array', 'Sorting', 'Counting Sort'],
        hints: [
            "Build the correct order of heights by sorting another array, then compare the two arrays."
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
